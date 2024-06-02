import { create } from "zustand";
import { domain } from "../../routes/routes";

type UserState = {
    user: { email?: string };
    queryUser: () => void;
    logoutUser: (email: string) => void;
    loginUser: (email: string, password: string) => void;
};

const token = document.cookie.split("XSRF-TOKEN=")[1].slice(0, -3);

export const userStore = create<UserState>()((set) => ({
    user: {},
    queryUser: async () => {
        const response = await fetch(`${domain}/api/user`, {
            headers: {
                Accept: "application/json",
            },
        });
        console.log(response);
        const data = await response.json();
        set({ user: data });
    },

    loginUser: async (email, password) => {
        await fetch(`${domain}/api/login`, {
            method: "POST",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json",
                "X-XSRF-Token": token,
                Accept: "application/json",
            },
            body: JSON.stringify({
                name: email,
                email: email,
                password: password,
            }),
        });
    },

    logoutUser: async (email) => {
        await fetch(`${domain}/api/logout`, {
            method: "POST",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json",
                "X-XSRF-Token": token,
                Accept: "application/json",
            },
            body: JSON.stringify({
                name: email,
                email: email,
            }),
        });
        set({ user: undefined });
    },
}));
