const url = 'http://localhost:8080/api/v1/register'

 if(localStorage.getItem("token")){
   window.location.replace("index.html");
 }
async function addNewUser(){
        newUser = {
        "email": document.querySelector("#email").value,
        "password": document.querySelector("#password").value,
        "name": document.querySelector("#name").value,
        "role": "USER"
     }
     if(newUser.email == ""){
        alert('Campo Email é obrigatório!')
     }
     if(newUser.password == ""){
        alert('Campo Password é obrigatório!')
     }
     if(newUser.name == ""){
        alert('Campo Nome é obrigatório!')
     }
    await axios.post(url, newUser)
    .then(response =>{
        alert('usuário cadastrado!');
        window.location.replace("signin.html")
    })
    .catch(error => console.log(error));
}

