"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import * as z from "zod";
const playlistSchema = z.object({
  name: z.string().min(1, "Name is required").max(50, "Name is too long"),
  description: z.string().max(500, "Description is too long").optional(),
});

type PlaylistFormData = z.infer<typeof playlistSchema>;

interface CreatePlaylistProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: PlaylistFormData) => void;
}

const CreatePlaylist = ({ isOpen, onClose, onSubmit }: CreatePlaylistProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PlaylistFormData>({
    resolver: zodResolver(playlistSchema),
  });
  const handleFormSubmit = async (data: PlaylistFormData) => {
    try {
      setIsLoading(true);
      await onSubmit(data);
      reset();
      onClose();
    } catch (error) {
      console.error("Error creating playlist:", error);
      toast.error("Failed to create playlist");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[450px] p-6 md:p-8">
        <DialogHeader className="mb-4">
          <DialogTitle className="text-2xl font-bold">Create New Playlist</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Organize your favorite problems into a custom playlist for easier access.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
          <div className="grid gap-2">
            <Label htmlFor="name" className="text-sm font-semibold">
              Playlist Name
            </Label>
            <Input
              id="name"
              {...register("name")}
              placeholder="e.g., Blind 75, Dynamic Programming"
              className="mt-1"
            />
            {errors.name && (
              <p className="text-sm font-medium text-red-500">{errors.name.message}</p>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="description" className="text-sm font-semibold">
              Description (Optional)
            </Label>
            <Textarea
              id="description"
              {...register("description")}
              placeholder="Describe the purpose of this playlist..."
              className="mt-1 min-h-[100px] resize-none"
            />
            {errors.description && (
              <p className="text-sm font-medium text-red-500">
                {errors.description.message}
              </p>
            )}
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isLoading}
              className="px-6"
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading} className="px-6">
              {isLoading ? "Creating..." : "Create Playlist"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePlaylist;
