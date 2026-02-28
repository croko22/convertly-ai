"use client";

import { Button } from "@/components/ui/button";
import { RotateCcw, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { restoreCourse, deleteCourse } from "@/app/actions/landing";
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

export function TrashActions({ courseId, isHardDelete }: { courseId: string, isHardDelete?: boolean }) {
    const [isProcessing, setIsProcessing] = useState(false);

    const handleRestore = async () => {
        setIsProcessing(true);
        const result = await restoreCourse(courseId);
        setIsProcessing(false);

        if (result.success) {
            toast.success("Page restored successfully");
        } else {
            toast.error("Failed to restore page: " + result.error);
        }
    };

    const handleHardDelete = async () => {
        setIsProcessing(true);
        const result = await deleteCourse(courseId);
        setIsProcessing(false);

        if (result.success) {
            toast.success("Page permanently deleted");
        } else {
            toast.error("Failed to delete page: " + result.error);
        }
    };

    if (isHardDelete) {
        return (
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="text-zinc-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-all z-10"
                        title="Delete Permanently"
                        disabled={isProcessing}
                    >
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Delete Permanently?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete the landing page and its associated course data.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleHardDelete}
                            disabled={isProcessing}
                            className="bg-red-600 hover:bg-red-700 text-white"
                        >
                            {isProcessing ? "Deleting..." : "Delete Permanently"}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        );
    }

    return (
        <Button
            variant="ghost"
            size="icon"
            className="text-zinc-400 hover:text-green-500 hover:bg-green-50 dark:hover:bg-green-950/30 transition-all z-10"
            title="Restore Page"
            onClick={handleRestore}
            disabled={isProcessing}
        >
            <RotateCcw className="h-4 w-4" />
        </Button>
    );
}
