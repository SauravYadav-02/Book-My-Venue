// import { LoginForm } from "../types/authTypes";

import type { LoginForm } from "../types/authTypes";

export interface LoginErrors {
    username?: string;
    password?: string;
}

export const validateLogin = (form: LoginForm): LoginErrors => {
    const errors: LoginErrors = {};

    if (!form.username.trim()) {
        errors.username = "Username is required";
    } else if (form.username.length < 3) {
        errors.username = "Username must be at least 3 characters";
    }

    if (!form.password.trim()) {
        errors.password = "Password is required";
    } else if (form.password.length < 5) {
        errors.password = "Password must be at least 5 characters";
    }

    return errors;
};