<script setup lang="ts">
/**
 * Renderiza um diagrama Mermaid no cliente, acompanhando o modo claro/escuro.
 *
 * Uso no Markdown (MDC):
 *
 * ::mermaid
 * ---
 * code: |
 *   flowchart LR
 *     A --> B
 * ---
 * ::
 */
const props = defineProps<{
  code: string
  caption?: string
  /** Largura mínima (px) do diagrama na página; acima da coluna, rola na horizontal. */
  minWidth?: number
}>()

const colorMode = useColorMode()
const svg = ref('')
const error = ref('')
const id = `mermaid-${useId()?.replace(/[^\w-]/g, '')}`

async function render() {
  if (import.meta.server) return
  try {
    const { default: mermaid } = await import('mermaid')
    const dark = colorMode.value === 'dark'
    mermaid.initialize({
      startOnLoad: false,
      securityLevel: 'strict',
      theme: 'base',
      fontFamily: 'Public Sans, sans-serif',
      themeVariables: dark
        ? {
            darkMode: true,
            background: '#09090b',
            primaryColor: '#2e1065',
            primaryBorderColor: '#8b5cf6',
            primaryTextColor: '#f4f4f5',
            secondaryColor: '#18181b',
            tertiaryColor: '#27272a',
            lineColor: '#a1a1aa',
            textColor: '#e4e4e7',
            noteBkgColor: '#27272a',
            noteTextColor: '#e4e4e7',
            noteBorderColor: '#52525b',
            actorBkg: '#2e1065',
            actorBorder: '#8b5cf6',
            actorTextColor: '#f4f4f5',
            signalColor: '#d4d4d8',
            signalTextColor: '#e4e4e7',
            labelBoxBkgColor: '#18181b',
            labelTextColor: '#e4e4e7',
            clusterBkg: '#18181b',
            clusterBorder: '#3f3f46'
          }
        : {
            primaryColor: '#ede9fe',
            primaryBorderColor: '#7c3aed',
            primaryTextColor: '#18181b',
            secondaryColor: '#f4f4f5',
            tertiaryColor: '#fafafa',
            lineColor: '#71717a',
            textColor: '#27272a',
            noteBkgColor: '#fef9c3',
            noteTextColor: '#27272a',
            noteBorderColor: '#eab308',
            actorBkg: '#ede9fe',
            actorBorder: '#7c3aed',
            signalColor: '#3f3f46',
            clusterBkg: '#fafafa',
            clusterBorder: '#d4d4d8'
          }
    })
    const result = await mermaid.render(`${id}-${dark ? 'd' : 'l'}`, props.code)
    svg.value = result.svg
    error.value = ''
  } catch (e) {
    error.value = e instanceof Error ? e.message : String(e)
  }
}

onMounted(render)
watch(() => [colorMode.value, props.code], render)
</script>

<template>
  <figure class="relative my-6">
    <UModal
      v-if="svg"
      fullscreen
      :title="caption || 'Diagrama'"
    >
      <UButton
        icon="i-lucide-maximize-2"
        color="neutral"
        variant="soft"
        size="xs"
        aria-label="Expandir diagrama"
        class="absolute top-2 right-2 z-10"
      />

      <template #body>
        <!-- eslint-disable-next-line vue/no-v-html -- SVG gerado pelo Mermaid (securityLevel strict) -->
        <div
          class="flex min-h-full items-center justify-center [&_svg]:h-auto [&_svg]:w-full [&_svg]:max-w-none!"
          v-html="svg"
        />
      </template>
    </UModal>

    <div
      class="overflow-x-auto rounded-md border border-default bg-default p-4 [&_svg]:mx-auto [&_svg]:h-auto [&_svg]:max-w-full"
    >
      <!-- eslint-disable-next-line vue/no-v-html -- SVG gerado pelo Mermaid (securityLevel strict) -->
      <div
        v-if="svg"
        :style="minWidth ? { minWidth: `${minWidth}px` } : undefined"
        v-html="svg"
      />
      <pre
        v-else-if="error"
        class="text-sm text-error whitespace-pre-wrap"
      >{{ error }}</pre>
      <div
        v-else
        class="h-40 animate-pulse rounded bg-elevated"
      />
    </div>
    <figcaption
      v-if="caption"
      class="mt-2 text-center text-sm text-muted"
    >
      {{ caption }}
    </figcaption>
  </figure>
</template>
