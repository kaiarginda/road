import { connectMongoDB } from "@/app/mongodb";
import User from "../../models/User";
const bcrypt = require("bcryptjs");
export async function POST(req) {
  await connectMongoDB();
  const { username, password } = await req.json();
  const user = await User.findOne({ username });
  if (user) return Response.json({ status: "err" });
  try {
    // Generate a salt
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);

    // Hash the password using the generated salt
    const hashedPassword = await bcrypt.hash(password, salt);

    await User.create({ username, password: hashedPassword });
    // return hashedPassword;
    return Response.json({ status: "done" });
  } catch (error) {
    throw new Error("Error hashing password");
  }
}
