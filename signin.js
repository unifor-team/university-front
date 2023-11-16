const url = 'http://localhost:8080/api/v1/login'

if (localStorage.getItem("token")) {
   window.location.replace("index.html");
}

async function addNewUser() {
   userData = {
      "email": document.querySelector("#email").value,
      "password": document.querySelector("#password").value
   }
   if (userData.email == "") {
      alert('Campo Email é obrigatório!')
   }
   if (userData.password == "") {
      alert('Campo Password é obrigatório!')
   }
   await axios.post(url, userData)
      .then((response) => {
         localStorage.setItem("token", JSON.stringify(response.data.token))
         setTimeout(() => {
            window.location.replace("index.html");
         }, 2000);
      })
      .catch(error => alert('usuário ou senha incorreto!'));
}

