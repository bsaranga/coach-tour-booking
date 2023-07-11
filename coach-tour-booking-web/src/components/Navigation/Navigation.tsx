import { SyntheticEvent, useState } from "react";
import IViewState from "../../interfaces/AppState/IViewState";
import {
	Box,
	List,
	ListItem,
	ListItemButton,
	ListItemText,
	Tab,
	Tabs,
} from "@mui/material";
export interface INavigationProps {
	viewState: IViewState;
}

interface IKeyValue {
    key: number | string,
    value: string | any
}
const pages: IKeyValue[] = [
    {value: "Journeys", key: 0},
    {value: "Activities", key: 1},
    {value: "Bookings", key: 2},
    {value: "Luggage", key: 3},
    {value: "Itenary", key: 4},
]

export default function Navigation(props: INavigationProps) {
	const { viewState } = props;
	const [tabValue, setTabValue] = useState(0);

	function handleChange(event: SyntheticEvent | null, tabVal: number) {
		setTabValue(tabVal);
	}

	return !viewState.isDesktop ? (
		<Tabs value={tabValue}
            onChange={handleChange}
            variant={viewState.isTablet ? "standard" : "scrollable"}
            centered={viewState.isTablet}>
            {
                pages.map(page => <Tab sx={{ textTransform: "none" }} label={page.value} />)
            }
		</Tabs>
	) : (
		<Box sx={{ width: "100%", maxWidth: 260, bgcolor: "background.paper" }}>
			<nav aria-label="main mailbox folders">
				<List>
                    {
                        pages.map(page => (
                        <ListItem key={page.key} disablePadding>
                            <ListItemButton key={page.key} onClick={() => handleChange(null, page.key as number)} selected={tabValue === page.key}>
                                <ListItemText key={page.key} primary={page.value} />
                            </ListItemButton>
                        </ListItem>))
                    }
				</List>
			</nav>
		</Box>
	);
}
