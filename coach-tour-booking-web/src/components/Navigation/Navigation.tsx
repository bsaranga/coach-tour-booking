import { SyntheticEvent, useEffect, useState } from "react";
import {
	Box,
	List,
	ListItem,
	ListItemButton,
	ListItemText,
	Tab,
	Tabs,
} from "@mui/material";

import { Link as RouterLink, useLocation } from "react-router-dom";
import { INavigationProps } from "../../interfaces/Common/INavigationProps";
import Routes from "../../configuration/Routes";

type IResponsiveVariant = {
	mobile: 'standard' | 'scrollable' | 'fullWidth',
	tablet: 'standard' | 'scrollable' | 'fullWidth',
	desktop: 'standard' | 'scrollable' | 'fullWidth'
}

export default function Navigation(props: INavigationProps) {
	const { viewState } = props;
	const [tabValue, setTabValue] = useState(0);
	const [currentLocation, setCurrentLocation] = useState<string>();

	const location = useLocation();

	useEffect(() => {
		setCurrentLocation(location.pathname);
		Routes.forEach(r => {
			const key = r.key;
			if (`/${r.attr.pathName}` === location.pathname) {
				setTabValue(key as number);
			}
		})
	}, [location])

	function handleChange(event: SyntheticEvent | null, tabVal: number) {
		setTabValue(tabVal);
	}

	const responsiveVariant: IResponsiveVariant = {
		mobile: "scrollable",
		tablet: "standard",
		desktop: "fullWidth"
	}

	return (viewState.screenSize !== 'desktop') ? (
		<Tabs value={tabValue}
            onChange={handleChange}
            variant={responsiveVariant[viewState.screenSize]}
            centered={viewState.screenSize === 'tablet'}
			allowScrollButtonsMobile={viewState.screenSize === 'mobile'}>
            {
                Routes.map(page => <Tab sx={{ textTransform: "none" }} key={page.key} label={page.value} {...{component: RouterLink, to: page.attr.pathName}} />)
            }
		</Tabs>
	) : (
		<Box sx={{ width: "100%", maxWidth: 230, bgcolor: "background.paper" }}>
			<nav className="navigation_container">
				<List>
                    {
                        Routes.map(page => (
						<ListItem key={page.key} disablePadding>
							<ListItemButton
								key={page.key} 
								onClick={() => handleChange(null, page.key as number)} 
								selected={currentLocation === `/${page.attr.pathName}`}
								{...{component: RouterLink, to: page.attr.pathName}}
								>
									<Box sx={{
										display: "flex",
										gap: "0.5rem",
										alignItems: 'center'
									}}>
										{ page.attr.iconComponent }
										<ListItemText key={page.key} primary={page.value} />
									</Box>
							</ListItemButton>
						</ListItem>))
                    }
				</List>
			</nav>
		</Box>
	);
}
