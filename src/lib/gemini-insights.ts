import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { slugify } from './slugify'

const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models'

type GeminiPart = {
  text?: string
  inlineData?: {
    mimeType?: string
    data?: string
  }
  inline_data?: {
    mime_type?: string
    data?: string
  }
}

type GeminiResponse = {
  candidates?: {
    content?: {
      parts?: GeminiPart[]
    }
  }[]
  error?: {
    message?: string
  }
}

export class GeminiAccessError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'GeminiAccessError'
  }
}

export type GeneratedInsightDraft = {
  title: string
  slug: string
  excerpt: string
  content: string
  category: string
  tags: string[]
  metaDescription: string
  metaKeywords: string[]
  imagePrompt: string
  socialPosts: {
    linkedin: string
    x: string
  }
}

export type InsightAgentInput = {
  topic: string
  audience?: string
  category?: string
  tone?: string
}

export type InsightChatMessage = {
  role: 'user' | 'assistant'
  content: string
}

export type InsightChatTopic = {
  title: string
  brief: string
  category: string
  audience: string
}

export type InsightChatResponse = {
  reply: string
  topics: InsightChatTopic[]
  refinedArticle?: string
  generatorBrief?: {
    topic: string
    audience: string
    category: string
    tone: string
  }
}

function getGeminiApiKey() {
  return process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY || ''
}

function getGeminiTextModel() {
  return process.env.GEMINI_TEXT_MODEL || 'gemini-2.5-flash'
}

function getGeminiImageModel() {
  return process.env.GEMINI_IMAGE_MODEL || 'gemini-3.1-flash-image-preview'
}

async function callGemini(model: string, body: unknown) {
  const apiKey = getGeminiApiKey()

  if (!apiKey) {
    throw new Error('GEMINI_API_KEY is not configured')
  }

  const response = await fetch(`${GEMINI_API_URL}/${model}:generateContent`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-goog-api-key': apiKey,
    },
    body: JSON.stringify(body),
  })
  const result = (await response.json()) as GeminiResponse

  if (!response.ok) {
    const message = result.error?.message || 'Gemini request failed'

    if (response.status === 401 || response.status === 403 || /denied access|permission/i.test(message)) {
      throw new GeminiAccessError(
        `${message} Check that the Gemini API key belongs to an allowed Google AI Studio project with Gemini API access enabled.`
      )
    }

    throw new Error(message)
  }

  return result
}

function getTextFromGemini(result: GeminiResponse) {
  return (
    result.candidates?.[0]?.content?.parts
      ?.map((part) => part.text || '')
      .join('')
      .trim() || ''
  )
}

function parseJsonObject(value: string) {
  const fenced = value.match(/```(?:json)?\s*([\s\S]*?)```/i)?.[1]
  const source = fenced || value
  const start = source.indexOf('{')
  const end = source.lastIndexOf('}')

  if (start === -1 || end === -1 || end <= start) {
    throw new Error('Gemini did not return a JSON object')
  }

  return JSON.parse(source.slice(start, end + 1)) as Partial<GeneratedInsightDraft>
}

function parseChatJsonObject(value: string) {
  const fenced = value.match(/```(?:json)?\s*([\s\S]*?)```/i)?.[1]
  const source = fenced || value
  const start = source.indexOf('{')
  const end = source.lastIndexOf('}')

  if (start === -1 || end === -1 || end <= start) {
    return {
      reply: value.trim(),
      topics: [],
    } satisfies InsightChatResponse
  }

  return JSON.parse(source.slice(start, end + 1)) as Partial<InsightChatResponse>
}

function normalizeStringArray(value: unknown) {
  if (!Array.isArray(value)) {
    return []
  }

  return value.map((item) => String(item).trim()).filter(Boolean)
}

function normalizeDraft(value: Partial<GeneratedInsightDraft>, fallbackTopic: string): GeneratedInsightDraft {
  const title = String(value.title || fallbackTopic).trim()
  const content = String(value.content || '').trim()

  if (!title || !content) {
    throw new Error('Gemini returned an incomplete insight draft')
  }

  const excerpt = String(value.excerpt || content.slice(0, 180)).trim()
  const category = String(value.category || 'interoperability').trim()
  const socialPosts = value.socialPosts || { linkedin: '', x: '' }

  return {
    title,
    slug: slugify(String(value.slug || title)) || slugify(fallbackTopic),
    excerpt,
    content,
    category,
    tags: normalizeStringArray(value.tags),
    metaDescription: String(value.metaDescription || excerpt).trim().slice(0, 180),
    metaKeywords: normalizeStringArray(value.metaKeywords),
    imagePrompt: String(
      value.imagePrompt ||
        `Editorial featured image for a healthcare interoperability insight titled "${title}".`
    ).trim(),
    socialPosts: {
      linkedin: String(socialPosts.linkedin || `${title}\n\n${excerpt}`).trim(),
      x: String(socialPosts.x || `${title}: ${excerpt}`).trim(),
    },
  }
}

export async function generateInsightDraft(input: InsightAgentInput) {
  const topic = input.topic.trim()
  const prompt = `
You are InteropMed's healthcare interoperability insight agent.

Create one original executive insight article for a B2B healthcare technology audience.

Return only valid JSON with this exact shape:
{
  "title": "string",
  "slug": "string",
  "excerpt": "string",
  "content": "string",
  "category": "string",
  "tags": ["string"],
  "metaDescription": "string",
  "metaKeywords": ["string"],
  "imagePrompt": "string",
  "socialPosts": {
    "linkedin": "string",
    "x": "string"
  }
}

Rules:
- Write in a practical, credible InteropMed voice.
- Use plain paragraphs separated by blank lines in content.
- Do not use markdown headings in content.
- Keep the article between 700 and 1,000 words.
- Keep x under 260 characters before the URL is appended.
- Do not invent statistics, customer names, or regulatory claims.

Topic: ${topic}
Audience: ${input.audience?.trim() || 'healthcare technology leaders'}
Category: ${input.category?.trim() || 'interoperability'}
Tone: ${input.tone?.trim() || 'strategic and practical'}
`

  const result = await callGemini(getGeminiTextModel(), {
    contents: [
      {
        role: 'user',
        parts: [{ text: prompt }],
      },
    ],
    generationConfig: {
      temperature: 0.7,
      responseMimeType: 'application/json',
    },
  })

  return normalizeDraft(parseJsonObject(getTextFromGemini(result)), topic)
}

function normalizeChatResponse(value: Partial<InsightChatResponse>, fallbackReply: string): InsightChatResponse {
  const topics = Array.isArray(value.topics)
    ? value.topics
        .map((topic) => ({
          title: String(topic.title || '').trim(),
          brief: String(topic.brief || '').trim(),
          category: String(topic.category || 'interoperability').trim(),
          audience: String(topic.audience || 'healthcare technology leaders').trim(),
        }))
        .filter((topic) => topic.title && topic.brief)
    : []
  const generatorBrief = value.generatorBrief
    ? {
        topic: String(value.generatorBrief.topic || '').trim(),
        audience: String(value.generatorBrief.audience || 'healthcare technology leaders').trim(),
        category: String(value.generatorBrief.category || 'interoperability').trim(),
        tone: String(value.generatorBrief.tone || 'strategic and practical').trim(),
      }
    : undefined

  return {
    reply: String(value.reply || fallbackReply || '').trim(),
    topics,
    refinedArticle: value.refinedArticle ? String(value.refinedArticle).trim() : undefined,
    generatorBrief: generatorBrief?.topic ? generatorBrief : undefined,
  }
}

export async function chatWithInsightAgent(input: {
  messages: InsightChatMessage[]
  draft?: string
  context?: string
}) {
  const conversation = input.messages
    .slice(-12)
    .map((message) => `${message.role.toUpperCase()}: ${message.content}`)
    .join('\n\n')
  const prompt = `
You are InteropMed's AI editorial partner for healthcare interoperability insights.

Help the account user decide article topics, sharpen positioning, outline angles, and refine article drafts.

Return only valid JSON with this exact shape:
{
  "reply": "string",
  "topics": [
    {
      "title": "string",
      "brief": "string",
      "category": "string",
      "audience": "string"
    }
  ],
  "refinedArticle": "string or empty string",
  "generatorBrief": {
    "topic": "string",
    "audience": "string",
    "category": "string",
    "tone": "string"
  }
}

Rules:
- When brainstorming, return 3 to 5 practical topic options in topics.
- When refining a draft, preserve the core claim and improve clarity, structure, and executive usefulness.
- Keep reply concise and action-oriented.
- Do not invent customer names, citations, or statistics.
- If there is a clear topic to generate, set generatorBrief.topic to a strong one-paragraph brief.

Optional context:
${input.context?.trim() || 'No extra context provided.'}

Draft to refine:
${input.draft?.trim() || 'No draft provided.'}

Conversation:
${conversation}
`

  const result = await callGemini(getGeminiTextModel(), {
    contents: [
      {
        role: 'user',
        parts: [{ text: prompt }],
      },
    ],
    generationConfig: {
      temperature: 0.65,
      responseMimeType: 'application/json',
    },
  })
  const text = getTextFromGemini(result)

  return normalizeChatResponse(parseChatJsonObject(text), text)
}

function getImagePart(result: GeminiResponse) {
  return result.candidates?.[0]?.content?.parts?.find((part) => {
    const inlineData = part.inlineData || part.inline_data
    return Boolean(inlineData?.data)
  })
}

function extensionForMimeType(mimeType: string) {
  if (mimeType.includes('jpeg') || mimeType.includes('jpg')) {
    return 'jpg'
  }

  if (mimeType.includes('webp')) {
    return 'webp'
  }

  return 'png'
}

export async function generateAndStoreFeaturedImage(prompt: string, slug: string) {
  const result = await callGemini(getGeminiImageModel(), {
    contents: [
      {
        role: 'user',
        parts: [{ text: prompt }],
      },
    ],
    generationConfig: {
      responseModalities: ['TEXT', 'IMAGE'],
      responseFormat: {
        image: {
          aspectRatio: '16:9',
          imageSize: '1K',
        },
      },
    },
  })
  const imagePart = getImagePart(result)
  const inlineData = imagePart?.inlineData || imagePart?.inline_data

  if (!inlineData?.data) {
    throw new Error('Gemini did not return an image')
  }

  const imageData = inlineData as { mimeType?: string; mime_type?: string; data: string }
  const mimeType = imageData.mimeType || imageData.mime_type || 'image/png'
  const extension = extensionForMimeType(mimeType)
  const fileName = `${slugify(slug)}-${Date.now()}.${extension}`
  const relativeUrl = `/generated/insights/${fileName}`
  const outputDir = path.join(process.cwd(), 'public', 'generated', 'insights')

  await mkdir(outputDir, { recursive: true })
  await writeFile(path.join(outputDir, fileName), Buffer.from(imageData.data, 'base64'))

  return {
    url: relativeUrl,
    mimeType,
  }
}
