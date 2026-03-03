import React from 'react';

const LoadingPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full bg-zinc-100 font-sans">
      {/* Central Loader Container */}
      <div className="relative flex flex-col items-center">
        
        {/* The Animated Bar */}
        <div className="w-48 h-[1px] bg-zinc-300 overflow-hidden relative">
          <div className="absolute inset-0 bg-zinc-800 w-1/3 animate-loading-slide"></div>
        </div>

        {/* Loading Text */}
        <p className="mt-6 text-[10px] uppercase tracking-[0.4em] text-zinc-500 animate-pulse">
          Loading Content
        </p>

        {/* Subtle Decorative Element */}
        <span className="mt-2 text-[8px] text-zinc-400 italic font-serif">
          Please wait a moment
        </span>
      </div>

      {/* Tailwind Animation Config Note: 
          You'll need to add these keyframes to your tailwind.config.js 
          OR use the <style> block below for a quick fix 
      */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes loading-slide {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(300%); }
        }
        .animate-loading-slide {
          animation: loading-slide 1.5s infinite ease-in-out;
        }
      `}} />
    </div>
  );
};

export default LoadingPage;