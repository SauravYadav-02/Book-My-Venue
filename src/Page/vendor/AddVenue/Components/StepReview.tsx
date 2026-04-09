import type { VenueForm } from "../types/Interface";
import SectionCard from "./SectionCard";


export const ReviewRow = ({ label, value }: { label: string; value: string }) => (
    <div className="bg-slate-50 rounded-xl p-3">
        <p className="text-[10px] uppercase tracking-widest text-slate-400 font-medium mb-0.5">{label}</p>
        <p className="text-sm text-slate-700 font-medium">{value || "—"}</p>
    </div>
);

export default function StepReview({
    form, onAddMedia,
}: {
    form: VenueForm; onAddMedia: () => void;
}) {
    const fmt = (n: string) => n ? `$${parseInt(n).toLocaleString()}` : "—";



    return (
        <>
            <SectionCard title="Media upload">
                <div
                    onClick={onAddMedia}
                    className="border-2 border-dashed border-slate-200 rounded-2xl p-8 text-center cursor-pointer
            hover:border-emerald-300 hover:bg-emerald-50/30 transition-all group"
                >
                    <div className="w-10 h-10 mx-auto mb-3 rounded-xl bg-slate-100 group-hover:bg-emerald-100
            flex items-center justify-center transition-all">
                        <svg className="w-5 h-5 text-slate-400 group-hover:text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                    </div>
                    <p className="text-sm text-slate-500 group-hover:text-emerald-700 font-medium transition-colors">
                        Click to upload photos
                    </p>
                    <p className="text-xs text-slate-400 mt-1">JPG, PNG or WEBP · max 5MB each</p>
                </div>

                {form.mediaFiles.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                        {form.mediaFiles.map((f, i) => (
                            <div key={i} className="w-20 h-16 rounded-xl bg-slate-100 border border-slate-200
                flex items-center justify-center text-[10px] text-slate-400">
                                {f}
                            </div>
                        ))}
                    </div>
                )}
            </SectionCard>

            <SectionCard title="Review before publishing">
                <div className="grid grid-cols-2 gap-2.5">
                    <ReviewRow label="Name" value={form.name} />
                    <ReviewRow label="Type" value={form.type} />
                    <ReviewRow label="Capacity" value={form.capacity ? `${form.capacity} guests` : ""} />
                    <ReviewRow label="Location" value={[form.city, form.state].filter(Boolean).join(", ")} />
                    <ReviewRow label="Per hour" value={fmt(form.pricePerHour) + (form.pricePerHour ? "/hr" : "")} />
                    <ReviewRow label="Per day" value={fmt(form.pricePerDay) + (form.pricePerDay ? "/day" : "")} />
                    <div className="col-span-2 bg-slate-50 rounded-xl p-3">
                        <p className="text-[10px] uppercase tracking-widest text-slate-400 font-medium mb-0.5">Amenities</p>
                        <p className="text-sm text-slate-700 font-medium">
                            {form.amenities.size > 0 ? [...form.amenities].join(", ") : "None selected"}
                        </p>
                    </div>
                    <div className="col-span-2 bg-slate-50 rounded-xl p-3">
                        <p className="text-[10px] uppercase tracking-widest text-slate-400 font-medium mb-1">Availability</p>
                        <div className="flex flex-wrap gap-1.5">
                            {form.availability.filter(a => a.date).map((a, i) => (
                                <span key={i} className={`text-xs px-2.5 py-1 rounded-full font-medium
                  ${a.status === "available"
                                        ? "bg-emerald-50 text-emerald-700"
                                        : "bg-rose-50 text-rose-600"
                                    }`}>
                                    {a.date} · {a.status}
                                </span>
                            ))}
                            {form.availability.filter(a => a.date).length === 0 && (
                                <span className="text-xs text-slate-400">No dates added</span>
                            )}
                        </div>
                    </div>
                </div>
            </SectionCard>
        </>
    );
}

