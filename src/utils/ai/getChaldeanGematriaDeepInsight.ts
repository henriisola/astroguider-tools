export function getChaldeanGematriaDeepInsight(
    soulUrge: number,
    expression: number,
    reduced: number
  ): string {
    const insights: string[] = [];
  
    if (expression === 22) {
      insights.push(
        "You are seen as a master builder – someone who can manifest large visions into reality with strategy and precision."
      );
    } else if (expression === 11) {
      insights.push(
        "You carry intuitive and visionary energy – your words and presence inspire those around you."
      );
    }
  
    if (soulUrge === 6 || reduced === 6) {
      insights.push(
        "Compassion and service are at the heart of your calling. Relationships and harmony matter deeply to you."
      );
    } else if (soulUrge === 7) {
      insights.push(
        "Your soul seeks truth and spiritual wisdom – solitude, study, and self-reflection guide your path."
      );
    }
  
    if (reduced === 8) {
      insights.push(
        "You are meant to master material success – leadership, authority, and legacy are key themes."
      );
    } else if (reduced === 9) {
      insights.push(
        "Humanitarian values define your energetic output – compassion, sacrifice, and transformation follow your path."
      );
    }
  
    if (insights.length === 0) {
      return "Your numbers suggest a balanced and versatile nature – no single dominant trait, but a harmonious blend of potentials.";
    }
  
    return insights.join(" ");
  }
  