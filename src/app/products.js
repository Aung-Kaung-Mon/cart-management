import {
  cartBtn,
  cartItems,
  cartOffcanvas,
  productSection,
  searchBtn,
} from "../core/selectors";
import { products } from "../core/variables";
import { createCartItem } from "./cartui";

export const starUiRender = (rating) => {
  let result = "";

  for (let i = 1; i <= 5; i++) {
    result += `
    <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke-width="1.5"
    stroke="currentColor"
    class="w-6 h-6 ${
      i <= Math.round(rating)
        ? "fill-neutral-700"
        : "fill-neutral-300 stroke-neutral-300"
    } "
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
    />
  </svg> `;
  }

  return result;
};

export const productRender = (objs) => {
  objs.forEach((product) => {
    productSection.append(createProductCard(product));
  });
};

export const createProductCard = ({
  id,
  image,
  title,
  price,
  description,
  rating: { rate, count },
}) => {
  const card = document.createElement("div");
  card.classList.add("product-card");
  card.setAttribute("card-id", id);
  card.innerHTML = `
    <div class="product-img p-4 -mb-20">
    <img
      class="h-[130px] cardImg"
      src="${image}"
      alt=""
    />
  </div>
  <div
    class="product-body  border-2 border-neutral-700 px-4 pt-20 pb-5"
  >
    <p class="mb-4 line-clamp-1 font-semibold">
     ${title}
    </p>
    <p class="text-sm line-clamp-3 text-neutral-600 mb-5">
   ${description}
    </p>
    <div
      class="flex justify-between border-b border-neutral-600 pb-6"
    >
      <div class="flex">
       
      ${starUiRender(rate)}
       
      </div>
      <p class="">( ${rate} / ${count} )</p>
    </div>
    <div class="">
      <p class="font-semibold mb-3">$ <span>${price}</span></p>
      <button  class="add-to-cart-btn w-full block border-2 p-2 border-neutral-500">
        Add to card
      </button>
    </div>
  </div>
    `;

  const addToCartBtn = card.querySelector(".add-to-cart-btn");

  addToCartBtn.addEventListener("click", addToCartBtnHandler);

  return card;
};

export const addToCartBtnHandler = (event) => {
  const btn = event.target;
  const currentCard = btn.closest(".product-card");
  const currentId = currentCard.getAttribute("card-id");
  const currentCardImg = currentCard.querySelector(".cardImg");
  const currentCardImgInfo = currentCardImg.getBoundingClientRect();

  const newImg = new Image(currentCardImgInfo.width, currentCardImgInfo.height);
  newImg.src = currentCardImg.src;
  newImg.style.position = "fixed";
  newImg.style.top = `${currentCardImgInfo.top}px`;
  newImg.style.right = `${currentCardImgInfo.right}px`;
  newImg.style.bottom = `${currentCardImgInfo.bottom}px`;
  newImg.style.left = `${currentCardImgInfo.left}px`;
  document.body.append(newImg);

  let effects;

  if (cartOffcanvas.classList.contains("translate-x-full")) {
    effects = [
      {
        top: newImg.style.top,
        right: newImg.style.right,
        bottom: newImg.style.bottom,
        left: newImg.style.left,
        scale: 1,
        rotate: "0deg",
      },
      {
        top: searchBtn.getBoundingClientRect().top + "px",
        right: searchBtn.getBoundingClientRect().right + "px",
        bottom: searchBtn.getBoundingClientRect().bottom + "px",
        left: searchBtn.getBoundingClientRect().left + "px",
        scale: 0.3,
        rotate: "200deg",
      },
    ];
  } else {
    effects = [
      {
        top: newImg.style.top,
        right: newImg.style.right,
        bottom: newImg.style.bottom,
        left: newImg.style.left,
        scale: 1,
        rotate: "0deg",
      },
      {
        top: cartItems.getBoundingClientRect().top + 200 + "px",
        right: cartItems.getBoundingClientRect().right + "px",
        bottom: cartItems.getBoundingClientRect().bottom + "px",
        left: cartItems.getBoundingClientRect().left + 60 + "px",
        scale: 0.3,
        rotate: "200deg",
      },
    ];
  }

  const timeline = {
    duration: 400,
  };

  const animationObj = newImg.animate(effects, timeline);

  animationObj.addEventListener("finish", () => {
    newImg.remove();

    cartBtn.classList.add("animate__tada");

    cartBtn.addEventListener("animationend", () => {
      cartBtn.classList.remove("animate__tada");
    });
  });

  const currentProduct = products.find((product) => {
    return product.id === parseInt(currentId);
  });

  cartItems.append(createCartItem(currentProduct));

  // btn.setAttribute('disabled','');
  btn.toggleAttribute("disabled");
  btn.classList.add("text-white", "bg-neutral-600");
  btn.innerText = "Added";
};

//

export const removeAdded = (currentCartId) => {
  const btn = app.querySelector(
    `[card-id="${currentCartId}"] .add-to-cart-btn`
  );
  btn.toggleAttribute("disabled");
  btn.classList.remove("text-white", "bg-neutral-600");
  btn.innerText = "Add to cart";
};
