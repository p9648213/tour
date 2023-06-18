import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const pause = (duration) => {
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
};

export async function GET() {
  const cookieStore = cookies();

  cookieStore.set("jwt", "loggedout", {
    expires: 5,
    httpOnly: true,
  });

  return NextResponse.json({ status: "success" });
}
