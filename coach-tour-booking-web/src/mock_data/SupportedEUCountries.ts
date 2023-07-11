interface IEUMember {
    country: string,
    cities: string[]
}

interface ICityByCountry {
    name: string,
    country: string,
}

const SupportedEUCountries: IEUMember[] = [
    {
        country: "Austria",
        cities: ["Vienna", "Graz", "Linz", "Salzburg", "Innsbruck", "Klagenfurt", "Bregenz"]
    },
    {
        country: "Belgium",
        cities: ["Brussels", "Antwerp", "Ghent", "Charleroi", "Liège", "Bruges", "Namur"]
    },
    {
        country: "Bulgaria",
        cities: ["Sofia", "Plovdiv", "Varna", "Burgas", "Ruse", "Stara Zagora", "Pleven"]
    },
    {
        country: "Croatia",
        cities: ["Zagreb", "Split", "Rijeka", "Osijek", "Zadar", "Pula", "Slavonski Brod"]
    },
    {
        country: "Czech Republic",
        cities: ["Prague", "Brno", "Ostrava", "Pilsen", "Liberec", "Olomouc", "Usti nad Labem"]
    },
    {
        country: "Denmark",
        cities: ["Copenhagen", "Aarhus", "Odense", "Aalborg", "Frederiksberg", "Esbjerg", "Randers"]
    },
    {
        country: "Estonia",
        cities: ["Tallinn", "Tartu", "Narva", "Pärnu", "Kohtla-Järve", "Viljandi", "Rakvere"]
    },
    {
        country: "Finland",
        cities: ["Helsinki", "Espoo", "Tampere", "Vantaa", "Oulu", "Turku", "Jyväskylä"]
    },
    {
        country: "France",
        cities: ["Paris", "Marseille", "Lyon", "Toulouse", "Nice", "Nantes", "Strasbourg"]
    },
    {
        country: "Germany",
        cities: ["Berlin", "Hamburg", "Munich", "Cologne", "Frankfurt", "Stuttgart", "Düsseldorf"]
    },
    {
        country: "Greece",
        cities: ["Athens", "Thessaloniki", "Patras", "Heraklion", "Larissa", "Volos", "Rhodes"]
    },
    {
        country: "Hungary",
        cities: ["Budapest", "Debrecen", "Szeged", "Miskolc", "Pécs", "Győr", "Nyíregyháza"]
    },
    {
        country: "Italy",
        cities: ["Rome", "Milan", "Naples", "Turin", "Palermo", "Genoa", "Bologna"]
    },
    {
        country: "Latvia",
        cities: ["Riga", "Daugavpils", "Liepāja", "Jelgava", "Jūrmala", "Ventspils", "Rēzekne"]
    },
    {
        country: "Lithuania",
        cities: ["Vilnius", "Kaunas", "Klaipeda", "Siauliai", "Panevezys", "Alytus", "Marijampole"]
    },
    {
        country: "Luxembourg",
        cities: ["Luxembourg City", "Esch-sur-Alzette", "Differdange", "Dudelange", "Ettelbruck", "Diekirch", "Wiltz"]
    },
    {
        country: "Netherlands",
        cities: ["Amsterdam", "Rotterdam", "The Hague", "Utrecht", "Eindhoven", "Tilburg", "Groningen"]
    },
    {
        country: "Poland",
        cities: ["Warsaw", "Kraków", "Łódź", "Wrocław", "Poznań", "Gdańsk", "Szczecin"]
    },
    {
        country: "Portugal",
        cities: ["Lisbon", "Porto", "Vila Nova de Gaia", "Amadora", "Braga", "Funchal", "Coimbra"]
    },
    {
        country: "Romania",
        cities: ["Bucharest", "Cluj-Napoca", "Timișoara", "Iași", "Constanța", "Craiova", "Brașov"]
    },
    {
        country: "Slovakia",
        cities: ["Bratislava", "Košice", "Prešov", "Žilina", "Nitra", "Banská Bystrica", "Trnava"]
    },
    {
        country: "Slovenia",
        cities: ["Ljubljana", "Maribor", "Celje", "Kranj", "Velenje", "Koper", "Novo Mesto"]
    },
    {
        country: "Spain",
        cities: ["Madrid", "Barcelona", "Valencia", "Seville", "Zaragoza", "Málaga", "Murcia"]
    },
    {
        country: "Sweden",
        cities: ["Stockholm", "Gothenburg", "Malmö", "Uppsala", "Västerås", "Örebro", "Linköping"]
    }
];

const SupportedEUCountriesMixedArray = SupportedEUCountries.map(el => {
    const subList: ICityByCountry[] = [];
    el.cities.forEach(city => {
        subList.push({
            name: city,
            country: el.country
        })
    });

    return subList;
}).flat();

export {
    SupportedEUCountries, 
    SupportedEUCountriesMixedArray
};