import { categorySection, productSection, searchBtn } from "../core/selectors";
import { categories, products } from "../core/variables";
import { productRender } from "./products";

export const categoryRender = (categories) => {
  categories.forEach((category) => {
    categorySection.append(createCategory(category));
  });
};

export const createCategory = (text) => {
  const btn = document.createElement("button");
  btn.classList.add("category","capitalize","basis-1/5");
  btn.innerText = text;

  return btn;
};

const categoryHandler = (e) => {
  if (e.target.matches(".category")) {
    const categoryName = e.target.innerText;
    const categoryProducts = products.filter((product) => {
      return product.category === categoryName.toLowerCase() || categoryName === "All";
    });
    productSection.innerHTML = null;
    productRender(categoryProducts);

    const lastActiveBtn = categorySection.querySelector(".category.active");
    lastActiveBtn.classList.toggle("active");

    e.target.classList.toggle("active");
  }
};

categorySection.addEventListener("click", categoryHandler);

