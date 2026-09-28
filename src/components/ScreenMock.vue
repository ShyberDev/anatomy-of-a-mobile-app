<script setup lang="ts">
import type { Screen, Tone } from '../data/types'

/**
 * Renders a screen's `blocks` into the phone mock.
 *
 * This is the only component that knows what a block looks like. Adding a
 * screen is a data edit; adding a *kind* of block is a case here. Styling comes
 * from CSS custom properties set by the parent from `Dataset.theme`, so the
 * Jewellery Suite screens paint with their real palette rather than looking like
 * generic Material.
 */
defineProps<{ screen: Screen }>()
defineEmits<{ pick: [string] }>()

function toneClass(t?: Tone) {
  return t && t !== 'neutral' ? `t-${t}` : ''
}
</script>

<template>
  <div class="scr" :data-screen="screen.id">
    <template v-for="(b, i) in screen.blocks" :key="i">
      <!-- ── system ─────────────────────────────────────────────────── -->
      <div v-if="b.kind === 'statusbar'" class="m-status">
        <span>{{ (b as any).time }}</span>
        <span class="m-status__icons">
          <svg width="15" height="10" viewBox="0 0 17 11" fill="currentColor" aria-hidden="true">
            <rect x="0" y="7" width="3" height="4" rx="1" /><rect x="4.5" y="5" width="3" height="6" rx="1" />
            <rect x="9" y="2.5" width="3" height="8.5" rx="1" /><rect x="13.5" y="0" width="3" height="11" rx="1" opacity=".3" />
          </svg>
          <span class="m-status__pct">100%</span>
          <svg width="22" height="11" viewBox="0 0 25 12" aria-hidden="true">
            <rect x=".5" y=".5" width="21" height="11" rx="3" fill="none" stroke="currentColor" opacity=".45" />
            <rect x="2" y="2" width="18" height="8" rx="1.6" fill="currentColor" />
            <path d="M23 4v4a2.2 2.2 0 0 0 0-4Z" fill="currentColor" opacity=".45" />
          </svg>
        </span>
      </div>

      <div v-else-if="b.kind === 'sysnav'" class="m-sysnav"><span /></div>

      <!-- ── navigation ──────────────────────────────────────────────── -->
      <div v-else-if="b.kind === 'appbar'" class="m-appbar">
        <span class="m-appbar__lead">
          <svg v-if="b.leading === 'back'" width="16" height="16" viewBox="0 0 16 16" fill="none"
               stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M10 3 5 8l5 5" />
          </svg>
          <svg v-else-if="b.leading === 'menu'" width="16" height="16" viewBox="0 0 18 18" stroke="currentColor"
               stroke-width="1.7" stroke-linecap="round" aria-hidden="true">
            <path d="M2.5 4.5h13M2.5 9h13M2.5 13.5h13" />
          </svg>
        </span>
        <span class="m-appbar__title">{{ (b as any).title }}</span>
        <span class="m-appbar__actions">
          <span v-for="(a, k) in (b as any).actions ?? []" :key="k" class="m-appbar__act">{{ a }}</span>
        </span>
      </div>

      <div v-else-if="b.kind === 'navbar'" class="m-navbar">
        <div
          v-for="(it, k) in (b as any).items"
          :key="k"
          class="m-navbar__item"
          :class="{ 'm-navbar__item--on': k === (b as any).active }"
        >
          <span class="m-navbar__icon">{{ it.icon }}</span>
          <span class="m-navbar__label">{{ it.label }}</span>
        </div>
      </div>

      <div v-else-if="b.kind === 'drawer'" class="m-drawer">
        <div class="m-drawer__head">
          <span class="m-drawer__avatar">◈</span>
          <span class="m-drawer__id">
            <b>Jewellery Suite</b>
            <small>Version 1.0.9 • user details</small>
          </span>
        </div>
        <div v-for="(sec, k) in (b as any).sections" :key="k" class="m-drawer__sec">
          <p class="m-drawer__label">{{ sec.label }}</p>
          <div
            v-for="(row, j) in sec.items"
            :key="j"
            class="m-drawer__row"
            :class="toneClass(row.tone)"
          >
            <span class="m-drawer__ico">{{ row.icon }}</span>
            <span class="m-drawer__txt">
              <b>{{ row.label }}</b>
              <small v-if="row.sub">{{ row.sub }}</small>
            </span>
            <span v-if="row.tone !== 'red'" class="m-drawer__chev">›</span>
          </div>
        </div>
      </div>

      <!-- ── header ──────────────────────────────────────────────────── -->
      <div v-else-if="b.kind === 'headerRow'" class="m-header">
        <span class="m-header__avatar">{{ (b as any).avatar ?? '⌂' }}</span>
        <span class="m-header__txt">
          <b>{{ (b as any).title }}</b>
          <small v-if="(b as any).subtitle">{{ (b as any).subtitle }}</small>
        </span>
        <span v-if="(b as any).badge" class="m-header__badge">{{ (b as any).badge }}</span>
        <span v-if="(b as any).trailing === 'sync'" class="m-header__sync">⟳</span>
      </div>

      <p v-else-if="b.kind === 'sectionTitle'" class="m-section">{{ (b as any).text }}</p>

      <!-- ── metrics ─────────────────────────────────────────────────── -->
      <div v-else-if="b.kind === 'kpiGrid'" class="m-kpis" :style="{ '--cols': (b as any).cols }">
        <div
          v-for="(it, k) in (b as any).items"
          :key="k"
          class="m-kpi"
          :class="toneClass(it.tone)"
        >
          <span v-if="it.icon" class="m-kpi__ico">{{ it.icon }}</span>
          <span class="m-kpi__txt">
            <b>{{ it.value }}</b>
            <small>{{ it.label }}</small>
          </span>
        </div>
      </div>

      <div v-else-if="b.kind === 'hero'" class="m-hero">
        <p class="m-hero__label">{{ (b as any).title }}</p>
        <p class="m-hero__value">{{ (b as any).value }}</p>
        <div v-if="(b as any).stats" class="m-hero__stats">
          <div v-for="(s, k) in (b as any).stats" :key="k">
            <b>{{ s.value }}</b>
            <small>{{ s.label }}</small>
          </div>
        </div>
      </div>

      <!-- ── containment ─────────────────────────────────────────────── -->
      <div
        v-else-if="b.kind === 'tileGrid'"
        class="m-tiles"
        :class="`m-tiles--${(b as any).variant ?? 'module'}`"
        :style="{ '--cols': (b as any).cols }"
      >
        <div v-for="(it, k) in (b as any).items" :key="k" class="m-tile">
          <span class="m-tile__disc">{{ it.icon }}</span>
          <b>{{ it.label }}</b>
          <small v-if="it.sub">{{ it.sub }}</small>
        </div>
      </div>

      <div
        v-else-if="b.kind === 'rows'"
        class="m-rows"
        :class="`m-rows--${(b as any).variant ?? 'list'}`"
      >
        <div
          v-for="(it, k) in (b as any).items"
          :key="k"
          class="m-row"
          :class="[toneClass(it.tone), { 'm-row--stacked': it.bar != null || it.chip }]"
        >
          <span v-if="it.icon" class="m-row__disc">{{ it.icon }}</span>
          <span class="m-row__txt">
            <b>{{ it.title }}</b>
            <small v-if="it.subtitle">{{ it.subtitle }}</small>
            <span v-if="it.bar != null" class="m-row__bar">
              <i :style="{ width: `${Math.round(it.bar * 100)}%` }" />
            </span>
          </span>
          <span class="m-row__right">
            <span v-if="it.trailing" class="m-row__trail">{{ it.trailing }}</span>
            <span v-if="it.chip" class="m-row__chip" :class="toneClass(it.tone)">{{ it.chip }}</span>
          </span>
          <span v-if="!it.trailing && !it.chip" class="m-row__chev">›</span>
        </div>
      </div>

      <div v-else-if="b.kind === 'ledger'" class="m-ledger">
        <div class="m-ledger__head">
          <span />
          <span class="t-red">{{ (b as any).headers[0] }}</span>
          <span class="t-green">{{ (b as any).headers[1] }}</span>
        </div>
        <div
          v-for="(r, k) in (b as any).rows"
          :key="k"
          class="m-ledger__row"
          :class="`m-ledger__row--${r.kind}`"
        >
          <div class="m-ledger__line">
            <span class="m-ledger__stamp">
              <i v-if="r.kind === 'refinance'">⟲</i>{{ r.stamp }}
            </span>
            <span v-if="r.gave" class="m-ledger__gave">{{ r.gave }}</span>
            <span v-if="r.got" class="m-ledger__got">{{ r.got }}</span>
          </div>
          <small class="m-ledger__bal">bal {{ r.bal }}</small>
          <em v-if="r.note">{{ r.note }}</em>
        </div>
      </div>

      <!-- ── selection & inputs ──────────────────────────────────────── -->
      <div v-else-if="b.kind === 'chips'" class="m-chips">
        <span
          v-for="(c, k) in (b as any).items"
          :key="k"
          class="m-chip"
          :class="{ 'm-chip--on': c.selected, [toneClass(c.tone)]: true }"
        >{{ c.label }}</span>
      </div>

      <div v-else-if="b.kind === 'search'" class="m-search">
        <span class="m-search__ico">⌕</span>
        <span class="m-search__ph">{{ (b as any).placeholder }}</span>
      </div>

      <div v-else-if="b.kind === 'fieldRow'" class="m-field">
        <span class="m-field__ico">{{ (b as any).input === 'date' ? '▤' : '▭' }}</span>
        <span>{{ (b as any).label }}</span>
        <span class="m-field__chev">›</span>
      </div>

      <div v-else-if="b.kind === 'pill'" class="m-pill" :class="toneClass((b as any).tone)">
        {{ (b as any).text }}
      </div>

      <!-- ── actions & overlays ──────────────────────────────────────── -->
      <div v-else-if="b.kind === 'fab'" class="m-fab" :class="`m-fab--${(b as any).variant ?? 'fab'}`">
        <span v-if="(b as any).icon" class="m-fab__ico">{{ (b as any).icon }}</span>
        <span>{{ (b as any).label }}</span>
      </div>

      <div v-else-if="b.kind === 'actionBar'" class="m-actionbar">
        <span
          v-for="(a, k) in (b as any).items"
          :key="k"
          class="m-action"
          :class="[a.filled ? 'm-action--filled' : 'm-action--outlined', toneClass(a.tone)]"
        >
          <i>{{ a.icon }}</i>{{ a.label }}
        </span>
      </div>

      <div v-else-if="b.kind === 'snackbar'" class="m-snack">
        <span>{{ (b as any).text }}</span>
        <b v-if="(b as any).action">{{ (b as any).action }}</b>
      </div>

      <div v-else-if="b.kind === 'sheet'" class="m-sheet">
        <span class="m-sheet__grab" />
        <p class="m-sheet__title">{{ (b as any).title }}</p>
        <div class="m-sheet__rows">
          <span v-for="(s, k) in (b as any).items" :key="k">{{ s }}</span>
        </div>
      </div>

      <div v-else-if="b.kind === 'spacer'" class="m-spacer" :style="{ height: `${(b as any).h}px` }" />
    </template>
  </div>
</template>
