"use server";

const { revalidateTag } = require("next/cache");

export async function revalidateCache(tag) {
  try {
    revalidateTag(tag);
    return 1;
  } catch (error) {
    return error.message;
  }
}
