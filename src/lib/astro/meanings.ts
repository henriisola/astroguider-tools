export const SIGNS = [
  "",
  "Aries",
  "Taurus",
  "Gemini",
  "Cancer",
  "Leo",
  "Virgo",
  "Libra",
  "Scorpio",
  "Sagittarius",
  "Capricorn",
  "Aquarius",
  "Pisces"
] as const;

export const VENUS_HOUSES: Record<number, string> = {
  1: "Love defines your self-image. You radiate charm and attract attention effortlessly. You may seek validation through relationships.",
  2: "You value physical affection and stability in love. Financial security and sensuality are linked with your relationships.",
  3: "You express love through words, humor, and connection. Siblings or local community may play a role in your romantic life.",
  4: "Emotional security is crucial in love. You are nurturing and seek someone who feels like home. Family ties influence your heart.",
  5: "Romantic, playful, and expressive — you fall in love easily and enjoy courtship. Creativity and fun are key in relationships.",
  6: "You show love through service, reliability, and care. Routine, work, or shared responsibilities may bring romantic bonds.",
  7: "You desire partnership above all. Love thrives when balanced and committed. Relationships define your personal growth.",
  8: "You crave deep emotional and sexual intimacy. Love may transform you or involve power dynamics. Passion runs strong.",
  9: "You are drawn to partners from different cultures or belief systems. Love is expansive, idealistic, and philosophical.",
  10: "Love may influence your career or status. You are attracted to powerful partners or may be admired publicly for your grace.",
  11: "Friendship often leads to love. You’re open-minded and seek equality in relationships. Community matters in love.",
  12: "You love selflessly and may experience secret or karmic relationships. Spirituality and sacrifice often color your love life."
};

export const SOUTH_NODE_HOUSES: Record<number, string> = {
  1: "You default to self-reliance and strong personal identity. Growth requires learning interdependence.",
  2: "Security and material stability feel familiar. Growth requires emotional and psychological transformation.",
  3: "You rely on logic and communication. Growth requires deeper wisdom beyond surface knowledge.",
  4: "Emotional safety and family roots define comfort. Growth requires stepping into public visibility.",
  5: "Creative self-expression is natural. Growth requires collaboration and long-term responsibility.",
  6: "Service and routine feel safe. Growth requires broader vision and spiritual trust.",
  7: "Partnership defines your comfort zone. Growth requires independent identity.",
  8: "Intensity and control feel familiar. Growth requires simplicity and grounded stability.",
  9: "Beliefs and philosophy shape your comfort. Growth requires practical communication and detail work.",
  10: "Public achievement feels natural. Growth requires emotional vulnerability.",
  11: "Group identity feels comfortable. Growth requires personal creative leadership.",
  12: "Retreat and spirituality feel safe. Growth requires grounded daily engagement."
};

export const NORTH_NODE_HOUSES: Record<number, string> = {
  1: "Your path requires bold self-definition and independence.",
  2: "Your growth comes through building tangible stability and self-worth.",
  3: "Your path unfolds through communication, learning, and daily interaction.",
  4: "You are called to build emotional foundations and inner security.",
  5: "Creative courage and authentic expression are your growth edge.",
  6: "Mastery through discipline, service, and daily refinement shapes your evolution.",
  7: "Conscious partnership and cooperation define your path.",
  8: "Deep transformation and shared intimacy unlock your growth.",
  9: "Expansion through philosophy, travel, and belief systems guides your path.",
  10: "Public leadership and long-term achievement define your growth.",
  11: "Community building and innovation shape your destiny.",
  12: "Spiritual surrender and compassion guide your evolution."
};

export const SATURN_HOUSES: Record<number, string> = {
  1: "Life demands maturity in identity and self-presentation.",
  2: "Lessons revolve around financial discipline and self-worth.",
  3: "Responsibility comes through communication and structured thinking.",
  4: "Emotional foundations and family themes require maturity.",
  5: "Creative expression must be disciplined and earned.",
  6: "Work, health, and routine demand responsibility.",
  7: "Serious lessons appear through partnership and commitment.",
  8: "Transformation, power, and shared resources test your resilience.",
  9: "Beliefs must be grounded in experience and discipline.",
  10: "Authority and career responsibility define your growth.",
  11: "Community and long-term goals require structured effort.",
  12: "Spiritual discipline and inner strength must be developed."
};

export const CHIRON_HOUSES: Record<number, string> = {
  1: "The wound touches identity and self-image. Healing begins with self-acceptance.",
  2: "Self-worth and financial security carry deep sensitivity.",
  3: "Your voice or learning style may feel wounded. Healing comes through expression.",
  4: "Family or emotional roots carry early wounds. Healing builds inner security.",
  5: "Creative visibility may feel vulnerable. Healing comes through authentic expression.",
  6: "Work or health may trigger insecurity. Healing comes through service.",
  7: "Relationships mirror core wounds. Healing comes through balanced partnership.",
  8: "Trust, intimacy, or shared power may feel unsafe. Healing comes through vulnerability.",
  9: "Beliefs or meaning may feel fractured. Healing comes through lived wisdom.",
  10: "Public recognition or authority may feel painful. Healing comes through grounded leadership.",
  11: "Belonging within groups may feel difficult. Healing comes through conscious community.",
  12: "Spiritual sensitivity may feel overwhelming. Healing comes through boundaries and compassion."
};

export const meanings = {
  SouthNode: {
    Aries: "You are comfortable acting independently and taking initiative. You instinctively lead and rely on yourself. Growth begins when you learn cooperation and shared power.",
    Taurus: "You seek stability, comfort, and predictability. You rely on material and emotional security. Growth requires embracing change and transformation.",
    Gemini: "You are comfortable gathering information and staying mentally active. Growth requires deeper emotional commitment and focus.",
    Cancer: "You default to emotional safety and protection. You nurture and retreat when uncertain. Growth comes through public courage and authority.",
    Leo: "You are used to recognition and personal expression. Growth calls you toward collaboration and collective contribution.",
    Virgo: "You are comfortable fixing, analyzing, and serving. Growth requires trust in intuition and surrender to larger meaning.",
    Libra: "You prioritize harmony and relationships. Growth requires self-definition and courageous individuality.",
    Scorpio: "You are familiar with intensity, control, and emotional depth. Growth requires simplicity, stability, and grounding.",
    Sagittarius: "You rely on beliefs and big visions. Growth requires mastering practical details and disciplined structure.",
    Capricorn: "You are comfortable with responsibility and control. Growth requires emotional vulnerability and heart-centered leadership.",
    Aquarius: "You live in ideas and future visions. Growth requires creative self-expression and personal warmth.",
    Pisces: "You are used to surrender and spiritual flow. Growth requires boundaries, clarity, and grounded service."
  },

  NorthNode: {
    Aries: "Your path is courage and self-definition. You must act boldly and claim your identity without waiting for permission.",
    Taurus: "Your path is grounding, stability, and embodiment. Build something real and lasting in the physical world.",
    Gemini: "Your path is communication and adaptability. Share knowledge, ask questions, and stay curious.",
    Cancer: "Your path is emotional authenticity and nurturing leadership. Build security through heart-centered choices.",
    Leo: "Your path is creative visibility. Step into the spotlight and express your authentic self.",
    Virgo: "Your path is practical mastery and refinement. Bring order and healing through skill and dedication.",
    Libra: "Your path is balance and conscious partnership. Learn the art of cooperation and diplomacy.",
    Scorpio: "Your path is transformation and depth. Embrace vulnerability and emotional truth.",
    Sagittarius: "Your path is expansion and wisdom. Teach, travel, and broaden perspectives.",
    Capricorn: "Your path is disciplined achievement. Build legacy through structure and responsibility.",
    Aquarius: "Your path is innovation and collective vision. Break norms and lead progressive change.",
    Pisces: "Your path is compassion and spiritual surrender. Trust intuition and cultivate empathy."
  },

  Saturn: {
    Aries: "You mature through disciplined action and controlled assertiveness. Leadership must be earned.",
    Taurus: "You mature through financial and emotional stability. Security is built slowly through patience.",
    Gemini: "You mature through structured thinking and responsible communication.",
    Cancer: "You mature through emotional responsibility and family or legacy themes.",
    Leo: "You mature through humble leadership and authentic creative discipline.",
    Virgo: "You mature through mastery of details and practical service.",
    Libra: "You mature through commitment in relationships and fairness in decisions.",
    Scorpio: "You mature through confronting fear, power, and emotional intensity.",
    Sagittarius: "You mature by grounding big beliefs into realistic frameworks.",
    Capricorn: "You mature through authority, long-term planning, and responsibility.",
    Aquarius: "You mature by balancing individuality with collective duty.",
    Pisces: "You mature through boundaries and structured spirituality."
  },

  Chiron: {
    Aries: "Your wound touches identity and self-assertion. Healing comes through confident self-expression.",
    Taurus: "Your wound relates to self-worth and security. Healing comes through embodied confidence.",
    Gemini: "Your wound involves voice and communication. Healing comes through speaking truth.",
    Cancer: "Your wound touches emotional safety. Healing comes through nurturing others.",
    Leo: "Your wound involves visibility and recognition. Healing comes through authentic creativity.",
    Virgo: "Your wound relates to imperfection. Healing comes through compassionate service.",
    Libra: "Your wound involves relationships. Healing comes through balanced connection.",
    Scorpio: "Your wound touches trust and intimacy. Healing comes through vulnerability.",
    Sagittarius: "Your wound involves belief systems. Healing comes through lived wisdom.",
    Capricorn: "Your wound relates to achievement and authority. Healing comes through grounded leadership.",
    Aquarius: "Your wound touches belonging. Healing comes through community building.",
    Pisces: "Your wound involves boundaries and spiritual sensitivity. Healing comes through conscious compassion."
  },

  Sun: {
    Aries: "Bold, energetic, and assertive. You lead with passion and thrive on challenges.",
    Taurus: "Grounded, loyal, and reliable. You seek stability and enjoy life's pleasures.",
    Gemini: "Curious, witty, and communicative. Your mind is your greatest asset.",
    Cancer: "Nurturing, emotional, and protective. You value home, family, and deep bonds.",
    Leo: "Charismatic, creative, and confident. You shine in leadership and expression.",
    Virgo: "Practical, analytical, and service-oriented. You strive for improvement.",
    Libra: "Balanced, charming, and social. You value harmony and relationships.",
    Scorpio: "Intense, passionate, and transformative. You seek depth and truth.",
    Sagittarius: "Optimistic, adventurous, and philosophical. You crave exploration.",
    Capricorn: "Disciplined, responsible, and strategic. You aim for long-term success.",
    Aquarius: "Innovative, independent, and humanitarian. You challenge the status quo.",
    Pisces: "Imaginative, empathetic, and spiritual. You navigate life through feeling."
  },
  Moon: {
    Aries: "Emotionally direct and independent. You react quickly and value honesty.",
    Taurus: "Emotionally steady and sensual. You find comfort in routines and nature.",
    Gemini: "Emotionally intellectual. You process feelings through thoughts and dialogue.",
    Cancer: "Deeply emotional and intuitive. You seek security and nurturing bonds.",
    Leo: "Emotionally expressive and warm. You need recognition and heartfelt loyalty.",
    Virgo: "Emotionally reserved but caring. You serve others through practicality.",
    Libra: "Emotionally harmonious. You seek peace, beauty, and balanced relationships.",
    Scorpio: "Emotionally intense and private. You form deep attachments and need control.",
    Sagittarius: "Emotionally free-spirited. You crave space, truth, and new horizons.",
    Capricorn: "Emotionally controlled and self-reliant. You value duty over vulnerability.",
    Aquarius: "Emotionally detached but idealistic. You feel through ideas and causes.",
    Pisces: "Emotionally sensitive and empathetic. You absorb the moods of others."
  },
  Rising: {
    Aries: "You appear bold, fast-moving, and assertive. You take initiative quickly.",
    Taurus: "You present as calm, steady, and grounded. Others sense your reliability.",
    Gemini: "You come across as quick, clever, and talkative. You're curious and alert.",
    Cancer: "You give a warm, protective first impression. Sensitive and nurturing.",
    Leo: "You radiate charisma and confidence. You like to stand out and lead.",
    Virgo: "You seem precise, reserved, and observant. Organized and thoughtful.",
    Libra: "You present as gracious, diplomatic, and charming. At ease in social settings.",
    Scorpio: "You appear intense, private, and magnetic. People sense your depth.",
    Sagittarius: "You come across as adventurous and optimistic. You're open and lively.",
    Capricorn: "You seem serious, composed, and goal-driven. Others respect your focus.",
    Aquarius: "You appear unique, unconventional, and intellectual. A visionary aura.",
    Pisces: "You seem dreamy, gentle, and intuitive. People feel your subtle sensitivity."
  },

  MC: {
    Aries: "You possess a natural drive to lead and initiate. Your career thrives where courage, action, and independence are needed — such as entrepreneurship, military roles, or sports. You’re at your best when charting your own course.",
    Taurus: "You're drawn to careers that offer security, aesthetics, and financial reliability. Work in design, banking, or anything requiring persistence and patience suits your style.",
    Gemini: "You are intellectually curious and versatile. Ideal careers include communication, technology, journalism, education, or anything involving speaking or writing.",
    Cancer: "You seek emotional connection through work. Roles in education, caregiving, food, hospitality, or home-related professions align well with your instinct to nurture and protect.",
    Leo: "You shine in leadership, visibility, and creativity. Careers in the arts, performance, leadership, or branding fulfill your desire to be recognized and inspire.",
    Virgo: "Your career path favors structure, analysis, and problem-solving. Roles in healthcare, research, organization, or editing play to your strengths.",
    Libra: "You’re a peacemaker and aesthetic professional. Careers in law, mediation, beauty, diplomacy, or consulting suit your cooperative and charming nature.",
    Scorpio: "You are strategic, intuitive, and resilient. Careers in psychology, finance, healing, research, or crisis management allow you to work deeply and transform situations.",
    Sagittarius: "You are inspired by truth, expansion, and freedom. Ideal roles involve teaching, philosophy, travel, publishing, or anything that widens perspectives.",
    Capricorn: "You are ambitious, responsible, and goal-oriented. Careers in business, governance, engineering, or any long-term strategic field align with your patient climb to the top.",
    Aquarius: "You’re an innovator who thrives in progressive fields. Careers in tech, science, activism, or humanitarian work suit your desire to break molds.",
    Pisces: "You are imaginative, spiritual, and compassionate. You’re drawn to healing, art, music, or spiritual service, often behind the scenes or in fluid roles."
  },
  Venus: {
    Aries: "You’re bold and spontaneous in love. You desire independence, passion, and a partner who respects your autonomy.",
    Taurus: "You crave stability and physical affection. You express love through consistency, beauty, and shared values.",
    Gemini: "You’re playful and witty in relationships. Mental stimulation and freedom are key in your connections.",
    Cancer: "You seek emotional depth and security. You nurture your partner and long for deep bonds built on trust.",
    Leo: "You are romantic and expressive in love. You want to be admired and loved openly — with passion and flair.",
    Virgo: "You show love through acts of service and reliability. You’re discerning, but deeply loyal once committed.",
    Libra: "You’re graceful and diplomatic in relationships. You value balance, beauty, and connection.",
    Scorpio: "You love intensely and privately. You need deep emotional intimacy, loyalty, and transformation in love.",
    Sagittarius: "You bring adventure and honesty to love. You’re drawn to partners who inspire and challenge you.",
    Capricorn: "You are steady and committed. You love through structure, loyalty, and shared ambition.",
    Aquarius: "You’re unique and future-focused in love. Intellectual connection and freedom matter more than tradition.",
    Pisces: "You’re romantic and dreamy in love. You long for spiritual and emotional fusion with your partner."
  },
  Money2nd: {
    Aries: "You earn through assertive action and independent ventures. Money comes when you take initiative.",
    Taurus: "You value stable income. Assets, savings, and comforts are essential — you build slow and steady.",
    Gemini: "You make money through ideas, networking, and versatility. Multiple income streams appeal to you.",
    Cancer: "You spend on family and home but can earn well through care-driven fields.",
    Leo: "You value status, style, and recognition. Money comes through creativity and leadership.",
    Virgo: "You’re practical with finances. Earnings may come from service, systems, or precision work.",
    Libra: "Income often flows from partnerships, beauty, or law-related roles.",
    Scorpio: "You guard your finances but attract money through control, strategy, or shared ventures.",
    Sagittarius: "You value freedom in how you earn. Income may come from education, travel, or belief systems.",
    Capricorn: "You build financial security over time. Investments and discipline are key.",
    Aquarius: "Earnings may come from unconventional, tech, or networked sources.",
    Pisces: "You attract income through creativity, compassion, or fluid roles, but must avoid vagueness."
  },
  Money8th: {
    Aries: "You may inherit or manage shared resources assertively. You’re proactive in joint ventures.",
    Taurus: "Security in shared finances is important. You may gain from stable partnerships or investments.",
    Gemini: "Joint finances benefit from smart communication and adaptability.",
    Cancer: "You are emotionally tied to shared assets. Family or home may play a role in inheritance.",
    Leo: "You may receive through admiration, fame, or creative partnerships.",
    Virgo: "You’re practical in managing others’ assets. You bring order to shared wealth.",
    Libra: "You seek fairness and balance in joint resources. Legal agreements are often key.",
    Scorpio: "You are powerful in transformation via shared assets. Deep financial change is common.",
    Sagittarius: "You may benefit through foreign, spiritual, or teaching partnerships.",
    Capricorn: "You handle others’ wealth responsibly. Gains may come through institutions or older partners.",
    Aquarius: "You manage shared resources with innovation. Unexpected gains (or losses) may occur.",
    Pisces: "You may inherit or gain via hidden, spiritual, or creative channels — be cautious with boundaries."
  }
} as const;

export type MeaningCategory = keyof typeof meanings;

