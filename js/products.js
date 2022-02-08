let xmlhttp = new XMLHttpRequest();
let current_page = 1;
let records_per_page = 6;
let data = [];
let url = "./data/products.json";
const product1 = document.getElementsByClassName("product-1")[0];
const product2 = document.getElementsByClassName("product-2")[0];
const product3 = document.getElementsByClassName("product-3")[0];

const wrapper = document.getElementsByClassName("wrapper-products")[0];

const btn_next = document.getElementsByClassName("next-button")[0];
const btn_prev = document.getElementsByClassName("previous-button")[0];
const cards = document.getElementsByClassName("card-product")[0];

window.onload = function () {
  if (window.innerWidth < 391) {
    records_per_page = 1;
    productLoad(url);
  }
  productLoad(url);
};

function productLoad(url) {
  xmlhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let array = JSON.parse(xmlhttp.responseText);
      data = array;
      changePage(1);
    }
  };
  xmlhttp.open("GET", url, true);
  xmlhttp.send();
}
//LOAD PRODUCTS

product1.addEventListener("click", () => {
  url = "./data/products.json";
  this.productLoad(url);
});

product2.addEventListener("click", () => {
  url = "./data/test.json";
  this.productLoad(url);
});

//NEXT BUTTON

btn_next.addEventListener("click", function nextPage() {
  if (current_page < numPages()) {
    current_page++;
    changePage(current_page);
  }
});

//PREV BUTTON

btn_prev.addEventListener("click", function prevPage() {
  if (current_page > 1) {
    current_page--;
    changePage(current_page);
  }
});
//CHANGE PAGE
function changePage(page) {
  // Validate page
  if (page < 1) page = 1;
  if (page > numPages()) page = numPages();
  let card = "";

  for (var i = (page - 1) * records_per_page; i < page * records_per_page; i++) {
    if (data[i] !== undefined) {
      card += `<div class="card-product">
      <img alt="image" class="card-image" src='${data[i].image}' />
      <div class="card-name">${data[i].name}</div>
      <div class="card-detail">${data[i].detail}</div>
      <div class="card-price">${data[i].price}€</div>
      </div>`;
    }
  }

  wrapper.innerHTML = card;

  if (page == 1) {
    btn_prev.classList.add("disable");
  } else {
    btn_prev.classList.remove("disable");
  }

  if (page == numPages()) {
    btn_next.classList.add("disable");
  } else {
    btn_next.classList.remove("disable");
  }
}

function numPages() {
  return Math.ceil(data.length / records_per_page);
}
// function resize() {
//   console.log("radi");
//   if (window.innerWidth < 376) {
//     records_per_page = 1;
//     productLoad(url);
//   }
// }
// window.addEventListener("resize", resize);
