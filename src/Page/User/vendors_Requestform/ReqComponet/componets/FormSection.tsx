import InputField from './InputField';
import { type Field, type FormValues, type Errors, type Touched } from '../types/formTypes';

type Props = {
    title: string;
    subtitle?: string;
    fields: Field[];
    values: FormValues;
    errors: Errors;
    touched: Touched;
    set: (id: keyof FormValues, val: string) => void;
    blur: (id: keyof FormValues) => void;
};

export default function FormSection({
    title,
    subtitle,
    fields,
    values,
    errors,
    touched,
    set,
    blur
}: Props) {

    return (
        <div className="space-y-6 border border-slate-200 rounded-xl p-5 bg-slate-50">

            <div>
                <h2 className="text-sm font-semibold text-slate-700">{title}</h2>
                {subtitle && <p className="text-xs text-gray-500">{subtitle}</p>}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {fields.map(field => (
                    <InputField
                        key={field.id}
                        {...field}
                        value={values[field.id] as string}
                        error={errors[field.id]}
                        touched={touched[field.id]}
                        onChange={(val) => set(field.id, val)}
                        onBlur={() => blur(field.id)}
                    />
                ))}
            </div>

        </div>
    );
}