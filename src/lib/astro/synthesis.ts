import {
  SOUTH_NODE_HOUSES,
  NORTH_NODE_HOUSES,
  SATURN_HOUSES,
  CHIRON_HOUSES,
  meanings
} from "./meanings";

export const buildSoulLayer = (data: any) => {
  const south = data.southNode;
  const north = data.northNode;
  const saturn = data.saturn;
  const chiron = data.chiron;

  if (!south?.sign || !north?.sign) return null;

  return `
Your evolutionary foundation begins in ${south.sign} expressed through House ${south.house}.

This represents instinctive familiarity — the psychological terrain where you default under pressure.

Growth pulls toward ${north.sign} in House ${north.house}.
Not as rejection of the past, but as expansion beyond unconscious repetition.

Saturn in ${saturn?.sign || "—"} (House ${saturn?.house || "—"}) marks the arena where life demands structure, responsibility, and maturity.

Chiron in ${chiron?.sign || "—"} (House ${chiron?.house || "—"}) reveals where vulnerability becomes a source of depth — once consciously integrated.
`;
};

export const buildIdentityLayer = (data: any) => {
  const sun = data.sun?.sign;
  const moon = data.moon?.sign;
  const rising = data.rising?.sign;

  if (!sun || !moon || !rising) return null;

  return `
Your Sun in ${sun} defines your conscious identity — how you experience yourself when centered.

Your Moon in ${moon} governs instinctive emotional reactions — what happens before reflection.

Your Rising in ${rising} shapes how the world first encounters you — the behavioral interface between inner and outer life.

Together, these create a personality structure that both expresses and protects the deeper evolutionary path.
`;
};

export const buildEarthLayer = (data: any) => {
  const mc = data.mc?.sign;
  const house2 = data.money2?.sign;
  const house8 = data.money8?.sign;

  if (!mc) return null;

  return `
With MC in ${mc}, your public direction requires visible engagement through that sign’s qualities.

Material stability develops through ${house2 || "—"} themes — defining how value is built and sustained.

Transformation and shared power unfold through ${house8 || "—"} dynamics — defining how intensity, intimacy, and exchange shape growth.

This is where inner evolution becomes tangible through lived action.
`;
};

export const buildFullBlueprint = (data: any) => {
  const soul = buildSoulLayer(data);
  const identity = buildIdentityLayer(data);
  const earth = buildEarthLayer(data);

  if (!soul || !identity) return null;

  return `
🧬 SOUL FOUNDATION
${soul}

🧠 INCARNATED IDENTITY
${identity}

🌍 EARTH MANIFESTATION
${earth}

🔮 INTEGRATION

Integration occurs when:

– Conscious identity does not suppress emotional instinct  
– Emotional instinct does not override reflection  
– External persona does not fragment inner coherence  

When these layers stop competing, life shifts from reactive to intentional.

This is where blueprint becomes lived reality.
`;
};

export const buildNodeAxis = (data: any) => {
  const south = data.southNode;
  const north = data.northNode;

  if (!south?.sign || !north?.sign || !south?.house || !north?.house) return null;

  return `
Your evolutionary tension lives between ${south.sign} in House ${south.house}
and ${north.sign} in House ${north.house}.

The former represents familiarity — patterns that feel stable, competent, and safe.

The latter represents developmental pressure — experiences that demand psychological expansion.

Growth does not require abandoning your foundation.
It requires allowing it to be challenged.

Where comfort once dominated, consciousness is now required.
`;
};

export const synthesisTemplates = {
  SouthNode: (
    sign: string,
    house: number,
    signText: string,
    houseText: string
  ) => `
South Node in ${sign} in the ${house}th House.

Your karmic familiarity blends ${sign.toLowerCase()} qualities with House ${house} themes.

${signText.split(".")[0]}.

In lived experience, this most naturally expresses itself through ${houseText.split(".")[0].toLowerCase()}.

When unconscious, this pattern can limit growth.
When conscious, it becomes refined mastery.
`,
};

export type SynthesisTemplateKey = keyof typeof synthesisTemplates;