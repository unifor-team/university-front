const url = "http://localhost:8080/api/v1/user";

let users;
let currentId;

async function deleteUser() {
  const token = localStorage.getItem("token");
  const headers = {
    Authorization: `Bearer ${token}`
  };

  try {
    await axios.delete(`${url}/${currentId}`, { headers: headers });
    setTimeout(async () => {
      const modalContainer = document.querySelector(".modal-container");
      modalContainer.classList.add("modal-none");
      window.location.reload();
    }, 500);
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
    const itemRole = createElement("div", "ag-courses-item_role");
    const itemDate = createElement("div", "ag-courses-item_date-box");
    const spanItemDate = createElement("span", "ag-courses-item_date");

    spanItemDate.innerHTML = parseDateTimeToDate(user.createdAt);
    itemDate.innerHTML = "Registrado em: ";

    itemDate.appendChild(spanItemDate);

    itemTitle.innerHTML = user.name;
    itemSubtitle.innerHTML = user.email;
    itemRole.innerHTML = "Cargo: " + user.role;
    anchor.appendChild(itemBg);
    anchor.appendChild(itemTitle);
    anchor.appendChild(itemSubtitle);
    anchor.appendChild(itemRole);
    anchor.appendChild(itemDate);

    item.appendChild(anchor);
    itemContainer.appendChild(item);
  });
}
