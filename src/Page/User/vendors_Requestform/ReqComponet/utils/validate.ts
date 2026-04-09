import { type Errors, type FormValues } from "../types/formTypes";

export function validate(v: FormValues): Errors {
    const e: Errors = {};

    if (!v.fullName) e.fullName = "Required";

    if (!v.email) e.email = "Required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email))
        e.email = "Invalid email";

    if (!v.phone) e.phone = "Required";
    else if (!/^\d{10}$/.test(v.phone))
        e.phone = "Invalid phone";

    if (!v.businessName) e.businessName = "Required";
    if (!v.businessType) e.businessType = "Required";
    if (!v.governmentId) e.governmentId = "Required";

    if (!v.address) e.address = "Required";
    if (!v.pincode) e.pincode = "Required";
    if (!v.state) e.state = "Required";

    if (!v.password || v.password.length < 6)
        e.password = "Min 6 characters";

    return e;
}