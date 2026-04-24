import React, { useState, useEffect, type FormEvent } from "react";
import toast, { Toaster } from "react-hot-toast";
import type { LoginForm, Role } from "../../types/authTypes";
import { validateLogin, type LoginErrors } from "./validation/authValidation";
import { loginUser } from "../../services/authService";
import { useNavigate } from "react-router-dom";

const LoginPage: React.FC = () => {
    const navigate = useNavigate();
    const [role, setRole] = useState<Role>("vendor");

    // Check if user or vendor is already logged in and redirect them
    useEffect(() => {
        const userId = localStorage.getItem("userId");
        const vendorId = localStorage.getItem("vendorId");

        if (userId) {
            navigate("/");
        } else if (vendorId) {
            navigate("/dashboard");
        }
    }, [navigate]);

    const [form, setForm] = useState<LoginForm>({
        email: "",
        username: "",
        password: "",
    });

    const handleRoleChange = (newRole: Role) => {
        setRole(newRole);
        setErrors({});
        setForm({
            email: "",
            username: "",
            password: "",
        });
    };

    const [errors, setErrors] = useState<LoginErrors>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: "" });
    };

    const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const validationErrors = validateLogin(role, form);

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            const data = await loginUser(role, form);

            if ("user" in data) {
                localStorage.setItem("userId", data.user._id);
                navigate("/");

            } else {
                localStorage.setItem("vendorId", data.vendor._id);
                navigate("/dashboard");

            }

            toast.success("Login Success 🚀");
        } catch {
            toast.error("Login Failed ❌");
        }
    };

    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-blue-100 to-blue-300 px-4">
            <Toaster />

            {/* Heading Section */}
            <div className="w-full max-w-md mb-8 text-left">
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 leading-tight">
                    Welcome Back 👋
                </h1>
                <p className="text-gray-600 text-sm mt-2">
                    Login to your account
                </p>
            </div>

            {/* Card */}
            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 sm:p-8">

                {/* Role Toggle */}
                <div className="flex bg-gray-100 rounded-full p-1 mb-6">
                    <button
                        type="button"
                        onClick={() => handleRoleChange("vendor")}
                        className={`flex-1 py-2 rounded-full text-sm font-semibold transition ${role === "vendor"
                            ? "bg-white shadow text-blue-600"
                            : "text-gray-500"
                            }`}
                    >
                        Vendor
                    </button>
                    <button
                        type="button"
                        onClick={() => handleRoleChange("user")}
                        className={`flex-1 py-2 rounded-full text-sm font-semibold transition ${role === "user"
                            ? "bg-white shadow text-blue-600"
                            : "text-gray-500"
                            }`}
                    >
                        User
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleLogin} className="space-y-4">

                    {/* Email or Username */}
                    {role === "user" ? (
                        <div>
                            <input
                                name="email"
                                type="email"
                                value={form.email || ""}
                                placeholder="Email address"
                                onChange={handleChange}
                                className={`w-full p-3 rounded-lg border ${errors.email ? "border-red-500" : "border-gray-300"} focus:ring-2 focus:ring-blue-400 outline-none`}
                            />
                            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                        </div>
                    ) : (
                        <div>
                            <input
                                name="username"
                                type="text"
                                value={form.username || ""}
                                placeholder="Username"
                                onChange={handleChange}
                                className={`w-full p-3 rounded-lg border ${errors.username ? "border-red-500" : "border-gray-300"} focus:ring-2 focus:ring-blue-400 outline-none`}
                            />
                            {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username}</p>}
                        </div>
                    )}

                    {/* Password */}
                    <div>
                        <input
                            name="password"
                            type="password"
                            value={form.password}
                            placeholder="Password"
                            onChange={handleChange}
                            className={`w-full p-3 rounded-lg border ${errors.password ? "border-red-500" : "border-gray-300"} focus:ring-2 focus:ring-blue-400 outline-none`}
                        />
                        {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                    </div>

                    {/* Button */}
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
                    >
                        Login
                    </button>
                </form>

                {/* Footer */}
                <div className="mt-6 text-center text-sm text-gray-500 flex flex-col space-y-2">
                    <p>
                        Don&apos;t have an account?{" "}
                        <a href="/user-register" className="text-blue-600 font-semibold hover:underline">
                            Register as User
                        </a>
                    </p>
                    <p>
                        Are you a venue owner?{" "}
                        <a href="/register" className="text-blue-600 font-semibold hover:underline">
                            Register as Vendor
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;