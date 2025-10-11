import { Button, buttonVariants } from "@pouch/ui/components/button";
import { Input } from "@pouch/ui/components/input";
import { Label } from "@pouch/ui/components/label";
import { RadioGroup, RadioGroupItem } from "@pouch/ui/components/radio-group";
import { useStore, type StoreCollectionType } from "@/lib/store";
import { cn } from "@pouch/ui/lib/utils";
import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import { ArrowLeft, LoaderCircle, TriangleAlert } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { fetchCollections } from "@/utils/api";
import { useEffect, useState } from "react";

// type Collection = {
//   name: string;
//   id: string;
//   slug: string;
//   description: string | null;
// };

export const Route = createFileRoute("/collections")({
  component: Collections,
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

function Collections() {
  const collection = useStore(store => store.collection);
  const setCollection = useStore(store => store.setCollection);

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCollections, setFilteredCollections] = useState<
    StoreCollectionType[]
  >([]);

  const { data, isLoading, error } = useQuery<{
    collections: StoreCollectionType[];
  }>({
    queryKey: ["collections"],
    queryFn: fetchCollections,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false
  });

  useEffect(() => {
    handleSearch();
  }, [searchTerm, data]);

  const handleSearch = () => {
    if (data) {
      const filtered = data.collections.filter(collection =>
        collection.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredCollections(filtered);
    }
  };

  const handleRadioChange = (slug: string) => {
    const item = filteredCollections.find(col => col.slug === slug);
    setCollection(item || collection);
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
          Please wait while we're loading your collections data...
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
          We're facing issues loading your collections data. Please try again
          later.
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
    <div className="w-sm h-96 overflow-y-auto bg-background text-foreground border border-border rounded-md p-4 flex flex-col space-y-4">
      <div className="w-full flex items-center justify-between">
        <Link
          to="/"
          className={cn(buttonVariants({ variant: "ghost", size: "sm" }))}
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          Home
        </Link>
        <Button variant="outline" className="" size="sm">
          + New collection
        </Button>
      </div>
      <Input
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        placeholder="Search collections..."
        className="w-full shrink-0"
      />
      {/* <Button variant="ghost" className="w-full justify-start shrink-0">
        + Create new collection
      </Button>
      <Separator className="w-full" /> */}
      <div className="flex-1 pt-0">
        <div className="flex flex-col space-y-2">
          <RadioGroup
            className="gap-1"
            value={collection.slug}
            onValueChange={handleRadioChange}
          >
            {/* <div className="relative flex w-full pr-3 items-center gap-2 rounded-lg border border-transparent has-[[data-state=checked]]:border-input has-[[data-state=checked]]:bg-accent">
              <div className="grid grow gap-2">
                <Label htmlFor={`All`} className="px-3 py-2">
                  All
                  <span className="text-xs font-normal leading-[inherit] text-muted-foreground">
                    (X items)
                    </span>
                </Label>
              </div>
              <RadioGroupItem
                value={`All`}
                id={`All`}
                className="order-1 after:absolute after:inset-0"
              />
            </div> */}
            {filteredCollections.length > 0 ? (
              filteredCollections.map(collection => (
                <div
                  key={collection.id}
                  className="relative flex w-full pr-3 items-center gap-2 rounded-lg border border-transparent has-[[data-state=checked]]:border-input has-[[data-state=checked]]:bg-accent"
                >
                  <div className="grid grow gap-2 px-3 py-2">
                    <Label htmlFor={collection.slug} className="">
                      {collection.name}
                      {/* <span className="text-xs font-normal leading-[inherit] text-muted-foreground">
                    (X items)
                    </span> */}
                    </Label>
                    {collection.description && (
                      <p
                        id={`${collection.slug}-description`}
                        className="text-xs text-muted-foreground truncate"
                      >
                        {collection.description}
                      </p>
                    )}
                  </div>
                  <RadioGroupItem
                    value={collection.slug}
                    id={collection.slug}
                    aria-describedby={`${collection.slug}-description`}
                    className="order-1 after:absolute after:inset-0 aspect-square size-4 rounded-full border border-input shadow-sm shadow-black/5 outline-offset-2 focus-visible:outline-2 focus-visible:outline-ring/70 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                    indicatorIconClassName="fill-background"
                  />
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground px-3 py-2 text-center">
                No collections found.
              </p>
            )}
          </RadioGroup>
        </div>
      </div>
    </div>
  );
}
