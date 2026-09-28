<script setup lang="ts">
import { computed } from 'vue'
import type { Dataset, Region, RegionId } from '../data/types'

const props = defineProps<{
  dataset: Dataset
  selected: RegionId | null
  /** Overlays the user has asked to see. Kept off by default so the mock stays honest. */
  revealed: RegionId[]
}>()

const emit = defineEmits<{ select: [RegionId] }>()

/** Always-on overlays. A FAB is part of the baseline screen; a snackbar is not. */
const ALWAYS_ON: RegionId[] = ['fab']

/**
 * Later entries sit on top. Content children have to beat their own parent,
 * and overlays have to beat everything, otherwise the biggest invisible
 * rectangle on the screen swallows every tap.
 */
const Z: Record<RegionId, number> = {
  'status-bar': 1,
  'system-nav': 1,
  'app-bar': 2,
  'bottom-nav': 2,
  content: 3,
  'search-field': 4,
  'list-item': 4,
  fab: 5,
  snackbar: 6,
  'bottom-sheet': 7,
}

const regions = computed<Region[]>(() =>
  props.dataset.regions.filter((r) => {
    if (!r.overlay) return true
    return ALWAYS_ON.includes(r.id) || props.revealed.includes(r.id)
  }),
)

const isVisible = (r: Region) => !r.overlay || ALWAYS_ON.includes(r.id) || props.revealed.includes(r.id)

function boxStyle(r: Region) {
  return {
    left: `${r.box.x * 100}%`,
    top: `${r.box.y * 100}%`,
    width: `${r.box.w * 100}%`,
    height: `${r.box.h * 100}%`,
    zIndex: Z[r.id] ?? 1,
  }
}
</script>

<template>
  <div class="phone" :data-dataset="dataset.key">
    <div class="phone__frame">
      <div class="phone__screen">
        <!-- ── Mock screen: Jewellery Suite, Home ───────────────────────── -->
        <div class="scr" aria-hidden="true">
          <!-- status bar -->
          <div class="scr__status">
            <span class="scr__time">9:41</span>
            <span class="scr__statusicons">
              <svg width="17" height="11" viewBox="0 0 17 11" fill="currentColor" aria-hidden="true">
                <rect x="0" y="7" width="3" height="4" rx="1" /><rect x="4.5" y="5" width="3" height="6" rx="1" />
                <rect x="9" y="2.5" width="3" height="8.5" rx="1" /><rect x="13.5" y="0" width="3" height="11" rx="1" opacity=".35" />
              </svg>
              <svg width="15" height="11" viewBox="0 0 15 11" fill="currentColor" aria-hidden="true">
                <path d="M7.5 9.6 9.9 7.1a3.5 3.5 0 0 0-4.8 0l2.4 2.5Z" />
                <path d="M7.5 4.6c1.8 0 3.5.7 4.7 1.9l1.5-1.6A8.4 8.4 0 0 0 7.5 2.5 8.4 8.4 0 0 0 1.3 4.9l1.5 1.6A6.3 6.3 0 0 1 7.5 4.6Z" opacity=".85" />
                <path d="M7.5.4A11.3 11.3 0 0 0 .2 2.7l1.5 1.6A9.2 9.2 0 0 1 7.5 2.5c2.4 0 4.6.9 6.3 2.4l1.5-1.6A11.3 11.3 0 0 0 7.5.4Z" opacity=".6" />
              </svg>
              <span class="scr__pct">100%</span>
              <svg width="25" height="12" viewBox="0 0 25 12" aria-hidden="true">
                <rect x=".5" y=".5" width="21" height="11" rx="3" fill="none" stroke="currentColor" opacity=".45" />
                <rect x="2" y="2" width="18" height="8" rx="1.6" fill="currentColor" />
                <path d="M23 4v4a2.2 2.2 0 0 0 0-4Z" fill="currentColor" opacity=".45" />
              </svg>
            </span>
          </div>

          <!-- app bar -->
          <div class="scr__appbar">
            <button class="scr__icon" tabindex="-1">
              <svg width="18" height="18" viewBox="0 0 18 18" stroke="currentColor" stroke-width="1.7" stroke-linecap="round">
                <path d="M2.5 4.5h13M2.5 9h13M2.5 13.5h13" />
              </svg>
            </button>
            <span class="scr__apptitle">Jewellery Suite</span>
            <span class="scr__actions">
              <button class="scr__icon" tabindex="-1">
                <svg width="17" height="17" viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.6">
                  <path d="M9 2.5a4 4 0 0 0-4 4v2.8L3.6 12h10.8L13 9.3V6.5a4 4 0 0 0-4-4Z" stroke-linejoin="round" />
                  <path d="M7.2 14a1.9 1.9 0 0 0 3.6 0" stroke-linecap="round" />
                </svg>
              </button>
              <button class="scr__icon" tabindex="-1">
                <svg width="17" height="17" viewBox="0 0 18 18" fill="currentColor">
                  <circle cx="4" cy="9" r="1.5" /><circle cx="9" cy="9" r="1.5" /><circle cx="14" cy="9" r="1.5" />
                </svg>
              </button>
            </span>
          </div>

          <!-- content -->
          <div class="scr__content">
            <div class="scr__greet">
              <p class="scr__greetHi">Good morning</p>
              <p class="scr__greetSub">Tuesday · 2 pending changes</p>
            </div>

            <div class="scr__kpis">
              <div class="scr__kpi">
                <span class="scr__kpiLabel">Collected today</span>
                <span class="scr__kpiValue">₹12,400</span>
                <span class="scr__kpiDelta scr__kpiDelta--up">▲ 3 collections</span>
              </div>
              <div class="scr__kpi">
                <span class="scr__kpiLabel">Pawn outstanding</span>
                <span class="scr__kpiValue">₹8.24L</span>
                <span class="scr__kpiDelta scr__kpiDelta--warn">7 overdue</span>
              </div>
            </div>

            <p class="scr__sectionLabel">Core modules</p>
            <div class="scr__grid">
              <div class="scr__tile"><span class="scr__tileIcon">▤</span>Khatabook</div>
              <div class="scr__tile"><span class="scr__tileIcon">◈</span>Pawn Loans</div>
              <div class="scr__tile"><span class="scr__tileIcon">◆</span>Jewellery</div>
              <div class="scr__tile"><span class="scr__tileIcon">▦</span>Cashbook</div>
            </div>

            <div class="scr__row">
              <span class="scr__rowIcon">◷</span>
              <span class="scr__rowText">Reports<small>Khata &amp; pawn</small></span>
              <span class="scr__rowChev">›</span>
            </div>
          </div>

          <!-- FAB (always on) -->
          <button class="scr__fab" tabindex="-1" aria-hidden="true">+</button>

          <!-- snackbar overlay -->
          <div v-if="isVisible(dataset.regions.find(r => r.id === 'snackbar')!)" class="scr__snack">
            <span>Collection saved</span>
            <b>UNDO</b>
          </div>

          <!-- bottom sheet overlay -->
          <div v-if="isVisible(dataset.regions.find(r => r.id === 'bottom-sheet')!)" class="scr__sheet">
            <span class="scr__grabber" />
            <p class="scr__sheetTitle">Ramesh Verma</p>
            <div class="scr__sheetRows">
              <span>Collect</span><span>Refinance</span><span>Add loan</span>
            </div>
          </div>

          <!-- bottom nav -->
          <div class="scr__nav">
            <div class="scr__navitem scr__navitem--on"><span>⌂</span>Home</div>
            <div class="scr__navitem"><span>▤</span>Khata</div>
            <div class="scr__navitem"><span>◈</span>Pawn</div>
            <div class="scr__navitem"><span>◷</span>Reports</div>
          </div>

          <!-- system nav -->
          <div class="scr__sysnav"><span class="scr__pill" /></div>
        </div>

        <!-- ── Region hit areas, driven entirely by the dataset ──────────── -->
        <button
          v-for="r in regions"
          :key="r.id"
          class="region"
          :class="{
            'region--selected': selected === r.id,
            // A tag pinned to the left of a region that hugs the right edge gets
            // clipped by the phone's overflow, so flip it to the right side.
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
