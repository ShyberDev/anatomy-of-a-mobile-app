<script setup lang="ts">
import { computed } from 'vue'
import { CATEGORIES, type CategoryId } from '../data/types'
import type { Figures, Level, Level1Entry, Level2Entry, Level3Entry } from '../data/levels'
import Figure from './Figure.vue'

/**
 * Renders one entry from any of the three levels, plus the shared
 * do/don't guidance block that every entry carries.
 */
const props = defineProps<{
  level: Level
  entry: Level1Entry | Level2Entry | Level3Entry | null
}>()

const emit = defineEmits<{ pick: [string] }>()

const cat = computed<CategoryId | null>(() => {
  const e = props.entry
  if (!e) return null
  if ('category' in e && e.category !== 'platform') return e.category as CategoryId
  return null
})

const catLabel = computed(
  () => CATEGORIES.find((c) => c.id === cat.value)?.label ?? null,
)

const builds = computed(() => {
  const e = props.entry
  return e && 'builds' in e ? (e.builds as string[]) : null
})

/** Diagrams, when the entry has them. */
const figs = computed(() => (props.entry as { figs?: Figures })?.figs)
</script>

<template>
  <aside class="panel" aria-live="polite">
    <template v-if="entry">
      <header class="panel__head">
        <div class="panel__meta">
          <span class="panel__tag">Level {{ level.n }}</span>
          <span v-if="catLabel" class="panel__cat">{{ catLabel }}</span>
        </div>
        <h2 class="panel__title">{{ entry.label }}</h2>
        <p v-if="'widget' in entry" class="panel__widget">{{ (entry as Level2Entry).widget }}</p>
        <p class="panel__blurb">{{ entry.blurb }}</p>
      </header>

      <p v-if="'purpose' in entry" class="panel__lead">
        <b>Why it exists.</b> {{ (entry as Level1Entry).purpose }}
      </p>
      <p v-else-if="'whenToUse' in entry" class="panel__lead">
        <b>When to use it.</b> {{ (entry as Level2Entry).whenToUse }}
      </p>
      <p v-else-if="entry" class="panel__lead">
        <b>What it solves.</b> {{ (entry as Level3Entry).solves }}
      </p>

      <p v-if="builds" class="panel__lead">
        <b>Built from.</b>
        <button v-for="b in builds" :key="b" class="panel__chip" @click="emit('pick', b)">
          {{ b }}
        </button>
      </p>

      <div v-if="entry && 'source' in entry && (entry as any).source" class="panel__source">
        <span class="panel__sourceLabel">In the code</span>
        <code>{{ (entry as any).source }}</code>
      </div>

      <div class="panel__guide" :class="{ 'panel__guide--single': !entry.guidance.dont.length }">
        <section v-if="entry.guidance.do.length" class="panel__do">
          <h3 class="panel__h3">Do</h3>
          <figure v-if="figs?.do" class="panel__fig">
            <Figure :fig="figs.do" />
          </figure>
          <ul>
            <li v-for="(d, i) in entry.guidance.do" :key="i">{{ d }}</li>
          </ul>
        </section>
        <section v-if="entry.guidance.dont.length" class="panel__dont">
          <h3 class="panel__h3">Don't</h3>
          <figure v-if="figs?.dont" class="panel__fig">
            <Figure :fig="figs.dont" />
          </figure>
          <ul>
            <li v-for="(d, i) in entry.guidance.dont" :key="i">{{ d }}</li>
          </ul>
        </section>
      </div>

      <div v-if="entry && 'notes' in entry && (entry as any).notes?.length" class="panel__notes">
        <h3 class="panel__h3">Worth checking</h3>
        <ul>
          <li v-for="(n, i) in (entry as any).notes" :key="i">{{ n }}</li>
        </ul>
      </div>

      <slot name="extra" />
    </template>

    <div v-else class="panel__empty">
      <span class="panel__emptyIcon" aria-hidden="true">☝</span>
      <p class="panel__emptyTitle">Pick something</p>
      <p class="panel__emptyHint">
        Click a part of the phone, choose an entry from the list, or filter by
        Material category to see one group at a time.
      </p>
    </div>
  </aside>
</template>
