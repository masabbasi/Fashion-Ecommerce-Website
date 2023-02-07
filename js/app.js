import { products } from "./products.js";
import { showProduct } from "./showProduct.js";
import { showTrendingProduct } from "./showTrendingProduct.js";

const $ = document;

let basket = [];
if (localStorage.getItem("basket") != null) {
  basket = JSON.parse(localStorage.getItem("basket"));
}

let favorite = [];
if (localStorage.getItem("favorite") != null) {
  favorite = JSON.parse(localStorage.getItem("favorite"));
}

let sortedProducts = [...products].sort((p1, p2) =>
p1.sale < p2.sale ? 1 : p1.sale > p2.sale ? -1 : 0
);

showProduct(products);
showTrendingProduct(sortedProducts);

const productBags = $.querySelectorAll(".productBag").forEach((item) => {
  item.addEventListener("click", () => {
    item.classList.add("productBasketNotification");
    setTimeout(() => item.classList.remove("productBasketNotification"), 500);
    addToCart(+item.dataset.id);
  });
});

const productFavorite = $.querySelectorAll(".productFavorite").forEach((item) => {
    item.addEventListener("click", (e) =>{
			item.classList.add("productFavoriteNotification");
    setTimeout(() => item.classList.remove("productFavoriteNotification"), 500);
      addToFavorite(+e.currentTarget.dataset.id)
		});
  }
);

export const addToCart = (productId) => {
  const findProduct = products.find((item) => item.id === productId);
  const product = findProduct;

  let existingProduct = false;

  let newCartItems = basket.reduce((state, item) => {
    if (item.id === product.id) {
      existingProduct = true;

      const newItem = {
        ...item,
        qty: item.qty + 1,
        total: (item.qty + 1) * item.price.off,
      };

      return [...state, newItem];
    }

    return [...state, item];
  }, []);

  if (!existingProduct) {
    newCartItems.push({
      ...product,
      qty: 1,
      total: product.price.off,
    });
  }

  basket = newCartItems;

  localStorage.setItem("basket", JSON.stringify(basket));
  setBasketBallet();
};

export const addToFavorite = (productId) => {
  const findProduct = products.find((item) => item.id === productId);
  const product = findProduct;
	if ((favorite.find((item) => item.id === productId))!=null) {
		const findFavoriteProduct = favorite.find((item) => item.id === productId);
		const productFavorite = findFavoriteProduct;
    
			const indexProduct = favorite.indexOf(product);
			favorite.splice(indexProduct, 1);
		
	} else {
		favorite.push(product)
	}

  localStorage.setItem("favorite", JSON.stringify(favorite));
  setFavoriteBallet();
};
