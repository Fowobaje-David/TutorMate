import { useState } from 'react';
import { Navigation } from './components/Navigation';
import { LoginPage } from './components/pages/LoginPage';
import { DashboardPage } from './components/pages/DashboardPage';
import { TutorsPage } from './components/pages/TutorsPage';
import { TutorProfilePage } from './components/pages/TutorProfilePage';
import { BookingPage } from './components/pages/BookingPage';
import { CalendarPage } from './components/pages/CalendarPage';
import { MessagesPage } from './components/pages/MessagesPage';
import { WalletPage } from './components/pages/WalletPage';
import { SettingsPage } from './components/pages/SettingsPage';
import { GroupClassesPage } from './components/pages/GroupClassesPage';
import { RecordingsPage } from './components/pages/RecordingsPage';
import { Toaster } from './components/ui/sonner';

type Page = 
  | 'login'
  | 'dashboard'
  | 'tutors'
  | 'tutor-profile'
  | 'booking'
  | 'calendar'
  | 'messages'
  | 'wallet'
  | 'settings'
  | 'group-classes'
  | 'recordings';

interface PageData {
  tutorId?: string;
  [key: string]: any;
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('login');
  const [pageData, setPageData] = useState<PageData>({});
  const [previousPage, setPreviousPage] = useState<Page>('dashboard');

  const handleNavigate = (page: string, data?: PageData) => {
    setPreviousPage(currentPage);
    setCurrentPage(page as Page);
    if (data) {
      setPageData(data);
    }
  };

  const handleBack = () => {
    setCurrentPage(previousPage);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'login':
        return <LoginPage onLogin={() => handleNavigate('dashboard')} />;
      
      case 'dashboard':
        return <DashboardPage onNavigate={handleNavigate} />;
      
      case 'tutors':
        return <TutorsPage onNavigate={handleNavigate} />;
      
      case 'tutor-profile':
        return (
          <TutorProfilePage
            tutorId={pageData.tutorId || '1'}
            onNavigate={handleNavigate}
            onBack={handleBack}
          />
        );
      
      case 'booking':
        return (
          <BookingPage
            tutorId={pageData.tutorId || '1'}
            onNavigate={handleNavigate}
            onBack={handleBack}
          />
        );
      
      case 'calendar':
        return <CalendarPage onNavigate={handleNavigate} />;
      
      case 'messages':
        return <MessagesPage onNavigate={handleNavigate} />;
      
      case 'wallet':
        return <WalletPage onNavigate={handleNavigate} />;
      
      case 'settings':
        return <SettingsPage onNavigate={handleNavigate} />;
      
      case 'group-classes':
        return <GroupClassesPage onNavigate={handleNavigate} />;
      
      case 'recordings':
        return <RecordingsPage onNavigate={handleNavigate} />;
      
      default:
        return <DashboardPage onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {currentPage !== 'login' && (
        <Navigation currentPage={currentPage} onNavigate={handleNavigate} />
      )}
      {renderPage()}
      <Toaster position="top-right" />
    </div>
  );
}