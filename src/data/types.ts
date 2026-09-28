/**
 * The data model for an anatomy entry.
 *
 * Every entry in this project is one *region* of a screen: a named, bounded
 * piece of the interface that someone could point at and say "that bit, what
 * is it?". The phone simulation is nothing more than these regions drawn at
 * fixed coordinates, so adding a region means adding an object here and
 * nothing else.
 */

export type Owner = 'OS' | 'App'

/** Stable identifier. Also the i18n/anchor key, so don't rename casually. */
export type RegionId =
  | 'status-bar'
  | 'system-nav'
  | 'app-bar'
  | 'content'
  | 'list-item'
  | 'search-field'
  | 'fab'
  | 'snackbar'
  | 'bottom-sheet'
  | 'bottom-nav'

export interface Region {
  id: RegionId
  /** Short name shown in the legend and the detail panel. */
  label: string
  /**
   * Who actually draws this. 'OS' regions belong to the platform and survive
   * your app being closed, uninstalled, or crashed; 'App' regions are your
   * pixels. Getting this wrong is how you end up drawing your own clock.
   */
  owner: Owner
  /** One sentence. This is what shows on the region chip and in the list. */
  blurb: string
  /** The deep-dive. Rendered as paragraphs in the detail panel. */
  detail: string[]
  /** How you'd build it in common toolkits. */
  equivalents?: { material?: string; flutter?: string; compose?: string }
  /** Anything specific to the app this repo is documenting. */
  appNotes?: string[]
  /**
   * Normalised box within the phone frame, as fractions of the frame's inner
   * screen. The simulation reads these; components never hard-code geometry.
   */
  box: { x: number; y: number; w: number; h: number }
  /** Drawn in front of `content` rather than inside the layout flow. */
  overlay?: boolean
}

export interface Dataset {
  /** Key used to switch between the universal and app-specific views. */
  key: 'universal' | 'jewellery'
  title: string
  subtitle: string
  /** What the phone mock is pretending to be, shown under the frame. */
  screenName: string
  regions: Region[]
}
