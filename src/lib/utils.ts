import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function round2(value: number) {
  return Math.round(value * 100) / 100
}

export function round6(value: number) {
  return Math.round(value * 1_000_000) / 1_000_000
}
