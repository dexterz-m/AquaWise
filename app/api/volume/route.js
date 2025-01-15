import connectdb from "@/Module/db";
import { NextResponse } from "next/server";
import Log from '@/Module/Log';   // Update this path as necessary
import { auth } from '@clerk/nextjs/server';
import User from '@/Module/User';  // Update this path as necessary

export async function POST(request) {
  await connectdb();

  const data = await request.json();
  const { clerkUserId, volume, target } = data; // Accept the target value from the request

  // If a target value is provided, update the user's goal
  if (target) {
    const user = await User.findOne({ clerkUserId });
    if (user) {
      user.goal = target;  // Update the goal
      await user.save();  // Save the updated goal to the database
    }
  }

  // Log the volume for the user
  await Log.create({ clerkUserId, volume });

  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);
  const endOfDay = new Date();
  endOfDay.setHours(23, 59, 59, 999);

  // Calculate today's volume
  const todayResult = await Log.aggregate([
    { $match: { createdAt: { $gte: startOfDay, $lt: endOfDay }, clerkUserId: clerkUserId } },
    { $group: { _id: null, totalVolume: { $sum: "$volume" } } }
  ]);

  const todayVolume = todayResult[0]?.totalVolume || 0;

  // Calculate total volume
  const totalResult = await Log.aggregate([
    { $match: { clerkUserId: clerkUserId }},
    { $group: { _id: null, totalVolume: { $sum: "$volume" } } }
  ]);

  const totalVolume = totalResult[0]?.totalVolume || 0;

  return NextResponse.json({goal: target, today: todayVolume, total: totalVolume });
}


export async function GET() {
  // Get the userId from Clerk's auth() function
  const { userId } = await auth();

  // If userId is not available, return an unauthorized response
  if (!userId) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  // Connect to the database
  await connectdb();

  // Check if the user exists in the database
  let user = await User.findOne({ clerkUserId: userId });

  // If user doesn't exist, create a new user
  if (!user) {
    user = new User({ clerkUserId: userId });
    await user.save();
  }

  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);
  const endOfDay = new Date();
  endOfDay.setHours(23, 59, 59, 999);

  // Calculate today's volume
  const todayResult = await Log.aggregate([
    { $match: { createdAt: { $gte: startOfDay, $lt: endOfDay }, clerkUserId: userId } },
    { $group: { _id: null, totalVolume: { $sum: "$volume" } } }
  ]);

  const todayVolume = todayResult[0]?.totalVolume || 0;

  // Calculate total volume
  const totalResult = await Log.aggregate([
    { $match: { clerkUserId: userId }},
    { $group: { _id: null, totalVolume: { $sum: "$volume" } } }
  ]);

  const totalVolume = totalResult[0]?.totalVolume || 0;

  // Return the user's goal value, today and total consumption
  return NextResponse.json({
    goal: user.goal, // Include goal value in the response
    today: todayVolume,
    total: totalVolume
  });
}

