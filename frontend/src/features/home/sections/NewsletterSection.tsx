import React, { useState } from "react";
import { Mail, ArrowRight, CheckCircle2 } from "lucide-react";

export const NewsletterSection = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    // Simulate API call
    setTimeout(() => {
      setStatus("success");
      setEmail("");
    }, 1000);
  };

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/3 w-96 h-96 bg-lifeguide-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/3 w-96 h-96 bg-lifeguide-secondary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1360px] mx-auto px-4 md:px-6 lg:px-12 relative z-10">
        <div className="bg-lifeguide-canvas rounded-3xl p-8 md:p-16 border border-lifeguide-border shadow-sm max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-12">
          
          {/* Text Content */}
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-lifeguide-text-primary tracking-tight mb-4">
              Stay ahead of the curve.
            </h2>
            <p className="text-lg text-lifeguide-text-secondary">
              Join 10,000+ developers getting weekly insights on career growth, new project ideas, and AI tools.
            </p>
          </div>

          {/* Form */}
          <div className="flex-1 w-full max-w-md">
            {status === "success" ? (
              <div className="bg-green-50 border border-green-200 text-green-700 rounded-2xl p-6 flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-green-600 shrink-0" />
                <div>
                  <h4 className="font-bold mb-1">You&apos;re on the list!</h4>
                  <p className="text-sm opacity-90">Keep an eye on your inbox for our next issue.</p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-lifeguide-text-muted" />
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={status === "loading"}
                    className="w-full h-14 pl-12 pr-4 bg-white border border-lifeguide-border rounded-xl text-lifeguide-text-primary focus:outline-none focus:ring-2 focus:ring-lifeguide-primary/20 focus:border-lifeguide-primary transition-all shadow-sm disabled:opacity-50"
                  />
                </div>
                <button
                  type="submit"
                  disabled={status === "loading" || !email}
                  className="h-14 px-8 bg-lifeguide-primary text-white font-semibold rounded-xl hover:bg-lifeguide-primary/90 transition-colors shadow-md disabled:opacity-50 flex items-center justify-center gap-2 shrink-0 group"
                >
                  {status === "loading" ? "Subscribing..." : "Subscribe"}
                  {status !== "loading" && <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
                </button>
              </form>
            )}
            <p className="text-xs text-lifeguide-text-muted mt-4 text-center md:text-left">
              We care about your data in our <a href="/privacy" className="underline hover:text-lifeguide-text-primary transition-colors">privacy policy</a>.
            </p>
          </div>
          
        </div>
      </div>
    </section>
  );
};
