<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { universal } from './data/universal'
import { jewellery } from './data/jewellery'
import { level1, level2 } from './data/level1-2'
import { level3 } from './data/level3'
import { CATEGORIES, type CategoryId, type Region } from './data/types'
import type { Level1Entry, Level2Entry, Level3Entry } from './data/levels'
import PhoneFrame from './components/PhoneFrame.vue'
import RegionList from './components/RegionList.vue'
import DetailPanel from './components/DetailPanel.vue'
import NavBreakdown from './components/NavBreakdown.vue'

type Mode = 'learn' | 'app'
type Tab = 1 | 2 | 3

const mode = ref<Mode>('learn')
const dataset = computed(() => (mode.value === 'learn' ? universal : jewellery))

/* ── Learn mode: three levels, a category filter and an entry list ─────── */
const tab = ref<Tab>(1)
const level = computed(() => (tab.value === 1 ? level1 : tab.value === 2 ? level2 : level3))
const entryId = ref<string | null>(null)
const catFilter = ref<CategoryId | null>(null)

const entries = computed(() => {
  const all = level.value.entries as (Level1Entry | Level2Entry | Level3Entry)[]
  const filtered = catFilter.value
    ? all.filter((e) => 'category' in e && e.category === catFilter.value)
    : all
  return filtered
})

const entry = computed(
  () => entries.value.find((e) => e.id === entryId.value) ?? null,
)

/**
 * Which region the phone should highlight.
 *
 * A Level 1 or 2 entry highlights its own region — the generic screen names
 * regions after components for exactly this reason. A Level 3 pattern has no
 * single region, so it highlights the regions of the components it is built
 * from, which is the point of showing patterns at all.
 */
const learnRegion = computed<string | null>(() => {
  const e = entry.value
  if (!e) return null
  // Only Level 3 entries carry `builds`, and that is the one structural
  // difference — so test for it rather than probing optional fields, which are
  // absent at runtime and make `in` unreliable.
  if ('builds' in e) return e.builds[0] ?? null
  return (e as Level1Entry).region ?? e.id
})

/** Overlay regions get revealed when their entry is selected. */
const learnRevealed = computed(() => {
  const id = learnRegion.value
  if (!id) return []
  const r = universal.screens[0].regions.find((x) => x.id === id)
  return r?.overlay ? [id] : []
})

const learnCaption = computed(() => {
  const id = learnRegion.value
  if (!id) return 'pick an entry — the part highlights here'
  const r = universal.screens[0].regions.find((x) => x.id === id)
  return r ? `${r.label} highlighted` : 'pick an entry'
})

/** Clicking a region on the generic screen jumps to the entry that explains it. */
function selectLearnRegion(id: string) {
  const match = (level.value.entries as (Level1Entry | Level2Entry | Level3Entry)[]).find(
    (e) => (e as Level1Entry).region === id || e.id === id,
  )
  if (match) {
    entryId.value = entryId.value === match.id ? null : match.id
  } else {
    entryId.value = null
  }
}

/** Jump straight to a component from a pattern's "built from" chips. */
function pickComponent(id: string) {
  tab.value = 2
  entryId.value = id
}

watch([tab, mode], () => {
  entryId.value = null
  catFilter.value = null
})

/* ── App mode: screens, regions, a font scale and a category filter ───── */
const screenId = ref(jewellery.screens[0].id)
const screen = computed(
  () => jewellery.screens.find((s) => s.id === screenId.value) ?? jewellery.screens[0],
)
const selected = ref<string | null>(null)
const revealed = ref<string[]>([])
const appFilter = ref<CategoryId | null>(null)
/** Matches app.dart's persisted clamp of 0.7–1.9. */
const scale = ref(1)

const region = computed<Region | null>(
  () => screen.value.regions.find((r) => r.id === selected.value) ?? null,
)

function selectRegion(id: string) {
  // Selecting a hidden overlay reveals it — otherwise clicking its legend entry
  // would appear to do nothing. Keyed off the data's own `overlay` flag rather
  // than name-matching ids, which silently misses ones like 'payment-schedule'.
  const r = screen.value.regions.find((x) => x.id === id)
  if (r?.overlay && !revealed.value.includes(id)) {
    revealed.value = [...revealed.value, id]
  }
  selected.value = selected.value === id ? null : id
}

watch([mode, screenId], () => {
  selected.value = null
  revealed.value = []
  appFilter.value = null
})

const theme = ref<'light' | 'dark'>('dark')
watch(theme, (t) => document.documentElement.setAttribute('data-theme', t), { immediate: true })

/** Adapt a screen region into the shape DetailPanel renders. */
function toEntry(r: Region): Level1Entry {
  return {
    id: r.id,
    label: r.label,
    category: r.category,
    owner: r.owner,
    blurb: r.blurb,
    purpose: r.detail.join(' '),
    guidance: { do: r.notes ?? [], dont: [] },
  }
}

/** Screens that carry a review-worthy note, for the review checklist. */
const flagged = computed(() =>
  jewellery.screens
    .map((s) => ({
      screen: s,
      count: s.regions.filter((r) => r.notes?.length).length,
    }))
    .filter((x) => x.count > 0),
)
</script>

<template>
  <div class="app">
    <header class="app__bar">
      <div class="app__brand">
        <h1 class="app__title">Anatomy of a Mobile App</h1>
        <p class="app__tagline">
          Learn the vocabulary on a new app, then check your own against it.
        </p>
      </div>

      <div class="app__controls">
        <div class="switch" role="tablist" aria-label="Mode">
          <button
            class="switch__btn"
            :class="{ 'switch__btn--on': mode === 'learn' }"
            role="tab"
            :aria-selected="mode === 'learn'"
            @click="mode = 'learn'"
          >
            Learn
          </button>
          <button
            class="switch__btn"
            :class="{ 'switch__btn--on': mode === 'app' }"
            role="tab"
            :aria-selected="mode === 'app'"
            @click="mode = 'app'"
          >
            Jewellery Suite
          </button>
        </div>
        <button
          class="themebtn"
          :aria-label="`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`"
          @click="theme = theme === 'dark' ? 'light' : 'dark'"
        >
          {{ theme === 'dark' ? '☀' : '☾' }}
        </button>
      </div>
    </header>

    <!-- ── Learn mode ──────────────────────────────────────────────── -->
    <template v-if="mode === 'learn'">
      <nav class="levels" aria-label="Learning level">
        <button
          v-for="l in [level1, level2, level3]"
          :key="l.n"
          class="levels__btn"
          :class="{ 'levels__btn--on': tab === l.n }"
          @click="tab = l.n as Tab"
        >
          <span class="levels__n">Level {{ l.n }}</span>
          <span class="levels__t">{{ l.title }}</span>
        </button>
      </nav>

      <p class="app__datasetSub">{{ level.subtitle }}</p>

      <div class="app__filter">
        <button
          class="fchip"
          :class="{ 'fchip--on': catFilter === null }"
          @click="catFilter = null"
        >
          All
        </button>
        <button
          v-for="c in CATEGORIES"
          :key="c.id"
          class="fchip"
          :class="{ 'fchip--on': catFilter === c.id }"
          :title="c.hint"
          :disabled="!level.entries.some((e) => 'category' in e && e.category === c.id)"
          @click="catFilter = c.id"
        >
          {{ c.label }}
        </button>
      </div>

      <main class="app__main app__main--learn">
        <section class="stage">
          <p class="stage__caption">
            <template v-if="tab === 3">
              <span class="stage__captionLabel">Level 3 pattern</span>
              {{ entry?.label ?? 'assembled parts' }}
            </template>
            <template v-else>
              <span class="stage__captionLabel">{{ learnCaption }}</span>
            </template>
          </p>
          <PhoneFrame
            :dataset="dataset"
            :screen="dataset.screens[0]"
            :selected="learnRegion"
            :revealed="learnRevealed"
            :scale="1"
            @select="selectLearnRegion"
          />
        </section>

        <nav class="legend" aria-label="Entries">
          <ol class="legend__list">
            <li v-for="e in entries" :key="e.id">
              <button
                class="legend__item"
                :class="{ 'legend__item--on': entryId === e.id }"
                :aria-current="entryId === e.id"
                @click="entryId = entryId === e.id ? null : e.id"
              >
                <span class="legend__name">{{ e.label }}</span>
                <span class="legend__blurb">{{ e.blurb }}</span>
                <span v-if="'widget' in e" class="legend__widget">{{ (e as Level2Entry).widget }}</span>
              </button>
            </li>
          </ol>
        </nav>

        <DetailPanel :level="level" :entry="entry" @pick="pickComponent">
          <template #extra>
            <!-- The pattern entry explains the rule; this answers what to do
                 with the bar you actually have in front of you. -->
            <NavBreakdown v-if="entry?.id === 'bottom-nav' && tab === 3" :screen="dataset.screens[0]" />
          </template>
        </DetailPanel>
      </main>
    </template>

    <!-- ── App mode ────────────────────────────────────────────────── -->
    <template v-else>
      <p class="app__datasetSub">{{ dataset.subtitle }}</p>

      <nav class="screens" aria-label="Screens">
        <button
          v-for="s in jewellery.screens"
          :key="s.id"
          class="screens__btn"
          :class="{ 'screens__btn--on': screenId === s.id }"
          @click="screenId = s.id"
        >
          {{ s.name }}
        </button>
      </nav>

      <p class="app__screenMeta">
        <code>{{ screen.file }}</code>
        <span class="app__screenSum">{{ screen.summary }}</span>
      </p>

      <main class="app__main">
        <section class="stage">
          <p class="stage__caption">
            <span class="stage__captionLabel">{{ screen.name }}</span>
          </p>
          <PhoneFrame
            :dataset="dataset"
            :screen="screen"
            :selected="selected"
            :revealed="revealed"
            :scale="scale"
            @select="selectRegion"
          />
          <div class="scale">
            <label for="scale">Text size</label>
            <input
              id="scale"
              v-model.number="scale"
              type="range"
              min="0.7"
              max="1.9"
              step="0.1"
            />
            <output>{{ scale.toFixed(1) }}×</output>
          </div>
        </section>

        <RegionList
          :screen="screen"
          :selected="selected"
          :revealed="revealed"
          :filter="appFilter"
          @select="selectRegion"
          @filter="appFilter = $event"
        />

        <!-- A region is not a Level 1 entry, so the panel gets a small adapter
             rather than the level types being widened to fit both. -->
        <DetailPanel :level="level1" :entry="region ? toEntry(region) : null" />
      </main>

      <section v-if="flagged.length" class="review">
        <h2 class="review__h">Worth a look</h2>
        <p class="review__sub">
          Inconsistencies and rough edges found while transcribing these screens
          from the Dart source. Not bugs — decisions worth a second look.
        </p>
        <ul class="review__list">
          <li v-for="f in flagged" :key="f.screen.id">
            <button @click="screenId = f.screen.id">
              <span class="review__screen">{{ f.screen.name }}</span>
              <span class="review__count">{{ f.count }}</span>
            </button>
          </li>
        </ul>
      </section>
    </template>

    <footer class="app__foot">
      <p>Anatomy of a Mobile App · MIT licensed</p>
    </footer>
  </div>
</template>
