// ========================================
// BANNER: VIDEO, BILLEDE OG VIDEO
// ========================================

// Array med objekter.
const banners = [
  {
    type: "video",
    src: "Media/sko1.mp4",
    description: "Fashion campaign",
  },
  {
    type: "image",
    src: "Media/pc.jpg",
    description: "Electronics campaign",
  },
  {
    type: "video",
    src: "Media/sko2.mp4",
    description: "Home and garden campaign",
  },
];

// Find HTML-elementerne.
const bannerMedia = document.querySelector("#banner-media");
const dotsContainer = document.querySelector("#banner-dots");
const previousButton = document.querySelector("#previous-banner");
const nextButton = document.querySelector("#next-banner");

// Holder styr på det aktive slide.
let currentBanner = 0;

// Opret én prik til hvert slide.
for (let index = 0; index < banners.length; index++) {
  const dot = document.createElement("button");

  dot.type = "button";
  dot.classList.add("banner-dot");
  dot.setAttribute("aria-label", `Show slide ${index + 1}`);

  dot.addEventListener("click", function () {
    currentBanner = index;
    showBanner();
  });

  dotsContainer.appendChild(dot);
}

// Vis det valgte billede eller den valgte video.
function showBanner() {
  const previousVideo = bannerMedia.querySelector("video");

  // Stop den gamle video, når brugeren skifter slide.
  if (previousVideo) {
    previousVideo.pause();
  }

  bannerMedia.replaceChildren();

  // Lokale variabler, som kun findes i denne funktion.
  const selectedBanner = banners[currentBanner];
  let mediaElement;

  if (selectedBanner.type === "video") {
    mediaElement = document.createElement("video");

    mediaElement.muted = true;
    mediaElement.autoplay = true;
    mediaElement.loop = true;
    mediaElement.playsInline = true;
    mediaElement.controls = false;
    mediaElement.preload = "auto";

    mediaElement.setAttribute("aria-label", selectedBanner.description);
  } else {
    mediaElement = document.createElement("img");
    mediaElement.alt = selectedBanner.description;
  }

  mediaElement.src = selectedBanner.src;
  bannerMedia.appendChild(mediaElement);

  // Start videoen. Vis betjening, hvis browseren blokerer autoplay.
  if (selectedBanner.type === "video") {
    mediaElement.play().catch(function () {
      // Ingen videoknapper skal vises
    });
  }

  // Opdater den aktive prik.
  const dots = dotsContainer.querySelectorAll(".banner-dot");

  for (let index = 0; index < dots.length; index++) {
    const isActive = index === currentBanner;

    dots[index].classList.toggle("active", isActive);
    dots[index].setAttribute("aria-pressed", String(isActive));
  }
}

// Næste slide.
nextButton.addEventListener("click", function () {
  currentBanner += 1;

  if (currentBanner >= banners.length) {
    currentBanner = 0;
  }

  showBanner();
});

// Forrige slide.
previousButton.addEventListener("click", function () {
  currentBanner -= 1;

  if (currentBanner < 0) {
    currentBanner = banners.length - 1;
  }

  showBanner();
});

// Vis det første slide.
showBanner();

// ========================================
// SØGEFORMULAR
// ========================================

// Forhindrer genindlæsning, indtil søgefunktionen er lavet.
const searchForm = document.querySelector(".search-form");

searchForm.addEventListener("submit", function (event) {
  event.preventDefault();
});

// ========================================
// TODAY'S DEALS
// Alle priser er eksempler til opgaven.
// ========================================

const deals = [
  {
    id: 1,
    name: "Crocs Classic Clog Navy",
    image: "Media/crocs.webp",
    originalPrice: 59,
    discount: 20,
    saved: false,
  },
  {
    id: 2,
    name: "Ninja Espresso & Coffee Machine",
    image: "Media/kaffe.webp",
    originalPrice: 699,
    discount: 15,
    saved: false,
  },
  {
    id: 3,
    name: "Logitech MX Master Wireless Mouse",
    image: "Media/mus.webp",
    originalPrice: 129,
    discount: 20,
    saved: false,
  },
  {
    id: 4,
    name: "MSI Esports Gaming Monitor",
    image: "Media/pc1.webp",
    originalPrice: 249,
    discount: 20,
    saved: false,
  },
  {
    id: 5,
    name: "Samsung Curved Gaming Monitor",
    image: "Media/pc2.webp",
    originalPrice: 349,
    discount: 15,
    saved: false,
  },
  {
    id: 6,
    name: "Shark Stratos Cordless Vacuum Cleaner",
    image: "Media/støvsuger.webp",
    originalPrice: 499,
    discount: 20,
    saved: false,
  },
  {
    id: 7,
    name: "EcoFlow Portable Power Station",
    image: "Media/ting.webp",
    originalPrice: 699,
    discount: 25,
    saved: false,
  },

  {
    id: 8,
    name: "Dyson Purifier Hot+Cool",
    image: "Media/dyson.webp",
    originalPrice: 349,
    discount: 20,
    saved: false,
  },
  {
    id: 9,
    name: "Apple MacBook Air",
    image: "Media/macbook.webp",
    originalPrice: 899,
    discount: 15,
    saved: false,
  },
  {
    id: 10,
    name: "Logitech G29 Racing Wheel and Pedals",
    image: "Media/ret.webp",
    originalPrice: 299,
    discount: 20,
    saved: false,
  },
  {
    id: 11,
    name: "Robot Vacuum and Mop",
    image: "Media/robot.webp",
    originalPrice: 799,
    discount: 20,
    saved: false,
  },
  {
    id: 12,
    name: "Designer Sunglasses",
    image: "Media/solbriller.webp",
    originalPrice: 249,
    discount: 15,
    saved: false,
  },
];

const dealsTrack = document.querySelector("#deals-track");
const dealsPrevious = document.querySelector("#deals-previous");
const dealsNext = document.querySelector("#deals-next");
const favoritesFilter = document.querySelector("#favorites-filter");
const dealsStatus = document.querySelector("#deals-status");

// Flere funktioner bruger denne variabel.
let showOnlyFavorites = false;

// Returnerer en pris med to decimaler.
function formatPrice(price) {
  return price.toFixed(2).replace(".", ",") + " kr.";
}

// Opdater hjertets ikon og tilgængelige beskrivelse.
function updateFavoriteButton(button, product) {
  button.innerHTML = `
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
    >
      <path d="
        M20.8 4.6
        a5.5 5.5 0 0 0-7.8 0
        L12 5.7
        l-1.1-1.1
        a5.5 5.5 0 0 0-7.8 7.8
        L12 21
        l8.8-8.6
        a5.5 5.5 0 0 0 0-7.8
        Z
      " />
    </svg>
  `;

  button.setAttribute("aria-pressed", String(product.saved));

  if (product.saved) {
    button.setAttribute("aria-label", "Remove from saved: " + product.name);
  } else {
    button.setAttribute("aria-label", "Save: " + product.name);
  }
}

// Tæl antallet af gemte produkter.
function updateSavedCount() {
  let savedCount = 0;

  for (const product of deals) {
    if (product.saved) {
      savedCount += 1;
    }
  }

  favoritesFilter.textContent = `Saved (${savedCount})`;
}

// Opret og vis produktkortene.
function showDeals() {
  dealsTrack.replaceChildren();

  let visibleCount = 0;

  for (const product of deals) {
    // Spring over produkter, der ikke er gemt,
    // når favoritfilteret er slået til.
    if (showOnlyFavorites && !product.saved) {
      continue;
    }

    visibleCount += 1;

    const card = document.createElement("article");
    card.classList.add("deal-card");

    const imageWrapper = document.createElement("div");
    imageWrapper.classList.add("deal-image-wrapper");

    const image = document.createElement("img");
    image.classList.add("deal-image");
    image.src = product.image;
    image.alt = product.name;
    image.loading = "lazy";

    const favoriteButton = document.createElement("button");
    favoriteButton.type = "button";
    favoriteButton.classList.add("favorite-button");

    updateFavoriteButton(favoriteButton, product);

    favoriteButton.addEventListener("click", function () {
      // Skift mellem true og false.
      product.saved = !product.saved;

      updateFavoriteButton(favoriteButton, product);
      updateSavedCount();

      if (showOnlyFavorites) {
        showDeals();
        favoritesFilter.focus();
      }
    });

    const discountLabel = document.createElement("p");
    discountLabel.classList.add("deal-discount");
    discountLabel.textContent = `${product.discount}% OFF`;

    imageWrapper.append(image, favoriteButton, discountLabel);

    const title = document.createElement("h3");
    title.textContent = product.name;

    // Beregn prisen efter rabat.
    const reducedPrice = product.originalPrice * (1 - product.discount / 100);

    const price = document.createElement("p");
    price.classList.add("deal-price");
    price.textContent = formatPrice(reducedPrice);

    const oldPrice = document.createElement("p");
    oldPrice.classList.add("deal-old-price");

    const crossedOutPrice = document.createElement("s");
    crossedOutPrice.textContent = formatPrice(product.originalPrice);

    oldPrice.append("Was: ", crossedOutPrice);

    card.append(imageWrapper, title, price, oldPrice);
    dealsTrack.appendChild(card);
  }

  if (visibleCount === 0) {
    dealsStatus.textContent = "No saved products yet.";
  } else {
    dealsStatus.textContent = `${visibleCount} products · Demo prices`;
  }

  updateSavedCount();
  updateDealArrows();
}

// ========================================
// FAVORITFILTER
// ========================================

favoritesFilter.addEventListener("click", function () {
  showOnlyFavorites = !showOnlyFavorites;

  favoritesFilter.setAttribute("aria-pressed", String(showOnlyFavorites));

  showDeals();

  dealsTrack.scrollLeft = 0;
  updateDealArrows();
});

// ========================================
// PILE TIL PRODUKTRÆKKEN
// ========================================

// Deaktiver pilene, når man ikke kan bladre længere.
function updateDealArrows() {
  const maximumScroll = dealsTrack.scrollWidth - dealsTrack.clientWidth;

  dealsPrevious.disabled = dealsTrack.scrollLeft <= 1;
  dealsNext.disabled = dealsTrack.scrollLeft >= maximumScroll - 1;
}

function moveDeals(direction) {
  const firstCard = dealsTrack.querySelector(".deal-card");

  if (!firstCard) {
    return;
  }

  const cardWidth = firstCard.getBoundingClientRect().width + 16;

  const cardsPerView = Math.floor(dealsTrack.clientWidth / cardWidth);

  dealsTrack.scrollBy({
    left: cardWidth * cardsPerView * direction,
    behavior: "smooth",
  });
}

dealsPrevious.addEventListener("click", function () {
  moveDeals(-1);
});

dealsNext.addEventListener("click", function () {
  moveDeals(1);
});

dealsTrack.addEventListener("scroll", updateDealArrows);
window.addEventListener("resize", updateDealArrows);

// ========================================
// TILBAGE TIL TOPPEN
// ========================================

const backToTopButton = document.querySelector("#back-to-top");

backToTopButton.addEventListener("click", function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// Vis produkterne, når siden åbner.
showDeals();

// ========================================
// NYHEDSBREV POPUP
// ========================================

// Opret styling til popup
const popupStyle = document.createElement("style");

popupStyle.textContent = `
  .newsletter-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.45);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
  }

  .newsletter-popup {
    position: relative;
    width: 90%;
    max-width: 500px;
    background: white;
    border-radius: 24px;
    padding: 45px;
    text-align: center;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
  }

  .newsletter-popup h2 {
    margin: 0 0 12px;
    font-size: 32px;
  }

  .newsletter-popup p {
    margin-bottom: 25px;
    font-size: 16px;
    color: #555;
  }

  .newsletter-popup input {
    width: 100%;
    box-sizing: border-box;
    padding: 14px 16px;
    border: 1px solid #999;
    border-radius: 30px;
    font-size: 15px;
    margin-bottom: 12px;
  }

  .newsletter-popup .subscribe-button {
    width: 100%;
    padding: 14px;
    border: none;
    border-radius: 30px;
    background: #3665f3;
    color: white;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
  }

  .newsletter-popup .subscribe-button:hover {
    background: #254fd2;
  }

  .newsletter-close {
    position: absolute;
    top: 15px;
    right: 18px;
    border: none;
    background: none;
    font-size: 28px;
    cursor: pointer;
  }

  .newsletter-code {
    margin-top: 18px;
    font-weight: 600;
    color: #191919;
  }

  .newsletter-benefits {
  list-style: none;
  padding: 0;
  margin: 0 0 20px;
}

.newsletter-benefits li {
  margin-bottom: 4px;
}
`;

document.head.appendChild(popupStyle);

// ========================================
// NYHEDSBREV POPUP
// ========================================

// Tredje array i projektet
const newsletterBenefits = [
  "Exclusive subscriber-only offers",
  "Early access to selected deals",
  "The latest products and inspiration",
];

// Lav selve popup'en
function showNewsletterPopup() {
  const overlay = document.createElement("div");
  overlay.classList.add("newsletter-overlay");

  const popup = document.createElement("div");
  popup.classList.add("newsletter-popup");

  popup.innerHTML = `
    <button class="newsletter-close" type="button">×</button>

    <h2>Save 10%</h2>

   <p>
  Sign up for our newsletter and enjoy 10% off your next purchase.
</p>

    <ul class="newsletter-benefits"></ul>

    <input
      type="email"
      class="newsletter-email"
      placeholder="Enter your email"
    >

    <button class="subscribe-button" type="button">
      Get 10% off
    </button>

    <p class="newsletter-code"></p>
  `;

  // Hent listen fra popup'en
  const benefitsList = popup.querySelector(".newsletter-benefits");

  // Lav ét listepunkt for hver fordel i arrayet
  for (const benefit of newsletterBenefits) {
    const listItem = document.createElement("li");
    listItem.textContent = benefit;
    benefitsList.appendChild(listItem);
  }

  overlay.appendChild(popup);
  document.body.appendChild(overlay);

  // Luk popup
  const closeButton = popup.querySelector(".newsletter-close");

  closeButton.addEventListener("click", function () {
    overlay.remove();
  });

  // Tilmeld nyhedsbrev
  const subscribeButton = popup.querySelector(".subscribe-button");
  const emailInput = popup.querySelector(".newsletter-email");
  const codeText = popup.querySelector(".newsletter-code");

  subscribeButton.addEventListener("click", function () {
    if (emailInput.value === "") {
      codeText.textContent = "Please enter your email.";
      return;
    }

    codeText.textContent = "Your discount code: SAVE10";
    emailInput.style.display = "none";
    subscribeButton.style.display = "none";
  });

  // Luk hvis man klikker udenfor boksen
  overlay.addEventListener("click", function (event) {
    if (event.target === overlay) {
      overlay.remove();
    }
  });
}

// Vis popup 1 sekund efter siden åbner
setTimeout(showNewsletterPopup, 1000);

// ========================================
// KATEGORIER
// ========================================

// 4 Array med kategorier
const categories = [
  "Saved",
  "Electronics",
  "Motors",
  "Fashion",
  "Collectibles and art",
  "Sports",
  "Health and beauty",
  "Home and garden",
  "Deals",
];

// Find kategorimenuen i HTML
const categoriesMenu = document.querySelector(".categories");

// Lav en knap for hver kategori
for (const category of categories) {
  const categoryButton = document.createElement("button");

  categoryButton.type = "button";
  categoryButton.textContent = category;

  categoriesMenu.appendChild(categoryButton);
}

