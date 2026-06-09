// ─────────────────────────────────────────────────────────────────────────────
// Pinnacles & Challenges — Extended Meanings
// Used by the Pinnacles deep dive page
// ─────────────────────────────────────────────────────────────────────────────

export interface PinnacleMeaning {
    number: number;
    title: string;
    theme: string;
    description: string;
    gifts: string[];
    demands: string[];
    shadow: string;
    affirmation: string;
  }
  
  export interface ChallengeMeaning {
    number: number;
    title: string;
    description: string;
    lesson: string;
    watchFor: string[];
    growthPath: string;
  }
  
  export const PINNACLE_DEEP: Record<number, PinnacleMeaning> = {
    1: {
      number: 1,
      title: 'The Pioneer',
      theme: 'Independence · Leadership · New Beginnings',
      description: 'A Pinnacle 1 cycle places you at the frontier. Life is asking you to step out of collective thinking and forge your own path. This is not a time for committees or consensus — it is a time for individual courage and original thinking. You may find yourself starting new ventures, relocating, or breaking away from structures that once defined you.',
      gifts: [
        'Unusual clarity about what you want and where you are going',
        'Magnetic leadership energy that draws others to follow',
        'The courage to begin before you feel ready',
        'A creative force that operates best when given full autonomy',
      ],
      demands: [
        'The willingness to stand alone when necessary',
        'Overcoming the fear of being seen and judged',
        'Learning to lead without dominating',
        'Taking full responsibility for your choices',
      ],
      shadow: 'Arrogance, impatience, and the tendency to bulldoze rather than build. The 1 Pinnacle can breed isolation when independence curdles into rigidity.',
      affirmation: 'I lead with integrity. My originality is a gift to the world.',
    },
    2: {
      number: 2,
      title: 'The Diplomat',
      theme: 'Partnership · Patience · Sensitivity',
      description: 'A Pinnacle 2 cycle asks you to slow down and attune. Where the 1 charges ahead alone, the 2 works in concert with others. This period often brings important relationships — romantic, creative or professional — that require deep cooperation. Life rewards subtlety here, not force. The quiet gesture, the patient listener, the one who holds the space: that is your role.',
      gifts: [
        'Heightened emotional intelligence and intuition',
        'The ability to mediate and bring opposing sides together',
        'Deep, meaningful partnership — often a defining relationship appears',
        'A sensitivity to beauty, rhythm and the unseen dimensions of life',
      ],
      demands: [
        'Learning to receive as gracefully as you give',
        'Saying what you truly need rather than accommodating endlessly',
        'Tolerating the slower pace this cycle often brings',
        'Trusting that cooperation is not weakness',
      ],
      shadow: 'Codependency, over-sensitivity, and losing yourself in the needs of others. The 2 Pinnacle can generate anxiety when its need for harmony becomes a need for control.',
      affirmation: 'I give and receive with equal grace. My sensitivity is my strength.',
    },
    3: {
      number: 3,
      title: 'The Creator',
      theme: 'Expression · Joy · Creative Expansion',
      description: 'A Pinnacle 3 cycle is one of the most socially alive phases in the numerological cycle. Life calls you to express — through words, art, music, performance, or the sheer quality of your presence. This is not a time to hide your light. The world around you becomes richer when you bring your full creative self to it. Joy, when pursued authentically, becomes a form of service.',
      gifts: [
        'A natural magnetism and social charm that opens doors',
        'Creative inspiration that arrives in waves',
        'The ability to uplift others simply by being fully yourself',
        'Opportunities in communication, the arts, and public life',
      ],
      demands: [
        'Bringing discipline to your creative gifts — inspiration without structure produces nothing lasting',
        'Resisting the pull toward superficiality or social performance',
        'Using your expressive gifts in service of something meaningful',
        'Managing a tendency to scatter energy across too many projects',
      ],
      shadow: 'Gossip, vanity, and the endless search for stimulation. The 3 Pinnacle can become exhausting when the need for applause replaces the need for depth.',
      affirmation: 'My authentic expression is a gift. I create with joy and purpose.',
    },
    4: {
      number: 4,
      title: 'The Builder',
      theme: 'Structure · Discipline · Long-term Foundation',
      description: 'A Pinnacle 4 cycle is the great building phase. Life asks you to lay foundations — in your career, your home, your body, your finances. Nothing flashy happens here; what happens is enduring. The 4 Pinnacle rewards those who show up consistently, who honour their commitments, and who are willing to do the unglamorous work. What you build now may outlast you.',
      gifts: [
        'The satisfaction of real, tangible achievement',
        'Growing competence and mastery in your field',
        'The trust and respect of those around you',
        'A stable platform from which everything else can grow',
      ],
      demands: [
        'Embracing routine without letting it become a cage',
        'Accepting that this period rewards effort, not luck',
        'Managing a tendency toward rigidity or excessive caution',
        'Finding rest and play even within a disciplined life',
      ],
      shadow: 'Workaholism, joylessness, and a fearful relationship with change. The 4 Pinnacle can produce burnout when duty becomes compulsion.',
      affirmation: 'I build with patience and integrity. Every brick I lay is an act of love.',
    },
    5: {
      number: 5,
      title: 'The Liberator',
      theme: 'Change · Freedom · Unexpected Turns',
      description: 'A Pinnacle 5 cycle is rarely quiet. This is the great reshuffling — of circumstances, relationships, locations, and identities. What once felt fixed may dissolve. What once felt impossible may suddenly open. The 5 Pinnacle does not reward those who cling; it rewards those who remain alert, adaptable, and genuinely curious about what comes next. Freedom is the lesson — and the gift.',
      gifts: [
        'The exhilaration of genuine change and new possibility',
        'A widened world — new people, places, ideas and experiences',
        'Increased resourcefulness and adaptability',
        'Freedom from structures and roles that no longer fit',
      ],
      demands: [
        'Resisting the urge to create chaos simply because stillness feels uncomfortable',
        'Using freedom responsibly — for growth, not escape',
        'Learning to distinguish between necessary change and impulsive disruption',
        'Staying present rather than always chasing the next horizon',
      ],
      shadow: 'Restlessness, excess, and the inability to commit. The 5 Pinnacle can become a long detour when freedom is confused with avoidance.',
      affirmation: 'I embrace change as a teacher. My freedom is earned through presence.',
    },
    6: {
      number: 6,
      title: 'The Nurturer',
      theme: 'Responsibility · Love · Service',
      description: 'A Pinnacle 6 cycle places home, family and community at the centre. Life asks you to give — of your time, your care, your creative gifts — in service of those around you. This is not a period for lone ambition; it is a period for love made practical. Beauty, harmony and right relationship matter deeply here. What you tend to now will flourish long after this cycle ends.',
      gifts: [
        'Deep, meaningful bonds — relationships that nourish and endure',
        'The satisfaction of being truly needed and genuinely helpful',
        'A growing aesthetic sense and appreciation for beauty',
        'The chance to heal long-standing family or community patterns',
      ],
      demands: [
        'Giving without depleting yourself in the process',
        'Accepting imperfection in those you love',
        'Setting boundaries without guilt',
        'Allowing others to support you in return',
      ],
      shadow: 'Martyrdom, control disguised as care, and the resentment that builds when giving is not freely chosen. The 6 Pinnacle becomes heavy when love becomes obligation.',
      affirmation: 'I serve from fullness. My love is my greatest contribution.',
    },
    7: {
      number: 7,
      title: 'The Seeker',
      theme: 'Inner Development · Wisdom · Spiritual Depth',
      description: 'A Pinnacle 7 cycle is the great turning inward. Life asks you to slow down, study, reflect and deepen. This is a period of spiritual and intellectual development — often solitary, sometimes uncomfortable, but ultimately transformative. The 7 Pinnacle is not a time for loud ambition or social performance. It is a time to know yourself at a level most people never bother to reach.',
      gifts: [
        'Profound insight and a deepening relationship with truth',
        'Expertise that develops through study, practice and contemplation',
        'A spiritual or philosophical framework that sustains you for life',
        'The ability to perceive what others overlook',
      ],
      demands: [
        'Tolerating solitude without drifting into isolation',
        'Sharing what you discover — wisdom withheld helps no one',
        'Trusting the process even when results are invisible',
        'Guarding against cynicism or detachment',
      ],
      shadow: 'Withdrawal, elitism, and a coldness toward the messy emotional world. The 7 Pinnacle can produce a brilliant but unreachable person.',
      affirmation: 'I trust the quiet. In stillness, I find what I was always seeking.',
    },
    8: {
      number: 8,
      title: 'The Power Manifestor',
      theme: 'Material Mastery · Authority · Achievement',
      description: 'A Pinnacle 8 cycle is one of the most powerful in the system. Life places material reality — money, authority, business, legacy — directly in your hands. This is a test of character as much as capability. You may gain significant influence, wealth or position. What you do with it defines the cycle. The 8 Pinnacle does not reward greed or fear; it rewards integrity in the exercise of power.',
      gifts: [
        'Access to resources, influence and opportunity',
        'The development of genuine executive and strategic capacity',
        'Recognition and reward for competence and vision',
        'The chance to build something of lasting material significance',
      ],
      demands: [
        'Using power in service of something larger than personal gain',
        'Managing the psychological weight of responsibility',
        'Avoiding the twin traps of ruthlessness and financial anxiety',
        'Learning that authority must be earned continuously, not assumed',
      ],
      shadow: 'Greed, control, and the hollowness that follows when material success is mistaken for fulfilment. The 8 Pinnacle can be lost to workaholism or ethical compromise.',
      affirmation: 'I use my power with integrity. True wealth flows from aligned action.',
    },
    9: {
      number: 9,
      title: 'The Humanitarian',
      theme: 'Completion · Compassion · Universal Service',
      description: 'A Pinnacle 9 cycle marks a period of completion and expansion into something larger than the personal. Life asks you to release — attachments, identities, roles that have served their purpose — and to give back. The 9 Pinnacle often brings deep artistic, humanitarian or spiritual activity. You are being called toward a wider stage and a more universal kind of love.',
      gifts: [
        'A wide, compassionate perspective that sees beyond personal interest',
        'Creative and artistic depth that moves others',
        'The capacity to complete long cycles with wisdom and grace',
        'Meaningful contributions to community, culture or humanity',
      ],
      demands: [
        'Genuinely releasing what no longer serves, rather than holding on',
        'Receiving as well as giving — the 9 must guard against depletion',
        'Allowing endings without forcing new beginnings prematurely',
        'Serving from wholeness rather than self-sacrifice',
      ],
      shadow: 'Martyrdom, bitterness about loss, and a grandiosity that mistakes suffering for spiritual advancement. The 9 Pinnacle becomes painful when endings are resisted.',
      affirmation: 'I release with grace. My compassion is boundless and my cup is full.',
    },
    11: {
      number: 11,
      title: 'The Visionary',
      theme: 'Spiritual Illumination · Inspired Leadership · Master Intuition',
      description: 'A Pinnacle 11 is a Master Number cycle — one of the most intense and potentially transformative in the entire system. Life is asking you to operate at a higher frequency than the personal. Intuition, inspiration and spiritual perception are heightened. You may find yourself in a position of spiritual or cultural influence — not through ambition, but through the quality of your presence and the depth of your seeing.',
      gifts: [
        'Extraordinary intuitive capacity that bypasses ordinary reasoning',
        'A visionary quality that can genuinely inspire and uplift others',
        'Access to creative or spiritual insight that feels channelled',
        'The potential for significant cultural or spiritual contribution',
      ],
      demands: [
        'Grounding high-frequency insight into practical, usable form',
        'Managing the nervous sensitivity this vibration generates',
        'Resisting the urge to either inflate or deny your gifts',
        'Serving the vision rather than the ego that receives it',
      ],
      shadow: 'Nervous exhaustion, messiah complex, and the paralysis that comes from carrying inspiration without a container. The 11 Pinnacle can burn if not earthed.',
      affirmation: 'I am a clear channel. My vision serves the world, not my vanity.',
    },
    22: {
      number: 22,
      title: 'The Master Builder',
      theme: 'Large-Scale Creation · Practical Vision · Lasting Legacy',
      description: 'A Pinnacle 22 is the rarest and most demanding Master Number cycle. Life asks you to build — not for yourself, but for a generation. The vision that arrives during this period is not small; it carries the potential for genuine, lasting impact on a collective level. This is not a cycle for modest ambitions or comfortable compromises. It demands everything — and rewards accordingly.',
      gifts: [
        'The ability to hold a large vision and translate it into reality',
        'Unusual access to resources, talent and opportunity when aligned',
        'The capacity to organise and inspire on a significant scale',
        'The potential to leave something of lasting value for others',
      ],
      demands: [
        'The courage to claim a vision of that magnitude without collapsing under it',
        'Mastering both the strategic and the practical simultaneously',
        'Resisting the self-doubt that is this number\'s greatest obstacle',
        'Accepting that the work is larger than any individual, including you',
      ],
      shadow: 'Grandiosity without groundedness, or the opposite — complete denial of the gift through self-limitation. The 22 Pinnacle is wasted when either extreme takes hold.',
      affirmation: 'I build for the future. My work carries meaning beyond my own lifetime.',
    },
  };
  
  export const CHALLENGE_DEEP: Record<number, ChallengeMeaning> = {
    0: {
      number: 0,
      title: 'The Open Path',
      description: 'A Challenge 0 is exceptionally rare and indicates a soul that has already worked through the primary lessons of the other numbers. You enter this period with unusual latitude — fewer karmic constraints, more genuine choice. This freedom is itself the challenge.',
      lesson: 'To use your freedom wisely. Without a specific challenge to overcome, you must supply your own discipline and direction. The risk is drifting without purpose.',
      watchFor: [
        'Using freedom as an excuse to avoid commitment',
        'Undervaluing what you have because it came without struggle',
        'Mistaking ease for meaninglessness',
      ],
      growthPath: 'Embrace voluntary commitment to something larger than yourself. Choose your challenge consciously.',
    },
    1: {
      number: 1,
      title: 'The Independence Challenge',
      description: 'The Challenge 1 asks you to develop a stable, grounded sense of self that does not require external validation. You are learning to act from your own authority — not from rebellion, not from compliance, but from genuine self-knowledge.',
      lesson: 'True leadership is not dominance — it is the willingness to be responsible for the consequences of your choices.',
      watchFor: [
        'Seeking approval while pretending not to care about it',
        'Swinging between self-assertion and self-doubt',
        'Confusing stubbornness with strength',
      ],
      growthPath: 'Practice making decisions based on your own values without needing agreement. Start small and build.',
    },
    2: {
      number: 2,
      title: 'The Relationship Challenge',
      description: 'The Challenge 2 asks you to navigate the tension between connection and self-respect. You are learning that true partnership requires two whole people — not one person absorbing themselves into another.',
      lesson: 'Saying what you actually need is not selfish. It is the precondition for genuine intimacy.',
      watchFor: [
        'People-pleasing at the expense of your own needs',
        'Indirect communication that creates resentment',
        'Hypersensitivity that makes honest feedback feel like rejection',
      ],
      growthPath: 'Practice one direct, honest expression of your needs each week. Notice what happens when you do.',
    },
    3: {
      number: 3,
      title: 'The Expression Challenge',
      description: 'The Challenge 3 asks you to move past the fear of being seen and heard. You likely have more to say — and more creative capacity — than you currently allow yourself. The block is internal, not external.',
      lesson: 'The world does not need your performance. It needs your authentic voice.',
      watchFor: [
        'Scattered energy that prevents any one thing from being finished',
        'Using humour or lightness to deflect vulnerability',
        'Comparing yourself to others and concluding you are not enough',
      ],
      growthPath: 'Commit to completing one creative project from beginning to end. Perfectionism is the enemy — ship it.',
    },
    4: {
      number: 4,
      title: 'The Structure Challenge',
      description: 'The Challenge 4 asks you to build a life with genuine foundations — in your finances, your health, your work and your commitments. This often means confronting a resistance to discipline or a tendency to avoid the boring-but-necessary work of maintenance.',
      lesson: 'Discipline is not a prison — it is the container that makes real freedom possible.',
      watchFor: [
        'Procrastination and avoidance disguised as flexibility',
        'Starting many things and finishing few',
        'A chaotic relationship with money, time or health',
      ],
      growthPath: 'Choose one area of life that needs structure and apply consistent effort for 90 days. Track the results.',
    },
    5: {
      number: 5,
      title: 'The Freedom Challenge',
      description: 'The Challenge 5 asks you to learn the difference between genuine freedom and escape. You may have a restless relationship with commitment — either clinging too tightly to avoid uncertainty, or running from anything that feels like a cage.',
      lesson: 'Freedom is not the absence of commitment. It is the presence of conscious choice.',
      watchFor: [
        'Impulsive decisions followed by regret',
        'Overindulgence in sensory experience as a form of avoidance',
        'An inability to tolerate boredom or stillness',
      ],
      growthPath: 'Practise voluntary constraint in one area — a commitment held for a defined period. Notice what it reveals.',
    },
    6: {
      number: 6,
      title: 'The Responsibility Challenge',
      description: 'The Challenge 6 asks you to learn the difference between genuine care and compulsive duty. You may have a tendency to over-give — taking on others\' burdens as a way to feel needed, or to avoid your own inner work.',
      lesson: 'You cannot pour from an empty cup. Serving others sustainably requires that you are first genuinely well.',
      watchFor: [
        'Resentment building beneath a giving exterior',
        'Perfectionism in relationships that prevents genuine connection',
        'Difficulty accepting help or being dependent on others',
      ],
      growthPath: 'Practice saying no to one request per week that depletes rather than fulfils you.',
    },
    7: {
      number: 7,
      title: 'The Trust Challenge',
      description: 'The Challenge 7 asks you to develop faith — in yourself, in life and in what cannot be proven by logic alone. You may have a tendency to over-analyse, to remain at a safe intellectual distance from experience, or to withdraw when things become emotionally complex.',
      lesson: 'Not everything that matters can be understood. Some things must simply be lived.',
      watchFor: [
        'Using analysis as a defence against feeling',
        'Perfectionism that prevents completion or commitment',
        'Isolation presented as spiritual independence',
      ],
      growthPath: 'Choose one area of your life and act on intuition rather than analysis for one month. Document the results.',
    },
    8: {
      number: 8,
      title: 'The Power Challenge',
      description: 'The Challenge 8 asks you to develop a healthy, grounded relationship with power, money and authority. You may either chase these things compulsively, or avoid them out of fear of what they might demand or reveal about you.',
      lesson: 'Power in the service of integrity is one of the highest expressions of human potential.',
      watchFor: [
        'Financial anxiety or chronic underearning',
        'The tendency to either dominate or entirely defer to authority',
        'Ethical compromise in the name of pragmatism',
      ],
      growthPath: 'Examine your beliefs about money and authority. Which came from fear? Which came from experience? Begin there.',
    },
  };