import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getVenues, deleteVenue, type Venue } from "../../../services/venueService";
import VenueCard from "../EditVenues/components/VenueCard";

export default function VenueList() {
    const navigate = useNavigate();
    const [venues, setVenues] = useState<Venue[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [deleteId, setDeleteId] = useState<string | null>(null);
    const [deleting, setDeleting] = useState(false);

    const fetchVenues = async () => {
        try {
            setLoading(true);
            const data = await getVenues();
            setVenues(data);
        } catch {
            setError("Failed to load venues. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchVenues();
    }, []);

    const handleDelete = async () => {
        if (!deleteId) return;
        try {
            setDeleting(true);
            await deleteVenue(deleteId);
            setVenues((prev) => prev.filter((v) => v._id !== deleteId));
            setDeleteId(null);
        } catch {
            setError("Failed to delete venue.");
        } finally {
            setDeleting(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
                <div className="flex flex-col items-center gap-3">
                    <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
                    <p className="text-sm text-slate-400">Loading venues...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 sm:p-8">
            <div className="max-w-5xl mx-auto">

                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-800 tracking-tight">My venues</h1>
                        <p className="text-sm text-slate-400 mt-0.5">
                            {venues.length} listing{venues.length !== 1 ? "s" : ""} published
                        </p>
                    </div>
                    <button
                        onClick={() => navigate("/venues/add")}
                        className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500
                            hover:bg-emerald-600 text-white text-sm font-semibold transition-all"
                    >
                        + Add venue
                    </button>
                </div>

                {/* Error */}
                {error && (
                    <div className="bg-rose-50 border border-rose-200 text-rose-700 rounded-xl px-4 py-3 text-sm mb-6">
                        {error}
                    </div>
                )}

                {/* Empty state */}
                {venues.length === 0 ? (
                    <div className="bg-white rounded-2xl border border-slate-100 p-12 text-center shadow-sm">
                        <div className="w-14 h-14 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <svg className="w-7 h-7 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                        </div>
                        <p className="text-slate-700 font-medium">No venues yet</p>
                        <p className="text-slate-400 text-sm mt-1">Add your first venue to get started.</p>
                        <button
                            onClick={() => navigate("/venues/add")}
                            className="mt-5 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600
                                text-white text-sm font-semibold transition-all"
                        >
                            + Add your first venue
                        </button>
                    </div>
                ) : (
                    /* Cards grid */
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {venues.map((venue) => (
                            <VenueCard
                                key={venue._id}
                                venue={venue}
                                onEdit={() => navigate(`/venues/edit/${venue._id}`)}
                                onDelete={() => setDeleteId(venue._id)}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* Delete confirmation modal */}
            {deleteId && (
                <div
                    className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4"
                    onClick={() => setDeleteId(null)}
                >
                    <div
                        className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="w-12 h-12 bg-rose-50 rounded-xl flex items-center justify-center mx-auto mb-4">
                            <svg className="w-6 h-6 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                        </div>
                        <h2 className="text-base font-semibold text-slate-800 text-center mb-1">
                            Delete venue?
                        </h2>
                        <p className="text-sm text-slate-400 text-center mb-6">
                            This action cannot be undone. The listing will be permanently removed.
                        </p>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setDeleteId(null)}
                                className="flex-1 py-2.5 rounded-xl border border-slate-200 text-sm
                                    font-medium text-slate-600 hover:bg-slate-50 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDelete}
                                disabled={deleting}
                                className="flex-1 py-2.5 rounded-xl bg-rose-500 hover:bg-rose-600
                                    text-white text-sm font-semibold transition-colors disabled:opacity-50"
                            >
                                {deleting ? "Deleting..." : "Delete"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}