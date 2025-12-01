(function ($) {
  $(function () {
    $.getJSON("data/produtos.json")
      .done(function (data) {
        window.produtos = Array.isArray(data) ? data : data.produtos || [];
        $(document).trigger("produtos:loaded", [window.produtos]);
      })
      .fail(function () {
        window.produtos = [];
        $(document).trigger("produtos:loaded", [window.produtos]);
      });
  });
})(window.jQuery || jQuery);
