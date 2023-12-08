const jwt = require("jsonwebtoken");
import User from "../../models/User";
export async function POST(req) {
  const secretKey = "secret";

  // Example JWT token
  const { token } = await req.json(); // Replace with the actual token

  // Verify the token and retrieve details
  let decodedInfo = null;
  jwt.verify(token, secretKey, (error, decoded) => {
    if (error) {
      //   console.error("Token verification failed:", error.message);
      return new Response("error");
      // Handle the error (e.g., unauthorized access)
    } else {
      // Decoded contains the payload of the JWT
      //   console.log("Decoded Token:", decoded);
      decodedInfo = decoded;
      return new Response({ decoded });

      // Example: Access specific details from the payload
    }
  });

  if (decodedInfo) {
    return Response.json(decodedInfo);
  } else {
    return Response("res");
  }
}
