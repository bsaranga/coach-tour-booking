import { Waypoint } from "../../pages/Explore/Explore"

export default interface IRouteCard {
    routeId: string,
    startCity: string,
    endCity: string,
    routeName: string,
    distance: number,
    distanceUnit: "km" | "miles",
    travelTime: string
    journeyImgUrl: string,
    waypoints?: Waypoint[]
}