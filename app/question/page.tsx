import { getAllQuestion } from "@/actions/question.action";
import QuestionsPage from "./_components/QuestionsPage";

export default async function page() {
    const quesiton = await getAllQuestion();
    return <QuestionsPage questions={quesiton} />;
}
