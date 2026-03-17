export interface TimeTheme {
  name: 'night' | 'dawn' | 'sunrise' | 'morningGlow' | 'morning' | 'noon' | 'afternoon' | 'goldenHour' | 'dusk' | 'sunset'
  label: string
  icon: string
  isDark: boolean
  // Background (solid color — CSS transitions smoothly, blobs provide atmosphere)
  bgColor: string
  // Blob colors
  blob1: string
  blob2: string
  blob3: string
  blob4: string
  blobOpacity: number
  // Glass panels
  glassPanel: string
  glassBorder: string
  glassHighlight: string
  boxShadow: string
  modalBg: string
  // Typography
  textBody: string
  textMuted: string
  // Accent
  accent: string
  // Misc
  divider: string
}

export const THEMES: Record<TimeTheme['name'], TimeTheme> = {

  // ── 20:00–05:00 ─────────────────────────────────────────────────────────────
  night: {
    name: 'night',
    label: 'Night',
    icon: '🌙',
    isDark: true,
    bgColor: '#060612',
    blob1: '#4c1d95',
    blob2: '#1e3a5f',
    blob3: '#3b1078',
    blob4: '#0f2040',
    blobOpacity: 0.22,
    glassPanel: 'rgba(255,255,255,0.05)',
    glassBorder: 'rgba(255,255,255,0.08)',
    glassHighlight: 'rgba(255,255,255,0.06)',
    boxShadow: '0 8px 32px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.06)',
    modalBg: 'rgba(8,6,22,0.82)',
    textBody: '#e0e0f0',
    textMuted: 'rgba(224,224,240,0.4)',
    accent: '#EA526F',
    divider: 'rgba(255,255,255,0.07)',
  },

  // ── 05:00–06:00 ─────────────────────────────────────────────────────────────
  dawn: {
    name: 'dawn',
    label: 'Dawn',
    icon: '🌅',
    isDark: true,
    bgColor: '#1a0a1e',
    blob1: '#f4938a',
    blob2: '#d4956a',
    blob3: '#e8708a',
    blob4: '#b06030',
    blobOpacity: 0.28,
    glassPanel: 'rgba(255,255,255,0.07)',
    glassBorder: 'rgba(255,200,200,0.15)',
    glassHighlight: 'rgba(255,200,180,0.08)',
    boxShadow: '0 8px 32px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,200,180,0.1)',
    modalBg: 'rgba(25,8,22,0.82)',
    textBody: '#f9eff5',
    textMuted: 'rgba(249,239,245,0.42)',
    accent: '#EA526F',
    divider: 'rgba(255,255,255,0.08)',
  },

  // ── 06:00–07:00 — bridge: dark-purple → medium ───────────────────────────────
  sunrise: {
    name: 'sunrise',
    label: 'Sunrise',
    icon: '🌄',
    isDark: true,
    bgColor: '#6e3a7a',
    blob1: '#f4a090',
    blob2: '#e8b0f0',
    blob3: '#f4c0a0',
    blob4: '#d0a0e0',
    blobOpacity: 0.3,
    glassPanel: 'rgba(255,255,255,0.12)',
    glassBorder: 'rgba(255,220,220,0.22)',
    glassHighlight: 'rgba(255,220,200,0.12)',
    boxShadow: '0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,200,200,0.1)',
    modalBg: 'rgba(80,25,80,0.82)',
    textBody: '#f5eef2',
    textMuted: 'rgba(245,238,242,0.42)',
    accent: '#EA526F',
    divider: 'rgba(255,255,255,0.1)',
  },

  // ── 07:00–08:30 — bridge: medium → light-lavender ────────────────────────────
  morningGlow: {
    name: 'morningGlow',
    label: 'Morning Glow',
    icon: '🌸',
    isDark: false,
    bgColor: '#e8d0f0',
    blob1: '#EA526F',
    blob2: '#d4a0f0',
    blob3: '#f4a0c0',
    blob4: '#c0a0e8',
    blobOpacity: 0.26,
    glassPanel: 'rgba(255,255,255,0.5)',
    glassBorder: 'rgba(255,230,255,0.7)',
    glassHighlight: 'rgba(255,255,255,0.85)',
    boxShadow: '0 8px 32px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.9)',
    modalBg: 'rgba(225,200,240,0.8)',
    textBody: '#3a2850',
    textMuted: 'rgba(58,40,80,0.46)',
    accent: '#c93455',
    divider: 'rgba(58,40,80,0.1)',
  },

  // ── 08:30–11:00 ─────────────────────────────────────────────────────────────
  morning: {
    name: 'morning',
    label: 'Morning',
    icon: '🌤',
    isDark: false,
    bgColor: '#ddeeff',
    blob1: '#EA526F',
    blob2: '#c084fc',
    blob3: '#f472b6',
    blob4: '#a78bfa',
    blobOpacity: 0.28,
    glassPanel: 'rgba(255,255,255,0.55)',
    glassBorder: 'rgba(255,255,255,0.75)',
    glassHighlight: 'rgba(255,255,255,0.85)',
    boxShadow: '0 8px 32px rgba(0,0,0,0.07), inset 0 1px 0 rgba(255,255,255,0.9)',
    modalBg: 'rgba(210,228,250,0.78)',
    textBody: '#2a3a5c',
    textMuted: 'rgba(42,58,92,0.48)',
    accent: '#c93455',
    divider: 'rgba(42,58,92,0.1)',
  },

  // ── 11:00–14:00 ─────────────────────────────────────────────────────────────
  noon: {
    name: 'noon',
    label: 'Noon',
    icon: '☀️',
    isDark: false,
    bgColor: '#f5f0ff',
    blob1: '#EA526F',
    blob2: '#a78bfa',
    blob3: '#f472b6',
    blob4: '#818cf8',
    blobOpacity: 0.22,
    glassPanel: 'rgba(255,255,255,0.62)',
    glassBorder: 'rgba(255,255,255,0.8)',
    glassHighlight: 'rgba(255,255,255,0.92)',
    boxShadow: '0 8px 32px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.95)',
    modalBg: 'rgba(238,234,255,0.8)',
    textBody: '#3a2850',
    textMuted: 'rgba(58,40,80,0.46)',
    accent: '#c93455',
    divider: 'rgba(58,40,80,0.1)',
  },

  // ── 14:00–16:00 ─────────────────────────────────────────────────────────────
  afternoon: {
    name: 'afternoon',
    label: 'Afternoon',
    icon: '🌤',
    isDark: false,
    bgColor: '#fff8f0',
    blob1: '#f97316',
    blob2: '#EA526F',
    blob3: '#fbbf24',
    blob4: '#f87171',
    blobOpacity: 0.3,
    glassPanel: 'rgba(255,255,255,0.52)',
    glassBorder: 'rgba(255,200,150,0.45)',
    glassHighlight: 'rgba(255,255,255,0.85)',
    boxShadow: '0 8px 32px rgba(0,0,0,0.07), inset 0 1px 0 rgba(255,240,200,0.6)',
    modalBg: 'rgba(255,244,228,0.8)',
    textBody: '#5c4a2a',
    textMuted: 'rgba(92,74,42,0.48)',
    accent: '#d94060',
    divider: 'rgba(92,74,42,0.1)',
  },

  // ── 16:00–17:30 — bridge: warm light → rich amber ────────────────────────────
  goldenHour: {
    name: 'goldenHour',
    label: 'Golden Hour',
    icon: '🌆',
    isDark: false,
    bgColor: '#f0d090',
    blob1: '#f97316',
    blob2: '#EA526F',
    blob3: '#fbbf24',
    blob4: '#e05050',
    blobOpacity: 0.34,
    glassPanel: 'rgba(255,255,255,0.45)',
    glassBorder: 'rgba(255,200,100,0.5)',
    glassHighlight: 'rgba(255,240,180,0.7)',
    boxShadow: '0 8px 32px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,240,180,0.8)',
    modalBg: 'rgba(235,185,70,0.75)',
    textBody: '#5c3a10',
    textMuted: 'rgba(92,58,16,0.48)',
    accent: '#d94060',
    divider: 'rgba(92,58,16,0.12)',
  },

  // ── 17:30–19:00 — bridge: amber → medium-dark rose ───────────────────────────
  dusk: {
    name: 'dusk',
    label: 'Dusk',
    icon: '🌃',
    isDark: true,
    bgColor: '#7a3050',
    blob1: '#EA526F',
    blob2: '#c05040',
    blob3: '#a04080',
    blob4: '#8b3570',
    blobOpacity: 0.32,
    glassPanel: 'rgba(255,255,255,0.09)',
    glassBorder: 'rgba(255,180,180,0.2)',
    glassHighlight: 'rgba(255,180,160,0.1)',
    boxShadow: '0 8px 32px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,180,160,0.1)',
    modalBg: 'rgba(80,20,40,0.82)',
    textBody: '#f5ece0',
    textMuted: 'rgba(245,236,224,0.42)',
    accent: '#EA526F',
    divider: 'rgba(255,255,255,0.09)',
  },

  // ── 19:00–20:00 ─────────────────────────────────────────────────────────────
  sunset: {
    name: 'sunset',
    label: 'Sunset',
    icon: '🌇',
    isDark: true,
    bgColor: '#0d0d1a',
    blob1: '#EA526F',
    blob2: '#7c3aed',
    blob3: '#EA526F',
    blob4: '#7c3aed',
    blobOpacity: 0.35,
    glassPanel: 'rgba(255,255,255,0.06)',
    glassBorder: 'rgba(255,255,255,0.1)',
    glassHighlight: 'rgba(255,255,255,0.08)',
    boxShadow: '0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08)',
    modalBg: 'rgba(20,10,35,0.75)',
    textBody: '#f2f2fa',
    textMuted: 'rgba(242,242,250,0.45)',
    accent: '#EA526F',
    divider: 'rgba(255,255,255,0.08)',
  },
}

export function getThemeForHour(hour: number): TimeTheme {
  const h = ((hour % 24) + 24) % 24
  if (h >= 19)             return THEMES.sunset      // 19:00–20:00
  if (h >= 17.5)           return THEMES.dusk        // 17:30–19:00
  if (h >= 16)             return THEMES.goldenHour  // 16:00–17:30
  if (h >= 14)             return THEMES.afternoon   // 14:00–16:00
  if (h >= 11)             return THEMES.noon        // 11:00–14:00
  if (h >= 8.5)            return THEMES.morning     // 08:30–11:00
  if (h >= 7)              return THEMES.morningGlow // 07:00–08:30
  if (h >= 6)              return THEMES.sunrise     // 06:00–07:00
  if (h >= 5)              return THEMES.dawn        // 05:00–06:00
  return THEMES.night                                // 20:00–05:00
}

export function formatVirtualTime(totalMinutes: number): string {
  const h = Math.floor(totalMinutes / 60) % 24
  const m = totalMinutes % 60
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`
}

// Blob animation duration varies by time of day.
// Returned value is set as --blob-dur CSS custom property on the blurs container.
// Night (20–5): slow, meditative — 15s base
// Core day (8.5–16): active, energetic — 7s base
// Transition phases blend smoothly between the two extremes.
export function getBlobAnimationDuration(hour: number): number {
  const h = ((hour % 24) + 24) % 24

  if (h >= 20 || h < 5)       return 15   // Night: slow
  if (h >= 8.5 && h < 16)     return 7    // Core day: fast

  // Dawn (5–6): 15 → 12
  if (h >= 5  && h < 6)   return 15 - ((h - 5)   / 1.0) * 3

  // Sunrise (6–7): 12 → 9
  if (h >= 6  && h < 7)   return 12 - ((h - 6)   / 1.0) * 3

  // Morning Glow (7–8.5): 9 → 7
  if (h >= 7  && h < 8.5) return  9 - ((h - 7)   / 1.5) * 2

  // Golden Hour (16–17.5): 7 → 11
  if (h >= 16 && h < 17.5) return 7 + ((h - 16)  / 1.5) * 4

  // Dusk (17.5–19): 11 → 13
  if (h >= 17.5 && h < 19) return 11 + ((h - 17.5) / 1.5) * 2

  // Sunset (19–20): 13 → 15
  return 13 + ((h - 19) / 1.0) * 2
}
