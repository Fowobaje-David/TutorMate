import { Search, Shield, Star, Users, ArrowRight, TrendingUp, BookOpen, Calendar, Play } from 'lucide-react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { mockTutors, mockGroupClasses } from '../../lib/mockData';
import { useState } from 'react';

interface DashboardPageProps {
  onNavigate: (page: string, data?: any) => void;
}

export function DashboardPage({ onNavigate }: DashboardPageProps) {
  const [searchQuery, setSearchQuery] = useState('');

  // Research-driven skill categories based on survey
  const popularSkills = [
    'Java',
    'Calculus',
    'C++',
    'CSC Courses',
    'Web Development',
    'Financial Modelling',
    'Linear Algebra',
    'AI & Machine Learning',
  ];

  const topRatedTutors = mockTutors.filter((t) => t.rating >= 4.8).slice(0, 4);
  const verifiedTutors = mockTutors.slice(0, 4);
  const groupClasses = mockGroupClasses.slice(0, 3);

  const handleSearch = () => {
    onNavigate('tutors');
  };

  const handleSkillClick = (skill: string) => {
    onNavigate('tutors');
  };

  return (
    <div className="min-h-screen bg-[#FAFBFC]">
      {/* Hero Section with subtle background pattern */}
      <div className="relative border-b border-[#E5E7EB] bg-white">
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px]" />
        
        <div className="relative mx-auto max-w-[1200px] px-8 py-20">
          <div className="mx-auto max-w-[720px] text-center">
            <h1 className="mb-4 text-[48px] font-[600] text-primary leading-[1.1] tracking-tight">
              Find a Reliable CU Tutor
            </h1>
            <p className="mb-10 text-[18px] text-[#6B7280] leading-relaxed">
              Connect with verified peer tutors across all departments at Covenant University
            </p>

            {/* Premium Search Bar with liquid glass effect */}
            <div className="relative mx-auto max-w-[600px]">
              <div className="rounded-xl border border-[#E5E7EB] bg-white/80 backdrop-blur-sm p-2 shadow-sm hover:shadow-md transition-shadow">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#9CA3AF]" />
                  <Input
                    type="text"
                    placeholder="Search by subject, skill, or tutor name..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                    onClick={handleSearch}
                    className="h-12 border-0 bg-transparent pl-12 pr-28 text-[15px] placeholder:text-[#9CA3AF] focus-visible:ring-0 cursor-pointer"
                  />
                  <Button
                    onClick={handleSearch}
                    className="absolute right-1 top-1/2 -translate-y-1/2 h-10 px-6 bg-primary hover:bg-primary/90 text-white rounded-lg shadow-sm"
                  >
                    Search
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1200px] px-8">
        {/* Stats Panel with liquid glass effect */}
        <div className="relative -mt-10 mb-16">
          <div className="rounded-xl border border-[#E5E7EB] bg-white/60 backdrop-blur-md p-8 shadow-sm">
            <div className="grid grid-cols-4 gap-8">
              <div className="text-center">
                <div className="mb-2 text-[32px] font-[600] text-primary">500+</div>
                <div className="text-[14px] text-[#6B7280]">Active Tutors</div>
              </div>
              <div className="text-center">
                <div className="mb-2 text-[32px] font-[600] text-primary">4.8</div>
                <div className="text-[14px] text-[#6B7280]">Average Rating</div>
              </div>
              <div className="text-center">
                <div className="mb-2 text-[32px] font-[600] text-primary">10k+</div>
                <div className="text-[14px] text-[#6B7280]">Sessions Completed</div>
              </div>
              <div className="text-center">
                <div className="mb-2 text-[32px] font-[600] text-primary">₦15-50</div>
                <div className="text-[14px] text-[#6B7280]">Per Hour Rate</div>
              </div>
            </div>
          </div>
        </div>

        {/* Popular Skills Section */}
        <div className="mb-16">
          <div className="mb-6">
            <h2 className="mb-2 text-[24px] font-[600] text-primary tracking-tight">Popular Skills</h2>
            <p className="text-[15px] text-[#6B7280]">Most in-demand courses at CU</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {popularSkills.map((skill) => (
              <button
                key={skill}
                onClick={() => handleSkillClick(skill)}
                className="rounded-lg border border-[#E5E7EB] bg-white px-4 py-2 text-[14px] font-[500] text-[#374151] hover:border-primary hover:bg-primary/5 hover:text-primary transition-all duration-150"
              >
                {skill}
              </button>
            ))}
          </div>
        </div>

        {/* Top Rated Tutors Section */}
        <div className="mb-16">
          <div className="mb-6 flex items-end justify-between">
            <div>
              <h2 className="mb-2 text-[24px] font-[600] text-primary tracking-tight flex items-center gap-2">
                <Star className="h-5 w-5 text-accent fill-accent" />
                Top Rated Tutors
              </h2>
              <p className="text-[15px] text-[#6B7280]">Highest rated tutors this month</p>
            </div>
            <Button
              variant="ghost"
              onClick={() => onNavigate('tutors')}
              className="text-primary hover:text-primary/80 hover:bg-transparent"
            >
              View all <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          <div className="grid grid-cols-4 gap-6">
            {topRatedTutors.map((tutor) => (
              <Card 
                key={tutor.id} 
                className="group overflow-hidden border border-[#E5E7EB] bg-white p-0 shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-200 cursor-pointer"
                onClick={() => onNavigate('tutor-profile', { tutorId: tutor.id })}
              >
                <div className="p-5">
                  <div className="mb-4 flex items-start gap-3">
                    <img
                      src={tutor.avatar}
                      alt={tutor.name}
                      className="h-14 w-14 rounded-lg object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="mb-1 text-[15px] font-[600] text-foreground group-hover:text-primary transition-colors truncate">
                        {tutor.name}
                      </h3>
                      <p className="text-[13px] text-[#6B7280] truncate">{tutor.level}</p>
                      <p className="text-[13px] text-[#9CA3AF] truncate">{tutor.department}</p>
                    </div>
                  </div>

                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <Star className="h-3.5 w-3.5 fill-accent text-accent" />
                      <span className="text-[14px] font-[600]">{tutor.rating}</span>
                      <span className="text-[13px] text-[#9CA3AF]">({tutor.reviewCount})</span>
                    </div>
                    <div className="text-[15px] font-[600] text-primary">₦{tutor.hourlyRate}/hr</div>
                  </div>

                  <div className="mb-4 flex flex-wrap gap-1.5">
                    {tutor.skills.slice(0, 2).map((skill) => (
                      <span
                        key={skill}
                        className="rounded-md bg-secondary px-2 py-1 text-[12px] font-[500] text-[#6B7280]"
                      >
                        {skill}
                      </span>
                    ))}
                    {tutor.skills.length > 2 && (
                      <span className="rounded-md bg-secondary px-2 py-1 text-[12px] font-[500] text-accent">
                        +{tutor.skills.length - 2}
                      </span>
                    )}
                  </div>

                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      onNavigate('tutor-profile', { tutorId: tutor.id });
                    }}
                    className="w-full bg-primary hover:bg-primary/90 text-white h-9 text-[14px] font-[500]"
                  >
                    View Profile
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Verified CU Tutors Section */}
        <div className="mb-16">
          <div className="mb-6 flex items-end justify-between">
            <div>
              <h2 className="mb-2 text-[24px] font-[600] text-primary tracking-tight flex items-center gap-2">
                <Shield className="h-5 w-5 text-accent" />
                Verified CU Tutors
              </h2>
              <p className="text-[15px] text-[#6B7280]">All tutors verified by university credentials</p>
            </div>
            <Button
              variant="ghost"
              onClick={() => onNavigate('tutors')}
              className="text-primary hover:text-primary/80 hover:bg-transparent"
            >
              View all <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          <div className="grid grid-cols-4 gap-6">
            {verifiedTutors.map((tutor) => (
              <Card 
                key={tutor.id} 
                className="group overflow-hidden border border-[#E5E7EB] bg-white p-0 shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-200 cursor-pointer"
                onClick={() => onNavigate('tutor-profile', { tutorId: tutor.id })}
              >
                <div className="p-5">
                  <div className="mb-4 flex items-start gap-3">
                    <div className="relative">
                      <img
                        src={tutor.avatar}
                        alt={tutor.name}
                        className="h-14 w-14 rounded-lg object-cover"
                      />
                      <div className="absolute -right-1 -top-1 rounded-full bg-accent p-1">
                        <Shield className="h-3 w-3 text-white" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="mb-1 text-[15px] font-[600] text-foreground group-hover:text-primary transition-colors truncate">
                        {tutor.name}
                      </h3>
                      <p className="text-[13px] text-[#6B7280] truncate">{tutor.level}</p>
                      <p className="text-[13px] text-[#9CA3AF] truncate">{tutor.department}</p>
                    </div>
                  </div>

                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <Star className="h-3.5 w-3.5 fill-accent text-accent" />
                      <span className="text-[14px] font-[600]">{tutor.rating}</span>
                      <span className="text-[13px] text-[#9CA3AF]">({tutor.reviewCount})</span>
                    </div>
                    <div className="text-[15px] font-[600] text-primary">₦{tutor.hourlyRate}/hr</div>
                  </div>

                  <div className="mb-4 flex flex-wrap gap-1.5">
                    {tutor.skills.slice(0, 2).map((skill) => (
                      <span
                        key={skill}
                        className="rounded-md bg-secondary px-2 py-1 text-[12px] font-[500] text-[#6B7280]"
                      >
                        {skill}
                      </span>
                    ))}
                    {tutor.skills.length > 2 && (
                      <span className="rounded-md bg-secondary px-2 py-1 text-[12px] font-[500] text-accent">
                        +{tutor.skills.length - 2}
                      </span>
                    )}
                  </div>

                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      onNavigate('tutor-profile', { tutorId: tutor.id });
                    }}
                    className="w-full bg-primary hover:bg-primary/90 text-white h-9 text-[14px] font-[500]"
                  >
                    View Profile
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Group Classes Section */}
        <div className="pb-16">
          <div className="mb-6 flex items-end justify-between">
            <div>
              <h2 className="mb-2 text-[24px] font-[600] text-primary tracking-tight flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                Group Classes
              </h2>
              <p className="text-[15px] text-[#6B7280]">Join collaborative learning sessions at affordable rates</p>
            </div>
            <Button
              variant="ghost"
              onClick={() => onNavigate('group-classes')}
              className="text-primary hover:text-primary/80 hover:bg-transparent"
            >
              View all <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          <div className="grid grid-cols-3 gap-6">
            {groupClasses.map((groupClass) => (
              <Card 
                key={groupClass.id} 
                className="overflow-hidden border border-[#E5E7EB] bg-white p-0 shadow-sm hover:shadow-md transition-all duration-200"
              >
                <div className="p-6">
                  <div className="mb-4 flex items-start gap-3">
                    <img
                      src={groupClass.tutorAvatar}
                      alt={groupClass.tutorName}
                      className="h-12 w-12 rounded-lg object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="mb-1 text-[15px] font-[600] text-foreground line-clamp-2">
                        {groupClass.title}
                      </h3>
                      <p className="text-[13px] text-[#6B7280]">{groupClass.tutorName}</p>
                    </div>
                  </div>

                  <div className="mb-4 space-y-2">
                    <div className="flex items-center justify-between text-[13px]">
                      <span className="text-[#6B7280]">Department</span>
                      <span className="font-[500] text-foreground">{groupClass.department}</span>
                    </div>
                    <div className="flex items-center justify-between text-[13px]">
                      <span className="text-[#6B7280]">Participants</span>
                      <span className="font-[500] text-foreground">
                        {groupClass.enrolled}/{groupClass.maxStudents}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-[13px]">
                      <span className="text-[#6B7280]">Price</span>
                      <span className="text-[16px] font-[600] text-primary">₦{groupClass.price}</span>
                    </div>
                  </div>

                  <div className="mb-4 flex flex-wrap gap-1.5">
                    {groupClass.topics.slice(0, 2).map((topic) => (
                      <span
                        key={topic}
                        className="rounded-md bg-secondary px-2 py-1 text-[12px] font-[500] text-[#6B7280]"
                      >
                        {topic}
                      </span>
                    ))}
                    {groupClass.topics.length > 2 && (
                      <span className="rounded-md bg-secondary px-2 py-1 text-[12px] font-[500] text-accent">
                        +{groupClass.topics.length - 2}
                      </span>
                    )}
                  </div>

                  <Button
                    onClick={() => onNavigate('group-classes')}
                    className="w-full bg-primary hover:bg-primary/90 text-white h-9 text-[14px] font-[500]"
                  >
                    Join Class
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Quick Actions Panel with liquid glass */}
        <div className="mb-16">
          <div className="rounded-xl border border-[#E5E7EB] bg-white/60 backdrop-blur-md p-8 shadow-sm">
            <h3 className="mb-6 text-[20px] font-[600] text-primary tracking-tight">Quick Actions</h3>
            <div className="grid grid-cols-3 gap-6">
              <button
                onClick={() => onNavigate('tutors')}
                className="group flex flex-col items-start rounded-lg border border-[#E5E7EB] bg-white p-6 text-left transition-all hover:border-primary hover:shadow-sm"
              >
                <div className="mb-3 rounded-lg bg-primary/10 p-3">
                  <BookOpen className="h-6 w-6 text-primary" />
                </div>
                <h4 className="mb-2 text-[15px] font-[600] text-foreground group-hover:text-primary transition-colors">
                  Book a Session
                </h4>
                <p className="text-[13px] text-[#6B7280]">Find and book a 1-on-1 tutor</p>
              </button>

              <button
                onClick={() => onNavigate('group-classes')}
                className="group flex flex-col items-start rounded-lg border border-[#E5E7EB] bg-white p-6 text-left transition-all hover:border-primary hover:shadow-sm"
              >
                <div className="mb-3 rounded-lg bg-primary/10 p-3">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h4 className="mb-2 text-[15px] font-[600] text-foreground group-hover:text-primary transition-colors">
                  Join Group Class
                </h4>
                <p className="text-[13px] text-[#6B7280]">Learn together with peers</p>
              </button>

              <button
                onClick={() => onNavigate('recordings')}
                className="group flex flex-col items-start rounded-lg border border-[#E5E7EB] bg-white p-6 text-left transition-all hover:border-primary hover:shadow-sm"
              >
                <div className="mb-3 rounded-lg bg-primary/10 p-3">
                  <Play className="h-6 w-6 text-primary" />
                </div>
                <h4 className="mb-2 text-[15px] font-[600] text-foreground group-hover:text-primary transition-colors">
                  View Recordings
                </h4>
                <p className="text-[13px] text-[#6B7280]">Access past session library</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
