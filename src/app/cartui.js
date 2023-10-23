import Swal from "sweetalert2";
import { cartCount, cartItemCount, cartItems, totalC } from "../core/selectors";
import { removeAdded } from "./products";

export const createCartItem = ({ id, title, image, price }) => {
  const cart = document.createElement("div");
  cart.classList.add("cart-item");
  cart.setAttribute("product-id", id);

  cart.innerHTML = `

    <div class="mb-2 group">
    <div class="cart-img px-4 -mb-9 relative z-20">
      <img
        src="${image}"
        alt=""
        class="h-[60px] "
        
      />
    </div>
    <div class="cart-body  shadow-md border border-neutral-200 p-4 pt-9 relative">
<button class="deleteBtn absolute top-4 right-4 border border-neutral-400 shadow-sm p-1 rounded-md invisible group-hover:visible translate-x-full group-hover:translate-x-0 duration-100 ">
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 stroke-red-500">
<path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
</svg>

</button>

      <p class="line-clamp-1 font-semibold mb-4">
       ${title}
      </p>
      <div class="cart-item-cost flex justify-between">
        <p class="text-neutral-600">$ <span class="productCost"> ${price}</span></p>
        <div class="flex w-1/3 justify-between bg-neutral-200">
          <button class="bg-neutral-400 p-1 decreaseBtn">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-4 h-4"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M18 12H6"
              />
            </svg>
          </button>
          <p class="flex-grow text-end pe-3 productCount">1</p>
          <button class="bg-neutral-400 p-1 increaseBtn">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-4 h-4"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 6v12m6-6H6"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>

        `;

  const increaseBtn = cart.querySelector(".increaseBtn");
  const decreaseBtn = cart.querySelector(".decreaseBtn");
  const productCost = cart.querySelector(".productCost");
  const productCount = cart.querySelector(".productCount");
  const deleteBtn = cart.querySelector(".deleteBtn");

  increaseBtn.addEventListener("click", () => {
    productCount.innerText = parseInt(productCount.innerText) + 1;
    productCost.innerText = (price * productCount.innerText).toFixed(2);
  });

  decreaseBtn.addEventListener("click", () => {
    if (productCount.innerText > 1) {
      productCount.innerText = parseInt(productCount.innerText) - 1;
      productCost.innerText = (price * productCount.innerText).toFixed(2);
    }
  });

  deleteBtn.addEventListener("click", (e) => {
    const currentId = e.target.closest(".cart-item").getAttribute("product-id");

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "",
      cancelButtonColor: "",
      confirmButtonText: "Delete!",
    }).then((result) => {
      if (result.isConfirmed) {
        cart.remove();
        removeAdded(currentId);

        // btn.setAttribute('disabled','');
        // btn.toggleAttribute("disabled");
      }
    });
  });

  return cart;
};

export const getTotalCost = () => {
  let carts = document.querySelectorAll(".productCost");
  let total = [...carts].reduce((pv, cv) => {
    return pv + parseFloat(cv.innerText);
  }, 0);
  totalC.innerText = total.toFixed(3);
};

export const getTotalCount = () => {
  let cartItems = document.querySelectorAll(".cart-item");

  cartCount.innerText = cartItemCount.innerText = [...cartItems].length;
};

export const observer = () => {
  const observerOptions = {
    childList: true,
    subtree: true,
  };

  const obs = new MutationObserver(() => {
    getTotalCost();
    getTotalCount();
  });
  obs.observe(cartItems, observerOptions);
};
