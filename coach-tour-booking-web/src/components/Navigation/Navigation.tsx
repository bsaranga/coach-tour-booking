import { SyntheticEvent, useState } from "react";
import IViewState from "../../interfaces/AppState/IViewState";
import {
	Box,
	Divider,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Tab,
	Tabs,
	Toolbar,
} from "@mui/material";
import { Drafts as DraftsIcon, Inbox as InboxIcon } from "@mui/icons-material";
export interface INavigationProps {
	viewState: IViewState;
}

export default function Navigation(props: INavigationProps) {
	const { viewState } = props;
	const [tabValue, setTabValue] = useState(0);

	function handleChange(event: SyntheticEvent, tabVal: number) {
		setTabValue(tabVal);
	}

	return !viewState.isDesktop ? (
		<Tabs value={tabValue} onChange={handleChange} centered>
			<Tab sx={{ textTransform: "none" }} label="Bookings" />
			<Tab sx={{ textTransform: "none" }} label="Luggage" />
			<Tab sx={{ textTransform: "none" }} label="Itenary" />
			<Tab sx={{ textTransform: "none" }} label="Past Journeys" />
		</Tabs>
	) : (
		<Box sx={{ width: "100%", maxWidth: 260, bgcolor: "background.paper" }}>
			<nav aria-label="main mailbox folders">
				<List>
					<ListItem disablePadding>
						<ListItemButton>
							<ListItemIcon>
								<InboxIcon />
							</ListItemIcon>
							<ListItemText primary="Inbox" />
						</ListItemButton>
					</ListItem>
					<ListItem disablePadding>
						<ListItemButton>
							<ListItemIcon>
								<DraftsIcon />
							</ListItemIcon>
							<ListItemText primary="Drafts" />
						</ListItemButton>
					</ListItem>
				</List>
			</nav>
			<Divider />
			<nav aria-label="secondary mailbox folders">
				<List>
					<ListItem disablePadding>
						<ListItemButton>
							<ListItemText primary="Trash" />
						</ListItemButton>
					</ListItem>
					<ListItem disablePadding>
						<ListItemButton component="a" href="#simple-list">
							<ListItemText primary="Spam" />
						</ListItemButton>
					</ListItem>
				</List>
			</nav>
		</Box>
	);
}
