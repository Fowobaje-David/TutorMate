import { Star, BookOpen, MessageSquare, Bookmark, Clock, CheckCircle2, Shield } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import type { Tutor } from '../lib/mockData';
import { useState } from 'react';
import { toast } from 'sonner';

interface TutorCardProps {
  tutor: Tutor;
  onViewProfile: (tutorId: string) => void;
  onMessage?: (tutorId: string, tutorName: string) => void;
  variant?: 'default' | 'modern';
}

export function TutorCard({ tutor, onViewProfile, onMessage, variant = 'default' }: TutorCardProps) {
  const [isSaved, setIsSaved] = useState(false);
  const isAvailableToday = tutor.availability.some(a => {
    const availDate = new Date(a.date);
    const today = new Date();
    return availDate.toDateString() === today.toDateString();
  });

  const handleSave = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsSaved(!isSaved);
    toast.success(isSaved ? 'Removed from favorites' : 'Added to favorites!');
  };

  const handleMessage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onMessage) {
      onMessage(tutor.id, tutor.name);
    } else {
      toast.info(`Opening chat with ${tutor.name}`);
    }
  };

  if (variant === 'modern') {
    return (
      <div 
        className="group overflow-hidden rounded-lg border border-[#E5E7EB] bg-white p-0 shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-200 cursor-pointer"
        onClick={() => onViewProfile(tutor.id)}
      >
        <div className="p-5">
          <div className="mb-4 flex items-start gap-3">
            <div className="relative">
              <img
                src={tutor.avatar}
                alt={tutor.name}
                className="h-14 w-14 rounded-lg object-cover"
              />
              {tutor.rating >= 4.8 && (
                <div className="absolute -right-1 -top-1 rounded-full bg-accent p-1">
                  <Shield className="h-3 w-3 text-white" />
                </div>
              )}
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
              onViewProfile(tutor.id);
            }}
            className="w-full bg-primary hover:bg-primary/90 text-white h-9 text-[14px] font-[500]"
          >
            View Profile
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="group overflow-hidden rounded-lg border border-border bg-white shadow-sm transition-all hover:shadow-lg hover:border-primary/30 cursor-pointer">
      <div className="p-6">
        <div className="flex items-start gap-4">
          <div className="relative">
            <img
              src={tutor.avatar}
              alt={tutor.name}
              className="h-16 w-16 rounded-full object-cover ring-2 ring-secondary group-hover:ring-primary/20 transition-all"
            />
            {isAvailableToday && (
              <div className="absolute -bottom-1 -right-1 h-5 w-5 rounded-full bg-green-500 border-2 border-white flex items-center justify-center" title="Available today">
                <CheckCircle2 className="h-3 w-3 text-white" />
              </div>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-1">
              <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">{tutor.name}</h3>
              <button
                onClick={handleSave}
                className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-secondary rounded"
              >
                <Bookmark className={`h-4 w-4 ${isSaved ? 'fill-accent text-accent' : 'text-muted-foreground'}`} />
              </button>
            </div>
            <p className="text-sm text-muted-foreground">{tutor.level}</p>
            <p className="text-sm text-muted-foreground truncate">{tutor.department}</p>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-accent text-accent" />
              <span className="font-semibold">{tutor.rating}</span>
              <span className="text-sm text-muted-foreground">({tutor.reviewCount})</span>
            </div>
            <div className="h-4 w-px bg-border" />
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <BookOpen className="h-4 w-4" />
              <span>{tutor.totalSessions}</span>
            </div>
          </div>
          <div className="text-right">
            <div className="font-semibold text-primary">₦{tutor.hourlyRate}/hr</div>
          </div>
        </div>

        {isAvailableToday && (
          <div className="mt-3 flex items-center gap-1 text-xs text-green-600 bg-green-50 px-2 py-1 rounded-md w-fit">
            <Clock className="h-3 w-3" />
            <span>Available today</span>
          </div>
        )}

        <div className="mt-4 flex flex-wrap gap-2">
          {tutor.skills.slice(0, 3).map((skill) => (
            <Badge key={skill} variant="secondary" className="text-xs">
              {skill}
            </Badge>
          ))}
          {tutor.skills.length > 3 && (
            <Badge variant="secondary" className="text-xs text-accent">
              +{tutor.skills.length - 3}
            </Badge>
          )}
        </div>

        <div className="mt-4 flex gap-2">
          <Button
            onClick={() => onViewProfile(tutor.id)}
            className="flex-1 bg-primary hover:bg-primary/90"
          >
            View Profile
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={handleMessage}
            className="shrink-0"
          >
            <MessageSquare className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}