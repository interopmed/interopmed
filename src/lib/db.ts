import { prisma } from './prisma'

/**
 * Database utility functions for InteropMed
 * B2B Interoperability Standards Platform
 */

export const db = {
  prisma,

  // Company queries
  company: {
    findBySlug: (slug: string) =>
      prisma.company.findUnique({
        where: { slug },
        include: {
          departments: true,
          employees: true,
          products: true,
          standards: true,
        },
      }),
    
    findById: (id: string) =>
      prisma.company.findUnique({
        where: { id },
        include: {
          departments: true,
          products: { take: 10 },
          standards: { take: 10 },
          articles: { take: 5, orderBy: { publishedAt: 'desc' } },
        },
      }),
  },

  // Product queries
  product: {
    findBySlug: (slug: string) =>
      prisma.product.findUnique({
        where: { slug },
        include: {
          features: true,
          useCases: true,
          company: true,
        },
      }),
    
    findById: (id: string) =>
      prisma.product.findUnique({
        where: { id },
        include: {
          features: true,
          useCases: true,
          company: true,
        },
      }),

    findByCompany: (companyId: string) =>
      prisma.product.findMany({
        where: { companyId, status: 'active' },
        include: {
          features: true,
          useCases: true,
        },
        orderBy: { createdAt: 'desc' },
      }),
  },

  // Standard queries
  standard: {
    findBySlug: (slug: string) =>
      prisma.standard.findUnique({
        where: { slug },
        include: {
          versions: true,
          products: true,
        },
      }),
    
    findByCompany: (companyId: string) =>
      prisma.standard.findMany({
        where: { companyId },
        include: {
          versions: true,
          products: true,
        },
        orderBy: { createdAt: 'desc' },
      }),
  },

  // Article queries
  article: {
    findBySlug: (slug: string) =>
      prisma.article.findUnique({
        where: { slug },
        include: {
          author: true,
          comments: true,
        },
      }),
    
    findByCompany: (companyId: string) =>
      prisma.article.findMany({
        where: { companyId, status: 'published' },
        include: {
          author: true,
        },
        orderBy: { publishedAt: 'desc' },
      }),
  },

  // Documentation queries
  documentation: {
    findBySlug: (slug: string) =>
      prisma.documentation.findUnique({
        where: { slug },
        include: {
          author: true,
          childDocs: true,
        },
      }),
  },

  // Employee queries
  employee: {
    findByEmail: (email: string) =>
      prisma.employee.findUnique({
        where: { email },
        include: {
          department: true,
          company: true,
          teamMemberships: { include: { team: true } },
        },
      }),
    
    findByCompany: (companyId: string) =>
      prisma.employee.findMany({
        where: { companyId, status: 'active' },
        include: {
          department: true,
          teamMemberships: true,
        },
      }),
  },

  // Partnership queries
  partnership: {
    findBySlug: (slug: string) =>
      prisma.partnership.findUnique({
        where: { slug },
      }),
    
    findByCompany: (companyId: string) =>
      prisma.partnership.findMany({
        where: { companyId, status: 'active' },
        orderBy: { createdAt: 'desc' },
      }),
  },

  // UseCase queries
  useCase: {
    findBySlug: (slug: string) =>
      prisma.useCase.findUnique({
        where: { slug },
        include: {
          testimonials: true,
          products: true,
        },
      }),
    
    findByCompany: (companyId: string) =>
      prisma.useCase.findMany({
        where: { companyId, status: 'published' },
        include: {
          testimonials: true,
          products: true,
        },
      }),
  },
}

export { prisma }
