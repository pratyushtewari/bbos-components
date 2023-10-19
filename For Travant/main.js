const hide = (htmlElement) => {
  htmlElement.classList.add("tw-hidden");
};

const closeALLMenu = () => {
  [...document.querySelectorAll(".bbsMenu:not(.tw-hidden)")].forEach(
    (htmlElement) => {
      htmlElement.classList.add("tw-hidden");
    },
  );
};

const toggleTopNavMenu = (event) => {
  // close all the other open menus
  event.stopPropagation();
  const sibling = event.currentTarget.parentElement.querySelector(".bbsMenu");
  //check if this is closed. this is important to know because we are closing all the menus before opening this one.
  const isClosed = sibling.classList.contains("tw-hidden");
  closeALLMenu();
  // this is just to prevent adding a lot of event listners
  // this still adds at max two listners.
  if (isClosed) {
    sibling.classList.remove("tw-hidden");
    document.addEventListener(
      "click",
      (event) => {
        hide(sibling);
      },
      { once: true },
    );
  } else {
    sibling.classList.add("tw-hidden");
  }
};

// Escape key press
document.addEventListener("keydown", function (e) {
  if (e.keyCode == 27) {
    closeALLMenu();
  }
});

const toggleAccordion = (event) => {
  const parentElement = event.currentTarget.parentElement;
  parentElement.classList.toggle("open");
  const isOpen = parentElement.classList.contains("open");
  const contentWrapper = parentElement.querySelector(".content-wrapper");
  const content = parentElement.querySelector(".bbs-accordion-content");
  if (isOpen) {
    content.style.height = contentWrapper.clientHeight + "px";
  } else {
    content.style.height = 0;
  }
};

const toggleStateInput = (event, id) => {
  const inputElement = document.querySelector("#" + id);
  inputElement.toggleAttribute("disabled");
  if (!inputElement.attributes.getNamedItem("disabled")) {
    inputElement.focus();
  } else {
    inputElement.value = "";
  }
};

const addMultiselect = (event) => {
  const inputElement = event.target;
  const parentElement = inputElement.parentElement;
  let tagContainer = parentElement.querySelector(".multiselect-tag-container");
  if (!tagContainer) {
    // create a tag container
    // and append it to the parent of the input
    tagContainer = document.createElement("div");
    tagContainer.setAttribute("class", "multiselect-tag-container");
    parentElement.appendChild(tagContainer);
  }
  const inputValue = event.target.value;
  // clear the input
  inputElement.value = "";

  // check if there is any tag with that value exist in the parent
  const tagid = "data-" + inputValue;
  const tagElement = tagContainer.querySelector("#" + tagid);
  if (!tagElement) {
    // create the tag if it does not exists
    const newTag = document.createElement("button");
    newTag.setAttribute("class", "bbsButton bbsButton-tag-secondary small");
    newTag.setAttribute("id", tagid);
    newTag.setAttribute("onclick", "removemultiselectTag(event)");
    newTag.innerHTML = `
    <span>${inputValue}</span>
    <span class="msicon notranslate">clear</span>
    `;
    tagContainer.appendChild(newTag);
  }

  // focus the input (it is automatic)
};

const removemultiselectTag = (event) => {
  event.currentTarget.remove();
  // console.log(event.target.value);
};
