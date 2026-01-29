import { Button } from "@/components/ui/button";
import { EventCard } from "@/components/EventCard";
import { Search, SlidersHorizontal, MapPin, CalendarDays, ChevronDown } from "lucide-react";

export default function EventsPage() {
  // Mock data for events
  const allEvents = [
    {
      title: "Tech Conference 2024",
      date: "Mar 15, 2024",
      location: "San Francisco, CA",
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=800",
      category: "Technology",
      price: "$299"
    },
    {
      title: "Design Leadership Summit",
      date: "Apr 02, 2024",
      location: "New York, NY",
      image: "https://images.unsplash.com/photo-1591115765373-5207764f72e7?auto=format&fit=crop&q=80&w=800",
      category: "Design",
      price: "$149"
    },
    {
      title: "Startup Networking Night",
      date: "Mar 28, 2024",
      location: "Austin, TX",
      image: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=800",
      category: "Networking",
      price: "Free"
    },
    {
      title: "Music Festival 2024",
      date: "May 20, 2024",
      location: "Indio, CA",
      image: "https://images.unsplash.com/photo-1459749411177-046f521c0855?auto=format&fit=crop&q=80&w=800",
      category: "Music",
      price: "$349"
    },
    {
      title: "Art Gallery Opening",
      date: "Apr 10, 2024",
      location: "Miami, FL",
      image: "https://images.unsplash.com/photo-1536924940846-227afb31e2a5?auto=format&fit=crop&q=80&w=800",
      category: "Art",
      price: "Free"
    },
    {
      title: "Comedy Special Live",
      date: "Apr 15, 2024",
      location: "Chicago, IL",
      image: "https://images.unsplash.com/photo-1585699324551-f6c309eedeca?auto=format&fit=crop&q=80&w=800",
      category: "Comedy",
      price: "$45"
    }
  ];

  const filters = ["All", "Technology", "Design", "Music", "Art", "Business", "Sports"];

  return (
    <div className="min-h-screen bg-background text-foreground pt-24 pb-20">
      {/* Header & Search */}
      <section className="container mx-auto px-4 mb-16">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-10">
          <div className="space-y-2">
             <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Explore Events</h1>
             <p className="text-muted-foreground text-lg max-w-xl">Find your next unforgettable experience from our curated list of events.</p>
          </div>
          
          <div className="flex items-center gap-2">
             <Button variant="outline" className="border-white/10 bg-white/5 backdrop-blur-sm gap-2 rounded-full">
               <SlidersHorizontal className="size-4" /> Filters
             </Button>
             <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm w-full md:w-auto min-w-[300px]">
               <Search className="size-4 text-muted-foreground" />
               <input 
                 type="text" 
                 placeholder="Search events..." 
                 className="bg-transparent border-none outline-none text-sm w-full placeholder:text-muted-foreground"
               />
             </div>
          </div>
        </div>

        {/* Categories Scroller */}
        <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide">
          {filters.map((filter, i) => (
             <button 
               key={i}
               className={`px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                 i === 0 
                   ? 'bg-primary text-primary-foreground' 
                   : 'bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/10'
               }`}
             >
               {filter}
             </button>
          ))}
        </div>
      </section>

      {/* Events Grid */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
           {allEvents.map((event, index) => (
             <EventCard key={index} {...event} />
           ))}
        </div>

        {/* Load More */}
        <div className="mt-16 text-center">
          <Button variant="outline" size="lg" className="rounded-full border-border/50 hover:bg-white/5 px-8">
            Load More Events
          </Button>
        </div>
      </section>
    </div>
  );
}
