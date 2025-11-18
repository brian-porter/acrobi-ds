import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Re-export class-variance-authority for convenience
export { cva, type VariantProps } from 'class-variance-authority';
