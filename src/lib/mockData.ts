// Mock data for TutorMate platform

export interface Tutor {
  id: string;
  name: string;
  avatar: string;
  department: string;
  level: string;
  rating: number;
  reviewCount: number;
  hourlyRate: number;
  skills: string[];
  bio: string;
  availability: { date: string; times: string[] }[];
  totalSessions: number;
}

export interface Review {
  id: string;
  studentName: string;
  studentAvatar: string;
  rating: number;
  date: string;
  comment: string;
}

export interface Session {
  id: string;
  tutorName: string;
  tutorAvatar: string;
  subject: string;
  date: string;
  time: string;
  duration: string;
  status: 'upcoming' | 'completed' | 'cancelled';
  meetingLink?: string;
}

export interface Transaction {
  id: string;
  type: 'credit' | 'debit';
  amount: number;
  description: string;
  date: string;
  status: 'completed' | 'pending';
}

export interface Message {
  id: string;
  sender: 'user' | 'other';
  text: string;
  timestamp: string;
}

export interface Conversation {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
}

export const mockTutors: Tutor[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
    department: 'Computer Science',
    level: 'PhD Candidate',
    rating: 4.9,
    reviewCount: 127,
    hourlyRate: 35,
    skills: ['Python', 'Machine Learning', 'Data Structures', 'Algorithms'],
    bio: 'PhD candidate specializing in AI and Machine Learning. 5+ years of tutoring experience helping students excel in computer science fundamentals and advanced topics.',
    availability: [
      { date: '2025-11-25', times: ['10:00 AM', '2:00 PM', '4:00 PM'] },
      { date: '2025-11-26', times: ['11:00 AM', '3:00 PM'] },
      { date: '2025-11-27', times: ['9:00 AM', '1:00 PM', '5:00 PM'] },
    ],
    totalSessions: 342,
  },
  {
    id: '2',
    name: 'Michael Chen',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    department: 'Mathematics',
    level: 'Masters Student',
    rating: 4.8,
    reviewCount: 93,
    hourlyRate: 30,
    skills: ['Calculus', 'Linear Algebra', 'Statistics', 'Differential Equations'],
    bio: 'Mathematics masters student with a passion for teaching. I break down complex concepts into simple, understandable parts.',
    availability: [
      { date: '2025-11-25', times: ['1:00 PM', '3:00 PM'] },
      { date: '2025-11-26', times: ['10:00 AM', '2:00 PM', '4:00 PM'] },
      { date: '2025-11-28', times: ['11:00 AM', '3:00 PM'] },
    ],
    totalSessions: 256,
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
    department: 'Physics',
    level: '4th Year',
    rating: 4.7,
    reviewCount: 68,
    hourlyRate: 28,
    skills: ['Classical Mechanics', 'Thermodynamics', 'Electromagnetism', 'Quantum Physics'],
    bio: 'Senior physics student who loves helping others understand the fundamental laws of nature. Patient and encouraging teaching style.',
    availability: [
      { date: '2025-11-25', times: ['9:00 AM', '11:00 AM'] },
      { date: '2025-11-27', times: ['2:00 PM', '4:00 PM'] },
      { date: '2025-11-29', times: ['10:00 AM', '1:00 PM'] },
    ],
    totalSessions: 189,
  },
  {
    id: '4',
    name: 'David Kim',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',
    department: 'Engineering',
    level: 'PhD Candidate',
    rating: 4.9,
    reviewCount: 115,
    hourlyRate: 38,
    skills: ['Circuit Analysis', 'Digital Systems', 'Signal Processing', 'Control Systems'],
    bio: 'Electrical engineering PhD with industry experience. I focus on practical applications and real-world problem solving.',
    availability: [
      { date: '2025-11-26', times: ['9:00 AM', '1:00 PM', '5:00 PM'] },
      { date: '2025-11-27', times: ['10:00 AM', '3:00 PM'] },
      { date: '2025-11-28', times: ['2:00 PM', '4:00 PM'] },
    ],
    totalSessions: 298,
  },
  {
    id: '5',
    name: 'Jessica Taylor',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400',
    department: 'Chemistry',
    level: 'Masters Student',
    rating: 4.8,
    reviewCount: 84,
    hourlyRate: 32,
    skills: ['Organic Chemistry', 'Biochemistry', 'Analytical Chemistry', 'Lab Techniques'],
    bio: 'Chemistry masters student with lab teaching experience. I make chemistry accessible and interesting for all students.',
    availability: [
      { date: '2025-11-25', times: ['11:00 AM', '2:00 PM'] },
      { date: '2025-11-26', times: ['9:00 AM', '4:00 PM'] },
      { date: '2025-11-29', times: ['10:00 AM', '1:00 PM', '3:00 PM'] },
    ],
    totalSessions: 221,
  },
  {
    id: '6',
    name: 'Alex Martinez',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
    department: 'Computer Science',
    level: '3rd Year',
    rating: 4.6,
    reviewCount: 52,
    hourlyRate: 25,
    skills: ['Java', 'Web Development', 'Databases', 'Software Engineering'],
    bio: 'Computer science student passionate about web development and software design. Friendly and patient teaching approach.',
    availability: [
      { date: '2025-11-25', times: ['3:00 PM', '5:00 PM'] },
      { date: '2025-11-27', times: ['11:00 AM', '2:00 PM'] },
      { date: '2025-11-28', times: ['9:00 AM', '4:00 PM'] },
    ],
    totalSessions: 145,
  },
];

export const mockReviews: Review[] = [
  {
    id: '1',
    studentName: 'John Smith',
    studentAvatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=400',
    rating: 5,
    date: '2025-11-20',
    comment: 'Sarah is an excellent tutor! She explained machine learning concepts in a way that finally made sense to me. Highly recommend!',
  },
  {
    id: '2',
    studentName: 'Emma Wilson',
    studentAvatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400',
    rating: 5,
    date: '2025-11-18',
    comment: 'Very patient and knowledgeable. Helped me ace my data structures exam. Will definitely book again!',
  },
  {
    id: '3',
    studentName: 'Ryan Cooper',
    studentAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400',
    rating: 4,
    date: '2025-11-15',
    comment: 'Great tutor, very helpful with Python programming. Could use more real-world examples but overall excellent.',
  },
  {
    id: '4',
    studentName: 'Sophia Lee',
    studentAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400',
    rating: 5,
    date: '2025-11-12',
    comment: 'Best tutor I\'ve had! Makes complex algorithms easy to understand. Worth every penny.',
  },
];

export const mockSessions: Session[] = [
  {
    id: '1',
    tutorName: 'Sarah Johnson',
    tutorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
    subject: 'Machine Learning Fundamentals',
    date: '2025-11-26',
    time: '2:00 PM',
    duration: '1 hour',
    status: 'upcoming',
    meetingLink: 'https://meet.tutormate.com/abc123',
  },
  {
    id: '2',
    tutorName: 'Michael Chen',
    tutorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    subject: 'Linear Algebra',
    date: '2025-11-28',
    time: '10:00 AM',
    duration: '1 hour',
    status: 'upcoming',
    meetingLink: 'https://meet.tutormate.com/def456',
  },
  {
    id: '3',
    tutorName: 'Emily Rodriguez',
    tutorAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
    subject: 'Quantum Physics',
    date: '2025-11-22',
    time: '3:00 PM',
    duration: '1 hour',
    status: 'completed',
  },
];

export const mockTransactions: Transaction[] = [
  {
    id: '1',
    type: 'debit',
    amount: 35,
    description: 'Session with Sarah Johnson - Machine Learning',
    date: '2025-11-23',
    status: 'completed',
  },
  {
    id: '2',
    type: 'credit',
    amount: 100,
    description: 'Account top-up',
    date: '2025-11-20',
    status: 'completed',
  },
  {
    id: '3',
    type: 'debit',
    amount: 30,
    description: 'Session with Michael Chen - Calculus',
    date: '2025-11-18',
    status: 'completed',
  },
  {
    id: '4',
    type: 'debit',
    amount: 28,
    description: 'Session with Emily Rodriguez - Physics',
    date: '2025-11-15',
    status: 'completed',
  },
  {
    id: '5',
    type: 'credit',
    amount: 50,
    description: 'Account top-up',
    date: '2025-11-10',
    status: 'completed',
  },
];

export const mockConversations: Conversation[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
    lastMessage: 'See you tomorrow at 2 PM!',
    timestamp: '10:30 AM',
    unread: 0,
  },
  {
    id: '2',
    name: 'Michael Chen',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    lastMessage: 'Great! I can help with that topic.',
    timestamp: 'Yesterday',
    unread: 2,
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
    lastMessage: 'Thanks for the session!',
    timestamp: 'Nov 22',
    unread: 0,
  },
];

export const mockMessages: { [key: string]: Message[] } = {
  '1': [
    {
      id: '1',
      sender: 'other',
      text: 'Hi! Looking forward to our session tomorrow.',
      timestamp: '10:15 AM',
    },
    {
      id: '2',
      sender: 'user',
      text: 'Me too! I have some questions about neural networks.',
      timestamp: '10:20 AM',
    },
    {
      id: '3',
      sender: 'other',
      text: 'Perfect! I\'ll prepare some examples for you.',
      timestamp: '10:25 AM',
    },
    {
      id: '4',
      sender: 'other',
      text: 'See you tomorrow at 2 PM!',
      timestamp: '10:30 AM',
    },
  ],
  '2': [
    {
      id: '1',
      sender: 'user',
      text: 'Hi Michael, can you help me with eigenvalues?',
      timestamp: 'Yesterday 3:00 PM',
    },
    {
      id: '2',
      sender: 'other',
      text: 'Great! I can help with that topic.',
      timestamp: 'Yesterday 3:15 PM',
    },
  ],
  '3': [
    {
      id: '1',
      sender: 'user',
      text: 'Thanks for the session!',
      timestamp: 'Nov 22 4:30 PM',
    },
  ],
};

export const skillCategories = [
  'Mathematics',
  'Computer Science',
  'Physics',
  'Chemistry',
  'Engineering',
  'Biology',
  'Economics',
  'Statistics',
];

export const departments = [
  'Computer Science',
  'Mathematics',
  'Physics',
  'Chemistry',
  'Engineering',
  'Biology',
  'Economics',
  'Business',
];

export interface GroupClass {
  id: string;
  title: string;
  tutorName: string;
  tutorAvatar: string;
  department: string;
  subject: string;
  date: string;
  time: string;
  duration: string;
  enrolled: number;
  maxStudents: number;
  price: number;
  description: string;
  topics: string[];
}

export interface Recording {
  id: string;
  title: string;
  tutorName: string;
  subject: string;
  department: string;
  date: string;
  duration: string;
  views: number;
  thumbnail: string;
  topics: string[];
}

export const mockGroupClasses: GroupClass[] = [
  {
    id: '1',
    title: 'Data Structures & Algorithms Workshop',
    tutorName: 'Sarah Johnson',
    tutorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
    department: 'Computer Science',
    subject: 'Data Structures',
    date: '2025-11-27',
    time: '3:00 PM',
    duration: '2 hours',
    enrolled: 8,
    maxStudents: 15,
    price: 20,
    description: 'Comprehensive workshop covering binary trees, graphs, and advanced algorithms. Perfect for exam preparation.',
    topics: ['Binary Trees', 'Graph Algorithms', 'Dynamic Programming', 'Time Complexity'],
  },
  {
    id: '2',
    title: 'Calculus II Exam Prep',
    tutorName: 'Michael Chen',
    tutorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    department: 'Mathematics',
    subject: 'Calculus',
    date: '2025-11-28',
    time: '5:00 PM',
    duration: '2 hours',
    enrolled: 12,
    maxStudents: 20,
    price: 15,
    description: 'Intensive review session covering integration techniques, series, and applications of calculus.',
    topics: ['Integration Techniques', 'Series & Sequences', 'Parametric Equations', 'Polar Coordinates'],
  },
  {
    id: '3',
    title: 'Quantum Mechanics Study Group',
    tutorName: 'Emily Rodriguez',
    tutorAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
    department: 'Physics',
    subject: 'Quantum Physics',
    date: '2025-11-29',
    time: '2:00 PM',
    duration: '1.5 hours',
    enrolled: 6,
    maxStudents: 10,
    price: 18,
    description: 'Deep dive into quantum mechanics principles with problem-solving practice.',
    topics: ['Wave Functions', 'Schrödinger Equation', 'Quantum States', 'Operators'],
  },
  {
    id: '4',
    title: 'Web Development Bootcamp',
    tutorName: 'Alex Martinez',
    tutorAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
    department: 'Computer Science',
    subject: 'Web Development',
    date: '2025-11-30',
    time: '4:00 PM',
    duration: '3 hours',
    enrolled: 15,
    maxStudents: 25,
    price: 25,
    description: 'Hands-on workshop building a full-stack web application with React and Node.js.',
    topics: ['React Fundamentals', 'REST APIs', 'Database Design', 'Deployment'],
  },
  {
    id: '5',
    title: 'Linear Algebra Crash Course',
    tutorName: 'Michael Chen',
    tutorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    department: 'Mathematics',
    subject: 'Linear Algebra',
    date: '2025-12-01',
    time: '1:00 PM',
    duration: '2 hours',
    enrolled: 10,
    maxStudents: 18,
    price: 15,
    description: 'Complete review of vector spaces, eigenvalues, and matrix operations.',
    topics: ['Vector Spaces', 'Eigenvalues & Eigenvectors', 'Matrix Operations', 'Determinants'],
  },
  {
    id: '6',
    title: 'Machine Learning Fundamentals',
    tutorName: 'Sarah Johnson',
    tutorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
    department: 'Computer Science',
    subject: 'Machine Learning',
    date: '2025-12-02',
    time: '6:00 PM',
    duration: '2.5 hours',
    enrolled: 14,
    maxStudents: 20,
    price: 30,
    description: 'Introduction to ML algorithms with Python implementation examples.',
    topics: ['Supervised Learning', 'Neural Networks', 'Model Evaluation', 'Python Libraries'],
  },
];

export const mockRecordings: Recording[] = [
  {
    id: '1',
    title: 'Introduction to Machine Learning',
    tutorName: 'Sarah Johnson',
    subject: 'Machine Learning',
    department: 'Computer Science',
    date: '2025-11-20',
    duration: '1:45:30',
    views: 234,
    thumbnail: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=600',
    topics: ['ML Basics', 'Algorithms', 'Python'],
  },
  {
    id: '2',
    title: 'Calculus: Integration Techniques',
    tutorName: 'Michael Chen',
    subject: 'Calculus',
    department: 'Mathematics',
    date: '2025-11-18',
    duration: '1:30:00',
    views: 189,
    thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=600',
    topics: ['Integration', 'U-Substitution', 'By Parts'],
  },
  {
    id: '3',
    title: 'Quantum Mechanics Lecture 5',
    tutorName: 'Emily Rodriguez',
    subject: 'Quantum Physics',
    department: 'Physics',
    date: '2025-11-15',
    duration: '2:00:15',
    views: 156,
    thumbnail: 'https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?w=600',
    topics: ['Wave Functions', 'Operators', 'States'],
  },
  {
    id: '4',
    title: 'Data Structures: Trees & Graphs',
    tutorName: 'Sarah Johnson',
    subject: 'Data Structures',
    department: 'Computer Science',
    date: '2025-11-12',
    duration: '1:55:20',
    views: 312,
    thumbnail: 'https://images.unsplash.com/photo-1509228627152-72ae9ae6848d?w=600',
    topics: ['Binary Trees', 'Graph Traversal', 'BFS', 'DFS'],
  },
  {
    id: '5',
    title: 'Linear Algebra: Eigenvalues',
    tutorName: 'Michael Chen',
    subject: 'Linear Algebra',
    department: 'Mathematics',
    date: '2025-11-10',
    duration: '1:40:00',
    views: 201,
    thumbnail: 'https://images.unsplash.com/photo-1596495577886-d920f1fb7238?w=600',
    topics: ['Eigenvalues', 'Eigenvectors', 'Diagonalization'],
  },
  {
    id: '6',
    title: 'Web Development: React Basics',
    tutorName: 'Alex Martinez',
    subject: 'Web Development',
    department: 'Computer Science',
    date: '2025-11-08',
    duration: '2:15:45',
    views: 278,
    thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600',
    topics: ['React', 'Components', 'Hooks', 'State Management'],
  },
  {
    id: '7',
    title: 'Organic Chemistry: Reactions',
    tutorName: 'Jessica Taylor',
    subject: 'Organic Chemistry',
    department: 'Chemistry',
    date: '2025-11-05',
    duration: '1:50:30',
    views: 145,
    thumbnail: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=600',
    topics: ['Mechanisms', 'Synthesis', 'Reactions'],
  },
  {
    id: '8',
    title: 'Circuit Analysis Fundamentals',
    tutorName: 'David Kim',
    subject: 'Circuit Analysis',
    department: 'Engineering',
    date: '2025-11-03',
    duration: '2:05:00',
    views: 167,
    thumbnail: 'https://images.unsplash.com/photo-1581092160607-ee67e8e15935?w=600',
    topics: ['Kirchhoff Laws', 'AC Circuits', 'Impedance'],
  },
];