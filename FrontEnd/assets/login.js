async function loginUser() {
  const loginForm = document.querySelector(".form");

  loginForm.addEventListener("submit", async function (event) {
    event.preventDefault();
    const userMail = document.querySelector("#mail").value;
    const password = document.querySelector("#pass").value;

    try {
      const response = await fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: userMail, password: password }),
      });
      const loginDatas = await response.json();
      console.log(loginDatas);
    } catch (error) {
      console.error(
        "Il y a un probleme avec la recupération de l'api loginUsers : ",
        error
      );
    }
  });
}
