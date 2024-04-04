const streetViewCoords = [
    ['-25.350684', '131.0463223', 'Australia'],
    ['53.9054798', '27.5601444', 'Belarus'],
    ['51.2180796', '4.4150183', 'Belgium'],
    ['42.1494591', '24.7477184', 'Bulgaria'],
    ['11.5566079', '104.9353968', 'Cambodia'],
    ['60.1872492', '-134.6889013', 'Canada'],
    ['-42.3318332', '-73.3751597', 'Chile'],
    ['4.5985391', '-74.0681066', 'Colombia'],
    ['45.0819259', '13.6347638', 'Croatia'],
    ['56.6525516', '8.5262593', 'Denmark'],
    ['60.1378835', '24.990532', 'Finland'],
    ['41.673687', '44.7001648', 'Georgia'],
    ['47.737947', '7.6892312', 'Germany'],
    ['47.1917777', '18.4107785', 'Hungary'],
    ['-3.8433943', '122.0486517', 'Indonesia'],
    ['32.056203', '34.750012', 'Israel'],
    ['-3.9941269', '39.6959344', 'Kenya'],
    ['6.3172542', '-10.8066699', 'Liberia'],
    ['-18.9234437', '47.5319465', 'Madagaskar'],
    ['-37.8717785', '175.6828837', 'New Zealand'],
    ['58.721475', '9.235935', 'Norway'],
    ['14.6296075', '121.0964071', 'Philippines'],
    ['38.709765', '-9.1335375', 'Portugal'],
    ['44.4268929', '26.1029659', 'Romania'],
    ['55.7317335', '37.50607', 'Russia'],
    ['46.5602916', '15.6494557', 'Slovenia'],
    ['10.5132439', '-66.912569', 'Venezuela'],
    ['41.7848555', '19.6466145', 'Albania'],
    ['51.2089881', '2.8846616', 'Belgium'],
    ['-20.5000325', '25.1290002', 'Botswana'],
    ['3.8597977', '-76.5402389', 'Colombia'],
    ['45.0818662', '13.6344663', 'Croatia'],
    ['47.9951764', '7.8529328', 'Germany'],
    ['6.6957825', '-1.6165838', 'Ghana'],
    ['26.923828', '75.8270749', 'India'],
    ['-3.0825232', '119.9169088', 'Indonesia'],
    ['30.4325525', '56.057296', 'Iran'],
    ['41.8982242', '12.4731588', 'Italy'],
    ['36.7326326', '138.4621769', 'Japan'],
    ['31.9516112', '35.9393884', 'Jordan'],
    ['-1.2839794', '36.8208278', 'Kenya'],
    ['56.9474378', '24.1063499', 'Latvia'],
    ['55.798336', '21.0670862', 'Lithuania'],
    ['3.2375917', '101.684043', 'Malaysia'],
    ['52.113111', '4.2802872', 'Netherlands'],
    ['-39.5010522', '176.9184996', 'New Zealand'],
    ['9.0809615', '7.5243988', 'Nigeria'],
    ['52.2494052', '20.9923145', 'Poland'],
    ['1.2806527', '103.8642833', 'Singapore'],
    ['37.1760783', '-3.5881413', 'Spain'],
    ['65.8055012', '21.678883', 'Sweden'],
]
let listedCountries = [...new Set(streetViewCoords.map(coord => coord[2]))];
let restCountries = [
    "Afghanistan",
    "Algeria",
    "Andorra",
    "Angola",
    "Antigua",
    "Argentina",
    "Armenia",
    "Austria",
    "Azerbaijan",
    "Bahamas",
    "Bahrain",
    "Bangladesh",
    "Barbados",
    "Belize",
    "Benin",
    "Bhutan",
    "Bolivia",
    "Bosnia",
    "Brazil",
    "Brunei",
    "Burkina",
    "Burundi",
    "Cameroon",
    "Central African Republic",
    "Chad",
    "China",
    "Comoros",
    "Congo",
    "Costa Rica",
    "Cuba",
    "Cyprus",
    "Czechia",
    "North Korea",
    "Congo",
    "Djibouti",
    "Dominica",
    "Dominican Republic",
    "Ecuador",
    "Egypt",
    "El Salvador",
    "Equatorial Guinea",
    "Eritrea",
    "Estonia",
    "Eswatini",
    "Ethiopia",
    "Fiji",
    "France",
    "Gabon",
    "Gambia",
    "Greece",
    "Grenada",
    "Guatemala",
    "Guinea",
    "Guinea-Bissau",
    "Guyana",
    "Haiti",
    "Honduras",
    "Iceland",
    "Iran",
    "Iraq",
    "Ireland",
    "Jamaica",
    "Kazakhstan",
    "Kiribati",
    "Kuwait",
    "Kyrgyzstan",
    "Laos",
    "Lebanon",
    "Lesotho",
    "Libya",
    "Liechtenstein",
    "Luxembourg",
    "Madagascar",
    "Malawi",
    "Maldives",
    "Mali",
    "Malta",
    "Marshall Islands",
    "Mauritania",
    "Mauritius",
    "Mexico",
    "Micronesia",
    "Monaco",
    "Mongolia",
    "Montenegro",
    "Morocco",
    "Mozambique",
    "Myanmar",
    "Namibia",
    "Nauru",
    "Nepal",
    "Nicaragua",
    "Niger",
    "North Macedonia",
    "Oman",
    "Pakistan",
    "Palau",
    "Panama",
    "Papua New Guinea",
    "Paraguay",
    "Peru",
    "Qatar",
    "South Korea",
    "Moldova",
    "Russia",
    "Rwanda",
    "Samoa",
    "San Marino",
    "Sao Tome and Principe",
    "Saudi Arabia",
    "Senegal",
    "Serbia",
    "Seychelles",
    "Sierra Leone",
    "Slovakia",
    "Solomon Islands",
    "Somalia",
    "South Africa",
    "South Sudan",
    "Sri Lanka",
    "Sudan",
    "Suriname",
    "Switzerland",
    "Syrian Arab Republic",
    "Tajikistan",
    "Thailand",
    "Timor-Leste",
    "Togo",
    "Tonga",
    "Trinidad and Tobago",
    "Tunisia",
    "Turkey",
    "Turkmenistan",
    "Tuvalu",
    "Uganda",
    "Ukraine",
    "United Arab Emirates",
    "United Kingdom",
    "Northern Ireland",
    "Tanzania",
    "United States",
    "Uruguay",
    "Uzbekistan",
    "Vanuatu",
    "Venezuela",
    "Vietnam",
    "Yemen",
    "Zambia",
    "Zimbabwe"
]
let allCountries = [...listedCountries, ...restCountries]


let chosenLocation = randomNumber(0, streetViewCoords.length - 1)

async function createStreetView() {
    const panorama = new google.maps.StreetViewPanorama(
        document.getElementById("map"),
        {
            position: { lat: parseFloat(streetViewCoords[chosenLocation][0]), lng: parseFloat(streetViewCoords[chosenLocation][1]) },
            addressControlOptions: {
                position: google.maps.ControlPosition.BOTTOM_CENTER,
            },
            linksControl: true,
            panControl: true,
            enableCloseButton: false,
            addressControl: false,
            fullscreenControl: false,
        },
    );
}