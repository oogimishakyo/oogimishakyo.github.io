/* =========================================
   大宜味村社会福祉協議会 公式サイト
   includes.js — 共通ヘッダー・フッター読み込み
   ========================================= */

(function () {
  'use strict';

  function loadSync(url) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, false); // 同期リクエスト
    try {
      xhr.send(null);
    } catch (e) {
      return null;
    }
    return xhr.status === 200 ? xhr.responseText : null;
  }

  function inject(id, html) {
    if (!html) return;
    var el = document.getElementById(id);
    if (!el) return;
    var tmp = document.createElement('div');
    tmp.innerHTML = html;
    var parent = el.parentNode;
    while (tmp.firstChild) {
      parent.insertBefore(tmp.firstChild, el);
    }
    parent.removeChild(el);
  }

  // ヘッダー読み込み
  inject('header-placeholder', loadSync('includes/header.html'));

  // フッター読み込み
  inject('footer-placeholder', loadSync('includes/footer.html'));

  // ファビコンをheadに注入（全ページ共通）
  var faviconDefs = [
    { rel: 'icon',             type: 'image/png', href: 'images/logo.png' },
    { rel: 'shortcut icon',    type: '',          href: 'images/logo.png' },
    { rel: 'apple-touch-icon', type: '',          href: 'images/logo.png' }
  ];
  faviconDefs.forEach(function(def) {
    var link = document.createElement('link');
    link.rel  = def.rel;
    link.href = def.href;
    if (def.type) link.type = def.type;
    document.head.appendChild(link);
  });

})();
