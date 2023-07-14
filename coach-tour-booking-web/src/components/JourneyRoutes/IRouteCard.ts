export default interface IRouteCard {
    startCity: string,
    endCity: string,
    journeyDate: string,
    distance: number,
    distanceUnit: "km" | "miles",
    travelTime: string
    journeyImgUrl: string
}