// ===============================
// 🔣 CHALDEAN COMPOUND NUMBERS
// ===============================
// Compound numbers 10–52 carry specific meanings in Chaldean numerology.
// These are NOT reduced further — the compound IS the message.

export interface CompoundMeaning {
    number: number;
    title: string;
    energy: 'fortunate' | 'challenging' | 'karmic' | 'master' | 'neutral';
    description: string;
    keywords: string[];
  }
  
  export const COMPOUND_MEANINGS: Record<number, CompoundMeaning> = {
    10: {
      number: 10,
      title: 'The Wheel of Fortune',
      energy: 'fortunate',
      description: 'A number of rise and fall — great potential for success, but dependent on the choices made. Honours and recognition are possible, but nothing is guaranteed without action.',
      keywords: ['fortune', 'cycles', 'recognition', 'potential'],
    },
    11: {
      number: 11,
      title: 'The Fearful and the Warned',
      energy: 'challenging',
      description: 'A number of hidden power and concealed enemies. Suggests caution in partnerships and agreements. Strength comes from working alone rather than relying on others.',
      keywords: ['caution', 'hidden forces', 'independence', 'alertness'],
    },
    12: {
      number: 12,
      title: 'The Sacrifice',
      energy: 'challenging',
      description: 'Indicates a tendency to be misunderstood or to suffer for the benefit of others. A deeply spiritual number that calls for patience and inner strength.',
      keywords: ['sacrifice', 'misunderstanding', 'spirituality', 'patience'],
    },
    13: {
      number: 13,
      title: 'The Regenerator',
      energy: 'karmic',
      description: 'Not unlucky — but demanding. Represents change, transformation, and the need to rebuild. Those who embrace hard work find this number brings extraordinary results.',
      keywords: ['transformation', 'hard work', 'rebuilding', 'change'],
    },
    14: {
      number: 14,
      title: 'The Movement',
      energy: 'karmic',
      description: 'A number of movement, risk, and the unexpected. Brings both danger and opportunity through speculation and change. Requires discipline to harness its restless energy.',
      keywords: ['movement', 'risk', 'freedom', 'discipline'],
    },
    15: {
      number: 15,
      title: 'The Magician',
      energy: 'fortunate',
      description: 'A highly magnetic number associated with persuasion, artistry, and the ability to attract what is needed. Strong occult connections — powerful for those with spiritual intentions.',
      keywords: ['magnetism', 'artistry', 'attraction', 'occult'],
    },
    16: {
      number: 16,
      title: 'The Shattered Citadel',
      energy: 'karmic',
      description: 'A karmic number associated with unexpected collapse — often of plans built on unstable foundations. A warning to build honestly and to avoid pride. Transformation follows destruction.',
      keywords: ['collapse', 'pride', 'karma', 'transformation'],
    },
    17: {
      number: 17,
      title: 'The Star of the Magi',
      energy: 'fortunate',
      description: 'One of the most fortunate compound numbers. Associated with immortality, lasting legacy, and spiritual strength. Success that endures beyond the individual.',
      keywords: ['legacy', 'immortality', 'spiritual strength', 'success'],
    },
    18: {
      number: 18,
      title: 'The Materialism Trap',
      energy: 'challenging',
      description: 'A number of conflict between the material and spiritual. Associated with deception, family conflict, and battles with the self. Requires conscious spiritual practice to overcome.',
      keywords: ['conflict', 'materialism', 'deception', 'self-mastery'],
    },
    19: {
      number: 19,
      title: 'The Prince of Heaven',
      energy: 'fortunate',
      description: 'The most fortunate of all compound numbers. Represents success, happiness, and fulfilment. Those with this number are protected and tend to succeed in whatever they pursue.',
      keywords: ['success', 'happiness', 'protection', 'fulfilment'],
    },
    20: {
      number: 20,
      title: 'The Awakening',
      energy: 'neutral',
      description: 'A number of spiritual awakening and a new purpose. Often marks a turning point — a call to rise above the ordinary. Not material in nature; its rewards are inner.',
      keywords: ['awakening', 'purpose', 'turning point', 'spirituality'],
    },
    21: {
      number: 21,
      title: 'The Crown of the Magi',
      energy: 'fortunate',
      description: 'A number of advancement, victory, and elevation. Indicates success achieved through one\'s own efforts. Creativity and intelligence combined with fortunate timing.',
      keywords: ['victory', 'advancement', 'creativity', 'success'],
    },
    22: {
      number: 22,
      title: 'The Master Builder',
      energy: 'master',
      description: 'One of the three Master Numbers. Extraordinary capacity to build things of lasting significance — businesses, systems, legacies. Combines vision with practical execution.',
      keywords: ['mastery', 'building', 'legacy', 'vision'],
    },
    23: {
      number: 23,
      title: 'The Royal Star of the Lion',
      energy: 'fortunate',
      description: 'A number of help from those in power and protection from above. Brings assistance at critical moments. Associated with charm, talent, and natural magnetism.',
      keywords: ['protection', 'charm', 'assistance', 'talent'],
    },
    24: {
      number: 24,
      title: 'The Love and Money Number',
      energy: 'fortunate',
      description: 'Attracts love, financial assistance, and support from others. A deeply social number — success often comes through partnerships, family, or community.',
      keywords: ['love', 'money', 'partnership', 'support'],
    },
    25: {
      number: 25,
      title: 'The Strength Through Experience',
      energy: 'neutral',
      description: 'Success earned through observation, learning, and accumulated wisdom. Not instantly fortunate — but deeply reliable. Favours those who study before they act.',
      keywords: ['wisdom', 'experience', 'observation', 'reliability'],
    },
    26: {
      number: 26,
      title: 'The Partnerships Warning',
      energy: 'challenging',
      description: 'A warning number around partnerships, alliances, and associations. Those carried by others\' ambitions may fall with them. Choose collaborators with great care.',
      keywords: ['warning', 'partnerships', 'caution', 'discernment'],
    },
    27: {
      number: 27,
      title: 'The Sceptre',
      energy: 'fortunate',
      description: 'A commanding number — the ability to give orders and be obeyed. Associated with leadership, authority, and the capacity to inspire loyalty in others.',
      keywords: ['authority', 'leadership', 'command', 'loyalty'],
    },
    28: {
      number: 28,
      title: 'The Lost Cause',
      energy: 'challenging',
      description: 'A number of great promise that is often unrealised. Suggests the risk of losing what has been built through misjudgement or overconfidence. Requires humility.',
      keywords: ['promise', 'risk', 'humility', 'overconfidence'],
    },
    29: {
      number: 29,
      title: 'The Grace Under Pressure',
      energy: 'challenging',
      description: 'Trials, uncertainty, and the need to trust in a higher power. A deeply spiritual number that develops character through difficulty. Faith is its greatest resource.',
      keywords: ['trials', 'faith', 'uncertainty', 'spiritual growth'],
    },
    30: {
      number: 30,
      title: 'The Loner',
      energy: 'neutral',
      description: 'A number of solitude and inner focus. Neither fortunate nor unfortunate — its success depends entirely on the quality of the individual\'s thinking and intentions.',
      keywords: ['solitude', 'focus', 'independence', 'intention'],
    },
    31: {
      number: 31,
      title: 'The Hermit',
      energy: 'neutral',
      description: 'Similar to 30 but with greater isolation. The world may misunderstand this person. Success comes through sustained self-reliance and a willingness to walk an unusual path.',
      keywords: ['isolation', 'self-reliance', 'unusual path', 'independence'],
    },
    32: {
      number: 32,
      title: 'The Magic of the Unexpected',
      energy: 'fortunate',
      description: 'Like 23 — a fortunate number that brings help from unexpected sources. Communication and the power of words are central. Success through persuasion and connection.',
      keywords: ['unexpected help', 'communication', 'persuasion', 'connection'],
    },
    33: {
      number: 33,
      title: 'The Master Teacher',
      energy: 'master',
      description: 'The rarest Master Number. A life dedicated to healing, teaching, and compassionate service. Extraordinary creative and spiritual power — but demands selflessness.',
      keywords: ['teaching', 'healing', 'compassion', 'service'],
    },
    34: {
      number: 34,
      title: 'The Spiritual Knowledge',
      energy: 'fortunate',
      description: 'Wisdom acquired through experience and study. A number of quiet strength — the kind that comes from having lived through difficulty and emerged with understanding.',
      keywords: ['wisdom', 'spiritual knowledge', 'strength', 'experience'],
    },
    35: {
      number: 35,
      title: 'The Business Mind',
      energy: 'neutral',
      description: 'Practical intelligence applied to commerce and organisation. Success through systems, analysis, and detail-oriented thinking. Not glamorous — but quietly effective.',
      keywords: ['business', 'analysis', 'organisation', 'practicality'],
    },
    36: {
      number: 36,
      title: 'The Counsellor',
      energy: 'fortunate',
      description: 'Great intellectual gifts combined with human understanding. A number of wise counsel — others are drawn to this person for guidance. Leadership through wisdom rather than force.',
      keywords: ['counsel', 'wisdom', 'guidance', 'intellectual gifts'],
    },
    37: {
      number: 37,
      title: 'The Fortunate Partnership',
      energy: 'fortunate',
      description: 'Harmony in personal and professional relationships. A number associated with deep friendship, loyalty, and the kind of partnership that lasts a lifetime.',
      keywords: ['partnership', 'harmony', 'loyalty', 'friendship'],
    },
    38: {
      number: 38,
      title: 'The Practical Visionary',
      energy: 'neutral',
      description: 'Similar to 11 — strong vision, but requires grounding. Ideas are ahead of their time. The challenge is to bring them into practical reality without losing the original spark.',
      keywords: ['vision', 'practicality', 'grounding', 'ideas'],
    },
    39: {
      number: 39,
      title: 'The Artist\'s Fame',
      energy: 'fortunate',
      description: 'Recognition through creative and artistic expression. A number that draws public attention to talent. Fame and admiration are possible — if the gift is developed seriously.',
      keywords: ['fame', 'artistry', 'recognition', 'creativity'],
    },
    40: {
      number: 40,
      title: 'The Master of Focus',
      energy: 'neutral',
      description: 'Intense focus and the ability to complete what others abandon. Success through sheer concentration and endurance. Not flashy — but produces results that outlast the trends.',
      keywords: ['focus', 'endurance', 'completion', 'concentration'],
    },
    41: {
      number: 41,
      title: 'The Driven Mind',
      energy: 'fortunate',
      description: 'Ambition backed by intellectual power. A number associated with leaders who think before they act. Success in fields that require both strategy and determination.',
      keywords: ['ambition', 'strategy', 'intellect', 'leadership'],
    },
    42: {
      number: 42,
      title: 'The Responsible One',
      energy: 'neutral',
      description: 'A number of duty, family, and community responsibility. Success comes through service to others rather than personal ambition. Deep satisfaction in doing what is right.',
      keywords: ['duty', 'responsibility', 'service', 'community'],
    },
    43: {
      number: 43,
      title: 'The Revolution',
      energy: 'challenging',
      description: 'A number of upheaval and forced change. What is built on weak foundations will not survive. Transformation is inevitable — the question is whether it is chosen or imposed.',
      keywords: ['upheaval', 'transformation', 'change', 'foundations'],
    },
    44: {
      number: 44,
      title: 'The Master of Material Reality',
      energy: 'master',
      description: 'Associated with extraordinary discipline and the ability to build material empires. Rare and powerful — those who carry this vibration have unusual capacity for long-term construction.',
      keywords: ['discipline', 'material mastery', 'empire', 'long-term'],
    },
    45: {
      number: 45,
      title: 'The Strategist',
      energy: 'neutral',
      description: 'Exceptional ability to plan and to see the long game. Success through patience and timing. A number of those who prefer to move quietly and strike at exactly the right moment.',
      keywords: ['strategy', 'patience', 'timing', 'planning'],
    },
    46: {
      number: 46,
      title: 'The Natural Leader',
      energy: 'fortunate',
      description: 'Leadership that arises naturally rather than being claimed. Others follow willingly. A number of quiet authority and the ability to unite people around a common purpose.',
      keywords: ['leadership', 'authority', 'unity', 'purpose'],
    },
    47: {
      number: 47,
      title: 'The Illuminated Mind',
      energy: 'fortunate',
      description: 'Deep spiritual insight combined with practical intelligence. A rare combination — the ability to understand both the seen and unseen worlds and to act wisely in both.',
      keywords: ['insight', 'spirituality', 'intelligence', 'wisdom'],
    },
    48: {
      number: 48,
      title: 'The Planner',
      energy: 'neutral',
      description: 'Success through meticulous planning and analysis. A number of those who research before acting. Not impulsive — but when they move, they rarely fail.',
      keywords: ['planning', 'analysis', 'research', 'precision'],
    },
    49: {
      number: 49,
      title: 'The Unfinished Work',
      energy: 'challenging',
      description: 'A number that suggests projects left incomplete or goals not quite reached. The lesson is persistence and following through — the reward waits just past the point of giving up.',
      keywords: ['persistence', 'completion', 'follow-through', 'patience'],
    },
    50: {
      number: 50,
      title: 'The Worldly Success',
      energy: 'fortunate',
      description: 'Recognition on a broad scale — success that reaches beyond the local or personal. A number of those whose work or name becomes known to many.',
      keywords: ['recognition', 'broad success', 'fame', 'worldly'],
    },
    51: {
      number: 51,
      title: 'The Warrior\'s Reward',
      energy: 'fortunate',
      description: 'Victory through persistence and courage. A number of those who have fought hard and earned their success. The struggle is real — but so is the reward.',
      keywords: ['victory', 'courage', 'persistence', 'earned success'],
    },
    52: {
      number: 52,
      title: 'The Thinker',
      energy: 'fortunate',
      description: 'Exceptional intellectual gifts and the ability to synthesise complex ideas. Success in fields of research, writing, teaching, or any domain that rewards deep thought.',
      keywords: ['intellect', 'research', 'synthesis', 'deep thought'],
    },
  };
  
  // ─── Energy color mapping ─────────────────────────────────────
  
  export const COMPOUND_ENERGY_COLORS: Record<CompoundMeaning['energy'], string> = {
    fortunate:   '#54ab8c',
    challenging: '#c97070',
    karmic:      '#b07edb',
    master:      '#ffd700',
    neutral:     '#7a8a9a',
  };
  
  export const COMPOUND_ENERGY_LABELS: Record<CompoundMeaning['energy'], string> = {
    fortunate:   'Fortunate',
    challenging: 'Challenging',
    karmic:      'Karmic',
    master:      'Master',
    neutral:     'Neutral',
  };
  
  // ─── Helper ───────────────────────────────────────────────────
  
  export function getCompoundMeaning(compound: number): CompoundMeaning | null {
    if (compound < 10 || compound > 52) return null;
    return COMPOUND_MEANINGS[compound] ?? null;
  }