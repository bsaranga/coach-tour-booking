import { Alert, IconButton, Snackbar } from "@mui/material"
import { Close as CloseIcon } from '@mui/icons-material'

export default function Toast() {
    return (
        <Snackbar
        open={true}
        autoHideDuration={100}
        onClose={() => { console.log('closing...')}}
        >
            <Alert severity="success" sx={{ width: '100%' }} action={<IconButton color='inherit' size="small" onClick={() => { console.log("close") }}>
                <CloseIcon fontSize="small" />
            </IconButton>}>
                This is a success message!
            </Alert>
        </Snackbar>
    )
}