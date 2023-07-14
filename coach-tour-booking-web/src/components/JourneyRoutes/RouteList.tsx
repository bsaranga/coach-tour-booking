import { List, ListItem, Typography } from "@mui/material"
import RouteCard from "./RouteCard"
import IRouteCard from "./IRouteCard"
import './RouteList.css'

export interface IRouteListProps {
    routeInfo: IRouteCard[]
}

export default function RouteList(props: IRouteListProps) {
    const { routeInfo } = props;
    if (routeInfo.length === 0)
        return <div>No Route Information</div>
    return (
        <div className="route-list-area">
            <Typography sx={{
                marginLeft: "10px",
                color: "#6b6b6b",
            }} variant="subtitle1">Routes</Typography>
            <List>
                {
                    routeInfo.map((j, ind) => {
                        return <ListItem key={ind}>
                            <RouteCard {...j}/>
                        </ListItem>
                    })
                }
            </List>
        </div>
    )
}