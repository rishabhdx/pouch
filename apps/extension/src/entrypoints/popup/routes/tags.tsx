import { buttonVariants } from "@pouch/ui/components/button";
import { Checkbox } from "@pouch/ui/components/checkbox";
import { Input } from "@pouch/ui/components/input";
import { Label } from "@pouch/ui/components/label";
import { cn } from "@pouch/ui/lib/utils";
import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { useId } from "react";

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
  const id = useId();

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
      <Input placeholder="Search tags..." className="w-full shrink-0" />
      {/* <Button variant="ghost" className="w-full justify-start shrink-0">
        + Create new collection
      </Button> */}
      {/* <Separator className="w-full" /> */}
      <div className="flex-1 pt-0">
        <div className="flex flex-col space-y-2">
          <div className="flex items-center gap-2">
            {/* <Hash className="size-3 text-muted-foreground" aria-hidden="true" /> */}
            <p className="text-sm text-muted-foreground">
              Select from exising tags
            </p>
          </div>
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

          <div className="grid gap-0">
            <div className="flex items-center gap-2 py-2">
              <Checkbox id={`${id}-1`} />
              <Label htmlFor={`${id}-1`}>React</Label>
            </div>
            <div className="flex items-center gap-2 py-2">
              <Checkbox id={`${id}-2`} />
              <Label htmlFor={`${id}-2`}>Next.js</Label>
            </div>
            <div className="flex items-center gap-2 py-2">
              <Checkbox id={`${id}-3`} />
              <Label htmlFor={`${id}-3`}>Astro</Label>
            </div>
          </div>

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
