import { Slider } from './ui/slider';
import { Checkbox } from './ui/checkbox';
import { Label } from './ui/label';
import { Button } from './ui/button';
import { Switch } from './ui/switch';
import { departments } from '../lib/mockData';

interface FilterPanelProps {
  selectedDepartments: string[];
  onDepartmentChange: (department: string) => void;
  priceRange: [number, number];
  onPriceRangeChange: (range: [number, number]) => void;
  minRating: number;
  onRatingChange: (rating: number) => void;
  verifiedOnly?: boolean;
  onVerifiedChange?: (checked: boolean) => void;
  groupClassesOnly?: boolean;
  onGroupClassesChange?: (checked: boolean) => void;
  recordingsAvailable?: boolean;
  onRecordingsChange?: (checked: boolean) => void;
  onReset: () => void;
}

export function FilterPanel({
  selectedDepartments,
  onDepartmentChange,
  priceRange,
  onPriceRangeChange,
  minRating,
  onRatingChange,
  verifiedOnly = false,
  onVerifiedChange,
  groupClassesOnly = false,
  onGroupClassesChange,
  recordingsAvailable = false,
  onRecordingsChange,
  onReset,
}: FilterPanelProps) {
  const ratings = [4.5, 4.0, 3.5, 3.0];

  return (
    <div className="w-[280px] space-y-6 rounded-lg border border-border bg-white p-6">
      <div className="flex items-center justify-between">
        <h3 className="font-[600] text-primary">Filters</h3>
        <Button variant="ghost" size="sm" onClick={onReset} className="h-auto p-0 text-sm text-primary">
          Reset
        </Button>
      </div>

      <div className="space-y-6">
        {/* Quick Filters */}
        <div className="space-y-3">
          {onVerifiedChange && (
            <div className="flex items-center justify-between">
              <Label htmlFor="verified" className="text-[14px] cursor-pointer">
                Verified CU Tutors Only
              </Label>
              <Switch
                id="verified"
                checked={verifiedOnly}
                onCheckedChange={onVerifiedChange}
              />
            </div>
          )}
          {onGroupClassesChange && (
            <div className="flex items-center justify-between">
              <Label htmlFor="group-classes" className="text-[14px] cursor-pointer">
                Offers Group Classes
              </Label>
              <Switch
                id="group-classes"
                checked={groupClassesOnly}
                onCheckedChange={onGroupClassesChange}
              />
            </div>
          )}
          {onRecordingsChange && (
            <div className="flex items-center justify-between">
              <Label htmlFor="recordings" className="text-[14px] cursor-pointer">
                Recordings Available
              </Label>
              <Switch
                id="recordings"
                checked={recordingsAvailable}
                onCheckedChange={onRecordingsChange}
              />
            </div>
          )}
        </div>

        <div className="border-t border-border" />

        <div>
          <Label className="mb-3 block text-[14px] font-[600]">Department</Label>
          <div className="space-y-3">
            {departments.slice(0, 6).map((dept) => (
              <div key={dept} className="flex items-center space-x-2">
                <Checkbox
                  id={dept}
                  checked={selectedDepartments.includes(dept)}
                  onCheckedChange={() => onDepartmentChange(dept)}
                />
                <label
                  htmlFor={dept}
                  className="text-sm text-foreground leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                >
                  {dept}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-border pt-4">
          <Label className="mb-3 block text-[14px] font-[600]">Price Range (₦/hr)</Label>
          <Slider
            min={0}
            max={50}
            step={5}
            value={priceRange}
            onValueChange={(value) => onPriceRangeChange(value as [number, number])}
            className="mb-2"
          />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>₦{priceRange[0]}</span>
            <span>₦{priceRange[1]}</span>
          </div>
        </div>

        <div className="border-t border-border pt-4">
          <Label className="mb-3 block text-[14px] font-[600]">Minimum Rating</Label>
          <div className="space-y-3">
            {ratings.map((rating) => (
              <div key={rating} className="flex items-center space-x-2">
                <Checkbox
                  id={`rating-${rating}`}
                  checked={minRating === rating}
                  onCheckedChange={() => onRatingChange(rating)}
                />
                <label
                  htmlFor={`rating-${rating}`}
                  className="text-sm text-foreground leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                >
                  {rating}+ stars
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}