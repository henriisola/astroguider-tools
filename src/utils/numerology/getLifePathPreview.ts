export function getLifePathPreview(birthdate: string): string | null {
    if (!birthdate) return null;
  
    const parts = birthdate.split('/');
    if (parts.length !== 3) return null;
  
    const nums = parts.flatMap(p => p.split('').map(Number));
    let sum = nums.reduce((a, b) => a + b, 0);
  
    while (sum > 9 && ![11, 22, 33].includes(sum)) {
      sum = sum
        .toString()
        .split('')
        .map(Number)
        .reduce((a, b) => a + b, 0);
    }
  
    switch (sum) {
      case 1:
        return 'Leadership, independence, and self-confidence.';
      case 2:
        return 'Harmony, cooperation, and sensitivity.';
      case 3:
        return 'Creativity, expression, and joy.';
      case 4:
        return 'Stability, structure, and practicality.';
      case 5:
        return 'Freedom, change, and adventure.';
      case 6:
        return 'Responsibility, family, and care.';
      case 7:
        return 'Wisdom, introspection, and analysis.';
      case 8:
        return 'Power, success, and material achievement.';
      case 9:
        return 'Compassion, endings, and humanitarianism.';
      case 11:
        return 'Inspiration, spiritual insight, and vision.';
      case 22:
        return 'Master builder energy — vision into reality.';
      case 33:
        return 'Compassionate teacher and spiritual nurturer.';
      default:
        return null;
    }
  }
  