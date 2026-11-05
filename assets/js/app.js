(function () {
  var URL_DADOS = 'data/timeline.json'; // caminho relativo: funciona em subdiretórios do GitHub Pages
  function fallback(dados, msg) {
    var el = document.getElementById('fallback');
    var html = '<p><strong>' + msg + '</strong></p>';
    if (dados && dados.events) {
      html += '<ol>' + dados.events.map(function (e) {
        return '<li><h3>' + e.text.headline + ' (' + e.start_date.display_date + ')</h3>' + e.text.text + '</li>';
      }).join('') + '</ol>';
    }
    el.innerHTML = html; el.hidden = false;
  }
  fetch(URL_DADOS).then(function (r) {
    if (!r.ok) throw new Error('HTTP ' + r.status);
    return r.json();
  }).then(function (dados) {
    if (typeof TL === 'undefined') { fallback(dados, 'Não foi possível carregar o TimelineJS. Exibindo versão em lista.'); return; }
    new TL.Timeline('timeline-embed', dados, {
      language: 'pt-br',
      hash_bookmark: false,
      scale_factor: 2,
      start_at_slide: 1,
      timenav_height: 150,
      timenav_height_min: 125,
      timenav_mobile_height_percentage: 30,
      slide_padding_lr: 55,
      default_bg_color: { r: 13, g: 27, b: 43 },
      font: null
    });
  }).catch(function (e) {
    fallback(null, 'Não foi possível carregar os dados da linha do tempo (' + e.message + '). Se estiver abrindo o arquivo direto do disco, use um servidor local (veja o README).');
  });
})();
