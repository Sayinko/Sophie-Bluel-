let travaux = [];
let categorie = [];

// Récupération des catégories de l'api
async function categorieApi() {
  const reponse = await fetch("http://localhost:5678/api/categories");
  categories = await reponse.json();
}

// Récupération des travaux de l'api
async function travauxApi() {
  const reponse = await fetch("http://localhost:5678/api/works");
  travaux = await reponse.json();
}

const gallery = document.querySelector(".gallery");

// Génération de la gallerie d'images
function generationGallery(travaux) {
  for (let i = 0; i < travaux.length; i++) {
    const ficheGallery = document.createElement("article");
    const imgGallery = document.createElement("img");
    const legendeImg = document.createElement("figcaption");

    gallery.appendChild(ficheGallery);
    ficheGallery.appendChild(imgGallery);
    ficheGallery.appendChild(legendeImg);

    imgGallery.src = travaux[i].imageUrl;
    legendeImg.innerText = travaux[i].title;
  }
}

const filters = document.querySelector(".filters");
const btnTous = document.createElement("button");
const btnObjet = document.createElement("button");
const btnAppartement = document.createElement("button");
const btnHotelRestaurant = document.createElement("button");

btnTous.innerText = "Tous";
btnObjet.innerHTML = "Objets";
btnAppartement.innerHTML = "Appartements";
btnHotelRestaurant.innerHTML = "Hotels & restaurants";

btnTous.classList.add("button_filters");
btnObjet.classList.add("button_filters");
btnAppartement.classList.add("button_filters");
btnHotelRestaurant.classList.add("button_filters");

filters.appendChild(btnTous);
filters.appendChild(btnObjet);
filters.appendChild(btnAppartement);
filters.appendChild(btnHotelRestaurant);

// Filtrer par tous
btnTous.addEventListener("click", () => {
  const travauxFiltrees = travaux.filter(
    (travail) => travail.categoryId === 1 || 2 || 3
  );

  btnHotelRestaurant.classList.remove("click_color");
  btnObjet.classList.remove("click_color");
  btnAppartement.classList.remove("click_color");
  btnTous.classList.add("click_color");

  gallery.innerHTML = "";
  generationGallery(travauxFiltrees);
});

// Filtrer objets
btnObjet.addEventListener("click", () => {
  const travauxFiltrees = travaux.filter((travail) => travail.categoryId === 1);

  btnHotelRestaurant.classList.remove("click_color");
  btnTous.classList.remove("click_color");
  btnAppartement.classList.remove("click_color");
  btnObjet.classList.add("click_color");

  gallery.innerHTML = "";
  generationGallery(travauxFiltrees);
});

// Filtrer par appartements
btnAppartement.addEventListener("click", () => {
  const travauxFiltrees = travaux.filter((travail) => travail.categoryId === 2);

  btnHotelRestaurant.classList.remove("click_color");
  btnTous.classList.remove("click_color");
  btnObjet.classList.remove("click_color");
  btnAppartement.classList.add("click_color");

  gallery.innerHTML = "";
  generationGallery(travauxFiltrees);
});

// Filtrer par hotels et restaurants
btnHotelRestaurant.addEventListener("click", () => {
  const travauxFiltrees = travaux.filter((travail) => travail.categoryId === 3);

  btnTous.classList.remove("click_color");
  btnAppartement.classList.remove("click_color");
  btnObjet.classList.remove("click_color");
  btnHotelRestaurant.classList.add("click_color");

  gallery.innerHTML = "";
  generationGallery(travauxFiltrees);
});

function gererAdmin() {
  const token = window.localStorage.getItem("token");
  const adminMode = document.querySelector(".admin-mode");
  const editMode = document.querySelector(".edit-mode");
  const editProjet = document.querySelector(".edit-projet");
  const logout = document.querySelector(".logout");
  const login = document.querySelector(".login");
  const titleModifier = document.querySelector(".title-modifier");
  const modifier = document.querySelector(".title-modifier a");
  const modale = document.querySelector(".modale");
  const closeModale = document.querySelector(".close-modale");
  const galleryModale = document.querySelector(".gallery-modale");
  const articleImg = document.querySelector(".gallery-modale article");

  // Accès pour l'administrateur
  if (token) {
    adminMode.style.display = "flex";
    logout.style.display = "flex";
    editMode.style.display = "flex";
    editProjet.style.display = "flex";
    modifier.style.display = "flex";
    login.style.display = "none";
    filters.style.display = "none";
    titleModifier.style.margin = "75px";

    // bouton déconnection administrateur
    logout.addEventListener("click", () => {
      window.localStorage.removeItem("token");
      window.location.href = "http://127.0.0.1:5500/FrontEnd/login.html";
    });

    // bouton ouverture de la modale
    modifier.addEventListener("click", (event) => {
      event.preventDefault();
      modale.style.display = "flex";
      galleryModale.innerHTML = "";
      generationModale(travaux);
      gererSuppressionImg(travaux);
    });

    // bouton fermeture de la modale
    closeModale.addEventListener("click", (event) => {
      event.preventDefault();
      modale.style.display = "none";
    });
  } else {
    adminMode.style.display = "none";
    logout.style.display = "none";
  }
}

// création des fiches pour la modale
function generationModale(travaux) {
  galleryModale = document.querySelector(".gallery-modale");
  for (let i = 0; i < travaux.length; i++) {
    const article = document.createElement("article");
    const img = document.createElement("img");
    const logoPoubelle = document.createElement("i");
    logoPoubelle.classList.add("bin");

    logoPoubelle.innerHTML = `<i class="fa-solid fa-trash-can"></i>`;
    img.src = travaux[i].imageUrl;

    galleryModale.appendChild(article);
    article.appendChild(img);
    article.appendChild(logoPoubelle);
  }
}

function gererSuppressionImg() {
  const bin = document.querySelectorAll(".bin");

  bin.forEach((bin) => {
    // COMMENT RELIER LA POUBELLE A LIMAGE SUR LAQUELLE ELLE SE TROUVE POUR POUVOIR LES SUPPRIMER ?
    bin.addEventListener("click", (event) => {
      event.preventDefault();
    });
  });
}

gererAdmin();

async function init() {
  await categorieApi();
  await travauxApi();
  generationGallery(travaux);
}

init();
