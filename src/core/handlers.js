import Swal from "sweetalert2";
import { productRender, removeAdded } from "../app/products";
import {
  cartItems,
  cartOffcanvas,
  productSection,
  searchInput,
  totalC,
} from "./selectors";
import { products } from "./variables";

export const cartBtnHandler = () => {
  cartOffcanvas.classList.toggle("translate-x-full");
  cartOffcanvas.classList.add("duration-300");
  console.log("auto work");
};

export const orderBtnHandler = () => {
  Swal.fire({
    title: "Are you ready to order ? ",
    text: "You won't be able to revert this!",
    icon: "question",
    showCancelButton: true,
    confirmButtonColor: "",
    cancelButtonColor: "",
    confirmButtonText: " Order ",
  }).then((result) => {
    if (result.isConfirmed) {
      const customerId = Math.floor(Math.random() * 100000);
      const date = new Date().toDateString();
      const totalCost = parseFloat(totalC.innerText);

      const orderItems = [];
      [...cartItems.querySelectorAll(".cart-item")].forEach((cartItem) => {
        let productId = cartItem.getAttribute("product-id");
        let quantity = parseInt(
          cartItem.querySelector(".productCount").innerText
        );
        orderItems.push({
          productId,
          quantity,
        });
        cartItem.remove();

        let currentId = cartItem.getAttribute("product-id");
        removeAdded(currentId);
      });

      const orderInfo = [customerId, date, totalCost, orderItems];

      console.log(orderInfo);
    }
  });
};

export const searchBtnFocusHandler = () => {
  searchInput.classList.remove("translate-x-[200%]");
  searchInput.classList.add("animate__fadeInTopRight");
  searchInput.addEventListener("keyup", searchInputHandler);
};

export const searchInputHandler = (e) => {
  let text = searchInput.value.toLowerCase();
  const searchProducts = products.filter((product) => {
    return product.title.toLowerCase().includes(text);
  });
  console.log(e.key);
  console.log(searchProducts);
  productSection.innerHTML = null;
  productRender(searchProducts);
};
