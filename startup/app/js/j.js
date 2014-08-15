

!function () {
  "use strict";

  var j = {};  

  j.append = function (element) {
    document.body.appendChild(element);
  };

  j.select = function (selector) {
    return document.querySelectorAll(selector);
  };

  j.ready = function (cb) {
    window.addEventListener('load', function () {
      cb && cb();
    });
  };

  window.$ = j;
} ();