"use client";

import { useState, useEffect, useMemo } from "react";
import { 
  X, 
  Calendar as CalendarIcon, 
  Clock, 
  Car, 
  CheckCircle2, 
  ChevronLeft, 
  ChevronRight, 
  Loader2, 
  ShieldCheck, 
  ExternalLink,
  Building2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { COMPANY } from "@/config/company";
import { CONTACT_CONFIG } from "@/config/contact";
import { PROJECTS } from "@/content/projects";

const TIME_SLOTS = [
  "09:30 AM",
  "11:00 AM",
  "01:30 PM",
  "03:00 PM",
  "04:30 PM",
  "06:00 PM"
];

export default function CalendlyModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [bookingMode, setBookingMode] = useState<"native" | "calendly">("native");
  
  // Date selection state
  const today = useMemo(() => new Date(), []);
  const [currentMonth, setCurrentMonth] = useState<number>(today.getMonth());
  const [currentYear, setCurrentYear] = useState<number>(today.getFullYear());
  const [selectedDate, setSelectedDate] = useState<Date>(() => {
    const nextDay = new Date();
    nextDay.setDate(nextDay.getDate() + 1);
    return nextDay;
  });
  const [selectedTime, setSelectedTime] = useState<string>("11:00 AM");
  const [selectedProject, setSelectedProject] = useState<string>(PROJECTS[0]?.title || "Skyline Heights");
  
  // Chauffeured cab pickup option
  const [cabPickup, setCabPickup] = useState<boolean>(false);
  const [pickupAddress, setPickupAddress] = useState<string>("");

  // Form Inputs
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");

  // System states
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [honeypot, setHoneypot] = useState("");
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);

  // Modal Open Event
  useEffect(() => {
    const handleOpen = () => {
      setIsOpen(true);
      setSuccess(false);
      setErrorMsg(null);
    };
    window.addEventListener("open-site-visit", handleOpen);
    return () => window.removeEventListener("open-site-visit", handleOpen);
  }, []);

  // Turnstile Widget initialization
  useEffect(() => {
    if (isOpen && bookingMode === "native" && !success) {
      const checkTurnstile = setInterval(() => {
        if (window.turnstile) {
          clearInterval(checkTurnstile);
          try {
            window.turnstile.render("#turnstile-sitevisit", {
              sitekey: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "1x00000000000000000000AA",
              callback: (token: string) => setTurnstileToken(token),
            });
          } catch {
            // Already rendered
          }
        }
      }, 500);
      return () => clearInterval(checkTurnstile);
    }
  }, [isOpen, bookingMode, success]);

  // Prevent background body scroll when active
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  // Days in month calculation
  const calendarDays = useMemo(() => {
    const firstDayIndex = new Date(currentYear, currentMonth, 1).getDay();
    const totalDaysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    
    const days: { date: Date | null; isSelectable: boolean; isToday: boolean }[] = [];
    
    // Empty slots before 1st of month
    for (let i = 0; i < firstDayIndex; i++) {
      days.push({ date: null, isSelectable: false, isToday: false });
    }

    // Days of current month
    for (let d = 1; d <= totalDaysInMonth; d++) {
      const dayDate = new Date(currentYear, currentMonth, d);
      const isPast = dayDate < new Date(today.getFullYear(), today.getMonth(), today.getDate());
      const isSameDay = dayDate.toDateString() === today.toDateString();

      days.push({
        date: dayDate,
        isSelectable: !isPast,
        isToday: isSameDay
      });
    }

    return days;
  }, [currentMonth, currentYear, today]);

  const monthName = useMemo(() => {
    return new Date(currentYear, currentMonth).toLocaleString("default", { month: "long", year: "numeric" });
  }, [currentMonth, currentYear]);

  const handleMonthChange = (direction: "prev" | "next") => {
    if (direction === "prev") {
      if (currentMonth === 0) {
        setCurrentMonth(11);
        setCurrentYear((y) => y - 1);
      } else {
        setCurrentMonth((m) => m - 1);
      }
    } else {
      if (currentMonth === 11) {
        setCurrentMonth(0);
        setCurrentYear((y) => y + 1);
      } else {
        setCurrentMonth((m) => m + 1);
      }
    }
  };

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone) {
      setErrorMsg("Please fill in your name, email, and 10-digit phone number.");
      return;
    }
    if (!/^[6-9]\d{9}$/.test(phone)) {
      setErrorMsg("Please enter a valid 10-digit Indian phone number.");
      return;
    }

    setLoading(true);
    setErrorMsg(null);

    const formattedDate = selectedDate.toLocaleDateString("en-IN", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          message: `VIP Site Visit Tour requested for ${selectedProject} on ${formattedDate} at ${selectedTime}.${
            cabPickup ? ` Chauffeured Cab Pickup Requested at: ${pickupAddress}` : ""
          } Notes: ${notes}`,
          source: "site_visit",
          website: honeypot,
          turnstileToken,
          metadata: {
            visitDate: formattedDate,
            timeSlot: selectedTime,
            project: selectedProject,
            cabPickupRequested: cabPickup,
            pickupLocation: cabPickup ? pickupAddress : null,
          },
        }),
      });

      const resData = await response.json();
      if (resData.success) {
        setSuccess(true);
        if (typeof window !== "undefined" && window.gtag) {
          window.gtag("event", "site_visit_booked", {
            event_category: "leads",
            event_label: selectedProject,
          });
        }
      } else {
        setErrorMsg(resData.error || "Booking failed. Please try again.");
      }
    } catch {
      setErrorMsg("Network submission error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Google Calendar URL generator
  const googleCalendarUrl = useMemo(() => {
    if (!selectedDate) return "#";
    const startTimeStr = selectedTime;
    const [time, period] = startTimeStr.split(" ");
    const [hours, minutes] = time.split(":");
    let h = parseInt(hours, 10);
    if (period === "PM" && h < 12) h += 12;
    if (period === "AM" && h === 12) h = 0;

    const start = new Date(selectedDate);
    start.setHours(h, parseInt(minutes, 10), 0);
    const end = new Date(start);
    end.setHours(end.getHours() + 1);

    const formatISO = (d: Date) => d.toISOString().replace(/-|:|\.\d\d\d/g, "");

    const title = encodeURIComponent(`VIP Site Tour - ${selectedProject} (Prime Estates)`);
    const details = encodeURIComponent(`VIP Property Tour with Prime Estates Sales Executives.\nLocation: ${selectedProject}\nAddress: ${COMPANY.address}`);
    const location = encodeURIComponent(COMPANY.address);

    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${formatISO(start)}/${formatISO(end)}&details=${details}&location=${location}`;
  }, [selectedDate, selectedTime, selectedProject]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-primary/80 backdrop-blur-md"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="relative w-full max-w-4xl max-h-[90vh] glass-card rounded-3xl overflow-hidden flex flex-col shadow-2xl border border-border-accent/60 bg-white/95 backdrop-blur-xl font-sans"
          >
            {/* Modal Header */}
            <div className="p-5 sm:p-6 border-b border-border-accent bg-white flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center text-gold shadow-sm">
                  <CalendarIcon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-text-main uppercase tracking-wider text-sm font-headings">
                    VIP Site Visit Scheduler
                  </h3>
                  <p className="text-xs text-text-muted font-light mt-0.5">
                    Select a date, time slot, and vehicle preference for a private property walkthrough.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {/* Mode Switcher */}
                <div className="hidden sm:flex bg-primary/5 p-1 rounded-xl border border-border-accent text-xs font-bold">
                  <button
                    onClick={() => setBookingMode("native")}
                    className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer uppercase tracking-wider text-[10px] ${
                      bookingMode === "native" ? "bg-gold text-white shadow-sm" : "text-text-muted hover:text-text-main"
                    }`}
                  >
                    Direct Booking
                  </button>
                  <button
                    onClick={() => setBookingMode("calendly")}
                    className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer uppercase tracking-wider text-[10px] ${
                      bookingMode === "calendly" ? "bg-gold text-white shadow-sm" : "text-text-muted hover:text-text-main"
                    }`}
                  >
                    Calendly Sync
                  </button>
                </div>

                <button
                  onClick={() => setIsOpen(false)}
                  className="w-9 h-9 rounded-xl bg-primary/5 flex items-center justify-center text-text-muted hover:bg-red-50 hover:text-red-500 transition-colors cursor-pointer"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto p-5 sm:p-8">
              {bookingMode === "calendly" ? (
                <div className="w-full h-[550px] rounded-2xl overflow-hidden border border-border-accent">
                  <iframe
                    src={`${CONTACT_CONFIG.calendly.url}?embed_type=InlineEmbed&embed_domain=${encodeURIComponent(
                      typeof window !== "undefined" ? window.location.hostname : ""
                    )}&background_color=ffffff&text_color=1a1c1e&primary_color=c9a227`}
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    title="Calendly Site Visit Scheduler"
                  />
                </div>
              ) : success ? (
                /* Success Confirmation View */
                <div className="py-12 px-4 flex flex-col items-center justify-center text-center">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-600 mb-6 animate-bounce shadow-sm">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-gold font-sans">
                    TOUR RESERVATION CONFIRMED
                  </span>
                  <h3 className="text-2xl font-extrabold text-text-main font-headings uppercase mt-2">
                    Your VIP Site Tour is Scheduled!
                  </h3>
                  <p className="text-xs text-text-muted max-w-md mt-3 leading-relaxed font-light">
                    We have reserved your slot for <strong>{selectedProject}</strong> on{" "}
                    <strong>
                      {selectedDate.toLocaleDateString("en-IN", {
                        weekday: "long",
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </strong>{" "}
                    at <strong>{selectedTime}</strong>.
                  </p>

                  {cabPickup && (
                    <div className="mt-4 p-4 bg-gold/5 border border-gold/30 rounded-2xl max-w-md text-left text-xs flex items-start gap-3">
                      <Car className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-text-main block">Complimentary Cab Pickup Requested</span>
                        <span className="text-text-muted text-[11px] font-light">
                          Our driver will arrive at: &quot;{pickupAddress}&quot; 30 minutes prior to your time slot.
                        </span>
                      </div>
                    </div>
                  )}

                  <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
                    <a
                      href={googleCalendarUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3.5 bg-gold text-white rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-text-main transition-colors flex items-center gap-2 shadow-md"
                    >
                      <CalendarIcon className="w-4 h-4" />
                      Add to Google Calendar
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>

                    <button
                      onClick={() => {
                        setSuccess(false);
                        setName("");
                        setEmail("");
                        setPhone("");
                        setNotes("");
                      }}
                      className="px-6 py-3.5 bg-white border border-border-accent text-text-main rounded-xl font-bold text-xs uppercase tracking-wider hover:border-gold transition-colors"
                    >
                      Schedule Another Visit
                    </button>
                  </div>
                </div>
              ) : (
                /* Interactive Native Booking Form */
                <form onSubmit={handleBookingSubmit} className="space-y-8">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    
                    {/* Left Column: Interactive Calendar & Time Slots */}
                    <div className="lg:col-span-6 space-y-6">
                      
                      {/* Property Selection */}
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-text-muted flex items-center gap-1.5">
                          <Building2 className="w-3.5 h-3.5 text-gold" />
                          Select Project Residence
                        </label>
                        <select
                          value={selectedProject}
                          onChange={(e) => setSelectedProject(e.target.value)}
                          className="w-full px-4 py-3 bg-white border border-border-accent/80 rounded-xl text-text-main text-xs font-bold focus:outline-none focus:border-gold transition-all"
                        >
                          {PROJECTS.map((proj) => (
                            <option key={proj.slug} value={proj.title}>
                              {proj.title} ({proj.location})
                            </option>
                          ))}
                          <option value="General Portfolio Tour">General Portfolio VIP Tour (Hyderabad)</option>
                        </select>
                      </div>

                      {/* Interactive Custom Date Picker */}
                      <div className="bg-white border border-border-accent/80 rounded-2xl p-4 shadow-sm space-y-4">
                        <div className="flex items-center justify-between pb-2 border-b border-border-accent/40">
                          <span className="text-xs font-extrabold uppercase font-headings text-text-main">
                            {monthName}
                          </span>
                          <div className="flex items-center gap-1">
                            <button
                              type="button"
                              onClick={() => handleMonthChange("prev")}
                              className="p-1.5 rounded-lg hover:bg-primary/5 text-text-muted hover:text-text-main cursor-pointer"
                              aria-label="Previous month"
                            >
                              <ChevronLeft className="w-4 h-4" />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleMonthChange("next")}
                              className="p-1.5 rounded-lg hover:bg-primary/5 text-text-muted hover:text-text-main cursor-pointer"
                              aria-label="Next month"
                            >
                              <ChevronRight className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        {/* Weekday Labels */}
                        <div className="grid grid-cols-7 text-center text-[10px] font-bold text-text-muted uppercase tracking-wider">
                          <span>Sun</span>
                          <span>Mon</span>
                          <span>Tue</span>
                          <span>Wed</span>
                          <span>Thu</span>
                          <span>Fri</span>
                          <span>Sat</span>
                        </div>

                        {/* Calendar Day Grid */}
                        <div className="grid grid-cols-7 gap-1 text-center text-xs font-bold font-sans">
                          {calendarDays.map((item, idx) => {
                            if (!item.date) {
                              return <div key={`empty-${idx}`} className="h-9" />;
                            }
                            const isSelected = selectedDate.toDateString() === item.date.toDateString();

                            return (
                              <button
                                key={item.date.toISOString()}
                                type="button"
                                disabled={!item.isSelectable}
                                onClick={() => setSelectedDate(item.date!)}
                                className={`h-9 rounded-xl flex items-center justify-center transition-all cursor-pointer ${
                                  isSelected
                                    ? "bg-gold text-white font-extrabold shadow-md scale-105"
                                    : item.isSelectable
                                    ? "hover:bg-gold/10 hover:text-gold text-text-main"
                                    : "text-text-muted/30 cursor-not-allowed"
                                }`}
                              >
                                {item.date.getDate()}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Time Slot Picker */}
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-text-muted flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-gold" />
                          Select Preferred Time Slot
                        </label>
                        <div className="grid grid-cols-3 gap-2">
                          {TIME_SLOTS.map((slot) => (
                            <button
                              key={slot}
                              type="button"
                              onClick={() => setSelectedTime(slot)}
                              className={`py-2.5 px-3 rounded-xl border text-[11px] font-bold transition-all cursor-pointer ${
                                selectedTime === slot
                                  ? "bg-gold/10 border-gold text-gold shadow-xs"
                                  : "bg-white border-border-accent/80 text-text-muted hover:border-gold hover:text-gold"
                              }`}
                            >
                              {slot}
                            </button>
                          ))}
                        </div>
                      </div>

                    </div>

                    {/* Right Column: Guest Details & VIP Chauffeured Cab Option */}
                    <div className="lg:col-span-6 space-y-5 flex flex-col justify-between">
                      <div className="space-y-4">
                        
                        {/* Guest Name */}
                        <div className="flex flex-col space-y-1">
                          <label htmlFor="sitevisit-name" className="text-[10px] font-bold uppercase tracking-widest text-text-muted">
                            Full Name *
                          </label>
                          <input
                            type="text"
                            id="sitevisit-name"
                            required
                            placeholder="e.g. Anand Varma"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-4 py-3 bg-white border border-border-accent/80 rounded-xl text-text-main text-xs focus:outline-none focus:border-gold transition-all"
                          />
                        </div>

                        {/* Phone & Email */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="flex flex-col space-y-1">
                            <label htmlFor="sitevisit-phone" className="text-[10px] font-bold uppercase tracking-widest text-text-muted">
                              Phone Number *
                            </label>
                            <input
                              type="tel"
                              id="sitevisit-phone"
                              required
                              maxLength={10}
                              placeholder="10-digit mobile"
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                              className="w-full px-4 py-3 bg-white border border-border-accent/80 rounded-xl text-text-main text-xs focus:outline-none focus:border-gold transition-all"
                            />
                          </div>

                          <div className="flex flex-col space-y-1">
                            <label htmlFor="sitevisit-email" className="text-[10px] font-bold uppercase tracking-widest text-text-muted">
                              Email Address *
                            </label>
                            <input
                              type="email"
                              id="sitevisit-email"
                              required
                              placeholder="anand@gmail.com"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              className="w-full px-4 py-3 bg-white border border-border-accent/80 rounded-xl text-text-main text-xs focus:outline-none focus:border-gold transition-all"
                            />
                          </div>
                        </div>

                        {/* VIP Cab Pickup Switch */}
                        <div className="p-4 bg-white border border-border-accent/80 rounded-2xl space-y-3 shadow-xs">
                          <div className="flex items-center justify-between cursor-pointer" onClick={() => setCabPickup(!cabPickup)}>
                            <div className="flex items-center gap-2.5">
                              <div className="w-8 h-8 rounded-lg bg-gold/10 flex items-center justify-center text-gold shrink-0">
                                <Car className="w-4 h-4" />
                              </div>
                              <div>
                                <span className="text-xs font-bold text-text-main block">VIP Cab Pickup Service</span>
                                <span className="text-[10px] text-text-muted font-light block">Complimentary AC door-to-door transport</span>
                              </div>
                            </div>
                            <input
                              type="checkbox"
                              checked={cabPickup}
                              onChange={(e) => setCabPickup(e.target.checked)}
                              className="w-4 h-4 accent-gold cursor-pointer"
                            />
                          </div>

                          {cabPickup && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              className="pt-2 border-t border-border-accent/40"
                            >
                              <label htmlFor="sitevisit-pickup" className="text-[10px] font-bold uppercase tracking-widest text-text-muted block mb-1">
                                Pickup & Drop Address
                              </label>
                              <input
                                type="text"
                                id="sitevisit-pickup"
                                placeholder="Enter home or office address in Hyderabad..."
                                value={pickupAddress}
                                onChange={(e) => setPickupAddress(e.target.value)}
                                className="w-full px-3 py-2.5 bg-primary/5 border border-border-accent/60 rounded-lg text-text-main text-xs focus:outline-none focus:border-gold"
                              />
                            </motion.div>
                          )}
                        </div>

                        {/* Special Requirements */}
                        <div className="flex flex-col space-y-1">
                          <label htmlFor="sitevisit-notes" className="text-[10px] font-bold uppercase tracking-widest text-text-muted">
                            Special Requests / Vastu Preferences
                          </label>
                          <textarea
                            id="sitevisit-notes"
                            rows={2}
                            placeholder="e.g., Looking for East-facing 3BHK above 10th floor..."
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            className="w-full px-4 py-2.5 bg-white border border-border-accent/80 rounded-xl text-text-main text-xs focus:outline-none focus:border-gold transition-all resize-none"
                          />
                        </div>

                        {/* Honeypot anti-spam */}
                        <div className="hidden" aria-hidden="true">
                          <input
                            type="text"
                            name="website"
                            value={honeypot}
                            onChange={(e) => setHoneypot(e.target.value)}
                            tabIndex={-1}
                            autoComplete="off"
                          />
                        </div>

                        {/* Cloudflare Turnstile Check */}
                        <div className="flex justify-center py-1">
                          <div id="turnstile-sitevisit"></div>
                        </div>

                        {errorMsg && (
                          <div className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-xl text-xs font-medium">
                            {errorMsg}
                          </div>
                        )}
                      </div>

                      {/* Submit CTA */}
                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-4 bg-gold text-white rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-text-main transition-all shadow-md hover:shadow-gold/10 flex items-center justify-center gap-2 cursor-pointer mt-4"
                      >
                        {loading ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Confirming Tour Reservation...
                          </>
                        ) : (
                          <>
                            <ShieldCheck className="w-4 h-4" />
                            Confirm VIP Site Visit Reservation
                          </>
                        )}
                      </button>

                    </div>

                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
