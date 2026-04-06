const features = [
  {
    icon: 'analytics',
    title: 'Multi-Source Analysis',
    description: 'Cross-reference annual reports, satellite data, and supply chain logs in seconds.',
    accentColor: 'primary',
  },
  {
    icon: 'error_outline',
    title: 'Contradiction Detection',
    description: 'Instantly flag discrepancies between public claims and private data streams.',
    accentColor: 'tertiary',
  },
  {
    icon: 'security',
    title: 'Risk Scoring',
    description: 'Dynamic ESG risk weights based on real-time forensic auditing algorithms.',
    accentColor: 'secondary',
  },
  {
    icon: 'description',
    title: 'Legal-Ready Reports',
    description: 'Generate audit-ready documentation compliant with SFDR and CSRD standards.',
    accentColor: 'primary',
  },
];

const accentClasses: Record<string, { bg: string; bgHover: string; text: string }> = {
  primary: {
    bg: 'bg-primary/5',
    bgHover: 'group-hover:bg-primary/20',
    text: 'text-primary',
  },
  secondary: {
    bg: 'bg-secondary/5',
    bgHover: 'group-hover:bg-secondary/20',
    text: 'text-secondary',
  },
  tertiary: {
    bg: 'bg-tertiary/5',
    bgHover: 'group-hover:bg-tertiary/20',
    text: 'text-tertiary',
  },
};

export default function Features() {
  return (
    <section className="relative py-32 px-8 overflow-hidden">
      <div className="hero-glow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] pointer-events-none"></div>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center mb-20 text-center">
          <span className="text-primary font-bold tracking-[0.2em] text-[12px] uppercase mb-4">
            Forensic Capabilities
          </span>
          <h2 className="font-headline font-bold text-5xl text-white">Trust, Verified at Scale</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const accent = accentClasses[feature.accentColor as keyof typeof accentClasses];

            return (
              <div
                key={index}
                className={`group relative glass-panel rounded-2xl p-8 border border-white/5 hover:border-${feature.accentColor}/20 transition-all duration-500 overflow-hidden`}
              >
                <div
                  className={`absolute -right-4 -bottom-4 w-24 h-24 ${accent.bg} rounded-full blur-2xl ${accent.bgHover} transition-all duration-500`}
                ></div>
                <div className={`w-12 h-12 rounded-xl ${accent.bg} flex items-center justify-center ${accent.text} mb-6`}>
                  <span className="material-symbols-outlined text-3xl">{feature.icon}</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-3 font-headline">{feature.title}</h3>
                <p className="text-on-surface-variant text-sm leading-relaxed">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
