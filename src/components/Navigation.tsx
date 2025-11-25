import { Home, Users, Calendar, Wallet, MessageSquare, User, LogOut, UserSquare, Play } from 'lucide-react';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

interface NavigationProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export function Navigation({ currentPage, onNavigate }: NavigationProps) {
  const navItems = [
    { id: 'dashboard', label: 'Home' },
    { id: 'tutors', label: 'Tutors' },
    { id: 'group-classes', label: 'Group Classes' },
    { id: 'calendar', label: 'Calendar' },
    { id: 'recordings', label: 'Recordings' },
    { id: 'messages', label: 'Messages' },
    { id: 'wallet', label: 'Wallet' },
  ];

  return (
    <nav className="sticky top-0 z-50 border-b border-[#E5E7EB] bg-white/80 backdrop-blur-md">
      <div className="mx-auto max-w-[1366px] px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Left: Logo */}
          <button 
            onClick={() => onNavigate('dashboard')}
            className="flex items-center gap-2 group"
          >
            <span className="text-[20px] font-[600] text-primary tracking-tight">TutorMate</span>
          </button>
          
          {/* Center: Navigation */}
          <div className="flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`relative px-4 py-2 text-[14px] font-[500] transition-colors ${
                    isActive
                      ? 'text-primary'
                      : 'text-[#6B7280] hover:text-foreground'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Right: Profile Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-3 rounded-lg px-2 py-1.5 hover:bg-secondary/50 transition-colors">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <span className="text-[14px] font-[500] text-foreground">John Doe</span>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[200px]">
              <DropdownMenuItem onClick={() => onNavigate('settings')}>
                <User className="mr-2 h-4 w-4" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onNavigate('wallet')}>
                <Wallet className="mr-2 h-4 w-4" />
                Wallet
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => onNavigate('login')} className="text-red-600">
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
}