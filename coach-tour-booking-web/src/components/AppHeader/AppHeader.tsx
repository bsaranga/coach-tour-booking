import { AppBar, Box, Button, Icon, Toolbar, Typography } from "@mui/material";
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';

export default function AppHeader(props: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div {...props}>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar sx={{
                        backgroundColor: "#4b76ed"
                        }}>
                        <Icon sx={{mr: 1.5}}>
                            <DirectionsBusIcon />
                        </Icon>
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