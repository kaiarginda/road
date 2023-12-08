import Testimonial from "../../models/Testimonial";
import { connectMongoDB } from "@/app/mongodb";
export async function GET() {
  await connectMongoDB();
  const testimonials = await Testimonial.find();
  return Response.json({ testimonials });
}
