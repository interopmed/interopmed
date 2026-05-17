export type SocialPlatform = 'linkedin' | 'x'

export type SocialPostResult = {
  platform: SocialPlatform
  status: 'posted' | 'skipped' | 'failed'
  id?: string
  error?: string
}

function appendUrl(text: string, url: string, maxLength?: number) {
  const trimmed = text.trim()
  const suffix = url ? `\n\n${url}` : ''

  if (!maxLength || trimmed.length + suffix.length <= maxLength) {
    return `${trimmed}${suffix}`
  }

  return `${trimmed.slice(0, Math.max(0, maxLength - suffix.length - 3)).trim()}...${suffix}`
}

async function postToLinkedIn(text: string) {
  const token = process.env.LINKEDIN_ACCESS_TOKEN
  const author = process.env.LINKEDIN_AUTHOR_URN

  if (!token || !author) {
    return {
      platform: 'linkedin',
      status: 'skipped',
      error: 'LINKEDIN_ACCESS_TOKEN and LINKEDIN_AUTHOR_URN are required',
    } satisfies SocialPostResult
  }

  const response = await fetch('https://api.linkedin.com/rest/posts', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      'Linkedin-Version': process.env.LINKEDIN_API_VERSION || '202601',
      'X-Restli-Protocol-Version': '2.0.0',
    },
    body: JSON.stringify({
      author,
      commentary: text,
      visibility: 'PUBLIC',
      distribution: {
        feedDistribution: 'MAIN_FEED',
        targetEntities: [],
        thirdPartyDistributionChannels: [],
      },
      lifecycleState: 'PUBLISHED',
      isReshareDisabledByAuthor: false,
    }),
  })

  if (!response.ok) {
    return {
      platform: 'linkedin',
      status: 'failed',
      error: await response.text(),
    } satisfies SocialPostResult
  }

  return {
    platform: 'linkedin',
    status: 'posted',
    id: response.headers.get('x-restli-id') || undefined,
  } satisfies SocialPostResult
}

async function postToX(text: string) {
  const token = process.env.X_ACCESS_TOKEN || process.env.TWITTER_ACCESS_TOKEN

  if (!token) {
    return {
      platform: 'x',
      status: 'skipped',
      error: 'X_ACCESS_TOKEN is required',
    } satisfies SocialPostResult
  }

  const response = await fetch('https://api.x.com/2/tweets', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ text }),
  })
  const result = (await response.json().catch(() => ({}))) as {
    data?: { id?: string }
    detail?: string
    errors?: { detail?: string; title?: string }[]
  }

  if (!response.ok) {
    return {
      platform: 'x',
      status: 'failed',
      error: result.detail || result.errors?.[0]?.detail || result.errors?.[0]?.title || 'X post failed',
    } satisfies SocialPostResult
  }

  return {
    platform: 'x',
    status: 'posted',
    id: result.data?.id,
  } satisfies SocialPostResult
}

export async function publishSocialPosts(input: {
  platforms: SocialPlatform[]
  url: string
  posts: {
    linkedin: string
    x: string
  }
}) {
  const uniquePlatforms = [...new Set(input.platforms)]
  const results: SocialPostResult[] = []

  for (const platform of uniquePlatforms) {
    if (platform === 'linkedin') {
      results.push(await postToLinkedIn(appendUrl(input.posts.linkedin, input.url)))
    }

    if (platform === 'x') {
      results.push(await postToX(appendUrl(input.posts.x, input.url, 280)))
    }
  }

  return results
}
