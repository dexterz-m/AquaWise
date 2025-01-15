const mongoose = require("mongoose");

const logSchema = new mongoose.Schema({
  clerkUserId: { type: String, required: true},
  createdAt: {type: Date, required: true, default: Date()},
  volume: { type: Number, default: 0}
});

const Log = mongoose.models.Log || mongoose.model('Log', logSchema);


export default Log