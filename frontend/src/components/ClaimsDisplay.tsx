interface Claim {
  claim_text: string;
  theme: string;
  confidence: number;
  metrics?: string | null;
}

interface ClaimsDisplayProps {
  claims: Claim[];
  isLoading?: boolean;
}

const themeColors: Record<string, { bg: string; text: string; badge: string }> = {
  climate: { bg: 'bg-secondary/10', text: 'text-secondary', badge: 'bg-secondary/20 text-secondary' },
  energy: { bg: 'bg-primary/10', text: 'text-primary', badge: 'bg-primary/20 text-primary' },
  supply_chain: {
    bg: 'bg-tertiary/10',
    text: 'text-tertiary',
    badge: 'bg-tertiary/20 text-tertiary',
  },
  emissions: { bg: 'bg-error/10', text: 'text-error', badge: 'bg-error/20 text-error' },
  water: { bg: 'bg-secondary-dim/10', text: 'text-secondary-dim', badge: 'bg-secondary-dim/20 text-secondary-dim' },
  waste: { bg: 'bg-primary/10', text: 'text-primary', badge: 'bg-primary/20 text-primary' },
  labor: { bg: 'bg-tertiary-dim/10', text: 'text-tertiary-dim', badge: 'bg-tertiary-dim/20 text-tertiary-dim' },
  diversity: {
    bg: 'bg-secondary/10',
    text: 'text-secondary',
    badge: 'bg-secondary/20 text-secondary',
  },
  governance: {
    bg: 'bg-surface-variant/10',
    text: 'text-on-surface-variant',
    badge: 'bg-surface-variant/20 text-on-surface-variant',
  },
  ethics: { bg: 'bg-primary/10', text: 'text-primary', badge: 'bg-primary/20 text-primary' },
};

function getConfidenceColor(confidence: number): string {
  if (confidence >= 0.8) return 'text-primary';
  if (confidence >= 0.6) return 'text-surface-tint';
  return 'text-tertiary';
}

function getThemeLabel(theme: string): string {
  return theme
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export default function ClaimsDisplay({ claims, isLoading }: ClaimsDisplayProps) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="flex flex-col items-center gap-4">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-surface-variant border-t-primary" />
          <p className="text-on-surface-variant">Extracting claims...</p>
        </div>
      </div>
    );
  }

  if (claims.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white font-headline">Extracted Claims</h2>
        <p className="mt-1 text-on-surface-variant">
          Found {claims.length} sustainability claim{claims.length !== 1 ? 's' : ''}
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {claims.map((claim, index) => {
          const colors = themeColors[claim.theme] || themeColors.governance;

          return (
            <div
              key={index}
              className={`group relative rounded-xl border border-white/5 p-6 transition-all hover:border-primary/30 glass-panel ${colors.bg}`}
            >
              {/* Glassmorphism background */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/5 to-transparent backdrop-blur-xs" />

              <div className="relative z-10 space-y-3">
                {/* Theme Badge */}
                <div className="flex items-start justify-between gap-2">
                  <span
                    className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${colors.badge}`}
                  >
                    {getThemeLabel(claim.theme)}
                  </span>
                  <div className="text-right">
                    <div className={`text-sm font-bold ${getConfidenceColor(claim.confidence)}`}>
                      {Math.round(claim.confidence * 100)}%
                    </div>
                    <div className="text-xs text-on-surface-variant">confidence</div>
                  </div>
                </div>

                {/* Claim Text */}
                <p className="line-clamp-4 text-sm text-on-surface">{claim.claim_text}</p>

                {/* Metrics */}
                {claim.metrics && (
                  <div className="mt-3 rounded-lg bg-white/5 p-2 text-xs text-on-surface-variant">
                    <span className="font-semibold">Metrics: </span>
                    {claim.metrics}
                  </div>
                )}

                {/* Hover indicator */}
                <div className="absolute bottom-0 right-0 h-1 w-0 rounded-full bg-primary/50 transition-all group-hover:w-full" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Summary stats */}
      <div className="mt-8 grid gap-4 md:grid-cols-4">
        {Object.entries(
          claims.reduce(
            (acc, claim) => {
              acc[claim.theme] = (acc[claim.theme] || 0) + 1;
              return acc;
            },
            {} as Record<string, number>
          )
        ).map(([theme, count]) => {
          const colors = themeColors[theme] || themeColors.governance;

          return (
            <div
              key={theme}
              className={`rounded-lg border border-white/5 p-4 text-center glass-panel ${colors.bg}`}
            >
              <div className={`text-2xl font-bold ${colors.text}`}>{count}</div>
              <div className="mt-1 text-xs text-on-surface-variant">{getThemeLabel(theme)}</div>
            </div>
          );
        })}
      </div>

      {/* Average confidence */}
      <div className="rounded-lg border border-white/5 bg-surface-container/50 p-4 backdrop-blur-xs glass-panel">
        <div className="flex items-center justify-between">
          <span className="text-on-surface-variant">Average Confidence</span>
          <span
            className={`text-lg font-bold ${getConfidenceColor(
              claims.reduce((acc, claim) => acc + claim.confidence, 0) / claims.length
            )}`}
          >
            {Math.round(
              (claims.reduce((acc, claim) => acc + claim.confidence, 0) / claims.length) * 100
            )}
            %
          </span>
        </div>
      </div>
    </div>
  );
}
