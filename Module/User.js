const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  clerkUserId: { type: String, required: true, unique: true },
  goal: { type: Number, default: 3000 }
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User

// user_id
// created_at
// total_volume
// updated_at
// today_volume

// Laiks kad nomest daily_volume - Cron Jobs