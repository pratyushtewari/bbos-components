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

  const combobox = enableCombobox("stateSelectionCombobox");
  // Clear the existing multiseled tags
  combobox.querySelector(".multiselect-tag-container").innerHTML = "";

  const optionContainer = combobox.querySelector(".bbsMenu ul");

  // clear the previous list
  optionContainer.innerHTML = "";

  // clear the previously selected states
  combobox.querySelector(".multiselect-tag-container").innerHTML = "";

  const states =
    country === "mexico" ? mexico : country === "canada" ? canada : us;

  for (let i in states) {
    const option = document.createElement("li");
    option.setAttribute(
      "onclick",
      `addMultiselectOption(event, "${states[i]}")`,
    );
    option.setAttribute("data-value", states[i]);
    option.setAttribute("tabindex", "-1");
    option.setAttribute("class", "bbsButton bbsButton-menu-item");
    option.setAttribute("role", "option");
    option.innerHTML = `
      ${states[i]}
      `;
    optionContainer.appendChild(option);
  }
};

// When you need to add tags from the
// .bbs-combobox. call this function with the value,
// this will add the tags in the .multiselect-tag-container
// if it exits or append one in the combobox
const addMultiselectOption = (event, value) => {
  event.stopPropagation();
  const comboboxParent = event.currentTarget.closest(".bbs-combobox");
  const inputElement = comboboxParent.querySelector("input");
  // const parentElement = inputElement.parentElement;
  let tagContainer = comboboxParent.querySelector(".multiselect-tag-container");
  if (!tagContainer) {
    // create a tag container
    // and append it to the parent of the input
    tagContainer = document.createElement("div");
    tagContainer.setAttribute("class", "multiselect-tag-container");
    comboboxParent.appendChild(tagContainer);
  }

  // const inputValue = event.target.value;
  // clear the input
  inputElement.value = "";
  inputElement.focus();

  // check if there is any tag with that value exist in the parent
  const tagid = "data-" + value.replace(" ", "");
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
  }

  // focus the input (it is automatic)

  // TODO - remove the selected option from the menu
};

// if a removable bbsButton bbsButton-tag-secondary
// is clicked, this is the function
// that needs to be called to remove it
const removeMultiselectTag = (event) => {
  event.currentTarget.remove();
};

// This is called when Other countries
// radio is selected.
const enableOtherCountriesInput = (event, id) => {
  const otherCountryInput = document.querySelector("#" + id);
  otherCountryInput.removeAttribute("disabled");
  otherCountryInput.focus();

  const combobox = disableCombobox("stateSelectionCombobox");
  // Clear the existing multiseled tags
  combobox.querySelector(".multiselect-tag-container").innerHTML = "";
};

// Disables the input and the dropdown button
// in the combobox .bbs-combobox
const disableCombobox = (id) => {
  const combobox = document.querySelector("#" + id);
  const input = combobox.querySelector("input");
  input.setAttribute("disabled", "disabled");
  const button = combobox.querySelector(".bbsButton.bbsButton-secondary");
  button.setAttribute("disabled", "disabled");
  button.classList.add("disabled");
  return combobox;
};

// Enables the input and the dropdown button
// in the combobox .bbs-combobox
const enableCombobox = (id) => {
  const combobox = document.querySelector("#" + id);
  const input = combobox.querySelector("input");
  input.removeAttribute("disabled");
  const button = combobox.querySelector(".bbsButton.bbsButton-secondary");
  button.removeAttribute("disabled");
  button.classList.remove("disabled");
  return combobox;
};

// open or close the combomenu inside
// the combobox .bbs-combobox
const toggleComboMenu = (event) => {
  // find the menu
  const menu = event.currentTarget
    .closest(".bbs-combobox")
    .querySelector(".bbsMenu");

  menu.classList.toggle("tw-hidden");

  // this is important because there is an
  // event on the document click to close all menu
  event.stopPropagation();
};

// Open the combobox menu when
// user starts typing inside
// the combobox .bbs-combobox
// and filters the content
const handleComboMenuTyping = (event) => {
  const inputValue = event.currentTarget.value;

  const menu = event.currentTarget
    .closest(".bbs-combobox")
    .querySelector(".bbsMenu");

  if (inputValue === "") {
    menu.classList.add("tw-hidden");
  } else {
    menu.classList.remove("tw-hidden");
  }
  // console.log(inputValue);

  // Filter the menu items based on the input
  [...menu.querySelectorAll("li")].forEach((htmlElement) => {
    if (
      htmlElement.innerHTML.toLowerCase().includes(inputValue.toLowerCase())
    ) {
      htmlElement.classList.remove("tw-hidden");
    } else {
      htmlElement.classList.add("tw-hidden");
    }
  });

  // Show no options if empty
  if (menu.querySelectorAll("li:not(.tw-hidden)").length > 0) {
    const newTag = document.createElement("p");
    newTag.setAttribute("id", "menu-no-data");
    newTag.innerHTML = "No states found with the string " + inputValue;
    menu.appendChild(newTag);
  } else {
    const nodata = menu.querySelector("#menu-no-data");
    if (nodata) {
      nodata.remove();
    }
  }
};

const closeComboMenu = (event) => {
  const inputValue = event.currentTarget.value;

  console.log("blur: ", inputValue);
  const menu = event.currentTarget
    .closest(".bbs-combobox")
    .querySelector(".bbsMenu");
  menu.classList.add("tw-hidden");
};

const clearallsearch = () => {
  [...document.querySelectorAll(".search-criteria-group")].forEach(
    (htmlElement) => {
      htmlElement.remove();
    },
  );
};
