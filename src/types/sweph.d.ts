declare module 'sweph' {
  export const SUN: number;
  export const MOON: number;
  export const MERCURY: number;
  export const VENUS: number;
  export const MARS: number;
  export const FLG_SWIEPH: number;

  export function set_ephe_path(path: string): void;
  export function julday(year: number, month: number, day: number, hour: number): number;
  
  export function calc_ut(julianDay: number, planetId: number, flags: number, callback: (result: {
    error?: string;
    longitude: number;
  }) => void): void;

  export function houses(julianDay: number, lat: number, lon: number, system: string, callback: (result: {
    error?: string;
    ascendant: number;
  }) => void): void;
} 