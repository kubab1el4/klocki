import PersonIcon from "@mui/icons-material/Person";
import React, { FC, useRef } from "react";
import { useIntl } from "react-intl";
import { tNavbar } from "../../Components/Navbar/navbar.t";
import { userStore } from "../userStore/user.zustand";
import { AuthModal } from "./AuthModal/AuthModal";
import { UserPopoveerMenu } from "./UserPopover/UserPopover";

export const LoginButton: FC = () => {
    const intl = useIntl();
    const user = userStore((state) => state.user);
    const ref = useRef(null);

    const [authModalOpen, setAuthModalOpen] = React.useState(false);
    const [userPopoverMenuOpen, setUserPopoverMenuOpen] = React.useState(false);
    const handelClik = () => {
        console.log(user);
        if (!user.email) {
            setAuthModalOpen(true);
            return;
        }
        setUserPopoverMenuOpen(true);
    };
    const handleClose = () => setAuthModalOpen(false);

    console.log(user);

    return (
        <>
            <button
                ref={ref}
                onClick={handelClik}
                className="w-68 text-sm flex gap-2 bg-primary-400 px-4 py-2 h-8 items-center rounded-2xl hover:bg-primary-200 hover:text-primary transition"
            >
                {user?.email ? (
                    user.email
                ) : (
                    <span>{intl.formatMessage(tNavbar.loginSinginButton)}</span>
                )}

                <PersonIcon />
            </button>
            <AuthModal open={authModalOpen} handleClose={handleClose} />
            <UserPopoveerMenu
                anchorEl={ref.current}
                open={userPopoverMenuOpen}
                onPopoverCLose={() => {
                    setUserPopoverMenuOpen(false);
                }}
            />
        </>
    );
};
