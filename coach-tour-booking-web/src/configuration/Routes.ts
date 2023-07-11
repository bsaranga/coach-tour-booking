import IKeyValueAttributes from "../interfaces/Common/IKeyValueAttributes";
import { IRoute } from "../interfaces/Common/INavigationProps";

const Routes: IKeyValueAttributes<IRoute>[] = [
    {value: "Explore", key: 0, attr: { pathName: "explore" }},
    {value: "Activities", key: 1, attr: {pathName: "activities"}},
    {value: "Bookings", key: 2, attr: {pathName: "bookings"}},
    {value: "Luggage", key: 3, attr: {pathName: "luggage"}},
    {value: "Itenary", key: 4, attr: {pathName: "itenary"}},
]

export default Routes;