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
