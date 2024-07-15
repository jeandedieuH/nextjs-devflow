import { getUserQuestions } from "@/lib/actions/user.action";
import { SearchParamsProps } from "@/types";
import QuestionCard from "../cards/QuestionCard";

interface Props extends SearchParamsProps {
  userId: string;
  clerkId?: string | null;
}

const QuestionTab = async ({ searchProps, userId, clerkId }: Props) => {
  const result = await getUserQuestions({ userId, page: 1 });
  return (
    <>
      {result.questions.map((item) => (
        <QuestionCard
          key={item._id}
          _id={item._id}
          clerkId={clerkId}
          title={item.title}
          tags={item.tags}
          author={item.author}
          answers={item.answers}
          views={item.views}
          upvotes={item.upvotes}
          createdAt={item.createdAt}
        />
      ))}
    </>
  );
};

export default QuestionTab;
