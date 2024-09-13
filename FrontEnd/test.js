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
  const closeModale = document.querySelectorAll(".close-modale");
  const ajoutModale = document.querySelector(".ajout-modale");
  const contentModale = document.querySelector(".showgallerymodal");

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

    // bouton déconnexion administrateur
    logout.addEventListener("click", () => {
      window.localStorage.removeItem("token");
      window.location.href = "login.html";
    });

    // bouton ouverture de la modale
    modifier.addEventListener("click", (event) => {
      event.preventDefault();
      modale.innerHTML = "";
      modale.style.display = "flex";
      modale.setAttribute("aria-hidden", "false");
      createModale(travaux);
      gererSuppressionImg();
    });

    // bouton fermeture de la modale
    closeModale.forEach((close) => {
      close.addEventListener("click", (event) => {
        event.preventDefault();
        modale.style.display = "none";
        restaurerModale();
      });
    });
  } else {
    adminMode.style.display = "none";
    logout.style.display = "none";
  }
}

// création des fiches pour la modale
function createModale(travaux) {
  const modale = document.querySelector(".modale");

  const contentModale = `
          <div class="box-modale showgallerymodal">
            <i class="fa-solid fa-xmark close-modale"></i>
            <h3>Galerie photo</h3>
            <div class="gallery-modale"></div>
            <button class="btn-modale">Ajouter une photo</button>
          </div>`;

  modale.insertAdjacentHTML("afterbegin", contentModale);

  // On peuple les images sur la modale
  for (const el of travaux) {
    const article = document.createElement("article");
    const img = document.createElement("img");
    const logoPoubelle = document.createElement("i");
    logoPoubelle.classList.add("bin", "fa-solid", "fa-trash-can");

    // AJOUTER L'ID SUR LE LOGO POUBELLE

    logoPoubelle.dataset.id = el.id;
    article.dataset.id = el.id;
    img.src = el.imageUrl;

    const galleryModale = document.querySelector(".gallery-modale");
    galleryModale.appendChild(article);
    article.appendChild(img);
    article.appendChild(logoPoubelle);

    galleryModale.style.display = "flex";
    galleryModale.style.width = "100%";
    galleryModale.style.justifyContent = "center";
  }

  addListenerToCloseButtons();
  // Au clic sur BTN modale
  const btnAjoutPhotoModale = document.querySelector(".btn-modale");
  btnAjoutPhotoModale.addEventListener("click", (e) => {
    e.preventDefault();
    const contentModale = document.querySelector(".showgallerymodal");
    contentModale.style.display = "none";

    const addModale = `
          <div class="box-modale ajout-modale">
            <i class="fa-solid fa-arrow-left back-modale"></i>
            <i class="fa-solid fa-xmark close-modale"></i>
            <h3>Ajout photo</h3>
            <form class="ajout-photo">
              <div class="container-input-fichier">
              <i class="fa-regular fa-image"></i>
                <button class="btn-ajout-photo">
                  <input type="file" accept="image/*" id="image" class="input-fichier" name="image" />
                  + Ajouter photo
                </button>
                <span>jpg, png : 4mo max</span>
              </div>
              <div class="input-modale">
              <label for="titre">Titre</label>
              <input type="text" id="titre" name="Titre" />
              </div>
              <div class="input-modale border-bottom">
                <label for="categorie">Catégorie</label>
                <select class="select-option" id="categorie">
                </select>
              </div>
              <button class="btn-submit">Valider</button>
            </form>
          </div>`;
    modale.insertAdjacentHTML("afterbegin", addModale);
    const selectOption = document.querySelector(".select-option");
    const btnAjoutFichier = document.querySelector(".input-fichier");
    const titre = document.querySelector("#titre");
    const categorieInput = document.querySelector("#categorie");
    const imageInput = document.querySelector("#image");

    btnAjoutFichier.onchange = function () {
      const reader = new FileReader();
      const fichier = btnAjoutFichier.files[0];

      if (!fichier) {
        console.error("Aucun fichier sélectionné");
        return;
      }

      reader.readAsDataURL(fichier);

      reader.onload = function (e) {
        const containerInputFile = document.querySelector(
          ".container-input-fichier"
        );
        document.querySelector(".fa-image").style.display = "none";
        document.querySelector(".btn-ajout-photo").style.display = "none";
        document.querySelector(".container-input-fichier span").style.display =
          "none";
        document.querySelector(".container-input-fichier").style.padding = "0";
        const imageAjout = document.createElement("img");
        imageAjout.id = "image-ajout";
        imageAjout.style.width = "100%";
        imageAjout.style.height = "180px";
        imageAjout.style.objectFit = "contain";
        imageAjout.src = e.target.result;
        containerInputFile.appendChild(imageAjout);
      };
    };

    for (const el of categorie) {
      const nameCategorie = el.name;
      const option = document.createElement("option");
      option.innerText = nameCategorie;
      option.setAttribute("data-id", `${el.id}`);
      console.log(option);
      selectOption.appendChild(option);
    }

    addListenerToAjoutPhoto();
    addListenerToBackButton();
    addListenerToCloseButtons();
  });
}

// Gestion de la modale

function addListenerToBackButton() {
  const backButton = document.querySelector(".back-modale");
  backButton.addEventListener("click", (e) => {
    e.preventDefault();
    const contentModale = document.querySelector(".showgallerymodal");
    contentModale.style.display = "flex";
    const ajoutmodale = document.querySelector(".ajout-modale");
    ajoutmodale.style.display = "none";
  });
}

function addListenerToCloseButtons() {
  const closeButton = document.querySelectorAll(".close-modale");
  closeButton.forEach((close) => {
    close.addEventListener("click", (event) => {
      event.preventDefault();
      // Sélectionne tout ce qu'il y a DANS la modale et on le supprime
      const modale = document.querySelector(".modale");
      modale.style.display = "none";
    });
  });
}

async function addListenerToAjoutPhoto() {
  const ajoutPhoto = document.querySelector(".ajout-photo");

  ajoutPhoto.addEventListener("submit", async (e) => {
    e.preventDefault();

    token = localStorage.getItem("token");
    const formData = new FormData();
    const titre = document.querySelector("#titre").value;
    const categorie = document.querySelector("#categorie").value;
    const imageInput = document.querySelector("#image");

    if (!imageInput || !imageInput.files || imageInput.files.length === 0) {
      console.log("empty");
      alert("Veuillez sélectionner un fichier image.");
      return;
    }

    const image = imageInput.files[0]; // Récupération du fichier sélectionné

    if (titre === "" || categorie === "" || !image) {
      alert("Veuillez remplir tous les champs");
      return;
    }

    if (token) {
      formData.append("title", titre);
      formData.append("categoryId", categorie);
      formData.append("image", image);

      try {
        // Exécute la requête POST
        const reponse = await fetch("http://localhost:5678/api/works", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        });

        // Récupère la réponse JSON
        const reponseJson = await reponse.json();

        if (reponseJson.message === "Work created") {
          // Création d'un nouvel article avec l'image et la description
          const article = document.createElement("article");
          const img = document.createElement("img");
          const description = document.createElement("figcaption");

          description.dataset.id = reponseJson.id;
          article.dataset.id = reponseJson.id;
          img.src = reponseJson.imageUrl;

          const galleryModale = document.querySelector(".gallery-modale");
          galleryModale.appendChild(article);
          article.appendChild(img);
          article.appendChild(description);

          // Affichage de la galerie
          galleryModale.style.display = "flex";
          galleryModale.style.width = "100%";
          galleryModale.style.justifyContent = "center";
        } else {
          console.error("Erreur lors de la création");
        }
      } catch (error) {
        // Gestion des erreurs
        console.error("Erreur lors de la requête :", error);
      }
    } else {
      console.error("Aucun token trouvé");
    }
  });
}

async function gererSuppressionImg() {
  const bin = document.querySelectorAll(".bin");

  bin.forEach((bin) => {
    bin.addEventListener("click", async (e) => {
      e.preventDefault();
      const id = e.target.dataset.id;

      const token = localStorage.getItem("token");
      console.log(token);

      try {
        const reponse = await fetch(`http://localhost:5678/api/works/${id}`, {
          method: "DELETE",
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const reponseJson = await reponse.json();
        console.log(reponseJson.message);
        if (reponseJson.message === "Work deleted") {
          const article = document.querySelectorAll(`[data-id="${id}"]`);
          article.forEach((article) => {
            article.remove();
          });
        } else {
          console.error("erreur lors de la suppression");
        }
      } catch (error) {
        console.error(error);
      }
    });
  });
}
// récupérer le token dans le local storage

async function init() {
  categorie = await categorieApi();
  travaux = await travauxApi();
  generationGallery(travaux);
  gererAdmin(travaux);
}

init();
