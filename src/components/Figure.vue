<script setup lang="ts">
/**
 * Small schematic diagrams for Do / Don't guidance.
 *
 * A picture of the right shape beats a paragraph about it. Each figure is a
 * hand-drawn SVG rather than a screenshot, because a screenshot of some other
 * app teaches its layout as much as it teaches the principle, and these are
 * about the principle.
 *
 * Keys are referenced from `figs: { do, dont }` on level entries. An unknown
 * key renders nothing rather than breaking the panel.
 */
defineProps<{ fig: string }>()

/* Shared palette, matching the mock's neutral tone. */
const INK = '#2B2B2B'
const DIM = '#98A2B3'
const LINE = '#D7DCE5'
const OK = '#2E7D32'
const BAD = '#C62828'
const ACC = '#2F6FD0'
</script>

<template>
  <figure class="fig" :data-fig="fig">
    <!-- ── Bottom nav: 4 items is right, 6 is not ─────────────────────── -->
    <svg v-if="fig === 'nav-four'" viewBox="0 0 200 78" class="fig__svg">
      <rect x="14" y="6" width="172" height="30" rx="8" fill="#fff" :stroke="LINE" />
      <g v-for="(l, i) in ['Home', 'Records', 'Items', 'Reports']" :key="l" :transform="`translate(${24 + i * 41}, 12)`">
        <rect width="30" height="18" rx="5" :fill="i === 0 ? ACC : 'none'" />
        <rect x="4" y="6" width="22" height="2.5" rx="1.25" :fill="i === 0 ? '#fff' : DIM" />
        <rect x="4" y="12" width="14" height="2" rx="1" :fill="i === 0 ? '#fff' : LINE" />
      </g>
      <text x="100" y="50" text-anchor="middle" :fill="OK" font-size="9" font-weight="700">3–5 destinations</text>
      <text x="100" y="63" text-anchor="middle" :fill="DIM" font-size="8">each a top-level peer, every one labelled</text>
    </svg>

    <svg v-else-if="fig === 'nav-six'" viewBox="0 0 200 78" class="fig__svg">
      <rect x="14" y="6" width="172" height="30" rx="8" fill="#fff" :stroke="LINE" />
      <g v-for="i in 6" :key="i" :transform="`translate(${21 + (i - 1) * 27}, 12)`">
        <rect width="22" height="18" rx="5" fill="none" :stroke="LINE" />
        <rect x="3" y="6" width="16" height="2.5" rx="1.25" :fill="DIM" />
        <rect x="3" y="12" width="10" height="2" rx="1" :fill="LINE" />
      </g>
      <path d="M40 30 L160 30" :stroke="BAD" stroke-width="1" stroke-dasharray="2 2" opacity="0" />
      <text x="100" y="50" text-anchor="middle" :fill="BAD" font-size="9" font-weight="700">6 destinations</text>
      <text x="100" y="63" text-anchor="middle" :fill="DIM" font-size="8">targets shrink below a comfortable ~44dp</text>
    </svg>

    <!-- ── Button weights: one primary per screen ─────────────────────── -->
    <svg v-else-if="fig === 'btn-one'" viewBox="0 0 200 78" class="fig__svg">
      <rect x="14" y="8" width="172" height="62" rx="9" fill="#fff" :stroke="LINE" />
      <rect x="26" y="22" width="66" height="20" rx="10" :fill="ACC" />
      <text x="59" y="35" text-anchor="middle" fill="#fff" font-size="8.5" font-weight="700">Collect</text>
      <rect x="100" y="22" width="66" height="20" rx="10" fill="none" :stroke="INK" stroke-width="1.2" />
      <text x="133" y="35" text-anchor="middle" :fill="INK" font-size="8.5" font-weight="600">Refinance</text>
      <text x="100" y="58" text-anchor="middle" :fill="DIM" font-size="8">one filled · the rest outlined or text</text>
    </svg>

    <svg v-else-if="fig === 'btn-two'" viewBox="0 0 200 78" class="fig__svg">
      <rect x="14" y="8" width="172" height="62" rx="9" fill="#fff" :stroke="LINE" />
      <rect x="26" y="22" width="66" height="20" rx="10" :fill="ACC" />
      <text x="59" y="35" text-anchor="middle" fill="#fff" font-size="8.5" font-weight="700">Collect</text>
      <rect x="100" y="22" width="66" height="20" rx="10" :fill="ACC" />
      <text x="133" y="35" text-anchor="middle" fill="#fff" font-size="8.5" font-weight="700">Refinance</text>
      <text x="100" y="58" text-anchor="middle" :fill="BAD" font-size="8" font-weight="600">two primaries — neither reads as primary</text>
    </svg>

    <!-- ── Chip selection: colour AND weight ──────────────────────────── -->
    <svg v-else-if="fig === 'chip-on'" viewBox="0 0 200 66" class="fig__svg">
      <g v-for="(c, i) in ['All', 'Overdue', 'This week']" :key="c" :transform="`translate(${16 + i * 58}, 16)`">
        <rect width="52" height="20" rx="10" :fill="i === 1 ? '#FBEBC6' : '#fff'" :stroke="i === 1 ? '#D9A62B' : LINE" />
        <text x="26" y="13.5" text-anchor="middle" :fill="i === 1 ? '#7A5A08' : INK" font-size="8.5" :font-weight="i === 1 ? 700 : 500">{{ c }}</text>
      </g>
      <text x="100" y="54" text-anchor="middle" :fill="DIM" font-size="8">selected: filled + bolder weight</text>
    </svg>

    <svg v-else-if="fig === 'chip-faint'" viewBox="0 0 200 66" class="fig__svg">
      <g v-for="(c, i) in ['All', 'Overdue', 'This week']" :key="c" :transform="`translate(${16 + i * 58}, 16)`">
        <rect width="52" height="20" rx="10" fill="#fff" :stroke="LINE" />
        <text x="26" y="13.5" text-anchor="middle" :fill="INK" font-size="8.5" font-weight="500">{{ c }}</text>
      </g>
      <text x="100" y="54" text-anchor="middle" :fill="BAD" font-size="8" font-weight="600">selection is a 2% tint — reads as "nothing is on"</text>
    </svg>

    <!-- ── Field label: hintText vanishes, labelText stays ────────────── -->
    <svg v-else-if="fig === 'field-label'" viewBox="0 0 200 76" class="fig__svg">
      <text x="16" y="16" :fill="OK" font-size="8" font-weight="700">labelText — floats up, survives input</text>
      <rect x="16" y="22" width="168" height="24" rx="5" fill="#fff" :stroke="ACC" stroke-width="1.3" />
      <rect x="22" y="17" width="74" height="9" rx="2" fill="#fff" />
      <text x="24" y="24" :fill="ACC" font-size="7">Search customers</text>
      <text x="28" y="38" :fill="INK" font-size="9">Ramesh</text>
      <text x="16" y="66" :fill="BAD" font-size="8" font-weight="700">hintText — disappears the moment they type</text>
    </svg>

    <svg v-else-if="fig === 'field-hint'" viewBox="0 0 200 76" class="fig__svg">
      <text x="16" y="16" :fill="OK" font-size="8" font-weight="700">labelText</text>
      <rect x="16" y="22" width="168" height="24" rx="5" fill="#fff" :stroke="LINE" />
      <text x="24" y="37" :fill="DIM" font-size="8.5">Search customers</text>
      <text x="16" y="66" :fill="DIM" font-size="8">now typing "Ram" → the field has no label left</text>
      <rect x="16" y="42" width="168" height="24" rx="5" fill="#fff" :stroke="LINE" />
      <text x="24" y="57" :fill="INK" font-size="9">Ram</text>
    </svg>

    <!-- ── 3 options: chips, not a dropdown ───────────────────────────── -->
    <svg v-else-if="fig === 'three-visible'" viewBox="0 0 200 70" class="fig__svg">
      <text x="16" y="14" :fill="DIM" font-size="8">Frequency</text>
      <g v-for="(c, i) in ['Weekly', 'Monthly', 'Biweekly']" :key="c" :transform="`translate(${16 + i * 58}, 20)`">
        <rect width="52" height="20" rx="10" :fill="i === 1 ? '#FBEBC6' : '#fff'" :stroke="i === 1 ? '#D9A62B' : LINE" />
        <text x="26" y="13.5" text-anchor="middle" :fill="i === 1 ? '#7A5A08' : INK" font-size="8" :font-weight="i === 1 ? 700 : 500">{{ c }}</text>
      </g>
      <text x="100" y="58" text-anchor="middle" :fill="OK" font-size="8">all visible, one tap, zero hiding</text>
    </svg>

    <svg v-else-if="fig === 'three-hidden'" viewBox="0 0 200 70" class="fig__svg">
      <text x="16" y="14" :fill="DIM" font-size="8">Frequency</text>
      <rect x="16" y="20" width="168" height="20" rx="5" fill="#fff" :stroke="LINE" />
      <text x="24" y="33.5" :fill="INK" font-size="8.5">Monthly</text>
      <path d="M172 27 l5 5 l5 -5" fill="none" :stroke="DIM" stroke-width="1.4" stroke-linecap="round" />
      <text x="100" y="58" text-anchor="middle" :fill="BAD" font-size="8">2 taps to compare, and the choices are hidden</text>
    </svg>

    <!-- ── List order: urgency first vs alphabetical ──────────────────── -->
    <svg v-else-if="fig === 'list-urgent'" viewBox="0 0 200 82" class="fig__svg">
      <g v-for="(r, i) in [['3d late', BAD], ['today', '#B8860B'], ['2 weeks', OK]]" :key="r[0]" :transform="`translate(16, ${10 + i * 22})`">
        <rect width="168" height="18" rx="5" fill="#fff" :stroke="LINE" />
        <rect x="5" y="5" width="34" height="8" rx="4" :fill="r[1]" opacity="0.16" />
        <text x="22" y="11.5" text-anchor="middle" :fill="r[1]" font-size="6.5" font-weight="700">{{ r[0] }}</text>
        <rect x="46" y="6.5" width="60" height="5" rx="2.5" :fill="INK" opacity="0.75" />
        <rect x="134" y="6.5" width="28" height="5" rx="2.5" :fill="r[1]" opacity="0.7" />
      </g>
      <text x="100" y="77" text-anchor="middle" :fill="OK" font-size="8">stop at the first one that needs work</text>
    </svg>

    <svg v-else-if="fig === 'list-alpha'" viewBox="0 0 200 82" class="fig__svg">
      <g v-for="(r, i) in [['3d late', BAD], ['today', '#B8860B'], ['2 weeks', OK]]" :key="r[0]" :transform="`translate(16, ${10 + i * 22})`">
        <rect width="168" height="18" rx="5" fill="#fff" :stroke="LINE" />
        <rect x="5" y="5" width="34" height="8" rx="4" :fill="r[1]" opacity="0.16" />
        <text x="22" y="11.5" text-anchor="middle" :fill="r[1]" font-size="6.5" font-weight="700">{{ r[0] }}</text>
        <rect x="46" y="6.5" width="60" height="5" rx="2.5" :fill="INK" opacity="0.75" />
        <rect x="134" y="6.5" width="28" height="5" rx="2.5" :fill="r[1]" opacity="0.7" />
      </g>
      <text x="100" y="77" text-anchor="middle" :fill="BAD" font-size="8">sorted A–Z — read all three to find the urgent one</text>
      <path d="M16 10 l168 44" :stroke="BAD" stroke-width="1" stroke-dasharray="3 3" opacity="0.5" transform="rotate(0 16 10)" style="display:none" />
    </svg>

    <!-- ── Form: too long vs stepped ──────────────────────────────────── -->
    <svg v-else-if="fig === 'form-long'" viewBox="0 0 200 84" class="fig__svg">
      <rect x="16" y="8" width="46" height="68" rx="7" fill="#fff" :stroke="LINE" />
      <rect x="22" y="14" width="34" height="7" rx="3" :fill="DIM" />
      <g v-for="i in 7" :key="i">
        <rect x="22" :y="25 + i * 6.6" width="34" height="4" rx="2" :fill="LINE" />
      </g>
      <path d="M66 42 l14 0 m0 0 l-4 -3 m4 3 l-4 3" :stroke="BAD" stroke-width="1.3" fill="none" stroke-linecap="round" />
      <text x="100" y="40" :fill="BAD" font-size="8" font-weight="700">14 fields, one screen</text>
      <text x="100" y="54" :fill="DIM" font-size="7.5">scrolls on a small phone, keyboard covers half</text>
    </svg>

    <svg v-else-if="fig === 'form-steps'" viewBox="0 0 200 84" class="fig__svg">
      <g v-for="(n, i) in [1, 2, 3]" :key="n">
        <rect :x="16 + i * 58" y="10" width="46" height="64" rx="7" fill="#fff" :stroke="i === 0 ? ACC : LINE" :stroke-width="i === 0 ? 1.4 : 1" />
        <circle :cx="39 + i * 58" cy="22" r="6" :fill="i === 0 ? ACC : 'none'" :stroke="i === 0 ? 'none' : DIM" />
        <text :x="39 + i * 58" y="25" text-anchor="middle" :fill="i === 0 ? '#fff' : DIM" font-size="7" font-weight="700">{{ n }}</text>
        <g v-for="k in 3" :key="k">
          <rect :x="22 + i * 58" :y="36 + k * 9" width="34" height="5" rx="2.5" :fill="LINE" />
        </g>
      </g>
      <text x="100" y="82" text-anchor="middle" :fill="OK" font-size="8">"Step 1 of 3" — the user knows it ends</text>
    </svg>

    <!-- ── Cards: grouped vs everything boxed ─────────────────────────── -->
    <svg v-else-if="fig === 'card-grouped'" viewBox="0 0 200 76" class="fig__svg">
      <rect x="16" y="10" width="168" height="56" rx="9" fill="#fff" :stroke="LINE" />
      <rect x="24" y="18" width="52" height="5" rx="2.5" :fill="INK" opacity="0.8" />
      <rect x="24" y="30" width="152" height="4" rx="2" :fill="LINE" />
      <rect x="24" y="39" width="130" height="4" rx="2" :fill="LINE" />
      <rect x="24" y="50" width="70" height="10" rx="5" :fill="ACC" />
      <text x="100" y="73" text-anchor="middle" :fill="OK" font-size="8">the group is the unit, so it gets one boundary</text>
    </svg>

    <svg v-else-if="fig === 'card-everything'" viewBox="0 0 200 76" class="fig__svg">
      <g v-for="i in 3" :key="i">
        <rect x="16" :y="8 + i * 20" width="168" height="16" rx="5" fill="#fff" :stroke="LINE" />
        <rect x="24" :y="14 + i * 20" width="44" height="4" rx="2" :fill="LINE" />
        <rect x="150" :y="14 + i * 20" width="26" height="4" rx="2" :fill="LINE" />
      </g>
      <text x="100" y="73" text-anchor="middle" :fill="BAD" font-size="8">every row boxed — nothing reads as more important</text>
    </svg>

    <!-- ── Switch vs destructive button ───────────────────────────────── -->
    <svg v-else-if="fig === 'switch-toggle'" viewBox="0 0 200 70" class="fig__svg">
      <text x="16" y="13" :fill="DIM" font-size="8">Dark mode</text>
      <rect x="16" y="20" width="34" height="18" rx="9" :fill="ACC" />
      <circle cx="41" cy="29" r="6.5" fill="#fff" />
      <text x="100" y="32" :fill="OK" font-size="8" font-weight="700">takes effect immediately — no Save</text>
      <text x="100" y="56" text-anchor="middle" :fill="DIM" font-size="7.5">a setting with a consequence the user must confirm is not a switch</text>
    </svg>

    <!-- ── Empty state: helpful vs blank ──────────────────────────────── -->
    <svg v-else-if="fig === 'empty-helpful'" viewBox="0 0 200 76" class="fig__svg">
      <rect x="16" y="8" width="168" height="60" rx="9" fill="#fff" :stroke="LINE" />
      <circle cx="100" cy="26" r="9" fill="none" :stroke="DIM" stroke-width="1.4" />
      <rect x="97" y="22" width="6" height="6" rx="1" fill="none" :stroke="DIM" stroke-width="1.1" />
      <text x="100" y="46" text-anchor="middle" :fill="INK" font-size="7.5" font-weight="600">No khatas yet</text>
      <text x="100" y="57" text-anchor="middle" :fill="DIM" font-size="7">Tap + to create one</text>
    </svg>

    <svg v-else-if="fig === 'empty-blank'" viewBox="0 0 200 76" class="fig__svg">
      <rect x="16" y="8" width="168" height="60" rx="9" fill="#fff" :stroke="LINE" />
      <text x="100" y="42" text-anchor="middle" :fill="BAD" font-size="9" font-weight="700">— nothing —</text>
      <text x="100" y="57" text-anchor="middle" :fill="BAD" font-size="7">user cannot tell empty from broken</text>
    </svg>

    <!-- ── Loading: skeleton beats spinner ────────────────────────────── -->
    <svg v-else-if="fig === 'load-skeleton'" viewBox="0 0 200 76" class="fig__svg">
      <g v-for="i in 3" :key="i">
        <rect x="16" :y="10 + i * 19" width="168" height="15" rx="5" fill="#fff" :stroke="LINE" />
        <rect x="22" :y="15 + i * 19" width="46" height="5" rx="2.5" :fill="LINE" />
        <rect x="140" :y="15 + i * 19" width="38" height="5" rx="2.5" :fill="LINE" />
      </g>
      <text x="100" y="73" text-anchor="middle" :fill="OK" font-size="8">same shape as the real rows — nothing jumps on load</text>
    </svg>

    <!-- ── Master–detail: phone vs tablet ─────────────────────────────── -->
    <svg v-else-if="fig === 'md-phone'" viewBox="0 0 200 78" class="fig__svg">
      <rect x="24" y="8" width="52" height="62" rx="8" fill="#fff" :stroke="LINE" />
      <g v-for="i in 4" :key="i">
        <rect x="30" :y="15 + i * 12" width="40" height="8" rx="3" :fill="i === 1 ? ACC : LINE" :opacity="i === 1 ? 0.9 : 1" />
      </g>
      <path d="M84 39 l16 0 m0 0 l-5 -4 m5 4 l-5 4" :stroke="DIM" stroke-width="1.3" fill="none" stroke-linecap="round" />
      <rect x="112" y="8" width="64" height="62" rx="8" fill="#fff" :stroke="LINE" />
      <rect x="119" y="16" width="34" height="6" rx="3" :fill="INK" opacity="0.75" />
      <rect x="119" y="30" width="50" height="4" rx="2" :fill="LINE" />
      <rect x="119" y="39" width="44" height="4" rx="2" :fill="LINE" />
      <text x="100" y="76" text-anchor="middle" :fill="OK" font-size="7.5">phone: list, then push the detail</text>
    </svg>

    <svg v-else-if="fig === 'md-squeeze'" viewBox="0 0 200 78" class="fig__svg">
      <rect x="10" y="8" width="86" height="62" rx="8" fill="#fff" :stroke="LINE" />
      <g v-for="i in 4" :key="i">
        <rect x="16" :y="15 + i * 12" width="74" height="8" rx="3" :fill="LINE" />
      </g>
      <rect x="104" y="8" width="86" height="62" rx="8" fill="#fff" :stroke="LINE" />
      <rect x="111" y="16" width="50" height="6" rx="3" :fill="LINE" />
      <rect x="111" y="30" width="72" height="4" rx="2" :fill="LINE" />
      <text x="147" y="46" text-anchor="middle" :fill="BAD" font-size="8" font-weight="700">neither is readable</text>
      <text x="100" y="76" text-anchor="middle" :fill="DIM" font-size="7.5">two phone-width panes side by side</text>
    </svg>

    <!-- ── Dialog: named vs "Confirm?" ────────────────────────────────── -->
    <svg v-else-if="fig === 'dlg-named'" viewBox="0 0 200 76" class="fig__svg">
      <rect x="30" y="8" width="140" height="60" rx="10" fill="#fff" :stroke="LINE" />
      <text x="42" y="26" :fill="INK" font-size="8.5" font-weight="700">Release this pawn?</text>
      <text x="42" y="39" :fill="DIM" font-size="7">Principal ₹1,40,000 + interest ₹10,800</text>
      <text x="42" y="50" :fill="DIM" font-size="7">must be paid in full to release.</text>
      <text x="112" y="62" text-anchor="middle" :fill="DIM" font-size="7.5">Cancel</text>
      <rect x="128" y="52" width="34" height="12" rx="6" :fill="BAD" />
      <text x="145" y="60.5" text-anchor="middle" fill="#fff" font-size="7" font-weight="700">Release</text>
    </svg>

    <svg v-else-if="fig === 'dlg-vague'" viewBox="0 0 200 76" class="fig__svg">
      <rect x="30" y="8" width="140" height="60" rx="10" fill="#fff" :stroke="LINE" />
      <text x="100" y="34" text-anchor="middle" :fill="INK" font-size="9" font-weight="700">Are you sure?</text>
      <text x="112" y="62" text-anchor="middle" :fill="DIM" font-size="7.5">Cancel</text>
      <rect x="128" y="52" width="34" height="12" rx="6" :fill="BAD" />
      <text x="145" y="60.5" text-anchor="middle" fill="#fff" font-size="7" font-weight="700">OK</text>
      <text x="100" y="46" text-anchor="middle" :fill="BAD" font-size="6.5">what is about to happen?</text>
    </svg>

    <!-- ── Drawer: primary in the bar, secondary in the drawer ────────── -->
    <svg v-else-if="fig === 'drawer-split'" viewBox="0 0 200 78" class="fig__svg">
      <rect x="16" y="10" width="120" height="58" rx="8" fill="#fff" :stroke="LINE" />
      <g v-for="(l, i) in ['Home', 'Khata', 'Pawn', 'Reports']" :key="l" :transform="`translate(${22 + i * 29}, 52)`">
        <rect width="24" height="12" rx="4" :fill="i === 0 ? ACC : 'none'" :stroke="i === 0 ? 'none' : LINE" />
        <rect x="4" y="5" width="16" height="2" rx="1" :fill="i === 0 ? '#fff' : DIM" />
      </g>
      <rect x="126" y="10" width="8" height="58" rx="3" fill="#2F6FD0" opacity="0.2" />
      <rect x="118" y="10" width="52" height="58" rx="7" fill="#fff" :stroke="ACC" stroke-width="1.2" />
      <text x="144" y="24" text-anchor="middle" :fill="DIM" font-size="5.5" font-weight="700">SYSTEM</text>
      <rect x="124" y="29" width="40" height="4" rx="2" :fill="LINE" />
      <rect x="124" y="38" width="34" height="4" rx="2" :fill="LINE" />
      <text x="100" y="76" text-anchor="middle" :fill="OK" font-size="7.5">peers in the bar · settings and About in the drawer</text>
    </svg>

    <!-- ── Rail on a tablet ───────────────────────────────────────────── -->
    <svg v-else-if="fig === 'rail-tablet'" viewBox="0 0 200 78" class="fig__svg">
      <rect x="16" y="8" width="168" height="60" rx="9" fill="#fff" :stroke="LINE" />
      <rect x="16" y="8" width="26" height="60" rx="9" fill="#2F6FD0" opacity="0.08" />
      <g v-for="i in 4" :key="i">
        <rect x="25" :y="16 + i * 13" width="9" height="9" rx="2" :fill="i === 0 ? ACC : DIM" :opacity="i === 0 ? 1 : 0.5" />
      </g>
      <rect x="52" y="16" width="120" height="8" rx="3" :fill="LINE" />
      <rect x="52" y="30" width="88" height="6" rx="3" :fill="LINE" opacity="0.7" />
      <rect x="52" y="42" width="120" height="18" rx="5" :fill="LINE" opacity="0.5" />
      <text x="100" y="75" text-anchor="middle" :fill="OK" font-size="7.5">tablet: rail on the leading edge, within thumb reach</text>
    </svg>

    <!-- ── Skeleton vs full-screen spinner ────────────────────────────── -->
    <svg v-else-if="fig === 'load-spinner'" viewBox="0 0 200 76" class="fig__svg">
      <rect x="16" y="8" width="168" height="60" rx="9" fill="#fff" :stroke="LINE" />
      <circle cx="100" cy="38" r="9" fill="none" :stroke="LINE" stroke-width="2.4" />
      <path d="M100 29 a9 9 0 0 1 9 9" fill="none" :stroke="ACC" stroke-width="2.4" stroke-linecap="round" />
      <text x="100" y="58" text-anchor="middle" :fill="BAD" font-size="7">whole screen replaced — the layout jumps on arrival</text>
    </svg>

    <!-- ── Search + filter composing ──────────────────────────────────── -->
    <svg v-else-if="fig === 'sf-compose'" viewBox="0 0 200 82" class="fig__svg">
      <rect x="16" y="8" width="168" height="20" rx="5" fill="#fff" :stroke="ACC" stroke-width="1.2" />
      <circle cx="27" cy="18" r="3.2" fill="none" :stroke="ACC" stroke-width="1.2" />
      <text x="36" y="21" :fill="DIM" font-size="7">Ramesh</text>
      <g v-for="(c, i) in ['Overdue', 'All']" :key="c" :transform="`translate(${16 + i * 52}, 34)`">
        <rect width="46" height="17" rx="8.5" :fill="i === 0 ? '#FBEBC6' : '#fff'" :stroke="i === 0 ? '#D9A62B' : LINE" />
        <text x="23" y="11.5" text-anchor="middle" :fill="i === 0 ? '#7A5A08' : INK" font-size="7" :font-weight="i === 0 ? 700 : 500">{{ c }}</text>
      </g>
      <g v-for="i in 2" :key="i">
        <rect x="16" :y="56 + i * 12" width="168" height="9" rx="4" fill="#fff" :stroke="LINE" />
      </g>
      <text x="100" y="80" text-anchor="middle" :fill="OK" font-size="7">overdue, then a name inside that subset</text>
    </svg>
  </figure>
</template>
