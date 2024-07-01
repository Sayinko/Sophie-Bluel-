/*fetch("http://localhost:5678/api/works");

const hebergements = await fetch("http://localhost:5678/api/works");
const resultats = await reponse.json();

for (i = 0; i < herbegements.length; i++) {
  resultats = hebergements[i];
}
console.log(resultats);*/

const gallery = document.querySelector(".gallery");
const filters = document.createElement("div");
const allFilters = document.createElement("button");
const filterApartments = document.querySelector(".filter-appartements");
const filterHotelsRestaurants = document.querySelector(
  ".filter-hotelsrestaurants"
);

let works = [];
console.log(works); // POURQUOI JARRIVE PAS A LES STOCKER A LINTERIEUR
let imgWorks;
console.log(imgWorks);
let figureImg;
let figCaption;
let categoryName;

filters.appendChild(allFilters);
gallery.insertAdjacentElement("beforebegin", filters);

allFilters.innerHTML = "Tous";
allFilters.classList.add("filter-all");

async function loadcategories() {
  try {
    const api = await fetch("http://localhost:5678/api/categories");
    const categories = await api.json();

    categories.forEach((category) => {
      const filtersType = document.createElement("button");
      filtersType.textContent = category.name;
      filters.appendChild(filtersType);

      if (category.name === "Objets") {
        imgWorks.classList.add("filter-object"); // IMGWORKS MARCHE APS
      }

      // TEST AJOUT DE CLASSE MAIS NE MARCHE PAS : IMGWORKS SE TROUVANT DANS UNE AUTRE FONCTION//

      /*for (const category of categories) {
        categoryName = category.name;
        console.log(categoryName);
        if (categoryName === "Objets") {
          imgWorks.classList.add("appartments");
        }
      }

      // TENTATIVE DAJOUT DEVENEMENT //

      /*filtersType.addEventListener("click", () => {
        const categoryName = category.name;

        works.forEach((work) => {
          if (
            typeof work.categories !== "undefined" &&
            work.categories.includes(categoryName)
          ) {
            work.style.display = "block";
          } else {
            work.style.display = "none";
          }
        });
      });*/
    });
  } catch (error) {
    console.error("il y a pb categories : ", error);
  }
}

async function allWorks() {
  try {
    const api = await fetch("http://localhost:5678/api/works");
    works = await api.json();

    works.forEach((work) => {
      imgWorks = document.createElement("img");
      figureImg = document.createElement("figure");
      figCaption = document.createElement("figcaption");

      gallery.appendChild(figureImg);
      figureImg.appendChild(imgWorks);
      figureImg.appendChild(figCaption);

      imgWorks.src = work.imageUrl; //ICI CONSOLE LOG OK FAIT APPARAITRE IMG MAIS PAS EN HAUT
      figCaption.textContent = work.title;

      if (work.category.name === "Objets") {
        imgWorks.classList.add("appartments");
      }
    });
    await loadcategories(); //PAS COMPRIS POURQUOI JE DEVAIS LE METTRE ICI POUR QUE CA MARCHE
  } catch (error) {
    console.error("il y a un probleme works : ", error);
  }
}

allWorks();

// ESSAI FETCH AVEC THEN //

/*fetch("http://localhost:5678/api/categories")
  .then((response) => {
    return response.json();
  })
  .then((categories) => {
    const filterObjects = categories.filter(
      (objects) => categories.name === "Objets"
    );
    for (const category of categories) {
      const typeFilters = document.createElement("button");
      typeFilters.innerHTML =
        category.name; /* POURQUOI CATEGORY MARCHE ET PAS CATEGORIES ? ALORS QUE CATEGORY EST UNE VARIABLE QUE JAI CREEE
      filters.appendChild(typeFilters);
      typeFilters.classList.add(
        "filter-" + category.name.toLowerCase().replace(/[^a-z]/g, "")
      );
    }
  });*/

/*async function categories() {
  try {
    const api = await fetch("http://localhost:5678/api/categories");
    const data = await api.json();
    console.log(data);

    let objectsFilter = data.filter((category) => data.name === "Objets");
    let apartmentsFilter = data.filter((apartments) => data.name === "Appartements");
    let hotelsRestaurantsFilter = data.filter(
      (hotelsRestaurants) => data.name === "Hôtels et restaurants"
    );
    objectsfilter = document.createElement("button");
    apartmentsFilter = document.createElement("button");
    hotelsRestaurantsFilter = document.createElement("button");

    filters.appendChild(objectsfilter);
    filters.appendChild(apartmentsFilter);
    filters.appendChild(hotelsRestaurantsFilter);

    objectsfilter.innerHTML = "Objets";
    apartmentsFilter.innerHTML = "Appartements";
    hotelsRestaurantsFilter.innerHTML = "Hôtels et restaurants";

    objectsFilter.addEventListener("click", () => {

    })

  } catch (error) {
    console.error("il y a un probleme : ", error);
  }
}

categories();

fetch("http://localhost:5678/api/works")
  .then((response) => {
    return response.json();
  })
  .then((works) => {
    for (const work of works) {
      const imgPlace = document.createElement("img");
      const figcaption = document.createElement("figcaption");
      const figure = document.createElement("figure");

      gallery.appendChild(figure);
      figure.appendChild(imgPlace);
      figure.appendChild(figcaption);

      imgPlace.src = work.imageUrl;
      figcaption.innerHTML = work.title;
    }
  });*/
