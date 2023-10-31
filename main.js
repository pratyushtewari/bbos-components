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
    prst_stateid: 1,
    prst_state: "Alabama",
    prst_countryid: 1,
    prst_Abbreviation: "AL",
  },
  {
    prst_stateid: 2,
    prst_state: "Alaska",
    prst_countryid: 1,
    prst_Abbreviation: "AK",
  },
  {
    prst_stateid: 3,
    prst_state: "Arizona",
    prst_countryid: 1,
    prst_Abbreviation: "AZ",
  },
  {
    prst_stateid: 4,
    prst_state: "Arkansas",
    prst_countryid: 1,
    prst_Abbreviation: "AR",
  },
  {
    prst_stateid: 5,
    prst_state: "California",
    prst_countryid: 1,
    prst_Abbreviation: "CA",
  },
  {
    prst_stateid: 6,
    prst_state: "Colorado",
    prst_countryid: 1,
    prst_Abbreviation: "CO",
  },
  {
    prst_stateid: 7,
    prst_state: "Connecticut",
    prst_countryid: 1,
    prst_Abbreviation: "CT",
  },
  {
    prst_stateid: 8,
    prst_state: "Delaware",
    prst_countryid: 1,
    prst_Abbreviation: "DE",
  },
  {
    prst_stateid: 9,
    prst_state: "District of Columbia",
    prst_countryid: 1,
    prst_Abbreviation: "DC",
  },
  {
    prst_stateid: 10,
    prst_state: "Florida",
    prst_countryid: 1,
    prst_Abbreviation: "FL",
  },
  {
    prst_stateid: 11,
    prst_state: "Georgia",
    prst_countryid: 1,
    prst_Abbreviation: "GA",
  },
  {
    prst_stateid: 12,
    prst_state: "Hawaii",
    prst_countryid: 1,
    prst_Abbreviation: "HI",
  },
  {
    prst_stateid: 13,
    prst_state: "Idaho",
    prst_countryid: 1,
    prst_Abbreviation: "ID",
  },
  {
    prst_stateid: 14,
    prst_state: "Illinois",
    prst_countryid: 1,
    prst_Abbreviation: "IL",
  },
  {
    prst_stateid: 15,
    prst_state: "Indiana",
    prst_countryid: 1,
    prst_Abbreviation: "IN",
  },
  {
    prst_stateid: 16,
    prst_state: "Iowa",
    prst_countryid: 1,
    prst_Abbreviation: "IA",
  },
  {
    prst_stateid: 17,
    prst_state: "Kansas",
    prst_countryid: 1,
    prst_Abbreviation: "KS",
  },
  {
    prst_stateid: 18,
    prst_state: "Kentucky",
    prst_countryid: 1,
    prst_Abbreviation: "KY",
  },
  {
    prst_stateid: 19,
    prst_state: "Louisiana",
    prst_countryid: 1,
    prst_Abbreviation: "LA",
  },
  {
    prst_stateid: 20,
    prst_state: "Maine",
    prst_countryid: 1,
    prst_Abbreviation: "ME",
  },
  {
    prst_stateid: 21,
    prst_state: "Maryland",
    prst_countryid: 1,
    prst_Abbreviation: "MD",
  },
  {
    prst_stateid: 22,
    prst_state: "Massachusetts",
    prst_countryid: 1,
    prst_Abbreviation: "MA",
  },
  {
    prst_stateid: 23,
    prst_state: "Michigan",
    prst_countryid: 1,
    prst_Abbreviation: "MI",
  },
  {
    prst_stateid: 24,
    prst_state: "Minnesota",
    prst_countryid: 1,
    prst_Abbreviation: "MN",
  },
  {
    prst_stateid: 25,
    prst_state: "Mississippi",
    prst_countryid: 1,
    prst_Abbreviation: "MS",
  },
  {
    prst_stateid: 26,
    prst_state: "Missouri",
    prst_countryid: 1,
    prst_Abbreviation: "MO",
  },
  {
    prst_stateid: 27,
    prst_state: "Montana",
    prst_countryid: 1,
    prst_Abbreviation: "MT",
  },
  {
    prst_stateid: 28,
    prst_state: "Nebraska",
    prst_countryid: 1,
    prst_Abbreviation: "NE",
  },
  {
    prst_stateid: 29,
    prst_state: "Nevada",
    prst_countryid: 1,
    prst_Abbreviation: "NV",
  },
  {
    prst_stateid: 30,
    prst_state: "New Hampshire",
    prst_countryid: 1,
    prst_Abbreviation: "NH",
  },
  {
    prst_stateid: 31,
    prst_state: "New Jersey",
    prst_countryid: 1,
    prst_Abbreviation: "NJ",
  },
  {
    prst_stateid: 32,
    prst_state: "New Mexico",
    prst_countryid: 1,
    prst_Abbreviation: "NM",
  },
  {
    prst_stateid: 33,
    prst_state: "New York",
    prst_countryid: 1,
    prst_Abbreviation: "NY",
  },
  {
    prst_stateid: 34,
    prst_state: "North Carolina",
    prst_countryid: 1,
    prst_Abbreviation: "NC",
  },
  {
    prst_stateid: 35,
    prst_state: "North Dakota",
    prst_countryid: 1,
    prst_Abbreviation: "ND",
  },
  {
    prst_stateid: 36,
    prst_state: "Ohio",
    prst_countryid: 1,
    prst_Abbreviation: "OH",
  },
  {
    prst_stateid: 37,
    prst_state: "Oklahoma",
    prst_countryid: 1,
    prst_Abbreviation: "OK",
  },
  {
    prst_stateid: 38,
    prst_state: "Oregon",
    prst_countryid: 1,
    prst_Abbreviation: "OR",
  },
  {
    prst_stateid: 39,
    prst_state: "Pennsylvania",
    prst_countryid: 1,
    prst_Abbreviation: "PA",
  },
  {
    prst_stateid: 40,
    prst_state: "Rhode Island",
    prst_countryid: 1,
    prst_Abbreviation: "RI",
  },
  {
    prst_stateid: 41,
    prst_state: "South Carolina",
    prst_countryid: 1,
    prst_Abbreviation: "SC",
  },
  {
    prst_stateid: 42,
    prst_state: "South Dakota",
    prst_countryid: 1,
    prst_Abbreviation: "SD",
  },
  {
    prst_stateid: 43,
    prst_state: "Tennessee",
    prst_countryid: 1,
    prst_Abbreviation: "TN",
  },
  {
    prst_stateid: 44,
    prst_state: "Texas",
    prst_countryid: 1,
    prst_Abbreviation: "TX",
  },
  {
    prst_stateid: 45,
    prst_state: "Utah",
    prst_countryid: 1,
    prst_Abbreviation: "UT",
  },
  {
    prst_stateid: 46,
    prst_state: "Vermont",
    prst_countryid: 1,
    prst_Abbreviation: "VT",
  },
  {
    prst_stateid: 47,
    prst_state: "Virginia",
    prst_countryid: 1,
    prst_Abbreviation: "VA",
  },
  {
    prst_stateid: 48,
    prst_state: "Washington",
    prst_countryid: 1,
    prst_Abbreviation: "WA",
  },
  {
    prst_stateid: 49,
    prst_state: "West Virginia",
    prst_countryid: 1,
    prst_Abbreviation: "WV",
  },
  {
    prst_stateid: 50,
    prst_state: "Wisconsin",
    prst_countryid: 1,
    prst_Abbreviation: "WI",
  },
  {
    prst_stateid: 51,
    prst_state: "Wyoming",
    prst_countryid: 1,
    prst_Abbreviation: "WY",
  },
  {
    prst_stateid: 1015,
    prst_state: "Puerto Rico",
    prst_countryid: 1,
    prst_Abbreviation: "PR",
  },
  {
    prst_stateid: 1016,
    prst_state: "Guam",
    prst_countryid: 1,
    prst_Abbreviation: "GU",
  },
  {
    prst_stateid: 1017,
    prst_state: "Virgin Islands",
    prst_countryid: 1,
    prst_Abbreviation: "VI",
  },
  {
    prst_stateid: 52,
    prst_state: "Alberta",
    prst_countryid: 2,
    prst_Abbreviation: "AB",
  },
  {
    prst_stateid: 53,
    prst_state: "British Columbia",
    prst_countryid: 2,
    prst_Abbreviation: "BC",
  },
  {
    prst_stateid: 54,
    prst_state: "Manitoba",
    prst_countryid: 2,
    prst_Abbreviation: "MB",
  },
  {
    prst_stateid: 55,
    prst_state: "New Brunswick",
    prst_countryid: 2,
    prst_Abbreviation: "NB",
  },
  {
    prst_stateid: 56,
    prst_state: "Newfoundland and Labrador",
    prst_countryid: 2,
    prst_Abbreviation: "NL",
  },
  {
    prst_stateid: 57,
    prst_state: "Northwest Territories",
    prst_countryid: 2,
    prst_Abbreviation: "NT",
  },
  {
    prst_stateid: 58,
    prst_state: "Nova Scotia",
    prst_countryid: 2,
    prst_Abbreviation: "NS",
  },
  {
    prst_stateid: 59,
    prst_state: "Ontario",
    prst_countryid: 2,
    prst_Abbreviation: "ON",
  },
  {
    prst_stateid: 60,
    prst_state: "Prince Edward Island",
    prst_countryid: 2,
    prst_Abbreviation: "PE",
  },
  {
    prst_stateid: 61,
    prst_state: "Quebec",
    prst_countryid: 2,
    prst_Abbreviation: "QC",
  },
  {
    prst_stateid: 62,
    prst_state: "Saskatchewan",
    prst_countryid: 2,
    prst_Abbreviation: "SK",
  },
  {
    prst_stateid: 63,
    prst_state: "Yukon",
    prst_countryid: 2,
    prst_Abbreviation: "YT",
  },
  {
    prst_stateid: 64,
    prst_state: "Aguascalientes",
    prst_countryid: 3,
    prst_Abbreviation: "Ags",
  },
  {
    prst_stateid: 65,
    prst_state: "Baja California",
    prst_countryid: 3,
    prst_Abbreviation: "BCN",
  },
  {
    prst_stateid: 66,
    prst_state: "Baja California Sur",
    prst_countryid: 3,
    prst_Abbreviation: "BCS",
  },
  {
    prst_stateid: 67,
    prst_state: "Campeche",
    prst_countryid: 3,
    prst_Abbreviation: "Camp",
  },
  {
    prst_stateid: 68,
    prst_state: "Chiapas",
    prst_countryid: 3,
    prst_Abbreviation: "Chis",
  },
  {
    prst_stateid: 69,
    prst_state: "Chihuahua",
    prst_countryid: 3,
    prst_Abbreviation: "Chih",
  },
  {
    prst_stateid: 70,
    prst_state: "Coahuila",
    prst_countryid: 3,
    prst_Abbreviation: "Coah",
  },
  {
    prst_stateid: 71,
    prst_state: "Colima",
    prst_countryid: 3,
    prst_Abbreviation: "Col",
  },
  {
    prst_stateid: 72,
    prst_state: "Durango",
    prst_countryid: 3,
    prst_Abbreviation: "Dgo",
  },
  {
    prst_stateid: 73,
    prst_state: "Estado de Mexico",
    prst_countryid: 3,
    prst_Abbreviation: "Mex",
  },
  {
    prst_stateid: 74,
    prst_state: "Ciudad de Mexico",
    prst_countryid: 3,
    prst_Abbreviation: "CDMX",
  },
  {
    prst_stateid: 75,
    prst_state: "Guanajuato",
    prst_countryid: 3,
    prst_Abbreviation: "Gto",
  },
  {
    prst_stateid: 76,
    prst_state: "Guerrero",
    prst_countryid: 3,
    prst_Abbreviation: "Gro",
  },
  {
    prst_stateid: 77,
    prst_state: "Hidalgo",
    prst_countryid: 3,
    prst_Abbreviation: "Hgo",
  },
  {
    prst_stateid: 78,
    prst_state: "Jalisco",
    prst_countryid: 3,
    prst_Abbreviation: "Jal",
  },
  {
    prst_stateid: 79,
    prst_state: "Michoacan",
    prst_countryid: 3,
    prst_Abbreviation: "Mich",
  },
  {
    prst_stateid: 80,
    prst_state: "Morelos",
    prst_countryid: 3,
    prst_Abbreviation: "Mor",
  },
  {
    prst_stateid: 81,
    prst_state: "Nayarit",
    prst_countryid: 3,
    prst_Abbreviation: "Nay",
  },
  {
    prst_stateid: 82,
    prst_state: "Nuevo Leon",
    prst_countryid: 3,
    prst_Abbreviation: "NL",
  },
  {
    prst_stateid: 83,
    prst_state: "Oaxaca",
    prst_countryid: 3,
    prst_Abbreviation: "Oax",
  },
  {
    prst_stateid: 84,
    prst_state: "Puebla",
    prst_countryid: 3,
    prst_Abbreviation: "Pue",
  },
  {
    prst_stateid: 85,
    prst_state: "Queretaro",
    prst_countryid: 3,
    prst_Abbreviation: "Qro",
  },
  {
    prst_stateid: 86,
    prst_state: "Quintana Roo",
    prst_countryid: 3,
    prst_Abbreviation: "QR",
  },
  {
    prst_stateid: 87,
    prst_state: "San Luis Potosi",
    prst_countryid: 3,
    prst_Abbreviation: "SLP",
  },
  {
    prst_stateid: 88,
    prst_state: "Sinaloa",
    prst_countryid: 3,
    prst_Abbreviation: "Sin",
  },
  {
    prst_stateid: 89,
    prst_state: "Sonora",
    prst_countryid: 3,
    prst_Abbreviation: "Son",
  },
  {
    prst_stateid: 90,
    prst_state: "Tabasco",
    prst_countryid: 3,
    prst_Abbreviation: "Tab",
  },
  {
    prst_stateid: 91,
    prst_state: "Tamaulipas",
    prst_countryid: 3,
    prst_Abbreviation: "Tamps",
  },
  {
    prst_stateid: 92,
    prst_state: "Tlaxcala",
    prst_countryid: 3,
    prst_Abbreviation: "Tlax",
  },
  {
    prst_stateid: 93,
    prst_state: "Veracruz",
    prst_countryid: 3,
    prst_Abbreviation: "Ver",
  },
  {
    prst_stateid: 94,
    prst_state: "Yucatan",
    prst_countryid: 3,
    prst_Abbreviation: "Yuc",
  },
  {
    prst_stateid: 95,
    prst_state: "Zacatecas",
    prst_countryid: 3,
    prst_Abbreviation: "Zac",
  },
];

// TODO:JMT - CHANGE THIS TO THE DATA SOURCE FROM THE BBOS
const terminalMarkets = [
  {
    id: "0",
    value: "1",
    label: "Jefferson County Truck Growers Association/Alabama Farmers Market",
    city: "Birmingham, AL",
  },
  {
    id: "1",
    value: "6032",
    label: "Montgomery State Farmers Market",
    city: "Montgomery, AL",
  },
  {
    id: "2",
    value: "2",
    label: "Los Angeles Wholesale Produce Market",
    city: "Los Angeles, CA",
  },
  {
    id: "3",
    value: "3",
    label: "Seventh Street City Market",
    city: "Los Angeles, CA",
  },
  { id: "4", value: "7", label: "Oakland Produce Market", city: "Oakland, CA" },
  { id: "5", value: "5", label: "The SF Market", city: "San Francisco, CA" },
  {
    id: "6",
    value: "6",
    label: "Golden Gate Produce Terminal",
    city: "So. San Francisco, CA",
  },
  {
    id: "7",
    value: "6007",
    label: "State of Connecticut Regional Market",
    city: "Hartford, CT",
  },
  {
    id: "8",
    value: "6000",
    label: "Florida City State Farmers Market",
    city: "Florida City, FL",
  },
  {
    id: "9",
    value: "6001",
    label: "Fort Myers State Farmers Market",
    city: "Fort Myers, FL",
  },
  {
    id: "10",
    value: "6034",
    label: "Fort Pierce State Farmers Market",
    city: "Fort Pierce, FL",
  },
  {
    id: "11",
    value: "8",
    label: "Immokalee State Farmers Market",
    city: "Immokalee, FL",
  },
  { id: "12", value: "6010", label: "Miami Produce Center", city: "Miami, FL" },
  {
    id: "13",
    value: "9",
    label: "Plant City State Farmers Market",
    city: "Plant City, FL",
  },
  {
    id: "14",
    value: "10",
    label: "Edward L. Myrick State Farmers Market",
    city: "Pompano Beach, FL",
  },
  {
    id: "15",
    value: "11",
    label: "Tampa Wholesale Produce Market",
    city: "Tampa, FL",
  },
  {
    id: "16",
    value: "14",
    label: "Cordele State Farmers Market",
    city: "Cordele, GA",
  },
  {
    id: "17",
    value: "15",
    label: "Atlanta State Farmers Market",
    city: "Forest Park, GA",
  },
  {
    id: "18",
    value: "17",
    label: "Savannah State Farmers Market",
    city: "Savannah, GA",
  },
  {
    id: "19",
    value: "18",
    label: "Thomasville State Farmers Market",
    city: "Thomasville, GA",
  },
  {
    id: "20",
    value: "19",
    label: "Chicago International Produce Market",
    city: "Chicago, IL",
  },
  {
    id: "21",
    value: "6021",
    label: "Louisville Produce Terminal",
    city: "Louisville, KY",
  },
  {
    id: "22",
    value: "20",
    label: "New England Produce Center",
    city: "Chelsea, MA",
  },
  {
    id: "23",
    value: "22",
    label: "Maryland Wholesale Produce Market",
    city: "Jessup, MD",
  },
  {
    id: "24",
    value: "6023",
    label: "Detroit Eastern Market",
    city: "Detroit, MI",
  },
  {
    id: "25",
    value: "23",
    label: "Detroit Produce Terminal",
    city: "Detroit, MI",
  },
  {
    id: "26",
    value: "24",
    label: "St. Louis Produce Market",
    city: "St. Louis, MO",
  },
  {
    id: "27",
    value: "6002",
    label: "Chihuahua Wholesale Produce Market",
    city: "Chihuahua, MX",
  },
  {
    id: "28",
    value: "6004",
    label: "Culiacan Wholesale Produce Market",
    city: "Culiacan, MX",
  },
  {
    id: "29",
    value: "6005",
    label: "Guadalajara Wholesale Produce Market",
    city: "Guadalajara, MX",
  },
  {
    id: "30",
    value: "25",
    label: "Mexico City Wholesale Produce Market",
    city: "Mexico City, MX",
  },
  {
    id: "31",
    value: "6017",
    label: "Western North Carolina Farmers Market",
    city: "Asheville, NC",
  },
  {
    id: "32",
    value: "6022",
    label: "Raleigh Farmers Market",
    city: "Raleigh, NC",
  },
  {
    id: "33",
    value: "6033",
    label: "Vineland Co-op Produce Auction Assn., Inc.",
    city: "Vineland, NJ",
  },
  {
    id: "34",
    value: "26",
    label: "Hunts Point Terminal Produce Co-op Association, Inc.",
    city: "Bronx, NY",
  },
  {
    id: "35",
    value: "27",
    label: "Brooklyn Terminal Market",
    city: "Brooklyn, NY",
  },
  {
    id: "36",
    value: "6014",
    label: "Niagara Frontier Food Terminal",
    city: "Buffalo, NY",
  },
  {
    id: "37",
    value: "6013",
    label: "Capital District Regional Market",
    city: "Menands, NY",
  },
  {
    id: "38",
    value: "6015",
    label: "Genesee Valley Regional Market Authority",
    city: "Rochester, NY",
  },
  {
    id: "39",
    value: "6016",
    label: "Central New York Regional Market Authority",
    city: "Syracuse, NY",
  },
  {
    id: "40",
    value: "28",
    label: "Cleveland Produce Terminal",
    city: "Cleveland, OH",
  },
  {
    id: "41",
    value: "6018",
    label: "Produce Terminal Company",
    city: "Columbus, OH",
  },
  {
    id: "42",
    value: "29",
    label: "Ontario Food Terminal",
    city: "Toronto, ON",
  },
  {
    id: "43",
    value: "6026",
    label: "Philadelphia Wholesale Produce Market",
    city: "Philadelphia, PA",
  },
  {
    id: "44",
    value: "6024",
    label: "South Carolina State Farmers Market",
    city: "West Columbia, SC",
  },
  {
    id: "45",
    value: "6029",
    label: "Houston Produce Center",
    city: "Houston, TX",
  },
  {
    id: "46",
    value: "33",
    label: "McAllen Produce Terminal Market",
    city: "McAllen, TX",
  },
  {
    id: "47",
    value: "34",
    label: "San Antonio Produce Terminal Market",
    city: "San Antonio, TX",
  },
  {
    id: "48",
    value: "6035",
    label: "San Antonio Wholesale Produce Market",
    city: "San Antonio, TX",
  },
];

// Based ont the country,
// this function adds options in the
// .bbs-combobox's menu.

const addTerminalMarkets = () => {
  const combobox = document.querySelector("#terminalMarketSelectionCombobox");
  // Clear the existing multiseled tags
  combobox.querySelector(".multiselect-tag-container").innerHTML = "";

  const optionContainer = combobox.querySelector("ul.dropdown-menu");

  // clear the previous list
  optionContainer.innerHTML = "";

  // const terminalMarkets = [
  // {
  //   id: "48",
  //   value: "6035",
  //   label: "San Antonio Wholesale Produce Market",
  //   city: "San Antonio, TX",
  // }],

  // populate the state combobox
  for (let i in terminalMarkets) {
    const outer = document.createElement("li");
    optionContainer.appendChild(outer);

    const option = document.createElement("button");
    outer.appendChild(option);

    option.setAttribute(
      "onclick",
      `handleTerminalMultiselectOptionSelection(event, "${terminalMarkets[i].id}")`,
    );
    option.setAttribute("data-terminal_id", terminalMarkets[i].id);
    option.setAttribute("tabindex", "-1");
    option.setAttribute("class", "bbsButton bbsButton-menu-item dropdown-item");
    option.setAttribute("role", "option");
    option.setAttribute("type", "button");
    option.innerHTML = `
      <div class="tw-flex tw-flex-col">
        <span class="text-label">${terminalMarkets[i].label}</span>
        <span class="caption">${terminalMarkets[i].city}</span>
      </div>
      <span class="msicon notranslate">check</span>
      `;
  }
};

// call the above function
(() => {
  addTerminalMarkets();
})();

// if a removable bbsButton bbsButton-tag-secondary
// is clicked, this is the function
// that needs to be called to remove it
const removeTerminalMultiselectTag = (event) => {
  // TODO:PT - low priority, Make on the X on the tag clicable and focasable

  const comboboxParent = event.currentTarget.closest(".bbs-combobox");
  const menu = comboboxParent.querySelector(".dropdown-menu");
  const terminal_id = event.currentTarget.dataset.terminal_id;

  const menuitembutton = menu.querySelector(
    `li button[data-terminal_id="${terminal_id}"]`,
  );
  if (menuitembutton) menuitembutton.parentElement.classList.remove("selected");

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

const handleTerminalMultiselectOptionSelection = (event, terminal_id) => {
  // const terminalMarkets = [
  // {
  //   id: "48",
  //   value: "6035",
  //   label: "San Antonio Wholesale Produce Market",
  //   city: "San Antonio, TX",
  // }],

  // find the market
  const terminalMarket = terminalMarkets.find(
    (object) => object.id == terminal_id,
  );

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

  // check if there is any tag with that value exist in the parent
  const tagid = "terminal_id-" + terminal_id;
  const tagElement = tagContainer.querySelector("#" + tagid);
  if (!tagElement) {
    // create the tag if it does not exists
    const newTag = document.createElement("button");
    newTag.setAttribute("class", "bbsButton bbsButton-tag-secondary small");
    newTag.setAttribute("id", tagid);
    newTag.setAttribute("data-terminal_id", terminal_id);
    newTag.setAttribute("onclick", "removeTerminalMultiselectTag(event)");
    newTag.innerHTML = `
    <span>${terminalMarket.label}</span>
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
  inputElement.focus();
};

// Based ont the country,
// this function adds options in the
// .bbs-combobox's menu.
const addCountryStateOptions = (event, prcn_CountryId) => {
  // prcn_CountryId 1 == USA, 2 == Canada, 3 == Mexico

  // clear and disable other-countries input
  const otherCountryInput = document.querySelector("#otherCountries");
  otherCountryInput.setAttribute("disabled", "disabled");
  otherCountryInput.value = "";

  const combobox = document.querySelector("#stateSelectionCombobox");

  // TODO:PT - low priority, the bootstrap dropdown is still opening
  // even if you have disabled the button using the filedset.
  // This is due to the data-bs-toggle="dropdown" set on a div and
  // not on a button.

  // enable state and city selection
  document.querySelector("#us-canada-mexico").removeAttribute("disabled");

  // Clear the existing multiseled tags
  combobox.querySelector(".multiselect-tag-container").innerHTML = "";

  const optionContainer = combobox.querySelector("ul.dropdown-menu");

  // clear the previous list
  optionContainer.innerHTML = "";

  // states e.g.
  // [{
  //   prst_stateid: 1,
  //   prst_state: "Alabama",
  //   prst_countryid: 1,
  //   prst_Abbreviation: "AL",
  // }],

  // fiter the states for the selected prcn_CountryId
  const filteredStates = states.filter(
    (state) => state.prst_countryid == prcn_CountryId,
  );

  // populate the state combobox
  for (let i in filteredStates) {
    const outer = document.createElement("li");
    optionContainer.appendChild(outer);

    const option = document.createElement("button");
    outer.appendChild(option);

    option.setAttribute(
      "onclick",
      `handleMultiselectOptionSelection(event, "${filteredStates[i].prst_stateid}")`,
    );
    option.setAttribute("data-prst_stateid", filteredStates[i].prst_stateid);
    option.setAttribute("tabindex", "-1");
    option.setAttribute("class", "bbsButton bbsButton-menu-item dropdown-item");
    option.setAttribute("role", "option");
    option.setAttribute("type", "button");
    option.innerHTML = `
      <span class="text-label">${filteredStates[i].prst_state} (${filteredStates[i].prst_Abbreviation})</span>
      <span class="msicon notranslate">check</span>
      `;
  }
};

// When you need to add tags from the
// .bbs-combobox. call this function with the value,
// this will add the tags in the .multiselect-tag-container
// if it exits or append one in the combobox
const handleMultiselectOptionSelection = (event, prst_stateid) => {
  // states e.g.
  // [{
  //   prst_stateid: 1,
  //   prst_state: "Alabama",
  //   prst_countryid: 1,
  //   prst_Abbreviation: "AL",
  // }],

  // find the state
  const stateobject = states.find(
    (state) => state.prst_stateid == prst_stateid,
  );

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

  // check if there is any tag with that value exist in the parent
  const tagid = "prst_stateid-" + prst_stateid;
  const tagElement = tagContainer.querySelector("#" + tagid);
  if (!tagElement) {
    // create the tag if it does not exists
    const newTag = document.createElement("button");
    newTag.setAttribute("class", "bbsButton bbsButton-tag-secondary small");
    newTag.setAttribute("id", tagid);
    newTag.setAttribute("data-prst_stateid", prst_stateid);
    newTag.setAttribute("onclick", "removeMultiselectTag(event)");
    newTag.innerHTML = `
    <span>${stateobject.prst_state}</span>
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
  inputElement.focus();
};

// if a removable bbsButton bbsButton-tag-secondary
// is clicked, this is the function
// that needs to be called to remove it
const removeMultiselectTag = (event) => {
  // TODO:PT - low priority, Make on the X on the tag clicable and focasable

  const comboboxParent = event.currentTarget.closest(".bbs-combobox");
  const menu = comboboxParent.querySelector(".dropdown-menu");
  const data_prst_stateid = event.currentTarget.dataset.prst_stateid;

  const menuitembutton = menu.querySelector(
    `li button[data-prst_stateid="${data_prst_stateid}"]`,
  );
  if (menuitembutton) menuitembutton.parentElement.classList.remove("selected");

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

const selectNoneCountry = (event) => {
  const otherCountryInput = document.querySelector("#otherCountries");
  otherCountryInput.setAttribute("disabled", "disabled");
  otherCountryInput.value = "";

  // disabled state and city selection
  const stateCitiselector = document.querySelector("#us-canada-mexico");

  stateCitiselector.setAttribute("disabled", "disabled");

  // Clear the existing multiseled tags
  stateCitiselector.querySelector(".multiselect-tag-container").innerHTML = "";
};
// This is called when Other countries
// radio is selected.
const enableOtherCountriesInput = (event, id) => {
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
    if (i < 3) continue;

    const option = document.createElement("option");
    option.setAttribute("value", countries[i].prcn_CountryId);
    option.dataset.prcn_CountryId = countries[i].prcn_CountryId;
    option.innerHTML = countries[i].prcn_Country;

    otherCountrySelect.appendChild(option);
  }
  otherCountrySelect.focus();
};

const handleKeydownInComboInput = (event) => {
  const key = event.key;

  // TODO:PT - somehow Escape key is not detected here at all.
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

const toggleZipcodeInput = (checked, id) => {
  const input = document.querySelector("#" + id);
  if (checked) {
    input.removeAttribute("disabled");
  } else {
    input.setAttribute("disabled", "disabled");
  }
};
