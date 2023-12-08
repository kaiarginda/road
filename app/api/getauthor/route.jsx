import User from "../../models/User";
import { connectMongoDB } from "@/app/mongodb";
export async function POST(req) {
  const { id } = await req.json();
  const user = await User.findOne({ _id: id });

  return Response.json({ owner: user.username });
}
