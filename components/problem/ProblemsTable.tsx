"use client";
import { Problem, ProblemSolved, UserRole } from "@prisma/client";
import { useMemo, useState } from "react";
import { Button } from "../ui/button";
import {
  ArrowLeft,
  Edit2,
  Filter,
  Plus,
  Save,
  Search,
  Trash2,
} from "lucide-react";
import Link from "next/link";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "../ui/checkbox";
import { Badge } from "../ui/badge";
import CreatePlaylist from "../playlists/CreatePlaylist";
import { toast } from "sonner";

interface ProblemsTableProps {
  problems:
    | (Problem & {
        problemSolved: ProblemSolved[];
      })[]
    | undefined;
  user: {
    id: string;
    role: UserRole;
  } | null;
}

const difficulties = ["EASY", "MEDIUM", "HARD"];

const ProblemsTable = ({ problems, user }: ProblemsTableProps) => {
  const [search, setSearch] = useState("");
  const [difficulty, setDifficulty] = useState("ALL");
  const [selectedTag, setSelectedTag] = useState("ALL");
  const [currentPage, setCurrentPage] = useState(1);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const allTags = useMemo(() => {
    const tagsSet = new Set<string>();
    if (!Array.isArray(problems)) return [];
    problems.forEach((t) => t.tags?.forEach((tag) => tagsSet.add(tag)));
    return Array.from(tagsSet);
  }, [problems]);

  const filteredProblems = useMemo(() => {
    return (problems || [])
      .filter((problem) =>
        problem.title.toLowerCase().includes(search.toLowerCase()),
      )
      .filter((problem) =>
        difficulty === "ALL" ? true : problem.difficulty === difficulty,
      )
      .filter((problem) =>
        selectedTag === "ALL" ? true : problem.tags?.includes(selectedTag),
      );
  }, [problems, search, difficulty, selectedTag]);

  // pagination
  const itemsPerPage = 10;
  const totalPages = Math.ceil(filteredProblems.length / itemsPerPage);

  const paginationProblems = useMemo(() => {
    const starIndex = (currentPage - 1) * itemsPerPage;
    return filteredProblems.slice(starIndex, starIndex + itemsPerPage);
  }, [filteredProblems, currentPage, itemsPerPage]);

  const getDifficultyColor = (diff: string) => {
    switch (diff) {
      case "EASY":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "MEDIUM":
        return "bg-yellow-50 text-yellow-700 border-yellow-200";
      case "HARD":
        return "bg-red-50 text-red-700 border-red-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  const handleCreatePlaylist = async (data: { name: string; description?: string }) => {
    try {
      const response = await fetch("/api/playlists", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          description: data.description,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setIsCreateModalOpen(false);
        toast("Playlist created successfully");
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      console.error("Error creating playlist:", error);
      toast("Failed to create playlist");
    }
  };

  return (
    <div className="flex flex-col space-y-6 justify-start w-full p-6 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="flex items-center gap-4">
        <Link href={"/"}>
          <Button variant="ghost" size="icon" className="h-10 w-10">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div className="flex-1">
          <h1 className="text-3xl font-bold tracking-tight">Problems</h1>
          <p className="text-muted-foreground">
            Manage and solve your coding challenges
          </p>
        </div>
        <Button 
          className="font-semibold shadow-sm"
          onClick={() => setIsCreateModalOpen(true)}
        >
          <Plus className="mr-2 h-4 w-4" /> Create Playlist
        </Button>
      </div>

      {/* Filters & Actions */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-end border p-4 rounded-xl bg-card shadow-sm">
        <div className="w-full md:w-auto flex-1 flex flex-col gap-2">
          <label className="text-sm font-medium flex items-center gap-2 text-muted-foreground">
            <Filter className="h-4 w-4" /> Filter Problems
          </label>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1 min-w-[200px] max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by title..."
                className="pl-9 h-10"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <Select
              value={difficulty}
              onValueChange={(val) => setDifficulty(val || "ALL")}
            >
              <SelectTrigger className="w-[160px] h-10">
                <SelectValue placeholder="Difficulty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">All Difficulties</SelectItem>
                {difficulties.map((diff) => (
                  <SelectItem key={diff} value={diff}>
                    <span className="capitalize">{diff.toLowerCase()}</span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={selectedTag}
              onValueChange={(val) => setSelectedTag(val || "ALL")}
            >
              <SelectTrigger className="w-[160px] h-10">
                <SelectValue placeholder="Tags" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">All Tags</SelectItem>
                {allTags.map((tag) => (
                  <SelectItem key={tag} value={tag}>
                    {tag}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="border rounded-xl shadow-sm overflow-hidden bg-white">
        <Table>
          <TableHeader className="bg-muted/40">
            <TableRow>
              <TableHead className="w-[50px] text-center">Status</TableHead>
              <TableHead className="w-[40%]">Title</TableHead>
              <TableHead>Tags</TableHead>
              <TableHead className="w-[120px]">Difficulty</TableHead>
              <TableHead className="w-[140px] text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginationProblems.length > 0 ? (
              paginationProblems.map((problem) => {
                const isSolved = problem.problemSolved.length > 0;
                return (
                  <TableRow
                    key={problem.id}
                    className="group hover:bg-muted/30 transition-colors"
                  >
                    <TableCell className="text-center">
                      <Checkbox
                        checked={isSolved}
                        className="data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600"
                      />
                    </TableCell>
                    <TableCell>
                      <Link
                        href={`/problem/${problem.id}`}
                        className="font-medium hover:underline text-base text-foreground/90 group-hover:text-primary transition-colors"
                      >
                        {problem.title}
                      </Link>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1.5">
                        {problem.tags?.slice(0, 3).map((tag, idx) => (
                          <Badge
                            key={idx}
                            variant="secondary"
                            className="text-xs px-2 py-0.5 rounded-md font-normal"
                          >
                            {tag}
                          </Badge>
                        ))}
                        {(problem.tags?.length || 0) > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{problem.tags!.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={`${getDifficultyColor(
                          problem.difficulty,
                        )} font-medium`}
                      >
                        {problem.difficulty}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end items-center gap-1 opacity-100 transition-opacity">
                        {user?.role === "ADMIN" && (
                          <>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-muted-foreground hover:text-destructive"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-muted-foreground hover:text-primary"
                            >
                              <Edit2 className="h-4 w-4" />
                            </Button>
                          </>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 px-2 text-muted-foreground hover:text-primary"
                        >
                          <Save className="h-4 w-4 mr-1.5" />
                          Save
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="h-24 text-center text-muted-foreground"
                >
                  No problems found matching your filters.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-4 py-4 border-t bg-muted/20">
            <div className="text-sm text-muted-foreground">
              Showing{" "}
              <span className="font-medium">
                {(currentPage - 1) * itemsPerPage + 1}
              </span>{" "}
              to{" "}
              <span className="font-medium">
                {Math.min(currentPage * itemsPerPage, filteredProblems.length)}
              </span>{" "}
              of <span className="font-medium">{filteredProblems.length}</span>{" "}
              entries
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="h-8"
              >
                Previous
              </Button>
              <div className="flex items-center gap-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum = i + 1;
                  if (totalPages > 5 && currentPage > 3) {
                    pageNum = currentPage - 2 + i;
                    if (pageNum > totalPages) pageNum = totalPages - (4 - i);
                  }
                  return (
                    <Button
                      key={pageNum}
                      variant={currentPage === pageNum ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCurrentPage(pageNum)}
                      className="h-8 w-8 p-0"
                    >
                      {pageNum}
                    </Button>
                  );
                })}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  setCurrentPage((p) => Math.min(totalPages, p + 1))
                }
                disabled={currentPage === totalPages}
                className="h-8"
              >
                Next
              </Button>
            </div>
          </div>
        )}
        <CreatePlaylist 
          isOpen={isCreateModalOpen} 
          onClose={() => setIsCreateModalOpen(false)} 
          onSubmit={handleCreatePlaylist}
        />
      </div>
    </div>
  );
};

export default ProblemsTable;
