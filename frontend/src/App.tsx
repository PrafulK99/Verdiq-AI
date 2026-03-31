export default function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <h1 className="text-4xl font-bold text-emerald-400">Verdiq AI</h1>
        <p className="mt-3 text-slate-300">
          ESG Forensic Auditor & Greenwashing Detection Platform
        </p>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-lg">
            <h2 className="text-lg font-semibold">Upload Sources</h2>
            <p className="mt-2 text-sm text-slate-400">
              CSR reports, 10-K filings, and news evidence.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-lg">
            <h2 className="text-lg font-semibold">Detect Contradictions</h2>
            <p className="mt-2 text-sm text-slate-400">
              Compare sustainability claims against financial and public evidence.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-lg">
            <h2 className="text-lg font-semibold">Generate Risk Report</h2>
            <p className="mt-2 text-sm text-slate-400">
              Produce a greenwashing risk score and legal-ready ESG brief.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}