import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import {
    Button,
    IconButton,
    InputAdornment,
    TextField,
    Typography,
} from "@mui/material";
import React, { FC, FormEvent, useState } from "react";
import { useIntl } from "react-intl";
import { domain } from "../../../../routes/routes";
import { userStore } from "../../../userStore/user.zustand";
import { tLoginModal } from "../Login/Login.t";
import { tSignup } from "./Signup.t";

export const SingUpForm: FC = () => {
    const intl = useIntl();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswardConfirm] = useState("");
    const [passwordNotIdentical, setPasswordNotIdentical] = useState(false);
    const [passwordTooShort, setPasswordTooShort] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const queryUser = userStore((state) => state.queryUser);
    const resetModalState = () => {
        setEmail("");
        setPassword("");
        setPasswardConfirm("");
    };

    const sumbitHanlder = async (e: FormEvent) => {
        try {
            e.preventDefault();
            if (password.length < 8) {
                setPasswordTooShort(true);
                setPasswordNotIdentical(false);
                return;
            }

            if (passwordConfirm !== password) {
                setPasswordNotIdentical(true);
                setPasswordTooShort(false);
                return;
            }
            setPasswordTooShort(false);
            setPasswordNotIdentical(false);
            setIsLoading(true);
            await fetch(`${domain}/sanctum/csrf-cookie'`);

            const token = document.cookie.split("XSRF-TOKEN=")[1].slice(0, -3);

            const response = await fetch(`${domain}/api/register`, {
                method: "POST",
                credentials: "same-origin",
                headers: {
                    "Content-Type": "application/json",
                    "X-XSRF-Token": token,
                    Accept: "application/json",
                },
                body: JSON.stringify({
                    name: email,
                    email,
                    password,
                    password_confirmation: passwordConfirm,
                }),
            });
            queryUser();
            setIsLoading(false);
            resetModalState();
            console.log(await response.text());
        } catch (e) {
            if (e instanceof Error) {
                console.log(e.message);
            }
        }
    };

    const [showPassword, setShowPasswword] = useState(false);
    const [showPasswordConfirm, setShowPasswwordConfirm] = useState(false);

    return (
        <>
            <Typography
                id="modal-modal-title"
                variant="h6"
                component="h2"
                className="pb-6"
            >
                {intl.formatMessage(tSignup.title)}
                <div className="text-sm text-gray-500">
                    {intl.formatMessage(tSignup.description)}
                </div>
            </Typography>

            <form onSubmit={sumbitHanlder} className="flex flex-col gap-4">
                <TextField
                    value={email}
                    type="email"
                    id="email"
                    label={intl.formatMessage(tLoginModal.email)}
                    variant="outlined"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    id="password"
                    type={showPassword ? "text" : "password"}
                    label={intl.formatMessage(tLoginModal.password)}
                    variant="outlined"
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={() => setShowPasswword(true)}
                                    onMouseDown={() => setShowPasswword(false)}
                                >
                                    {showPassword ? (
                                        <VisibilityOffIcon />
                                    ) : (
                                        <VisibilityIcon />
                                    )}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
                <TextField
                    id="passwordConfirm"
                    value={passwordConfirm}
                    onChange={(e) => setPasswardConfirm(e.target.value)}
                    type={showPasswordConfirm ? "text" : "password"}
                    label={intl.formatMessage(tSignup.passwordConfirm)}
                    variant="outlined"
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={() =>
                                        setShowPasswwordConfirm(true)
                                    }
                                    onMouseDown={() =>
                                        setShowPasswwordConfirm(false)
                                    }
                                >
                                    {showPasswordConfirm ? (
                                        <VisibilityOffIcon />
                                    ) : (
                                        <VisibilityIcon />
                                    )}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />

                <p className="text-red-600">
                    {passwordNotIdentical &&
                        intl.formatMessage(tSignup.passwordNotIdentical)}
                    {passwordTooShort &&
                        intl.formatMessage(tSignup.passwordTooShort)}
                </p>

                <Button type="submit" variant="contained" className="pt-2">
                    {intl.formatMessage(tSignup.button)}
                </Button>
            </form>
        </>
    );
};
