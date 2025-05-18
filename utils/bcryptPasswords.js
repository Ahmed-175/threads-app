import bcrypt from "bcrypt";

// Function to hash a plain password using bcrypt
export const hashPassword = async (plainPassword) => {
  try {
    const saltRounds = 10; // Number of salt rounds for hashing
    const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);
    return hashedPassword;
  } catch (error) {
    console.error("Error hashing password:", error);
    throw new Error("Failed to hash password");
  }
};
