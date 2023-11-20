const url = "http://localhost:8080/api/v1/login";

if (localStorage.getItem("token")) {
  window.location.replace("index.html");
}

const renderToastify = text =>
  Toastify({
    text,
    duration: 3000,
    newWindow: true,
    close: true,
    gravity: "top",
    position: "right",
    stopOnFocus: true,
    style: {
      background: "linear-gradient(to right, #00b09b, #96c93d)"
    },
    onClick: function () {}
  }).showToast();

async function addNewUser() {
  const signinButton = document.querySelector(".button-login");
  const loadDiv = document.createElement("div");
  const signinText = document.querySelector(".signup-text");

  loadDiv.classList.add("lds-facebook");
  loadDiv.appendChild(document.createElement("div"));
  loadDiv.appendChild(document.createElement("div"));
  loadDiv.appendChild(document.createElement("div"));

  signinButton.removeChild(signinText);
  signinButton.appendChild(loadDiv);

  userData = {
    email: document.querySelector("#email").value,
    password: document.querySelector("#password").value
  };

  if (userData.email == "" || userData.password == "") {
    renderToastify("Email ou senha inválida");
  }

  try {
    const response = await axios.post(url, userData);
    renderToastify("Login efetuado com sucesso");
    localStorage.setItem("token", JSON.stringify(response.data.token));
    setTimeout(() => {
      window.location.replace("index.html");
    }, 2000);
  } catch (e) {
    renderToastify("Credenciais incorretas");
    console.log(e.message);
  } finally {
    signinButton.appendChild(signinText);
    signinButton.removeChild(loadDiv);
  }
}
