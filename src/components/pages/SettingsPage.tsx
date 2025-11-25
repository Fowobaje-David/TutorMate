import { useState } from 'react';
import { Camera, Save } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../ui/collapsible';
import { Switch } from '../ui/switch';
import { departments } from '../../lib/mockData';
import { toast } from 'sonner@2.0.3';

interface SettingsPageProps {
  onNavigate: (page: string) => void;
}

export function SettingsPage({ onNavigate }: SettingsPageProps) {
  const [isTutor, setIsTutor] = useState(false);
  const [showTutorSettings, setShowTutorSettings] = useState(false);
  const [profileImage, setProfileImage] = useState('https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400');

  const handleSave = () => {
    toast.success('Profile updated successfully!');
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-secondary">
      <div className="mx-auto max-w-[1366px] px-20 py-8">
        <h1 className="mb-8 font-semibold">Profile Settings</h1>

        <div className="mx-auto max-w-[900px] space-y-6">
          {/* Profile Picture */}
          <div className="rounded-lg border border-border bg-white p-8">
            <h2 className="mb-6 font-semibold">Profile Picture</h2>
            <div className="flex items-center gap-6">
              <div className="relative">
                <img
                  src={profileImage}
                  alt="Profile"
                  className="h-24 w-24 rounded-full object-cover"
                />
                <label
                  htmlFor="profile-upload"
                  className="absolute bottom-0 right-0 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-primary text-white hover:bg-primary/90"
                >
                  <Camera className="h-4 w-4" />
                  <input
                    id="profile-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                </label>
              </div>
              <div>
                <h3 className="mb-1 font-medium">Upload a new photo</h3>
                <p className="text-sm text-muted-foreground">
                  Recommended: Square image, at least 400x400px
                </p>
              </div>
            </div>
          </div>

          {/* Basic Information */}
          <div className="rounded-lg border border-border bg-white p-8">
            <h2 className="mb-6 font-semibold">Basic Information</h2>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="first-name">First Name</Label>
                <Input id="first-name" type="text" defaultValue="Alex" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="last-name">Last Name</Label>
                <Input id="last-name" type="text" defaultValue="Martinez" />
              </div>

              <div className="col-span-2 space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  defaultValue="alex.martinez@university.edu"
                  disabled
                />
                <p className="text-xs text-muted-foreground">
                  Email cannot be changed. Contact support if you need help.
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="department">Department</Label>
                <Select defaultValue="Computer Science">
                  <SelectTrigger id="department">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {departments.map((dept) => (
                      <SelectItem key={dept} value={dept}>
                        {dept}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="level">Academic Level</Label>
                <Select defaultValue="3rd">
                  <SelectTrigger id="level">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1st">1st Year</SelectItem>
                    <SelectItem value="2nd">2nd Year</SelectItem>
                    <SelectItem value="3rd">3rd Year</SelectItem>
                    <SelectItem value="4th">4th Year</SelectItem>
                    <SelectItem value="masters">Masters Student</SelectItem>
                    <SelectItem value="phd">PhD Candidate</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="col-span-2 space-y-2">
                <Label htmlFor="phone">Phone Number (Optional)</Label>
                <Input id="phone" type="tel" placeholder="+1 (555) 000-0000" />
              </div>
            </div>
          </div>

          {/* Tutor Settings */}
          <div className="rounded-lg border border-border bg-white p-8">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="font-semibold">Tutor Profile</h2>
                <p className="text-sm text-muted-foreground">
                  Enable tutoring to start offering sessions to other students
                </p>
              </div>
              <Switch checked={isTutor} onCheckedChange={setIsTutor} />
            </div>

            {isTutor && (
              <Collapsible open={showTutorSettings} onOpenChange={setShowTutorSettings}>
                <CollapsibleTrigger className="mb-4 text-sm text-primary hover:underline">
                  {showTutorSettings ? 'Hide' : 'Show'} tutor settings
                </CollapsibleTrigger>
                <CollapsibleContent className="space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="hourly-rate">Hourly Rate ($)</Label>
                      <Input
                        id="hourly-rate"
                        type="number"
                        defaultValue="25"
                        min="0"
                        step="1"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="experience">Years of Experience</Label>
                      <Select defaultValue="1-2">
                        <SelectTrigger id="experience">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="<1">Less than 1 year</SelectItem>
                          <SelectItem value="1-2">1-2 years</SelectItem>
                          <SelectItem value="3-5">3-5 years</SelectItem>
                          <SelectItem value="5+">5+ years</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="col-span-2 space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      <textarea
                        id="bio"
                        className="flex min-h-[100px] w-full rounded-md border border-input bg-input-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        placeholder="Tell students about your expertise and teaching style..."
                        defaultValue="Computer science student passionate about web development and software design. Friendly and patient teaching approach."
                      />
                    </div>

                    <div className="col-span-2 space-y-2">
                      <Label htmlFor="skills">Skills (comma-separated)</Label>
                      <Input
                        id="skills"
                        type="text"
                        defaultValue="Java, Web Development, Databases, Software Engineering"
                        placeholder="e.g., Python, Machine Learning, Data Structures"
                      />
                    </div>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            )}
          </div>

          {/* Notification Settings */}
          <div className="rounded-lg border border-border bg-white p-8">
            <h2 className="mb-6 font-semibold">Notifications</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Email Notifications</div>
                  <div className="text-sm text-muted-foreground">
                    Receive email updates about your sessions
                  </div>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Session Reminders</div>
                  <div className="text-sm text-muted-foreground">
                    Get reminders 24 hours before sessions
                  </div>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Message Notifications</div>
                  <div className="text-sm text-muted-foreground">
                    Get notified about new messages
                  </div>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Marketing Emails</div>
                  <div className="text-sm text-muted-foreground">
                    Receive news and promotional content
                  </div>
                </div>
                <Switch />
              </div>
            </div>
          </div>

          {/* Account Actions */}
          <div className="rounded-lg border border-border bg-white p-8">
            <h2 className="mb-6 font-semibold">Account</h2>
            <div className="space-y-4">
              <div>
                <Button variant="outline" className="w-full justify-start">
                  Change Password
                </Button>
              </div>
              <div>
                <Button variant="outline" className="w-full justify-start text-destructive hover:bg-destructive/10">
                  Delete Account
                </Button>
                <p className="mt-2 text-xs text-muted-foreground">
                  Permanently delete your account and all associated data
                </p>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end gap-3">
            <Button variant="outline">Cancel</Button>
            <Button onClick={handleSave} className="bg-primary hover:bg-primary/90">
              <Save className="mr-2 h-4 w-4" />
              Save Changes
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
