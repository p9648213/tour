import { forgotPassword } from "@/utils/user-helper";
import { NextResponse } from "next/server";

export async function POST(request) {
  const data = await request.json();
  const res = await forgotPassword(data);

  if (res.status === "success") {
    return NextResponse.json({ status: res.status, message: res.message });
  }

  return NextResponse.json({ status: res.status, message: res.message });
}
