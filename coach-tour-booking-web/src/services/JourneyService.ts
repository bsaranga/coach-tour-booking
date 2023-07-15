import { Dayjs } from "dayjs";
import IRouteCard from "../components/JourneyRoutes/IRouteCard";
import mockRouteInfo from "../mock_data/MockJourneys";
import { ICityCountryPair } from "../mock_data/SupportedEUCountries";
import coachTypes, { ICoachType } from "../mock_data/CoachTypes";

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

    public getRouteInfoById(routeId: string) {
        return new Promise<IRouteCard>((resolve, reject) => {
            setTimeout(() => {
                resolve(mockRouteInfo.filter(r => r.routeId === routeId)[0]);
            }, 250);
        })
    }

    public getCoachInfoByRouteId(routeId: string) {
        return new Promise<ICoachType>((resolve, reject) => {
            setTimeout(() => {
                resolve(coachTypes[0]);
            }, 250);
        })
    }
}