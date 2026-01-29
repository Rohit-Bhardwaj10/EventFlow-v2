import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Sparkles, ArrowRight, Github, Mail } from "lucide-react";

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex w-1/2 relative bg-muted overflow-hidden">
         <div className="absolute inset-0 bg-black/40 z-10" />
         <img 
           src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=2000" 
           alt="Concert Crowd" 
           className="absolute inset-0 w-full h-full object-cover"
         />
         <div className="relative z-20 w-full h-full flex flex-col justify-between p-12 text-white">
            <div className="flex items-center gap-2">
               <Sparkles className="size-6 text-white" />
               <span className="text-xl font-bold tracking-tight">EventFlow</span>
            </div>
            
            <div className="max-w-md space-y-4">
              <h2 className="text-4xl font-bold leading-tight">
                "The easiest way to manage events and sell tickets."
              </h2>
              <p className="text-lg text-white/80">
                Join thousands of creators who trust EventFlow to host their gatherings, big or small.
              </p>
            </div>
            
            <div className="text-sm text-white/60">
              © 2024 EventFlow Inc.
            </div>
         </div>
      </div>

      {/* Right Panel - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="max-w-sm w-full space-y-8">
           <div className="space-y-2 text-center lg:text-left">
             <h1 className="text-3xl font-bold tracking-tight">Create an account</h1>
             <p className="text-muted-foreground">Enter your email below to create your account</p>
           </div>

           <div className="space-y-4">
             <div className="grid grid-cols-2 gap-4">
               <Button variant="outline" className="w-full border-white/10 hover:bg-white/5 py-6">
                 <Github className="mr-2 size-4" /> Github
               </Button>
               <Button variant="outline" className="w-full border-white/10 hover:bg-white/5 py-6">
                 Google
               </Button>
             </div>
             
             <div className="relative">
               <div className="absolute inset-0 flex items-center">
                 <span className="w-full border-t border-white/10" />
               </div>
               <div className="relative flex justify-center text-xs uppercase">
                 <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
               </div>
             </div>

             <form className="space-y-4">
               <div className="space-y-2">
                 <label className="text-sm font-medium leading-none">Email</label>
                 <input 
                    type="email" 
                    placeholder="m@example.com"
                    className="flex h-12 w-full rounded-md border border-white/10 bg-black/20 px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all"
                  />
               </div>
               <div className="space-y-2">
                 <label className="text-sm font-medium leading-none">Password</label>
                 <input 
                    type="password" 
                    className="flex h-12 w-full rounded-md border border-white/10 bg-black/20 px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all"
                  />
               </div>

               <Button className="w-full h-12 rounded-lg text-base" type="submit">
                 Sign Up with Email
               </Button>
             </form>

             <p className="px-8 text-center text-sm text-muted-foreground">
               By clicking continue, you agree to our{" "}
               <Link href="#" className="underline underline-offset-4 hover:text-primary">
                 Terms of Service
               </Link>{" "}
               and{" "}
               <Link href="#" className="underline underline-offset-4 hover:text-primary">
                 Privacy Policy
               </Link>
               .
             </p>
             
             <div className="text-center text-sm">
                Already have an account?{" "}
                <Link href="/login" className="font-semibold text-primary hover:underline">
                  Sign in
                </Link>
             </div>
           </div>
        </div>
      </div>
    </div>
  );
}
