import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { getQuestions } from "@/actions/question.action";
import QuestionCard from "./homepage/QuestionCard";

export default async function Questions({ page }: { page: number }) {
    const pageSize = 5;

    const { questions, totalPages, currentPage } = await getQuestions({
        page,
        pageSize,
    });

    const getPaginationRange = () => {
        const delta = 1;
        const range: (number | string)[] = [];

        const left = Math.max(2, page - delta);
        const right = Math.min(totalPages - 1, page + delta);

        range.push(1); // always show first page

        if (left > 2) {
            range.push("ellipsis-left");
        }

        for (let i = left; i <= right; i++) {
            range.push(i);
        }

        if (right < totalPages - 1) {
            range.push("ellipsis-right");
        }

        // only add last page if it's not the same as first or already included
        if (
            totalPages > 1 &&
            totalPages !== 1 &&
            totalPages !== range[range.length - 1]
        ) {
            range.push(totalPages);
        }

        return range;
    };
    const paginationRange = getPaginationRange();

    return (
        <>
            <Pagination>
                <PaginationContent>
                    {page > 1 && (
                        <PaginationItem>
                            <PaginationPrevious
                                href={`?page=${page - 1}`}
                                replace
                                scroll={false}
                            />
                        </PaginationItem>
                    )}

                    {paginationRange.map((item, index) => {
                        if (
                            item === "ellipsis-left" ||
                            item === "ellipsis-right"
                        ) {
                            return (
                                <PaginationItem key={`ellipsis-${index}`}>
                                    <PaginationEllipsis />
                                </PaginationItem>
                            );
                        }

                        return (
                            <PaginationItem key={`page-${item}`}>
                                <PaginationLink
                                    href={`?page=${item}`}
                                    isActive={item === page}
                                    replace
                                    scroll={false}
                                >
                                    {item}
                                </PaginationLink>
                            </PaginationItem>
                        );
                    })}

                    {page < totalPages && (
                        <PaginationItem>
                            <PaginationNext
                                href={`/?page=${page + 1}`}
                                replace
                                scroll={false}
                            />
                        </PaginationItem>
                    )}
                </PaginationContent>
            </Pagination>

            {questions.map((question) => (
                <QuestionCard key={question.id} question={question} />
            ))}
        </>
    );
}
