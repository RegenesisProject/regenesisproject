import React, { useState } from 'react';
import { X, Send, CheckCircle2, Mail } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    inquiryType: 'Keynote Booking / Speaking',
    message: ''
  });

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await fetch(
        'https://script.google.com/macros/s/AKfycby3fGmfvW5bSGVpN65mlWMsMOrIklpI1izN8YenhYoR1OhmAJ-REVn-gyXB1YqW9K-BsA/exec',
        {
          method: 'POST',
          headers: { 'Content-Type': 'text/plain' },
          body: JSON.stringify({
            source: 'Contact Modal Inquiry',
            name: formData.name,
            email: formData.email,
            company: formData.company,
            inquiryType: formData.inquiryType,
            message: formData.message,
          }),
        }
      );
    } catch {
      // Gracefully continue to display confirmation
    } finally {
      setIsSubmitting(false);
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormData({
          name: '',
          email: '',
          company: '',
          inquiryType: 'Keynote Booking / Speaking',
          message: ''
        });
        onClose();
      }, 3500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1A1A1A]/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-xl bg-[#FFFFFF] border border-[#1A1A1A] p-8 sm:p-10 shadow-[0_8px_32px_rgba(0,0,0,0.2)] text-[#1A1A1A]">
        
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-6 right-6 p-2 text-[#1A1A1A] hover:text-[#D4AF37] border border-[#1A1A1A]/20 hover:border-[#D4AF37] transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-8">
          <div className="inline-flex items-center gap-2 text-[#D4AF37] font-inter font-semibold text-xs uppercase tracking-[0.25em] mb-2">
            <Mail className="w-4 h-4" />
            <span>Direct Inquiry</span>
          </div>
          <h2 className="font-playfair font-normal text-3xl text-[#1A1A1A]">
            CONTACT THOMAS VENTURA
          </h2>
          <p className="font-inter text-xs text-[#6C6863] mt-2">
            For keynote bookings, press and media enquiries, or anything else.
          </p>
        </div>

        {submitted ? (
          <div className="p-4 bg-[#FFFDF0] border border-[#D4AF37]/50 text-[#1A1A1A] rounded text-xs flex items-center gap-3 font-inter font-medium">
            <CheckCircle2 className="w-5 h-5 text-[#D4AF37] shrink-0" />
            <div>
              <p className="font-bold">Inquiry Transmitted Successfully</p>
              <p className="text-[11px] text-[#6C6863]">Thank you for reaching out. Thomas&apos;s team will review your message and reply.</p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6 font-inter text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-[#1A1A1A] font-semibold mb-2 uppercase tracking-wider">Your Name</label>
                <input
                  type="text"
                  required
                  placeholder="Your full name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="input-editorial w-full"
                />
              </div>

              <div>
                <label className="block text-[#1A1A1A] font-semibold mb-2 uppercase tracking-wider">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="input-editorial w-full"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-[#1A1A1A] font-semibold mb-2 uppercase tracking-wider">Company / Event Name (optional)</label>
                <input
                  type="text"
                  placeholder="If applicable"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="input-editorial w-full"
                />
              </div>

              <div>
                <label className="block text-[#1A1A1A] font-semibold mb-2 uppercase tracking-wider">Inquiry Category</label>
                <select
                  value={formData.inquiryType}
                  onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                  className="w-full bg-[#FFFFFF] border-b border-[#1A1A1A] text-[#1A1A1A] p-3 outline-none focus:border-[#D4AF37] rounded-none font-inter text-xs"
                >
                  <option>Keynote Booking / Speaking</option>
                  <option>Media & Podcast Interview</option>
                  <option>Working With Thomas</option>
                  <option>Something Else</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[#1A1A1A] font-semibold mb-2 uppercase tracking-wider">Message / Event Details</label>
              <textarea
                rows={3}
                required
                placeholder="Tell us what you're reaching out about. If it's an event, include dates and audience size."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="input-editorial w-full resize-none"
              />
            </div>

            <div className="pt-4 space-y-3">
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-gold-slide h-14 w-full text-xs uppercase tracking-[0.2em] font-inter font-medium flex items-center justify-center gap-2 cursor-pointer shadow-lg disabled:opacity-50"
              >
                <Send className="w-4 h-4 text-[#D4AF37]" />
                <span>{isSubmitting ? 'Sending...' : 'Submit Inquiry'}</span>
              </button>
              <p className="text-[11px] text-center text-[#6C6863] font-inter">
                You&apos;re contacting Thomas Ventura. We&apos;ll only use your details to reply.
              </p>
            </div>
          </form>
        )}

      </div>
    </div>
  );
};
