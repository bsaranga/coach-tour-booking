import { AlertColor } from "@mui/material";
import { addToast } from "../store/slices/ToastSlice";

export default function showToast(id: string, message: string, type: AlertColor, dispatcher: any) {
    dispatcher(addToast({
        toastId: id,
        isOpen: true,
        message: message,
        type: type,
    }));
}