const express = require('express');
const User = require('../models/User'); // Adjust the path as necessary
const router = express.Router();

// Route to create or find a user
router.post('/users', async (req, res) => {
  try {
    const { clerkUserId } = req.body;
    let user = await User.findOne({ clerkUserId });
    if (!user) {
      user = new User({ clerkUserId });
      await user.save();
    }
    res.status(201).json(user);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).send('Server error');
  }
});

// Route to update the water counter
router.put('/users/water-counter', async (req, res) => {
  try {
    const { clerkUserId, incrementBy } = req.body;
    const user = await User.findOneAndUpdate(
      { clerkUserId },
      { $inc: { waterCounter: incrementBy } },
      { new: true }
    );
    if (!user) return res.status(404).send('User not found');
    res.json(user);
  } catch (error) {
    console.error('Error updating water counter:', error);
    res.status(500).send('Server error');
  }
});

// Route to get user data
router.get('/users/:id', async (req, res) => {
  try {
    const user = await User.findOne({ clerkUserId: req.params.id });
    if (!user) return res.status(404).send('User not found');
    res.json(user);
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).send('Server error');
  }
});

router.get('/leaderboard', async (req, res) => {
  try {
    const leaderboard = await User.aggregate([
      {
        $project: {
          username: 1,
          waterCounter: 1,
          totalWater: { $sum: "$waterCounter" }
        }
      },
      { $sort: { totalWater: -1 } },
      { $limit: 10 }
    ]);

    res.json(leaderboard);
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    res.status(500).send('Server error');
  }
});

module.exports = router;