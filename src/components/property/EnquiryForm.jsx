import React, { useState } from 'react';
import {
  Send,
  CheckCircle2,
  Calendar,
  Phone,
  Mail,
  User,
  MessageSquare,
  AlertCircle,
} from 'lucide-react';

export default function EnquiryForm({ propertyId, propertyTitle }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    visitDate: '',
    message: `Hi, I am interested in property #${propertyId} (${propertyTitle}). Please connect with me for a site visit.`,
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validation rules
  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    // 10-digit Indian phone number (or international 10 digits)
    const phoneDigits = formData.phone.replace(/\D/g, '');
    if (!phoneDigits) {
      newErrors.phone = 'Phone number is required';
    } else if (phoneDigits.length !== 10) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Visit date validation
    if (!formData.visitDate) {
      newErrors.visitDate = 'Please select a preferred visit date';
    } else {
      const selected = new Date(formData.visitDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selected < today) {
        newErrors.visitDate = 'Visit date cannot be in the past';
      }
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Please provide a message or inquiry details';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    setIsSubmitting(true);

    const submissionPayload = {
      propertyId,
      propertyTitle,
      ...formData,
      submittedAt: new Date().toISOString(),
    };

    // Requirement: "On submit, show a success message and console.log the data including the property ID."
    console.log('--- ENQUIRY FORM SUBMITTED ---');
    console.log(submissionPayload);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 400);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for field on change
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const todayStr = new Date().toISOString().split('T')[0];

  return (
    <div
      id="enquiry-section"
      className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-sm"
    >
      <div className="mb-6">
        <span className="text-xs font-bold text-brand-700 tracking-wider uppercase">
          Direct Agent Inquiry
        </span>
        <h3 className="text-xl font-extrabold text-slate-900 mt-1">
          Schedule a Private Visit
        </h3>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Inquire about Property ID <span className="font-semibold text-slate-800">#{propertyId}</span>. Our relationship manager will coordinate your private site tour.
        </p>
      </div>

      {isSubmitted ? (
        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-center animate-in zoom-in-95 duration-200">
          <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h4 className="text-lg font-bold text-emerald-900 mb-1">
            Enquiry Submitted Successfully!
          </h4>
          <p className="text-xs sm:text-sm text-emerald-700 max-w-sm mx-auto mb-4">
            Thank you, <span className="font-semibold">{formData.name}</span>. We've logged your request for Property ID <span className="font-semibold">{propertyId}</span> for visit on <span className="font-semibold">{formData.visitDate}</span>. Our agent will call you shortly.
          </p>
          <button
            type="button"
            onClick={() => {
              setIsSubmitted(false);
              setFormData({
                name: '',
                phone: '',
                email: '',
                visitDate: '',
                message: `Hi, I am interested in property #${propertyId}. Please connect with me.`,
              });
            }}
            className="text-xs font-bold text-emerald-800 hover:text-emerald-900 underline"
          >
            Submit Another Request
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          {/* Full Name */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Your Full Name <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Rahul Sharma"
                className={`w-full pl-10 pr-3 py-2.5 bg-slate-50 border rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:bg-white transition-all ${
                  errors.name
                    ? 'border-rose-300 focus:ring-rose-500 bg-rose-50/20'
                    : 'border-slate-200 focus:ring-brand-500'
                }`}
              />
            </div>
            {errors.name && (
              <p className="text-xs text-rose-600 mt-1 flex items-center gap-1 font-medium">
                <AlertCircle className="w-3 h-3" />
                {errors.name}
              </p>
            )}
          </div>

          {/* Phone & Email 2-column */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Phone */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Phone Number <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="tel"
                  name="phone"
                  maxLength={10}
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="10-digit number"
                  className={`w-full pl-10 pr-3 py-2.5 bg-slate-50 border rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:bg-white transition-all ${
                    errors.phone
                      ? 'border-rose-300 focus:ring-rose-500 bg-rose-50/20'
                      : 'border-slate-200 focus:ring-brand-500'
                  }`}
                />
              </div>
              {errors.phone && (
                <p className="text-xs text-rose-600 mt-1 flex items-center gap-1 font-medium">
                  <AlertCircle className="w-3 h-3" />
                  {errors.phone}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Email Address <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@example.com"
                  className={`w-full pl-10 pr-3 py-2.5 bg-slate-50 border rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:bg-white transition-all ${
                    errors.email
                      ? 'border-rose-300 focus:ring-rose-500 bg-rose-50/20'
                      : 'border-slate-200 focus:ring-brand-500'
                  }`}
                />
              </div>
              {errors.email && (
                <p className="text-xs text-rose-600 mt-1 flex items-center gap-1 font-medium">
                  <AlertCircle className="w-3 h-3" />
                  {errors.email}
                </p>
              )}
            </div>
          </div>

          {/* Preferred Visit Date */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Preferred Visit Date <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <Calendar className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="date"
                name="visitDate"
                min={todayStr}
                value={formData.visitDate}
                onChange={handleChange}
                className={`w-full pl-10 pr-3 py-2.5 bg-slate-50 border rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:bg-white transition-all ${
                  errors.visitDate
                    ? 'border-rose-300 focus:ring-rose-500 bg-rose-50/20'
                    : 'border-slate-200 focus:ring-brand-500'
                }`}
              />
            </div>
            {errors.visitDate && (
              <p className="text-xs text-rose-600 mt-1 flex items-center gap-1 font-medium">
                <AlertCircle className="w-3 h-3" />
                {errors.visitDate}
              </p>
            )}
          </div>

          {/* Message */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Your Message <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <textarea
                name="message"
                rows={3}
                value={formData.message}
                onChange={handleChange}
                className={`w-full p-3 bg-slate-50 border rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:bg-white transition-all ${
                  errors.message
                    ? 'border-rose-300 focus:ring-rose-500 bg-rose-50/20'
                    : 'border-slate-200 focus:ring-brand-500'
                }`}
              />
            </div>
            {errors.message && (
              <p className="text-xs text-rose-600 mt-1 flex items-center gap-1 font-medium">
                <AlertCircle className="w-3 h-3" />
                {errors.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full inline-flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-brand-700 hover:bg-brand-800 disabled:bg-slate-300 text-white font-bold text-sm shadow-md transition-all active:scale-[0.98]"
          >
            <Send className="w-4 h-4" />
            <span>{isSubmitting ? 'Sending Request...' : 'Send Visit Enquiry'}</span>
          </button>
        </form>
      )}
    </div>
  );
}
