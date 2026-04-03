import { useState } from 'react';
import {
    User, Mail, Phone, Building2, FileText, Lock, ArrowRight, Loader2, CheckCircle2
} from 'lucide-react';

type FormValues = {
    fullName: string;
    email: string;
    phone: string;
    businessName: string;
    businessType: string;
    governmentId: string;
    password: string;
};

type Status = 'idle' | 'submitting' | 'success' | 'error';

const INIT: FormValues = {
    fullName: '',
    email: '',
    phone: '',
    businessName: '',
    businessType: '',
    governmentId: '',
    password: '',
};

type Field = {
    id: keyof FormValues;
    label: string;
    icon: typeof User;
    type?: string;
    placeholder: string;
    section: 'personal' | 'business' | 'security';
};

const FIELDS: Field[] = [
    { id: 'fullName', label: 'Full Name', icon: User, placeholder: 'Nilesh Patel', section: 'personal' },
    { id: 'email', label: 'Email', icon: Mail, placeholder: 'nilesh@gmail.com', section: 'personal', type: 'email' },
    { id: 'phone', label: 'Phone', icon: Phone, placeholder: '9876543210', section: 'personal' },
    { id: 'businessName', label: 'Business Name', icon: Building2, placeholder: 'Patel Wedding Lawn', section: 'business' },
    { id: 'businessType', label: 'Business Type', icon: Building2, placeholder: 'banquet / catering', section: 'business' },
    { id: 'governmentId', label: 'Government ID', icon: FileText, placeholder: 'PAN_XYZ9876K', section: 'business' },
    { id: 'password', label: 'Password', icon: Lock, placeholder: 'Min 6 characters', section: 'security', type: 'password' },
];

const SECTIONS = [
    { key: 'personal', title: 'Personal Info', subtitle: 'Your contact details' },
    { key: 'business', title: 'Business Info', subtitle: 'Your business details' },
    { key: 'security', title: 'Security', subtitle: 'Set your password' },
] as const;

function validate(v: FormValues): Partial<FormValues> {
    const e: Partial<FormValues> = {};
    if (!v.fullName) e.fullName = 'Required';
    if (!v.email) e.email = 'Required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email)) e.email = 'Invalid email';
    if (!v.phone) e.phone = 'Required';
    else if (!/^\d{10}$/.test(v.phone)) e.phone = 'Enter valid 10-digit number';
    if (!v.businessName) e.businessName = 'Required';
    if (!v.businessType) e.businessType = 'Required';
    if (!v.governmentId) e.governmentId = 'Required';
    if (!v.password) e.password = 'Required';
    else if (v.password.length < 6) e.password = 'Min 6 characters';
    return e;
}

function InputField({
    id, label, icon: Icon, type = 'text', placeholder, value, error, touched,
    onChange, onBlur,
}: {
    id: keyof FormValues; label: string; icon: typeof User; type?: string;
    placeholder: string; value: string; error?: string; touched?: boolean;
    onChange: (val: string) => void; onBlur: () => void;
}) {
    const err = touched && error;

    return (
        <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-gray-600">{label}</label>

            <div className="relative">
                <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />

                <input
                    type={type}
                    value={value}
                    onChange={e => onChange(e.target.value)}
                    onBlur={onBlur}
                    placeholder={placeholder}
                    className={`w-full pl-8 pr-3 py-2.5 text-xs rounded-xl border transition
            bg-white focus:outline-none focus:ring-2
            ${err
                            ? 'border-red-300 focus:ring-red-100'
                            : 'border-gray-200 focus:ring-indigo-100 focus:border-indigo-300'
                        }`}
                />
            </div>

            {err && <p className="text-xs text-red-400">{error}</p>}
        </div>
    );
}

export default function VendorRegistrationForm() {
    const [values, setValues] = useState<FormValues>(INIT);
    const [touched, setTouched] = useState<Partial<Record<keyof FormValues, boolean>>>({});
    const [status, setStatus] = useState<Status>('idle');

    const errors = validate(values);

    const set = (id: keyof FormValues, val: string) =>
        setValues(v => ({ ...v, [id]: val }));

    const blur = (id: keyof FormValues) =>
        setTouched(t => ({ ...t, [id]: true }));

    async function handleSubmit() {
        setTouched({
            fullName: true, email: true, phone: true,
            businessName: true, businessType: true,
            governmentId: true, password: true
        });

        if (Object.values(errors).some(Boolean)) return;

        setStatus('submitting');

        const newVendor = {
            id: crypto.randomUUID(),
            ...values,
            status: 'pending',
            adminMessage: '',
        };

        try {
            const res = await fetch('http://192.168.1.12:5000/vendors', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newVendor),
            });

            if (!res.ok) throw new Error();

            setStatus('success');
        } catch {
            setStatus('error');
        }
    }

    // ✅ SUCCESS SCREEN
    if (status === 'success') return (
        <div className="min-h-screen flex items-center justify-center bg-white px-4">
            <div className="bg-[#F7F9FB] p-10 rounded-3xl shadow-sm text-center max-w-xs w-full">
                <CheckCircle2 className="mx-auto text-green-500 w-10 h-10 mb-4" />
                <h2 className="text-base font-semibold">You're registered!</h2>
                <p className="text-xs text-gray-500 mt-2">
                    {values.fullName} submitted successfully.
                </p>

                <button
                    className="mt-5 w-full bg-indigo-600 text-white py-2.5 rounded-xl text-xs"
                    onClick={() => {
                        setValues(INIT);
                        setTouched({});
                        setStatus('idle');
                    }}
                >
                    Register another
                </button>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-white flex items-center justify-center px-4 py-10">
            <div className="w-full max-w-2xl">

                <div className="text-center mb-6">
                    <Building2 className="mx-auto w-10 h-10 text-indigo-600 mb-2" />
                    <h1 className="text-xl font-semibold">Vendor Registration</h1>
                    <p className="text-xs text-gray-500">Register your business</p>
                </div>

                {/* ✅ FORM CARD */}
                <div className="bg-[#F7F9FB] rounded-3xl shadow-sm p-6">

                    {status === 'error' && (
                        <p className="text-xs text-red-500 mb-3">Submission failed</p>
                    )}

                    <div className="space-y-6">
                        {SECTIONS.map(section => (
                            <div key={section.key}>
                                <h2 className="text-xs font-semibold text-gray-700 mb-2">
                                    {section.title}
                                </h2>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {FIELDS.filter(f => f.section === section.key).map(field => (
                                        <InputField
                                            key={field.id}
                                            {...field}
                                            value={values[field.id]}
                                            error={errors[field.id]}
                                            touched={touched[field.id]}
                                            onChange={val => set(field.id, val)}
                                            onBlur={() => blur(field.id)}
                                        />
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    <button
                        onClick={handleSubmit}
                        disabled={status === 'submitting'}
                        className="mt-6 w-full bg-indigo-600 text-white py-3 rounded-xl text-xs flex items-center justify-center gap-2"
                    >
                        {status === 'submitting'
                            ? <><Loader2 className="w-4 h-4 animate-spin" /> Submitting</>
                            : <><span>Register Vendor</span><ArrowRight className="w-4 h-4" /></>}
                    </button>
                </div>
            </div>
        </div>
    );
}