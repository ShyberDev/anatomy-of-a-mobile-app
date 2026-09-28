<script setup lang="ts">
import type { Region, RegionId } from '../data/types'

defineProps<{
  regions: Region[]
  selected: RegionId | null
  revealed: RegionId[]
}>()

const emit = defineEmits<{ select: [RegionId] }>()

/** Overlays start hidden; listing them tells the user they can be summoned. */
function isOverlay(r: Region) {
  return r.overlay && r.id !== 'fab'
}
</script>

<template>
  <nav class="legend" aria-label="Anatomy regions">
    <ol class="legend__list">
      <li v-for="r in regions" :key="r.id">
        <button
          class="legend__item"
          :class="{ 'legend__item--on': selected === r.id }"
          :aria-current="selected === r.id"
          @click="emit('select', r.id)"
        >
          <span class="legend__name">
            {{ r.label }}
            <span v-if="isOverlay(r)" class="legend__badge" :class="{ 'legend__badge--on': revealed.includes(r.id) }">
              {{ revealed.includes(r.id) ? 'shown' : 'hidden' }}
            </span>
          </span>
          <span class="legend__blurb">{{ r.blurb }}</span>
          <span class="legend__owner" :data-owner="r.owner">{{ r.owner }}</span>
        </button>
      </li>
    </ol>
  </nav>
</template>
