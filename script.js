"use strict";

const table = document.querySelector("table");

const cleanBtn = document.getElementById("clean");

const reloadBtn = document.getElementById("reload");

const getBtn = document.getElementById("get");

const deleteBtn = document.getElementById("delete");

const bottomInputs = document.querySelectorAll(".bottomInput");

const messsage = document.getElementById("message");

const resetTable = () => {
  table.innerHTML = ` <tr>
        <th>Post ID</th>
        <th>User ID</th>
        <th id="wider">Titles</th>
        <th></th>
      </tr>`;
};

const fetchData = async () => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts`);
  const data = await res.json();
  data.forEach((d, index) => {
    if (index >= 5) return;
    const tr = document.createElement("tr");
    tr.innerHTML = `        <tr>
    <td>${d.userId}</td>
    <td>${d.id}</td>
    <td>${d.title}</td>
    <td><input id="checkboxInput" type="checkbox" /></td>
  </tr>`;
    table.append(tr);
  });

  let checkBoxes = document.querySelectorAll("input[type=checkbox]");
  let rows = document.querySelectorAll("tr");

  let counter = 0;
  rows = [...Array.from(rows)];
  checkBoxes = [...Array.from(checkBoxes)];

  deleteBtn.addEventListener("click", () => {
    checkBoxes.forEach((checkBox, checkIndex) => {
      if (checkBox.checked) {
        rows[checkIndex + 1].classList.add("hidden");
      }
    });
  });
};

fetchData();

cleanBtn.addEventListener("click", () => {
  messsage.className = "hidden";
  resetTable();
});

reloadBtn.addEventListener("click", () => {
  messsage.className = "hidden";
  resetTable();
  fetchData();
});

const fetchSpecificData = async (id, userId) => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
  const d = await res.json();
  resetTable();
  messsage.className = "hidden";
  // console.log(d);
  // console.log(userId, d.userId);
  if (d.userId == userId) {
    const tr = document.createElement("tr");
    tr.innerHTML = `        <tr>
      <td>${d.userId}</td>
      <td>${d.id}</td>
      <td>${d.title}</td>
      <td></td>
    </tr>`;
    table.append(tr);
    messsage.classList.add("hidden");
  } else if (userId && d.userId != userId) {
    messsage.classList.remove("hidden");
  }
};

bottomInputs.forEach((input) => {
  input.addEventListener("change", () => {
    let userId = bottomInputs[0].value;
    let postId = bottomInputs[1].value;
    getBtn.addEventListener("click", (e) => {
      e.preventDefault();
      fetchSpecificData(postId, userId);
      bottomInputs[0].value = "";
      bottomInputs[1].value = "";
    });
  });
});
