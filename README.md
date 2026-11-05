# História do Conhecimento Científico — linha do tempo

Site estático e responsivo com 10 marcos históricos, construído com TimelineJS 3 (Knight Lab), HTML, CSS e JavaScript.

## Estrutura

`index.html`, `assets/css/style.css`, `assets/js/app.js`, `assets/images/placeholder.svg`, `data/timeline.json`, `docs/referencias.md` e `docs/creditos-imagens.md`.

## Executar localmente

O carregamento do JSON usa `fetch` e exige um servidor local:

```bash
python3 -m http.server 8000
```

Depois, abra http://localhost:8000.

## Publicar no GitHub Pages

Em **Settings → Pages**, selecione a branch `main` e a pasta `/(root)`. Os caminhos dos arquivos são relativos à raiz do projeto.

## Alterar marcos

Edite a lista `events` em `data/timeline.json`. Anos a.C. são representados por números negativos. Mantenha a ordem cronológica e preencha `start_date`, `text` e `media`.

## Imagens e direitos de uso

As imagens dos dez marcos foram selecionadas no Wikimedia Commons e estão identificadas nas legendas da linha do tempo. A página [Créditos e direitos das imagens](docs/creditos-imagens.md) registra autoria, identificação do objeto, fonte e situação de direitos informada na ficha original.

As imagens são carregadas diretamente do servidor do Wikimedia Commons; por isso, o site precisa de conexão à internet para exibi-las. A imagem provisória em `assets/images/placeholder.svg` permanece como fallback visual, mas não é utilizada nos dez eventos.

**Atenção:** CC0 e domínio público não são a mesma coisa. Mesmo quando a atribuição não é obrigatória, os créditos foram mantidos por transparência acadêmica. Consulte a ficha de cada arquivo antes de reutilizar a imagem fora deste projeto.

## Identidade visual

A interface usa tema escuro, com azul-marinho como base, painéis em azul profundo e detalhes alaranjados para destacar títulos, links e elementos ativos. Os títulos usam Playfair Display e os textos usam DM Sans. As imagens usam ajuste proporcional para evitar cortes de rostos, manuscritos e diagramas. O layout adapta a altura da linha do tempo a diferentes tamanhos de tela.

## Referências bibliográficas

Consulte e atualize [docs/referencias.md](docs/referencias.md).
