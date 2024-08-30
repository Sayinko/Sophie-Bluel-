let travaux = [];
let categorie = [];

// Récupération des catégories de l'api
async function categorieApi() {
  const reponse = await fetch("http://localhost:5678/api/categories");
  return await reponse.json();
}

// Récupération des travaux de l'api
async function travauxApi() {
  const reponse = await fetch("http://localhost:5678/api/works");
  return await reponse.json();
}

const gallery = document.querySelector(".gallery");

// Génération de la gallerie d'images
function generationGallery(travaux) {
  for (const el of travaux) {
    const ficheGallery = document.createElement("article");
    const imgGallery = document.createElement("img");
    const legendeImg = document.createElement("figcaption");

    gallery.appendChild(ficheGallery);
    ficheGallery.appendChild(imgGallery);
    ficheGallery.appendChild(legendeImg);

    ficheGallery.dataset.id = el.id;
    imgGallery.src = el.imageUrl;
    legendeImg.innerText = el.title;
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

function gererAdmin(travaux) {
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
      window.location.href = "login.html";
    });

    // bouton ouverture de la modale
    modifier.addEventListener("click", (event) => {
      event.preventDefault();
      modale.style.display = "flex";
      modale.setAttribute("aria-hidden", "false");
      galleryModale.innerHTML = "";
      generationModale(travaux);
      gererSuppressionImg(travaux);
    });

    // bouton fermeture de la modale
    closeModale.addEventListener("click", (event) => {
      event.preventDefault();
      modale.style.display = "none";
      restaurerModale();
    });
  } else {
    adminMode.style.display = "none";
    logout.style.display = "none";
  }
}

// création des fiches pour la modale
function generationModale(travaux) {
  galleryModale = document.querySelector(".gallery-modale");

  for (const el of travaux) {
    const article = document.createElement("article");
    const img = document.createElement("img");
    const logoPoubelle = document.createElement("i");
    logoPoubelle.classList.add("bin", "fa-solid", "fa-trash-can");

    // AJOUTER L'ID SUR LE LOGO POUBELLE

    logoPoubelle.dataset.id = el.id;
    article.dataset.id = el.id;
    img.src = el.imageUrl;

    galleryModale.appendChild(article);
    article.appendChild(img);
    article.appendChild(logoPoubelle);
  }
  galleryModale.style.display = "flex";
  galleryModale.style.width = "100%";
  galleryModale.style.justifyContent = "center";

  const btnAjoutPhotoModale = document.querySelector(".btn-modale");
  const boxModale = document.querySelector(".box-modale");

  const initialisationModale = boxModale.innerHTML;

  btnAjoutPhotoModale.addEventListener("click", (e) => {
    e.preventDefault();
    galleryModale.innerHTML = "";
    galleryModale.innerHTML = `              <form class="ajout-modale">
    <input type="file" id="image" name="image" />
    <div class="input-modale">
    <label for="titre">Titre</label>
    <input type="text" id="titre" name="Titre" />
    </div>
    <div class="input-modale">
    <label for="categorie">Catégorie</label>
    <select class="select-option" id="categorie">
    </div>
    </select>
  </form>`;

    document.querySelector(".box-modale h3").innerText = "Ajout photo";
    document.querySelector(".btn-modale").innerText = "Valider";

    const selectOption = document.querySelector(".select-option");

    for (const el of categorie) {
      const nameCategorie = el.name;
      const option = document.createElement("option");
      option.innerText = nameCategorie;
      option.setAttribute("data-id", `${el.id}`);
      console.log(option);
      selectOption.appendChild(option);
    }
    const btnSubmit = btnAjoutPhotoModale.cloneNode(true);
    btnSubmit.innerText = "Valider";
    btnSubmit.classList.add("btn-submit");
    document.querySelector(".ajout-modale").appendChild(btnSubmit);
    btnAjoutPhotoModale.style.display = "none";
  });
}

async function gererSuppressionImg() {
  const bin = document.querySelectorAll(".bin");

  bin.forEach((bin) => {
    bin.addEventListener("click", async (e) => {
      e.preventDefault();
      const id = e.target.dataset.id;
      console.log(`id: ${id}`);

      const reponse = await fetch(`http://localhost:5678/api/works/${id}`, {
        method: "DELETE",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const reponseJson = await reponse.json();
      if (reponseJson.message === "Work deleted") {
        const article = document.querySelectorAll(`[data-id="${id}"]`);
        article.forEach((article) => {
          article.remove();
        });
      }
    });
  });
}

async function init() {
  categorie = await categorieApi();
  travaux = await travauxApi();
  generationGallery(travaux);
  gererAdmin(travaux);
}

init();
