const countries = [
  {
   "label": "Argentina",
   "value": "Argentina",
   "mapValue": "Argentina"
  },
  {
   "label": "Australia",
   "value": "Australia",
   "mapValue": "Australia"
  },
  {
   "label": "Austria",
   "value": "Austria",
   "mapValue": "Austria"
  },
  {
   "label": "Bahamas",
   "value": "Bahamas",
   "mapValue": "Bahamas"
  },
  {
   "label": "Bermuda",
   "value": "Bermuda",
   "mapValue": "Bermuda"
  },
  {
   "label": "Brazil",
   "value": "Brazil",
   "mapValue": "Brazil"
  },
  {
   "label": "Bulgaria",
   "value": "Bulgaria",
   "mapValue": "Bulgaria"
  },
  {
   "label": "Cambodia",
   "value": "Cambodia",
   "mapValue": "Cambodia"
  },
  {
   "label": "Canada",
   "value": "Canada",
   "mapValue": "Canada"
  },
  {
   "label": "Cayman Islands",
   "value": "Cayman Islands",
   "mapValue": "Cayman Islands"
  },
  {
   "label": "Chile",
   "value": "Chile",
   "mapValue": "Chile"
  },
  {
   "label": "China",
   "value": "China",
   "mapValue": "China"
  },
  {
   "label": "Colombia",
   "value": "Colombia",
   "mapValue": "Colombia"
  },
  {
   "label": "Costa Rica",
   "value": "Costa Rica",
   "mapValue": "Costa Rica"
  },
  {
   "label": "Croatia",
   "value": "Croatia",
   "mapValue": "Croatia"
  },
  {
   "label": "Cyprus",
   "value": "Cyprus",
   "mapValue": "Cyprus"
  },
  {
   "label": "Czech Republic",
   "value": "Czech Republic",
   "mapValue": "Czech Republic"
  },
  {
   "label": "Denmark",
   "value": "Denmark",
   "mapValue": "Denmark"
  },
  {
   "label": "Egypt",
   "value": "Egypt",
   "mapValue": "Egypt"
  },
  {
   "label": "Estonia",
   "value": "Estonia",
   "mapValue": "Estonia"
  },
  {
   "label": "Finland",
   "value": "Finland",
   "mapValue": "Finland"
  },
  {
   "label": "France",
   "value": "France",
   "mapValue": "France"
  },
  {
   "label": "Germany",
   "value": "Germany",
   "mapValue": "Germany"
  },
  {
   "label": "Greece",
   "value": "Greece",
   "mapValue": "Greece"
  },
  {
   "label": "Greenland",
   "value": "Greenland",
   "mapValue": "Greenland"
  },
  {
   "label": "Hungary",
   "value": "Hungary",
   "mapValue": "Hungary"
  },
  {
   "label": "India",
   "value": "India",
   "mapValue": "India"
  },
  {
   "label": "Ireland",
   "value": "Ireland",
   "mapValue": "Ireland"
  },
  {
   "label": "Israel",
   "value": "Israel",
   "mapValue": "Israel"
  },
  {
   "label": "Italy",
   "value": "Italy",
   "mapValue": "Italy"
  },
  {
   "label": "Japan",
   "value": "Japan",
   "mapValue": "Japan"
  },
  {
   "label": "Korea South",
   "value": "Korea South",
   "mapValue": "Korea South"
  },
  {
   "label": "Kuwait",
   "value": "Kuwait",
   "mapValue": "Kuwait"
  },
  {
   "label": "Latvia",
   "value": "Latvia",
   "mapValue": "Latvia"
  },
  {
   "label": "Lithuania",
   "value": "Lithuania",
   "mapValue": "Lithuania"
  },
  {
   "label": "Luxembourg",
   "value": "Luxembourg",
   "mapValue": "Luxembourg"
  },
  {
   "label": "Macedonia",
   "value": "Macedonia",
   "mapValue": "Macedonia"
  },
  {
   "label": "Malaysia",
   "value": "Malaysia",
   "mapValue": "Malaysia"
  },
  {
   "label": "Mexico",
   "value": "Mexico",
   "mapValue": "Mexico"
  },
  {
   "label": "Moldova",
   "value": "Moldova",
   "mapValue": "Moldova"
  },
  {
   "label": "Morocco",
   "value": "Morocco",
   "mapValue": "Morocco"
  },
  {
   "label": "Netherlands",
   "value": "Netherlands",
   "mapValue": "Netherlands"
  },
  {
   "label": "Nigeria",
   "value": "Nigeria",
   "mapValue": "Nigeria"
  },
  {
   "label": "Norway",
   "value": "Norway",
   "mapValue": "Norway"
  },
  {
   "label": "Peru",
   "value": "Peru",
   "mapValue": "Peru"
  },
  {
   "label": "Poland",
   "value": "Poland",
   "mapValue": "Poland"
  },
  {
   "label": "Portugal",
   "value": "Portugal",
   "mapValue": "Portugal"
  },
  {
   "label": "Qatar",
   "value": "Qatar",
   "mapValue": "Qatar"
  },
  {
   "label": "Romania",
   "value": "Romania",
   "mapValue": "Romania"
  },
  // {
  //  "label": "Russian Federation",
  //  "value": "Russian Federation",
  //  "mapValue": "Russian Federation"
  // },
  {
    "label": "Saudi Arabia",
    "value": "Saudi Arabia",
    "mapValue": "Saudi Arabia"
   },
  {
   "label": "Serbia",
   "value": "Serbia",
   "mapValue": "Serbia"
  },
  {
   "label": "Singapore",
   "value": "Singapore",
   "mapValue": "Singapore"
  },
  {
   "label": "Slovenia",
   "value": "Slovenia",
   "mapValue": "Slovenia"
  },
  {
   "label": "South Africa",
   "value": "South Africa",
   "mapValue": "South Africa"
  },
  {
   "label": "Spain",
   "value": "Spain",
   "mapValue": "Spain"
  },
  {
   "label": "Switzerland",
   "value": "Switzerland",
   "mapValue": "Switzerland"
  },
  {
   "label": "Sweden",
   "value": "Sweden",
   "mapValue": "Sweden"
  },
  {
   "label": "Taiwan",
   "value": "Taiwan",
   "mapValue": "Taiwan"
  },
  {
   "label": "Thailand",
   "value": "Thailand",
   "mapValue": "Thailand"
  },
  {
   "label": "Turkey",
   "value": "Turkey",
   "mapValue": "Turkey"
  },
  {
   "label": "Ukraine",
   "value": "Ukraine",
   "mapValue": "Ukraine"
  },
  {
   "label": "United Arab Emirates",
   "value": "United Arab Emirates",
   "mapValue": "United Arab Emirates"
  },
  {
   "label": "United Kingdom",
   "value": "United Kingdom",
   "mapValue": "United Kingdom"
  },
  {
   "label": "United States",
   "value": "United States",
   "mapValue": "United States"
  },
  {
   "label": "Venezuela",
   "value": "Venezuela",
   "mapValue": "Venezuela"
  },
  {
   "label": "Vietnam",
   "value": "Viet Nam",
   "mapValue": "Vietnam"
  }
 ]
  export const exhibitionCountriesList = (t) => countries.map((o) => ({ ...o, label: t(`countries:${o.label}`) }))
  