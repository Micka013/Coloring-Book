import React from 'react';

interface LogoProps {
  className?: string;
  size?: number;
}

export const ColoriKidLogo: React.FC<LogoProps> = ({ className = "", size = 40 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Open Book - Main Structure */}
      <path
        d="M15 30C15 25 20 22 25 22H50V78H25C20 78 15 75 15 70V30Z"
        fill="white"
        stroke="black"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path
        d="M85 30C85 25 80 22 75 22H50V78H75C80 78 85 75 85 70V30Z"
        fill="white"
        stroke="black"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      
      {/* Book Spine/Center */}
      <path
        d="M50 22V78"
        stroke="black"
        strokeWidth="3"
        strokeLinecap="round"
      />

      {/* Coloring lines on pages */}
      <path
        d="M25 35H40M25 45H40M25 55H40M60 35H75M60 45H75M60 55H75"
        stroke="#E2E8F0"
        strokeWidth="2"
        strokeLinecap="round"
      />
      
      {/* Pencil - Pastel Blue */}
      <g transform="translate(65, 60) rotate(-45)">
        <rect x="0" y="0" width="8" height="30" rx="4" fill="#a7d8ff" stroke="black" strokeWidth="2" />
        <path d="M0 4 L4 0 L8 4" fill="#ff8e8e" stroke="black" strokeWidth="1" />
      </g>

      {/* Magic Sparkles - Yellow */}
      <path
        d="M50 15L52 20L57 22L52 24L50 29L48 24L43 22L48 20L50 15Z"
        fill="#ffe58a"
        stroke="black"
        strokeWidth="1.5"
      />
      <path
        d="M20 15L21.5 18L24.5 19.5L21.5 21L20 24L18.5 21L15.5 19.5L18.5 18L20 15Z"
        fill="#ffe58a"
        stroke="black"
        strokeWidth="1"
      />
    </svg>
  );
};
