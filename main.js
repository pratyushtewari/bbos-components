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

const toggleTopNavMenu = (event) => {
  // close all the other open menus
  event.stopPropagation();
  const sibling = event.currentTarget.parentElement.querySelector(".menu");
  //check if this is closed. this is important to know because we are closing all the menus before opening this one.
  const isClosed = sibling.classList.contains("hidden");
  closeALLMenu();
  // this is just to prevent adding a lot of event listners
  // this still adds at max two listners.
  if (isClosed) {
    sibling.classList.remove("hidden");
    document.addEventListener(
      "click",
      (event) => {
        hide(sibling);
      },
      { once: true },
    );
  } else {
    sibling.classList.add("hidden");
  }
};

// Escape key press
document.addEventListener("keydown", function (e) {
  if (e.keyCode == 27) {
    closeALLMenu();
  }
});
