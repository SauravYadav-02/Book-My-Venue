import { ALL_AMENITIES } from "../types/Constants";
import type { AvailabilityEntry, VenueForm } from "../types/Interface";
import SectionCard from "./SectionCard";

function StepAmenities({
    form, updateAmenities, updateAvailability,
}: {
    form: VenueForm;
    updateAmenities: (name: string) => void;
    updateAvailability: (list: AvailabilityEntry[]) => void;
}) {
    const addDate = () => updateAvailability([...form.availability, { date: "", status: "available" }]);
    const removeDate = (i: number) => updateAvailability(form.availability.filter((_, idx) => idx !== i));
    const updateDate = (i: number, key: keyof AvailabilityEntry, val: string) => {
        const updated = form.availability.map((a, idx) =>
            idx === i ? { ...a, [key]: val } : a
        );
        updateAvailability(updated);
    };

    return (
        <>
            <SectionCard title="Amenities">
                <div className="flex flex-wrap gap-2">
                    {ALL_AMENITIES.map((a) => {
                        const selected = form.amenities.has(a);
                        return (
                            <button
                                key={a}
                                type="button"
                                onClick={() => updateAmenities(a)}
                                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium border transition-all
                  ${selected
                                        ? "bg-emerald-50 border-emerald-400 text-emerald-800"
                                        : "bg-white border-slate-200 text-slate-500 hover:border-slate-300"
                                    }`}
                            >
                                {selected && (
                                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 12 12">
                                        <path d="M10 3L5 8.5 2 5.5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                )}
                                {a}
                            </button>
                        );
                    })}
                </div>
            </SectionCard>

            <SectionCard title="Availability dates">
                <div className="space-y-2.5">
                    {form.availability.map((entry, i) => (
                        <div key={i} className="grid grid-cols-[1fr_140px_32px] gap-2 items-center">
                            <input
                                type="date"
                                value={entry.date}
                                onChange={(e) => updateDate(i, "date", e.target.value)}
                                className="w-full px-3 py-2 rounded-xl text-sm bg-slate-50 border border-slate-200
                  text-slate-700 outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20 transition-all"
                            />
                            <select
                                value={entry.status}
                                onChange={(e) => updateDate(i, "status", e.target.value)}
                                className="w-full px-3 py-2 rounded-xl text-sm bg-slate-50 border border-slate-200
                  text-slate-700 outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20 transition-all"
                            >
                                <option value="available">Available</option>
                                <option value="booked">Booked</option>
                            </select>
                            <button
                                type="button"
                                onClick={() => removeDate(i)}
                                className="w-8 h-8 flex items-center justify-center rounded-xl border border-slate-200
                  text-slate-400 hover:border-rose-300 hover:text-rose-400 hover:bg-rose-50 transition-all text-sm"
                            >
                                ×
                            </button>
                        </div>
                    ))}
                </div>
                <button
                    type="button"
                    onClick={addDate}
                    className="mt-3 text-xs text-emerald-600 font-medium hover:text-emerald-700 transition-colors"
                >
                    + Add date
                </button>
            </SectionCard>
        </>
    );
}
export default StepAmenities;