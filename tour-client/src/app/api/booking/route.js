import { NextResponse } from "next/server";
import { bookTour } from "@/utils/tour-helper";

export async function POST(request) {
  const tourId = await request.json();
  const token = request.cookies.get("jwt").value;

  const res = await bookTour(tourId, token);

  return NextResponse.json(res);
}
