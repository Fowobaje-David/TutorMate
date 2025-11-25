import { useState } from 'react';
import { Star, BookOpen, ChevronLeft, Calendar as CalendarIcon, Clock, MessageSquare, Bookmark, Eye, CheckCircle2, TrendingUp, Users, Video, Award, Zap, Shield } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { ReviewCard } from '../ReviewCard';
import { mockTutors, mockReviews } from '../../lib/mockData';
import { Calendar } from '../ui/calendar';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Progress } from '../ui/progress';

interface TutorProfilePageProps {
  tutorId: string;
  onNavigate: (page: string, data?: any) => void;
  onBack: () => void;
}

export function TutorProfilePage({ tutorId, onNavigate, onBack }: TutorProfilePageProps) {
  const tutor = mockTutors.find((t) => t.id === tutorId);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [isSaved, setIsSaved] = useState(false);
  const [selectedTab, setSelectedTab] = useState('overview');

  if (!tutor) {
    return <div>Tutor not found</div>;
  }

  const availableDates = tutor.availability.map((a) => new Date(a.date));
  const selectedAvailability = tutor.availability.find(
    (a) => new Date(a.date).toDateString() === selectedDate?.toDateString()
  );

  const handleSave = () => {
    setIsSaved(!isSaved);
    toast.success(isSaved ? 'Tutor removed from favorites' : 'Tutor saved to favorites!');
  };

  const handleViewAllReviews = () => {
    toast.info('Viewing all reviews for ' + tutor.name);
  };

  // Calculate rating distribution for display
  const ratingDistribution = [
    { stars: 5, percentage: 75, count: 95 },
    { stars: 4, percentage: 18, count: 23 },
    { stars: 3, percentage: 5, count: 6 },
    { stars: 2, percentage: 2, count: 3 },
    { stars: 1, percentage: 0, count: 0 },
  ];

  return (
    <div className="min-h-screen bg-secondary">
      <div className="mx-auto max-w-[1366px] px-8 py-8">
        <button
          onClick={onBack}
          className="mb-6 flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <ChevronLeft className="h-4 w-4" />
          Back to tutors
        </button>

        <div className="flex gap-8">
          {/* Left Column - Profile Info */}
          <div className="flex-1 space-y-6">
            {/* Profile Header */}
            <div className="rounded-lg border border-border bg-white p-8">
              <div className="flex gap-6">
                <div className="relative">
                  <img
                    src={tutor.avatar}
                    alt={tutor.name}
                    className="h-28 w-28 rounded-full object-cover ring-4 ring-secondary"
                  />
                  <div className="absolute -bottom-2 -right-2 rounded-full bg-green-500 p-2 border-4 border-white">
                    <CheckCircle2 className="h-5 w-5 text-white" />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h1 className="text-[28px] font-[600] text-primary">{tutor.name}</h1>
                        <Badge variant="secondary" className="bg-accent/10 text-accent border-accent/20">
                          <Shield className="h-3 w-3 mr-1" />
                          Verified
                        </Badge>
                      </div>
                      <p className="text-[14px] text-muted-foreground">{tutor.level} • {tutor.department}</p>
                    </div>
                  </div>

                  {/* Stats Row */}
                  <div className="grid grid-cols-4 gap-4 mt-6">
                    <div className="text-center p-3 rounded-lg bg-secondary/50">
                      <div className="flex items-center justify-center gap-1 mb-1">
                        <Star className="h-4 w-4 fill-accent text-accent" />
                        <span className="font-[600] text-foreground">{tutor.rating}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">{tutor.reviewCount} reviews</p>
                    </div>
                    <div className="text-center p-3 rounded-lg bg-secondary/50">
                      <div className="flex items-center justify-center gap-1 mb-1">
                        <BookOpen className="h-4 w-4 text-primary" />
                        <span className="font-[600] text-foreground">{tutor.totalSessions}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">Sessions</p>
                    </div>
                    <div className="text-center p-3 rounded-lg bg-secondary/50">
                      <div className="flex items-center justify-center gap-1 mb-1">
                        <Users className="h-4 w-4 text-primary" />
                        <span className="font-[600] text-foreground">98%</span>
                      </div>
                      <p className="text-xs text-muted-foreground">Response Rate</p>
                    </div>
                    <div className="text-center p-3 rounded-lg bg-secondary/50">
                      <div className="flex items-center justify-center gap-1 mb-1">
                        <Zap className="h-4 w-4 text-primary" />
                        <span className="font-[600] text-foreground">&lt;1hr</span>
                      </div>
                      <p className="text-xs text-muted-foreground">Avg Response</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tabs for organized content */}
            <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
              <TabsList className="w-full grid grid-cols-3 mb-6">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="reviews">Reviews ({tutor.reviewCount})</TabsTrigger>
                <TabsTrigger value="availability">Availability</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                {/* About */}
                <div className="rounded-lg border border-border bg-white p-8">
                  <h2 className="mb-4 font-[600] text-primary flex items-center gap-2">
                    <BookOpen className="h-5 w-5" />
                    About
                  </h2>
                  <p className="text-foreground leading-relaxed">{tutor.bio}</p>
                </div>

                {/* Skills */}
                <div className="rounded-lg border border-border bg-white p-8">
                  <h2 className="mb-4 font-[600] text-primary flex items-center gap-2">
                    <Award className="h-5 w-5" />
                    Skills & Expertise
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {tutor.skills.map((skill) => (
                      <Badge key={skill} variant="secondary" className="px-4 py-2 text-sm">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Teaching Approach */}
                <div className="rounded-lg border border-border bg-white p-8">
                  <h2 className="mb-4 font-[600] text-primary flex items-center gap-2">
                    <Video className="h-5 w-5" />
                    Teaching Approach
                  </h2>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                      <div>
                        <p className="font-medium">Interactive Sessions</p>
                        <p className="text-sm text-muted-foreground">Hands-on coding exercises and real-world examples</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                      <div>
                        <p className="font-medium">Personalized Learning</p>
                        <p className="text-sm text-muted-foreground">Customized lesson plans based on your pace and goals</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                      <div>
                        <p className="font-medium">Post-Session Support</p>
                        <p className="text-sm text-muted-foreground">Session recordings and additional resources provided</p>
                      </div>
                    </li>
                  </ul>
                </div>

                {/* Recent Reviews Preview */}
                <div className="rounded-lg border border-border bg-white p-8">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="font-[600] text-primary">Recent Reviews</h2>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedTab('reviews')}
                      className="text-primary"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      View All
                    </Button>
                  </div>
                  <div className="space-y-4">
                    {mockReviews.slice(0, 2).map((review) => (
                      <ReviewCard key={review.id} review={review} />
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="reviews" className="space-y-6">
                {/* Rating Summary */}
                <div className="rounded-lg border border-border bg-white p-8">
                  <h2 className="mb-6 font-[600] text-primary">Student Reviews</h2>
                  <div className="grid grid-cols-2 gap-8">
                    <div className="text-center">
                      <div className="text-5xl font-[600] text-primary mb-2">{tutor.rating}</div>
                      <div className="flex items-center justify-center gap-1 mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-5 w-5 fill-accent text-accent" />
                        ))}
                      </div>
                      <p className="text-sm text-muted-foreground">{tutor.reviewCount} reviews</p>
                    </div>
                    <div className="space-y-2">
                      {ratingDistribution.map((rating) => (
                        <div key={rating.stars} className="flex items-center gap-3">
                          <span className="text-sm text-muted-foreground w-8">{rating.stars}★</span>
                          <Progress value={rating.percentage} className="flex-1 h-2" />
                          <span className="text-sm text-muted-foreground w-8">{rating.count}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* All Reviews */}
                <div className="rounded-lg border border-border bg-white p-8">
                  <div className="space-y-4">
                    {mockReviews.map((review) => (
                      <ReviewCard key={review.id} review={review} />
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="availability" className="space-y-6">
                <div className="rounded-lg border border-border bg-white p-8">
                  <h2 className="mb-6 font-[600] text-primary">Weekly Availability</h2>
                  <div className="grid grid-cols-7 gap-4">
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, idx) => (
                      <div key={day} className="text-center">
                        <div className="text-sm font-medium text-muted-foreground mb-2">{day}</div>
                        <div className="space-y-1">
                          {idx < 5 ? (
                            <>
                              <div className="text-xs bg-green-50 text-green-700 py-1 px-2 rounded">9AM-12PM</div>
                              <div className="text-xs bg-green-50 text-green-700 py-1 px-2 rounded">2PM-5PM</div>
                            </>
                          ) : (
                            <div className="text-xs bg-secondary text-muted-foreground py-1 px-2 rounded">Unavailable</div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground mt-6 text-center">
                    All times are in West Africa Time (WAT). Select a date on the booking panel to view available slots.
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Column - Booking Panel */}
          <div className="w-[380px]">
            <div className="sticky top-8 space-y-4">
              <div className="rounded-lg border border-border bg-white p-6">
                <div className="mb-6 flex items-baseline justify-between">
                  <div>
                    <div className="text-sm text-muted-foreground">Hourly Rate</div>
                    <div className="text-[28px] font-[600] text-primary">₦{tutor.hourlyRate}</div>
                    <div className="text-xs text-muted-foreground">per hour</div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 mb-1">
                      <Star className="h-5 w-5 fill-accent text-accent" />
                      <span className="text-xl font-[600]">{tutor.rating}</span>
                    </div>
                    <div className="text-xs text-muted-foreground">{tutor.reviewCount} reviews</div>
                  </div>
                </div>

                <div className="mb-4">
                  <h3 className="mb-3 font-[600] text-primary">Select Date</h3>
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    className="rounded-md border"
                    disabled={(date) => {
                      return !availableDates.some(
                        (d) => d.toDateString() === date.toDateString()
                      );
                    }}
                  />
                </div>

                {selectedAvailability && (
                  <div className="mb-6">
                    <h3 className="mb-3 font-[600] text-primary">Available Times</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {selectedAvailability.times.map((time) => (
                        <button
                          key={time}
                          onClick={() => onNavigate('booking', { tutorId: tutor.id })}
                          className="rounded-md border border-border bg-secondary/50 px-3 py-2 text-sm hover:border-primary hover:bg-primary hover:text-white transition-colors"
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <Button
                  onClick={() => onNavigate('booking', { tutorId: tutor.id })}
                  className="w-full bg-primary hover:bg-primary/90 h-12"
                  size="lg"
                >
                  <CalendarIcon className="w-4 h-4 mr-2" />
                  Book Session
                </Button>

                <div className="grid grid-cols-2 gap-2 mt-3">
                  <Button
                    variant="outline"
                    onClick={() => onNavigate('messages')}
                  >
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Message
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleSave}
                  >
                    <Bookmark className={`w-4 h-4 mr-2 ${isSaved ? 'fill-primary' : ''}`} />
                    {isSaved ? 'Saved' : 'Save'}
                  </Button>
                </div>
              </div>

              {/* Session Packages */}
              <div className="rounded-lg border border-border bg-white p-6">
                <h3 className="mb-4 font-[600] text-primary">Session Packages</h3>
                <div className="space-y-3">
                  <div className="p-3 rounded-lg border border-border hover:border-primary hover:bg-primary/5 cursor-pointer transition-colors">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium">5 Sessions</span>
                      <span className="text-sm text-green-600">Save 10%</span>
                    </div>
                    <div className="text-sm text-muted-foreground">₦{tutor.hourlyRate * 5 * 0.9} total</div>
                  </div>
                  <div className="p-3 rounded-lg border border-border hover:border-primary hover:bg-primary/5 cursor-pointer transition-colors">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium">10 Sessions</span>
                      <span className="text-sm text-green-600">Save 15%</span>
                    </div>
                    <div className="text-sm text-muted-foreground">₦{tutor.hourlyRate * 10 * 0.85} total</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}