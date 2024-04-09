const express = require("express");
const user = require("../model/user");
const router = express.Router();

// Update user profile
router.patch("/profile/:userId", async (req, res) => {
  try {
    await user.updateOne(
      { userId: req.params.userId },
      {
        $set: {
          userEmail: req.body.userEmail,
          userName: req.body.userName,
        },
      }
    );

    // Send the response here
    res.status(200).json({
      message: "Profile updated",
    });
  } catch (err) {
    res.status(401).json({ message: err });
  }
});

// Update password of a user
router.patch("/password/reset", async (req, res) => {
  try {
    const user = await user.findOne({
      userId: req.body.userId,
    });
    if (!user) {
      return res.status(404).send("User Not Found.");
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    await user.updateOne(
      {
        userId: req.body.userId,
      },
      { $set: { password: hashedPassword } }
    );
    res.status(200).send("Password has been successfully reset.");
  } catch (err) {
    res
      .status(500)
      .send("Internal server error. Please try again or contact admin.");
  }
});

// Get all the users info
router.get("/", async (req, res) => {
  try {
    const list = await user.find();
    res.json(list);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
