# InteropMed - Health System Interoperability Platform

A modern Next.js application for managing and exchanging health information across different healthcare systems using industry-standard protocols like FHIR and HL7.

## 🏥 Features

- **Multi-Organization Support**: Manage multiple healthcare organizations and providers
- **Patient Management**: Centralized patient records with comprehensive medical history
- **FHIR & HL7 Integration**: Standards-based health data exchange
- **Medical Records**: Organize and access medical records, documents, and attachments
- **Interoperability**: Connect with external healthcare systems via FHIR APIs, HL7, and Direct Protocol
- **Audit Logging**: Complete audit trail for compliance and security
- **Healthcare Data Models**: 
  - Organizations & Providers
  - Patients & Medical Records
  - Allergies, Medications, Conditions
  - Documents & Attachments
  - System Integrations & Sync Logs

## 🛠️ Tech Stack

- **Framework**: [Next.js 14+](https://nextjs.org) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org)
- **ORM**: [Prisma](https://www.prisma.io)
- **Database**: [Neon PostgreSQL](https://neon.tech)
- **Styling**: [Tailwind CSS](https://tailwindcss.com)
- **Linting**: [ESLint](https://eslint.org)

## 📋 Prerequisites

- Node.js 18.0 or higher
- npm, yarn, pnpm, or bun
- Neon PostgreSQL database (free tier available at [neon.tech](https://neon.tech))

## 🚀 Getting Started

### 1. Clone and Install Dependencies

```bash
cd interopmed
npm install
```

### 2. Set Up Database Connection

1. Create a Neon account at [https://console.neon.tech](https://console.neon.tech)
2. Create a new project and database
3. Copy your connection string from the Neon console
4. Add it to `.env.local`:

```env
DATABASE_URL="postgresql://user:password@host/database"
```

### 3. Initialize the Database

```bash
npx prisma migrate dev --name init
```

This will:
- Create all tables based on the Prisma schema
- Generate the Prisma Client
- (Optional) Seed the database if a seed script exists

### 4. Generate Prisma Client (if needed)

```bash
npx prisma generate
```

### 5. Start Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 📚 Available Scripts

```bash
# Development
npm run dev              # Start development server with hot reload

# Production
npm run build           # Build for production
npm run start           # Run production server

# Database
npx prisma migrate dev --name <migration_name>  # Create and apply migration
npx prisma migrate deploy                       # Apply pending migrations
npx prisma studio                               # Open Prisma Studio (visual DB viewer)
npx prisma generate                             # Regenerate Prisma Client

# Code Quality
npm run lint            # Run ESLint
npm run type-check      # Run TypeScript type checking
```

## 📂 Project Structure

```
interopmed/
├── src/
│   ├── app/
│   │   ├── api/                    # API routes
│   │   │   ├── health/            # Health check endpoint
│   │   │   ├── patients/          # Patient management
│   │   │   ├── providers/         # Healthcare provider management
│   │   │   ├── records/           # Medical records
│   │   │   └── integrations/      # System integrations
│   │   ├── layout.tsx             # Root layout
│   │   └── page.tsx               # Home page
│   ├── components/                 # Reusable React components
│   ├── lib/
│   │   ├── prisma.ts              # Prisma Client singleton
│   │   └── db.ts                  # Database utility functions
│   └── types/
│       └── index.ts               # TypeScript type definitions
├── prisma/
│   ├── schema.prisma              # Prisma ORM schema
│   └── migrations/                # Database migrations
├── .env.local                     # Environment variables
├── next.config.ts                 # Next.js configuration
├── tailwind.config.ts             # Tailwind CSS configuration
└── tsconfig.json                  # TypeScript configuration
```

## 🔌 API Endpoints

### Health Check
- `GET /api/health` - Health check and database connection test

### Patients
- `GET /api/patients?organizationId=xxx&page=1&limit=20` - List patients
- `POST /api/patients` - Create new patient
- `GET /api/patients/:id` - Get patient details
- `PUT /api/patients/:id` - Update patient

### Medical Records
- `GET /api/records` - List medical records
- `POST /api/records` - Create medical record
- `GET /api/records/:id` - Get medical record details
- `PUT /api/records/:id` - Update medical record
- `GET /api/records/patient/:patientId` - Get records for patient

## 📊 Database Schema

### Core Models

**Organization**
- Healthcare organization (hospital, clinic, health system)
- NPI and EIN identifiers
- FHIR endpoint and HL7 version support

**Patient**
- Patient demographics
- MRN (Medical Record Number)
- Contact and insurance information
- Relationships to records and documents

**HealthcareProvider**
- Provider information
- NPI and license details
- Specialties and organization affiliation

**MedicalRecord**
- Visit information
- Diagnosis and treatment
- FHIR resource support
- Links to provider notes and documents

**Document**
- Attachments and file references
- FHIR DocumentReference support
- Lab reports, imaging, prescriptions, summaries

**Supporting Models**
- `Allergy` - Patient allergies
- `Medication` - Current medications
- `Condition` - Chronic/active conditions
- `ProviderNote` - Clinical notes
- `SystemIntegration` - External system connections
- `SyncLog` - Data synchronization history
- `AuditLog` - Compliance and security logging

## 🔐 Environment Variables

Create a `.env.local` file with:

```env
# Database
DATABASE_URL="postgresql://user:password@host/database"

# FHIR Configuration (optional)
FHIR_SERVER_URL="https://your-fhir-server.com/fhir"

# API Configuration
NEXT_PUBLIC_API_URL="http://localhost:3000/api"

# Logging
LOG_LEVEL="info"
```

## 🔄 Database Migrations

### Create a Migration

```bash
npx prisma migrate dev --name add_new_feature
```

### View Migration Status

```bash
npx prisma migrate status
```

### Rollback (Development Only)

```bash
npx prisma migrate resolve --rolled-back <migration_name>
```

## 🌐 Interoperability Features

InteropMed supports industry-standard health data exchange protocols:

### FHIR (Fast Healthcare Interoperability Resources)
- RESTful API endpoints
- FHIR resource types: Patient, Encounter, Condition, Medication, etc.
- CDA/C-CDA document support

### HL7 v2
- ADT (Admission, Discharge, Transfer) messages
- ORM (Order Management) messages
- ORU (Observation Result) messages

### Direct Protocol
- Secure email-like messaging for PHI
- Direct address support for providers

### System Integration
- Real-time or scheduled data synchronization
- OAuth2 and API key authentication
- Comprehensive sync logging

## 🧪 Testing

```bash
# Run tests (when configured)
npm run test

# Run tests in watch mode
npm run test:watch
```

## 🚢 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Connect repository to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy automatically on push

### Other Platforms

1. Build the project: `npm run build`
2. Set environment variables on your hosting platform
3. Run migrations: `npx prisma migrate deploy`
4. Start production server: `npm run start`

## 📖 Documentation

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Neon Documentation](https://neon.tech/docs)
- [FHIR Specification](https://www.hl7.org/fhir)
- [HL7 v2 Specification](https://www.hl7.org/implement/standards/product_brief.cfm?product_id=185)

## 🤝 Contributing

1. Create a feature branch: `git checkout -b feature/your-feature`
2. Commit changes: `git commit -m "Add your feature"`
3. Push to branch: `git push origin feature/your-feature`
4. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For issues and questions:
1. Check existing GitHub Issues
2. Create a new issue with detailed description
3. Contact support at support@interopmed.com

## 🗺️ Roadmap

- [ ] User authentication and authorization
- [ ] FHIR API endpoints
- [ ] HL7 v2 message processing
- [ ] Direct Protocol integration
- [ ] Advanced search and filtering
- [ ] Data analytics dashboard
- [ ] Mobile app
- [ ] Real-time notifications
- [ ] Advanced interoperability workflows

---

**InteropMed** - Advancing Health Data Interoperability
