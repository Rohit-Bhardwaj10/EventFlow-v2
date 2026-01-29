import Link from "next/link";
import { Button } from "@/components/ui/button";
import { EventCard } from "@/components/EventCard";
import { ArrowRight, Sparkles, Music, Code, Briefcase, Trophy, Palette, Mic, CheckCircle2, Ticket, Calendar } from "lucide-react";

export default function Home() {
  const featuredEvents = [
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
  ];

  const categories = [
    { name: "Music", icon: Music },
    { name: "Technology", icon: Code },
    { name: "Business", icon: Briefcase },
    { name: "Sports", icon: Trophy },
    { name: "Art", icon: Palette },
    { name: "Comedy", icon: Mic },
  ];

  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-hidden selection:bg-white/10">


      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden text-center z-10">
        {/* Hero Background */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
          <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-white/5 opacity-20 blur-[100px]" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-border/50 bg-secondary/30 px-3 py-1 text-sm text-secondary-foreground backdrop-blur-md mb-8 animate-fade-in hover:bg-secondary/50 transition-colors cursor-default">
            <Sparkles className="size-3.5" />
            <span>The future of event management</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 text-balance max-w-4xl mx-auto animate-slide-up" style={{ animationDelay: "0.1s" }}>
            Craft <span className="text-transparent bg-clip-text bg-gradient-to-br from-white via-white/80 to-white/40">Unforgettable</span> <br />
            Experiences
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-slide-up leading-relaxed" style={{ animationDelay: "0.2s" }}>
            Platform for creators to host, manage, and monetize events. 
            Seamless ticketing, analytics, and community tools in one dark-themed suite.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up" style={{ animationDelay: "0.3s" }}>
            <Link href="/events">
              <Button size="lg" className="h-12 px-8 text-base rounded-full shadow-[0_0_20px_-5px_rgba(255,255,255,0.3)] hover:shadow-[0_0_25px_-5px_rgba(255,255,255,0.4)] transition-shadow">
                Explore Events
              </Button>
            </Link>
            <Link href="/events/create">
              <Button size="lg" variant="outline" className="h-12 px-8 text-base rounded-full border-border/50 hover:bg-white/5 backdrop-blur-sm">
                Create Event <ArrowRight className="ml-2 size-4" />
              </Button>
            </Link>
          </div>

          {/* Trusted By Section */}
          <div className="mt-12 flex flex-col items-center gap-4 animate-slide-up" style={{ animationDelay: "0.4s" }}>
            <div className="flex -space-x-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="size-10 rounded-full border-2 border-background bg-muted overflow-hidden">
                  <img 
                    src={`https://images.unsplash.com/photo-${
                      i === 1 ? "1534528741775-53994a69daeb" : 
                      i === 2 ? "1506794778202-cad84cf45f1d" : 
                      i === 3 ? "1507003211169-0a1dd7228f2d" : 
                      "1539571696357-5a69c17a67c6"
                    }?auto=format&fit=crop&w=100&h=100`} 
                    alt="User" 
                    className="h-full w-full object-cover"
                  />
                </div>
              ))}
              <div className="size-10 rounded-full border-2 border-background bg-white/10 flex items-center justify-center text-xs font-medium backdrop-blur-sm">
                +2k
              </div>
            </div>
            <p className="text-sm text-muted-foreground">Trusted by 2,000+ event creators worldwide</p>
          </div>

          {/* Floating Elements (Desktop Only) */}
          <div className="absolute top-1/2 left-10 -translate-y-1/2 hidden xl:block animate-float" style={{ animationDelay: "0s" }}>
            <div className="w-64 p-4 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md shadow-2xl skew-y-3 hover:skew-y-0 transition-transform duration-500">
              <div className="flex items-center gap-3 mb-3">
                <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Ticket className="size-5 text-primary" />
                </div>
                <div>
                  <div className="h-2 w-24 bg-white/20 rounded-full mb-1" />
                  <div className="h-2 w-16 bg-white/10 rounded-full" />
                </div>
              </div>
              <div className="space-y-2">
                  <div className="h-8 w-full bg-white/5 rounded-lg" />
                  <div className="h-8 w-full bg-white/5 rounded-lg" />
              </div>
            </div>
          </div>

          <div className="absolute top-1/2 right-10 -translate-y-1/2 hidden xl:block animate-float" style={{ animationDelay: "2s" }}>
            <div className="w-64 p-4 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md shadow-2xl -skew-y-3 hover:skew-y-0 transition-transform duration-500">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium text-white/60">Upcoming Events</span>
                <Calendar className="size-4 text-white/40" />
              </div>
              <div className="space-y-3">
                {[1, 2].map((i) => (
                  <div key={i} className="flex gap-3 items-center">
                      <div className="size-8 rounded-lg bg-white/10" />
                      <div className="space-y-1">
                        <div className="h-2 w-20 bg-white/20 rounded-full" />
                        <div className="h-1.5 w-12 bg-white/10 rounded-full" />
                      </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Categories Pills */}
          <div className="mt-16 flex flex-wrap justify-center gap-3 animate-slide-up" style={{ animationDelay: "0.5s" }}>
            {categories.map((cat, i) => (
              <div key={i} className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/5 bg-white/5 hover:bg-white/10 hover:border-white/10 transition-colors cursor-pointer backdrop-blur-sm">
                <cat.icon className="size-4 text-muted-foreground" />
                <span className="text-sm font-medium">{cat.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Events */}
      {/* Featured Events - Elevated */}
      <section className="relative py-24 z-10 overflow-hidden">
        <div className="absolute top-0 right-0 p-20 bg-primary/5 rounded-full blur-[100px] -z-10" />
        
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-medium mb-6">
                <Sparkles className="size-3" />
                <span>Curated for you</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
                Trending <span className="text-primary">Experiences</span>
              </h2>
              <p className="text-muted-foreground text-lg">
                Discover the most popular events happening around you. <br className="hidden md:block" />
                From intimate workshops to massive conferences.
              </p>
            </div>
            <Link href="/events">
              <Button variant="outline" className="hidden sm:inline-flex group border-white/10 hover:border-primary/50 hover:bg-primary/10 h-12 rounded-full px-6">
                View full calendar <ArrowRight className="ml-2 size-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredEvents.map((event, index) => (
              <div key={index} className="group relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/50 to-secondary/50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />
                 <EventCard {...event} />
              </div>
            ))}
          </div>
          
          <div className="mt-12 text-center sm:hidden">
            <Button variant="ghost">View all events</Button>
          </div>
        </div>
      </section>

      {/* How It Works - Simplified Timeline */}
      <section className="py-20 bg-secondary/5 border-y border-white/5">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold tracking-tight mb-4">Effortless Event Management</h2>
            <p className="text-muted-foreground">From page creation to post-event analytics, we handle the complexity.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connector Line (Simplified) */}
            <div className="absolute top-8 left-0 w-full h-px bg-white/10 hidden md:block" />

            {[
              { 
                title: "Create", 
                desc: "Launch your event page in minutes.", 
                icon: Palette, 
                step: "1" 
              },
              { 
                title: "Promote", 
                desc: "Share links and track conversions.", 
                icon: Sparkles, 
                step: "2" 
              },
              { 
                title: "Manage", 
                desc: "Check-in guests and get real-time insights.", 
                icon: CheckCircle2, 
                step: "3" 
              },
            ].map((step, i) => (
              <div key={i} className="relative pt-6 text-center group">
                 <div className="size-16 mx-auto bg-card border border-white/10 rounded-full flex items-center justify-center relative z-10 hover:scale-105 transition-all duration-300 mb-6 shadow-lg">
                    <step.icon className="size-6 text-primary" />
                    <div className="absolute -top-2 -right-2 size-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold border-2 border-card">
                      {step.step}
                    </div>
                 </div>
                 
                 <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                 <p className="text-sm text-muted-foreground">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Stats Section - Clean & Minimal */}
      <section className="py-16 container mx-auto px-4">
         <div className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-white/10 border-y border-white/10 bg-card/30 rounded-2xl backdrop-blur-sm">
           {[
             { label: "Active Events", value: "2K+" },
             { label: "Tickets Sold", value: "150K+" },
             { label: "Organizers", value: "500+" },
             { label: "Countries", value: "25+" },
           ].map((stat, i) => (
             <div key={i} className="text-center p-8 group hover:bg-white/5 transition-colors first:rounded-tl-2xl first:rounded-bl-2xl last:rounded-tr-2xl last:rounded-br-2xl">
               <div className="text-3xl md:text-4xl font-bold text-foreground mb-1 group-hover:scale-105 transition-transform">
                 {stat.value}
               </div>
               <div className="text-primary text-xs font-semibold uppercase tracking-wider">{stat.label}</div>
             </div>
           ))}
         </div>
      </section>

      {/* Footer CTA - Simple & Clean */}
      <section className="py-24 container mx-auto px-4">
         <div className="relative rounded-3xl overflow-hidden bg-primary/10 border border-primary/20 p-12 text-center">
            <div className="max-w-2xl mx-auto space-y-6">
               <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
                 Ready to host your next masterpiece?
               </h2>
               <p className="text-muted-foreground text-lg">
                 Join thousands of creators who are shaping the culture of tomorrow, today.
               </p>
               
               <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                 <Link href="/signup">
                   <Button size="lg" className="rounded-full px-8">
                     Get Started for Free
                   </Button>
                 </Link>
                 <Link href="/contact">
                   <Button size="lg" variant="outline" className="rounded-full px-8 border-white/10 hover:bg-white/5">
                     Talk to Sales
                   </Button>
                 </Link>
               </div>
            </div>
         </div>
      </section>
    </div>
  );
}
