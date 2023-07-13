import IKeyValueAttributes from "../interfaces/Common/IKeyValueAttributes";
import { IRoute } from "../interfaces/Common/INavigationProps";
import Activities from "../pages/Activities";
import Bookings from "../pages/Bookings";
import Explore from "../pages/Explore";
import Itenary from "../pages/Itenary";
import Luggage from "../pages/Luggage";

const Routes: IKeyValueAttributes<IRoute>[] = [
    {value: "Explore", key: 0, attr: { pathName: "explore", component: <Explore/> }},
    {value: "Activities", key: 1, attr: {pathName: "activities", component: <Activities/>}},
    {value: "Bookings", key: 2, attr: {pathName: "bookings", component: <Bookings/>}},
    {value: "Luggage", key: 3, attr: {pathName: "luggage", component: <Luggage/>}},
    {value: "Itenary", key: 4, attr: {pathName: "itenary", component: <Itenary/>}},
]

export default Routes;