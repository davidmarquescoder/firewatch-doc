---
title: FireWatch
description: Do alerta de erro ao Pull Request com a correção, em minutos. Documentação do FireWatch.
---

::u-page-hero{class="dark:bg-gradient-to-b from-neutral-900 to-neutral-950"}
---
orientation: horizontal
---
#top
:hero-background

#title
Do alerta ao [Pull Request]{.text-primary}, em minutos.

#description
O FireWatch recebe um erro de produção, coloca um time de agentes de IA para investigar a causa raiz, escrever um teste que reproduz o bug e corrigir o código, e entrega um PR pronto para revisão. O time humano só revisa e aprova.

#links
  :::u-button
  ---
  to: /visao-geral
  size: xl
  trailing-icon: i-lucide-arrow-right
  ---
  Começar pela visão geral
  :::

  :::u-button
  ---
  icon: i-lucide-workflow
  color: neutral
  variant: outline
  size: xl
  to: /visao-geral/fluxo-ponta-a-ponta
  ---
  Ver o fluxo completo
  :::

#default
  :::prose-pre
  ---
  code: |
    POST /api/webhooks/{connector}      ← Sentry
    → incidente #42 registrado (3 ocorrências)
    → trigger: acionar agentes
    → runner firewatch-run-87 no ar
      Sentinela          triagem
      Detetive           causa raiz em OrderService.php
      Advogado do Diabo  teste falha sem a correção ✓
      Cirurgião          correção aplicada
      Advogado do Diabo  suíte completa passou ✓
      Escrivão           descrição do PR
    → PR aberto: firewatch/OPS-123-null-no-pedido
    → Slack notificado · Jira atualizado
  filename: timeline
  ---

  ```bash [timeline]
  POST /api/webhooks/{connector}      ← Sentry
  → incidente #42 registrado (3 ocorrências)
  → trigger: acionar agentes
  → runner firewatch-run-87 no ar
    Sentinela          triagem
    Detetive           causa raiz em OrderService.php
    Advogado do Diabo  teste falha sem a correção ✓
    Cirurgião          correção aplicada
    Advogado do Diabo  suíte completa passou ✓
    Escrivão           descrição do PR
  → PR aberto: firewatch/OPS-123-null-no-pedido
  → Slack notificado · Jira atualizado
  ```
  :::
::

::u-page-section{class="dark:bg-neutral-950"}
#title
Como o FireWatch trabalha

#features
  :::u-page-feature
  ---
  icon: i-lucide-radar
  ---
  #title
  Ingestão segura

  #description
  Recebe erros do Sentry, de webhooks genéricos ou do Slack, valida assinaturas, mascara dados sensíveis e deduplica por fingerprint.
  :::

  :::u-page-feature
  ---
  icon: i-lucide-sliders-horizontal
  ---
  #title
  Regras de acionamento

  #description
  Cada aplicação define ambiente, severidade, ocorrências e usuários afetados mínimos antes de acionar os agentes.
  :::

  :::u-page-feature
  ---
  icon: i-lucide-users
  ---
  #title
  Time de agentes

  #description
  Chefe de Plantão, Sentinela, Detetive, Advogado do Diabo, Cirurgião e Escrivão, configuráveis pelo painel.
  :::

  :::u-page-feature
  ---
  icon: i-lucide-container
  ---
  #title
  Runner isolado

  #description
  Um container descartável por execução, sem privilégios, com limites de recursos e saída de rede só pelo proxy.
  :::

  :::u-page-feature
  ---
  icon: i-lucide-flask-conical
  ---
  #title
  Teste antes da correção

  #description
  O runner comprova que o teste novo falha sem a correção e que a suíte inteira passa com ela. Sem prova, sem PR.
  :::

  :::u-page-feature
  ---
  icon: i-lucide-activity
  ---
  #title
  Ao vivo no painel

  #description
  Cada arquivo lido, comando executado e teste rodado aparece na timeline do incidente em tempo real.
  :::
::

::u-page-section{class="dark:bg-gradient-to-b from-neutral-950 to-neutral-900"}
  :::u-page-c-t-a
  ---
  links:
    - label: O que é o FireWatch
      to: '/visao-geral'
      trailingIcon: i-lucide-arrow-right
    - label: Arquitetura
      to: '/visao-geral/arquitetura'
      variant: subtle
      icon: i-lucide-network
  title: Nenhuma alteração vai para produção sem aprovação humana.
  description: O FireWatch nunca faz merge, nunca faz deploy e nunca envia para a branch base. Ele entrega a correção pronta; a decisão continua com o time.
  class: dark:bg-neutral-950
  ---

  :stars-bg
  :::
::
