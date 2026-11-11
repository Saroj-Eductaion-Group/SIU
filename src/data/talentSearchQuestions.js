// Question Bank for Talent Search Program 2026-27 (Level 1 Test)
// 50 Questions per stream (10 per subject) with 4 Paper Sets (A, B, C, D)

export const STREAMS = [
  { id: 'PCM', label: 'PCM (Physics, Chemistry, Maths)', subjects: ['Physics', 'Chemistry', 'Mathematics', 'General English', 'General Knowledge'] },
  { id: 'PCB', label: 'PCB (Physics, Chemistry, Biology)', subjects: ['Physics', 'Chemistry', 'Biology', 'General English', 'General Knowledge'] },
  { id: 'PCM+Bio', label: 'PCM + Biology (PCMB)', subjects: ['Physics', 'Chemistry', 'Mathematics', 'Biology', 'English & GK'] },
  { id: 'Commerce', label: 'Commerce', subjects: ['Accountancy', 'Business Studies', 'Economics', 'General English', 'General Knowledge'] },
  { id: 'Arts', label: 'Arts', subjects: ['History', 'Political Science', 'Geography & Sociology', 'General English', 'General Knowledge'] },
  { id: 'Humanities', label: 'Humanities', subjects: ['History', 'Political Science', 'Economics & Psychology', 'General English', 'General Knowledge'] },
];

export const SUBJECT_POOLS = {
  Physics: [
    { q: "What is the SI unit of electric flux?", opts: ["Volt × metre", "Newton / Coulomb", "Tesla × metre²", "Weber / metre"], ans: 0 },
    { q: "The dimensional formula of the universal gravitational constant (G) is:", opts: ["[M⁻¹ L³ T⁻²]", "[M¹ L² T⁻¹]", "[M⁻¹ L² T⁻²]", "[M⁰ L³ T⁻¹]"], ans: 0 },
    { q: "What is the total work done in moving a test charge over an equipotential surface?", opts: ["Positive", "Negative", "Zero", "Infinite"], ans: 2 },
    { q: "The phenomenon primarily responsible for the twinkling of stars is:", opts: ["Total internal reflection", "Atmospheric refraction", "Optical dispersion", "Diffraction of light"], ans: 1 },
    { q: "Lenz's Law is a direct consequence of the law of conservation of:", opts: ["Mass", "Charge", "Energy", "Momentum"], ans: 2 },
    { q: "The de Broglie wavelength (λ) associated with a particle of momentum 'p' is:", opts: ["h / p", "p / h", "h × p", "p / h²"], ans: 0 },
    { q: "A pure semiconductor behaves as an insulator at what temperature?", opts: ["0°C", "Room temperature", "0 Kelvin (Absolute zero)", "100°C"], ans: 2 },
    { q: "Two equal and opposite charges (+q and -q) separated by a small distance 2a form an:", opts: ["Electric monopole", "Electric dipole", "Electric quadrupole", "Electromagnetic wave"], ans: 1 },
    { q: "What is the focal length of a flat plane mirror?", opts: ["Zero", "Infinite", "1 metre", "100 cm"], ans: 1 },
    { q: "The speed of electromagnetic waves in a vacuum is given by:", opts: ["1 / √(μ₀ε₀)", "√(μ₀ε₀)", "μ₀ / ε₀", "ε₀ / μ₀"], ans: 0 },
  ],

  Chemistry: [
    { q: "What is the oxidation state of Chromium (Cr) in potassium dichromate (K₂Cr₂O₇)?", opts: ["+3", "+4", "+6", "+7"], ans: 2 },
    { q: "How many effective atoms are present in a Face-Centered Cubic (FCC) unit cell?", opts: ["1", "2", "3", "4"], ans: 3 },
    { q: "What is the hybridization of the carbon atom in methane (CH₄)?", opts: ["sp", "sp²", "sp³", "dsp²"], ans: 2 },
    { q: "Which gas is evolved when granulated zinc reacts with dilute sulfuric acid (H₂SO₄)?", opts: ["Oxygen (O₂)", "Hydrogen (H₂)", "Sulfur dioxide (SO₂)", "Nitrogen (N₂)"], ans: 1 },
    { q: "What is the correct IUPAC name of the compound CH₃-CH₂-CHO?", opts: ["Propanone", "Propanal", "Propanoic acid", "Propanol"], ans: 1 },
    { q: "Which metal is used as a promoter/catalyst in Haber's process for synthesizing ammonia?", opts: ["Iron (Fe)", "Nickel (Ni)", "Platinum (Pt)", "Copper (Cu)"], ans: 0 },
    { q: "Which of the following is classified as a transition metal (d-block)?", opts: ["Sodium (Na)", "Calcium (Ca)", "Copper (Cu)", "Aluminium (Al)"], ans: 2 },
    { q: "The unit of rate constant for a first-order chemical reaction is:", opts: ["mol L⁻¹ s⁻¹", "L mol⁻¹ s⁻¹", "s⁻¹", "mol⁻² L² s⁻¹"], ans: 2 },
    { q: "Deficiency of Vitamin C (Ascorbic acid) causes which disease?", opts: ["Rickets", "Beriberi", "Scurvy", "Night blindness"], ans: 2 },
    { q: "Which of the following is a colligative property of a solution?", opts: ["Refractive index", "Viscosity", "Osmotic pressure", "Surface tension"], ans: 2 },
  ],

  Mathematics: [
    { q: "What is the derivative of sin(2x) with respect to x?", opts: ["cos(2x)", "2 cos(2x)", "-2 cos(2x)", "2 sin(x)"], ans: 1 },
    { q: "The value of the 2x2 determinant |[2, 3], [1, 4]| is:", opts: ["5", "8", "11", "-5"], ans: 0 },
    { q: "Evaluate the indefinite integral: ∫ (1 / x) dx (for x > 0):", opts: ["ln(x) + C", "x² / 2 + C", "-1 / x² + C", "eˣ + C"], ans: 0 },
    { q: "A square matrix A is called an idempotent matrix if:", opts: ["A² = 0", "A² = I", "A² = A", "Aᵀ = -A"], ans: 2 },
    { q: "What is the principal value of sin⁻¹(1/2)?", opts: ["π/6", "π/3", "π/4", "π/2"], ans: 0 },
    { q: "Two non-zero vectors a and b are perpendicular to each other if and only if:", opts: ["a · b = 0", "a × b = 0", "a + b = 0", "|a| = |b|"], ans: 0 },
    { q: "What is the Euclidean distance between points (1, 2) and (4, 6)?", opts: ["4", "5", "6", "7"], ans: 1 },
    { q: "The sum of the first n natural numbers is represented by:", opts: ["n(n+1)/2", "n²", "n(n-1)/2", "n(2n+1)/2"], ans: 0 },
    { q: "What is the value of limit: lim (x → 0) [sin(x) / x]?", opts: ["0", "1", "Undefined", "Infinity"], ans: 1 },
    { q: "If a fair six-sided die is rolled, what is the probability of rolling a prime number (2, 3, 5)?", opts: ["1/6", "1/3", "1/2", "2/3"], ans: 2 },
  ],

  Biology: [
    { q: "Which cellular organelle is universally referred to as the 'powerhouse of the cell'?", opts: ["Ribosome", "Golgi apparatus", "Mitochondria", "Lysosome"], ans: 2 },
    { q: "The basic structural and functional filtration unit of the human kidney is the:", opts: ["Nephron", "Neuron", "Alveolus", "Hepatic lobule"], ans: 0 },
    { q: "Where does the light-dependent reaction of photosynthesis occur in chloroplasts?", opts: ["Stroma", "Thylakoid membranes (Grana)", "Outer membrane", "Cytoplasm"], ans: 1 },
    { q: "Which endocrine hormone regulates glucose uptake and reduces blood sugar levels?", opts: ["Glucagon", "Insulin", "Thyroxine", "Adrenaline"], ans: 1 },
    { q: "Mendel's law stating that paired allele factors separate cleanly during gamete formation is:", opts: ["Law of Segregation", "Law of Independent Assortment", "Law of Dominance", "Law of Linkage"], ans: 0 },
    { q: "In a double-stranded DNA helix, Adenine forms hydrogen bonds with Thymine through:", opts: ["1 Hydrogen bond", "2 Hydrogen bonds", "3 Hydrogen bonds", "Covalent bond"], ans: 1 },
    { q: "Which ABO blood group lacks A and B antigens on RBCs and is a universal donor?", opts: ["AB positive", "A positive", "B positive", "O negative / O"], ans: 3 },
    { q: "The conversion of atmospheric nitrogen gas (N₂) into bioavailable ammonia (NH₃) is called:", opts: ["Nitrification", "Denitrification", "Biological Nitrogen Fixation", "Ammonification"], ans: 2 },
    { q: "Who is globally recognized as the 'Father of Classical Genetics'?", opts: ["Charles Darwin", "Gregor Johann Mendel", "Louis Pasteur", "Thomas Hunt Morgan"], ans: 1 },
    { q: "Which molecular biotechnology technique is used to amplify DNA sequences into millions of copies?", opts: ["Western Blotting", "Polymerase Chain Reaction (PCR)", "Gel Electrophoresis", "Chromatography"], ans: 1 },
  ],

  Accountancy: [
    { q: "According to golden rules of accounting, the rule for Real Accounts is:", opts: ["Debit all expenses, Credit all incomes", "Debit the receiver, Credit the giver", "Debit what comes in, Credit what goes out", "Debit all assets, Credit all capital"], ans: 2 },
    { q: "A Trial Balance is prepared primarily to verify:", opts: ["Financial position", "Arithmetical accuracy of ledger postings", "Net profit or loss", "Cash flow position"], ans: 1 },
    { q: "Goodwill in accounting is classified under which category of assets?", opts: ["Current Asset", "Intangible Fixed Asset", "Fictitious Asset", "Liquid Asset"], ans: 1 },
    { q: "In the absence of a registered Partnership Deed, profits and losses are shared:", opts: ["In capital ratio", "Equally among all partners", "As decided by senior partner", "60:40 ratio"], ans: 1 },
    { q: "What is the maximum number of partners allowed in a partnership firm under Companies Act 2013?", opts: ["20", "50", "100", "Unlimited"], ans: 1 },
    { q: "In Not-for-Profit Organizations (NPO), excess of total assets over total liabilities is termed:", opts: ["Surplus", "Capital Fund", "Deficit", "Working Capital"], ans: 1 },
    { q: "When shares are forfeited by a company, the Share Capital Account is debited with:", opts: ["Face value", "Called-up amount", "Paid-up amount", "Market value"], ans: 1 },
    { q: "Depreciation is defined in accounting as the gradual:", opts: ["Decrease in market price", "Allocation of depreciable cost over asset's life", "Physical destruction of asset", "Cash expenditure for repair"], ans: 1 },
    { q: "In India, Cash Flow Statements are prepared in accordance with Accounting Standard:", opts: ["AS-1", "AS-3 (Revised)", "AS-10", "AS-14"], ans: 1 },
    { q: "Debentures issued by a joint stock company represent:", opts: ["Ownership capital", "Borrowed / Debt capital", "Retained earnings", "Reserve funds"], ans: 1 },
  ],

  BusinessStudies: [
    { q: "Who is celebrated as the 'Father of Scientific Management'?", opts: ["Henri Fayol", "F.W. Taylor", "Peter Drucker", "Elton Mayo"], ans: 1 },
    { q: "How many fundamental general principles of management were formulated by Henri Fayol?", opts: ["10", "12", "14", "16"], ans: 2 },
    { q: "Which is the primary and initial function of the management process?", opts: ["Directing", "Staffing", "Planning", "Controlling"], ans: 2 },
    { q: "The process of dividing work and grouping related activities into units is known as:", opts: ["Planning", "Organizing", "Delegation", "Coordination"], ans: 1 },
    { q: "Delegation of authority essentially involves the transfer of:", opts: ["Only authority", "Only responsibility", "Authority and corresponding responsibility", "Ultimate accountability"], ans: 2 },
    { q: "Which of the following is considered a non-financial incentive for employees?", opts: ["Bonus", "Job recognition & status", "Commission", "Profit sharing"], ans: 1 },
    { q: "Under Consumer Protection Act in India, which apex commission handles national-level claims?", opts: ["District Consumer Commission", "State Consumer Commission", "National Consumer Disputes Redressal Commission (NCDRC)", "Supreme Court"], ans: 2 },
    { q: "The 4 Ps of the traditional Marketing Mix are:", opts: ["Product, Price, Place, Promotion", "Plan, Price, People, Process", "Product, Person, Place, Package", "Purchase, Profit, Price, Place"], ans: 0 },
    { q: "The statutory regulatory body governing securities and stock exchanges in India is:", opts: ["RBI", "SEBI", "IRDAI", "TRAI"], ans: 1 },
    { q: "The crucial link bridging agricultural and manufactured goods from producers to consumers is:", opts: ["Creditors", "Distribution Channels / Middlemen", "Competitors", "Shareholders"], ans: 1 },
  ],

  Economics: [
    { q: "Who is widely regarded as the 'Father of Modern Economics'?", opts: ["John Maynard Keynes", "Adam Smith", "Alfred Marshall", "Karl Marx"], ans: 1 },
    { q: "When Marginal Utility (MU) reaches zero, Total Utility (TU) is at its:", opts: ["Minimum", "Zero", "Maximum", "Negative"], ans: 2 },
    { q: "The Law of Demand states that, other things remaining equal, there is:", opts: ["Direct relation between price and demand", "Inverse relation between price and quantity demanded", "No relation between price and demand", "Positive relation with income"], ans: 1 },
    { q: "Which institution functions as the Central Monetary Bank of India?", opts: ["State Bank of India (SBI)", "Reserve Bank of India (RBI)", "NABARD", "Ministry of Finance"], ans: 1 },
    { q: "What does the abbreviation GDP stand for in macroeconomics?", opts: ["Gross Domestic Product", "General Domestic Profit", "Global Development Plan", "Gross Deposit Portfolio"], ans: 0 },
    { q: "Inflation in an economy is defined as:", opts: ["Rise in stock prices", "Persistent general increase in price level", "Decrease in money supply", "Deficit in trade"], ans: 1 },
    { q: "A curve showing combinations of two consumer goods offering identical level of satisfaction is:", opts: ["Demand curve", "Indifference curve", "Production Possibility Curve", "Supply curve"], ans: 1 },
    { q: "Which premier policy think tank replaced the Planning Commission in India in 2015?", opts: ["Finance Commission", "NITI Aayog", "National Statistical Office", "Central Vigilance Commission"], ans: 1 },
    { q: "Fiscal Policy in India is formulated and implemented by:", opts: ["Reserve Bank of India", "Government of India / Ministry of Finance", "SEBI", "Supreme Court"], ans: 1 },
    { q: "A market structure characterized by a single seller selling a unique product with no close substitutes is:", opts: ["Perfect Competition", "Monopoly", "Monopolistic Competition", "Oligopoly"], ans: 1 },
  ],

  History: [
    { q: "The famous 'Great Bath' of the ancient Indus Valley Civilization was excavated at:", opts: ["Harappa", "Mohenjo-daro", "Lothal", "Kalibangan"], ans: 1 },
    { q: "Who was the founder of the Mauryan Empire in ancient India?", opts: ["Ashoka", "Chandragupta Maurya", "Bindusara", "Samudragupta"], ans: 1 },
    { q: "The royal inscriptions and rock edicts of Emperor Ashoka were predominantly written in:", opts: ["Devanagari script", "Brahmi script", "Kharosthi script", "Greek script"], ans: 1 },
    { q: "The monumental 11th-century travelogue 'Kitab-ul-Hind' was authored by:", opts: ["Ibn Battuta", "Al-Biruni", "Francois Bernier", "Abul Fazl"], ans: 1 },
    { q: "The capital city of the historic Vijayanagara Empire was located at:", opts: ["Madurai", "Hampi", "Tanjore", "Golconda"], ans: 1 },
    { q: "The historic Battle of Plassey, laying foundations of British rule in Bengal, took place in:", opts: ["1757", "1764", "1857", "1773"], ans: 0 },
    { q: "Who was declared the symbolic leader and Emperor of India during the 1857 Revolt in Delhi?", opts: ["Nana Saheb", "Bahadur Shah Zafar II", "Mangal Pandey", "Tantia Tope"], ans: 1 },
    { q: "Mahatma Gandhi launched the historic Salt March (Dandi Satyagraha) in the year:", opts: ["1920", "1930", "1942", "1919"], ans: 1 },
    { q: "Who served as the Chairman of the Drafting Committee of the Indian Constituent Assembly?", opts: ["Dr. Rajendra Prasad", "Dr. B.R. Ambedkar", "Jawaharlal Nehru", "Sardar Vallabhbhai Patel"], ans: 1 },
    { q: "The historic slogan 'Do or Die' (Karo ya Maro) was given during which nationalist movement?", opts: ["Non-Cooperation Movement", "Civil Disobedience Movement", "Quit India Movement (1942)", "Swadeshi Movement"], ans: 2 },
  ],

  PoliticalScience: [
    { q: "Who is venerated as the 'Father of the Constitution of India'?", opts: ["Mahatma Gandhi", "Dr. B.R. Ambedkar", "Dr. Rajendra Prasad", "B.N. Rau"], ans: 1 },
    { q: "Which Article of the Indian Constitution guarantees the 'Right to Constitutional Remedies'?", opts: ["Article 14", "Article 19", "Article 21", "Article 32"], ans: 3 },
    { q: "What is the minimum age qualification prescribed to contest the election for the President of India?", opts: ["25 years", "30 years", "35 years", "40 years"], ans: 2 },
    { q: "The Rajya Sabha is a permanent legislative house where one-third of its members retire every:", opts: ["1 year", "2 years", "3 years", "5 years"], ans: 1 },
    { q: "How many Fundamental Rights are currently enshrined in Part III of the Constitution of India?", opts: ["5", "6", "7", "8"], ans: 1 },
    { q: "The doctrine of 'Judicial Review' in the Indian Constitution was adopted from which country?", opts: ["United Kingdom", "United States of America", "Canada", "Australia"], ans: 1 },
    { q: "The first nationwide General Elections in independent India took place during:", opts: ["1947–1948", "1951–1952", "1955–1956", "1960–1961"], ans: 1 },
    { q: "The historic 73rd Constitutional Amendment Act of 1992 granted constitutional status to:", opts: ["Urban Municipalities", "Panchayati Raj Institutions", "Finance Commission", "NITI Aayog"], ans: 1 },
    { q: "The international headquarters of the United Nations (UN) is situated in:", opts: ["Geneva", "New York City", "Paris", "Washington D.C."], ans: 1 },
    { q: "The Election Commission of India functions under which Article of the Constitution?", opts: ["Article 280", "Article 312", "Article 324", "Article 356"], ans: 2 },
  ],

  GeographySociology: [
    { q: "Which is the largest state in India by total land surface area?", opts: ["Madhya Pradesh", "Maharashtra", "Rajasthan", "Uttar Pradesh"], ans: 2 },
    { q: "The Standard Meridian of India (82°30' E) passes through which town in Uttar Pradesh?", opts: ["Varanasi", "Mirzapur", "Kanpur", "Gorakhpur"], ans: 1 },
    { q: "What is the highest mountain peak in South India / Western Ghats?", opts: ["Doda Betta", "Anamudi", "Kalsubai", "Mahendragiri"], ans: 1 },
    { q: "Which major peninsular river in India is traditionally referred to as 'Dakshin Ganga'?", opts: ["Krishna", "Godavari", "Cauvery", "Mahanadi"], ans: 1 },
    { q: "Which specialized soil type is also known as 'Regur Soil' and is best for cotton cultivation?", opts: ["Alluvial soil", "Black soil", "Red soil", "Laterite soil"], ans: 1 },
    { q: "The traditional Indian Joint Family system is primarily characterized by:", opts: ["Nuclear residence only", "Common residence, shared property & kitchen", "Individual property rights", "Absence of kinship bonds"], ans: 1 },
    { q: "Social stratification under the caste system in India is fundamentally based on:", opts: ["Educational achievement", "Ascription by birth", "Wealth accumulation", "Political affiliation"], ans: 1 },
    { q: "The sociological concept of 'Sanskritization' to explain upward social mobility was formulated by:", opts: ["G.S. Ghurye", "M.N. Srinivas", "Andre Beteille", "Yogendra Singh"], ans: 1 },
    { q: "According to Census 2011, which Indian state records the lowest population density (17 persons/km²)?", opts: ["Sikkim", "Mizoram", "Arunachal Pradesh", "Nagaland"], ans: 2 },
    { q: "The Indian Meteorological Department (IMD) operates under which Central Ministry?", opts: ["Ministry of Environment", "Ministry of Earth Sciences", "Ministry of Science & Tech", "Ministry of Home Affairs"], ans: 1 },
  ],

  EconomicsPsychology: [
    { q: "The concept of Intelligence Quotient (IQ) was originally formulated by psychologist:", opts: ["Alfred Binet", "William Stern", "Lewis Terman", "David Wechsler"], ans: 1 },
    { q: "The landmark 'Theory of Multiple Intelligences' (8 distinct modalities) was proposed by:", opts: ["Howard Gardner", "Robert Sternberg", "Charles Spearman", "Jean Piaget"], ans: 0 },
    { q: "In psychoanalytic theory, the structural personality components Id, Ego, and Superego were introduced by:", opts: ["Carl Jung", "Sigmund Freud", "Erik Erikson", "Alfred Adler"], ans: 1 },
    { q: "A persistent, irrational, and intense fear of an object, animal, or specific situation is termed a:", opts: ["Mania", "Phobia", "Hallucination", "Obsession"], ans: 1 },
    { q: "The psychological defense mechanism where a person projects their own negative impulses onto others is:", opts: ["Repression", "Projection", "Sublimation", "Rationalization"], ans: 1 },
    { q: "In microeconomics, the point where total revenue equals total cost (TR = TC) is known as the:", opts: ["Shut-down point", "Break-even point", "Profit-maximizing point", "Equilibrium price"], ans: 1 },
    { q: "The apex development bank in India dedicated to agricultural credit and rural advancement is:", opts: ["IDBI", "NABARD", "SIDBI", "EXIM Bank"], ans: 1 },
    { q: "Which psychological school emphasizes that the whole of human perception is greater than the sum of its parts?", opts: ["Behaviorism", "Gestalt Psychology", "Structuralism", "Functionalism"], ans: 1 },
    { q: "A learned predisposition to respond favorably or unfavorably toward a person, institution, or issue is an:", opts: ["Aptitude", "Attitude", "Instinct", "Emotion"], ans: 1 },
    { q: "The Gini Coefficient in economic statistics is a standard metric used to quantify:", opts: ["Rate of unemployment", "Income & wealth inequality", "Rate of inflation", "Balance of trade"], ans: 1 },
  ],

  English: [
    { q: "Choose the word which is the OPPOSITE (Antonym) in meaning to 'BENEVOLENT':", opts: ["Kind", "Generous", "Malevolent", "Sympathetic"], ans: 2 },
    { q: "Choose the word which is most SIMILAR (Synonym) in meaning to 'CANDID':", opts: ["Deceitful", "Frank / Honest", "Secretive", "Shy"], ans: 1 },
    { q: "Fill in the blank with the grammatically correct verb: 'Neither the principal nor the teachers ______ present.'", opts: ["was", "were", "is", "has been"], ans: 1 },
    { q: "Identify the correctly spelled word from the given choices:", opts: ["Accomodation", "Acommodation", "Accommodation", "Accomadation"], ans: 2 },
    { q: "What does the popular English idiom 'To burn the midnight oil' mean?", opts: ["To waste electricity", "To work or study late into the night", "To create a disturbance", "To cook food at night"], ans: 1 },
    { q: "Fill in the appropriate preposition: 'The student is proficient ______ both English and Hindi.'", opts: ["at", "in", "with", "on"], ans: 1 },
    { q: "Convert to Passive Voice: 'The artist painted a magnificent portrait.'", opts: ["A magnificent portrait was painted by the artist.", "A magnificent portrait is painted by the artist.", "The portrait painted the artist.", "A portrait had been painted by the artist."], ans: 0 },
    { q: "Choose the appropriate one-word substitute: 'A person who always looks on the bright and positive side of things':", opts: ["Pessimist", "Optimist", "Pacifist", "Altruist"], ans: 1 },
    { q: "Identify the grammatical error: 'He is one of the most brilliant (A) student (B) in the entire college (C).'", opts: ["A", "B (should be 'students')", "C", "No error"], ans: 1 },
    { q: "Complete the proverb: 'A stitch in time saves ______.'", opts: ["ten", "nine", "five", "all"], ans: 1 },
  ],

  GK: [
    { q: "What is the official administrative capital of Uttar Pradesh?", opts: ["Kanpur", "Varanasi", "Lucknow", "Prayagraj"], ans: 2 },
    { q: "Who is the Honorable President of India (as of 2024-2026)?", opts: ["Smt. Droupadi Murmu", "Shri Jagdeep Dhankhar", "Shri Ram Nath Kovind", "Shri Narendra Modi"], ans: 0 },
    { q: "Where is the national headquarters of the Indian Space Research Organisation (ISRO) located?", opts: ["New Delhi", "Hyderabad", "Bengaluru", "Thiruvananthapuram"], ans: 2 },
    { q: "Which tree is recognized as the National Tree of the Republic of India?", opts: ["Neem Tree", "Banyan Tree (Ficus benghalensis)", "Peepal Tree", "Mango Tree"], ans: 1 },
    { q: "Which historic Indian mission successfully accomplished a soft lunar landing near the Moon's South Pole in 2023?", opts: ["Chandrayaan-1", "Chandrayaan-2", "Chandrayaan-3", "Mangalyaan"], ans: 2 },
    { q: "Which holy river was officially declared as the 'National River of India'?", opts: ["Yamuna", "Ganga", "Brahmaputra", "Narmada"], ans: 1 },
    { q: "Who was the first Indian woman athlete to win an Olympic medal (Bronze in Sydney 2000)?", opts: ["P.T. Usha", "Karnam Malleswari", "Mary Kom", "Saina Nehwal"], ans: 1 },
    { q: "What is the official currency of the United Kingdom?", opts: ["Euro", "Pound Sterling", "Dollar", "Franc"], ans: 1 },
    { q: "World Environment Day is observed internationally every year on:", opts: ["22nd April", "5th June", "16th September", "1st December"], ans: 1 },
    { q: "The revered Golden Temple (Sri Harmandir Sahib) is located in which historic city?", opts: ["Amritsar", "Chandigarh", "Ludhiana", "Patiala"], ans: 0 },
  ],
};

// Generates stream-specific 50 questions
export function getBaseQuestionsForStream(streamId) {
  let questions = [];

  switch (streamId) {
    case 'PCM':
      questions = [
        ...SUBJECT_POOLS.Physics.map(q => ({ ...q, subject: 'Physics' })),
        ...SUBJECT_POOLS.Chemistry.map(q => ({ ...q, subject: 'Chemistry' })),
        ...SUBJECT_POOLS.Mathematics.map(q => ({ ...q, subject: 'Mathematics' })),
        ...SUBJECT_POOLS.English.map(q => ({ ...q, subject: 'General English' })),
        ...SUBJECT_POOLS.GK.map(q => ({ ...q, subject: 'General Knowledge' })),
      ];
      break;

    case 'PCB':
      questions = [
        ...SUBJECT_POOLS.Physics.map(q => ({ ...q, subject: 'Physics' })),
        ...SUBJECT_POOLS.Chemistry.map(q => ({ ...q, subject: 'Chemistry' })),
        ...SUBJECT_POOLS.Biology.map(q => ({ ...q, subject: 'Biology' })),
        ...SUBJECT_POOLS.English.map(q => ({ ...q, subject: 'General English' })),
        ...SUBJECT_POOLS.GK.map(q => ({ ...q, subject: 'General Knowledge' })),
      ];
      break;

    case 'PCM+Bio':
      // 10 Physics, 10 Chemistry, 10 Maths, 10 Biology, 5 English + 5 GK = 50 Qs
      questions = [
        ...SUBJECT_POOLS.Physics.map(q => ({ ...q, subject: 'Physics' })),
        ...SUBJECT_POOLS.Chemistry.map(q => ({ ...q, subject: 'Chemistry' })),
        ...SUBJECT_POOLS.Mathematics.map(q => ({ ...q, subject: 'Mathematics' })),
        ...SUBJECT_POOLS.Biology.map(q => ({ ...q, subject: 'Biology' })),
        ...SUBJECT_POOLS.English.slice(0, 5).map(q => ({ ...q, subject: 'English & GK' })),
        ...SUBJECT_POOLS.GK.slice(0, 5).map(q => ({ ...q, subject: 'English & GK' })),
      ];
      break;

    case 'Commerce':
      questions = [
        ...SUBJECT_POOLS.Accountancy.map(q => ({ ...q, subject: 'Accountancy' })),
        ...SUBJECT_POOLS.BusinessStudies.map(q => ({ ...q, subject: 'Business Studies' })),
        ...SUBJECT_POOLS.Economics.map(q => ({ ...q, subject: 'Economics' })),
        ...SUBJECT_POOLS.English.map(q => ({ ...q, subject: 'General English' })),
        ...SUBJECT_POOLS.GK.map(q => ({ ...q, subject: 'General Knowledge' })),
      ];
      break;

    case 'Arts':
      questions = [
        ...SUBJECT_POOLS.History.map(q => ({ ...q, subject: 'History' })),
        ...SUBJECT_POOLS.PoliticalScience.map(q => ({ ...q, subject: 'Political Science' })),
        ...SUBJECT_POOLS.GeographySociology.map(q => ({ ...q, subject: 'Geography & Sociology' })),
        ...SUBJECT_POOLS.English.map(q => ({ ...q, subject: 'General English' })),
        ...SUBJECT_POOLS.GK.map(q => ({ ...q, subject: 'General Knowledge' })),
      ];
      break;

    case 'Humanities':
      questions = [
        ...SUBJECT_POOLS.History.map(q => ({ ...q, subject: 'History' })),
        ...SUBJECT_POOLS.PoliticalScience.map(q => ({ ...q, subject: 'Political Science' })),
        ...SUBJECT_POOLS.EconomicsPsychology.map(q => ({ ...q, subject: 'Economics & Psychology' })),
        ...SUBJECT_POOLS.English.map(q => ({ ...q, subject: 'General English' })),
        ...SUBJECT_POOLS.GK.map(q => ({ ...q, subject: 'General Knowledge' })),
      ];
      break;

    default:
      // Fallback to PCM
      questions = [
        ...SUBJECT_POOLS.Physics.map(q => ({ ...q, subject: 'Physics' })),
        ...SUBJECT_POOLS.Chemistry.map(q => ({ ...q, subject: 'Chemistry' })),
        ...SUBJECT_POOLS.Mathematics.map(q => ({ ...q, subject: 'Mathematics' })),
        ...SUBJECT_POOLS.English.map(q => ({ ...q, subject: 'General English' })),
        ...SUBJECT_POOLS.GK.map(q => ({ ...q, subject: 'General Knowledge' })),
      ];
  }

  return questions;
}

// Pseudo-random deterministic generator based on seed
function seededRandom(seed) {
  let x = Math.sin(seed++) * 10000;
  return x - Math.floor(x);
}

// Generates 50 questions for the stream with deterministic permutation for Set A, B, C, D
export function getQuestionsForStreamAndSet(streamId, paperSet = 'Set A') {
  const base = getBaseQuestionsForStream(streamId);

  // Set seeds: Set A = 101, Set B = 202, Set C = 303, Set D = 404
  const setSeeds = {
    'Set A': 101,
    'Set B': 202,
    'Set C': 303,
    'Set D': 404,
  };

  const seed = setSeeds[paperSet] || 101;
  const questions = base.map((item, idx) => ({ ...item, originalIndex: idx }));

  // Deterministically shuffle question order for sets other than Set A
  if (paperSet !== 'Set A') {
    let currentSeed = seed;
    for (let i = questions.length - 1; i > 0; i--) {
      const rand = seededRandom(currentSeed++);
      const j = Math.floor(rand * (i + 1));
      [questions[i], questions[j]] = [questions[j], questions[i]];
    }
  }

  // Permute options for each question deterministically so answers can't be peeked
  let optionSeed = seed + 500;
  return questions.map((q, idx) => {
    const originalCorrectText = q.opts[q.ans];
    const permutedOpts = [...q.opts];

    for (let i = permutedOpts.length - 1; i > 0; i--) {
      const rand = seededRandom(optionSeed++);
      const j = Math.floor(rand * (i + 1));
      [permutedOpts[i], permutedOpts[j]] = [permutedOpts[j], permutedOpts[i]];
    }

    const newCorrectIdx = permutedOpts.indexOf(originalCorrectText);

    return {
      id: idx + 1,
      q: q.q,
      options: permutedOpts,
      correct: newCorrectIdx,
      subject: q.subject,
      paperSet,
    };
  });
}
