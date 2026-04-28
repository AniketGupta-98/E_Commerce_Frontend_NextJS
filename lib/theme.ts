/**
 * ════════════════════════════════════════════════════════════════════════
 *  lib/theme.ts  —  TypeScript theme bridge
 * ════════════════════════════════════════════════════════════════════════
 *
 *  ✅  To change the theme: edit  app/globals.css  (the :root block).
 *
 *  This file does NOT contain any hex values.
 *  It only maps readable TypeScript names → CSS custom property strings
 *  e.g.  primaryColor[600]  →  "var(--color-primary-600)"
 *
 *  Because the values are CSS vars, every component automatically picks
 *  up whatever you set in globals.css — including MUI sx props, inline
 *  styles, and Tailwind arbitrary-value classes.
 * ════════════════════════════════════════════════════════════════════════
 */

// ─── Primary Brand Color ──────────────────────────────────────────────────────
export const primaryColor = {
  50:  "var(--color-primary-50)",
  100: "var(--color-primary-100)",
  500: "var(--color-primary-500)",
  600: "var(--color-primary-600)",
  700: "var(--color-primary-700)",
} as const;

// ─── Danger / Delete Color ────────────────────────────────────────────────────
export const dangerColor = {
  50:  "var(--color-danger-50)",
  500: "var(--color-danger-500)",
  600: "var(--color-danger-600)",
} as const;

// ─── Neutral Palette ──────────────────────────────────────────────────────────
export const neutralColor = {
  50:  "var(--color-neutral-50)",
  100: "var(--color-neutral-100)",
  200: "var(--color-neutral-200)",
  300: "var(--color-neutral-300)",
  400: "var(--color-neutral-400)",
  500: "var(--color-neutral-500)",
  600: "var(--color-neutral-600)",
  800: "var(--color-neutral-800)",
  900: "var(--color-neutral-900)",
} as const;

// ─── Surface / Background ─────────────────────────────────────────────────────
export const surface = {
  white:      "#ffffff",
  bodyBg:     "var(--surface-body)",
  cardBg:     "var(--surface-card)",
  sidebarBg:  "var(--surface-sidebar)",
  headerBg:   "var(--surface-header)",
} as const;

// ─── Layout Dimensions ────────────────────────────────────────────────────────
export const sidebar = {
  width: 260,  // keep as number for MUI Drawer width prop
} as const;

export const header = {
  height: 64,  // keep as number for min-height calcs
} as const;

// ─── Gradient helpers ─────────────────────────────────────────────────────────
export const primaryGradient = {
  default: "var(--gradient-primary)",
  hover:   "var(--gradient-primary-hover)",
  shadow:  "var(--gradient-primary-shadow)",
} as const;

// ─── Shadow ───────────────────────────────────────────────────────────────────
export const shadow = {
  sm: "var(--shadow-sm)",
  md: "var(--shadow-md)",
  lg: "var(--shadow-lg)",
} as const;

// ─── Category Icon Colours (table rows cycle through these) ──────────────────
// The first entry uses the primary brand color; rest are fixed accent colours.
export const categoryColors = [
  "bg-indigo-500",    // → resolves to --color-primary-500 via Tailwind alias
  "bg-violet-500",
  "bg-sky-500",
  "bg-emerald-500",
  "bg-amber-500",
  "bg-rose-500",
  "bg-teal-500",
  "bg-orange-500",
] as const;

// ─── MUI sx helpers ───────────────────────────────────────────────────────────
// Spread these into MUI components:
//   <Button sx={muiSx.primaryOutlinedButton}>Edit</Button>
//   <Button sx={muiSx.dangerOutlinedButton}>Delete</Button>
//   <Button sx={muiSx.primaryContainedButton}>Save</Button>
export const muiSx = {
  primaryOutlinedButton: {
    borderColor:   primaryColor[500],
    color:         primaryColor[500],
    textTransform: "none" as const,
    fontWeight:    600,
    fontSize:      "0.75rem",
    "&:hover": {
      background:  primaryColor[50],
      borderColor: primaryColor[700],
    },
  },

  dangerOutlinedButton: {
    borderColor:   dangerColor[500],
    color:         dangerColor[500],
    textTransform: "none" as const,
    fontWeight:    600,
    fontSize:      "0.75rem",
    "&:hover": {
      background:  dangerColor[50],
      borderColor: dangerColor[600],
    },
  },

  primaryContainedButton: {
    background:    primaryGradient.default,
    color:         "#ffffff",
    textTransform: "none" as const,
    fontWeight:    600,
    borderRadius:  "10px",
    "&:hover": {
      background: primaryGradient.hover,
    },
    "&:disabled": {
      opacity:    0.5,
      background: primaryColor[100],
    },
  },
} as const;
