import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import euroBusLogo from '../../img/euro-bus-logo.png'

export default function AppHeader(props: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div {...props}>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar variant="dense" sx={{ backgroundColor: "#8bcce7" }}>
                        <img src={euroBusLogo} style={{ width: '48px', marginRight: '8px' }} alt="logo"/>
                        <Typography data-testid="appname" variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            EuroBus
                        </Typography>
                        <Button color="inherit">Login</Button>
                    </Toolbar>
                </AppBar>
            </Box>
        </div>
    )
}