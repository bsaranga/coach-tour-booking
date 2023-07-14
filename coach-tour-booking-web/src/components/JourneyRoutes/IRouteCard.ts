export default interface IRouteCard {
    routeId: string,
    startCity: string,
    endCity: string,
    routeName: string,
    journeyDate: string,
    distance: number,
    distanceUnit: "km" | "miles",
    travelTime: string
    journeyImgUrl: string
}