import { connectMongoDB } from "@/app/mongodb";
import User from "../../models/User";
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

export async function POST(req) {
  await connectMongoDB();
  const secretKey = "secret";
  const options = {
    expiresIn: 9999999999, // Token expiration time
  };
  let token = "";
  const { username, password } = await req.json();
  const user = await User.findOne({ username });
  if (!user) return token;
  const payload = { user };
  // Function to compare a password with its hash
  async function comparePassword(password, hashedPassword) {
    try {
      // Compare the provided password with the stored hash
      const match = await bcrypt.compare(password, hashedPassword);

      if (match) {
        token = jwt.sign(payload, secretKey, options);
        return token;
      }
    } catch (error) {
      throw new Error("Error comparing password");
    }
  }

  // Example usage
  await comparePassword(password, user.password)
    .then((isMatch) => {
      if (isMatch) {
        console.log("Password is correct");
      } else {
        console.log("Password is incorrect");
      }
    })
    .catch((error) => {
      console.error(error.message);
    });
  return new Response(token);
}
