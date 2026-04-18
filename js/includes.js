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

})();
