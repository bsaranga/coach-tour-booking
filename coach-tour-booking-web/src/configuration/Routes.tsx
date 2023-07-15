import IKeyValueAttributes from "../interfaces/Common/IKeyValueAttributes";
import { IRoute } from "../interfaces/Common/INavigationProps";
import Activities from "../pages/Activities";
import Bookings from "../pages/Bookings";
import Explore from "../pages/Explore/Explore";
import Itenary from "../pages/Itenary";
import Luggage from "../pages/Luggage";

import ExploreOutlinedIcon from '@mui/icons-material/ExploreOutlined';
import LocalActivityIcon from '@mui/icons-material/LocalActivity';
import BookOnlineIcon from '@mui/icons-material/BookOnline';
import LuggageIcon from '@mui/icons-material/Luggage';
import MovingIcon from '@mui/icons-material/Moving';

const Routes: IKeyValueAttributes<IRoute>[] = [
    {value: "Explore", key: 0, attr: { pathName: "explore", component: <Explore/>, iconComponent: <ExploreOutlinedIcon /> }},
    {value: "Activities", key: 1, attr: { pathName: "activities", component: <Activities/>, iconComponent: <LocalActivityIcon />}},
    {value: "Bookings", key: 2, attr: { pathName: "bookings", component: <Bookings/>, iconComponent: <BookOnlineIcon/> }},
    {value: "Luggage", key: 3, attr: { pathName: "luggage", component: <Luggage/>, iconComponent: <LuggageIcon/> }},
    {value: "Itenary", key: 4, attr: { pathName: "itenary", component: <Itenary/>, iconComponent: <MovingIcon/> }},
]

export default Routes;