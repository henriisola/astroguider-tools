// ============================================================
// businessNumerologyEngine.ts
// AstroGuider — Business Compatibility Engine
// Pythagorean numerology + Chinese Zodiac
// ============================================================

export type HarmonyLevel = 'excellent' | 'good' | 'neutral' | 'challenging'
export type CompatibilityTier = 'excellent' | 'good' | 'neutral' | 'challenging'

export type ChineseAnimal =
  | 'Rat' | 'Ox' | 'Tiger' | 'Rabbit' | 'Dragon' | 'Snake'
  | 'Horse' | 'Goat' | 'Monkey' | 'Rooster' | 'Dog' | 'Pig'

export interface Owner {
  id: string
  name: string
  birthdate: string
}

export interface BusinessInput {
  companyName: string
  registrationDate: string
  owners: Owner[]
}

export interface OwnerNumerics {
  id: string
  name: string
  lifePath: number
  expressionNumber: number
  nameVibration: number
  animal: ChineseAnimal
  birthYear: number
}

export interface BusinessNumerics {
  birthNumber: number
  nameVibration: number
  destinyNumber: number
  registrationYear: number
  registrationAnimal: ChineseAnimal
}

export interface OwnerVsBusiness {
  owner: OwnerNumerics
  harmonyWithDestiny: HarmonyLevel
  harmonyScore: number
  description: string
  zodiacVsYear: CompatibilityTier
  zodiacVsYearScore: number
  zodiacVsYearDesc: string
  combinedScore: number
}

export interface PairHarmony {
  ownerA: string
  ownerB: string
  animalA: ChineseAnimal
  animalB: ChineseAnimal
  numerologyHarmony: HarmonyLevel
  numerologyScore: number
  zodiacHarmony: CompatibilityTier
  zodiacScore: number
  combinedScore: number
  combinedHarmony: HarmonyLevel
  description: string
}

export interface TeamAnalysis {
  pairs: PairHarmony[]
  overallNumerologyScore: number
  overallZodiacScore: number
  overallCombinedScore: number
  overallHarmony: HarmonyLevel
  overallDescription: string
  strongestPair: PairHarmony | null
  weakestPair: PairHarmony | null
}

export interface ZodiacBusinessAnalysis {
  registrationAnimal: ChineseAnimal
  registrationTrine: { name: string; theme: string }
  ownerVsYear: { owner: OwnerNumerics; tier: CompatibilityTier; score: number; desc: string }[]
  ownerPairZodiac: { ownerA: string; ownerB: string; animalA: ChineseAnimal; animalB: ChineseAnimal; tier: CompatibilityTier; score: number; desc: string }[]
  teamZodiacScore: number
  teamZodiacHarmony: CompatibilityTier
}

export interface BusinessAnalysisResult {
  businessNumerics: BusinessNumerics
  ownerNumerics: OwnerNumerics[]
  ownerVsBusiness: OwnerVsBusiness[]
  teamAnalysis: TeamAnalysis | null
  zodiacAnalysis: ZodiacBusinessAnalysis
  companyNameInterpretation: BusinessNumberInterpretation
  destinyInterpretation: BusinessNumberInterpretation
  combinedTeamScore: number
  combinedTeamHarmony: HarmonyLevel
}

// ─── Pythagorean ─────────────────────────────────────────────
const PYTHAGOREAN: Record<string, number> = {
  A:1,B:2,C:3,D:4,E:5,F:6,G:7,H:8,I:9,
  J:1,K:2,L:3,M:4,N:5,O:6,P:7,Q:8,R:9,
  S:1,T:2,U:3,V:4,W:5,X:6,Y:7,Z:8
}

export function reduceToSingleDigit(n: number): number {
  if (n === 11 || n === 22 || n === 33) return n
  if (n < 10) return n
  const sum = String(n).split('').reduce((a, d) => a + parseInt(d), 0)
  return reduceToSingleDigit(sum)
}

export function nameToNumber(name: string): number {
  const raw = name.toUpperCase().split('').reduce((s, c) => s + (PYTHAGOREAN[c] || 0), 0)
  return reduceToSingleDigit(raw)
}

export function nameToRawSum(name: string): number {
  return name.toUpperCase().split('').reduce((s, c) => s + (PYTHAGOREAN[c] || 0), 0)
}

export function parseDateParts(dateStr: string): { mm: number; dd: number; yyyy: number } | null {
  const clean = dateStr.trim()
  if (!clean) return null
  if (/^\d{4}-\d{2}-\d{2}$/.test(clean)) {
    const [yyyy, mm, dd] = clean.split('-').map(Number)
    if (!mm || !dd || !yyyy || yyyy < 1000) return null
    return { mm, dd, yyyy }
  }
  if (clean.includes('/')) {
    const parts = clean.split('/')
    if (parts.length !== 3) return null
    const [mm, dd, yyyy] = parts.map(Number)
    if (!mm || !dd || !yyyy || yyyy < 1000) return null
    return { mm, dd, yyyy }
  }
  return null
}

// Digit-sum method — preserves master numbers
export function dateToLifePath(dateStr: string): number {
  const digits = dateStr.replace(/\D/g, '')
  if (digits.length !== 8) return 0
  const total = digits.split('').reduce((a, d) => a + parseInt(d), 0)
  return reduceToSingleDigit(total)
}

export function dateToSingleDigit(dateStr: string): number {
  return dateToLifePath(dateStr)
}

// Birth Number = same digit-sum (master numbers preserved)
export function dateToBirthNumber(dateStr: string): number {
  return dateToLifePath(dateStr)
}

// ─── Trine System ─────────────────────────────────────────────
function trineBase(n: number): number {
  if (n === 11) return 2
  if (n === 22) return 4
  if (n === 33) return 6
  return n
}

export function getTrine(n: number): number {
  const b = trineBase(n)
  if ([1,4,7].includes(b)) return 1
  if ([2,5,8].includes(b)) return 2
  if ([3,6,9].includes(b)) return 3
  return 0
}

export function getHarmony(a: number, b: number): HarmonyLevel {
  const tA = getTrine(a), tB = getTrine(b)
  if (tA === 0 || tB === 0) return 'neutral'
  if (tA === tB) return 'excellent'
  const combo = [tA, tB].sort().join('')
  if (combo === '13' || combo === '23') return 'good'
  return 'neutral'
}

export function getHarmonyScore(h: HarmonyLevel): number {
  return { excellent:10, good:7, neutral:5, challenging:3 }[h]
}

export const HARMONY_COLORS: Record<HarmonyLevel, string> = {
  excellent: '#54ab8c', good: '#c6a85b', neutral: '#7a8a9a', challenging: '#c0392b'
}
export const HARMONY_LABELS: Record<HarmonyLevel, string> = {
  excellent: 'Excellent', good: 'Good', neutral: 'Neutral', challenging: 'Challenging'
}

// ─── Chinese Zodiac ───────────────────────────────────────────
const ANIMAL_CYCLE: ChineseAnimal[] = [
  'Rat','Ox','Tiger','Rabbit','Dragon','Snake',
  'Horse','Goat','Monkey','Rooster','Dog','Pig'
]

export function yearToAnimal(year: number): ChineseAnimal {
  return ANIMAL_CYCLE[((year - 1900) % 12 + 12) % 12]
}

// Trine 1: Rat Dragon Monkey | Trine 2: Ox Snake Rooster
// Trine 3: Tiger Horse Dog   | Trine 4: Rabbit Goat Pig
const ANIMAL_TRINE: Record<ChineseAnimal, number> = {
  Rat:1, Dragon:1, Monkey:1,
  Ox:2, Snake:2, Rooster:2,
  Tiger:3, Horse:3, Dog:3,
  Rabbit:4, Goat:4, Pig:4
}

const OPPOSITES: Partial<Record<ChineseAnimal, ChineseAnimal>> = {
  Rat:'Horse', Horse:'Rat',
  Ox:'Goat', Goat:'Ox',
  Tiger:'Monkey', Monkey:'Tiger',
  Rabbit:'Rooster', Rooster:'Rabbit',
  Dragon:'Dog', Dog:'Dragon',
  Snake:'Pig', Pig:'Snake'
}

const TRINE_THEMES: Record<number, { name: string; theme: string }> = {
  1: { name: 'Action Trine', theme: 'Ambitious, dynamic, leadership-driven' },
  2: { name: 'Steadfast Trine', theme: 'Purposeful, patient, goal-oriented' },
  3: { name: 'Expression Trine', theme: 'Expressive, adaptable, charismatic' },
  4: { name: 'Compassion Trine', theme: 'Empathetic, creative, harmonious' }
}

export function getAnimalTrine(animal: ChineseAnimal): number {
  return ANIMAL_TRINE[animal]
}

export function getTrineInfo(animal: ChineseAnimal): { name: string; theme: string } {
  return TRINE_THEMES[ANIMAL_TRINE[animal]]
}

export function getZodiacCompatibility(a: ChineseAnimal, b: ChineseAnimal): CompatibilityTier {
  if (OPPOSITES[a] === b) return 'challenging'
  const tA = ANIMAL_TRINE[a], tB = ANIMAL_TRINE[b]
  if (tA === tB) return 'excellent'
  // Adjacent trines = good
  if (Math.abs(tA - tB) === 1 || (tA === 1 && tB === 4) || (tA === 4 && tB === 1)) return 'good'
  return 'neutral'
}

export function getZodiacScore(tier: CompatibilityTier): number {
  return { excellent:10, good:7, neutral:5, challenging:3 }[tier]
}

const ANIMAL_EMOJI: Record<ChineseAnimal, string> = {
  Rat:'🐭', Ox:'🐂', Tiger:'🐯', Rabbit:'🐰', Dragon:'🐉', Snake:'🐍',
  Horse:'🐴', Goat:'🐑', Monkey:'🐵', Rooster:'🐓', Dog:'🐕', Pig:'🐷'
}
export { ANIMAL_EMOJI }

function describeZodiacPair(a: ChineseAnimal, b: ChineseAnimal, nameA: string, nameB: string, tier: CompatibilityTier): string {
  const first = nameA.split(' ')[0], second = nameB.split(' ')[0]
  if (tier === 'excellent') return `${first} (${a}) and ${second} (${b}) share the same zodiac trine — natural allies with aligned energies and mutual understanding.`
  if (tier === 'good') return `${first} (${a}) and ${second} (${b}) are in compatible trines. They complement each other well in a business setting.`
  if (tier === 'neutral') return `${first} (${a}) and ${second} (${b}) have a workable zodiac dynamic. No strong natural pull, but no inherent conflict.`
  return `${first} (${a}) and ${second} (${b}) are zodiac opposites — a challenging combination that requires conscious effort and clear boundaries.`
}

function describeZodiacVsYear(ownerName: string, ownerAnimal: ChineseAnimal, yearAnimal: ChineseAnimal, tier: CompatibilityTier): string {
  const first = ownerName.split(' ')[0]
  if (tier === 'excellent') return `${first} (${ownerAnimal}) is in natural alignment with the ${yearAnimal} year — an auspicious time to launch this venture.`
  if (tier === 'good') return `${first} (${ownerAnimal}) is compatible with the ${yearAnimal} year. The timing is supportive for this business.`
  if (tier === 'neutral') return `${first} (${ownerAnimal}) has a neutral relationship with the ${yearAnimal} year. Neither especially favourable nor unfavourable.`
  return `${first} (${ownerAnimal}) faces zodiac tension with the ${yearAnimal} year — this may require extra resilience in the founding period.`
}

// ─── Business Number Interpretations ─────────────────────────
export interface BusinessNumberInterpretation {
  number: number
  nameLabel: string
  nameDescription: string
  destinyLabel: string
  destinyDescription: string
  isGoodName: boolean
  isGoodDestiny: boolean
}

const BUSINESS_INTERPRETATIONS: Record<number, BusinessNumberInterpretation> = {
  1: { number:1, nameLabel:'Pioneer & Innovator', nameDescription:'A company at the forefront of development, renewing ideas, machinery, and campaigns. Often represents a new or distinctive product. Strongly indicates success.', destinyLabel:'Favourable Destiny', destinyDescription:'Number 1 is a strong destiny vibration for a business — leadership energy that drives the company forward.', isGoodName:true, isGoodDestiny:true },
  2: { number:2, nameLabel:'Community & Service', nameDescription:'Not a strongly commercial number. Often faces obstacles that hinder success. Best suited for organisations where success depends on broader social factors.', destinyLabel:'Challenging Destiny', destinyDescription:'Number 2 is not a favourable destiny vibration for a business focused on financial growth.', isGoodName:false, isGoodDestiny:false },
  3: { number:3, nameLabel:'Joy & Wellbeing', nameDescription:'Suits businesses that promote personal wellbeing, joy, or happiness. Ideal for entertainment venues or places that attract large numbers of people.', destinyLabel:'Conditionally Favourable', destinyDescription:'Number 3 is a good destiny vibration in specific cases — particularly for lifestyle, wellness, or entertainment businesses.', isGoodName:true, isGoodDestiny:true },
  4: { number:4, nameLabel:'Reliability & Quality', nameDescription:'Represents a company producing reliable, quality products that reach a wide audience. Indicates steady, long-term earnings — slow but enduring.', destinyLabel:'Favourable Destiny', destinyDescription:'Number 4 is a good destiny vibration — building something lasting and dependable.', isGoodName:true, isGoodDestiny:true },
  5: { number:5, nameLabel:'High Turnover & Activity', nameDescription:'These businesses often see high turnover and revenue, but frequently encounter internal problems — administrative, operational, or workforce-related.', destinyLabel:'Challenging Destiny', destinyDescription:'Number 5 is not a favourable destiny vibration for a business — internal instability can undermine long-term success.', isGoodName:false, isGoodDestiny:false },
  6: { number:6, nameLabel:'Common Good & Care', nameDescription:'Suitable for businesses related to the common good, education, home, or hospitality. However, the business lifecycle will include notable ups and downs.', destinyLabel:'Challenging Destiny', destinyDescription:'Number 6 is not a favourable destiny vibration — expect fluctuations in the business journey.', isGoodName:false, isGoodDestiny:false },
  7: { number:7, nameLabel:'Prestige & Refinement', nameDescription:'Associated with high-quality and sophisticated products. Often connected with well-known figures whose reputation promotes sales. Indicates fame and popularity.', destinyLabel:'Unfavourable Destiny', destinyDescription:'Despite prestige, number 7 is not a profitable destiny vibration for a business focused on financial returns.', isGoodName:true, isGoodDestiny:false },
  8: { number:8, nameLabel:'Ambition & Scale', nameDescription:'These businesses can achieve recognition and success locally and often internationally. They typically generate strong revenues and can scale to significant size.', destinyLabel:'Favourable Destiny', destinyDescription:'Number 8 is a strong destiny vibration — ambition, material success, and broad recognition.', isGoodName:true, isGoodDestiny:true },
  9: { number:9, nameLabel:'Social Purpose', nameDescription:'Not suited for companies focused purely on profit. Excellent for organisations involved in social causes, humanitarian work, or charitable activities.', destinyLabel:'Challenging Destiny', destinyDescription:'Number 9 is not a favourable vibration for profit-driven businesses, but ideal for mission-driven organisations.', isGoodName:false, isGoodDestiny:false },
  11: { number:11, nameLabel:'Visionary Inspiration', nameDescription:'Master number 11 carries an inspiring, idealistic energy. Best for businesses with a higher vision or spiritual/creative mission.', destinyLabel:'Visionary Destiny', destinyDescription:'Master number 11 as a destiny brings inspiration and vision — but financial grounding requires strong partners.', isGoodName:true, isGoodDestiny:false },
  22: { number:22, nameLabel:'Master Builder', nameDescription:'Master number 22 is the most powerful business vibration — the ability to turn grand visions into reality at scale.', destinyLabel:'Master Builder Destiny', destinyDescription:'Master number 22 destiny is exceptional — the capacity to build something of lasting significance.', isGoodName:true, isGoodDestiny:true },
  33: { number:33, nameLabel:'Master Healer', nameDescription:'Master number 33 brings a nurturing, compassionate energy — ideal for healing, education, or transformational businesses.', destinyLabel:'Master Healer Destiny', destinyDescription:'Master number 33 destiny aligns with businesses dedicated to elevating humanity.', isGoodName:true, isGoodDestiny:true }
}

export function getBusinessInterpretation(n: number): BusinessNumberInterpretation {
  return BUSINESS_INTERPRETATIONS[n] || BUSINESS_INTERPRETATIONS[9]
}

// ─── Owner Numerics ───────────────────────────────────────────
export function calculateOwnerNumerics(owner: Owner): OwnerNumerics {
  const lifePath = dateToLifePath(owner.birthdate)
  const expressionNumber = nameToNumber(owner.name)
  const parts = parseDateParts(owner.birthdate)
  const birthYear = parts?.yyyy ?? 0
  const animal = birthYear ? yearToAnimal(birthYear) : 'Rat'
  return { id:owner.id, name:owner.name, lifePath, expressionNumber, nameVibration:expressionNumber, animal, birthYear }
}

// ─── Business Numerics ────────────────────────────────────────
export function calculateBusinessNumerics(companyName: string, registrationDate: string, owners: Owner[]): BusinessNumerics {
  // Birth number — digit-sum (same as Life Path, master numbers preserved)
  const birthNumber = dateToBirthNumber(registrationDate)

  const ownerNamesRaw = owners.reduce((sum, o) => sum + nameToRawSum(o.name), 0)
  const companyRaw = nameToRawSum(companyName)
  const nameVibrationRaw = ownerNamesRaw + companyRaw
  const nameVibration = reduceToSingleDigit(nameVibrationRaw)

  const destinyRaw = birthNumber + nameVibration
  const destinyNumber = reduceToSingleDigit(destinyRaw)

  const regParts = parseDateParts(registrationDate)
  const registrationYear = regParts?.yyyy ?? 0
  const registrationAnimal = registrationYear ? yearToAnimal(registrationYear) : 'Rat'

  return { birthNumber, nameVibration, destinyNumber, registrationYear, registrationAnimal }
}

// ─── Owner vs Business ────────────────────────────────────────
function describeOwnerVsDestiny(lp: number, destiny: number, h: HarmonyLevel): string {
  const d: Record<HarmonyLevel, string> = {
    excellent: `Your Life Path ${lp} resonates powerfully with the company's Destiny ${destiny}. You are naturally aligned with this venture — your energy amplifies its purpose.`,
    good: `Your Life Path ${lp} is compatible with the company's Destiny ${destiny}. There is a supportive relationship that can bring positive results with some conscious effort.`,
    neutral: `Your Life Path ${lp} is in a neutral relationship with the company's Destiny ${destiny}. This is workable but may require deliberate alignment of personal and business goals.`,
    challenging: `Your Life Path ${lp} is in tension with the company's Destiny ${destiny}. This doesn't prevent success, but awareness of this dynamic is important to avoid friction.`
  }
  return d[h]
}

export function calculateOwnerVsBusiness(ownerNumerics: OwnerNumerics[], businessNumerics: BusinessNumerics): OwnerVsBusiness[] {
  return ownerNumerics.map(owner => {
    const harmony = getHarmony(owner.lifePath, businessNumerics.destinyNumber)
    const harmonyScore = getHarmonyScore(harmony)
    const zodiacVsYear = getZodiacCompatibility(owner.animal, businessNumerics.registrationAnimal)
    const zodiacVsYearScore = getZodiacScore(zodiacVsYear)
    const combinedScore = Math.round(harmonyScore * 0.75 + zodiacVsYearScore * 0.25)
    return {
      owner,
      harmonyWithDestiny: harmony,
      harmonyScore,
      description: describeOwnerVsDestiny(owner.lifePath, businessNumerics.destinyNumber, harmony),
      zodiacVsYear,
      zodiacVsYearScore,
      zodiacVsYearDesc: describeZodiacVsYear(owner.name, owner.animal, businessNumerics.registrationAnimal, zodiacVsYear),
      combinedScore
    }
  })
}

// ─── Team Analysis ────────────────────────────────────────────
export function calculateTeamAnalysis(ownerNumerics: OwnerNumerics[]): TeamAnalysis | null {
  if (ownerNumerics.length < 2) return null
  const pairs: PairHarmony[] = []

  for (let i = 0; i < ownerNumerics.length; i++) {
    for (let j = i + 1; j < ownerNumerics.length; j++) {
      const a = ownerNumerics[i], b = ownerNumerics[j]
      const numerologyHarmony = getHarmony(a.lifePath, b.lifePath)
      const numerologyScore = getHarmonyScore(numerologyHarmony)
      const zodiacHarmony = getZodiacCompatibility(a.animal, b.animal)
      const zodiacScore = getZodiacScore(zodiacHarmony)
      const combinedScore = Math.round(numerologyScore * 0.75 + zodiacScore * 0.25)
      const combinedHarmony: HarmonyLevel = combinedScore >= 9 ? 'excellent' : combinedScore >= 7 ? 'good' : combinedScore >= 5 ? 'neutral' : 'challenging'
      pairs.push({
        ownerA: a.name, ownerB: b.name,
        animalA: a.animal, animalB: b.animal,
        numerologyHarmony, numerologyScore,
        zodiacHarmony, zodiacScore,
        combinedScore, combinedHarmony,
        description: describeZodiacPair(a.animal, b.animal, a.name, b.name, zodiacHarmony)
      })
    }
  }

  const avgNumerology = pairs.reduce((s, p) => s + p.numerologyScore, 0) / pairs.length
  const avgZodiac = pairs.reduce((s, p) => s + p.zodiacScore, 0) / pairs.length
  const avgCombined = pairs.reduce((s, p) => s + p.combinedScore, 0) / pairs.length

  const toScore100 = (avg: number) => Math.round(((avg - 3) / 7) * 100)
  const overallHarmony: HarmonyLevel = avgCombined >= 9 ? 'excellent' : avgCombined >= 7 ? 'good' : avgCombined >= 5 ? 'neutral' : 'challenging'

  const descriptions: Record<HarmonyLevel, string> = {
    excellent: 'This founding team has exceptional natural alignment across both numerology and Chinese zodiac. A powerfully compatible group.',
    good: 'This team has a solid foundation. Compatible energies with enough diversity to strengthen the venture.',
    neutral: 'This team can work well together with clear communication and defined roles. The energies are workable but not naturally synergistic.',
    challenging: 'This partnership carries significant tension. Success is possible but requires deliberate effort to align on vision and working style.'
  }

  const sorted = [...pairs].sort((a, b) => b.combinedScore - a.combinedScore)

  return {
    pairs,
    overallNumerologyScore: toScore100(avgNumerology),
    overallZodiacScore: toScore100(avgZodiac),
    overallCombinedScore: toScore100(avgCombined),
    overallHarmony,
    overallDescription: descriptions[overallHarmony],
    strongestPair: sorted[0] || null,
    weakestPair: sorted[sorted.length - 1] || null
  }
}

// ─── Zodiac Business Analysis ─────────────────────────────────
export function calculateZodiacBusinessAnalysis(ownerNumerics: OwnerNumerics[], businessNumerics: BusinessNumerics): ZodiacBusinessAnalysis {
  const { registrationAnimal, registrationYear } = businessNumerics

  const ownerVsYear = ownerNumerics.map(owner => {
    const tier = getZodiacCompatibility(owner.animal, registrationAnimal)
    const score = getZodiacScore(tier)
    return { owner, tier, score, desc: describeZodiacVsYear(owner.name, owner.animal, registrationAnimal, tier) }
  })

  const ownerPairZodiac: ZodiacBusinessAnalysis['ownerPairZodiac'] = []
  for (let i = 0; i < ownerNumerics.length; i++) {
    for (let j = i + 1; j < ownerNumerics.length; j++) {
      const a = ownerNumerics[i], b = ownerNumerics[j]
      const tier = getZodiacCompatibility(a.animal, b.animal)
      ownerPairZodiac.push({
        ownerA: a.name, ownerB: b.name,
        animalA: a.animal, animalB: b.animal,
        tier, score: getZodiacScore(tier),
        desc: describeZodiacPair(a.animal, b.animal, a.name, b.name, tier)
      })
    }
  }

  const allScores = [...ownerVsYear.map(o => o.score), ...ownerPairZodiac.map(p => p.score)]
  const avgZodiac = allScores.length ? allScores.reduce((a, b) => a + b, 0) / allScores.length : 5
  const teamZodiacScore = Math.round(((avgZodiac - 3) / 7) * 100)
  const teamZodiacHarmony: CompatibilityTier = avgZodiac >= 9 ? 'excellent' : avgZodiac >= 7 ? 'good' : avgZodiac >= 5 ? 'neutral' : 'challenging'

  return {
    registrationAnimal,
    registrationTrine: getTrineInfo(registrationAnimal),
    ownerVsYear,
    ownerPairZodiac,
    teamZodiacScore,
    teamZodiacHarmony
  }
}

// ─── Full Analysis ────────────────────────────────────────────
export function analyseBusinessCompatibility(input: BusinessInput): BusinessAnalysisResult {
  const ownerNumerics = input.owners.map(calculateOwnerNumerics)
  const businessNumerics = calculateBusinessNumerics(input.companyName, input.registrationDate, input.owners)
  const ownerVsBusiness = calculateOwnerVsBusiness(ownerNumerics, businessNumerics)
  const teamAnalysis = calculateTeamAnalysis(ownerNumerics)
  const zodiacAnalysis = calculateZodiacBusinessAnalysis(ownerNumerics, businessNumerics)

  // Combined team score: numerology 75% + zodiac 25%
  const numScore = teamAnalysis?.overallCombinedScore ?? 50
  const zodScore = zodiacAnalysis.teamZodiacScore
  const combinedTeamScore = Math.round(numScore * 0.75 + zodScore * 0.25)
  const combinedTeamHarmony: HarmonyLevel = combinedTeamScore >= 70 ? 'excellent' : combinedTeamScore >= 50 ? 'good' : combinedTeamScore >= 30 ? 'neutral' : 'challenging'

  return {
    businessNumerics, ownerNumerics, ownerVsBusiness, teamAnalysis, zodiacAnalysis,
    companyNameInterpretation: getBusinessInterpretation(businessNumerics.nameVibration),
    destinyInterpretation: getBusinessInterpretation(businessNumerics.destinyNumber),
    combinedTeamScore, combinedTeamHarmony
  }
}