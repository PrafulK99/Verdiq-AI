export default function Footer() {
  return (
    <footer className="w-full py-12 px-8 flex flex-col items-center gap-6 bg-background border-t border-white/5">
      <div className="w-full max-w-7xl flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex flex-col items-start gap-2">
          <span className="font-schibsted font-bold text-primary text-lg">Verdiq AI</span>
          <p className="font-body text-xs text-white/40">© 2024 Verdiq AI. Forensic ESG Auditing.</p>
        </div>
        <div className="flex gap-8">
          <a className="font-body text-xs text-white/40 hover:text-white hover:underline underline-offset-4 transition-all" href="#">
            Privacy Policy
          </a>
          <a className="font-body text-xs text-white/40 hover:text-white hover:underline underline-offset-4 transition-all" href="#">
            Terms of Service
          </a>
          <a className="font-body text-xs text-white/40 hover:text-white hover:underline underline-offset-4 transition-all" href="#">
            Compliance
          </a>
          <a className="font-body text-xs text-white/40 hover:text-white hover:underline underline-offset-4 transition-all" href="#">
            Security
          </a>
        </div>
        <div className="flex gap-4">
          <span className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary/20 transition-colors cursor-pointer group">
            <span className="material-symbols-outlined text-sm text-white group-hover:text-primary">
              language
            </span>
          </span>
          <span className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary/20 transition-colors cursor-pointer group">
            <span className="material-symbols-outlined text-sm text-white group-hover:text-primary">
              terminal
            </span>
          </span>
        </div>
      </div>
    </footer>
  );
}
