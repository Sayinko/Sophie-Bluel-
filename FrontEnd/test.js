const gallery = document.querySelector(".gallery");
const filters = document.createElement("div");
const allFilters = document.createElement("button");
const filterApartments = document.querySelector(".filter-appartements");
const filterHotelsRestaurants = document.querySelector(
  ".filter-hotelsrestaurants"
);

let imgWorks;
let figureImg;
let figCaption;
let categoryName;
let filtersType;

filters.appendChild(allFilters);
gallery.insertAdjacentElement("beforebegin", filters);
filters.classList.add("filters");

allFilters.innerHTML = "Tous";
allFilters.dataset.id = "0";

allFilters.addEventListener("click", () => {
  const figures = document.querySelectorAll(".gallery figure");

  figures.forEach((figure) => {
    figure.style.display = "block";
  });
});
// Fonction qui à le rôle d'appeler les autres fonctions
async function init() {
  try {
    const categories = await getCategories();
    displayCategories(categories);

    const works = await getWorks();
    displayWorks(works);

    listenerFilters();
  } catch (error) {
    console.error("probleme avec la fonction init : ", error);
  }

  // Une fonction qui permet d'ajouter les eventListener sur les filtres
}
init();

// Fonction qui récupère les catégories
async function getCategories() {
  try {
    const api = await fetch("http://localhost:5678/api/categories");
    return await api.json();
  } catch (error) {
    console.error("probleme avec la recuperation des categories : ", error);
  }
}

// Fonction qui affiche les catégories
function displayCategories(categories) {
  try {
    categories.forEach((category) => {
      filtersType = document.createElement("button");
      filtersType.textContent = category.name;
      filters.appendChild(filtersType);

      filtersType.dataset.id = category.id;
    });
    const allButtons = document.querySelectorAll(".filters button");
    console.log(allButtons);

    allButtons.forEach((buttons) => {
      buttons.classList.add("button_filters");
      buttons.addEventListener("click", () => {
        buttons.classList.toggle("click_color");
      });
    });
  } catch (error) {
    console.error("probleme avec l'affichage des catégories : ", error);
  }
}

// Fonction qui récupère les travaux
async function getWorks() {
  try {
    const api = await fetch("http://localhost:5678/api/works");
    return await api.json();
  } catch (error) {
    console.error("probleme avec la récupération des travaux : ", error);
  }
}

// Fonction qui affiche les travaux
function displayWorks(works) {
  try {
    works.forEach((work) => {
      imgWorks = document.createElement("img");
      figureImg = document.createElement("figure");
      figCaption = document.createElement("figcaption");

      gallery.appendChild(figureImg);
      figureImg.appendChild(imgWorks);
      figureImg.appendChild(figCaption);

      imgWorks.src = work.imageUrl;
      figCaption.textContent = work.title;

      figureImg.dataset.categoryId = work.categoryId;
    });
  } catch (error) {
    console.error("probleme avec l'affichage des travaux :", error);
  }
}

function listenerFilters() {
  const buttons = document.querySelectorAll("#portfolio button");

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const figures = document.querySelectorAll(".gallery figure");
      const categoryId = button.dataset.id;

      figures.forEach((figure) => {
        figure.style.display = "none";
        if (categoryId == 0 || figure.dataset.categoryId == categoryId) {
          figure.style.display = "block";
        }
      });
    });
  });
}
