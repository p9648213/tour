import { changePassword } from "@/utils/user-helper";
import { NextResponse } from "next/server";

export async function POST(request) {
  const passwordConfig = await request.json();
  const token = request.cookies.get("jwt").value;

  const res = await changePassword(passwordConfig, token);

  return NextResponse.json(res);
}
