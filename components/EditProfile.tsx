"use client";

import { useState } from "react";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { UserProfileType } from "@/lib/types";
import { EditIcon } from "lucide-react";
import { toast } from "sonner";
import { toggleFollow, updateProfile } from "@/actions/userprofile.action";
import { authClient } from "@/lib/auth-client";

type EditProfileProps = {
    user: UserProfileType;
    isFollowing: boolean;
};

export default function EditProfile({
    user,
    isFollowing: initialIsFollowing,
}: EditProfileProps) {
    const { data: session, isPending } = authClient.useSession();

    const currentUser = session?.user;

    const [showEditDialog, setShowEditDialog] = useState(false);
    const [isFollowing, setIsFollowing] = useState(initialIsFollowing);
    const [isUpdatingFollow, setIsUpdatingFollow] = useState(false);

    const [editForm, setEditForm] = useState({
        name: user.name || "",
        username: user.username || "",
        bio: user.bio || "",
        location: user.location || "",
        website: user.website || "",
    });

    const handleEditSubmit = async () => {
        const formData = new FormData();
        Object.entries(editForm).forEach(([key, value]) => {
            formData.append(key, value);
        });

        const result = await updateProfile(formData);
        if (result.success) {
            setShowEditDialog(false);
            toast.success("Profile updated successfully");
        }
    };

    const handleFollow = async () => {
        if (!currentUser) return;

        try {
            setIsUpdatingFollow(true);
            await toggleFollow(user.id);
            setIsFollowing(!isFollowing);
        } catch (error) {
            console.error(error);
            toast.error("Failed to update follow status");
        } finally {
            setIsUpdatingFollow(false);
        }
    };

    const isOwnProfile = currentUser?.id === user.id;

    return (
        <>
            {isOwnProfile ? (
                <Button
                    className="w-full mt-4"
                    onClick={() => setShowEditDialog(true)}
                >
                    <EditIcon className="size-4 mr-2" />
                    Edit Profile
                </Button>
            ) : (
                <Button
                    className="w-full mt-4"
                    onClick={handleFollow}
                    disabled={isUpdatingFollow}
                    variant={isFollowing ? "outline" : "default"}
                >
                    {isFollowing ? "Unfollow" : "Follow"}
                </Button>
            )}
            <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
                <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                        <DialogTitle>Edit Profile</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <div className="space-y-2">
                            <Label>Name</Label>
                            <Input
                                name="name"
                                value={editForm.name}
                                onChange={(e) =>
                                    setEditForm({
                                        ...editForm,
                                        name: e.target.value,
                                    })
                                }
                                placeholder="Your name"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Username</Label>
                            <Input
                                name="username"
                                value={editForm.username}
                                onChange={(e) =>
                                    setEditForm({
                                        ...editForm,
                                        username: e.target.value,
                                    })
                                }
                                placeholder="Add username"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Bio</Label>
                            <Textarea
                                name="bio"
                                value={editForm.bio}
                                onChange={(e) =>
                                    setEditForm({
                                        ...editForm,
                                        bio: e.target.value,
                                    })
                                }
                                className="min-h-[100px]"
                                placeholder="Tell us about yourself"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Location</Label>
                            <Input
                                name="location"
                                value={editForm.location}
                                onChange={(e) =>
                                    setEditForm({
                                        ...editForm,
                                        location: e.target.value,
                                    })
                                }
                                placeholder="Where are you based?"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Website</Label>
                            <Input
                                name="website"
                                value={editForm.website}
                                onChange={(e) =>
                                    setEditForm({
                                        ...editForm,
                                        website: e.target.value,
                                    })
                                }
                                placeholder="Your personal website"
                            />
                        </div>
                    </div>
                    <div className="flex justify-end gap-3">
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button onClick={handleEditSubmit}>Save Changes</Button>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}
