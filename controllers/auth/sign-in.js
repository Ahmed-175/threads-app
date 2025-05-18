import User from "../../models/user.model.js";
import bcrypt from "bcrypt";

const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if email and password are provided
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required." });
    }
    // Find the user by email
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res.status(400).json({ message: "Invalid email or password." });
    }

    // Compare the entered password with the hashed password
    const isMatch = await bcrypt.compare(password, existingUser.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password." });
    }

    // You can generate a token here if using JWT (optional)
    // const token = generateToken(existingUser._id);

    // Return success response
    return res.status(200).json({
      message: "Sign-in successful.",
      user: {
        id: existingUser._id,
        name: existingUser.name,
        email: existingUser.email,
      },
      // token, // if using JWT
    });
  } catch (error) {
    console.error("Error during sign-in:", error);
    return res
      .status(500)
      .json({ message: "Server error. Please try again later." });
  }
};

export default signIn;
