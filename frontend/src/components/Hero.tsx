import { useState } from 'react';

interface HeroProps {
  onUploadClick?: () => void;
}

export default function Hero({ onUploadClick }: HeroProps) {
  const [credits] = useState(60);
  const [maxCredits] = useState(450);

  return (
    <header className="relative min-h-screen flex flex-col items-center justify-center pt-20 px-6">
      <div className="video-container">
        <video
          autoPlay
          className="w-full h-full object-cover opacity-40"
          loop
          muted
          playsInline
        >
          <source
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260329_050842_be71947f-f16e-4a14-810c-06e83d23ddb5.mp4"
            type="video/mp4"
          />
        </video>
        <div className="video-overlay"></div>
      </div>

      <div className="relative z-10 w-full max-w-5xl flex flex-col items-center -mt-[50px] text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface-container-high border border-white/5 mb-8">
          <span
            className="material-symbols-outlined text-primary text-[18px]"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            star
          </span>
          <span className="text-[#a7aca9] font-label text-[14px] font-normal uppercase tracking-[0.1em]">
            Discover what's possible
          </span>
        </div>

        {/* Headline */}
        <h1 className="font-fustat font-bold text-[80px] leading-[1.05] tracking-[-4.8px] text-white max-w-4xl mb-6">
          Detect Greenwashing with AI Forensics
        </h1>

        {/* Subheadline */}
        <p className="font-fustat font-medium text-[20px] text-[#a7aca9] max-w-2xl mb-12">
          Upload your information and get powerful insights right away. Work smarter and achieve goals effortlessly.
        </p>

        {/* Search Box UI */}
        <div className="w-full max-w-[728px] glass-panel rounded-[18px] p-2 border border-white/5 shadow-2xl relative">
          <div className="flex items-center px-4 py-3 gap-4">
            <div className="flex-1 flex items-center gap-3">
              <span className="material-symbols-outlined text-primary/60">search</span>
              <input
                className="bg-transparent border-none focus:ring-0 text-white w-full placeholder:text-white/30 font-body"
                placeholder="Type question..."
                type="text"
              />
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 px-2 py-1 bg-white/5 rounded-lg border border-white/5">
                <span className="text-[10px] text-white/40 font-bold uppercase tracking-wider">
                  Credits
                </span>
                <span className="text-[12px] text-primary font-bold">
                  {credits}/{maxCredits}
                </span>
              </div>
              <button
                onClick={onUploadClick}
                className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-black hover:bg-primary transition-colors group"
              >
                <span className="material-symbols-outlined transition-transform group-hover:translate-x-0.5">
                  arrow_forward
                </span>
              </button>
            </div>
          </div>

          {/* Search Box Footer */}
          <div className="flex items-center justify-between px-4 py-2 border-t border-white/5 mt-1">
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-2 text-xs text-white/50 hover:text-white transition-colors">
                <span className="material-symbols-outlined text-sm">attach_file</span>
                Attach
              </button>
              <button className="flex items-center gap-2 text-xs text-white/50 hover:text-white transition-colors">
                <span className="material-symbols-outlined text-sm">mic</span>
                Voice
              </button>
              <button className="flex items-center gap-2 text-xs text-white/50 hover:text-white transition-colors">
                <span className="material-symbols-outlined text-sm">electric_bolt</span>
                Prompts
              </button>
            </div>
            <div className="flex items-center gap-2 text-[10px] text-white/30 uppercase tracking-widest font-bold">
              <span className="material-symbols-outlined text-[14px]">neurology</span>
              Powered by GPT-4o
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
