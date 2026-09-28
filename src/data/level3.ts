import type { Level } from './levels'

/**
 * Level 3 — Patterns.
 *
 * A pattern is an arrangement of components that solves a recurring job. You
 * cannot pick the right one without knowing the components, which is why this
 * is the last level and not the first.
 *
 * Each entry states the user need it solves and the Level 2 components it is
 * built from, so you can work backwards from "what am I building" to "which
 * widgets do I need".
 */
export const level3: Level = {
  n: 3,
  title: 'Patterns',
  subtitle:
    'The larger arrangements you assemble components into. Each one solves a specific user job — start from the job, not from the layout.',
  entries: [
    {
      id: 'dashboard',
      label: 'Dashboard',
      blurb: 'A summary of current state, with entry points into the detail screens.',
      solves:
        'The user opens the app to find out how things stand right now, and possibly to jump into a task. Not to read everything — to glance, then act.',
      builds: ['kpi', 'card', 'list-tile', 'tile-grid', 'fab'],
      guidance: {
        do: [
          'Put the two or three numbers that decide whether today went well at the top, above the fold.',
          'Follow with the repeating units (cards, tiles) that navigate deeper.',
          'Make every tile tappable and go somewhere real. A tile that is decoration is noise.',
          'Support pull-to-refresh when the numbers can change while the screen is open.',
        ],
        dont: [
          'Make it a settings menu. Dashboards show state; menus offer actions.',
          'Put secondary or rarely-used destinations in the top grid — they should be one level down.',
          'Show more than about six tiles before the fold; the user scrolls past the summary.',
        ],
      },
    },
    {
      id: 'crud-form',
      label: 'CRUD form',
      blurb: 'Create, read, update, delete — the form and edit flow for one record type.',
      solves:
        'The user needs to enter a set of related values correctly, and later come back and fix one of them.',
      builds: ['card', 'textfield', 'dropdown', 'date-picker', 'switch', 'checkbox', 'button', 'photo-field'],
      guidance: {
        do: [
          'Group fields into labelled section cards, and put the save action in the app bar on long forms.',
          'Reuse one form for create and edit, branching on whether a record is passed in.',
          'Keep a field’s label and its position identical between the create and edit screens.',
          'Pre-fill sensible defaults (today\'s date, a default rate) rather than empty fields.',
        ],
        dont: [
          'Make a 20-field form on one screen. Split into steps, or move rarely-used fields behind an "edit" toggle.',
          'Lose the field order between create and edit — muscle memory is the whole point of a consistent form.',
          'Hide the save button below the fold with no app-bar action as a fallback.',
        ],
      },
    },
    {
      id: 'search-filter',
      label: 'Search + filter',
      blurb: 'A list narrowed by free text and by state, working together.',
      solves:
        'The list is too long to scroll and the user has a partial idea of what they want — either "who is this" (search) or "who needs chasing" (filter).',
      builds: ['search-field', 'chip', 'list-tile', 'snackbar'],
      guidance: {
        do: [
          'Let search and filters compose — filter by state, then search within it.',
          'Keep both visible together, above the list, so the user knows both are narrowing it.',
          'Filter as the user types, with no submit key.',
          'Give each row a badge for its state, so scanning beats reading.',
        ],
        dont: [
          'Make search and filter exclusive (choosing one clears the other) unless the data model forces it.',
          'Leave a filtered list with no visible way back to all of it — always keep a clear path.',
          'Filter a list short enough that scrolling is fine; it is just a rectangle in the way.',
        ],
      },
    },
    {
      id: 'master-detail',
      label: 'Master–detail',
      blurb: 'A list beside a preview of the selected item; tap through for full detail.',
      solves:
        'The user is comparing items and needs to see one item’s detail without losing their place in the list.',
      builds: ['list-tile', 'card', 'divider', 'bottom-sheet', 'navbar'],
      guidance: {
        do: [
          'On a phone, treat it as list-then-detail (see the next entry) — the list is the master, the detail is a pushed screen.',
          'On a tablet, show both, and highlight the selected item in the list.',
          'Keep the detail pane scrollable independently of the list.',
        ],
        dont: [
          'Squeeze a phone-width master and a phone-width detail side by side. Neither is readable.',
          'Make the selection in the master the only way to see detail — always allow a full screen too.',
        ],
      },
    },
    {
      id: 'list-to-detail',
      label: 'List → detail',
      blurb: 'Tap a list row to push a full screen for that item, with a back button.',
      solves:
        'The item has more to show than fits in a row, and the user needs to act on it (edit, collect, release).',
      builds: ['appbar', 'card', 'list-tile', 'button', 'bottom-sheet', 'badge'],
      guidance: {
        do: [
          'Make the detail a pushed route with an automatic back button and the item’s name (or a generic title) in the app bar.',
          'Put the primary action for that item in a bottom bar or a FAB, not scattered at the top.',
          'Show the item’s key figures first (a hero/summary card), then its history, then its actions.',
        ],
        dont: [
          'Put a "back" chevron inside the content area — use the system back button.',
          'Make the detail screen a giant form. Read-only summary up top, edit as a separate action or screen.',
          'Hide the item’s identity (name/photo) below the fold on the detail screen.',
        ],
      },
    },
    {
      id: 'tabbed',
      label: 'Tabbed interface',
      blurb: 'Sibling views under one top-level destination, switched by a tab bar.',
      solves:
        'One area of the app has a few distinct views (e.g. Khata reports vs Pawn reports) and the user thinks of them as the same place.',
      builds: ['tabbar', 'appbar', 'card', 'list-tile'],
      guidance: {
        do: [
          'Keep it to 2–4 tabs with short labels, and underline the selected one clearly.',
          'Use tabs as lenses on the same screen, not as routes that each have their own back stack.',
        ],
        dont: [
          'Nest tabs inside bottom navigation without a strong reason — two horizontal bars compete.',
          'Use more than 4 tabs; they stop being readable.',
        ],
      },
    },
    {
      id: 'bottom-nav',
      label: 'Bottom navigation',
      blurb: 'Persistent switching between 3–5 top-level destinations.',
      solves:
        'The app has a handful of genuinely different top-level jobs, and the user moves between them many times a session.',
      builds: ['navbar', 'icon-button'],
      guidance: {
        do: [
          'Make each destination a peer — a top-level place, not a tool or a sub-screen.',
          'Label every destination and highlight the current one.',
          'On tablets and landscape, switch to a navigation rail.',
        ],
        dont: [
          'Exceed five destinations, or the tap targets get too small.',
          'Use it for secondary actions; that is a drawer.',
          'Hide the top-level destinations behind a drawer when there are only 3–4 of them.',
        ],
      },
    },
    {
      id: 'drawer',
      label: 'Navigation drawer',
      blurb: 'A leading-edge panel of secondary destinations and settings.',
      solves:
        'There are more destinations than fit in a bottom bar, or the extras are settings, about, and help — things used rarely.',
      builds: ['drawer', 'list-tile', 'divider', 'avatar'],
      guidance: {
        do: [
          'Keep a small set of primary destinations in the bar and the rest in the drawer.',
          'Group the drawer rows with uppercase section labels.',
          'Open it from an avatar or a clear menu affordance on the home screen.',
        ],
        dont: [
          'Hide primary destinations in the drawer.',
          'Leave rows that only show a "coming soon" toast. Build them or remove them.',
        ],
      },
    },
    {
      id: 'wizard',
      label: 'Wizard / stepper',
      blurb: 'A multi-step flow with a progress indicator and one decision per step.',
      solves:
        'The task needs more input than fits on one screen, and the steps have an order that helps the user (who → terms → confirm).',
      builds: ['stepper', 'textfield', 'card', 'button', 'progress'],
      guidance: {
        do: [
          'Show progress ("Step 2 of 4") so the user knows it ends.',
          'Validate a step before letting them advance, not at the end.',
          'Let them go back a step without losing what they entered.',
        ],
        dont: [
          'Use a wizard for two fields. It adds friction for no benefit.',
          'Hide the total number of steps until the end.',
        ],
      },
    },
    {
      id: 'confirm',
      label: 'Confirmation dialog',
      blurb: 'A modal that interrupts to confirm a consequential or irreversible action.',
      solves:
        'The user is about to do something they cannot easily undo (delete, release, pay out), and the cost of a mistake is high.',
      builds: ['dialog', 'textfield', 'button'],
      guidance: {
        do: [
          'Name the specific thing in the message ("Release this pawn loan for ₹1,50,800?").',
          'Require an admin password or typed confirmation for high-stakes deletes and releases.',
          'Make Cancel the easy/default path, and the destructive action the visually heavier one.',
        ],
        dont: [
          'Use a generic "Are you sure?". Say what will happen and to what.',
          'Let the destructive action be the pre-focused default on an Android dialog.',
          'Confirm an action that is trivially reversible (archiving a note) — an undo snackbar is less friction.',
        ],
      },
    },
    {
      id: 'empty-state',
      label: 'Empty state',
      blurb: 'The screen shown when a list has nothing in it yet.',
      solves:
        'The user opened a list and found nothing, and needs to know whether that is a bug, an empty start, or a filter mistake.',
      builds: ['card', 'icon', 'text', 'button'],
      guidance: {
        do: [
          'Say why it is empty and what to do: "No khatas yet. Tap + to create one."',
          'Show it when the *query* is empty, not just the table — otherwise a filter with no matches looks broken.',
          'Put the action that fixes it right there (a button or a hint at the FAB).',
        ],
        dont: [
          'Show a blank white screen.',
          'Use the same empty state for "no data yet" and "no results for this filter" — they need different words.',
        ],
      },
    },
    {
      id: 'loading-state',
      label: 'Loading state',
      blurb: 'A placeholder or spinner while data is being fetched or computed.',
      solves:
        'The screen is waiting on something, and without a loading state the user sees a blank screen and assumes it is broken.',
      builds: ['progress', 'skeleton'],
      guidance: {
        do: [
          'Use a skeleton (grey placeholder blocks shaped like the real content) for a list, so the layout does not jump.',
          'Use a centred spinner for a short first load of a whole screen.',
          'Keep the layout dimensions identical between loading and loaded, so nothing reflows.',
        ],
        dont: [
          'Flash a spinner for work under ~300ms; it reads as jank.',
          'Replace the whole screen with a spinner on a pull-to-refresh — keep the old data visible.',
          'Leave a spinner running after an error (see Error state).',
        ],
      },
    },
    {
      id: 'error-state',
      label: 'Error state',
      blurb: 'What the user sees when something failed.',
      solves:
        'An operation failed. The user needs to know it failed, what to do about it, and whether their data is safe.',
      builds: ['card', 'button', 'snackbar', 'progress'],
      guidance: {
        do: [
          'Say what failed in plain words, and give a next step ("Sync failed — tap to retry").',
          'Distinguish recoverable (retry) from fatal (tell them to restart or contact support).',
          'Never silently swallow the error — a silent failure is worse than a visible one.',
        ],
        dont: [
          'Show a raw exception or stack trace to the user.',
          'Clear the user\'s entered data because the submit failed.',
          'Retry silently in a loop with no feedback.',
        ],
      },
    },
  ],
}
