const cities = [
	{
		"label": "Abu Dhabi",
		"value": "Abu Dhabi",
		"country": "United Arab Emirates"
	},
	{
		"label": "Amsterdam",
		"value": "Amsterdam",
		"country": "Netherlands"
	},
	{
		"label": "Athens",
		"value": "Athens",
		"country": "Greece"
	},
	{
		"label": "Bangkok",
		"value": "Bangkok",
		"country": "Thailand"
	},
	{
		"label": "Barcelona",
		"value": "Barcelona",
		"country": "Spain"
	},
	{
		"label": "Basel",
		"value": "Basel",
		"country": "Switzerland"
	},
	{
		"label": "Beijing",
		"value": "Beijing",
		"country": "China"
	},
	{
		"label": "Belfast",
		"value": "Belfast",
		"country": "United Kingdom"
	},
	{
		"label": "Belgrade",
		"value": "Belgrade",
		"country": "Serbia"
	},
	{
		"label": "Berlin",
		"value": "Berlin",
		"country": "Germany"
	},
	{
		"label": "Bermuda",
		"value": "Bermuda",
		"country": "Bermuda"
	},
	{
		"label": "Bogota",
		"value": "Bogota",
		"country": "Colombia"
	},
	{
		"label": "Bucharest",
		"value": "Bucharest",
		"country": "Romania"
	},
	{
		"label": "Budapest",
		"value": "Budapest",
		"country": "Hungary"
	},
	{
		"label": "Buenos Aires",
		"value": "Buenos Aires",
		"country": "Argentina"
	},
	{
		"label": "Cairo",
		"value": "Cairo",
		"country": "Egypt"
	},
	{
		"label": "Cannes",
		"value": "Cannes",
		"country": "France"
	},
	{
		"label": "Cape Town",
		"value": "Cape Town",
		"country": "South Africa"
	},
	{
		"label": "Cardiff",
		"value": "Cardiff",
		"country": "United Kingdom"
	},
	{
		"label": "Caracas",
		"value": "Caracas",
		"country": "Venezuela"
	},
	{
		"label": "Cascais",
		"value": "Cascais",
		"country": "Portugal"
	},
	{
		"label": "Cayman Islands",
		"value": "Cayman Islands",
		"country": "Cayman Islands"
	},
	{
		"label": "Chișinău",
		"value": "Chișinău",
		"country": "Moldova"
	},
	{
		"label": "Cologne",
		"value": "Cologne",
		"country": "Germany"
	},
	{
		"label": "Cologne",
		"value": "Cologne",
		"country": "Germany"
	},
	{
		"label": "Copenhagen",
		"value": "Copenhagen",
		"country": "Denmark"
	},
	{
		"label": "Doha",
		"value": "Doha",
		"country": "Qatar"
	},
	{
		"label": "Dortmund",
		"value": "Dortmund",
		"country": "Germany"
	},
	{
		"label": "Dresden",
		"value": "Dresden",
		"country": "Germany"
	},
	{
		"label": "Dubai",
		"value": "Dubai",
		"country": "United Arab Emirates"
	},
	{
		"label": "Dublin",
		"value": "Dublin",
		"country": "Ireland"
	},
	{
		"label": "Düsseldorf",
		"value": "Düsseldorf",
		"country": "Germany"
	},
	{
		"label": "Edinburgh",
		"value": "Edinburgh",
		"country": "United Kingdom"
	},
	{
		"label": "Florence",
		"value": "Florence",
		"country": "Italy"
	},
	{
		"label": "Frankfurt am Main",
		"value": "Frankfurt am Main",
		"country": "Germany"
	},
	{
		"label": "Frankfurt Oder",
		"value": "Frankfurt Oder",
		"country": "Germany"
	},
	{
		"label": "Geneva",
		"value": "Geneva",
		"country": "Switzerland"
	},
	{
		"label": "Glasgow",
		"value": "Glasgow",
		"country": "United Kingdom"
	},
	{
		"label": "Hamburg",
		"value": "Hamburg",
		"country": "Germany"
	},
	{
		"label": "Helsinki",
		"value": "Helsinki",
		"country": "Finland"
	},
	{
		"label": "Ho Chi Minh City",
		"value": "Ho Chi Minh City",
		"country": "Viet Nam"
	},
	{
		"label": "Hong Kong",
		"value": "Hong Kong",
		"country": "China"
	},
	{
		"label": "Ibiza",
		"value": "Ibiza",
		"country": "Spain"
	},
	{
		"label": "Istanbul",
		"value": "Istanbul",
		"country": "Turkey"
	},
	{
		"label": "Johannesburg",
		"value": "Johannesburg",
		"country": "South Africa"
	},
	{
		"label": "Kyiv",
		"value": "Kyiv",
		"country": "Ukraine"
	},
	{
		"label": "Kraków",
		"value": "Kraków",
		"country": "Poland"
	},
	{
		"label": "Kuala Lumpur",
		"value": "Kuala Lumpur",
		"country": "Malaysia"
	},
	{
		"label": "Kuwait City",
		"value": "Kuwait City",
		"country": "Kuwait"
	},
	{
		"label": "Lagos",
		"value": "Lagos",
		"country": "Nigeria"
	},
	{
		"label": "Lecce",
		"value": "Lecce",
		"country": "Italy"
	},
	{
		"label": "Leipzig",
		"value": "Leipzig",
		"country": "Germany"
	},
	{
		"label": "Lima",
		"value": "Lima",
		"country": "Peru"
	},
	{
		"label": "Lisbon",
		"value": "Lisbon",
		"country": "Portugal"
	},
	{
		"label": "Liverpool",
		"value": "Liverpool",
		"country": "United Kingdom"
	},
	{
		"label": "Ljubljana",
		"value": "Ljubljana",
		"country": "Slovenia"
	},
	{
		"label": "London",
		"value": "London",
		"country": "United Kingdom"
	},
	{
		"label": "Los Angeles",
		"value": "Los Angeles",
		"country": "United States"
	},
	{
		"label": "Luxembourg City",
		"value": "Luxembourg City",
		"country": "Luxembourg"
	},
	{
		"label": "Luxor",
		"value": "Luxor",
		"country": "Egypt"
	},
	{
		"label": "Lyon",
		"value": "Lyon",
		"country": "France"
	},
	{
		"label": "Madrid",
		"value": "Madrid",
		"country": "Spain"
	},
	{
		"label": "Manchester",
		"value": "Manchester",
		"country": "United Kingdom"
	},
	{
		"label": "Marrakech",
		"value": "Marrakech",
		"country": "Morocco"
	},
	{
		"label": "Melbourne",
		"value": "Melbourne",
		"country": "Australia"
	},
	{
		"label": "Mexico City",
		"value": "Mexico City",
		"country": "Mexico"
	},
	{
		"label": "Montréal",
		"value": "Montréal",
		"country": "Canada"
	},
	// {
	// 	"label": "Moscow",
	// 	"value": "Moscow",
	// 	"country": "Russian Federation"
	// },
	{
		"label": "Munich",
		"value": "Munich",
		"country": "Germany"
	},
	{
		"label": "NYC",
		"value": "NYC",
		"country": "United States"
	},
	{
		"label": "Nagoya",
		"value": "Nagoya",
		"country": "Japan"
	},
	{
		"label": "Nassau",
		"value": "Nassau",
		"country": "Bahamas"
	},
	{
		"label": "New Delhi",
		"value": "New Delhi",
		"country": "India"
	},
	{
		"label": "New York",
		"value": "New York",
		"country": "United States"
	},
	{
		"label": "Nice",
		"value": "Nice",
		"country": "France"
	},
	{
		"label": "Nicosia",
		"value": "Nicosia",
		"country": "Cyprus"
	},
	{
		"label": "Nuremberg",
		"value": "Nuremberg",
		"country": "Germany"
	},
	{
		"label": "Nuuk",
		"value": "Nuuk",
		"country": "Greenland"
	},
	{
		"label": "Osaka",
		"value": "Osaka",
		"country": "Japan"
	},
	{
		"label": "Oslo",
		"value": "Oslo",
		"country": "Norway"
	},
	{
		"label": "Palma de Mallorca",
		"value": "Palma de Mallorca",
		"country": "Spain"
	},
	{
		"label": "Paris",
		"value": "Paris",
		"country": "France"
	},
	{
		"label": "Phnom Penh",
		"value": "Phnom Penh",
		"country": "Cambodia"
	},
	{
		"label": "Prague",
		"value": "Prague",
		"country": "Czech Republic"
	},
	{
		"label": "Riga",
		"value": "Riga",
		"country": "Latvia"
	},
	{
		"label": "Rio de Janeiro",
		"value": "Rio de Janeiro",
		"country": "Brazil"
	},
	{
		"label": "Riyadh",
		"value": "Riyadh",
		"country": "Saudi Arabia"
	},
	{
		"label": "Rome",
		"value": "Rome",
		"country": "Italy"
	},
	{
		"label": "Rotterdam",
		"value": "Rotterdam",
		"country": "Netherlands"
	},
	{
		"label": "San José",
		"value": "San José",
		"country": "Costa Rica"
	},
	{
		"label": "Santiago",
		"value": "Santiago",
		"country": "Chile"
	},
	{
		"label": "Salzburg",
		"value": "Salzburg",
		"country": "Austria"
	},
	{
		"label": "San Francisco",
		"value": "San Francisco",
		"country": "United States"
	},
	{
		"label": "Seoul",
		"value": "Seoul",
		"country": "Korea South"
	},
	{
		"label": "Shanghai",
		"value": "Shanghai",
		"country": "China"
	},
	{
		"label": "Shenzhen",
		"value": "Shenzhen",
		"country": "China"
	},
	{
		"label": "Singapore",
		"value": "Singapore",
		"country": "Singapore"
	},
	{
		"label": "Silicon Valley",
		"value": "Silicon Valley",
		"country": "United States"
	},
	{
		"label": "Skopje",
		"value": "Skopje",
		"country": "Macedonia"
	},
	{
		"label": "Sofia",
		"value": "Sofia",
		"country": "Bulgaria"
	},
	{
		"label": "Stockholm",
		"value": "Stockholm",
		"country": "Sweden"
	},
	{
		"label": "Strasbourg",
		"value": "Strasbourg",
		"country": "France"
	},
	{
		"label": "Suzhou",
		"value": "Suzhou",
		"country": "China"
	},
	{
		"label": "Sydney",
		"value": "Sydney",
		"country": "Australia"
	},
	{
		"label": "São Paulo",
		"value": "São Paulo",
		"country": "Brazil"
	},
	{
		"label": "Taipei",
		"value": "Taipei",
		"country": "Taiwan"
	},
	{
		"label": "Tallinn",
		"value": "Tallinn",
		"country": "Estonia"
	},
	{
		"label": "Tel Aviv",
		"value": "Tel Aviv",
		"country": "Israel"
	},
	{
		"label": "Thessaloniki",
		"value": "Thessaloniki",
		"country": "Greece"
	},
	{
		"label": "Tokyo",
		"value": "Tokyo",
		"country": "Japan"
	},
	{
		"label": "Toronto",
		"value": "Toronto",
		"country": "Canada"
	},
	{
		"label": "Toronto, ON",
		"value": "Toronto, ON",
		"country": "Canada"
	},
	{
		"label": "Trier",
		"value": "Trier",
		"country": "Germany"
	},
	{
		"label": "Venice",
		"value": "Venice",
		"country": "Italy"
	},
	{
		"label": "Vienna",
		"value": "Vienna",
		"country": "Austria"
	},
	{
		"label": "Vilnius",
		"value": "Vilnius",
		"country": "Lithuania"
	},
	{
		"label": "Warsaw",
		"value": "Warsaw",
		"country": "Poland"
	},
	{
		"label": "Washington DC",
		"value": "Washington DC",
		"country": "United States"
	},
	{
		"label": "Zagreb",
		"value": "Zagreb",
		"country": "Croatia"
	},
	{
		"label": "Zurich",
		"value": "Zurich",
		"country": "Switzerland"
	},
	{
		"label": "Zürich",
		"value": "Zürich",
		"country": "Switzerland"
	}
]

export const exhibitionCityList = (t) => cities.map((o) => ({ ...o, label: t(`cities:${o.label}`) }))