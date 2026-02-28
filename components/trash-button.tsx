"use client";

import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { trashCourse } from "@/app/actions/landing";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export function TrashButton({ courseId }: { courseId: string }) {
    const [isTrashing, setIsTrashing] = useState(false);

    const handleTrash = async () => {
        setIsTrashing(true);
        const result = await trashCourse(courseId);
        setIsTrashing(false);

        if (result.success) {
            toast.success("Page moved to trash");
        } else {
            toast.error("Failed to move to trash: " + result.error);
        }
    };

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-4 right-4 text-zinc-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 opacity-0 group-hover:opacity-100 transition-all z-10"
                    title="Move to Trash"
                >
                    <Trash2 className="h-4 w-4" />
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Move to Trash?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This will move the landing page to the trash. It will be permanently deleted after 30 days.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        onClick={handleTrash}
                        disabled={isTrashing}
                        className="bg-red-600 hover:bg-red-700 text-white"
                    >
                        {isTrashing ? "Moving..." : "Move to Trash"}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
