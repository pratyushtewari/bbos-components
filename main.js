const hide = (htmlElement) => {
  htmlElement.classList.add("tw-hidden");
};

// Escape key press
document.addEventListener("keydown", function (e) {
  if (e.keyCode == 27) {
    closeALLMenu();
  }
});

// close any open menu
document.addEventListener("click", function (e) {
  closeALLMenu();
});

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

const toggleAccordion = (event) => {
  const parentElement = event.currentTarget.parentElement;
  const isOpen = parentElement.classList.toggle("open");
  const contentWrapper = parentElement.querySelector(".content-wrapper");
  if (isOpen) {
    contentWrapper.querySelector("fieldset").removeAttribute("disabled");

    contentWrapper.style.height = contentWrapper.clientHeight + "px";

    // unset it so that it can expand with new content
    contentWrapper.style.height = "unset";
  } else {
    contentWrapper
      .querySelector("fieldset")
      .setAttribute("disabled", "disabled");
    contentWrapper.style.height = "0px";
  }
};

const us = [
  "Alabama",
  "Alaska",
  "Arizona",
  "Arkansas",
  "California",
  "Colorado",
  "Connecticut",
  "Delaware",
  "Florida",
  "Georgia",
  "Hawaii",
  "Idaho",
  "Illinois",
  "Indiana",
  "Iowa",
  "Kansas",
  "Kentucky",
  "Louisiana",
  "Maine",
  "Maryland",
  "Massachusetts",
  "Michigan",
  "Minnesota",
  "Mississippi",
  "Missouri",
  "Montana",
  "Nebraska",
  "Nevada",
  "New Hampshire",
  "New Jersey",
  "New Mexico",
  "New York",
  "North Carolina",
  "North Dakota",
  "Ohio",
  "Oklahoma",
  "Oregon",
  "Pennsylvania",
  "Rhode Island",
  "South Carolina",
  "South Dakota",
  "Tennessee",
  "Texas",
  "Utah",
  "Vermont",
  "Virginia",
  "Washington",
  "West Virginia",
  "Wisconsin",
  "Wyoming",
];

const mexico = [
  "Aguascalientes",
  "Baja California Sur",
  "Baja California",
  "Campeche",
  "Chiapas",
  "Chihuahua",
  "Coahuila",
  "Colima",
  "Durango",
  "Guanajuato",
  "Guerrero",
  "Hidalgo",
  "Jalisco",
  "México City",
  "México",
  "Michoacán",
  "Morelos",
  "Nayarit",
  "Nuevo León",
  "Oaxaca",
  "Puebla",
  "Querétaro",
  "Quintana Roo",
  "San Luis Potosí",
  "Sinaloa",
  "Sonora",
  "Tabasco",
  "Tamaulipas",
  "Tlaxcala",
  "Veracruz",
  "Yucatán",
  "Zacatecas",
];

const canada = [
  "Alberta",
  "British Columbia",
  "Manitoba",
  "New Brunswick",
  "Newfoundland and Labrador",
  "Northwest Territories",
  "Nova Scotia",
  "Nunavut",
  "Ontario",
  "Prince Edward Island",
  "Quebec",
  "Saskatchewan",
  "Yukon",
];

// Based ont the country,
// this function adds options in the
// .bbs-combobox's menu.
const addCountryStateOptions = (event, country) => {
  // clear and disable other-countries input
  const otherCountryInput = document.querySelector("#otherCountries");
  otherCountryInput.setAttribute("disabled", "disabled");
  otherCountryInput.value = "";

  const combobox = document.querySelector("#stateSelectionCombobox");
  // enable state and city selection
  document.querySelector("#us-canada-mexico").removeAttribute("disabled");

  // Clear the existing multiseled tags
  combobox.querySelector(".multiselect-tag-container").innerHTML = "";

  const optionContainer = combobox.querySelector("ul.dropdown-menu");

  // clear the previous list
  optionContainer.innerHTML = "";

  // clear the previously selected states
  combobox.querySelector(".multiselect-tag-container").innerHTML = "";

  const states =
    country === "mexico" ? mexico : country === "canada" ? canada : us;

  for (let i in states) {
    const outer = document.createElement("li");
    optionContainer.appendChild(outer);

    const option = document.createElement("button");
    outer.appendChild(option);

    option.setAttribute(
      "onclick",
      `handleMultiselectOptionSelection(event, "${states[i]}")`,
    );
    option.setAttribute("data-value", states[i]);
    option.setAttribute("tabindex", "-1");
    option.setAttribute("class", "bbsButton bbsButton-menu-item dropdown-item");
    option.setAttribute("role", "option");
    option.setAttribute("type", "button");
    option.innerHTML = `
      <span class="text-label">${states[i]}</span>
      <span class="msicon notranslate">check</span>
      `;
  }
};

// When you need to add tags from the
// .bbs-combobox. call this function with the value,
// this will add the tags in the .multiselect-tag-container
// if it exits or append one in the combobox
const handleMultiselectOptionSelection = (event, value) => {
  event.stopPropagation();
  const comboboxParent = event.currentTarget.closest(".bbs-combobox");
  const inputElement = comboboxParent.querySelector("input");
  let tagContainer = comboboxParent.querySelector(".multiselect-tag-container");
  if (!tagContainer) {
    // create a tag container
    // and append it to the parent of the input
    tagContainer = document.createElement("div");
    tagContainer.setAttribute("class", "multiselect-tag-container");
    comboboxParent.appendChild(tagContainer);
  }

  // const inputValue = event.target.value;
  // focus the input
  // inputElement.value = "";
  inputElement.focus();

  // check if there is any tag with that value exist in the parent
  const tagid = "data-" + value.replace(" ", "-");
  const tagElement = tagContainer.querySelector("#" + tagid);
  if (!tagElement) {
    // create the tag if it does not exists
    const newTag = document.createElement("button");
    newTag.setAttribute("class", "bbsButton bbsButton-tag-secondary small");
    newTag.setAttribute("id", tagid);
    newTag.setAttribute("onclick", "removeMultiselectTag(event)");
    newTag.innerHTML = `
    <span>${value}</span>
    <span class="msicon notranslate">clear</span>
    `;
    tagContainer.appendChild(newTag);

    // mark option as selected
    const menuoption = event.currentTarget.closest("li");
    menuoption.classList.add("selected");
  } else {
    // remove the tag element and mark the item non selected
    tagElement.remove();
    // mark option as unselected
    const menuoption = event.currentTarget.closest("li");
    menuoption.classList.remove("selected");
  }

  // focus the input (it is automatic)
};

// if a removable bbsButton bbsButton-tag-secondary
// is clicked, this is the function
// that needs to be called to remove it
const removeMultiselectTag = (event) => {
  // TODO - unhide the menu items with this value.
  const comboboxParent = event.currentTarget.closest(".bbs-combobox");
  const menu = comboboxParent.querySelector(".dropdown-menu");
  const value = event.currentTarget.id
    .replace("data-", "")
    .replace("-", " ")
    .toLowerCase();

  // Filter the menu items based on the input
  const optionss = menu.querySelectorAll("li");
  optionss.forEach((htmlElement) => {
    const innervalue = htmlElement.children[0].innerHTML.toLowerCase().trim();
    if (innervalue.includes(value)) {
      htmlElement.classList.remove("selected");
    }
  });
  const nextsibling = event.currentTarget.nextElementSibling;
  const prevsibling = event.currentTarget.previousElementSibling;
  if (nextsibling) {
    nextsibling.focus();
    nextsibling.classList.add("focus-visible");
  } else if (prevsibling) {
    prevsibling.focus();
    prevsibling.classList.add("focus-visible");
  }
  event.currentTarget.remove();
};

// This is called when Other countries
// radio is selected.
const enableOtherCountriesInput = (event, id) => {
  const otherCountryInput = document.querySelector("#" + id);
  otherCountryInput.removeAttribute("disabled");
  otherCountryInput.focus();

  // disabled state and city selection
  const stateCitiselector = document.querySelector("#us-canada-mexico");

  stateCitiselector.setAttribute("disabled", "disabled");

  // Clear the existing multiseled tags
  stateCitiselector.querySelector(".multiselect-tag-container").innerHTML = "";
};

const handleKeydownInComboInput = (event) => {
  const key = event.key;

  // TODO - somehow Escape key is not detected here at all.
  // cannot close the menu because of that.

  if (key == "ArrowDown" || key == "ArrowUp") {
    event.preventDefault();
    // Bootstrap stuff!!
    // find the instance of the dropdown
    // this is the div with data-bs-toggle="dropdown" attribute

    const instance = bootstrap.Dropdown.getOrCreateInstance(
      event.currentTarget.closest(".bbs-combobox-input"),
    );
    if (instance) {
      instance.show();
      instance._selectMenuItem(event);
    }
  }
};

// Open the combobox menu when
// user starts typing inside
// the combobox .bbs-combobox
// and filters the content
const handleComboMenuTyping = (event) => {
  const inputValue = event.currentTarget.value;
  const menu = event.currentTarget
    .closest(".bbs-combobox")
    .querySelector(".dropdown-menu");

  const instance = bootstrap.Dropdown.getOrCreateInstance(
    event.currentTarget.closest(".bbs-combobox-input"),
  );
  if (instance) {
    instance.show();
  }

  // Filter the menu items based on the input
  const optionss = menu.querySelectorAll("li");
  optionss.forEach((htmlElement) => {
    // text-label
    const value = htmlElement
      .querySelector(".text-label")
      .innerHTML.toLowerCase()
      .trim();
    if (value.includes(inputValue.toLowerCase())) {
      htmlElement.classList.remove("tw-hidden");
    } else {
      htmlElement.classList.add("tw-hidden");
    }
  });

  // Show no options if empty
  if (menu.querySelectorAll("li:not(.tw-hidden)").length <= 0) {
    let noResults = menu.querySelector("p.notfound");
    if (!noResults) noResults = document.createElement("p");
    noResults.setAttribute("class", "menu-no-data notfound");
    noResults.innerHTML =
      "No unselected states found with the string " + inputValue;
    menu.appendChild(noResults);
  } else {
    const nodata = menu.querySelector(".menu-no-data");
    if (nodata) {
      nodata.remove();
    }
  }

  event.stopPropagation();
};

const clearallsearch = () => {
  [...document.querySelectorAll(".search-criteria-group")].forEach(
    (htmlElement) => {
      htmlElement.remove();
    },
  );
};
