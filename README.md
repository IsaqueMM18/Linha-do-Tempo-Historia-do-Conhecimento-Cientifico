# História do Conhecimento Científico — linha do tempo

Site estático com 10 marcos, usando TimelineJS 3 (Knight Lab) via CDN oficial e dados em `data/timeline.json`.

## Estrutura
`index.html`, `assets/css/style.css`, `assets/js/app.js`, `assets/images/`, `data/timeline.json`, `docs/referencias.md`.

## Executar localmente
O `fetch` do JSON exige servidor: `python3 -m http.server 8000` e abra http://localhost:8000.

## Publicar no GitHub Pages
Copie os arquivos para o repositório (sem sobrescrever os existentes), em Settings > Pages escolha a branch e a pasta. Os caminhos são relativos e funcionam em subdiretórios.

## Alterar marcos
Edite `events` em `data/timeline.json` (`start_date.year`, `end_date`, `text.headline`, `text.text`). Anos a.C. são negativos. Mantenha a ordem cronológica.

## Substituir imagens e créditos
Coloque a imagem em `assets/images/` e altere `media.url`, `media.caption`, `media.credit` e `media.alt`. **Atualmente todas as imagens são um espaço reservado**: nenhuma licença foi verificada. Registre autor, licença, URL de origem e página original de cada imagem.

## Referências
Edite `docs/referencias.md` e os nomes citados no fim de cada marco.
