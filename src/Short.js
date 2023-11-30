import { observer } from "./app/cartui";
import { categoryRender } from "./app/category";
import { productRender } from "./app/products";
import {
  cartBtnHandler,
  orderBtnHandler,
  searchBtnFocusHandler,
} from "./core/handlers";
import { cartBtn, closeBtn, orderBtn } from "./core/selectors";
import { categories, products } from "./core/variables";

export default class Short {
  // async preRender() {
  //   // categoryRender(categories);
  //   // productRender(products);

  //   const res2 = await fetch("http://localhost:5173/api/categories");
  //   const json2 = await res2.json();
  //   categoryRender(json2);

  //   const res = await fetch("http://localhost:5173/api/products");
  //   const json = await res.json();
  //   productRender(json);
  // }

  preRender() {
    fetch("http://localhost:5173/api/categories")
      .then((res) => res.json())
      .then((json) => categoryRender(json));

    fetch("http://localhost:5173/api/products")
      .then((res) => res.json())
      .then((json) => productRender(json));
  }

  listener() {
    cartBtn.addEventListener("click", cartBtnHandler);
    closeBtn.addEventListener("click", cartBtnHandler);
    orderBtn.addEventListener("click", orderBtnHandler);
    searchBtn.addEventListener("click", searchBtnFocusHandler);
    observer();
  }

  init() {
    this.preRender();
    this.listener();
  }
}
