export function showProduct(array) {
  const swiperNewArrivals = document.querySelector(".swiperNewArrivals");
  array.forEach((item)=>{
		const {category, images, id, tag, title, price} = item;
    const createProduct = `<div class="swiper-slide">
		<div class="product" data-category="${category}">
			<div class="productImage">
				<img src="./assets/images/${images[0]}">
				<div class="productFavorite" data-id="${id}"><img src="./assets/images/favorite.svg"></div>
				<div class="productBag" data-id="${id}"><img src="./assets/images/Bag.svg"></div>
				<div class="productPhotos"><img src="./assets/images/photos.svg"></div>
				<div class="productTag">${tag}</div>
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
				<div><span class="productPrice">$${price.main}</span><span class="productOff">$${price.off}</span></div>
			</div>
		</div>
	</div>
		`;
		if (swiperNewArrivals != null) {

			swiperNewArrivals.innerHTML += createProduct;
		}
	})
}