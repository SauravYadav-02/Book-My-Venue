import { useState } from "react";
import type { AvailabilityEntry, FormErrors, VenueForm } from "./AddVenue/types/Interface";
import { INITIAL_FORM, STEPS } from "./AddVenue/types/Constants";
import StepBar from "./AddVenue/Components/StepBar";
import Toast from "./AddVenue/Components/Toast";
import StepBasicInfo from "./AddVenue/Components/StepBasicInfo";
import StepLocation from "./AddVenue/Components/StepLocation";
import StepAmenities from "./AddVenue/Components/StepAmenities";
import StepReview from "./AddVenue/Components/StepReview";
export default function AddVenue() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<VenueForm>({ ...INITIAL_FORM, amenities: new Set() });
  const [errors, setErrors] = useState<FormErrors>({});
  const [toast, setToast] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const update = (key: keyof VenueForm, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: "" }));
  };

  const toggleAmenity = (name: string) => {
    setForm((prev) => {
      const exists = prev.amenities.includes(name);

      return {
        ...prev,
        amenities: exists
          ? prev.amenities.filter((a) => a !== name)
          : [...prev.amenities, name],
      };
    });
  };

  const updateAvailability = (list: AvailabilityEntry[]) =>
    setForm((prev) => ({ ...prev, availability: list }));

  const addMedia = () =>
    setForm((prev) => ({ ...prev, mediaFiles: [...prev.mediaFiles, `photo-${prev.mediaFiles.length + 1}.jpg`] }));

  // Validation
  const validateStep = (s: number): boolean => {
    const errs: FormErrors = {};
    if (s === 0) {
      if (!form.name.trim()) errs.name = "Venue name is required";
      if (!form.type) errs.type = "Please select a venue type";
      if (!form.capacity || parseInt(form.capacity) < 1) errs.capacity = "Enter a valid capacity";
      if (!form.description.trim()) errs.description = "Description is required";
      if (!form.pricePerHour) errs.pricePerHour = "Enter hourly pricing";
      if (!form.pricePerDay) errs.pricePerDay = "Enter daily pricing";
    }
    if (s === 1) {
      if (!form.address.trim()) errs.address = "Address is required";
      if (!form.city.trim()) errs.city = "City is required";
      if (!form.state.trim()) errs.state = "State is required";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = () => {
    if (!validateStep(step)) return;
    if (step === STEPS.length - 1) {
      setToast(true);
      setSubmitted(true);
      setTimeout(() => setToast(false), 3500);
      return;
    }
    setStep((s) => s + 1);
  };

  const handleBack = () => {
    if (step > 0) setStep((s) => s - 1);
  };

  if (submitted && !toast) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-6">
        <div className="bg-white rounded-3xl p-10 text-center shadow-sm border border-slate-100 max-w-sm w-full">
          <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-5">
            <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-slate-800 mb-2">Venue published!</h2>
          <p className="text-sm text-slate-500 mb-6">
            <span className="font-medium text-slate-700">{form.name}</span> is now live and visible to customers.
          </p>
          <button
            onClick={() => { setForm({ ...INITIAL_FORM, amenities: new Set() }); setStep(0); setSubmitted(false); }}
            className="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-semibold transition-colors"
          >
            Add another venue
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 sm:p-8">
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Add new venue</h1>
            <p className="text-sm text-slate-400 mt-0.5">Fill in the details to publish your listing</p>
          </div>
          <span className="text-xs text-slate-400 bg-white border border-slate-200 rounded-full px-3 py-1.5 font-medium">
            Step {step + 1} of {STEPS.length}
          </span>
        </div>

        {/* Step bar */}
        <StepBar current={step} />

        {/* Toast */}
        <Toast message="Venue published successfully!" show={toast} />

        {/* Step content */}
        {step === 0 && <StepBasicInfo form={form} errors={errors} update={update} />}
        {step === 1 && <StepLocation form={form} errors={errors} update={update} />}
        {step === 2 && (
          <StepAmenities
            form={form}
            updateAmenities={toggleAmenity}
            updateAvailability={updateAvailability}
          />
        )}
        {step === 3 && <StepReview form={form} onAddMedia={addMedia} />}

        {/* Footer */}
        <div className="flex items-center justify-between mt-2">
          <button
            type="button"
            onClick={handleBack}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium border border-slate-200
              text-slate-600 hover:bg-slate-50 transition-all ${step === 0 ? "invisible" : ""}`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>

          <button
            type="button"
            onClick={handleNext}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold
              bg-emerald-500 hover:bg-emerald-600 text-white transition-all shadow-sm shadow-emerald-200"
          >
            {step === STEPS.length - 1 ? "Publish listing" : "Continue"}
            {step < STEPS.length - 1 && (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}