import type { Dataset } from './types'

/**
 * The same ten regions, re-described against a real app: Jewellery Suite, the
 * offline-first Flutter client for the Jewellery + Pawn + Khatabook + Lending
 * bundle.
 *
 * The point of keeping two datasets behind identical region ids is that the
 * vocabulary transfers. Once you can name the ten regions on a generic screen,
 * you can name them on your own — and the interesting work is the mapping, not
 * the mock.
 */
export const jewellery: Dataset = {
  key: 'jewellery',
  title: 'Jewellery Suite, annotated',
  subtitle:
    'The same ten regions, mapped onto a real screen: the Home dashboard of an offline-first Flutter app.',
  screenName: 'Jewellery Suite → Home',
  regions: [
    {
      id: 'status-bar',
      label: 'Status bar',
      owner: 'OS',
      blurb: 'Owned by Android. The app only pads for it.',
      detail: [
        'Nothing in this app draws the status bar, and nothing should. The clock, the signal bars and the battery are the system’s, and the only thing Jewellery Suite does about them is stay out of the way.',
        'Concretely that means the top of the Home screen is padded by the reported status-bar inset, so the greeting and the app bar start below the clock on a device with a notch or a punch-hole and land correctly on one without. The same widget handles both cases, which is why the layout does not need a device check.',
        'It is worth knowing that this is the one strip you genuinely cannot repurpose. A counter or a sync indicator belongs in the app bar or the KPI strip — both of which this app already has.',
      ],
      equivalents: {
        flutter: 'SafeArea, or MediaQuery.of(context).padding.top',
        material: 'n/a — this app is Flutter, not Compose',
      },
      appNotes: [
        'SafeArea is what keeps the Home greeting off the clock.',
        'No custom top strip: the sync count lives in the content area instead.',
      ],
      box: { x: 0, y: 0, w: 1, h: 0.055 },
    },
    {
      id: 'app-bar',
      label: 'App bar (top bar)',
      owner: 'App',
      blurb: 'Screen identity, a drawer entry point, and the global actions.',
      detail: [
        'The app bar establishes that you are on Home, and it carries the controls that make sense anywhere in the app rather than anywhere on this screen — a navigation drawer entry point on the leading edge, and the global actions on the trailing edge.',
        'Keeping the app bar for app-wide concerns and leaving everything else out of it is what lets the Home screen’s own content start immediately. The moment the app bar starts accumulating per-screen controls, the content area loses its top edge and the screen stops having a clear hierarchy.',
        'The trailing actions here are deliberately few. Anything that only matters on one screen belongs on that screen, which is why loan and collection actions live in the content area and in the customer profile rather than crowding this bar.',
      ],
      equivalents: { flutter: 'AppBar' },
      appNotes: [
        'Title: the app name, not a page name — Home is the root.',
        'Leading: drawer/menu. Trailing: global actions only.',
        'One line, truncated. The greeting below it does the personalising.',
      ],
      box: { x: 0, y: 0.055, w: 1, h: 0.12 },
    },
    {
      id: 'content',
      label: 'Content area',
      owner: 'App',
      blurb: 'Greeting → KPI strip → core modules → Reports, in that order.',
      detail: [
        'Home is a launcher and a dashboard at once, and the ordering follows that job. It opens with a greeting so the screen acknowledges who is using it, then a compact KPI strip carrying the two numbers that decide whether today went well — collected today, and pawn outstanding — then a grid of the core modules, then the way into Reports.',
        'That order is a deliberate answer to "what does this screen do?". Someone opening the app mid-day mostly wants to collect something, so the collection figure is the first number they see. Someone opening it in the evening wants to know what is still out, so the outstanding figure sits beside it rather than two screens away.',
        'Everything below the KPI strip is navigation, which is why the modules are a grid of equal-weight tiles rather than a ranked list. The Reports entry is last and visually quieter because it is the thing you want weekly, not the thing you want ten times a day.',
      ],
      equivalents: { flutter: 'ListView / CustomScrollView with slivers' },
      appNotes: [
        'Greeting — personalises without a login, because the app has none.',
        'KPI strip — collected today · pawn outstanding.',
        'Core modules grid — Khatabook / Pawn Loans / Jewellery / Cashbook.',
        'Reports entry, then the pending-sync count.',
      ],
      box: { x: 0, y: 0.175, w: 1, h: 0.625 },
    },
    {
      id: 'list-item',
      label: 'Card / list item',
      owner: 'App',
      blurb: 'A grid tile on Home; an overdue-first customer row on Khata Books.',
      detail: [
        'Home and Khata Books use the same underlying idea at two different levels. On Home the repeating unit is a module tile — four of them, equal weight, no ordering because none of them is more urgent than the others. On Khata Books it is a customer row, and there the ordering carries real meaning.',
        'The Khata Books list is sorted by urgency rather than by name or by date: overdue first, then due today, then this week, then everything upcoming. That is the single most useful decision on the screen, because the user opens it to find out who to chase, and a list sorted alphabetically makes them read every row to answer that question.',
        'The badges reinforce the same order without adding words. An overdue count in red on the row lets a user scan a long list and stop at the first one that needs work.',
      ],
      equivalents: { flutter: 'GridView for tiles, ListView.builder for rows' },
      appNotes: [
        'Home: four equal module tiles, no ranking.',
        'Khata Books: customers ordered overdue → today → this week → upcoming.',
        'Badges carry outstanding and overdue counts so scanning beats reading.',
      ],
      box: { x: 0.055, y: 0.285, w: 0.89, h: 0.215 },
    },
    {
      id: 'search-field',
      label: 'Search field',
      owner: 'App',
      blurb: 'Filter the customer list, alongside the status filter chips.',
      detail: [
        'On Khata Books, search sits next to a set of filter chips, and the two do different jobs. The chips narrow by state — overdue, due today, this week — while search narrows by identity, matching a name or a phone number.',
        'They compose rather than replace each other: a user who suspects one overdue customer can tap the overdue chip and then type a name inside that subset. Having both means the common "show me who I need to chase" question is answerable in a single path.',
        'Because the underlying dataset is SQLite on the device, both are local queries and both should respond as the user types. A search that needs a round trip would be visibly slow here in a way it would not be on a server-backed app.',
      ],
      equivalents: { flutter: 'TextField, filtering a local sqflite query' },
      appNotes: [
        'Placeholder names the thing being searched — customers, not a bare "Search".',
        'Sits alongside filter chips; the two compose.',
        'Local sqflite query, so filtering happens as the user types.',
      ],
      box: { x: 0.055, y: 0.2, w: 0.89, h: 0.062 },
    },
    {
      id: 'fab',
      label: 'Floating action button (FAB)',
      owner: 'App',
      blurb: 'One primary action per screen: collect here, create there.',
      detail: [
        'The app is disciplined about there being exactly one FAB per screen, and what it does depends on where you are. On a customer profile the primary action is Collect, because that is what a user opens that screen to do. On Khata Books it is Create New Khata.',
        'That discipline is the point. A second action of equal importance goes to the app bar or into the content as a list row, not into a second floating button — the moment there are two FABs the signal that one of them is the main thing is gone.',
        'It is also deliberately not used for destructive actions. Releasing a pawn and adding a loan both live on the Pawn Loans screen and behind their own screens, because they are consequential enough to deserve a confirmation step that a single tap on a floating button would skip.',
      ],
      equivalents: { flutter: 'FloatingActionButton in a Scaffold' },
      appNotes: [
        'Customer profile — Collect is the primary action.',
        'Khata Books — Create New Khata.',
        'Never used for release or delete; those get a confirm screen.',
      ],
      box: { x: 0.795, y: 0.672, w: 0.16, h: 0.098 },
      overlay: true,
    },
    {
      id: 'snackbar',
      label: 'Snackbar',
      owner: 'App',
      blurb: 'Confirms a write to local SQLite, optionally with an undo.',
      detail: [
        'Every write in this app lands in on-device SQLite first, so a snackbar is mostly a receipt: "Collection saved", "Loan created". It confirms the write without making the user navigate back to check.',
        'The undo pairing is the valuable part, and it is the right place for it. A mistyped amount in a collection is common, and offering undo on the snackbar is far cheaper than building a full edit-and-revert flow into the transaction history.',
        'There is a domain-specific reason to be careful here that a generic app would not have: transactions in this system are append-only once they reach the server. An undo that appears to succeed but leaves a half-written pair of rows behind is worse than no undo at all, so the snackbar action has to revert the local write completely, not just hide the row.',
      ],
      equivalents: { flutter: 'ScaffoldMessenger.of(context).showSnackBar' },
      appNotes: [
        'Confirms the local sqflite write — "Collection saved".',
        'Undo must fully revert the local write, since pushes are append-only.',
        'Queue messages so a second one does not cut off the first.',
      ],
      box: { x: 0.045, y: 0.705, w: 0.91, h: 0.062 },
      overlay: true,
    },
    {
      id: 'bottom-sheet',
      label: 'Bottom sheet',
      owner: 'App',
      blurb: 'Payment schedules and per-customer action sheets.',
      detail: [
        'The customer profile uses sheets for the things that are related to the customer you are already looking at but are too much to inline: the full payment schedule, and the action set that includes Collect, Refinance and Add Loan.',
        'It is a good fit for the schedule because that content is long, ordered and read-only — the three things a sheet handles well — and it keeps the profile itself from becoming a wall of numbers that hides the outstanding figure that is the actual reason for opening the screen.',
        'For the action sheet, the constraint is domain-specific: Refinance and Add Loan both create real records, so the sheet is where the parameters get confirmed, not where the write happens. Keeping the write one screen deeper is what makes the append-only model safe.',
      ],
      equivalents: { flutter: 'showModalBottomSheet' },
      appNotes: [
        'Payment schedule sheet — long, ordered, read-only.',
        'Action sheet — Collect / Refinance / Add Loan open their own screens.',
        'Sheets confirm parameters; the write happens one level deeper.',
      ],
      box: { x: 0.03, y: 0.605, w: 0.94, h: 0.28 },
      overlay: true,
    },
    {
      id: 'bottom-nav',
      label: 'Bottom navigation',
      owner: 'App',
      blurb: 'The four top-level destinations: Home, Khata, Pawn, Reports.',
      detail: [
        'Four destinations, and each one is a genuinely different job rather than a variation on the last: Home launches modules and shows the day’s numbers, Khata is the lending book, Pawn is the collateral side, and Reports is the read-only analysis.',
        'Four also happens to be the right count for a phone. Five is the practical ceiling before the tap targets get uncomfortably small, and these four are all frequent enough to deserve a permanent slot rather than a trip through a drawer.',
        'Because the app is offline-first and backed by one local database, the state each tab needs is already in SQLite. Switching tabs is therefore a query rather than a fetch, which is why it is instant and why there is no loading spinner on any of them.',
      ],
      equivalents: { flutter: 'NavigationBar or BottomNavigationBar' },
      appNotes: [
        'Home · Khata · Pawn · Reports.',
        'Four peers, each a different job — no tab is a sub-screen.',
        'All backed by local sqflite, so switching is instant and offline.',
      ],
      box: { x: 0, y: 0.8, w: 1, h: 0.125 },
    },
    {
      id: 'system-nav',
      label: 'System navigation',
      owner: 'OS',
      blurb: 'Android’s gesture bar. The nav row sits above its inset.',
      detail: [
        'The gesture pill at the very bottom belongs to Android, and its height is not a constant across devices or across Android versions — which is why the bottom navigation bar is laid out above the reported inset rather than pinned to the raw bottom of the window.',
        'The one screen where this shows up most is the Reports screen, which is the longest in the app and the one most likely to be scrolled to its very end. Pinned to the bottom without the inset, the last row of a report ends up underneath the gesture bar on exactly the device that made it longest.',
        'The other thing to know is that the app allows cleartext HTTP so it can reach a local server later. That is a transport decision, not a layout one, but it is worth being deliberate about rather than leaving enabled indefinitely — it should be scoped down or turned off before the app talks to anything on the public internet.',
      ],
      equivalents: { flutter: 'SafeArea, or MediaQuery.of(context).padding.bottom' },
      appNotes: [
        'Bottom nav sits above the gesture-bar inset, never pinned to the window edge.',
        'Matters most on Reports, the longest scrolling screen.',
        'usesCleartextTraffic is enabled for a future local server — scope it before going public.',
      ],
      box: { x: 0, y: 0.925, w: 1, h: 0.075 },
    },
  ],
}
