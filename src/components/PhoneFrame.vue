<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import type { Dataset, Region, Screen } from '../data/types'
import ScreenMock from './ScreenMock.vue'

/**
 * The phone: a mock screen plus one transparent hit area per region.
 *
 * Regions are positioned by *measuring the blocks they cover*, not by trusting
 * a hand-written fraction. The mock scrolls like a real Scaffold, so any fixed
 * fraction drifts the moment the content is taller than the screen — which is
 * most of the time. Measuring keeps a region locked to the thing it names.
 *
 * Z-order is explicit because the default stacking gets it wrong. A region's
 * children must out-rank the content area that contains them, and overlays must
 * out-rank everything, or the largest invisible rectangle swallows every tap.
 */
const props = defineProps<{
  dataset: Dataset
  screen: Screen
  selected: string | null
  revealed: string[]
  /** 0.7–1.9, matching app.dart's persisted font-scale clamp. */
  scale: number
}>()

const emit = defineEmits<{ select: [string] }>()

/** A FAB is part of a resting screen; a snackbar is not. */
const ALWAYS_ON = new Set(['drag-delete'])

const screenEl = ref<HTMLElement | null>(null)
/** Measured boxes, keyed by region id. */
const measured = ref<Record<string, { x: number; y: number; w: number; h: number }>>({})
/** Live scrollTop of the mock's column, so the region layer can follow it. */
const scrollTop = ref(0)

const visible = computed(() =>
  props.screen.regions.filter(
    (r) => !r.overlay || ALWAYS_ON.has(r.id) || props.revealed.includes(r.id),
  ),
)

const Z: Record<string, number> = {
  'status-bar': 1,
  'system-nav': 1,
  'pull-refresh': 2,
  appbar: 3,
  'top-app-bar': 3,
  'header-card': 4,
  'home-header': 4,
  content: 3,
  'summary-strip': 4,
  'summary-card': 4,
  'outstanding-card': 4,
  'kpi-strip': 4,
  'cards': 4,
  reserives: 4,
  reserves: 4,
  'age-groups': 4,
  'core-modules': 4,
  'more-section': 4,
  'quick-actions': 4,
  'khata-rows': 4,
  'member-rows': 4,
  'pawn-rows': 4,
  'quick-views': 4,
  'connection-card': 4,
  'metric-grid': 4,
  search: 5,
  'search-field': 5,
  textfield: 5,
  forms: 5,
  'filter-chips': 5,
  'status-chips': 5,
  'metal-chips': 5,
  'pawn-filters': 5,
  chip: 5,
  lists: 5,
  ledger: 5,
  'list-tile': 5,
  card: 5,
  'sync-button': 6,
  button: 6,
  'segmented-button': 6,
  progress: 6,
  dropdown: 6,
  'date-picker': 6,
  divider: 6,
  'action-bar': 8,
  'new-loan-fab': 7,
  'add-member-fab': 7,
  fab: 7,
  'drag-delete': 7,
  'release-rule': 9,
  'payment-schedule': 9,
  'collect-dialog': 9,
  drawer: 9,
  'khata-type': 9,
  'sync-snackbar': 9,
  'number-formats': 9,
  dialog: 9,
  'bottom-sheet': 9,
  tabbar: 9,
  snackbar: 9,
  'failure-list': 6,
  footnote: 6,
  'bottom-nav': 8,
  navbar: 8,
  'icon-button': 6,
  badge: 6,
  switch: 6,
  checkbox: 6,
  radio: 6,
}

/**
 * Re-measure every anchored region. Runs after mount and whenever the screen,
 * the font scale or the revealed set changes — all three change block heights.
 */
function measure() {
  const root = screenEl.value
  if (!root) return
  const base = root.getBoundingClientRect()
  if (!base.height) return

  const nodes = new Map<number, HTMLElement>()
  for (const el of root.querySelectorAll<HTMLElement>('[data-block]')) {
    const i = Number(el.dataset.block)
    if (!Number.isNaN(i)) nodes.set(i, el)
  }

  const out: Record<string, { x: number; y: number; w: number; h: number }> = {}
  for (const r of props.screen.regions) {
    if (r.anchor == null) continue
    const [a, b] = Array.isArray(r.anchor) ? r.anchor : [r.anchor, r.anchor]
    const first = nodes.get(a)
    const last = nodes.get(b)
    if (!first || !last) continue

    // An anchor is a zero-height marker *before* its block, so the block's real
    // edges come from the following sibling. Falling back to the marker's own
    // rect gives a zero-height box and the region is dropped.
    const blockOf = (marker: HTMLElement) => marker.nextElementSibling as HTMLElement | null
    const boxOf = (marker: HTMLElement): DOMRect | null => {
      const el = blockOf(marker) ?? marker
      const r = el.getBoundingClientRect()
      return r.height > 0 ? r : null
    }

    const ra = boxOf(first)
    const rb = boxOf(last)
    if (!ra || !rb) continue

    const top = Math.min(ra.top, rb.top)
    const bottom = Math.max(ra.bottom, rb.bottom)
    const left = Math.min(ra.left, rb.left)
    const right = Math.max(ra.right, rb.right)
    if (bottom <= top || right <= left) continue

    out[r.id] = {
      x: (left - base.left) / base.width,
      y: (top - base.top) / base.height,
      w: (right - left) / base.width,
      h: (bottom - top) / base.height,
    }
  }
  measured.value = out
}

onMounted(() => {
  measure()
  // The mock scrolls like a real screen, so the hit areas have to travel with
  // it. Measuring alone is not enough: the boxes are captured in document space
  // and would stay put while the content moved underneath.
  screenEl.value
    ?.querySelector('.scr__scroll')
    ?.addEventListener('scroll', (e) => {
      scrollTop.value = (e.target as HTMLElement).scrollTop
    })
})
watch(() => [props.screen.id, props.scale, props.revealed.join(',')], () => {
  // New screen or new font scale: start at the top, then re-measure.
  scrollTop.value = 0
  const sc = screenEl.value?.querySelector<HTMLElement>('.scr__scroll')
  if (sc) sc.scrollTop = 0
  measure()
})

function boxStyle(r: Region) {
  const m = measured.value[r.id]
  if (!m) {
    return {
      left: `${r.box.x * 100}%`,
      top: `${r.box.y * 100}%`,
      width: `${r.box.w * 100}%`,
      height: `${r.box.h * 100}%`,
      zIndex: Z[r.id] ?? 4,
    }
  }
  const i = r.inset
  const x = m.x + (i?.left ?? 0) * m.w
  const y = m.y + (i?.top ?? 0) * m.h
  const w = m.w * (1 - (i?.left ?? 0) - (i?.right ?? 0))
  const h = m.h * (1 - (i?.top ?? 0) - (i?.bottom ?? 0))
  return {
    left: `${x * 100}%`,
    top: `${y * 100}%`,
    width: `${w * 100}%`,
    height: `${h * 100}%`,
    zIndex: Z[r.id] ?? 4,
  }
}
</script>

<template>
  <div
    class="phone"
    :style="{
      '--mock-bg': dataset.theme?.bg ?? '#F2F4F8',
      '--mock-surface': dataset.theme?.surface ?? '#FFFFFF',
      '--mock-ink': dataset.theme?.ink ?? '#12161F',
      '--mock-accent': dataset.theme?.accent ?? '#2F6FD0',
      '--mock-accent-dark': dataset.theme?.accentDark ?? '#1F5AAE',
      '--mock-scale': scale,
    }"
  >
    <div class="phone__frame">
      <div ref="screenEl" class="phone__screen">
        <ScreenMock :screen="screen" />

        <div class="regions" :style="{ transform: `translateY(${-scrollTop}px)` }">
          <button
            v-for="r in visible"
            :key="r.id"
            class="region"
            :class="{
              'region--selected': selected === r.id,
              // A tag pinned left on a region hugging the right edge gets clipped
              // by the phone's overflow, so flip it.
              'region--tag-right': r.box.x + r.box.w > 0.72,
            }"
            :style="boxStyle(r)"
            :data-region="r.id"
            :aria-pressed="selected === r.id"
            :title="r.label"
            @click.stop="emit('select', r.id)"
          >
            <span class="region__tag">{{ r.label }}</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
