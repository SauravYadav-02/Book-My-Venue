type Props = {
    label: string;
    icon: React.ElementType;
    value: string; // ✅ FIXED
    error?: string;
    touched?: boolean;
    onChange: (val: string) => void;
    onBlur: () => void;
    type?: string;
    placeholder?: string;
    options?: string[];
};

export default function InputField({
    label,
    icon: Icon,
    value,
    error,
    touched,
    onChange,
    onBlur,
    type = "text",
    placeholder,
    options
}: Props) {

    return (
        <div className="space-y-1">
            <label className="text-xs text-slate-600">{label}</label>

            <div className="relative">
                <Icon className="absolute left-3 top-3 w-4 h-4 text-slate-400" />

                {type === "select" ? (
                    <select
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        onBlur={onBlur}
                        className="w-full pl-10 pr-3 py-3 text-sm rounded-xl bg-slate-100"
                    >
                        <option value="">Select {label}</option>
                        {options?.map((opt) => (
                            <option key={opt} value={opt}>
                                {opt}
                            </option>
                        ))}
                    </select>
                ) : (
                    <input
                        type={type}
                        value={value}
                        placeholder={placeholder}
                        onChange={(e) => onChange(e.target.value)}
                        onBlur={onBlur}
                        className="w-full pl-10 pr-3 py-3 text-sm rounded-xl bg-slate-100"
                    />
                )}
            </div>

            {touched && error && (
                <p className="text-xs text-red-500">{error}</p>
            )}
        </div>
    );
}