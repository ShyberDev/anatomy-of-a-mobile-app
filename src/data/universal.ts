import type { Dataset } from './types'

/**
 * The universal anatomy: the ten regions that show up on essentially every
 * mobile screen, on every platform, in either order of importance.
 *
 * Read these as the vocabulary. The app-specific dataset in `jewellery.ts`
 * reuses the exact same region ids, so switching datasets swaps the copy
 * without the simulation moving a pixel.
 */
export const universal: Dataset = {
  key: 'universal',
  title: 'The universal anatomy',
  subtitle:
    'Ten regions that appear on almost every mobile screen, whichever platform you build for.',
  screenName: 'A generic screen',
  regions: [
    {
      id: 'status-bar',
      label: 'Status bar',
      owner: 'OS',
      blurb: 'The strip the system reserves for time, signal and battery.',
      detail: [
        'This strip is drawn by the operating system, not by your app. It is the one part of the screen you draw that will be thrown away if you try to draw it yourself — the platform paints over it, and a hand-rolled clock will disagree with the real one by a minute.',
        'The practical consequence is that you must not assume the top of your window is the top of the screen. The system tells you how tall the strip is as an "inset", and you are expected to pad your layout by exactly that much so your app bar starts underneath the clock rather than underneath it.',
        'Treat it as read-only furniture: visible, never tappable, never your content. If a design calls for your own text up there, it is a design that will be rejected on review.',
      ],
      equivalents: {
        material: 'WindowInsets.statusBars; Scaffold handles it via SafeArea',
        flutter: 'MediaQuery.of(context).padding.top, or SafeArea widget',
        compose: 'WindowInsets.statusBars.asPaddingValues()',
      },
      box: { x: 0, y: 0, w: 1, h: 0.055 },
    },
    {
      id: 'app-bar',
      label: 'App bar (top bar)',
      owner: 'App',
      blurb: 'The screen header: what you are looking at, and what you can do to it.',
      detail: [
        'The app bar answers two questions at once — where am I, and what can I do from here. The title goes in the leading or centre position, and the actions go on the trailing edge. That left/right split is a convention strong enough that users read it without being taught.',
        'It is deliberately the least interesting thing on the screen. Its job is orientation, not content, which is why a good app bar stays visually quiet even when the screen beneath it is busy.',
        'Two rules save most of the trouble people have here. Keep the title to one line and truncate rather than wrap, because a two-line app bar eats the content area. And treat the overflow menu ("three dots") as a drawer for actions that are *available* but not *frequent* — if an action matters, it deserves a visible control, and if it is frequent, it belongs in the content area instead.',
      ],
      equivalents: {
        material: 'TopAppBar / CenterAlignedTopAppBar',
        flutter: 'AppBar widget',
        compose: 'TopAppBar or a custom Row inside Scaffold',
      },
      box: { x: 0, y: 0.055, w: 1, h: 0.12 },
    },
    {
      id: 'content',
      label: 'Content area',
      owner: 'App',
      blurb: 'The scrollable region that holds whatever the screen is actually for.',
      detail: [
        'Everything the user came for lives here, and this is normally the only part of the screen that scrolls. Scrolling is the app telling the user "there is more below" — so if your content fits, leave the space empty rather than inventing filler.',
        'This region has to survive the two things that happen to it: it gets a very short height on a small phone in landscape, and it gets pushed under a keyboard when the user starts typing. A layout that only looks right in a tall portrait preview will break in both cases.',
        'A good content area has a hierarchy you can point at: a headline, a summary number or two, then the repeating units. Most first-time screens fail because everything is given equal weight, so the user has to read everything to find the one thing they needed.',
      ],
      equivalents: {
        material: 'LazyColumn / Column inside a Scaffold body',
        flutter: 'ListView / CustomScrollView',
        compose: 'LazyColumn with contentPadding',
      },
      box: { x: 0, y: 0.175, w: 1, h: 0.625 },
    },
    {
      id: 'list-item',
      label: 'Card / list item',
      owner: 'App',
      blurb: 'The tappable unit that repeats down the content area.',
      detail: [
        'A list item is a promise: one row, one thing, one tap to open it. The strongest lists are boringly consistent — same height, same alignment, same position for the photo, the title and the number — because consistency is what lets a user scan twenty rows in two seconds.',
        'Order is the design decision that matters most here, and it should follow urgency, not insertion order. If one row needs attention today and nineteen do not, the urgent one goes first even if it was created last.',
        'Put the most decisive value on the trailing edge, where the eye lands last and leaves. A name on the left, a number on the right, and the gap between them does the work of showing which is bigger.',
      ],
      equivalents: {
        material: 'Card, ListTile, or a row inside LazyColumn',
        flutter: 'Card, ListTile, or an itemBuilder in ListView',
        compose: 'Card, or a Column of clickable rows',
      },
      box: { x: 0.055, y: 0.285, w: 0.89, h: 0.215 },
    },
    {
      id: 'search-field',
      label: 'Search field',
      owner: 'App',
      blurb: 'A text input for narrowing a large set down to a small one.',
      detail: [
        'Search is the escape hatch for content-heavy screens. It matters most precisely where the list is long enough that scrolling stops being reasonable, and least on screens with three items, where a search box is just a rectangle in the way.',
        'The affordance is mostly typographic: a magnifier icon, placeholder text that names the searchable thing ("Search customers", not "Search"), and a clear button that appears once there is text to clear. Users rely on the placeholder to understand what the field will match, so it is worth more thought than it gets.',
        'The behaviour that decides whether search feels good is what happens between keystrokes. Filtering as the user types, without a submit key, is the expectation now; anything slower than a few hundred milliseconds and the field feels broken.',
      ],
      equivalents: {
        material: 'SearchBar / TextField with leading search icon',
        flutter: 'SearchBar or TextField in the AppBar actions/bottom',
        compose: 'OutlinedTextField with a leading search icon',
      },
      box: { x: 0.055, y: 0.2, w: 0.89, h: 0.062 },
    },
    {
      id: 'fab',
      label: 'Floating action button (FAB)',
      owner: 'App',
      blurb: 'The one prominent circular button for the screen’s main action.',
      detail: [
        'A FAB earns its place by being singular. It means "the thing you most likely came here to do" — create a record, compose, add a photo. The moment a screen grows a second equally important action, the FAB stops being a signal and becomes another button, and the screen is better off with neither.',
        'Its position is fixed by convention: bottom-end of the content area, floating above it. Users find it without looking, so moving it costs you taps. It is also the most commonly collided-with element in a whole app, because it lives in the same corner as the scroll position, the last list item and the keyboard.',
        'Do not use it for destructive actions. One tap is too cheap a gesture for something irreversible, and a confirmation dialog immediately after a floating button is a confession that the button was badly chosen.',
      ],
      equivalents: {
        material: 'FloatingActionButton in a Scaffold',
        flutter: 'FloatingActionButton in a Scaffold',
        compose: 'FloatingActionButton in a Scaffold',
      },
      box: { x: 0.795, y: 0.672, w: 0.16, h: 0.098 },
      overlay: true,
    },
    {
      id: 'snackbar',
      label: 'Snackbar',
      owner: 'App',
      blurb: 'A brief, self-dismissing message about what just happened.',
      detail: [
        'A snackbar is confirmation, not communication. It appears after an action to tell the user it landed, which is why it should never carry information the user has not already seen — if something needs reading and understanding, it needs a screen, not a bar that vanishes in four seconds.',
        'The pairing with an action is what makes it worth having. "Archived" on its own makes the user wonder whether undo exists; "Archived  UNDO" removes the doubt and turns a destructive tap into a safe one. This is the cheapest error-correction you will ever build.',
        'Two practical rules: queue them so a second one does not cut off the first, and never stack one on top of another. A snackbar also sits right where the FAB lives, so on a screen that has both you have to move one of them or you have built a collision.',
      ],
      equivalents: {
        material: 'ScaffoldMessenger.showSnackBar',
        flutter: 'ScaffoldMessenger.of(context).showSnackBar',
        compose: 'SnackbarHostState.showSnackbar',
      },
      box: { x: 0.045, y: 0.705, w: 0.91, h: 0.062 },
      overlay: true,
    },
    {
      id: 'bottom-sheet',
      label: 'Bottom sheet',
      owner: 'App',
      blurb: 'A panel that slides up from the bottom with choices that belong to this moment.',
      detail: [
        'A bottom sheet is a temporary, contextual space — it holds the options that only make sense right now, and it goes away when the moment passes. That scoping is the whole idea. Anything that deserves a permanent home belongs on its own screen instead.',
        'It is the right shape for a short, ordered list of actions, and the wrong shape for a form, a long list, or anything the user needs to compare side by side, because a panel that covers half the screen cannot show you the context you are making the decision about.',
        'Drag-to-dismiss and a scrim behind it are not decorations; they are how the user says "never mind" without hunting for a cancel button. If a choice inside it is destructive, keep the confirm step — the sheet being dismissible is what makes it feel safe to open.',
      ],
      equivalents: {
        material: 'ModalBottomSheet',
        flutter: 'showModalBottomSheet',
        compose: 'ModalBottomSheet',
      },
      box: { x: 0.03, y: 0.605, w: 0.94, h: 0.28 },
      overlay: true,
    },
    {
      id: 'bottom-nav',
      label: 'Bottom navigation',
      owner: 'App',
      blurb: 'The persistent bar of top-level destinations along the bottom.',
      detail: [
        'Bottom navigation is the app’s table of contents, which is why it lives at the bottom on a phone: that is the end of the thumb’s natural reach, and it is reachable one-handed no matter how large the phone is.',
        'Keep it to three to five destinations. The bar has a fixed physical width and a fixed thumb reach, so every item above five makes the targets smaller than the roughly 44dp that comfortable tapping requires. There is no way to fit six without getting it wrong.',
        'Every item is a peer: a top-level place, not a tool. Selecting one switches the whole screen and resets its scroll position to the top, because carrying a scroll offset across a destination switch is disorienting. It should not hold transient state either — a tab is a place, not a session.',
      ],
      equivalents: {
        material: 'NavigationBar',
        flutter: 'BottomNavigationBar or NavigationBar',
        compose: 'NavigationBar',
      },
      box: { x: 0, y: 0.8, w: 1, h: 0.125 },
    },
    {
      id: 'system-nav',
      label: 'System navigation',
      owner: 'OS',
      blurb: 'The gesture pill or button row the system keeps for leaving your app.',
      detail: [
        'The bottom strip — a gesture pill on gesture-navigation devices, three buttons on older ones — is the operating system’s way back out. It is sized and positioned by the platform, and it changes shape and height across devices and across Android versions.',
        'So the same rule as the status bar applies in reverse: pad your layout by the reported bottom inset instead of assuming a number of pixels. Assume a fixed 24dp and you will either crowd your own controls or hide them behind the system’s on the next device.',
        'It is also the hardest region to design around and the one you should design around last. What matters is the consequence for the app bar: on a scrolling screen, the content should pass *under* the translucent system bars and the app bar should sit above the inset, so the result looks continuous rather than boxed in.',
      ],
      equivalents: {
        material: 'WindowInsets.navigationBars; Scaffold + SafeArea',
        flutter: 'MediaQuery.of(context).padding.bottom, or SafeArea',
        compose: 'WindowInsets.navigationBars.asPaddingValues()',
      },
      box: { x: 0, y: 0.925, w: 1, h: 0.075 },
    },
  ],
}
