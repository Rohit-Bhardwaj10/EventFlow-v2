import { Button } from "@/components/ui/button";
import { Upload, Calendar, MapPin, DollarSign, Type, AlignLeft, Image as ImageIcon, Sparkles, ChevronRight } from "lucide-react";

export default function CreateEventPage() {
  return (
    <div className="min-h-screen bg-background text-foreground pt-32 pb-20 relative overflow-hidden">
       {/* Background Decoration */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[128px] opacity-20" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[128px] opacity-20" />
      </div>

      <div className="container mx-auto px-4 max-w-4xl relative z-10">
        <div className="mb-12 text-center">
           <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-white/80 mb-6 backdrop-blur-sm animate-fade-in">
             <Sparkles className="size-3 text-primary" />
             <span>Event Creator Studio</span>
           </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 text-balance">
            Create an Unforgettable <span className="text-transparent bg-clip-text bg-gradient-to-br from-white via-white/80 to-white/40">Event</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Fill in the details below to publish your new event. Manage tickets, attendees, and analytics all in one place.
          </p>
        </div>

        <form className="space-y-10">
          {/* Progress Indicators (Visual Only) */}
          <div className="flex items-center justify-between px-2 md:px-10 mb-8 max-w-2xl mx-auto">
             <div className="flex flex-col items-center gap-2">
               <div className="size-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold shadow-lg shadow-primary/20">1</div>
               <span className="text-xs font-medium text-primary">Details</span>
             </div>
             <div className="h-px bg-white/10 flex-1 mx-4" />
             <div className="flex flex-col items-center gap-2">
               <div className="size-8 rounded-full bg-white/5 border border-white/10 text-muted-foreground flex items-center justify-center text-sm font-bold">2</div>
               <span className="text-xs font-medium text-muted-foreground">Location</span>
             </div>
             <div className="h-px bg-white/10 flex-1 mx-4" />
              <div className="flex flex-col items-center gap-2">
               <div className="size-8 rounded-full bg-white/5 border border-white/10 text-muted-foreground flex items-center justify-center text-sm font-bold">3</div>
               <span className="text-xs font-medium text-muted-foreground">Tickets</span>
             </div>
          </div>

          <div className="grid gap-8">
            {/* Basic Info Section */}
            <div className="group relative p-1 rounded-3xl bg-gradient-to-b from-white/10 to-transparent transition-all duration-300">
               <div className="absolute inset-0 bg-primary/5 blur-xl rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
               <section className="relative p-6 md:p-10 rounded-[22px] bg-card border border-white/5 backdrop-blur-sm space-y-8">
                <div className="flex items-start gap-4 border-b border-white/5 pb-6">
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                    <Type className="size-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-semibold">Basic Information</h2>
                    <p className="text-muted-foreground">Tell us the core details about your event.</p>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div className="space-y-3">
                    <label className="text-sm font-medium leading-none">Event Title</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Annual Tech Summit 2024" 
                      className="flex h-14 w-full rounded-xl border border-white/10 bg-black/40 px-4 py-2 text-base placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all shadow-inner"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <div className="space-y-3">
                      <label className="text-sm font-medium leading-none">Category</label>
                      <div className="relative">
                        <select className="flex h-14 w-full rounded-xl border border-white/10 bg-black/40 px-4 py-2 text-base text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all shadow-inner appearance-none">
                          <option value="" disabled selected>Select a category</option>
                          <option value="tech">Technology</option>
                          <option value="design">Design</option>
                          <option value="business">Business</option>
                          <option value="music">Music</option>
                        </select>
                        <ChevronRight className="absolute right-4 top-4.5 size-5 text-muted-foreground rotate-90 pointer-events-none" />
                      </div>
                    </div>
                    <div className="space-y-3">
                       <label className="text-sm font-medium leading-none">Organizer Name</label>
                        <input 
                          type="text" 
                          placeholder="e.g. Acme Corp" 
                          className="flex h-14 w-full rounded-xl border border-white/10 bg-black/40 px-4 py-2 text-base placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all shadow-inner"
                        />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-sm font-medium leading-none">Description</label>
                    <textarea 
                      rows={5}
                      placeholder="Describe your event..." 
                      className="flex w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-base placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all resize-none shadow-inner"
                    />
                  </div>
                </div>
              </section>
            </div>

            {/* Date & Location */}
            <div className="group relative p-1 rounded-3xl bg-gradient-to-b from-white/10 to-transparent hover:from-white/15 transition-all duration-300">
              <section className="relative p-6 md:p-10 rounded-[22px] bg-card border border-white/5 backdrop-blur-sm space-y-8">
                 <div className="flex items-start gap-4 border-b border-white/5 pb-6">
                    <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                      <Calendar className="size-6 text-primary" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-semibold">Date & Location</h2>
                      <p className="text-muted-foreground">Where and when will this take place?</p>
                    </div>
                  </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <label className="text-sm font-medium leading-none">Date</label>
                    <div className="relative">
                       <input 
                        type="date" 
                        className="flex h-14 w-full rounded-xl border border-white/10 bg-black/40 px-4 py-2 text-base placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all shadow-inner dark:[color-scheme:dark]"
                      />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <label className="text-sm font-medium leading-none">Time</label>
                     <input 
                        type="time" 
                        className="flex h-14 w-full rounded-xl border border-white/10 bg-black/40 px-4 py-2 text-base placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all shadow-inner dark:[color-scheme:dark]"
                      />
                  </div>
                </div>

                 <div className="space-y-3">
                    <label className="text-sm font-medium leading-none">Location</label>
                    <div className="relative">
                      <MapPin className="absolute left-4 top-4.5 size-5 text-muted-foreground" />
                      <input 
                        type="text" 
                        placeholder="Event address or venue" 
                        className="flex h-14 w-full rounded-xl border border-white/10 bg-black/40 pl-12 pr-4 py-2 text-base placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all shadow-inner"
                      />
                    </div>
                  </div>
              </section>
            </div>

            {/* Media & Tickets */}
             <div className="group relative p-1 rounded-3xl bg-gradient-to-b from-white/10 to-transparent hover:from-white/15 transition-all duration-300">
              <section className="relative p-6 md:p-10 rounded-[22px] bg-card border border-white/5 backdrop-blur-sm space-y-8">
                 <div className="flex items-start gap-4 border-b border-white/5 pb-6">
                    <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                      <ImageIcon className="size-6 text-primary" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-semibold">Media & Tickets</h2>
                      <p className="text-muted-foreground">Add visuals and set your ticket pricing.</p>
                    </div>
                  </div>
                
                <div className="space-y-6">
                  <div className="space-y-3">
                    <label className="text-sm font-medium leading-none">Cover Image</label>
                    <div className="border-2 border-dashed border-white/10 bg-black/20 rounded-2xl p-10 text-center hover:border-primary/50 hover:bg-white/5 transition-all cursor-pointer group/upload">
                      <div className="mx-auto size-16 rounded-full bg-white/5 flex items-center justify-center mb-4 group-hover/upload:scale-110 transition-transform duration-300">
                        <Upload className="size-8 text-muted-foreground group-hover/upload:text-primary transition-colors" />
                      </div>
                      <h3 className="text-lg font-medium text-foreground mb-1">Upload Event Cover</h3>
                      <p className="text-sm text-muted-foreground">Drag and drop or click to upload</p>
                      <p className="text-xs text-muted-foreground mt-2 bg-white/5 inline-block px-2 py-1 rounded">SVG, PNG, JPG (max. 800x400px)</p>
                    </div>
                  </div>

                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <div className="space-y-3">
                      <label className="text-sm font-medium leading-none">Ticket Price ($)</label>
                       <div className="relative">
                          <DollarSign className="absolute left-4 top-4.5 size-5 text-muted-foreground" />
                          <input 
                            type="number" 
                            placeholder="0.00" 
                            className="flex h-14 w-full rounded-xl border border-white/10 bg-black/40 pl-12 pr-4 py-2 text-base placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all shadow-inner"
                          />
                       </div>
                    </div>
                     <div className="space-y-3">
                      <label className="text-sm font-medium leading-none">Total Capacity</label>
                       <input 
                          type="number" 
                          placeholder="e.g. 100" 
                          className="flex h-14 w-full rounded-xl border border-white/10 bg-black/40 px-4 py-2 text-base placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all shadow-inner"
                        />
                    </div>
                   </div>
                </div>
              </section>
            </div>
          </div>

          <div className="sticky bottom-0 left-0 right-0 p-4 bg-background/80 backdrop-blur-lg border-t border-white/10 flex justify-center gap-4 z-50 animate-slide-up">
             <Button variant="ghost" size="lg" className="px-8 rounded-full text-base h-12 hover:bg-white/10">
                Save Draft
             </Button>
             <Button size="lg" className="px-12 rounded-full text-base h-12 shadow-[0_0_20px_-5px_rgba(255,255,255,0.3)] hover:scale-105 transition-transform">
               Publish Event
             </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
