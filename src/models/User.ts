import { ObjectId } from 'mongodb'

export interface User {
  _id?: ObjectId
  id: string
  name?: string
  email?: string
  emailVerified?: Date
  password?: string
  image?: string
  role?: 'user' | 'admin'
  createdAt: Date
  updatedAt: Date
  medicalInfo?: {
    age?: number
    height?: number
    weight?: number
    bloodType?: string
    allergies?: string[]
    medications?: string[]
    conditions?: string[]
    emergencyContacts?: {
      name: string
      relationship: string
      phone: string
    }[]
  }
}