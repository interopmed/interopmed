# InteropMed: Interoperability Standards Platform

B2B platform for interoperability standards development, libraries, documentation, and partnerships.

## Project Stack
- **Frontend/Framework**: Next.js 16+ with App Router & TypeScript
- **Styling**: Tailwind CSS
- **Database**: Neon PostgreSQL
- **ORM**: Prisma 7 with PrismaPg adapter
- **API**: REST API with Next.js Route Handlers

## ✅ Database Schema - Redesigned for B2B

### Company & Organization
- **Company** - Main organization profile
- **Department** - Company departments with hierarchy
- **Team** - Teams within departments
- **Employee** - Team members, roles, skills
- **TeamMember** - Team assignments and allocation

### Standards & Specifications
- **Standard** - FHIR, HL7 v2, HL7 v3, Direct, DICOM, CDA, etc.
- **StandardVersion** - Version tracking (R4, v2.5, etc.)
- **ImplementationGuide** - Guides for implementing standards

### Products & Services
- **Product** - Libraries, SDKs, tools, APIs, frameworks
- **Feature** - Product features
- **UseCase** - Real-world solutions and applications
- **Testimonial** - Customer feedback and success stories

### Documentation & Content
- **Documentation** - API docs, guides, tutorials, FAQs
- **Article** - Blog posts, whitepapers, case studies, research
- **ArticleComment** - Community engagement

### Partnerships
- **Partnership** - Vendor, reseller, integrator, standards body relationships

### System
- **AuditLog** - Track changes and actions

## 🔧 Development Commands

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run type-check` - TypeScript validation
- `npx prisma studio` - Visual database explorer
- `npx prisma migrate dev --name <name>` - Create migration

## 📂 API Endpoints (To Build)

**Company**
- `GET /api/company` - Company profile
- `GET /api/departments` - Department listing
- `GET /api/employees` - Employee directory

**Standards**
- `GET /api/standards` - List all standards
- `GET /api/standards/:id/versions` - Standard versions
- `GET /api/standards/:id/implementation-guide` - Implementation guides

**Products**
- `GET /api/products` - Product catalog
- `GET /api/products/:id/features` - Product features
- `GET /api/products/:id/use-cases` - Real-world examples

**Documentation**
- `GET /api/documentation` - Search docs
- `GET /api/documentation/:slug` - Read doc
- `GET /api/articles` - Blog articles

**Content**
- `GET /api/articles` - List articles
- `POST /api/articles/:id/comments` - Add comment

## Database Models Summary

Total: 23 models focused on B2B SaaS operations

- Company structure: 5 models
- Standards: 3 models  
- Products: 2 models
- Use cases: 2 models
- Documentation: 3 models
- Content: 2 models
- Partnerships: 1 model
- System: 1 model

## 🚀 Next Steps

1. Reset database with new schema:
   ```bash
   npx prisma migrate reset
   ```

2. Seed with sample data (optional):
   ```bash
   npx prisma db seed
   ```

3. Build API routes for each domain

4. Create frontend pages/components

---

**Status**: ✅ Schema redesigned for B2B standards company

