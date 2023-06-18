import { resetPassword } from "@/utils/user-helper";
import { NextResponse } from "next/server";

export async function POST(request) {
  const data = await request.json();
  const res = await resetPassword(data.formValues, data.token);

  if (res.status === "success") {
    return NextResponse.json({ status: res.status, message: res.message });
  }

  return NextResponse.json({ status: res.status, message: res.message });
}
