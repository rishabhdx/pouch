import { Button } from "@pouch/ui/components/button";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

export function Navbar() {
  return (
    <nav className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 fixed top-0 z-50 w-full px-4 py-3 border-b border-border translucce">
      <div className="max-w-4xl mx-auto">
        <div className="w-full flex items-center justify-between">
          <div className="text-2xl font-bold">Pouch</div>
          <div>
            <Button className="rounded-full px-8" size="lg" asChild>
              <Link href="/auth/sign-in">
                Login
                <ArrowUpRight className="size-4" aria-hidden="true" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
