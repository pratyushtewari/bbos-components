const hide = (htmlElement) => {
  htmlElement.classList.add("hidden");
};

const closeALLMenu = () => {
  [...document.querySelectorAll(".menu:not(.hidden)")].forEach(
    (htmlElement) => {
      htmlElement.classList.add("hidden");
    },
  );
};

// Escape key press
document.addEventListener("keydown", function (e) {
  if (e.keyCode == 27) {
    closeALLMenu();
  }
});

const toggleTopNavMenu = (event) => {
  // close all the other open menus
  closeALLMenu();
  event.stopPropagation();
  const sibling = event.currentTarget.parentElement.querySelector(".menu");
  sibling.classList.toggle("hidden");
  // this is just to prevent adding a lot of event listners
  // this still adds at max two listners.
  if (!sibling.classList.contains("hidden")) {
    document.addEventListener(
      "click",
      (event) => {
        hide(sibling);
      },
      { once: true },
    );
  }
};
