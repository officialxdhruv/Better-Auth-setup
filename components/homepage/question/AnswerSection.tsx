import { Button } from "@/components/ui/button";
import { AnswersType } from "@/lib/types";
import PostAnswer from "./PostAnswer";
import Answer from "./Answer";

type AnswerSectionProps = {
    questionId: string;
    answers: AnswersType;
};

export default async function AnswerSection({
    questionId,
    answers,
}: AnswerSectionProps) {
    return (
        <div className="mt-4">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-semibold">Answer</h2>
                <div className="flex gap-2">
                    <Button variant="outline">Highest Score</Button>
                    <Button variant="ghost">Newest</Button>
                </div>
            </div>

            <div className="space-y-6 divide-y-2">
                {answers.map((answer) => (
                    <Answer key={answer.id} answer={answer} />
                ))}
            </div>

            <PostAnswer questionId={questionId} />
        </div>
    );
}
