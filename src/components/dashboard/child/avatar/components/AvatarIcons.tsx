import React from 'react';

// === MALE AVATARS (REDESIGNED) ===

// Level 1: Male Sproutling
export const MaleSproutlingIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 100 100" className={className} xmlns="http://www.w3.org/2000/svg">
    <g>
      <circle cx="50" cy="35" r="12" fill="#F3D4B1"/>
      <path d="M45 28 C 42 25, 58 25, 55 28" stroke="#6B462A" strokeWidth="2" fill="none" strokeLinecap="round"/>
      <circle cx="46" cy="35" r="1.5" fill="black"/>
      <circle cx="54" cy="35" r="1.5" fill="black"/>
      <rect x="42" y="50" width="16" height="25" rx="5" fill="#A7F3D0"/>
      <rect x="42" y="50" width="16" height="10" fill="#34D399"/>
    </g>
  </svg>
);

// Level 2: Male Budding Hero
export const MaleBuddingHeroIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 100 100" className={className} xmlns="http://www.w3.org/2000/svg">
    <g>
      <rect x="60" y="45" width="8" height="35" rx="2" fill="#A3A3A3"/>
      <rect x="58" y="43" width="12" height="4" rx="1" fill="#737373"/>
      <circle cx="50" cy="35" r="12" fill="#F3D4B1"/>
      <path d="M45 28 C 42 25, 58 25, 55 28" stroke="#6B462A" strokeWidth="2" fill="none" strokeLinecap="round"/>
      <circle cx="46" cy="35" r="1.5" fill="black"/>
      <circle cx="54" cy="35" r="1.5" fill="black"/>
      <path d="M48 40 Q 50 42, 52 40" stroke="black" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <rect x="40" y="50" width="20" height="30" rx="5" fill="#60A5FA"/>
      <path d="M40 50 L 60 50 L 50 65 Z" fill="#3B82F6"/>
    </g>
  </svg>
);

// Level 3: Male Health Champion
export const MaleHealthChampionIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 100 100" className={className} xmlns="http://www.w3.org/2000/svg">
    <g>
      <circle cx="35" cy="60" r="15" fill="#D1D5DB"/>
      <path d="M35 52 L 38 58 L 42 55" stroke="#4B5563" strokeWidth="2" fill="none"/>
      <path d="M30 60 L 40 60 M 35 55 L 35 65" stroke="#EF4444" strokeWidth="3" fill="none" strokeLinecap="round"/>
      <rect x="62" y="45" width="8" height="40" rx="2" fill="#E5E7EB"/>
      <path d="M60 43 L 68 43 L 70 50 L 58 50 Z" fill="#737373"/>
      <circle cx="50" cy="35" r="12" fill="#F3D4B1"/>
      <path d="M45 28 C 42 25, 58 25, 55 28" stroke="#6B462A" strokeWidth="2" fill="none" strokeLinecap="round"/>
      <circle cx="46" cy="35" r="1.5" fill="black"/>
      <circle cx="54" cy="35" r="1.5" fill="black"/>
      <rect x="40" y="50" width="20" height="35" rx="5" fill="#3B82F6"/>
      <rect x="35" y="48" width="30" height="10" rx="3" fill="#9CA3AF"/>
    </g>
  </svg>
);

// Level 4: Male Super Guardian
export const MaleSuperGuardianIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 100 100" className={className} xmlns="http://www.w3.org/2000/svg">
    <g>
      <path d="M25 90 L 50 40 L 75 90 Z" fill="#DC2626" opacity="0.8"/>
      <circle cx="35" cy="60" r="18" fill="#FBBF24"/>
      <path d="M30 60 L 40 60 M 35 55 L 35 65" stroke="white" strokeWidth="4" fill="none" strokeLinecap="round"/>
      <path d="M65 40 L 65 85 L 60 90 L 70 90 Z" fill="#F59E0B"/>
      <path d="M63 38 L 67 38 L 72 45 L 58 45 Z" fill="#737373"/>
      <circle cx="50" cy="35" r="12" fill="#F3D4B1"/>
      <path d="M42 25 L 58 25 L 50 20 Z" fill="#9CA3AF"/>
      <path d="M45 28 C 42 25, 58 25, 55 28" stroke="#6B462A" strokeWidth="2" fill="none" strokeLinecap="round"/>
      <rect x="40" y="50" width="20" height="40" rx="5" fill="#2563EB"/>
      <rect x="35" y="48" width="30" height="12" rx="3" fill="#E5E7EB"/>
    </g>
  </svg>
);

// Level 5: Male Wellness Legend
export const MaleWellnessLegendIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 100 100" className={className} xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="male-grad" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
        <stop offset="0%" style={{stopColor: '#FDE047', stopOpacity: 0.8}} />
        <stop offset="100%" style={{stopColor: '#FDE047', stopOpacity: 0}} />
      </radialGradient>
    </defs>
    <rect x="0" y="0" width="100" height="100" fill="url(#male-grad)"/>
    <g>
      <path d="M10 95 L 50 30 L 90 95 Z" fill="#F59E0B" opacity="0.9"/>
      <path d="M65 40 L 65 85 L 60 95 L 70 95 Z" fill="#FDE047"/>
      <path d="M63 38 L 67 38 L 75 45 L 55 45 Z" fill="#FBBF24"/>
      <circle cx="35" cy="60" r="18" fill="#FDE047"/>
      <path d="M30 60 L 40 60 M 35 55 L 35 65" stroke="white" strokeWidth="4" fill="none" strokeLinecap="round"/>
      <circle cx="50" cy="35" r="12" fill="#F3D4B1"/>
      <path d="M40 25 L 60 25 L 50 18 Z" fill="#FBBF24"/>
      <path d="M45 28 C 42 25, 58 25, 55 28" stroke="#6B462A" strokeWidth="2" fill="none" strokeLinecap="round"/>
      <rect x="40" y="50" width="20" height="40" rx="5" fill="#1E40AF"/>
      <rect x="35" y="48" width="30" height="12" rx="3" fill="#FBBF24"/>
    </g>
  </svg>
);

// === FEMALE AVATARS (REDESIGNED) ===

// Level 1: Female Sproutling
export const FemaleSproutlingIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 100 100" className={className} xmlns="http://www.w3.org/2000/svg">
    <g>
      <circle cx="50" cy="35" r="12" fill="#FAD1E2"/>
      <path d="M40 25 C 45 15, 55 15, 60 25" stroke="#C13370" strokeWidth="2" fill="#F472B6"/>
      <circle cx="46" cy="35" r="1.5" fill="black"/>
      <circle cx="54" cy="35" r="1.5" fill="black"/>
      <path d="M42 50 L 58 50 L 55 80 L 45 80 Z" fill="#D8B4FE"/>
    </g>
  </svg>
);

// Level 2: Female Budding Hero
export const FemaleBuddingHeroIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 100 100" className={className} xmlns="http://www.w3.org/2000/svg">
    <g>
      <rect x="62" y="45" width="6" height="35" rx="3" fill="#A16207"/>
      <circle cx="65" cy="42" r="5" fill="#BEF264"/>
      <circle cx="50" cy="35" r="12" fill="#FAD1E2"/>
      <path d="M40 25 C 45 15, 55 15, 60 25" stroke="#C13370" strokeWidth="2" fill="#F472B6"/>
      <circle cx="46" cy="35" r="1.5" fill="black"/>
      <circle cx="54" cy="35" r="1.5" fill="black"/>
      <path d="M48 40 Q 50 42, 52 40" stroke="black" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M40 50 L 60 50 L 55 85 L 45 85 Z" fill="#C084FC"/>
      <path d="M45 50 C 40 60, 60 60, 55 50" stroke="#A855F7" strokeWidth="2" fill="none"/>
    </g>
  </svg>
);

// Level 3: Female Health Champion
export const FemaleHealthChampionIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 100 100" className={className} xmlns="http://www.w3.org/2000/svg">
    <g>
      <rect x="62" y="45" width="6" height="40" rx="3" fill="#CA8A04"/>
      <circle cx="65" cy="42" r="6" fill="#A3E635"/>
      <path d="M65 38 L 68 42 L 65 46 L 62 42 Z" fill="white" />
      <circle cx="35" cy="60" r="10" fill="#38BDF8" />
      <path d="M32 58 L 38 62 M 32 62 L 38 58" stroke="white" strokeWidth="2" />
      <circle cx="50" cy="35" r="12" fill="#FAD1E2"/>
      <path d="M40 25 C 45 15, 55 15, 60 25" stroke="#C13370" strokeWidth="2" fill="#F472B6"/>
      <path d="M40 50 L 60 50 L 55 90 L 45 90 Z" fill="#A855F7"/>
      <path d="M50 55 L 53 61 L 47 61 Z" fill="#FBBF24"/>
    </g>
  </svg>
);

// Level 4: Female Super Guardian
export const FemaleSuperGuardianIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 100 100" className={className} xmlns="http://www.w3.org/2000/svg">
    <g>
      <path d="M25 90 L 50 40 L 75 90 Z" fill="#FB7185" opacity="0.8"/>
      <rect x="62" y="40" width="6" height="45" rx="3" fill="#F59E0B"/>
      <circle cx="65" cy="37" r="8" fill="#ECFCCB"/>
      <path d="M65 32 L 68 37 L 65 42 L 62 37 Z" fill="#84CC16" />
      <circle cx="35" cy="60" r="12" fill="#0EA5E9" />
      <path d="M30 58 L 40 62 L 35 53 Z" fill="white" />
      <path d="M30 62 L 40 58 L 35 67 Z" fill="white" />
      <circle cx="50" cy="35" r="12" fill="#FAD1E2"/>
      <path d="M48 22 L 52 22 L 50 18 Z" fill="#D1D5DB"/>
      <path d="M40 25 C 45 15, 55 15, 60 25" stroke="#C13370" strokeWidth="2" fill="#F472B6"/>
      <path d="M40 50 L 60 50 L 55 95 L 45 95 Z" fill="#9333EA"/>
    </g>
  </svg>
);

// Level 5: Female Wellness Legend
export const FemaleWellnessLegendIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 100 100" className={className} xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="female-grad" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
        <stop offset="0%" style={{stopColor: '#F0ABFC', stopOpacity: 0.8}} />
        <stop offset="100%" style={{stopColor: '#F0ABFC', stopOpacity: 0}} />
      </radialGradient>
    </defs>
    <rect x="0" y="0" width="100" height="100" fill="url(#female-grad)"/>
    <g>
      <path d="M10 95 L 50 30 L 90 95 Z" fill="#F472B6" opacity="0.9"/>
      <rect x="62" y="35" width="6" height="55" rx="3" fill="#FCD34D"/>
      <circle cx="65" cy="32" r="10" fill="white"/>
      <path d="M65 25 L 69 32 L 65 39 L 61 32 Z" fill="#A3E635" />
      <circle cx="35" cy="60" r="14" fill="#7DD3FC" />
      <path d="M35 50 L 38 58 L 32 58 Z" fill="white"/>
      <path d="M35 70 L 38 62 L 32 62 Z" fill="white"/>
      <circle cx="50" cy="35" r="12" fill="#FAD1E2"/>
      <path d="M48 22 L 52 22 L 50 15 Z" fill="#FBBF24"/>
      <path d="M40 25 C 45 15, 55 15, 60 25" stroke="#C13370" strokeWidth="2" fill="#F472B6"/>
      <path d="M40 50 L 60 50 L 55 95 L 45 95 Z" fill="#7E22CE"/>
    </g>
  </svg>
);

// === BADGE ICONS ===

export const FruitBadgeIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className} xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" fill="#FBBF24" stroke="#F59E0B" strokeWidth="2"/>
    <path d="M12 2 C 8 2, 8 7, 12 7 S 16 2, 12 2" fill="#34D399"/>
    <path d="M15 11 C 15 14, 9 14, 9 11 C 9 8, 15 8, 15 11 Z" fill="#EF4444"/>
  </svg>
);

export const ExerciseBadgeIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className} xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" fill="#9CA3AF" stroke="#6B7280" strokeWidth="2"/>
    <path d="M8 12 H 16 M 12 8 V 16" stroke="white" strokeWidth="2" strokeLinecap="round"/>
    <circle cx="12" cy="12" r="3" fill="none" stroke="white" strokeWidth="2"/>
  </svg>
);

export const LearningBadgeIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className} xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" fill="#60A5FA" stroke="#3B82F6" strokeWidth="2"/>
    <path d="M7 8 L 17 8 M 7 12 L 17 12 M 7 16 L 13 16" stroke="white" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

export const SleepBadgeIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className} xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" fill="#818CF8" stroke="#6366F1" strokeWidth="2"/>
    <path d="M7 12 C 7 15, 12 17, 17 12 C 12 17, 7 15, 7 12" fill="#FDE047" />
    <path d="M9 10 C 9 11, 10 11, 10 10" fill="#FDE047" />
    <path d="M12 9 C 12 10, 13 10, 13 9" fill="#FDE047" />
  </svg>
);
