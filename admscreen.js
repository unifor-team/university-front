const url = "http://localhost:8080/api/v1/user";

let users;
let currentId;

const token = localStorage.getItem("token");

if (token) {
  const decodedToken = jwtDecode(token);
  const username = document.querySelector(".user-name");
  username.innerHTML = decodedToken.Name;
  const divError = createElement("div", "divError")
  const errorMessage = createElement("h1", "errorMessage")
  const body = document.querySelector(".adm-page")
  body.appendChild(divError)
  errorMessage.innerHTML = "PAGE NOT FOUND - 404"
  divError.appendChild(errorMessage)


  

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


document.addEventListener('DOMContentLoaded', () => {
  "use strict";

  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load',() => {
      setTimeout(()=>{
        preloader.remove();
      }, 1000)
    });
  }
})

async function deleteUser() {
  const token = localStorage.getItem("token");
  const headers = {
    Authorization: `Bearer ${token}`
  };

  try {
    await axios.delete(`${url}/${currentId}`, { headers: headers });
    renderToastify("Deletado com sucesso!");
    setTimeout(async () => {
      const modalContainer = document.querySelector(".modal-container");
      modalContainer.classList.add("modal-none");
      window.location.reload();
    }, 1500);
  } catch (err) {
    console.log(err);
  }
}

function parseDateTimeToDate(datetime) {
  if (!datetime) return "";

  const date = new Date(datetime);
  const dateString = date.toISOString();
  const [year, month, day] = dateString.split("T")[0].split("-");

  return `${day}/${month}/${year}`;
}

function createElement(tag, className) {
  const element = document.createElement(tag);
  element.classList.add(className);
  return element;
}

async function getAllUsers() {
  const token = localStorage.getItem("token");
  const headers = {
    Authorization: `Bearer ${token}`
  };

  users = (await axios.get(url, { headers: headers })).data;
  listUsersOnScreen();
  
}
window.onload = getAllUsers();
 


function closeModal(){
  const modalContainer = document.querySelector(".modal-container");
  modalContainer.classList.add("modal-none")
}

function listUsersOnScreen() {
  if (!users) return;

  // if (bgItemUsers) {
  //   bgItemUsers.innerHTML = "";
  // }

  const itemContainer = document.querySelector(".ag-courses_box");

  users.forEach(user => {
    const modalContainer = document.querySelector(".modal-container");
    const item = createElement("div", "ag-courses_item");

    item.onclick = function () {
      modalContainer.classList.remove("modal-none");
      currentId = user.id;
    };

    modalContainer.onclick = function (event) {
      const doesntHasClass = !modalContainer.classList.contains("modal-none");
      if (event.target === modalContainer && doesntHasClass) {
        modalContainer.classList.add("modal-none");
      }
    };

    const anchor = createElement("a", "ag-courses-item_link");
    anchor.href = "#";

    const itemBg = createElement("div", "ag-courses-item_bg");
    const itemTitle = createElement("div", "ag-courses-item_title");
    const itemSubtitle = createElement("div", "ag-courses-item_subtitle");
    const itemDate = createElement("div", "ag-courses-item_date-box");
    const spanItemDate = createElement("span", "ag-courses-item_date");

    spanItemDate.innerHTML = parseDateTimeToDate(user.createdAt);
    itemDate.innerHTML = "Registrado em: ";

    itemDate.appendChild(spanItemDate);

    itemTitle.innerHTML = user.name;
    itemSubtitle.innerHTML = user.email;

    anchor.appendChild(itemBg);
    anchor.appendChild(itemTitle);
    anchor.appendChild(itemSubtitle);
    anchor.appendChild(itemDate);

    item.appendChild(anchor);
    itemContainer.appendChild(item);
  });
}
