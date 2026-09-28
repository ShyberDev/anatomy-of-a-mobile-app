<script setup lang="ts">
import { computed } from 'vue'
import type { Screen } from '../data/types'

/**
 * Breaks one screen's bottom navigation down item by item.
 *
 * The pattern entry says "3–5 peers, label them all". That is correct and
 * useless when you are actually adding or removing a tab at 6pm. This answers
 * the question the pattern entry raises: what is in this bar, what is each
 * destination called, and what happens if I add or remove one.
 */
const props = defineProps<{ screen: Screen }>()

interface NavRow {
  label: string
  icon: string
  active: boolean
  /** Is this a genuine top-level peer, or something that slipped in? */
  role: 'peer' | 'sub-screen' | 'action'
  /** What this destination is, in one line. */
  is: string
  /** What happens to the app if it is removed. */
  ifRemoved: string
  /** What to check before adding one. */
  ifAdded: string
}

const NAV: NavRow[] = [
  {
    label: 'Home',
    icon: '⌂',
    active: true,
    role: 'peer',
    is: 'The root. A dashboard or launcher — the answer to "where am I?" on open.',
    ifRemoved:
      'The app has no entry point. Every other destination becomes unreachable except by deep link.',
    ifAdded:
      'Nothing — every app needs one. It is the only destination that should exist from day one.',
  },
  {
    label: 'Records',
    icon: '▤',
    active: false,
    role: 'peer',
    is: 'One top-level domain — a list of things, with its own filters and search.',
    ifRemoved:
      'The domain becomes a drawer row or a sub-screen of another tab, one level deeper than it deserves.',
    ifAdded:
      'Ask whether it is a peer of the existing tabs or a screen inside one. If the latter, it is a list row, not a tab.',
  },
  {
    label: 'Items',
    icon: '◈',
    active: false,
    role: 'peer',
    is: 'A second domain of the same kind as Records — not a mode, not a filter of Records.',
    ifRemoved:
      'Fine, if the content genuinely folds into another tab as a filter chip or a segment.',
    ifAdded:
      'Two tabs showing the same entities with different filters is a bug, not a design. Use segments.',
  },
  {
    label: 'Reports',
    icon: '◷',
    active: false,
    role: 'peer',
    is: 'Read-only analysis across the other domains. Nothing here writes data.',
    ifRemoved:
      'Analytics become unreachable on the phone, which usually means the user stops noticing them.',
    ifAdded:
      'If it only shows figures for one other tab, it is a detail screen, not a top-level peer.',
  },
]

const rows = computed(() => NAV)

const roleLabel: Record<NavRow['role'], string> = {
  peer: 'Top-level peer',
  'sub-screen': 'Sub-screen — belongs in a tab',
  action: 'Action — belongs on a screen',
}
</script>

<template>
  <section class="navdetail">
    <header class="navdetail__head">
      <h3 class="navdetail__h">What is in this bottom bar</h3>
      <p class="navdetail__sub">
        Every item is a <b>peer</b>: a top-level place, not a tool and not a screen
        inside another tab. A row that is really a sub-screen or a one-off action
        does not belong here — it belongs in a list, a drawer, or on the screen it
        affects.
      </p>
    </header>

    <ol class="navdetail__list">
      <li v-for="r in rows" :key="r.label" class="navrow" :class="{ 'navrow--on': r.active }">
        <div class="navrow__top">
          <span class="navrow__icon">{{ r.icon }}</span>
          <span class="navrow__label">{{ r.label }}</span>
          <span class="navrow__role" :data-role="r.role">{{ roleLabel[r.role] }}</span>
          <span v-if="r.active" class="navrow__current">current</span>
        </div>
        <p class="navrow__is">{{ r.is }}</p>
        <dl class="navrow__meta">
          <div>
            <dt>If you remove it</dt>
            <dd>{{ r.ifRemoved }}</dd>
          </div>
          <div>
            <dt>Before adding another</dt>
            <dd>{{ r.ifAdded }}</dd>
          </div>
        </dl>
      </li>
    </ol>

    <p class="navdetail__foot">
      Count the rows before you add a fifth. Each one is permanent chrome on every
      screen of the app, and past five the tap targets stop being reliably hittable.
    </p>
  </section>
</template>
