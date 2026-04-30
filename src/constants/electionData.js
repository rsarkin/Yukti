export const ELECTION_STATS = [
  { end: 969, label: "Million Voters", suffix: "M" },
  { end: 543, label: "Lok Sabha Seats" },
  { end: 36, label: "States + UTs" },
  { end: 1.7, label: "Million Polling Booths", suffix: "M" },
];

export const TIMELINE_STEPS = [
  { id: 1, title: "Election Announced", info: "The Election Commission of India (ECI) announces the election schedule and the Model Code of Conduct comes into force immediately.", image: "/timeline_1.png" },
  { id: 2, title: "Nominations Open", info: "Candidates file their nomination papers. Scrutiny of papers and withdrawal period follows.", image: "/timeline_2.png" },
  { id: 3, title: "Campaigning Period", info: "Political parties and candidates campaign across constituencies to connect with voters. Campaigning ends 48 hours before polling.", image: "/timeline_3.png" },
  { id: 4, title: "Voting Day", info: "Registered voters visit their assigned polling booths to cast their vote using Electronic Voting Machines (EVMs).", image: "/timeline_4.png" },
  { id: 5, title: "Counting Day", info: "Votes recorded in EVMs are counted under strict security. Results are declared constituency by constituency.", image: "/timeline_5.png" },
  { id: 6, title: "Government Formed", info: "The party or coalition with a majority of seats is invited by the President to form the government.", image: "/timeline_6.png" },
];

export const WHY_VOTE_CARDS = [
  {
    title: "Your Constitutional Right",
    text: "Article 326 of the Constitution guarantees your right to vote as a fundamental pillar of our republic.",
  },
  {
    title: "One Vote = Real Power",
    text: "In 1968, a Rajasthan assembly seat was decided by exactly 1 vote. Every single ballot counts.",
  },
  {
    title: "World's Largest Democracy",
    text: "India conducts the largest democratic exercise on Earth. Be part of this historical process.",
  },
];

export const ELECTION_BODIES = [
  {
    title: "Election Commission of India",
    text: "The independent constitutional body that manages all aspects of elections, from scheduling to enforcement of the Model Code of Conduct.",
  },
  {
    title: "Returning Officer",
    text: "The administrative officer at the district level responsible for the entire election process in a specific constituency.",
  },
  {
    title: "Election Observer",
    text: "Officials appointed by the ECI to oversee the polling process on the ground, ensuring it is free, fair, and transparent.",
  },
];

export const FEATURES_LIST = [
  { name: "EVM Simulator", desc: "Experience voting before election day", path: "/evm" },
  { name: "Booth Locator", desc: "Find your polling booth in seconds", path: "/booth" },
  { name: "Constituency Finder", desc: "Enter your pincode, know your seat", path: "/constituency" },
  { name: "Form 6 Guide", desc: "Register to vote, step by step", path: "/register" },
  { name: "Report Misconduct", desc: "Report issues with one tap", path: "/report" },
  { name: "Chat with Yukti", desc: "Ask anything about elections", path: "/chat" },
  { name: "Election News", desc: "Live election updates", path: "/news" },
  { name: "Voter Journey", desc: "Your personal voter roadmap", path: "/journey" },
];

export const EVM_CANDIDATES = [
  { id: 1, name: "Aarav Sharma", party: "Sun Party" },
  { id: 2, name: "Priya Deshmukh", party: "River Party" },
  { id: 3, name: "Rajan Patel", party: "Mountain Party" },
  { id: 4, name: "Meera Iyer", party: "Star Party" },
  { id: 5, name: "Vikram Singh", party: "Leaf Party" },
  { id: 6, name: "None of the Above", party: "NOTA" },
];

export const MISCONDUCT_CATEGORIES = [
  { id: 'bribery', label: 'Bribery or voter inducement', labelHi: 'रिश्वत या मतदाता प्रलोभन' },
  { id: 'intimidation', label: 'Voter intimidation or threats', labelHi: 'मतदाता डराना या धमकी' },
  { id: 'fakenews', label: 'Fake news or misinformation', labelHi: 'फर्जी समाचार या गलत सूचना' },
  { id: 'evmtampering', label: 'EVM tampering allegation', labelHi: 'ईवीएम छेड़छाड़ का आरोप' },
  { id: 'boothcapture', label: 'Booth capturing', labelHi: 'बूथ कब्जा' },
  { id: 'mcc', label: 'Violation of Model Code of Conduct', labelHi: 'आदर्श आचार संहिता का उल्लंघन' },
  { id: 'other', label: 'Other', labelHi: 'अन्य' },
];

export const FORM_STEPS = [
  {
    step: 1,
    title: 'Open the Voter Portal',
    titleHi: 'मतदाता पोर्टल खोलें',
    description: 'Navigate to the official ECI Voter Portal to begin your registration.',
    descriptionHi: 'अपना पंजीकरण शुरू करने के लिए आधिकारिक ECI मतदाता पोर्टल पर जाएं।',
    tips: null,
    action: { label: 'Open Portal', url: 'https://voters.eci.gov.in' },
  },
  {
    step: 2,
    title: 'Select Form Type',
    titleHi: 'फॉर्म प्रकार चुनें',
    description: 'Select Form 6 for New Voter Registration. If you are an NRI voter, select Form 6A instead.',
    descriptionHi: 'नए मतदाता पंजीकरण के लिए फॉर्म 6 चुनें। यदि आप NRI मतदाता हैं, तो फॉर्म 6A चुनें।',
    tips: null,
  },
  {
    step: 3,
    title: 'Enter Personal Details',
    titleHi: 'व्यक्तिगत विवरण दर्ज करें',
    description: 'Fill in your full name exactly as it appears on your Aadhaar card, your date of birth, and gender.',
    descriptionHi: 'अपना पूरा नाम ठीक वैसे ही भरें जैसे आपके आधार कार्ड पर है, अपनी जन्मतिथि और लिंग दर्ज करें।',
    tips: 'Your name must exactly match your Aadhaar card — even minor spelling differences will cause rejection.',
  },
  {
    step: 4,
    title: 'Enter Address Details',
    titleHi: 'पता विवरण दर्ज करें',
    description: 'Enter your current residential address. This determines your constituency and polling booth.',
    descriptionHi: 'अपना वर्तमान आवासीय पता दर्ज करें। यह आपके निर्वाचन क्षेत्र और मतदान केंद्र को निर्धारित करता है।',
    tips: 'If you live in a hostel or PG, use the hostel address. Ask Yukti for help with specific situations.',
  },
  {
    step: 5,
    title: 'Upload Photo',
    titleHi: 'फोटो अपलोड करें',
    description: 'Upload a recent passport-size photograph with a white background. Accepted formats: JPG or PNG, under 2MB.',
    descriptionHi: 'सफेद पृष्ठभूमि वाली हाल की पासपोर्ट आकार की तस्वीर अपलोड करें। स्वीकृत प्रारूप: JPG या PNG, 2MB से कम।',
    tips: null,
  },
  {
    step: 6,
    title: 'Upload Address Proof',
    titleHi: 'पता प्रमाण अपलोड करें',
    description: 'Upload one of the following: Aadhaar Card, Passport, Bank Passbook with photo, or a Utility Bill (not older than 3 months).',
    descriptionHi: 'निम्नलिखित में से एक अपलोड करें: आधार कार्ड, पासपोर्ट, फोटो वाली बैंक पासबुक, या उपयोगिता बिल (3 महीने से पुराना नहीं)।',
    tips: null,
  },
  {
    step: 7,
    title: 'Upload Age Proof',
    titleHi: 'आयु प्रमाण अपलोड करें',
    description: 'Upload one of the following: Aadhaar Card, Birth Certificate, or Class 10 Mark Sheet.',
    descriptionHi: 'निम्नलिखित में से एक अपलोड करें: आधार कार्ड, जन्म प्रमाणपत्र, या कक्षा 10 की मार्कशीट।',
    tips: null,
  },
  {
    step: 8,
    title: 'Submit and Track',
    titleHi: 'सबमिट करें और ट्रैक करें',
    description: 'Review all details and submit the form. You can track your application status on the portal. Verification typically takes about 30 days.',
    descriptionHi: 'सभी विवरणों की समीक्षा करें और फॉर्म सबमिट करें। आप पोर्टल पर अपने आवेदन की स्थिति ट्रैक कर सकते हैं। सत्यापन में आमतौर पर लगभग 30 दिन लगते हैं।',
    tips: null,
  },
];

export const INDIAN_STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand",
  "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
  "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
  "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
  "Uttar Pradesh", "Uttarakhand", "West Bengal",
  "Andaman and Nicobar Islands", "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi", "Jammu and Kashmir", "Ladakh", "Lakshadweep", "Puducherry",
];
