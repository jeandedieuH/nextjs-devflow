"use server";

import Question from "@/models/question.model";
import { connectToDatabase } from "../database";
import { ViewQuestionParams } from "./shared.types";
import Interaction from "@/models/interaction.model";

export async function viewQuestion(params: ViewQuestionParams) {
  try {
    connectToDatabase();
    const { questionId, userId } = params;

    // update view count for the question
    await Question.findByIdAndUpdate(
      questionId,
      { $inc: { views: 1 } },
      { new: true },
    );

    if (userId) {
      const existingInteraction = await Interaction.findOne({
        user: userId,
        action: "view",
        question: questionId,
      });

      if (existingInteraction) return console.log("User has already viewed.");

      // create new interaction
      await Interaction.create({
        user: userId,
        action: "view",
        question: questionId,
      });
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}
