import type React from 'react';

export interface AvatarStage {
  level: number;
  name: string;
  minPoints: number;
  Icon: React.FC<{ className?: string }>;
  description: string;
}

export interface Badge {
  name: string;
  minPoints: number;
  Icon: React.FC<{ className?: string }>;
  description: string;
}
