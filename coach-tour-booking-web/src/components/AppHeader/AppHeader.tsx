import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import euroBusLogo from '../../img/euro-bus-logo.png'
import AccountMenu from "../Account/AccountMenu";
import Notifications from "../Notifications/Notifications";

export default function AppHeader(props: any) {
    return (
        <div>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar variant="dense" sx={{ backgroundColor: "#099ae8    " }}>
                        <img src={euroBusLogo} style={{ width: '48px', marginRight: '8px' }} alt="logo"/>
                        <Typography data-testid="appname" variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            EuroBus
                        </Typography>
                        <Notifications/>
                        <AccountMenu />
                    </Toolbar>
                </AppBar>
            </Box>
        </div>
    )
}