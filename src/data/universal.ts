import type { Dataset } from './types'

/**
 * The universal anatomy.
 *
 * Organised by Flutter's own Material widget groupings rather than an invented
 * order, so the vocabulary is the platform's. Read this one when you are
 * starting a *new* app and want to know what the ten regions are and which
 * widget gives you each.
 *
 * There is no AppBar here on purpose — see the note on the header row.
 */
export const universal: Dataset = {
  key: 'universal',
  title: 'The universal anatomy',
  subtitle:
    'The regions of a mobile screen, grouped the way Flutter groups its own Material widgets. Use this when starting a new app.',
  screenName: 'A generic screen',
  screens: [
    {
      id: 'generic',
      name: 'Generic screen',
      file: '—',
      summary:
        'One screen carrying every region, so you can see the whole vocabulary at once and how the parts stack.',
      blocks: [
        { kind: 'statusbar', time: '9:41' },
        {
          kind: 'headerRow',
          title: 'Good morning',
          subtitle: 'Tue, 28 Sep',
          badge: '3',
          trailing: 'sync',
        },
        { kind: 'sectionTitle', text: 'SUMMARY' },
        {
          kind: 'kpiGrid',
          cols: 2,
          items: [
            { label: 'Collected today', value: '₹12,400', icon: '◷' },
            { label: 'Outstanding', value: '₹8.24L', icon: '▤' },
            { label: 'Interest due', value: '₹10,800', icon: '%' },
            { label: 'Active items', value: '18', icon: '◆' },
          ],
        },
        { kind: 'search', placeholder: 'Search records' },
        { kind: 'chips', items: [{ label: 'All' }, { label: 'Overdue', tone: 'red' }, { label: 'This week' }] },
        {
          kind: 'rows',
          variant: 'list',
          items: [
            { icon: '●', title: 'Ramesh Verma', subtitle: 'Due today · ₹2,000', trailing: '₹2,000' },
            { icon: '●', title: 'Lakshmi Bai', subtitle: 'Due next week · ₹1,600', trailing: '₹1,600' },
          ],
        },
        { kind: 'sectionTitle', text: 'NAVIGATION' },
        {
          kind: 'navbar',
          active: 0,
          items: [
            { icon: '⌂', label: 'Home' },
            { icon: '▤', label: 'Records' },
            { icon: '◈', label: 'Items' },
            { icon: '◷', label: 'Reports' },
          ],
        },
        { kind: 'sysnav' },
      ],
      regions: [
        /* ── System ─────────────────────────────────────────────────── */
        {
          id: 'status-bar',
          label: 'Status bar',
          category: 'system',
          owner: 'OS',
          blurb: 'Drawn by the platform. You pad for it, you never paint it.',
          detail: [
            'This strip belongs to the operating system, not to your app. The clock, the signal strength and the battery are painted by the platform, and anything you draw underneath is simply covered up.',
            'The practical consequence is that the top of your window is not the top of the screen. The platform reports the strip height as an inset, and you are expected to pad your layout by exactly that much so your header sits below the clock rather than behind it.',
            'Treat it as read-only furniture: visible, never tappable, never your content. If a design calls for your own text up there, it is a design that will fail review on any real device.',
          ],
          source: 'SafeArea / MediaQuery.of(context).padding.top',
          notes: [
            'One widget covers notched, hole-punch and plain screens alike — that is why no device check is needed.',
            'A sync counter belongs in the header badge or a KPI tile, never up here.',
          ],
          box: { x: 0, y: 0, w: 1, h: 0.052 },
        },
        {
          id: 'system-nav',
          label: 'System navigation',
          category: 'system',
          owner: 'OS',
          blurb: 'The gesture pill or button row the platform keeps for leaving your app.',
          detail: [
            'The bottom strip — a gesture pill on gesture-navigation devices, a button row on older ones — is sized and positioned by the platform, and it differs across devices and Android versions.',
            'So pad by the reported bottom inset instead of assuming a pixel count. Assume 24dp and you will either crowd your own controls or hide them behind the system bar on whichever device makes your content longest.',
            'This is the region to design around last but respect first: on a scrolling screen the content should pass *under* the translucent system bar while your own bar sits above the inset, so the result looks continuous rather than boxed in.',
          ],
          source: 'SafeArea / MediaQuery.of(context).padding.bottom',
          box: { x: 0, y: 0.942, w: 1, h: 0.058 },
        },

        /* ── Navigation ─────────────────────────────────────────────── */
        {
          id: 'header-row',
          label: 'Header row',
          category: 'navigation',
          owner: 'App',
          blurb: 'Greeting and identity, as a Row — not an AppBar.',
          detail: [
            'Not every screen needs an AppBar. When the top of a screen wants to hold a greeting, an avatar and a badge rather than a title and a menu, build it as a Row inside the body. It looks more like a home screen and it frees the AppBar for pushed screens that genuinely need one.',
            'The avatar on the leading edge doubles as the drawer trigger, which is why a drawer-led app often has no hamburger at all — the avatar is the affordance.',
            'The badge is conditional: it only renders when the count is above zero. An unconditional "0" badge teaches users to ignore the one place the number actually matters.',
          ],
          widget: 'Row + CircleAvatar + Badge',
          source: 'Badge(label, backgroundColor)',
          notes: [
            'Avatar opens the drawer — one affordance instead of an avatar plus a hamburger.',
            'Time-derived greeting (morning / afternoon / evening) costs three lines and makes the screen feel aware of when it is.',
            'Show the badge only when the pending count is non-zero.',
          ],
          box: { x: 0, y: 0.052, w: 1, h: 0.093 },
        },
        {
          id: 'bottom-nav',
          label: 'Bottom navigation',
          category: 'navigation',
          owner: 'App',
          blurb: 'Persistent switching between 3–5 top-level destinations.',
          widget: 'NavigationBar',
          detail: [
            'Bottom navigation is the table of contents, which is why it sits at the bottom on a phone: that is the end of the thumb\'s natural reach, reachable one-handed at any screen size.',
            'Keep it to three to five items. The bar has fixed physical width and a fixed reach, so every item past five shrinks the tap target below the roughly 44dp comfortable tapping needs. There is no way to fit six and get it right.',
            'Each item is a peer — a top-level place, not a tool. Selecting one switches the whole screen and resets the scroll position, because carrying a scroll offset across a destination change is disorienting. It should not hold transient state either: a tab is a place, not a session.',
          ],
          notes: [
            'A tab must never be a sub-screen of another tab.',
            'Reset scroll on switch, or users land mid-list with no context.',
          ],
          box: { x: 0, y: 0.842, w: 1, h: 0.1 },
        },

        /* ── Containment ────────────────────────────────────────────── */
        {
          id: 'content',
          label: 'Content area',
          category: 'containment',
          owner: 'App',
          blurb: 'The scrollable region holding whatever the screen is for.',
          widget: 'ListView / CustomScrollView',
          detail: [
            'Everything the user came for lives here, and this is normally the only part that scrolls. Scrolling is the app saying "there is more below", so if your content fits, leave the space empty rather than inventing filler.',
            'It has to survive two things: a very short height in landscape on a small phone, and the keyboard pushing it up when the user starts typing. A layout that only looks right in a tall portrait preview breaks in both.',
            'A good content area has a hierarchy you can point at: a headline, a summary or two, then the repeating units. Most first-time screens fail because everything gets equal weight, so the user must read everything to find the one thing they needed.',
          ],
          notes: [
            'Order by what the user came to do, not by what is easiest to query.',
            'Pad the bottom for the nav bar and any floating button, or the last row is unreachable.',
          ],
          box: { x: 0, y: 0.145, w: 1, h: 0.697 },
        },
        {
          id: 'kpi-strip',
          label: 'Metric tile',
          category: 'containment',
          owner: 'App',
          blurb: 'A small surface carrying one number and its label.',
          detail: [
            'A metric tile is the cheapest way to answer "how is it going?" without making the user open anything. Two to four of them across the top of a dashboard is the sweet spot — enough to summarise, few enough that each one still gets read.',
            'The ordering rule is importance, not category. Put the figure that decides whether the day went well in the first slot, and the supporting figure beside it.',
            'Value above label, always. The eye reads large numerals first and uses the label to interpret them, so reversing the order makes the user work to decode the number before they know what it means.',
          ],
          notes: [
            'Value on top, label underneath — the eye needs the number first.',
            'Two to four tiles. Past four, none of them gets read.',
          ],
          box: { x: 0.04, y: 0.212, w: 0.92, h: 0.17 },
        },
        {
          id: 'list-item',
          label: 'List tile',
          category: 'containment',
          owner: 'App',
          blurb: 'The tappable row that repeats down the content area.',
          widget: 'ListTile',
          detail: [
            'A list tile is a promise: one row, one thing, one tap to open it. The strongest lists are boringly consistent — same height, same alignment, same position for the leading element, the title and the trailing value — because consistency is what lets someone scan twenty rows in two seconds.',
            'Order is the decision that matters most, and it should follow urgency rather than insertion order. If one row needs attention today and nineteen do not, the urgent one goes first even though it was created last.',
            'Put the decisive value on the trailing edge, where the eye lands last and leaves. A name on the left, a number on the right, and the gap between them does the work of showing which is bigger.',
          ],
          notes: [
            'A 38–44px circular leading badge is the house style; keep it identical on every row.',
            'A chevron promises navigation, so a row without one should not be tappable.',
          ],
          box: { x: 0.04, y: 0.475, w: 0.92, h: 0.15 },
        },

        /* ── Selection ──────────────────────────────────────────────── */
        {
          id: 'search',
          label: 'Search field',
          category: 'text-inputs',
          owner: 'App',
          blurb: 'A text input for narrowing a large set to a small one.',
          widget: 'TextField',
          detail: [
            'Search is the escape hatch for content-heavy screens. It matters most precisely where the list is long enough that scrolling stops being reasonable, and least on screens with three items, where a search box is just a rectangle in the way.',
            'The affordance is mostly typographic: a magnifier icon, and a label that names the searchable thing. "Search customers" is worth more thought than it gets, because users rely on it to understand what the field will match.',
            'What decides whether search feels good is the behaviour between keystrokes. Filtering as the user types, with no submit key, is the expectation now. Anything slower than a few hundred milliseconds and the field feels broken.',
          ],
          notes: [
            'isDense: true keeps the field from eating vertical space in a list header.',
            'The label is a labelText, not a hint — it should survive after the field is filled.',
          ],
          box: { x: 0.045, y: 0.398, w: 0.91, h: 0.062 },
        },
        {
          id: 'chips',
          label: 'Filter chips',
          category: 'selection',
          owner: 'App',
          blurb: 'Chips that narrow the list by state, beside the search field.',
          widget: 'ChoiceChip',
          detail: [
            'Chips and search are not alternatives, they compose. Chips narrow by state — overdue, due today, this week — while search narrows by identity, matching a name or a number. Offering both means the common "show me who I need to chase" question is answerable in one path instead of two.',
            'Put the selected chip in a filled, higher-contrast state and give it a heavier label weight. Selection that is only a slight tint change is the most common reason a filter feels broken.',
            'Decide deliberately whether a "clear" path exists. Tapping the selected chip again to deselect is convenient, but it means there is no "All" chip visible — a screen where users cannot tell what is filtered out is a screen with a support ticket in it.',
          ],
          notes: [
            'A separate "All" chip is the clearest way to show nothing is filtered out.',
            'Selected state needs both a colour and a weight change, not colour alone.',
          ],
          box: { x: 0.045, y: 0.462, w: 0.91, h: 0.012 },
          overlay: true,
        },

        /* ── Communication ──────────────────────────────────────────── */
        {
          id: 'badge',
          label: 'Badge',
          category: 'communication',
          owner: 'App',
          blurb: 'A small count on the header, shown only when there is something to count.',
          widget: 'Badge',
          detail: [
            'A badge answers "is there anything waiting for me?" without making the user open anything. It is a communication widget, not a navigation one: the number is the message.',
            'Render it conditionally. A permanent "0" teaches people to stop looking at the one place the count actually matters, and you cannot win that back later.',
            'Keep it adjacent to the thing it counts. A badge floating away from its source is a number the user has to work out the meaning of, which is the same as no badge at all.',
          ],
          notes: [
            'Pending-change count, not a notification count — they are different numbers and users notice when they are conflated.',
          ],
          box: { x: 0.72, y: 0.066, w: 0.13, h: 0.032 },
          overlay: true,
        },
        {
          id: 'snackbar',
          label: 'Snackbar',
          category: 'communication',
          owner: 'App',
          blurb: 'Brief confirmation, optionally with an undo.',
          widget: 'SnackBar',
          detail: [
            'A snackbar is confirmation, not communication. It appears after an action to say it landed, which is why it must never carry information the user has not already seen. If something needs reading and understanding, it needs a screen, not a bar that vanishes in four seconds.',
            'The pairing with an action is what earns it a place. "Archived" alone makes the user wonder whether undo exists; "Archived  UNDO" removes the doubt and turns a destructive tap into a safe one. This is the cheapest error-correction you will ever build.',
            'Queue them so a second message does not cut off the first, and never stack two. A snackbar also occupies the same corner as a floating button, so on a screen that has both you have to move one of them or you have built a collision.',
          ],
          notes: [
            'Invert the theme so it reads as a system message rather than a card.',
            'If the write is append-only, the undo action must revert it completely — a partial revert is worse than no undo.',
          ],
          box: { x: 0.045, y: 0.74, w: 0.91, h: 0.055 },
          overlay: true,
        },
      ],
    },
  ],
}
