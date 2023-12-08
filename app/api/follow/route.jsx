import { connectMongoDB } from "@/app/mongodb";
import User from "../../models/User";
export async function POST(req) {
  await connectMongoDB();
  const { user, loggedUser } = await req.json();
  if (user.followers.includes(loggedUser.username)) {
    const followers = user.followers;
    const following = loggedUser.following;

    followers.splice(followers.indexOf(loggedUser.username), 1);
    following.splice(following.indexOf(user.username), 1);
    await User.findOneAndUpdate(
      { username: user.username },
      {
        followers,
      }
    );

    await User.findOneAndUpdate(
      { username: loggedUser.username },
      {
        following,
      }
    );

    return Response.json({ status: "unfollow", followers });
  } else {
    const followers = [...user.followers, loggedUser.username];
    const following = [...loggedUser.following, user.username];

    await User.findOneAndUpdate(
      { username: user.username },
      {
        followers,
      }
    );

    await User.findOneAndUpdate(
      { username: loggedUser.username },
      {
        following,
      }
    );
    return Response.json({ status: "follow", followers });
  }
}
