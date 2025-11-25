import { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Clock, Video } from 'lucide-react';
import { Button } from '../ui/button';
import { mockSessions } from '../../lib/mockData';

interface CalendarPageProps {
  onNavigate: (page: string) => void;
}

export function CalendarPage({ onNavigate }: CalendarPageProps) {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 10, 24)); // November 24, 2025
  const [view, setView] = useState<'week' | 'month'>('month');
  const [selectedSession, setSelectedSession] = useState<typeof mockSessions[0] | null>(null);

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days: (Date | null)[] = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    // Add all days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }

    return days;
  };

  const getSessionsForDate = (date: Date | null) => {
    if (!date) return [];
    return mockSessions.filter((session) => {
      const sessionDate = new Date(session.date);
      return sessionDate.toDateString() === date.toDateString();
    });
  };

  const days = getDaysInMonth(currentDate);
  const monthName = currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const handleToday = () => {
    setCurrentDate(new Date(2025, 10, 24));
  };

  return (
    <div className="min-h-screen bg-secondary">
      <div className="mx-auto max-w-[1366px] px-20 py-8">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="font-semibold">My Calendar</h1>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={handleToday}
            >
              Today
            </Button>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handlePrevMonth}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="min-w-[200px] text-center font-medium">{monthName}</span>
              <Button
                variant="outline"
                size="sm"
                onClick={handleNextMonth}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex rounded-lg border border-border bg-white">
              <button
                onClick={() => setView('week')}
                className={`px-4 py-2 text-sm ${
                  view === 'week'
                    ? 'bg-primary text-white rounded-l-lg'
                    : 'text-muted-foreground hover:bg-secondary'
                }`}
              >
                Week
              </button>
              <button
                onClick={() => setView('month')}
                className={`px-4 py-2 text-sm ${
                  view === 'month'
                    ? 'bg-primary text-white rounded-r-lg'
                    : 'text-muted-foreground hover:bg-secondary'
                }`}
              >
                Month
              </button>
            </div>
          </div>
        </div>

        <div className="flex gap-6">
          {/* Calendar Grid */}
          <div className="flex-1">
            <div className="rounded-lg border border-border bg-white overflow-hidden">
              {/* Day Headers */}
              <div className="grid grid-cols-7 border-b border-border bg-secondary/50">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                  <div key={day} className="p-3 text-center text-sm font-medium text-muted-foreground">
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar Days */}
              <div className="grid grid-cols-7">
                {days.map((day, index) => {
                  const sessions = getSessionsForDate(day);
                  const isToday = day?.toDateString() === new Date(2025, 10, 24).toDateString();

                  return (
                    <div
                      key={index}
                      className={`min-h-[120px] border-b border-r border-border p-2 ${
                        !day ? 'bg-secondary/20' : 'bg-white hover:bg-secondary/30'
                      } ${index % 7 === 6 ? 'border-r-0' : ''}`}
                    >
                      {day && (
                        <>
                          <div
                            className={`mb-2 flex h-7 w-7 items-center justify-center rounded-full text-sm ${
                              isToday
                                ? 'bg-primary text-white font-medium'
                                : 'text-foreground'
                            }`}
                          >
                            {day.getDate()}
                          </div>
                          <div className="space-y-1">
                            {sessions.map((session) => (
                              <button
                                key={session.id}
                                onClick={() => setSelectedSession(session)}
                                className={`w-full rounded px-2 py-1 text-left text-xs hover:opacity-80 ${
                                  session.status === 'upcoming'
                                    ? 'bg-blue-100 text-blue-800'
                                    : session.status === 'completed'
                                    ? 'bg-green-100 text-green-800'
                                    : 'bg-gray-100 text-gray-800'
                                }`}
                              >
                                <div className="font-medium truncate">{session.subject}</div>
                                <div className="truncate">{session.time}</div>
                              </button>
                            ))}
                          </div>
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Session Details Sidebar */}
          {selectedSession && (
            <div className="w-[320px]">
              <div className="rounded-lg border border-border bg-white p-6">
                <h3 className="mb-4 font-semibold">Session Details</h3>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <img
                      src={selectedSession.tutorAvatar}
                      alt={selectedSession.tutorName}
                      className="h-12 w-12 rounded-full object-cover"
                    />
                    <div>
                      <div className="font-medium">{selectedSession.tutorName}</div>
                      <div className="text-sm text-muted-foreground">{selectedSession.subject}</div>
                    </div>
                  </div>

                  <div className="space-y-2 border-t border-border pt-4">
                    <div className="flex items-center gap-2 text-sm">
                      <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                      <span>
                        {new Date(selectedSession.date).toLocaleDateString('en-US', {
                          weekday: 'long',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>{selectedSession.time} ({selectedSession.duration})</span>
                    </div>
                  </div>

                  {selectedSession.status === 'upcoming' && selectedSession.meetingLink && (
                    <div className="rounded-lg border border-border bg-secondary/50 p-4">
                      <div className="mb-2 flex items-center gap-2">
                        <Video className="h-4 w-4" />
                        <span className="font-medium text-sm">Meeting Link</span>
                      </div>
                      <a
                        href={selectedSession.meetingLink}
                        className="text-sm text-primary hover:underline break-all"
                      >
                        {selectedSession.meetingLink}
                      </a>
                    </div>
                  )}

                  {selectedSession.status === 'upcoming' && (
                    <div className="space-y-2 pt-2">
                      <Button className="w-full bg-primary hover:bg-primary/90">
                        Join Session
                      </Button>
                      <Button variant="outline" className="w-full">
                        Reschedule
                      </Button>
                      <Button variant="ghost" className="w-full text-destructive hover:bg-destructive/10">
                        Cancel Session
                      </Button>
                    </div>
                  )}

                  {selectedSession.status === 'completed' && (
                    <Button variant="outline" className="w-full">
                      Leave a Review
                    </Button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
