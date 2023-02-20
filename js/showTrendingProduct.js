export function showTrendingProduct(array) {
  const swiperTrending = document.querySelector(".swiperTrending");
	for (let i= 0;i<4;i++){
		const {category, images, id, tag, title, price,max} = array[i];
		let tagEl;
    if (tag != "") {
      tagEl = `<div class="productTag">${tag}</div>`;
    } else {
      tagEl = "";
    }
    const createProduct = `<div class="swiper-slide">
		<div class="product">
			<div class="productImage">
				<img src="./assets/images/${images[0]}">
				<div class="productFavorite" data-id="${id}"><img src="./assets/images/favorite.svg"></div>
				<div class="productBag" data-id="${id}"><img src="./assets/images/Bag.svg"></div>
				<div class="productPhotos"><img src="./assets/images/photos.svg"></div>
				${tagEl}
			</div>
			<div class="productDetail">
				<div>
					<span>${category}</span>
					<div class="rate">
						<img src="./assets/images/StarFill.svg">
						<img src="./assets/images/StarFill.svg">
						<img src="./assets/images/StarFill.svg">
						<img src="./assets/images/StarFill.svg">
						<img src="./assets/images/Star.svg">
					</div>
				</div>
				<p><a href="#">${title}</a></p>
				<div>
				<span class="productPrice">$${price.off}</span>
				<span class="productOff">$${price.main}</span>
				</span><span class="productInventory">Inventory: ${max}</span>
				</div>
			</div>
		</div>
	</div>
		`;
		if (swiperTrending != null) {
			swiperTrending.innerHTML += createProduct;
		}
	}
}