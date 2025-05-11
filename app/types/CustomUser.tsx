export interface User {
  id: number
  email: string
  passwordHash: string
  fullName?: string
  role: "OWNER" | "MEMBER" | "GUEST"
  createdAt: string
}

export interface NewUser {
  email: string
  password: string
  fullName?: string
}
