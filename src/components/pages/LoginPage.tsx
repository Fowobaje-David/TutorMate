import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../ui/collapsible';
import { ChevronDown, BookOpen } from 'lucide-react';
import { departments } from '../../lib/mockData';

interface LoginPageProps {
  onLogin: () => void;
}

export function LoginPage({ onLogin }: LoginPageProps) {
  const [showTutorFields, setShowTutorFields] = useState(false);

  return (
    <div className="min-h-screen bg-secondary flex items-center justify-center px-4">
      <div className="w-full max-w-[480px]">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary">
            <span className="text-xl text-white font-semibold">T</span>
          </div>
          <h1 className="mb-2 font-semibold text-primary">Welcome to TutorMate</h1>
          <p className="text-muted-foreground">Connect with peer tutors across campus</p>
        </div>

        <div className="rounded-lg border border-border bg-white p-8 shadow-sm">
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="mb-6 grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>

            <TabsContent value="login" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="login-email">Email</Label>
                <Input
                  id="login-email"
                  type="email"
                  placeholder="your.email@university.edu"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="login-password">Password</Label>
                <Input
                  id="login-password"
                  type="password"
                  placeholder="••••••••"
                />
              </div>

              <Button onClick={onLogin} className="w-full bg-primary hover:bg-primary/90">
                Sign In
              </Button>

              <div className="text-center">
                <button className="text-sm text-primary hover:underline">
                  Forgot password?
                </button>
              </div>

              <div className="mt-4 flex items-center gap-2 rounded-lg border border-accent/20 bg-accent/5 p-3">
                <BookOpen className="h-5 w-5 text-accent flex-shrink-0" />
                <div className="text-left">
                  <a href="#" className="text-sm text-primary hover:underline font-[500]">
                    New to TutorMate? Read the Beginner's Guide
                  </a>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="signup" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="signup-name">Full Name</Label>
                <Input
                  id="signup-name"
                  type="text"
                  placeholder="John Doe"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="signup-email">University Email</Label>
                <Input
                  id="signup-email"
                  type="email"
                  placeholder="your.email@university.edu"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="signup-password">Password</Label>
                <Input
                  id="signup-password"
                  type="password"
                  placeholder="••••••••"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="department">Department</Label>
                <Select>
                  <SelectTrigger id="department">
                    <SelectValue placeholder="Select your department" />
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
                <Select>
                  <SelectTrigger id="level">
                    <SelectValue placeholder="Select your level" />
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

              <Collapsible open={showTutorFields} onOpenChange={setShowTutorFields}>
                <CollapsibleTrigger className="flex w-full items-center justify-between rounded-lg border border-border bg-secondary/50 px-4 py-3 text-sm hover:bg-secondary">
                  <span className="font-[500]">I want to become a tutor</span>
                  <ChevronDown className={`h-4 w-4 transition-transform ${showTutorFields ? 'rotate-180' : ''}`} />
                </CollapsibleTrigger>
                <CollapsibleContent className="mt-4 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="hourly-rate">Hourly Rate (₦)</Label>
                    <Input
                      id="hourly-rate"
                      type="number"
                      placeholder="500 - 2000"
                      min="0"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <textarea
                      id="bio"
                      className="flex min-h-[100px] w-full rounded-md border border-input bg-input-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="Tell students about your expertise and teaching experience..."
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="skills">Skills (comma-separated)</Label>
                    <Input
                      id="skills"
                      type="text"
                      placeholder="Python, Machine Learning, Data Structures"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="availability">Availability</Label>
                    <Select>
                      <SelectTrigger id="availability">
                        <SelectValue placeholder="Select your typical availability" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="weekday-mornings">Weekday Mornings</SelectItem>
                        <SelectItem value="weekday-afternoons">Weekday Afternoons</SelectItem>
                        <SelectItem value="weekday-evenings">Weekday Evenings</SelectItem>
                        <SelectItem value="weekends">Weekends</SelectItem>
                        <SelectItem value="flexible">Flexible Schedule</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CollapsibleContent>
              </Collapsible>

              <Button onClick={onLogin} className="w-full bg-primary hover:bg-primary/90">
                Create Account
              </Button>

              <div className="mt-4 flex items-center gap-2 rounded-lg border border-accent/20 bg-accent/5 p-3">
                <BookOpen className="h-5 w-5 text-accent flex-shrink-0" />
                <div className="text-left">
                  <a href="#" className="text-sm text-primary hover:underline font-[500]">
                    Beginner's Guide to TutorMate
                  </a>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          By continuing, you agree to TutorMate's{' '}
          <a href="#" className="text-primary hover:underline">
            Terms of Service
          </a>{' '}
          and{' '}
          <a href="#" className="text-primary hover:underline">
            Privacy Policy
          </a>
        </p>
      </div>
    </div>
  );
}