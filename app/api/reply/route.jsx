import { connectMongoDB } from "@/app/mongodb";
import Comment from "../../models/Comment";
export async function POST(req) {
  await connectMongoDB();
  const body = await req.json();
  await Comment.create({
    text: body.reply,
    parentId: body.parentId,
    productId: body.productId,
    author: body.author,
  });
}
