function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <div className="bg-white rounded-2xl border border-slate-100 p-5 mb-4 shadow-sm">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-400 mb-4">{title}</p>
            {children}
        </div>
    );
}

export default SectionCard;