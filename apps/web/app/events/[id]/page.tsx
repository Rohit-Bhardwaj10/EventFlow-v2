import { Button } from "@/components/ui/button";
import { CalendarDays, MapPin, Share2, Clock, User, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function EventDetailsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground pt-20">
      {/* Event Header Image */}
      <div className="relative h-[400px] md:h-[500px] w-full mt-8 md:mt-0">
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent z-10" />
        <img 
          src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=2000" 
          alt="Event Cover" 
          className="w-full h-full object-cover"
        />
        
        <div className="container mx-auto px-4 relative z-20 h-full flex flex-col justify-end pb-12">
           <Link href="/events" className="absolute top-8 left-4 md:left-4 inline-flex items-center gap-2 text-sm font-medium text-white/80 hover:text-white transition-colors bg-black/20 backdrop-blur-md px-3 py-1.5 rounded-full">
             <ArrowLeft className="size-4" /> Back to events
           </Link>

           <div className="max-w-4xl">
             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-wider mb-6">
                Technology
             </div>
             <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4 text-white">Tech Conference 2024</h1>
             <p className="text-xl text-white/80 max-w-2xl">
               Join industry leaders for a day of innovation, networking, and future-gazing discussions.
             </p>
           </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            
            {/* Description */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">About this event</h2>
              <p className="text-muted-foreground leading-relaxed text-lg">
                Welcome to the biggest Tech Conference of 2024. This year, we are gathering over 5,000 developers, designers, and innovators to share ideas and shape the future of technology.
                <br /><br />
                Expect keynote speeches from top industry executives, hands-on workshops, and unparalleled networking opportunities. Whether you are a startup founder or a seasoned engineer, there is something here for everyone.
              </p>
            </div>

            {/* Agenda/Schedule Placeholder */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Event Schedule</h2>
              <div className="space-y-4">
                 {[
                   { time: "09:00 AM", title: "Registration & Breakfast", desc: "Main Hall Lobby" },
                   { time: "10:00 AM", title: "Keynote: The Future of AI", desc: "Main Stage" },
                   { time: "12:00 PM", title: "Networking Lunch", desc: "Food Court" },
                   { time: "02:00 PM", title: "Workshop: Building Scalable Apps", desc: "Room A1" },
                 ].map((slot, i) => (
                   <div key={i} className="flex gap-6 p-4 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-colors">
                     <div className="w-24 shrink-0 text-sm font-medium text-muted-foreground pt-1">
                       {slot.time}
                     </div>
                     <div>
                       <h3 className="text-lg font-semibold mb-1">{slot.title}</h3>
                       <p className="text-sm text-muted-foreground">{slot.desc}</p>
                     </div>
                   </div>
                 ))}
              </div>
            </div>

            {/* Host Info */}
             <div className="space-y-6">
              <h2 className="text-2xl font-bold">Organized by</h2>
              <div className="flex items-center gap-4 p-6 rounded-xl border border-white/5 bg-white/[0.02]">
                <div className="size-16 rounded-full bg-muted overflow-hidden">
                   <img src="https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?auto=format&fit=crop&q=80&w=200" alt="Host" className="w-full h-full object-cover"/>
                </div>
                <div>
                  <h3 className="text-lg font-bold">TechInnovate Inc.</h3>
                  <p className="text-muted-foreground text-sm">Leading tech event organizer since 2010.</p>
                  <Button variant="link" className="px-0 text-primary h-auto mt-1">View Profile</Button>
                </div>
              </div>
            </div>

          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <div className="sticky top-24 space-y-8">
              {/* Event Details Card */}
              <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-sm space-y-6 shadow-xl">
                 <div className="flex justify-between items-center pb-6 border-b border-white/5">
                    <div className="text-muted-foreground">Price</div>
                    <div className="text-3xl font-bold text-foreground">$299</div>
                 </div>

                 <div className="space-y-4">
                   <div className="flex items-start gap-4">
                     <div className="p-2 rounded-lg bg-white/5 border border-white/10">
                       <CalendarDays className="size-5 text-primary" />
                     </div>
                     <div>
                       <div className="font-semibold">Friday, March 15</div>
                       <div className="text-sm text-muted-foreground">9:00 AM - 5:00 PM</div>
                     </div>
                   </div>

                   <div className="flex items-start gap-4">
                     <div className="p-2 rounded-lg bg-white/5 border border-white/10">
                       <MapPin className="size-5 text-primary" />
                     </div>
                     <div>
                       <div className="font-semibold">Moscone Center</div>
                       <div className="text-sm text-muted-foreground">747 Howard St, San Francisco</div>
                     </div>
                   </div>
                 </div>

                 <Button size="lg" className="w-full rounded-full h-12 text-lg shadow-lg shadow-primary/20">
                   Get Tickets
                 </Button>
                 
                  <p className="text-center text-xs text-muted-foreground">
                    Limited spots available. Sales end soon.
                  </p>
              </div>

               {/* Share */}
              <div className="p-6 rounded-2xl border border-white/5 bg-white/[0.02] text-center">
                 <h3 className="font-semibold mb-4">Share this event</h3>
                 <div className="flex justify-center gap-2">
                    <Button variant="outline" size="icon" className="rounded-full border-white/10 hover:bg-white/10">
                      <Share2 className="size-4" />
                    </Button>
                    <Button variant="outline" className="rounded-full border-white/10 hover:bg-white/10 w-full">
                      Copy Link
                    </Button>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
