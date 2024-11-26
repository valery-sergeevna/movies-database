import { FC, memo } from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Typography,
} from "@mui/material";
import { ErrorModalProps } from "../../core/types";

const ErrorModal: FC<ErrorModalProps> = ({
    error,
    open,
    onRetry,
    onCancel,
}) => {
    return (
        <Dialog
            open={open}
            onClose={onCancel}
            aria-labelledby='modal-modal-title'
        >
            <DialogTitle id='modal-modal-title'>
                Something went wrong...
            </DialogTitle>
            <DialogContent>
                <Typography id='modal-modal-description'>{error}</Typography>
            </DialogContent>
            <DialogActions>
                <Button variant='contained' color='primary' onClick={onRetry}>
                    Try Again
                </Button>
                <Button variant='outlined' color='secondary' onClick={onCancel}>
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
    );
};
const _ErrorModal = memo(ErrorModal);

export { _ErrorModal as ErrorModal };
