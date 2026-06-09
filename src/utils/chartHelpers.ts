// src/utils/chartHelpers.ts

export function getPlanetColor(name: string): string {
    switch (name.toLowerCase()) {
      case 'sun': return '#FFD700'; // Gold
      case 'moon': return '#B0C4DE'; // Light Steel Blue
      case 'mercury': return '#9ACD32'; // YellowGreen
      case 'venus': return '#FF69B4'; // HotPink
      case 'mars': return '#FF4500'; // OrangeRed
      case 'jupiter': return '#FFA500'; // Orange
      case 'saturn': return '#DAA520'; // GoldenRod
      case 'rahu': return '#8A2BE2'; // BlueViolet
      case 'ketu': return '#708090'; // SlateGray
      default: return '#FFFFFF'; // White fallback
    }
  }
  
  export function getZodiacSymbol(index: number): string {
    const symbols = [
      '♈', '♉', '♊', '♋', '♌', '♍',
      '♎', '♏', '♐', '♑', '♒', '♓',
    ];
    return symbols[index % 12];
  }
  