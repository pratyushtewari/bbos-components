const toggleTopNavMenu = (event) => {
  event.stopPropagation();
  const sibling = event.target.nextElementSibling;
  sibling.classList.toggle("hidden");

  console.log(sibling.id);
  console.log(sibling.classList);

  if (!sibling.classList.contains("hidden")) {
    window.addEventListener(
      "click",
      (event) => {
        console.log(sibling.id);
        sibling.classList.add("hidden");
      },
      { once: true },
    );
  }
};

function hide(htmlElement) {
  console.log(htmlElement.id);
  htmlElement.classList.add("hidden");
}
