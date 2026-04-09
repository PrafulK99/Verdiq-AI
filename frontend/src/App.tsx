import { useRef, useState } from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Features from './components/Features';
import CTASection from './components/CTASection';
import Footer from './components/Footer';
import UploadComponent from './components/UploadComponent';
import ClaimsDisplay from './components/ClaimsDisplay';

interface Claim {
  claim_text: string;
  theme: string;
  confidence: number;
  metrics?: string | null;
}

export default function App() {
  const [claims, setClaims] = useState<Claim[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const uploadSectionRef = useRef<HTMLDivElement>(null);

  const handleClaimsExtracted = (extractedClaims: Claim[]) => {
    setClaims(extractedClaims);
  };

  const handleHeroUploadClick = () => {
    uploadSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#0a0f0d] text-[#f9fdf9]">
      <Navigation />
      <Hero onUploadClick={handleHeroUploadClick} />
      <Features />

      {/* Upload Section */}
      <section ref={uploadSectionRef} className="relative py-32 px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 text-center">
            <h2 className="font-headline font-bold text-5xl text-white mb-4">Upload Your Document</h2>
            <p className="text-[#a7aca9] text-lg max-w-2xl mx-auto">
              Upload your Corporate Social Responsibility or sustainability report to extract claims and detect greenwashing
            </p>
          </div>

          <div className="rounded-2xl glass-panel border border-white/10 p-8 backdrop-blur-lg">
            <UploadComponent
              onClaimsExtracted={handleClaimsExtracted}
              onLoading={setIsLoading}
            />
          </div>
        </div>
      </section>

      {/* Claims Display Section */}
      {(claims.length > 0 || isLoading) && (
        <section className="py-32 px-8 overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <div className="rounded-2xl glass-panel border border-white/10 p-8 backdrop-blur-lg">
              <ClaimsDisplay claims={claims} isLoading={isLoading} />
            </div>
          </div>
        </section>
      )}

      <CTASection />
      <Footer />
    </div>
  );
}