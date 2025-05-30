import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

// Get user profile
export async function GET(request: Request) {
  try {
    // Get the session
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    // Get userId from query params
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    
    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }
    
    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db("lifeline");
    
    // Find user profile in the userProfiles collection
    const userProfile = await db.collection("userProfiles").findOne({ 
      userId: userId
    });
    
    if (!userProfile) {
      // If no profile exists yet, return empty object (not an error)
      return NextResponse.json({});
    }
    
    // Return the user profile
    return NextResponse.json(userProfile);
    
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// Update user profile
export async function POST(request: Request) {
  try {
    // Get the session
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    // Get the request body
    const body = await request.json();
    const { userId, name, age, gender, phone, location, medicalCondition, language } = body;
    
    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }
    
    // Ensure the user is updating their own profile
    if (session.user.id !== userId) {
      return NextResponse.json({ error: "Cannot update another user's profile" }, { status: 403 });
    }
    
    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db("lifeline");
    
    // Update the user profile (upsert: create if doesn't exist)
    const result = await db.collection("userProfiles").updateOne(
      { userId: userId },
      { 
        $set: { 
          userId,
          name,
          age,
          gender,
          phone,
          location,
          medicalCondition,
          language, // Add language field
          updatedAt: new Date()
        },
        $setOnInsert: { createdAt: new Date() }
      },
      { upsert: true }
    );
    
    // If the user changed their name, update it in the users collection too
    if (name) {
      try {
        await db.collection("users").updateOne(
          { _id: new ObjectId(userId) },
          { $set: { name } }
        );
      } catch (err) {
        console.error("Error updating user name:", err);
        // Continue execution - this is not a critical error
      }
    }
    
    return NextResponse.json({ 
      success: true,
      message: "Profile updated successfully" 
    });
    
  } catch (error) {
    console.error("Error updating user profile:", error);
    return NextResponse.json({ 
      error: "Internal server error", 
      details: error instanceof Error ? error.message : "Unknown error" 
    }, { status: 500 });
  }
}