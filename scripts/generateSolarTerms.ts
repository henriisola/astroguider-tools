import fs from "fs"

const DEG2RAD = Math.PI / 180
const RAD2DEG = 180 / Math.PI

// Julian Day
function toJulianDay(date: Date): number {
  return date.getTime() / 86400000 + 2440587.5
}

// Sun apparent ecliptic longitude (Meeus low precision)
function solarLongitude(date: Date): number {
  const JD = toJulianDay(date)
  const T = (JD - 2451545.0) / 36525

  const L0 =
    280.46646 +
    36000.76983 * T +
    0.0003032 * T * T

  const M =
    357.52911 +
    35999.05029 * T -
    0.0001537 * T * T

  const C =
    (1.914602 -
      0.004817 * T -
      0.000014 * T * T) *
      Math.sin(M * DEG2RAD) +
    (0.019993 -
      0.000101 * T) *
      Math.sin(2 * M * DEG2RAD) +
    0.000289 *
      Math.sin(3 * M * DEG2RAD)

  const trueLongitude = L0 + C

  return ((trueLongitude % 360) + 360) % 360
}

// Binary search for longitude crossing
function findLongitudeCrossing(
  year: number,
  targetDeg: number
): Date {
  let start = new Date(Date.UTC(year, 0, 1))
  let end = new Date(Date.UTC(year, 11, 31, 23, 59))

  while (end.getTime() - start.getTime() > 1000 * 30) {
    const mid = new Date(
      (start.getTime() + end.getTime()) / 2
    )

    const lon = solarLongitude(mid)

    const diff =
      ((lon - targetDeg + 540) % 360) - 180

    if (diff > 0) {
      end = mid
    } else {
      start = mid
    }
  }

  return new Date(
    (start.getTime() + end.getTime()) / 2
  )
}

const SOLAR_TERM_DEGREES = [
  0, 15, 30, 45, 60, 75,
  90, 105, 120, 135, 150, 165,
  180, 195, 210, 225, 240, 255,
  270, 285, 300, 315, 330, 345
]

const SOLAR_TERM_NAMES = [
  "SpringEquinox", "QingMing", "GuYu",
  "LiXia", "XiaoMan", "MangZhong",
  "SummerSolstice", "XiaoShu", "DaShu",
  "LiQiu", "ChuShu", "BaiLu",
  "AutumnEquinox", "HanLu", "ShuangJiang",
  "LiDong", "XiaoXue", "DaXue",
  "WinterSolstice", "XiaoHan", "DaHan",
  "LiChun", "YuShui", "JingZhe"
]

const START_YEAR = 2000
const END_YEAR = 2030

const result: Record<number, { name: string; utc: string }[]> = {}

for (let year = START_YEAR; year <= END_YEAR; year++) {
  console.log("Generating", year)

  result[year] = SOLAR_TERM_DEGREES.map((deg, i) => {
    const date = findLongitudeCrossing(year, deg)
    return {
      name: SOLAR_TERM_NAMES[i],
      utc: date.toISOString(),
    }
  })
}

fs.writeFileSync(
  "solarTerms_2000_2030.json",
  JSON.stringify(result, null, 2)
)

console.log("Done.")