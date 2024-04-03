import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import TextField from "@mui/material/TextField";
import { TransitionProps } from "@mui/material/transitions/transition";
import * as React from "react";
import { FC } from "react";
import { useIntl } from "react-intl";
import { tButton } from "../../../../translations/button.t";
import { tPricedropModal } from "./PricedropModal.t";

type PricedropModalProps = {
    open: boolean;
    handleClose: () => void;
};

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export const PricedropModal: FC<PricedropModalProps> = ({
    open,
    handleClose,
}) => {
    const intl = useIntl();

    return (
        <>
            <Dialog
                TransitionComponent={Transition}
                open={open}
                onClose={handleClose}
                PaperProps={{
                    component: "form",
                    onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
                        event.preventDefault();
                        const formData = new FormData(event.currentTarget);
                        const formJson = Object.fromEntries(
                            (formData as any).entries()
                        );
                        const email = formJson.email;
                        console.log(email);
                        handleClose();
                    },
                }}
            >
                <DialogTitle className="text-center">
                    {intl.formatMessage(tPricedropModal.title)}
                </DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="name"
                        name="email"
                        label={intl.formatMessage(
                            tPricedropModal.emailPlaceholder
                        )}
                        type="email"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="name"
                        label={intl.formatMessage(
                            tPricedropModal.pricePlaceholder
                        )}
                        type="number"
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions className="flex items-center justify-center w-full">
                    <Button onClick={handleClose} variant="outlined">
                        {intl.formatMessage(tButton.cancel)}
                    </Button>
                    <Button type="submit" variant="contained">
                        {intl.formatMessage(tPricedropModal.confirmButton)}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};
