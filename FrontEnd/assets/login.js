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
      alert(`L'email "${email}" ou le mot de passe est incorrect`);
    } else {
      const login = await reponse.json();
      const token = login.token;
      console.log(token);
      const cle = login.userId;

      localStorage.setItem("token", token);
      localStorage.setItem("cle", cle);

      if (email === "sophie.bluel@test.tld" && password === "S0phie") {
        window.localStorage.setItem("admin", "true");
      } else {
        window.localStorage.setItem("admin", "false");
      }

      window.location.href = "http://127.0.0.1:5500/FrontEnd/index.html";
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
