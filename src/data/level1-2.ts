import type { Level } from './levels'

/**
 * Level 1 — Screen anatomy.
 *
 * Android's own app-anatomy guide names three regions for a whole app (system
 * bars, navigation region, body). This level refines that to the eight parts of
 * a single *screen*, which is the granularity you actually build at.
 *
 * Sources: Android app-anatomy and layout-basics guides, Flutter Material
 * catalog. Wording and examples here are our own.
 */
export const level1: Level = {
  n: 1,
  title: 'Screen anatomy',
  subtitle:
    'The parts every screen is made of. Learn these eight and you can describe any screen in an app, including your own.',
  entries: [
    {
      id: 'status-bar',
      label: 'Status bar',
      category: 'platform',
      owner: 'OS',
      blurb: 'The OS strip showing time, signal and battery.',
      purpose:
        'Tells the user the device state without leaving your app. You get it for free; your only job is to not cover it.',
      guidance: {
        do: [
          'Read the inset and pad your layout by it (SafeArea in Flutter, WindowInsets in Compose).',
          'Let it stay visible — users need the clock and the battery gauge.',
        ],
        dont: [
          'Draw your own status bar or your own clock. The OS paints over it and yours will disagree with the real time.',
          'Put app content flush to y=0, which collides with a notch or a punch-hole camera.',
        ],
      },
    },
    {
      id: 'top-app-bar',
      label: 'Top app bar',
      category: 'navigation',
      owner: 'App',
      blurb: 'The header: screen title plus the actions available on it.',
      purpose:
        'Answers two questions at once — where am I, and what can I do from here — before the user reads anything else.',
      guidance: {
        do: [
          'Keep the title to one line and ellipsis it rather than wrapping to two.',
          'Put actions on the trailing edge, icon-only, in threes at most.',
          'Keep it visually quiet: it is orientation, not content.',
        ],
        dont: [
          'Stack more than three actions. Promote nothing and demote the rest into an overflow menu.',
          'Put screen-specific controls here if they only matter on this screen — they belong in the content.',
          'Let it grow to two lines to fit a long title. Truncate instead.',
        ],
      },
    },
    {
      id: 'content',
      label: 'Body / content area',
      category: 'containment',
      owner: 'App',
      blurb: 'The scrollable region holding the screen’s actual content.',
      purpose:
        'Where the user does the thing they came for. Normally the only part of the screen that scrolls.',
      guidance: {
        do: [
          'Order by what the user came to do, not by what is easiest to query.',
          'Build a visible hierarchy: headline, then summary, then repeating units.',
          'Pad the bottom for a nav bar and any floating button so the last row stays reachable.',
        ],
        dont: [
          'Fill the space when content is short. Empty is better than filler.',
          'Design only for a tall portrait preview. It breaks in landscape and under the keyboard.',
          'Scroll the whole screen including the app bar — the header should stay put.',
        ],
      },
    },
    {
      id: 'cards',
      label: 'Cards',
      category: 'containment',
      owner: 'App',
      blurb: 'Grouped surfaces that hold a related bundle of content.',
      purpose:
        'Give a group of content its own boundary so the eye can chunk the screen into scannable pieces.',
      guidance: {
        do: [
          'Use a card when the content inside is genuinely one unit that travels together.',
          'Keep padding and radius identical across every card in the app.',
        ],
        dont: [
          'Wrap every group in a card. If everything is a card, nothing is — you have just added visual noise and lost the hierarchy.',
          'Nest cards inside cards. One level of grouping is enough.',
        ],
      },

      figs: {
        do: 'card-grouped',
        dont: 'card-everything',
      },    },
    {
      id: 'lists',
      label: 'Lists',
      category: 'containment',
      owner: 'App',
      blurb: 'A repeating, scrollable column of the same kind of thing.',
      purpose:
        'Handle an unknown number of items without designing a screen per item count.',
      guidance: {
        do: [
          'Sort by what the user needs to act on — urgency, not recency or alphabet.',
          'Keep every row the same height and alignment so the list can be scanned.',
          'Build lazily for anything long; a ListView.builder only makes what is on screen.',
        ],
        dont: [
          'Build the whole list eagerly and then wonder why scrolling stutters.',
          'Mix row layouts in one list, unless the visual grouping is meaningful.',
          'Leave a zero-length list blank — show an empty state instead.',
        ],
      },

      figs: {
        do: 'list-urgent',
        dont: 'list-alpha',
      },    },
    {
      id: 'forms',
      label: 'Forms',
      category: 'text-inputs',
      owner: 'App',
      blurb: 'Grouped inputs for collecting several values at once.',
      purpose:
        'Get a complete, valid set of values in one sitting rather than across several screens.',
      guidance: {
        do: [
          'Group related fields into labelled section cards.',
          'Mark only genuinely required fields, and validate on submit.',
          'Pick the right keyboard per field: phone keypad for a number, default for text.',
        ],
        dont: [
          'Ask for everything on one screen if it needs scrolling on a small phone. Split it into steps.',
          'Validate on every keystroke and shout at someone mid-word.',
          'Use a dropdown for 3 options — radio buttons or chips are faster.',
        ],
      },

      figs: {
        do: 'form-long',
        dont: 'form-steps',
      },    },
    {
      id: 'fab',
      label: 'Floating action button',
      category: 'actions',
      owner: 'App',
      blurb: 'The one prominent button for the screen’s main action.',
      purpose:
        'Keep the most likely action permanently in thumb reach without spending a row of layout on it.',
      guidance: {
        do: [
          'Use exactly one per screen, and let its meaning change with context.',
          'Pin it so it stays reachable while the list scrolls.',
          'Use the extended form with a label when the icon alone is ambiguous.',
        ],
        dont: [
          'Put a destructive action on it. One tap is too cheap for something irreversible.',
          'Add a second FAB. Two equal actions means neither reads as primary.',
          'Hide it behind a scroll. It exists to be always available.',
        ],
      },
    },
    {
      id: 'bottom-nav',
      label: 'Bottom navigation',
      category: 'navigation',
      owner: 'App',
      blurb: 'The persistent bar of top-level destinations.',
      purpose:
        'Keep the app’s table of contents in thumb reach, one-handed, at any screen size.',
      guidance: {
        do: [
          'Limit to 3–5 destinations, all at the same level of the hierarchy.',
          'Label every item. An unlabelled icon is a guessing game.',
          'Switch to a navigation rail on tablets and landscape — a bottom bar is not ergonomic on a wide screen.',
        ],
        dont: [
          'Exceed five items. Past that, tap targets fall below a comfortable size.',
          'Use it for secondary actions or sub-screens — that is a tab bar or a drawer job.',
          'Keep one bottom bar across every screen size.',
        ],
      },

      figs: {
        do: 'nav-four',
        dont: 'nav-six',
      },    },
  ],
}

/**
 * Level 2 — Components.
 *
 * Flutter's Material catalog, verbatim groupings, with the guidance that the
 * API reference leaves out. Sorted by the order you tend to need them.
 */
export const level2: Level = {
  n: 2,
  title: 'Components',
  subtitle:
    'The Material widgets that make up each part, grouped the way Flutter groups them. Every entry says when to reach for it — and when not to.',
  entries: [
    /* ── Actions ───────────────────────────────────────────────────── */
    {
      id: 'button',
      label: 'Button',
      category: 'actions',
      widget: 'ElevatedButton / FilledButton / OutlinedButton / TextButton',
      blurb: 'A tappable block with a text label that starts an action.',
      whenToUse:
        'Any action the user should take deliberately. The three visual weights are a priority scale: Filled is the primary action on a screen, Outlined is secondary, Text is tertiary.',
      guidance: {
        do: [
          'Use one FilledButton per screen as the primary action — it should be findable without reading.',
          'Put the verb in the label: "Collect", "Save", "Add loan". Not "OK" or "Submit".',
          'Disable with reduced opacity and keep the label, so the button does not jump position.',
        ],
        dont: [
          'Put two FilledButtons side by side competing as primary. One screen, one primary action.',
          'Use a text button for a destructive action — it has no visual weight to warn anyone.',
          'Use more than six buttons on a screen. That is a sign the flow needs splitting.',
        ],
      },

      figs: {
        do: 'btn-one',
        dont: 'btn-two',
      },    },
    {
      id: 'icon-button',
      label: 'Icon button',
      category: 'actions',
      widget: 'IconButton',
      blurb: 'A tappable icon with no visible text label.',
      whenToUse:
        'For actions that are near-universal — back, close, search, overflow — or on app bars and list rows where there is no room for text.',
      guidance: {
        do: [
          'Always set a tooltip. It is the only thing that names the control for screen readers and long-press.',
          'Use a recognised symbol: back arrow, plus, magnifier, three dots.',
          'Keep the tap target at least 48×48 even if the glyph is smaller.',
        ],
        dont: [
          'Use a novel glyph for a domain-specific action. Nobody guesses your icon.',
          'Ship an icon button with no tooltip and no label — it is a control nobody can identify.',
          'Fill an app bar with six of them. Three, then an overflow menu.',
        ],
      },
    },
    {
      id: 'fab',
      label: 'Floating action button',
      category: 'actions',
      widget: 'FloatingActionButton / FloatingActionButton.extended',
      blurb: 'A large persistent button for the screen’s main action.',
      whenToUse:
        'When one action dominates the screen — compose, capture, add. Extended when the icon is not self-evident.',
      guidance: {
        do: [
          'Keep it to one per screen and let it morph meaning per context if the app is consistent about it.',
          'Use the extended form with a label for anything domain-specific.',
          'Give it room in the list padding so it never covers the last row.',
        ],
        dont: [
          'Use it for a destructive or irreversible action — it needs a confirm dialog, and a FAB implies speed.',
          'Duplicate it with a button in the content area. Pick one place for the primary action.',
          'Let it overlap a bottom navigation bar.',
        ],
      },
    },
    {
      id: 'segmented-button',
      label: 'Segmented button',
      category: 'selection',
      widget: 'SegmentedButton',
      blurb: 'A row of connected buttons where one or more are selected.',
      whenToUse:
        'For 2–5 mutually related options that change what the same screen shows — a view switch, a sort order. Use multiple-selection where several can apply at once.',
      guidance: {
        do: [
          'Label with short words or a count, not icons alone.',
          'Let it swap the content of the screen below, not navigate away.',
        ],
        dont: [
          'Use it for navigation. It is not a tab bar — tabs change screen, segments change a view of one screen.',
          'Exceed five segments. It stops being scannable and the tap targets get small.',
        ],
      },
    },

    /* ── Text inputs ───────────────────────────────────────────────── */
    {
      id: 'textfield',
      label: 'Text field',
      category: 'text-inputs',
      widget: 'TextField / TextFormField',
      blurb: 'A box the user types into.',
      whenToUse:
        'For free text: names, notes, amounts, IDs. TextFormField when you need validation, because it takes a validator function.',
      guidance: {
        do: [
          'Use an OutlineInputBorder so it reads as a field rather than a note.',
          'Set the right keyboardType — number, phone, email, or the field fights the user.',
          'Use labelText (floats up when filled) instead of hintText, which disappears the moment they type.',
          'Mark autofill hints so a password manager can help.',
        ],
        dont: [
          'Use hintText for a field label. It vanishes and the field becomes unlabelled.',
          'Leave textAlign or the decimal keyboard off an amount field — money needs a numeric keypad.',
          'Truncate input with a silent maxLength. Tell people the limit, or use a counter.',
        ],
      },
    },
    {
      id: 'search-field',
      label: 'Search field',
      category: 'text-inputs',
      widget: 'TextField + leading search icon',
      blurb: 'A text input specialised for narrowing a list.',
      whenToUse:
        'When a list is long enough that scrolling stops being reasonable. Usually paired with filter chips so you can narrow by state or by text.',
      guidance: {
        do: [
          'Filter as the user types, with no submit key — that is the expectation now.',
          'Label it with what it searches: "Search customers", not "Search".',
          'Keep it dense (isDense: true) in a list header so it does not eat the viewport.',
        ],
        dont: [
          'Add search to a list of three items. It is a rectangle in the way.',
          'Require an exact match. Substring matching is what people expect.',
          'Debounce so heavily that the list feels stuck.',
        ],
      },

      figs: {
        do: 'field-label',
        dont: 'field-hint',
      },    },
    {
      id: 'dropdown',
      label: 'Dropdown',
      category: 'selection',
      widget: 'DropdownButtonFormField',
      blurb: 'A collapsed field that opens a list of options.',
      whenToUse:
        'For longer option lists, especially where the options are long strings (states, categories) that would not fit as buttons.',
      guidance: {
        do: [
          'Use isExpanded when the longest option would otherwise overflow.',
          'Show the selected value in the collapsed field so the state is never hidden.',
        ],
        dont: [
          'Use a dropdown for 2–3 options. Tapping a radio or chip is fewer taps and no hiding.',
          'Nest a dropdown inside a scrolling form without a clear label — users lose track of which field it belongs to.',
        ],
      },

      figs: {
        do: 'three-visible',
        dont: 'three-hidden',
      },    },

    /* ── Selection ─────────────────────────────────────────────────── */
    {
      id: 'chip',
      label: 'Chip',
      category: 'selection',
      widget: 'FilterChip / ChoiceChip / InputChip',
      blurb: 'A small block used to filter, choose, or tag.',
      whenToUse:
        'FilterChip to narrow a list. ChoiceChip for a small set of mutually exclusive options in a form. InputChip for tags the user has added.',
      guidance: {
        do: [
          'Show selection with both a fill change and a bolder label weight, so it does not rely on colour alone.',
          'Keep a visible "All" chip when filtering, or make tapping the active chip deselect it.',
          'Scroll them horizontally when there are more than four.',
        ],
        dont: [
          'Use chips as buttons that navigate. If it changes screen, it is a tab.',
          'Offer five mutually exclusive options as chips when a dropdown would fit better.',
        ],
      },

      figs: {
        do: 'chip-on',
        dont: 'chip-faint',
      },    },
    {
      id: 'badge',
      label: 'Badge',
      category: 'communication',
      widget: 'Badge',
      blurb: 'A small count or dot attached to something else.',
      whenToUse:
        'To say "there is something waiting" without making the user open anything — pending sync count, unread messages.',
      guidance: {
        do: [
          'Cap the number (99+) so a big count does not stretch the pill.',
          'Keep it attached to the control it counts.',
        ],
        dont: [
          'Show a zero badge. It teaches people to ignore the one place the count matters.',
          'Use it as a notification dot for a screen the user has already seen.',
        ],
      },
    },
    {
      id: 'switch',
      label: 'Switch',
      category: 'selection',
      widget: 'SwitchListTile / Switch',
      blurb: 'A toggle that flips a single setting on or off.',
      whenToUse:
        'For a setting that takes effect immediately and has no confirm step. Always paired with a label saying what is being turned on.',
      guidance: {
        do: [
          'Label the row, not just the control — the whole row should be tappable.',
          'Apply the change immediately; do not add a Save button for a switch.',
        ],
        dont: [
          'Use a switch for an action with a visible consequence, like deleting. That is a button plus a dialog.',
          'Use it inside a form that has a Save button — now there are two conflicting sources of truth.',
        ],
      },
    },
    {
      id: 'checkbox',
      label: 'Checkbox',
      category: 'selection',
      widget: 'CheckboxListTile / Checkbox',
      blurb: 'A box that selects one or more independent options.',
      whenToUse:
        'When several options can be on at once and each is independent. CheckboxListTile when the option needs a longer label.',
      guidance: {
        do: [
          'Use it for multi-select; use a radio for single-select.',
          'Keep the tap target the full row height.',
        ],
        dont: [
          'Use a checkbox where only one option is valid — that is a radio, and a checkbox lets the user tick all of them.',
        ],
      },
    },
    {
      id: 'radio',
      label: 'Radio button',
      category: 'selection',
      widget: 'RadioListTile / Radio',
      blurb: 'A round control where exactly one option of a set is selected.',
      whenToUse:
        'For 2–5 mutually exclusive options where seeing all the choices at once helps. Especially good with short labels.',
      guidance: {
        do: [
          'Show all options so the user can compare without opening anything.',
          'Pre-select the most likely default rather than leaving nothing chosen, if there is one.',
        ],
        dont: [
          'Use it for a long list of options — that is a dropdown.',
          'Use it where the user might reasonably want two at once. That is a checkbox.',
        ],
      },
    },
    {
      id: 'date-picker',
      label: 'Date picker',
      category: 'selection',
      widget: 'showDatePicker / DatePickerDialog',
      blurb: 'A calendar for choosing a date or a range.',
      whenToUse:
        'For dates, obviously — but drive it from a tappable row that shows the current value, not a bare field that opens an empty calendar.',
      guidance: {
        do: [
          'Show the chosen date in the row, plus a "today" hint when it is today.',
          'Set firstDate/lastDate to the real valid range.',
          'Set helpText to name the date being picked, e.g. "Received date (past or future)".',
        ],
        dont: [
          'Open with no indication of what is currently selected.',
          'Use it for a rough period ("last month") — that is a chip or a segmented button.',
        ],
      },
    },

    /* ── Containment ───────────────────────────────────────────────── */
    {
      id: 'card',
      label: 'Card',
      category: 'containment',
      widget: 'Card',
      blurb: 'A rounded surface grouping related content.',
      whenToUse:
        'For a self-contained unit — a form section, a summary block, a grouped set of stats.',
      guidance: {
        do: [
          'Use a flat fill with subtle elevation, and keep the radius constant app-wide.',
          'Put a title at the top of a form card so the group is named.',
        ],
        dont: [
          'Card every paragraph. If everything has a border, the structure is not being communicated.',
          'Mix radii between screens — 12 on one screen and 20 on the next reads as two apps.',
        ],
      },
    },
    {
      id: 'list-tile',
      label: 'List tile',
      category: 'containment',
      widget: 'ListTile',
      blurb: 'A single row in a list: leading element, title, subtitle, trailing.',
      whenToUse:
        'The workhorse row for anything tappable in a list. Three slots (leading / title+subtitle / trailing) cover most rows.',
      guidance: {
        do: [
          'Keep the house style identical on every row: same leading disc size, same title weight, same trailing treatment.',
          'Put the decisive value trailing and right-aligned, so the eye lands there last.',
          'Use isThreeLine when you have a real subtitle, so the row heights stay consistent.',
        ],
        dont: [
          'Vary the leading element size between rows in the same list.',
          'Add a trailing chevron to a row that does not navigate — the chevron is a promise.',
        ],
      },
    },
    {
      id: 'dialog',
      label: 'Dialog',
      category: 'containment',
      widget: 'AlertDialog / showDialog',
      blurb: 'A modal that interrupts to ask for a decision or a few values.',
      whenToUse:
        'For a yes/no that must be answered before continuing, or a very short form (one or two fields).',
      guidance: {
        do: [
          'Title it with the action, not "Alert": "Release pawn?", not "Confirm".',
          'Put the destructive action on the right, styled filled, and Cancel to its left as a text button.',
          'Keep it to a couple of fields. Longer than that and it is a screen.',
        ],
        dont: [
          'Use a dialog to show information the user did not ask for.',
          'Nest a dialog inside a bottom sheet, or stack dialogs — the user loses track of what they are answering.',
          'Hide the reason. Say what will happen, not just "Are you sure?".',
        ],
      },
    },
    {
      id: 'bottom-sheet',
      label: 'Bottom sheet',
      category: 'containment',
      widget: 'showModalBottomSheet / DraggableScrollableSheet',
      blurb: 'A panel that slides up from the bottom with contextual content.',
      whenToUse:
        'For a short ordered list of options, or a read-only detail view you want to dismiss easily. Better than a dialog when there is more than a couple of lines.',
      guidance: {
        do: [
          'Use isScrollControlled so the sheet can size to its content, and DraggableScrollableSheet for long content.',
          'Make it drag-to-dismissable — that is the expected exit.',
          'Give it a title, and keep the title the same string as wherever it was opened from.',
        ],
        dont: [
          'Use it for a form that needs a keyboard and more than two fields — that is a screen.',
          'Cover more than ~70% of the screen with it and expect the user to still see the context behind.',
          'Put a snackbar underneath it, where neither is readable.',
        ],
      },
    },
    {
      id: 'divider',
      label: 'Divider',
      category: 'containment',
      widget: 'Divider',
      blurb: 'A thin line that separates rows or groups.',
      whenToUse:
        'Between list rows, or between groups inside a card, when the visual gap alone is not enough separation.',
      guidance: {
        do: [
          'Use a low-contrast colour (ink at ~8% alpha) — a divider should be felt, not seen.',
          'Use a taller indent if the content has leading elements, so the line starts after them.',
        ],
        dont: [
          'Draw a divider and also change the background. Pick one way of separating.',
        ],
      },
    },

    /* ── Navigation ────────────────────────────────────────────────── */
    {
      id: 'appbar',
      label: 'App bar',
      category: 'navigation',
      widget: 'AppBar',
      blurb: 'The top container for a screen’s title and actions.',
      whenToUse:
        'On pushed screens that need a title and actions. Often skipped on a home screen in favour of an in-body header.',
      guidance: {
        do: [
          'Set elevation: 0 and a transparent surface tint so it does not cast a shadow over the content.',
          'Use the automatic back button on pushed routes rather than building your own.',
        ],
        dont: [
          'Give it a heavy shadow. It is a header, not a layer above the content.',
          'Use it for actions that only apply to this screen — those belong in the content, where they sit next to what they affect.',
        ],
      },
    },
    {
      id: 'navbar',
      label: 'Navigation bar',
      category: 'navigation',
      widget: 'NavigationBar / BottomNavigationBar',
      blurb: 'The persistent bottom bar of top-level destinations.',
      whenToUse:
        'For 3–5 peer destinations. On a large screen, use NavigationRail instead.',
      guidance: {
        do: [
          'Label each destination; an unlabelled icon is a guess.',
          'Reset scroll position when switching so the user lands at the top of a new place.',
        ],
        dont: [
          'Use it on a tablet or in landscape — switch to a rail. A bottom bar is not reachable or balanced on a wide screen.',
          'Exceed five destinations.',
        ],
      },
    },
    {
      id: 'drawer',
      label: 'Navigation drawer',
      category: 'navigation',
      widget: 'Drawer / NavigationDrawer',
      blurb: 'A panel that slides from the leading edge with secondary destinations.',
      whenToUse:
        'When there are more destinations than fit in a bar, or when the top-level ones are few and the rest are settings and secondary screens.',
      guidance: {
        do: [
          'Group the rows with uppercase section labels so the list is scannable.',
          'Keep a header with the app or user identity, then a divider, then the groups.',
        ],
        dont: [
          'Hide primary destinations in it. Primary navigation belongs in the bar; the drawer is secondary.',
          'Leave a row tappable that goes nowhere but shows a "coming soon" toast repeatedly — either build it or remove it.',
        ],
      },
    },
    {
      id: 'tabbar',
      label: 'Tab bar',
      category: 'navigation',
      widget: 'TabBar / DefaultTabController',
      blurb: 'Layers content across sibling screens within one destination.',
      whenToUse:
        'For a small set of sibling views under one top-level destination — e.g. Reports → Khata | Pawn.',
      guidance: {
        do: [
          'Keep to 2–4 tabs with short labels.',
          'Use tabs to switch views, never to push a new route — a tab is a lens, not a destination.',
        ],
        dont: [
          'Nest tabs inside bottom navigation without a strong reason; the two horizontal bars compete for the same attention.',
        ],
      },
    },

    /* ── Communication ─────────────────────────────────────────────── */
    {
      id: 'snackbar',
      label: 'Snackbar',
      category: 'communication',
      widget: 'ScaffoldMessenger.showSnackBar',
      blurb: 'A brief message about what just happened.',
      whenToUse:
        'For transient confirmation or a low-stakes error, especially when you can offer an undo.',
      guidance: {
        do: [
          'Offer an action when the operation is reversible — it is the cheapest error-correction there is.',
          'Invert the theme so it reads as a system message, not a card.',
          'Queue messages so a second one does not cut off the first.',
        ],
        dont: [
          'Put information in it that the user needs to read and act on. It disappears in seconds.',
          'Stack two. And check it does not collide with a FAB in the same corner.',
        ],
      },
    },
    {
      id: 'progress',
      label: 'Progress indicator',
      category: 'communication',
      widget: 'CircularProgressIndicator / LinearProgressIndicator',
      blurb: 'Shows that something is happening and how far along it is.',
      whenToUse:
        'Circular for an indeterminate wait; linear when you know the proportion. A progress bar inside a list row is good for per-item status.',
      guidance: {
        do: [
          'Match the app accent colour so it does not look like an error state.',
          'Use a linear bar when you have a real fraction (e.g. paid / total on a loan).',
        ],
        dont: [
          'Show a spinner for work under ~300ms — it flashes and reads as jank.',
          'Use a determinate circle. If you do not know the fraction, it is indeterminate by definition.',
        ],
      },
    },
  ],
}
