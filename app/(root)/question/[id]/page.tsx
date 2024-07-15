import AnswerForm from "@/components/forms/AnswerForm";
import AllAnswers from "@/components/shared/AllAnswers";
import Metric from "@/components/shared/Metric";
import ParseHTML from "@/components/shared/ParseHTML";
import RenderTag from "@/components/shared/RenderTag";
import Voting from "@/components/shared/Voting";
import { getQuestionById } from "@/lib/actions/question.action";
import { getUserById } from "@/lib/actions/user.action";
import { formatNumber, getTimestamp } from "@/lib/utils";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const page = async ({ params, searchParams }) => {
  const result = await getQuestionById({ questionId: params.id });
  const { userId: clerkId } = auth();
  console.log(clerkId);

  let appUser;

  if (clerkId) {
    appUser = await getUserById({ userId: clerkId });
  }

  return (
    <>
      <div className="flex-start w-full flex-col">
        <div className="flex w-full flex-col-reverse justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
          <Link
            href={`/profile/${result.question.author.clerkId}`}
            className="flex items-center justify-start gap-1"
          >
            <Image
              src={result.question.author.picture}
              alt="profile"
              width={22}
              height={22}
              className="rounded-full"
            />
            <p className="paragraph-semibold text-dark300_light700">
              {result.question.author.name}
            </p>
          </Link>
          <div className="flex justify-end">
            <Voting
              type="Question"
              itemId={JSON.stringify(result.question._id)}
              userId={JSON.stringify(appUser?._id)}
              upvotes={result.question.upvotes.length}
              hasupVoted={result.question.upvotes.includes(appUser?._id)}
              downvotes={result.question.downvotes.length}
              hasdownVoted={result.question.downvotes.includes(appUser?._id)}
              hasSaved={appUser?.saved.includes(result.question._id)}
            />
          </div>
        </div>
        <h2 className="h2-bold text-dark200_light900 mt-3.5 w-full text-left">
          {result.question.title}
        </h2>
      </div>
      <div className="mb-8 mt-5 flex flex-wrap gap-4">
        <Metric
          imgUrl="/assets/icons/clock.svg"
          alt="clock icon"
          value={` asked ${getTimestamp(result.question.createdAt)}`}
          title="Asked"
          textStyles="small-medium text-dark400_light800"
        />
        <Metric
          imgUrl="/assets/icons/message.svg"
          alt="message"
          value={result.question.answers.length}
          title="Answers"
          textStyles="small-medium text-dark400_light800"
        />
        <Metric
          imgUrl="/assets/icons/eye.svg"
          alt="eye"
          value={formatNumber(result.question.views)}
          title="Views"
          textStyles="small-medium text-dark400_light800"
        />
      </div>
      <ParseHTML data={result.question.content} />
      <div className="mt-8 flex flex-wrap gap-2 ">
        {result.question.tags.map((tag: any) => (
          <RenderTag
            key={tag._id}
            _id={tag._id}
            name={tag.name}
            showCount={false}
          />
        ))}
      </div>

      <AllAnswers
        questionId={result.question._id}
        userId={appUser._id}
        totalAnswers={result.question.answers.length}
      />

      <AnswerForm
        question={result.question.content}
        questionId={JSON.stringify(result.question._id)}
        authorId={JSON.stringify(appUser._id)}
      />
    </>
  );
};

export default page;
