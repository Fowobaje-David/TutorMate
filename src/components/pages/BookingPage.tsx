import { useState } from 'react';
import { Calendar, Clock, CreditCard, CheckCircle, ChevronLeft, Video } from 'lucide-react';
import { Button } from '../ui/button';
import { mockTutors } from '../../lib/mockData';
import { Badge } from '../ui/badge';

interface BookingPageProps {
  tutorId: string;
  onNavigate: (page: string) => void;
  onBack: () => void;
}

export function BookingPage({ tutorId, onNavigate, onBack }: BookingPageProps) {
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState('2025-11-26');
  const [selectedTime, setSelectedTime] = useState('2:00 PM');

  const tutor = mockTutors.find((t) => t.id === tutorId);

  if (!tutor) {
    return <div>Tutor not found</div>;
  }

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="mb-2 font-semibold">Select Date & Time</h2>
              <p className="text-muted-foreground">
                Choose your preferred date and time for the session
              </p>
            </div>

            <div className="rounded-lg border border-border bg-white p-6">
              <h3 className="mb-4 font-medium">Available Dates</h3>
              <div className="grid grid-cols-3 gap-3">
                {tutor.availability.map((avail) => (
                  <button
                    key={avail.date}
                    onClick={() => setSelectedDate(avail.date)}
                    className={`rounded-lg border p-4 text-center transition-colors ${
                      selectedDate === avail.date
                        ? 'border-primary bg-primary text-white'
                        : 'border-border bg-secondary/50 hover:border-primary'
                    }`}
                  >
                    <div className="text-sm">
                      {new Date(avail.date).toLocaleDateString('en-US', {
                        weekday: 'short',
                      })}
                    </div>
                    <div className="font-medium">
                      {new Date(avail.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                      })}
                    </div>
                  </button>
                ))}
              </div>

              <h3 className="mb-4 mt-6 font-medium">Available Times</h3>
              <div className="grid grid-cols-4 gap-3">
                {tutor.availability
                  .find((a) => a.date === selectedDate)
                  ?.times.map((time) => (
                    <button
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      className={`rounded-lg border px-4 py-3 text-sm transition-colors ${
                        selectedTime === time
                          ? 'border-primary bg-primary text-white'
                          : 'border-border bg-secondary/50 hover:border-primary'
                      }`}
                    >
                      {time}
                    </button>
                  ))}
              </div>
            </div>

            <div className="flex justify-end">
              <Button onClick={() => setStep(2)} className="bg-primary hover:bg-primary/90">
                Continue
              </Button>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="mb-2 font-semibold">Review Details</h2>
              <p className="text-muted-foreground">
                Please review your booking information
              </p>
            </div>

            <div className="rounded-lg border border-border bg-white p-6">
              <div className="mb-6 flex items-start gap-4 border-b border-border pb-6">
                <img
                  src={tutor.avatar}
                  alt={tutor.name}
                  className="h-16 w-16 rounded-full object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-semibold">{tutor.name}</h3>
                  <p className="text-sm text-muted-foreground">{tutor.department}</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {tutor.skills.slice(0, 3).map((skill) => (
                      <Badge key={skill} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <div className="text-sm text-muted-foreground">Date</div>
                    <div className="font-medium">
                      {new Date(selectedDate).toLocaleDateString('en-US', {
                        weekday: 'long',
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <div className="text-sm text-muted-foreground">Time</div>
                    <div className="font-medium">{selectedTime}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Video className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <div className="text-sm text-muted-foreground">Session Type</div>
                    <div className="font-medium">Online (Video Call)</div>
                  </div>
                </div>
              </div>

              <div className="mt-6 border-t border-border pt-6">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Session Fee (1 hour)</span>
                  <span className="font-semibold">₦{tutor.hourlyRate}</span>
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <span className="font-medium">Total</span>
                  <span className="font-semibold text-primary">₦{tutor.hourlyRate}</span>
                </div>
              </div>
            </div>

            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setStep(1)}>
                Back
              </Button>
              <Button onClick={() => setStep(3)} className="bg-primary hover:bg-primary/90">
                Proceed to Payment
              </Button>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="mb-2 font-semibold">Payment</h2>
              <p className="text-muted-foreground">
                Complete your booking by confirming payment
              </p>
            </div>

            <div className="rounded-lg border border-border bg-white p-6">
              <div className="mb-6 rounded-lg bg-secondary/50 p-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Amount to Pay</span>
                  <span className="font-semibold text-primary">₦{tutor.hourlyRate}</span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  Payment will be processed from your TutorMate wallet
                </p>
              </div>

              <div className="mb-4 flex items-center gap-3 text-muted-foreground">
                <CreditCard className="h-5 w-5" />
                <span>Current Balance: ₦{150 * tutor.hourlyRate}.00</span>
              </div>

              <p className="text-sm text-muted-foreground">
                By confirming, you agree to TutorMate's cancellation and refund policy.
              </p>
            </div>

            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setStep(2)}>
                Back
              </Button>
              <Button onClick={() => setStep(4)} className="bg-primary hover:bg-primary/90">
                Confirm Booking
              </Button>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="mb-4 flex justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
              </div>
              <h2 className="mb-2 font-semibold">Booking Confirmed!</h2>
              <p className="text-muted-foreground">
                Your session has been scheduled successfully
              </p>
            </div>

            <div className="rounded-lg border border-border bg-white p-6">
              <h3 className="mb-4 font-medium">Session Details</h3>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <img
                    src={tutor.avatar}
                    alt={tutor.name}
                    className="h-12 w-12 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-medium">{tutor.name}</div>
                    <div className="text-sm text-muted-foreground">{tutor.department}</div>
                  </div>
                </div>

                <div className="border-t border-border pt-4">
                  <div className="mb-2 flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">
                      {new Date(selectedDate).toLocaleDateString('en-US', {
                        weekday: 'long',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{selectedTime}</span>
                  </div>
                </div>

                <div className="rounded-lg bg-accent/10 p-4">
                  <div className="mb-2 flex items-center gap-2">
                    <Video className="h-4 w-4 text-accent-foreground" />
                    <span className="font-medium">Meeting Link</span>
                  </div>
                  <a
                    href="#"
                    className="text-sm text-primary hover:underline"
                  >
                    https://meet.tutormate.com/session-abc123
                  </a>
                  <p className="mt-2 text-xs text-muted-foreground">
                    Link will be activated 10 minutes before the session
                  </p>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => onNavigate('calendar')}
                className="flex-1"
              >
                View Calendar
              </Button>
              <Button
                onClick={() => onNavigate('dashboard')}
                className="flex-1 bg-primary hover:bg-primary/90"
              >
                Back to Home
              </Button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-secondary">
      <div className="mx-auto max-w-[1366px] px-20 py-8">
        {step < 4 && (
          <button
            onClick={onBack}
            className="mb-6 flex items-center gap-2 text-muted-foreground hover:text-foreground"
          >
            <ChevronLeft className="h-4 w-4" />
            Back
          </button>
        )}

        <div className="mx-auto max-w-[800px]">
          {/* Progress Steps */}
          {step < 4 && (
            <div className="mb-8 flex items-center justify-center gap-2">
              {[1, 2, 3].map((s) => (
                <div key={s} className="flex items-center">
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-full ${
                      s === step
                        ? 'bg-primary text-white'
                        : s < step
                        ? 'bg-accent text-accent-foreground'
                        : 'bg-secondary text-muted-foreground'
                    }`}
                  >
                    {s}
                  </div>
                  {s < 3 && (
                    <div
                      className={`h-0.5 w-16 ${
                        s < step ? 'bg-accent' : 'bg-secondary'
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          )}

          {renderStep()}
        </div>
      </div>
    </div>
  );
}