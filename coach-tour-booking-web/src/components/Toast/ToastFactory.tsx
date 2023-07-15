import { Alert, AlertColor, Snackbar } from "@mui/material"
import { useAppDispatch, useAppSelector } from "../../store/Hooks"
import { hideToast, removeToast } from "../../store/slices/ToastSlice";

export interface IToastState {
    toastId: string,
    isOpen: boolean,
    type: AlertColor,
    message: string,
}

export default function ToastFactory() {
    const dispatch = useAppDispatch();
    const toasts = useAppSelector(state => state.toastSlice.toasts);

    function handleToastClose(toastId: string) {
        dispatch(hideToast(toastId));
        const timeOutId = setTimeout(() => {
            dispatch(removeToast(toastId));
            clearTimeout(timeOutId);
        }, 100);
    }
    return (
        <>
        {
            toasts.map(toast => {
                return (
                    <div key={toast.toastId}>
                        <Snackbar
                        key={toast.toastId}
                        open={toast.isOpen}
                        anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right'
                        }}
                        autoHideDuration={1500}
                        onClose={() => { handleToastClose(toast.toastId); }}
                        >
                            <Alert severity={toast.type} sx={{ width: '100%' }}>
                                { toast.message }
                            </Alert>
                        </Snackbar>
                    </div>
                )
            })
        }
        </>
    )
}