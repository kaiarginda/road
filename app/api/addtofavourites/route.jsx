import User from "../../models/User";
import { connectMongoDB } from "@/app/mongodb";
export async function POST(req) {
  await connectMongoDB();

  const { username, postId } = await req.json();
  if (!username) return;
  const user = await User.findOne({ username });
  if (user.favourites.includes(postId)) {
    const favourites = user.favourites;
    favourites.splice(favourites.indexOf(postId), 1);
    await User.findOneAndUpdate(
      {
        username,
      },
      {
        favourites,
      }
    );
  } else {
    const favourites = user.favourites;
    favourites.push(postId);
    await User.findOneAndUpdate(
      {
        username,
      },
      {
        favourites,
      }
    );
  }

  return Response.json({ merani: "nikoloz baratashvili" });
}
