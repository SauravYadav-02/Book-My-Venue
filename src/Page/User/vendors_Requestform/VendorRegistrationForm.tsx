import { useState } from "react";
import { User, Mail, Phone, Building2, FileText, Lock } from "lucide-react";

import FormSection from "./ReqComponet/componets/FormSection";
import SuccessScreen from "./ReqComponet/componets/SuccessScreen";
import { validate } from "./ReqComponet/utils/validate";
import { createVendor } from "../../../services/vendorService";

import { type Field, type FormValues, type Touched } from "./ReqComponet/types/formTypes";
import { INDIAN_STATES } from "./ReqComponet/componets/states";

const INIT: FormValues = {
    fullName: "",
    email: "",
    phone: "",
    businessName: "",
    businessType: "",
    governmentId: "",
    password: "",
    address: "",
    pincode: "",
    state: "",
    licenseDoc: null
};

const FIELDS: Field[] = [
    { id: "fullName", label: "Full Name", icon: User, section: "personal" },
    { id: "email", label: "Email", icon: Mail, section: "personal" },
    { id: "phone", label: "Phone", icon: Phone, section: "personal" },

    { id: "businessName", label: "Business Name", icon: Building2, section: "business" },
    { id: "businessType", label: "Business Type", icon: Building2, section: "business" },
    { id: "governmentId", label: "Gov ID", icon: FileText, section: "business" },
    { id: "address", label: "Address", icon: Building2, section: "business" },
    { id: "pincode", label: "Pincode", icon: Building2, section: "business" },

    {
        id: "state",
        label: "State",
        icon: Building2,
        section: "business",
        type: "select",
        options: INDIAN_STATES
    },

    { id: "password", label: "Password", icon: Lock, type: "password", section: "security" }
];

export default function VendorRegistrationForm() {

    const [values, setValues] = useState<FormValues>(INIT);
    const [touched, setTouched] = useState<Touched>({});
    const [status, setStatus] = useState("idle");

    const errors = validate(values);

    const set = (id: keyof FormValues, val: string) => {
        setValues(v => ({ ...v, [id]: val }));
    };

    const blur = (id: keyof FormValues) => {
        setTouched(t => ({ ...t, [id]: true }));
    };

    async function handleSubmit() {

        setTouched(Object.keys(values).reduce((a, k) => ({ ...a, [k]: true }), {}));

        if (Object.values(errors).some(Boolean)) return;

        try {
            await createVendor(values);
            setStatus("success");
        } catch {
            setStatus("error");
        }
    }

    if (status === "success") {
        return <SuccessScreen name={values.fullName} reset={() => {
            setValues(INIT);
            setTouched({});
            setStatus("idle");
        }} />;
    }

    return (
        <div className="p-6 max-w-3xl mx-auto space-y-6">

            <h1 className="text-xl font-bold text-center">Vendor Registration</h1>

            <FormSection
                title="Personal Info"
                fields={FIELDS.filter(f => f.section === "personal")}
                values={values}
                errors={errors}
                touched={touched}
                set={set}
                blur={blur}
            />

            <FormSection
                title="Business Info"
                fields={FIELDS.filter(f => f.section === "business")}
                values={values}
                errors={errors}
                touched={touched}
                set={set}
                blur={blur}
            />

            <FormSection
                title="Security"
                fields={FIELDS.filter(f => f.section === "security")}
                values={values}
                errors={errors}
                touched={touched}
                set={set}
                blur={blur}
            />

            <button
                onClick={handleSubmit}
                className="w-full bg-green-700 text-white py-3 rounded"
            >
                Submit
            </button>

        </div>
    );
}