# ADICIONAL: Design System - Layout de Cores e Tipografia

## Overview

Este documento detalha o Design System profissional implementado na Plataforma Empreendedores, incluindo a paleta oficial de cores, tipografia, e tokens de design.

**Status**: ✅ Implementado e Deployado em Produção
**Data**: Novembro 2025
**Versão**: 1.0

---

## 1. Paleta de Cores Oficial

A paleta de cores foi definida com 5 seções principais, cada uma com 10 variações (50-900):

### 1.1 Cores Primárias (Azul Corporativo)
- **#1F73B7** - Primary 500 (Cor Principal)
- Variações: 50, 100, 200, 300, 400, 500, 600, 700, 800, 900
- Uso: Botões principais, links, destaques, CTA

### 1.2 Cores de Sucesso (Verde)
- **#10B981** - Success 500 (Cor de Sucesso)
- Variações: 50, 100, 200, 300, 400, 500, 600, 700, 800, 900
- Uso: Estados positivos, confirmações, validações

### 1.3 Cores Neutras (Cinza)
- **#2D3748** - Neutral 800 (Cinza Principal)
- Variações: 50, 100, 200, 300, 400, 500, 600, 700, 800, 900
- Uso: Textos, backgrounds, bordas, estrutura

### 1.4 Cores de Aviso (Amarelo)
- **#F59E0B** - Warning 500 (Cor de Aviso)
- Variações: 50, 100, 200, 300, 400, 500, 600, 700, 800, 900
- Uso: Alertas, avisos, informações importantes

### 1.5 Cores de Erro (Vermelho)
- **#EF4444** - Error 500 (Cor de Erro)
- Variações: 50, 100, 200, 300, 400, 500, 600, 700, 800, 900
- Uso: Erros, validações negativas, estados críticos

---

## 2. Tipografia Profissional

### 2.1 Fontes Utilizadas

#### Inter (Google Fonts)
- **Uso**: Body text, conteúdo, descrições
- **Weights**: 400 (Regular), 500 (Medium), 600 (Semibold), 700 (Bold)
- **Tamanho padrão**: 1rem (16px)
- **Line height**: 1.5rem (24px)

#### Poppins (Google Fonts)
- **Uso**: Títulos, headings, destaques
- **Weights**: 600 (Semibold), 700 (Bold), 800 (Extrabold)
- **Scale**:
  - h1: 2.25rem (36px)
  - h2: 1.875rem (30px)
  - h3: 1.5rem (24px)
  - h4: 1.25rem (20px)
  - h5: 1.125rem (18px)
  - h6: 1rem (16px)

### 2.2 Escala de Tamanhos de Fonte

```
xs:  0.75rem  (12px) - Pequenos labels, badges
sm:  0.875rem (14px) - Help text, captions
base: 1rem    (16px) - Body text padrão
lg:  1.125rem (18px) - Subtítulos
xl:  1.25rem  (20px) - Pequenos heading
2xl: 1.5rem   (24px) - Heading h3
3xl: 1.875rem (30px) - Heading h2
4xl: 2.25rem  (36px) - Heading h1
```

---

## 3. Tokens de Design

### 3.1 Espaçamento (Spacing Scale)

```
xs:  0.25rem (4px)  - Micro spacing
sm:  0.5rem  (8px)  - Small padding
md:  1rem    (16px) - Default padding
lg:  1.5rem  (24px) - Large padding
xl:  2rem    (32px) - XL padding
2xl: 2.5rem  (40px) - XXL padding
3xl: 3rem    (48px) - Extra large
4xl: 4rem    (64px) - Maximum
```

### 3.2 Border Radius

```
none: 0
sm:   0.25rem  (4px)   - Slight rounding
md:   0.375rem (6px)   - Default rounding
lg:   0.5rem   (8px)   - Large rounding
xl:   0.75rem  (12px)  - Extra large rounding
full: 9999px           - Fully rounded
```

### 3.3 Box Shadow (Sombras)

```
xs:  0 1px 2px 0 rgba(0,0,0,0.05)
sm:  0 1px 3px 0 rgba(0,0,0,0.1), 0 1px 2px 0 rgba(0,0,0,0.06)
md:  0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)
lg:  0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)
xl:  0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)
2xl: 0 25px 50px -12px rgba(0,0,0,0.25)
```

---

## 4. Implementação Técnica

### 4.1 Arquivos Modificados

#### tailwind.config.js
- Adicionado tema customizado com cores oficiais
- Configurado fontFamily com Inter e Poppins
- Adicionado spacing scale profissional
- Configurado border radius tokens
- Adicionado box shadow definitions

#### styles/globals.css
- Importação de Google Fonts (Inter + Poppins)
- Definição de CSS variables para todas as cores
- Base styles para HTML elements (h1-h6, p, a, button)
- Utility classes para cores (.text-primary, .bg-success, etc)

### 4.2 CSS Variables (Disponíveis em styles/globals.css)

```css
/* Primary Colors */
--color-primary-50 through --color-primary-900

/* Success Colors */
--color-success-50 through --color-success-900

/* Neutral Colors */
--color-neutral-50 through --color-neutral-900

/* Warning Colors */
--color-warning-50 through --color-warning-900

/* Error Colors */
--color-error-50 through --color-error-900

/* Typography */
--font-sans: 'Inter', ui-sans-serif, system-ui, sans-serif
--font-display: 'Poppins', ui-sans-serif, system-ui, sans-serif
```

---

## 5. Guia de Uso

### 5.1 Usando com Tailwind CSS

```jsx
// Cores
<button className="bg-primary-500 text-white">Botão Principal</button>
<div className="text-success-600">Sucesso</div>
<div className="bg-error-50 text-error-700">Erro</div>

// Tipografia
<h1 className="font-display text-4xl font-bold">Título Principal</h1>
<p className="font-sans text-base">Texto padrão</p>

// Espaçamento
<div className="p-md mb-lg">Conteúdo com padding e margin</div>

// Sombras
<card className="shadow-lg rounded-lg">Cartão com sombra</card>
```

### 5.2 Usando CSS Variables

```css
.custom-button {
  background-color: var(--color-primary-500);
  color: white;
  padding: var(--spacing-md);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--box-shadow-md);
  font-family: var(--font-sans);
}
```

---

## 6. Commits e Deployment

### Commits Realizados:
1. `e1a5dd6` - Adicional: Implement Design System with professional colors, typography, and spacing tokens
2. `ce6d49de` - Adicional: Add CSS variables, Google Fonts imports, and professional base styling

### Status de Deployment:
- ✅ Ambos os commits deployados com sucesso
- ✅ Vercel Build: Passed
- ✅ Production: Live e Funcional
- ✅ URL: https://plataforma-empreendedores.vercel.app

---

## 7. Próximos Passos

1. Criar componentes React reutilizáveis com o design system
2. Adicionar mais componentes (Button, Card, Input, etc)
3. Implementar temas (dark mode, light mode)
4. Criar Storybook para documentação de componentes
5. Adicionar animações e transições

---

## 8. Referências

- Google Fonts: https://fonts.google.com/
- Tailwind CSS: https://tailwindcss.com/
- Design Tokens: https://www.designtokens.org/

---

**Documento Preparado para Implementação Futura**
**Todas as configurações estão prontas e deployadas em produção**
