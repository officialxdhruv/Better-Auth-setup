import { Badge } from "@/components/ui/badge";
import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { tags } from "@/lib/data";
import { Search } from "lucide-react";

export default function page() {
    return (
        <div className="container mx-auto py-6 px-4 md:px-0 ">
            <div className="flex flex-col md:flex-row items-startk md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Tags</h1>
                    <p className="text-muted-foreground mt-1">
                        A tag is a Keyword or label that categorizes your
                        question with other, similar questions
                    </p>
                </div>
                <div className="flex items-center gap-2 w-full md:w-auto">
                    <div className="relative flex-1 md:w-64">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="Filter by tag name..."
                            className="pl-8"
                        />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {tags.map((tag) => (
                    <Card
                        key={tag.id}
                        className="flex flex-col justify-between"
                    >
                        <CardHeader>
                            <CardTitle>
                                <Badge
                                    variant="secondary"
                                    className="text-xl "
                                >
                                    {tag.name}
                                </Badge>
                            </CardTitle>
                            <CardDescription>{tag.description}</CardDescription>
                        </CardHeader>
                        <CardFooter className="flex items-center justify-between text-xs text-muted-foreground">
                            <span>{tag.questionsCount} questions</span>
                            <span>{tag.todayCount} asked today</span>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
}
