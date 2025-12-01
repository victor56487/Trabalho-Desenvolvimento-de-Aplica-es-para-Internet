(function ($) {
  $(function () {
    var $btnLoad = $("#carregarProdutos");
    var $productsList = $("#productsList");
    var $loading = $("#loadingState");
    var $noResults = $("#noResults");
    var $search = $("#searchInput");
    var $category = $("#categorySelect");
    var $minPrice = $("#minPrice");
    var $maxPrice = $("#maxPrice");
    var $applyPrice = $("#applyPriceFilter");
    var $sort = $("#sortSelect");
    var $count = $("#productCount");
    var $clear = $("#clearAllFilters");
    var modal = $("#productModal");
    var modalContent = $("#modalContent");
    var $backdrop = $(".modal-backdrop"); // elemento backdrop que envolve a modal

    window._catalogAllProducts = window._catalogAllProducts || [];

    function showLoading() {
      $loading.prop("hidden", false);
      $productsList.show().html(generateSkeletonCards(6)); // <-- aqui aparece o skeleton
      $noResults.hide();
    }

    function hideLoading() {
      $loading.prop("hidden", true);
      $productsList.show();
    }
    function generateSkeletonCards(qtd) {
      var html = "";
      for (var i = 0; i < qtd; i++) {
        html += `
      <div class="card skeleton">
        <div class="card-media"><div class="skeleton-rect"></div></div>
        <div class="card-body">
          <div class="skeleton-line short"></div>
          <div class="skeleton-line"></div>
          <div class="skeleton-line small"></div>
        </div>
      </div>
    `;
      }
      return html;
    }

    function renderProducts(list) {
      $productsList.empty();
      if (!list || list.length === 0) {
        $noResults.prop("hidden", false);
        $count.text("0 produtos");
        return;
      }
      $noResults.prop("hidden", true);
      $count.text(list.length + " produtos");
      list.forEach(function (p) {
        // Cria o card com a estrutura que o CSS espera
        var $card = $(`
  <div class="card">
      <div class="card-media">
          <img src="${p.imagem}" alt="${p.nome}">
      </div>
      <div class="card-body">
          <h3 class="card-title">${p.nome}</h3>
          <div class="card-meta">${p.categoria}</div>
          <div class="card-price">R$ ${Number(p.preco).toFixed(2)}</div>
          <div class="card-actions">
             <button class="btn ver-detalhes" data-id="${
               p.id
             }" aria-label="Ver detalhes de ${p.nome}">Ver Detalhes</button>


          </div>
      </div>
  </div>
`);

        // Conecta o botão "Ver Detalhes" ao modal
        $card.find(".ver-detalhes").on("click", function () {
          openModal(p);
        });

        // Adiciona o card ao grid
        $productsList.append($card);
      });
      $productsList.show();
    }

    function openModal(p) {
      // markup com imagem à esquerda e informações à direita (zoom-wrapper)
      var html = `
        <div class="zoom-wrapper">
          <div class="zoom-container">
            <img src="${p.imagem}" alt="${p.nome}" class="modal-img-zoom">
          </div>
          <div class="modal-info">
            <h2 id="modalTitle">${p.nome}</h2>
            <p><strong>Categoria:</strong> ${p.categoria}</p>
            <p><strong>Preço:</strong> R$ ${Number(p.preco).toFixed(2)}</p>
            <p><strong>Estoque:</strong> ${p.estoque || 0}</p>
            <p style="margin-top:12px">${p.descricao || ""}</p>
          </div>
        </div>
      `;
      modalContent.html(html);

      // mostra o backdrop com animação (usa a classe .show que o CSS trata)
      $backdrop.addClass("show");
      modal.attr("aria-hidden", "false");
      $("#modalClose").focus();
    }

    function closeModal() {
      // esconde o backdrop / modal
      $backdrop.removeClass("show");
      modal.attr("aria-hidden", "true");
      modalContent.empty();
    }
    $("#modalClose").on("click", closeModal);
    modal.on("click", function (e) {
      if (e.target === this) closeModal();
      // depois de inserir o HTML dentro do modal:
      modalContent.find(".modal-img-zoom").on("click", function (e) {
        // alterna modo fullscreen no backdrop
        $backdrop.toggleClass("modal-fullscreen");
      });
    });

    // fechar ao clicar no backdrop (área escura fora da caixa)
    $backdrop.on("click", function (e) {
      if (e.target === this) closeModal();
    });

    function populateCategorySelect(list) {
      var cats = Array.from(
        new Set(
          (list || []).map(function (x) {
            return x.categoria || "Sem categoria";
          })
        )
      ).sort();
      $category
        .empty()
        .append('<option value="all">Todas as categorias</option>');
      cats.forEach(function (c) {
        $category.append('<option value="' + c + '">' + c + "</option>");
      });
    }

    function applyFiltersAndRender() {
      var q = ($search.val() || "").trim().toLowerCase();
      var cat = $category.val() || "all";
      var min = parseFloat($minPrice.val());
      var max = parseFloat($maxPrice.val());
      var arr = (window._catalogAllProducts || []).slice();

      if (q) {
        arr = arr.filter(function (p) {
          return (
            (p.nome && p.nome.toLowerCase().indexOf(q) !== -1) ||
            (p.descricao && p.descricao.toLowerCase().indexOf(q) !== -1)
          );
        });
      }
      if (cat && cat !== "all") {
        arr = arr.filter(function (p) {
          return p.categoria === cat;
        });
      }
      if (!isNaN(min)) {
        arr = arr.filter(function (p) {
          return Number(p.preco) >= min;
        });
      }
      if (!isNaN(max)) {
        arr = arr.filter(function (p) {
          return Number(p.preco) <= max;
        });
      }

      var sortv = String($sort.val() || "")
        .toLowerCase()
        .trim();

      // aceitar valores em pt-BR e en-US (ex.: nome-asc, name-asc, preco-asc, price-asc)
      if (sortv === "name-asc" || sortv === "nome-asc") {
        arr.sort(function (a, b) {
          return String(a.nome || "").localeCompare(String(b.nome || ""));
        });
      } else if (sortv === "name-desc" || sortv === "nome-desc") {
        arr.sort(function (a, b) {
          return String(b.nome || "").localeCompare(String(a.nome || ""));
        });
      } else if (
        sortv === "price-asc" ||
        sortv === "preco-asc" ||
        sortv === "preco-menor" ||
        sortv === "preco (menor)"
      ) {
        arr.sort(function (a, b) {
          return Number(a.preco || 0) - Number(b.preco || 0);
        });
      } else if (
        sortv === "price-desc" ||
        sortv === "preco-desc" ||
        sortv === "preco-maior" ||
        sortv === "preco (maior)"
      ) {
        arr.sort(function (a, b) {
          return Number(b.preco || 0) - Number(a.preco || 0);
        });
      }
      // se o valor for vazio ou "default", mantém a ordem atual (não altera)

      renderProducts(arr);
      // Delegação: garante que clique funcione mesmo com cards recriados
      $productsList.on("click", ".ver-detalhes", function (e) {
        var id = $(this).data("id");
        if (typeof id === "undefined") return;
        var p = (window._catalogAllProducts || []).find(function (x) {
          return String(x.id) === String(id);
        });
        if (p) {
          openModal(p);
        } else {
          console.warn("Produto não encontrado para id", id);
        }
      });
    }

    $btnLoad.on("click", function () {
      showLoading();
      $.getJSON("data/produtos.json")
        .done(function (data) {
          var list = Array.isArray(data) ? data : data.produtos || [];
          window._catalogAllProducts = list;
          populateCategorySelect(list);
          applyFiltersAndRender();
          hideLoading();
        })
        .fail(function () {
          window._catalogAllProducts = [];
          renderProducts([]);
          hideLoading();
          alert("Erro ao carregar produtos.json");
        });
    });

    $search.on("input", applyFiltersAndRender);
    $category.on("change", applyFiltersAndRender);
    $applyPrice.on("click", applyFiltersAndRender);
    $sort.on("change", applyFiltersAndRender);
    $clear.on("click", function () {
      $search.val("");
      $category.val("all");
      $minPrice.val("");
      $maxPrice.val("");
      $sort.val("default");
      applyFiltersAndRender();
    });

    $(document).on("keydown", function (e) {
      if (e.key === "Escape") closeModal();
    });

    $(document).on("produtos:loaded", function (e, list) {
      window._catalogAllProducts = list || [];
      populateCategorySelect(window._catalogAllProducts);
      applyFiltersAndRender();
    });
  });
})(jQuery);
// --- Botão "voltar ao topo" ---
const btnTop = $("#btnTop");

$(window).on("scroll", function () {
  if ($(this).scrollTop() > 400) {
    btnTop.addClass("show");
  } else {
    btnTop.removeClass("show");
  }
});

btnTop.on("click", function () {
  $("html, body").animate({ scrollTop: 0 }, 500);
});
// --- Botão "voltar ao topo" robusto ---
(function () {
  // cria o botão se não existir (evita erro se HTML não foi adicionado)
  if (!document.getElementById("btnTop")) {
    var btnEl = document.createElement("button");
    btnEl.id = "btnTop";
    btnEl.className = "btn-top";
    btnEl.setAttribute("aria-label", "Voltar ao topo");
    btnEl.innerText = "↑";
    document.body.appendChild(btnEl);
  }

  var $btnTop = $("#btnTop");

  // safe: se jQuery não estiver disponível, fallback para JS nativo
  function scrollToTop() {
    $("html, body").animate({ scrollTop: 0 }, 500);
  }

  // throttle com requestAnimationFrame
  var ticking = false;
  window.addEventListener(
    "scroll",
    function () {
      if (!ticking) {
        window.requestAnimationFrame(function () {
          var y = window.scrollY || window.pageYOffset;
          if (y > 300) {
            $btnTop.addClass("show");
          } else {
            $btnTop.removeClass("show");
          }
          ticking = false;
        });
        ticking = true;
      }
    },
    { passive: true }
  );

  // clique com fallback seguro
  $btnTop.on("click", function (e) {
    e.preventDefault();
    scrollToTop();
  });

  // opcional: mostrar se a página já iniciar scrolled (ex.: reload)
  $(function () {
    if ((window.scrollY || window.pageYOffset) > 300) {
      $btnTop.addClass("show");
    }
  });
})();
