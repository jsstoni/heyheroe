/**
 * Client
 */

import * as path from 'node:path';
import * as process from 'node:process';
import { fileURLToPath } from 'node:url';
import * as runtime from '@prisma/client/runtime/library';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export type PrismaPromise<T> = runtime.Types.Public.PrismaPromise<T>;

/**
 * Model Budget
 *
 */
export type Budget =
  runtime.Types.Result.DefaultSelection<Prisma.$BudgetPayload>;
/**
 * Model Proposal
 *
 */
export type Proposal =
  runtime.Types.Result.DefaultSelection<Prisma.$ProposalPayload>;
/**
 * Model Services
 *
 */
export type Services =
  runtime.Types.Result.DefaultSelection<Prisma.$ServicesPayload>;
/**
 * Model SubServices
 *
 */
export type SubServices =
  runtime.Types.Result.DefaultSelection<Prisma.$SubServicesPayload>;
/**
 * Model User
 *
 */
export type User = runtime.Types.Result.DefaultSelection<Prisma.$UserPayload>;
/**
 * Model Session
 *
 */
export type Session =
  runtime.Types.Result.DefaultSelection<Prisma.$SessionPayload>;
/**
 * Model Account
 *
 */
export type Account =
  runtime.Types.Result.DefaultSelection<Prisma.$AccountPayload>;
/**
 * Model Verification
 *
 */
export type Verification =
  runtime.Types.Result.DefaultSelection<Prisma.$VerificationPayload>;

/**
 * Enums
 */
export namespace $Enums {
  export const ProposalHome = {
    Casa: 'Casa',
    Departamento: 'Departamento',
  } as const;

  export type ProposalHome = (typeof ProposalHome)[keyof typeof ProposalHome];
}

export type ProposalHome = $Enums.ProposalHome;

export const ProposalHome = $Enums.ProposalHome;

/**
 * Create the Client
 */
const config: runtime.GetPrismaClientConfig = {
  generator: {
    name: 'client',
    provider: {
      fromEnvVar: null,
      value: 'prisma-client',
    },
    output: {
      value: '/home/bannednull/heyheroe/src/lib/prisma/generated',
      fromEnvVar: null,
    },
    config: {
      moduleFormat: 'esm',
      engineType: 'library',
    },
    binaryTargets: [
      {
        fromEnvVar: null,
        value: 'debian-openssl-3.0.x',
        native: true,
      },
    ],
    previewFeatures: ['prismaSchemaFolder'],
    sourceFilePath: '/home/bannednull/heyheroe/prisma/schema/schema.prisma',
    isCustomOutput: true,
  },
  relativePath: '../../../../prisma/schema',
  clientVersion: '6.6.0',
  engineVersion: 'f676762280b54cd07c770017ed3711ddde35f37a',
  datasourceNames: ['db'],
  activeProvider: 'postgresql',
  inlineDatasources: {
    db: {
      url: {
        fromEnvVar: 'DATABASE_URL',
        value:
          'postgresql://neondb_owner:npg_duULhx4eEM6c@ep-odd-band-ad928lyi-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require',
      },
    },
  },
  inlineSchema:
    'model Budget {\n  id         Int      @id @default(autoincrement())\n  userId     String   @map("user_id")\n  proposalId Int      @map("proposal_id")\n  details    String   @db.Text\n  budget     Decimal\n  createdAt  DateTime @default(now()) @map("created_at")\n  updatedAt  DateTime @updatedAt @map("updated_at")\n\n  user     User     @relation(fields: [userId], references: [id], onDelete: Cascade)\n  proposal Proposal @relation(fields: [proposalId], references: [id], onDelete: Cascade)\n\n  @@map("budget")\n}\n\nenum ProposalHome {\n  Casa\n  Departamento\n}\n\nmodel Proposal {\n  id          Int          @id @default(autoincrement())\n  userId      String       @map("user_id")\n  serviceId   Int          @map("service_id") // sub-service id\n  type        ProposalHome @default(Casa)\n  commune     Int\n  address     String       @db.Text\n  serviceDate DateTime     @map("service_date")\n  description String       @db.Text\n  active      Boolean      @default(true)\n  createdAt   DateTime     @default(now()) @map("created_at")\n  updatedAt   DateTime     @updatedAt @map("updated_at")\n\n  user        User        @relation(fields: [userId], references: [id], onDelete: Cascade)\n  subServices SubServices @relation(fields: [serviceId], references: [id], onDelete: Cascade)\n\n  budget Budget[]\n\n  @@index([commune])\n  @@index([createdAt])\n  @@map("proposals")\n}\n\ngenerator client {\n  provider        = "prisma-client"\n  output          = "../../src/lib/prisma/generated"\n  moduleFormat    = "esm"\n  previewFeatures = ["prismaSchemaFolder"]\n}\n\ndatasource db {\n  provider = "postgresql"\n  url      = env("DATABASE_URL")\n}\n\nmodel Services {\n  id          Int      @id @default(autoincrement())\n  name        String\n  description String\n  slug        String   @unique\n  icon        String\n  active      Boolean  @default(true)\n  createdAt   DateTime @default(now()) @map("created_at")\n  updatedAt   DateTime @updatedAt @map("updated_at")\n\n  subServices SubServices[]\n\n  @@map("services")\n}\n\nmodel SubServices {\n  id          Int      @id @default(autoincrement())\n  idService   Int      @map("id_service")\n  name        String\n  description String\n  active      Boolean  @default(true)\n  createdAt   DateTime @default(now()) @map("created_at")\n  updatedAt   DateTime @updatedAt @map("updated_at")\n\n  service Services @relation(fields: [idService], references: [id], onDelete: Cascade)\n\n  proposal Proposal[]\n\n  @@map("sub_services")\n}\n\nmodel User {\n  id            String   @id\n  name          String\n  email         String\n  phone         String?\n  emailVerified Boolean  @map("email_verified")\n  image         String?\n  createdAt     DateTime @map("created_at")\n  updatedAt     DateTime @map("updated_at")\n\n  sessions Session[]\n  accounts Account[]\n  proposal Proposal[]\n  budget   Budget[]\n\n  @@unique([email])\n  @@map("user")\n}\n\nmodel Session {\n  id        String   @id\n  expiresAt DateTime @map("expires_at")\n  token     String\n  ipAddress String?  @map("ip_address")\n  userAgent String?  @map("user_agent")\n  userId    String   @map("user_id")\n  createdAt DateTime @map("created_at")\n  updatedAt DateTime @map("updated_at")\n\n  user User @relation(fields: [userId], references: [id], onDelete: Cascade)\n\n  @@unique([token])\n  @@map("session")\n}\n\nmodel Account {\n  id                    String    @id\n  accountId             String    @map("account_id")\n  providerId            String    @map("provider_id")\n  userId                String    @map("user_id")\n  accessToken           String?   @map("access_token")\n  refreshToken          String?   @map("refresh_token")\n  idToken               String?   @map("id_token")\n  accessTokenExpiresAt  DateTime? @map("access_token_expires_at")\n  refreshTokenExpiresAt DateTime? @map("refresh_token_expires_at")\n  scope                 String?\n  password              String?\n  createdAt             DateTime  @map("created_at")\n  updatedAt             DateTime  @map("updated_at")\n\n  user User @relation(fields: [userId], references: [id], onDelete: Cascade)\n\n  @@map("account")\n}\n\nmodel Verification {\n  id         String    @id\n  identifier String\n  value      String\n  expiresAt  DateTime  @map("expires_at")\n  createdAt  DateTime? @map("created_at")\n  updatedAt  DateTime? @map("updated_at")\n\n  @@map("verification")\n}\n',
  inlineSchemaHash:
    '7faa13d7dbc0b5bd13d3296e1de4fea68ed127893bfc57706b196f692e6dfbad',
  copyEngine: true,
  runtimeDataModel: {
    models: {},
    enums: {},
    types: {},
  },
  dirname: '',
};
config.dirname = __dirname;

config.runtimeDataModel = JSON.parse(
  '{"models":{"Budget":{"dbName":"budget","schema":null,"fields":[{"name":"id","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":true,"isReadOnly":false,"hasDefaultValue":true,"type":"Int","nativeType":null,"default":{"name":"autoincrement","args":[]},"isGenerated":false,"isUpdatedAt":false},{"name":"userId","dbName":"user_id","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":true,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"proposalId","dbName":"proposal_id","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":true,"hasDefaultValue":false,"type":"Int","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"details","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":["Text",[]],"isGenerated":false,"isUpdatedAt":false},{"name":"budget","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Decimal","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"createdAt","dbName":"created_at","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"DateTime","nativeType":null,"default":{"name":"now","args":[]},"isGenerated":false,"isUpdatedAt":false},{"name":"updatedAt","dbName":"updated_at","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"DateTime","nativeType":null,"isGenerated":false,"isUpdatedAt":true},{"name":"user","kind":"object","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"User","nativeType":null,"relationName":"BudgetToUser","relationFromFields":["userId"],"relationToFields":["id"],"relationOnDelete":"Cascade","isGenerated":false,"isUpdatedAt":false},{"name":"proposal","kind":"object","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Proposal","nativeType":null,"relationName":"BudgetToProposal","relationFromFields":["proposalId"],"relationToFields":["id"],"relationOnDelete":"Cascade","isGenerated":false,"isUpdatedAt":false}],"primaryKey":null,"uniqueFields":[],"uniqueIndexes":[],"isGenerated":false},"Proposal":{"dbName":"proposals","schema":null,"fields":[{"name":"id","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":true,"isReadOnly":false,"hasDefaultValue":true,"type":"Int","nativeType":null,"default":{"name":"autoincrement","args":[]},"isGenerated":false,"isUpdatedAt":false},{"name":"userId","dbName":"user_id","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":true,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"serviceId","dbName":"service_id","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":true,"hasDefaultValue":false,"type":"Int","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"type","kind":"enum","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"ProposalHome","nativeType":null,"default":"Casa","isGenerated":false,"isUpdatedAt":false},{"name":"commune","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Int","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"address","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":["Text",[]],"isGenerated":false,"isUpdatedAt":false},{"name":"serviceDate","dbName":"service_date","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"DateTime","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"description","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":["Text",[]],"isGenerated":false,"isUpdatedAt":false},{"name":"active","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"Boolean","nativeType":null,"default":true,"isGenerated":false,"isUpdatedAt":false},{"name":"createdAt","dbName":"created_at","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"DateTime","nativeType":null,"default":{"name":"now","args":[]},"isGenerated":false,"isUpdatedAt":false},{"name":"updatedAt","dbName":"updated_at","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"DateTime","nativeType":null,"isGenerated":false,"isUpdatedAt":true},{"name":"user","kind":"object","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"User","nativeType":null,"relationName":"ProposalToUser","relationFromFields":["userId"],"relationToFields":["id"],"relationOnDelete":"Cascade","isGenerated":false,"isUpdatedAt":false},{"name":"subServices","kind":"object","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"SubServices","nativeType":null,"relationName":"ProposalToSubServices","relationFromFields":["serviceId"],"relationToFields":["id"],"relationOnDelete":"Cascade","isGenerated":false,"isUpdatedAt":false},{"name":"budget","kind":"object","isList":true,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Budget","nativeType":null,"relationName":"BudgetToProposal","relationFromFields":[],"relationToFields":[],"isGenerated":false,"isUpdatedAt":false}],"primaryKey":null,"uniqueFields":[],"uniqueIndexes":[],"isGenerated":false},"Services":{"dbName":"services","schema":null,"fields":[{"name":"id","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":true,"isReadOnly":false,"hasDefaultValue":true,"type":"Int","nativeType":null,"default":{"name":"autoincrement","args":[]},"isGenerated":false,"isUpdatedAt":false},{"name":"name","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"description","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"slug","kind":"scalar","isList":false,"isRequired":true,"isUnique":true,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"icon","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"active","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"Boolean","nativeType":null,"default":true,"isGenerated":false,"isUpdatedAt":false},{"name":"createdAt","dbName":"created_at","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"DateTime","nativeType":null,"default":{"name":"now","args":[]},"isGenerated":false,"isUpdatedAt":false},{"name":"updatedAt","dbName":"updated_at","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"DateTime","nativeType":null,"isGenerated":false,"isUpdatedAt":true},{"name":"subServices","kind":"object","isList":true,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"SubServices","nativeType":null,"relationName":"ServicesToSubServices","relationFromFields":[],"relationToFields":[],"isGenerated":false,"isUpdatedAt":false}],"primaryKey":null,"uniqueFields":[],"uniqueIndexes":[],"isGenerated":false},"SubServices":{"dbName":"sub_services","schema":null,"fields":[{"name":"id","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":true,"isReadOnly":false,"hasDefaultValue":true,"type":"Int","nativeType":null,"default":{"name":"autoincrement","args":[]},"isGenerated":false,"isUpdatedAt":false},{"name":"idService","dbName":"id_service","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":true,"hasDefaultValue":false,"type":"Int","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"name","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"description","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"active","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"Boolean","nativeType":null,"default":true,"isGenerated":false,"isUpdatedAt":false},{"name":"createdAt","dbName":"created_at","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"DateTime","nativeType":null,"default":{"name":"now","args":[]},"isGenerated":false,"isUpdatedAt":false},{"name":"updatedAt","dbName":"updated_at","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"DateTime","nativeType":null,"isGenerated":false,"isUpdatedAt":true},{"name":"service","kind":"object","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Services","nativeType":null,"relationName":"ServicesToSubServices","relationFromFields":["idService"],"relationToFields":["id"],"relationOnDelete":"Cascade","isGenerated":false,"isUpdatedAt":false},{"name":"proposal","kind":"object","isList":true,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Proposal","nativeType":null,"relationName":"ProposalToSubServices","relationFromFields":[],"relationToFields":[],"isGenerated":false,"isUpdatedAt":false}],"primaryKey":null,"uniqueFields":[],"uniqueIndexes":[],"isGenerated":false},"User":{"dbName":"user","schema":null,"fields":[{"name":"id","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":true,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"name","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"email","kind":"scalar","isList":false,"isRequired":true,"isUnique":true,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"phone","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"emailVerified","dbName":"email_verified","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Boolean","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"image","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"createdAt","dbName":"created_at","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"DateTime","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"updatedAt","dbName":"updated_at","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"DateTime","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"sessions","kind":"object","isList":true,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Session","nativeType":null,"relationName":"SessionToUser","relationFromFields":[],"relationToFields":[],"isGenerated":false,"isUpdatedAt":false},{"name":"accounts","kind":"object","isList":true,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Account","nativeType":null,"relationName":"AccountToUser","relationFromFields":[],"relationToFields":[],"isGenerated":false,"isUpdatedAt":false},{"name":"proposal","kind":"object","isList":true,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Proposal","nativeType":null,"relationName":"ProposalToUser","relationFromFields":[],"relationToFields":[],"isGenerated":false,"isUpdatedAt":false},{"name":"budget","kind":"object","isList":true,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Budget","nativeType":null,"relationName":"BudgetToUser","relationFromFields":[],"relationToFields":[],"isGenerated":false,"isUpdatedAt":false}],"primaryKey":null,"uniqueFields":[["email"]],"uniqueIndexes":[{"name":null,"fields":["email"]}],"isGenerated":false},"Session":{"dbName":"session","schema":null,"fields":[{"name":"id","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":true,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"expiresAt","dbName":"expires_at","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"DateTime","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"token","kind":"scalar","isList":false,"isRequired":true,"isUnique":true,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"ipAddress","dbName":"ip_address","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"userAgent","dbName":"user_agent","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"userId","dbName":"user_id","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":true,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"createdAt","dbName":"created_at","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"DateTime","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"updatedAt","dbName":"updated_at","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"DateTime","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"user","kind":"object","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"User","nativeType":null,"relationName":"SessionToUser","relationFromFields":["userId"],"relationToFields":["id"],"relationOnDelete":"Cascade","isGenerated":false,"isUpdatedAt":false}],"primaryKey":null,"uniqueFields":[["token"]],"uniqueIndexes":[{"name":null,"fields":["token"]}],"isGenerated":false},"Account":{"dbName":"account","schema":null,"fields":[{"name":"id","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":true,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"accountId","dbName":"account_id","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"providerId","dbName":"provider_id","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"userId","dbName":"user_id","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":true,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"accessToken","dbName":"access_token","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"refreshToken","dbName":"refresh_token","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"idToken","dbName":"id_token","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"accessTokenExpiresAt","dbName":"access_token_expires_at","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"DateTime","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"refreshTokenExpiresAt","dbName":"refresh_token_expires_at","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"DateTime","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"scope","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"password","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"createdAt","dbName":"created_at","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"DateTime","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"updatedAt","dbName":"updated_at","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"DateTime","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"user","kind":"object","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"User","nativeType":null,"relationName":"AccountToUser","relationFromFields":["userId"],"relationToFields":["id"],"relationOnDelete":"Cascade","isGenerated":false,"isUpdatedAt":false}],"primaryKey":null,"uniqueFields":[],"uniqueIndexes":[],"isGenerated":false},"Verification":{"dbName":"verification","schema":null,"fields":[{"name":"id","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":true,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"identifier","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"value","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"expiresAt","dbName":"expires_at","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"DateTime","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"createdAt","dbName":"created_at","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"DateTime","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"updatedAt","dbName":"updated_at","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"DateTime","nativeType":null,"isGenerated":false,"isUpdatedAt":false}],"primaryKey":null,"uniqueFields":[],"uniqueIndexes":[],"isGenerated":false}},"enums":{"ProposalHome":{"values":[{"name":"Casa","dbName":null},{"name":"Departamento","dbName":null}],"dbName":null}},"types":{}}'
);
config.engineWasm = undefined;
config.compilerWasm = undefined;

// file annotations for bundling tools to include these files
path.join(__dirname, 'libquery_engine-debian-openssl-3.0.x.so.node');
path.join(
  process.cwd(),
  'src/lib/prisma/generated/libquery_engine-debian-openssl-3.0.x.so.node'
);
// file annotations for bundling tools to include these files
path.join(__dirname, 'schema.prisma');
path.join(process.cwd(), 'src/lib/prisma/generated/schema.prisma');

interface PrismaClientConstructor {
  /**
   * ## Prisma Client
   *
   * Type-safe database client for TypeScript
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Budgets
   * const budgets = await prisma.budget.findMany()
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */
  new <
    ClientOptions extends
      Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
    U = 'log' extends keyof ClientOptions
      ? ClientOptions['log'] extends Array<
          Prisma.LogLevel | Prisma.LogDefinition
        >
        ? Prisma.GetEvents<ClientOptions['log']>
        : never
      : never,
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  >(
    options?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>
  ): PrismaClient<ClientOptions, U, ExtArgs>;
}

/**
 * ## Prisma Client
 *
 * Type-safe database client for TypeScript
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Budgets
 * const budgets = await prisma.budget.findMany()
 * ```
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export interface PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions
    ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition>
      ? Prisma.GetEvents<ClientOptions['log']>
      : never
    : never,
  ExtArgs extends
    runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] };

  $on<V extends U>(
    eventType: V,
    callback: (
      event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent
    ) => void
  ): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): runtime.Types.Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): runtime.Types.Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void;

  /**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<_T = unknown>(
    query: TemplateStringsArray | Prisma.Sql,
    ...values: any[]
  ): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<_T = unknown>(
    query: string,
    ...values: any[]
  ): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(
    query: TemplateStringsArray | Prisma.Sql,
    ...values: any[]
  ): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(
    query: string,
    ...values: any[]
  ): Prisma.PrismaPromise<T>;

  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(
    arg: [...P],
    options?: { isolationLevel?: Prisma.TransactionIsolationLevel }
  ): runtime.Types.Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>;

  $transaction<R>(
    fn: (
      prisma: Omit<PrismaClient, runtime.ITXClientDenyList>
    ) => runtime.Types.Utils.JsPromise<R>,
    options?: {
      maxWait?: number;
      timeout?: number;
      isolationLevel?: Prisma.TransactionIsolationLevel;
    }
  ): runtime.Types.Utils.JsPromise<R>;

  $extends: runtime.Types.Extensions.ExtendsHook<
    'extends',
    Prisma.TypeMapCb<ClientOptions>,
    ExtArgs,
    runtime.Types.Utils.Call<
      Prisma.TypeMapCb<ClientOptions>,
      {
        extArgs: ExtArgs;
      }
    >
  >;

  /**
   * `prisma.budget`: Exposes CRUD operations for the **Budget** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more Budgets
   * const budgets = await prisma.budget.findMany()
   * ```
   */
  get budget(): Prisma.BudgetDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.proposal`: Exposes CRUD operations for the **Proposal** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more Proposals
   * const proposals = await prisma.proposal.findMany()
   * ```
   */
  get proposal(): Prisma.ProposalDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.services`: Exposes CRUD operations for the **Services** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more Services
   * const services = await prisma.services.findMany()
   * ```
   */
  get services(): Prisma.ServicesDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.subServices`: Exposes CRUD operations for the **SubServices** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more SubServices
   * const subServices = await prisma.subServices.findMany()
   * ```
   */
  get subServices(): Prisma.SubServicesDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.session`: Exposes CRUD operations for the **Session** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more Sessions
   * const sessions = await prisma.session.findMany()
   * ```
   */
  get session(): Prisma.SessionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.account`: Exposes CRUD operations for the **Account** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more Accounts
   * const accounts = await prisma.account.findMany()
   * ```
   */
  get account(): Prisma.AccountDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.verification`: Exposes CRUD operations for the **Verification** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more Verifications
   * const verifications = await prisma.verification.findMany()
   * ```
   */
  get verification(): Prisma.VerificationDelegate<ExtArgs, ClientOptions>;
}

export const PrismaClient = runtime.getPrismaClient(
  config
) as unknown as PrismaClientConstructor;

export namespace Prisma {
  export type DMMF = typeof runtime.DMMF;

  export type PrismaPromise<T> = runtime.Types.Public.PrismaPromise<T>;

  /**
   * Validator
   */
  export const validator = runtime.Public.validator;

  /**
   * Prisma Errors
   */

  export const PrismaClientKnownRequestError =
    runtime.PrismaClientKnownRequestError;
  export type PrismaClientKnownRequestError =
    runtime.PrismaClientKnownRequestError;

  export const PrismaClientUnknownRequestError =
    runtime.PrismaClientUnknownRequestError;
  export type PrismaClientUnknownRequestError =
    runtime.PrismaClientUnknownRequestError;

  export const PrismaClientRustPanicError = runtime.PrismaClientRustPanicError;
  export type PrismaClientRustPanicError = runtime.PrismaClientRustPanicError;

  export const PrismaClientInitializationError =
    runtime.PrismaClientInitializationError;
  export type PrismaClientInitializationError =
    runtime.PrismaClientInitializationError;

  export const PrismaClientValidationError =
    runtime.PrismaClientValidationError;
  export type PrismaClientValidationError = runtime.PrismaClientValidationError;

  /**
   * Re-export of sql-template-tag
   */
  export const sql = runtime.sqltag;
  export const empty = runtime.empty;
  export const join = runtime.join;
  export const raw = runtime.raw;
  export const Sql = runtime.Sql;
  export type Sql = runtime.Sql;

  /**
   * Decimal.js
   */
  export const Decimal = runtime.Decimal;
  export type Decimal = runtime.Decimal;

  export type DecimalJsLike = runtime.DecimalJsLike;

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics;
  export type Metric<T> = runtime.Metric<T>;
  export type MetricHistogram = runtime.MetricHistogram;
  export type MetricHistogramBucket = runtime.MetricHistogramBucket;

  /**
   * Extensions
   */
  export type Extension = runtime.Types.Extensions.UserArgs;
  export const getExtensionContext = runtime.Extensions.getExtensionContext;
  export type Args<T, F extends runtime.Operation> = runtime.Types.Public.Args<
    T,
    F
  >;
  export type Payload<
    T,
    F extends runtime.Operation = never,
  > = runtime.Types.Public.Payload<T, F>;
  export type Result<
    T,
    A,
    F extends runtime.Operation,
  > = runtime.Types.Public.Result<T, A, F>;
  export type Exact<A, W> = runtime.Types.Public.Exact<A, W>;

  export type PrismaVersion = {
    client: string;
    engine: string;
  };

  /**
   * Prisma Client JS version: 6.6.0
   * Query Engine version: f676762280b54cd07c770017ed3711ddde35f37a
   */
  export const prismaVersion: PrismaVersion = {
    client: '6.6.0',
    engine: 'f676762280b54cd07c770017ed3711ddde35f37a',
  };

  /**
   * Utility Types
   */

  export type JsonObject = runtime.JsonObject;
  export type JsonArray = runtime.JsonArray;
  export type JsonValue = runtime.JsonValue;
  export type InputJsonObject = runtime.InputJsonObject;
  export type InputJsonArray = runtime.InputJsonArray;
  export type InputJsonValue = runtime.InputJsonValue;

  export const NullTypes = {
    DbNull: runtime.objectEnumValues.classes.DbNull as new (
      secret: never
    ) => typeof runtime.objectEnumValues.instances.DbNull,
    JsonNull: runtime.objectEnumValues.classes.JsonNull as new (
      secret: never
    ) => typeof runtime.objectEnumValues.instances.JsonNull,
    AnyNull: runtime.objectEnumValues.classes.AnyNull as new (
      secret: never
    ) => typeof runtime.objectEnumValues.instances.AnyNull,
  };

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull = runtime.objectEnumValues.instances.DbNull;

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull = runtime.objectEnumValues.instances.JsonNull;

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull = runtime.objectEnumValues.instances.AnyNull;

  type SelectAndInclude = {
    select: any;
    include: any;
  };

  type SelectAndOmit = {
    select: any;
    omit: any;
  };

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
    [P in K]: T[P];
  };

  export type Enumerable<T> = T | Array<T>;

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  } & (T extends SelectAndInclude
    ? 'Please either choose `select` or `include`.'
    : T extends SelectAndOmit
      ? 'Please either choose `select` or `omit`.'
      : {});

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  } & K;

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> = T extends object
    ? U extends object
      ? (Without<T, U> & U) | (Without<U, T> & T)
      : U
    : T;

  /**
   * Is T a Record?
   */
  type IsObject<T> = T extends Array<any>
    ? False
    : T extends Date
      ? False
      : T extends Uint8Array
        ? False
        : T extends bigint
          ? False
          : T extends object
            ? True
            : False;

  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T> = T extends Array<infer U> ? U : T;

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O>; // With K possibilities
    }[K];

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>;

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<
    __Either<O, K>
  >;

  type _Either<O extends object, K extends Key, strict extends Boolean> = {
    1: EitherStrict<O, K>;
    0: EitherLoose<O, K>;
  }[strict];

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1,
  > = O extends unknown ? _Either<O, K, strict> : never;

  export type Union = any;

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K];
  } & {};

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown
      ? (k: U) => void
      : never
  ) extends (k: infer I) => void
    ? I
    : never;

  export type Overwrite<O extends object, O1 extends object> = {
    [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<
    Overwrite<
      U,
      {
        [K in keyof U]-?: At<U, K>;
      }
    >
  >;

  type Key = string | number | symbol;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown
    ? AtStrict<O, K>
    : never;
  export type At<
    O extends object,
    K extends Key,
    strict extends Boolean = 1,
  > = {
    1: AtStrict<O, K>;
    0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A> = A extends Function
    ? A
    : {
        [K in keyof A]: A[K];
      } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  export type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
      ?
          | (K extends keyof O ? { [P in K]: O[P] } & O : O)
          | ({ [P in keyof O as P extends K ? P : never]-?: O[P] } & O)
      : never
  >;

  type _Strict<U, _U = U> = U extends unknown
    ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>>
    : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  export type Boolean = True | False;

  export type True = 1;

  export type False = 0;

  export type Not<B extends Boolean> = {
    0: 1;
    1: 0;
  }[B];

  export type Extends<A1, A2> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
      ? 1
      : 0;

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >;

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0;
      1: 1;
    };
    1: {
      0: 1;
      1: 1;
    };
  }[B1][B2];

  export type Keys<U extends Union> = U extends unknown ? keyof U : never;

  export type GetScalarType<T, O> = O extends object
    ? {
        [P in keyof T]: P extends keyof O ? O[P] : never;
      }
    : never;

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>,
  > = IsObject<T> extends True ? U : T;

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<
            UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never
          >
        : never
      : {} extends FieldPaths<T[K]>
        ? never
        : K;
  }[keyof T];

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never;
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>;
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T;

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<
    T,
    K extends Enumerable<keyof T> | keyof T,
  > = Prisma__Pick<T, MaybeTupleToUnion<K>>;

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}`
    ? never
    : T;

  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>;

  type FieldRefInputType<Model, FieldType> = Model extends never
    ? never
    : FieldRef<Model, FieldType>;

  export const ModelName = {
    Budget: 'Budget',
    Proposal: 'Proposal',
    Services: 'Services',
    SubServices: 'SubServices',
    User: 'User',
    Session: 'Session',
    Account: 'Account',
    Verification: 'Verification',
  } as const;

  export type ModelName = (typeof ModelName)[keyof typeof ModelName];

  export type Datasources = {
    db?: Datasource;
  };

  export interface TypeMapCb<ClientOptions = {}>
    extends runtime.Types.Utils.Fn<
      { extArgs: runtime.Types.Extensions.InternalArgs },
      runtime.Types.Utils.Record<string, any>
    > {
    returns: Prisma.TypeMap<
      this['params']['extArgs'],
      ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}
    >;
  }

  export type TypeMap<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > = {
    globalOmitOptions: {
      omit: GlobalOmitOptions;
    };
    meta: {
      modelProps:
        | 'budget'
        | 'proposal'
        | 'services'
        | 'subServices'
        | 'user'
        | 'session'
        | 'account'
        | 'verification';
      txIsolationLevel: Prisma.TransactionIsolationLevel;
    };
    model: {
      Budget: {
        payload: Prisma.$BudgetPayload<ExtArgs>;
        fields: Prisma.BudgetFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.BudgetFindUniqueArgs<ExtArgs>;
            result: runtime.Types.Utils.PayloadToResult<Prisma.$BudgetPayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.BudgetFindUniqueOrThrowArgs<ExtArgs>;
            result: runtime.Types.Utils.PayloadToResult<Prisma.$BudgetPayload>;
          };
          findFirst: {
            args: Prisma.BudgetFindFirstArgs<ExtArgs>;
            result: runtime.Types.Utils.PayloadToResult<Prisma.$BudgetPayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.BudgetFindFirstOrThrowArgs<ExtArgs>;
            result: runtime.Types.Utils.PayloadToResult<Prisma.$BudgetPayload>;
          };
          findMany: {
            args: Prisma.BudgetFindManyArgs<ExtArgs>;
            result: runtime.Types.Utils.PayloadToResult<Prisma.$BudgetPayload>[];
          };
          create: {
            args: Prisma.BudgetCreateArgs<ExtArgs>;
            result: runtime.Types.Utils.PayloadToResult<Prisma.$BudgetPayload>;
          };
          createMany: {
            args: Prisma.BudgetCreateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          createManyAndReturn: {
            args: Prisma.BudgetCreateManyAndReturnArgs<ExtArgs>;
            result: runtime.Types.Utils.PayloadToResult<Prisma.$BudgetPayload>[];
          };
          delete: {
            args: Prisma.BudgetDeleteArgs<ExtArgs>;
            result: runtime.Types.Utils.PayloadToResult<Prisma.$BudgetPayload>;
          };
          update: {
            args: Prisma.BudgetUpdateArgs<ExtArgs>;
            result: runtime.Types.Utils.PayloadToResult<Prisma.$BudgetPayload>;
          };
          deleteMany: {
            args: Prisma.BudgetDeleteManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateMany: {
            args: Prisma.BudgetUpdateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateManyAndReturn: {
            args: Prisma.BudgetUpdateManyAndReturnArgs<ExtArgs>;
            result: runtime.Types.Utils.PayloadToResult<Prisma.$BudgetPayload>[];
          };
          upsert: {
            args: Prisma.BudgetUpsertArgs<ExtArgs>;
            result: runtime.Types.Utils.PayloadToResult<Prisma.$BudgetPayload>;
          };
          aggregate: {
            args: Prisma.BudgetAggregateArgs<ExtArgs>;
            result: runtime.Types.Utils.Optional<AggregateBudget>;
          };
          groupBy: {
            args: Prisma.BudgetGroupByArgs<ExtArgs>;
            result: runtime.Types.Utils.Optional<BudgetGroupByOutputType>[];
          };
          count: {
            args: Prisma.BudgetCountArgs<ExtArgs>;
            result:
              | runtime.Types.Utils.Optional<BudgetCountAggregateOutputType>
              | number;
          };
        };
      };
      Proposal: {
        payload: Prisma.$ProposalPayload<ExtArgs>;
        fields: Prisma.ProposalFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.ProposalFindUniqueArgs<ExtArgs>;
            result: runtime.Types.Utils.PayloadToResult<Prisma.$ProposalPayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.ProposalFindUniqueOrThrowArgs<ExtArgs>;
            result: runtime.Types.Utils.PayloadToResult<Prisma.$ProposalPayload>;
          };
          findFirst: {
            args: Prisma.ProposalFindFirstArgs<ExtArgs>;
            result: runtime.Types.Utils.PayloadToResult<Prisma.$ProposalPayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.ProposalFindFirstOrThrowArgs<ExtArgs>;
            result: runtime.Types.Utils.PayloadToResult<Prisma.$ProposalPayload>;
          };
          findMany: {
            args: Prisma.ProposalFindManyArgs<ExtArgs>;
            result: runtime.Types.Utils.PayloadToResult<Prisma.$ProposalPayload>[];
          };
          create: {
            args: Prisma.ProposalCreateArgs<ExtArgs>;
            result: runtime.Types.Utils.PayloadToResult<Prisma.$ProposalPayload>;
          };
          createMany: {
            args: Prisma.ProposalCreateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          createManyAndReturn: {
            args: Prisma.ProposalCreateManyAndReturnArgs<ExtArgs>;
            result: runtime.Types.Utils.PayloadToResult<Prisma.$ProposalPayload>[];
          };
          delete: {
            args: Prisma.ProposalDeleteArgs<ExtArgs>;
            result: runtime.Types.Utils.PayloadToResult<Prisma.$ProposalPayload>;
          };
          update: {
            args: Prisma.ProposalUpdateArgs<ExtArgs>;
            result: runtime.Types.Utils.PayloadToResult<Prisma.$ProposalPayload>;
          };
          deleteMany: {
            args: Prisma.ProposalDeleteManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateMany: {
            args: Prisma.ProposalUpdateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateManyAndReturn: {
            args: Prisma.ProposalUpdateManyAndReturnArgs<ExtArgs>;
            result: runtime.Types.Utils.PayloadToResult<Prisma.$ProposalPayload>[];
          };
          upsert: {
            args: Prisma.ProposalUpsertArgs<ExtArgs>;
            result: runtime.Types.Utils.PayloadToResult<Prisma.$ProposalPayload>;
          };
          aggregate: {
            args: Prisma.ProposalAggregateArgs<ExtArgs>;
            result: runtime.Types.Utils.Optional<AggregateProposal>;
          };
          groupBy: {
            args: Prisma.ProposalGroupByArgs<ExtArgs>;
            result: runtime.Types.Utils.Optional<ProposalGroupByOutputType>[];
          };
          count: {
            args: Prisma.ProposalCountArgs<ExtArgs>;
            result:
              | runtime.Types.Utils.Optional<ProposalCountAggregateOutputType>
              | number;
          };
        };
      };
      Services: {
        payload: Prisma.$ServicesPayload<ExtArgs>;
        fields: Prisma.ServicesFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.ServicesFindUniqueArgs<ExtArgs>;
            result: runtime.Types.Utils.PayloadToResult<Prisma.$ServicesPayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.ServicesFindUniqueOrThrowArgs<ExtArgs>;
            result: runtime.Types.Utils.PayloadToResult<Prisma.$ServicesPayload>;
          };
          findFirst: {
            args: Prisma.ServicesFindFirstArgs<ExtArgs>;
            result: runtime.Types.Utils.PayloadToResult<Prisma.$ServicesPayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.ServicesFindFirstOrThrowArgs<ExtArgs>;
            result: runtime.Types.Utils.PayloadToResult<Prisma.$ServicesPayload>;
          };
          findMany: {
            args: Prisma.ServicesFindManyArgs<ExtArgs>;
            result: runtime.Types.Utils.PayloadToResult<Prisma.$ServicesPayload>[];
          };
          create: {
            args: Prisma.ServicesCreateArgs<ExtArgs>;
            result: runtime.Types.Utils.PayloadToResult<Prisma.$ServicesPayload>;
          };
          createMany: {
            args: Prisma.ServicesCreateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          createManyAndReturn: {
            args: Prisma.ServicesCreateManyAndReturnArgs<ExtArgs>;
            result: runtime.Types.Utils.PayloadToResult<Prisma.$ServicesPayload>[];
          };
          delete: {
            args: Prisma.ServicesDeleteArgs<ExtArgs>;
            result: runtime.Types.Utils.PayloadToResult<Prisma.$ServicesPayload>;
          };
          update: {
            args: Prisma.ServicesUpdateArgs<ExtArgs>;
            result: runtime.Types.Utils.PayloadToResult<Prisma.$ServicesPayload>;
          };
          deleteMany: {
            args: Prisma.ServicesDeleteManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateMany: {
            args: Prisma.ServicesUpdateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateManyAndReturn: {
            args: Prisma.ServicesUpdateManyAndReturnArgs<ExtArgs>;
            result: runtime.Types.Utils.PayloadToResult<Prisma.$ServicesPayload>[];
          };
          upsert: {
            args: Prisma.ServicesUpsertArgs<ExtArgs>;
            result: runtime.Types.Utils.PayloadToResult<Prisma.$ServicesPayload>;
          };
          aggregate: {
            args: Prisma.ServicesAggregateArgs<ExtArgs>;
            result: runtime.Types.Utils.Optional<AggregateServices>;
          };
          groupBy: {
            args: Prisma.ServicesGroupByArgs<ExtArgs>;
            result: runtime.Types.Utils.Optional<ServicesGroupByOutputType>[];
          };
          count: {
            args: Prisma.ServicesCountArgs<ExtArgs>;
            result:
              | runtime.Types.Utils.Optional<ServicesCountAggregateOutputType>
              | number;
          };
        };
      };
      SubServices: {
        payload: Prisma.$SubServicesPayload<ExtArgs>;
        fields: Prisma.SubServicesFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.SubServicesFindUniqueArgs<ExtArgs>;
            result: runtime.Types.Utils.PayloadToResult<Prisma.$SubServicesPayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.SubServicesFindUniqueOrThrowArgs<ExtArgs>;
            result: runtime.Types.Utils.PayloadToResult<Prisma.$SubServicesPayload>;
          };
          findFirst: {
            args: Prisma.SubServicesFindFirstArgs<ExtArgs>;
            result: runtime.Types.Utils.PayloadToResult<Prisma.$SubServicesPayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.SubServicesFindFirstOrThrowArgs<ExtArgs>;
            result: runtime.Types.Utils.PayloadToResult<Prisma.$SubServicesPayload>;
          };
          findMany: {
            args: Prisma.SubServicesFindManyArgs<ExtArgs>;
            result: runtime.Types.Utils.PayloadToResult<Prisma.$SubServicesPayload>[];
          };
          create: {
            args: Prisma.SubServicesCreateArgs<ExtArgs>;
            result: runtime.Types.Utils.PayloadToResult<Prisma.$SubServicesPayload>;
          };
          createMany: {
            args: Prisma.SubServicesCreateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          createManyAndReturn: {
            args: Prisma.SubServicesCreateManyAndReturnArgs<ExtArgs>;
            result: runtime.Types.Utils.PayloadToResult<Prisma.$SubServicesPayload>[];
          };
          delete: {
            args: Prisma.SubServicesDeleteArgs<ExtArgs>;
            result: runtime.Types.Utils.PayloadToResult<Prisma.$SubServicesPayload>;
          };
          update: {
            args: Prisma.SubServicesUpdateArgs<ExtArgs>;
            result: runtime.Types.Utils.PayloadToResult<Prisma.$SubServicesPayload>;
          };
          deleteMany: {
            args: Prisma.SubServicesDeleteManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateMany: {
            args: Prisma.SubServicesUpdateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateManyAndReturn: {
            args: Prisma.SubServicesUpdateManyAndReturnArgs<ExtArgs>;
            result: runtime.Types.Utils.PayloadToResult<Prisma.$SubServicesPayload>[];
          };
          upsert: {
            args: Prisma.SubServicesUpsertArgs<ExtArgs>;
            result: runtime.Types.Utils.PayloadToResult<Prisma.$SubServicesPayload>;
          };
          aggregate: {
            args: Prisma.SubServicesAggregateArgs<ExtArgs>;
            result: runtime.Types.Utils.Optional<AggregateSubServices>;
          };
          groupBy: {
            args: Prisma.SubServicesGroupByArgs<ExtArgs>;
            result: runtime.Types.Utils.Optional<SubServicesGroupByOutputType>[];
          };
          count: {
            args: Prisma.SubServicesCountArgs<ExtArgs>;
            result:
              | runtime.Types.Utils.Optional<SubServicesCountAggregateOutputType>
              | number;
          };
        };
      };
      User: {
        payload: Prisma.$UserPayload<ExtArgs>;
        fields: Prisma.UserFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>;
            result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>;
            result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>;
          };
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>;
            result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>;
            result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>;
          };
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>;
            result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>[];
          };
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>;
            result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>;
          };
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>;
            result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>[];
          };
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>;
            result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>;
          };
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>;
            result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>;
          };
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>;
            result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>[];
          };
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>;
            result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>;
          };
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>;
            result: runtime.Types.Utils.Optional<AggregateUser>;
          };
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>;
            result: runtime.Types.Utils.Optional<UserGroupByOutputType>[];
          };
          count: {
            args: Prisma.UserCountArgs<ExtArgs>;
            result:
              | runtime.Types.Utils.Optional<UserCountAggregateOutputType>
              | number;
          };
        };
      };
      Session: {
        payload: Prisma.$SessionPayload<ExtArgs>;
        fields: Prisma.SessionFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.SessionFindUniqueArgs<ExtArgs>;
            result: runtime.Types.Utils.PayloadToResult<Prisma.$SessionPayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.SessionFindUniqueOrThrowArgs<ExtArgs>;
            result: runtime.Types.Utils.PayloadToResult<Prisma.$SessionPayload>;
          };
          findFirst: {
            args: Prisma.SessionFindFirstArgs<ExtArgs>;
            result: runtime.Types.Utils.PayloadToResult<Prisma.$SessionPayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.SessionFindFirstOrThrowArgs<ExtArgs>;
            result: runtime.Types.Utils.PayloadToResult<Prisma.$SessionPayload>;
          };
          findMany: {
            args: Prisma.SessionFindManyArgs<ExtArgs>;
            result: runtime.Types.Utils.PayloadToResult<Prisma.$SessionPayload>[];
          };
          create: {
            args: Prisma.SessionCreateArgs<ExtArgs>;
            result: runtime.Types.Utils.PayloadToResult<Prisma.$SessionPayload>;
          };
          createMany: {
            args: Prisma.SessionCreateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          createManyAndReturn: {
            args: Prisma.SessionCreateManyAndReturnArgs<ExtArgs>;
            result: runtime.Types.Utils.PayloadToResult<Prisma.$SessionPayload>[];
          };
          delete: {
            args: Prisma.SessionDeleteArgs<ExtArgs>;
            result: runtime.Types.Utils.PayloadToResult<Prisma.$SessionPayload>;
          };
          update: {
            args: Prisma.SessionUpdateArgs<ExtArgs>;
            result: runtime.Types.Utils.PayloadToResult<Prisma.$SessionPayload>;
          };
          deleteMany: {
            args: Prisma.SessionDeleteManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateMany: {
            args: Prisma.SessionUpdateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateManyAndReturn: {
            args: Prisma.SessionUpdateManyAndReturnArgs<ExtArgs>;
            result: runtime.Types.Utils.PayloadToResult<Prisma.$SessionPayload>[];
          };
          upsert: {
            args: Prisma.SessionUpsertArgs<ExtArgs>;
            result: runtime.Types.Utils.PayloadToResult<Prisma.$SessionPayload>;
          };
          aggregate: {
            args: Prisma.SessionAggregateArgs<ExtArgs>;
            result: runtime.Types.Utils.Optional<AggregateSession>;
          };
          groupBy: {
            args: Prisma.SessionGroupByArgs<ExtArgs>;
            result: runtime.Types.Utils.Optional<SessionGroupByOutputType>[];
          };
          count: {
            args: Prisma.SessionCountArgs<ExtArgs>;
            result:
              | runtime.Types.Utils.Optional<SessionCountAggregateOutputType>
              | number;
          };
        };
      };
      Account: {
        payload: Prisma.$AccountPayload<ExtArgs>;
        fields: Prisma.AccountFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.AccountFindUniqueArgs<ExtArgs>;
            result: runtime.Types.Utils.PayloadToResult<Prisma.$AccountPayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.AccountFindUniqueOrThrowArgs<ExtArgs>;
            result: runtime.Types.Utils.PayloadToResult<Prisma.$AccountPayload>;
          };
          findFirst: {
            args: Prisma.AccountFindFirstArgs<ExtArgs>;
            result: runtime.Types.Utils.PayloadToResult<Prisma.$AccountPayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.AccountFindFirstOrThrowArgs<ExtArgs>;
            result: runtime.Types.Utils.PayloadToResult<Prisma.$AccountPayload>;
          };
          findMany: {
            args: Prisma.AccountFindManyArgs<ExtArgs>;
            result: runtime.Types.Utils.PayloadToResult<Prisma.$AccountPayload>[];
          };
          create: {
            args: Prisma.AccountCreateArgs<ExtArgs>;
            result: runtime.Types.Utils.PayloadToResult<Prisma.$AccountPayload>;
          };
          createMany: {
            args: Prisma.AccountCreateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          createManyAndReturn: {
            args: Prisma.AccountCreateManyAndReturnArgs<ExtArgs>;
            result: runtime.Types.Utils.PayloadToResult<Prisma.$AccountPayload>[];
          };
          delete: {
            args: Prisma.AccountDeleteArgs<ExtArgs>;
            result: runtime.Types.Utils.PayloadToResult<Prisma.$AccountPayload>;
          };
          update: {
            args: Prisma.AccountUpdateArgs<ExtArgs>;
            result: runtime.Types.Utils.PayloadToResult<Prisma.$AccountPayload>;
          };
          deleteMany: {
            args: Prisma.AccountDeleteManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateMany: {
            args: Prisma.AccountUpdateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateManyAndReturn: {
            args: Prisma.AccountUpdateManyAndReturnArgs<ExtArgs>;
            result: runtime.Types.Utils.PayloadToResult<Prisma.$AccountPayload>[];
          };
          upsert: {
            args: Prisma.AccountUpsertArgs<ExtArgs>;
            result: runtime.Types.Utils.PayloadToResult<Prisma.$AccountPayload>;
          };
          aggregate: {
            args: Prisma.AccountAggregateArgs<ExtArgs>;
            result: runtime.Types.Utils.Optional<AggregateAccount>;
          };
          groupBy: {
            args: Prisma.AccountGroupByArgs<ExtArgs>;
            result: runtime.Types.Utils.Optional<AccountGroupByOutputType>[];
          };
          count: {
            args: Prisma.AccountCountArgs<ExtArgs>;
            result:
              | runtime.Types.Utils.Optional<AccountCountAggregateOutputType>
              | number;
          };
        };
      };
      Verification: {
        payload: Prisma.$VerificationPayload<ExtArgs>;
        fields: Prisma.VerificationFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.VerificationFindUniqueArgs<ExtArgs>;
            result: runtime.Types.Utils.PayloadToResult<Prisma.$VerificationPayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.VerificationFindUniqueOrThrowArgs<ExtArgs>;
            result: runtime.Types.Utils.PayloadToResult<Prisma.$VerificationPayload>;
          };
          findFirst: {
            args: Prisma.VerificationFindFirstArgs<ExtArgs>;
            result: runtime.Types.Utils.PayloadToResult<Prisma.$VerificationPayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.VerificationFindFirstOrThrowArgs<ExtArgs>;
            result: runtime.Types.Utils.PayloadToResult<Prisma.$VerificationPayload>;
          };
          findMany: {
            args: Prisma.VerificationFindManyArgs<ExtArgs>;
            result: runtime.Types.Utils.PayloadToResult<Prisma.$VerificationPayload>[];
          };
          create: {
            args: Prisma.VerificationCreateArgs<ExtArgs>;
            result: runtime.Types.Utils.PayloadToResult<Prisma.$VerificationPayload>;
          };
          createMany: {
            args: Prisma.VerificationCreateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          createManyAndReturn: {
            args: Prisma.VerificationCreateManyAndReturnArgs<ExtArgs>;
            result: runtime.Types.Utils.PayloadToResult<Prisma.$VerificationPayload>[];
          };
          delete: {
            args: Prisma.VerificationDeleteArgs<ExtArgs>;
            result: runtime.Types.Utils.PayloadToResult<Prisma.$VerificationPayload>;
          };
          update: {
            args: Prisma.VerificationUpdateArgs<ExtArgs>;
            result: runtime.Types.Utils.PayloadToResult<Prisma.$VerificationPayload>;
          };
          deleteMany: {
            args: Prisma.VerificationDeleteManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateMany: {
            args: Prisma.VerificationUpdateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateManyAndReturn: {
            args: Prisma.VerificationUpdateManyAndReturnArgs<ExtArgs>;
            result: runtime.Types.Utils.PayloadToResult<Prisma.$VerificationPayload>[];
          };
          upsert: {
            args: Prisma.VerificationUpsertArgs<ExtArgs>;
            result: runtime.Types.Utils.PayloadToResult<Prisma.$VerificationPayload>;
          };
          aggregate: {
            args: Prisma.VerificationAggregateArgs<ExtArgs>;
            result: runtime.Types.Utils.Optional<AggregateVerification>;
          };
          groupBy: {
            args: Prisma.VerificationGroupByArgs<ExtArgs>;
            result: runtime.Types.Utils.Optional<VerificationGroupByOutputType>[];
          };
          count: {
            args: Prisma.VerificationCountArgs<ExtArgs>;
            result:
              | runtime.Types.Utils.Optional<VerificationCountAggregateOutputType>
              | number;
          };
        };
      };
    };
  } & {
    other: {
      payload: any;
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]];
          result: any;
        };
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]];
          result: any;
        };
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]];
          result: any;
        };
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]];
          result: any;
        };
      };
    };
  };
  export const defineExtension = runtime.Extensions
    .defineExtension as unknown as runtime.Types.Extensions.ExtendsHook<
    'define',
    Prisma.TypeMapCb,
    runtime.Types.Extensions.DefaultArgs
  >;
  export type DefaultPrismaClient = PrismaClient;
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal';
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources;
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string;
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat;
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     *
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[];
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number;
      timeout?: number;
      isolationLevel?: Prisma.TransactionIsolationLevel;
    };
    /**
     * Global configuration for omitting model fields by default.
     *
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig;
  }
  export type GlobalOmitConfig = {
    budget?: BudgetOmit;
    proposal?: ProposalOmit;
    services?: ServicesOmit;
    subServices?: SubServicesOmit;
    user?: UserOmit;
    session?: SessionOmit;
    account?: AccountOmit;
    verification?: VerificationOmit;
  };

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error';
  export type LogDefinition = {
    level: LogLevel;
    emit: 'stdout' | 'event';
  };

  export type GetLogType<T extends LogLevel | LogDefinition> =
    T extends LogDefinition
      ? T['emit'] extends 'event'
        ? T['level']
        : never
      : never;
  export type GetEvents<T> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never;

  export type QueryEvent = {
    timestamp: Date;
    query: string;
    params: string;
    duration: number;
    target: string;
  };

  export type LogEvent = {
    timestamp: Date;
    message: string;
    target: string;
  };
  /* End Types for Logging */

  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy';

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName;
    action: PrismaAction;
    args: any;
    dataPath: string[];
    runInTransaction: boolean;
  };

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => runtime.Types.Utils.JsPromise<T>
  ) => runtime.Types.Utils.JsPromise<T>;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<
    Prisma.DefaultPrismaClient,
    runtime.ITXClientDenyList
  >;

  export type Datasource = {
    url?: string;
  };

  /**
   * Count Types
   */

  /**
   * Count Type ProposalCountOutputType
   */

  export type ProposalCountOutputType = {
    budget: number;
  };

  export type ProposalCountOutputTypeSelect<
    _ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {
    budget?: boolean | ProposalCountOutputTypeCountBudgetArgs;
  };

  // Custom InputTypes
  /**
   * ProposalCountOutputType without action
   */
  export type ProposalCountOutputTypeDefaultArgs<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the ProposalCountOutputType
     */
    select?: ProposalCountOutputTypeSelect<ExtArgs> | null;
  };

  /**
   * ProposalCountOutputType without action
   */
  export type ProposalCountOutputTypeCountBudgetArgs<
    _ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {
    where?: BudgetWhereInput;
  };

  /**
   * Count Type ServicesCountOutputType
   */

  export type ServicesCountOutputType = {
    subServices: number;
  };

  export type ServicesCountOutputTypeSelect<
    _ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {
    subServices?: boolean | ServicesCountOutputTypeCountSubServicesArgs;
  };

  // Custom InputTypes
  /**
   * ServicesCountOutputType without action
   */
  export type ServicesCountOutputTypeDefaultArgs<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the ServicesCountOutputType
     */
    select?: ServicesCountOutputTypeSelect<ExtArgs> | null;
  };

  /**
   * ServicesCountOutputType without action
   */
  export type ServicesCountOutputTypeCountSubServicesArgs<
    _ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {
    where?: SubServicesWhereInput;
  };

  /**
   * Count Type SubServicesCountOutputType
   */

  export type SubServicesCountOutputType = {
    proposal: number;
  };

  export type SubServicesCountOutputTypeSelect<
    _ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {
    proposal?: boolean | SubServicesCountOutputTypeCountProposalArgs;
  };

  // Custom InputTypes
  /**
   * SubServicesCountOutputType without action
   */
  export type SubServicesCountOutputTypeDefaultArgs<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the SubServicesCountOutputType
     */
    select?: SubServicesCountOutputTypeSelect<ExtArgs> | null;
  };

  /**
   * SubServicesCountOutputType without action
   */
  export type SubServicesCountOutputTypeCountProposalArgs<
    _ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {
    where?: ProposalWhereInput;
  };

  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    sessions: number;
    accounts: number;
    proposal: number;
    budget: number;
  };

  export type UserCountOutputTypeSelect<
    _ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {
    sessions?: boolean | UserCountOutputTypeCountSessionsArgs;
    accounts?: boolean | UserCountOutputTypeCountAccountsArgs;
    proposal?: boolean | UserCountOutputTypeCountProposalArgs;
    budget?: boolean | UserCountOutputTypeCountBudgetArgs;
  };

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null;
  };

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountSessionsArgs<
    _ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {
    where?: SessionWhereInput;
  };

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountAccountsArgs<
    _ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {
    where?: AccountWhereInput;
  };

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountProposalArgs<
    _ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {
    where?: ProposalWhereInput;
  };

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountBudgetArgs<
    _ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {
    where?: BudgetWhereInput;
  };

  /**
   * Models
   */

  /**
   * Model Budget
   */

  export type AggregateBudget = {
    _count: BudgetCountAggregateOutputType | null;
    _avg: BudgetAvgAggregateOutputType | null;
    _sum: BudgetSumAggregateOutputType | null;
    _min: BudgetMinAggregateOutputType | null;
    _max: BudgetMaxAggregateOutputType | null;
  };

  export type BudgetAvgAggregateOutputType = {
    id: number | null;
    proposalId: number | null;
    budget: Decimal | null;
  };

  export type BudgetSumAggregateOutputType = {
    id: number | null;
    proposalId: number | null;
    budget: Decimal | null;
  };

  export type BudgetMinAggregateOutputType = {
    id: number | null;
    userId: string | null;
    proposalId: number | null;
    details: string | null;
    budget: Decimal | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  };

  export type BudgetMaxAggregateOutputType = {
    id: number | null;
    userId: string | null;
    proposalId: number | null;
    details: string | null;
    budget: Decimal | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  };

  export type BudgetCountAggregateOutputType = {
    id: number;
    userId: number;
    proposalId: number;
    details: number;
    budget: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
  };

  export type BudgetAvgAggregateInputType = {
    id?: true;
    proposalId?: true;
    budget?: true;
  };

  export type BudgetSumAggregateInputType = {
    id?: true;
    proposalId?: true;
    budget?: true;
  };

  export type BudgetMinAggregateInputType = {
    id?: true;
    userId?: true;
    proposalId?: true;
    details?: true;
    budget?: true;
    createdAt?: true;
    updatedAt?: true;
  };

  export type BudgetMaxAggregateInputType = {
    id?: true;
    userId?: true;
    proposalId?: true;
    details?: true;
    budget?: true;
    createdAt?: true;
    updatedAt?: true;
  };

  export type BudgetCountAggregateInputType = {
    id?: true;
    userId?: true;
    proposalId?: true;
    details?: true;
    budget?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
  };

  export type BudgetAggregateArgs<
    _ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Budget to aggregate.
     */
    where?: BudgetWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Budgets to fetch.
     */
    orderBy?: BudgetOrderByWithRelationInput | BudgetOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: BudgetWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Budgets from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Budgets.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Budgets
     **/
    _count?: true | BudgetCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
     **/
    _avg?: BudgetAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
     **/
    _sum?: BudgetSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: BudgetMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: BudgetMaxAggregateInputType;
  };

  export type GetBudgetAggregateType<T extends BudgetAggregateArgs> = {
    [P in keyof T & keyof AggregateBudget]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBudget[P]>
      : GetScalarType<T[P], AggregateBudget[P]>;
  };

  export type BudgetGroupByArgs<
    _ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {
    where?: BudgetWhereInput;
    orderBy?:
      | BudgetOrderByWithAggregationInput
      | BudgetOrderByWithAggregationInput[];
    by: BudgetScalarFieldEnum[] | BudgetScalarFieldEnum;
    having?: BudgetScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: BudgetCountAggregateInputType | true;
    _avg?: BudgetAvgAggregateInputType;
    _sum?: BudgetSumAggregateInputType;
    _min?: BudgetMinAggregateInputType;
    _max?: BudgetMaxAggregateInputType;
  };

  export type BudgetGroupByOutputType = {
    id: number;
    userId: string;
    proposalId: number;
    details: string;
    budget: Decimal;
    createdAt: Date;
    updatedAt: Date;
    _count: BudgetCountAggregateOutputType | null;
    _avg: BudgetAvgAggregateOutputType | null;
    _sum: BudgetSumAggregateOutputType | null;
    _min: BudgetMinAggregateOutputType | null;
    _max: BudgetMaxAggregateOutputType | null;
  };

  type GetBudgetGroupByPayload<T extends BudgetGroupByArgs> =
    Prisma.PrismaPromise<
      Array<
        PickEnumerable<BudgetGroupByOutputType, T['by']> & {
          [P in keyof T & keyof BudgetGroupByOutputType]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BudgetGroupByOutputType[P]>
            : GetScalarType<T[P], BudgetGroupByOutputType[P]>;
        }
      >
    >;

  export type BudgetSelect<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = runtime.Types.Extensions.GetSelect<
    {
      id?: boolean;
      userId?: boolean;
      proposalId?: boolean;
      details?: boolean;
      budget?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
      user?: boolean | UserDefaultArgs<ExtArgs>;
      proposal?: boolean | ProposalDefaultArgs<ExtArgs>;
    },
    ExtArgs['result']['budget']
  >;

  export type BudgetSelectCreateManyAndReturn<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = runtime.Types.Extensions.GetSelect<
    {
      id?: boolean;
      userId?: boolean;
      proposalId?: boolean;
      details?: boolean;
      budget?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
      user?: boolean | UserDefaultArgs<ExtArgs>;
      proposal?: boolean | ProposalDefaultArgs<ExtArgs>;
    },
    ExtArgs['result']['budget']
  >;

  export type BudgetSelectUpdateManyAndReturn<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = runtime.Types.Extensions.GetSelect<
    {
      id?: boolean;
      userId?: boolean;
      proposalId?: boolean;
      details?: boolean;
      budget?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
      user?: boolean | UserDefaultArgs<ExtArgs>;
      proposal?: boolean | ProposalDefaultArgs<ExtArgs>;
    },
    ExtArgs['result']['budget']
  >;

  export type BudgetSelectScalar = {
    id?: boolean;
    userId?: boolean;
    proposalId?: boolean;
    details?: boolean;
    budget?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
  };

  export type BudgetOmit<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = runtime.Types.Extensions.GetOmit<
    | 'id'
    | 'userId'
    | 'proposalId'
    | 'details'
    | 'budget'
    | 'createdAt'
    | 'updatedAt',
    ExtArgs['result']['budget']
  >;
  export type BudgetInclude<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {
    user?: boolean | UserDefaultArgs<ExtArgs>;
    proposal?: boolean | ProposalDefaultArgs<ExtArgs>;
  };
  export type BudgetIncludeCreateManyAndReturn<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {
    user?: boolean | UserDefaultArgs<ExtArgs>;
    proposal?: boolean | ProposalDefaultArgs<ExtArgs>;
  };
  export type BudgetIncludeUpdateManyAndReturn<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {
    user?: boolean | UserDefaultArgs<ExtArgs>;
    proposal?: boolean | ProposalDefaultArgs<ExtArgs>;
  };

  export type $BudgetPayload<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {
    name: 'Budget';
    objects: {
      user: Prisma.$UserPayload<ExtArgs>;
      proposal: Prisma.$ProposalPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<
      {
        id: number;
        userId: string;
        proposalId: number;
        details: string;
        budget: Prisma.Decimal;
        createdAt: Date;
        updatedAt: Date;
      },
      ExtArgs['result']['budget']
    >;
    composites: {};
  };

  export type BudgetGetPayload<
    S extends boolean | null | undefined | BudgetDefaultArgs,
  > = runtime.Types.Result.GetResult<Prisma.$BudgetPayload, S>;

  export type BudgetCountArgs<
    _ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = Omit<BudgetFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: BudgetCountAggregateInputType | true;
  };

  export interface BudgetDelegate<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > {
    [K: symbol]: {
      types: Prisma.TypeMap<ExtArgs>['model']['Budget'];
      meta: { name: 'Budget' };
    };
    /**
     * Find zero or one Budget that matches the filter.
     * @param {BudgetFindUniqueArgs} args - Arguments to find a Budget
     * @example
     * // Get one Budget
     * const budget = await prisma.budget.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BudgetFindUniqueArgs>(
      args: SelectSubset<T, BudgetFindUniqueArgs<ExtArgs>>
    ): Prisma__BudgetClient<
      runtime.Types.Result.GetResult<
        Prisma.$BudgetPayload<ExtArgs>,
        T,
        'findUnique',
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find one Budget that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {BudgetFindUniqueOrThrowArgs} args - Arguments to find a Budget
     * @example
     * // Get one Budget
     * const budget = await prisma.budget.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BudgetFindUniqueOrThrowArgs>(
      args: SelectSubset<T, BudgetFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__BudgetClient<
      runtime.Types.Result.GetResult<
        Prisma.$BudgetPayload<ExtArgs>,
        T,
        'findUniqueOrThrow',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first Budget that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BudgetFindFirstArgs} args - Arguments to find a Budget
     * @example
     * // Get one Budget
     * const budget = await prisma.budget.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BudgetFindFirstArgs>(
      args?: SelectSubset<T, BudgetFindFirstArgs<ExtArgs>>
    ): Prisma__BudgetClient<
      runtime.Types.Result.GetResult<
        Prisma.$BudgetPayload<ExtArgs>,
        T,
        'findFirst',
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first Budget that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BudgetFindFirstOrThrowArgs} args - Arguments to find a Budget
     * @example
     * // Get one Budget
     * const budget = await prisma.budget.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BudgetFindFirstOrThrowArgs>(
      args?: SelectSubset<T, BudgetFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__BudgetClient<
      runtime.Types.Result.GetResult<
        Prisma.$BudgetPayload<ExtArgs>,
        T,
        'findFirstOrThrow',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find zero or more Budgets that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BudgetFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Budgets
     * const budgets = await prisma.budget.findMany()
     *
     * // Get first 10 Budgets
     * const budgets = await prisma.budget.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const budgetWithIdOnly = await prisma.budget.findMany({ select: { id: true } })
     *
     */
    findMany<T extends BudgetFindManyArgs>(
      args?: SelectSubset<T, BudgetFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      runtime.Types.Result.GetResult<
        Prisma.$BudgetPayload<ExtArgs>,
        T,
        'findMany',
        GlobalOmitOptions
      >
    >;

    /**
     * Create a Budget.
     * @param {BudgetCreateArgs} args - Arguments to create a Budget.
     * @example
     * // Create one Budget
     * const Budget = await prisma.budget.create({
     *   data: {
     *     // ... data to create a Budget
     *   }
     * })
     *
     */
    create<T extends BudgetCreateArgs>(
      args: SelectSubset<T, BudgetCreateArgs<ExtArgs>>
    ): Prisma__BudgetClient<
      runtime.Types.Result.GetResult<
        Prisma.$BudgetPayload<ExtArgs>,
        T,
        'create',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Create many Budgets.
     * @param {BudgetCreateManyArgs} args - Arguments to create many Budgets.
     * @example
     * // Create many Budgets
     * const budget = await prisma.budget.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends BudgetCreateManyArgs>(
      args?: SelectSubset<T, BudgetCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create many Budgets and returns the data saved in the database.
     * @param {BudgetCreateManyAndReturnArgs} args - Arguments to create many Budgets.
     * @example
     * // Create many Budgets
     * const budget = await prisma.budget.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Budgets and only return the `id`
     * const budgetWithIdOnly = await prisma.budget.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends BudgetCreateManyAndReturnArgs>(
      args?: SelectSubset<T, BudgetCreateManyAndReturnArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      runtime.Types.Result.GetResult<
        Prisma.$BudgetPayload<ExtArgs>,
        T,
        'createManyAndReturn',
        GlobalOmitOptions
      >
    >;

    /**
     * Delete a Budget.
     * @param {BudgetDeleteArgs} args - Arguments to delete one Budget.
     * @example
     * // Delete one Budget
     * const Budget = await prisma.budget.delete({
     *   where: {
     *     // ... filter to delete one Budget
     *   }
     * })
     *
     */
    delete<T extends BudgetDeleteArgs>(
      args: SelectSubset<T, BudgetDeleteArgs<ExtArgs>>
    ): Prisma__BudgetClient<
      runtime.Types.Result.GetResult<
        Prisma.$BudgetPayload<ExtArgs>,
        T,
        'delete',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Update one Budget.
     * @param {BudgetUpdateArgs} args - Arguments to update one Budget.
     * @example
     * // Update one Budget
     * const budget = await prisma.budget.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends BudgetUpdateArgs>(
      args: SelectSubset<T, BudgetUpdateArgs<ExtArgs>>
    ): Prisma__BudgetClient<
      runtime.Types.Result.GetResult<
        Prisma.$BudgetPayload<ExtArgs>,
        T,
        'update',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Delete zero or more Budgets.
     * @param {BudgetDeleteManyArgs} args - Arguments to filter Budgets to delete.
     * @example
     * // Delete a few Budgets
     * const { count } = await prisma.budget.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends BudgetDeleteManyArgs>(
      args?: SelectSubset<T, BudgetDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Budgets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BudgetUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Budgets
     * const budget = await prisma.budget.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends BudgetUpdateManyArgs>(
      args: SelectSubset<T, BudgetUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Budgets and returns the data updated in the database.
     * @param {BudgetUpdateManyAndReturnArgs} args - Arguments to update many Budgets.
     * @example
     * // Update many Budgets
     * const budget = await prisma.budget.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more Budgets and only return the `id`
     * const budgetWithIdOnly = await prisma.budget.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    updateManyAndReturn<T extends BudgetUpdateManyAndReturnArgs>(
      args: SelectSubset<T, BudgetUpdateManyAndReturnArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      runtime.Types.Result.GetResult<
        Prisma.$BudgetPayload<ExtArgs>,
        T,
        'updateManyAndReturn',
        GlobalOmitOptions
      >
    >;

    /**
     * Create or update one Budget.
     * @param {BudgetUpsertArgs} args - Arguments to update or create a Budget.
     * @example
     * // Update or create a Budget
     * const budget = await prisma.budget.upsert({
     *   create: {
     *     // ... data to create a Budget
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Budget we want to update
     *   }
     * })
     */
    upsert<T extends BudgetUpsertArgs>(
      args: SelectSubset<T, BudgetUpsertArgs<ExtArgs>>
    ): Prisma__BudgetClient<
      runtime.Types.Result.GetResult<
        Prisma.$BudgetPayload<ExtArgs>,
        T,
        'upsert',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Count the number of Budgets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BudgetCountArgs} args - Arguments to filter Budgets to count.
     * @example
     * // Count the number of Budgets
     * const count = await prisma.budget.count({
     *   where: {
     *     // ... the filter for the Budgets we want to count
     *   }
     * })
     **/
    count<T extends BudgetCountArgs>(
      args?: Subset<T, BudgetCountArgs>
    ): Prisma.PrismaPromise<
      T extends runtime.Types.Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BudgetCountAggregateOutputType>
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a Budget.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BudgetAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
     **/
    aggregate<T extends BudgetAggregateArgs>(
      args: Subset<T, BudgetAggregateArgs>
    ): Prisma.PrismaPromise<GetBudgetAggregateType<T>>;

    /**
     * Group by Budget.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BudgetGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
     **/
    groupBy<
      T extends BudgetGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BudgetGroupByArgs['orderBy'] }
        : { orderBy?: BudgetGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<
        Keys<MaybeTupleToUnion<T['orderBy']>>
      >,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
        ? `Error: "by" must not be empty.`
        : HavingValid extends False
          ? {
              [P in HavingFields]: P extends ByFields
                ? never
                : P extends string
                  ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
                  : [
                      Error,
                      'Field ',
                      P,
                      ` in "having" needs to be provided in "by"`,
                    ];
            }[HavingFields]
          : 'take' extends Keys<T>
            ? 'orderBy' extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
              : 'Error: If you provide "take", you also need to provide "orderBy"'
            : 'skip' extends Keys<T>
              ? 'orderBy' extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                      [P in OrderFields]: P extends ByFields
                        ? never
                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                    }[OrderFields]
                : 'Error: If you provide "skip", you also need to provide "orderBy"'
              : ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields],
    >(
      args: SubsetIntersection<T, BudgetGroupByArgs, OrderByArg> & InputErrors
    ): {} extends InputErrors
      ? GetBudgetGroupByPayload<T>
      : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the Budget model
     */
    readonly fields: BudgetFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Budget.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BudgetClient<
    T,
    Null = never,
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    user<T extends UserDefaultArgs<ExtArgs> = {}>(
      args?: Subset<T, UserDefaultArgs<ExtArgs>>
    ): Prisma__UserClient<
      | runtime.Types.Result.GetResult<
          Prisma.$UserPayload<ExtArgs>,
          T,
          'findUniqueOrThrow',
          GlobalOmitOptions
        >
      | Null,
      Null,
      ExtArgs,
      GlobalOmitOptions
    >;
    proposal<T extends ProposalDefaultArgs<ExtArgs> = {}>(
      args?: Subset<T, ProposalDefaultArgs<ExtArgs>>
    ): Prisma__ProposalClient<
      | runtime.Types.Result.GetResult<
          Prisma.$ProposalPayload<ExtArgs>,
          T,
          'findUniqueOrThrow',
          GlobalOmitOptions
        >
      | Null,
      Null,
      ExtArgs,
      GlobalOmitOptions
    >;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?:
        | ((value: T) => TResult1 | PromiseLike<TResult1>)
        | undefined
        | null,
      onrejected?:
        | ((reason: any) => TResult2 | PromiseLike<TResult2>)
        | undefined
        | null
    ): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?:
        | ((reason: any) => TResult | PromiseLike<TResult>)
        | undefined
        | null
    ): runtime.Types.Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(
      onfinally?: (() => void) | undefined | null
    ): runtime.Types.Utils.JsPromise<T>;
  }

  /**
   * Fields of the Budget model
   */
  export interface BudgetFieldRefs {
    readonly id: FieldRef<'Budget', 'Int'>;
    readonly userId: FieldRef<'Budget', 'String'>;
    readonly proposalId: FieldRef<'Budget', 'Int'>;
    readonly details: FieldRef<'Budget', 'String'>;
    readonly budget: FieldRef<'Budget', 'Decimal'>;
    readonly createdAt: FieldRef<'Budget', 'DateTime'>;
    readonly updatedAt: FieldRef<'Budget', 'DateTime'>;
  }

  // Custom InputTypes
  /**
   * Budget findUnique
   */
  export type BudgetFindUniqueArgs<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Budget
     */
    select?: BudgetSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Budget
     */
    omit?: BudgetOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BudgetInclude<ExtArgs> | null;
    /**
     * Filter, which Budget to fetch.
     */
    where: BudgetWhereUniqueInput;
  };

  /**
   * Budget findUniqueOrThrow
   */
  export type BudgetFindUniqueOrThrowArgs<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Budget
     */
    select?: BudgetSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Budget
     */
    omit?: BudgetOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BudgetInclude<ExtArgs> | null;
    /**
     * Filter, which Budget to fetch.
     */
    where: BudgetWhereUniqueInput;
  };

  /**
   * Budget findFirst
   */
  export type BudgetFindFirstArgs<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Budget
     */
    select?: BudgetSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Budget
     */
    omit?: BudgetOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BudgetInclude<ExtArgs> | null;
    /**
     * Filter, which Budget to fetch.
     */
    where?: BudgetWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Budgets to fetch.
     */
    orderBy?: BudgetOrderByWithRelationInput | BudgetOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Budgets.
     */
    cursor?: BudgetWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Budgets from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Budgets.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Budgets.
     */
    distinct?: BudgetScalarFieldEnum | BudgetScalarFieldEnum[];
  };

  /**
   * Budget findFirstOrThrow
   */
  export type BudgetFindFirstOrThrowArgs<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Budget
     */
    select?: BudgetSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Budget
     */
    omit?: BudgetOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BudgetInclude<ExtArgs> | null;
    /**
     * Filter, which Budget to fetch.
     */
    where?: BudgetWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Budgets to fetch.
     */
    orderBy?: BudgetOrderByWithRelationInput | BudgetOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Budgets.
     */
    cursor?: BudgetWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Budgets from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Budgets.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Budgets.
     */
    distinct?: BudgetScalarFieldEnum | BudgetScalarFieldEnum[];
  };

  /**
   * Budget findMany
   */
  export type BudgetFindManyArgs<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Budget
     */
    select?: BudgetSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Budget
     */
    omit?: BudgetOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BudgetInclude<ExtArgs> | null;
    /**
     * Filter, which Budgets to fetch.
     */
    where?: BudgetWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Budgets to fetch.
     */
    orderBy?: BudgetOrderByWithRelationInput | BudgetOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Budgets.
     */
    cursor?: BudgetWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Budgets from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Budgets.
     */
    skip?: number;
    distinct?: BudgetScalarFieldEnum | BudgetScalarFieldEnum[];
  };

  /**
   * Budget create
   */
  export type BudgetCreateArgs<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Budget
     */
    select?: BudgetSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Budget
     */
    omit?: BudgetOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BudgetInclude<ExtArgs> | null;
    /**
     * The data needed to create a Budget.
     */
    data: XOR<BudgetCreateInput, BudgetUncheckedCreateInput>;
  };

  /**
   * Budget createMany
   */
  export type BudgetCreateManyArgs<
    _ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {
    /**
     * The data used to create many Budgets.
     */
    data: BudgetCreateManyInput | BudgetCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * Budget createManyAndReturn
   */
  export type BudgetCreateManyAndReturnArgs<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Budget
     */
    select?: BudgetSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Budget
     */
    omit?: BudgetOmit<ExtArgs> | null;
    /**
     * The data used to create many Budgets.
     */
    data: BudgetCreateManyInput | BudgetCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BudgetIncludeCreateManyAndReturn<ExtArgs> | null;
  };

  /**
   * Budget update
   */
  export type BudgetUpdateArgs<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Budget
     */
    select?: BudgetSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Budget
     */
    omit?: BudgetOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BudgetInclude<ExtArgs> | null;
    /**
     * The data needed to update a Budget.
     */
    data: XOR<BudgetUpdateInput, BudgetUncheckedUpdateInput>;
    /**
     * Choose, which Budget to update.
     */
    where: BudgetWhereUniqueInput;
  };

  /**
   * Budget updateMany
   */
  export type BudgetUpdateManyArgs<
    _ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {
    /**
     * The data used to update Budgets.
     */
    data: XOR<BudgetUpdateManyMutationInput, BudgetUncheckedUpdateManyInput>;
    /**
     * Filter which Budgets to update
     */
    where?: BudgetWhereInput;
    /**
     * Limit how many Budgets to update.
     */
    limit?: number;
  };

  /**
   * Budget updateManyAndReturn
   */
  export type BudgetUpdateManyAndReturnArgs<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Budget
     */
    select?: BudgetSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Budget
     */
    omit?: BudgetOmit<ExtArgs> | null;
    /**
     * The data used to update Budgets.
     */
    data: XOR<BudgetUpdateManyMutationInput, BudgetUncheckedUpdateManyInput>;
    /**
     * Filter which Budgets to update
     */
    where?: BudgetWhereInput;
    /**
     * Limit how many Budgets to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BudgetIncludeUpdateManyAndReturn<ExtArgs> | null;
  };

  /**
   * Budget upsert
   */
  export type BudgetUpsertArgs<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Budget
     */
    select?: BudgetSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Budget
     */
    omit?: BudgetOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BudgetInclude<ExtArgs> | null;
    /**
     * The filter to search for the Budget to update in case it exists.
     */
    where: BudgetWhereUniqueInput;
    /**
     * In case the Budget found by the `where` argument doesn't exist, create a new Budget with this data.
     */
    create: XOR<BudgetCreateInput, BudgetUncheckedCreateInput>;
    /**
     * In case the Budget was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BudgetUpdateInput, BudgetUncheckedUpdateInput>;
  };

  /**
   * Budget delete
   */
  export type BudgetDeleteArgs<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Budget
     */
    select?: BudgetSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Budget
     */
    omit?: BudgetOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BudgetInclude<ExtArgs> | null;
    /**
     * Filter which Budget to delete.
     */
    where: BudgetWhereUniqueInput;
  };

  /**
   * Budget deleteMany
   */
  export type BudgetDeleteManyArgs<
    _ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Budgets to delete
     */
    where?: BudgetWhereInput;
    /**
     * Limit how many Budgets to delete.
     */
    limit?: number;
  };

  /**
   * Budget without action
   */
  export type BudgetDefaultArgs<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Budget
     */
    select?: BudgetSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Budget
     */
    omit?: BudgetOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BudgetInclude<ExtArgs> | null;
  };

  /**
   * Model Proposal
   */

  export type AggregateProposal = {
    _count: ProposalCountAggregateOutputType | null;
    _avg: ProposalAvgAggregateOutputType | null;
    _sum: ProposalSumAggregateOutputType | null;
    _min: ProposalMinAggregateOutputType | null;
    _max: ProposalMaxAggregateOutputType | null;
  };

  export type ProposalAvgAggregateOutputType = {
    id: number | null;
    serviceId: number | null;
    commune: number | null;
  };

  export type ProposalSumAggregateOutputType = {
    id: number | null;
    serviceId: number | null;
    commune: number | null;
  };

  export type ProposalMinAggregateOutputType = {
    id: number | null;
    userId: string | null;
    serviceId: number | null;
    type: $Enums.ProposalHome | null;
    commune: number | null;
    address: string | null;
    serviceDate: Date | null;
    description: string | null;
    active: boolean | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  };

  export type ProposalMaxAggregateOutputType = {
    id: number | null;
    userId: string | null;
    serviceId: number | null;
    type: $Enums.ProposalHome | null;
    commune: number | null;
    address: string | null;
    serviceDate: Date | null;
    description: string | null;
    active: boolean | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  };

  export type ProposalCountAggregateOutputType = {
    id: number;
    userId: number;
    serviceId: number;
    type: number;
    commune: number;
    address: number;
    serviceDate: number;
    description: number;
    active: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
  };

  export type ProposalAvgAggregateInputType = {
    id?: true;
    serviceId?: true;
    commune?: true;
  };

  export type ProposalSumAggregateInputType = {
    id?: true;
    serviceId?: true;
    commune?: true;
  };

  export type ProposalMinAggregateInputType = {
    id?: true;
    userId?: true;
    serviceId?: true;
    type?: true;
    commune?: true;
    address?: true;
    serviceDate?: true;
    description?: true;
    active?: true;
    createdAt?: true;
    updatedAt?: true;
  };

  export type ProposalMaxAggregateInputType = {
    id?: true;
    userId?: true;
    serviceId?: true;
    type?: true;
    commune?: true;
    address?: true;
    serviceDate?: true;
    description?: true;
    active?: true;
    createdAt?: true;
    updatedAt?: true;
  };

  export type ProposalCountAggregateInputType = {
    id?: true;
    userId?: true;
    serviceId?: true;
    type?: true;
    commune?: true;
    address?: true;
    serviceDate?: true;
    description?: true;
    active?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
  };

  export type ProposalAggregateArgs<
    _ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Proposal to aggregate.
     */
    where?: ProposalWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Proposals to fetch.
     */
    orderBy?:
      | ProposalOrderByWithRelationInput
      | ProposalOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: ProposalWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Proposals from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Proposals.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Proposals
     **/
    _count?: true | ProposalCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
     **/
    _avg?: ProposalAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
     **/
    _sum?: ProposalSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: ProposalMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: ProposalMaxAggregateInputType;
  };

  export type GetProposalAggregateType<T extends ProposalAggregateArgs> = {
    [P in keyof T & keyof AggregateProposal]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProposal[P]>
      : GetScalarType<T[P], AggregateProposal[P]>;
  };

  export type ProposalGroupByArgs<
    _ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {
    where?: ProposalWhereInput;
    orderBy?:
      | ProposalOrderByWithAggregationInput
      | ProposalOrderByWithAggregationInput[];
    by: ProposalScalarFieldEnum[] | ProposalScalarFieldEnum;
    having?: ProposalScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: ProposalCountAggregateInputType | true;
    _avg?: ProposalAvgAggregateInputType;
    _sum?: ProposalSumAggregateInputType;
    _min?: ProposalMinAggregateInputType;
    _max?: ProposalMaxAggregateInputType;
  };

  export type ProposalGroupByOutputType = {
    id: number;
    userId: string;
    serviceId: number;
    type: $Enums.ProposalHome;
    commune: number;
    address: string;
    serviceDate: Date;
    description: string;
    active: boolean;
    createdAt: Date;
    updatedAt: Date;
    _count: ProposalCountAggregateOutputType | null;
    _avg: ProposalAvgAggregateOutputType | null;
    _sum: ProposalSumAggregateOutputType | null;
    _min: ProposalMinAggregateOutputType | null;
    _max: ProposalMaxAggregateOutputType | null;
  };

  type GetProposalGroupByPayload<T extends ProposalGroupByArgs> =
    Prisma.PrismaPromise<
      Array<
        PickEnumerable<ProposalGroupByOutputType, T['by']> & {
          [P in keyof T & keyof ProposalGroupByOutputType]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProposalGroupByOutputType[P]>
            : GetScalarType<T[P], ProposalGroupByOutputType[P]>;
        }
      >
    >;

  export type ProposalSelect<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = runtime.Types.Extensions.GetSelect<
    {
      id?: boolean;
      userId?: boolean;
      serviceId?: boolean;
      type?: boolean;
      commune?: boolean;
      address?: boolean;
      serviceDate?: boolean;
      description?: boolean;
      active?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
      user?: boolean | UserDefaultArgs<ExtArgs>;
      subServices?: boolean | SubServicesDefaultArgs<ExtArgs>;
      budget?: boolean | Proposal$budgetArgs<ExtArgs>;
      _count?: boolean | ProposalCountOutputTypeDefaultArgs<ExtArgs>;
    },
    ExtArgs['result']['proposal']
  >;

  export type ProposalSelectCreateManyAndReturn<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = runtime.Types.Extensions.GetSelect<
    {
      id?: boolean;
      userId?: boolean;
      serviceId?: boolean;
      type?: boolean;
      commune?: boolean;
      address?: boolean;
      serviceDate?: boolean;
      description?: boolean;
      active?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
      user?: boolean | UserDefaultArgs<ExtArgs>;
      subServices?: boolean | SubServicesDefaultArgs<ExtArgs>;
    },
    ExtArgs['result']['proposal']
  >;

  export type ProposalSelectUpdateManyAndReturn<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = runtime.Types.Extensions.GetSelect<
    {
      id?: boolean;
      userId?: boolean;
      serviceId?: boolean;
      type?: boolean;
      commune?: boolean;
      address?: boolean;
      serviceDate?: boolean;
      description?: boolean;
      active?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
      user?: boolean | UserDefaultArgs<ExtArgs>;
      subServices?: boolean | SubServicesDefaultArgs<ExtArgs>;
    },
    ExtArgs['result']['proposal']
  >;

  export type ProposalSelectScalar = {
    id?: boolean;
    userId?: boolean;
    serviceId?: boolean;
    type?: boolean;
    commune?: boolean;
    address?: boolean;
    serviceDate?: boolean;
    description?: boolean;
    active?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
  };

  export type ProposalOmit<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = runtime.Types.Extensions.GetOmit<
    | 'id'
    | 'userId'
    | 'serviceId'
    | 'type'
    | 'commune'
    | 'address'
    | 'serviceDate'
    | 'description'
    | 'active'
    | 'createdAt'
    | 'updatedAt',
    ExtArgs['result']['proposal']
  >;
  export type ProposalInclude<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {
    user?: boolean | UserDefaultArgs<ExtArgs>;
    subServices?: boolean | SubServicesDefaultArgs<ExtArgs>;
    budget?: boolean | Proposal$budgetArgs<ExtArgs>;
    _count?: boolean | ProposalCountOutputTypeDefaultArgs<ExtArgs>;
  };
  export type ProposalIncludeCreateManyAndReturn<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {
    user?: boolean | UserDefaultArgs<ExtArgs>;
    subServices?: boolean | SubServicesDefaultArgs<ExtArgs>;
  };
  export type ProposalIncludeUpdateManyAndReturn<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {
    user?: boolean | UserDefaultArgs<ExtArgs>;
    subServices?: boolean | SubServicesDefaultArgs<ExtArgs>;
  };

  export type $ProposalPayload<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {
    name: 'Proposal';
    objects: {
      user: Prisma.$UserPayload<ExtArgs>;
      subServices: Prisma.$SubServicesPayload<ExtArgs>;
      budget: Prisma.$BudgetPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<
      {
        id: number;
        userId: string;
        serviceId: number;
        type: $Enums.ProposalHome;
        commune: number;
        address: string;
        serviceDate: Date;
        description: string;
        active: boolean;
        createdAt: Date;
        updatedAt: Date;
      },
      ExtArgs['result']['proposal']
    >;
    composites: {};
  };

  export type ProposalGetPayload<
    S extends boolean | null | undefined | ProposalDefaultArgs,
  > = runtime.Types.Result.GetResult<Prisma.$ProposalPayload, S>;

  export type ProposalCountArgs<
    _ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = Omit<ProposalFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: ProposalCountAggregateInputType | true;
  };

  export interface ProposalDelegate<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > {
    [K: symbol]: {
      types: Prisma.TypeMap<ExtArgs>['model']['Proposal'];
      meta: { name: 'Proposal' };
    };
    /**
     * Find zero or one Proposal that matches the filter.
     * @param {ProposalFindUniqueArgs} args - Arguments to find a Proposal
     * @example
     * // Get one Proposal
     * const proposal = await prisma.proposal.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProposalFindUniqueArgs>(
      args: SelectSubset<T, ProposalFindUniqueArgs<ExtArgs>>
    ): Prisma__ProposalClient<
      runtime.Types.Result.GetResult<
        Prisma.$ProposalPayload<ExtArgs>,
        T,
        'findUnique',
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find one Proposal that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProposalFindUniqueOrThrowArgs} args - Arguments to find a Proposal
     * @example
     * // Get one Proposal
     * const proposal = await prisma.proposal.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProposalFindUniqueOrThrowArgs>(
      args: SelectSubset<T, ProposalFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__ProposalClient<
      runtime.Types.Result.GetResult<
        Prisma.$ProposalPayload<ExtArgs>,
        T,
        'findUniqueOrThrow',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first Proposal that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProposalFindFirstArgs} args - Arguments to find a Proposal
     * @example
     * // Get one Proposal
     * const proposal = await prisma.proposal.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProposalFindFirstArgs>(
      args?: SelectSubset<T, ProposalFindFirstArgs<ExtArgs>>
    ): Prisma__ProposalClient<
      runtime.Types.Result.GetResult<
        Prisma.$ProposalPayload<ExtArgs>,
        T,
        'findFirst',
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first Proposal that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProposalFindFirstOrThrowArgs} args - Arguments to find a Proposal
     * @example
     * // Get one Proposal
     * const proposal = await prisma.proposal.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProposalFindFirstOrThrowArgs>(
      args?: SelectSubset<T, ProposalFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__ProposalClient<
      runtime.Types.Result.GetResult<
        Prisma.$ProposalPayload<ExtArgs>,
        T,
        'findFirstOrThrow',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find zero or more Proposals that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProposalFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Proposals
     * const proposals = await prisma.proposal.findMany()
     *
     * // Get first 10 Proposals
     * const proposals = await prisma.proposal.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const proposalWithIdOnly = await prisma.proposal.findMany({ select: { id: true } })
     *
     */
    findMany<T extends ProposalFindManyArgs>(
      args?: SelectSubset<T, ProposalFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      runtime.Types.Result.GetResult<
        Prisma.$ProposalPayload<ExtArgs>,
        T,
        'findMany',
        GlobalOmitOptions
      >
    >;

    /**
     * Create a Proposal.
     * @param {ProposalCreateArgs} args - Arguments to create a Proposal.
     * @example
     * // Create one Proposal
     * const Proposal = await prisma.proposal.create({
     *   data: {
     *     // ... data to create a Proposal
     *   }
     * })
     *
     */
    create<T extends ProposalCreateArgs>(
      args: SelectSubset<T, ProposalCreateArgs<ExtArgs>>
    ): Prisma__ProposalClient<
      runtime.Types.Result.GetResult<
        Prisma.$ProposalPayload<ExtArgs>,
        T,
        'create',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Create many Proposals.
     * @param {ProposalCreateManyArgs} args - Arguments to create many Proposals.
     * @example
     * // Create many Proposals
     * const proposal = await prisma.proposal.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends ProposalCreateManyArgs>(
      args?: SelectSubset<T, ProposalCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create many Proposals and returns the data saved in the database.
     * @param {ProposalCreateManyAndReturnArgs} args - Arguments to create many Proposals.
     * @example
     * // Create many Proposals
     * const proposal = await prisma.proposal.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Proposals and only return the `id`
     * const proposalWithIdOnly = await prisma.proposal.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends ProposalCreateManyAndReturnArgs>(
      args?: SelectSubset<T, ProposalCreateManyAndReturnArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      runtime.Types.Result.GetResult<
        Prisma.$ProposalPayload<ExtArgs>,
        T,
        'createManyAndReturn',
        GlobalOmitOptions
      >
    >;

    /**
     * Delete a Proposal.
     * @param {ProposalDeleteArgs} args - Arguments to delete one Proposal.
     * @example
     * // Delete one Proposal
     * const Proposal = await prisma.proposal.delete({
     *   where: {
     *     // ... filter to delete one Proposal
     *   }
     * })
     *
     */
    delete<T extends ProposalDeleteArgs>(
      args: SelectSubset<T, ProposalDeleteArgs<ExtArgs>>
    ): Prisma__ProposalClient<
      runtime.Types.Result.GetResult<
        Prisma.$ProposalPayload<ExtArgs>,
        T,
        'delete',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Update one Proposal.
     * @param {ProposalUpdateArgs} args - Arguments to update one Proposal.
     * @example
     * // Update one Proposal
     * const proposal = await prisma.proposal.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends ProposalUpdateArgs>(
      args: SelectSubset<T, ProposalUpdateArgs<ExtArgs>>
    ): Prisma__ProposalClient<
      runtime.Types.Result.GetResult<
        Prisma.$ProposalPayload<ExtArgs>,
        T,
        'update',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Delete zero or more Proposals.
     * @param {ProposalDeleteManyArgs} args - Arguments to filter Proposals to delete.
     * @example
     * // Delete a few Proposals
     * const { count } = await prisma.proposal.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends ProposalDeleteManyArgs>(
      args?: SelectSubset<T, ProposalDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Proposals.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProposalUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Proposals
     * const proposal = await prisma.proposal.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends ProposalUpdateManyArgs>(
      args: SelectSubset<T, ProposalUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Proposals and returns the data updated in the database.
     * @param {ProposalUpdateManyAndReturnArgs} args - Arguments to update many Proposals.
     * @example
     * // Update many Proposals
     * const proposal = await prisma.proposal.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more Proposals and only return the `id`
     * const proposalWithIdOnly = await prisma.proposal.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    updateManyAndReturn<T extends ProposalUpdateManyAndReturnArgs>(
      args: SelectSubset<T, ProposalUpdateManyAndReturnArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      runtime.Types.Result.GetResult<
        Prisma.$ProposalPayload<ExtArgs>,
        T,
        'updateManyAndReturn',
        GlobalOmitOptions
      >
    >;

    /**
     * Create or update one Proposal.
     * @param {ProposalUpsertArgs} args - Arguments to update or create a Proposal.
     * @example
     * // Update or create a Proposal
     * const proposal = await prisma.proposal.upsert({
     *   create: {
     *     // ... data to create a Proposal
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Proposal we want to update
     *   }
     * })
     */
    upsert<T extends ProposalUpsertArgs>(
      args: SelectSubset<T, ProposalUpsertArgs<ExtArgs>>
    ): Prisma__ProposalClient<
      runtime.Types.Result.GetResult<
        Prisma.$ProposalPayload<ExtArgs>,
        T,
        'upsert',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Count the number of Proposals.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProposalCountArgs} args - Arguments to filter Proposals to count.
     * @example
     * // Count the number of Proposals
     * const count = await prisma.proposal.count({
     *   where: {
     *     // ... the filter for the Proposals we want to count
     *   }
     * })
     **/
    count<T extends ProposalCountArgs>(
      args?: Subset<T, ProposalCountArgs>
    ): Prisma.PrismaPromise<
      T extends runtime.Types.Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProposalCountAggregateOutputType>
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a Proposal.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProposalAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
     **/
    aggregate<T extends ProposalAggregateArgs>(
      args: Subset<T, ProposalAggregateArgs>
    ): Prisma.PrismaPromise<GetProposalAggregateType<T>>;

    /**
     * Group by Proposal.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProposalGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
     **/
    groupBy<
      T extends ProposalGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProposalGroupByArgs['orderBy'] }
        : { orderBy?: ProposalGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<
        Keys<MaybeTupleToUnion<T['orderBy']>>
      >,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
        ? `Error: "by" must not be empty.`
        : HavingValid extends False
          ? {
              [P in HavingFields]: P extends ByFields
                ? never
                : P extends string
                  ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
                  : [
                      Error,
                      'Field ',
                      P,
                      ` in "having" needs to be provided in "by"`,
                    ];
            }[HavingFields]
          : 'take' extends Keys<T>
            ? 'orderBy' extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
              : 'Error: If you provide "take", you also need to provide "orderBy"'
            : 'skip' extends Keys<T>
              ? 'orderBy' extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                      [P in OrderFields]: P extends ByFields
                        ? never
                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                    }[OrderFields]
                : 'Error: If you provide "skip", you also need to provide "orderBy"'
              : ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields],
    >(
      args: SubsetIntersection<T, ProposalGroupByArgs, OrderByArg> & InputErrors
    ): {} extends InputErrors
      ? GetProposalGroupByPayload<T>
      : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the Proposal model
     */
    readonly fields: ProposalFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Proposal.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProposalClient<
    T,
    Null = never,
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    user<T extends UserDefaultArgs<ExtArgs> = {}>(
      args?: Subset<T, UserDefaultArgs<ExtArgs>>
    ): Prisma__UserClient<
      | runtime.Types.Result.GetResult<
          Prisma.$UserPayload<ExtArgs>,
          T,
          'findUniqueOrThrow',
          GlobalOmitOptions
        >
      | Null,
      Null,
      ExtArgs,
      GlobalOmitOptions
    >;
    subServices<T extends SubServicesDefaultArgs<ExtArgs> = {}>(
      args?: Subset<T, SubServicesDefaultArgs<ExtArgs>>
    ): Prisma__SubServicesClient<
      | runtime.Types.Result.GetResult<
          Prisma.$SubServicesPayload<ExtArgs>,
          T,
          'findUniqueOrThrow',
          GlobalOmitOptions
        >
      | Null,
      Null,
      ExtArgs,
      GlobalOmitOptions
    >;
    budget<T extends Proposal$budgetArgs<ExtArgs> = {}>(
      args?: Subset<T, Proposal$budgetArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      | runtime.Types.Result.GetResult<
          Prisma.$BudgetPayload<ExtArgs>,
          T,
          'findMany',
          GlobalOmitOptions
        >
      | Null
    >;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?:
        | ((value: T) => TResult1 | PromiseLike<TResult1>)
        | undefined
        | null,
      onrejected?:
        | ((reason: any) => TResult2 | PromiseLike<TResult2>)
        | undefined
        | null
    ): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?:
        | ((reason: any) => TResult | PromiseLike<TResult>)
        | undefined
        | null
    ): runtime.Types.Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(
      onfinally?: (() => void) | undefined | null
    ): runtime.Types.Utils.JsPromise<T>;
  }

  /**
   * Fields of the Proposal model
   */
  export interface ProposalFieldRefs {
    readonly id: FieldRef<'Proposal', 'Int'>;
    readonly userId: FieldRef<'Proposal', 'String'>;
    readonly serviceId: FieldRef<'Proposal', 'Int'>;
    readonly type: FieldRef<'Proposal', 'ProposalHome'>;
    readonly commune: FieldRef<'Proposal', 'Int'>;
    readonly address: FieldRef<'Proposal', 'String'>;
    readonly serviceDate: FieldRef<'Proposal', 'DateTime'>;
    readonly description: FieldRef<'Proposal', 'String'>;
    readonly active: FieldRef<'Proposal', 'Boolean'>;
    readonly createdAt: FieldRef<'Proposal', 'DateTime'>;
    readonly updatedAt: FieldRef<'Proposal', 'DateTime'>;
  }

  // Custom InputTypes
  /**
   * Proposal findUnique
   */
  export type ProposalFindUniqueArgs<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Proposal
     */
    select?: ProposalSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Proposal
     */
    omit?: ProposalOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProposalInclude<ExtArgs> | null;
    /**
     * Filter, which Proposal to fetch.
     */
    where: ProposalWhereUniqueInput;
  };

  /**
   * Proposal findUniqueOrThrow
   */
  export type ProposalFindUniqueOrThrowArgs<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Proposal
     */
    select?: ProposalSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Proposal
     */
    omit?: ProposalOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProposalInclude<ExtArgs> | null;
    /**
     * Filter, which Proposal to fetch.
     */
    where: ProposalWhereUniqueInput;
  };

  /**
   * Proposal findFirst
   */
  export type ProposalFindFirstArgs<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Proposal
     */
    select?: ProposalSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Proposal
     */
    omit?: ProposalOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProposalInclude<ExtArgs> | null;
    /**
     * Filter, which Proposal to fetch.
     */
    where?: ProposalWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Proposals to fetch.
     */
    orderBy?:
      | ProposalOrderByWithRelationInput
      | ProposalOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Proposals.
     */
    cursor?: ProposalWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Proposals from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Proposals.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Proposals.
     */
    distinct?: ProposalScalarFieldEnum | ProposalScalarFieldEnum[];
  };

  /**
   * Proposal findFirstOrThrow
   */
  export type ProposalFindFirstOrThrowArgs<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Proposal
     */
    select?: ProposalSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Proposal
     */
    omit?: ProposalOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProposalInclude<ExtArgs> | null;
    /**
     * Filter, which Proposal to fetch.
     */
    where?: ProposalWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Proposals to fetch.
     */
    orderBy?:
      | ProposalOrderByWithRelationInput
      | ProposalOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Proposals.
     */
    cursor?: ProposalWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Proposals from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Proposals.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Proposals.
     */
    distinct?: ProposalScalarFieldEnum | ProposalScalarFieldEnum[];
  };

  /**
   * Proposal findMany
   */
  export type ProposalFindManyArgs<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Proposal
     */
    select?: ProposalSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Proposal
     */
    omit?: ProposalOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProposalInclude<ExtArgs> | null;
    /**
     * Filter, which Proposals to fetch.
     */
    where?: ProposalWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Proposals to fetch.
     */
    orderBy?:
      | ProposalOrderByWithRelationInput
      | ProposalOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Proposals.
     */
    cursor?: ProposalWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Proposals from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Proposals.
     */
    skip?: number;
    distinct?: ProposalScalarFieldEnum | ProposalScalarFieldEnum[];
  };

  /**
   * Proposal create
   */
  export type ProposalCreateArgs<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Proposal
     */
    select?: ProposalSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Proposal
     */
    omit?: ProposalOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProposalInclude<ExtArgs> | null;
    /**
     * The data needed to create a Proposal.
     */
    data: XOR<ProposalCreateInput, ProposalUncheckedCreateInput>;
  };

  /**
   * Proposal createMany
   */
  export type ProposalCreateManyArgs<
    _ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {
    /**
     * The data used to create many Proposals.
     */
    data: ProposalCreateManyInput | ProposalCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * Proposal createManyAndReturn
   */
  export type ProposalCreateManyAndReturnArgs<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Proposal
     */
    select?: ProposalSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Proposal
     */
    omit?: ProposalOmit<ExtArgs> | null;
    /**
     * The data used to create many Proposals.
     */
    data: ProposalCreateManyInput | ProposalCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProposalIncludeCreateManyAndReturn<ExtArgs> | null;
  };

  /**
   * Proposal update
   */
  export type ProposalUpdateArgs<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Proposal
     */
    select?: ProposalSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Proposal
     */
    omit?: ProposalOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProposalInclude<ExtArgs> | null;
    /**
     * The data needed to update a Proposal.
     */
    data: XOR<ProposalUpdateInput, ProposalUncheckedUpdateInput>;
    /**
     * Choose, which Proposal to update.
     */
    where: ProposalWhereUniqueInput;
  };

  /**
   * Proposal updateMany
   */
  export type ProposalUpdateManyArgs<
    _ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {
    /**
     * The data used to update Proposals.
     */
    data: XOR<
      ProposalUpdateManyMutationInput,
      ProposalUncheckedUpdateManyInput
    >;
    /**
     * Filter which Proposals to update
     */
    where?: ProposalWhereInput;
    /**
     * Limit how many Proposals to update.
     */
    limit?: number;
  };

  /**
   * Proposal updateManyAndReturn
   */
  export type ProposalUpdateManyAndReturnArgs<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Proposal
     */
    select?: ProposalSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Proposal
     */
    omit?: ProposalOmit<ExtArgs> | null;
    /**
     * The data used to update Proposals.
     */
    data: XOR<
      ProposalUpdateManyMutationInput,
      ProposalUncheckedUpdateManyInput
    >;
    /**
     * Filter which Proposals to update
     */
    where?: ProposalWhereInput;
    /**
     * Limit how many Proposals to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProposalIncludeUpdateManyAndReturn<ExtArgs> | null;
  };

  /**
   * Proposal upsert
   */
  export type ProposalUpsertArgs<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Proposal
     */
    select?: ProposalSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Proposal
     */
    omit?: ProposalOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProposalInclude<ExtArgs> | null;
    /**
     * The filter to search for the Proposal to update in case it exists.
     */
    where: ProposalWhereUniqueInput;
    /**
     * In case the Proposal found by the `where` argument doesn't exist, create a new Proposal with this data.
     */
    create: XOR<ProposalCreateInput, ProposalUncheckedCreateInput>;
    /**
     * In case the Proposal was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProposalUpdateInput, ProposalUncheckedUpdateInput>;
  };

  /**
   * Proposal delete
   */
  export type ProposalDeleteArgs<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Proposal
     */
    select?: ProposalSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Proposal
     */
    omit?: ProposalOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProposalInclude<ExtArgs> | null;
    /**
     * Filter which Proposal to delete.
     */
    where: ProposalWhereUniqueInput;
  };

  /**
   * Proposal deleteMany
   */
  export type ProposalDeleteManyArgs<
    _ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Proposals to delete
     */
    where?: ProposalWhereInput;
    /**
     * Limit how many Proposals to delete.
     */
    limit?: number;
  };

  /**
   * Proposal.budget
   */
  export type Proposal$budgetArgs<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Budget
     */
    select?: BudgetSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Budget
     */
    omit?: BudgetOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BudgetInclude<ExtArgs> | null;
    where?: BudgetWhereInput;
    orderBy?: BudgetOrderByWithRelationInput | BudgetOrderByWithRelationInput[];
    cursor?: BudgetWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: BudgetScalarFieldEnum | BudgetScalarFieldEnum[];
  };

  /**
   * Proposal without action
   */
  export type ProposalDefaultArgs<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Proposal
     */
    select?: ProposalSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Proposal
     */
    omit?: ProposalOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProposalInclude<ExtArgs> | null;
  };

  /**
   * Model Services
   */

  export type AggregateServices = {
    _count: ServicesCountAggregateOutputType | null;
    _avg: ServicesAvgAggregateOutputType | null;
    _sum: ServicesSumAggregateOutputType | null;
    _min: ServicesMinAggregateOutputType | null;
    _max: ServicesMaxAggregateOutputType | null;
  };

  export type ServicesAvgAggregateOutputType = {
    id: number | null;
  };

  export type ServicesSumAggregateOutputType = {
    id: number | null;
  };

  export type ServicesMinAggregateOutputType = {
    id: number | null;
    name: string | null;
    description: string | null;
    slug: string | null;
    icon: string | null;
    active: boolean | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  };

  export type ServicesMaxAggregateOutputType = {
    id: number | null;
    name: string | null;
    description: string | null;
    slug: string | null;
    icon: string | null;
    active: boolean | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  };

  export type ServicesCountAggregateOutputType = {
    id: number;
    name: number;
    description: number;
    slug: number;
    icon: number;
    active: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
  };

  export type ServicesAvgAggregateInputType = {
    id?: true;
  };

  export type ServicesSumAggregateInputType = {
    id?: true;
  };

  export type ServicesMinAggregateInputType = {
    id?: true;
    name?: true;
    description?: true;
    slug?: true;
    icon?: true;
    active?: true;
    createdAt?: true;
    updatedAt?: true;
  };

  export type ServicesMaxAggregateInputType = {
    id?: true;
    name?: true;
    description?: true;
    slug?: true;
    icon?: true;
    active?: true;
    createdAt?: true;
    updatedAt?: true;
  };

  export type ServicesCountAggregateInputType = {
    id?: true;
    name?: true;
    description?: true;
    slug?: true;
    icon?: true;
    active?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
  };

  export type ServicesAggregateArgs<
    _ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Services to aggregate.
     */
    where?: ServicesWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Services to fetch.
     */
    orderBy?:
      | ServicesOrderByWithRelationInput
      | ServicesOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: ServicesWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Services from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Services.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Services
     **/
    _count?: true | ServicesCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
     **/
    _avg?: ServicesAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
     **/
    _sum?: ServicesSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: ServicesMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: ServicesMaxAggregateInputType;
  };

  export type GetServicesAggregateType<T extends ServicesAggregateArgs> = {
    [P in keyof T & keyof AggregateServices]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateServices[P]>
      : GetScalarType<T[P], AggregateServices[P]>;
  };

  export type ServicesGroupByArgs<
    _ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {
    where?: ServicesWhereInput;
    orderBy?:
      | ServicesOrderByWithAggregationInput
      | ServicesOrderByWithAggregationInput[];
    by: ServicesScalarFieldEnum[] | ServicesScalarFieldEnum;
    having?: ServicesScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: ServicesCountAggregateInputType | true;
    _avg?: ServicesAvgAggregateInputType;
    _sum?: ServicesSumAggregateInputType;
    _min?: ServicesMinAggregateInputType;
    _max?: ServicesMaxAggregateInputType;
  };

  export type ServicesGroupByOutputType = {
    id: number;
    name: string;
    description: string;
    slug: string;
    icon: string;
    active: boolean;
    createdAt: Date;
    updatedAt: Date;
    _count: ServicesCountAggregateOutputType | null;
    _avg: ServicesAvgAggregateOutputType | null;
    _sum: ServicesSumAggregateOutputType | null;
    _min: ServicesMinAggregateOutputType | null;
    _max: ServicesMaxAggregateOutputType | null;
  };

  type GetServicesGroupByPayload<T extends ServicesGroupByArgs> =
    Prisma.PrismaPromise<
      Array<
        PickEnumerable<ServicesGroupByOutputType, T['by']> & {
          [P in keyof T & keyof ServicesGroupByOutputType]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ServicesGroupByOutputType[P]>
            : GetScalarType<T[P], ServicesGroupByOutputType[P]>;
        }
      >
    >;

  export type ServicesSelect<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = runtime.Types.Extensions.GetSelect<
    {
      id?: boolean;
      name?: boolean;
      description?: boolean;
      slug?: boolean;
      icon?: boolean;
      active?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
      subServices?: boolean | Services$subServicesArgs<ExtArgs>;
      _count?: boolean | ServicesCountOutputTypeDefaultArgs<ExtArgs>;
    },
    ExtArgs['result']['services']
  >;

  export type ServicesSelectCreateManyAndReturn<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = runtime.Types.Extensions.GetSelect<
    {
      id?: boolean;
      name?: boolean;
      description?: boolean;
      slug?: boolean;
      icon?: boolean;
      active?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
    },
    ExtArgs['result']['services']
  >;

  export type ServicesSelectUpdateManyAndReturn<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = runtime.Types.Extensions.GetSelect<
    {
      id?: boolean;
      name?: boolean;
      description?: boolean;
      slug?: boolean;
      icon?: boolean;
      active?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
    },
    ExtArgs['result']['services']
  >;

  export type ServicesSelectScalar = {
    id?: boolean;
    name?: boolean;
    description?: boolean;
    slug?: boolean;
    icon?: boolean;
    active?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
  };

  export type ServicesOmit<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = runtime.Types.Extensions.GetOmit<
    | 'id'
    | 'name'
    | 'description'
    | 'slug'
    | 'icon'
    | 'active'
    | 'createdAt'
    | 'updatedAt',
    ExtArgs['result']['services']
  >;
  export type ServicesInclude<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {
    subServices?: boolean | Services$subServicesArgs<ExtArgs>;
    _count?: boolean | ServicesCountOutputTypeDefaultArgs<ExtArgs>;
  };
  export type ServicesIncludeCreateManyAndReturn<
    _ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {};
  export type ServicesIncludeUpdateManyAndReturn<
    _ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {};

  export type $ServicesPayload<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {
    name: 'Services';
    objects: {
      subServices: Prisma.$SubServicesPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<
      {
        id: number;
        name: string;
        description: string;
        slug: string;
        icon: string;
        active: boolean;
        createdAt: Date;
        updatedAt: Date;
      },
      ExtArgs['result']['services']
    >;
    composites: {};
  };

  export type ServicesGetPayload<
    S extends boolean | null | undefined | ServicesDefaultArgs,
  > = runtime.Types.Result.GetResult<Prisma.$ServicesPayload, S>;

  export type ServicesCountArgs<
    _ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = Omit<ServicesFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: ServicesCountAggregateInputType | true;
  };

  export interface ServicesDelegate<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > {
    [K: symbol]: {
      types: Prisma.TypeMap<ExtArgs>['model']['Services'];
      meta: { name: 'Services' };
    };
    /**
     * Find zero or one Services that matches the filter.
     * @param {ServicesFindUniqueArgs} args - Arguments to find a Services
     * @example
     * // Get one Services
     * const services = await prisma.services.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ServicesFindUniqueArgs>(
      args: SelectSubset<T, ServicesFindUniqueArgs<ExtArgs>>
    ): Prisma__ServicesClient<
      runtime.Types.Result.GetResult<
        Prisma.$ServicesPayload<ExtArgs>,
        T,
        'findUnique',
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find one Services that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ServicesFindUniqueOrThrowArgs} args - Arguments to find a Services
     * @example
     * // Get one Services
     * const services = await prisma.services.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ServicesFindUniqueOrThrowArgs>(
      args: SelectSubset<T, ServicesFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__ServicesClient<
      runtime.Types.Result.GetResult<
        Prisma.$ServicesPayload<ExtArgs>,
        T,
        'findUniqueOrThrow',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first Services that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServicesFindFirstArgs} args - Arguments to find a Services
     * @example
     * // Get one Services
     * const services = await prisma.services.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ServicesFindFirstArgs>(
      args?: SelectSubset<T, ServicesFindFirstArgs<ExtArgs>>
    ): Prisma__ServicesClient<
      runtime.Types.Result.GetResult<
        Prisma.$ServicesPayload<ExtArgs>,
        T,
        'findFirst',
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first Services that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServicesFindFirstOrThrowArgs} args - Arguments to find a Services
     * @example
     * // Get one Services
     * const services = await prisma.services.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ServicesFindFirstOrThrowArgs>(
      args?: SelectSubset<T, ServicesFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__ServicesClient<
      runtime.Types.Result.GetResult<
        Prisma.$ServicesPayload<ExtArgs>,
        T,
        'findFirstOrThrow',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find zero or more Services that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServicesFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Services
     * const services = await prisma.services.findMany()
     *
     * // Get first 10 Services
     * const services = await prisma.services.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const servicesWithIdOnly = await prisma.services.findMany({ select: { id: true } })
     *
     */
    findMany<T extends ServicesFindManyArgs>(
      args?: SelectSubset<T, ServicesFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      runtime.Types.Result.GetResult<
        Prisma.$ServicesPayload<ExtArgs>,
        T,
        'findMany',
        GlobalOmitOptions
      >
    >;

    /**
     * Create a Services.
     * @param {ServicesCreateArgs} args - Arguments to create a Services.
     * @example
     * // Create one Services
     * const Services = await prisma.services.create({
     *   data: {
     *     // ... data to create a Services
     *   }
     * })
     *
     */
    create<T extends ServicesCreateArgs>(
      args: SelectSubset<T, ServicesCreateArgs<ExtArgs>>
    ): Prisma__ServicesClient<
      runtime.Types.Result.GetResult<
        Prisma.$ServicesPayload<ExtArgs>,
        T,
        'create',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Create many Services.
     * @param {ServicesCreateManyArgs} args - Arguments to create many Services.
     * @example
     * // Create many Services
     * const services = await prisma.services.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends ServicesCreateManyArgs>(
      args?: SelectSubset<T, ServicesCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create many Services and returns the data saved in the database.
     * @param {ServicesCreateManyAndReturnArgs} args - Arguments to create many Services.
     * @example
     * // Create many Services
     * const services = await prisma.services.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Services and only return the `id`
     * const servicesWithIdOnly = await prisma.services.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends ServicesCreateManyAndReturnArgs>(
      args?: SelectSubset<T, ServicesCreateManyAndReturnArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      runtime.Types.Result.GetResult<
        Prisma.$ServicesPayload<ExtArgs>,
        T,
        'createManyAndReturn',
        GlobalOmitOptions
      >
    >;

    /**
     * Delete a Services.
     * @param {ServicesDeleteArgs} args - Arguments to delete one Services.
     * @example
     * // Delete one Services
     * const Services = await prisma.services.delete({
     *   where: {
     *     // ... filter to delete one Services
     *   }
     * })
     *
     */
    delete<T extends ServicesDeleteArgs>(
      args: SelectSubset<T, ServicesDeleteArgs<ExtArgs>>
    ): Prisma__ServicesClient<
      runtime.Types.Result.GetResult<
        Prisma.$ServicesPayload<ExtArgs>,
        T,
        'delete',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Update one Services.
     * @param {ServicesUpdateArgs} args - Arguments to update one Services.
     * @example
     * // Update one Services
     * const services = await prisma.services.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends ServicesUpdateArgs>(
      args: SelectSubset<T, ServicesUpdateArgs<ExtArgs>>
    ): Prisma__ServicesClient<
      runtime.Types.Result.GetResult<
        Prisma.$ServicesPayload<ExtArgs>,
        T,
        'update',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Delete zero or more Services.
     * @param {ServicesDeleteManyArgs} args - Arguments to filter Services to delete.
     * @example
     * // Delete a few Services
     * const { count } = await prisma.services.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends ServicesDeleteManyArgs>(
      args?: SelectSubset<T, ServicesDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Services.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServicesUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Services
     * const services = await prisma.services.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends ServicesUpdateManyArgs>(
      args: SelectSubset<T, ServicesUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Services and returns the data updated in the database.
     * @param {ServicesUpdateManyAndReturnArgs} args - Arguments to update many Services.
     * @example
     * // Update many Services
     * const services = await prisma.services.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more Services and only return the `id`
     * const servicesWithIdOnly = await prisma.services.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    updateManyAndReturn<T extends ServicesUpdateManyAndReturnArgs>(
      args: SelectSubset<T, ServicesUpdateManyAndReturnArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      runtime.Types.Result.GetResult<
        Prisma.$ServicesPayload<ExtArgs>,
        T,
        'updateManyAndReturn',
        GlobalOmitOptions
      >
    >;

    /**
     * Create or update one Services.
     * @param {ServicesUpsertArgs} args - Arguments to update or create a Services.
     * @example
     * // Update or create a Services
     * const services = await prisma.services.upsert({
     *   create: {
     *     // ... data to create a Services
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Services we want to update
     *   }
     * })
     */
    upsert<T extends ServicesUpsertArgs>(
      args: SelectSubset<T, ServicesUpsertArgs<ExtArgs>>
    ): Prisma__ServicesClient<
      runtime.Types.Result.GetResult<
        Prisma.$ServicesPayload<ExtArgs>,
        T,
        'upsert',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Count the number of Services.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServicesCountArgs} args - Arguments to filter Services to count.
     * @example
     * // Count the number of Services
     * const count = await prisma.services.count({
     *   where: {
     *     // ... the filter for the Services we want to count
     *   }
     * })
     **/
    count<T extends ServicesCountArgs>(
      args?: Subset<T, ServicesCountArgs>
    ): Prisma.PrismaPromise<
      T extends runtime.Types.Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ServicesCountAggregateOutputType>
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a Services.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServicesAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
     **/
    aggregate<T extends ServicesAggregateArgs>(
      args: Subset<T, ServicesAggregateArgs>
    ): Prisma.PrismaPromise<GetServicesAggregateType<T>>;

    /**
     * Group by Services.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServicesGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
     **/
    groupBy<
      T extends ServicesGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ServicesGroupByArgs['orderBy'] }
        : { orderBy?: ServicesGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<
        Keys<MaybeTupleToUnion<T['orderBy']>>
      >,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
        ? `Error: "by" must not be empty.`
        : HavingValid extends False
          ? {
              [P in HavingFields]: P extends ByFields
                ? never
                : P extends string
                  ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
                  : [
                      Error,
                      'Field ',
                      P,
                      ` in "having" needs to be provided in "by"`,
                    ];
            }[HavingFields]
          : 'take' extends Keys<T>
            ? 'orderBy' extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
              : 'Error: If you provide "take", you also need to provide "orderBy"'
            : 'skip' extends Keys<T>
              ? 'orderBy' extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                      [P in OrderFields]: P extends ByFields
                        ? never
                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                    }[OrderFields]
                : 'Error: If you provide "skip", you also need to provide "orderBy"'
              : ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields],
    >(
      args: SubsetIntersection<T, ServicesGroupByArgs, OrderByArg> & InputErrors
    ): {} extends InputErrors
      ? GetServicesGroupByPayload<T>
      : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the Services model
     */
    readonly fields: ServicesFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Services.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ServicesClient<
    T,
    Null = never,
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    subServices<T extends Services$subServicesArgs<ExtArgs> = {}>(
      args?: Subset<T, Services$subServicesArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      | runtime.Types.Result.GetResult<
          Prisma.$SubServicesPayload<ExtArgs>,
          T,
          'findMany',
          GlobalOmitOptions
        >
      | Null
    >;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?:
        | ((value: T) => TResult1 | PromiseLike<TResult1>)
        | undefined
        | null,
      onrejected?:
        | ((reason: any) => TResult2 | PromiseLike<TResult2>)
        | undefined
        | null
    ): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?:
        | ((reason: any) => TResult | PromiseLike<TResult>)
        | undefined
        | null
    ): runtime.Types.Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(
      onfinally?: (() => void) | undefined | null
    ): runtime.Types.Utils.JsPromise<T>;
  }

  /**
   * Fields of the Services model
   */
  export interface ServicesFieldRefs {
    readonly id: FieldRef<'Services', 'Int'>;
    readonly name: FieldRef<'Services', 'String'>;
    readonly description: FieldRef<'Services', 'String'>;
    readonly slug: FieldRef<'Services', 'String'>;
    readonly icon: FieldRef<'Services', 'String'>;
    readonly active: FieldRef<'Services', 'Boolean'>;
    readonly createdAt: FieldRef<'Services', 'DateTime'>;
    readonly updatedAt: FieldRef<'Services', 'DateTime'>;
  }

  // Custom InputTypes
  /**
   * Services findUnique
   */
  export type ServicesFindUniqueArgs<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Services
     */
    select?: ServicesSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Services
     */
    omit?: ServicesOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServicesInclude<ExtArgs> | null;
    /**
     * Filter, which Services to fetch.
     */
    where: ServicesWhereUniqueInput;
  };

  /**
   * Services findUniqueOrThrow
   */
  export type ServicesFindUniqueOrThrowArgs<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Services
     */
    select?: ServicesSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Services
     */
    omit?: ServicesOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServicesInclude<ExtArgs> | null;
    /**
     * Filter, which Services to fetch.
     */
    where: ServicesWhereUniqueInput;
  };

  /**
   * Services findFirst
   */
  export type ServicesFindFirstArgs<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Services
     */
    select?: ServicesSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Services
     */
    omit?: ServicesOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServicesInclude<ExtArgs> | null;
    /**
     * Filter, which Services to fetch.
     */
    where?: ServicesWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Services to fetch.
     */
    orderBy?:
      | ServicesOrderByWithRelationInput
      | ServicesOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Services.
     */
    cursor?: ServicesWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Services from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Services.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Services.
     */
    distinct?: ServicesScalarFieldEnum | ServicesScalarFieldEnum[];
  };

  /**
   * Services findFirstOrThrow
   */
  export type ServicesFindFirstOrThrowArgs<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Services
     */
    select?: ServicesSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Services
     */
    omit?: ServicesOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServicesInclude<ExtArgs> | null;
    /**
     * Filter, which Services to fetch.
     */
    where?: ServicesWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Services to fetch.
     */
    orderBy?:
      | ServicesOrderByWithRelationInput
      | ServicesOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Services.
     */
    cursor?: ServicesWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Services from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Services.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Services.
     */
    distinct?: ServicesScalarFieldEnum | ServicesScalarFieldEnum[];
  };

  /**
   * Services findMany
   */
  export type ServicesFindManyArgs<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Services
     */
    select?: ServicesSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Services
     */
    omit?: ServicesOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServicesInclude<ExtArgs> | null;
    /**
     * Filter, which Services to fetch.
     */
    where?: ServicesWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Services to fetch.
     */
    orderBy?:
      | ServicesOrderByWithRelationInput
      | ServicesOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Services.
     */
    cursor?: ServicesWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Services from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Services.
     */
    skip?: number;
    distinct?: ServicesScalarFieldEnum | ServicesScalarFieldEnum[];
  };

  /**
   * Services create
   */
  export type ServicesCreateArgs<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Services
     */
    select?: ServicesSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Services
     */
    omit?: ServicesOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServicesInclude<ExtArgs> | null;
    /**
     * The data needed to create a Services.
     */
    data: XOR<ServicesCreateInput, ServicesUncheckedCreateInput>;
  };

  /**
   * Services createMany
   */
  export type ServicesCreateManyArgs<
    _ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {
    /**
     * The data used to create many Services.
     */
    data: ServicesCreateManyInput | ServicesCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * Services createManyAndReturn
   */
  export type ServicesCreateManyAndReturnArgs<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Services
     */
    select?: ServicesSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Services
     */
    omit?: ServicesOmit<ExtArgs> | null;
    /**
     * The data used to create many Services.
     */
    data: ServicesCreateManyInput | ServicesCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * Services update
   */
  export type ServicesUpdateArgs<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Services
     */
    select?: ServicesSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Services
     */
    omit?: ServicesOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServicesInclude<ExtArgs> | null;
    /**
     * The data needed to update a Services.
     */
    data: XOR<ServicesUpdateInput, ServicesUncheckedUpdateInput>;
    /**
     * Choose, which Services to update.
     */
    where: ServicesWhereUniqueInput;
  };

  /**
   * Services updateMany
   */
  export type ServicesUpdateManyArgs<
    _ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {
    /**
     * The data used to update Services.
     */
    data: XOR<
      ServicesUpdateManyMutationInput,
      ServicesUncheckedUpdateManyInput
    >;
    /**
     * Filter which Services to update
     */
    where?: ServicesWhereInput;
    /**
     * Limit how many Services to update.
     */
    limit?: number;
  };

  /**
   * Services updateManyAndReturn
   */
  export type ServicesUpdateManyAndReturnArgs<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Services
     */
    select?: ServicesSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Services
     */
    omit?: ServicesOmit<ExtArgs> | null;
    /**
     * The data used to update Services.
     */
    data: XOR<
      ServicesUpdateManyMutationInput,
      ServicesUncheckedUpdateManyInput
    >;
    /**
     * Filter which Services to update
     */
    where?: ServicesWhereInput;
    /**
     * Limit how many Services to update.
     */
    limit?: number;
  };

  /**
   * Services upsert
   */
  export type ServicesUpsertArgs<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Services
     */
    select?: ServicesSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Services
     */
    omit?: ServicesOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServicesInclude<ExtArgs> | null;
    /**
     * The filter to search for the Services to update in case it exists.
     */
    where: ServicesWhereUniqueInput;
    /**
     * In case the Services found by the `where` argument doesn't exist, create a new Services with this data.
     */
    create: XOR<ServicesCreateInput, ServicesUncheckedCreateInput>;
    /**
     * In case the Services was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ServicesUpdateInput, ServicesUncheckedUpdateInput>;
  };

  /**
   * Services delete
   */
  export type ServicesDeleteArgs<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Services
     */
    select?: ServicesSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Services
     */
    omit?: ServicesOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServicesInclude<ExtArgs> | null;
    /**
     * Filter which Services to delete.
     */
    where: ServicesWhereUniqueInput;
  };

  /**
   * Services deleteMany
   */
  export type ServicesDeleteManyArgs<
    _ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Services to delete
     */
    where?: ServicesWhereInput;
    /**
     * Limit how many Services to delete.
     */
    limit?: number;
  };

  /**
   * Services.subServices
   */
  export type Services$subServicesArgs<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the SubServices
     */
    select?: SubServicesSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the SubServices
     */
    omit?: SubServicesOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubServicesInclude<ExtArgs> | null;
    where?: SubServicesWhereInput;
    orderBy?:
      | SubServicesOrderByWithRelationInput
      | SubServicesOrderByWithRelationInput[];
    cursor?: SubServicesWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: SubServicesScalarFieldEnum | SubServicesScalarFieldEnum[];
  };

  /**
   * Services without action
   */
  export type ServicesDefaultArgs<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Services
     */
    select?: ServicesSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Services
     */
    omit?: ServicesOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServicesInclude<ExtArgs> | null;
  };

  /**
   * Model SubServices
   */

  export type AggregateSubServices = {
    _count: SubServicesCountAggregateOutputType | null;
    _avg: SubServicesAvgAggregateOutputType | null;
    _sum: SubServicesSumAggregateOutputType | null;
    _min: SubServicesMinAggregateOutputType | null;
    _max: SubServicesMaxAggregateOutputType | null;
  };

  export type SubServicesAvgAggregateOutputType = {
    id: number | null;
    idService: number | null;
  };

  export type SubServicesSumAggregateOutputType = {
    id: number | null;
    idService: number | null;
  };

  export type SubServicesMinAggregateOutputType = {
    id: number | null;
    idService: number | null;
    name: string | null;
    description: string | null;
    active: boolean | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  };

  export type SubServicesMaxAggregateOutputType = {
    id: number | null;
    idService: number | null;
    name: string | null;
    description: string | null;
    active: boolean | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  };

  export type SubServicesCountAggregateOutputType = {
    id: number;
    idService: number;
    name: number;
    description: number;
    active: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
  };

  export type SubServicesAvgAggregateInputType = {
    id?: true;
    idService?: true;
  };

  export type SubServicesSumAggregateInputType = {
    id?: true;
    idService?: true;
  };

  export type SubServicesMinAggregateInputType = {
    id?: true;
    idService?: true;
    name?: true;
    description?: true;
    active?: true;
    createdAt?: true;
    updatedAt?: true;
  };

  export type SubServicesMaxAggregateInputType = {
    id?: true;
    idService?: true;
    name?: true;
    description?: true;
    active?: true;
    createdAt?: true;
    updatedAt?: true;
  };

  export type SubServicesCountAggregateInputType = {
    id?: true;
    idService?: true;
    name?: true;
    description?: true;
    active?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
  };

  export type SubServicesAggregateArgs<
    _ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {
    /**
     * Filter which SubServices to aggregate.
     */
    where?: SubServicesWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of SubServices to fetch.
     */
    orderBy?:
      | SubServicesOrderByWithRelationInput
      | SubServicesOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: SubServicesWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` SubServices from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` SubServices.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned SubServices
     **/
    _count?: true | SubServicesCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
     **/
    _avg?: SubServicesAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
     **/
    _sum?: SubServicesSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: SubServicesMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: SubServicesMaxAggregateInputType;
  };

  export type GetSubServicesAggregateType<T extends SubServicesAggregateArgs> =
    {
      [P in keyof T & keyof AggregateSubServices]: P extends '_count' | 'count'
        ? T[P] extends true
          ? number
          : GetScalarType<T[P], AggregateSubServices[P]>
        : GetScalarType<T[P], AggregateSubServices[P]>;
    };

  export type SubServicesGroupByArgs<
    _ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {
    where?: SubServicesWhereInput;
    orderBy?:
      | SubServicesOrderByWithAggregationInput
      | SubServicesOrderByWithAggregationInput[];
    by: SubServicesScalarFieldEnum[] | SubServicesScalarFieldEnum;
    having?: SubServicesScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: SubServicesCountAggregateInputType | true;
    _avg?: SubServicesAvgAggregateInputType;
    _sum?: SubServicesSumAggregateInputType;
    _min?: SubServicesMinAggregateInputType;
    _max?: SubServicesMaxAggregateInputType;
  };

  export type SubServicesGroupByOutputType = {
    id: number;
    idService: number;
    name: string;
    description: string;
    active: boolean;
    createdAt: Date;
    updatedAt: Date;
    _count: SubServicesCountAggregateOutputType | null;
    _avg: SubServicesAvgAggregateOutputType | null;
    _sum: SubServicesSumAggregateOutputType | null;
    _min: SubServicesMinAggregateOutputType | null;
    _max: SubServicesMaxAggregateOutputType | null;
  };

  type GetSubServicesGroupByPayload<T extends SubServicesGroupByArgs> =
    Prisma.PrismaPromise<
      Array<
        PickEnumerable<SubServicesGroupByOutputType, T['by']> & {
          [P in keyof T &
            keyof SubServicesGroupByOutputType]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SubServicesGroupByOutputType[P]>
            : GetScalarType<T[P], SubServicesGroupByOutputType[P]>;
        }
      >
    >;

  export type SubServicesSelect<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = runtime.Types.Extensions.GetSelect<
    {
      id?: boolean;
      idService?: boolean;
      name?: boolean;
      description?: boolean;
      active?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
      service?: boolean | ServicesDefaultArgs<ExtArgs>;
      proposal?: boolean | SubServices$proposalArgs<ExtArgs>;
      _count?: boolean | SubServicesCountOutputTypeDefaultArgs<ExtArgs>;
    },
    ExtArgs['result']['subServices']
  >;

  export type SubServicesSelectCreateManyAndReturn<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = runtime.Types.Extensions.GetSelect<
    {
      id?: boolean;
      idService?: boolean;
      name?: boolean;
      description?: boolean;
      active?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
      service?: boolean | ServicesDefaultArgs<ExtArgs>;
    },
    ExtArgs['result']['subServices']
  >;

  export type SubServicesSelectUpdateManyAndReturn<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = runtime.Types.Extensions.GetSelect<
    {
      id?: boolean;
      idService?: boolean;
      name?: boolean;
      description?: boolean;
      active?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
      service?: boolean | ServicesDefaultArgs<ExtArgs>;
    },
    ExtArgs['result']['subServices']
  >;

  export type SubServicesSelectScalar = {
    id?: boolean;
    idService?: boolean;
    name?: boolean;
    description?: boolean;
    active?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
  };

  export type SubServicesOmit<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = runtime.Types.Extensions.GetOmit<
    | 'id'
    | 'idService'
    | 'name'
    | 'description'
    | 'active'
    | 'createdAt'
    | 'updatedAt',
    ExtArgs['result']['subServices']
  >;
  export type SubServicesInclude<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {
    service?: boolean | ServicesDefaultArgs<ExtArgs>;
    proposal?: boolean | SubServices$proposalArgs<ExtArgs>;
    _count?: boolean | SubServicesCountOutputTypeDefaultArgs<ExtArgs>;
  };
  export type SubServicesIncludeCreateManyAndReturn<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {
    service?: boolean | ServicesDefaultArgs<ExtArgs>;
  };
  export type SubServicesIncludeUpdateManyAndReturn<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {
    service?: boolean | ServicesDefaultArgs<ExtArgs>;
  };

  export type $SubServicesPayload<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {
    name: 'SubServices';
    objects: {
      service: Prisma.$ServicesPayload<ExtArgs>;
      proposal: Prisma.$ProposalPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<
      {
        id: number;
        idService: number;
        name: string;
        description: string;
        active: boolean;
        createdAt: Date;
        updatedAt: Date;
      },
      ExtArgs['result']['subServices']
    >;
    composites: {};
  };

  export type SubServicesGetPayload<
    S extends boolean | null | undefined | SubServicesDefaultArgs,
  > = runtime.Types.Result.GetResult<Prisma.$SubServicesPayload, S>;

  export type SubServicesCountArgs<
    _ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = Omit<
    SubServicesFindManyArgs,
    'select' | 'include' | 'distinct' | 'omit'
  > & {
    select?: SubServicesCountAggregateInputType | true;
  };

  export interface SubServicesDelegate<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > {
    [K: symbol]: {
      types: Prisma.TypeMap<ExtArgs>['model']['SubServices'];
      meta: { name: 'SubServices' };
    };
    /**
     * Find zero or one SubServices that matches the filter.
     * @param {SubServicesFindUniqueArgs} args - Arguments to find a SubServices
     * @example
     * // Get one SubServices
     * const subServices = await prisma.subServices.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SubServicesFindUniqueArgs>(
      args: SelectSubset<T, SubServicesFindUniqueArgs<ExtArgs>>
    ): Prisma__SubServicesClient<
      runtime.Types.Result.GetResult<
        Prisma.$SubServicesPayload<ExtArgs>,
        T,
        'findUnique',
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find one SubServices that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SubServicesFindUniqueOrThrowArgs} args - Arguments to find a SubServices
     * @example
     * // Get one SubServices
     * const subServices = await prisma.subServices.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SubServicesFindUniqueOrThrowArgs>(
      args: SelectSubset<T, SubServicesFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__SubServicesClient<
      runtime.Types.Result.GetResult<
        Prisma.$SubServicesPayload<ExtArgs>,
        T,
        'findUniqueOrThrow',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first SubServices that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubServicesFindFirstArgs} args - Arguments to find a SubServices
     * @example
     * // Get one SubServices
     * const subServices = await prisma.subServices.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SubServicesFindFirstArgs>(
      args?: SelectSubset<T, SubServicesFindFirstArgs<ExtArgs>>
    ): Prisma__SubServicesClient<
      runtime.Types.Result.GetResult<
        Prisma.$SubServicesPayload<ExtArgs>,
        T,
        'findFirst',
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first SubServices that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubServicesFindFirstOrThrowArgs} args - Arguments to find a SubServices
     * @example
     * // Get one SubServices
     * const subServices = await prisma.subServices.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SubServicesFindFirstOrThrowArgs>(
      args?: SelectSubset<T, SubServicesFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__SubServicesClient<
      runtime.Types.Result.GetResult<
        Prisma.$SubServicesPayload<ExtArgs>,
        T,
        'findFirstOrThrow',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find zero or more SubServices that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubServicesFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SubServices
     * const subServices = await prisma.subServices.findMany()
     *
     * // Get first 10 SubServices
     * const subServices = await prisma.subServices.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const subServicesWithIdOnly = await prisma.subServices.findMany({ select: { id: true } })
     *
     */
    findMany<T extends SubServicesFindManyArgs>(
      args?: SelectSubset<T, SubServicesFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      runtime.Types.Result.GetResult<
        Prisma.$SubServicesPayload<ExtArgs>,
        T,
        'findMany',
        GlobalOmitOptions
      >
    >;

    /**
     * Create a SubServices.
     * @param {SubServicesCreateArgs} args - Arguments to create a SubServices.
     * @example
     * // Create one SubServices
     * const SubServices = await prisma.subServices.create({
     *   data: {
     *     // ... data to create a SubServices
     *   }
     * })
     *
     */
    create<T extends SubServicesCreateArgs>(
      args: SelectSubset<T, SubServicesCreateArgs<ExtArgs>>
    ): Prisma__SubServicesClient<
      runtime.Types.Result.GetResult<
        Prisma.$SubServicesPayload<ExtArgs>,
        T,
        'create',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Create many SubServices.
     * @param {SubServicesCreateManyArgs} args - Arguments to create many SubServices.
     * @example
     * // Create many SubServices
     * const subServices = await prisma.subServices.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends SubServicesCreateManyArgs>(
      args?: SelectSubset<T, SubServicesCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create many SubServices and returns the data saved in the database.
     * @param {SubServicesCreateManyAndReturnArgs} args - Arguments to create many SubServices.
     * @example
     * // Create many SubServices
     * const subServices = await prisma.subServices.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many SubServices and only return the `id`
     * const subServicesWithIdOnly = await prisma.subServices.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends SubServicesCreateManyAndReturnArgs>(
      args?: SelectSubset<T, SubServicesCreateManyAndReturnArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      runtime.Types.Result.GetResult<
        Prisma.$SubServicesPayload<ExtArgs>,
        T,
        'createManyAndReturn',
        GlobalOmitOptions
      >
    >;

    /**
     * Delete a SubServices.
     * @param {SubServicesDeleteArgs} args - Arguments to delete one SubServices.
     * @example
     * // Delete one SubServices
     * const SubServices = await prisma.subServices.delete({
     *   where: {
     *     // ... filter to delete one SubServices
     *   }
     * })
     *
     */
    delete<T extends SubServicesDeleteArgs>(
      args: SelectSubset<T, SubServicesDeleteArgs<ExtArgs>>
    ): Prisma__SubServicesClient<
      runtime.Types.Result.GetResult<
        Prisma.$SubServicesPayload<ExtArgs>,
        T,
        'delete',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Update one SubServices.
     * @param {SubServicesUpdateArgs} args - Arguments to update one SubServices.
     * @example
     * // Update one SubServices
     * const subServices = await prisma.subServices.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends SubServicesUpdateArgs>(
      args: SelectSubset<T, SubServicesUpdateArgs<ExtArgs>>
    ): Prisma__SubServicesClient<
      runtime.Types.Result.GetResult<
        Prisma.$SubServicesPayload<ExtArgs>,
        T,
        'update',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Delete zero or more SubServices.
     * @param {SubServicesDeleteManyArgs} args - Arguments to filter SubServices to delete.
     * @example
     * // Delete a few SubServices
     * const { count } = await prisma.subServices.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends SubServicesDeleteManyArgs>(
      args?: SelectSubset<T, SubServicesDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more SubServices.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubServicesUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SubServices
     * const subServices = await prisma.subServices.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends SubServicesUpdateManyArgs>(
      args: SelectSubset<T, SubServicesUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more SubServices and returns the data updated in the database.
     * @param {SubServicesUpdateManyAndReturnArgs} args - Arguments to update many SubServices.
     * @example
     * // Update many SubServices
     * const subServices = await prisma.subServices.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more SubServices and only return the `id`
     * const subServicesWithIdOnly = await prisma.subServices.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    updateManyAndReturn<T extends SubServicesUpdateManyAndReturnArgs>(
      args: SelectSubset<T, SubServicesUpdateManyAndReturnArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      runtime.Types.Result.GetResult<
        Prisma.$SubServicesPayload<ExtArgs>,
        T,
        'updateManyAndReturn',
        GlobalOmitOptions
      >
    >;

    /**
     * Create or update one SubServices.
     * @param {SubServicesUpsertArgs} args - Arguments to update or create a SubServices.
     * @example
     * // Update or create a SubServices
     * const subServices = await prisma.subServices.upsert({
     *   create: {
     *     // ... data to create a SubServices
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SubServices we want to update
     *   }
     * })
     */
    upsert<T extends SubServicesUpsertArgs>(
      args: SelectSubset<T, SubServicesUpsertArgs<ExtArgs>>
    ): Prisma__SubServicesClient<
      runtime.Types.Result.GetResult<
        Prisma.$SubServicesPayload<ExtArgs>,
        T,
        'upsert',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Count the number of SubServices.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubServicesCountArgs} args - Arguments to filter SubServices to count.
     * @example
     * // Count the number of SubServices
     * const count = await prisma.subServices.count({
     *   where: {
     *     // ... the filter for the SubServices we want to count
     *   }
     * })
     **/
    count<T extends SubServicesCountArgs>(
      args?: Subset<T, SubServicesCountArgs>
    ): Prisma.PrismaPromise<
      T extends runtime.Types.Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SubServicesCountAggregateOutputType>
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a SubServices.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubServicesAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
     **/
    aggregate<T extends SubServicesAggregateArgs>(
      args: Subset<T, SubServicesAggregateArgs>
    ): Prisma.PrismaPromise<GetSubServicesAggregateType<T>>;

    /**
     * Group by SubServices.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubServicesGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
     **/
    groupBy<
      T extends SubServicesGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SubServicesGroupByArgs['orderBy'] }
        : { orderBy?: SubServicesGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<
        Keys<MaybeTupleToUnion<T['orderBy']>>
      >,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
        ? `Error: "by" must not be empty.`
        : HavingValid extends False
          ? {
              [P in HavingFields]: P extends ByFields
                ? never
                : P extends string
                  ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
                  : [
                      Error,
                      'Field ',
                      P,
                      ` in "having" needs to be provided in "by"`,
                    ];
            }[HavingFields]
          : 'take' extends Keys<T>
            ? 'orderBy' extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
              : 'Error: If you provide "take", you also need to provide "orderBy"'
            : 'skip' extends Keys<T>
              ? 'orderBy' extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                      [P in OrderFields]: P extends ByFields
                        ? never
                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                    }[OrderFields]
                : 'Error: If you provide "skip", you also need to provide "orderBy"'
              : ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields],
    >(
      args: SubsetIntersection<T, SubServicesGroupByArgs, OrderByArg> &
        InputErrors
    ): {} extends InputErrors
      ? GetSubServicesGroupByPayload<T>
      : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the SubServices model
     */
    readonly fields: SubServicesFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SubServices.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SubServicesClient<
    T,
    Null = never,
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    service<T extends ServicesDefaultArgs<ExtArgs> = {}>(
      args?: Subset<T, ServicesDefaultArgs<ExtArgs>>
    ): Prisma__ServicesClient<
      | runtime.Types.Result.GetResult<
          Prisma.$ServicesPayload<ExtArgs>,
          T,
          'findUniqueOrThrow',
          GlobalOmitOptions
        >
      | Null,
      Null,
      ExtArgs,
      GlobalOmitOptions
    >;
    proposal<T extends SubServices$proposalArgs<ExtArgs> = {}>(
      args?: Subset<T, SubServices$proposalArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      | runtime.Types.Result.GetResult<
          Prisma.$ProposalPayload<ExtArgs>,
          T,
          'findMany',
          GlobalOmitOptions
        >
      | Null
    >;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?:
        | ((value: T) => TResult1 | PromiseLike<TResult1>)
        | undefined
        | null,
      onrejected?:
        | ((reason: any) => TResult2 | PromiseLike<TResult2>)
        | undefined
        | null
    ): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?:
        | ((reason: any) => TResult | PromiseLike<TResult>)
        | undefined
        | null
    ): runtime.Types.Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(
      onfinally?: (() => void) | undefined | null
    ): runtime.Types.Utils.JsPromise<T>;
  }

  /**
   * Fields of the SubServices model
   */
  export interface SubServicesFieldRefs {
    readonly id: FieldRef<'SubServices', 'Int'>;
    readonly idService: FieldRef<'SubServices', 'Int'>;
    readonly name: FieldRef<'SubServices', 'String'>;
    readonly description: FieldRef<'SubServices', 'String'>;
    readonly active: FieldRef<'SubServices', 'Boolean'>;
    readonly createdAt: FieldRef<'SubServices', 'DateTime'>;
    readonly updatedAt: FieldRef<'SubServices', 'DateTime'>;
  }

  // Custom InputTypes
  /**
   * SubServices findUnique
   */
  export type SubServicesFindUniqueArgs<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the SubServices
     */
    select?: SubServicesSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the SubServices
     */
    omit?: SubServicesOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubServicesInclude<ExtArgs> | null;
    /**
     * Filter, which SubServices to fetch.
     */
    where: SubServicesWhereUniqueInput;
  };

  /**
   * SubServices findUniqueOrThrow
   */
  export type SubServicesFindUniqueOrThrowArgs<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the SubServices
     */
    select?: SubServicesSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the SubServices
     */
    omit?: SubServicesOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubServicesInclude<ExtArgs> | null;
    /**
     * Filter, which SubServices to fetch.
     */
    where: SubServicesWhereUniqueInput;
  };

  /**
   * SubServices findFirst
   */
  export type SubServicesFindFirstArgs<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the SubServices
     */
    select?: SubServicesSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the SubServices
     */
    omit?: SubServicesOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubServicesInclude<ExtArgs> | null;
    /**
     * Filter, which SubServices to fetch.
     */
    where?: SubServicesWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of SubServices to fetch.
     */
    orderBy?:
      | SubServicesOrderByWithRelationInput
      | SubServicesOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for SubServices.
     */
    cursor?: SubServicesWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` SubServices from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` SubServices.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of SubServices.
     */
    distinct?: SubServicesScalarFieldEnum | SubServicesScalarFieldEnum[];
  };

  /**
   * SubServices findFirstOrThrow
   */
  export type SubServicesFindFirstOrThrowArgs<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the SubServices
     */
    select?: SubServicesSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the SubServices
     */
    omit?: SubServicesOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubServicesInclude<ExtArgs> | null;
    /**
     * Filter, which SubServices to fetch.
     */
    where?: SubServicesWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of SubServices to fetch.
     */
    orderBy?:
      | SubServicesOrderByWithRelationInput
      | SubServicesOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for SubServices.
     */
    cursor?: SubServicesWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` SubServices from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` SubServices.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of SubServices.
     */
    distinct?: SubServicesScalarFieldEnum | SubServicesScalarFieldEnum[];
  };

  /**
   * SubServices findMany
   */
  export type SubServicesFindManyArgs<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the SubServices
     */
    select?: SubServicesSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the SubServices
     */
    omit?: SubServicesOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubServicesInclude<ExtArgs> | null;
    /**
     * Filter, which SubServices to fetch.
     */
    where?: SubServicesWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of SubServices to fetch.
     */
    orderBy?:
      | SubServicesOrderByWithRelationInput
      | SubServicesOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing SubServices.
     */
    cursor?: SubServicesWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` SubServices from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` SubServices.
     */
    skip?: number;
    distinct?: SubServicesScalarFieldEnum | SubServicesScalarFieldEnum[];
  };

  /**
   * SubServices create
   */
  export type SubServicesCreateArgs<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the SubServices
     */
    select?: SubServicesSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the SubServices
     */
    omit?: SubServicesOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubServicesInclude<ExtArgs> | null;
    /**
     * The data needed to create a SubServices.
     */
    data: XOR<SubServicesCreateInput, SubServicesUncheckedCreateInput>;
  };

  /**
   * SubServices createMany
   */
  export type SubServicesCreateManyArgs<
    _ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {
    /**
     * The data used to create many SubServices.
     */
    data: SubServicesCreateManyInput | SubServicesCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * SubServices createManyAndReturn
   */
  export type SubServicesCreateManyAndReturnArgs<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the SubServices
     */
    select?: SubServicesSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the SubServices
     */
    omit?: SubServicesOmit<ExtArgs> | null;
    /**
     * The data used to create many SubServices.
     */
    data: SubServicesCreateManyInput | SubServicesCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubServicesIncludeCreateManyAndReturn<ExtArgs> | null;
  };

  /**
   * SubServices update
   */
  export type SubServicesUpdateArgs<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the SubServices
     */
    select?: SubServicesSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the SubServices
     */
    omit?: SubServicesOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubServicesInclude<ExtArgs> | null;
    /**
     * The data needed to update a SubServices.
     */
    data: XOR<SubServicesUpdateInput, SubServicesUncheckedUpdateInput>;
    /**
     * Choose, which SubServices to update.
     */
    where: SubServicesWhereUniqueInput;
  };

  /**
   * SubServices updateMany
   */
  export type SubServicesUpdateManyArgs<
    _ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {
    /**
     * The data used to update SubServices.
     */
    data: XOR<
      SubServicesUpdateManyMutationInput,
      SubServicesUncheckedUpdateManyInput
    >;
    /**
     * Filter which SubServices to update
     */
    where?: SubServicesWhereInput;
    /**
     * Limit how many SubServices to update.
     */
    limit?: number;
  };

  /**
   * SubServices updateManyAndReturn
   */
  export type SubServicesUpdateManyAndReturnArgs<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the SubServices
     */
    select?: SubServicesSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the SubServices
     */
    omit?: SubServicesOmit<ExtArgs> | null;
    /**
     * The data used to update SubServices.
     */
    data: XOR<
      SubServicesUpdateManyMutationInput,
      SubServicesUncheckedUpdateManyInput
    >;
    /**
     * Filter which SubServices to update
     */
    where?: SubServicesWhereInput;
    /**
     * Limit how many SubServices to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubServicesIncludeUpdateManyAndReturn<ExtArgs> | null;
  };

  /**
   * SubServices upsert
   */
  export type SubServicesUpsertArgs<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the SubServices
     */
    select?: SubServicesSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the SubServices
     */
    omit?: SubServicesOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubServicesInclude<ExtArgs> | null;
    /**
     * The filter to search for the SubServices to update in case it exists.
     */
    where: SubServicesWhereUniqueInput;
    /**
     * In case the SubServices found by the `where` argument doesn't exist, create a new SubServices with this data.
     */
    create: XOR<SubServicesCreateInput, SubServicesUncheckedCreateInput>;
    /**
     * In case the SubServices was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SubServicesUpdateInput, SubServicesUncheckedUpdateInput>;
  };

  /**
   * SubServices delete
   */
  export type SubServicesDeleteArgs<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the SubServices
     */
    select?: SubServicesSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the SubServices
     */
    omit?: SubServicesOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubServicesInclude<ExtArgs> | null;
    /**
     * Filter which SubServices to delete.
     */
    where: SubServicesWhereUniqueInput;
  };

  /**
   * SubServices deleteMany
   */
  export type SubServicesDeleteManyArgs<
    _ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {
    /**
     * Filter which SubServices to delete
     */
    where?: SubServicesWhereInput;
    /**
     * Limit how many SubServices to delete.
     */
    limit?: number;
  };

  /**
   * SubServices.proposal
   */
  export type SubServices$proposalArgs<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Proposal
     */
    select?: ProposalSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Proposal
     */
    omit?: ProposalOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProposalInclude<ExtArgs> | null;
    where?: ProposalWhereInput;
    orderBy?:
      | ProposalOrderByWithRelationInput
      | ProposalOrderByWithRelationInput[];
    cursor?: ProposalWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: ProposalScalarFieldEnum | ProposalScalarFieldEnum[];
  };

  /**
   * SubServices without action
   */
  export type SubServicesDefaultArgs<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the SubServices
     */
    select?: SubServicesSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the SubServices
     */
    omit?: SubServicesOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubServicesInclude<ExtArgs> | null;
  };

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null;
    _min: UserMinAggregateOutputType | null;
    _max: UserMaxAggregateOutputType | null;
  };

  export type UserMinAggregateOutputType = {
    id: string | null;
    name: string | null;
    email: string | null;
    phone: string | null;
    emailVerified: boolean | null;
    image: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  };

  export type UserMaxAggregateOutputType = {
    id: string | null;
    name: string | null;
    email: string | null;
    phone: string | null;
    emailVerified: boolean | null;
    image: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  };

  export type UserCountAggregateOutputType = {
    id: number;
    name: number;
    email: number;
    phone: number;
    emailVerified: number;
    image: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
  };

  export type UserMinAggregateInputType = {
    id?: true;
    name?: true;
    email?: true;
    phone?: true;
    emailVerified?: true;
    image?: true;
    createdAt?: true;
    updatedAt?: true;
  };

  export type UserMaxAggregateInputType = {
    id?: true;
    name?: true;
    email?: true;
    phone?: true;
    emailVerified?: true;
    image?: true;
    createdAt?: true;
    updatedAt?: true;
  };

  export type UserCountAggregateInputType = {
    id?: true;
    name?: true;
    email?: true;
    phone?: true;
    emailVerified?: true;
    image?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
  };

  export type UserAggregateArgs<
    _ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Users from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Users.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Users
     **/
    _count?: true | UserCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: UserMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: UserMaxAggregateInputType;
  };

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
    [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>;
  };

  export type UserGroupByArgs<
    _ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {
    where?: UserWhereInput;
    orderBy?:
      | UserOrderByWithAggregationInput
      | UserOrderByWithAggregationInput[];
    by: UserScalarFieldEnum[] | UserScalarFieldEnum;
    having?: UserScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: UserCountAggregateInputType | true;
    _min?: UserMinAggregateInputType;
    _max?: UserMaxAggregateInputType;
  };

  export type UserGroupByOutputType = {
    id: string;
    name: string;
    email: string;
    phone: string | null;
    emailVerified: boolean;
    image: string | null;
    createdAt: Date;
    updatedAt: Date;
    _count: UserCountAggregateOutputType | null;
    _min: UserMinAggregateOutputType | null;
    _max: UserMaxAggregateOutputType | null;
  };

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> & {
        [P in keyof T & keyof UserGroupByOutputType]: P extends '_count'
          ? T[P] extends boolean
            ? number
            : GetScalarType<T[P], UserGroupByOutputType[P]>
          : GetScalarType<T[P], UserGroupByOutputType[P]>;
      }
    >
  >;

  export type UserSelect<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = runtime.Types.Extensions.GetSelect<
    {
      id?: boolean;
      name?: boolean;
      email?: boolean;
      phone?: boolean;
      emailVerified?: boolean;
      image?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
      sessions?: boolean | User$sessionsArgs<ExtArgs>;
      accounts?: boolean | User$accountsArgs<ExtArgs>;
      proposal?: boolean | User$proposalArgs<ExtArgs>;
      budget?: boolean | User$budgetArgs<ExtArgs>;
      _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>;
    },
    ExtArgs['result']['user']
  >;

  export type UserSelectCreateManyAndReturn<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = runtime.Types.Extensions.GetSelect<
    {
      id?: boolean;
      name?: boolean;
      email?: boolean;
      phone?: boolean;
      emailVerified?: boolean;
      image?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
    },
    ExtArgs['result']['user']
  >;

  export type UserSelectUpdateManyAndReturn<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = runtime.Types.Extensions.GetSelect<
    {
      id?: boolean;
      name?: boolean;
      email?: boolean;
      phone?: boolean;
      emailVerified?: boolean;
      image?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
    },
    ExtArgs['result']['user']
  >;

  export type UserSelectScalar = {
    id?: boolean;
    name?: boolean;
    email?: boolean;
    phone?: boolean;
    emailVerified?: boolean;
    image?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
  };

  export type UserOmit<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = runtime.Types.Extensions.GetOmit<
    | 'id'
    | 'name'
    | 'email'
    | 'phone'
    | 'emailVerified'
    | 'image'
    | 'createdAt'
    | 'updatedAt',
    ExtArgs['result']['user']
  >;
  export type UserInclude<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {
    sessions?: boolean | User$sessionsArgs<ExtArgs>;
    accounts?: boolean | User$accountsArgs<ExtArgs>;
    proposal?: boolean | User$proposalArgs<ExtArgs>;
    budget?: boolean | User$budgetArgs<ExtArgs>;
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>;
  };
  export type UserIncludeCreateManyAndReturn<
    _ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {};
  export type UserIncludeUpdateManyAndReturn<
    _ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {};

  export type $UserPayload<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {
    name: 'User';
    objects: {
      sessions: Prisma.$SessionPayload<ExtArgs>[];
      accounts: Prisma.$AccountPayload<ExtArgs>[];
      proposal: Prisma.$ProposalPayload<ExtArgs>[];
      budget: Prisma.$BudgetPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<
      {
        id: string;
        name: string;
        email: string;
        phone: string | null;
        emailVerified: boolean;
        image: string | null;
        createdAt: Date;
        updatedAt: Date;
      },
      ExtArgs['result']['user']
    >;
    composites: {};
  };

  export type UserGetPayload<
    S extends boolean | null | undefined | UserDefaultArgs,
  > = runtime.Types.Result.GetResult<Prisma.$UserPayload, S>;

  export type UserCountArgs<
    _ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: UserCountAggregateInputType | true;
  };

  export interface UserDelegate<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > {
    [K: symbol]: {
      types: Prisma.TypeMap<ExtArgs>['model']['User'];
      meta: { name: 'User' };
    };
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(
      args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>
    ): Prisma__UserClient<
      runtime.Types.Result.GetResult<
        Prisma.$UserPayload<ExtArgs>,
        T,
        'findUnique',
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(
      args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__UserClient<
      runtime.Types.Result.GetResult<
        Prisma.$UserPayload<ExtArgs>,
        T,
        'findUniqueOrThrow',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(
      args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>
    ): Prisma__UserClient<
      runtime.Types.Result.GetResult<
        Prisma.$UserPayload<ExtArgs>,
        T,
        'findFirst',
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(
      args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__UserClient<
      runtime.Types.Result.GetResult<
        Prisma.$UserPayload<ExtArgs>,
        T,
        'findFirstOrThrow',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     *
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     *
     */
    findMany<T extends UserFindManyArgs>(
      args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      runtime.Types.Result.GetResult<
        Prisma.$UserPayload<ExtArgs>,
        T,
        'findMany',
        GlobalOmitOptions
      >
    >;

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     *
     */
    create<T extends UserCreateArgs>(
      args: SelectSubset<T, UserCreateArgs<ExtArgs>>
    ): Prisma__UserClient<
      runtime.Types.Result.GetResult<
        Prisma.$UserPayload<ExtArgs>,
        T,
        'create',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends UserCreateManyArgs>(
      args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(
      args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      runtime.Types.Result.GetResult<
        Prisma.$UserPayload<ExtArgs>,
        T,
        'createManyAndReturn',
        GlobalOmitOptions
      >
    >;

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     *
     */
    delete<T extends UserDeleteArgs>(
      args: SelectSubset<T, UserDeleteArgs<ExtArgs>>
    ): Prisma__UserClient<
      runtime.Types.Result.GetResult<
        Prisma.$UserPayload<ExtArgs>,
        T,
        'delete',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends UserUpdateArgs>(
      args: SelectSubset<T, UserUpdateArgs<ExtArgs>>
    ): Prisma__UserClient<
      runtime.Types.Result.GetResult<
        Prisma.$UserPayload<ExtArgs>,
        T,
        'update',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends UserDeleteManyArgs>(
      args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends UserUpdateManyArgs>(
      args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(
      args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      runtime.Types.Result.GetResult<
        Prisma.$UserPayload<ExtArgs>,
        T,
        'updateManyAndReturn',
        GlobalOmitOptions
      >
    >;

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(
      args: SelectSubset<T, UserUpsertArgs<ExtArgs>>
    ): Prisma__UserClient<
      runtime.Types.Result.GetResult<
        Prisma.$UserPayload<ExtArgs>,
        T,
        'upsert',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
     **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>
    ): Prisma.PrismaPromise<
      T extends runtime.Types.Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
     **/
    aggregate<T extends UserAggregateArgs>(
      args: Subset<T, UserAggregateArgs>
    ): Prisma.PrismaPromise<GetUserAggregateType<T>>;

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
     **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<
        Keys<MaybeTupleToUnion<T['orderBy']>>
      >,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
        ? `Error: "by" must not be empty.`
        : HavingValid extends False
          ? {
              [P in HavingFields]: P extends ByFields
                ? never
                : P extends string
                  ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
                  : [
                      Error,
                      'Field ',
                      P,
                      ` in "having" needs to be provided in "by"`,
                    ];
            }[HavingFields]
          : 'take' extends Keys<T>
            ? 'orderBy' extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
              : 'Error: If you provide "take", you also need to provide "orderBy"'
            : 'skip' extends Keys<T>
              ? 'orderBy' extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                      [P in OrderFields]: P extends ByFields
                        ? never
                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                    }[OrderFields]
                : 'Error: If you provide "skip", you also need to provide "orderBy"'
              : ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields],
    >(
      args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors
    ): {} extends InputErrors
      ? GetUserGroupByPayload<T>
      : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the User model
     */
    readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<
    T,
    Null = never,
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    sessions<T extends User$sessionsArgs<ExtArgs> = {}>(
      args?: Subset<T, User$sessionsArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      | runtime.Types.Result.GetResult<
          Prisma.$SessionPayload<ExtArgs>,
          T,
          'findMany',
          GlobalOmitOptions
        >
      | Null
    >;
    accounts<T extends User$accountsArgs<ExtArgs> = {}>(
      args?: Subset<T, User$accountsArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      | runtime.Types.Result.GetResult<
          Prisma.$AccountPayload<ExtArgs>,
          T,
          'findMany',
          GlobalOmitOptions
        >
      | Null
    >;
    proposal<T extends User$proposalArgs<ExtArgs> = {}>(
      args?: Subset<T, User$proposalArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      | runtime.Types.Result.GetResult<
          Prisma.$ProposalPayload<ExtArgs>,
          T,
          'findMany',
          GlobalOmitOptions
        >
      | Null
    >;
    budget<T extends User$budgetArgs<ExtArgs> = {}>(
      args?: Subset<T, User$budgetArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      | runtime.Types.Result.GetResult<
          Prisma.$BudgetPayload<ExtArgs>,
          T,
          'findMany',
          GlobalOmitOptions
        >
      | Null
    >;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?:
        | ((value: T) => TResult1 | PromiseLike<TResult1>)
        | undefined
        | null,
      onrejected?:
        | ((reason: any) => TResult2 | PromiseLike<TResult2>)
        | undefined
        | null
    ): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?:
        | ((reason: any) => TResult | PromiseLike<TResult>)
        | undefined
        | null
    ): runtime.Types.Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(
      onfinally?: (() => void) | undefined | null
    ): runtime.Types.Utils.JsPromise<T>;
  }

  /**
   * Fields of the User model
   */
  export interface UserFieldRefs {
    readonly id: FieldRef<'User', 'String'>;
    readonly name: FieldRef<'User', 'String'>;
    readonly email: FieldRef<'User', 'String'>;
    readonly phone: FieldRef<'User', 'String'>;
    readonly emailVerified: FieldRef<'User', 'Boolean'>;
    readonly image: FieldRef<'User', 'String'>;
    readonly createdAt: FieldRef<'User', 'DateTime'>;
    readonly updatedAt: FieldRef<'User', 'DateTime'>;
  }

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null;
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput;
  };

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null;
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput;
  };

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null;
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Users from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Users.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[];
  };

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null;
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Users from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Users.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[];
  };

  /**
   * User findMany
   */
  export type UserFindManyArgs<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null;
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Users from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Users.
     */
    skip?: number;
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[];
  };

  /**
   * User create
   */
  export type UserCreateArgs<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null;
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>;
  };

  /**
   * User createMany
   */
  export type UserCreateManyArgs<
    _ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null;
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * User update
   */
  export type UserUpdateArgs<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null;
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>;
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput;
  };

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<
    _ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>;
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput;
    /**
     * Limit how many Users to update.
     */
    limit?: number;
  };

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null;
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>;
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput;
    /**
     * Limit how many Users to update.
     */
    limit?: number;
  };

  /**
   * User upsert
   */
  export type UserUpsertArgs<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null;
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput;
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>;
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>;
  };

  /**
   * User delete
   */
  export type UserDeleteArgs<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null;
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput;
  };

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<
    _ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput;
    /**
     * Limit how many Users to delete.
     */
    limit?: number;
  };

  /**
   * User.sessions
   */
  export type User$sessionsArgs<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null;
    where?: SessionWhereInput;
    orderBy?:
      | SessionOrderByWithRelationInput
      | SessionOrderByWithRelationInput[];
    cursor?: SessionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[];
  };

  /**
   * User.accounts
   */
  export type User$accountsArgs<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null;
    where?: AccountWhereInput;
    orderBy?:
      | AccountOrderByWithRelationInput
      | AccountOrderByWithRelationInput[];
    cursor?: AccountWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[];
  };

  /**
   * User.proposal
   */
  export type User$proposalArgs<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Proposal
     */
    select?: ProposalSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Proposal
     */
    omit?: ProposalOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProposalInclude<ExtArgs> | null;
    where?: ProposalWhereInput;
    orderBy?:
      | ProposalOrderByWithRelationInput
      | ProposalOrderByWithRelationInput[];
    cursor?: ProposalWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: ProposalScalarFieldEnum | ProposalScalarFieldEnum[];
  };

  /**
   * User.budget
   */
  export type User$budgetArgs<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Budget
     */
    select?: BudgetSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Budget
     */
    omit?: BudgetOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BudgetInclude<ExtArgs> | null;
    where?: BudgetWhereInput;
    orderBy?: BudgetOrderByWithRelationInput | BudgetOrderByWithRelationInput[];
    cursor?: BudgetWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: BudgetScalarFieldEnum | BudgetScalarFieldEnum[];
  };

  /**
   * User without action
   */
  export type UserDefaultArgs<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null;
  };

  /**
   * Model Session
   */

  export type AggregateSession = {
    _count: SessionCountAggregateOutputType | null;
    _min: SessionMinAggregateOutputType | null;
    _max: SessionMaxAggregateOutputType | null;
  };

  export type SessionMinAggregateOutputType = {
    id: string | null;
    expiresAt: Date | null;
    token: string | null;
    ipAddress: string | null;
    userAgent: string | null;
    userId: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  };

  export type SessionMaxAggregateOutputType = {
    id: string | null;
    expiresAt: Date | null;
    token: string | null;
    ipAddress: string | null;
    userAgent: string | null;
    userId: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  };

  export type SessionCountAggregateOutputType = {
    id: number;
    expiresAt: number;
    token: number;
    ipAddress: number;
    userAgent: number;
    userId: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
  };

  export type SessionMinAggregateInputType = {
    id?: true;
    expiresAt?: true;
    token?: true;
    ipAddress?: true;
    userAgent?: true;
    userId?: true;
    createdAt?: true;
    updatedAt?: true;
  };

  export type SessionMaxAggregateInputType = {
    id?: true;
    expiresAt?: true;
    token?: true;
    ipAddress?: true;
    userAgent?: true;
    userId?: true;
    createdAt?: true;
    updatedAt?: true;
  };

  export type SessionCountAggregateInputType = {
    id?: true;
    expiresAt?: true;
    token?: true;
    ipAddress?: true;
    userAgent?: true;
    userId?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
  };

  export type SessionAggregateArgs<
    _ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Session to aggregate.
     */
    where?: SessionWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Sessions to fetch.
     */
    orderBy?:
      | SessionOrderByWithRelationInput
      | SessionOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: SessionWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Sessions.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Sessions
     **/
    _count?: true | SessionCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: SessionMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: SessionMaxAggregateInputType;
  };

  export type GetSessionAggregateType<T extends SessionAggregateArgs> = {
    [P in keyof T & keyof AggregateSession]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSession[P]>
      : GetScalarType<T[P], AggregateSession[P]>;
  };

  export type SessionGroupByArgs<
    _ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {
    where?: SessionWhereInput;
    orderBy?:
      | SessionOrderByWithAggregationInput
      | SessionOrderByWithAggregationInput[];
    by: SessionScalarFieldEnum[] | SessionScalarFieldEnum;
    having?: SessionScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: SessionCountAggregateInputType | true;
    _min?: SessionMinAggregateInputType;
    _max?: SessionMaxAggregateInputType;
  };

  export type SessionGroupByOutputType = {
    id: string;
    expiresAt: Date;
    token: string;
    ipAddress: string | null;
    userAgent: string | null;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
    _count: SessionCountAggregateOutputType | null;
    _min: SessionMinAggregateOutputType | null;
    _max: SessionMaxAggregateOutputType | null;
  };

  type GetSessionGroupByPayload<T extends SessionGroupByArgs> =
    Prisma.PrismaPromise<
      Array<
        PickEnumerable<SessionGroupByOutputType, T['by']> & {
          [P in keyof T & keyof SessionGroupByOutputType]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SessionGroupByOutputType[P]>
            : GetScalarType<T[P], SessionGroupByOutputType[P]>;
        }
      >
    >;

  export type SessionSelect<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = runtime.Types.Extensions.GetSelect<
    {
      id?: boolean;
      expiresAt?: boolean;
      token?: boolean;
      ipAddress?: boolean;
      userAgent?: boolean;
      userId?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
      user?: boolean | UserDefaultArgs<ExtArgs>;
    },
    ExtArgs['result']['session']
  >;

  export type SessionSelectCreateManyAndReturn<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = runtime.Types.Extensions.GetSelect<
    {
      id?: boolean;
      expiresAt?: boolean;
      token?: boolean;
      ipAddress?: boolean;
      userAgent?: boolean;
      userId?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
      user?: boolean | UserDefaultArgs<ExtArgs>;
    },
    ExtArgs['result']['session']
  >;

  export type SessionSelectUpdateManyAndReturn<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = runtime.Types.Extensions.GetSelect<
    {
      id?: boolean;
      expiresAt?: boolean;
      token?: boolean;
      ipAddress?: boolean;
      userAgent?: boolean;
      userId?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
      user?: boolean | UserDefaultArgs<ExtArgs>;
    },
    ExtArgs['result']['session']
  >;

  export type SessionSelectScalar = {
    id?: boolean;
    expiresAt?: boolean;
    token?: boolean;
    ipAddress?: boolean;
    userAgent?: boolean;
    userId?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
  };

  export type SessionOmit<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = runtime.Types.Extensions.GetOmit<
    | 'id'
    | 'expiresAt'
    | 'token'
    | 'ipAddress'
    | 'userAgent'
    | 'userId'
    | 'createdAt'
    | 'updatedAt',
    ExtArgs['result']['session']
  >;
  export type SessionInclude<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {
    user?: boolean | UserDefaultArgs<ExtArgs>;
  };
  export type SessionIncludeCreateManyAndReturn<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {
    user?: boolean | UserDefaultArgs<ExtArgs>;
  };
  export type SessionIncludeUpdateManyAndReturn<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {
    user?: boolean | UserDefaultArgs<ExtArgs>;
  };

  export type $SessionPayload<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {
    name: 'Session';
    objects: {
      user: Prisma.$UserPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<
      {
        id: string;
        expiresAt: Date;
        token: string;
        ipAddress: string | null;
        userAgent: string | null;
        userId: string;
        createdAt: Date;
        updatedAt: Date;
      },
      ExtArgs['result']['session']
    >;
    composites: {};
  };

  export type SessionGetPayload<
    S extends boolean | null | undefined | SessionDefaultArgs,
  > = runtime.Types.Result.GetResult<Prisma.$SessionPayload, S>;

  export type SessionCountArgs<
    _ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = Omit<SessionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: SessionCountAggregateInputType | true;
  };

  export interface SessionDelegate<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > {
    [K: symbol]: {
      types: Prisma.TypeMap<ExtArgs>['model']['Session'];
      meta: { name: 'Session' };
    };
    /**
     * Find zero or one Session that matches the filter.
     * @param {SessionFindUniqueArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SessionFindUniqueArgs>(
      args: SelectSubset<T, SessionFindUniqueArgs<ExtArgs>>
    ): Prisma__SessionClient<
      runtime.Types.Result.GetResult<
        Prisma.$SessionPayload<ExtArgs>,
        T,
        'findUnique',
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find one Session that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SessionFindUniqueOrThrowArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SessionFindUniqueOrThrowArgs>(
      args: SelectSubset<T, SessionFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__SessionClient<
      runtime.Types.Result.GetResult<
        Prisma.$SessionPayload<ExtArgs>,
        T,
        'findUniqueOrThrow',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first Session that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindFirstArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SessionFindFirstArgs>(
      args?: SelectSubset<T, SessionFindFirstArgs<ExtArgs>>
    ): Prisma__SessionClient<
      runtime.Types.Result.GetResult<
        Prisma.$SessionPayload<ExtArgs>,
        T,
        'findFirst',
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first Session that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindFirstOrThrowArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SessionFindFirstOrThrowArgs>(
      args?: SelectSubset<T, SessionFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__SessionClient<
      runtime.Types.Result.GetResult<
        Prisma.$SessionPayload<ExtArgs>,
        T,
        'findFirstOrThrow',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find zero or more Sessions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Sessions
     * const sessions = await prisma.session.findMany()
     *
     * // Get first 10 Sessions
     * const sessions = await prisma.session.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const sessionWithIdOnly = await prisma.session.findMany({ select: { id: true } })
     *
     */
    findMany<T extends SessionFindManyArgs>(
      args?: SelectSubset<T, SessionFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      runtime.Types.Result.GetResult<
        Prisma.$SessionPayload<ExtArgs>,
        T,
        'findMany',
        GlobalOmitOptions
      >
    >;

    /**
     * Create a Session.
     * @param {SessionCreateArgs} args - Arguments to create a Session.
     * @example
     * // Create one Session
     * const Session = await prisma.session.create({
     *   data: {
     *     // ... data to create a Session
     *   }
     * })
     *
     */
    create<T extends SessionCreateArgs>(
      args: SelectSubset<T, SessionCreateArgs<ExtArgs>>
    ): Prisma__SessionClient<
      runtime.Types.Result.GetResult<
        Prisma.$SessionPayload<ExtArgs>,
        T,
        'create',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Create many Sessions.
     * @param {SessionCreateManyArgs} args - Arguments to create many Sessions.
     * @example
     * // Create many Sessions
     * const session = await prisma.session.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends SessionCreateManyArgs>(
      args?: SelectSubset<T, SessionCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create many Sessions and returns the data saved in the database.
     * @param {SessionCreateManyAndReturnArgs} args - Arguments to create many Sessions.
     * @example
     * // Create many Sessions
     * const session = await prisma.session.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Sessions and only return the `id`
     * const sessionWithIdOnly = await prisma.session.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends SessionCreateManyAndReturnArgs>(
      args?: SelectSubset<T, SessionCreateManyAndReturnArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      runtime.Types.Result.GetResult<
        Prisma.$SessionPayload<ExtArgs>,
        T,
        'createManyAndReturn',
        GlobalOmitOptions
      >
    >;

    /**
     * Delete a Session.
     * @param {SessionDeleteArgs} args - Arguments to delete one Session.
     * @example
     * // Delete one Session
     * const Session = await prisma.session.delete({
     *   where: {
     *     // ... filter to delete one Session
     *   }
     * })
     *
     */
    delete<T extends SessionDeleteArgs>(
      args: SelectSubset<T, SessionDeleteArgs<ExtArgs>>
    ): Prisma__SessionClient<
      runtime.Types.Result.GetResult<
        Prisma.$SessionPayload<ExtArgs>,
        T,
        'delete',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Update one Session.
     * @param {SessionUpdateArgs} args - Arguments to update one Session.
     * @example
     * // Update one Session
     * const session = await prisma.session.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends SessionUpdateArgs>(
      args: SelectSubset<T, SessionUpdateArgs<ExtArgs>>
    ): Prisma__SessionClient<
      runtime.Types.Result.GetResult<
        Prisma.$SessionPayload<ExtArgs>,
        T,
        'update',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Delete zero or more Sessions.
     * @param {SessionDeleteManyArgs} args - Arguments to filter Sessions to delete.
     * @example
     * // Delete a few Sessions
     * const { count } = await prisma.session.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends SessionDeleteManyArgs>(
      args?: SelectSubset<T, SessionDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Sessions
     * const session = await prisma.session.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends SessionUpdateManyArgs>(
      args: SelectSubset<T, SessionUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Sessions and returns the data updated in the database.
     * @param {SessionUpdateManyAndReturnArgs} args - Arguments to update many Sessions.
     * @example
     * // Update many Sessions
     * const session = await prisma.session.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more Sessions and only return the `id`
     * const sessionWithIdOnly = await prisma.session.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    updateManyAndReturn<T extends SessionUpdateManyAndReturnArgs>(
      args: SelectSubset<T, SessionUpdateManyAndReturnArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      runtime.Types.Result.GetResult<
        Prisma.$SessionPayload<ExtArgs>,
        T,
        'updateManyAndReturn',
        GlobalOmitOptions
      >
    >;

    /**
     * Create or update one Session.
     * @param {SessionUpsertArgs} args - Arguments to update or create a Session.
     * @example
     * // Update or create a Session
     * const session = await prisma.session.upsert({
     *   create: {
     *     // ... data to create a Session
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Session we want to update
     *   }
     * })
     */
    upsert<T extends SessionUpsertArgs>(
      args: SelectSubset<T, SessionUpsertArgs<ExtArgs>>
    ): Prisma__SessionClient<
      runtime.Types.Result.GetResult<
        Prisma.$SessionPayload<ExtArgs>,
        T,
        'upsert',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Count the number of Sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionCountArgs} args - Arguments to filter Sessions to count.
     * @example
     * // Count the number of Sessions
     * const count = await prisma.session.count({
     *   where: {
     *     // ... the filter for the Sessions we want to count
     *   }
     * })
     **/
    count<T extends SessionCountArgs>(
      args?: Subset<T, SessionCountArgs>
    ): Prisma.PrismaPromise<
      T extends runtime.Types.Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SessionCountAggregateOutputType>
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a Session.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
     **/
    aggregate<T extends SessionAggregateArgs>(
      args: Subset<T, SessionAggregateArgs>
    ): Prisma.PrismaPromise<GetSessionAggregateType<T>>;

    /**
     * Group by Session.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
     **/
    groupBy<
      T extends SessionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SessionGroupByArgs['orderBy'] }
        : { orderBy?: SessionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<
        Keys<MaybeTupleToUnion<T['orderBy']>>
      >,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
        ? `Error: "by" must not be empty.`
        : HavingValid extends False
          ? {
              [P in HavingFields]: P extends ByFields
                ? never
                : P extends string
                  ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
                  : [
                      Error,
                      'Field ',
                      P,
                      ` in "having" needs to be provided in "by"`,
                    ];
            }[HavingFields]
          : 'take' extends Keys<T>
            ? 'orderBy' extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
              : 'Error: If you provide "take", you also need to provide "orderBy"'
            : 'skip' extends Keys<T>
              ? 'orderBy' extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                      [P in OrderFields]: P extends ByFields
                        ? never
                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                    }[OrderFields]
                : 'Error: If you provide "skip", you also need to provide "orderBy"'
              : ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields],
    >(
      args: SubsetIntersection<T, SessionGroupByArgs, OrderByArg> & InputErrors
    ): {} extends InputErrors
      ? GetSessionGroupByPayload<T>
      : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the Session model
     */
    readonly fields: SessionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Session.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SessionClient<
    T,
    Null = never,
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    user<T extends UserDefaultArgs<ExtArgs> = {}>(
      args?: Subset<T, UserDefaultArgs<ExtArgs>>
    ): Prisma__UserClient<
      | runtime.Types.Result.GetResult<
          Prisma.$UserPayload<ExtArgs>,
          T,
          'findUniqueOrThrow',
          GlobalOmitOptions
        >
      | Null,
      Null,
      ExtArgs,
      GlobalOmitOptions
    >;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?:
        | ((value: T) => TResult1 | PromiseLike<TResult1>)
        | undefined
        | null,
      onrejected?:
        | ((reason: any) => TResult2 | PromiseLike<TResult2>)
        | undefined
        | null
    ): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?:
        | ((reason: any) => TResult | PromiseLike<TResult>)
        | undefined
        | null
    ): runtime.Types.Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(
      onfinally?: (() => void) | undefined | null
    ): runtime.Types.Utils.JsPromise<T>;
  }

  /**
   * Fields of the Session model
   */
  export interface SessionFieldRefs {
    readonly id: FieldRef<'Session', 'String'>;
    readonly expiresAt: FieldRef<'Session', 'DateTime'>;
    readonly token: FieldRef<'Session', 'String'>;
    readonly ipAddress: FieldRef<'Session', 'String'>;
    readonly userAgent: FieldRef<'Session', 'String'>;
    readonly userId: FieldRef<'Session', 'String'>;
    readonly createdAt: FieldRef<'Session', 'DateTime'>;
    readonly updatedAt: FieldRef<'Session', 'DateTime'>;
  }

  // Custom InputTypes
  /**
   * Session findUnique
   */
  export type SessionFindUniqueArgs<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null;
    /**
     * Filter, which Session to fetch.
     */
    where: SessionWhereUniqueInput;
  };

  /**
   * Session findUniqueOrThrow
   */
  export type SessionFindUniqueOrThrowArgs<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null;
    /**
     * Filter, which Session to fetch.
     */
    where: SessionWhereUniqueInput;
  };

  /**
   * Session findFirst
   */
  export type SessionFindFirstArgs<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null;
    /**
     * Filter, which Session to fetch.
     */
    where?: SessionWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Sessions to fetch.
     */
    orderBy?:
      | SessionOrderByWithRelationInput
      | SessionOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Sessions.
     */
    cursor?: SessionWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Sessions.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Sessions.
     */
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[];
  };

  /**
   * Session findFirstOrThrow
   */
  export type SessionFindFirstOrThrowArgs<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null;
    /**
     * Filter, which Session to fetch.
     */
    where?: SessionWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Sessions to fetch.
     */
    orderBy?:
      | SessionOrderByWithRelationInput
      | SessionOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Sessions.
     */
    cursor?: SessionWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Sessions.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Sessions.
     */
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[];
  };

  /**
   * Session findMany
   */
  export type SessionFindManyArgs<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null;
    /**
     * Filter, which Sessions to fetch.
     */
    where?: SessionWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Sessions to fetch.
     */
    orderBy?:
      | SessionOrderByWithRelationInput
      | SessionOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Sessions.
     */
    cursor?: SessionWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Sessions.
     */
    skip?: number;
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[];
  };

  /**
   * Session create
   */
  export type SessionCreateArgs<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null;
    /**
     * The data needed to create a Session.
     */
    data: XOR<SessionCreateInput, SessionUncheckedCreateInput>;
  };

  /**
   * Session createMany
   */
  export type SessionCreateManyArgs<
    _ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {
    /**
     * The data used to create many Sessions.
     */
    data: SessionCreateManyInput | SessionCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * Session createManyAndReturn
   */
  export type SessionCreateManyAndReturnArgs<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null;
    /**
     * The data used to create many Sessions.
     */
    data: SessionCreateManyInput | SessionCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionIncludeCreateManyAndReturn<ExtArgs> | null;
  };

  /**
   * Session update
   */
  export type SessionUpdateArgs<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null;
    /**
     * The data needed to update a Session.
     */
    data: XOR<SessionUpdateInput, SessionUncheckedUpdateInput>;
    /**
     * Choose, which Session to update.
     */
    where: SessionWhereUniqueInput;
  };

  /**
   * Session updateMany
   */
  export type SessionUpdateManyArgs<
    _ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {
    /**
     * The data used to update Sessions.
     */
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyInput>;
    /**
     * Filter which Sessions to update
     */
    where?: SessionWhereInput;
    /**
     * Limit how many Sessions to update.
     */
    limit?: number;
  };

  /**
   * Session updateManyAndReturn
   */
  export type SessionUpdateManyAndReturnArgs<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null;
    /**
     * The data used to update Sessions.
     */
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyInput>;
    /**
     * Filter which Sessions to update
     */
    where?: SessionWhereInput;
    /**
     * Limit how many Sessions to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionIncludeUpdateManyAndReturn<ExtArgs> | null;
  };

  /**
   * Session upsert
   */
  export type SessionUpsertArgs<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null;
    /**
     * The filter to search for the Session to update in case it exists.
     */
    where: SessionWhereUniqueInput;
    /**
     * In case the Session found by the `where` argument doesn't exist, create a new Session with this data.
     */
    create: XOR<SessionCreateInput, SessionUncheckedCreateInput>;
    /**
     * In case the Session was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SessionUpdateInput, SessionUncheckedUpdateInput>;
  };

  /**
   * Session delete
   */
  export type SessionDeleteArgs<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null;
    /**
     * Filter which Session to delete.
     */
    where: SessionWhereUniqueInput;
  };

  /**
   * Session deleteMany
   */
  export type SessionDeleteManyArgs<
    _ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Sessions to delete
     */
    where?: SessionWhereInput;
    /**
     * Limit how many Sessions to delete.
     */
    limit?: number;
  };

  /**
   * Session without action
   */
  export type SessionDefaultArgs<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null;
  };

  /**
   * Model Account
   */

  export type AggregateAccount = {
    _count: AccountCountAggregateOutputType | null;
    _min: AccountMinAggregateOutputType | null;
    _max: AccountMaxAggregateOutputType | null;
  };

  export type AccountMinAggregateOutputType = {
    id: string | null;
    accountId: string | null;
    providerId: string | null;
    userId: string | null;
    accessToken: string | null;
    refreshToken: string | null;
    idToken: string | null;
    accessTokenExpiresAt: Date | null;
    refreshTokenExpiresAt: Date | null;
    scope: string | null;
    password: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  };

  export type AccountMaxAggregateOutputType = {
    id: string | null;
    accountId: string | null;
    providerId: string | null;
    userId: string | null;
    accessToken: string | null;
    refreshToken: string | null;
    idToken: string | null;
    accessTokenExpiresAt: Date | null;
    refreshTokenExpiresAt: Date | null;
    scope: string | null;
    password: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  };

  export type AccountCountAggregateOutputType = {
    id: number;
    accountId: number;
    providerId: number;
    userId: number;
    accessToken: number;
    refreshToken: number;
    idToken: number;
    accessTokenExpiresAt: number;
    refreshTokenExpiresAt: number;
    scope: number;
    password: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
  };

  export type AccountMinAggregateInputType = {
    id?: true;
    accountId?: true;
    providerId?: true;
    userId?: true;
    accessToken?: true;
    refreshToken?: true;
    idToken?: true;
    accessTokenExpiresAt?: true;
    refreshTokenExpiresAt?: true;
    scope?: true;
    password?: true;
    createdAt?: true;
    updatedAt?: true;
  };

  export type AccountMaxAggregateInputType = {
    id?: true;
    accountId?: true;
    providerId?: true;
    userId?: true;
    accessToken?: true;
    refreshToken?: true;
    idToken?: true;
    accessTokenExpiresAt?: true;
    refreshTokenExpiresAt?: true;
    scope?: true;
    password?: true;
    createdAt?: true;
    updatedAt?: true;
  };

  export type AccountCountAggregateInputType = {
    id?: true;
    accountId?: true;
    providerId?: true;
    userId?: true;
    accessToken?: true;
    refreshToken?: true;
    idToken?: true;
    accessTokenExpiresAt?: true;
    refreshTokenExpiresAt?: true;
    scope?: true;
    password?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
  };

  export type AccountAggregateArgs<
    _ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Account to aggregate.
     */
    where?: AccountWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Accounts to fetch.
     */
    orderBy?:
      | AccountOrderByWithRelationInput
      | AccountOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: AccountWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Accounts.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Accounts
     **/
    _count?: true | AccountCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: AccountMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: AccountMaxAggregateInputType;
  };

  export type GetAccountAggregateType<T extends AccountAggregateArgs> = {
    [P in keyof T & keyof AggregateAccount]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAccount[P]>
      : GetScalarType<T[P], AggregateAccount[P]>;
  };

  export type AccountGroupByArgs<
    _ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {
    where?: AccountWhereInput;
    orderBy?:
      | AccountOrderByWithAggregationInput
      | AccountOrderByWithAggregationInput[];
    by: AccountScalarFieldEnum[] | AccountScalarFieldEnum;
    having?: AccountScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: AccountCountAggregateInputType | true;
    _min?: AccountMinAggregateInputType;
    _max?: AccountMaxAggregateInputType;
  };

  export type AccountGroupByOutputType = {
    id: string;
    accountId: string;
    providerId: string;
    userId: string;
    accessToken: string | null;
    refreshToken: string | null;
    idToken: string | null;
    accessTokenExpiresAt: Date | null;
    refreshTokenExpiresAt: Date | null;
    scope: string | null;
    password: string | null;
    createdAt: Date;
    updatedAt: Date;
    _count: AccountCountAggregateOutputType | null;
    _min: AccountMinAggregateOutputType | null;
    _max: AccountMaxAggregateOutputType | null;
  };

  type GetAccountGroupByPayload<T extends AccountGroupByArgs> =
    Prisma.PrismaPromise<
      Array<
        PickEnumerable<AccountGroupByOutputType, T['by']> & {
          [P in keyof T & keyof AccountGroupByOutputType]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AccountGroupByOutputType[P]>
            : GetScalarType<T[P], AccountGroupByOutputType[P]>;
        }
      >
    >;

  export type AccountSelect<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = runtime.Types.Extensions.GetSelect<
    {
      id?: boolean;
      accountId?: boolean;
      providerId?: boolean;
      userId?: boolean;
      accessToken?: boolean;
      refreshToken?: boolean;
      idToken?: boolean;
      accessTokenExpiresAt?: boolean;
      refreshTokenExpiresAt?: boolean;
      scope?: boolean;
      password?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
      user?: boolean | UserDefaultArgs<ExtArgs>;
    },
    ExtArgs['result']['account']
  >;

  export type AccountSelectCreateManyAndReturn<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = runtime.Types.Extensions.GetSelect<
    {
      id?: boolean;
      accountId?: boolean;
      providerId?: boolean;
      userId?: boolean;
      accessToken?: boolean;
      refreshToken?: boolean;
      idToken?: boolean;
      accessTokenExpiresAt?: boolean;
      refreshTokenExpiresAt?: boolean;
      scope?: boolean;
      password?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
      user?: boolean | UserDefaultArgs<ExtArgs>;
    },
    ExtArgs['result']['account']
  >;

  export type AccountSelectUpdateManyAndReturn<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = runtime.Types.Extensions.GetSelect<
    {
      id?: boolean;
      accountId?: boolean;
      providerId?: boolean;
      userId?: boolean;
      accessToken?: boolean;
      refreshToken?: boolean;
      idToken?: boolean;
      accessTokenExpiresAt?: boolean;
      refreshTokenExpiresAt?: boolean;
      scope?: boolean;
      password?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
      user?: boolean | UserDefaultArgs<ExtArgs>;
    },
    ExtArgs['result']['account']
  >;

  export type AccountSelectScalar = {
    id?: boolean;
    accountId?: boolean;
    providerId?: boolean;
    userId?: boolean;
    accessToken?: boolean;
    refreshToken?: boolean;
    idToken?: boolean;
    accessTokenExpiresAt?: boolean;
    refreshTokenExpiresAt?: boolean;
    scope?: boolean;
    password?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
  };

  export type AccountOmit<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = runtime.Types.Extensions.GetOmit<
    | 'id'
    | 'accountId'
    | 'providerId'
    | 'userId'
    | 'accessToken'
    | 'refreshToken'
    | 'idToken'
    | 'accessTokenExpiresAt'
    | 'refreshTokenExpiresAt'
    | 'scope'
    | 'password'
    | 'createdAt'
    | 'updatedAt',
    ExtArgs['result']['account']
  >;
  export type AccountInclude<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {
    user?: boolean | UserDefaultArgs<ExtArgs>;
  };
  export type AccountIncludeCreateManyAndReturn<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {
    user?: boolean | UserDefaultArgs<ExtArgs>;
  };
  export type AccountIncludeUpdateManyAndReturn<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {
    user?: boolean | UserDefaultArgs<ExtArgs>;
  };

  export type $AccountPayload<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {
    name: 'Account';
    objects: {
      user: Prisma.$UserPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<
      {
        id: string;
        accountId: string;
        providerId: string;
        userId: string;
        accessToken: string | null;
        refreshToken: string | null;
        idToken: string | null;
        accessTokenExpiresAt: Date | null;
        refreshTokenExpiresAt: Date | null;
        scope: string | null;
        password: string | null;
        createdAt: Date;
        updatedAt: Date;
      },
      ExtArgs['result']['account']
    >;
    composites: {};
  };

  export type AccountGetPayload<
    S extends boolean | null | undefined | AccountDefaultArgs,
  > = runtime.Types.Result.GetResult<Prisma.$AccountPayload, S>;

  export type AccountCountArgs<
    _ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = Omit<AccountFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: AccountCountAggregateInputType | true;
  };

  export interface AccountDelegate<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > {
    [K: symbol]: {
      types: Prisma.TypeMap<ExtArgs>['model']['Account'];
      meta: { name: 'Account' };
    };
    /**
     * Find zero or one Account that matches the filter.
     * @param {AccountFindUniqueArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AccountFindUniqueArgs>(
      args: SelectSubset<T, AccountFindUniqueArgs<ExtArgs>>
    ): Prisma__AccountClient<
      runtime.Types.Result.GetResult<
        Prisma.$AccountPayload<ExtArgs>,
        T,
        'findUnique',
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find one Account that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AccountFindUniqueOrThrowArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AccountFindUniqueOrThrowArgs>(
      args: SelectSubset<T, AccountFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__AccountClient<
      runtime.Types.Result.GetResult<
        Prisma.$AccountPayload<ExtArgs>,
        T,
        'findUniqueOrThrow',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first Account that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountFindFirstArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AccountFindFirstArgs>(
      args?: SelectSubset<T, AccountFindFirstArgs<ExtArgs>>
    ): Prisma__AccountClient<
      runtime.Types.Result.GetResult<
        Prisma.$AccountPayload<ExtArgs>,
        T,
        'findFirst',
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first Account that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountFindFirstOrThrowArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AccountFindFirstOrThrowArgs>(
      args?: SelectSubset<T, AccountFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__AccountClient<
      runtime.Types.Result.GetResult<
        Prisma.$AccountPayload<ExtArgs>,
        T,
        'findFirstOrThrow',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find zero or more Accounts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Accounts
     * const accounts = await prisma.account.findMany()
     *
     * // Get first 10 Accounts
     * const accounts = await prisma.account.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const accountWithIdOnly = await prisma.account.findMany({ select: { id: true } })
     *
     */
    findMany<T extends AccountFindManyArgs>(
      args?: SelectSubset<T, AccountFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      runtime.Types.Result.GetResult<
        Prisma.$AccountPayload<ExtArgs>,
        T,
        'findMany',
        GlobalOmitOptions
      >
    >;

    /**
     * Create a Account.
     * @param {AccountCreateArgs} args - Arguments to create a Account.
     * @example
     * // Create one Account
     * const Account = await prisma.account.create({
     *   data: {
     *     // ... data to create a Account
     *   }
     * })
     *
     */
    create<T extends AccountCreateArgs>(
      args: SelectSubset<T, AccountCreateArgs<ExtArgs>>
    ): Prisma__AccountClient<
      runtime.Types.Result.GetResult<
        Prisma.$AccountPayload<ExtArgs>,
        T,
        'create',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Create many Accounts.
     * @param {AccountCreateManyArgs} args - Arguments to create many Accounts.
     * @example
     * // Create many Accounts
     * const account = await prisma.account.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends AccountCreateManyArgs>(
      args?: SelectSubset<T, AccountCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create many Accounts and returns the data saved in the database.
     * @param {AccountCreateManyAndReturnArgs} args - Arguments to create many Accounts.
     * @example
     * // Create many Accounts
     * const account = await prisma.account.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Accounts and only return the `id`
     * const accountWithIdOnly = await prisma.account.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends AccountCreateManyAndReturnArgs>(
      args?: SelectSubset<T, AccountCreateManyAndReturnArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      runtime.Types.Result.GetResult<
        Prisma.$AccountPayload<ExtArgs>,
        T,
        'createManyAndReturn',
        GlobalOmitOptions
      >
    >;

    /**
     * Delete a Account.
     * @param {AccountDeleteArgs} args - Arguments to delete one Account.
     * @example
     * // Delete one Account
     * const Account = await prisma.account.delete({
     *   where: {
     *     // ... filter to delete one Account
     *   }
     * })
     *
     */
    delete<T extends AccountDeleteArgs>(
      args: SelectSubset<T, AccountDeleteArgs<ExtArgs>>
    ): Prisma__AccountClient<
      runtime.Types.Result.GetResult<
        Prisma.$AccountPayload<ExtArgs>,
        T,
        'delete',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Update one Account.
     * @param {AccountUpdateArgs} args - Arguments to update one Account.
     * @example
     * // Update one Account
     * const account = await prisma.account.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends AccountUpdateArgs>(
      args: SelectSubset<T, AccountUpdateArgs<ExtArgs>>
    ): Prisma__AccountClient<
      runtime.Types.Result.GetResult<
        Prisma.$AccountPayload<ExtArgs>,
        T,
        'update',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Delete zero or more Accounts.
     * @param {AccountDeleteManyArgs} args - Arguments to filter Accounts to delete.
     * @example
     * // Delete a few Accounts
     * const { count } = await prisma.account.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends AccountDeleteManyArgs>(
      args?: SelectSubset<T, AccountDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Accounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Accounts
     * const account = await prisma.account.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends AccountUpdateManyArgs>(
      args: SelectSubset<T, AccountUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Accounts and returns the data updated in the database.
     * @param {AccountUpdateManyAndReturnArgs} args - Arguments to update many Accounts.
     * @example
     * // Update many Accounts
     * const account = await prisma.account.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more Accounts and only return the `id`
     * const accountWithIdOnly = await prisma.account.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    updateManyAndReturn<T extends AccountUpdateManyAndReturnArgs>(
      args: SelectSubset<T, AccountUpdateManyAndReturnArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      runtime.Types.Result.GetResult<
        Prisma.$AccountPayload<ExtArgs>,
        T,
        'updateManyAndReturn',
        GlobalOmitOptions
      >
    >;

    /**
     * Create or update one Account.
     * @param {AccountUpsertArgs} args - Arguments to update or create a Account.
     * @example
     * // Update or create a Account
     * const account = await prisma.account.upsert({
     *   create: {
     *     // ... data to create a Account
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Account we want to update
     *   }
     * })
     */
    upsert<T extends AccountUpsertArgs>(
      args: SelectSubset<T, AccountUpsertArgs<ExtArgs>>
    ): Prisma__AccountClient<
      runtime.Types.Result.GetResult<
        Prisma.$AccountPayload<ExtArgs>,
        T,
        'upsert',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Count the number of Accounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountCountArgs} args - Arguments to filter Accounts to count.
     * @example
     * // Count the number of Accounts
     * const count = await prisma.account.count({
     *   where: {
     *     // ... the filter for the Accounts we want to count
     *   }
     * })
     **/
    count<T extends AccountCountArgs>(
      args?: Subset<T, AccountCountArgs>
    ): Prisma.PrismaPromise<
      T extends runtime.Types.Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AccountCountAggregateOutputType>
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a Account.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
     **/
    aggregate<T extends AccountAggregateArgs>(
      args: Subset<T, AccountAggregateArgs>
    ): Prisma.PrismaPromise<GetAccountAggregateType<T>>;

    /**
     * Group by Account.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
     **/
    groupBy<
      T extends AccountGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AccountGroupByArgs['orderBy'] }
        : { orderBy?: AccountGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<
        Keys<MaybeTupleToUnion<T['orderBy']>>
      >,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
        ? `Error: "by" must not be empty.`
        : HavingValid extends False
          ? {
              [P in HavingFields]: P extends ByFields
                ? never
                : P extends string
                  ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
                  : [
                      Error,
                      'Field ',
                      P,
                      ` in "having" needs to be provided in "by"`,
                    ];
            }[HavingFields]
          : 'take' extends Keys<T>
            ? 'orderBy' extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
              : 'Error: If you provide "take", you also need to provide "orderBy"'
            : 'skip' extends Keys<T>
              ? 'orderBy' extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                      [P in OrderFields]: P extends ByFields
                        ? never
                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                    }[OrderFields]
                : 'Error: If you provide "skip", you also need to provide "orderBy"'
              : ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields],
    >(
      args: SubsetIntersection<T, AccountGroupByArgs, OrderByArg> & InputErrors
    ): {} extends InputErrors
      ? GetAccountGroupByPayload<T>
      : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the Account model
     */
    readonly fields: AccountFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Account.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AccountClient<
    T,
    Null = never,
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    user<T extends UserDefaultArgs<ExtArgs> = {}>(
      args?: Subset<T, UserDefaultArgs<ExtArgs>>
    ): Prisma__UserClient<
      | runtime.Types.Result.GetResult<
          Prisma.$UserPayload<ExtArgs>,
          T,
          'findUniqueOrThrow',
          GlobalOmitOptions
        >
      | Null,
      Null,
      ExtArgs,
      GlobalOmitOptions
    >;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?:
        | ((value: T) => TResult1 | PromiseLike<TResult1>)
        | undefined
        | null,
      onrejected?:
        | ((reason: any) => TResult2 | PromiseLike<TResult2>)
        | undefined
        | null
    ): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?:
        | ((reason: any) => TResult | PromiseLike<TResult>)
        | undefined
        | null
    ): runtime.Types.Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(
      onfinally?: (() => void) | undefined | null
    ): runtime.Types.Utils.JsPromise<T>;
  }

  /**
   * Fields of the Account model
   */
  export interface AccountFieldRefs {
    readonly id: FieldRef<'Account', 'String'>;
    readonly accountId: FieldRef<'Account', 'String'>;
    readonly providerId: FieldRef<'Account', 'String'>;
    readonly userId: FieldRef<'Account', 'String'>;
    readonly accessToken: FieldRef<'Account', 'String'>;
    readonly refreshToken: FieldRef<'Account', 'String'>;
    readonly idToken: FieldRef<'Account', 'String'>;
    readonly accessTokenExpiresAt: FieldRef<'Account', 'DateTime'>;
    readonly refreshTokenExpiresAt: FieldRef<'Account', 'DateTime'>;
    readonly scope: FieldRef<'Account', 'String'>;
    readonly password: FieldRef<'Account', 'String'>;
    readonly createdAt: FieldRef<'Account', 'DateTime'>;
    readonly updatedAt: FieldRef<'Account', 'DateTime'>;
  }

  // Custom InputTypes
  /**
   * Account findUnique
   */
  export type AccountFindUniqueArgs<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null;
    /**
     * Filter, which Account to fetch.
     */
    where: AccountWhereUniqueInput;
  };

  /**
   * Account findUniqueOrThrow
   */
  export type AccountFindUniqueOrThrowArgs<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null;
    /**
     * Filter, which Account to fetch.
     */
    where: AccountWhereUniqueInput;
  };

  /**
   * Account findFirst
   */
  export type AccountFindFirstArgs<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null;
    /**
     * Filter, which Account to fetch.
     */
    where?: AccountWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Accounts to fetch.
     */
    orderBy?:
      | AccountOrderByWithRelationInput
      | AccountOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Accounts.
     */
    cursor?: AccountWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Accounts.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Accounts.
     */
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[];
  };

  /**
   * Account findFirstOrThrow
   */
  export type AccountFindFirstOrThrowArgs<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null;
    /**
     * Filter, which Account to fetch.
     */
    where?: AccountWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Accounts to fetch.
     */
    orderBy?:
      | AccountOrderByWithRelationInput
      | AccountOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Accounts.
     */
    cursor?: AccountWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Accounts.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Accounts.
     */
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[];
  };

  /**
   * Account findMany
   */
  export type AccountFindManyArgs<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null;
    /**
     * Filter, which Accounts to fetch.
     */
    where?: AccountWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Accounts to fetch.
     */
    orderBy?:
      | AccountOrderByWithRelationInput
      | AccountOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Accounts.
     */
    cursor?: AccountWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Accounts.
     */
    skip?: number;
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[];
  };

  /**
   * Account create
   */
  export type AccountCreateArgs<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null;
    /**
     * The data needed to create a Account.
     */
    data: XOR<AccountCreateInput, AccountUncheckedCreateInput>;
  };

  /**
   * Account createMany
   */
  export type AccountCreateManyArgs<
    _ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {
    /**
     * The data used to create many Accounts.
     */
    data: AccountCreateManyInput | AccountCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * Account createManyAndReturn
   */
  export type AccountCreateManyAndReturnArgs<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null;
    /**
     * The data used to create many Accounts.
     */
    data: AccountCreateManyInput | AccountCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountIncludeCreateManyAndReturn<ExtArgs> | null;
  };

  /**
   * Account update
   */
  export type AccountUpdateArgs<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null;
    /**
     * The data needed to update a Account.
     */
    data: XOR<AccountUpdateInput, AccountUncheckedUpdateInput>;
    /**
     * Choose, which Account to update.
     */
    where: AccountWhereUniqueInput;
  };

  /**
   * Account updateMany
   */
  export type AccountUpdateManyArgs<
    _ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {
    /**
     * The data used to update Accounts.
     */
    data: XOR<AccountUpdateManyMutationInput, AccountUncheckedUpdateManyInput>;
    /**
     * Filter which Accounts to update
     */
    where?: AccountWhereInput;
    /**
     * Limit how many Accounts to update.
     */
    limit?: number;
  };

  /**
   * Account updateManyAndReturn
   */
  export type AccountUpdateManyAndReturnArgs<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null;
    /**
     * The data used to update Accounts.
     */
    data: XOR<AccountUpdateManyMutationInput, AccountUncheckedUpdateManyInput>;
    /**
     * Filter which Accounts to update
     */
    where?: AccountWhereInput;
    /**
     * Limit how many Accounts to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountIncludeUpdateManyAndReturn<ExtArgs> | null;
  };

  /**
   * Account upsert
   */
  export type AccountUpsertArgs<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null;
    /**
     * The filter to search for the Account to update in case it exists.
     */
    where: AccountWhereUniqueInput;
    /**
     * In case the Account found by the `where` argument doesn't exist, create a new Account with this data.
     */
    create: XOR<AccountCreateInput, AccountUncheckedCreateInput>;
    /**
     * In case the Account was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AccountUpdateInput, AccountUncheckedUpdateInput>;
  };

  /**
   * Account delete
   */
  export type AccountDeleteArgs<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null;
    /**
     * Filter which Account to delete.
     */
    where: AccountWhereUniqueInput;
  };

  /**
   * Account deleteMany
   */
  export type AccountDeleteManyArgs<
    _ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Accounts to delete
     */
    where?: AccountWhereInput;
    /**
     * Limit how many Accounts to delete.
     */
    limit?: number;
  };

  /**
   * Account without action
   */
  export type AccountDefaultArgs<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null;
  };

  /**
   * Model Verification
   */

  export type AggregateVerification = {
    _count: VerificationCountAggregateOutputType | null;
    _min: VerificationMinAggregateOutputType | null;
    _max: VerificationMaxAggregateOutputType | null;
  };

  export type VerificationMinAggregateOutputType = {
    id: string | null;
    identifier: string | null;
    value: string | null;
    expiresAt: Date | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  };

  export type VerificationMaxAggregateOutputType = {
    id: string | null;
    identifier: string | null;
    value: string | null;
    expiresAt: Date | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  };

  export type VerificationCountAggregateOutputType = {
    id: number;
    identifier: number;
    value: number;
    expiresAt: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
  };

  export type VerificationMinAggregateInputType = {
    id?: true;
    identifier?: true;
    value?: true;
    expiresAt?: true;
    createdAt?: true;
    updatedAt?: true;
  };

  export type VerificationMaxAggregateInputType = {
    id?: true;
    identifier?: true;
    value?: true;
    expiresAt?: true;
    createdAt?: true;
    updatedAt?: true;
  };

  export type VerificationCountAggregateInputType = {
    id?: true;
    identifier?: true;
    value?: true;
    expiresAt?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
  };

  export type VerificationAggregateArgs<
    _ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Verification to aggregate.
     */
    where?: VerificationWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Verifications to fetch.
     */
    orderBy?:
      | VerificationOrderByWithRelationInput
      | VerificationOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: VerificationWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Verifications from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Verifications.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Verifications
     **/
    _count?: true | VerificationCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: VerificationMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: VerificationMaxAggregateInputType;
  };

  export type GetVerificationAggregateType<
    T extends VerificationAggregateArgs,
  > = {
    [P in keyof T & keyof AggregateVerification]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateVerification[P]>
      : GetScalarType<T[P], AggregateVerification[P]>;
  };

  export type VerificationGroupByArgs<
    _ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {
    where?: VerificationWhereInput;
    orderBy?:
      | VerificationOrderByWithAggregationInput
      | VerificationOrderByWithAggregationInput[];
    by: VerificationScalarFieldEnum[] | VerificationScalarFieldEnum;
    having?: VerificationScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: VerificationCountAggregateInputType | true;
    _min?: VerificationMinAggregateInputType;
    _max?: VerificationMaxAggregateInputType;
  };

  export type VerificationGroupByOutputType = {
    id: string;
    identifier: string;
    value: string;
    expiresAt: Date;
    createdAt: Date | null;
    updatedAt: Date | null;
    _count: VerificationCountAggregateOutputType | null;
    _min: VerificationMinAggregateOutputType | null;
    _max: VerificationMaxAggregateOutputType | null;
  };

  type GetVerificationGroupByPayload<T extends VerificationGroupByArgs> =
    Prisma.PrismaPromise<
      Array<
        PickEnumerable<VerificationGroupByOutputType, T['by']> & {
          [P in keyof T &
            keyof VerificationGroupByOutputType]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], VerificationGroupByOutputType[P]>
            : GetScalarType<T[P], VerificationGroupByOutputType[P]>;
        }
      >
    >;

  export type VerificationSelect<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = runtime.Types.Extensions.GetSelect<
    {
      id?: boolean;
      identifier?: boolean;
      value?: boolean;
      expiresAt?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
    },
    ExtArgs['result']['verification']
  >;

  export type VerificationSelectCreateManyAndReturn<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = runtime.Types.Extensions.GetSelect<
    {
      id?: boolean;
      identifier?: boolean;
      value?: boolean;
      expiresAt?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
    },
    ExtArgs['result']['verification']
  >;

  export type VerificationSelectUpdateManyAndReturn<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = runtime.Types.Extensions.GetSelect<
    {
      id?: boolean;
      identifier?: boolean;
      value?: boolean;
      expiresAt?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
    },
    ExtArgs['result']['verification']
  >;

  export type VerificationSelectScalar = {
    id?: boolean;
    identifier?: boolean;
    value?: boolean;
    expiresAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
  };

  export type VerificationOmit<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = runtime.Types.Extensions.GetOmit<
    'id' | 'identifier' | 'value' | 'expiresAt' | 'createdAt' | 'updatedAt',
    ExtArgs['result']['verification']
  >;

  export type $VerificationPayload<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {
    name: 'Verification';
    objects: {};
    scalars: runtime.Types.Extensions.GetPayloadResult<
      {
        id: string;
        identifier: string;
        value: string;
        expiresAt: Date;
        createdAt: Date | null;
        updatedAt: Date | null;
      },
      ExtArgs['result']['verification']
    >;
    composites: {};
  };

  export type VerificationGetPayload<
    S extends boolean | null | undefined | VerificationDefaultArgs,
  > = runtime.Types.Result.GetResult<Prisma.$VerificationPayload, S>;

  export type VerificationCountArgs<
    _ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = Omit<
    VerificationFindManyArgs,
    'select' | 'include' | 'distinct' | 'omit'
  > & {
    select?: VerificationCountAggregateInputType | true;
  };

  export interface VerificationDelegate<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > {
    [K: symbol]: {
      types: Prisma.TypeMap<ExtArgs>['model']['Verification'];
      meta: { name: 'Verification' };
    };
    /**
     * Find zero or one Verification that matches the filter.
     * @param {VerificationFindUniqueArgs} args - Arguments to find a Verification
     * @example
     * // Get one Verification
     * const verification = await prisma.verification.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends VerificationFindUniqueArgs>(
      args: SelectSubset<T, VerificationFindUniqueArgs<ExtArgs>>
    ): Prisma__VerificationClient<
      runtime.Types.Result.GetResult<
        Prisma.$VerificationPayload<ExtArgs>,
        T,
        'findUnique',
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find one Verification that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {VerificationFindUniqueOrThrowArgs} args - Arguments to find a Verification
     * @example
     * // Get one Verification
     * const verification = await prisma.verification.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends VerificationFindUniqueOrThrowArgs>(
      args: SelectSubset<T, VerificationFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__VerificationClient<
      runtime.Types.Result.GetResult<
        Prisma.$VerificationPayload<ExtArgs>,
        T,
        'findUniqueOrThrow',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first Verification that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationFindFirstArgs} args - Arguments to find a Verification
     * @example
     * // Get one Verification
     * const verification = await prisma.verification.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends VerificationFindFirstArgs>(
      args?: SelectSubset<T, VerificationFindFirstArgs<ExtArgs>>
    ): Prisma__VerificationClient<
      runtime.Types.Result.GetResult<
        Prisma.$VerificationPayload<ExtArgs>,
        T,
        'findFirst',
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first Verification that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationFindFirstOrThrowArgs} args - Arguments to find a Verification
     * @example
     * // Get one Verification
     * const verification = await prisma.verification.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends VerificationFindFirstOrThrowArgs>(
      args?: SelectSubset<T, VerificationFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__VerificationClient<
      runtime.Types.Result.GetResult<
        Prisma.$VerificationPayload<ExtArgs>,
        T,
        'findFirstOrThrow',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find zero or more Verifications that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Verifications
     * const verifications = await prisma.verification.findMany()
     *
     * // Get first 10 Verifications
     * const verifications = await prisma.verification.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const verificationWithIdOnly = await prisma.verification.findMany({ select: { id: true } })
     *
     */
    findMany<T extends VerificationFindManyArgs>(
      args?: SelectSubset<T, VerificationFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      runtime.Types.Result.GetResult<
        Prisma.$VerificationPayload<ExtArgs>,
        T,
        'findMany',
        GlobalOmitOptions
      >
    >;

    /**
     * Create a Verification.
     * @param {VerificationCreateArgs} args - Arguments to create a Verification.
     * @example
     * // Create one Verification
     * const Verification = await prisma.verification.create({
     *   data: {
     *     // ... data to create a Verification
     *   }
     * })
     *
     */
    create<T extends VerificationCreateArgs>(
      args: SelectSubset<T, VerificationCreateArgs<ExtArgs>>
    ): Prisma__VerificationClient<
      runtime.Types.Result.GetResult<
        Prisma.$VerificationPayload<ExtArgs>,
        T,
        'create',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Create many Verifications.
     * @param {VerificationCreateManyArgs} args - Arguments to create many Verifications.
     * @example
     * // Create many Verifications
     * const verification = await prisma.verification.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends VerificationCreateManyArgs>(
      args?: SelectSubset<T, VerificationCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create many Verifications and returns the data saved in the database.
     * @param {VerificationCreateManyAndReturnArgs} args - Arguments to create many Verifications.
     * @example
     * // Create many Verifications
     * const verification = await prisma.verification.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Verifications and only return the `id`
     * const verificationWithIdOnly = await prisma.verification.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends VerificationCreateManyAndReturnArgs>(
      args?: SelectSubset<T, VerificationCreateManyAndReturnArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      runtime.Types.Result.GetResult<
        Prisma.$VerificationPayload<ExtArgs>,
        T,
        'createManyAndReturn',
        GlobalOmitOptions
      >
    >;

    /**
     * Delete a Verification.
     * @param {VerificationDeleteArgs} args - Arguments to delete one Verification.
     * @example
     * // Delete one Verification
     * const Verification = await prisma.verification.delete({
     *   where: {
     *     // ... filter to delete one Verification
     *   }
     * })
     *
     */
    delete<T extends VerificationDeleteArgs>(
      args: SelectSubset<T, VerificationDeleteArgs<ExtArgs>>
    ): Prisma__VerificationClient<
      runtime.Types.Result.GetResult<
        Prisma.$VerificationPayload<ExtArgs>,
        T,
        'delete',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Update one Verification.
     * @param {VerificationUpdateArgs} args - Arguments to update one Verification.
     * @example
     * // Update one Verification
     * const verification = await prisma.verification.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends VerificationUpdateArgs>(
      args: SelectSubset<T, VerificationUpdateArgs<ExtArgs>>
    ): Prisma__VerificationClient<
      runtime.Types.Result.GetResult<
        Prisma.$VerificationPayload<ExtArgs>,
        T,
        'update',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Delete zero or more Verifications.
     * @param {VerificationDeleteManyArgs} args - Arguments to filter Verifications to delete.
     * @example
     * // Delete a few Verifications
     * const { count } = await prisma.verification.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends VerificationDeleteManyArgs>(
      args?: SelectSubset<T, VerificationDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Verifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Verifications
     * const verification = await prisma.verification.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends VerificationUpdateManyArgs>(
      args: SelectSubset<T, VerificationUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Verifications and returns the data updated in the database.
     * @param {VerificationUpdateManyAndReturnArgs} args - Arguments to update many Verifications.
     * @example
     * // Update many Verifications
     * const verification = await prisma.verification.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more Verifications and only return the `id`
     * const verificationWithIdOnly = await prisma.verification.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    updateManyAndReturn<T extends VerificationUpdateManyAndReturnArgs>(
      args: SelectSubset<T, VerificationUpdateManyAndReturnArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      runtime.Types.Result.GetResult<
        Prisma.$VerificationPayload<ExtArgs>,
        T,
        'updateManyAndReturn',
        GlobalOmitOptions
      >
    >;

    /**
     * Create or update one Verification.
     * @param {VerificationUpsertArgs} args - Arguments to update or create a Verification.
     * @example
     * // Update or create a Verification
     * const verification = await prisma.verification.upsert({
     *   create: {
     *     // ... data to create a Verification
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Verification we want to update
     *   }
     * })
     */
    upsert<T extends VerificationUpsertArgs>(
      args: SelectSubset<T, VerificationUpsertArgs<ExtArgs>>
    ): Prisma__VerificationClient<
      runtime.Types.Result.GetResult<
        Prisma.$VerificationPayload<ExtArgs>,
        T,
        'upsert',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Count the number of Verifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationCountArgs} args - Arguments to filter Verifications to count.
     * @example
     * // Count the number of Verifications
     * const count = await prisma.verification.count({
     *   where: {
     *     // ... the filter for the Verifications we want to count
     *   }
     * })
     **/
    count<T extends VerificationCountArgs>(
      args?: Subset<T, VerificationCountArgs>
    ): Prisma.PrismaPromise<
      T extends runtime.Types.Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], VerificationCountAggregateOutputType>
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a Verification.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
     **/
    aggregate<T extends VerificationAggregateArgs>(
      args: Subset<T, VerificationAggregateArgs>
    ): Prisma.PrismaPromise<GetVerificationAggregateType<T>>;

    /**
     * Group by Verification.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
     **/
    groupBy<
      T extends VerificationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: VerificationGroupByArgs['orderBy'] }
        : { orderBy?: VerificationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<
        Keys<MaybeTupleToUnion<T['orderBy']>>
      >,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
        ? `Error: "by" must not be empty.`
        : HavingValid extends False
          ? {
              [P in HavingFields]: P extends ByFields
                ? never
                : P extends string
                  ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
                  : [
                      Error,
                      'Field ',
                      P,
                      ` in "having" needs to be provided in "by"`,
                    ];
            }[HavingFields]
          : 'take' extends Keys<T>
            ? 'orderBy' extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
              : 'Error: If you provide "take", you also need to provide "orderBy"'
            : 'skip' extends Keys<T>
              ? 'orderBy' extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                      [P in OrderFields]: P extends ByFields
                        ? never
                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                    }[OrderFields]
                : 'Error: If you provide "skip", you also need to provide "orderBy"'
              : ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields],
    >(
      args: SubsetIntersection<T, VerificationGroupByArgs, OrderByArg> &
        InputErrors
    ): {} extends InputErrors
      ? GetVerificationGroupByPayload<T>
      : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the Verification model
     */
    readonly fields: VerificationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Verification.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__VerificationClient<
    T,
    _Null = never,
    _ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
    _GlobalOmitOptions = {},
  > extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?:
        | ((value: T) => TResult1 | PromiseLike<TResult1>)
        | undefined
        | null,
      onrejected?:
        | ((reason: any) => TResult2 | PromiseLike<TResult2>)
        | undefined
        | null
    ): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?:
        | ((reason: any) => TResult | PromiseLike<TResult>)
        | undefined
        | null
    ): runtime.Types.Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(
      onfinally?: (() => void) | undefined | null
    ): runtime.Types.Utils.JsPromise<T>;
  }

  /**
   * Fields of the Verification model
   */
  export interface VerificationFieldRefs {
    readonly id: FieldRef<'Verification', 'String'>;
    readonly identifier: FieldRef<'Verification', 'String'>;
    readonly value: FieldRef<'Verification', 'String'>;
    readonly expiresAt: FieldRef<'Verification', 'DateTime'>;
    readonly createdAt: FieldRef<'Verification', 'DateTime'>;
    readonly updatedAt: FieldRef<'Verification', 'DateTime'>;
  }

  // Custom InputTypes
  /**
   * Verification findUnique
   */
  export type VerificationFindUniqueArgs<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null;
    /**
     * Filter, which Verification to fetch.
     */
    where: VerificationWhereUniqueInput;
  };

  /**
   * Verification findUniqueOrThrow
   */
  export type VerificationFindUniqueOrThrowArgs<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null;
    /**
     * Filter, which Verification to fetch.
     */
    where: VerificationWhereUniqueInput;
  };

  /**
   * Verification findFirst
   */
  export type VerificationFindFirstArgs<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null;
    /**
     * Filter, which Verification to fetch.
     */
    where?: VerificationWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Verifications to fetch.
     */
    orderBy?:
      | VerificationOrderByWithRelationInput
      | VerificationOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Verifications.
     */
    cursor?: VerificationWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Verifications from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Verifications.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Verifications.
     */
    distinct?: VerificationScalarFieldEnum | VerificationScalarFieldEnum[];
  };

  /**
   * Verification findFirstOrThrow
   */
  export type VerificationFindFirstOrThrowArgs<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null;
    /**
     * Filter, which Verification to fetch.
     */
    where?: VerificationWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Verifications to fetch.
     */
    orderBy?:
      | VerificationOrderByWithRelationInput
      | VerificationOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Verifications.
     */
    cursor?: VerificationWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Verifications from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Verifications.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Verifications.
     */
    distinct?: VerificationScalarFieldEnum | VerificationScalarFieldEnum[];
  };

  /**
   * Verification findMany
   */
  export type VerificationFindManyArgs<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null;
    /**
     * Filter, which Verifications to fetch.
     */
    where?: VerificationWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Verifications to fetch.
     */
    orderBy?:
      | VerificationOrderByWithRelationInput
      | VerificationOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Verifications.
     */
    cursor?: VerificationWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Verifications from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Verifications.
     */
    skip?: number;
    distinct?: VerificationScalarFieldEnum | VerificationScalarFieldEnum[];
  };

  /**
   * Verification create
   */
  export type VerificationCreateArgs<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null;
    /**
     * The data needed to create a Verification.
     */
    data: XOR<VerificationCreateInput, VerificationUncheckedCreateInput>;
  };

  /**
   * Verification createMany
   */
  export type VerificationCreateManyArgs<
    _ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {
    /**
     * The data used to create many Verifications.
     */
    data: VerificationCreateManyInput | VerificationCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * Verification createManyAndReturn
   */
  export type VerificationCreateManyAndReturnArgs<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null;
    /**
     * The data used to create many Verifications.
     */
    data: VerificationCreateManyInput | VerificationCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * Verification update
   */
  export type VerificationUpdateArgs<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null;
    /**
     * The data needed to update a Verification.
     */
    data: XOR<VerificationUpdateInput, VerificationUncheckedUpdateInput>;
    /**
     * Choose, which Verification to update.
     */
    where: VerificationWhereUniqueInput;
  };

  /**
   * Verification updateMany
   */
  export type VerificationUpdateManyArgs<
    _ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {
    /**
     * The data used to update Verifications.
     */
    data: XOR<
      VerificationUpdateManyMutationInput,
      VerificationUncheckedUpdateManyInput
    >;
    /**
     * Filter which Verifications to update
     */
    where?: VerificationWhereInput;
    /**
     * Limit how many Verifications to update.
     */
    limit?: number;
  };

  /**
   * Verification updateManyAndReturn
   */
  export type VerificationUpdateManyAndReturnArgs<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null;
    /**
     * The data used to update Verifications.
     */
    data: XOR<
      VerificationUpdateManyMutationInput,
      VerificationUncheckedUpdateManyInput
    >;
    /**
     * Filter which Verifications to update
     */
    where?: VerificationWhereInput;
    /**
     * Limit how many Verifications to update.
     */
    limit?: number;
  };

  /**
   * Verification upsert
   */
  export type VerificationUpsertArgs<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null;
    /**
     * The filter to search for the Verification to update in case it exists.
     */
    where: VerificationWhereUniqueInput;
    /**
     * In case the Verification found by the `where` argument doesn't exist, create a new Verification with this data.
     */
    create: XOR<VerificationCreateInput, VerificationUncheckedCreateInput>;
    /**
     * In case the Verification was found with the provided `where` argument, update it with this data.
     */
    update: XOR<VerificationUpdateInput, VerificationUncheckedUpdateInput>;
  };

  /**
   * Verification delete
   */
  export type VerificationDeleteArgs<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null;
    /**
     * Filter which Verification to delete.
     */
    where: VerificationWhereUniqueInput;
  };

  /**
   * Verification deleteMany
   */
  export type VerificationDeleteManyArgs<
    _ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Verifications to delete
     */
    where?: VerificationWhereInput;
    /**
     * Limit how many Verifications to delete.
     */
    limit?: number;
  };

  /**
   * Verification without action
   */
  export type VerificationDefaultArgs<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null;
  };

  /**
   * Enums
   */

  export const TransactionIsolationLevel = runtime.makeStrictEnum({
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable',
  } as const);

  export type TransactionIsolationLevel =
    (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel];

  export const BudgetScalarFieldEnum = {
    id: 'id',
    userId: 'userId',
    proposalId: 'proposalId',
    details: 'details',
    budget: 'budget',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
  } as const;

  export type BudgetScalarFieldEnum =
    (typeof BudgetScalarFieldEnum)[keyof typeof BudgetScalarFieldEnum];

  export const ProposalScalarFieldEnum = {
    id: 'id',
    userId: 'userId',
    serviceId: 'serviceId',
    type: 'type',
    commune: 'commune',
    address: 'address',
    serviceDate: 'serviceDate',
    description: 'description',
    active: 'active',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
  } as const;

  export type ProposalScalarFieldEnum =
    (typeof ProposalScalarFieldEnum)[keyof typeof ProposalScalarFieldEnum];

  export const ServicesScalarFieldEnum = {
    id: 'id',
    name: 'name',
    description: 'description',
    slug: 'slug',
    icon: 'icon',
    active: 'active',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
  } as const;

  export type ServicesScalarFieldEnum =
    (typeof ServicesScalarFieldEnum)[keyof typeof ServicesScalarFieldEnum];

  export const SubServicesScalarFieldEnum = {
    id: 'id',
    idService: 'idService',
    name: 'name',
    description: 'description',
    active: 'active',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
  } as const;

  export type SubServicesScalarFieldEnum =
    (typeof SubServicesScalarFieldEnum)[keyof typeof SubServicesScalarFieldEnum];

  export const UserScalarFieldEnum = {
    id: 'id',
    name: 'name',
    email: 'email',
    phone: 'phone',
    emailVerified: 'emailVerified',
    image: 'image',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
  } as const;

  export type UserScalarFieldEnum =
    (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum];

  export const SessionScalarFieldEnum = {
    id: 'id',
    expiresAt: 'expiresAt',
    token: 'token',
    ipAddress: 'ipAddress',
    userAgent: 'userAgent',
    userId: 'userId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
  } as const;

  export type SessionScalarFieldEnum =
    (typeof SessionScalarFieldEnum)[keyof typeof SessionScalarFieldEnum];

  export const AccountScalarFieldEnum = {
    id: 'id',
    accountId: 'accountId',
    providerId: 'providerId',
    userId: 'userId',
    accessToken: 'accessToken',
    refreshToken: 'refreshToken',
    idToken: 'idToken',
    accessTokenExpiresAt: 'accessTokenExpiresAt',
    refreshTokenExpiresAt: 'refreshTokenExpiresAt',
    scope: 'scope',
    password: 'password',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
  } as const;

  export type AccountScalarFieldEnum =
    (typeof AccountScalarFieldEnum)[keyof typeof AccountScalarFieldEnum];

  export const VerificationScalarFieldEnum = {
    id: 'id',
    identifier: 'identifier',
    value: 'value',
    expiresAt: 'expiresAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
  } as const;

  export type VerificationScalarFieldEnum =
    (typeof VerificationScalarFieldEnum)[keyof typeof VerificationScalarFieldEnum];

  export const SortOrder = {
    asc: 'asc',
    desc: 'desc',
  } as const;

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder];

  export const QueryMode = {
    default: 'default',
    insensitive: 'insensitive',
  } as const;

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode];

  export const NullsOrder = {
    first: 'first',
    last: 'last',
  } as const;

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder];

  /**
   * Field references
   */

  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    'Int'
  >;

  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    'Int[]'
  >;

  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    'String'
  >;

  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    'String[]'
  >;

  /**
   * Reference to a field of type 'Decimal'
   */
  export type DecimalFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    'Decimal'
  >;

  /**
   * Reference to a field of type 'Decimal[]'
   */
  export type ListDecimalFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    'Decimal[]'
  >;

  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    'DateTime'
  >;

  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    'DateTime[]'
  >;

  /**
   * Reference to a field of type 'ProposalHome'
   */
  export type EnumProposalHomeFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    'ProposalHome'
  >;

  /**
   * Reference to a field of type 'ProposalHome[]'
   */
  export type ListEnumProposalHomeFieldRefInput<$PrismaModel> =
    FieldRefInputType<$PrismaModel, 'ProposalHome[]'>;

  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    'Boolean'
  >;

  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    'Float'
  >;

  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    'Float[]'
  >;

  /**
   * Deep Input Types
   */

  export type BudgetWhereInput = {
    AND?: BudgetWhereInput | BudgetWhereInput[];
    OR?: BudgetWhereInput[];
    NOT?: BudgetWhereInput | BudgetWhereInput[];
    id?: IntFilter<'Budget'> | number;
    userId?: StringFilter<'Budget'> | string;
    proposalId?: IntFilter<'Budget'> | number;
    details?: StringFilter<'Budget'> | string;
    budget?:
      | DecimalFilter<'Budget'>
      | Decimal
      | DecimalJsLike
      | number
      | string;
    createdAt?: DateTimeFilter<'Budget'> | Date | string;
    updatedAt?: DateTimeFilter<'Budget'> | Date | string;
    user?: XOR<UserScalarRelationFilter, UserWhereInput>;
    proposal?: XOR<ProposalScalarRelationFilter, ProposalWhereInput>;
  };

  export type BudgetOrderByWithRelationInput = {
    id?: SortOrder;
    userId?: SortOrder;
    proposalId?: SortOrder;
    details?: SortOrder;
    budget?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    user?: UserOrderByWithRelationInput;
    proposal?: ProposalOrderByWithRelationInput;
  };

  export type BudgetWhereUniqueInput = Prisma.AtLeast<
    {
      id?: number;
      AND?: BudgetWhereInput | BudgetWhereInput[];
      OR?: BudgetWhereInput[];
      NOT?: BudgetWhereInput | BudgetWhereInput[];
      userId?: StringFilter<'Budget'> | string;
      proposalId?: IntFilter<'Budget'> | number;
      details?: StringFilter<'Budget'> | string;
      budget?:
        | DecimalFilter<'Budget'>
        | Decimal
        | DecimalJsLike
        | number
        | string;
      createdAt?: DateTimeFilter<'Budget'> | Date | string;
      updatedAt?: DateTimeFilter<'Budget'> | Date | string;
      user?: XOR<UserScalarRelationFilter, UserWhereInput>;
      proposal?: XOR<ProposalScalarRelationFilter, ProposalWhereInput>;
    },
    'id'
  >;

  export type BudgetOrderByWithAggregationInput = {
    id?: SortOrder;
    userId?: SortOrder;
    proposalId?: SortOrder;
    details?: SortOrder;
    budget?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    _count?: BudgetCountOrderByAggregateInput;
    _avg?: BudgetAvgOrderByAggregateInput;
    _max?: BudgetMaxOrderByAggregateInput;
    _min?: BudgetMinOrderByAggregateInput;
    _sum?: BudgetSumOrderByAggregateInput;
  };

  export type BudgetScalarWhereWithAggregatesInput = {
    AND?:
      | BudgetScalarWhereWithAggregatesInput
      | BudgetScalarWhereWithAggregatesInput[];
    OR?: BudgetScalarWhereWithAggregatesInput[];
    NOT?:
      | BudgetScalarWhereWithAggregatesInput
      | BudgetScalarWhereWithAggregatesInput[];
    id?: IntWithAggregatesFilter<'Budget'> | number;
    userId?: StringWithAggregatesFilter<'Budget'> | string;
    proposalId?: IntWithAggregatesFilter<'Budget'> | number;
    details?: StringWithAggregatesFilter<'Budget'> | string;
    budget?:
      | DecimalWithAggregatesFilter<'Budget'>
      | Decimal
      | DecimalJsLike
      | number
      | string;
    createdAt?: DateTimeWithAggregatesFilter<'Budget'> | Date | string;
    updatedAt?: DateTimeWithAggregatesFilter<'Budget'> | Date | string;
  };

  export type ProposalWhereInput = {
    AND?: ProposalWhereInput | ProposalWhereInput[];
    OR?: ProposalWhereInput[];
    NOT?: ProposalWhereInput | ProposalWhereInput[];
    id?: IntFilter<'Proposal'> | number;
    userId?: StringFilter<'Proposal'> | string;
    serviceId?: IntFilter<'Proposal'> | number;
    type?: EnumProposalHomeFilter<'Proposal'> | $Enums.ProposalHome;
    commune?: IntFilter<'Proposal'> | number;
    address?: StringFilter<'Proposal'> | string;
    serviceDate?: DateTimeFilter<'Proposal'> | Date | string;
    description?: StringFilter<'Proposal'> | string;
    active?: BoolFilter<'Proposal'> | boolean;
    createdAt?: DateTimeFilter<'Proposal'> | Date | string;
    updatedAt?: DateTimeFilter<'Proposal'> | Date | string;
    user?: XOR<UserScalarRelationFilter, UserWhereInput>;
    subServices?: XOR<SubServicesScalarRelationFilter, SubServicesWhereInput>;
    budget?: BudgetListRelationFilter;
  };

  export type ProposalOrderByWithRelationInput = {
    id?: SortOrder;
    userId?: SortOrder;
    serviceId?: SortOrder;
    type?: SortOrder;
    commune?: SortOrder;
    address?: SortOrder;
    serviceDate?: SortOrder;
    description?: SortOrder;
    active?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    user?: UserOrderByWithRelationInput;
    subServices?: SubServicesOrderByWithRelationInput;
    budget?: BudgetOrderByRelationAggregateInput;
  };

  export type ProposalWhereUniqueInput = Prisma.AtLeast<
    {
      id?: number;
      AND?: ProposalWhereInput | ProposalWhereInput[];
      OR?: ProposalWhereInput[];
      NOT?: ProposalWhereInput | ProposalWhereInput[];
      userId?: StringFilter<'Proposal'> | string;
      serviceId?: IntFilter<'Proposal'> | number;
      type?: EnumProposalHomeFilter<'Proposal'> | $Enums.ProposalHome;
      commune?: IntFilter<'Proposal'> | number;
      address?: StringFilter<'Proposal'> | string;
      serviceDate?: DateTimeFilter<'Proposal'> | Date | string;
      description?: StringFilter<'Proposal'> | string;
      active?: BoolFilter<'Proposal'> | boolean;
      createdAt?: DateTimeFilter<'Proposal'> | Date | string;
      updatedAt?: DateTimeFilter<'Proposal'> | Date | string;
      user?: XOR<UserScalarRelationFilter, UserWhereInput>;
      subServices?: XOR<SubServicesScalarRelationFilter, SubServicesWhereInput>;
      budget?: BudgetListRelationFilter;
    },
    'id'
  >;

  export type ProposalOrderByWithAggregationInput = {
    id?: SortOrder;
    userId?: SortOrder;
    serviceId?: SortOrder;
    type?: SortOrder;
    commune?: SortOrder;
    address?: SortOrder;
    serviceDate?: SortOrder;
    description?: SortOrder;
    active?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    _count?: ProposalCountOrderByAggregateInput;
    _avg?: ProposalAvgOrderByAggregateInput;
    _max?: ProposalMaxOrderByAggregateInput;
    _min?: ProposalMinOrderByAggregateInput;
    _sum?: ProposalSumOrderByAggregateInput;
  };

  export type ProposalScalarWhereWithAggregatesInput = {
    AND?:
      | ProposalScalarWhereWithAggregatesInput
      | ProposalScalarWhereWithAggregatesInput[];
    OR?: ProposalScalarWhereWithAggregatesInput[];
    NOT?:
      | ProposalScalarWhereWithAggregatesInput
      | ProposalScalarWhereWithAggregatesInput[];
    id?: IntWithAggregatesFilter<'Proposal'> | number;
    userId?: StringWithAggregatesFilter<'Proposal'> | string;
    serviceId?: IntWithAggregatesFilter<'Proposal'> | number;
    type?:
      | EnumProposalHomeWithAggregatesFilter<'Proposal'>
      | $Enums.ProposalHome;
    commune?: IntWithAggregatesFilter<'Proposal'> | number;
    address?: StringWithAggregatesFilter<'Proposal'> | string;
    serviceDate?: DateTimeWithAggregatesFilter<'Proposal'> | Date | string;
    description?: StringWithAggregatesFilter<'Proposal'> | string;
    active?: BoolWithAggregatesFilter<'Proposal'> | boolean;
    createdAt?: DateTimeWithAggregatesFilter<'Proposal'> | Date | string;
    updatedAt?: DateTimeWithAggregatesFilter<'Proposal'> | Date | string;
  };

  export type ServicesWhereInput = {
    AND?: ServicesWhereInput | ServicesWhereInput[];
    OR?: ServicesWhereInput[];
    NOT?: ServicesWhereInput | ServicesWhereInput[];
    id?: IntFilter<'Services'> | number;
    name?: StringFilter<'Services'> | string;
    description?: StringFilter<'Services'> | string;
    slug?: StringFilter<'Services'> | string;
    icon?: StringFilter<'Services'> | string;
    active?: BoolFilter<'Services'> | boolean;
    createdAt?: DateTimeFilter<'Services'> | Date | string;
    updatedAt?: DateTimeFilter<'Services'> | Date | string;
    subServices?: SubServicesListRelationFilter;
  };

  export type ServicesOrderByWithRelationInput = {
    id?: SortOrder;
    name?: SortOrder;
    description?: SortOrder;
    slug?: SortOrder;
    icon?: SortOrder;
    active?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    subServices?: SubServicesOrderByRelationAggregateInput;
  };

  export type ServicesWhereUniqueInput = Prisma.AtLeast<
    {
      id?: number;
      slug?: string;
      AND?: ServicesWhereInput | ServicesWhereInput[];
      OR?: ServicesWhereInput[];
      NOT?: ServicesWhereInput | ServicesWhereInput[];
      name?: StringFilter<'Services'> | string;
      description?: StringFilter<'Services'> | string;
      icon?: StringFilter<'Services'> | string;
      active?: BoolFilter<'Services'> | boolean;
      createdAt?: DateTimeFilter<'Services'> | Date | string;
      updatedAt?: DateTimeFilter<'Services'> | Date | string;
      subServices?: SubServicesListRelationFilter;
    },
    'id' | 'slug'
  >;

  export type ServicesOrderByWithAggregationInput = {
    id?: SortOrder;
    name?: SortOrder;
    description?: SortOrder;
    slug?: SortOrder;
    icon?: SortOrder;
    active?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    _count?: ServicesCountOrderByAggregateInput;
    _avg?: ServicesAvgOrderByAggregateInput;
    _max?: ServicesMaxOrderByAggregateInput;
    _min?: ServicesMinOrderByAggregateInput;
    _sum?: ServicesSumOrderByAggregateInput;
  };

  export type ServicesScalarWhereWithAggregatesInput = {
    AND?:
      | ServicesScalarWhereWithAggregatesInput
      | ServicesScalarWhereWithAggregatesInput[];
    OR?: ServicesScalarWhereWithAggregatesInput[];
    NOT?:
      | ServicesScalarWhereWithAggregatesInput
      | ServicesScalarWhereWithAggregatesInput[];
    id?: IntWithAggregatesFilter<'Services'> | number;
    name?: StringWithAggregatesFilter<'Services'> | string;
    description?: StringWithAggregatesFilter<'Services'> | string;
    slug?: StringWithAggregatesFilter<'Services'> | string;
    icon?: StringWithAggregatesFilter<'Services'> | string;
    active?: BoolWithAggregatesFilter<'Services'> | boolean;
    createdAt?: DateTimeWithAggregatesFilter<'Services'> | Date | string;
    updatedAt?: DateTimeWithAggregatesFilter<'Services'> | Date | string;
  };

  export type SubServicesWhereInput = {
    AND?: SubServicesWhereInput | SubServicesWhereInput[];
    OR?: SubServicesWhereInput[];
    NOT?: SubServicesWhereInput | SubServicesWhereInput[];
    id?: IntFilter<'SubServices'> | number;
    idService?: IntFilter<'SubServices'> | number;
    name?: StringFilter<'SubServices'> | string;
    description?: StringFilter<'SubServices'> | string;
    active?: BoolFilter<'SubServices'> | boolean;
    createdAt?: DateTimeFilter<'SubServices'> | Date | string;
    updatedAt?: DateTimeFilter<'SubServices'> | Date | string;
    service?: XOR<ServicesScalarRelationFilter, ServicesWhereInput>;
    proposal?: ProposalListRelationFilter;
  };

  export type SubServicesOrderByWithRelationInput = {
    id?: SortOrder;
    idService?: SortOrder;
    name?: SortOrder;
    description?: SortOrder;
    active?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    service?: ServicesOrderByWithRelationInput;
    proposal?: ProposalOrderByRelationAggregateInput;
  };

  export type SubServicesWhereUniqueInput = Prisma.AtLeast<
    {
      id?: number;
      AND?: SubServicesWhereInput | SubServicesWhereInput[];
      OR?: SubServicesWhereInput[];
      NOT?: SubServicesWhereInput | SubServicesWhereInput[];
      idService?: IntFilter<'SubServices'> | number;
      name?: StringFilter<'SubServices'> | string;
      description?: StringFilter<'SubServices'> | string;
      active?: BoolFilter<'SubServices'> | boolean;
      createdAt?: DateTimeFilter<'SubServices'> | Date | string;
      updatedAt?: DateTimeFilter<'SubServices'> | Date | string;
      service?: XOR<ServicesScalarRelationFilter, ServicesWhereInput>;
      proposal?: ProposalListRelationFilter;
    },
    'id'
  >;

  export type SubServicesOrderByWithAggregationInput = {
    id?: SortOrder;
    idService?: SortOrder;
    name?: SortOrder;
    description?: SortOrder;
    active?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    _count?: SubServicesCountOrderByAggregateInput;
    _avg?: SubServicesAvgOrderByAggregateInput;
    _max?: SubServicesMaxOrderByAggregateInput;
    _min?: SubServicesMinOrderByAggregateInput;
    _sum?: SubServicesSumOrderByAggregateInput;
  };

  export type SubServicesScalarWhereWithAggregatesInput = {
    AND?:
      | SubServicesScalarWhereWithAggregatesInput
      | SubServicesScalarWhereWithAggregatesInput[];
    OR?: SubServicesScalarWhereWithAggregatesInput[];
    NOT?:
      | SubServicesScalarWhereWithAggregatesInput
      | SubServicesScalarWhereWithAggregatesInput[];
    id?: IntWithAggregatesFilter<'SubServices'> | number;
    idService?: IntWithAggregatesFilter<'SubServices'> | number;
    name?: StringWithAggregatesFilter<'SubServices'> | string;
    description?: StringWithAggregatesFilter<'SubServices'> | string;
    active?: BoolWithAggregatesFilter<'SubServices'> | boolean;
    createdAt?: DateTimeWithAggregatesFilter<'SubServices'> | Date | string;
    updatedAt?: DateTimeWithAggregatesFilter<'SubServices'> | Date | string;
  };

  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[];
    OR?: UserWhereInput[];
    NOT?: UserWhereInput | UserWhereInput[];
    id?: StringFilter<'User'> | string;
    name?: StringFilter<'User'> | string;
    email?: StringFilter<'User'> | string;
    phone?: StringNullableFilter<'User'> | string | null;
    emailVerified?: BoolFilter<'User'> | boolean;
    image?: StringNullableFilter<'User'> | string | null;
    createdAt?: DateTimeFilter<'User'> | Date | string;
    updatedAt?: DateTimeFilter<'User'> | Date | string;
    sessions?: SessionListRelationFilter;
    accounts?: AccountListRelationFilter;
    proposal?: ProposalListRelationFilter;
    budget?: BudgetListRelationFilter;
  };

  export type UserOrderByWithRelationInput = {
    id?: SortOrder;
    name?: SortOrder;
    email?: SortOrder;
    phone?: SortOrderInput | SortOrder;
    emailVerified?: SortOrder;
    image?: SortOrderInput | SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    sessions?: SessionOrderByRelationAggregateInput;
    accounts?: AccountOrderByRelationAggregateInput;
    proposal?: ProposalOrderByRelationAggregateInput;
    budget?: BudgetOrderByRelationAggregateInput;
  };

  export type UserWhereUniqueInput = Prisma.AtLeast<
    {
      id?: string;
      email?: string;
      AND?: UserWhereInput | UserWhereInput[];
      OR?: UserWhereInput[];
      NOT?: UserWhereInput | UserWhereInput[];
      name?: StringFilter<'User'> | string;
      phone?: StringNullableFilter<'User'> | string | null;
      emailVerified?: BoolFilter<'User'> | boolean;
      image?: StringNullableFilter<'User'> | string | null;
      createdAt?: DateTimeFilter<'User'> | Date | string;
      updatedAt?: DateTimeFilter<'User'> | Date | string;
      sessions?: SessionListRelationFilter;
      accounts?: AccountListRelationFilter;
      proposal?: ProposalListRelationFilter;
      budget?: BudgetListRelationFilter;
    },
    'id' | 'email'
  >;

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder;
    name?: SortOrder;
    email?: SortOrder;
    phone?: SortOrderInput | SortOrder;
    emailVerified?: SortOrder;
    image?: SortOrderInput | SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    _count?: UserCountOrderByAggregateInput;
    _max?: UserMaxOrderByAggregateInput;
    _min?: UserMinOrderByAggregateInput;
  };

  export type UserScalarWhereWithAggregatesInput = {
    AND?:
      | UserScalarWhereWithAggregatesInput
      | UserScalarWhereWithAggregatesInput[];
    OR?: UserScalarWhereWithAggregatesInput[];
    NOT?:
      | UserScalarWhereWithAggregatesInput
      | UserScalarWhereWithAggregatesInput[];
    id?: StringWithAggregatesFilter<'User'> | string;
    name?: StringWithAggregatesFilter<'User'> | string;
    email?: StringWithAggregatesFilter<'User'> | string;
    phone?: StringNullableWithAggregatesFilter<'User'> | string | null;
    emailVerified?: BoolWithAggregatesFilter<'User'> | boolean;
    image?: StringNullableWithAggregatesFilter<'User'> | string | null;
    createdAt?: DateTimeWithAggregatesFilter<'User'> | Date | string;
    updatedAt?: DateTimeWithAggregatesFilter<'User'> | Date | string;
  };

  export type SessionWhereInput = {
    AND?: SessionWhereInput | SessionWhereInput[];
    OR?: SessionWhereInput[];
    NOT?: SessionWhereInput | SessionWhereInput[];
    id?: StringFilter<'Session'> | string;
    expiresAt?: DateTimeFilter<'Session'> | Date | string;
    token?: StringFilter<'Session'> | string;
    ipAddress?: StringNullableFilter<'Session'> | string | null;
    userAgent?: StringNullableFilter<'Session'> | string | null;
    userId?: StringFilter<'Session'> | string;
    createdAt?: DateTimeFilter<'Session'> | Date | string;
    updatedAt?: DateTimeFilter<'Session'> | Date | string;
    user?: XOR<UserScalarRelationFilter, UserWhereInput>;
  };

  export type SessionOrderByWithRelationInput = {
    id?: SortOrder;
    expiresAt?: SortOrder;
    token?: SortOrder;
    ipAddress?: SortOrderInput | SortOrder;
    userAgent?: SortOrderInput | SortOrder;
    userId?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    user?: UserOrderByWithRelationInput;
  };

  export type SessionWhereUniqueInput = Prisma.AtLeast<
    {
      id?: string;
      token?: string;
      AND?: SessionWhereInput | SessionWhereInput[];
      OR?: SessionWhereInput[];
      NOT?: SessionWhereInput | SessionWhereInput[];
      expiresAt?: DateTimeFilter<'Session'> | Date | string;
      ipAddress?: StringNullableFilter<'Session'> | string | null;
      userAgent?: StringNullableFilter<'Session'> | string | null;
      userId?: StringFilter<'Session'> | string;
      createdAt?: DateTimeFilter<'Session'> | Date | string;
      updatedAt?: DateTimeFilter<'Session'> | Date | string;
      user?: XOR<UserScalarRelationFilter, UserWhereInput>;
    },
    'id' | 'token'
  >;

  export type SessionOrderByWithAggregationInput = {
    id?: SortOrder;
    expiresAt?: SortOrder;
    token?: SortOrder;
    ipAddress?: SortOrderInput | SortOrder;
    userAgent?: SortOrderInput | SortOrder;
    userId?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    _count?: SessionCountOrderByAggregateInput;
    _max?: SessionMaxOrderByAggregateInput;
    _min?: SessionMinOrderByAggregateInput;
  };

  export type SessionScalarWhereWithAggregatesInput = {
    AND?:
      | SessionScalarWhereWithAggregatesInput
      | SessionScalarWhereWithAggregatesInput[];
    OR?: SessionScalarWhereWithAggregatesInput[];
    NOT?:
      | SessionScalarWhereWithAggregatesInput
      | SessionScalarWhereWithAggregatesInput[];
    id?: StringWithAggregatesFilter<'Session'> | string;
    expiresAt?: DateTimeWithAggregatesFilter<'Session'> | Date | string;
    token?: StringWithAggregatesFilter<'Session'> | string;
    ipAddress?: StringNullableWithAggregatesFilter<'Session'> | string | null;
    userAgent?: StringNullableWithAggregatesFilter<'Session'> | string | null;
    userId?: StringWithAggregatesFilter<'Session'> | string;
    createdAt?: DateTimeWithAggregatesFilter<'Session'> | Date | string;
    updatedAt?: DateTimeWithAggregatesFilter<'Session'> | Date | string;
  };

  export type AccountWhereInput = {
    AND?: AccountWhereInput | AccountWhereInput[];
    OR?: AccountWhereInput[];
    NOT?: AccountWhereInput | AccountWhereInput[];
    id?: StringFilter<'Account'> | string;
    accountId?: StringFilter<'Account'> | string;
    providerId?: StringFilter<'Account'> | string;
    userId?: StringFilter<'Account'> | string;
    accessToken?: StringNullableFilter<'Account'> | string | null;
    refreshToken?: StringNullableFilter<'Account'> | string | null;
    idToken?: StringNullableFilter<'Account'> | string | null;
    accessTokenExpiresAt?:
      | DateTimeNullableFilter<'Account'>
      | Date
      | string
      | null;
    refreshTokenExpiresAt?:
      | DateTimeNullableFilter<'Account'>
      | Date
      | string
      | null;
    scope?: StringNullableFilter<'Account'> | string | null;
    password?: StringNullableFilter<'Account'> | string | null;
    createdAt?: DateTimeFilter<'Account'> | Date | string;
    updatedAt?: DateTimeFilter<'Account'> | Date | string;
    user?: XOR<UserScalarRelationFilter, UserWhereInput>;
  };

  export type AccountOrderByWithRelationInput = {
    id?: SortOrder;
    accountId?: SortOrder;
    providerId?: SortOrder;
    userId?: SortOrder;
    accessToken?: SortOrderInput | SortOrder;
    refreshToken?: SortOrderInput | SortOrder;
    idToken?: SortOrderInput | SortOrder;
    accessTokenExpiresAt?: SortOrderInput | SortOrder;
    refreshTokenExpiresAt?: SortOrderInput | SortOrder;
    scope?: SortOrderInput | SortOrder;
    password?: SortOrderInput | SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    user?: UserOrderByWithRelationInput;
  };

  export type AccountWhereUniqueInput = Prisma.AtLeast<
    {
      id?: string;
      AND?: AccountWhereInput | AccountWhereInput[];
      OR?: AccountWhereInput[];
      NOT?: AccountWhereInput | AccountWhereInput[];
      accountId?: StringFilter<'Account'> | string;
      providerId?: StringFilter<'Account'> | string;
      userId?: StringFilter<'Account'> | string;
      accessToken?: StringNullableFilter<'Account'> | string | null;
      refreshToken?: StringNullableFilter<'Account'> | string | null;
      idToken?: StringNullableFilter<'Account'> | string | null;
      accessTokenExpiresAt?:
        | DateTimeNullableFilter<'Account'>
        | Date
        | string
        | null;
      refreshTokenExpiresAt?:
        | DateTimeNullableFilter<'Account'>
        | Date
        | string
        | null;
      scope?: StringNullableFilter<'Account'> | string | null;
      password?: StringNullableFilter<'Account'> | string | null;
      createdAt?: DateTimeFilter<'Account'> | Date | string;
      updatedAt?: DateTimeFilter<'Account'> | Date | string;
      user?: XOR<UserScalarRelationFilter, UserWhereInput>;
    },
    'id'
  >;

  export type AccountOrderByWithAggregationInput = {
    id?: SortOrder;
    accountId?: SortOrder;
    providerId?: SortOrder;
    userId?: SortOrder;
    accessToken?: SortOrderInput | SortOrder;
    refreshToken?: SortOrderInput | SortOrder;
    idToken?: SortOrderInput | SortOrder;
    accessTokenExpiresAt?: SortOrderInput | SortOrder;
    refreshTokenExpiresAt?: SortOrderInput | SortOrder;
    scope?: SortOrderInput | SortOrder;
    password?: SortOrderInput | SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    _count?: AccountCountOrderByAggregateInput;
    _max?: AccountMaxOrderByAggregateInput;
    _min?: AccountMinOrderByAggregateInput;
  };

  export type AccountScalarWhereWithAggregatesInput = {
    AND?:
      | AccountScalarWhereWithAggregatesInput
      | AccountScalarWhereWithAggregatesInput[];
    OR?: AccountScalarWhereWithAggregatesInput[];
    NOT?:
      | AccountScalarWhereWithAggregatesInput
      | AccountScalarWhereWithAggregatesInput[];
    id?: StringWithAggregatesFilter<'Account'> | string;
    accountId?: StringWithAggregatesFilter<'Account'> | string;
    providerId?: StringWithAggregatesFilter<'Account'> | string;
    userId?: StringWithAggregatesFilter<'Account'> | string;
    accessToken?: StringNullableWithAggregatesFilter<'Account'> | string | null;
    refreshToken?:
      | StringNullableWithAggregatesFilter<'Account'>
      | string
      | null;
    idToken?: StringNullableWithAggregatesFilter<'Account'> | string | null;
    accessTokenExpiresAt?:
      | DateTimeNullableWithAggregatesFilter<'Account'>
      | Date
      | string
      | null;
    refreshTokenExpiresAt?:
      | DateTimeNullableWithAggregatesFilter<'Account'>
      | Date
      | string
      | null;
    scope?: StringNullableWithAggregatesFilter<'Account'> | string | null;
    password?: StringNullableWithAggregatesFilter<'Account'> | string | null;
    createdAt?: DateTimeWithAggregatesFilter<'Account'> | Date | string;
    updatedAt?: DateTimeWithAggregatesFilter<'Account'> | Date | string;
  };

  export type VerificationWhereInput = {
    AND?: VerificationWhereInput | VerificationWhereInput[];
    OR?: VerificationWhereInput[];
    NOT?: VerificationWhereInput | VerificationWhereInput[];
    id?: StringFilter<'Verification'> | string;
    identifier?: StringFilter<'Verification'> | string;
    value?: StringFilter<'Verification'> | string;
    expiresAt?: DateTimeFilter<'Verification'> | Date | string;
    createdAt?: DateTimeNullableFilter<'Verification'> | Date | string | null;
    updatedAt?: DateTimeNullableFilter<'Verification'> | Date | string | null;
  };

  export type VerificationOrderByWithRelationInput = {
    id?: SortOrder;
    identifier?: SortOrder;
    value?: SortOrder;
    expiresAt?: SortOrder;
    createdAt?: SortOrderInput | SortOrder;
    updatedAt?: SortOrderInput | SortOrder;
  };

  export type VerificationWhereUniqueInput = Prisma.AtLeast<
    {
      id?: string;
      AND?: VerificationWhereInput | VerificationWhereInput[];
      OR?: VerificationWhereInput[];
      NOT?: VerificationWhereInput | VerificationWhereInput[];
      identifier?: StringFilter<'Verification'> | string;
      value?: StringFilter<'Verification'> | string;
      expiresAt?: DateTimeFilter<'Verification'> | Date | string;
      createdAt?: DateTimeNullableFilter<'Verification'> | Date | string | null;
      updatedAt?: DateTimeNullableFilter<'Verification'> | Date | string | null;
    },
    'id'
  >;

  export type VerificationOrderByWithAggregationInput = {
    id?: SortOrder;
    identifier?: SortOrder;
    value?: SortOrder;
    expiresAt?: SortOrder;
    createdAt?: SortOrderInput | SortOrder;
    updatedAt?: SortOrderInput | SortOrder;
    _count?: VerificationCountOrderByAggregateInput;
    _max?: VerificationMaxOrderByAggregateInput;
    _min?: VerificationMinOrderByAggregateInput;
  };

  export type VerificationScalarWhereWithAggregatesInput = {
    AND?:
      | VerificationScalarWhereWithAggregatesInput
      | VerificationScalarWhereWithAggregatesInput[];
    OR?: VerificationScalarWhereWithAggregatesInput[];
    NOT?:
      | VerificationScalarWhereWithAggregatesInput
      | VerificationScalarWhereWithAggregatesInput[];
    id?: StringWithAggregatesFilter<'Verification'> | string;
    identifier?: StringWithAggregatesFilter<'Verification'> | string;
    value?: StringWithAggregatesFilter<'Verification'> | string;
    expiresAt?: DateTimeWithAggregatesFilter<'Verification'> | Date | string;
    createdAt?:
      | DateTimeNullableWithAggregatesFilter<'Verification'>
      | Date
      | string
      | null;
    updatedAt?:
      | DateTimeNullableWithAggregatesFilter<'Verification'>
      | Date
      | string
      | null;
  };

  export type BudgetCreateInput = {
    details: string;
    budget: Decimal | DecimalJsLike | number | string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    user: UserCreateNestedOneWithoutBudgetInput;
    proposal: ProposalCreateNestedOneWithoutBudgetInput;
  };

  export type BudgetUncheckedCreateInput = {
    id?: number;
    userId: string;
    proposalId: number;
    details: string;
    budget: Decimal | DecimalJsLike | number | string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type BudgetUpdateInput = {
    details?: StringFieldUpdateOperationsInput | string;
    budget?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    user?: UserUpdateOneRequiredWithoutBudgetNestedInput;
    proposal?: ProposalUpdateOneRequiredWithoutBudgetNestedInput;
  };

  export type BudgetUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number;
    userId?: StringFieldUpdateOperationsInput | string;
    proposalId?: IntFieldUpdateOperationsInput | number;
    details?: StringFieldUpdateOperationsInput | string;
    budget?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type BudgetCreateManyInput = {
    id?: number;
    userId: string;
    proposalId: number;
    details: string;
    budget: Decimal | DecimalJsLike | number | string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type BudgetUpdateManyMutationInput = {
    details?: StringFieldUpdateOperationsInput | string;
    budget?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type BudgetUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number;
    userId?: StringFieldUpdateOperationsInput | string;
    proposalId?: IntFieldUpdateOperationsInput | number;
    details?: StringFieldUpdateOperationsInput | string;
    budget?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type ProposalCreateInput = {
    type?: $Enums.ProposalHome;
    commune: number;
    address: string;
    serviceDate: Date | string;
    description: string;
    active?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    user: UserCreateNestedOneWithoutProposalInput;
    subServices: SubServicesCreateNestedOneWithoutProposalInput;
    budget?: BudgetCreateNestedManyWithoutProposalInput;
  };

  export type ProposalUncheckedCreateInput = {
    id?: number;
    userId: string;
    serviceId: number;
    type?: $Enums.ProposalHome;
    commune: number;
    address: string;
    serviceDate: Date | string;
    description: string;
    active?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    budget?: BudgetUncheckedCreateNestedManyWithoutProposalInput;
  };

  export type ProposalUpdateInput = {
    type?: EnumProposalHomeFieldUpdateOperationsInput | $Enums.ProposalHome;
    commune?: IntFieldUpdateOperationsInput | number;
    address?: StringFieldUpdateOperationsInput | string;
    serviceDate?: DateTimeFieldUpdateOperationsInput | Date | string;
    description?: StringFieldUpdateOperationsInput | string;
    active?: BoolFieldUpdateOperationsInput | boolean;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    user?: UserUpdateOneRequiredWithoutProposalNestedInput;
    subServices?: SubServicesUpdateOneRequiredWithoutProposalNestedInput;
    budget?: BudgetUpdateManyWithoutProposalNestedInput;
  };

  export type ProposalUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number;
    userId?: StringFieldUpdateOperationsInput | string;
    serviceId?: IntFieldUpdateOperationsInput | number;
    type?: EnumProposalHomeFieldUpdateOperationsInput | $Enums.ProposalHome;
    commune?: IntFieldUpdateOperationsInput | number;
    address?: StringFieldUpdateOperationsInput | string;
    serviceDate?: DateTimeFieldUpdateOperationsInput | Date | string;
    description?: StringFieldUpdateOperationsInput | string;
    active?: BoolFieldUpdateOperationsInput | boolean;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    budget?: BudgetUncheckedUpdateManyWithoutProposalNestedInput;
  };

  export type ProposalCreateManyInput = {
    id?: number;
    userId: string;
    serviceId: number;
    type?: $Enums.ProposalHome;
    commune: number;
    address: string;
    serviceDate: Date | string;
    description: string;
    active?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type ProposalUpdateManyMutationInput = {
    type?: EnumProposalHomeFieldUpdateOperationsInput | $Enums.ProposalHome;
    commune?: IntFieldUpdateOperationsInput | number;
    address?: StringFieldUpdateOperationsInput | string;
    serviceDate?: DateTimeFieldUpdateOperationsInput | Date | string;
    description?: StringFieldUpdateOperationsInput | string;
    active?: BoolFieldUpdateOperationsInput | boolean;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type ProposalUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number;
    userId?: StringFieldUpdateOperationsInput | string;
    serviceId?: IntFieldUpdateOperationsInput | number;
    type?: EnumProposalHomeFieldUpdateOperationsInput | $Enums.ProposalHome;
    commune?: IntFieldUpdateOperationsInput | number;
    address?: StringFieldUpdateOperationsInput | string;
    serviceDate?: DateTimeFieldUpdateOperationsInput | Date | string;
    description?: StringFieldUpdateOperationsInput | string;
    active?: BoolFieldUpdateOperationsInput | boolean;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type ServicesCreateInput = {
    name: string;
    description: string;
    slug: string;
    icon: string;
    active?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    subServices?: SubServicesCreateNestedManyWithoutServiceInput;
  };

  export type ServicesUncheckedCreateInput = {
    id?: number;
    name: string;
    description: string;
    slug: string;
    icon: string;
    active?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    subServices?: SubServicesUncheckedCreateNestedManyWithoutServiceInput;
  };

  export type ServicesUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string;
    description?: StringFieldUpdateOperationsInput | string;
    slug?: StringFieldUpdateOperationsInput | string;
    icon?: StringFieldUpdateOperationsInput | string;
    active?: BoolFieldUpdateOperationsInput | boolean;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    subServices?: SubServicesUpdateManyWithoutServiceNestedInput;
  };

  export type ServicesUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number;
    name?: StringFieldUpdateOperationsInput | string;
    description?: StringFieldUpdateOperationsInput | string;
    slug?: StringFieldUpdateOperationsInput | string;
    icon?: StringFieldUpdateOperationsInput | string;
    active?: BoolFieldUpdateOperationsInput | boolean;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    subServices?: SubServicesUncheckedUpdateManyWithoutServiceNestedInput;
  };

  export type ServicesCreateManyInput = {
    id?: number;
    name: string;
    description: string;
    slug: string;
    icon: string;
    active?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type ServicesUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string;
    description?: StringFieldUpdateOperationsInput | string;
    slug?: StringFieldUpdateOperationsInput | string;
    icon?: StringFieldUpdateOperationsInput | string;
    active?: BoolFieldUpdateOperationsInput | boolean;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type ServicesUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number;
    name?: StringFieldUpdateOperationsInput | string;
    description?: StringFieldUpdateOperationsInput | string;
    slug?: StringFieldUpdateOperationsInput | string;
    icon?: StringFieldUpdateOperationsInput | string;
    active?: BoolFieldUpdateOperationsInput | boolean;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type SubServicesCreateInput = {
    name: string;
    description: string;
    active?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    service: ServicesCreateNestedOneWithoutSubServicesInput;
    proposal?: ProposalCreateNestedManyWithoutSubServicesInput;
  };

  export type SubServicesUncheckedCreateInput = {
    id?: number;
    idService: number;
    name: string;
    description: string;
    active?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    proposal?: ProposalUncheckedCreateNestedManyWithoutSubServicesInput;
  };

  export type SubServicesUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string;
    description?: StringFieldUpdateOperationsInput | string;
    active?: BoolFieldUpdateOperationsInput | boolean;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    service?: ServicesUpdateOneRequiredWithoutSubServicesNestedInput;
    proposal?: ProposalUpdateManyWithoutSubServicesNestedInput;
  };

  export type SubServicesUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number;
    idService?: IntFieldUpdateOperationsInput | number;
    name?: StringFieldUpdateOperationsInput | string;
    description?: StringFieldUpdateOperationsInput | string;
    active?: BoolFieldUpdateOperationsInput | boolean;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    proposal?: ProposalUncheckedUpdateManyWithoutSubServicesNestedInput;
  };

  export type SubServicesCreateManyInput = {
    id?: number;
    idService: number;
    name: string;
    description: string;
    active?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type SubServicesUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string;
    description?: StringFieldUpdateOperationsInput | string;
    active?: BoolFieldUpdateOperationsInput | boolean;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type SubServicesUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number;
    idService?: IntFieldUpdateOperationsInput | number;
    name?: StringFieldUpdateOperationsInput | string;
    description?: StringFieldUpdateOperationsInput | string;
    active?: BoolFieldUpdateOperationsInput | boolean;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type UserCreateInput = {
    id: string;
    name: string;
    email: string;
    phone?: string | null;
    emailVerified: boolean;
    image?: string | null;
    createdAt: Date | string;
    updatedAt: Date | string;
    sessions?: SessionCreateNestedManyWithoutUserInput;
    accounts?: AccountCreateNestedManyWithoutUserInput;
    proposal?: ProposalCreateNestedManyWithoutUserInput;
    budget?: BudgetCreateNestedManyWithoutUserInput;
  };

  export type UserUncheckedCreateInput = {
    id: string;
    name: string;
    email: string;
    phone?: string | null;
    emailVerified: boolean;
    image?: string | null;
    createdAt: Date | string;
    updatedAt: Date | string;
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput;
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput;
    proposal?: ProposalUncheckedCreateNestedManyWithoutUserInput;
    budget?: BudgetUncheckedCreateNestedManyWithoutUserInput;
  };

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    phone?: NullableStringFieldUpdateOperationsInput | string | null;
    emailVerified?: BoolFieldUpdateOperationsInput | boolean;
    image?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    sessions?: SessionUpdateManyWithoutUserNestedInput;
    accounts?: AccountUpdateManyWithoutUserNestedInput;
    proposal?: ProposalUpdateManyWithoutUserNestedInput;
    budget?: BudgetUpdateManyWithoutUserNestedInput;
  };

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    phone?: NullableStringFieldUpdateOperationsInput | string | null;
    emailVerified?: BoolFieldUpdateOperationsInput | boolean;
    image?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput;
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput;
    proposal?: ProposalUncheckedUpdateManyWithoutUserNestedInput;
    budget?: BudgetUncheckedUpdateManyWithoutUserNestedInput;
  };

  export type UserCreateManyInput = {
    id: string;
    name: string;
    email: string;
    phone?: string | null;
    emailVerified: boolean;
    image?: string | null;
    createdAt: Date | string;
    updatedAt: Date | string;
  };

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    phone?: NullableStringFieldUpdateOperationsInput | string | null;
    emailVerified?: BoolFieldUpdateOperationsInput | boolean;
    image?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    phone?: NullableStringFieldUpdateOperationsInput | string | null;
    emailVerified?: BoolFieldUpdateOperationsInput | boolean;
    image?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type SessionCreateInput = {
    id: string;
    expiresAt: Date | string;
    token: string;
    ipAddress?: string | null;
    userAgent?: string | null;
    createdAt: Date | string;
    updatedAt: Date | string;
    user: UserCreateNestedOneWithoutSessionsInput;
  };

  export type SessionUncheckedCreateInput = {
    id: string;
    expiresAt: Date | string;
    token: string;
    ipAddress?: string | null;
    userAgent?: string | null;
    userId: string;
    createdAt: Date | string;
    updatedAt: Date | string;
  };

  export type SessionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    token?: StringFieldUpdateOperationsInput | string;
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null;
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    user?: UserUpdateOneRequiredWithoutSessionsNestedInput;
  };

  export type SessionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    token?: StringFieldUpdateOperationsInput | string;
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null;
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null;
    userId?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type SessionCreateManyInput = {
    id: string;
    expiresAt: Date | string;
    token: string;
    ipAddress?: string | null;
    userAgent?: string | null;
    userId: string;
    createdAt: Date | string;
    updatedAt: Date | string;
  };

  export type SessionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string;
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    token?: StringFieldUpdateOperationsInput | string;
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null;
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type SessionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string;
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    token?: StringFieldUpdateOperationsInput | string;
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null;
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null;
    userId?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type AccountCreateInput = {
    id: string;
    accountId: string;
    providerId: string;
    accessToken?: string | null;
    refreshToken?: string | null;
    idToken?: string | null;
    accessTokenExpiresAt?: Date | string | null;
    refreshTokenExpiresAt?: Date | string | null;
    scope?: string | null;
    password?: string | null;
    createdAt: Date | string;
    updatedAt: Date | string;
    user: UserCreateNestedOneWithoutAccountsInput;
  };

  export type AccountUncheckedCreateInput = {
    id: string;
    accountId: string;
    providerId: string;
    userId: string;
    accessToken?: string | null;
    refreshToken?: string | null;
    idToken?: string | null;
    accessTokenExpiresAt?: Date | string | null;
    refreshTokenExpiresAt?: Date | string | null;
    scope?: string | null;
    password?: string | null;
    createdAt: Date | string;
    updatedAt: Date | string;
  };

  export type AccountUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    accountId?: StringFieldUpdateOperationsInput | string;
    providerId?: StringFieldUpdateOperationsInput | string;
    accessToken?: NullableStringFieldUpdateOperationsInput | string | null;
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null;
    idToken?: NullableStringFieldUpdateOperationsInput | string | null;
    accessTokenExpiresAt?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
    refreshTokenExpiresAt?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
    scope?: NullableStringFieldUpdateOperationsInput | string | null;
    password?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    user?: UserUpdateOneRequiredWithoutAccountsNestedInput;
  };

  export type AccountUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    accountId?: StringFieldUpdateOperationsInput | string;
    providerId?: StringFieldUpdateOperationsInput | string;
    userId?: StringFieldUpdateOperationsInput | string;
    accessToken?: NullableStringFieldUpdateOperationsInput | string | null;
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null;
    idToken?: NullableStringFieldUpdateOperationsInput | string | null;
    accessTokenExpiresAt?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
    refreshTokenExpiresAt?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
    scope?: NullableStringFieldUpdateOperationsInput | string | null;
    password?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type AccountCreateManyInput = {
    id: string;
    accountId: string;
    providerId: string;
    userId: string;
    accessToken?: string | null;
    refreshToken?: string | null;
    idToken?: string | null;
    accessTokenExpiresAt?: Date | string | null;
    refreshTokenExpiresAt?: Date | string | null;
    scope?: string | null;
    password?: string | null;
    createdAt: Date | string;
    updatedAt: Date | string;
  };

  export type AccountUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string;
    accountId?: StringFieldUpdateOperationsInput | string;
    providerId?: StringFieldUpdateOperationsInput | string;
    accessToken?: NullableStringFieldUpdateOperationsInput | string | null;
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null;
    idToken?: NullableStringFieldUpdateOperationsInput | string | null;
    accessTokenExpiresAt?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
    refreshTokenExpiresAt?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
    scope?: NullableStringFieldUpdateOperationsInput | string | null;
    password?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type AccountUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string;
    accountId?: StringFieldUpdateOperationsInput | string;
    providerId?: StringFieldUpdateOperationsInput | string;
    userId?: StringFieldUpdateOperationsInput | string;
    accessToken?: NullableStringFieldUpdateOperationsInput | string | null;
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null;
    idToken?: NullableStringFieldUpdateOperationsInput | string | null;
    accessTokenExpiresAt?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
    refreshTokenExpiresAt?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
    scope?: NullableStringFieldUpdateOperationsInput | string | null;
    password?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type VerificationCreateInput = {
    id: string;
    identifier: string;
    value: string;
    expiresAt: Date | string;
    createdAt?: Date | string | null;
    updatedAt?: Date | string | null;
  };

  export type VerificationUncheckedCreateInput = {
    id: string;
    identifier: string;
    value: string;
    expiresAt: Date | string;
    createdAt?: Date | string | null;
    updatedAt?: Date | string | null;
  };

  export type VerificationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    identifier?: StringFieldUpdateOperationsInput | string;
    value?: StringFieldUpdateOperationsInput | string;
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
    updatedAt?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
  };

  export type VerificationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    identifier?: StringFieldUpdateOperationsInput | string;
    value?: StringFieldUpdateOperationsInput | string;
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
    updatedAt?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
  };

  export type VerificationCreateManyInput = {
    id: string;
    identifier: string;
    value: string;
    expiresAt: Date | string;
    createdAt?: Date | string | null;
    updatedAt?: Date | string | null;
  };

  export type VerificationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string;
    identifier?: StringFieldUpdateOperationsInput | string;
    value?: StringFieldUpdateOperationsInput | string;
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
    updatedAt?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
  };

  export type VerificationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string;
    identifier?: StringFieldUpdateOperationsInput | string;
    value?: StringFieldUpdateOperationsInput | string;
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
    updatedAt?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
  };

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>;
    in?: number[] | ListIntFieldRefInput<$PrismaModel>;
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>;
    lt?: number | IntFieldRefInput<$PrismaModel>;
    lte?: number | IntFieldRefInput<$PrismaModel>;
    gt?: number | IntFieldRefInput<$PrismaModel>;
    gte?: number | IntFieldRefInput<$PrismaModel>;
    not?: NestedIntFilter<$PrismaModel> | number;
  };

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>;
    in?: string[] | ListStringFieldRefInput<$PrismaModel>;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    mode?: QueryMode;
    not?: NestedStringFilter<$PrismaModel> | string;
  };

  export type DecimalFilter<$PrismaModel = never> = {
    equals?:
      | Decimal
      | DecimalJsLike
      | number
      | string
      | DecimalFieldRefInput<$PrismaModel>;
    in?:
      | Decimal[]
      | DecimalJsLike[]
      | number[]
      | string[]
      | ListDecimalFieldRefInput<$PrismaModel>;
    notIn?:
      | Decimal[]
      | DecimalJsLike[]
      | number[]
      | string[]
      | ListDecimalFieldRefInput<$PrismaModel>;
    lt?:
      | Decimal
      | DecimalJsLike
      | number
      | string
      | DecimalFieldRefInput<$PrismaModel>;
    lte?:
      | Decimal
      | DecimalJsLike
      | number
      | string
      | DecimalFieldRefInput<$PrismaModel>;
    gt?:
      | Decimal
      | DecimalJsLike
      | number
      | string
      | DecimalFieldRefInput<$PrismaModel>;
    gte?:
      | Decimal
      | DecimalJsLike
      | number
      | string
      | DecimalFieldRefInput<$PrismaModel>;
    not?:
      | NestedDecimalFilter<$PrismaModel>
      | Decimal
      | DecimalJsLike
      | number
      | string;
  };

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string;
  };

  export type UserScalarRelationFilter = {
    is?: UserWhereInput;
    isNot?: UserWhereInput;
  };

  export type ProposalScalarRelationFilter = {
    is?: ProposalWhereInput;
    isNot?: ProposalWhereInput;
  };

  export type BudgetCountOrderByAggregateInput = {
    id?: SortOrder;
    userId?: SortOrder;
    proposalId?: SortOrder;
    details?: SortOrder;
    budget?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type BudgetAvgOrderByAggregateInput = {
    id?: SortOrder;
    proposalId?: SortOrder;
    budget?: SortOrder;
  };

  export type BudgetMaxOrderByAggregateInput = {
    id?: SortOrder;
    userId?: SortOrder;
    proposalId?: SortOrder;
    details?: SortOrder;
    budget?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type BudgetMinOrderByAggregateInput = {
    id?: SortOrder;
    userId?: SortOrder;
    proposalId?: SortOrder;
    details?: SortOrder;
    budget?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type BudgetSumOrderByAggregateInput = {
    id?: SortOrder;
    proposalId?: SortOrder;
    budget?: SortOrder;
  };

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>;
    in?: number[] | ListIntFieldRefInput<$PrismaModel>;
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>;
    lt?: number | IntFieldRefInput<$PrismaModel>;
    lte?: number | IntFieldRefInput<$PrismaModel>;
    gt?: number | IntFieldRefInput<$PrismaModel>;
    gte?: number | IntFieldRefInput<$PrismaModel>;
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number;
    _count?: NestedIntFilter<$PrismaModel>;
    _avg?: NestedFloatFilter<$PrismaModel>;
    _sum?: NestedIntFilter<$PrismaModel>;
    _min?: NestedIntFilter<$PrismaModel>;
    _max?: NestedIntFilter<$PrismaModel>;
  };

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>;
    in?: string[] | ListStringFieldRefInput<$PrismaModel>;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    mode?: QueryMode;
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedStringFilter<$PrismaModel>;
    _max?: NestedStringFilter<$PrismaModel>;
  };

  export type DecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?:
      | Decimal
      | DecimalJsLike
      | number
      | string
      | DecimalFieldRefInput<$PrismaModel>;
    in?:
      | Decimal[]
      | DecimalJsLike[]
      | number[]
      | string[]
      | ListDecimalFieldRefInput<$PrismaModel>;
    notIn?:
      | Decimal[]
      | DecimalJsLike[]
      | number[]
      | string[]
      | ListDecimalFieldRefInput<$PrismaModel>;
    lt?:
      | Decimal
      | DecimalJsLike
      | number
      | string
      | DecimalFieldRefInput<$PrismaModel>;
    lte?:
      | Decimal
      | DecimalJsLike
      | number
      | string
      | DecimalFieldRefInput<$PrismaModel>;
    gt?:
      | Decimal
      | DecimalJsLike
      | number
      | string
      | DecimalFieldRefInput<$PrismaModel>;
    gte?:
      | Decimal
      | DecimalJsLike
      | number
      | string
      | DecimalFieldRefInput<$PrismaModel>;
    not?:
      | NestedDecimalWithAggregatesFilter<$PrismaModel>
      | Decimal
      | DecimalJsLike
      | number
      | string;
    _count?: NestedIntFilter<$PrismaModel>;
    _avg?: NestedDecimalFilter<$PrismaModel>;
    _sum?: NestedDecimalFilter<$PrismaModel>;
    _min?: NestedDecimalFilter<$PrismaModel>;
    _max?: NestedDecimalFilter<$PrismaModel>;
  };

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedDateTimeFilter<$PrismaModel>;
    _max?: NestedDateTimeFilter<$PrismaModel>;
  };

  export type EnumProposalHomeFilter<$PrismaModel = never> = {
    equals?: $Enums.ProposalHome | EnumProposalHomeFieldRefInput<$PrismaModel>;
    in?:
      | $Enums.ProposalHome[]
      | ListEnumProposalHomeFieldRefInput<$PrismaModel>;
    notIn?:
      | $Enums.ProposalHome[]
      | ListEnumProposalHomeFieldRefInput<$PrismaModel>;
    not?: NestedEnumProposalHomeFilter<$PrismaModel> | $Enums.ProposalHome;
  };

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>;
    not?: NestedBoolFilter<$PrismaModel> | boolean;
  };

  export type SubServicesScalarRelationFilter = {
    is?: SubServicesWhereInput;
    isNot?: SubServicesWhereInput;
  };

  export type BudgetListRelationFilter = {
    every?: BudgetWhereInput;
    some?: BudgetWhereInput;
    none?: BudgetWhereInput;
  };

  export type BudgetOrderByRelationAggregateInput = {
    _count?: SortOrder;
  };

  export type ProposalCountOrderByAggregateInput = {
    id?: SortOrder;
    userId?: SortOrder;
    serviceId?: SortOrder;
    type?: SortOrder;
    commune?: SortOrder;
    address?: SortOrder;
    serviceDate?: SortOrder;
    description?: SortOrder;
    active?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type ProposalAvgOrderByAggregateInput = {
    id?: SortOrder;
    serviceId?: SortOrder;
    commune?: SortOrder;
  };

  export type ProposalMaxOrderByAggregateInput = {
    id?: SortOrder;
    userId?: SortOrder;
    serviceId?: SortOrder;
    type?: SortOrder;
    commune?: SortOrder;
    address?: SortOrder;
    serviceDate?: SortOrder;
    description?: SortOrder;
    active?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type ProposalMinOrderByAggregateInput = {
    id?: SortOrder;
    userId?: SortOrder;
    serviceId?: SortOrder;
    type?: SortOrder;
    commune?: SortOrder;
    address?: SortOrder;
    serviceDate?: SortOrder;
    description?: SortOrder;
    active?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type ProposalSumOrderByAggregateInput = {
    id?: SortOrder;
    serviceId?: SortOrder;
    commune?: SortOrder;
  };

  export type EnumProposalHomeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ProposalHome | EnumProposalHomeFieldRefInput<$PrismaModel>;
    in?:
      | $Enums.ProposalHome[]
      | ListEnumProposalHomeFieldRefInput<$PrismaModel>;
    notIn?:
      | $Enums.ProposalHome[]
      | ListEnumProposalHomeFieldRefInput<$PrismaModel>;
    not?:
      | NestedEnumProposalHomeWithAggregatesFilter<$PrismaModel>
      | $Enums.ProposalHome;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedEnumProposalHomeFilter<$PrismaModel>;
    _max?: NestedEnumProposalHomeFilter<$PrismaModel>;
  };

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>;
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedBoolFilter<$PrismaModel>;
    _max?: NestedBoolFilter<$PrismaModel>;
  };

  export type SubServicesListRelationFilter = {
    every?: SubServicesWhereInput;
    some?: SubServicesWhereInput;
    none?: SubServicesWhereInput;
  };

  export type SubServicesOrderByRelationAggregateInput = {
    _count?: SortOrder;
  };

  export type ServicesCountOrderByAggregateInput = {
    id?: SortOrder;
    name?: SortOrder;
    description?: SortOrder;
    slug?: SortOrder;
    icon?: SortOrder;
    active?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type ServicesAvgOrderByAggregateInput = {
    id?: SortOrder;
  };

  export type ServicesMaxOrderByAggregateInput = {
    id?: SortOrder;
    name?: SortOrder;
    description?: SortOrder;
    slug?: SortOrder;
    icon?: SortOrder;
    active?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type ServicesMinOrderByAggregateInput = {
    id?: SortOrder;
    name?: SortOrder;
    description?: SortOrder;
    slug?: SortOrder;
    icon?: SortOrder;
    active?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type ServicesSumOrderByAggregateInput = {
    id?: SortOrder;
  };

  export type ServicesScalarRelationFilter = {
    is?: ServicesWhereInput;
    isNot?: ServicesWhereInput;
  };

  export type ProposalListRelationFilter = {
    every?: ProposalWhereInput;
    some?: ProposalWhereInput;
    none?: ProposalWhereInput;
  };

  export type ProposalOrderByRelationAggregateInput = {
    _count?: SortOrder;
  };

  export type SubServicesCountOrderByAggregateInput = {
    id?: SortOrder;
    idService?: SortOrder;
    name?: SortOrder;
    description?: SortOrder;
    active?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type SubServicesAvgOrderByAggregateInput = {
    id?: SortOrder;
    idService?: SortOrder;
  };

  export type SubServicesMaxOrderByAggregateInput = {
    id?: SortOrder;
    idService?: SortOrder;
    name?: SortOrder;
    description?: SortOrder;
    active?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type SubServicesMinOrderByAggregateInput = {
    id?: SortOrder;
    idService?: SortOrder;
    name?: SortOrder;
    description?: SortOrder;
    active?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type SubServicesSumOrderByAggregateInput = {
    id?: SortOrder;
    idService?: SortOrder;
  };

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null;
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    mode?: QueryMode;
    not?: NestedStringNullableFilter<$PrismaModel> | string | null;
  };

  export type SessionListRelationFilter = {
    every?: SessionWhereInput;
    some?: SessionWhereInput;
    none?: SessionWhereInput;
  };

  export type AccountListRelationFilter = {
    every?: AccountWhereInput;
    some?: AccountWhereInput;
    none?: AccountWhereInput;
  };

  export type SortOrderInput = {
    sort: SortOrder;
    nulls?: NullsOrder;
  };

  export type SessionOrderByRelationAggregateInput = {
    _count?: SortOrder;
  };

  export type AccountOrderByRelationAggregateInput = {
    _count?: SortOrder;
  };

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder;
    name?: SortOrder;
    email?: SortOrder;
    phone?: SortOrder;
    emailVerified?: SortOrder;
    image?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder;
    name?: SortOrder;
    email?: SortOrder;
    phone?: SortOrder;
    emailVerified?: SortOrder;
    image?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder;
    name?: SortOrder;
    email?: SortOrder;
    phone?: SortOrder;
    emailVerified?: SortOrder;
    image?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null;
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    mode?: QueryMode;
    not?:
      | NestedStringNullableWithAggregatesFilter<$PrismaModel>
      | string
      | null;
    _count?: NestedIntNullableFilter<$PrismaModel>;
    _min?: NestedStringNullableFilter<$PrismaModel>;
    _max?: NestedStringNullableFilter<$PrismaModel>;
  };

  export type SessionCountOrderByAggregateInput = {
    id?: SortOrder;
    expiresAt?: SortOrder;
    token?: SortOrder;
    ipAddress?: SortOrder;
    userAgent?: SortOrder;
    userId?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type SessionMaxOrderByAggregateInput = {
    id?: SortOrder;
    expiresAt?: SortOrder;
    token?: SortOrder;
    ipAddress?: SortOrder;
    userAgent?: SortOrder;
    userId?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type SessionMinOrderByAggregateInput = {
    id?: SortOrder;
    expiresAt?: SortOrder;
    token?: SortOrder;
    ipAddress?: SortOrder;
    userAgent?: SortOrder;
    userId?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null;
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null;
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null;
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null;
  };

  export type AccountCountOrderByAggregateInput = {
    id?: SortOrder;
    accountId?: SortOrder;
    providerId?: SortOrder;
    userId?: SortOrder;
    accessToken?: SortOrder;
    refreshToken?: SortOrder;
    idToken?: SortOrder;
    accessTokenExpiresAt?: SortOrder;
    refreshTokenExpiresAt?: SortOrder;
    scope?: SortOrder;
    password?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type AccountMaxOrderByAggregateInput = {
    id?: SortOrder;
    accountId?: SortOrder;
    providerId?: SortOrder;
    userId?: SortOrder;
    accessToken?: SortOrder;
    refreshToken?: SortOrder;
    idToken?: SortOrder;
    accessTokenExpiresAt?: SortOrder;
    refreshTokenExpiresAt?: SortOrder;
    scope?: SortOrder;
    password?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type AccountMinOrderByAggregateInput = {
    id?: SortOrder;
    accountId?: SortOrder;
    providerId?: SortOrder;
    userId?: SortOrder;
    accessToken?: SortOrder;
    refreshToken?: SortOrder;
    idToken?: SortOrder;
    accessTokenExpiresAt?: SortOrder;
    refreshTokenExpiresAt?: SortOrder;
    scope?: SortOrder;
    password?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null;
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null;
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null;
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    not?:
      | NestedDateTimeNullableWithAggregatesFilter<$PrismaModel>
      | Date
      | string
      | null;
    _count?: NestedIntNullableFilter<$PrismaModel>;
    _min?: NestedDateTimeNullableFilter<$PrismaModel>;
    _max?: NestedDateTimeNullableFilter<$PrismaModel>;
  };

  export type VerificationCountOrderByAggregateInput = {
    id?: SortOrder;
    identifier?: SortOrder;
    value?: SortOrder;
    expiresAt?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type VerificationMaxOrderByAggregateInput = {
    id?: SortOrder;
    identifier?: SortOrder;
    value?: SortOrder;
    expiresAt?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type VerificationMinOrderByAggregateInput = {
    id?: SortOrder;
    identifier?: SortOrder;
    value?: SortOrder;
    expiresAt?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type UserCreateNestedOneWithoutBudgetInput = {
    create?: XOR<
      UserCreateWithoutBudgetInput,
      UserUncheckedCreateWithoutBudgetInput
    >;
    connectOrCreate?: UserCreateOrConnectWithoutBudgetInput;
    connect?: UserWhereUniqueInput;
  };

  export type ProposalCreateNestedOneWithoutBudgetInput = {
    create?: XOR<
      ProposalCreateWithoutBudgetInput,
      ProposalUncheckedCreateWithoutBudgetInput
    >;
    connectOrCreate?: ProposalCreateOrConnectWithoutBudgetInput;
    connect?: ProposalWhereUniqueInput;
  };

  export type StringFieldUpdateOperationsInput = {
    set?: string;
  };

  export type DecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string;
    increment?: Decimal | DecimalJsLike | number | string;
    decrement?: Decimal | DecimalJsLike | number | string;
    multiply?: Decimal | DecimalJsLike | number | string;
    divide?: Decimal | DecimalJsLike | number | string;
  };

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string;
  };

  export type UserUpdateOneRequiredWithoutBudgetNestedInput = {
    create?: XOR<
      UserCreateWithoutBudgetInput,
      UserUncheckedCreateWithoutBudgetInput
    >;
    connectOrCreate?: UserCreateOrConnectWithoutBudgetInput;
    upsert?: UserUpsertWithoutBudgetInput;
    connect?: UserWhereUniqueInput;
    update?: XOR<
      XOR<
        UserUpdateToOneWithWhereWithoutBudgetInput,
        UserUpdateWithoutBudgetInput
      >,
      UserUncheckedUpdateWithoutBudgetInput
    >;
  };

  export type ProposalUpdateOneRequiredWithoutBudgetNestedInput = {
    create?: XOR<
      ProposalCreateWithoutBudgetInput,
      ProposalUncheckedCreateWithoutBudgetInput
    >;
    connectOrCreate?: ProposalCreateOrConnectWithoutBudgetInput;
    upsert?: ProposalUpsertWithoutBudgetInput;
    connect?: ProposalWhereUniqueInput;
    update?: XOR<
      XOR<
        ProposalUpdateToOneWithWhereWithoutBudgetInput,
        ProposalUpdateWithoutBudgetInput
      >,
      ProposalUncheckedUpdateWithoutBudgetInput
    >;
  };

  export type IntFieldUpdateOperationsInput = {
    set?: number;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
  };

  export type UserCreateNestedOneWithoutProposalInput = {
    create?: XOR<
      UserCreateWithoutProposalInput,
      UserUncheckedCreateWithoutProposalInput
    >;
    connectOrCreate?: UserCreateOrConnectWithoutProposalInput;
    connect?: UserWhereUniqueInput;
  };

  export type SubServicesCreateNestedOneWithoutProposalInput = {
    create?: XOR<
      SubServicesCreateWithoutProposalInput,
      SubServicesUncheckedCreateWithoutProposalInput
    >;
    connectOrCreate?: SubServicesCreateOrConnectWithoutProposalInput;
    connect?: SubServicesWhereUniqueInput;
  };

  export type BudgetCreateNestedManyWithoutProposalInput = {
    create?:
      | XOR<
          BudgetCreateWithoutProposalInput,
          BudgetUncheckedCreateWithoutProposalInput
        >
      | BudgetCreateWithoutProposalInput[]
      | BudgetUncheckedCreateWithoutProposalInput[];
    connectOrCreate?:
      | BudgetCreateOrConnectWithoutProposalInput
      | BudgetCreateOrConnectWithoutProposalInput[];
    createMany?: BudgetCreateManyProposalInputEnvelope;
    connect?: BudgetWhereUniqueInput | BudgetWhereUniqueInput[];
  };

  export type BudgetUncheckedCreateNestedManyWithoutProposalInput = {
    create?:
      | XOR<
          BudgetCreateWithoutProposalInput,
          BudgetUncheckedCreateWithoutProposalInput
        >
      | BudgetCreateWithoutProposalInput[]
      | BudgetUncheckedCreateWithoutProposalInput[];
    connectOrCreate?:
      | BudgetCreateOrConnectWithoutProposalInput
      | BudgetCreateOrConnectWithoutProposalInput[];
    createMany?: BudgetCreateManyProposalInputEnvelope;
    connect?: BudgetWhereUniqueInput | BudgetWhereUniqueInput[];
  };

  export type EnumProposalHomeFieldUpdateOperationsInput = {
    set?: $Enums.ProposalHome;
  };

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean;
  };

  export type UserUpdateOneRequiredWithoutProposalNestedInput = {
    create?: XOR<
      UserCreateWithoutProposalInput,
      UserUncheckedCreateWithoutProposalInput
    >;
    connectOrCreate?: UserCreateOrConnectWithoutProposalInput;
    upsert?: UserUpsertWithoutProposalInput;
    connect?: UserWhereUniqueInput;
    update?: XOR<
      XOR<
        UserUpdateToOneWithWhereWithoutProposalInput,
        UserUpdateWithoutProposalInput
      >,
      UserUncheckedUpdateWithoutProposalInput
    >;
  };

  export type SubServicesUpdateOneRequiredWithoutProposalNestedInput = {
    create?: XOR<
      SubServicesCreateWithoutProposalInput,
      SubServicesUncheckedCreateWithoutProposalInput
    >;
    connectOrCreate?: SubServicesCreateOrConnectWithoutProposalInput;
    upsert?: SubServicesUpsertWithoutProposalInput;
    connect?: SubServicesWhereUniqueInput;
    update?: XOR<
      XOR<
        SubServicesUpdateToOneWithWhereWithoutProposalInput,
        SubServicesUpdateWithoutProposalInput
      >,
      SubServicesUncheckedUpdateWithoutProposalInput
    >;
  };

  export type BudgetUpdateManyWithoutProposalNestedInput = {
    create?:
      | XOR<
          BudgetCreateWithoutProposalInput,
          BudgetUncheckedCreateWithoutProposalInput
        >
      | BudgetCreateWithoutProposalInput[]
      | BudgetUncheckedCreateWithoutProposalInput[];
    connectOrCreate?:
      | BudgetCreateOrConnectWithoutProposalInput
      | BudgetCreateOrConnectWithoutProposalInput[];
    upsert?:
      | BudgetUpsertWithWhereUniqueWithoutProposalInput
      | BudgetUpsertWithWhereUniqueWithoutProposalInput[];
    createMany?: BudgetCreateManyProposalInputEnvelope;
    set?: BudgetWhereUniqueInput | BudgetWhereUniqueInput[];
    disconnect?: BudgetWhereUniqueInput | BudgetWhereUniqueInput[];
    delete?: BudgetWhereUniqueInput | BudgetWhereUniqueInput[];
    connect?: BudgetWhereUniqueInput | BudgetWhereUniqueInput[];
    update?:
      | BudgetUpdateWithWhereUniqueWithoutProposalInput
      | BudgetUpdateWithWhereUniqueWithoutProposalInput[];
    updateMany?:
      | BudgetUpdateManyWithWhereWithoutProposalInput
      | BudgetUpdateManyWithWhereWithoutProposalInput[];
    deleteMany?: BudgetScalarWhereInput | BudgetScalarWhereInput[];
  };

  export type BudgetUncheckedUpdateManyWithoutProposalNestedInput = {
    create?:
      | XOR<
          BudgetCreateWithoutProposalInput,
          BudgetUncheckedCreateWithoutProposalInput
        >
      | BudgetCreateWithoutProposalInput[]
      | BudgetUncheckedCreateWithoutProposalInput[];
    connectOrCreate?:
      | BudgetCreateOrConnectWithoutProposalInput
      | BudgetCreateOrConnectWithoutProposalInput[];
    upsert?:
      | BudgetUpsertWithWhereUniqueWithoutProposalInput
      | BudgetUpsertWithWhereUniqueWithoutProposalInput[];
    createMany?: BudgetCreateManyProposalInputEnvelope;
    set?: BudgetWhereUniqueInput | BudgetWhereUniqueInput[];
    disconnect?: BudgetWhereUniqueInput | BudgetWhereUniqueInput[];
    delete?: BudgetWhereUniqueInput | BudgetWhereUniqueInput[];
    connect?: BudgetWhereUniqueInput | BudgetWhereUniqueInput[];
    update?:
      | BudgetUpdateWithWhereUniqueWithoutProposalInput
      | BudgetUpdateWithWhereUniqueWithoutProposalInput[];
    updateMany?:
      | BudgetUpdateManyWithWhereWithoutProposalInput
      | BudgetUpdateManyWithWhereWithoutProposalInput[];
    deleteMany?: BudgetScalarWhereInput | BudgetScalarWhereInput[];
  };

  export type SubServicesCreateNestedManyWithoutServiceInput = {
    create?:
      | XOR<
          SubServicesCreateWithoutServiceInput,
          SubServicesUncheckedCreateWithoutServiceInput
        >
      | SubServicesCreateWithoutServiceInput[]
      | SubServicesUncheckedCreateWithoutServiceInput[];
    connectOrCreate?:
      | SubServicesCreateOrConnectWithoutServiceInput
      | SubServicesCreateOrConnectWithoutServiceInput[];
    createMany?: SubServicesCreateManyServiceInputEnvelope;
    connect?: SubServicesWhereUniqueInput | SubServicesWhereUniqueInput[];
  };

  export type SubServicesUncheckedCreateNestedManyWithoutServiceInput = {
    create?:
      | XOR<
          SubServicesCreateWithoutServiceInput,
          SubServicesUncheckedCreateWithoutServiceInput
        >
      | SubServicesCreateWithoutServiceInput[]
      | SubServicesUncheckedCreateWithoutServiceInput[];
    connectOrCreate?:
      | SubServicesCreateOrConnectWithoutServiceInput
      | SubServicesCreateOrConnectWithoutServiceInput[];
    createMany?: SubServicesCreateManyServiceInputEnvelope;
    connect?: SubServicesWhereUniqueInput | SubServicesWhereUniqueInput[];
  };

  export type SubServicesUpdateManyWithoutServiceNestedInput = {
    create?:
      | XOR<
          SubServicesCreateWithoutServiceInput,
          SubServicesUncheckedCreateWithoutServiceInput
        >
      | SubServicesCreateWithoutServiceInput[]
      | SubServicesUncheckedCreateWithoutServiceInput[];
    connectOrCreate?:
      | SubServicesCreateOrConnectWithoutServiceInput
      | SubServicesCreateOrConnectWithoutServiceInput[];
    upsert?:
      | SubServicesUpsertWithWhereUniqueWithoutServiceInput
      | SubServicesUpsertWithWhereUniqueWithoutServiceInput[];
    createMany?: SubServicesCreateManyServiceInputEnvelope;
    set?: SubServicesWhereUniqueInput | SubServicesWhereUniqueInput[];
    disconnect?: SubServicesWhereUniqueInput | SubServicesWhereUniqueInput[];
    delete?: SubServicesWhereUniqueInput | SubServicesWhereUniqueInput[];
    connect?: SubServicesWhereUniqueInput | SubServicesWhereUniqueInput[];
    update?:
      | SubServicesUpdateWithWhereUniqueWithoutServiceInput
      | SubServicesUpdateWithWhereUniqueWithoutServiceInput[];
    updateMany?:
      | SubServicesUpdateManyWithWhereWithoutServiceInput
      | SubServicesUpdateManyWithWhereWithoutServiceInput[];
    deleteMany?: SubServicesScalarWhereInput | SubServicesScalarWhereInput[];
  };

  export type SubServicesUncheckedUpdateManyWithoutServiceNestedInput = {
    create?:
      | XOR<
          SubServicesCreateWithoutServiceInput,
          SubServicesUncheckedCreateWithoutServiceInput
        >
      | SubServicesCreateWithoutServiceInput[]
      | SubServicesUncheckedCreateWithoutServiceInput[];
    connectOrCreate?:
      | SubServicesCreateOrConnectWithoutServiceInput
      | SubServicesCreateOrConnectWithoutServiceInput[];
    upsert?:
      | SubServicesUpsertWithWhereUniqueWithoutServiceInput
      | SubServicesUpsertWithWhereUniqueWithoutServiceInput[];
    createMany?: SubServicesCreateManyServiceInputEnvelope;
    set?: SubServicesWhereUniqueInput | SubServicesWhereUniqueInput[];
    disconnect?: SubServicesWhereUniqueInput | SubServicesWhereUniqueInput[];
    delete?: SubServicesWhereUniqueInput | SubServicesWhereUniqueInput[];
    connect?: SubServicesWhereUniqueInput | SubServicesWhereUniqueInput[];
    update?:
      | SubServicesUpdateWithWhereUniqueWithoutServiceInput
      | SubServicesUpdateWithWhereUniqueWithoutServiceInput[];
    updateMany?:
      | SubServicesUpdateManyWithWhereWithoutServiceInput
      | SubServicesUpdateManyWithWhereWithoutServiceInput[];
    deleteMany?: SubServicesScalarWhereInput | SubServicesScalarWhereInput[];
  };

  export type ServicesCreateNestedOneWithoutSubServicesInput = {
    create?: XOR<
      ServicesCreateWithoutSubServicesInput,
      ServicesUncheckedCreateWithoutSubServicesInput
    >;
    connectOrCreate?: ServicesCreateOrConnectWithoutSubServicesInput;
    connect?: ServicesWhereUniqueInput;
  };

  export type ProposalCreateNestedManyWithoutSubServicesInput = {
    create?:
      | XOR<
          ProposalCreateWithoutSubServicesInput,
          ProposalUncheckedCreateWithoutSubServicesInput
        >
      | ProposalCreateWithoutSubServicesInput[]
      | ProposalUncheckedCreateWithoutSubServicesInput[];
    connectOrCreate?:
      | ProposalCreateOrConnectWithoutSubServicesInput
      | ProposalCreateOrConnectWithoutSubServicesInput[];
    createMany?: ProposalCreateManySubServicesInputEnvelope;
    connect?: ProposalWhereUniqueInput | ProposalWhereUniqueInput[];
  };

  export type ProposalUncheckedCreateNestedManyWithoutSubServicesInput = {
    create?:
      | XOR<
          ProposalCreateWithoutSubServicesInput,
          ProposalUncheckedCreateWithoutSubServicesInput
        >
      | ProposalCreateWithoutSubServicesInput[]
      | ProposalUncheckedCreateWithoutSubServicesInput[];
    connectOrCreate?:
      | ProposalCreateOrConnectWithoutSubServicesInput
      | ProposalCreateOrConnectWithoutSubServicesInput[];
    createMany?: ProposalCreateManySubServicesInputEnvelope;
    connect?: ProposalWhereUniqueInput | ProposalWhereUniqueInput[];
  };

  export type ServicesUpdateOneRequiredWithoutSubServicesNestedInput = {
    create?: XOR<
      ServicesCreateWithoutSubServicesInput,
      ServicesUncheckedCreateWithoutSubServicesInput
    >;
    connectOrCreate?: ServicesCreateOrConnectWithoutSubServicesInput;
    upsert?: ServicesUpsertWithoutSubServicesInput;
    connect?: ServicesWhereUniqueInput;
    update?: XOR<
      XOR<
        ServicesUpdateToOneWithWhereWithoutSubServicesInput,
        ServicesUpdateWithoutSubServicesInput
      >,
      ServicesUncheckedUpdateWithoutSubServicesInput
    >;
  };

  export type ProposalUpdateManyWithoutSubServicesNestedInput = {
    create?:
      | XOR<
          ProposalCreateWithoutSubServicesInput,
          ProposalUncheckedCreateWithoutSubServicesInput
        >
      | ProposalCreateWithoutSubServicesInput[]
      | ProposalUncheckedCreateWithoutSubServicesInput[];
    connectOrCreate?:
      | ProposalCreateOrConnectWithoutSubServicesInput
      | ProposalCreateOrConnectWithoutSubServicesInput[];
    upsert?:
      | ProposalUpsertWithWhereUniqueWithoutSubServicesInput
      | ProposalUpsertWithWhereUniqueWithoutSubServicesInput[];
    createMany?: ProposalCreateManySubServicesInputEnvelope;
    set?: ProposalWhereUniqueInput | ProposalWhereUniqueInput[];
    disconnect?: ProposalWhereUniqueInput | ProposalWhereUniqueInput[];
    delete?: ProposalWhereUniqueInput | ProposalWhereUniqueInput[];
    connect?: ProposalWhereUniqueInput | ProposalWhereUniqueInput[];
    update?:
      | ProposalUpdateWithWhereUniqueWithoutSubServicesInput
      | ProposalUpdateWithWhereUniqueWithoutSubServicesInput[];
    updateMany?:
      | ProposalUpdateManyWithWhereWithoutSubServicesInput
      | ProposalUpdateManyWithWhereWithoutSubServicesInput[];
    deleteMany?: ProposalScalarWhereInput | ProposalScalarWhereInput[];
  };

  export type ProposalUncheckedUpdateManyWithoutSubServicesNestedInput = {
    create?:
      | XOR<
          ProposalCreateWithoutSubServicesInput,
          ProposalUncheckedCreateWithoutSubServicesInput
        >
      | ProposalCreateWithoutSubServicesInput[]
      | ProposalUncheckedCreateWithoutSubServicesInput[];
    connectOrCreate?:
      | ProposalCreateOrConnectWithoutSubServicesInput
      | ProposalCreateOrConnectWithoutSubServicesInput[];
    upsert?:
      | ProposalUpsertWithWhereUniqueWithoutSubServicesInput
      | ProposalUpsertWithWhereUniqueWithoutSubServicesInput[];
    createMany?: ProposalCreateManySubServicesInputEnvelope;
    set?: ProposalWhereUniqueInput | ProposalWhereUniqueInput[];
    disconnect?: ProposalWhereUniqueInput | ProposalWhereUniqueInput[];
    delete?: ProposalWhereUniqueInput | ProposalWhereUniqueInput[];
    connect?: ProposalWhereUniqueInput | ProposalWhereUniqueInput[];
    update?:
      | ProposalUpdateWithWhereUniqueWithoutSubServicesInput
      | ProposalUpdateWithWhereUniqueWithoutSubServicesInput[];
    updateMany?:
      | ProposalUpdateManyWithWhereWithoutSubServicesInput
      | ProposalUpdateManyWithWhereWithoutSubServicesInput[];
    deleteMany?: ProposalScalarWhereInput | ProposalScalarWhereInput[];
  };

  export type SessionCreateNestedManyWithoutUserInput = {
    create?:
      | XOR<
          SessionCreateWithoutUserInput,
          SessionUncheckedCreateWithoutUserInput
        >
      | SessionCreateWithoutUserInput[]
      | SessionUncheckedCreateWithoutUserInput[];
    connectOrCreate?:
      | SessionCreateOrConnectWithoutUserInput
      | SessionCreateOrConnectWithoutUserInput[];
    createMany?: SessionCreateManyUserInputEnvelope;
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[];
  };

  export type AccountCreateNestedManyWithoutUserInput = {
    create?:
      | XOR<
          AccountCreateWithoutUserInput,
          AccountUncheckedCreateWithoutUserInput
        >
      | AccountCreateWithoutUserInput[]
      | AccountUncheckedCreateWithoutUserInput[];
    connectOrCreate?:
      | AccountCreateOrConnectWithoutUserInput
      | AccountCreateOrConnectWithoutUserInput[];
    createMany?: AccountCreateManyUserInputEnvelope;
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[];
  };

  export type ProposalCreateNestedManyWithoutUserInput = {
    create?:
      | XOR<
          ProposalCreateWithoutUserInput,
          ProposalUncheckedCreateWithoutUserInput
        >
      | ProposalCreateWithoutUserInput[]
      | ProposalUncheckedCreateWithoutUserInput[];
    connectOrCreate?:
      | ProposalCreateOrConnectWithoutUserInput
      | ProposalCreateOrConnectWithoutUserInput[];
    createMany?: ProposalCreateManyUserInputEnvelope;
    connect?: ProposalWhereUniqueInput | ProposalWhereUniqueInput[];
  };

  export type BudgetCreateNestedManyWithoutUserInput = {
    create?:
      | XOR<BudgetCreateWithoutUserInput, BudgetUncheckedCreateWithoutUserInput>
      | BudgetCreateWithoutUserInput[]
      | BudgetUncheckedCreateWithoutUserInput[];
    connectOrCreate?:
      | BudgetCreateOrConnectWithoutUserInput
      | BudgetCreateOrConnectWithoutUserInput[];
    createMany?: BudgetCreateManyUserInputEnvelope;
    connect?: BudgetWhereUniqueInput | BudgetWhereUniqueInput[];
  };

  export type SessionUncheckedCreateNestedManyWithoutUserInput = {
    create?:
      | XOR<
          SessionCreateWithoutUserInput,
          SessionUncheckedCreateWithoutUserInput
        >
      | SessionCreateWithoutUserInput[]
      | SessionUncheckedCreateWithoutUserInput[];
    connectOrCreate?:
      | SessionCreateOrConnectWithoutUserInput
      | SessionCreateOrConnectWithoutUserInput[];
    createMany?: SessionCreateManyUserInputEnvelope;
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[];
  };

  export type AccountUncheckedCreateNestedManyWithoutUserInput = {
    create?:
      | XOR<
          AccountCreateWithoutUserInput,
          AccountUncheckedCreateWithoutUserInput
        >
      | AccountCreateWithoutUserInput[]
      | AccountUncheckedCreateWithoutUserInput[];
    connectOrCreate?:
      | AccountCreateOrConnectWithoutUserInput
      | AccountCreateOrConnectWithoutUserInput[];
    createMany?: AccountCreateManyUserInputEnvelope;
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[];
  };

  export type ProposalUncheckedCreateNestedManyWithoutUserInput = {
    create?:
      | XOR<
          ProposalCreateWithoutUserInput,
          ProposalUncheckedCreateWithoutUserInput
        >
      | ProposalCreateWithoutUserInput[]
      | ProposalUncheckedCreateWithoutUserInput[];
    connectOrCreate?:
      | ProposalCreateOrConnectWithoutUserInput
      | ProposalCreateOrConnectWithoutUserInput[];
    createMany?: ProposalCreateManyUserInputEnvelope;
    connect?: ProposalWhereUniqueInput | ProposalWhereUniqueInput[];
  };

  export type BudgetUncheckedCreateNestedManyWithoutUserInput = {
    create?:
      | XOR<BudgetCreateWithoutUserInput, BudgetUncheckedCreateWithoutUserInput>
      | BudgetCreateWithoutUserInput[]
      | BudgetUncheckedCreateWithoutUserInput[];
    connectOrCreate?:
      | BudgetCreateOrConnectWithoutUserInput
      | BudgetCreateOrConnectWithoutUserInput[];
    createMany?: BudgetCreateManyUserInputEnvelope;
    connect?: BudgetWhereUniqueInput | BudgetWhereUniqueInput[];
  };

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null;
  };

  export type SessionUpdateManyWithoutUserNestedInput = {
    create?:
      | XOR<
          SessionCreateWithoutUserInput,
          SessionUncheckedCreateWithoutUserInput
        >
      | SessionCreateWithoutUserInput[]
      | SessionUncheckedCreateWithoutUserInput[];
    connectOrCreate?:
      | SessionCreateOrConnectWithoutUserInput
      | SessionCreateOrConnectWithoutUserInput[];
    upsert?:
      | SessionUpsertWithWhereUniqueWithoutUserInput
      | SessionUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: SessionCreateManyUserInputEnvelope;
    set?: SessionWhereUniqueInput | SessionWhereUniqueInput[];
    disconnect?: SessionWhereUniqueInput | SessionWhereUniqueInput[];
    delete?: SessionWhereUniqueInput | SessionWhereUniqueInput[];
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[];
    update?:
      | SessionUpdateWithWhereUniqueWithoutUserInput
      | SessionUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?:
      | SessionUpdateManyWithWhereWithoutUserInput
      | SessionUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: SessionScalarWhereInput | SessionScalarWhereInput[];
  };

  export type AccountUpdateManyWithoutUserNestedInput = {
    create?:
      | XOR<
          AccountCreateWithoutUserInput,
          AccountUncheckedCreateWithoutUserInput
        >
      | AccountCreateWithoutUserInput[]
      | AccountUncheckedCreateWithoutUserInput[];
    connectOrCreate?:
      | AccountCreateOrConnectWithoutUserInput
      | AccountCreateOrConnectWithoutUserInput[];
    upsert?:
      | AccountUpsertWithWhereUniqueWithoutUserInput
      | AccountUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: AccountCreateManyUserInputEnvelope;
    set?: AccountWhereUniqueInput | AccountWhereUniqueInput[];
    disconnect?: AccountWhereUniqueInput | AccountWhereUniqueInput[];
    delete?: AccountWhereUniqueInput | AccountWhereUniqueInput[];
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[];
    update?:
      | AccountUpdateWithWhereUniqueWithoutUserInput
      | AccountUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?:
      | AccountUpdateManyWithWhereWithoutUserInput
      | AccountUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: AccountScalarWhereInput | AccountScalarWhereInput[];
  };

  export type ProposalUpdateManyWithoutUserNestedInput = {
    create?:
      | XOR<
          ProposalCreateWithoutUserInput,
          ProposalUncheckedCreateWithoutUserInput
        >
      | ProposalCreateWithoutUserInput[]
      | ProposalUncheckedCreateWithoutUserInput[];
    connectOrCreate?:
      | ProposalCreateOrConnectWithoutUserInput
      | ProposalCreateOrConnectWithoutUserInput[];
    upsert?:
      | ProposalUpsertWithWhereUniqueWithoutUserInput
      | ProposalUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: ProposalCreateManyUserInputEnvelope;
    set?: ProposalWhereUniqueInput | ProposalWhereUniqueInput[];
    disconnect?: ProposalWhereUniqueInput | ProposalWhereUniqueInput[];
    delete?: ProposalWhereUniqueInput | ProposalWhereUniqueInput[];
    connect?: ProposalWhereUniqueInput | ProposalWhereUniqueInput[];
    update?:
      | ProposalUpdateWithWhereUniqueWithoutUserInput
      | ProposalUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?:
      | ProposalUpdateManyWithWhereWithoutUserInput
      | ProposalUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: ProposalScalarWhereInput | ProposalScalarWhereInput[];
  };

  export type BudgetUpdateManyWithoutUserNestedInput = {
    create?:
      | XOR<BudgetCreateWithoutUserInput, BudgetUncheckedCreateWithoutUserInput>
      | BudgetCreateWithoutUserInput[]
      | BudgetUncheckedCreateWithoutUserInput[];
    connectOrCreate?:
      | BudgetCreateOrConnectWithoutUserInput
      | BudgetCreateOrConnectWithoutUserInput[];
    upsert?:
      | BudgetUpsertWithWhereUniqueWithoutUserInput
      | BudgetUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: BudgetCreateManyUserInputEnvelope;
    set?: BudgetWhereUniqueInput | BudgetWhereUniqueInput[];
    disconnect?: BudgetWhereUniqueInput | BudgetWhereUniqueInput[];
    delete?: BudgetWhereUniqueInput | BudgetWhereUniqueInput[];
    connect?: BudgetWhereUniqueInput | BudgetWhereUniqueInput[];
    update?:
      | BudgetUpdateWithWhereUniqueWithoutUserInput
      | BudgetUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?:
      | BudgetUpdateManyWithWhereWithoutUserInput
      | BudgetUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: BudgetScalarWhereInput | BudgetScalarWhereInput[];
  };

  export type SessionUncheckedUpdateManyWithoutUserNestedInput = {
    create?:
      | XOR<
          SessionCreateWithoutUserInput,
          SessionUncheckedCreateWithoutUserInput
        >
      | SessionCreateWithoutUserInput[]
      | SessionUncheckedCreateWithoutUserInput[];
    connectOrCreate?:
      | SessionCreateOrConnectWithoutUserInput
      | SessionCreateOrConnectWithoutUserInput[];
    upsert?:
      | SessionUpsertWithWhereUniqueWithoutUserInput
      | SessionUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: SessionCreateManyUserInputEnvelope;
    set?: SessionWhereUniqueInput | SessionWhereUniqueInput[];
    disconnect?: SessionWhereUniqueInput | SessionWhereUniqueInput[];
    delete?: SessionWhereUniqueInput | SessionWhereUniqueInput[];
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[];
    update?:
      | SessionUpdateWithWhereUniqueWithoutUserInput
      | SessionUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?:
      | SessionUpdateManyWithWhereWithoutUserInput
      | SessionUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: SessionScalarWhereInput | SessionScalarWhereInput[];
  };

  export type AccountUncheckedUpdateManyWithoutUserNestedInput = {
    create?:
      | XOR<
          AccountCreateWithoutUserInput,
          AccountUncheckedCreateWithoutUserInput
        >
      | AccountCreateWithoutUserInput[]
      | AccountUncheckedCreateWithoutUserInput[];
    connectOrCreate?:
      | AccountCreateOrConnectWithoutUserInput
      | AccountCreateOrConnectWithoutUserInput[];
    upsert?:
      | AccountUpsertWithWhereUniqueWithoutUserInput
      | AccountUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: AccountCreateManyUserInputEnvelope;
    set?: AccountWhereUniqueInput | AccountWhereUniqueInput[];
    disconnect?: AccountWhereUniqueInput | AccountWhereUniqueInput[];
    delete?: AccountWhereUniqueInput | AccountWhereUniqueInput[];
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[];
    update?:
      | AccountUpdateWithWhereUniqueWithoutUserInput
      | AccountUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?:
      | AccountUpdateManyWithWhereWithoutUserInput
      | AccountUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: AccountScalarWhereInput | AccountScalarWhereInput[];
  };

  export type ProposalUncheckedUpdateManyWithoutUserNestedInput = {
    create?:
      | XOR<
          ProposalCreateWithoutUserInput,
          ProposalUncheckedCreateWithoutUserInput
        >
      | ProposalCreateWithoutUserInput[]
      | ProposalUncheckedCreateWithoutUserInput[];
    connectOrCreate?:
      | ProposalCreateOrConnectWithoutUserInput
      | ProposalCreateOrConnectWithoutUserInput[];
    upsert?:
      | ProposalUpsertWithWhereUniqueWithoutUserInput
      | ProposalUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: ProposalCreateManyUserInputEnvelope;
    set?: ProposalWhereUniqueInput | ProposalWhereUniqueInput[];
    disconnect?: ProposalWhereUniqueInput | ProposalWhereUniqueInput[];
    delete?: ProposalWhereUniqueInput | ProposalWhereUniqueInput[];
    connect?: ProposalWhereUniqueInput | ProposalWhereUniqueInput[];
    update?:
      | ProposalUpdateWithWhereUniqueWithoutUserInput
      | ProposalUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?:
      | ProposalUpdateManyWithWhereWithoutUserInput
      | ProposalUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: ProposalScalarWhereInput | ProposalScalarWhereInput[];
  };

  export type BudgetUncheckedUpdateManyWithoutUserNestedInput = {
    create?:
      | XOR<BudgetCreateWithoutUserInput, BudgetUncheckedCreateWithoutUserInput>
      | BudgetCreateWithoutUserInput[]
      | BudgetUncheckedCreateWithoutUserInput[];
    connectOrCreate?:
      | BudgetCreateOrConnectWithoutUserInput
      | BudgetCreateOrConnectWithoutUserInput[];
    upsert?:
      | BudgetUpsertWithWhereUniqueWithoutUserInput
      | BudgetUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: BudgetCreateManyUserInputEnvelope;
    set?: BudgetWhereUniqueInput | BudgetWhereUniqueInput[];
    disconnect?: BudgetWhereUniqueInput | BudgetWhereUniqueInput[];
    delete?: BudgetWhereUniqueInput | BudgetWhereUniqueInput[];
    connect?: BudgetWhereUniqueInput | BudgetWhereUniqueInput[];
    update?:
      | BudgetUpdateWithWhereUniqueWithoutUserInput
      | BudgetUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?:
      | BudgetUpdateManyWithWhereWithoutUserInput
      | BudgetUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: BudgetScalarWhereInput | BudgetScalarWhereInput[];
  };

  export type UserCreateNestedOneWithoutSessionsInput = {
    create?: XOR<
      UserCreateWithoutSessionsInput,
      UserUncheckedCreateWithoutSessionsInput
    >;
    connectOrCreate?: UserCreateOrConnectWithoutSessionsInput;
    connect?: UserWhereUniqueInput;
  };

  export type UserUpdateOneRequiredWithoutSessionsNestedInput = {
    create?: XOR<
      UserCreateWithoutSessionsInput,
      UserUncheckedCreateWithoutSessionsInput
    >;
    connectOrCreate?: UserCreateOrConnectWithoutSessionsInput;
    upsert?: UserUpsertWithoutSessionsInput;
    connect?: UserWhereUniqueInput;
    update?: XOR<
      XOR<
        UserUpdateToOneWithWhereWithoutSessionsInput,
        UserUpdateWithoutSessionsInput
      >,
      UserUncheckedUpdateWithoutSessionsInput
    >;
  };

  export type UserCreateNestedOneWithoutAccountsInput = {
    create?: XOR<
      UserCreateWithoutAccountsInput,
      UserUncheckedCreateWithoutAccountsInput
    >;
    connectOrCreate?: UserCreateOrConnectWithoutAccountsInput;
    connect?: UserWhereUniqueInput;
  };

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null;
  };

  export type UserUpdateOneRequiredWithoutAccountsNestedInput = {
    create?: XOR<
      UserCreateWithoutAccountsInput,
      UserUncheckedCreateWithoutAccountsInput
    >;
    connectOrCreate?: UserCreateOrConnectWithoutAccountsInput;
    upsert?: UserUpsertWithoutAccountsInput;
    connect?: UserWhereUniqueInput;
    update?: XOR<
      XOR<
        UserUpdateToOneWithWhereWithoutAccountsInput,
        UserUpdateWithoutAccountsInput
      >,
      UserUncheckedUpdateWithoutAccountsInput
    >;
  };

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>;
    in?: number[] | ListIntFieldRefInput<$PrismaModel>;
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>;
    lt?: number | IntFieldRefInput<$PrismaModel>;
    lte?: number | IntFieldRefInput<$PrismaModel>;
    gt?: number | IntFieldRefInput<$PrismaModel>;
    gte?: number | IntFieldRefInput<$PrismaModel>;
    not?: NestedIntFilter<$PrismaModel> | number;
  };

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>;
    in?: string[] | ListStringFieldRefInput<$PrismaModel>;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    not?: NestedStringFilter<$PrismaModel> | string;
  };

  export type NestedDecimalFilter<$PrismaModel = never> = {
    equals?:
      | Decimal
      | DecimalJsLike
      | number
      | string
      | DecimalFieldRefInput<$PrismaModel>;
    in?:
      | Decimal[]
      | DecimalJsLike[]
      | number[]
      | string[]
      | ListDecimalFieldRefInput<$PrismaModel>;
    notIn?:
      | Decimal[]
      | DecimalJsLike[]
      | number[]
      | string[]
      | ListDecimalFieldRefInput<$PrismaModel>;
    lt?:
      | Decimal
      | DecimalJsLike
      | number
      | string
      | DecimalFieldRefInput<$PrismaModel>;
    lte?:
      | Decimal
      | DecimalJsLike
      | number
      | string
      | DecimalFieldRefInput<$PrismaModel>;
    gt?:
      | Decimal
      | DecimalJsLike
      | number
      | string
      | DecimalFieldRefInput<$PrismaModel>;
    gte?:
      | Decimal
      | DecimalJsLike
      | number
      | string
      | DecimalFieldRefInput<$PrismaModel>;
    not?:
      | NestedDecimalFilter<$PrismaModel>
      | Decimal
      | DecimalJsLike
      | number
      | string;
  };

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string;
  };

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>;
    in?: number[] | ListIntFieldRefInput<$PrismaModel>;
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>;
    lt?: number | IntFieldRefInput<$PrismaModel>;
    lte?: number | IntFieldRefInput<$PrismaModel>;
    gt?: number | IntFieldRefInput<$PrismaModel>;
    gte?: number | IntFieldRefInput<$PrismaModel>;
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number;
    _count?: NestedIntFilter<$PrismaModel>;
    _avg?: NestedFloatFilter<$PrismaModel>;
    _sum?: NestedIntFilter<$PrismaModel>;
    _min?: NestedIntFilter<$PrismaModel>;
    _max?: NestedIntFilter<$PrismaModel>;
  };

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>;
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>;
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>;
    lt?: number | FloatFieldRefInput<$PrismaModel>;
    lte?: number | FloatFieldRefInput<$PrismaModel>;
    gt?: number | FloatFieldRefInput<$PrismaModel>;
    gte?: number | FloatFieldRefInput<$PrismaModel>;
    not?: NestedFloatFilter<$PrismaModel> | number;
  };

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>;
    in?: string[] | ListStringFieldRefInput<$PrismaModel>;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedStringFilter<$PrismaModel>;
    _max?: NestedStringFilter<$PrismaModel>;
  };

  export type NestedDecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?:
      | Decimal
      | DecimalJsLike
      | number
      | string
      | DecimalFieldRefInput<$PrismaModel>;
    in?:
      | Decimal[]
      | DecimalJsLike[]
      | number[]
      | string[]
      | ListDecimalFieldRefInput<$PrismaModel>;
    notIn?:
      | Decimal[]
      | DecimalJsLike[]
      | number[]
      | string[]
      | ListDecimalFieldRefInput<$PrismaModel>;
    lt?:
      | Decimal
      | DecimalJsLike
      | number
      | string
      | DecimalFieldRefInput<$PrismaModel>;
    lte?:
      | Decimal
      | DecimalJsLike
      | number
      | string
      | DecimalFieldRefInput<$PrismaModel>;
    gt?:
      | Decimal
      | DecimalJsLike
      | number
      | string
      | DecimalFieldRefInput<$PrismaModel>;
    gte?:
      | Decimal
      | DecimalJsLike
      | number
      | string
      | DecimalFieldRefInput<$PrismaModel>;
    not?:
      | NestedDecimalWithAggregatesFilter<$PrismaModel>
      | Decimal
      | DecimalJsLike
      | number
      | string;
    _count?: NestedIntFilter<$PrismaModel>;
    _avg?: NestedDecimalFilter<$PrismaModel>;
    _sum?: NestedDecimalFilter<$PrismaModel>;
    _min?: NestedDecimalFilter<$PrismaModel>;
    _max?: NestedDecimalFilter<$PrismaModel>;
  };

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedDateTimeFilter<$PrismaModel>;
    _max?: NestedDateTimeFilter<$PrismaModel>;
  };

  export type NestedEnumProposalHomeFilter<$PrismaModel = never> = {
    equals?: $Enums.ProposalHome | EnumProposalHomeFieldRefInput<$PrismaModel>;
    in?:
      | $Enums.ProposalHome[]
      | ListEnumProposalHomeFieldRefInput<$PrismaModel>;
    notIn?:
      | $Enums.ProposalHome[]
      | ListEnumProposalHomeFieldRefInput<$PrismaModel>;
    not?: NestedEnumProposalHomeFilter<$PrismaModel> | $Enums.ProposalHome;
  };

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>;
    not?: NestedBoolFilter<$PrismaModel> | boolean;
  };

  export type NestedEnumProposalHomeWithAggregatesFilter<$PrismaModel = never> =
    {
      equals?:
        | $Enums.ProposalHome
        | EnumProposalHomeFieldRefInput<$PrismaModel>;
      in?:
        | $Enums.ProposalHome[]
        | ListEnumProposalHomeFieldRefInput<$PrismaModel>;
      notIn?:
        | $Enums.ProposalHome[]
        | ListEnumProposalHomeFieldRefInput<$PrismaModel>;
      not?:
        | NestedEnumProposalHomeWithAggregatesFilter<$PrismaModel>
        | $Enums.ProposalHome;
      _count?: NestedIntFilter<$PrismaModel>;
      _min?: NestedEnumProposalHomeFilter<$PrismaModel>;
      _max?: NestedEnumProposalHomeFilter<$PrismaModel>;
    };

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>;
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedBoolFilter<$PrismaModel>;
    _max?: NestedBoolFilter<$PrismaModel>;
  };

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null;
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    not?: NestedStringNullableFilter<$PrismaModel> | string | null;
  };

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null;
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    not?:
      | NestedStringNullableWithAggregatesFilter<$PrismaModel>
      | string
      | null;
    _count?: NestedIntNullableFilter<$PrismaModel>;
    _min?: NestedStringNullableFilter<$PrismaModel>;
    _max?: NestedStringNullableFilter<$PrismaModel>;
  };

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null;
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null;
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null;
    lt?: number | IntFieldRefInput<$PrismaModel>;
    lte?: number | IntFieldRefInput<$PrismaModel>;
    gt?: number | IntFieldRefInput<$PrismaModel>;
    gte?: number | IntFieldRefInput<$PrismaModel>;
    not?: NestedIntNullableFilter<$PrismaModel> | number | null;
  };

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null;
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null;
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null;
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null;
  };

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> =
    {
      equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null;
      in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null;
      notIn?:
        | Date[]
        | string[]
        | ListDateTimeFieldRefInput<$PrismaModel>
        | null;
      lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
      lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
      gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
      gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
      not?:
        | NestedDateTimeNullableWithAggregatesFilter<$PrismaModel>
        | Date
        | string
        | null;
      _count?: NestedIntNullableFilter<$PrismaModel>;
      _min?: NestedDateTimeNullableFilter<$PrismaModel>;
      _max?: NestedDateTimeNullableFilter<$PrismaModel>;
    };

  export type UserCreateWithoutBudgetInput = {
    id: string;
    name: string;
    email: string;
    phone?: string | null;
    emailVerified: boolean;
    image?: string | null;
    createdAt: Date | string;
    updatedAt: Date | string;
    sessions?: SessionCreateNestedManyWithoutUserInput;
    accounts?: AccountCreateNestedManyWithoutUserInput;
    proposal?: ProposalCreateNestedManyWithoutUserInput;
  };

  export type UserUncheckedCreateWithoutBudgetInput = {
    id: string;
    name: string;
    email: string;
    phone?: string | null;
    emailVerified: boolean;
    image?: string | null;
    createdAt: Date | string;
    updatedAt: Date | string;
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput;
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput;
    proposal?: ProposalUncheckedCreateNestedManyWithoutUserInput;
  };

  export type UserCreateOrConnectWithoutBudgetInput = {
    where: UserWhereUniqueInput;
    create: XOR<
      UserCreateWithoutBudgetInput,
      UserUncheckedCreateWithoutBudgetInput
    >;
  };

  export type ProposalCreateWithoutBudgetInput = {
    type?: $Enums.ProposalHome;
    commune: number;
    address: string;
    serviceDate: Date | string;
    description: string;
    active?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    user: UserCreateNestedOneWithoutProposalInput;
    subServices: SubServicesCreateNestedOneWithoutProposalInput;
  };

  export type ProposalUncheckedCreateWithoutBudgetInput = {
    id?: number;
    userId: string;
    serviceId: number;
    type?: $Enums.ProposalHome;
    commune: number;
    address: string;
    serviceDate: Date | string;
    description: string;
    active?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type ProposalCreateOrConnectWithoutBudgetInput = {
    where: ProposalWhereUniqueInput;
    create: XOR<
      ProposalCreateWithoutBudgetInput,
      ProposalUncheckedCreateWithoutBudgetInput
    >;
  };

  export type UserUpsertWithoutBudgetInput = {
    update: XOR<
      UserUpdateWithoutBudgetInput,
      UserUncheckedUpdateWithoutBudgetInput
    >;
    create: XOR<
      UserCreateWithoutBudgetInput,
      UserUncheckedCreateWithoutBudgetInput
    >;
    where?: UserWhereInput;
  };

  export type UserUpdateToOneWithWhereWithoutBudgetInput = {
    where?: UserWhereInput;
    data: XOR<
      UserUpdateWithoutBudgetInput,
      UserUncheckedUpdateWithoutBudgetInput
    >;
  };

  export type UserUpdateWithoutBudgetInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    phone?: NullableStringFieldUpdateOperationsInput | string | null;
    emailVerified?: BoolFieldUpdateOperationsInput | boolean;
    image?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    sessions?: SessionUpdateManyWithoutUserNestedInput;
    accounts?: AccountUpdateManyWithoutUserNestedInput;
    proposal?: ProposalUpdateManyWithoutUserNestedInput;
  };

  export type UserUncheckedUpdateWithoutBudgetInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    phone?: NullableStringFieldUpdateOperationsInput | string | null;
    emailVerified?: BoolFieldUpdateOperationsInput | boolean;
    image?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput;
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput;
    proposal?: ProposalUncheckedUpdateManyWithoutUserNestedInput;
  };

  export type ProposalUpsertWithoutBudgetInput = {
    update: XOR<
      ProposalUpdateWithoutBudgetInput,
      ProposalUncheckedUpdateWithoutBudgetInput
    >;
    create: XOR<
      ProposalCreateWithoutBudgetInput,
      ProposalUncheckedCreateWithoutBudgetInput
    >;
    where?: ProposalWhereInput;
  };

  export type ProposalUpdateToOneWithWhereWithoutBudgetInput = {
    where?: ProposalWhereInput;
    data: XOR<
      ProposalUpdateWithoutBudgetInput,
      ProposalUncheckedUpdateWithoutBudgetInput
    >;
  };

  export type ProposalUpdateWithoutBudgetInput = {
    type?: EnumProposalHomeFieldUpdateOperationsInput | $Enums.ProposalHome;
    commune?: IntFieldUpdateOperationsInput | number;
    address?: StringFieldUpdateOperationsInput | string;
    serviceDate?: DateTimeFieldUpdateOperationsInput | Date | string;
    description?: StringFieldUpdateOperationsInput | string;
    active?: BoolFieldUpdateOperationsInput | boolean;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    user?: UserUpdateOneRequiredWithoutProposalNestedInput;
    subServices?: SubServicesUpdateOneRequiredWithoutProposalNestedInput;
  };

  export type ProposalUncheckedUpdateWithoutBudgetInput = {
    id?: IntFieldUpdateOperationsInput | number;
    userId?: StringFieldUpdateOperationsInput | string;
    serviceId?: IntFieldUpdateOperationsInput | number;
    type?: EnumProposalHomeFieldUpdateOperationsInput | $Enums.ProposalHome;
    commune?: IntFieldUpdateOperationsInput | number;
    address?: StringFieldUpdateOperationsInput | string;
    serviceDate?: DateTimeFieldUpdateOperationsInput | Date | string;
    description?: StringFieldUpdateOperationsInput | string;
    active?: BoolFieldUpdateOperationsInput | boolean;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type UserCreateWithoutProposalInput = {
    id: string;
    name: string;
    email: string;
    phone?: string | null;
    emailVerified: boolean;
    image?: string | null;
    createdAt: Date | string;
    updatedAt: Date | string;
    sessions?: SessionCreateNestedManyWithoutUserInput;
    accounts?: AccountCreateNestedManyWithoutUserInput;
    budget?: BudgetCreateNestedManyWithoutUserInput;
  };

  export type UserUncheckedCreateWithoutProposalInput = {
    id: string;
    name: string;
    email: string;
    phone?: string | null;
    emailVerified: boolean;
    image?: string | null;
    createdAt: Date | string;
    updatedAt: Date | string;
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput;
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput;
    budget?: BudgetUncheckedCreateNestedManyWithoutUserInput;
  };

  export type UserCreateOrConnectWithoutProposalInput = {
    where: UserWhereUniqueInput;
    create: XOR<
      UserCreateWithoutProposalInput,
      UserUncheckedCreateWithoutProposalInput
    >;
  };

  export type SubServicesCreateWithoutProposalInput = {
    name: string;
    description: string;
    active?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    service: ServicesCreateNestedOneWithoutSubServicesInput;
  };

  export type SubServicesUncheckedCreateWithoutProposalInput = {
    id?: number;
    idService: number;
    name: string;
    description: string;
    active?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type SubServicesCreateOrConnectWithoutProposalInput = {
    where: SubServicesWhereUniqueInput;
    create: XOR<
      SubServicesCreateWithoutProposalInput,
      SubServicesUncheckedCreateWithoutProposalInput
    >;
  };

  export type BudgetCreateWithoutProposalInput = {
    details: string;
    budget: Decimal | DecimalJsLike | number | string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    user: UserCreateNestedOneWithoutBudgetInput;
  };

  export type BudgetUncheckedCreateWithoutProposalInput = {
    id?: number;
    userId: string;
    details: string;
    budget: Decimal | DecimalJsLike | number | string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type BudgetCreateOrConnectWithoutProposalInput = {
    where: BudgetWhereUniqueInput;
    create: XOR<
      BudgetCreateWithoutProposalInput,
      BudgetUncheckedCreateWithoutProposalInput
    >;
  };

  export type BudgetCreateManyProposalInputEnvelope = {
    data: BudgetCreateManyProposalInput | BudgetCreateManyProposalInput[];
    skipDuplicates?: boolean;
  };

  export type UserUpsertWithoutProposalInput = {
    update: XOR<
      UserUpdateWithoutProposalInput,
      UserUncheckedUpdateWithoutProposalInput
    >;
    create: XOR<
      UserCreateWithoutProposalInput,
      UserUncheckedCreateWithoutProposalInput
    >;
    where?: UserWhereInput;
  };

  export type UserUpdateToOneWithWhereWithoutProposalInput = {
    where?: UserWhereInput;
    data: XOR<
      UserUpdateWithoutProposalInput,
      UserUncheckedUpdateWithoutProposalInput
    >;
  };

  export type UserUpdateWithoutProposalInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    phone?: NullableStringFieldUpdateOperationsInput | string | null;
    emailVerified?: BoolFieldUpdateOperationsInput | boolean;
    image?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    sessions?: SessionUpdateManyWithoutUserNestedInput;
    accounts?: AccountUpdateManyWithoutUserNestedInput;
    budget?: BudgetUpdateManyWithoutUserNestedInput;
  };

  export type UserUncheckedUpdateWithoutProposalInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    phone?: NullableStringFieldUpdateOperationsInput | string | null;
    emailVerified?: BoolFieldUpdateOperationsInput | boolean;
    image?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput;
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput;
    budget?: BudgetUncheckedUpdateManyWithoutUserNestedInput;
  };

  export type SubServicesUpsertWithoutProposalInput = {
    update: XOR<
      SubServicesUpdateWithoutProposalInput,
      SubServicesUncheckedUpdateWithoutProposalInput
    >;
    create: XOR<
      SubServicesCreateWithoutProposalInput,
      SubServicesUncheckedCreateWithoutProposalInput
    >;
    where?: SubServicesWhereInput;
  };

  export type SubServicesUpdateToOneWithWhereWithoutProposalInput = {
    where?: SubServicesWhereInput;
    data: XOR<
      SubServicesUpdateWithoutProposalInput,
      SubServicesUncheckedUpdateWithoutProposalInput
    >;
  };

  export type SubServicesUpdateWithoutProposalInput = {
    name?: StringFieldUpdateOperationsInput | string;
    description?: StringFieldUpdateOperationsInput | string;
    active?: BoolFieldUpdateOperationsInput | boolean;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    service?: ServicesUpdateOneRequiredWithoutSubServicesNestedInput;
  };

  export type SubServicesUncheckedUpdateWithoutProposalInput = {
    id?: IntFieldUpdateOperationsInput | number;
    idService?: IntFieldUpdateOperationsInput | number;
    name?: StringFieldUpdateOperationsInput | string;
    description?: StringFieldUpdateOperationsInput | string;
    active?: BoolFieldUpdateOperationsInput | boolean;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type BudgetUpsertWithWhereUniqueWithoutProposalInput = {
    where: BudgetWhereUniqueInput;
    update: XOR<
      BudgetUpdateWithoutProposalInput,
      BudgetUncheckedUpdateWithoutProposalInput
    >;
    create: XOR<
      BudgetCreateWithoutProposalInput,
      BudgetUncheckedCreateWithoutProposalInput
    >;
  };

  export type BudgetUpdateWithWhereUniqueWithoutProposalInput = {
    where: BudgetWhereUniqueInput;
    data: XOR<
      BudgetUpdateWithoutProposalInput,
      BudgetUncheckedUpdateWithoutProposalInput
    >;
  };

  export type BudgetUpdateManyWithWhereWithoutProposalInput = {
    where: BudgetScalarWhereInput;
    data: XOR<
      BudgetUpdateManyMutationInput,
      BudgetUncheckedUpdateManyWithoutProposalInput
    >;
  };

  export type BudgetScalarWhereInput = {
    AND?: BudgetScalarWhereInput | BudgetScalarWhereInput[];
    OR?: BudgetScalarWhereInput[];
    NOT?: BudgetScalarWhereInput | BudgetScalarWhereInput[];
    id?: IntFilter<'Budget'> | number;
    userId?: StringFilter<'Budget'> | string;
    proposalId?: IntFilter<'Budget'> | number;
    details?: StringFilter<'Budget'> | string;
    budget?:
      | DecimalFilter<'Budget'>
      | Decimal
      | DecimalJsLike
      | number
      | string;
    createdAt?: DateTimeFilter<'Budget'> | Date | string;
    updatedAt?: DateTimeFilter<'Budget'> | Date | string;
  };

  export type SubServicesCreateWithoutServiceInput = {
    name: string;
    description: string;
    active?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    proposal?: ProposalCreateNestedManyWithoutSubServicesInput;
  };

  export type SubServicesUncheckedCreateWithoutServiceInput = {
    id?: number;
    name: string;
    description: string;
    active?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    proposal?: ProposalUncheckedCreateNestedManyWithoutSubServicesInput;
  };

  export type SubServicesCreateOrConnectWithoutServiceInput = {
    where: SubServicesWhereUniqueInput;
    create: XOR<
      SubServicesCreateWithoutServiceInput,
      SubServicesUncheckedCreateWithoutServiceInput
    >;
  };

  export type SubServicesCreateManyServiceInputEnvelope = {
    data:
      | SubServicesCreateManyServiceInput
      | SubServicesCreateManyServiceInput[];
    skipDuplicates?: boolean;
  };

  export type SubServicesUpsertWithWhereUniqueWithoutServiceInput = {
    where: SubServicesWhereUniqueInput;
    update: XOR<
      SubServicesUpdateWithoutServiceInput,
      SubServicesUncheckedUpdateWithoutServiceInput
    >;
    create: XOR<
      SubServicesCreateWithoutServiceInput,
      SubServicesUncheckedCreateWithoutServiceInput
    >;
  };

  export type SubServicesUpdateWithWhereUniqueWithoutServiceInput = {
    where: SubServicesWhereUniqueInput;
    data: XOR<
      SubServicesUpdateWithoutServiceInput,
      SubServicesUncheckedUpdateWithoutServiceInput
    >;
  };

  export type SubServicesUpdateManyWithWhereWithoutServiceInput = {
    where: SubServicesScalarWhereInput;
    data: XOR<
      SubServicesUpdateManyMutationInput,
      SubServicesUncheckedUpdateManyWithoutServiceInput
    >;
  };

  export type SubServicesScalarWhereInput = {
    AND?: SubServicesScalarWhereInput | SubServicesScalarWhereInput[];
    OR?: SubServicesScalarWhereInput[];
    NOT?: SubServicesScalarWhereInput | SubServicesScalarWhereInput[];
    id?: IntFilter<'SubServices'> | number;
    idService?: IntFilter<'SubServices'> | number;
    name?: StringFilter<'SubServices'> | string;
    description?: StringFilter<'SubServices'> | string;
    active?: BoolFilter<'SubServices'> | boolean;
    createdAt?: DateTimeFilter<'SubServices'> | Date | string;
    updatedAt?: DateTimeFilter<'SubServices'> | Date | string;
  };

  export type ServicesCreateWithoutSubServicesInput = {
    name: string;
    description: string;
    slug: string;
    icon: string;
    active?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type ServicesUncheckedCreateWithoutSubServicesInput = {
    id?: number;
    name: string;
    description: string;
    slug: string;
    icon: string;
    active?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type ServicesCreateOrConnectWithoutSubServicesInput = {
    where: ServicesWhereUniqueInput;
    create: XOR<
      ServicesCreateWithoutSubServicesInput,
      ServicesUncheckedCreateWithoutSubServicesInput
    >;
  };

  export type ProposalCreateWithoutSubServicesInput = {
    type?: $Enums.ProposalHome;
    commune: number;
    address: string;
    serviceDate: Date | string;
    description: string;
    active?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    user: UserCreateNestedOneWithoutProposalInput;
    budget?: BudgetCreateNestedManyWithoutProposalInput;
  };

  export type ProposalUncheckedCreateWithoutSubServicesInput = {
    id?: number;
    userId: string;
    type?: $Enums.ProposalHome;
    commune: number;
    address: string;
    serviceDate: Date | string;
    description: string;
    active?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    budget?: BudgetUncheckedCreateNestedManyWithoutProposalInput;
  };

  export type ProposalCreateOrConnectWithoutSubServicesInput = {
    where: ProposalWhereUniqueInput;
    create: XOR<
      ProposalCreateWithoutSubServicesInput,
      ProposalUncheckedCreateWithoutSubServicesInput
    >;
  };

  export type ProposalCreateManySubServicesInputEnvelope = {
    data:
      | ProposalCreateManySubServicesInput
      | ProposalCreateManySubServicesInput[];
    skipDuplicates?: boolean;
  };

  export type ServicesUpsertWithoutSubServicesInput = {
    update: XOR<
      ServicesUpdateWithoutSubServicesInput,
      ServicesUncheckedUpdateWithoutSubServicesInput
    >;
    create: XOR<
      ServicesCreateWithoutSubServicesInput,
      ServicesUncheckedCreateWithoutSubServicesInput
    >;
    where?: ServicesWhereInput;
  };

  export type ServicesUpdateToOneWithWhereWithoutSubServicesInput = {
    where?: ServicesWhereInput;
    data: XOR<
      ServicesUpdateWithoutSubServicesInput,
      ServicesUncheckedUpdateWithoutSubServicesInput
    >;
  };

  export type ServicesUpdateWithoutSubServicesInput = {
    name?: StringFieldUpdateOperationsInput | string;
    description?: StringFieldUpdateOperationsInput | string;
    slug?: StringFieldUpdateOperationsInput | string;
    icon?: StringFieldUpdateOperationsInput | string;
    active?: BoolFieldUpdateOperationsInput | boolean;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type ServicesUncheckedUpdateWithoutSubServicesInput = {
    id?: IntFieldUpdateOperationsInput | number;
    name?: StringFieldUpdateOperationsInput | string;
    description?: StringFieldUpdateOperationsInput | string;
    slug?: StringFieldUpdateOperationsInput | string;
    icon?: StringFieldUpdateOperationsInput | string;
    active?: BoolFieldUpdateOperationsInput | boolean;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type ProposalUpsertWithWhereUniqueWithoutSubServicesInput = {
    where: ProposalWhereUniqueInput;
    update: XOR<
      ProposalUpdateWithoutSubServicesInput,
      ProposalUncheckedUpdateWithoutSubServicesInput
    >;
    create: XOR<
      ProposalCreateWithoutSubServicesInput,
      ProposalUncheckedCreateWithoutSubServicesInput
    >;
  };

  export type ProposalUpdateWithWhereUniqueWithoutSubServicesInput = {
    where: ProposalWhereUniqueInput;
    data: XOR<
      ProposalUpdateWithoutSubServicesInput,
      ProposalUncheckedUpdateWithoutSubServicesInput
    >;
  };

  export type ProposalUpdateManyWithWhereWithoutSubServicesInput = {
    where: ProposalScalarWhereInput;
    data: XOR<
      ProposalUpdateManyMutationInput,
      ProposalUncheckedUpdateManyWithoutSubServicesInput
    >;
  };

  export type ProposalScalarWhereInput = {
    AND?: ProposalScalarWhereInput | ProposalScalarWhereInput[];
    OR?: ProposalScalarWhereInput[];
    NOT?: ProposalScalarWhereInput | ProposalScalarWhereInput[];
    id?: IntFilter<'Proposal'> | number;
    userId?: StringFilter<'Proposal'> | string;
    serviceId?: IntFilter<'Proposal'> | number;
    type?: EnumProposalHomeFilter<'Proposal'> | $Enums.ProposalHome;
    commune?: IntFilter<'Proposal'> | number;
    address?: StringFilter<'Proposal'> | string;
    serviceDate?: DateTimeFilter<'Proposal'> | Date | string;
    description?: StringFilter<'Proposal'> | string;
    active?: BoolFilter<'Proposal'> | boolean;
    createdAt?: DateTimeFilter<'Proposal'> | Date | string;
    updatedAt?: DateTimeFilter<'Proposal'> | Date | string;
  };

  export type SessionCreateWithoutUserInput = {
    id: string;
    expiresAt: Date | string;
    token: string;
    ipAddress?: string | null;
    userAgent?: string | null;
    createdAt: Date | string;
    updatedAt: Date | string;
  };

  export type SessionUncheckedCreateWithoutUserInput = {
    id: string;
    expiresAt: Date | string;
    token: string;
    ipAddress?: string | null;
    userAgent?: string | null;
    createdAt: Date | string;
    updatedAt: Date | string;
  };

  export type SessionCreateOrConnectWithoutUserInput = {
    where: SessionWhereUniqueInput;
    create: XOR<
      SessionCreateWithoutUserInput,
      SessionUncheckedCreateWithoutUserInput
    >;
  };

  export type SessionCreateManyUserInputEnvelope = {
    data: SessionCreateManyUserInput | SessionCreateManyUserInput[];
    skipDuplicates?: boolean;
  };

  export type AccountCreateWithoutUserInput = {
    id: string;
    accountId: string;
    providerId: string;
    accessToken?: string | null;
    refreshToken?: string | null;
    idToken?: string | null;
    accessTokenExpiresAt?: Date | string | null;
    refreshTokenExpiresAt?: Date | string | null;
    scope?: string | null;
    password?: string | null;
    createdAt: Date | string;
    updatedAt: Date | string;
  };

  export type AccountUncheckedCreateWithoutUserInput = {
    id: string;
    accountId: string;
    providerId: string;
    accessToken?: string | null;
    refreshToken?: string | null;
    idToken?: string | null;
    accessTokenExpiresAt?: Date | string | null;
    refreshTokenExpiresAt?: Date | string | null;
    scope?: string | null;
    password?: string | null;
    createdAt: Date | string;
    updatedAt: Date | string;
  };

  export type AccountCreateOrConnectWithoutUserInput = {
    where: AccountWhereUniqueInput;
    create: XOR<
      AccountCreateWithoutUserInput,
      AccountUncheckedCreateWithoutUserInput
    >;
  };

  export type AccountCreateManyUserInputEnvelope = {
    data: AccountCreateManyUserInput | AccountCreateManyUserInput[];
    skipDuplicates?: boolean;
  };

  export type ProposalCreateWithoutUserInput = {
    type?: $Enums.ProposalHome;
    commune: number;
    address: string;
    serviceDate: Date | string;
    description: string;
    active?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    subServices: SubServicesCreateNestedOneWithoutProposalInput;
    budget?: BudgetCreateNestedManyWithoutProposalInput;
  };

  export type ProposalUncheckedCreateWithoutUserInput = {
    id?: number;
    serviceId: number;
    type?: $Enums.ProposalHome;
    commune: number;
    address: string;
    serviceDate: Date | string;
    description: string;
    active?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    budget?: BudgetUncheckedCreateNestedManyWithoutProposalInput;
  };

  export type ProposalCreateOrConnectWithoutUserInput = {
    where: ProposalWhereUniqueInput;
    create: XOR<
      ProposalCreateWithoutUserInput,
      ProposalUncheckedCreateWithoutUserInput
    >;
  };

  export type ProposalCreateManyUserInputEnvelope = {
    data: ProposalCreateManyUserInput | ProposalCreateManyUserInput[];
    skipDuplicates?: boolean;
  };

  export type BudgetCreateWithoutUserInput = {
    details: string;
    budget: Decimal | DecimalJsLike | number | string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    proposal: ProposalCreateNestedOneWithoutBudgetInput;
  };

  export type BudgetUncheckedCreateWithoutUserInput = {
    id?: number;
    proposalId: number;
    details: string;
    budget: Decimal | DecimalJsLike | number | string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type BudgetCreateOrConnectWithoutUserInput = {
    where: BudgetWhereUniqueInput;
    create: XOR<
      BudgetCreateWithoutUserInput,
      BudgetUncheckedCreateWithoutUserInput
    >;
  };

  export type BudgetCreateManyUserInputEnvelope = {
    data: BudgetCreateManyUserInput | BudgetCreateManyUserInput[];
    skipDuplicates?: boolean;
  };

  export type SessionUpsertWithWhereUniqueWithoutUserInput = {
    where: SessionWhereUniqueInput;
    update: XOR<
      SessionUpdateWithoutUserInput,
      SessionUncheckedUpdateWithoutUserInput
    >;
    create: XOR<
      SessionCreateWithoutUserInput,
      SessionUncheckedCreateWithoutUserInput
    >;
  };

  export type SessionUpdateWithWhereUniqueWithoutUserInput = {
    where: SessionWhereUniqueInput;
    data: XOR<
      SessionUpdateWithoutUserInput,
      SessionUncheckedUpdateWithoutUserInput
    >;
  };

  export type SessionUpdateManyWithWhereWithoutUserInput = {
    where: SessionScalarWhereInput;
    data: XOR<
      SessionUpdateManyMutationInput,
      SessionUncheckedUpdateManyWithoutUserInput
    >;
  };

  export type SessionScalarWhereInput = {
    AND?: SessionScalarWhereInput | SessionScalarWhereInput[];
    OR?: SessionScalarWhereInput[];
    NOT?: SessionScalarWhereInput | SessionScalarWhereInput[];
    id?: StringFilter<'Session'> | string;
    expiresAt?: DateTimeFilter<'Session'> | Date | string;
    token?: StringFilter<'Session'> | string;
    ipAddress?: StringNullableFilter<'Session'> | string | null;
    userAgent?: StringNullableFilter<'Session'> | string | null;
    userId?: StringFilter<'Session'> | string;
    createdAt?: DateTimeFilter<'Session'> | Date | string;
    updatedAt?: DateTimeFilter<'Session'> | Date | string;
  };

  export type AccountUpsertWithWhereUniqueWithoutUserInput = {
    where: AccountWhereUniqueInput;
    update: XOR<
      AccountUpdateWithoutUserInput,
      AccountUncheckedUpdateWithoutUserInput
    >;
    create: XOR<
      AccountCreateWithoutUserInput,
      AccountUncheckedCreateWithoutUserInput
    >;
  };

  export type AccountUpdateWithWhereUniqueWithoutUserInput = {
    where: AccountWhereUniqueInput;
    data: XOR<
      AccountUpdateWithoutUserInput,
      AccountUncheckedUpdateWithoutUserInput
    >;
  };

  export type AccountUpdateManyWithWhereWithoutUserInput = {
    where: AccountScalarWhereInput;
    data: XOR<
      AccountUpdateManyMutationInput,
      AccountUncheckedUpdateManyWithoutUserInput
    >;
  };

  export type AccountScalarWhereInput = {
    AND?: AccountScalarWhereInput | AccountScalarWhereInput[];
    OR?: AccountScalarWhereInput[];
    NOT?: AccountScalarWhereInput | AccountScalarWhereInput[];
    id?: StringFilter<'Account'> | string;
    accountId?: StringFilter<'Account'> | string;
    providerId?: StringFilter<'Account'> | string;
    userId?: StringFilter<'Account'> | string;
    accessToken?: StringNullableFilter<'Account'> | string | null;
    refreshToken?: StringNullableFilter<'Account'> | string | null;
    idToken?: StringNullableFilter<'Account'> | string | null;
    accessTokenExpiresAt?:
      | DateTimeNullableFilter<'Account'>
      | Date
      | string
      | null;
    refreshTokenExpiresAt?:
      | DateTimeNullableFilter<'Account'>
      | Date
      | string
      | null;
    scope?: StringNullableFilter<'Account'> | string | null;
    password?: StringNullableFilter<'Account'> | string | null;
    createdAt?: DateTimeFilter<'Account'> | Date | string;
    updatedAt?: DateTimeFilter<'Account'> | Date | string;
  };

  export type ProposalUpsertWithWhereUniqueWithoutUserInput = {
    where: ProposalWhereUniqueInput;
    update: XOR<
      ProposalUpdateWithoutUserInput,
      ProposalUncheckedUpdateWithoutUserInput
    >;
    create: XOR<
      ProposalCreateWithoutUserInput,
      ProposalUncheckedCreateWithoutUserInput
    >;
  };

  export type ProposalUpdateWithWhereUniqueWithoutUserInput = {
    where: ProposalWhereUniqueInput;
    data: XOR<
      ProposalUpdateWithoutUserInput,
      ProposalUncheckedUpdateWithoutUserInput
    >;
  };

  export type ProposalUpdateManyWithWhereWithoutUserInput = {
    where: ProposalScalarWhereInput;
    data: XOR<
      ProposalUpdateManyMutationInput,
      ProposalUncheckedUpdateManyWithoutUserInput
    >;
  };

  export type BudgetUpsertWithWhereUniqueWithoutUserInput = {
    where: BudgetWhereUniqueInput;
    update: XOR<
      BudgetUpdateWithoutUserInput,
      BudgetUncheckedUpdateWithoutUserInput
    >;
    create: XOR<
      BudgetCreateWithoutUserInput,
      BudgetUncheckedCreateWithoutUserInput
    >;
  };

  export type BudgetUpdateWithWhereUniqueWithoutUserInput = {
    where: BudgetWhereUniqueInput;
    data: XOR<
      BudgetUpdateWithoutUserInput,
      BudgetUncheckedUpdateWithoutUserInput
    >;
  };

  export type BudgetUpdateManyWithWhereWithoutUserInput = {
    where: BudgetScalarWhereInput;
    data: XOR<
      BudgetUpdateManyMutationInput,
      BudgetUncheckedUpdateManyWithoutUserInput
    >;
  };

  export type UserCreateWithoutSessionsInput = {
    id: string;
    name: string;
    email: string;
    phone?: string | null;
    emailVerified: boolean;
    image?: string | null;
    createdAt: Date | string;
    updatedAt: Date | string;
    accounts?: AccountCreateNestedManyWithoutUserInput;
    proposal?: ProposalCreateNestedManyWithoutUserInput;
    budget?: BudgetCreateNestedManyWithoutUserInput;
  };

  export type UserUncheckedCreateWithoutSessionsInput = {
    id: string;
    name: string;
    email: string;
    phone?: string | null;
    emailVerified: boolean;
    image?: string | null;
    createdAt: Date | string;
    updatedAt: Date | string;
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput;
    proposal?: ProposalUncheckedCreateNestedManyWithoutUserInput;
    budget?: BudgetUncheckedCreateNestedManyWithoutUserInput;
  };

  export type UserCreateOrConnectWithoutSessionsInput = {
    where: UserWhereUniqueInput;
    create: XOR<
      UserCreateWithoutSessionsInput,
      UserUncheckedCreateWithoutSessionsInput
    >;
  };

  export type UserUpsertWithoutSessionsInput = {
    update: XOR<
      UserUpdateWithoutSessionsInput,
      UserUncheckedUpdateWithoutSessionsInput
    >;
    create: XOR<
      UserCreateWithoutSessionsInput,
      UserUncheckedCreateWithoutSessionsInput
    >;
    where?: UserWhereInput;
  };

  export type UserUpdateToOneWithWhereWithoutSessionsInput = {
    where?: UserWhereInput;
    data: XOR<
      UserUpdateWithoutSessionsInput,
      UserUncheckedUpdateWithoutSessionsInput
    >;
  };

  export type UserUpdateWithoutSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    phone?: NullableStringFieldUpdateOperationsInput | string | null;
    emailVerified?: BoolFieldUpdateOperationsInput | boolean;
    image?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    accounts?: AccountUpdateManyWithoutUserNestedInput;
    proposal?: ProposalUpdateManyWithoutUserNestedInput;
    budget?: BudgetUpdateManyWithoutUserNestedInput;
  };

  export type UserUncheckedUpdateWithoutSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    phone?: NullableStringFieldUpdateOperationsInput | string | null;
    emailVerified?: BoolFieldUpdateOperationsInput | boolean;
    image?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput;
    proposal?: ProposalUncheckedUpdateManyWithoutUserNestedInput;
    budget?: BudgetUncheckedUpdateManyWithoutUserNestedInput;
  };

  export type UserCreateWithoutAccountsInput = {
    id: string;
    name: string;
    email: string;
    phone?: string | null;
    emailVerified: boolean;
    image?: string | null;
    createdAt: Date | string;
    updatedAt: Date | string;
    sessions?: SessionCreateNestedManyWithoutUserInput;
    proposal?: ProposalCreateNestedManyWithoutUserInput;
    budget?: BudgetCreateNestedManyWithoutUserInput;
  };

  export type UserUncheckedCreateWithoutAccountsInput = {
    id: string;
    name: string;
    email: string;
    phone?: string | null;
    emailVerified: boolean;
    image?: string | null;
    createdAt: Date | string;
    updatedAt: Date | string;
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput;
    proposal?: ProposalUncheckedCreateNestedManyWithoutUserInput;
    budget?: BudgetUncheckedCreateNestedManyWithoutUserInput;
  };

  export type UserCreateOrConnectWithoutAccountsInput = {
    where: UserWhereUniqueInput;
    create: XOR<
      UserCreateWithoutAccountsInput,
      UserUncheckedCreateWithoutAccountsInput
    >;
  };

  export type UserUpsertWithoutAccountsInput = {
    update: XOR<
      UserUpdateWithoutAccountsInput,
      UserUncheckedUpdateWithoutAccountsInput
    >;
    create: XOR<
      UserCreateWithoutAccountsInput,
      UserUncheckedCreateWithoutAccountsInput
    >;
    where?: UserWhereInput;
  };

  export type UserUpdateToOneWithWhereWithoutAccountsInput = {
    where?: UserWhereInput;
    data: XOR<
      UserUpdateWithoutAccountsInput,
      UserUncheckedUpdateWithoutAccountsInput
    >;
  };

  export type UserUpdateWithoutAccountsInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    phone?: NullableStringFieldUpdateOperationsInput | string | null;
    emailVerified?: BoolFieldUpdateOperationsInput | boolean;
    image?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    sessions?: SessionUpdateManyWithoutUserNestedInput;
    proposal?: ProposalUpdateManyWithoutUserNestedInput;
    budget?: BudgetUpdateManyWithoutUserNestedInput;
  };

  export type UserUncheckedUpdateWithoutAccountsInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    phone?: NullableStringFieldUpdateOperationsInput | string | null;
    emailVerified?: BoolFieldUpdateOperationsInput | boolean;
    image?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput;
    proposal?: ProposalUncheckedUpdateManyWithoutUserNestedInput;
    budget?: BudgetUncheckedUpdateManyWithoutUserNestedInput;
  };

  export type BudgetCreateManyProposalInput = {
    id?: number;
    userId: string;
    details: string;
    budget: Decimal | DecimalJsLike | number | string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type BudgetUpdateWithoutProposalInput = {
    details?: StringFieldUpdateOperationsInput | string;
    budget?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    user?: UserUpdateOneRequiredWithoutBudgetNestedInput;
  };

  export type BudgetUncheckedUpdateWithoutProposalInput = {
    id?: IntFieldUpdateOperationsInput | number;
    userId?: StringFieldUpdateOperationsInput | string;
    details?: StringFieldUpdateOperationsInput | string;
    budget?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type BudgetUncheckedUpdateManyWithoutProposalInput = {
    id?: IntFieldUpdateOperationsInput | number;
    userId?: StringFieldUpdateOperationsInput | string;
    details?: StringFieldUpdateOperationsInput | string;
    budget?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type SubServicesCreateManyServiceInput = {
    id?: number;
    name: string;
    description: string;
    active?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type SubServicesUpdateWithoutServiceInput = {
    name?: StringFieldUpdateOperationsInput | string;
    description?: StringFieldUpdateOperationsInput | string;
    active?: BoolFieldUpdateOperationsInput | boolean;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    proposal?: ProposalUpdateManyWithoutSubServicesNestedInput;
  };

  export type SubServicesUncheckedUpdateWithoutServiceInput = {
    id?: IntFieldUpdateOperationsInput | number;
    name?: StringFieldUpdateOperationsInput | string;
    description?: StringFieldUpdateOperationsInput | string;
    active?: BoolFieldUpdateOperationsInput | boolean;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    proposal?: ProposalUncheckedUpdateManyWithoutSubServicesNestedInput;
  };

  export type SubServicesUncheckedUpdateManyWithoutServiceInput = {
    id?: IntFieldUpdateOperationsInput | number;
    name?: StringFieldUpdateOperationsInput | string;
    description?: StringFieldUpdateOperationsInput | string;
    active?: BoolFieldUpdateOperationsInput | boolean;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type ProposalCreateManySubServicesInput = {
    id?: number;
    userId: string;
    type?: $Enums.ProposalHome;
    commune: number;
    address: string;
    serviceDate: Date | string;
    description: string;
    active?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type ProposalUpdateWithoutSubServicesInput = {
    type?: EnumProposalHomeFieldUpdateOperationsInput | $Enums.ProposalHome;
    commune?: IntFieldUpdateOperationsInput | number;
    address?: StringFieldUpdateOperationsInput | string;
    serviceDate?: DateTimeFieldUpdateOperationsInput | Date | string;
    description?: StringFieldUpdateOperationsInput | string;
    active?: BoolFieldUpdateOperationsInput | boolean;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    user?: UserUpdateOneRequiredWithoutProposalNestedInput;
    budget?: BudgetUpdateManyWithoutProposalNestedInput;
  };

  export type ProposalUncheckedUpdateWithoutSubServicesInput = {
    id?: IntFieldUpdateOperationsInput | number;
    userId?: StringFieldUpdateOperationsInput | string;
    type?: EnumProposalHomeFieldUpdateOperationsInput | $Enums.ProposalHome;
    commune?: IntFieldUpdateOperationsInput | number;
    address?: StringFieldUpdateOperationsInput | string;
    serviceDate?: DateTimeFieldUpdateOperationsInput | Date | string;
    description?: StringFieldUpdateOperationsInput | string;
    active?: BoolFieldUpdateOperationsInput | boolean;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    budget?: BudgetUncheckedUpdateManyWithoutProposalNestedInput;
  };

  export type ProposalUncheckedUpdateManyWithoutSubServicesInput = {
    id?: IntFieldUpdateOperationsInput | number;
    userId?: StringFieldUpdateOperationsInput | string;
    type?: EnumProposalHomeFieldUpdateOperationsInput | $Enums.ProposalHome;
    commune?: IntFieldUpdateOperationsInput | number;
    address?: StringFieldUpdateOperationsInput | string;
    serviceDate?: DateTimeFieldUpdateOperationsInput | Date | string;
    description?: StringFieldUpdateOperationsInput | string;
    active?: BoolFieldUpdateOperationsInput | boolean;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type SessionCreateManyUserInput = {
    id: string;
    expiresAt: Date | string;
    token: string;
    ipAddress?: string | null;
    userAgent?: string | null;
    createdAt: Date | string;
    updatedAt: Date | string;
  };

  export type AccountCreateManyUserInput = {
    id: string;
    accountId: string;
    providerId: string;
    accessToken?: string | null;
    refreshToken?: string | null;
    idToken?: string | null;
    accessTokenExpiresAt?: Date | string | null;
    refreshTokenExpiresAt?: Date | string | null;
    scope?: string | null;
    password?: string | null;
    createdAt: Date | string;
    updatedAt: Date | string;
  };

  export type ProposalCreateManyUserInput = {
    id?: number;
    serviceId: number;
    type?: $Enums.ProposalHome;
    commune: number;
    address: string;
    serviceDate: Date | string;
    description: string;
    active?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type BudgetCreateManyUserInput = {
    id?: number;
    proposalId: number;
    details: string;
    budget: Decimal | DecimalJsLike | number | string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type SessionUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string;
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    token?: StringFieldUpdateOperationsInput | string;
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null;
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type SessionUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string;
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    token?: StringFieldUpdateOperationsInput | string;
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null;
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type SessionUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string;
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    token?: StringFieldUpdateOperationsInput | string;
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null;
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type AccountUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string;
    accountId?: StringFieldUpdateOperationsInput | string;
    providerId?: StringFieldUpdateOperationsInput | string;
    accessToken?: NullableStringFieldUpdateOperationsInput | string | null;
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null;
    idToken?: NullableStringFieldUpdateOperationsInput | string | null;
    accessTokenExpiresAt?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
    refreshTokenExpiresAt?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
    scope?: NullableStringFieldUpdateOperationsInput | string | null;
    password?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type AccountUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string;
    accountId?: StringFieldUpdateOperationsInput | string;
    providerId?: StringFieldUpdateOperationsInput | string;
    accessToken?: NullableStringFieldUpdateOperationsInput | string | null;
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null;
    idToken?: NullableStringFieldUpdateOperationsInput | string | null;
    accessTokenExpiresAt?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
    refreshTokenExpiresAt?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
    scope?: NullableStringFieldUpdateOperationsInput | string | null;
    password?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type AccountUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string;
    accountId?: StringFieldUpdateOperationsInput | string;
    providerId?: StringFieldUpdateOperationsInput | string;
    accessToken?: NullableStringFieldUpdateOperationsInput | string | null;
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null;
    idToken?: NullableStringFieldUpdateOperationsInput | string | null;
    accessTokenExpiresAt?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
    refreshTokenExpiresAt?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
    scope?: NullableStringFieldUpdateOperationsInput | string | null;
    password?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type ProposalUpdateWithoutUserInput = {
    type?: EnumProposalHomeFieldUpdateOperationsInput | $Enums.ProposalHome;
    commune?: IntFieldUpdateOperationsInput | number;
    address?: StringFieldUpdateOperationsInput | string;
    serviceDate?: DateTimeFieldUpdateOperationsInput | Date | string;
    description?: StringFieldUpdateOperationsInput | string;
    active?: BoolFieldUpdateOperationsInput | boolean;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    subServices?: SubServicesUpdateOneRequiredWithoutProposalNestedInput;
    budget?: BudgetUpdateManyWithoutProposalNestedInput;
  };

  export type ProposalUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number;
    serviceId?: IntFieldUpdateOperationsInput | number;
    type?: EnumProposalHomeFieldUpdateOperationsInput | $Enums.ProposalHome;
    commune?: IntFieldUpdateOperationsInput | number;
    address?: StringFieldUpdateOperationsInput | string;
    serviceDate?: DateTimeFieldUpdateOperationsInput | Date | string;
    description?: StringFieldUpdateOperationsInput | string;
    active?: BoolFieldUpdateOperationsInput | boolean;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    budget?: BudgetUncheckedUpdateManyWithoutProposalNestedInput;
  };

  export type ProposalUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number;
    serviceId?: IntFieldUpdateOperationsInput | number;
    type?: EnumProposalHomeFieldUpdateOperationsInput | $Enums.ProposalHome;
    commune?: IntFieldUpdateOperationsInput | number;
    address?: StringFieldUpdateOperationsInput | string;
    serviceDate?: DateTimeFieldUpdateOperationsInput | Date | string;
    description?: StringFieldUpdateOperationsInput | string;
    active?: BoolFieldUpdateOperationsInput | boolean;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type BudgetUpdateWithoutUserInput = {
    details?: StringFieldUpdateOperationsInput | string;
    budget?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    proposal?: ProposalUpdateOneRequiredWithoutBudgetNestedInput;
  };

  export type BudgetUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number;
    proposalId?: IntFieldUpdateOperationsInput | number;
    details?: StringFieldUpdateOperationsInput | string;
    budget?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type BudgetUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number;
    proposalId?: IntFieldUpdateOperationsInput | number;
    details?: StringFieldUpdateOperationsInput | string;
    budget?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number;
  };
}
