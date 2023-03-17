import { ElectionIdentifier } from "./types";

enum ElectionType {
    Presidential = "Presidential",
    Senate = "Senate",
    House = "House",
    Governorship = "Governorship",
    HouseOfAssembly = "HouseOfAssembly",
    HouseOfRep = "HouseOfRep",
    Chairmanship = "Chairmanship",
    Councillorship = "Councillorship",
}

enum ActionType {
    FetchWards = "fetch-wards",
    FetchLga = "fetch-lga",
    FetchPollingUnits = "fetch-polling-units",
}

const states = [
    "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", "Benue", "Borno", "Cross River", "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu", "FCT","Gombe", "Imo", "Jigawa", "Kaduna", "Kano", "Katsina", "Kebbi", "Kogi", "Kwara", "Lagos", "Nasarawa", "Niger", "Ogun", "Ondo", "Osun", "Oyo", "Plateau", "Rivers", "Sokoto", "Taraba", "Yobe", "Zamfara"
];

const identifiers: ElectionIdentifier[] = [
    {
        id: '63f8f25b594e164f8146a213',
        type: ElectionType.Presidential,
        year: "2023",
    },
    {
        id: '',
        type: ElectionType.Governorship,
        year: "2023",
    },
    {
        id: '',
        type: ElectionType.HouseOfAssembly,
        year: "2023",
    },
    {
        id: '',
        type: ElectionType.HouseOfRep,
        year: "2023",
    },
    {
        id: '',
        type: ElectionType.Councillorship,
        year: "2023",
    },
    {
        id: '',
        type: ElectionType.Chairmanship,
        year: "2023",
    },
    {
        id: '',
        type: ElectionType.Senate,
        year: "2023",
    },
];

export {
    identifiers,
    states,
    ElectionType,
    ActionType
}