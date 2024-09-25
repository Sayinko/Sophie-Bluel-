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
  } else {
    adminMode.style.display = "none";
    logout.style.display = "none";
  }
}

// création des fiches pour la modale
function createModale(travaux) {
  const modale = document.querySelector(".modale");

  const contentModale = `
          <div class="fond-modale"></div>
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
  }
  addEventListenerToCloseModale();
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
              <div class="message-erreur">
                <span><i class="fa-solid fa-triangle-exclamation"></i>Veuillez remplir tout les champs</span>
              </div>
            </form>
          </div>`;
    modale.insertAdjacentHTML("afterbegin", addModale);
    const selectOption = document.querySelector(".select-option");
    const btnAjoutFichier = document.querySelector(".input-fichier");
    const containerSpan = document.querySelector(".message-erreur");

    containerSpan.style.display = "none";

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
      // console.log(option);
      selectOption.appendChild(option);
    }

    addListenerToAjoutPhoto();
    addListenerToInputValue();
    addEventListenerToCloseModale();
    addListenerToBackButton();
    addListenerToCloseButtons();
  });
}

// Gestion de la modale

// FONCTION QUI FERME LA MODALE AU CLIC SUR L'ARRIERE PLAN
function addEventListenerToCloseModale() {
  const fondModale = document.querySelector(".fond-modale");
  const modale = document.querySelector(".modale");

  fondModale.addEventListener("click", (e) => {
    e.preventDefault();
    modale.style.display = "none";
  });
}

// FUNCTION QUI RETOURNE EN ARRIERE AU CLIC SUR LA FLECHE
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

// FONCTION QUI FERME LA MODALE AU CLIC SUR LA CROIX
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

// FONCTION QUI GERE LES DIFFERENTS LISTENERS
function addListenerToInputValue() {
  const titre = document.getElementById("titre");
  const imageInput = document.getElementById("image");
  const btnSubmit = document.querySelector(".btn-submit");

  titre.addEventListener("input", verificationEntreeValeurs);
  imageInput.addEventListener("change", verificationEntreeValeurs);
  btnSubmit.addEventListener("click", verificationValeursEnvoieFormulaire);
}

// FONCTION VERIFIER VALEUR LORSQUE L'ON RENTRE DES DONNES DANS LES CHAMPS DU FORMULAIRE
function verificationEntreeValeurs() {
  const titre = document.getElementById("titre").value;
  const imageInput = document.getElementById("image").files[0];

  if (titre === "") {
    document.querySelector(".btn-submit").style.backgroundColor = "#A7A7A7";
    document.querySelector(".btn-submit").style.border = "#A7A7A7";
  } else {
    document.querySelector(".btn-submit").style.backgroundColor = "#1D6154";
    document.querySelector(".btn-submit").style.border = "#1D6154";
    document.getElementById("titre").style.border = "none";
    document.querySelector(".input-modale label").style.color = "black";
  }

  if (!imageInput) {
    document.querySelector(".btn-submit").style.backgroundColor = "#A7A7A7";
    document.querySelector(".btn-submit").style.border = "#A7A7A7";
  } else {
    document.querySelector(".btn-submit").style.backgroundColor = "#1D6154";
    document.querySelector(".btn-submit").style.border = "#1D6154";
    document.querySelector(".container-input-fichier").style.border = "none";
  }
}

// FONCTION VERIFIER VALEUR LORSQUE QUE L'ON CLIQUE SUR LE BOUTON <ENVOYER>
function verificationValeursEnvoieFormulaire() {
  const titre = document.getElementById("titre").value;
  const imageInput = document.getElementById("image").files[0];

  if (titre === "") {
    document.getElementById("titre").style.border = "red 1px solid";
    document.querySelector(".input-modale label").style.color = "red";
    const containerSpan = document.querySelector(".message-erreur");
    const span = document.querySelector(".message-erreur span");
    const iconeWarning = document.querySelector(".fa-triangle-exclamation");

    containerSpan.style.display = "flex";
    containerSpan.style.justifyContent = "center";
    span.style.display = "flex";
    iconeWarning.style.marginRight = "5px";
  } else {
    document.getElementById("titre").style.border = "none";
    document.querySelector(".input-modale label").style.color = "black";
  }

  if (!imageInput) {
    document.querySelector(".container-input-fichier").style.border =
      "red 1px solid";
    const containerSpan = document.querySelector(".message-erreur");
    const span = document.querySelector(".message-erreur span");
    const iconeWarning = document.querySelector(".fa-triangle-exclamation");

    containerSpan.style.display = "flex";
    containerSpan.style.justifyContent = "center";
    span.style.display = "flex";
    iconeWarning.style.marginRight = "5px";
  } else {
    document.querySelector(".container-input-fichier").style.border = "none";
  }
}

// FONCTION POUR AJOUTER UNE PUBLICATION AU CLIC SUR LE BOUTON
async function addListenerToAjoutPhoto() {
  const ajoutPhoto = document.querySelector(".ajout-photo");

  ajoutPhoto.addEventListener("submit", async (e) => {
    e.preventDefault();

    // console.log("la page n'a pas été actualisée");

    let token = localStorage.getItem("token");
    // console.log(token, "token récupéré");

    const formData = new FormData();
    const titre = document.querySelector("#titre").value;
    const categorie = document.querySelector("#categorie option:checked")
      .dataset.id;
    const imageInput = document.querySelector("#image");

    const image = imageInput.files[0];
    // console.log(image);

    if (token) {
      formData.append("title", titre);
      formData.append("category", categorie);
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
        console.log("réponse du serveur : ", reponseJson);

        if (reponse.status === 201) {
          travaux.push(reponseJson); // Ajout de l'image dans la variable travaux
          // console.log("nouvelle image ajoutée avec succès");
          // console.log("nouvelle image ajoutée avec succès");
          // Création d'un nouvel article avec l'image et la description
          const newElement = `<article data-id="${reponseJson.id}">
                                  <img src="${reponseJson.imageUrl}">
                                  <figcaption>${reponseJson.title}</figcaption>
                              </article>`;

          const gallery = document.querySelector(".gallery");
          gallery.insertAdjacentHTML("beforeend", newElement);

          // Injecter dans la modale
          const galleryModale = document.querySelector(".gallery-modale");
          const newModaleElement = `<article data-id="${reponseJson.id}">
                                      <img src="${reponseJson.imageUrl}">
                                      <i class="bin fa-solid fa-trash-can" data-id="${reponseJson.id}"></i>
                                    </article>`;
          galleryModale.insertAdjacentHTML("beforeend", newModaleElement);

          // Fermeture de la modale
          const contentModale = document.querySelector(".showgallerymodal");
          contentModale.style.display = "flex";
          const ajoutmodale = document.querySelector(".ajout-modale");
          ajoutmodale.style.display = "none";

          // Gestion de la suppression
          gererSuppressionImg();
        } else {
          console.error(
            "Erreur lors de la création :",
            reponseJson.error || "Erreur inconnue"
          );
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

// FONCTION POUR SUPPRIMER DES IMG AU CLIC SUR LA POUBELLE
async function gererSuppressionImg() {
  const bin = document.querySelectorAll(".bin");

  bin.forEach((bin) => {
    bin.addEventListener("click", async (e) => {
      e.preventDefault();
      const id = parseInt(e.target.dataset.id);

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
        if (reponse.status === 204) {
          // Chercher dans la variable travaux et supprimer l'élément (conversion en int de l'id (ligne 481))
          const index = travaux.findIndex((travaux) => travaux.id === id);
          travaux.splice(index, 1);

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
