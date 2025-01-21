import connectdb from "@/Module/db"; // Update the import path as necessary
import User from "@/Module/User"; // Update the import path as necessary
import { clerkClient } from '@clerk/nextjs/server'; // Import Clerk's server-side client
import Log from "@/Module/Log"; // Update the import path as necessary

export async function GET(req) {
  try {
    await connectdb(); // Connect to the database

    // Step 1: Aggregate the total volume of water consumed by each user
    const leaderboard = await Log.aggregate([
      {
        $group: {
          _id: "$clerkUserId", // Group by clerkUserId
          totalVolume: { $sum: "$volume" } // Sum the volume for each user
        }
      },
      { $sort: { totalVolume: -1 } }, // Sort by total volume in descending order
      { $limit: 10 } // Limit to top 10 users
    ]);

    // Step 2: Fetch usernames from Clerk using the clerkUserId
    const leaderboardWithUsernames = await Promise.all(leaderboard.map(async (user) => {
      const clerkUserId = user._id;

      // Fetch user details from Clerk
      const client = await clerkClient()

    const clerkUser = await client.users.getUser(clerkUserId)

      return {
        username: clerkUser.username, // Get the username from Clerk
        totalWater: user.totalVolume, // Total volume from the Log aggregation
        clerkUserId, // Clerk's user ID for reference
      };
    }));

    return new Response(JSON.stringify(leaderboardWithUsernames), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    return new Response(JSON.stringify({ error: 'Server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
