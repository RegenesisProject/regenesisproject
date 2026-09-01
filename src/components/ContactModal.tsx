import React, { useState } from 'react';
import { X, Send, CheckCircle2, Mail } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    inquiryType: 'Keynote Booking / Speaking',
    message: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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
    }, 3000);
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
            Inquire regarding Keynote speaking, corporate retreats, or executive advisory.
          </p>
        </div>

        {submitted ? (
          <div className="p-4 bg-[#FFFDF0] border border-[#D4AF37]/50 text-[#1A1A1A] rounded text-xs flex items-center gap-3 font-inter font-medium">
            <CheckCircle2 className="w-5 h-5 text-[#D4AF37] shrink-0" />
            <div>
              <p className="font-bold">Inquiry Transmitted Successfully!</p>
              <p className="text-[11px] text-[#6C6863]">Thomas's team will review your request and reply within 24 business hours.</p>
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
                  placeholder="e.g. Thomas Vance"
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
                  placeholder="tvance@company.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="input-editorial w-full"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-[#1A1A1A] font-semibold mb-2 uppercase tracking-wider">Company / Event Name</label>
                <input
                  type="text"
                  placeholder="e.g. Apex Global Summit"
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
                  <option>Executive Team Advisory</option>
                  <option>Media & Podcast Interview</option>
                  <option>Book Pre-Orders & Bulk Purchases</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[#1A1A1A] font-semibold mb-2 uppercase tracking-wider">Message / Event Details</label>
              <textarea
                rows={3}
                required
                placeholder="Share event dates, audience size, or specific biological capacity objectives..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="input-editorial w-full resize-none"
              />
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className="btn-gold-slide h-14 w-full text-xs uppercase tracking-[0.2em] font-inter font-medium flex items-center justify-center gap-2 cursor-pointer shadow-lg"
              >
                <Send className="w-4 h-4 text-[#D4AF37]" />
                <span>Submit Inquiry</span>
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
};
