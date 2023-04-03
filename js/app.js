import { products } from "./products.js";
import { showProduct } from "./showProduct.js";
import { showTrendingProduct } from "./showTrendingProduct.js";
import { setBasketBallet , setFavoriteBallet} from "./header.js";
// import {setBasketBallet} from "./header.js"

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

const categories = document.querySelectorAll(".categories div");
    categories.forEach(function (item) {
			function removeActive() {
				categories.forEach((item)=>{
					item.classList.remove("categoryActive");
				})
			}
      item.addEventListener("click", function () {
        if (item.classList.contains("categoryMen")) {
					removeActive();
					item.classList.add("categoryActive");
          let productsMen = products.filter((item) =>  item.category === "Men");
          showProduct(productsMen);
        } else if (item.classList.contains("categoryWomen")) {
					removeActive();
					item.classList.add("categoryActive");
          let productsWomen = products.filter((item) => item.category === "Women");
          showProduct(productsWomen);
        } else if (item.classList.contains("categoryKids")) {
					removeActive();
					item.classList.add("categoryActive");
          let productsKids = products.filter((item) => item.category === "Kids");
          showProduct(productsKids);
        } else if (item.classList.contains("categoryHighest")) {
					removeActive();
					item.classList.add("categoryActive");
          let productsHighest = [...products].sort((p1, p2) =>
            p1.price.off < p2.price.off
              ? 1
              : p1.price.off > p2.price.off
              ? -1
              : 0
          );
          showProduct(productsHighest);
        } else if (item.classList.contains("categoryLowest")) {
					removeActive();
					item.classList.add("categoryActive");
					let productsLowest = [...products].sort((p1, p2) =>
            p1.price.off > p2.price.off
              ? 1
              : p1.price.off < p2.price.off
              ? -1
              : 0
          );
          showProduct(productsLowest);
        } else {
					removeActive();
					categories[0].classList.add("categoryActive");
					showProduct(products);
        }

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

      });
    });

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
	if (localStorage.getItem("basket") != null) {
		basket = JSON.parse(localStorage.getItem("basket"));
	}
  const findProduct = products.find((item) => item.id === productId);
  const product = findProduct;

  let existingProduct = false;

  let newCartItems = basket.reduce((state, item) => {
    if (item.id === product.id) {
      existingProduct = true;

			if (item.qty+1<=item.max) {
				const newItem = {
					...item,
					qty: item.qty + 1,
					total: (item.qty + 1) * item.price.off,
				} 
	
				return [...state, newItem];
			}
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