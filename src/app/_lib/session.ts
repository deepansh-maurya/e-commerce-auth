"use server";
import jwt, { JwtPayload } from "jsonwebtoken";
import { cookies } from "next/headers";
import client from "../../db/index";

interface User {
  id: number;
  name: string;
  email: string;
}
export async function createSession(user: User) {
  let token = encrypt(user);
  cookies().set("token", token, {
    httpOnly: true,
    secure: true,
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    sameSite: "lax",
    path: "/",
  });
}

function encrypt(user: User) {
  const header = {
    alg: "HS256",
    typ: "JWT",
  };
  const expiresIn = "7d";
  const userData = {
    id: user.id,
    name: user.name,
    email: user.email,
  };
  const secretKey = process.env.JWT_SECRET_KEY;
  let token;
  if (!secretKey) throw new Error("undefined secret");
  token = jwt.sign(userData, secretKey, { header, expiresIn });
  console.log(token);

  return token;
}
interface DecodedToken {
  email: string;
  name: string;
  id: string;
}

export async function verifySession() {
  const token = cookies().get("token")?.value;
  console.log(token);

  let decryptedToken: string | JwtPayload;
  if (token && process.env.JWT_SECRET_KEY)
    decryptedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
  else return { successs: false, message: "unauthorized user" };
  if (typeof decryptedToken === "string" || !("email" in decryptedToken)) {
    return { success: false, message: "unauthorized user" };
  }
  const { email } = decryptedToken as DecodedToken;

  let user;
  if (email) {
    user = await client.user.findUnique({
      where: {
        email: email,
      },
      select: {
        email: true,
        name: true,
      },
    });
  }
  if (!user) {
    return { success: false, message: "unauthorized user" };
  }

  return { success: true, message: "user is authorized", user };
}
