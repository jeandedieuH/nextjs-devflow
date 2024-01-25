"use server";

import User from "@/models/user.model";
import { connectToDatabase } from "../database";
import { GetTopInteractedTagsParams } from "./shared.types";

export async function getTopInteractedTags(params: GetTopInteractedTagsParams) {
  try {
    connectToDatabase();
    const { userId } = params;
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }
    // Find interactions for the user and group by tags...
    return [
      { _id: "1", name: "javascript" },
      { _id: "2", name: "react" },
    ];
  } catch (error) {
    console.error(error);
    throw error;
  }
}
