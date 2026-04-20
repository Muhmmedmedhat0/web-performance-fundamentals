/**
 * Promo Banner
 * Web Performance Lab
 * by Muhmmad Medhat
 *
 * Example add-on script that gets the promoted products for the store and
 * renders a promotional banner. This demonstrates:
 *
 * 1. Unnecessary render delay
 * 2. Downloading resources that are not shown
 * 3. Shifting layouts
 */
window.addEventListener('DOMContentLoaded', async () => {
  const el = document.getElementById('promo-banner');
  if (!el) {
    return;
  }

  // Hard guard against layout shift: keep promo out of normal document flow
  // before any async content is injected, even if stale CSS is cached.
  Object.assign(el.style, {
    position: 'absolute',
    top: '60px',
    left: '0',
    right: '0',
    zIndex: '20',
    pointerEvents: 'none',
    maxHeight: '106px',
    overflow: 'hidden',
  });

  const productsResp = await fetch(`${API_BASE_URL}/api/products`);
  const products = await productsResp.json();
  const promoProduct =
    products.find((product) => product.isPromo) ?? products[0];

  if (!promoProduct) {
    return;
  }

  let innerHTML =
    "<div class='container'><div class='promo-list flex-column' style='height:100px;max-height:100px;overflow:hidden'>";
  innerHTML += `
      <div class="product-card promo" style="height:100px;min-height:100px;max-height:100px;overflow:hidden">
        <a href="/products/${promoProduct.slug}">
          <img
						height="80"
            width="80" 
						loading="lazy"  
						src="${STATIC_BASE_URL}${promoProduct.imagePath}?promo" 
						alt="${promoProduct.name}"
						style="height:72px;max-height:72px;width:auto;display:block" 
					/>
          <div class="product-copy flex-column">
            <h2>Flash Sale!!</h2>
            <h3>${promoProduct.name}</h3>
          </div>
        </a>
        <div class="flex align-center">
          <button type="button" class="add-to-cart btn-inverse" data-product-id="${promoProduct.id}">Add to Cart</button>
        </div>
      </div>`;
  innerHTML += '</div>';
  innerHTML += '</div>';
  el.innerHTML = innerHTML;

  // Animate overlay in after mount on a separate frame so transitions always run.
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      el.classList.add('is-visible');
      el.style.pointerEvents = 'auto';
    });
  });

  // Slide the promoted card into view after the overlay animation starts.
  const promoCard = el.querySelector('.product-card.promo');
  setTimeout(() => {
    promoCard?.classList.add('expand');
  }, 260);

  // Keep this global so legacy markup that calls showPromo() still works.
  window.showPromo = function () {
    el.classList.add('is-visible');
    promoCard?.classList.add('expand');
  };
});
