import { connectMongoDB } from "@/app/mongodb";
import User from "../../models/User";
export async function POST(req) {
  await connectMongoDB();
  const { username } = await req.json();
  if (!username) return Response.json("np");
  const user = await User.findOne({ username });
  return Response.json({ favourites: user.favourites });
}
