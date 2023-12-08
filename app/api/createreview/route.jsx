import Testimonial from "../../models/Testimonial";

export async function POST(req) {
  const { text, author } = await req.json();
  //   console.log(text, author);
  await Testimonial.create({ text, author: author.username });
  return Response.json({ status: "success" });
}
