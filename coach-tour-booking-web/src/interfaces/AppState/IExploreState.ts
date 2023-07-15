import { LatLng } from "use-places-autocomplete";
import { ICityCountryPair } from "../../mock_data/SupportedEUCountries";
import { Direction, Waypoint } from "../../pages/Explore/Explore";
import { Dayjs } from "dayjs";

export default interface IExplore {
    origin?: ICityCountryPair,
    originCoords?: LatLng | null,
    destination?: ICityCountryPair,
    destinationCoords?: LatLng | null,
    startDate?: Dayjs | null,
    endDate?: Dayjs | null,
    directions?: Direction | null,
    selectedRoute?: string,
    selectedWayPoints?: Waypoint[],
}