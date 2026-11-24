// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/ui',
    '@nuxt/content',
    'nuxt-og-image',
    'nuxt-llms',
    'nuxt-agent-discovery',
    '@nuxtjs/mcp-toolkit'
  ],

  devtools: {
    enabled: true
  },

  css: ['~/assets/css/main.css'],

  content: {
    build: {
      markdown: {
        toc: {
          searchDepth: 1
        }
      }
    },
    experimental: {
      sqliteConnector: 'native'
    }
  },

  experimental: {
    asyncContext: true
  },

  compatibilityDate: '2026-06-30',

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  },

  llms: {
    domain: 'http://localhost:3000',
    title: 'FireWatch Docs',
    description: 'Documentação do FireWatch: resposta automática a incidentes, do alerta ao Pull Request.',
    full: {
      title: 'FireWatch Docs - Documentação completa',
      description: 'Documentação completa do FireWatch.'
    },
    sections: [
      {
        title: 'Visão geral',
        contentCollection: 'docs',
        contentFilters: [
          { field: 'path', operator: 'LIKE', value: '/visao-geral%' }
        ]
      },
      {
        title: 'Ambiente e setup',
        contentCollection: 'docs',
        contentFilters: [
          { field: 'path', operator: 'LIKE', value: '/ambiente-e-setup%' }
        ]
      },
      {
        title: 'Backend',
        contentCollection: 'docs',
        contentFilters: [
          { field: 'path', operator: 'LIKE', value: '/backend%' }
        ]
      },
      {
        title: 'Modelo de dados',
        contentCollection: 'docs',
        contentFilters: [
          { field: 'path', operator: 'LIKE', value: '/modelo-de-dados%' }
        ]
      }
    ]
  },

  mcp: {
    name: 'FireWatch Docs'
  },

  ogImage: {
    zeroRuntime: true
  },

  prerender: {
    routes: [
      '/'
    ],
    crawlLinks: true
  }
})
