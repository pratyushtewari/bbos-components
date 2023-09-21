function hide(htmlElement) {
  console.log("closing", htmlElement.id);
  htmlElement.classList.add("hidden");
}

function closeALLMenu() {
  [...document.querySelectorAll(".menu")].forEach((htmlElement) => {
    htmlElement.classList.add("hidden");
  });
}

const toggleTopNavMenu = (event) => {
  // close all the other open menus
  closeALLMenu();
  event.stopPropagation();
  const sibling = event.currentTarget.parentElement.querySelector(".menu");
  sibling.classList.toggle("hidden");
  // this is just to prevent adding a lot of event listners
  // this still adds at max two listners.
  if (!sibling.classList.contains("hidden")) {
    console.log("adding close listner for ", sibling.id);
    window.addEventListener(
      "click",
      (event) => {
        hide(sibling);
      },
      { once: true },
    );
  }
};
