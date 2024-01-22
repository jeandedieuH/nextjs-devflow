"use server";

import { connectToDatabase } from "../database";

export async function createQuestion(params: any) {
  // eslint-disable-next-line no-empty
  try {
    connectToDatabase();
  } catch (error) {}
}
