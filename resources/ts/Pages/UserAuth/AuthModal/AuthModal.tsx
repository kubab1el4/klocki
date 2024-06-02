import CloseIcon from "@mui/icons-material/Close";
import { Box, Fade, Modal } from "@mui/material";
import React, { FC, useEffect, useState } from "react";
import { LoginForm } from "./Login/Login";
import { SingUpForm } from "./Signup/SignUp";

const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
};

type AuthModalProps = {
    open: boolean;
    handleClose: () => void;
};

export const AuthModal: FC<AuthModalProps> = ({ open, handleClose }) => {
    const [isSinupFormOpen, setIsSinupFormOpen] = useState(false);
    useEffect(() => {
        if (open === true) setIsSinupFormOpen(false);
    }, [open]);

    const onClickOpenSignupForm = () => {
        setIsSinupFormOpen(true);
    };

    const onModalClose = () => {
        handleClose();
    };

    return (
        <Modal
            open={open}
            onClose={onModalClose}
            aria-labelledby="modal-modal-title"
        >
            <Fade in={open}>
                <Box sx={style} className="rounded-lg">
                    <button
                        onClick={onModalClose}
                        className="absolute top-2 right-2 hover:text-primary-400 transition cursor-pointer"
                    >
                        <CloseIcon />
                    </button>
                    {isSinupFormOpen ? (
                        <SingUpForm />
                    ) : (
                        <LoginForm
                            onClickOpenSignupForm={onClickOpenSignupForm}
                        />
                    )}
                </Box>
            </Fade>
        </Modal>
    );
};
