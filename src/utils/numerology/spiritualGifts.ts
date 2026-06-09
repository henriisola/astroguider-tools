// utils/numerology/spiritualGifts.ts

export function getSpiritualGift(birthday: number): [string, string, string] {
    const map: { [key: number]: [string, string, string] } = {
      1: ['Claircognizance', '👁️', 'Intuitive knowing without logical explanation.'],
      2: ['Clairvoyance', '🌀', 'Clear inner vision — seeing beyond the physical.'],
      3: ['Telepathy', '🧠', 'Mind-to-mind communication and sensing thoughts.'],
      4: ['Psychometry', '📖', 'Reading objects or places by touching them.'],
      5: ['Precognition', '🔮', 'Sensing future events before they happen.'],
      6: ['Energetic Empathy', '🪷', 'Feeling others’ emotions or energy deeply.'],
      7: ['Clairaudience', '🗝️', 'Hearing intuitive messages or inner voices.'],
      8: ['Clairsentience', '🕯️', 'Feeling truth or energy through physical sensation.'],
      9: ['Mediumship', '🪽', 'Connecting with spirits and receiving messages.'],
      10: ['Claircognizance', '👁️', 'Intuitive knowing without logical explanation.'],
      11: ['Clairvoyance', '🌀', 'Clear inner vision — seeing beyond the physical.'],
      12: ['Telepathy', '🧠', 'Mind-to-mind communication and sensing thoughts.'],
      13: ['Psychometry', '📖', 'Reading objects or places by touching them.'],
      14: ['Precognition', '🔮', 'Sensing future events before they happen.'],
      15: ['Energetic Empathy', '🪷', 'Feeling others’ emotions or energy deeply.'],
      16: ['Clairaudience', '🗝️', 'Hearing intuitive messages or inner voices.'],
      17: ['Clairsentience', '🕯️', 'Feeling truth or energy through physical sensation.'],
      18: ['Mediumship', '🪽', 'Connecting with spirits and receiving messages.'],
      19: ['Claircognizance', '👁️', 'Intuitive knowing without logical explanation.'],
      20: ['Clairvoyance', '🌀', 'Clear inner vision — seeing beyond the physical.'],
      21: ['Telepathy', '🧠', 'Mind-to-mind communication and sensing thoughts.'],
      22: ['Psychometry', '📖', 'Reading objects or places by touching them.'],
      23: ['Precognition', '🔮', 'Sensing future events before they happen.'],
      24: ['Energetic Empathy', '🪷', 'Feeling others’ emotions or energy deeply.'],
      25: ['Clairaudience', '🗝️', 'Hearing intuitive messages or inner voices.'],
      26: ['Clairsentience', '🕯️', 'Feeling truth or energy through physical sensation.'],
      27: ['Mediumship', '🪽', 'Connecting with spirits and receiving messages.'],
      28: ['Claircognizance', '👁️', 'Intuitive knowing without logical explanation.'],
      29: ['Clairvoyance', '🌀', 'Clear inner vision — seeing beyond the physical.'],
      30: ['Telepathy', '🧠', 'Mind-to-mind communication and sensing thoughts.'],
      31: ['Psychometry', '📖', 'Reading objects or places by touching them.'],
    };
  
    return map[birthday] ?? [null, null, null];
  }
  