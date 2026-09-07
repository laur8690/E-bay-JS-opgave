// ========================================
// BANNER: VIDEO, BILLEDE OG VIDEO
// ========================================

// Array med objekter.
const banners = [
  {
    type: "video",
    src: "media/banner-1.mp4",
    description: "Fashion campaign",
  },
  {
    type: "image",
    src: "media/banner-2.jpg",
    description: "Electronics campaign",
  },
  {
    type: "video",
    src: "media/banner-3.mp4",
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

    mediaElement.controls = true;
    mediaElement.playsInline = true;
    mediaElement.preload = "metadata";

    mediaElement.setAttribute("aria-label", selectedBanner.description);
  } else {
    mediaElement = document.createElement("img");
    mediaElement.alt = selectedBanner.description;
  }

  mediaElement.src = selectedBanner.src;
  bannerMedia.appendChild(mediaElement);

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
    name: "Laptop – 8GB RAM, 256GB SSD",
    image: "images/laptop.jpg",
    originalPrice: 499,
    discount: 20,
    saved: false,
  },
  {
    id: 2,
    name: "Dyson Pure Hot + Cool Purifier | Refurbished",
    image: "images/dyson.jpg",
    originalPrice: 349,
    discount: 20,
    saved: false,
  },
  {
    id: 3,
    name: "Logitech G29 Racing Wheel and Pedals",
    image: "images/wheel.jpg",
    originalPrice: 299,
    discount: 20,
    saved: false,
  },
  {
    id: 4,
    name: "Gucci Grey Browline Men's Sunglasses",
    image: "images/sunglasses.jpg",
    originalPrice: 249,
    discount: 15,
    saved: false,
  },
  {
    id: 5,
    name: "xTool F1 Portable Laser Engraver",
    image: "images/laser.jpg",
    originalPrice: 999,
    discount: 20,
    saved: false,
  },
  {
    id: 6,
    name: "NARWAL Robot Vacuum and Mop",
    image: "images/vacuum.jpg",
    originalPrice: 799,
    discount: 20,
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
  return "$" + price.toFixed(2);
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

  // Kortets bredde plus afstanden mellem kortene.
  const distance = firstCard.getBoundingClientRect().width + 16;

  dealsTrack.scrollBy({
    left: distance * direction,
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
