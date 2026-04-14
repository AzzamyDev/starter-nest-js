# Project Rules

Cursor rules tersedia di `.cursor/rules/`:

| Rule | Scope | Deskripsi |
|------|-------|-----------|
| `nestjs-project-structure.mdc` | Always apply | Folder structure, naming, import conventions |
| `nestjs-feature-module.mdc` | `src/features/**/*.ts` | Feature module pattern: controller, service, DTO, module + Zod validation |
| `nestjs-config-layer.mdc` | `src/config/**/*.ts` | Config layer: env via configuration.ts, Prisma setup, exception filter, global pipes |
