import React from 'react';

interface LogoProps {
  className?: string;
  iconOnly?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'primary' | 'dark' | 'light';
}

export const DevasyaLogo: React.FC<LogoProps> = ({
  className = '',
  iconOnly = false,
  size = 'md',
  variant = 'primary',
}) => {
  const iconSizeMap = {
    sm: 'w-7 h-7',
    md: 'w-10 h-10',
    lg: 'w-14 h-14',
    xl: 'w-20 h-20',
  };

  const textPrimary = variant === 'light' ? 'text-white' : 'text-[#1c1917]';
  const textSub = variant === 'light' ? 'text-stone-300' : 'text-[#dc6309]';
  const strokeColor = variant === 'light' ? '#ffffff' : variant === 'primary' ? '#dc6309' : '#1c1917';

  return (
    <div className={`flex items-center gap-2.5 sm:gap-3 ${className}`}>
      {/* Peacock SVG Emblem strictly matching user's uploaded logo */}
      <svg
        className={`${iconSizeMap[size]} shrink-0 transition-transform duration-300 hover:scale-105`}
        viewBox="0 0 500 500"
        fill="none"
        stroke={strokeColor}
        strokeLinecap="round"
        strokeLinejoin="round"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Devasya Peacock Emblem"
      >
        {/* Tail Fan Sector Outer Boundary */}
        <path
          d="M 85 450 C 70 340 100 180 290 35 L 290 270 Z"
          strokeWidth="15"
        />

        {/* Inner Curved Stem Line */}
        <path
          d="M 120 420 C 130 330 170 200 285 125"
          strokeWidth="10"
        />

        {/* 4 Feather Eyelets */}
        <path
          d="M 260 120 C 240 85 215 90 215 115 C 215 135 240 150 260 120 Z"
          strokeWidth="12"
        />
        <path
          d="M 195 190 C 160 165 140 180 140 205 C 140 225 170 235 195 190 Z"
          strokeWidth="12"
        />
        <path
          d="M 160 275 C 120 250 100 270 100 295 C 100 320 130 325 160 275 Z"
          strokeWidth="12"
        />
        <path
          d="M 160 365 C 110 350 90 375 90 400 C 90 420 125 430 160 365 Z"
          strokeWidth="12"
        />

        {/* Lower Body Diagonal Support / Wedge */}
        <path
          d="M 135 465 L 340 295 L 340 405 Z"
          strokeWidth="15"
        />

        {/* Peacock Head Plume */}
        <path
          d="M 360 85 C 340 60 325 70 335 55 C 345 40 355 45 365 70"
          strokeWidth="12"
        />

        {/* Head & Beak Profile */}
        <path
          d="M 340 145 C 330 115 340 85 365 85 C 385 85 415 115 415 115 L 360 135 Z"
          strokeWidth="13"
        />

        {/* Graceful S-curve Neck to Full Chest & Belly */}
        <path
          d="M 360 135 C 365 175 425 245 425 340 C 425 390 385 415 340 415"
          strokeWidth="15"
        />

        {/* Vertical Central Line */}
        <path
          d="M 330 145 L 330 405"
          strokeWidth="15"
        />

        {/* Legs */}
        <line x1="300" y1="420" x2="335" y2="475" strokeWidth="15" />
        <line x1="340" y1="415" x2="375" y2="475" strokeWidth="15" />
      </svg>

      {!iconOnly && (
        <div className="flex flex-col text-left">
          <span
            className={`font-royal tracking-[0.25em] text-lg sm:text-2xl font-bold uppercase ${textPrimary} leading-none`}
          >
            DEVASYA
          </span>
          <span
            className={`text-[9px] sm:text-[10px] tracking-[0.35em] uppercase font-semibold ${textSub} mt-1`}
          >
            KHAN MARKET • DELHI
          </span>
        </div>
      )}
    </div>
  );
};
