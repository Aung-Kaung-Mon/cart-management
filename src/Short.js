import { observer } from "./app/cartui";
import { categoryRender } from "./app/category";
import { productRender } from "./app/products";
import { cartBtnHandler, orderBtnHandler, searchBtnFocusHandler } from "./core/handlers";
import { cartBtn, closeBtn, orderBtn } from "./core/selectors";
import { categories, products } from "./core/variables";

export default class Short {
  preRender() {
    categoryRender(categories);
    productRender(products);
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
