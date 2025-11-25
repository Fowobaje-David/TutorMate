import { useState } from 'react';
import { Play, Eye, Clock, Filter, X, Search } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { mockRecordings, departments, type Recording } from '../../lib/mockData';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '../ui/dialog';

interface RecordingsPageProps {
  onNavigate: (page: string, data?: any) => void;
}

export function RecordingsPage({ onNavigate }: RecordingsPageProps) {
  const [selectedDepartment, setSelectedDepartment] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRecording, setSelectedRecording] = useState<Recording | null>(null);
  const [showFilters, setShowFilters] = useState(true);

  const filteredRecordings = mockRecordings.filter((recording) => {
    const matchesDepartment =
      selectedDepartment === 'all' || recording.department === selectedDepartment;
    const matchesSearch =
      searchQuery === '' ||
      recording.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      recording.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      recording.topics.some((topic) =>
        topic.toLowerCase().includes(searchQuery.toLowerCase())
      );
    return matchesDepartment && matchesSearch;
  });

  const handlePlayRecording = (recording: Recording) => {
    setSelectedRecording(recording);
  };

  return (
    <div className="min-h-screen bg-secondary">
      {/* Header */}
      <div className="bg-background border-b border-border">
        <div className="max-w-[1366px] mx-auto px-8 py-6">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h1 className="text-[28px] font-[600] text-primary mb-1">Session Recordings</h1>
              <p className="text-[14px] text-muted-foreground">
                Access past sessions and review content at your own pace
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

          {/* Search Bar */}
          <div className="mt-6">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search recordings by topic or subject..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Stats */}
          <div className="flex gap-6 mt-6">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                <Play className="w-5 h-5 text-accent" />
              </div>
              <div>
                <div className="text-[20px] font-[600] text-primary">
                  {filteredRecordings.length}
                </div>
                <div className="text-[12px] text-muted-foreground">Available Recordings</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Eye className="w-5 h-5 text-primary" />
              </div>
              <div>
                <div className="text-[20px] font-[600] text-primary">
                  {mockRecordings.reduce((sum, r) => sum + r.views, 0)}
                </div>
                <div className="text-[12px] text-muted-foreground">Total Views</div>
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

          {/* Recordings Grid */}
          <div className={showFilters ? "col-span-12 lg:col-span-9" : "col-span-12"}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRecordings.map((recording) => (
                <Card
                  key={recording.id}
                  className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => handlePlayRecording(recording)}
                >
                  {/* Thumbnail */}
                  <div className="relative aspect-video bg-muted group">
                    <ImageWithFallback
                      src={recording.thumbnail}
                      alt={recording.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-14 h-14 rounded-full bg-accent flex items-center justify-center">
                        <Play className="w-6 h-6 text-accent-foreground ml-1" />
                      </div>
                    </div>
                    <div className="absolute bottom-2 right-2 bg-black/80 text-white px-2 py-1 rounded text-[12px]">
                      {recording.duration}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <h3 className="font-[600] text-primary mb-1 line-clamp-2">
                      {recording.title}
                    </h3>
                    <p className="text-[14px] text-muted-foreground mb-3">
                      {recording.tutorName}
                    </p>

                    <div className="flex items-center gap-4 text-[12px] text-muted-foreground mb-3">
                      <div className="flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        <span>{recording.views} views</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>
                          {new Date(recording.date).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                          })}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {recording.topics.slice(0, 2).map((topic) => (
                        <Badge key={topic} variant="secondary" className="text-[11px]">
                          {topic}
                        </Badge>
                      ))}
                      {recording.topics.length > 2 && (
                        <Badge variant="secondary" className="text-[11px]">
                          +{recording.topics.length - 2}
                        </Badge>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {filteredRecordings.length === 0 && (
              <Card className="p-12 text-center">
                <Play className="w-16 h-16 text-muted mx-auto mb-4" />
                <h3 className="font-[600] text-primary mb-2">No Recordings Found</h3>
                <p className="text-[14px] text-muted-foreground mb-6">
                  Try adjusting your search or filters
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSelectedDepartment('all');
                    setSearchQuery('');
                  }}
                >
                  Clear Filters
                </Button>
              </Card>
            )}
          </div>
        </div>
      </div>

      {/* Video Player Modal */}
      <Dialog open={!!selectedRecording} onOpenChange={() => setSelectedRecording(null)}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle className="text-[24px]">{selectedRecording?.title}</DialogTitle>
            <DialogDescription>
              Watch the recorded session and review the covered material
            </DialogDescription>
          </DialogHeader>

          {selectedRecording && (
            <div className="space-y-6">
              {/* Video Player Placeholder */}
              <div className="aspect-video bg-black rounded-lg flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="w-20 h-20 rounded-full bg-accent flex items-center justify-center mx-auto mb-4">
                    <Play className="w-10 h-10 text-accent-foreground ml-1" />
                  </div>
                  <p className="text-[14px] opacity-80">Video Player</p>
                  <p className="text-[12px] opacity-60 mt-1">{selectedRecording.duration}</p>
                </div>
              </div>

              {/* Info */}
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <div className="text-[12px] text-muted-foreground mb-1">Tutor</div>
                  <div className="font-[500]">{selectedRecording.tutorName}</div>
                </div>
                <div>
                  <div className="text-[12px] text-muted-foreground mb-1">Subject</div>
                  <div className="font-[500]">{selectedRecording.subject}</div>
                </div>
                <div>
                  <div className="text-[12px] text-muted-foreground mb-1">Department</div>
                  <div className="font-[500]">{selectedRecording.department}</div>
                </div>
                <div>
                  <div className="text-[12px] text-muted-foreground mb-1">Recorded</div>
                  <div className="font-[500]">
                    {new Date(selectedRecording.date).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </div>
                </div>
              </div>

              {/* Topics */}
              <div>
                <div className="text-[12px] text-muted-foreground mb-2">Topics Covered</div>
                <div className="flex flex-wrap gap-2">
                  {selectedRecording.topics.map((topic) => (
                    <Badge key={topic} variant="secondary">
                      {topic}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Stats */}
              <div className="flex items-center gap-6 text-[14px] text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Eye className="w-4 h-4" />
                  <span>{selectedRecording.views} views</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{selectedRecording.duration}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <Button className="flex-1">
                  <Play className="w-4 h-4 mr-2" />
                  Play Recording
                </Button>
                <Button variant="outline">Download</Button>
                <Button variant="outline">Share</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}