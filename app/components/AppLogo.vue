<template>
  <div class="flex items-center gap-2.5">
    <div
      class="relative flex shrink-0 items-center justify-center rounded-lg bg-linear-to-br from-primary-400 to-primary-600 shadow-md ring-1 shadow-primary-500/30 ring-white/20 ring-inset"
      :class="size === 'lg' ? 'size-10' : 'size-8'"
    >
      <UIcon
        name="i-lucide-shield-check"
        class="text-white"
        :class="size === 'lg' ? 'size-5.5' : 'size-4.5'"
      />
    </div>

    <span
      v-if="!collapsed"
      class="font-semibold tracking-tight text-highlighted"
      :class="size === 'lg' ? 'text-2xl' : 'text-lg'"
    >
      Fire<span class="text-primary">Watch</span>
    </span>
  </div>
</template>

<script setup>
defineProps({
  /** Mostra apenas o ícone (sidebar recolhida). */
  collapsed: { type: Boolean, default: false },
  size: { type: String, default: 'md' }
})
</script>
