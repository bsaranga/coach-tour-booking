import { List, ListItem, Typography } from "@mui/material"
import RouteCard from "./RouteCard"
import IRouteCard from "./IRouteCard"
import './RouteList.css'

export interface IRouteListProps {
    routeInfo: IRouteCard[]
}

export default function RouteList(props: IRouteListProps) {
    const { routeInfo } = props;
    return (
        <div className="route-list-area">
            <Typography sx={{
                marginLeft: "10px",
                color: "#6b6b6b",
            }} variant="subtitle1">Routes</Typography>
            {
                (routeInfo.length === 0) ?
                <div className="no-data-message-box">
                    <Typography color="#6b6b6b" variant="body1">Select an origin and a destination within a date range to see routes</Typography>
                </div> 
                :
                <List>
                {
                    routeInfo.map((j, ind) => {
                        return <ListItem key={ind}>
                            <RouteCard {...j}/>
                        </ListItem>
                    })
                }
                </List>
            }
        </div>
    )
}