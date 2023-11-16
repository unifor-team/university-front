if(localStorage.getItem('token')){
    document.getElementById('login').style.display = 'none'
    document.getElementById('hide-signup').style.display = 'none'
}
else{
    document.getElementById('logout').style.display = 'none'
}
function logout(){
    localStorage.removeItem('token')
}