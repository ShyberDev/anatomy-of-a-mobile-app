# Anatomy of a Mobile App

**Two modes, one vocabulary.** Learn the parts on a generic screen, then check
your own app against them.

- **Learn** — the three-level curriculum: screen anatomy → components → patterns.
  Every entry carries do / don't guidance, because the widget reference tells you
  an API exists and nothing about when *not* to reach for it.
- **Jewellery Suite** — your running app, screen by screen, transcribed from the
  Dart source. Click any part of a screen to see what it is, which Material
  pattern it belongs to, and where it lives in the code.

https://shyberdev.github.io/anatomy-of-a-mobile-app/

![The explorer on the Home screen of Jewellery Suite](docs/screenshot.png)

## Why two modes

The vocabulary only pays off if it transfers. In **Learn** you are building
something new and want the ten regions, the widgets that make them, and the
patterns that combine them. In **Jewellery Suite** you are reviewing something
that exists, and the same names let you point at a screen and say "this row is a
list tile, this is a choice chip, this gradient is the app's emphasis
treatment" — and notice where one screen does it differently from another.

That difference is the point. A consistency you cannot see is a consistency you
cannot fix.

## The three levels

**Level 1 — Screen anatomy.** The parts every screen is made of: status bar, top
app bar, body, cards, lists, forms, FAB, bottom navigation.

**Level 2 — Components.** The Material widgets behind each part, in Flutter's own
groupings: Actions, Communication, Containment, Navigation, Selection, Text
inputs.

**Level 3 — Patterns.** The arrangements you assemble components into: dashboard,
CRUD form, search + filter, master–detail, list → detail, tabbed interface,
bottom navigation, drawer, wizard, confirmation dialog, empty / loading / error
states.

Levels are ordered by dependency, not difficulty — you cannot pick the right
pattern until you know the pieces, and you cannot name the pieces until you know
where they sit.

## What I found transcribing your app

Building the Jewellery Suite pages turned up several things worth checking. None
are crashes; they are decisions that are inconsistent or invisible until you put
two screens side by side.

| Where | What |
|---|---|
| Reports, both tabs | `moneyWhole` on Khata (`1,600`), `moneyText` on Pawn (`100000.00`) — two money formats on one screen |
| Pawn summary strip | Always computed from active loans, so selecting **Released** leaves it showing active figures |
| Pawn Loans / Reports | Metal chips have no "All" on the list screen, but do on the report |
| Pawn loan rows | Trailing value is the status word; the amount is in the subtitle. The khata member row does the opposite |
| Pawn loan rows | Book ID is displayed but excluded from the search query |
| Customer ledger rows | Delete with no confirmation and no admin gate, unlike khata and member deletion |
| Village screen | `khataType` is passed in and never read; `villages.lat/lng` is write-only |
| Home | Two Core Module tiles and three drawer rows call `comingSoon()` and do nothing |
| Pawn Dashboard | "1 loans older than a year" — plural bug |
| Khata Books | Empty-state copy says "Tap +" but the action is now an app-bar icon |
| Summary strip (village) | Uses `kInk` directly, so it does not adapt to dark mode |
| Everywhere | `appBarTheme` applies to pushed screens only — Home has no AppBar and no bottom navigation |

The **"Worth a look"** list at the bottom of App mode links to each of these on
the screen where it happens.

## Two corrections to the earlier version

The first version of this site was built from the README and got Home wrong in
ways worth recording, because both mistakes are easy to make:

- It drew an `AppBar` and a bottom navigation bar. Home has **neither** — the
  `Scaffold` declares only `backgroundColor`, `drawer` and `body`, and the
  header is an in-body `Row`. The `appBarTheme` in `app.dart` applies to pushed
  child screens.
- It showed two KPI cards. There are **six**, in two columns of three.

## Running it

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type-check + build into dist/
```

`git push` to `main` deploys to GitHub Pages via `.github/workflows/deploy.yml`.
The build runs `vue-tsc`, so a type error fails the deploy rather than shipping.

## How it's put together

Everything visual is data. The phone mock renders a screen's `blocks`, and each
region carries its own geometry as fractions of the screen — there are no
coordinates in any template. Adding a screen is a data edit.

```
src/data/
├── types.ts            the Region / Screen / Block model
├── levels.ts           the Level 1/2/3 entry types
├── level1-2.ts         anatomy and components, with do/don't
├── level3.ts           patterns
├── universal.ts        the generic screen
├── jewellery-screens.ts  eight real screens from the Dart source
└── jewellery.ts        dataset wrapper + your real palette
```

To document another app, add a `screens` array using the same `Block` and
`Region` shapes. Nothing in the components needs to change.

## Credits

The clickable-anatomy-diagram format was inspired by
[**AnatomyOf**](https://anatomyof.lunarwerx.com) by
[LunarWerx](https://lunarwerx.com). No code or copy was taken from it — this is
an original implementation, and not affiliated.

Category names and widget groupings follow Flutter's
[Material component catalog](https://docs.flutter.dev/ui/widgets/material) and
Android's [Material components](https://developer.android.com/design/ui/mobile/guides/components/material-overview)
and [layout patterns](https://developer.android.com/design/ui/mobile/guides/layout-and-content/layout-and-nav-patterns)
guides. The guidance and all wording are ours.

## License

MIT © ShyamSai. See [LICENSE](LICENSE).
