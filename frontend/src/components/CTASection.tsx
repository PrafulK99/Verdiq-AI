export default function CTASection() {
  return (
    <section className="py-32 px-8">
      <div className="max-w-5xl mx-auto glass-panel rounded-[32px] p-16 relative overflow-hidden border border-white/10 text-center">
        <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-transparent to-secondary/10 pointer-events-none"></div>
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 font-headline">
          Start Your Forensic ESG Audit
        </h2>
        <p className="text-on-surface-variant text-lg max-w-2xl mx-auto mb-12">
          Join the leading financial institutions and regulatory bodies using Verdiq AI to ensure
          authentic environmental impact reporting.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <button className="px-10 py-5 bg-primary text-on-primary font-bold rounded-full hover:scale-105 active:scale-95 transition-all shadow-[0_0_20px_rgba(70,255,120,0.3)]">
            Analyze Company
          </button>
          <button className="px-10 py-5 bg-white/5 text-white font-bold rounded-full border border-white/10 hover:bg-white/10 active:scale-95 transition-all backdrop-blur-md">
            View Demo
          </button>
        </div>
      </div>
    </section>
  );
}
