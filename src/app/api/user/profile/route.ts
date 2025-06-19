import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth"; 
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    
    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }
    

    const client = await clientPromise;
    const db = client.db("lifeline");

    const userProfile = await db.collection("userProfiles").findOne({
      userId: userId
    });

    if (!userProfile) {
      return NextResponse.json({});
    }
    
    return NextResponse.json(userProfile);
    
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
 
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    

    const body = await request.json();
    const { userId, name, age, gender, phone, location, medicalCondition, language } = body;
    
    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }
    

    if (session.user.id !== userId) {
      return NextResponse.json({ error: "Cannot update another user's profile" }, { status: 403 });
    }
    

    const client = await clientPromise;
    const db = client.db("lifeline");
 
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
          language, 
          updatedAt: new Date()
        },
        $setOnInsert: { createdAt: new Date() }
      },
      { upsert: true }
    );
    
    if (name) {
      await db.collection("users").updateOne(
        { _id: new ObjectId(userId) },
        { $set: { name } }
      );
    }
    
    return NextResponse.json({ 
      success: true,
      message: "Profile updated successfully" 
    });
    
  } catch (error) {
    console.error("Error updating user profile:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}