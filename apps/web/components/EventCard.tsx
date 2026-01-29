import Link from "next/link";
import { CalendarDays, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EventCardProps {
  title: string;
  date: string;
  location: string;
  image: string;
  category: string;
  price: string;
}

export function EventCard({ title, date, location, image, category, price }: EventCardProps) {
  return (
    <div className="group relative rounded-xl border border-white/10 bg-white/[0.04] hover:bg-white/[0.06] overflow-hidden transition-all duration-300 hover:border-white/20 hover:shadow-xl hover:shadow-black/20 hover:-translate-y-1">
      {/* Image */}
      <div className="aspect-[4/3] w-full overflow-hidden bg-muted">
        <div 
          className="h-full w-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
          style={{ backgroundImage: `url(${image})` }}
        />
        <div className="absolute top-3 left-3 rounded-full bg-black/60 backdrop-blur-md px-3 py-1 text-xs font-medium text-white border border-white/10">
          {category}
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="line-clamp-1 text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
              {title}
            </h3>
            <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
              <CalendarDays className="size-4" />
              <span>{date}</span>
            </div>
            <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="size-4" />
              <span>{location}</span>
            </div>
          </div>
          <div className="flex flex-col items-end gap-1">
             <span className="font-semibold text-foreground">{price}</span>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-border/40 flex items-center justify-between">
           <Link href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
             View Details
           </Link>
           <Button size="sm" variant="secondary" className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
             Get Ticket
           </Button>
        </div>
      </div>
    </div>
  );
}
