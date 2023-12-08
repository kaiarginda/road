import Testimonial from "../../models/Testimonial";

export async function GET() {
  const testimonials = await Testimonial.find();
  return Response.json({ testimonials });
}
