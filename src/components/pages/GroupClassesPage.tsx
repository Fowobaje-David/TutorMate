import { useState } from 'react';
import { Calendar, Clock, Users, ChevronRight, Filter, X } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { mockGroupClasses, departments, type GroupClass } from '../../lib/mockData';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { toast } from 'sonner@2.0.3';

interface GroupClassesPageProps {
  onNavigate: (page: string, data?: any) => void;
}

export function GroupClassesPage({ onNavigate }: GroupClassesPageProps) {
  const [selectedDepartment, setSelectedDepartment] = useState<string>('all');
  const [selectedClass, setSelectedClass] = useState<GroupClass | null>(null);
  const [showFilters, setShowFilters] = useState(true);

  const filteredClasses = selectedDepartment === 'all'
    ? mockGroupClasses
    : mockGroupClasses.filter(c => c.department === selectedDepartment);

  const handleJoinClass = (groupClass: GroupClass) => {
    setSelectedClass(groupClass);
  };

  const confirmJoin = () => {
    if (selectedClass) {
      toast.success(`Successfully enrolled in ${selectedClass.title}!`);
      setSelectedClass(null);
      // Navigate to calendar or messages
      setTimeout(() => {
        onNavigate('calendar');
      }, 1500);
    }
  };

  return (
    <div className="min-h-screen bg-secondary">
      {/* Header */}
      <div className="bg-background border-b border-border">
        <div className="max-w-[1366px] mx-auto px-8 py-6">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h1 className="text-[28px] font-[600] text-primary mb-1">Group Classes</h1>
              <p className="text-[14px] text-muted-foreground">
                Join collaborative learning sessions with other students
              </p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden"
            >
              {showFilters ? <X className="w-4 h-4" /> : <Filter className="w-4 h-4" />}
            </Button>
          </div>

          {/* Stats */}
          <div className="flex gap-6 mt-6">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                <Users className="w-5 h-5 text-accent" />
              </div>
              <div>
                <div className="text-[20px] font-[600] text-primary">
                  {filteredClasses.length}
                </div>
                <div className="text-[12px] text-muted-foreground">Available Classes</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Calendar className="w-5 h-5 text-primary" />
              </div>
              <div>
                <div className="text-[20px] font-[600] text-primary">This Week</div>
                <div className="text-[12px] text-muted-foreground">Upcoming Sessions</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1366px] mx-auto px-8 py-8">
        <div className="grid grid-cols-12 gap-8">
          {/* Filters Sidebar */}
          {showFilters && (
            <div className="col-span-12 lg:col-span-3">
              <Card className="p-6">
                <h3 className="font-[600] text-primary mb-4">Filters</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="text-[14px] font-[600] text-foreground mb-2 block">
                      Department
                    </label>
                    <div className="space-y-2">
                      <button
                        onClick={() => setSelectedDepartment('all')}
                        className={`w-full text-left px-3 py-2 rounded-lg text-[14px] transition-colors ${
                          selectedDepartment === 'all'
                            ? 'bg-primary text-primary-foreground'
                            : 'hover:bg-secondary'
                        }`}
                      >
                        All Departments
                      </button>
                      {departments.map((dept) => (
                        <button
                          key={dept}
                          onClick={() => setSelectedDepartment(dept)}
                          className={`w-full text-left px-3 py-2 rounded-lg text-[14px] transition-colors ${
                            selectedDepartment === dept
                              ? 'bg-primary text-primary-foreground'
                              : 'hover:bg-secondary'
                          }`}
                        >
                          {dept}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          )}

          {/* Classes Grid */}
          <div className={showFilters ? "col-span-12 lg:col-span-9" : "col-span-12"}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredClasses.map((groupClass) => (
                <Card
                  key={groupClass.id}
                  className="p-6 hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => handleJoinClass(groupClass)}
                >
                  {/* Header */}
                  <div className="flex items-start gap-4 mb-4">
                    <ImageWithFallback
                      src={groupClass.tutorAvatar}
                      alt={groupClass.tutorName}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-[600] text-primary mb-1 line-clamp-2">
                        {groupClass.title}
                      </h3>
                      <p className="text-[14px] text-muted-foreground">
                        by {groupClass.tutorName}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-[20px] font-[600] text-primary">
                        ₦{groupClass.price}
                      </div>
                      <div className="text-[12px] text-muted-foreground">per person</div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-[14px] text-foreground mb-4 line-clamp-2">
                    {groupClass.description}
                  </p>

                  {/* Topics */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {groupClass.topics.slice(0, 3).map((topic) => (
                      <Badge key={topic} variant="secondary" className="text-[12px]">
                        {topic}
                      </Badge>
                    ))}
                    {groupClass.topics.length > 3 && (
                      <Badge variant="secondary" className="text-[12px]">
                        +{groupClass.topics.length - 3} more
                      </Badge>
                    )}
                  </div>

                  {/* Info */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-[14px] text-foreground">
                      <Calendar className="w-4 h-4 text-primary" />
                      <span>
                        {new Date(groupClass.date).toLocaleDateString('en-US', {
                          weekday: 'long',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-[14px] text-foreground">
                      <Clock className="w-4 h-4 text-primary" />
                      <span>{groupClass.time} • {groupClass.duration}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[14px] text-foreground">
                      <Users className="w-4 h-4 text-primary" />
                      <span>
                        {groupClass.enrolled}/{groupClass.maxStudents} students enrolled
                      </span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                      <div
                        className="h-full bg-accent"
                        style={{
                          width: `${(groupClass.enrolled / groupClass.maxStudents) * 100}%`,
                        }}
                      />
                    </div>
                  </div>

                  {/* CTA */}
                  <Button
                    className="w-full"
                    disabled={groupClass.enrolled >= groupClass.maxStudents}
                  >
                    {groupClass.enrolled >= groupClass.maxStudents
                      ? 'Class Full'
                      : 'View Details & Join'}
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </Card>
              ))}
            </div>

            {filteredClasses.length === 0 && (
              <Card className="p-12 text-center">
                <Users className="w-16 h-16 text-muted mx-auto mb-4" />
                <h3 className="font-[600] text-primary mb-2">No Classes Found</h3>
                <p className="text-[14px] text-muted-foreground mb-6">
                  Try adjusting your filters to find group classes
                </p>
                <Button variant="outline" onClick={() => setSelectedDepartment('all')}>
                  Clear Filters
                </Button>
              </Card>
            )}
          </div>
        </div>
      </div>

      {/* Class Details Modal */}
      <Dialog open={!!selectedClass} onOpenChange={() => setSelectedClass(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-[24px]">{selectedClass?.title}</DialogTitle>
            <DialogDescription>
              <div className="flex items-center gap-3 mt-2">
                <ImageWithFallback
                  src={selectedClass?.tutorAvatar || ''}
                  alt={selectedClass?.tutorName || ''}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <div className="text-[14px] text-foreground font-[500]">
                    {selectedClass?.tutorName}
                  </div>
                  <div className="text-[12px] text-muted-foreground">
                    {selectedClass?.department}
                  </div>
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>

          {selectedClass && (
            <div className="space-y-6">
              {/* Info Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2 text-[14px]">
                  <Calendar className="w-4 h-4 text-primary" />
                  <span>
                    {new Date(selectedClass.date).toLocaleDateString('en-US', {
                      weekday: 'long',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-[14px]">
                  <Clock className="w-4 h-4 text-primary" />
                  <span>{selectedClass.time}</span>
                </div>
                <div className="flex items-center gap-2 text-[14px]">
                  <Users className="w-4 h-4 text-primary" />
                  <span>
                    {selectedClass.enrolled}/{selectedClass.maxStudents} enrolled
                  </span>
                </div>
                <div className="text-[14px]">
                  <span className="font-[600]">Duration:</span> {selectedClass.duration}
                </div>
              </div>

              {/* Description */}
              <div>
                <h4 className="font-[600] text-primary mb-2">About This Class</h4>
                <p className="text-[14px] text-foreground">{selectedClass.description}</p>
              </div>

              {/* Topics */}
              <div>
                <h4 className="font-[600] text-primary mb-2">Topics Covered</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedClass.topics.map((topic) => (
                    <Badge key={topic} variant="secondary">
                      {topic}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Price */}
              <div className="bg-secondary p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-[14px] text-muted-foreground">Class Fee</div>
                    <div className="text-[28px] font-[600] text-primary">
                      ₦{selectedClass.price}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-[12px] text-muted-foreground">
                      {selectedClass.maxStudents - selectedClass.enrolled} spots left
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setSelectedClass(null)}>
              Cancel
            </Button>
            <Button onClick={confirmJoin}>
              Enroll & Pay ₦{selectedClass?.price}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
