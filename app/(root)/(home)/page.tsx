import QuestionCard from "@/components/cards/QuestionCard";
import HomeFilters from "@/components/home/HomeFilters";
import Filter from "@/components/shared/Filter";
import NoResults from "@/components/shared/NoResults";
import LocalSearchBar from "@/components/shared/search/LocalSearchBar";
import { Button } from "@/components/ui/button";
import { HomePageFilters } from "@/constants/filters";
import Link from "next/link";

const questions = [
  {
    _id: "1",
    title: "How to create a new project in Next.js 13?",
    tags: [
      { _id: "1", name: "Next.js" },
      { _id: "2", name: "React" },
    ],
    author: { _id: "1", name: "Hagen", picture: "" },
    answers: [],
    views: 212775,
    upvotes: 10,
    createdAt: new Date("2023-05-01"),
  },
  {
    _id: "2",
    title: "Redux Toolkit Not Updating State as Expected",
    tags: [
      { _id: "1", name: "Redux" },
      { _id: "2", name: "React" },
    ],
    author: { _id: "2", name: "James", picture: "" },
    answers: [],
    views: 50,
    upvotes: 4,
    createdAt: new Date("2022-01-01"),
  },
  {
    _id: "3",
    title: "How to Perfectly Center a Div with Tailwind CSS?",
    tags: [
      { _id: "1", name: "Tailwindcss" },
      { _id: "2", name: "ReactJS" },
      { _id: "3", name: "css" },
    ],
    author: { _id: "3", name: "Fabiola", picture: "" },
    answers: [],
    views: 25,
    upvotes: 9,
    createdAt: new Date("2023-12-16"),
  },
  {
    _id: "4",
    title: "How center an element in Tailwind CSS?",
    tags: [
      { _id: "1", name: "Tailwindcss" },
      { _id: "2", name: "css" },
    ],
    author: { _id: "1", name: "Kalisa", picture: "" },
    answers: [],
    views: 5,
    upvotes: 1,
    createdAt: new Date("2024-01-20"),
  },
];

export default function Home() {
  return (
    <>
      <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">All Questions</h1>
        <Link href="/ask-question" className="flex justify-end max-sm:w-full">
          <Button className="primary-gradient min-h-[46px] px-4 py-3 !text-light-900">
            Ask a Question
          </Button>
        </Link>
      </div>
      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearchBar
          route="/"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search for questions"
          otherClasses="flex-1"
        />
        <Filter
          filters={HomePageFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
          containerClasses="hidden max-md:flex"
        />
      </div>
      <HomeFilters />
      <div className="mt-10 flex w-full flex-col gap-6">
        {questions.length > 0 ? (
          questions.map((question) => (
            <QuestionCard
              key={question._id}
              _id={question._id}
              title={question.title}
              tags={question.tags}
              author={question.author}
              answers={question.answers}
              views={question.views}
              upvotes={question.upvotes}
              createdAt={question.createdAt}
            />
          ))
        ) : (
          <NoResults
            title="No questions found"
            description="Be the first to break the silence! 🚀 Ask a Question and kickstart the discussion. our query could be the next big thing others learn from. Get involved! 💡"
            link="/ask-question"
            linkTitle="Ask a Question"
          />
        )}
      </div>
    </>
  );
}
