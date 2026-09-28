import type { CategoryId, Owner } from './types'

/**
 * The three-level curriculum.
 *
 * Level 1 is anatomy (what parts a screen has). Level 2 is components (the
 * widgets that make those parts). Level 3 is patterns (arrangements of
 * components that solve a recurring job).
 *
 * The levels are ordered by dependency, not by difficulty: you cannot pick the
 * right pattern until you know what the pieces are, and you cannot name the
 * pieces until you know where they sit on the screen.
 *
 * Every entry carries do/don't guidance because that is where beginners lose
 * the most time — the widget reference tells you the API exists, and nothing
 * about when *not* to reach for it.
 */

export interface Guidance {
  do: string[]
  dont: string[]
}

/**
 * One small diagram per side, keyed into `Figure.vue`. A picture of the right
 * shape beats a paragraph about it, so entries where the point is visual —
 * three buttons versus six, a hint versus a label — carry a figure. Entries
 * whose point is conceptual do not, because a decorative image there would be
 * worse than no image.
 */
export interface Figures {
  do?: string
  dont?: string
}

export interface Level1Entry {
  id: string
  label: string
  /** Which Material category this part belongs to, for the chips. */
  category: CategoryId | 'platform'
  owner: Owner
  /** One-line definition. */
  blurb: string
  /** Why it exists — the job, not the anatomy. */
  purpose: string
  /**
   * Id of the region on the generic screen this part occupies. Defaults to the
   * entry id, which is why the generic screen can name its regions after the
   * components rather than inventing a second vocabulary to keep in sync.
   */
  region?: string
  guidance: Guidance
  figs?: Figures
}

export interface Level2Entry {
  id: string
  label: string
  category: CategoryId
  /** The Flutter class name. */
  widget: string
  blurb: string
  /** When to reach for this rather than something else. */
  whenToUse: string
  region?: string
  guidance: Guidance
  figs?: Figures
}

export interface Level3Entry {
  id: string
  label: string
  blurb: string
  /** The job it solves, stated as a user need. */
  solves: string
  /** The components it is assembled from, by Level 2 id. */
  builds: string[]
  guidance: Guidance
  figs?: Figures
}

export interface Level {
  n: 1 | 2 | 3
  title: string
  subtitle: string
  entries: (Level1Entry | Level2Entry | Level3Entry)[]
}
