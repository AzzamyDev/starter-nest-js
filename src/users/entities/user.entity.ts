export class User {}

export const UserType = {
    SUPERADMIN: 'Super Admin',
    ADMIN: 'Admin',
    USER: 'User',
    MEMBER: 'Member',
    AGENT: 'Agent'
} as const

export const UpgradeStatus = {
    REVIEWED: 'Ditinjau',
    REJECTED: 'Ditolak',
    APPROVED: 'Disetujui'
} as const

export type Agent = {
    name: string
    siup: string
    npwp: string
}
