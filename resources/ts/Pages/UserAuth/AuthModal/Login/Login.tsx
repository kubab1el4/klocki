import { Button, TextField, Typography } from "@mui/material";
import React, { FC, FormEvent, useState } from "react";
import { useIntl } from "react-intl";
import { userStore } from "../../../userStore/user.zustand";
import { tLoginModal } from "./Login.t";

type LoginFormProps = {
    onClickOpenSignupForm: () => void;
};

export const LoginForm: FC<LoginFormProps> = ({ onClickOpenSignupForm }) => {
    const intl = useIntl();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const loginUser = userStore((state) => state.loginUser);
    const querryUser = userStore((state) => state.queryUser);

    const resetModalState = () => {
        setEmail("");
        setPassword("");
    };

    const sumbitHanlder = async (e: FormEvent) => {
        e.preventDefault();
        await loginUser(email, password);
        await querryUser();
    };

    return (
        <>
            <Typography
                id="modal-modal-title"
                variant="h6"
                component="h2"
                className="pb-6"
            >
                {intl.formatMessage(tLoginModal.title)}
                <div className="text-sm text-gray-500">
                    {intl.formatMessage(tLoginModal.notAMember)}{" "}
                    <button
                        className="text-gray-600 hover:text-primary-400 transition underline cursor-pointer"
                        onClick={onClickOpenSignupForm}
                    >
                        {intl.formatMessage(tLoginModal.createAccount)}
                    </button>
                </div>
            </Typography>

            <form onSubmit={sumbitHanlder} className="flex flex-col gap-4">
                <TextField
                    type="email"
                    id="email"
                    label={intl.formatMessage(tLoginModal.email)}
                    variant="outlined"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                    id="password"
                    label={intl.formatMessage(tLoginModal.password)}
                    variant="outlined"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button type="submit" variant="contained" className="pt-2">
                    {intl.formatMessage(tLoginModal.login)}
                </Button>
            </form>
        </>
    );
};
