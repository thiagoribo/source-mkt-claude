# Backup — Preços removidos do Index.tsx (Homepage)

## 1. Faturamento mínimo no Hero (linhas 30–33)

Removido o bloco abaixo da seção `HeroSection`:

```tsx
<div className="flex items-center gap-3 text-fluid-sm text-muted-foreground font-mono">
  <div className="h-px w-12 bg-accent"></div>
  <p>Faturamento mínimo: R$500k/ano</p>
</div>
```

**Como restaurar:** Adicionar esse bloco de volta em `HeroSection()`, após o parágrafo de descrição e antes dos botões de CTA.

---

## 2. Preço no card destaque da seção de serviços (linhas 344–348)

Removido o bloco dentro do card `featured` em `ServicesSection`:

```tsx
<div className="flex items-end justify-between pt-8 border-t border-primary-foreground/10">
  <div>
    <p className="text-xs opacity-50 mb-1">A partir de</p>
    <p className="text-3xl md:text-4xl font-bold font-serif">{featured.price}</p>
  </div>
  <div className="flex items-center gap-2 text-sm font-medium group-hover:gap-4 transition-all duration-300">
    <span>Ver detalhes</span>
    {/* seta → */}
  </div>
</div>
```

**Como restaurar:** Recolocar esse bloco no final do card featured, substituindo o bloco atual que só tem o link "Ver detalhes".

---

## 3. Preço nos cards secundários de serviços (linhas 399–403)

Removido o bloco abaixo em cada card do `mainServices.slice(1)`:

```tsx
<div className="flex items-end justify-between pt-6 border-t border-border/50">
  <div>
    <p className="text-xs text-foreground/40 mb-0.5">A partir de</p>
    <p className="text-2xl font-bold font-serif text-primary">{service.price}</p>
  </div>
  <span className="text-primary text-sm font-medium flex items-center gap-2 group-hover:gap-3 transition-all duration-300">
    Saber mais
  </span>
</div>
```

**Como restaurar:** Recolocar esse bloco no final de cada card secundário.

---

**Obs:** Os campos `price` no array `mainServices` foram mantidos no código (não removidos), apenas o JSX que os renderiza foi removido.
