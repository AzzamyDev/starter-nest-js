# Starter NestJS

<p align="center">
  <a href="https://nestjs.com/"><img src="https://img.shields.io/badge/Nest.js-11-E0234E?style=flat&logo=nestjs" alt="Nest.js"></a>
  <a href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/TypeScript-5.9-3178C6?style=flat&logo=typescript" alt="TypeScript"></a>
  <a href="https://www.prisma.io/"><img src="https://img.shields.io/badge/Prisma-7-2D3748?style=flat&logo=prisma" alt="Prisma"></a>
  <a href="https://www.mysql.com/"><img src="https://img.shields.io/badge/MySQL-8-4479A1?style=flat&logo=mysql" alt="MySQL"></a>
  <a href="https://www.postgresql.org/"><img src="https://img.shields.io/badge/PostgreSQL-16-336791?style=flat&logo=postgresql" alt="PostgreSQL"></a>
</p>

Boilerplate NestJS dengan Prisma (MySQL), validasi Zod, dan struktur feature-based.

## Tech Stack

- **NestJS 11** – Backend framework
- **Prisma 7** – ORM (MySQL / MariaDB)
- **nestjs-zod** – Validasi & serialisasi DTO
- **TypeScript 5.9**

## Struktur Proyek

```
src/
├── config/           # Konfigurasi global
│   ├── prisma/       # PrismaModule & PrismaService
│   └── exception/    # Global exception filters
├── features/         # Modul fitur (per domain)
│   └── users/        # Contoh: Users CRUD
├── helpers/          # Utility
├── app.module.ts
└── main.ts
prisma/
├── schema.prisma
├── seed.ts
└── migrations/
```

## Prasyarat

- Node.js LTS
- MySQL atau MariaDB
- npm / yarn / pnpm

## Instalasi

1. Clone & masuk direktori:

```bash
git clone <repo-url> starter-nest-js
cd starter-nest-js
```

2. Install dependency:

```bash
yarn install
# atau: npm install / pnpm install
```

3. Environment:

```bash
cp .env.example .env
```

Edit `.env`:

```env
PORT=3000
DATABASE_URL="mysql://user:password@127.0.0.1:3306/nama_database"
SECRET="rahasia"
```

4. Database:

```bash
npx prisma generate
npx prisma migrate dev
# optional: npx ts-node prisma/seed.ts
```

5. Jalankan:

```bash
yarn start:dev
```

API: `http://localhost:3000/api`

## Scripts

| Script | Deskripsi |
|--------|-----------|
| `yarn start:dev` | Dev server (watch) |
| `yarn start:prod` | Production (setelah build) |
| `yarn build` | Build ke `dist/` |
| `yarn lint` | ESLint |
| `yarn test` | Unit test |
| `yarn test:e2e` | E2E test |

## Prisma

```bash
npx prisma generate    # Generate client (setelah ubah schema)
npx prisma migrate dev # Buat & jalankan migration
npx prisma studio      # GUI database
```

## Pakai PostgreSQL

Default pakai MySQL. Untuk ganti ke PostgreSQL:

**1. `prisma/schema.prisma`** — ubah provider:

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

**2. `.env`** — format connection string:

```env
DATABASE_URL="postgresql://user:password@127.0.0.1:5432/nama_database"
```

**3. Install adapter Postgres:**

```bash
yarn add @prisma/adapter-pg
# uninstall adapter MySQL jika tidak dipakai:
yarn remove @prisma/adapter-mariadb
```

**4. `src/config/prisma/prisma.service.ts`** — pakai adapter pg:

```ts
import 'dotenv/config'
import { Injectable } from '@nestjs/common'
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '@prisma/generated/client'

@Injectable()
export class PrismaService extends PrismaClient {
    constructor() {
        const url = process.env.DATABASE_URL
        if (!url) throw new Error('DATABASE_URL is not set')
        super({
            adapter: new PrismaPg({ connectionString: url }),
        })
    }
}
```

**5. `prisma/seed.ts`** — pakai adapter pg:

```ts
import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from './generated/client';

const prisma = new PrismaClient({
    adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL ?? '' }),
});
// ... rest sama
```

**6. Migration baru** (karena ganti DB):

```bash
rm -rf prisma/migrations   # hapus migration lama
npx prisma migrate dev --name init
```

## Menambah Fitur Baru

1. Buat folder di `src/features/<nama>/`
2. Tambahkan: `*.module.ts`, `*.controller.ts`, `*.service.ts`, `dto/`
3. Import module di `app.module.ts`

Contoh referensi: `src/features/users/`

## License

MIT
