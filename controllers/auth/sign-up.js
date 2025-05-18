import User from "../../models/user.model.js";
import { hashPassword } from "../../utils/bcryptPasswords.js";

const signUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if all required fields are provided
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "This user already exists. You can sign in instead.",
      });
    }

    // Validate password length
    if (password.length < 6) {
      return res.status(400).json({
        message: "Password should be at least 6 characters long.",
      });
    }

    // Hash the password
    const hashedPassword = await hashPassword(password);

    // Create a new user document
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    // Save the user to the database
    await newUser.save();

    // Return success response
    return res.status(201).json({
      message: "User registered successfully.",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.error("Error during sign-up:", error);
    return res
      .status(500)
      .json({ message: "Server error. Please try again later." });
  }
};

export default signUp;
