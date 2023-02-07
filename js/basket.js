import { products } from "./products.js";
import { addToCart } from "./app.js";

const $ = document;

let basket = [];
if (localStorage.getItem("basket") != null) {
  basket = JSON.parse(localStorage.getItem("basket"));
}

let users = [];
if (localStorage.getItem("users") != null) {
  users = JSON.parse(localStorage.getItem("users"));
}

let userOnline = [];
if (localStorage.getItem("userOnline") != null) {
  userOnline = JSON.parse(localStorage.getItem("userOnline"));
}


const renderCartItems = () => {
	if (localStorage.getItem("basket") != null) {
		basket = JSON.parse(localStorage.getItem("basket"));
	}
  const cartDiv = document.querySelector(".basketTable tbody");
  if (cartDiv != null) {
    cartDiv.innerHTML = "";
  }
  const totalPriceEl = document.querySelector(".cart__total-price");
  let totalPrice = 0;

  if (basket.length === 0) {
    if (cartDiv != null) {
      cartDiv.innerHTML = "There are no products in the shopping cart!";
    }
  } else {
    basket.forEach((item) => {
      totalPrice += item.total;
      cartDiv.innerHTML += `<tr>
			<td>
				<img src=./assets/images/${item.images[0]}>
			</td>
			<td>${item.title}</td>
			<td>
			<span class="deleteProduct" data-id="${item.id}">
			<svg fill="#000000" width="24px" height="24px" viewBox="-1.7 0 20.4 20.4" xmlns="http://www.w3.org/2000/svg" class="cf-icon-svg"><path d="M16.416 10.283A7.917 7.917 0 1 1 8.5 2.366a7.916 7.916 0 0 1 7.916 7.917zm-2.958.01a.792.792 0 0 0-.792-.792H4.32a.792.792 0 0 0 0 1.583h8.346a.792.792 0 0 0 .792-.791z"/></svg>
			</span>
			<span class="addProduct" data-id="${item.id}">
			<svg fill="#000000" width="24px" height="24px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12,2A10,10,0,1,0,22,12,10,10,0,0,0,12,2Zm4,11H13v3a1,1,0,0,1-2,0V13H8a1,1,0,0,1,0-2h3V8a1,1,0,0,1,2,0v3h3a1,1,0,0,1,0,2Z"/></svg>
			</span>
			</td>
			<td>${item.qty}</td>
			<td>$${item.price.off * item.qty}</td>
		</tr>
			`;
    });
  }
  if (totalPriceEl != null) {
    totalPriceEl.innerHTML = `$${totalPrice}`;
  }
  const deleteProducts = $.querySelectorAll(".deleteProduct").forEach(
    (item) => {
      item.addEventListener("click", () => removeFormCart(+item.dataset.id));
    }
  );
  const addProducts = $.querySelectorAll(".addProduct").forEach((item) => {
    item.addEventListener("click", () => {
      addToCart(+item.dataset.id);
      renderCartItems();
    });
  });
  setBasketBallet();
};

renderCartItems();

const removeFormCart = (productId) => {
  let newCartItems = basket.reduce((state, item) => {
    if (item.id === productId) {
      const newItem = {
        ...item,
        qty: item.qty - 1,
        total: (item.qty - 1) * item.price.off,
      };
      if (newItem.qty > 0) {
        return [...state, newItem];
      } else {
        return state;
      }
    }
    return [...state, item];
  }, []);
  basket = newCartItems;
  localStorage.setItem("basket", JSON.stringify(basket));
  renderCartItems();
};


const clearBasket = $.querySelector(".clearBasket").addEventListener("click",()=>{
	basket = [];
	localStorage.setItem("basket", JSON.stringify(basket));
	renderCartItems();
	setBasketBallet();
})