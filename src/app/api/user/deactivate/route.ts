import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth";
import clientPromise from "@/lib/mongodb"
import { ObjectId } from "mongodb"

export async function POST(request: Request) {
  try {
    // Verify user is authenticated
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { userId } = body

    if (session.user.id !== userId) {
      return NextResponse.json(
        { message: "Unauthorized to deactivate this account" },
        { status: 403 }
      )
    }

    // Connect to MongoDB using clientPromise
    const client = await clientPromise

    const db = client.db("lifeline")
    
    console.log(`Attempting to deactivate user with ID: ${userId}`);
    
    const usersCollection = db.collection("users");
    
    let user;
    try {
      console.log(`Looking for user with ObjectId: ${userId}`);
      user = await usersCollection.findOne({ _id: new ObjectId(userId) });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      console.log(`ObjectId conversion failed: ${errorMessage}`);
      // If ObjectId conversion fails, try with the string ID
      console.log(`Looking for user with string ID: ${userId}`);
      user = await usersCollection.findOne({ id: userId });
    }
    
    // If still not found, check by email as a fallback
    if (!user && session.user?.email) {
      console.log(`Looking for user with email: ${session.user.email}`);
      user = await usersCollection.findOne({ email: session.user.email });
    }
    
    if (!user) {
      console.error(`User not found: ${userId}`);
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    
    console.log(`Found user with ID: ${user._id}`);
    
    // Update the user to set active status to false
    const updateResult = await usersCollection.updateOne(
      { _id: user._id },
      { 
        $set: { 
          active: false,
          deactivatedAt: new Date()
        }
      }
    );
    
    console.log(`Update result: ${JSON.stringify(updateResult)}`);
    
    if (updateResult.modifiedCount === 0) {
      console.error(`Failed to update user: ${userId}`);
      return NextResponse.json(
        { message: "Failed to deactivate account" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Account deactivated successfully" },
      { status: 200 }
    )
  } catch (error) {
    console.error("Error deactivating account:", error)
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    )
  }
}