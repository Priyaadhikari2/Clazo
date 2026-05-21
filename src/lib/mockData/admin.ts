export type Teacher = {
  id: string;
  name: string;
  email: string;
  subjects: string[];
  classes: string[];
  attendance: number;
  salary: number;
  salaryPaid: boolean;
  performance: number;
};

export type Student = {
  id: string;
  name: string;
  class: string;
  attendance: number;
  feePaid: boolean;
  parent: string;
  grades: Record<string, number>;
};

export type Class = {
  id: string;
  name: string;
  sections: Section[];
  timetable: Record<string, string>;
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
  date: string;
  subjects: string[];
  results: Record<string, number>;
  status: 'upcoming' | 'ongoing' | 'completed';
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

// ─── Teachers ────────────────────────────────────────────
export const teachers: Teacher[] = [
  { id: 't1', name: 'Alice Johnson', email: 'alice@clazo.edu', subjects: ['Math', 'Physics'], classes: ['10A', '11B'], attendance: 96, salary: 5000, salaryPaid: true, performance: 4.5 },
  { id: 't2', name: 'Bob Smith', email: 'bob@clazo.edu', subjects: ['English', 'History'], classes: ['9C'], attendance: 92, salary: 4700, salaryPaid: false, performance: 4.0 },
  { id: 't3', name: 'Clara Davis', email: 'clara@clazo.edu', subjects: ['Chemistry', 'Biology'], classes: ['10B', '12A'], attendance: 98, salary: 5200, salaryPaid: true, performance: 4.8 },
  { id: 't4', name: 'David Wilson', email: 'david@clazo.edu', subjects: ['Computer Science'], classes: ['11A', '12B'], attendance: 90, salary: 5500, salaryPaid: true, performance: 4.2 },
  { id: 't5', name: 'Eva Martinez', email: 'eva@clazo.edu', subjects: ['Art', 'Music'], classes: ['9A', '10A'], attendance: 88, salary: 4300, salaryPaid: false, performance: 3.9 },
  { id: 't6', name: 'Frank Lee', email: 'frank@clazo.edu', subjects: ['Physical Education'], classes: ['9A', '9B', '10A'], attendance: 95, salary: 4000, salaryPaid: true, performance: 4.1 },
  { id: 't7', name: 'Grace Kim', email: 'grace@clazo.edu', subjects: ['Math', 'Statistics'], classes: ['12A', '12B'], attendance: 97, salary: 5400, salaryPaid: true, performance: 4.7 },
];

// ─── Students ────────────────────────────────────────────
export const students: Student[] = [
  { id: 's1', name: 'Charlie Brown', class: '10A', attendance: 89, feePaid: true, parent: 'Lucy Brown', grades: { Math: 85, Physics: 78, English: 92 } },
  { id: 's2', name: 'Diana Prince', class: '11B', attendance: 95, feePaid: false, parent: 'Steve Prince', grades: { Math: 92, Physics: 88, English: 90 } },
  { id: 's3', name: 'Ethan Hunt', class: '10A', attendance: 78, feePaid: true, parent: 'Julia Hunt', grades: { Math: 72, Physics: 65, English: 80 } },
  { id: 's4', name: 'Fiona Green', class: '9C', attendance: 91, feePaid: true, parent: 'Harold Green', grades: { Math: 88, English: 95, History: 90 } },
  { id: 's5', name: 'George Taylor', class: '12A', attendance: 85, feePaid: false, parent: 'Martha Taylor', grades: { Chemistry: 80, Biology: 76, Math: 82 } },
  { id: 's6', name: 'Hannah White', class: '11A', attendance: 93, feePaid: true, parent: 'Robert White', grades: { 'Computer Science': 95, Math: 90, Physics: 88 } },
  { id: 's7', name: 'Ian Black', class: '10B', attendance: 72, feePaid: false, parent: 'Sarah Black', grades: { Chemistry: 60, Biology: 65, English: 75 } },
  { id: 's8', name: 'Jane Foster', class: '12B', attendance: 97, feePaid: true, parent: 'Donald Foster', grades: { Math: 96, Statistics: 94, 'Computer Science': 92 } },
  { id: 's9', name: 'Kevin Adams', class: '9A', attendance: 83, feePaid: true, parent: 'Lisa Adams', grades: { Art: 90, Music: 85, English: 78 } },
  { id: 's10', name: 'Laura Chen', class: '10A', attendance: 94, feePaid: true, parent: 'Wei Chen', grades: { Math: 91, Physics: 87, Chemistry: 89 } },
];

// ─── Classes ─────────────────────────────────────────────
export const classes: Class[] = [
  { id: 'c1', name: '9A', sections: [{ id: 'sec1', name: 'Section A', teacherId: 't6', studentIds: ['s9'] }], timetable: { Monday: 'Art', Tuesday: 'Music', Wednesday: 'English', Thursday: 'Math', Friday: 'PE' } },
  { id: 'c2', name: '9C', sections: [{ id: 'sec2', name: 'Section A', teacherId: 't2', studentIds: ['s4'] }], timetable: { Monday: 'English', Tuesday: 'History', Wednesday: 'Math', Thursday: 'Science', Friday: 'Art' } },
  { id: 'c3', name: '10A', sections: [{ id: 'sec3', name: 'Section A', teacherId: 't1', studentIds: ['s1', 's3', 's10'] }, { id: 'sec4', name: 'Section B', teacherId: 't6', studentIds: [] }], timetable: { Monday: 'Math', Tuesday: 'Physics', Wednesday: 'English', Thursday: 'Chemistry', Friday: 'PE' } },
  { id: 'c4', name: '10B', sections: [{ id: 'sec5', name: 'Section A', teacherId: 't3', studentIds: ['s7'] }], timetable: { Monday: 'Chemistry', Tuesday: 'Biology', Wednesday: 'Math', Thursday: 'English', Friday: 'Physics' } },
  { id: 'c5', name: '11A', sections: [{ id: 'sec6', name: 'Section A', teacherId: 't4', studentIds: ['s6'] }], timetable: { Monday: 'CS', Tuesday: 'Math', Wednesday: 'Physics', Thursday: 'English', Friday: 'CS Lab' } },
  { id: 'c6', name: '11B', sections: [{ id: 'sec7', name: 'Section A', teacherId: 't1', studentIds: ['s2'] }], timetable: { Monday: 'Math', Tuesday: 'Physics', Wednesday: 'Chemistry', Thursday: 'English', Friday: 'Biology' } },
  { id: 'c7', name: '12A', sections: [{ id: 'sec8', name: 'Section A', teacherId: 't7', studentIds: ['s5'] }], timetable: { Monday: 'Math', Tuesday: 'Statistics', Wednesday: 'Chemistry', Thursday: 'Biology', Friday: 'Math' } },
  { id: 'c8', name: '12B', sections: [{ id: 'sec9', name: 'Section A', teacherId: 't7', studentIds: ['s8'] }], timetable: { Monday: 'Math', Tuesday: 'CS', Wednesday: 'Statistics', Thursday: 'Physics', Friday: 'CS Lab' } },
];

// ─── Exams ───────────────────────────────────────────────
export const exams: Exam[] = [
  { id: 'e1', name: 'Midterm Exam', date: '2024-10-15', subjects: ['Math', 'Physics', 'English'], results: { s1: 255, s2: 270, s3: 217, s4: 273 }, status: 'completed' },
  { id: 'e2', name: 'Final Exam', date: '2025-03-20', subjects: ['Math', 'Physics', 'English', 'Chemistry'], results: { s1: 310, s2: 340 }, status: 'completed' },
  { id: 'e3', name: 'Unit Test 1', date: '2024-08-10', subjects: ['Math'], results: { s1: 42, s2: 48, s3: 35 }, status: 'completed' },
  { id: 'e4', name: 'Unit Test 2', date: '2025-01-12', subjects: ['Physics', 'Chemistry'], results: { s5: 78, s6: 90 }, status: 'completed' },
  { id: 'e5', name: 'Quarterly Assessment', date: '2025-06-05', subjects: ['Math', 'English', 'Science'], results: {}, status: 'upcoming' },
  { id: 'e6', name: 'Practice Test', date: '2025-05-25', subjects: ['Math', 'Physics'], results: {}, status: 'ongoing' },
];

// ─── Finance ─────────────────────────────────────────────
export const finance: Finance = {
  totalFeesCollected: 120000,
  pendingFees: 15000,
  totalExpenses: 80000,
  netRevenue: 40000,
  transactions: [
    { id: 'tr1', type: 'fee', amount: 5000, date: '2024-09-01', description: 'Tuition fee – Charlie Brown' },
    { id: 'tr2', type: 'salary', amount: 5000, date: '2024-09-01', description: 'Monthly salary – Alice Johnson' },
    { id: 'tr3', type: 'fee', amount: 5000, date: '2024-09-03', description: 'Tuition fee – Ethan Hunt' },
    { id: 'tr4', type: 'expense', amount: 1200, date: '2024-09-05', description: 'Lab equipment purchase' },
    { id: 'tr5', type: 'salary', amount: 4700, date: '2024-09-01', description: 'Monthly salary – Bob Smith' },
    { id: 'tr6', type: 'fee', amount: 5000, date: '2024-10-01', description: 'Tuition fee – Fiona Green' },
    { id: 'tr7', type: 'expense', amount: 3500, date: '2024-10-10', description: 'Library books procurement' },
    { id: 'tr8', type: 'salary', amount: 5200, date: '2024-10-01', description: 'Monthly salary – Clara Davis' },
    { id: 'tr9', type: 'fee', amount: 5000, date: '2024-10-02', description: 'Tuition fee – Hannah White' },
    { id: 'tr10', type: 'expense', amount: 800, date: '2024-10-15', description: 'Printer ink & stationery' },
  ],
};

// ─── Resources ───────────────────────────────────────────
export const resources: Resource[] = [
  { id: 'r1', type: 'classroom', name: 'Room 101', status: 'available', quantity: 1 },
  { id: 'r2', type: 'classroom', name: 'Room 102', status: 'in-use', quantity: 1 },
  { id: 'r3', type: 'classroom', name: 'Room 201', status: 'available', quantity: 1 },
  { id: 'r4', type: 'lab', name: 'Physics Lab', status: 'in-use', quantity: 1 },
  { id: 'r5', type: 'lab', name: 'Chemistry Lab', status: 'maintenance', quantity: 1 },
  { id: 'r6', type: 'lab', name: 'Computer Lab', status: 'available', quantity: 1 },
  { id: 'r7', type: 'library', name: 'Main Library', status: 'in-use', quantity: 4500 },
  { id: 'r8', type: 'transport', name: 'School Bus #1', status: 'in-use', quantity: 1 },
  { id: 'r9', type: 'transport', name: 'School Bus #2', status: 'available', quantity: 1 },
  { id: 'r10', type: 'transport', name: 'School Van', status: 'maintenance', quantity: 1 },
];

// ─── Notifications ───────────────────────────────────────
export const notifications: Notification[] = [
  { id: 'n1', message: 'Midterm exams scheduled for next week.', date: '2024-10-01' },
  { id: 'n2', message: 'Parent-teacher meeting on Nov 5.', date: '2024-10-20' },
  { id: 'n3', message: 'Chemistry Lab closed for maintenance.', date: '2024-10-22' },
  { id: 'n4', message: 'Annual sports day registration open.', date: '2024-11-01' },
];

// ─── Activity Logs ───────────────────────────────────────
export const activityLogs: ActivityLog[] = [
  { id: 'log1', action: 'Created teacher Alice Johnson', user: 'admin', timestamp: '2024-09-10T10:00:00Z' },
  { id: 'log2', action: 'Enrolled student Charlie Brown', user: 'admin', timestamp: '2024-09-10T10:15:00Z' },
  { id: 'log3', action: 'Updated class 10A timetable', user: 'admin', timestamp: '2024-09-12T09:30:00Z' },
  { id: 'log4', action: 'Created Midterm Exam', user: 'admin', timestamp: '2024-09-15T11:00:00Z' },
  { id: 'log5', action: 'Processed salary for Alice Johnson', user: 'admin', timestamp: '2024-10-01T08:00:00Z' },
  { id: 'log6', action: 'Marked Chemistry Lab for maintenance', user: 'admin', timestamp: '2024-10-22T14:00:00Z' },
  { id: 'log7', action: 'Updated fee status for Diana Prince', user: 'admin', timestamp: '2024-10-25T10:30:00Z' },
  { id: 'log8', action: 'Added School Bus #2', user: 'admin', timestamp: '2024-11-01T09:00:00Z' },
];
