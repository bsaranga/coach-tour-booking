import { SyntheticEvent, useState } from "react";
import {
	Box,
	List,
	ListItem,
	ListItemButton,
	ListItemText,
	Tab,
	Tabs,
} from "@mui/material";

import { Link as RouterLink } from "react-router-dom";
import { INavigationProps } from "../../interfaces/Common/INavigationProps";
import Routes from "../../configuration/Routes";

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
                Routes.map(page => <Tab sx={{ textTransform: "none" }} label={page.value} />)
            }
		</Tabs>
	) : (
		<Box sx={{ width: "100%", maxWidth: 260, bgcolor: "background.paper" }}>
			<nav style={{
				boxShadow: "3px 0px 10px rgb(225, 225, 225)",
				height: "100%",
			}}>
				<List>
                    {
                        Routes.map(page => (
						<RouterLink style={{
							textDecoration: "none",
							color: "rgb(10, 10, 10)"
						}} to={page.attr.pathName}>
							<ListItem key={page.key} disablePadding>
								<ListItemButton
									key={page.key} 
									onClick={() => handleChange(null, page.key as number)} 
									selected={tabValue === page.key}
									>
									<ListItemText key={page.key} primary={page.value} />
								</ListItemButton>
							</ListItem>
						</RouterLink>))
                    }
				</List>
			</nav>
		</Box>
	);
}
