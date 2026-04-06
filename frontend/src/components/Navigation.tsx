export default function Navigation() {
  return (
    <nav className="fixed top-0 w-full z-50 flex justify-between items-center px-8 h-20 bg-background/60 backdrop-blur-xl border-b border-white/5">
      <div className="flex items-center gap-12">
        <a
          className="text-2xl font-bold tracking-tighter text-primary font-headline"
          href="#"
        >
          Verdiq AI
        </a>
        <div className="hidden md:flex items-center gap-8">
          <a
            className="text-primary border-b-2 border-primary pb-1 font-schibsted font-medium text-sm tracking-wide"
            href="#"
          >
            Platform
          </a>
          <a
            className="text-white/70 hover:text-white transition-colors font-schibsted font-medium text-sm tracking-wide"
            href="#"
          >
            Features
          </a>
          <a
            className="text-white/70 hover:text-white transition-colors font-schibsted font-medium text-sm tracking-wide"
            href="#"
          >
            Projects
          </a>
          <a
            className="text-white/70 hover:text-white transition-colors font-schibsted font-medium text-sm tracking-wide"
            href="#"
          >
            Community
          </a>
          <a
            className="text-white/70 hover:text-white transition-colors font-schibsted font-medium text-sm tracking-wide"
            href="#"
          >
            Contact
          </a>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <button className="material-symbols-outlined text-white/70 hover:text-white transition-colors">
          notifications
        </button>
        <button className="px-5 py-2 text-sm font-medium text-white hover:text-primary transition-colors">
          Sign Up
        </button>
        <button className="px-5 py-2 text-sm font-medium bg-white text-black rounded-full hover:bg-primary transition-all duration-300 transform active:scale-95">
          Log In
        </button>
      </div>
    </nav>
  );
}
