const url = 'http://localhost:8080/api/v1/register'

if (localStorage.getItem("token")) {
   window.location.replace("index.html");
}

const renderToastify = (text) => Toastify({
   text,
   duration: 3000,
   newWindow: true,
   close: true,
   gravity: "top",
   position: "right",
   stopOnFocus: true,
   style: {
     background: "linear-gradient(to right, #00b09b, #96c93d)",
   },
   onClick: function(){}
 }).showToast();

async function addNewUser() {
   const signupButton = document.querySelector(".button-signup");
   const loadDiv = document.createElement("div");
   const signupText = document.querySelector(".signup-text");

   loadDiv.classList.add("lds-facebook");
   loadDiv.appendChild(document.createElement("div"));
   loadDiv.appendChild(document.createElement("div"));
   loadDiv.appendChild(document.createElement("div"));

   signupButton.removeChild(signupText);
   signupButton.appendChild(loadDiv);

   const newUser = {
      "email": document.querySelector("#email").value,
      "password": document.querySelector("#password").value,
      "name": document.querySelector("#name").value,
      "role": "USER"
   }

   if (!newUser.email) renderToastify("Campo email está inválido.");
   if (!newUser.password) renderToastify("Campo senha está inválido.");
   if (!newUser.name) renderToastify("Campo nome está inválido.");

   try {
      await axios.post(url, newUser);
      renderToastify("Cadastro efetuado com sucesso.");
      setTimeout(() => {
         window.location.replace("signin.html");
      }, 1000);
   } catch (e) {
      renderToastify(e.message);
   } finally {
      signupButton.appendChild(signupText);
      signupButton.removeChild(loadDiv);

   }
}

