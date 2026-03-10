export const servicesCatalog = [
  'Dubai Visa',
  'Schengen Visa',
  'Turkey Visa',
  'Travel Insurance',
  'Flight Booking',
  'Hotel Booking',
  'Tour Package',
] as const;

export const workerKpis = [
  { label: "Today's Follow-ups", value: 9 },
  { label: 'Urgent Visa Cases', value: 4 },
  { label: 'Missing Documents', value: 11 },
  { label: 'Pending Submissions', value: 5 },
  { label: 'Awaiting Decision', value: 6 },
  { label: 'Pending Ticket Issuance', value: 3 },
  { label: 'Invoices To Collect', value: 8 },
  { label: 'Tasks Assigned To Me', value: 7 },
];

export const ownerKpis = [
  { label: 'New Leads Today', value: 14 },
  { label: 'Active Visa Cases', value: 52 },
  { label: 'Active Travel Bookings', value: 39 },
  { label: 'Revenue Today', value: '$6,240' },
  { label: 'Revenue Week', value: '$32,880' },
  { label: 'Revenue Month', value: '$118,300' },
  { label: 'Outstanding Invoices', value: '$46,950' },
  { label: 'Conversion Rate', value: '34.8%' },
  { label: 'Overdue Follow-ups', value: 9 },
];

export const clients = [
  {
    id: 'CL-1001',
    fullName: 'Ahmed Hassan',
    passport_number: 'A12345678',
    nationality: 'Egyptian',
    date_of_birth: '1991-05-18',
    destination_country: 'UAE',
    notes: 'Frequent traveler, prefers express processing.',
  },
  {
    id: 'CL-1002',
    fullName: 'Fatima Ali',
    passport_number: 'B55443321',
    nationality: 'Pakistani',
    date_of_birth: '1994-11-06',
    destination_country: 'Germany',
    notes: 'First Schengen application.',
  },
  {
    id: 'CL-1003',
    fullName: 'Northstar Tours',
    passport_number: 'N/A',
    nationality: 'UAE',
    date_of_birth: 'N/A',
    destination_country: 'Europe',
    notes: 'Corporate travel insurance account.',
  },
  {
    id: 'CL-1004',
    fullName: 'Rahul Mehta',
    passport_number: 'P99887766',
    nationality: 'Indian',
    date_of_birth: '1989-03-22',
    destination_country: 'Turkey',
    notes: 'Needs return-flexible booking.',
  },
] as const;

export const workerCases = [
  {
    id: 'C-3001',
    client: 'Ahmed Hassan',
    service: 'Dubai Visa',
    status: 'documents_pending',
    priority: 'high',
    dueDate: '2026-03-14',
    daysSinceContact: 2,
    outstanding: '$780',
    boardStatus: 'waiting_client',
    embassy_or_consulate: 'UAE Visa Center - Dubai',
    destination_country: 'UAE',
    travel_date: '2026-03-28',
    return_date: '2026-04-08',
    submission_date: '2026-03-16',
    decision_date: '2026-03-22',
    assigned_staff: 'Sarah Khan',
    notes: 'Awaiting salary certificate and bank statement.',
  },
  {
    id: 'C-3002',
    client: 'Fatima Ali',
    service: 'Schengen Visa',
    status: 'under_review',
    priority: 'urgent',
    dueDate: '2026-03-19',
    daysSinceContact: 1,
    outstanding: '$1,250',
    boardStatus: 'in_progress',
    embassy_or_consulate: 'Germany Consulate',
    destination_country: 'Germany',
    travel_date: '2026-04-11',
    return_date: '2026-04-23',
    submission_date: '2026-03-10',
    decision_date: '2026-03-24',
    assigned_staff: 'Nadia Ibrahim',
    notes: 'Biometrics completed. Monitoring decision window.',
  },
  {
    id: 'C-3011',
    client: 'Northstar Tours',
    service: 'Travel Insurance',
    status: 'quoted',
    priority: 'medium',
    dueDate: '2026-03-11',
    daysSinceContact: 3,
    outstanding: '$2,400',
    boardStatus: 'waiting_payment',
    embassy_or_consulate: 'N/A',
    destination_country: 'Europe',
    travel_date: '2026-04-01',
    return_date: '2026-04-14',
    submission_date: 'N/A',
    decision_date: 'N/A',
    assigned_staff: 'Ravi Patel',
    notes: 'Corporate policy draft sent, waiting payment.',
  },
  {
    id: 'C-3015',
    client: 'Rahul Mehta',
    service: 'Flight Booking',
    status: 'ticketed',
    priority: 'high',
    dueDate: '2026-03-18',
    daysSinceContact: 0,
    outstanding: '$460',
    boardStatus: 'new',
    embassy_or_consulate: 'N/A',
    destination_country: 'Turkey',
    travel_date: '2026-03-29',
    return_date: '2026-04-04',
    submission_date: 'N/A',
    decision_date: 'N/A',
    assigned_staff: 'Sarah Khan',
    notes: 'Need passport copy to issue final e-ticket.',
  },
  {
    id: 'C-2999',
    client: 'Ahmed Hassan',
    service: 'Hotel Booking',
    status: 'completed',
    priority: 'low',
    dueDate: '2026-03-07',
    daysSinceContact: 0,
    outstanding: '$0',
    boardStatus: 'completed',
    embassy_or_consulate: 'N/A',
    destination_country: 'UAE',
    travel_date: '2026-03-09',
    return_date: '2026-03-16',
    submission_date: 'N/A',
    decision_date: 'N/A',
    assigned_staff: 'Nadia Ibrahim',
    notes: 'Hotel voucher delivered and acknowledged.',
  },
] as const;

export const leads = [
  { id: 'L-2001', name: 'Ahmed Hassan', source: 'Referral', service: 'Dubai Visa', status: 'new', followUp: 'Today 15:00', owner: 'Sarah Khan' },
  { id: 'L-2002', name: 'Fatima Ali', source: 'Instagram', service: 'Schengen Visa', status: 'contacted', followUp: 'Tomorrow 11:30', owner: 'Nadia Ibrahim' },
  { id: 'L-2003', name: 'Rahul Mehta', source: 'Google Ads', service: 'Flight Booking', status: 'interested', followUp: 'Today 17:00', owner: 'Ravi Patel' },
  { id: 'L-2004', name: 'Northstar Tours', source: 'Website', service: 'Travel Insurance', status: 'quoted', followUp: 'Friday 10:00', owner: 'Sarah Khan' },
] as const;

export const revenueTrend = [35, 52, 60, 58, 73, 69, 78];
export const pipelineFunnel = [100, 82, 63, 47, 33];
export const profitabilityBars = [62, 56, 43, 49, 58, 45, 51];
export const workloadHeat = [31, 24, 28, 16, 22, 19];
export const leadSourceRoi = [52, 38, 26, 21, 14];

export const byService = [
  { name: 'Dubai Visa', amount: '$28,300' },
  { name: 'Schengen Visa', amount: '$24,100' },
  { name: 'Flight Booking', amount: '$19,400' },
  { name: 'Travel Insurance', amount: '$17,900' },
  { name: 'Tour Package', amount: '$14,200' },
];

export const bySource = [
  { name: 'Referral', value: '41%' },
  { name: 'Google Ads', value: '27%' },
  { name: 'Instagram', value: '14%' },
  { name: 'Website', value: '12%' },
  { name: 'Walk-In', value: '6%' },
];

export const staffPerformance = [
  { name: 'Sarah Khan', completed: 34, overdue: 4 },
  { name: 'Nadia Ibrahim', completed: 29, overdue: 2 },
  { name: 'Ravi Patel', completed: 26, overdue: 5 },
];

export const recentActivity = [
  'Fatima Ali visa moved to under_review by Nadia',
  'Rahul Mehta ticket quote accepted',
  'Northstar Tours insurance invoice INV-901 sent',
  'Ahmed Hassan passport copy uploaded',
];

export const workerSecondary = {
  upcomingFollowUps: ['Ahmed Hassan · Today 15:00', 'Rahul Mehta · Today 17:00', 'Fatima Ali · Tomorrow 11:30'],
  recentNotes: ['Embassy appointment confirmed for Fatima Ali', 'Need clearer bank statement scan from Ahmed', 'Flight fare hold expires tonight for Rahul'],
  tasksAssigned: ['Call client for passport copy', 'Submit visa application', 'Issue ticket', 'Send insurance certificate', 'Follow up embassy result', 'Collect balance payment'],
  docsWaitingClient: ['Ahmed Hassan · Bank statement', 'Rahul Mehta · Passport first page', 'Fatima Ali · Invitation letter'],
  casesWaitingResponse: ['C-3002 · Awaiting embassy decision', 'C-3001 · Waiting pending docs'],
};

export const caseTimeline = [
  { icon: '🟦', timestamp: '2026-03-09 09:10', staff: 'Sarah Khan', description: 'Case created for Ahmed Hassan - Dubai Visa' },
  { icon: '📝', timestamp: '2026-03-09 10:04', staff: 'Sarah Khan', description: 'Note added: missing latest bank statement' },
  { icon: '📎', timestamp: '2026-03-09 13:15', staff: 'Nadia Ibrahim', description: 'Document uploaded: passport copy' },
  { icon: '🧾', timestamp: '2026-03-09 16:00', staff: 'Sarah Khan', description: 'Invoice created INV-3001 for visa processing' },
  { icon: '💳', timestamp: '2026-03-10 10:48', staff: 'Ravi Patel', description: 'Payment recorded: $300 deposit' },
  { icon: '🔁', timestamp: '2026-03-10 11:02', staff: 'Sarah Khan', description: 'Status changed to documents_pending' },
  { icon: '📅', timestamp: '2026-03-10 11:05', staff: 'Sarah Khan', description: 'Follow-up scheduled for pending document call' },
];

export const documentChecklist = [
  { name: 'Passport', status: 'uploaded' },
  { name: 'Photo', status: 'verified' },
  { name: 'Bank Statement', status: 'pending' },
  { name: 'Application Form', status: 'verified' },
  { name: 'Insurance', status: 'uploaded' },
  { name: 'Ticket Reservation', status: 'pending' },
  { name: 'Hotel Booking', status: 'pending' },
  { name: 'Invitation Letter', status: 'rejected' },
] as const;

export const reportsData = {
  visaCases: [['Dubai Visa', 18, 12, 3], ['Schengen Visa', 14, 9, 2], ['Turkey Visa', 10, 7, 1]],
  travelBookings: [['Flight Booking', 21, 16, 4], ['Hotel Booking', 19, 15, 2], ['Tour Package', 8, 5, 1]],
  outstandingPayments: [['Ahmed Hassan', '$780', '3 days'], ['Northstar Tours', '$2,400', '5 days'], ['Rahul Mehta', '$460', '1 day']],
  leadsBySource: [['Referral', 41], ['Google Ads', 27], ['Instagram', 14], ['Website', 12]],
  serviceRevenue: [['Dubai Visa', '$28,300'], ['Schengen Visa', '$24,100'], ['Flight Booking', '$19,400']],
  staffPerformance: [['Sarah Khan', 34, 4], ['Nadia Ibrahim', 29, 2], ['Ravi Patel', 26, 5]],
  overdueFollowUps: [['Ahmed Hassan', 'Today'], ['Rahul Mehta', 'Today'], ['Fatima Ali', 'Yesterday']],
} as const;

export const revenueKpis = [
  { label: 'Revenue Today', value: '$6,240' },
  { label: 'Revenue This Week', value: '$32,880' },
  { label: 'Revenue This Month', value: '$118,300' },
  { label: 'Outstanding Invoices', value: '$46,950' },
  { label: 'Collected Payments', value: '$71,350' },
];

export const staffPerformanceKpis = [
  { label: 'Cases Completed', value: 89 },
  { label: 'Overdue Items', value: 11 },
  { label: 'Payments Collected', value: '$18,440' },
  { label: 'Lead Conversions', value: '36.4%' },
];

export const staffRanking = [
  ['Sarah Khan', 34, 4, '$7,150', '42%'],
  ['Nadia Ibrahim', 29, 2, '$6,420', '39%'],
  ['Ravi Patel', 26, 5, '$4,870', '28%'],
];
