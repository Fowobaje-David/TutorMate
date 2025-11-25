import { useState } from 'react';
import { FilterPanel } from '../FilterPanel';
import { TutorCard } from '../TutorCard';
import { mockTutors } from '../../lib/mockData';
import { Input } from '../ui/input';
import { Search, Grid3x3, List, ArrowUpDown } from 'lucide-react';
import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Badge } from '../ui/badge';

interface TutorsPageProps {
  onNavigate: (page: string, data?: any) => void;
}

export function TutorsPage({ onNavigate }: TutorsPageProps) {
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 50]);
  const [minRating, setMinRating] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [groupClassesOnly, setGroupClassesOnly] = useState(false);
  const [recordingsAvailable, setRecordingsAvailable] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'recommended' | 'price-low' | 'price-high' | 'rating' | 'sessions'>('recommended');

  const handleDepartmentChange = (department: string) => {
    setSelectedDepartments((prev) =>
      prev.includes(department)
        ? prev.filter((d) => d !== department)
        : [...prev, department]
    );
  };

  const handleReset = () => {
    setSelectedDepartments([]);
    setPriceRange([0, 50]);
    setMinRating(0);
    setSearchQuery('');
    setVerifiedOnly(false);
    setGroupClassesOnly(false);
    setRecordingsAvailable(false);
  };

  const filteredTutors = mockTutors.filter((tutor) => {
    const matchesDepartment =
      selectedDepartments.length === 0 || selectedDepartments.includes(tutor.department);
    const matchesPrice =
      tutor.hourlyRate >= priceRange[0] && tutor.hourlyRate <= priceRange[1];
    const matchesRating = tutor.rating >= minRating;
    const matchesSearch =
      searchQuery === '' ||
      tutor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tutor.skills.some((skill) => skill.toLowerCase().includes(searchQuery.toLowerCase()));
    
    // Simulated filters (in real app would check tutor properties)
    const matchesVerified = !verifiedOnly || tutor.rating >= 4.5;
    const matchesGroupClasses = !groupClassesOnly || tutor.totalSessions > 200;
    const matchesRecordings = !recordingsAvailable || tutor.rating >= 4.5;

    return matchesDepartment && matchesPrice && matchesRating && matchesSearch && 
           matchesVerified && matchesGroupClasses && matchesRecordings;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.hourlyRate - b.hourlyRate;
      case 'price-high':
        return b.hourlyRate - a.hourlyRate;
      case 'rating':
        return b.rating - a.rating;
      case 'sessions':
        return b.totalSessions - a.totalSessions;
      default:
        return 0; // recommended
    }
  });

  const activeFiltersCount = 
    selectedDepartments.length + 
    (minRating > 0 ? 1 : 0) + 
    (verifiedOnly ? 1 : 0) + 
    (groupClassesOnly ? 1 : 0) + 
    (recordingsAvailable ? 1 : 0);

  return (
    <div className="min-h-screen bg-secondary">
      <div className="mx-auto max-w-[1366px] px-8 py-8">
        <div className="mb-8">
          <h1 className="mb-2 text-[28px] font-[600] text-primary">Browse Tutors</h1>
          <p className="text-muted-foreground mb-6">Find the perfect tutor for your learning needs</p>
          <div className="relative max-w-[600px]">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search by name or skill (e.g. Java, Calculus)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-white pl-12 h-12 text-[14px]"
            />
          </div>
        </div>

        <div className="flex gap-8">
          <FilterPanel
            selectedDepartments={selectedDepartments}
            onDepartmentChange={handleDepartmentChange}
            priceRange={priceRange}
            onPriceRangeChange={setPriceRange}
            minRating={minRating}
            onRatingChange={setMinRating}
            verifiedOnly={verifiedOnly}
            onVerifiedChange={setVerifiedOnly}
            groupClassesOnly={groupClassesOnly}
            onGroupClassesChange={setGroupClassesOnly}
            recordingsAvailable={recordingsAvailable}
            onRecordingsChange={setRecordingsAvailable}
            onReset={handleReset}
          />

          <div className="flex-1">
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <p className="text-foreground font-semibold">
                  {filteredTutors.length} tutor{filteredTutors.length !== 1 ? 's' : ''}
                </p>
                {activeFiltersCount > 0 && (
                  <Badge variant="secondary" className="bg-primary/10 text-primary">
                    {activeFiltersCount} filter{activeFiltersCount !== 1 ? 's' : ''} applied
                  </Badge>
                )}
              </div>

              <div className="flex items-center gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="gap-2">
                      <ArrowUpDown className="h-4 w-4" />
                      Sort: {sortBy === 'recommended' ? 'Recommended' : 
                             sortBy === 'price-low' ? 'Price: Low to High' :
                             sortBy === 'price-high' ? 'Price: High to Low' :
                             sortBy === 'rating' ? 'Highest Rated' : 'Most Sessions'}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => setSortBy('recommended')}>
                      Recommended
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSortBy('price-low')}>
                      Price: Low to High
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSortBy('price-high')}>
                      Price: High to Low
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSortBy('rating')}>
                      Highest Rated
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSortBy('sessions')}>
                      Most Sessions
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <div className="flex gap-1 border border-border rounded-lg p-1 bg-white">
                  <Button
                    variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                    className="h-8 w-8 p-0"
                  >
                    <Grid3x3 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'secondary' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                    className="h-8 w-8 p-0"
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            <div className={viewMode === 'grid' ? 'grid grid-cols-3 gap-6' : 'grid grid-cols-1 gap-4'}>
              {filteredTutors.map((tutor) => (
                <TutorCard
                  key={tutor.id}
                  tutor={tutor}
                  onViewProfile={(id) => onNavigate('tutor-profile', { tutorId: id })}
                  onMessage={() => onNavigate('messages')}
                />
              ))}
            </div>

            {filteredTutors.length === 0 && (
              <div className="rounded-lg border border-border bg-white p-12 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-secondary">
                  <Search className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="mb-2 font-semibold text-foreground">No tutors found</h3>
                <p className="text-muted-foreground mb-4">
                  No tutors match your current criteria. Try adjusting your filters or search terms.
                </p>
                <Button variant="outline" onClick={handleReset}>
                  Clear all filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}