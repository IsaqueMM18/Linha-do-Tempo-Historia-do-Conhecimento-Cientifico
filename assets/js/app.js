(function () {
  'use strict';
  var DATA_URL = 'data/timeline.json';
  var list = document.getElementById('event-list');
  var detail = document.getElementById('event-detail');
  var count = document.getElementById('event-count');
  var events = [];
  var active = 0;

  function safeDate(event) {
    return (event.start_date && event.start_date.display_date) ||
      (event.start_date && event.start_date.year) || 'Data não informada';
  }

  function renderList() {
    list.innerHTML = '';
    events.forEach(function (event, index) {
      var button = document.createElement('button');
      button.type = 'button';
      button.className = 'event-choice' + (index === active ? ' is-active' : '');
      button.setAttribute('aria-pressed', index === active ? 'true' : 'false');
      button.setAttribute('aria-controls', 'event-detail');
      button.innerHTML =
        '<span class="choice-number">' + String(index + 1).padStart(2, '0') + '</span>' +
        '<span class="choice-copy"><span class="choice-date"></span><span class="choice-title"></span></span>';
      button.querySelector('.choice-date').textContent = safeDate(event);
      button.querySelector('.choice-title').textContent = event.text.headline;
      button.addEventListener('click', function () { showEvent(index, true); });
      list.appendChild(button);
    });
    count.textContent = events.length + ' MARCOS';
  }

  function showEvent(index, scrollToDetail) {
    active = index;
    var event = events[index];
    Array.prototype.forEach.call(list.querySelectorAll('.event-choice'), function (button, i) {
      var selected = i === index;
      button.classList.toggle('is-active', selected);
      button.setAttribute('aria-pressed', selected ? 'true' : 'false');
    });

    var media = event.media || {};
    detail.innerHTML = '';
    var top = document.createElement('div');
    top.className = 'detail-topline';
    var number = document.createElement('span');
    number.className = 'detail-number';
    number.textContent = 'MARCO ' + String(index + 1).padStart(2, '0') + ' / ' + String(events.length).padStart(2, '0');
    var date = document.createElement('span');
    date.className = 'detail-date';
    date.textContent = safeDate(event);
    top.appendChild(number);
    top.appendChild(date);

    var title = document.createElement('h3');
    title.className = 'detail-title';
    title.textContent = event.text.headline;

    var content = document.createElement('div');
    content.className = 'detail-content';
    content.innerHTML = event.text.text || '';

    var mediaColumn = document.createElement('div');
    mediaColumn.className = 'detail-media';
    if (media.url) {
      var img = document.createElement('img');
      img.src = media.url;
      img.alt = media.alt || ('Imagem relacionada a ' + event.text.headline);
      img.loading = 'lazy';
      img.decoding = 'async';
      img.addEventListener('error', function () {
        mediaColumn.classList.add('image-unavailable');
        img.remove();
        var notice = document.createElement('p');
        notice.className = 'image-error';
        notice.textContent = 'Não foi possível carregar esta imagem. Consulte a legenda e os créditos abaixo.';
        mediaColumn.insertBefore(notice, mediaColumn.firstChild);
      });
      mediaColumn.appendChild(img);
    } else {
      mediaColumn.classList.add('image-unavailable');
      var noImage = document.createElement('p');
      noImage.className = 'image-error';
      noImage.textContent = 'Imagem não disponível para este marco.';
      mediaColumn.appendChild(noImage);
    }

    if (media.caption) {
      var caption = document.createElement('p');
      caption.className = 'image-caption';
      caption.textContent = media.caption;
      mediaColumn.appendChild(caption);
    }
    if (media.credit) {
      var credit = document.createElement('div');
      credit.className = 'image-credit';
      credit.innerHTML = media.credit;
      mediaColumn.appendChild(credit);
    }

    var grid = document.createElement('div');
    grid.className = 'detail-grid';
    var textColumn = document.createElement('div');
    textColumn.className = 'detail-text';
    textColumn.appendChild(title);
    textColumn.appendChild(content);
    grid.appendChild(mediaColumn);
    grid.appendChild(textColumn);

    detail.appendChild(top);
    detail.appendChild(grid);

    if (scrollToDetail && window.matchMedia('(max-width: 760px)').matches) {
      detail.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  fetch(DATA_URL)
    .then(function (response) {
      if (!response.ok) throw new Error('Falha ao buscar os dados (' + response.status + ')');
      return response.json();
    })
    .then(function (data) {
      events = Array.isArray(data.events) ? data.events : [];
      if (!events.length) throw new Error('Nenhum marco histórico foi encontrado.');
      renderList();
      showEvent(0, false);
    })
    .catch(function (error) {
      list.innerHTML = '';
      var message = document.createElement('p');
      message.className = 'load-error';
      message.textContent = 'Não foi possível carregar a linha do tempo: ' + error.message + '. Atualize a página ou consulte o README para executar localmente.';
      list.appendChild(message);
      detail.innerHTML = '<p class="load-error">Os marcos não puderam ser exibidos.</p>';
    });
})();
