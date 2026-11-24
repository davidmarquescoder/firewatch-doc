<script setup lang="ts">
import { useClipboard } from '@vueuse/core'
import { withoutTrailingSlash } from 'ufo'

const route = useRoute()
const toast = useToast()
const { copy, copied } = useClipboard()
const site = useSiteConfig()

const routePath = computed(() => withoutTrailingSlash(route.path))
const mdPath = computed(() => `${site.url}/raw${routePath.value}.md`)

const items = [
  {
    label: 'Copiar link do Markdown',
    icon: 'i-lucide-link',
    onSelect() {
      copy(mdPath.value)
      toast.add({
        title: 'Copied to clipboard',
        icon: 'i-lucide-check-circle'
      })
    }
  },
  {
    label: 'Ver como Markdown',
    icon: 'i-simple-icons:markdown',
    target: '_blank',
    to: `/raw${routePath.value}.md`
  },
  {
    label: 'Abrir no ChatGPT',
    icon: 'i-simple-icons:openai',
    target: '_blank',
    to: `https://chatgpt.com/?hints=search&q=${encodeURIComponent(`Read ${mdPath.value} so I can ask questions about it.`)}`
  },
  {
    label: 'Abrir no Claude',
    icon: 'i-simple-icons:anthropic',
    target: '_blank',
    to: `https://claude.ai/new?q=${encodeURIComponent(`Read ${mdPath.value} so I can ask questions about it.`)}`
  }
]

async function copyPage() {
  copy(await $fetch<string>(`/raw${routePath.value}.md`))
}
</script>

<template>
  <UFieldGroup>
    <UButton
      label="Copiar página"
      :icon="copied ? 'i-lucide-copy-check' : 'i-lucide-copy'"
      color="neutral"
      variant="outline"
      :ui="{
        leadingIcon: [copied && 'text-primary', 'size-3.5']
      }"
      @click="copyPage"
    />
    <UDropdownMenu
      :items="items"
      :content="{
        align: 'end',
        side: 'bottom',
        sideOffset: 8
      }"
      :ui="{
        content: 'w-48'
      }"
    >
      <UButton
        icon="i-lucide-chevron-down"
        size="sm"
        color="neutral"
        variant="outline"
        aria-label="Abrir menu de cópia"
      />
    </UDropdownMenu>
  </UFieldGroup>
</template>
