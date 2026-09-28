<script setup lang="ts">
import { computed } from 'vue'
import type { Dataset, Region, Screen } from '../data/types'
import ScreenMock from './ScreenMock.vue'

/**
 * The phone: a mock screen plus one transparent hit area per region.
 *
 * Z-order is explicit because the default stacking gets it wrong. A region's
 * children must out-rank the content area that contains them, and overlays must
 * out-rank everything — otherwise the largest invisible rectangle on the screen
 * quietly swallows every tap.
 */
const props = defineProps<{
  dataset: Dataset
  screen: Screen
  selected: string | null
  /** Overlays the user has asked to reveal. */
  revealed: string[]
  /** 0.7–1.9, matching app.dart's persisted font-scale clamp. */
  scale: number
}>()

const emit = defineEmits<{ select: [string] }>()

/** A FAB is part of a resting screen; a snackbar is not. */
const ALWAYS_ON = new Set(['drag-delete'])

const visible = computed(() =>
  props.screen.regions.filter(
    (r) => !r.overlay || ALWAYS_ON.has(r.id) || props.revealed.includes(r.id),
  ),
)

/** Later wins. Mirrors the layout order of the blocks themselves. */
const Z: Record<string, number> = {
  'status-bar': 1,
  'system-nav': 1,
  'pull-refresh': 2,
  appbar: 3,
  'header-card': 4,
  'home-header': 4,
  content: 3,
  'summary-strip': 4,
  'summary-card': 4,
  'outstanding-card': 4,
  'kpi-strip': 4,
  'reserves': 4,
  'age-groups': 4,
  'core-modules': 4,
  'more-section': 4,
  'quick-actions': 4,
  'khata-rows': 4,
  'member-rows': 4,
  'pawn-rows': 4,
  'quick-views': 4,
  'connection-card': 4,
  search: 5,
  'filter-chips': 5,
  'status-chips': 5,
  'metal-chips': 5,
  'pawn-filters': 5,
  'metric-grid': 5,
  ledger: 5,
  'sync-button': 6,
  'action-bar': 8,
  'new-loan-fab': 7,
  'add-member-fab': 7,
  'drag-delete': 7,
  'release-rule': 9,
  'payment-schedule': 9,
  'collect-dialog': 9,
  'drawer': 9,
  'khata-type': 9,
  'sync-snackbar': 9,
  'number-formats': 9,
  'failure-list': 6,
  footnote: 6,
}

function boxStyle(r: Region) {
  return {
    left: `${r.box.x * 100}%`,
    top: `${r.box.y * 100}%`,
    width: `${r.box.w * 100}%`,
    height: `${r.box.h * 100}%`,
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
      <div class="phone__screen">
        <ScreenMock :screen="screen" @pick="emit('select', $event)" />

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
</template>
