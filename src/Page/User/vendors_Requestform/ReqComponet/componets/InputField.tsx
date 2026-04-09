type Props = {
    label: string;
    icon: React.ElementType;
    value: string;
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

    const baseClass = `w-full pl-10 pr-3 py-3 text-sm rounded-xl bg-white border 
    ${error && touched ? "border-red-500" : "border-slate-200"}
    focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition`;

    return (
        <div className="space-y-1">
            <label className="text-xs text-slate-600">{label}</label>

            <div className="relative">
                <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />

                {type === "select" ? (
                    <select
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        onBlur={onBlur}
                        className={baseClass}
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
                        className={baseClass}
                    />
                )}
            </div>

            {touched && error && (
                <p className="text-xs text-red-500">{error}</p>
            )}
        </div>
    );
}