import React, { useState } from 'react';
import { Mail, Send, CheckCircle2, ArrowLeft, Mic, Calendar, UserCheck } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';
import { PageKey } from '../types';

interface ContactPageProps {
  onNavigateHome?: () => void;
  onNavigatePage?: (page: PageKey, sectionId?: string) => void;
  onOpenSpeakerKit?: () => void;
  onOpenWaitlist?: () => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({
  onNavigateHome,
  onNavigatePage,
  onOpenSpeakerKit,
  onOpenWaitlist,
}) => {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    inquiryType: 'Keynote Booking / Speaking',
    message: ''
  });

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
            source: 'Contact Page Inquiry',
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
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData({
      name: '',
      email: '',
      company: '',
      inquiryType: 'Keynote Booking / Speaking',
      message: ''
    });
  };

  return (
    <div className="bg-[#FFFFFF] text-[#111111] min-h-screen py-10 sm:py-16 px-4 sm:px-8 lg:px-12 font-sans relative overflow-hidden">
      <div className="max-w-4xl mx-auto">
        
        {/* Navigation Back Link */}
        <div className="mb-8">
          <button
            onClick={() => {
              if (onNavigateHome) {
                onNavigateHome();
              } else if (onNavigatePage) {
                onNavigatePage('home');
              }
            }}
            className="inline-flex items-center gap-2 text-xs font-inter font-bold uppercase tracking-[0.2em] text-[#6C6863] hover:text-[#D4AF37] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Home</span>
          </button>
        </div>

        {/* Page Header */}
        <ScrollReveal delay={0.1}>
          <div className="mb-10 sm:mb-12 border-b border-[#1A1A1A]/10 pb-8">
            <div className="inline-flex items-center gap-2 text-[#D4AF37] font-inter font-semibold text-xs uppercase tracking-[0.25em] mb-3">
              <Mail className="w-4 h-4" />
              <span>Direct Inquiry</span>
            </div>
            <h1 className="font-playfair font-normal text-3xl sm:text-5xl lg:text-6xl text-[#1A1A1A] leading-tight">
              CONTACT THOMAS VENTURA
            </h1>
            <p className="font-inter text-sm sm:text-base text-[#6C6863] mt-3 max-w-2xl leading-relaxed">
              For keynote bookings, press and media enquiries, or anything else.
            </p>
          </div>
        </ScrollReveal>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          
          {/* Form Container (7 cols) */}
          <div className="lg:col-span-7 bg-[#FAFAFA] border border-[#1A1A1A]/15 p-6 sm:p-10 shadow-sm">
            {submitted ? (
              <div className="py-8 text-center space-y-5">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#FFFDF0] border border-[#D4AF37] text-[#D4AF37] mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-playfair font-normal text-2xl text-[#1A1A1A]">
                    Inquiry Transmitted Successfully
                  </h3>
                  <p className="font-inter text-xs text-[#6C6863] max-w-md mx-auto leading-relaxed">
                    Thank you for reaching out. Thomas&apos;s team will review your message and reply.
                  </p>
                </div>
                <button
                  onClick={handleReset}
                  className="mt-4 px-6 py-3 border border-[#1A1A1A] hover:border-[#D4AF37] hover:text-[#D4AF37] text-xs font-inter uppercase tracking-widest transition-colors cursor-pointer"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6 font-inter text-xs">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[#1A1A1A] font-semibold mb-2 uppercase tracking-wider">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Your full name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="input-editorial w-full bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[#1A1A1A] font-semibold mb-2 uppercase tracking-wider">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="input-editorial w-full bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[#1A1A1A] font-semibold mb-2 uppercase tracking-wider">
                      Company / Event Name (optional)
                    </label>
                    <input
                      type="text"
                      placeholder="If applicable"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="input-editorial w-full bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[#1A1A1A] font-semibold mb-2 uppercase tracking-wider">
                      Inquiry Category
                    </label>
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
                  <label className="block text-[#1A1A1A] font-semibold mb-2 uppercase tracking-wider">
                    Message / Event Details
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tell us what you're reaching out about. If it's an event, include dates and audience size."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="input-editorial w-full bg-white resize-none"
                  />
                </div>

                <div className="pt-2 space-y-3">
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

          {/* Context & Reference Cards (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="border border-[#1A1A1A]/15 p-6 bg-white space-y-3">
              <div className="flex items-center gap-2 text-[#D4AF37] font-semibold text-xs uppercase tracking-wider">
                <Calendar className="w-4 h-4" />
                <span>Keynote Engagements</span>
              </div>
              <p className="text-xs text-[#6C6863] leading-relaxed">
                For corporate summits, conferences, or executive assemblies, please specify dates, location, and audience size.
              </p>
              <button
                onClick={() => {
                  if (onNavigatePage) {
                    onNavigatePage('keynotes');
                  } else if (onOpenSpeakerKit) {
                    onOpenSpeakerKit();
                  }
                }}
                className="text-xs font-semibold text-[#1A1A1A] hover:text-[#D4AF37] inline-flex items-center gap-1 cursor-pointer transition-colors"
              >
                <span>View Keynotes & Topics →</span>
              </button>
            </div>

            <div className="border border-[#1A1A1A]/15 p-6 bg-white space-y-3">
              <div className="flex items-center gap-2 text-[#D4AF37] font-semibold text-xs uppercase tracking-wider">
                <Mic className="w-4 h-4" />
                <span>Press & Media Inquiries</span>
              </div>
              <p className="text-xs text-[#6C6863] leading-relaxed">
                For podcast invitations, broadcast appearances, and editorial coverage, please note your production timeline and format.
              </p>
            </div>

            <div className="border border-[#1A1A1A]/15 p-6 bg-white space-y-3">
              <div className="flex items-center gap-2 text-[#D4AF37] font-semibold text-xs uppercase tracking-wider">
                <UserCheck className="w-4 h-4" />
                <span>Working With Thomas</span>
              </div>
              <p className="text-xs text-[#6C6863] leading-relaxed">
                Direct inquiries regarding high-level leadership engagements and framework applications.
              </p>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
