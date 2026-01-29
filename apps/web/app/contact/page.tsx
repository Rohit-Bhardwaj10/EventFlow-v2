import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, Send, MessageSquare, ArrowRight, Github, Twitter, Linkedin, Instagram } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background text-foreground pt-32 pb-20 relative overflow-hidden">
       {/* Ambient Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
         <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px] opacity-30" />
         <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[120px] opacity-30" />
      </div>

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60">
            Let's Start a Conversation
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Have questions about EventFlow or just want to say hello? We'd love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
           {/* Left Column: Contact Info & Cards */}
           <div className="lg:col-span-5 space-y-8">
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold">Get in touch</h2>
                <div className="grid gap-6">
                   {[
                     { icon: MessageSquare, title: "Chat to support", desc: "We're here to help.", link: "support@eventflow.com", color: "bg-blue-500/10 text-blue-500" },
                     { icon: MapPin, title: "Visit our HQ", desc: "Come say hello.", link: "100 Smith St, Collingwood", color: "bg-purple-500/10 text-purple-500" },
                     { icon: Phone, title: "Call us", desc: "Mon-Fri from 8am to 5pm.", link: "+1 (555) 000-0000", color: "bg-green-500/10 text-green-500" },
                   ].map((item, i) => (
                     <div key={i} className="group flex items-start gap-5 p-6 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/10 transition-all duration-300 hover:-translate-y-1">
                        <div className={`p-3 rounded-xl ${item.color} group-hover:scale-110 transition-transform`}>
                          <item.icon className="size-6" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg mb-1 group-hover:text-primary transition-colors">{item.title}</h3>
                          <p className="text-sm text-muted-foreground mb-2">{item.desc}</p>
                          <div className="text-sm font-medium text-foreground">{item.link}</div>
                        </div>
                     </div>
                   ))}
                </div>
              </div>

              {/* Socials */}
              <div className="p-8 rounded-2xl bg-gradient-to-br from-white/5 to-transparent border border-white/5">
                <h3 className="font-semibold mb-6 flex items-center justify-between">
                  <span>Follow our journey</span>
                  <span className="text-xs text-muted-foreground font-normal">@eventflow</span>
                </h3>
                <div className="flex gap-4">
                  {[
                    { icon: Twitter, href: "#" },
                    { icon: Github, href: "#" },
                    { icon: Linkedin, href: "#" },
                    { icon: Instagram, href: "#" }
                  ].map((social, i) => (
                    <a 
                      key={i} 
                      href={social.href} 
                      className="size-10 rounded-full bg-white/5 flex items-center justify-center text-muted-foreground hover:bg-white/10 hover:text-white hover:scale-110 transition-all"
                    >
                      <social.icon className="size-5" />
                    </a>
                  ))}
                </div>
              </div>
           </div>

           {/* Right Column: Interactive Form */}
           <div className="lg:col-span-7">
             <div className="relative p-[1px] rounded-[32px] bg-gradient-to-b from-white/10 to-white/0 overflow-hidden">
               <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-50" />
               <div className="relative p-8 md:p-12 rounded-[31px] bg-card/50 backdrop-blur-xl">
                 <form className="space-y-8">
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                     <div className="space-y-3">
                       <label className="text-sm font-medium ml-1">First name</label>
                       <input 
                          type="text" 
                          placeholder="John"
                          className="flex h-14 w-full rounded-2xl border border-white/10 bg-black/20 px-5 text-base placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all"
                        />
                     </div>
                     <div className="space-y-3">
                       <label className="text-sm font-medium ml-1">Last name</label>
                       <input 
                          type="text" 
                          placeholder="Doe"
                          className="flex h-14 w-full rounded-2xl border border-white/10 bg-black/20 px-5 text-base placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all"
                        />
                     </div>
                   </div>

                   <div className="space-y-3">
                     <label className="text-sm font-medium ml-1">Email address</label>
                     <input 
                        type="email" 
                        placeholder="john@example.com"
                        className="flex h-14 w-full rounded-2xl border border-white/10 bg-black/20 px-5 text-base placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all"
                      />
                   </div>

                    <div className="space-y-3">
                     <label className="text-sm font-medium ml-1">Your Message</label>
                     <textarea 
                        rows={6}
                        placeholder="Tell us about your project..."
                        className="flex w-full rounded-2xl border border-white/10 bg-black/20 p-5 text-base placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all resize-none"
                      />
                   </div>

                   <div className="pt-2">
                     <Button size="lg" className="w-full h-14 rounded-full text-lg shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform">
                       Send Message <ArrowRight className="ml-2 size-5" />
                     </Button>
                   </div>
                 </form>
               </div>
             </div>
           </div>
        </div>
      </div>
    </div>
  );
}
