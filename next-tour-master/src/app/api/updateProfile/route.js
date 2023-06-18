import { updateUser } from "@/utils/user-helper";
import { NextResponse } from "next/server";

export async function POST(request) {
  const formData = await request.formData();
  const token = request.cookies.get("jwt").value;

  const res = await updateUser(formData, token);

  return NextResponse.json(res);
}
