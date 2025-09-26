import { buttonVariants } from "@pouch/ui/components/button";
import { Input } from "@pouch/ui/components/input";
import { Label } from "@pouch/ui/components/label";
import { RadioGroup, RadioGroupItem } from "@pouch/ui/components/radio-group";
import { useStore } from "@/lib/store";
import { cn } from "@pouch/ui/lib/utils";
import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { useId } from "react";

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
  const id = useId();
  const collection = useStore(store => store.collection);
  const setCollection = useStore(store => store.setCollection);

  return (
    <div className="w-sm h-96 overflow-y-auto bg-background text-foreground border border-border rounded-md p-4 flex flex-col space-y-4">
      <div className="w-full">
        <Link
          to="/"
          className={cn(buttonVariants({ variant: "ghost", size: "sm" }))}
          // className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          Home
        </Link>
      </div>
      {/* <Separator className="w-full" /> */}
      <Input placeholder="Search collections..." className="w-full shrink-0" />
      {/* <Button variant="ghost" className="w-full justify-start shrink-0">
        + Create new collection
      </Button> */}
      {/* <Separator className="w-full" /> */}
      <div className="flex-1 pt-0">
        <div className="flex flex-col space-y-2">
          {/* <div className="flex items-center gap-2">
            <FolderOpen
              className="size-3 text-muted-foreground"
              aria-hidden="true"
            />
            <p className="text-sm text-muted-foreground">Choose a collection</p>
          </div> */}
          {/* {Array.from({ length: 20 }).map((_, index) => (
          <div key={index} className="mb-2 last:mb-0">
            <Button variant="ghost" className="w-full justify-start">
              Collection {index + 1}
            </Button>
          </div>
        ))} */}

          {/* <RadioGroup defaultValue="comfortable">
          <div className="flex items-center gap-3">
            <RadioGroupItem value="default" id="r1" />
            <Label htmlFor="r1">Default</Label>
          </div>
          <div className="flex items-center gap-3">
            <RadioGroupItem value="comfortable" id="r2" />
            <Label htmlFor="r2">Comfortable</Label>
          </div>
          <div className="flex items-center gap-3">
            <RadioGroupItem value="compact" id="r3" />
            <Label htmlFor="r3">Compact</Label>
          </div>
        </RadioGroup> */}

          <RadioGroup
            className="gap-1"
            value={collection}
            onValueChange={setCollection}
          >
            <div className="relative flex w-full pr-3 items-center gap-2 rounded-lg border border-transparent has-[[data-state=checked]]:border-input has-[[data-state=checked]]:bg-accent">
              <div className="grid grow gap-2">
                <Label htmlFor={`All`} className="px-3 py-2">
                  All
                  {/* <span className="text-xs font-normal leading-[inherit] text-muted-foreground">
                    (Sublabel)
                    </span> */}
                </Label>
                {/* <p
                  id={`${id}-1-description`}
                  className="text-xs text-muted-foreground"
                  >
                  You can use this card with a label and a description.
                  </p> */}
              </div>
              <RadioGroupItem
                value={`All`}
                id={`All`}
                aria-describedby={`All-description`}
                className="order-1 after:absolute after:inset-0"
              />
            </div>
            {Array.from({ length: 10 }).map((_, index) => (
              <div className="relative flex w-full pr-3 items-center gap-2 rounded-lg border border-transparent has-[[data-state=checked]]:border-input has-[[data-state=checked]]:bg-accent">
                <div className="grid grow gap-2">
                  <Label htmlFor={`${id}-${index + 1}`} className="px-3 py-2">
                    Label{" "}
                    {/* <span className="text-xs font-normal leading-[inherit] text-muted-foreground">
                    (Sublabel)
                    </span> */}
                  </Label>
                  {/* <p
                  id={`${id}-1-description`}
                  className="text-xs text-muted-foreground"
                  >
                  You can use this card with a label and a description.
                  </p> */}
                </div>
                <RadioGroupItem
                  value={(index + 1).toString()}
                  id={`${id}-${index + 1}`}
                  aria-describedby={`${id}-${index + 1}-description`}
                  className="order-1 after:absolute after:inset-0"
                />
              </div>
            ))}

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
          </RadioGroup>
        </div>
      </div>
    </div>
  );
}
