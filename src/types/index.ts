/**
 * API Response Types
 */
export interface ApiResponse<T = unknown> {
  success: boolean
  data?: T
  error?: string
  timestamp: string
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}

/**
 * Company & Organization Types
 */
export interface CompanyDTO {
  id: string
  name: string
  slug: string
  description?: string
  website?: string
  email?: string
  founded?: number
  headcount?: number
  createdAt: string
  updatedAt: string
}

export interface EmployeeDTO {
  id: string
  firstName: string
  lastName: string
  email: string
  title: string
  employeeId: string
  departmentId: string
  role: string
  status: string
  skills: string[]
}

/**
 * Products & Services Types
 */
export interface ProductDTO {
  id: string
  name: string
  slug: string
  description?: string
  type: string
  category: string
  version: string
  status: string
  repositoryUrl?: string
  packageName?: string
  license?: string
  companyId: string
  createdAt: string
  updatedAt: string
}

export interface FeatureDTO {
  id: string
  productId: string
  name: string
  description?: string
}

/**
 * Standards & Specifications Types
 */
export interface StandardDTO {
  id: string
  name: string
  slug: string
  description?: string
  standardBody?: string
  category: string
  companyId: string
  createdAt: string
  updatedAt: string
}

export interface StandardVersionDTO {
  id: string
  standardId: string
  version: string
  releaseDate?: string
  status: string
  documentation?: string
}

export interface ImplementationGuideDTO {
  id: string
  title: string
  slug: string
  description?: string
  standardVersionId: string
  productId?: string
  status: string
  version: string
  downloadUrl?: string
}

/**
 * Content & Articles Types
 */
export interface ArticleDTO {
  id: string
  title: string
  slug: string
  excerpt?: string
  type: string
  category: string
  status: string
  authorId: string
  companyId: string
  viewCount: number
  likes: number
  createdAt: string
  publishedAt?: string
  updatedAt: string
}

export interface DocumentationDTO {
  id: string
  title: string
  slug: string
  type: string
  category: string
  status: string
  version: string
  companyId: string
  authorId: string
  viewCount: number
  createdAt: string
  publishedAt?: string
  updatedAt: string
}

/**
 * Use Cases & Solutions Types
 */
export interface UseCaseDTO {
  id: string
  title: string
  slug: string
  description?: string
  industry?: string
  problem?: string
  solution?: string
  outcome?: string
  status: string
  companyId: string
  createdAt: string
  updatedAt: string
}

export interface TestimonialDTO {
  id: string
  useCaseId: string
  authorName: string
  authorTitle?: string
  authorCompany?: string
  quote: string
  rating?: number
  createdAt: string
  updatedAt: string
}

/**
 * Partnerships Types
 */
export interface PartnershipDTO {
  id: string
  name: string
  slug: string
  partnerName: string
  partnerType: string
  type: string[]
  status: string
  contactName?: string
  contactEmail?: string
  companyId: string
  createdAt: string
  updatedAt: string
}

/**
 * Error Types
 */
export class ApiError extends Error {
  constructor(
    public statusCode: number,
    message: string
  ) {
    super(message)
    this.name = 'ApiError'
  }
}
