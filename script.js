"use strict";

const table = document.querySelector("table");

const cleanBtn = document.getElementById("clean");

const reloadBtn = document.getElementById("reload");

const getBtn = document.getElementById("get");

const deleteBtn = document.getElementById("delete");

const bottomInputs = document.querySelectorAll(".bottomInput");

const messsage = document.getElementById("message");

const fetchData = async () => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts`);
  const data = await res.json();

  let counter = 0;
  let flag = false;

  let delData;

  deleteBtn.addEventListener("click", () => {
    delData = Array.from(data);
    let checkBoxes = document.querySelectorAll("input[type=checkbox]");
    let rows = document.querySelectorAll("tr");
    rows = [...Array.from(rows)];
    checkBoxes = [...Array.from(checkBoxes)];
    checkBoxes.forEach((c, Cindex) => {
      if (c.checked) {
        console.log(Cindex);
        counter++;
        delData.forEach((onedelData, index) => {
          flag = false;
          if (flag == true) return;
          if (
            onedelData.id ==
            String(rows[Cindex + 1].innerHTML)
              .split("</td>")[1]
              .split(">")[1]
          ) {
            flag = true;
            delData.splice(index, 1);
          }
        });
      }
    });
    resetTable();
    delData.forEach((d, index) => {
      if (index >= 5 - counter) return;
      const tr = document.createElement("tr");
      tr.innerHTML = `        <tr>
        <td>${d.userId}</td>
        <td>${d.id}</td>
        <td>${d.title}</td>
        <td><input id="checkboxInput" type="checkbox" /></td>
      </tr>`;
      table.append(tr);
    });
  });

  const fillTable = (data) => {
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
  };

  reloadBtn.addEventListener("click", () => {
    counter = 0;
    messsage.className = "hidden";
    resetTable();
    fillTable(data);
    console.log(data.length);
  });

  resetTable();
  fillTable(data);
};

fetchData();

const resetTable = () => {
  table.innerHTML = ` <tr>
        <th>Post ID</th>
        <th>User ID</th>
        <th id="wider">Titles</th>
        <th></th>
      </tr>`;
};

cleanBtn.addEventListener("click", () => {
  messsage.className = "hidden";
  resetTable();
});

const fetchSpecificData = async (id, userId) => {
  try {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
    const d = await res.json();
    if (Object.keys(d).length === 0) {
      throw new Error("Empty response object");
    }
    resetTable();

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
    } else if (d.userId && d.userId != userId) {
      messsage.classList.remove("hidden");
    } else {
      messsage.classList.add("hidden");
    }
  } catch (error) {
    resetTable();
    console.error("An error occurred:", error);
    messsage.classList.remove("hidden");
  }
};

getBtn.addEventListener("click", (e) => {
  messsage.className = "hidden";
  e.preventDefault();
  if (!bottomInputs[1].value) {
    bottomInputs[1].style.border = "1px solid red";
  } else {
    bottomInputs[1].style.border = "rgba(128, 128, 128, 0.418) solid 1px";
  }
  if (!bottomInputs[0].value) {
    bottomInputs[0].style.border = "1px solid red";
  } else {
    bottomInputs[0].style.border = "rgba(128, 128, 128, 0.418) solid 1px";
  }
  fetchSpecificData(bottomInputs[1].value, bottomInputs[0].value);
  console.log(bottomInputs[0].value, bottomInputs[1].value);
  bottomInputs[0].value = "";
  bottomInputs[1].value = "";
});
