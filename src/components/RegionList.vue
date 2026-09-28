<script setup lang="ts">
import { computed } from 'vue'
import { CATEGORIES, type CategoryId, type Region, type Screen } from '../data/types'

const props = defineProps<{
  screen: Screen
  selected: string | null
  revealed: string[]
  /** null = show every category. */
  filter: CategoryId | null
}>()

const emit = defineEmits<{ select: [string]; filter: [CategoryId | null] }>()

/** Groups the screen's own regions by the taxonomy, skipping empty groups. */
const groups = computed(() =>
  CATEGORIES.map((c) => ({
    ...c,
    items: props.screen.regions.filter(
      (r) => r.category === c.id && (props.filter === null || props.filter === c.id),
    ),
  })).filter((g) => g.items.length > 0),
)

const total = computed(() => props.screen.regions.length)

function isOverlay(r: Region) {
  return r.overlay && r.id !== 'drag-delete'
}
</script>

<template>
  <nav class="legend" aria-label="Regions on this screen">
    <div class="legend__filter">
      <button
        class="legend__fbtn"
        :class="{ 'legend__fbtn--on': filter === null }"
        @click="emit('filter', null)"
      >
        All <span>{{ total }}</span>
      </button>
      <button
        v-for="c in CATEGORIES"
        :key="c.id"
        class="legend__fbtn"
        :class="{ 'legend__fbtn--on': filter === c.id }"
        :title="c.hint"
        :disabled="!screen.regions.some((r) => r.category === c.id)"
        @click="emit('filter', c.id)"
      >
        {{ c.label }}
      </button>
    </div>

    <p v-if="filter" class="legend__hint">
      {{ CATEGORIES.find((c) => c.id === filter)?.hint }}
    </p>

    <div v-for="g in groups" :key="g.id" class="legend__group">
      <h3 class="legend__cat">{{ g.label }}</h3>
      <ol class="legend__list">
        <li v-for="r in g.items" :key="r.id">
          <button
            class="legend__item"
            :class="{ 'legend__item--on': selected === r.id }"
            :aria-current="selected === r.id"
            @click="emit('select', r.id)"
          >
            <span class="legend__name">
              {{ r.label }}
              <span
                v-if="isOverlay(r)"
                class="legend__badge"
                :class="{ 'legend__badge--on': revealed.includes(r.id) }"
              >
                {{ revealed.includes(r.id) ? 'shown' : 'hidden' }}
              </span>
            </span>
            <span class="legend__blurb">{{ r.blurb }}</span>
            <span v-if="r.widget" class="legend__widget">{{ r.widget }}</span>
          </button>
        </li>
      </ol>
    </div>
  </nav>
</template>
