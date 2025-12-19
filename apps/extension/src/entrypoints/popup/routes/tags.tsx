import { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { StoreTagType, useStore } from "@/lib/store";
import { Button, buttonVariants } from "@pouch/ui/components/button";
import { Checkbox } from "@pouch/ui/components/checkbox";
import { Input } from "@pouch/ui/components/input";
import { Label } from "@pouch/ui/components/label";
import { cn } from "@pouch/ui/lib/utils";
import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import { fetchTags, createTag } from "@/utils/api";
import { ArrowLeft, LoaderCircle, TriangleAlert } from "lucide-react";

export const Route = createFileRoute("/tags")({
  component: Tags,
  beforeLoad: async () => {
    const sessionKey = await browser.storage.local.get("session");

    if (Object.keys(sessionKey).length <= 0) {
      console.log("Session key does not exist in local storage");

      throw redirect({
        to: "/welcome"
      });
    }
  }
});

function Tags() {
  const queryClient = useQueryClient();

  const tags = useStore(store => store.tags);
  const setTags = useStore(store => store.setTags);

  // const [enteredTags, setEnteredTags] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredTags, setFilteredTags] = useState<StoreTagType[]>([]);

  const { data, isLoading, error } = useQuery<{
    tags: StoreTagType[];
  }>({
    queryKey: ["tags", "fetchTags"],
    queryFn: fetchTags,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false
  });

  const mutation = useMutation({
    mutationFn: createTag,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["tags"] });
    }
  });

  console.log("Fetched tags data:", data);
  console.log("Tags from store:", tags);
  console.log("Filtered tags:", filteredTags);

  useEffect(() => {
    if (data) {
      // setTags(data.tags);
      setFilteredTags(data.tags);
    }
  }, [data]);

  useEffect(() => {
    handleSearch();
  }, [searchTerm]);

  const handleSearch = () => {
    if (data) {
      if (searchTerm.trim() !== "") {
        const filtered = data.tags.filter(tag =>
          tag.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredTags(filtered);
      } else {
        setFilteredTags(data.tags);
      }
    } else {
      setFilteredTags([]);
    }
  };

  const handleCreateTag = () => {
    if (searchTerm.trim() === "") return;

    const newTag = searchTerm.trim();

    mutation.mutate(newTag);
    setSearchTerm("");
  };

  // Handle loading state
  if (isLoading) {
    return (
      <div className="w-sm h-96 overflow-y-auto bg-background text-foreground border border-border rounded-md p-4 flex flex-col items-center justify-center space-y-2">
        <LoaderCircle
          className="size-6 animate-spin text-muted-foreground"
          aria-hidden="true"
        />
        <p className="text-base font-medium text-center text-muted-foreground">
          Please wait while we're loading your tags data...
        </p>
      </div>
    );
  }

  // Handle error state
  if (error) {
    return (
      <div className="w-sm h-96 overflow-y-auto bg-background border text-foreground border-border rounded-md p-4 flex flex-col items-center justify-center space-y-2">
        <TriangleAlert className="size-6 text-destructive" aria-hidden="true" />
        <p className="text-base font-medium text-center text-destructive">
          We're facing issues loading your tags data. Please try again later.
        </p>
        <Link
          to="/"
          className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          Home
        </Link>
      </div>
    );
  }

  return (
    <div className="w-sm h-96 overflow-hidden bg-background text-foreground border border-border rounded-md p-4 flex flex-col space-y-4">
      <div className="w-full flex items-center justify-between">
        <Link
          to="/"
          className={cn(buttonVariants({ variant: "ghost", size: "sm" }))}
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          Home
        </Link>
        {/* <Link
          className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
          to="/new-tag"
        >
          Create new tag
        </Link> */}
      </div>
      {/* <Separator className="w-full" /> */}
      <Input
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        placeholder="Search tags..."
        className="w-full shrink-0"
      />
      {/* <Separator className="w-full" /> */}
      <div
        className={cn(
          "flex-1 pt-0 overflow-y-auto max-h-full",
          "[&::-webkit-scrollbar]:w-1.5",
          "[&::-webkit-scrollbar-track]:bg-background [&::-webkit-scrollbar-track]:rounded-full",
          "[&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-muted-foreground/25 hover:[&::-webkit-scrollbar-thumb]:bg-muted-foreground/50"
        )}
      >
        <div className="flex flex-col space-y-2">
          <div className="flex items-center gap-2">
            {/* <Hash className="size-3 text-muted-foreground" aria-hidden="true" /> */}
            <p className="text-sm text-muted-foreground">
              Select from exising tags
            </p>
          </div>

          {filteredTags.length === 0 && searchTerm.trim() !== "" && (
            <div className="flex flex-col items-center justify-center gap-1 bg-background/50 p-4 rounded-md border border-dashed border-border">
              <p className="text-sm text-muted-foreground text-center">
                No results found.
              </p>
              <Button
                size="sm"
                variant="outline"
                className="w-fit mt-2"
                onClick={handleCreateTag}
              >
                Create tag "{searchTerm}"
              </Button>
            </div>
          )}

          {filteredTags.length === 0 && searchTerm.trim() === "" && (
            <div className="grid gap-0 bg-background/50 p-4 rounded-md border border-dashed border-border">
              <p className="text-sm text-muted-foreground text-center">
                No tags found. Try adjusting your search or create new tags.
              </p>
            </div>
          )}

          {filteredTags.length > 0 && (
            <div className="grid gap-0">
              {filteredTags.map(tag => (
                <div key={tag.id} className="flex items-center gap-2 py-2">
                  <Checkbox
                    id={`${tag.id}-${tag.slug}`}
                    checked={tags.some(t => t.id === tag.id)}
                    onCheckedChange={checked => {
                      if (checked) {
                        setTags([...tags, tag]);
                      } else {
                        setTags(tags.filter(t => t.id !== tag.id));
                      }
                    }}
                    // value={tag.id}
                    // onChange={e => console.log(e.target.value)}
                  />
                  <Label htmlFor={`${tag.id}-${tag.slug}`}>{tag.name}</Label>
                </div>
              ))}
            </div>
          )}

          {/* {!filteredTags || filteredTags.length === 0 ? (
            <div className="grid gap-0 bg-background/50 p-4 rounded-md border border-dashed border-border">
              <p className="text-sm text-muted-foreground text-center">
                No tags found. Try adjusting your search or create new tags.
              </p>
            </div>
          ) : (
            <div className="grid gap-0">
              {filteredTags.map(tag => (
                <div key={tag} className="flex items-center gap-2 py-2">
                  <Checkbox id={`${id}-${tag}`} />
                  <Label htmlFor={`${id}-${tag}`}>{tag}</Label>
                </div>
              ))}
            </div>
          )} */}

          {/* <div className="grid gap-0">
            {filteredTags.map(tag => (
              <div key={tag} className="flex items-center gap-2 py-2">
                <Checkbox id={`${id}-${tag}`} />
                <Label htmlFor={`${id}-${tag}`}>{tag}</Label>
              </div>
            ))}
          </div> */}

          {/* <div className="relative flex w-full items-start gap-2 rounded-lg border border-input p-4 shadow-sm shadow-black/5 has-[[data-state=checked]]:border-ring">
              <RadioGroupItem
                value="2"
                id={`${id}-2`}
                aria-describedby={`${id}-2-description`}
                className="order-1 after:absolute after:inset-0"
              />
              <div className="grid grow gap-2">
                <Label htmlFor={`${id}-2`}>
                  Label
                </Label>
              </div>
            </div> */}
        </div>
      </div>
    </div>
  );
}
