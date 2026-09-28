/**
 * The data model.
 *
 * Three ideas, and the reason for each:
 *
 * 1. A **Screen** is a set of regions plus a block list. Screens are what you
 *    navigate between, so they are the unit you switch on.
 * 2. A **Region** is one named, bounded piece of a screen — the thing you point
 *    at and ask "what is that?". Regions carry their own geometry, so the
 *    renderer never hard-codes coordinates.
 * 3. A **category** is Flutter's own Material grouping (Actions, Containment,
 *    Navigation, ...). Using the platform's taxonomy instead of an invented one
 *    means the vocabulary transfers to any new app you build.
 *
 * `blocks` are the visual mock. They are data, not markup, so a new screen is a
 * data edit and the phone frame stays untouched.
 */

export type Owner = 'OS' | 'App'

/** Flutter's Material 3 widget groupings, verbatim from the widget catalog. */
export type CategoryId =
  | 'system'
  | 'actions'
  | 'communication'
  | 'containment'
  | 'navigation'
  | 'selection'
  | 'text-inputs'

export interface Category {
  id: CategoryId
  label: string
  /** Shown under the category heading in the legend. */
  hint: string
}

export const CATEGORIES: Category[] = [
  {
    id: 'system',
    label: 'System',
    hint: 'Drawn by the OS, not by you. Pad for it; never paint over it.',
  },
  {
    id: 'actions',
    label: 'Actions',
    hint: 'Clickable things that start something: buttons, FABs, icon buttons.',
  },
  {
    id: 'communication',
    label: 'Communication',
    hint: 'How the app talks back: snackbars, badges, progress indicators.',
  },
  {
    id: 'containment',
    label: 'Containment',
    hint: 'Surfaces that hold content: cards, list tiles, sheets, dividers, dialogs.',
  },
  {
    id: 'navigation',
    label: 'Navigation',
    hint: 'Moving around: app bars, navigation bars, drawers, rails, tab bars.',
  },
  {
    id: 'selection',
    label: 'Selection',
    hint: 'Picking from a set: chips, menus, switches, radios, sliders, pickers.',
  },
  {
    id: 'text-inputs',
    label: 'Text inputs',
    hint: 'Getting typed input: text fields, forms, validation.',
  },
]

/* ── Mock blocks ──────────────────────────────────────────────────────────
   The visual content of a screen, described declaratively. `ScreenMock.vue`
   is the only component that knows what these look like.
   ───────────────────────────────────────────────────────────────────────── */

export type Tone = 'neutral' | 'gold' | 'green' | 'red' | 'blue' | 'amber'

export type Block =
  | { kind: 'statusbar'; time: string }
  | { kind: 'sysnav' }
  | { kind: 'appbar'; title: string; leading?: 'back' | 'menu'; actions?: string[] }
  | {
      kind: 'headerRow'
      avatar?: string
      title: string
      subtitle?: string
      badge?: string
      trailing?: 'sync'
    }
  | {
      kind: 'sectionTitle'
      text: string
    }
  | {
      kind: 'kpiGrid'
      cols: number
      items: { label: string; value: string; icon?: string; tone?: Tone }[]
    }
  | {
      kind: 'tileGrid'
      cols: number
      items: { icon: string; label: string; sub?: string }[]
      /** 'module' is the larger 2x2 style; 'action' is the smaller 3x2 style. */
      variant?: 'module' | 'action'
    }
  | {
      kind: 'rows'
      items: {
        icon?: string
        title: string
        subtitle?: string
        trailing?: string
        tone?: Tone
        /** Small status pill on the right — the urgency signal on member rows. */
        chip?: string
        /** 0–1 repayment progress, drawn as a thin bar under the meta line. */
        bar?: number
      }[]
      variant?: 'list' | 'metric'
    }
  | { kind: 'search'; placeholder: string }
  | { kind: 'chips'; items: { label: string; selected?: boolean; tone?: Tone }[] }
  | {
      kind: 'hero'
      title: string
      value: string
      stats?: { label: string; value: string }[]
    }
  | {
      kind: 'ledger'
      headers: [string, string]
      rows: {
        stamp: string
        gave?: string
        got?: string
        bal: string
        note?: string
        kind: 'gave' | 'got' | 'refinance'
      }[]
    }
  | { kind: 'fab'; label: string; icon?: string; variant?: 'fab' | 'extended' }
  | { kind: 'snackbar'; text: string; action?: string }
  | { kind: 'sheet'; title: string; items: string[] }
  | { kind: 'drawer'; sections: { label: string; items: { icon: string; label: string; sub?: string; tone?: Tone }[] }[] }
  | { kind: 'navbar'; items: { icon: string; label: string }[]; active: number }
  | { kind: 'actionBar'; items: { label: string; icon: string; filled?: boolean; tone?: Tone }[] }
  | { kind: 'fieldRow'; label: string; value: string; input?: 'text' | 'date' }
  | { kind: 'pill'; text: string; tone?: Tone }
  | { kind: 'spacer'; h: number }

/* ── Regions ──────────────────────────────────────────────────────────── */

export interface Region {
  id: string
  label: string
  category: CategoryId
  owner: Owner
  /** The actual Flutter widget, when there is one. */
  widget?: string
  /** One sentence, shown in the legend and as the panel subtitle. */
  blurb: string
  detail: string[]
  /** Where this actually lives, for code review. */
  source?: string
  /** How this was done here, and why — the app-specific argument. */
  notes?: string[]
  box: { x: number; y: number; w: number; h: number }
  /** Drawn above the layout flow; hidden until selected. */
  overlay?: boolean
}

/* ── Screens & datasets ───────────────────────────────────────────────── */

export interface Screen {
  id: string
  name: string
  /** The Dart file this screen is built in. */
  file: string
  summary: string
  blocks: Block[]
  regions: Region[]
}

export interface Dataset {
  key: string
  title: string
  subtitle: string
  /** Shown when the dataset has no real screens behind it. */
  screenName: string
  /** Colour tokens the mock should paint with, so it looks like the real app. */
  theme?: {
    bg: string
    surface: string
    ink: string
    accent: string
    accentDark: string
  }
  screens: Screen[]
}
