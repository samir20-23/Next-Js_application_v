import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { dbConnect, UserModel } from "@/lib/mongodb";

export async function POST(req: Request) {
  await dbConnect();
  const { email, password } = await req.json();
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new UserModel({ email, password: hashedPassword });
  await newUser.save();

  return NextResponse.json({ message: "User created successfully" });
}
