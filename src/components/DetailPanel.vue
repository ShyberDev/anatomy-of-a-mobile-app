<script setup lang="ts">
import type { Region } from '../data/types'

defineProps<{ region: Region | null }>()
</script>

<template>
  <aside class="panel" aria-live="polite">
    <template v-if="region">
      <header class="panel__head">
        <div class="panel__meta">
          <span class="panel__owner" :data-owner="region.owner">{{ region.owner }} owned</span>
          <span class="panel__id">{{ region.id }}</span>
        </div>
        <h2 class="panel__title">{{ region.label }}</h2>
        <p class="panel__blurb">{{ region.blurb }}</p>
      </header>

      <div class="panel__body">
        <p v-for="(para, i) in region.detail" :key="i" class="panel__para">{{ para }}</p>
      </div>

      <section v-if="region.equivalents" class="panel__section">
        <h3 class="panel__h3">Build it with</h3>
        <dl class="panel__dl">
          <template v-for="(val, k) in region.equivalents" :key="k">
            <dt v-if="val">{{ k }}</dt>
            <dd v-if="val">{{ val }}</dd>
          </template>
        </dl>
      </section>

      <section v-if="region.appNotes?.length" class="panel__section">
        <h3 class="panel__h3">In this app</h3>
        <ul class="panel__list">
          <li v-for="(note, i) in region.appNotes" :key="i">{{ note }}</li>
        </ul>
      </section>
    </template>

    <div v-else class="panel__empty">
      <span class="panel__emptyIcon" aria-hidden="true">☝</span>
      <p class="panel__emptyTitle">Pick a region</p>
      <p class="panel__emptyHint">
        Click any part of the phone — the status bar, the app bar, a card, the
        floating button — or choose one from the list.
      </p>
    </div>
  </aside>
</template>
