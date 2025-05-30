import { NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '../auth/[...nextauth]/route'

// Create new user
export async function POST(request: Request) {
  try {
    const data = await request.json()
    const { id, name, email } = data
    
    if (!id || !email) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }
    
    const client = await clientPromise
    const db = client.db()
    
    // Check if user already exists
    const existingUser = await db.collection('users').findOne({ email })
    if (existingUser) {
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 400 }
      )
    }
    
    // Create new user
    const result = await db.collection('users').insertOne({
      id,
      name: name || email.split('@')[0],
      email,
      createdAt: new Date(),
      updatedAt: new Date(),
      emailVerified: null,
      role: 'user',
      medicalInfo: {}
    })
    
    return NextResponse.json({ success: true, userId: result.insertedId })
  } catch (error) {
    console.error('Error creating user:', error)
    return NextResponse.json(
      { error: 'Failed to create user' },
      { status: 500 }
    )
  }
}

// Get user data (protected route)
export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }
    
    const client = await clientPromise
    const db = client.db()
    const user = await db.collection('users').findOne({ id: session.user.id })
    
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }
    
    // Remove sensitive data
    const { password, ...userData } = user
    
    return NextResponse.json(userData)
  } catch (error) {
    console.error('Error fetching user:', error)
    return NextResponse.json(
      { error: 'Failed to fetch user data' },
      { status: 500 }
    )
  }
}