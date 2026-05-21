export type Teacher = {
  id: string;
  name: string;
  email: string;
  subjects: string[];
  classes: string[];
  attendance: number; // percentage
  salary: number; // monthly salary
  salaryPaid: boolean;
  performance: number; // rating out of 5
};

export type Student = {
  id: string;
  name: string;
  class: string;
  attendance: number;
  feePaid: boolean;
  parent: string;
  grades: Record<string, number>; // subject -> score
};

export type Class = {
  id: string;
  name: string;
  sections: Section[];
  timetable: Record<string, string>; // day -> subject
};

export type Section = {
  id: string;
  name: string;
  teacherId: string;
  studentIds: string[];
};

export type Exam = {
  id: string;
  name: string;
  date: string; // ISO date
  subjects: string[];
  results: Record<string, number>; // studentId -> total score
};

export type Finance = {
  totalFeesCollected: number;
  pendingFees: number;
  totalExpenses: number;
  netRevenue: number;
  transactions: Transaction[];
};

export type Transaction = {
  id: string;
  type: 'fee' | 'expense' | 'salary';
  amount: number;
  date: string;
  description: string;
};

export type Resource = {
  id: string;
  type: 'classroom' | 'lab' | 'library' | 'transport';
  name: string;
  status: 'available' | 'in-use' | 'maintenance';
  quantity: number;
};

export type Notification = {
  id: string;
  message: string;
  date: string;
};

export type ActivityLog = {
  id: string;
  action: string;
  user: string;
  timestamp: string;
};

// Sample mock arrays
export const teachers: Teacher[] = [
  {
    id: 't1',
    name: 'Alice Johnson',
    email: 'alice@example.com',
    subjects: ['Math', 'Physics'],
    classes: ['10A', '11B'],
    attendance: 96,
    salary: 5000,
    salaryPaid: true,
    performance: 4.5,
  },
  {
    id: 't2',
    name: 'Bob Smith',
    email: 'bob@example.com',
    subjects: ['English', 'History'],
    classes: ['9C'],
    attendance: 92,
    salary: 4700,
    salaryPaid: false,
    performance: 4.0,
  },
  // add more as needed
];

export const students: Student[] = [
  {
    id: 's1',
    name: 'Charlie Brown',
    class: '10A',
    attendance: 89,
    feePaid: true,
    parent: 'Lucy Brown',
    grades: { Math: 85, Physics: 78, English: 92 },
  },
  {
    id: 's2',
    name: 'Diana Prince',
    class: '11B',
    attendance: 95,
    feePaid: false,
    parent: 'Steve Prince',
    grades: { Math: 92, Physics: 88, English: 90 },
  },
];

export const classes: Class[] = [
  {
    id: 'c1',
    name: '10A',
    sections: [
      {
        id: 'sec1',
        name: 'Section 1',
        teacherId: 't1',
        studentIds: ['s1'],
      },
    ],
    timetable: { Monday: 'Math', Tuesday: 'Physics', Wednesday: 'English', Thursday: 'History', Friday: 'Chemistry' },
  },
];

export const exams: Exam[] = [
  {
    id: 'e1',
    name: 'Midterm Exam',
    date: '2024-10-15',
    subjects: ['Math', 'Physics', 'English'],
    results: { s1: 250, s2: 275 },
  },
];

export const finance: Finance = {
  totalFeesCollected: 120000,
  pendingFees: 15000,
  totalExpenses: 80000,
  netRevenue: 40000,
  transactions: [
    { id: 'tr1', type: 'fee', amount: 5000, date: '2024-09-01', description: 'Fee from Charlie' },
    { id: 'tr2', type: 'salary', amount: 5000, date: '2024-09-01', description: 'Salary for Alice' },
  ],
};

export const resources: Resource[] = [
  { id: 'r1', type: 'classroom', name: 'Room 101', status: 'available', quantity: 1 },
  { id: 'r2', type: 'library', name: 'Books', status: 'in-use', quantity: 350 },
];

export const notifications: Notification[] = [
  { id: 'n1', message: 'Midterm exams scheduled for next week.', date: '2024-10-01' },
];

export const activityLogs: ActivityLog[] = [
  { id: 'log1', action: 'Created teacher', user: 'admin', timestamp: '2024-09-10T10:00:00Z' },
];
