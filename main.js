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

  // This is needed to .net form does not automatically post back
  event.preventDefault();
};

// TODO:JMT - CHANGE THIS TO THE DATA SOURCE FROM THE BBOS
const countries = [
  { prcn_CountryId: 1, prcn_Country: "USA" },
  { prcn_CountryId: 2, prcn_Country: "Canada" },
  { prcn_CountryId: 3, prcn_Country: "Mexico" },
  { prcn_CountryId: 5, prcn_Country: "Antigua and Barbuda" },
  { prcn_CountryId: 6, prcn_Country: "Argentina" },
  { prcn_CountryId: 7, prcn_Country: "Aruba" },
  { prcn_CountryId: 8, prcn_Country: "Australia" },
  { prcn_CountryId: 9, prcn_Country: "Austria" },
  { prcn_CountryId: 10, prcn_Country: "Bahamas" },
  { prcn_CountryId: 11, prcn_Country: "Barbados" },
  { prcn_CountryId: 12, prcn_Country: "Belgium" },
  { prcn_CountryId: 13, prcn_Country: "Belize" },
  { prcn_CountryId: 14, prcn_Country: "Bermuda" },
  { prcn_CountryId: 15, prcn_Country: "Bolivia" },
  { prcn_CountryId: 16, prcn_Country: "Brazil" },
  { prcn_CountryId: 17, prcn_Country: "Cameroon" },
  { prcn_CountryId: 18, prcn_Country: "Cayman Islands" },
  { prcn_CountryId: 19, prcn_Country: "Chile" },
  { prcn_CountryId: 20, prcn_Country: "China" },
  { prcn_CountryId: 21, prcn_Country: "Colombia" },
  { prcn_CountryId: 22, prcn_Country: "Costa Rica" },
  { prcn_CountryId: 23, prcn_Country: "Croatia" },
  { prcn_CountryId: 24, prcn_Country: "Cyprus" },
  { prcn_CountryId: 25, prcn_Country: "Czech Republic" },
  { prcn_CountryId: 26, prcn_Country: "Denmark" },
  { prcn_CountryId: 27, prcn_Country: "Dominica" },
  { prcn_CountryId: 28, prcn_Country: "Dominican Republic" },
  { prcn_CountryId: 29, prcn_Country: "Ecuador" },
  { prcn_CountryId: 30, prcn_Country: "Egypt" },
  { prcn_CountryId: 31, prcn_Country: "El Salvador" },
  { prcn_CountryId: 32, prcn_Country: "England" },
  { prcn_CountryId: 33, prcn_Country: "Fiji Islands, Repub. of" },
  { prcn_CountryId: 34, prcn_Country: "Finland" },
  { prcn_CountryId: 35, prcn_Country: "France" },
  { prcn_CountryId: 36, prcn_Country: "Germany" },
  { prcn_CountryId: 37, prcn_Country: "Greece" },
  { prcn_CountryId: 39, prcn_Country: "Guatemala" },
  { prcn_CountryId: 40, prcn_Country: "Guyana" },
  { prcn_CountryId: 41, prcn_Country: "Haiti" },
  { prcn_CountryId: 42, prcn_Country: "Honduras" },
  { prcn_CountryId: 43, prcn_Country: "Hong Kong" },
  { prcn_CountryId: 44, prcn_Country: "Hungary" },
  { prcn_CountryId: 45, prcn_Country: "Iceland" },
  { prcn_CountryId: 46, prcn_Country: "India" },
  { prcn_CountryId: 47, prcn_Country: "Indonesia" },
  { prcn_CountryId: 48, prcn_Country: "Ireland" },
  { prcn_CountryId: 49, prcn_Country: "Israel" },
  { prcn_CountryId: 50, prcn_Country: "Italy" },
  { prcn_CountryId: 51, prcn_Country: "Jamaica" },
  { prcn_CountryId: 52, prcn_Country: "Japan" },
  { prcn_CountryId: 53, prcn_Country: "Korea, Repub. of" },
  { prcn_CountryId: 54, prcn_Country: "Kuwait" },
  { prcn_CountryId: 55, prcn_Country: "Malaysia" },
  { prcn_CountryId: 56, prcn_Country: "Monaco" },
  { prcn_CountryId: 57, prcn_Country: "Morocco" },
  { prcn_CountryId: 58, prcn_Country: "Netherlands" },
  { prcn_CountryId: 59, prcn_Country: "Curacao" },
  { prcn_CountryId: 60, prcn_Country: "New Zealand" },
  { prcn_CountryId: 61, prcn_Country: "Nicaragua" },
  { prcn_CountryId: 62, prcn_Country: "Nigeria, Fed. Repub. of" },
  { prcn_CountryId: 63, prcn_Country: "Northern Ireland" },
  { prcn_CountryId: 64, prcn_Country: "Norway" },
  { prcn_CountryId: 65, prcn_Country: "Pakistan" },
  { prcn_CountryId: 66, prcn_Country: "Panama" },
  { prcn_CountryId: 67, prcn_Country: "Peru" },
  { prcn_CountryId: 68, prcn_Country: "Philippines" },
  { prcn_CountryId: 69, prcn_Country: "Poland" },
  { prcn_CountryId: 70, prcn_Country: "Portugal" },
  { prcn_CountryId: 71, prcn_Country: "Russia" },
  { prcn_CountryId: 72, prcn_Country: "Singapore, Repub. of" },
  { prcn_CountryId: 73, prcn_Country: "South Africa, Repub. of" },
  { prcn_CountryId: 74, prcn_Country: "Spain" },
  { prcn_CountryId: 75, prcn_Country: "St. Lucia" },
  { prcn_CountryId: 76, prcn_Country: "Sweden" },
  { prcn_CountryId: 77, prcn_Country: "Switzerland" },
  { prcn_CountryId: 78, prcn_Country: "Taiwan" },
  { prcn_CountryId: 79, prcn_Country: "Thailand" },
  { prcn_CountryId: 80, prcn_Country: "Trinidad and Tobago" },
  { prcn_CountryId: 81, prcn_Country: "Turkey" },
  { prcn_CountryId: 82, prcn_Country: "United Arab Emirates" },
  { prcn_CountryId: 83, prcn_Country: "Uruguay" },
  { prcn_CountryId: 84, prcn_Country: "Venezuela" },
  { prcn_CountryId: 85, prcn_Country: "Vietnam" },
  { prcn_CountryId: 87, prcn_Country: "Zambia" },
  { prcn_CountryId: 88, prcn_Country: "American Samoa" },
  { prcn_CountryId: 89, prcn_Country: "Scotland" },
  { prcn_CountryId: 90, prcn_Country: "Jordan" },
  { prcn_CountryId: 91, prcn_Country: "Mauritius" },
  { prcn_CountryId: 92, prcn_Country: "Bangladesh" },
  { prcn_CountryId: 93, prcn_Country: "Romania" },
  { prcn_CountryId: 95, prcn_Country: "Kenya" },
  { prcn_CountryId: 96, prcn_Country: "Ghana" },
  { prcn_CountryId: 97, prcn_Country: "Saudi Arabia, Kingdom of" },
  { prcn_CountryId: 98, prcn_Country: "Wales" },
  { prcn_CountryId: 99, prcn_Country: "Latvia" },
  { prcn_CountryId: 100, prcn_Country: "Senegal" },
  { prcn_CountryId: 101, prcn_Country: "Macedonia, Repub. of." },
  { prcn_CountryId: 102, prcn_Country: "Tanzania" },
  { prcn_CountryId: 103, prcn_Country: "British Virgin Islands" },
  { prcn_CountryId: 104, prcn_Country: "Bahrain, Kingdom of" },
  { prcn_CountryId: 105, prcn_Country: "Estonia" },
  { prcn_CountryId: 106, prcn_Country: "Ukraine" },
  { prcn_CountryId: 107, prcn_Country: "Algeria" },
  { prcn_CountryId: 108, prcn_Country: "Madagascar, Repub. of" },
  { prcn_CountryId: 109, prcn_Country: "Cote D'Ivoire, Repub. of" },
  { prcn_CountryId: 110, prcn_Country: "Burkina Faso" },
  { prcn_CountryId: 111, prcn_Country: "Qatar" },
  { prcn_CountryId: 112, prcn_Country: "Luxembourg" },
  { prcn_CountryId: 113, prcn_Country: "Equatorial Guinea, Repub. of" },
  { prcn_CountryId: 114, prcn_Country: "Bulgaria" },
  { prcn_CountryId: 115, prcn_Country: "Paraguay, Repub. of" },
  { prcn_CountryId: 116, prcn_Country: "Anguilla" },
  { prcn_CountryId: 117, prcn_Country: "Lebanon" },
  { prcn_CountryId: 118, prcn_Country: "Republic of Mali" },
  { prcn_CountryId: 119, prcn_Country: "Ethiopia" },
];

// TODO:JMT - CHANGE THIS TO THE DATA SOURCE FROM THE BBOS
const states = [
  {
    prst_StateId: 1,
    prst_State: "Alabama",
    prst_CountryId: 1,
    prst_Abbreviation: "AL",
  },
  {
    prst_StateId: 2,
    prst_State: "Alaska",
    prst_CountryId: 1,
    prst_Abbreviation: "AK",
  },
  {
    prst_StateId: 3,
    prst_State: "Arizona",
    prst_CountryId: 1,
    prst_Abbreviation: "AZ",
  },
  {
    prst_StateId: 4,
    prst_State: "Arkansas",
    prst_CountryId: 1,
    prst_Abbreviation: "AR",
  },
  {
    prst_StateId: 5,
    prst_State: "California",
    prst_CountryId: 1,
    prst_Abbreviation: "CA",
  },
  {
    prst_StateId: 6,
    prst_State: "Colorado",
    prst_CountryId: 1,
    prst_Abbreviation: "CO",
  },
  {
    prst_StateId: 7,
    prst_State: "Connecticut",
    prst_CountryId: 1,
    prst_Abbreviation: "CT",
  },
  {
    prst_StateId: 8,
    prst_State: "Delaware",
    prst_CountryId: 1,
    prst_Abbreviation: "DE",
  },
  {
    prst_StateId: 9,
    prst_State: "District of Columbia",
    prst_CountryId: 1,
    prst_Abbreviation: "DC",
  },
  {
    prst_StateId: 10,
    prst_State: "Florida",
    prst_CountryId: 1,
    prst_Abbreviation: "FL",
  },
  {
    prst_StateId: 11,
    prst_State: "Georgia",
    prst_CountryId: 1,
    prst_Abbreviation: "GA",
  },
  {
    prst_StateId: 12,
    prst_State: "Hawaii",
    prst_CountryId: 1,
    prst_Abbreviation: "HI",
  },
  {
    prst_StateId: 13,
    prst_State: "Idaho",
    prst_CountryId: 1,
    prst_Abbreviation: "ID",
  },
  {
    prst_StateId: 14,
    prst_State: "Illinois",
    prst_CountryId: 1,
    prst_Abbreviation: "IL",
  },
  {
    prst_StateId: 15,
    prst_State: "Indiana",
    prst_CountryId: 1,
    prst_Abbreviation: "IN",
  },
  {
    prst_StateId: 16,
    prst_State: "Iowa",
    prst_CountryId: 1,
    prst_Abbreviation: "IA",
  },
  {
    prst_StateId: 17,
    prst_State: "Kansas",
    prst_CountryId: 1,
    prst_Abbreviation: "KS",
  },
  {
    prst_StateId: 18,
    prst_State: "Kentucky",
    prst_CountryId: 1,
    prst_Abbreviation: "KY",
  },
  {
    prst_StateId: 19,
    prst_State: "Louisiana",
    prst_CountryId: 1,
    prst_Abbreviation: "LA",
  },
  {
    prst_StateId: 20,
    prst_State: "Maine",
    prst_CountryId: 1,
    prst_Abbreviation: "ME",
  },
  {
    prst_StateId: 21,
    prst_State: "Maryland",
    prst_CountryId: 1,
    prst_Abbreviation: "MD",
  },
  {
    prst_StateId: 22,
    prst_State: "Massachusetts",
    prst_CountryId: 1,
    prst_Abbreviation: "MA",
  },
  {
    prst_StateId: 23,
    prst_State: "Michigan",
    prst_CountryId: 1,
    prst_Abbreviation: "MI",
  },
  {
    prst_StateId: 24,
    prst_State: "Minnesota",
    prst_CountryId: 1,
    prst_Abbreviation: "MN",
  },
  {
    prst_StateId: 25,
    prst_State: "Mississippi",
    prst_CountryId: 1,
    prst_Abbreviation: "MS",
  },
  {
    prst_StateId: 26,
    prst_State: "Missouri",
    prst_CountryId: 1,
    prst_Abbreviation: "MO",
  },
  {
    prst_StateId: 27,
    prst_State: "Montana",
    prst_CountryId: 1,
    prst_Abbreviation: "MT",
  },
  {
    prst_StateId: 28,
    prst_State: "Nebraska",
    prst_CountryId: 1,
    prst_Abbreviation: "NE",
  },
  {
    prst_StateId: 29,
    prst_State: "Nevada",
    prst_CountryId: 1,
    prst_Abbreviation: "NV",
  },
  {
    prst_StateId: 30,
    prst_State: "New Hampshire",
    prst_CountryId: 1,
    prst_Abbreviation: "NH",
  },
  {
    prst_StateId: 31,
    prst_State: "New Jersey",
    prst_CountryId: 1,
    prst_Abbreviation: "NJ",
  },
  {
    prst_StateId: 32,
    prst_State: "New Mexico",
    prst_CountryId: 1,
    prst_Abbreviation: "NM",
  },
  {
    prst_StateId: 33,
    prst_State: "New York",
    prst_CountryId: 1,
    prst_Abbreviation: "NY",
  },
  {
    prst_StateId: 34,
    prst_State: "North Carolina",
    prst_CountryId: 1,
    prst_Abbreviation: "NC",
  },
  {
    prst_StateId: 35,
    prst_State: "North Dakota",
    prst_CountryId: 1,
    prst_Abbreviation: "ND",
  },
  {
    prst_StateId: 36,
    prst_State: "Ohio",
    prst_CountryId: 1,
    prst_Abbreviation: "OH",
  },
  {
    prst_StateId: 37,
    prst_State: "Oklahoma",
    prst_CountryId: 1,
    prst_Abbreviation: "OK",
  },
  {
    prst_StateId: 38,
    prst_State: "Oregon",
    prst_CountryId: 1,
    prst_Abbreviation: "OR",
  },
  {
    prst_StateId: 39,
    prst_State: "Pennsylvania",
    prst_CountryId: 1,
    prst_Abbreviation: "PA",
  },
  {
    prst_StateId: 40,
    prst_State: "Rhode Island",
    prst_CountryId: 1,
    prst_Abbreviation: "RI",
  },
  {
    prst_StateId: 41,
    prst_State: "South Carolina",
    prst_CountryId: 1,
    prst_Abbreviation: "SC",
  },
  {
    prst_StateId: 42,
    prst_State: "South Dakota",
    prst_CountryId: 1,
    prst_Abbreviation: "SD",
  },
  {
    prst_StateId: 43,
    prst_State: "Tennessee",
    prst_CountryId: 1,
    prst_Abbreviation: "TN",
  },
  {
    prst_StateId: 44,
    prst_State: "Texas",
    prst_CountryId: 1,
    prst_Abbreviation: "TX",
  },
  {
    prst_StateId: 45,
    prst_State: "Utah",
    prst_CountryId: 1,
    prst_Abbreviation: "UT",
  },
  {
    prst_StateId: 46,
    prst_State: "Vermont",
    prst_CountryId: 1,
    prst_Abbreviation: "VT",
  },
  {
    prst_StateId: 47,
    prst_State: "Virginia",
    prst_CountryId: 1,
    prst_Abbreviation: "VA",
  },
  {
    prst_StateId: 48,
    prst_State: "Washington",
    prst_CountryId: 1,
    prst_Abbreviation: "WA",
  },
  {
    prst_StateId: 49,
    prst_State: "West Virginia",
    prst_CountryId: 1,
    prst_Abbreviation: "WV",
  },
  {
    prst_StateId: 50,
    prst_State: "Wisconsin",
    prst_CountryId: 1,
    prst_Abbreviation: "WI",
  },
  {
    prst_StateId: 51,
    prst_State: "Wyoming",
    prst_CountryId: 1,
    prst_Abbreviation: "WY",
  },
  {
    prst_StateId: 1015,
    prst_State: "Puerto Rico",
    prst_CountryId: 1,
    prst_Abbreviation: "PR",
  },
  {
    prst_StateId: 1016,
    prst_State: "Guam",
    prst_CountryId: 1,
    prst_Abbreviation: "GU",
  },
  {
    prst_StateId: 1017,
    prst_State: "Virgin Islands",
    prst_CountryId: 1,
    prst_Abbreviation: "VI",
  },
  {
    prst_StateId: 52,
    prst_State: "Alberta",
    prst_CountryId: 2,
    prst_Abbreviation: "AB",
  },
  {
    prst_StateId: 53,
    prst_State: "British Columbia",
    prst_CountryId: 2,
    prst_Abbreviation: "BC",
  },
  {
    prst_StateId: 54,
    prst_State: "Manitoba",
    prst_CountryId: 2,
    prst_Abbreviation: "MB",
  },
  {
    prst_StateId: 55,
    prst_State: "New Brunswick",
    prst_CountryId: 2,
    prst_Abbreviation: "NB",
  },
  {
    prst_StateId: 56,
    prst_State: "Newfoundland and Labrador",
    prst_CountryId: 2,
    prst_Abbreviation: "NL",
  },
  {
    prst_StateId: 57,
    prst_State: "Northwest Territories",
    prst_CountryId: 2,
    prst_Abbreviation: "NT",
  },
  {
    prst_StateId: 58,
    prst_State: "Nova Scotia",
    prst_CountryId: 2,
    prst_Abbreviation: "NS",
  },
  {
    prst_StateId: 59,
    prst_State: "Ontario",
    prst_CountryId: 2,
    prst_Abbreviation: "ON",
  },
  {
    prst_StateId: 60,
    prst_State: "Prince Edward Island",
    prst_CountryId: 2,
    prst_Abbreviation: "PE",
  },
  {
    prst_StateId: 61,
    prst_State: "Quebec",
    prst_CountryId: 2,
    prst_Abbreviation: "QC",
  },
  {
    prst_StateId: 62,
    prst_State: "Saskatchewan",
    prst_CountryId: 2,
    prst_Abbreviation: "SK",
  },
  {
    prst_StateId: 63,
    prst_State: "Yukon",
    prst_CountryId: 2,
    prst_Abbreviation: "YT",
  },
  {
    prst_StateId: 64,
    prst_State: "Aguascalientes",
    prst_CountryId: 3,
    prst_Abbreviation: "Ags",
  },
  {
    prst_StateId: 65,
    prst_State: "Baja California",
    prst_CountryId: 3,
    prst_Abbreviation: "BCN",
  },
  {
    prst_StateId: 66,
    prst_State: "Baja California Sur",
    prst_CountryId: 3,
    prst_Abbreviation: "BCS",
  },
  {
    prst_StateId: 67,
    prst_State: "Campeche",
    prst_CountryId: 3,
    prst_Abbreviation: "Camp",
  },
  {
    prst_StateId: 68,
    prst_State: "Chiapas",
    prst_CountryId: 3,
    prst_Abbreviation: "Chis",
  },
  {
    prst_StateId: 69,
    prst_State: "Chihuahua",
    prst_CountryId: 3,
    prst_Abbreviation: "Chih",
  },
  {
    prst_StateId: 70,
    prst_State: "Coahuila",
    prst_CountryId: 3,
    prst_Abbreviation: "Coah",
  },
  {
    prst_StateId: 71,
    prst_State: "Colima",
    prst_CountryId: 3,
    prst_Abbreviation: "Col",
  },
  {
    prst_StateId: 72,
    prst_State: "Durango",
    prst_CountryId: 3,
    prst_Abbreviation: "Dgo",
  },
  {
    prst_StateId: 73,
    prst_State: "Estado de Mexico",
    prst_CountryId: 3,
    prst_Abbreviation: "Mex",
  },
  {
    prst_StateId: 74,
    prst_State: "Ciudad de Mexico",
    prst_CountryId: 3,
    prst_Abbreviation: "CDMX",
  },
  {
    prst_StateId: 75,
    prst_State: "Guanajuato",
    prst_CountryId: 3,
    prst_Abbreviation: "Gto",
  },
  {
    prst_StateId: 76,
    prst_State: "Guerrero",
    prst_CountryId: 3,
    prst_Abbreviation: "Gro",
  },
  {
    prst_StateId: 77,
    prst_State: "Hidalgo",
    prst_CountryId: 3,
    prst_Abbreviation: "Hgo",
  },
  {
    prst_StateId: 78,
    prst_State: "Jalisco",
    prst_CountryId: 3,
    prst_Abbreviation: "Jal",
  },
  {
    prst_StateId: 79,
    prst_State: "Michoacan",
    prst_CountryId: 3,
    prst_Abbreviation: "Mich",
  },
  {
    prst_StateId: 80,
    prst_State: "Morelos",
    prst_CountryId: 3,
    prst_Abbreviation: "Mor",
  },
  {
    prst_StateId: 81,
    prst_State: "Nayarit",
    prst_CountryId: 3,
    prst_Abbreviation: "Nay",
  },
  {
    prst_StateId: 82,
    prst_State: "Nuevo Leon",
    prst_CountryId: 3,
    prst_Abbreviation: "NL",
  },
  {
    prst_StateId: 83,
    prst_State: "Oaxaca",
    prst_CountryId: 3,
    prst_Abbreviation: "Oax",
  },
  {
    prst_StateId: 84,
    prst_State: "Puebla",
    prst_CountryId: 3,
    prst_Abbreviation: "Pue",
  },
  {
    prst_StateId: 85,
    prst_State: "Queretaro",
    prst_CountryId: 3,
    prst_Abbreviation: "Qro",
  },
  {
    prst_StateId: 86,
    prst_State: "Quintana Roo",
    prst_CountryId: 3,
    prst_Abbreviation: "QR",
  },
  {
    prst_StateId: 87,
    prst_State: "San Luis Potosi",
    prst_CountryId: 3,
    prst_Abbreviation: "SLP",
  },
  {
    prst_StateId: 88,
    prst_State: "Sinaloa",
    prst_CountryId: 3,
    prst_Abbreviation: "Sin",
  },
  {
    prst_StateId: 89,
    prst_State: "Sonora",
    prst_CountryId: 3,
    prst_Abbreviation: "Son",
  },
  {
    prst_StateId: 90,
    prst_State: "Tabasco",
    prst_CountryId: 3,
    prst_Abbreviation: "Tab",
  },
  {
    prst_StateId: 91,
    prst_State: "Tamaulipas",
    prst_CountryId: 3,
    prst_Abbreviation: "Tamps",
  },
  {
    prst_StateId: 92,
    prst_State: "Tlaxcala",
    prst_CountryId: 3,
    prst_Abbreviation: "Tlax",
  },
  {
    prst_StateId: 93,
    prst_State: "Veracruz",
    prst_CountryId: 3,
    prst_Abbreviation: "Ver",
  },
  {
    prst_StateId: 94,
    prst_State: "Yucatan",
    prst_CountryId: 3,
    prst_Abbreviation: "Yuc",
  },
  {
    prst_StateId: 95,
    prst_State: "Zacatecas",
    prst_CountryId: 3,
    prst_Abbreviation: "Zac",
  },
];

// TODO:JMT - CHANGE THIS TO THE DATA SOURCE FROM THE BBOS
const terminalMarkets = [
  {
    prtm_TerminalMarketId: "0",
    prtm_FullMarketName:
      "Jefferson County Truck Growers Association/Alabama Farmers Market",
    prtm_City: "Birmingham",
    prtm_State: "AL",
  },
  {
    prtm_TerminalMarketId: "1",
    prtm_FullMarketName: "Montgomery State Farmers Market",
    prtm_City: "Montgomery",
    prtm_State: "AL",
  },
  {
    prtm_TerminalMarketId: "2",
    prtm_FullMarketName: "Los Angeles Wholesale Produce Market",
    prtm_City: "Los Angeles",
    prtm_State: "CA",
  },
  {
    prtm_TerminalMarketId: "3",
    prtm_FullMarketName: "Seventh Street City Market",
    prtm_City: "Los Angeles",
    prtm_State: "CA",
  },
  {
    prtm_TerminalMarketId: "4",
    prtm_FullMarketName: "Oakland Produce Mark",
    prtm_City: "Oakland",
    prtm_State: "CA",
  },
  {
    prtm_TerminalMarketId: "5",
    prtm_FullMarketName: "The SF Mark",
    prtm_City: "San Francisco",
    prtm_State: "CA",
  },
  {
    prtm_TerminalMarketId: "6",
    prtm_FullMarketName: "Golden Gate Produce Terminal",
    prtm_City: "So. San Francisco",
    prtm_State: "CA",
  },
  {
    prtm_TerminalMarketId: "7",
    prtm_FullMarketName: "State of Connecticut Regional Market",
    prtm_City: "Hartford",
    prtm_State: "CT",
  },
  {
    prtm_TerminalMarketId: "8",
    prtm_FullMarketName: "Florida City State Farmers Market",
    prtm_City: "Florida City",
    prtm_State: "FL",
  },
  {
    prtm_TerminalMarketId: "9",
    prtm_FullMarketName: "Fort Myers State Farmers Market",
    prtm_City: "Fort Myers",
    prtm_State: "FL",
  },
  {
    prtm_TerminalMarketId: "10",
    prtm_FullMarketName: "Fort Pierce State Farmers Market",
    prtm_City: "Fort Pierce",
    prtm_State: "FL",
  },
  {
    prtm_TerminalMarketId: "11",
    prtm_FullMarketName: "Immokalee State Farmers Market",
    prtm_City: "Immokalee",
    prtm_State: "FL",
  },
  {
    prtm_TerminalMarketId: "12",
    prtm_FullMarketName: "Miami Produce Cent",
    prtm_City: "Miami",
    prtm_State: "FL",
  },
  {
    prtm_TerminalMarketId: "13",
    prtm_FullMarketName: "Plant City State Farmers Market",
    prtm_City: "Plant City",
    prtm_State: "FL",
  },
  {
    prtm_TerminalMarketId: "14",
    prtm_FullMarketName: "Edward L. Myrick State Farmers Market",
    prtm_City: "Pompano Beach",
    prtm_State: "FL",
  },
  {
    prtm_TerminalMarketId: "15",
    prtm_FullMarketName: "Tampa Wholesale Produce Market",
    prtm_City: "Tampa",
    prtm_State: "FL",
  },
  {
    prtm_TerminalMarketId: "16",
    prtm_FullMarketName: "Cordele State Farmers Market",
    prtm_City: "Cordele",
    prtm_State: "GA",
  },
  {
    prtm_TerminalMarketId: "17",
    prtm_FullMarketName: "Atlanta State Farmers Market",
    prtm_City: "Forest Park",
    prtm_State: "GA",
  },
  {
    prtm_TerminalMarketId: "18",
    prtm_FullMarketName: "Savannah State Farmers Market",
    prtm_City: "Savannah",
    prtm_State: "GA",
  },
  {
    prtm_TerminalMarketId: "19",
    prtm_FullMarketName: "Thomasville State Farmers Market",
    prtm_City: "Thomasville",
    prtm_State: "GA",
  },
  {
    prtm_TerminalMarketId: "20",
    prtm_FullMarketName: "Chicago International Produce Market",
    prtm_City: "Chicago",
    prtm_State: "IL",
  },
  {
    prtm_TerminalMarketId: "21",
    prtm_FullMarketName: "Louisville Produce Terminal",
    prtm_City: "Louisville",
    prtm_State: "KY",
  },
  {
    prtm_TerminalMarketId: "22",
    prtm_FullMarketName: "New England Produce Center",
    prtm_City: "Chelsea",
    prtm_State: "MA",
  },
  {
    prtm_TerminalMarketId: "23",
    prtm_FullMarketName: "Maryland Wholesale Produce Market",
    prtm_City: "Jessup",
    prtm_State: "MD",
  },
  {
    prtm_TerminalMarketId: "24",
    prtm_FullMarketName: "Detroit Eastern Market",
    prtm_City: "Detroit",
    prtm_State: "MI",
  },
  {
    prtm_TerminalMarketId: "25",
    prtm_FullMarketName: "Detroit Produce Terminal",
    prtm_City: "Detroit",
    prtm_State: "MI",
  },
  {
    prtm_TerminalMarketId: "26",
    prtm_FullMarketName: "St. Louis Produce Market",
    prtm_City: "St. Louis",
    prtm_State: "MO",
  },
  {
    prtm_TerminalMarketId: "27",
    prtm_FullMarketName: "Chihuahua Wholesale Produce Market",
    prtm_City: "Chihuahua",
    prtm_State: "MX",
  },
  {
    prtm_TerminalMarketId: "28",
    prtm_FullMarketName: "Culiacan Wholesale Produce Market",
    prtm_City: "Culiacan",
    prtm_State: "MX",
  },
  {
    prtm_TerminalMarketId: "29",
    prtm_FullMarketName: "Guadalajara Wholesale Produce Market",
    prtm_City: "Guadalajara",
    prtm_State: "MX",
  },
  {
    prtm_TerminalMarketId: "30",
    prtm_FullMarketName: "Mexico City Wholesale Produce Market",
    prtm_City: "Mexico City",
    prtm_State: "MX",
  },
  {
    prtm_TerminalMarketId: "31",
    prtm_FullMarketName: "Western North Carolina Farmers Market",
    prtm_City: "Asheville",
    prtm_State: "NC",
  },
  {
    prtm_TerminalMarketId: "32",
    prtm_FullMarketName: "Raleigh Farmers Market",
    prtm_City: "Raleigh",
    prtm_State: "NC",
  },
  {
    prtm_TerminalMarketId: "33",
    prtm_FullMarketName: "Vineland Co-op Produce Auction Assn., Inc.",
    prtm_City: "Vineland",
    prtm_State: "NJ",
  },
  {
    prtm_TerminalMarketId: "34",
    prtm_FullMarketName: "Hunts Point Terminal Produce Co-op Association, Inc.",
    prtm_City: "Bronx",
    prtm_State: "NY",
  },
  {
    prtm_TerminalMarketId: "35",
    prtm_FullMarketName: "Brooklyn Terminal Market",
    prtm_City: "Brooklyn",
    prtm_State: "NY",
  },
  {
    prtm_TerminalMarketId: "36",
    prtm_FullMarketName: "Niagara Frontier Food Terminal",
    prtm_City: "Buffalo",
    prtm_State: "NY",
  },
  {
    prtm_TerminalMarketId: "37",
    prtm_FullMarketName: "Capital District Regional Market",
    prtm_City: "Menands",
    prtm_State: "NY",
  },
  {
    prtm_TerminalMarketId: "38",
    prtm_FullMarketName: "Genesee Valley Regional Market Authority",
    prtm_City: "Rochester",
    prtm_State: "NY",
  },
  {
    prtm_TerminalMarketId: "39",
    prtm_FullMarketName: "Central New York Regional Market Authority",
    prtm_City: "Syracuse",
    prtm_State: "NY",
  },
  {
    prtm_TerminalMarketId: "40",
    prtm_FullMarketName: "Cleveland Produce Terminal",
    prtm_City: "Cleveland",
    prtm_State: "OH",
  },
  {
    prtm_TerminalMarketId: "41",
    prtm_FullMarketName: "Produce Terminal Company",
    prtm_City: "Columbus",
    prtm_State: "OH",
  },
  {
    prtm_TerminalMarketId: "42",
    prtm_FullMarketName: "Ontario Food Terminal",
    prtm_City: "Toronto",
    prtm_State: "ON",
  },
  {
    prtm_TerminalMarketId: "43",
    prtm_FullMarketName: "Philadelphia Wholesale Produce Market",
    prtm_City: "Philadelphia",
    prtm_State: "PA",
  },
  {
    prtm_TerminalMarketId: "44",
    prtm_FullMarketName: "South Carolina State Farmers Market",
    prtm_City: "West Columbia",
    prtm_State: "SC",
  },
  {
    prtm_TerminalMarketId: "45",
    prtm_FullMarketName: "Houston Produce Center",
    prtm_City: "Houston",
    prtm_State: "TX",
  },
  {
    prtm_TerminalMarketId: "46",
    prtm_FullMarketName: "McAllen Produce Terminal Market",
    prtm_City: "McAllen",
    prtm_State: "TX",
  },
  {
    prtm_TerminalMarketId: "47",
    prtm_FullMarketName: "San Antonio Produce Terminal Market",
    prtm_City: "San Antonio",
    prtm_State: "TX",
  },
  {
    prtm_TerminalMarketId: "48",
    prtm_FullMarketName: "San Antonio Wholesale Produce Market",
    prtm_City: "San Antonio",
    prtm_State: "TX",
  },
];

const countryState_setData = (countryId, csvStateIds) => {
  // countryState_setData(1) - just select USA no state
  // countryState_setData(1, "") - Just select USA no state
  // countryState_setData(1, "1,2,3,4"); - USA and first four state
  // countryState_setData(5); -- Other - Aruba
  // countryState_setData(5, ""); -- Other - Aruba
  // countryState_setData(5, "1,2,3,4"); -- Other - Aruba

  const radioElement =
    !countryId || countryId == 0
      ? radio_country_none
      : countryId == 1
      ? radio_country_usa
      : countryId == 2
      ? radio_country_canada
      : countryId == 3
      ? radio_country_mexico
      : radio_country_other;

  radioElement.checked = true;
  radioElement.onchange();

  if (countryId == null || countryId < 1) {
    // select nonel
    // already happened above.
  } else if (countryId < 4) {
    mulSel_filldata("countryState-mulSel", csvStateIds);
  } else {
    // select other country and its id
    const otherCountrySelect = enableOtherCountriesInput("otherCountries");
    otherCountrySelect.value = countryId;
  }
};

const mulSel_filldata = (mulSel_id, csvOptionIds) => {
  if (csvOptionIds == null) return;
  const optionIds = csvOptionIds.split(",");
  const mulSel_parent = document.querySelector("#" + mulSel_id);
  optionIds.forEach((optionId) => {
    // find the menu item and make is selected
    const menuitem = mulSel_parent.querySelector(
      `li[data-mulSel_id="${optionId}"]`,
    );
    if (menuitem) menuitem.click();
  });
};

// if a removable bbsButton bbsButton-tag-secondary
// is clicked, this is the function
// that needs to be called to remove it
const mulSel_onclickTag = (event) => {
  // TODO:PT - low priority, Make on the X on the tag clicable and focasable

  const mulSelParent = event.currentTarget.closest(".bbs-mulSel");
  const menu = mulSelParent.querySelector(".dropdown-menu");
  const mulSel_id = event.currentTarget.getAttribute("data-mulSel_id");

  const menuitem = menu.querySelector(`li[data-mulSel_id="${mulSel_id}"]`);
  if (menuitem) menuitem.classList.remove("selected");

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

const mulSel_onkeydown = (event) => {
  const key = event.key;

  // TODO:PT - somehow Escape key is not detected here at all.
  // cannot close the menu because of that.

  if (key == "ArrowDown" || key == "ArrowUp") {
    event.preventDefault();

    // Bootstrap stuff!!
    // find the instance of the dropdown
    // this is the div with data-bs-toggle="dropdown" attribute
    const instance = bootstrap.Dropdown.getOrCreateInstance(
      event.currentTarget.closest('[data-bs-toggle="dropdown"]'),
    );
    if (instance) {
      instance.show();
      instance._selectMenuItem(event);
    }
  }
};

// Open the mulSel menu when
// user starts typing inside
// the mulSel .bbs-mulSel
// and filters the content
const mulSel_oninput = (event) => {
  const inputValue = event.currentTarget.value;
  const menu = event.currentTarget
    .closest(".bbs-mulSel")
    .querySelector(".dropdown-menu");

  const instance = bootstrap.Dropdown.getOrCreateInstance(
    event.currentTarget.closest(".bbs-mulSel-input"),
  );
  if (instance) {
    instance.show();
  }

  // Filter the menu items based on the input
  const optionss = menu.querySelectorAll("li");
  optionss.forEach((htmlElement) => {
    // text-label
    const value = htmlElement
      .getAttribute("data-search_string")
      .toLowerCase()
      .trim();
    if (value.includes(inputValue.toLowerCase().trim())) {
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
    noResults.innerHTML = "No results found with the string " + inputValue;
    menu.appendChild(noResults);
  } else {
    const nodata = menu.querySelector(".menu-no-data");
    if (nodata) {
      nodata.remove();
    }
  }

  event.stopPropagation();
};

const getOrCreateTagContainer = (mulSelParent) => {
  let tagContainer = mulSelParent.querySelector(".mulSel-tag-container");
  if (!tagContainer) {
    // create a tag container
    // and append it to the parent of the input
    tagContainer = document.createElement("div");
    tagContainer.setAttribute("class", "mulSel-tag-container");
    mulSelParent.appendChild(tagContainer);
  }
  return tagContainer;
};

// Based on the country,
// this function adds options in the
// .bbs-mulSel's menu.
const mulSel_createOpt_TerminalMkt = () => {
  const mulSel = document.querySelector("#terminalMkt-mulSel");
  if (mulSel == null) return;
  // Clear the existing multiseled tags
  mulSel.querySelector(".mulSel-tag-container").innerHTML = "";

  const optionContainer = mulSel.querySelector("ul.dropdown-menu");

  // clear the previous list
  optionContainer.innerHTML = "";

  // const terminalMarkets = [
  // {
  //   prtm_TerminalMarketId: "0",
  //   prtm_FullMarketName:
  //     "Jefferson County Truck Growers Association/Alabama Farmers Market",
  //   prtm_City: "Birmingham",
  //   prtm_State: "AL",
  // }
  // ],

  // populate the state mulSel
  for (let i in terminalMarkets) {
    const name = terminalMarkets[i].prtm_FullMarketName;
    const city = terminalMarkets[i].prtm_City;
    const state = terminalMarkets[i].prtm_State;

    const outer = document.createElement("li");
    optionContainer.appendChild(outer);

    const option = document.createElement("button");
    outer.appendChild(option);

    outer.setAttribute(
      "onclick",
      `mulSel_onclickOpt_TerminalMkt(event, "${terminalMarkets[i].prtm_TerminalMarketId}")`,
    );
    // terminal_id;
    outer.setAttribute(
      "data-mulSel_id",
      terminalMarkets[i].prtm_TerminalMarketId,
    );
    outer.setAttribute("data-search_string", name + " " + city + " " + state);
    option.setAttribute("tabindex", "-1");
    option.setAttribute("class", "bbsButton bbsButton-menu-item dropdown-item");
    option.setAttribute("role", "option");
    option.setAttribute("type", "button");
    option.innerHTML = `
      <div class="tw-flex tw-flex-col">
        <span class="text-label">${name}</span>
        <span class="caption">${city}, ${state}</span>
      </div>
      <span class="msicon notranslate">check</span>
      `;
  }
};

// call the above function
(() => {
  mulSel_createOpt_TerminalMkt();
})();

const mulSel_onclickOpt_TerminalMkt = (event, optionId) => {
  // const terminalMarkets = [
  //   {
  //   prtm_TerminalMarketId: "0",
  //   prtm_FullMarketName:
  //     "Jefferson County Truck Growers Association/Alabama Farmers Market | Birmingham, AL",
  // }],

  // find the market
  const terminalMarket = terminalMarkets.find(
    (object) => object.prtm_TerminalMarketId == optionId,
  );

  event.stopPropagation();
  const mulSelParent = event.currentTarget.closest(".bbs-mulSel");

  const tagContainer = getOrCreateTagContainer(mulSelParent);

  const name = terminalMarket.prtm_FullMarketName;
  const city = terminalMarket.prtm_City;

  const tagLabel = name.substring(0, 15) + "..., " + city;

  // check if there is any tag with that value exist in the parent
  const tagElement = tagContainer.querySelector(
    `button[data-mulSel_id="${optionId}"]`,
  );
  if (!tagElement) {
    // create the tag if it does not exists
    // and mark item as selected
    const newTag = document.createElement("button");
    newTag.setAttribute("class", "bbsButton bbsButton-tag-secondary small");
    newTag.setAttribute("data-mulSel_id", optionId);
    newTag.setAttribute("onclick", "mulSel_onclickTag(event)");
    newTag.innerHTML = `
    <span>${tagLabel}</span>
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

  // focus the input
  mulSelParent.querySelector("input").focus();
};

// Based ont the country,
// this function adds options in the
// .bbs-mulSel's menu.
const mulSel_createOpt_CountryState = (optionId) => {
  // optionId 1 == USA, 2 == Canada, 3 == Mexico

  // clear and disable other-countries input
  const otherCountryInput = document.querySelector("#otherCountries");
  otherCountryInput.setAttribute("disabled", "disabled");
  otherCountryInput.value = "";

  const mulSel = document.querySelector("#countryState-mulSel");

  // TODO:PT - low priority, the bootstrap dropdown is still opening
  // even if you have disabled the button using the filedset.
  // This is due to the data-bs-toggle="dropdown" set on a div and
  // not on a button.

  // enable state and city selection
  document.querySelector("#us-canada-mexico").removeAttribute("disabled");

  // Clear the existing multiseled tags
  mulSel.querySelector(".mulSel-tag-container").innerHTML = "";

  const optionContainer = mulSel.querySelector("ul.dropdown-menu");

  // clear the previous list
  optionContainer.innerHTML = "";

  // states e.g.
  // [{
  //   prst_StateId: 1,
  //   prst_State: "Alabama",
  //   prst_CountryId: 1,
  //   prst_Abbreviation: "AL",
  // }],

  // fiter the states for the selected optionId
  const filteredStates = states.filter(
    (state) => state.prst_CountryId == optionId,
  );

  // populate the state mulSel
  for (let i in filteredStates) {
    const outer = document.createElement("li");
    optionContainer.appendChild(outer);
    const option = document.createElement("button");
    outer.appendChild(option);

    const label = `${filteredStates[i].prst_State} (${filteredStates[i].prst_Abbreviation})`;

    outer.setAttribute(
      "onclick",
      `mulSel_onclickOpt_CountryState(event, "${filteredStates[i].prst_StateId}")`,
    );

    outer.setAttribute("data-mulSel_id", filteredStates[i].prst_StateId);
    outer.setAttribute("data-search_string", label);

    option.setAttribute("tabindex", "-1");
    option.setAttribute("class", "bbsButton bbsButton-menu-item dropdown-item");
    option.setAttribute("role", "option");
    option.setAttribute("type", "button");
    option.innerHTML = `
      <span class="text-label">${label}</span>
      <span class="msicon notranslate">check</span>
     `;
  }
};

// When you need to add tags from the
// .bbs-mulSel. call this function with the value,
// this will add the tags in the .mulSel-tag-container
// if it exits or append one in the mulSel
const mulSel_onclickOpt_CountryState = (event, optionId) => {
  // states e.g.
  // [{
  //   prst_StateId: 1,
  //   prst_State: "Alabama",
  //   prst_CountryId: 1,
  //   prst_Abbreviation: "AL",
  // }],

  // find the state
  const stateobject = states.find((state) => state.prst_StateId == optionId);

  event.stopPropagation();
  const mulSelParent = event.currentTarget.closest(".bbs-mulSel");

  const tagContainer = getOrCreateTagContainer(mulSelParent);

  // check if there is any tag with that value exist in the parent
  const tagElement = tagContainer.querySelector(
    `button[data-mulSel_id="${optionId}"]`,
  );

  if (!tagElement) {
    // create the tag if it does not exists
    const newTag = document.createElement("button");
    newTag.setAttribute("class", "bbsButton bbsButton-tag-secondary small");
    newTag.setAttribute("data-mulSel_id", optionId);
    newTag.setAttribute("onclick", "mulSel_onclickTag(event)");
    newTag.innerHTML = `
    <span>${stateobject.prst_State}</span>
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

  // focus the input
  mulSelParent.querySelector("input").focus();
};

const selectNoneCountry = (event) => {
  const otherCountryInput = document.querySelector("#otherCountries");
  otherCountryInput.setAttribute("disabled", "disabled");
  otherCountryInput.value = "";

  // disabled state and city selection
  const stateCitiselector = document.querySelector("#us-canada-mexico");

  stateCitiselector.setAttribute("disabled", "disabled");

  // Clear the existing multiseled tags
  stateCitiselector.querySelector(".mulSel-tag-container").innerHTML = "";
};

// This is called when Other countries
// radio is selected.
const enableOtherCountriesInput = (id) => {
  selectNoneCountry();

  const otherCountrySelect = document.querySelector("#" + id);
  otherCountrySelect.removeAttribute("disabled");
  otherCountrySelect.innerHTML = "";

  // Populate other country selection list
  // const countries = [
  //   { prcn_CountryId: 1, prcn_Country: "USA" },
  // ]

  for (let i in countries) {
    // skip US, Canada and Mexico
    if (
      countries[i].prcn_CountryId == 1 ||
      countries[i].prcn_CountryId == 2 ||
      countries[i].prcn_CountryId == 3
    ) {
      continue;
    }

    const option = document.createElement("option");
    option.setAttribute("value", countries[i].prcn_CountryId);
    option.setAttribute("data-prcn_CountryId", countries[i].prcn_CountryId);
    option.innerHTML = countries[i].prcn_Country;

    otherCountrySelect.appendChild(option);
  }
  otherCountrySelect.focus();
  return otherCountrySelect;
};

const clearallsearch = () => {
  [...document.querySelectorAll(".search-criteria-group")].forEach(
    (htmlElement) => {
      htmlElement.remove();
    },
  );
};

const toggleZipcodeInput = (checked, id) => {
  const input = document.querySelector("#" + id);
  if (checked) {
    input.removeAttribute("disabled");
  } else {
    input.setAttribute("disabled", "disabled");
  }
};
