const form = document.querySelector(".form");
let user = true;

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const email = document.getElementById("mail").value;
  const password = document.getElementById("pass").value;
  const connexionError = document.getElementById("connexion-error");
  const apiLogin = "http://localhost:5678/api/users/login";

  try {
    const reponse = await fetch(apiLogin, {
      method: "post",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!reponse.ok) {
      connexionError.classList.add("error-message");
      connexionError.innerHTML = `L'email ${email} ou le mot de passe est incorrect`;
      // SUPPRIMER L'ERREUR AU BOUT DE 7 SECONDES
      setTimeout(() => {
        connexionError.innerHTML = "";
        connexionError.classList.remove("error-message");
      }, 7000);
    } else {
      const login = await reponse.json();
      const token = login.token;

      localStorage.setItem("token", token);

      window.location.href = "index.html";
    }
  } catch (error) {
    console.error("il ya une erreur : " + error);
  }
});

/*const header = document.querySelector("header");
const divEtatConnexion = document.createElement("div");
const etatConnnexion = document.createElement("p");
const logoEditionMode = `<i class="fa-regular fa-pen-to-square"></i>`;

divEtatConnexion.classList.add("container-etat-connexion");
etatConnnexion.classList.add("etat-connexion");
logoEditionMode.classList.add("logo-connexion");

header.appendChild(divEtatConnexion);
divEtatConnexion.appendChild(etatConnnexion);
divEtatConnexion.appendChild(logoEditionMode);

function loginAdmin() {
  if (user === true) {
  }
}*/
