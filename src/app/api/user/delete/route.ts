import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import clientPromise from "@/lib/mongodb"
import { ObjectId } from "mongodb"

export async function DELETE(request: Request) {
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

    // Verify the user is deleting their own account
    if (session.user.id !== userId) {
      return NextResponse.json(
        { message: "Unauthorized to delete this account" },
        { status: 403 }
      )
    }

    // Connect to MongoDB using clientPromise
    const client = await clientPromise
    const db = client.db("lifeline")
    
    console.log(`Attempting to delete user with ID: ${userId}`);
    
    // Delete from users collection
    let userDeleted = false;
    
    // Try deleting by ObjectId first
    try {
      const objId = new ObjectId(userId);
      const result = await db.collection("users").deleteOne({ _id: objId });
      if (result.deletedCount > 0) {
        userDeleted = true;
        console.log(`Deleted user with ObjectId: ${userId}`);
      }
    } catch (err) {
      console.log(`Could not delete by ObjectId, trying string ID...`);
    }
    
    // If that didn't work, try string ID
    if (!userDeleted) {
      const result = await db.collection("users").deleteOne({ id: userId });
      if (result.deletedCount > 0) {
        userDeleted = true;
        console.log(`Deleted user with string id: ${userId}`);
      }
    }
    
    // Try by email as last resort
    if (!userDeleted && session.user?.email) {
      const result = await db.collection("users").deleteOne({ email: session.user.email });
      if (result.deletedCount > 0) {
        userDeleted = true;
        console.log(`Deleted user with email: ${session.user.email}`);
      }
    }
    
    if (!userDeleted) {
      console.error(`Failed to delete user: ${userId}`);
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }
    
    try {
      // Delete from accounts collection (OAuth connections)
      await db.collection("accounts").deleteMany({ userId: userId });
      console.log(`Cleaned up accounts for user: ${userId}`);
      
      // Delete from sessions collection
      await db.collection("sessions").deleteMany({ userId: userId });
      console.log(`Cleaned up sessions for user: ${userId}`);

    } catch (err) {
      console.error("Error cleaning up related collections:", err);
      // We'll continue even if cleanup fails
    }

    return NextResponse.json(
      { message: "Account deleted successfully" },
      { status: 200 }
    )
  } catch (error) {
    console.error("Error deleting account:", error)
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    )
  }
}