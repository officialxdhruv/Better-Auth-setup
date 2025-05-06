import { User } from "@/lib/generated/prisma";
import { Card, CardContent } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import FollowButton from "./FollowButton";
import { isFollowing } from "@/actions/userprofile.action";

export default async function UserCard({ follower }: { follower: User }) {
    const isCurrentUserFollowing = await isFollowing(follower.id);

    return (
        <Card>
            <CardContent className="flex justify-between items-center">
                <div className="flex gap-4 items-center">
                    <Avatar className="size-10">
                        <AvatarImage
                            src={follower.image ?? "/avatar.png"}
                            className="select-none bg-black"
                            alt={follower.name}
                        />
                        <AvatarFallback>
                            {follower.name.charAt(0).toUpperCase()}
                        </AvatarFallback>
                    </Avatar>
                    <div>
                        <p className="font-semibold">{follower.name}</p>
                        <p className="text-sm text-gray-500">
                            {follower.email}
                        </p>
                    </div>
                </div>
                <div>
                    <FollowButton
                        isFollowing={isCurrentUserFollowing}
                        userId={follower.id}
                    />
                </div>
            </CardContent>
        </Card>
    );
}
