import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CalendarDays, Search, User } from "lucide-react";

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/10 bg-background/60 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <img src="./logo.png" alt="EventFlow" className="h-8 w-auto object-contain" />
          <span className="font-bold text-xl tracking-tight">EventFlow</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
          <Link href="/events" className="hover:text-foreground transition-colors">
            Explore
          </Link>
          <Link href="/events/create" className="hover:text-foreground transition-colors">
            Create Event
          </Link>
          <Link href="/contact" className="hover:text-foreground transition-colors">
            Contact
          </Link>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
            <Search className="size-5" />
          </Button>
          
          <div className="h-4 w-px bg-border/50 hidden md:block" />
          
          <div className="flex items-center gap-2">
            <Link href="/login">
              <Button variant="ghost" className="hidden md:inline-flex">
                Log in
              </Button>
            </Link>
            <Link href="/signup">
              <Button className="rounded-full px-6">
                Sign up
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
