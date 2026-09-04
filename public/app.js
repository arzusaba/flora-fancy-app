/* Petal & Stem — vanilla JS storefront: rendering + cart drawer */
(function () {
  "use strict";

  var PRODUCTS = [
    {
      id: "blush-roses",
      name: "Blush Rose Bouquet",
      description: "Two dozen garden roses in soft pink, hand-tied in kraft paper.",
      price: 58,
      image: "/assets/bouquet-roses.jpg",
      category: "Roses",
    },
    {
      id: "meadow-wildflower",
      name: "Meadow Wildflowers",
      description: "Daisies, lavender and fresh greenery, straight from the field.",
      price: 42,
      image: "/assets/bouquet-wildflower.jpg",
      category: "Seasonal",
    },
    {
      id: "ivory-peony",
      name: "Ivory Peony Posy",
      description: "Cloud-soft white peonies wrapped in our signature white paper.",
      price: 68,
      image: "/assets/bouquet-peony.jpg",
      category: "Weddings",
    },
    {
      id: "spring-tulips",
      name: "Spring Tulip Bunch",
      description: "A cheerful mix of coral, pink and yellow tulips.",
      price: 36,
      image: "/assets/bouquet-tulips.jpg",
      category: "Seasonal",
    },
  ];

  var CATEGORIES = [
    { name: "Roses", count: 12, image: "/assets/bouquet-roses.jpg" },
    { name: "Seasonal", count: 18, image: "/assets/bouquet-tulips.jpg" },
    { name: "Wildflowers", count: 9, image: "/assets/bouquet-wildflower.jpg" },
    { name: "Weddings", count: 7, image: "/assets/bouquet-peony.jpg" },
  ];

  var TESTIMONIALS = [
    {
      name: "Amelia R.",
      text: "The bouquet for my mother's birthday was stunning — it lasted nearly two weeks. Petal & Stem is my go-to now.",
      rating: 5,
    },
    {
      name: "Daniel K.",
      text: "Ordered at 10am and the flowers were on her desk by noon. Gorgeous arrangement and such friendly service.",
      rating: 5,
    },
    {
      name: "Sofia M.",
      text: "They did our wedding flowers and every single table looked like a painting. I still get compliments.",
      rating: 5,
    },
  ];

  var STAR_SVG =
    '<svg class="icon" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linejoin="round" aria-hidden="true"><path d="M11.5 2.5 14.3 8l6.2.9-4.5 4.3 1.1 6.1-5.6-2.9-5.6 2.9 1.1-6.1L2.5 8.9 8.7 8z"/></svg>';
  var TRASH_SVG =
    '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>';
  var MINUS_SVG =
    '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M5 12h14"/></svg>';
  var PLUS_SVG =
    '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M5 12h14"/><path d="M12 5v14"/></svg>';

  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, function (ch) {
      return {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      }[ch];
    });
  }

  /* ---------- Static sections ---------- */

  function renderProducts() {
    document.getElementById("product-grid").innerHTML = PRODUCTS.map(function (p) {
      return (
        '<article class="product-card">' +
        '<div class="product-media"><img src="' +
        p.image +
        '" alt="' +
        escapeHtml(p.name) +
        '" width="1024" height="1024" loading="lazy" /></div>' +
        '<div class="product-body">' +
        '<span class="product-cat">' +
        escapeHtml(p.category) +
        "</span>" +
        '<h3 class="product-name display">' +
        escapeHtml(p.name) +
        "</h3>" +
        '<p class="product-desc">' +
        escapeHtml(p.description) +
        "</p>" +
        '<div class="product-foot"><span class="price">$' +
        p.price +
        '</span><button class="btn btn-primary" data-add="' +
        p.id +
        '">Add to cart</button></div>' +
        "</div></article>"
      );
    }).join("");
  }

  function renderCategories() {
    document.getElementById("category-grid").innerHTML = CATEGORIES.map(function (c) {
      return (
        '<a class="category-card" href="#shop">' +
        '<img src="' +
        c.image +
        '" alt="' +
        escapeHtml(c.name) +
        ' category" width="1024" height="1024" loading="lazy" />' +
        '<div class="category-overlay"><h3 class="display">' +
        escapeHtml(c.name) +
        "</h3><p>" +
        c.count +
        " arrangements</p></div></a>"
      );
    }).join("");
  }

  function renderTestimonials() {
    document.getElementById("testimonial-grid").innerHTML = TESTIMONIALS.map(function (t) {
      return (
        '<figure class="testimonial">' +
        '<div class="stars" aria-label="' +
        t.rating +
        ' out of 5 stars">' +
        new Array(t.rating + 1).join(STAR_SVG) +
        "</div>" +
        "<blockquote>“" +
        escapeHtml(t.text) +
        "”</blockquote>" +
        "<figcaption>— " +
        escapeHtml(t.name) +
        "</figcaption></figure>"
      );
    }).join("");
  }

  /* ---------- Cart ---------- */

  var cart = []; // { product, qty }

  var overlay = document.getElementById("cart-overlay");
  var cartBody = document.getElementById("cart-body");
  var cartFooter = document.getElementById("cart-footer");
  var cartTotalEl = document.getElementById("cart-total");
  var cartCountEl = document.getElementById("cart-count");

  function findProduct(id) {
    return PRODUCTS.filter(function (p) {
      return p.id === id;
    })[0];
  }

  function addToCart(id) {
    var product = findProduct(id);
    if (!product) return;
    var line = cart.filter(function (i) {
      return i.product.id === id;
    })[0];
    if (line) line.qty += 1;
    else cart.push({ product: product, qty: 1 });
    renderCart();
    openCart();
  }

  function changeQty(id, delta) {
    cart = cart
      .map(function (i) {
        return i.product.id === id ? { product: i.product, qty: i.qty + delta } : i;
      })
      .filter(function (i) {
        return i.qty > 0;
      });
    renderCart();
  }

  function removeItem(id) {
    cart = cart.filter(function (i) {
      return i.product.id !== id;
    });
    renderCart();
  }

  function openCart() {
    overlay.hidden = false;
  }

  function closeCart() {
    overlay.hidden = true;
  }

  function renderCart() {
    var count = cart.reduce(function (s, i) {
      return s + i.qty;
    }, 0);
    var total = cart.reduce(function (s, i) {
      return s + i.qty * i.product.price;
    }, 0);

    cartCountEl.textContent = count;
    cartCountEl.hidden = count === 0;

    if (cart.length === 0) {
      cartBody.innerHTML =
        '<p class="cart-empty">Your cart is empty. Add something beautiful!</p>';
      cartFooter.hidden = true;
      return;
    }

    cartBody.innerHTML =
      '<ul class="cart-list">' +
      cart
        .map(function (item) {
          var p = item.product;
          return (
            '<li class="cart-item">' +
            '<img src="' +
            p.image +
            '" alt="' +
            escapeHtml(p.name) +
            '" width="1024" height="1024" />' +
            '<div class="cart-item-main">' +
            '<div class="cart-item-top"><h3>' +
            escapeHtml(p.name) +
            '</h3><button class="remove-button" data-remove="' +
            p.id +
            '" aria-label="Remove ' +
            escapeHtml(p.name) +
            '">' +
            TRASH_SVG +
            "</button></div>" +
            '<div class="cart-item-bottom"><div class="qty">' +
            '<button data-dec="' +
            p.id +
            '" aria-label="Decrease quantity">' +
            MINUS_SVG +
            "</button><span>" +
            item.qty +
            '</span><button data-inc="' +
            p.id +
            '" aria-label="Increase quantity">' +
            PLUS_SVG +
            "</button></div>" +
            '<span class="line-total">$' +
            item.qty * p.price +
            "</span></div>" +
            "</div></li>"
          );
        })
        .join("") +
      "</ul>";

    cartTotalEl.textContent = "$" + total;
    cartFooter.hidden = false;
  }

  /* ---------- Wiring ---------- */

  renderProducts();
  renderCategories();
  renderTestimonials();
  renderCart();

  document.getElementById("cart-button").addEventListener("click", openCart);

  document.addEventListener("click", function (event) {
    var target = event.target instanceof Element ? event.target : null;
    if (!target) return;

    if (target.closest("[data-close-cart]")) {
      closeCart();
      return;
    }
    var add = target.closest("[data-add]");
    if (add) return addToCart(add.getAttribute("data-add"));
    var remove = target.closest("[data-remove]");
    if (remove) return removeItem(remove.getAttribute("data-remove"));
    var dec = target.closest("[data-dec]");
    if (dec) return changeQty(dec.getAttribute("data-dec"), -1);
    var inc = target.closest("[data-inc]");
    if (inc) return changeQty(inc.getAttribute("data-inc"), 1);
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") closeCart();
  });
})();
