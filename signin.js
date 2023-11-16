const url = 'http://localhost:8080/api/v1/login'

if(localStorage.getItem("token")){
    window.location.replace("index.html");
  }
async function addNewUser(){
        userData = {
        "email": document.querySelector("#email").value,
        "password": document.querySelector("#password").value
     }
     if(userData.email == ""){
        alert('Campo Email é obrigatório!')
     }
     if(userData.password == ""){
        alert('Campo Password é obrigatório!')
     }
    await axios.post(url, userData)
    .then(response =>{
        console.log(response.data);
        window.location.replace("index.html")
        localStorage.setItem("token", JSON.stringify(response.data))
    })
    .catch(error => alert('usuário ou senha incorreto!'));
    console.log(teste);
    
}

