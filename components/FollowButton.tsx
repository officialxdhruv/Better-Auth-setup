"use client";

import { toggleFollow } from "@/actions/userprofile.action";
import { Button } from "./ui/button";
import { authClient } from "@/lib/auth-client";
import { useState } from "react";
import { toast } from "sonner";

export default function FollowButton({
    userId,
    isFollowing: initialIsFollowing,
}: {
    userId: string;
    isFollowing: boolean;
}) {
    const { data: session, isPending } = authClient.useSession();

    const currentUser = session?.user;
    const [isFollowing, setIsFollowing] = useState(initialIsFollowing);
    const [isUpdatingFollow, setIsUpdatingFollow] = useState(false);
    const handleFollow = async () => {
        if (!currentUser) return;

        try {
            setIsUpdatingFollow(true);
            await toggleFollow(userId);
            setIsFollowing(!isFollowing);
        } catch (error) {
            console.error(error);
            toast.error("Failed to update follow status");
        } finally {
            setIsUpdatingFollow(false);
        }
    };
    const isOwnProfile = currentUser?.id === userId;
    return (
        <>
            {!isOwnProfile && (
                <Button
                    className="w-full"
                    onClick={handleFollow}
                    disabled={isUpdatingFollow}
                    variant={isFollowing ? "outline" : "default"}
                >
                    {isFollowing ? "Unfollow" : "Follow"}
                </Button>
            )}
        </>
    );
}
