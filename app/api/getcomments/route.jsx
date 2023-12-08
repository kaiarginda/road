import Comment from "../../models/Comment";
import { connectMongoDB } from "@/app/mongodb";
export async function GET() {
  await connectMongoDB();
  const allComments = await Comment.find();
  const comments = await Comment.find({ root: "root" });
  return Response.json({ allComments, comments });
}
