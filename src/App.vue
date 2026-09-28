<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { universal } from './data/universal'
import { jewellery } from './data/jewellery'
import type { Dataset, RegionId } from './data/types'
import PhoneFrame from './components/PhoneFrame.vue'
import RegionList from './components/RegionList.vue'
import DetailPanel from './components/DetailPanel.vue'

const datasets: Dataset[] = [universal, jewellery]

const active = ref<Dataset['key']>('universal')
const selected = ref<RegionId | null>(null)
/** Overlays the user has summoned. Reset when the dataset changes. */
const revealed = ref<RegionId[]>([])

const dataset = computed(() => datasets.find((d) => d.key === active.value)!)
const region = computed(
  () => dataset.value.regions.find((r) => r.id === selected.value) ?? null,
)

function select(id: RegionId) {
  // Selecting a hidden overlay reveals it — otherwise clicking the legend entry
  // for a snackbar would appear to do nothing at all.
  if (id === 'snackbar' || id === 'bottom-sheet') {
    if (!revealed.value.includes(id)) revealed.value = [...revealed.value, id]
  }
  selected.value = selected.value === id ? null : id
}

watch(active, () => {
  selected.value = null
  revealed.value = []
})

const theme = ref<'light' | 'dark'>('dark')
watch(
  theme,
  (t) => document.documentElement.setAttribute('data-theme', t),
  { immediate: true },
)
</script>

<template>
  <div class="app">
    <header class="app__bar">
      <div class="app__brand">
        <h1 class="app__title">Anatomy of a Mobile App</h1>
        <p class="app__tagline">
          The ten regions every screen is made of — and how they land in a real app.
        </p>
      </div>

      <div class="app__controls">
        <div class="switch" role="tablist" aria-label="Dataset">
          <button
            v-for="d in datasets"
            :key="d.key"
            class="switch__btn"
            :class="{ 'switch__btn--on': active === d.key }"
            role="tab"
            :aria-selected="active === d.key"
            @click="active = d.key"
          >
            {{ d.key === 'universal' ? 'Universal' : 'Jewellery Suite' }}
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

    <p class="app__datasetSub">{{ dataset.subtitle }}</p>

    <main class="app__main">
      <section class="stage">
        <p class="stage__caption">
          <span class="stage__captionLabel">Simulating</span>
          {{ dataset.screenName }}
        </p>
        <PhoneFrame
          :dataset="dataset"
          :selected="selected"
          :revealed="revealed"
          @select="select"
        />
      </section>

      <RegionList
        :regions="dataset.regions"
        :selected="selected"
        :revealed="revealed"
        @select="select"
      />

      <DetailPanel :region="region" />
    </main>

    <footer class="app__foot">
      <p>Anatomy of a Mobile App · MIT licensed</p>
    </footer>
  </div>
</template>
