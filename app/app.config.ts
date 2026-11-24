export default defineAppConfig({
  ui: {
    colors: {
      primary: 'violet',
      neutral: 'zinc'
    },
    footer: {
      slots: {
        root: 'border-t border-default',
        left: 'text-sm text-muted'
      }
    }
  },
  seo: {
    siteName: 'FireWatch Docs'
  },
  header: {
    title: '',
    to: '/',
    logo: {
      alt: '',
      light: '',
      dark: ''
    },
    search: true,
    colorMode: true,
    links: []
  },
  footer: {
    credits: `FireWatch • Documentação interna • © ${new Date().getFullYear()}`,
    colorMode: false,
    links: []
  },
  toc: {
    title: 'Nesta página'
  }
})
