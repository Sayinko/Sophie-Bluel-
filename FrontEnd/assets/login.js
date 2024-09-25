const form = document.querySelector(".form");

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
