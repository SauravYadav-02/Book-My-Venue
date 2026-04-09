import { STEPS } from "../types/Constants";

function StepBar({ current }: { current: number }) {
    return (
        <div className="flex items-center mb-8 overflow-x-auto pb-1">
            {STEPS.map((label, i) => (
                <div key={i} className="flex items-center shrink-0">
                    <div className="flex items-center gap-2">
                        <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold shrink-0 transition-all
              ${i < current
                                ? "bg-emerald-500 text-white"
                                : i === current
                                    ? "bg-emerald-500 text-white ring-4 ring-emerald-100"
                                    : "bg-slate-100 text-slate-400"
                            }`}>
                            {i < current ? (
                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                                </svg>
                            ) : i + 1}
                        </div>
                        <span className={`text-xs font-medium whitespace-nowrap transition-colors
              ${i === current ? "text-emerald-700" : i < current ? "text-slate-500" : "text-slate-300"}`}>
                            {label}
                        </span>
                    </div>
                    {i < STEPS.length - 1 && (
                        <div className={`w-8 h-px mx-3 transition-colors ${i < current ? "bg-emerald-300" : "bg-slate-200"}`} />
                    )}
                </div>
            ))}
        </div>
    );
}

export default StepBar;