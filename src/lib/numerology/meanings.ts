export type NumMeaning = {
  keyword: string;
  text: string;              // 2 – 3 paragraphs – keep it concise!
};

export const NUM_MEANINGS: Record<number, NumMeaning> = {
  1: {
    keyword: 'Pioneer',
    text: `You are the spark that ignites new cycles. Independence and
decisiveness are your native tongue; you’d rather lead than follow.

At your best you show others how to cut through doubt and move forward.
When imbalanced you may appear impatient or even domineering – the cure
is remembering that **leadership and listening** are twins.`,
  },

  2: {
    keyword: 'Diplomat',
    text: `If the 1 is a sword, the 2 is a tuning‑fork. You sense nuance,
subtext and the emotional weather of any room.

Because you *feel* before you *think*, cooperation and peacemaking are
natural gifts. Watch out for indecision or people‑pleasing; your soul
signed up to master the art of balanced partnership, not self‑erasure.`,
  },

  3: {
    keyword: 'Creative Communicator',
    text: `Words, images, melody – they all rush through you looking for a
stage. The world mirrors back your optimism; laughter is both shield and
medicine.

Yet too much sparkle can become scattering. The growth‑edge of the 3 is
bringing discipline to talent so inspiration lands as *actual* works,
not unfinished sketches.`,
  },

  4: {
    keyword: 'Builder',
    text: `Order, structure and the long game – these are your elements.
You see foundations where others see dirt.

You earn trust because you deliver. When stress tightens its grip, you
may slip into rigidity or workaholism. Periodic play and nature time
keep the 4 fresh so your *blueprints* don’t become *prisons*.`,
  },

  5: {
    keyword: 'Freedom Seeker',
    text: `Change is your university. Travel, ideas and sensory variety
fertilize your mind; you’re here to **experience first, explain later**.

The shadow of the 5 is excess – too many plates spinning, or pleasure
without purpose. Channel the restless current into teaching what you
learn on the road and you become a living antidote to stagnation.`,
  },

  6: {
    keyword: 'Harmoniser',
    text: `Love, beauty and responsibility braid together in the 6. You’re
drawn to caretaking, design, community building – anywhere something
*better* can be nurtured.

Perfectionism is the trap door: when ideals eclipse reality you may
smother those you wish to help. The secret is serving with an open palm,
not a closed script.`,
  },

  7: {
    keyword: 'Seeker of Truth',
    text: `Mystery lures you the way honey lures bees. Analysis,
meditation, research – anything that peels back the veil calls your name.

Because you spend long stretches inward, others may label you aloof.
Share your insights in digestible bites and you’ll be valued as the
oracle rather than the hermit.`,
  },

  8: {
    keyword: 'Power‑Manifestor',
    text: `The 8 is the CEO of numbers, here to marry *vision with
execution*. Money, influence, systems – you sense how they connect.

The karmic test is integrity. If power becomes an end in itself, lessons
arrive through loss or legal snares. Stand tall **and** transparent and
the material plane bends willingly.`,
  },

  9: {
    keyword: 'Humanitarian',
    text: `You carry a *global* rather than local passport. Empathy spans
cultures; artistry and service often mingle in your path.

Because you feel collective pain you may drift into savior or martyr
roles. Remember: compassion is strongest when paired with healthy
boundaries – then your example uplifts without depletion.`,
  },

  /* ---------- Master numbers ---------- */
  11: {
    keyword: 'Inspirational Teacher',
    text: `Eleven is the doubled 1, wired to translate raw intuition into
illumination for others. Ideas arrive as lightning; nervous energy is
common.

Regular grounding (body work, routine, humor) prevents the “live wire”
from burning out. When centered, the 11 turns inner sparks into
movements that change collective thinking.`,
  },

  22: {
    keyword: 'Master Builder',
    text: `Visionary 11 × practical 4 = 22. You’re able to see the aerial
map *and* pour the concrete. Humanitarian goals take physical shape
through your drive.

Self‑doubt is the only real obstacle; once you trust the blueprint,
resources and allies appear almost magnetically.`,
  },

  33: {
    keyword: 'Compassionate Mentor',
    text: `Thirty‑three is 11 + 22 expressed through unconditional love.
Healing, counseling and creative arts are natural outlets.

Your lesson is discernment: giving from overflow, not obligation. When
that balance is kept, 33 projects carry a resonance that comforts and
uplifts on a mass scale.`,
  },
};

export const PINNACLE_MEANINGS: Record<number, string> = {
  1: 'Leadership, independence, and initiation define your journey.',
  2: 'You’re called to develop cooperation, balance, and patience.',
  3: 'Creativity, expression, and joy are your guides.',
  4: 'Discipline, stability, and building foundations matter now.',
  5: 'Change, freedom, and adaptability will shape your path.',
  6: 'Responsibility, family, and community come to the forefront.',
  7: 'Spiritual development, inner reflection, and study are key.',
  8: 'Power, material success, and leadership are emphasized.',
  9: 'Compassion, service, and endings mark this cycle.',
  11: 'A higher spiritual purpose asks you to inspire and uplift.',
  22: 'You’re here to manifest dreams into reality at a grand scale.'
};

export const CHALLENGE_MEANINGS: Record<number, string> = {
  0: "You are naturally balanced. Challenges may be minimal, but self-awareness remains important.",
  1: "Learn independence and leadership without arrogance. Stand on your own feet with grace.",
  2: "Develop patience, sensitivity, and diplomacy. Avoid passivity or being overly dependent.",
  3: "Master emotional expression and communication. Watch for superficiality or scattered focus.",
  4: "Overcome limitations with discipline. Balance work ethic with flexibility.",
  5: "Learn to manage freedom and change. Avoid indulgence, addiction, or irresponsibility.",
  6: "Balance responsibility and boundaries. Don’t overgive or try to control others.",
  7: "Overcome isolation and doubt. Trust intuition and allow deeper connections.",
  8: "Master power and ambition with integrity. Avoid misuse of authority or material obsession."
};

export function getColorClass(color: string) {
  switch (color) {
    case 'green': return 'bg-green-200 text-green-800';
    case 'yellow': return 'bg-yellow-200 text-yellow-800';
    case 'red': return 'bg-red-200 text-red-800';
    case 'gold': return 'bg-yellow-100 text-yellow-900';
    case 'silver': return 'bg-gray-100 text-gray-800';
    case 'turquoise': return 'bg-cyan-100 text-cyan-800';
    case 'orange': return 'bg-orange-100 text-orange-800';
    case 'blue': return 'bg-blue-100 text-blue-800';
    case 'violet': return 'bg-violet-200 text-violet-800';
    case 'white': return 'bg-white text-black';
    case 'purple': return 'bg-purple-100 text-purple-800';
    case 'indigo': return 'bg-indigo-100 text-indigo-800';
    default: return '';
  }
}

export function colorMeaning(color: string) {
  switch (color) {
    case 'green': return 'Good day for activities and agreements.';
    case 'yellow': return 'Neutral day – observe your feelings.';
    case 'red': return 'Challenging day – avoid big decisions.';
    case 'gold': return 'Masterful day – strong intuition.';
    case 'silver': return 'Spiritual day – big vision.';
    case 'turquoise': return 'Day for service and community.';
    default: return '';
  }
}

export function getMasterNumberMeaning(num: number): string {
  switch (num) {
    case 11: return 'Intuition, spiritual insight, and illumination.';
    case 22: return 'Master Builder, vision into reality.';
    case 33: return 'Compassion, healing, and global service.';
    default: return '';
  }
}

  export function getBirthdayNumberMeaning(num: number): string | null {
    const meanings: { [key: number]: string } = {
      1: "Born leader – driven, ambitious, and independent.",
      2: "Peacemaker – intuitive, sensitive, and cooperative.",
      3: "Creative communicator – joyful, expressive, and inspiring.",
      4: "Foundation builder – practical, disciplined, and structured.",
      5: "Adventurer – dynamic, free-spirited, and adaptable.",
      6: "Nurturer – caring, responsible, and family-oriented.",
      7: "Seeker – analytical, spiritual, and introspective.",
      8: "Powerful – business-minded, authoritative, and ambitious.",
      9: "Humanitarian – compassionate, generous, and idealistic.",
      10: "Initiator – ambitious, confident, and capable of leading new ventures.",
      11: "Master Intuitive – spiritual insight, emotional depth.",
      12: "Charming communicator – expressive, sociable, and imaginative.",
      13: "Hardworking and transformative – karmic growth through discipline.",
      14: "Karmic communicator – learns to balance freedom with responsibility.",
      15: "Magnetic creator – artistic, influential, and loving.",
      16: "Spiritual awakener – karmic journey through inner growth and loss.",
      17: "Karmic number of leadership and spiritual responsibility.",
      18: "Compassionate force – intuitive, idealistic, and globally aware.",
      19: "Karmic pioneer – independence learned through challenge and growth.",
      20: "Gentle visionary – peace-seeking and intuitively wise.",
      21: "Expressive visionary – optimistic, creative, and socially magnetic.",
      22: "Master Builder – visionary with capacity for large-scale impact.",
      23: "Dynamic communicator – curious, adaptable, and charming.",
      24: "Devoted caretaker – harmonious, responsible, and family-oriented.",
      25: "Spiritual analyst – introspective, intuitive, and intelligent.",
      26: "Business-minded nurturer – ambitious, loyal, and service-driven.",
      27: "Wise humanitarian – philosophical and altruistic.",
      28: "Independent strategist – assertive and self-reliant.",
      29: "Master messenger – intuitive and emotionally deep.",
      30: "Joyful performer – expressive, artistic, and full of life.",
      31: "Disciplined visionary – creative yet grounded.",
    };
    return meanings[num] || null;
  }

export function getLifePathNumberMeaning(num: number): string {
  const meanings: { [key: number]: string } = {
    1: 'Leader – Independence, ambition, and originality.',
    2: 'Diplomat – Harmony, cooperation, and emotional sensitivity.',
    3: 'Artist – Creativity, self-expression, and joy.',
    4: 'Builder – Stability, order, and practical approach.',
    5: 'Explorer – Freedom, change, and adaptability.',
    6: 'Caregiver – Responsibility, service, and love.',
    7: 'Thinker – Spiritual depth, wisdom, and introspection.',
    8: 'Power – Ambition, success, and financial mastery.',
    9: 'Humanitarian – Compassion, completion, and generosity.'
  };
  return meanings[num] || '';
}

export function getSoulUrgeMeaning(number: number): string | null {
  switch (number) {
    case 1: return "Desire to lead, to be independent and original.";
    case 2: return "Craves harmony, love, and emotional connection.";
    case 3: return "Seeks joy, expression, and social interaction.";
    case 4: return "Longs for structure, order, and security.";
    case 5: return "Desires freedom, adventure, and new experiences.";
    case 6: return "Attracted to caregiving, responsibility, and love.";
    case 7: return "Yearns for inner wisdom, spirituality, and solitude.";
    case 8: return "Driven by ambition, power, and material success.";
    case 9: return "Soul of a humanitarian; motivated by compassion and service.";
    case 11: return "Deep intuitive drive, spiritual longing, desire to inspire.";
    case 22: return "A dream to build something truly meaningful and lasting.";
    case 33: return "Highest service; wants to heal, love, and elevate others.";
    default:
    return null;
  }
}

export function getExpressionMeaning(number: number): string | null {
  switch (number) {
    case 1: return "Natural leader with confidence, initiative, and independence.";
    case 2: return "Diplomatic communicator who values harmony and cooperation.";
    case 3: return "Creative, expressive, and social – thrives in artistic pursuits.";
    case 4: return "Organized, dependable, and grounded – practical in communication.";
    case 5: return "Energetic, adaptable speaker who inspires change and movement.";
    case 6: return "Compassionate, responsible, and nurturing in expression.";
    case 7: return "Reserved, thoughtful, and wise – prefers deep over superficial.";
    case 8: return "Authoritative and persuasive – communicates with purpose.";
    case 9: return "Charismatic and humanitarian – speaks to uplift and inspire.";
    case 11: return "Visionary communicator – inspires through higher ideals.";
    case 22: return "Master Builder – expresses with strategy, vision, and impact.";
    case 33: return "Uplifting, loving expression – communicates to heal and teach.";
    default:
    return null;
  }
}

export function getPersonalityMeaning(number: number): string | null {
  switch (number) {
    case 1: return "Seen as confident, strong-willed, and self-reliant.";
    case 2: return "Gentle, polite, and cooperative – people find you approachable.";
    case 3: return "Fun-loving, expressive, and social – you radiate joy.";
    case 4: return "Reliable and grounded – others see you as solid and trustworthy.";
    case 5: return "Adventurous and dynamic – your energy draws attention.";
    case 6: return "Caring and responsible – people sense warmth and support.";
    case 7: return "Mysterious, introspective, and intellectual – you intrigue others.";
    case 8: return "Powerful and ambitious – you command respect naturally.";
    case 9: return "Wise, compassionate, and charismatic – people feel your depth.";
    case 11: return "Spiritual and magnetic – others are drawn to your aura.";
    case 22: return "You appear capable, visionary, and grounded in purpose.";
    case 33: return "Your presence exudes love, harmony, and teaching energy.";
    default:
    return null;
  }
}

export function getChaldeanSoulUrgeMeaning(number: number): string | null {
  switch (number) {
    case 1: return "Inner drive to be independent, original, and assertive.";
    case 2: return "Desire for peace, connection, and partnership.";
    case 3: return "Craving self-expression, joy, and creative freedom.";
    case 4: return "Need for order, purpose, and practical contribution.";
    case 5: return "Soul seeks adventure, freedom, and constant growth.";
    case 6: return "Longing to serve, care for others, and build harmony.";
    case 7: return "Inner thirst for wisdom, depth, and spiritual truth.";
    case 8: return "Drive to manifest power, abundance, and legacy.";
    case 9: return "Deep desire to help others and live a life of compassion.";
    case 11: return "Inner calling to inspire through vision and intuition.";
    case 22: return "Soul seeks to build great structures of meaning and value.";
    case 33: return "Ultimate yearning to teach, uplift, and bring universal love.";
    default:
    return null;
  }
}

export function getChaldeanExpressionMeaning(number: number): string | null {
  switch (number) {
    case 1: return "Expresses leadership, individuality, and pioneering energy.";
    case 2: return "Communicates with sensitivity, diplomacy, and grace.";
    case 3: return "Radiates charm, optimism, and creative expression.";
    case 4: return "Shows up as reliable, structured, and detail-oriented.";
    case 5: return "Vibrant communicator, brings change and curiosity.";
    case 6: return "Expresses nurturing, service, and a sense of responsibility.";
    case 7: return "Projects a mysterious, wise, and introspective energy.";
    case 8: return "Seen as powerful, ambitious, and materially focused.";
    case 9: return "Comes across as compassionate, idealistic, and visionary.";
    case 11: return "Expresses spiritual insight, charisma, and visionary leadership.";
    case 22: return "Projects mastery, ability to organize and lead on a grand scale.";
    case 33: return "Radiates healing, unconditional love, and higher service.";
    default:
    return null;
  }
}

// Personal Year, Month, Day meanings

export function getPersonalYearMeaning(num: number): string {
  const meanings: Record<number, string> = {
    1: "A new beginning – focus on independence, self-growth and taking initiative.",
    2: "A year of cooperation, patience, and relationship-building.",
    3: "Creative expression and social expansion – embrace joy and connection.",
    4: "Focus on discipline, planning, and building a stable foundation.",
    5: "Time of change, freedom and unexpected opportunities.",
    6: "Responsibility, home and family – focus on love and service.",
    7: "Spiritual reflection, solitude and inner development.",
    8: "Power, manifestation and financial focus – take action with ambition.",
    9: "Completion and letting go – time to release and prepare for the new.",
    11: "A year of spiritual awakening and inspired leadership.",
    22: "Time to build your big vision – leadership with a global impact.",
    33: "Service through love – a rare vibration of compassion and healing."
  };
  return meanings[num] || "";
}

export function getPersonalMonthMeaning(num: number): string {
  const meanings: Record<number, string> = {
    1: "Take action and initiate something new this month.",
    2: "Go with the flow – be receptive and collaborate.",
    3: "Express yourself creatively and socialize.",
    4: "Focus on discipline and building routines.",
    5: "Expect change – stay flexible and embrace variety.",
    6: "Care for loved ones – responsibility and balance are key.",
    7: "Take space for introspection and clarity.",
    8: "Business and success – take charge with confidence.",
    9: "Let go of what no longer serves you – wrap up unfinished matters.",
    11: "Heightened sensitivity and spiritual insights – trust your intuition.",
    22: "Take bold steps on a big idea – this month supports mastery.",
    33: "Bring your love and healing to others – service through compassion."
  };
  return meanings[num] || "";
}

export function getPersonalDayMeaning(num: number): string {
  const meanings: Record<number, string> = {
    1: "Great day to start something new. Take initiative and lead.",
    2: "Focus on diplomacy and cooperation today.",
    3: "Be social and express your thoughts joyfully.",
    4: "Get organized and be productive – structure helps today.",
    5: "Embrace spontaneity – changes may appear.",
    6: "Family, harmony, and service are key themes today.",
    7: "Reflect, study, or spend time alone – trust your inner voice.",
    8: "A powerful day for business, finances, and action.",
    9: "Let go, forgive, and complete things with compassion.",
    11: "Spiritual awareness is high – observe synchronicities.",
    22: "You may feel pressure, but you're building something important.",
    33: "Extend love to others – healing energy surrounds you."
  };
  return meanings[num] || "";
}

export const KARMIC_LESSON_MEANINGS: Record<number, string> = {
  1: "You are here to develop independence, confidence, and leadership. Avoid relying too heavily on others to validate your path.",
  2: "Your soul is learning cooperation, patience, and emotional sensitivity. Embrace teamwork and listen more deeply.",
  3: "You are meant to cultivate self-expression, joy, and communication. Release fear of being seen or heard.",
  4: "Your lesson involves building discipline, stability, and responsibility. Structure brings freedom.",
  5: "You are developing freedom, adaptability, and wise use of sensual experiences. Avoid escapism.",
  6: "You are learning to nurture without over-controlling. Balance duty with personal needs.",
  7: "This lesson brings a need for inner trust, spiritual insight, and analytical thinking. Be patient with the unknown.",
  8: "You are here to master power, authority, and material responsibility. Use influence with integrity.",
  9: "You are learning compassion, forgiveness, and emotional completion. Release attachments and serve the greater whole."
};
