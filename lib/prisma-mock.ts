import { PrismaClient } from '@prisma/client'
import { mockDeep, mockReset, DeepMockProxy } from 'vitest-mock-extended'
import { beforeEach, vi } from 'vitest'

// We need to mock the exported prisma instance used in the application.
// For Next.js App Router, it's common to have a global Prisma instance.
// In this project, route handlers directly instantiate the PrismaClient.
// To mock it globally, we will use vitest to mock the @prisma/client module.

vi.mock('@prisma/client', () => {
    return {
        PrismaClient: vi.fn().mockImplementation(() => prismaMock),
    }
})

// We also need to mock @prisma/adapter-pg since it's used in route.ts
vi.mock('@prisma/adapter-pg', () => {
    return {
        PrismaPg: vi.fn(),
    }
})

export const prismaMock = mockDeep<PrismaClient>()

beforeEach(() => {
    mockReset(prismaMock)
})
