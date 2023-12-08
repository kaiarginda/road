import User from "../../models/User";
import { connectMongoDB } from "@/app/mongodb";
export async function POST(req) {
  await connectMongoDB();
  const { username } = await req.json();
  const user = await User.findOne({ username });
  if (!user) return Response.json({ status: "fail" });
  return Response.json({ user });
}
