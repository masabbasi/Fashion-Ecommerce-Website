import { products } from "./products";
const search = document.querySelector("#searchInput");
const searchResult = document.querySelector(".search-result");

search.addEventListener("input", updateResult);

function updateResult() {
  searchResult.style.display = "block";
  let keyword = search.value;
  if (keyword.length > 0 && keyword.length < 3) {
    searchResult.innerHTML = "Enter at least 3 letters...";
  } else if (keyword.length >= 3) {
    searchResult.innerHTML = "";
    const resultItems = products.filter((item) => {
      item.title.toLowerCase() === keyword.toLowerCase();
    });
    createResult(resultItems);
  } else {
    searchResult.style.display = "none";
  }

  function createResult(data) {
    if (data.length === 0) {
      searchResult.innerHTML = "Not Found!";
    } else {
      for (let i = 0; i < data.length; i++) {
        let a = document.createElement("a");
        a.classList.add("link-result");
        a.setAttribute("href", `#`);
        let div1 = document.createElement("div");
        div1.classList.add("search-result-item");
        let div2 = document.createElement("div");
        div2.classList.add("search-result-img");
        let img = document.createElement("img");
        let src = `${data[i].images[0]}`;
        img.setAttribute("src", `${src}`);
        let div3 = document.createElement("div");
        div3.classList.add("search-result-name");
        div3.innerText = `${data[i].title}`;
        div2.appendChild(img);
        div1.appendChild(div2);
        div1.appendChild(div3);
        a.appendChild(div1);
        searchResult.appendChild(a);
      }
    }
  }
}
