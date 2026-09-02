import React, { useState } from 'react';
import { X, CheckCircle2, Send, Award } from 'lucide-react';

interface SpeakerKitModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SpeakerKitModal: React.FC<SpeakerKitModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    eventType: 'Conference',
    eventDate: '',
    notes: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState<'idle' | 'success' | 'duplicate' | 'error' | 'invalid'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.organization || !formData.eventType) {
      return;
    }
    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const response = await fetch(
        'https://script.google.com/macros/s/AKfycby3fGmfvW5bSGVpN65mlWMsMOrIklpI1izN8YenhYoR1OhmAJ-REVn-gyXB1YqW9K-BsA/exec',
        {
          method: 'POST',
          headers: { 'Content-Type': 'text/plain' },
          body: JSON.stringify({
            source: 'Request the Speaker Kit',
            name: formData.name,
            email: formData.email,
            organization: formData.organization,
            eventType: formData.eventType,
            eventDate: formData.eventDate,
            message: formData.notes,
          }),
        }
      );

      const data = await response.json();

      if (data.status === 'success') {
        setFormStatus('success');
      } else if (data.status === 'duplicate') {
        setFormStatus('duplicate');
      } else if (data.status === 'invalid') {
        setFormStatus('invalid');
        setErrorMessage('Please check your email address and try again.');
      } else {
        setFormStatus('error');
        setErrorMessage('Something went wrong. Please check your email and try again.');
      }
    } catch (err) {
      setFormStatus('error');
      setErrorMessage('Something went wrong. Please check your email and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseModal = () => {
    setFormStatus('idle');
    setErrorMessage('');
    setFormData({
      name: '',
      email: '',
      organization: '',
      eventType: 'Conference',
      eventDate: '',
      notes: ''
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#000000]/85 backdrop-blur-md animate-fadeIn overflow-y-auto">
      <div className="relative w-full max-w-xl bg-[#181818] border border-[#C9962F]/40 p-6 sm:p-10 shadow-[0_10px_40px_rgba(0,0,0,0.8)] text-[#FFFFFF] my-8 rounded-2xl">
        
        <button
          onClick={handleCloseModal}
          aria-label="Close modal"
          className="absolute top-6 right-6 p-2 text-[#E6E1D5] hover:text-[#FCE289] border border-[#3A3328] hover:border-[#C9962F] rounded-full transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-6">
          <div className="inline-flex items-center gap-2 text-[#FCE289] font-mono font-semibold text-[11px] uppercase tracking-[0.25em] mb-2">
            <Award className="w-4 h-4 text-[#C9962F]" />
            <span>EXECUTIVE SPEAKER KIT</span>
          </div>
          <h2 className="font-playfair font-bold text-2xl sm:text-3xl text-[#FFFFFF]">
            Request the Speaker Kit
          </h2>
          <p className="font-inter text-xs sm:text-sm text-[#A39E93] mt-2">
            Tell us a little about your event and we'll send the kit straight over.
          </p>
        </div>

        {formStatus === 'success' ? (
          <div className="p-6 bg-[#1A2318] border border-[#4E8B3D]/60 rounded-xl text-[#E2F5DB] flex items-start gap-4">
            <CheckCircle2 className="w-6 h-6 text-[#68D048] shrink-0 mt-0.5" />
            <div className="space-y-2">
              <p className="font-bold text-sm sm:text-base text-[#FFFFFF]">Request Received</p>
              <p className="font-inter text-xs sm:text-sm leading-relaxed text-[#D2ECD0]">
                On its way. Thanks — we'll get the speaker kit to you shortly. If your event has a firm date, mention it in your reply and we'll check availability at the same time.
              </p>
              <div className="pt-4">
                <button
                  onClick={handleCloseModal}
                  className="px-6 py-2.5 rounded-lg bg-[#C9962F] text-[#000000] font-inter font-bold text-xs uppercase tracking-wider cursor-pointer hover:bg-[#FCE289] transition-colors"
                >
                  Close Window
                </button>
              </div>
            </div>
          </div>
        ) : formStatus === 'duplicate' ? (
          <div className="p-6 bg-[#232018] border border-[#C9962F]/60 rounded-xl text-[#FCE289] flex items-start gap-4">
            <CheckCircle2 className="w-6 h-6 text-[#C9962F] shrink-0 mt-0.5" />
            <div className="space-y-2">
              <p className="font-bold text-sm sm:text-base text-[#FFFFFF]">Already Requested</p>
              <p className="font-inter text-xs sm:text-sm leading-relaxed text-[#E6E1D5]">
                You've already requested the Speaker Kit — check your inbox.
              </p>
              <div className="pt-4">
                <button
                  onClick={handleCloseModal}
                  className="px-6 py-2.5 rounded-lg bg-[#C9962F] text-[#000000] font-inter font-bold text-xs uppercase tracking-wider cursor-pointer hover:bg-[#FCE289] transition-colors"
                >
                  Close Window
                </button>
              </div>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5 font-inter text-xs sm:text-sm">
            {errorMessage && (
              <div className="p-3 bg-red-950/70 border border-red-500/50 rounded-lg text-red-200 text-xs">
                {errorMessage}
              </div>
            )}
            <div>
              <label className="block text-[#E6E1D5] font-semibold mb-1.5 uppercase tracking-wider text-[10px]">
                Name <span className="text-[#C9962F]">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="Your full name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full h-11 px-4 rounded-lg bg-[#0F0F0F] border border-[#3A3328] text-[#FFFFFF] placeholder-[#555047] focus:outline-none focus:border-[#C9962F] transition-colors"
              />
            </div>

            <div>
              <label className="block text-[#E6E1D5] font-semibold mb-1.5 uppercase tracking-wider text-[10px]">
                Email <span className="text-[#C9962F]">*</span>
              </label>
              <input
                type="email"
                required
                placeholder="you@organization.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full h-11 px-4 rounded-lg bg-[#0F0F0F] border border-[#3A3328] text-[#FFFFFF] placeholder-[#555047] focus:outline-none focus:border-[#C9962F] transition-colors"
              />
            </div>

            <div>
              <label className="block text-[#E6E1D5] font-semibold mb-1.5 uppercase tracking-wider text-[10px]">
                Organization <span className="text-[#C9962F]">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="Company or event organization"
                value={formData.organization}
                onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                className="w-full h-11 px-4 rounded-lg bg-[#0F0F0F] border border-[#3A3328] text-[#FFFFFF] placeholder-[#555047] focus:outline-none focus:border-[#C9962F] transition-colors"
              />
            </div>

            <div>
              <label className="block text-[#E6E1D5] font-semibold mb-1.5 uppercase tracking-wider text-[10px]">
                Event type <span className="text-[#C9962F]">*</span>
              </label>
              <select
                required
                value={formData.eventType}
                onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
                className="w-full h-11 px-4 rounded-lg bg-[#0F0F0F] border border-[#3A3328] text-[#FFFFFF] focus:outline-none focus:border-[#C9962F] transition-colors"
              >
                <option value="Conference">Conference</option>
                <option value="Leadership offsite">Leadership offsite</option>
                <option value="Accelerator or founder program">Accelerator or founder program</option>
                <option value="Sales or team event">Sales or team event</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-[#E6E1D5] font-semibold mb-1.5 uppercase tracking-wider text-[10px]">
                Event date (or approximate)
              </label>
              <input
                type="text"
                placeholder="e.g. Q4 2026 or October 15, 2026"
                value={formData.eventDate}
                onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                className="w-full h-11 px-4 rounded-lg bg-[#0F0F0F] border border-[#3A3328] text-[#FFFFFF] placeholder-[#555047] focus:outline-none focus:border-[#C9962F] transition-colors"
              />
            </div>

            <div>
              <label className="block text-[#E6E1D5] font-semibold mb-1.5 uppercase tracking-wider text-[10px]">
                Anything we should know
              </label>
              <textarea
                rows={2}
                placeholder="Theme, audience size, key focus areas..."
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="w-full p-3 rounded-lg bg-[#0F0F0F] border border-[#3A3328] text-[#FFFFFF] placeholder-[#555047] focus:outline-none focus:border-[#C9962F] transition-colors resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-12 rounded-xl bg-gradient-to-r from-[#7E4F11] via-[#C9962F] to-[#E2B13D] text-[#000000] font-inter font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-2 cursor-pointer shadow-[0_4px_25px_rgba(226,177,61,0.35)] hover:shadow-[0_6px_35px_rgba(226,177,61,0.6)] transition-all disabled:opacity-70 disabled:cursor-not-allowed"
            >
              <span>{isSubmitting ? 'SENDING...' : 'SEND ME THE KIT'}</span>
              <Send className="w-4 h-4 text-[#000000]" />
            </button>
          </form>
        )}

      </div>
    </div>
  );
};
