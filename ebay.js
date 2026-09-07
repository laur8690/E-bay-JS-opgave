// ARRAY OG OBJEKTER
// Hvert objekt indeholder information om ét banner.
const banners = [
  {
    title: "All your faves are here",
    description: "Refresh your space, elevate your style and power your work.",
    backgroundColor: "#00a0e8",
    textColor: "#002b45",
  },
  {
    title: "Discover your next favorite",
    description: "Explore fashion, accessories and everyday essentials.",
    backgroundColor: "#f6b4ce",
    textColor: "#4a1230",
  },
  {
    title: "Big ideas. Great finds.",
    description: "Find the technology to bring your ideas to life.",
    backgroundColor: "#c5e5b4",
    textColor: "#173b23",
  },
];

// DOM
// Vi finder de HTML-elementer, som JavaScript skal arbejde med.
const banner = document.querySelector(".hero");
const bannerTitle = document.querySelector("#banner-title");
const bannerDescription = document.querySelector("#banner-description");
const dotsContainer = document.querySelector("#banner-dots");
const previousButton = document.querySelector("#previous-banner");
const nextButton = document.querySelector("#next-banner");

// LET
// Denne værdi ændrer sig, når brugeren skifter banner.
// Arrays starter ved 0, så 0 betyder det første banner.
let currentBanner = 0;

// LOOP
// Vi opretter én knap med en prik for hvert banner.
for (let index = 0; index < banners.length; index++) {
  const dot = document.createElement("button");

  dot.type = "button";
  dot.classList.add("banner-dot");
  dot.setAttribute("aria-label", `Show banner ${index + 1}`);

  // EVENT
  // Et klik på prikken viser banneret med samme index.
  dot.addEventListener("click", function () {
    currentBanner = index;
    showBanner();
  });

  dotsContainer.appendChild(dot);
}

// FUNCTION
// Funktionen opdaterer tekst, farver og den aktive prik.
function showBanner() {
  // Lokal variabel: selectedBanner findes kun i denne funktion.
  const selectedBanner = banners[currentBanner];

  bannerTitle.textContent = selectedBanner.title;
  bannerDescription.textContent = selectedBanner.description;
  banner.style.backgroundColor = selectedBanner.backgroundColor;
  banner.style.color = selectedBanner.textColor;

  const dots = dotsContainer.querySelectorAll(".banner-dot");

  for (let index = 0; index < dots.length; index++) {
    // Sammenligningen giver en boolean: true eller false.
    const isActive = index === currentBanner;

    dots[index].classList.toggle("active", isActive);
    dots[index].setAttribute("aria-pressed", String(isActive));
  }
}

// EVENT, OPERATORER OG KONTROLSTRUKTUR
nextButton.addEventListener("click", function () {
  currentBanner += 1;

  // Efter sidste banner starter vi forfra.
  if (currentBanner >= banners.length) {
    currentBanner = 0;
  }

  showBanner();
});

previousButton.addEventListener("click", function () {
  currentBanner -= 1;

  // Før første banner går vi tilbage til det sidste.
  if (currentBanner < 0) {
    currentBanner = banners.length - 1;
  }

  showBanner();
});

// Søgefunktionen kommer senere.
// Indtil da forhindrer vi formularen i at genindlæse siden.
const searchForm = document.querySelector(".search-form");

searchForm.addEventListener("submit", function (event) {
  event.preventDefault();
});

// Vis det første banner, når siden åbner.
showBanner();

// ========================================
// TODAY'S DEALS
// Alle priser her er eksempler til opgaven.
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

// Variablen findes uden for funktionerne,
// så flere funktioner kan bruge den.
let showOnlyFavorites = false;

// Funktion med en parameter og en returværdi.
// price er lokal i denne funktion.
function formatPrice(price) {
  return "$" + price.toFixed(2);
}

function updateFavoriteButton(button, product) {
  button.textContent = product.saved ? "♥" : "♡";
  button.setAttribute("aria-pressed", String(product.saved));

  if (product.saved) {
    button.setAttribute("aria-label", "Remove from saved: " + product.name);
  } else {
    button.setAttribute("aria-label", "Save: " + product.name);
  }
}

function updateSavedCount() {
  let savedCount = 0;

  for (const product of deals) {
    if (product.saved) {
      savedCount += 1;
    }
  }

  favoritesFilter.textContent = `Saved (${savedCount})`;
}

function showDeals() {
  dealsTrack.replaceChildren();

  let visibleCount = 0;

  for (const product of deals) {
    // && betyder "og". ! betyder "ikke".
    // Spring over varen, hvis vi kun viser favoritter,
    // og varen ikke er gemt.
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
      // Skifter mellem true og false.
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

    // Aritmetiske operatorer: -, * og /.
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

showDeals();
