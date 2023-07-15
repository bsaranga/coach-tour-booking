import { Dayjs } from "dayjs";
import IRouteCard from "../components/JourneyRoutes/IRouteCard";
import mockRouteInfo from "../mock_data/MockJourneys";
import { ICityCountryPair } from "../mock_data/SupportedEUCountries";

export default class JourneyService {
    constructor() {
        console.log('Constructing...')   
    }

    public getRoutesForJourney(origin: ICityCountryPair, destination: ICityCountryPair, startDate: Dayjs, endDate: Dayjs) {
        return new Promise<IRouteCard[]>((resolve, reject) => {
            setTimeout(() => {
                resolve(mockRouteInfo);
            }, 237);
        });
    }
}