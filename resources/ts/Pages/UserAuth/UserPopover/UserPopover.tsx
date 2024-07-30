import AddIcon from "@mui/icons-material/Add";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import { Popover } from "@mui/material";
import React, { FC } from "react";
import { useIntl } from "react-intl";
import { useNavigate } from "react-router";
import { userRoute } from "../../../routes/routes";
import { userStore } from "../../userStore/user.zustand";
import { tUserPopover } from "./UserPopover.t";

export const UserPopoveerMenu: FC<{
    open: boolean;
    anchorEl: Element | null;
    onPopoverCLose: () => void;
}> = ({ open, onPopoverCLose, anchorEl }) => {
    const user = userStore((state) => state.user);
    const logoutUser = userStore((state) => state.logoutUser);
    const intl = useIntl();
    const navigate = useNavigate();
    return (
        <Popover
            open={open}
            onClose={onPopoverCLose}
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
            }}
            transformOrigin={{
                vertical: "top",
                horizontal: "right",
            }}
            sx={{ marginTop: 1 }}
        >
            <div className="rounded-lg px-2 py-4 flex flex-col content-center items-center gap-4">
                <span>
                    {intl.formatMessage(tUserPopover.hello, {
                        value: (
                            <span className="text-primary">{user?.email}</span>
                        ),
                    })}
                </span>
                <button
                    className="w-48 text-sm flex justify-center gap-2 bg-white px-4 py-2 h-8 items-center rounded-2xl hover:bg-primary-400 hover:text-white transition text-primary-400 border border-primary-400 cursor:pointer"
                    onClick={() => {
                        navigate(userRoute);
                        onPopoverCLose();
                    }}
                >
                    {intl.formatMessage(tUserPopover.addSteal)}
                    <AddIcon />
                </button>
                <button
                    className="w-48 text-sm flex justify-center gap-2 bg-primary-400 px-4 py-2 h-8 items-center rounded-2xl hover:bg-primary-200 hover:text-primary transition text-white cursor:pointer"
                    onClick={() => {
                        navigate(userRoute);
                        onPopoverCLose();
                    }}
                >
                    {intl.formatMessage(tUserPopover.goToProfile)}
                    <PersonIcon />
                </button>
                <button
                    className="w-48 text-sm flex justify-center gap-2 bg-primary-400 px-4 py-2 h-8 items-center rounded-2xl hover:bg-primary-200 hover:text-primary transition text-white cursor:pointer"
                    onClick={() => {
                        (async () =>
                            user.email && (await logoutUser(user.email)))();
                        onPopoverCLose();
                    }}
                >
                    {intl.formatMessage(tUserPopover.logOut)}
                    <LogoutIcon />
                </button>
            </div>
        </Popover>
    );
};
