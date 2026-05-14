export type MockTest = {
  id: string;
  subject: string;
  name: string;
  cuetSection: string;
  cuetCode: string;
  difficulty: "Easy" | "Medium" | "Hard" | "JEE Level";
  durationMinutes: number;
  questionsCount: number;
  attemptCount: number;
  marks: number;
  iconColor: string;
};

export const MOCK_TESTS: MockTest[] = [
  { id: "p1", subject: "Physics", name: "CUET Physics — Section II Full Mock", cuetSection: "Section II", cuetCode: "PHYS101", difficulty: "Hard", durationMinutes: 45, questionsCount: 15, attemptCount: 12, marks: 60, iconColor: "bg-blue-100 text-blue-700" },
  { id: "c1", subject: "Chemistry", name: "CUET Chemistry — Organic & Inorganic", cuetSection: "Section II", cuetCode: "CHEM101", difficulty: "Medium", durationMinutes: 45, questionsCount: 15, attemptCount: 12, marks: 60, iconColor: "bg-green-100 text-green-700" },
  { id: "b1", subject: "Biology", name: "CUET Biology — Genetics & Biotech", cuetSection: "Section II", cuetCode: "BIO101", difficulty: "Medium", durationMinutes: 45, questionsCount: 15, attemptCount: 12, marks: 60, iconColor: "bg-emerald-100 text-emerald-700" },
  { id: "m1", subject: "Mathematics", name: "CUET Mathematics — Calculus & Algebra", cuetSection: "Section II", cuetCode: "MATH101", difficulty: "JEE Level", durationMinutes: 60, questionsCount: 15, attemptCount: 12, marks: 60, iconColor: "bg-red-100 text-red-700" },
  { id: "e1", subject: "English", name: "CUET English Core — Section IA", cuetSection: "Section IA", cuetCode: "ENG101", difficulty: "Medium", durationMinutes: 45, questionsCount: 15, attemptCount: 12, marks: 60, iconColor: "bg-purple-100 text-purple-700" },
  { id: "g1", subject: "General Test", name: "CUET General Test — Section III", cuetSection: "Section III", cuetCode: "GT101", difficulty: "Medium", durationMinutes: 60, questionsCount: 16, attemptCount: 13, marks: 65, iconColor: "bg-amber-100 text-amber-700" },
  { id: "r1", subject: "Reasoning", name: "CUET Logical Reasoning — Section III", cuetSection: "Section III", cuetCode: "LR101", difficulty: "Hard", durationMinutes: 45, questionsCount: 15, attemptCount: 12, marks: 60, iconColor: "bg-indigo-100 text-indigo-700" },
  { id: "p2", subject: "Physics", name: "CUET Physics Basics — Practice Set", cuetSection: "Section II", cuetCode: "PHYS001", difficulty: "Easy", durationMinutes: 30, questionsCount: 10, attemptCount: 10, marks: 50, iconColor: "bg-sky-100 text-sky-700" },
];

export type Question = {
  id: number;
  text: string;
  options: string[];
  correctOption: number;
  section: string;
  marks: number;
  difficulty: "Easy" | "Medium" | "Hard" | "JEE Level";
  type?: "MCQ" | "AR";
  passage?: string;
};

const AR_OPTIONS = [
  "Both Assertion (A) and Reason (R) are true and Reason (R) is the correct explanation of Assertion (A)",
  "Both Assertion (A) and Reason (R) are true but Reason (R) is NOT the correct explanation of Assertion (A)",
  "Assertion (A) is true but Reason (R) is false",
  "Assertion (A) is false but Reason (R) is true",
];

export const MOCK_QUESTIONS: Record<string, Question[]> = {
  p1: [
    { id: 1, text: "A particle moves in a circle of radius R with constant speed v. The change in velocity when the particle moves through an angle of 60° at the centre is:", options: ["v", "v√2", "v√3", "2v sin 30°"], correctOption: 3, section: "Circular Motion", marks: 5, difficulty: "Hard" },
    { id: 2, text: "In Young's double slit experiment, if the separation between slits is halved and the distance to the screen is doubled, the fringe width will:", options: ["Remain the same", "Become half", "Become double", "Become four times"], correctOption: 3, section: "Wave Optics", marks: 5, difficulty: "Medium" },
    { id: 3, text: "An ideal gas undergoes an adiabatic process obeying PV^1.5 = constant. The ratio Cp/Cv for this gas is:", options: ["1.5", "1.4", "1.33", "1.67"], correctOption: 0, section: "Thermodynamics", marks: 5, difficulty: "Hard" },
    { id: 4, text: "The resistance of a wire is R. If it is melted and stretched to n times its original length, its resistance becomes:", options: ["nR", "R/n", "n²R", "R/n²"], correctOption: 2, section: "Current Electricity", marks: 5, difficulty: "Medium" },
    { id: 5, text: "A convex lens is completely immersed in a liquid whose refractive index equals that of the lens material. Then:", options: ["Focal length becomes zero", "Focal length becomes infinite", "Focal length remains unchanged", "Focal length becomes very small but finite"], correctOption: 1, section: "Ray Optics", marks: 5, difficulty: "Easy" },
    { id: 6, text: "The half-life of a radioactive substance is 30 days. The time taken for 3/4 of the original mass to disintegrate is:", options: ["30 days", "45 days", "60 days", "90 days"], correctOption: 2, section: "Modern Physics", marks: 5, difficulty: "Hard" },
    { id: 7, text: "Two particles of mass m and 2m have the same linear momentum. The ratio of their kinetic energies KE_m : KE_2m is:", options: ["1:2", "2:1", "1:1", "1:4"], correctOption: 1, section: "Mechanics", marks: 5, difficulty: "Medium" },
    { id: 8, text: "The maximum kinetic energy of photoelectrons emitted from a metal depends on:", options: ["Intensity of incident radiation only", "Frequency of incident radiation only", "Both intensity and frequency", "Work function of the metal only"], correctOption: 1, section: "Dual Nature of Matter", marks: 5, difficulty: "Easy" },
    { id: 9, text: "In a series LCR circuit at resonance, the impedance of the circuit equals:", options: ["Zero", "Inductive reactance XL", "Resistance R only", "Capacitive reactance XC"], correctOption: 2, section: "Alternating Current", marks: 5, difficulty: "Medium" },
    { id: 10, text: "A body is thrown vertically upward with velocity u. The ratio of time of ascent to time of descent is:", options: ["1:2", "2:1", "1:1", "Depends on u"], correctOption: 2, section: "Kinematics", marks: 5, difficulty: "Easy" },
    { id: 11, type: "AR", text: "Assertion (A): The centripetal force acting on a particle moving in a circular path does no work on it.\nReason (R): The centripetal force is always perpendicular to the velocity of the particle.", options: AR_OPTIONS, correctOption: 0, section: "Circular Motion", marks: 5, difficulty: "Medium" },
    { id: 12, type: "AR", text: "Assertion (A): When a current-carrying conductor is placed in a magnetic field, it experiences a force.\nReason (R): The magnetic force on a moving charge is F = qv × B.", options: AR_OPTIONS, correctOption: 0, section: "Magnetism", marks: 5, difficulty: "Medium" },
    { id: 13, type: "AR", text: "Assertion (A): In a pure inductive AC circuit, the current lags the voltage by 90°.\nReason (R): An inductor stores energy in its electric field.", options: AR_OPTIONS, correctOption: 2, section: "Alternating Current", marks: 5, difficulty: "Hard" },
    { id: 14, text: "The work done by a gas during an isothermal expansion from volume V₁ to V₂ at temperature T is:", options: ["nRT ln(V₂/V₁)", "nRT (V₂ − V₁)", "Zero", "nCv(T₂ − T₁)"], correctOption: 0, section: "Thermodynamics", marks: 5, difficulty: "Medium" },
    { id: 15, text: "Which of the following phenomena confirms the wave nature of light?", options: ["Photoelectric effect", "Compton scattering", "Polarisation", "Emission of photoelectrons"], correctOption: 2, section: "Wave Optics", marks: 5, difficulty: "Easy" },
  ],

  c1: [
    { id: 1, text: "Which of the following is the correct IUPAC name for CH₃–CH(OH)–CH₂–CH₃?", options: ["2-Butanol", "3-Butanol", "Butan-2-ol", "Sec-butanol"], correctOption: 2, section: "Nomenclature", marks: 5, difficulty: "Easy" },
    { id: 2, text: "Benzene reacts with Cl₂ in presence of anhydrous FeCl₃. This reaction is an example of:", options: ["Nucleophilic addition", "Electrophilic substitution", "Free radical substitution", "Nucleophilic substitution"], correctOption: 1, section: "Aromatic Chemistry", marks: 5, difficulty: "Medium" },
    { id: 3, text: "Which reagent is used to distinguish between an aldehyde and a ketone?", options: ["Fehling's solution", "Lucas reagent", "Molisch reagent", "Baeyer's reagent"], correctOption: 0, section: "Carbonyl Compounds", marks: 5, difficulty: "Easy" },
    { id: 4, text: "Aldol condensation occurs between two carbonyl compounds when:", options: ["Both are ketones only", "One or both have α-hydrogen, in presence of base/acid", "Neither has α-hydrogen", "Only aldehydes are used"], correctOption: 1, section: "Named Reactions", marks: 5, difficulty: "Medium" },
    { id: 5, text: "Which of the following compounds is a primary amine?", options: ["(CH₃)₃N", "(CH₃)₂NH", "CH₃NH₂", "C₆H₅NHCH₃"], correctOption: 2, section: "Amines", marks: 5, difficulty: "Easy" },
    { id: 6, text: "Markovnikov's rule states that in addition of HX to an unsymmetrical alkene:", options: ["H adds to the more substituted carbon", "X adds to the less substituted carbon", "H adds to the less substituted (less-H-bearing) carbon", "Both A and B are equivalent statements"], correctOption: 2, section: "Alkenes", marks: 5, difficulty: "Medium" },
    { id: 7, text: "The Cannizzaro reaction is exhibited by:", options: ["Acetaldehyde", "Benzaldehyde only", "Formaldehyde only", "Both formaldehyde and benzaldehyde"], correctOption: 3, section: "Named Reactions", marks: 5, difficulty: "Hard" },
    { id: 8, text: "Gabriel synthesis is used to prepare:", options: ["Secondary aliphatic amines", "Tertiary amines", "Primary aliphatic amines", "Aromatic amines"], correctOption: 2, section: "Amines", marks: 5, difficulty: "Hard" },
    { id: 9, text: "Which of the following is NOT a characteristic of benzene?", options: ["All C–C bond lengths are equal", "It is a planar molecule", "It readily undergoes addition reactions", "It has 6 π-electrons in the aromatic system"], correctOption: 2, section: "Aromatic Chemistry", marks: 5, difficulty: "Easy" },
    { id: 10, text: "Grignard reagent (RMgX) when reacted with CO₂ followed by hydrolysis gives:", options: ["Alcohol", "Carboxylic acid", "Aldehyde", "Ketone"], correctOption: 1, section: "Named Reactions", marks: 5, difficulty: "Medium" },
    { id: 11, type: "AR", text: "Assertion (A): The nitro group (–NO₂) is a meta-director in electrophilic aromatic substitution.\nReason (R): The nitro group withdraws electron density from the ring through both induction and resonance, making ortho and para positions less reactive.", options: AR_OPTIONS, correctOption: 0, section: "Aromatic Chemistry", marks: 5, difficulty: "Hard" },
    { id: 12, type: "AR", text: "Assertion (A): SN2 reactions are favoured by primary alkyl halides over tertiary alkyl halides.\nReason (R): Primary carbocations are more stable than tertiary carbocations.", options: AR_OPTIONS, correctOption: 2, section: "Alkyl Halides", marks: 5, difficulty: "Hard" },
    { id: 13, text: "Which of the following is the strongest acid?", options: ["CH₃COOH (pKa 4.75)", "Cl₂CHCOOH (pKa 1.48)", "ClCH₂COOH (pKa 2.86)", "F₃CCOOH (pKa 0.52)"], correctOption: 3, section: "Acids & Bases", marks: 5, difficulty: "Hard" },
    { id: 14, text: "In the reaction of primary alcohols with PCC (Pyridinium chlorochromate), the product is:", options: ["Carboxylic acid", "Aldehyde", "Ketone", "Alkene"], correctOption: 1, section: "Carbonyl Compounds", marks: 5, difficulty: "Medium" },
    { id: 15, text: "Coupling reaction of diazonium salt with phenol in alkaline medium gives:", options: ["Azo dye", "Phenol ether", "Biphenyl", "Quinone"], correctOption: 0, section: "Amines", marks: 5, difficulty: "Medium" },
  ],

  b1: [
    { id: 1, text: "Mendel's law of independent assortment is valid for genes that are located on:", options: ["The same chromosome", "Different (non-homologous) chromosomes", "The X chromosome only", "Autosomes only"], correctOption: 1, section: "Mendelian Genetics", marks: 5, difficulty: "Easy" },
    { id: 2, text: "In a dihybrid cross TtRr × TtRr, what fraction of offspring will be ttRR?", options: ["1/4", "1/8", "1/16", "3/16"], correctOption: 2, section: "Dihybrid Cross", marks: 5, difficulty: "Medium" },
    { id: 3, text: "Which nitrogenous base is present in RNA but not in DNA?", options: ["Cytosine", "Adenine", "Uracil", "Guanine"], correctOption: 2, section: "Molecular Biology", marks: 5, difficulty: "Easy" },
    { id: 4, text: "The central dogma of molecular biology is correctly represented by:", options: ["Protein → RNA → DNA", "DNA → RNA → Protein", "RNA → DNA → Protein", "DNA → Protein → RNA"], correctOption: 1, section: "Molecular Biology", marks: 5, difficulty: "Easy" },
    { id: 5, text: "A cross between two individuals each heterozygous for a recessive lethal allele (Aa × Aa) produces viable offspring in the ratio:", options: ["3:1", "1:2:1", "2:1", "1:1"], correctOption: 2, section: "Mendelian Genetics", marks: 5, difficulty: "Hard" },
    { id: 6, text: "Natural selection acts directly on:", options: ["Genotype only", "Phenotype (which reflects genotype)", "Random mutations only", "Neither genotype nor phenotype"], correctOption: 1, section: "Evolution", marks: 5, difficulty: "Medium" },
    { id: 7, text: "Wings of bats and wings of insects are an example of:", options: ["Homologous organs — divergent evolution", "Analogous organs — convergent evolution", "Vestigial organs", "Homologous organs — convergent evolution"], correctOption: 1, section: "Evolution", marks: 5, difficulty: "Medium" },
    { id: 8, text: "Restriction endonucleases recognise and cut DNA at:", options: ["Any random sequence", "Specific palindromic sequences", "Only single-stranded DNA", "Only RNA sequences"], correctOption: 1, section: "Biotechnology", marks: 5, difficulty: "Medium" },
    { id: 9, text: "The Hardy-Weinberg equilibrium is disturbed by which of the following?", options: ["Large population size", "Random mating", "Natural selection", "Absence of mutation"], correctOption: 2, section: "Evolution", marks: 5, difficulty: "Hard" },
    { id: 10, text: "In the DNA double helix, adenine pairs with thymine through:", options: ["Three hydrogen bonds", "Two hydrogen bonds", "One hydrogen bond", "Covalent bonds"], correctOption: 1, section: "Molecular Biology", marks: 5, difficulty: "Easy" },
    { id: 11, type: "AR", text: "Assertion (A): Sickle cell anaemia is a result of a point mutation in the gene encoding the beta-globin chain.\nReason (R): The substitution of glutamic acid by valine at position 6 causes the haemoglobin to polymerise under low oxygen tension.", options: AR_OPTIONS, correctOption: 0, section: "Mendelian Genetics", marks: 5, difficulty: "Hard" },
    { id: 12, type: "AR", text: "Assertion (A): Restriction endonucleases are called 'molecular scissors' in recombinant DNA technology.\nReason (R): These enzymes cut DNA at specific palindromic sequences, generating sticky or blunt ends for ligation.", options: AR_OPTIONS, correctOption: 0, section: "Biotechnology", marks: 5, difficulty: "Medium" },
    { id: 13, text: "Which of the following statements about the lac operon is CORRECT?", options: ["It is a constitutive gene system", "Lactose acts as the inducer by inactivating the repressor", "The operon is always in the 'on' state", "The repressor promotes transcription"], correctOption: 1, section: "Molecular Biology", marks: 5, difficulty: "Hard" },
    { id: 14, text: "PCR (Polymerase Chain Reaction) requires which of the following to initiate synthesis?", options: ["RNA Polymerase", "Short DNA primers complementary to target sequences", "Restriction enzymes", "DNA Ligase only"], correctOption: 1, section: "Biotechnology", marks: 5, difficulty: "Medium" },
    { id: 15, text: "Founder effect is a type of:", options: ["Natural selection", "Sexual selection", "Genetic drift", "Gene flow"], correctOption: 2, section: "Evolution", marks: 5, difficulty: "Medium" },
  ],

  m1: [
    { id: 1, text: "If f(x) = x³ – 3x², then f'(x) = 0 gives critical points at:", options: ["x = 0 and x = 2", "x = 1 and x = 3", "x = 0 and x = 3", "x = 2 only"], correctOption: 0, section: "Differentiation", marks: 5, difficulty: "Medium" },
    { id: 2, text: "∫₀¹ x² dx equals:", options: ["1/2", "1/3", "1/4", "2/3"], correctOption: 1, section: "Integration", marks: 5, difficulty: "Easy" },
    { id: 3, text: "The derivative of ln(sin x) with respect to x is:", options: ["cot x", "tan x", "–cot x", "–cosec x"], correctOption: 0, section: "Differentiation", marks: 5, difficulty: "Medium" },
    { id: 4, text: "If y = e^(2x), then d²y/dx² equals:", options: ["2e^(2x)", "4e^(2x)", "e^(2x)", "2xe^(2x)"], correctOption: 1, section: "Differentiation", marks: 5, difficulty: "Easy" },
    { id: 5, text: "∫ sec²x dx equals:", options: ["sec x tan x + C", "tan x + C", "2 sec x + C", "cosec x + C"], correctOption: 1, section: "Integration", marks: 5, difficulty: "Easy" },
    { id: 6, text: "The area enclosed between y = x² and y = x (for x ∈ [0, 1]) is:", options: ["1/2", "1/6", "1/3", "1/4"], correctOption: 1, section: "Applications of Integration", marks: 5, difficulty: "Hard" },
    { id: 7, text: "If f(x) = |x|, then f'(0) is:", options: ["0", "1", "–1", "Does not exist"], correctOption: 3, section: "Differentiation", marks: 5, difficulty: "Medium" },
    { id: 8, text: "The general solution of dy/dx = y with y(0) = 1 is:", options: ["y = e^x + 1", "y = e^x", "y = x + 1", "y = ln x + 1"], correctOption: 1, section: "Differential Equations", marks: 5, difficulty: "Medium" },
    { id: 9, text: "∫₀^π sin x dx equals:", options: ["0", "1", "2", "π"], correctOption: 2, section: "Integration", marks: 5, difficulty: "Easy" },
    { id: 10, text: "The point of inflection of f(x) = x³ is at:", options: ["x = 1", "x = –1", "x = 0", "There is no point of inflection"], correctOption: 2, section: "Differentiation", marks: 5, difficulty: "Hard" },
    { id: 11, text: "If the matrix A = [[2, 3],[1, 4]], then det(A) is:", options: ["11", "5", "8", "–5"], correctOption: 1, section: "Matrices & Determinants", marks: 5, difficulty: "Easy" },
    { id: 12, text: "The value of lim (x→0) [sin x / x] is:", options: ["0", "∞", "1", "Undefined"], correctOption: 2, section: "Limits", marks: 5, difficulty: "Easy" },
    { id: 13, text: "The equation of a line passing through (2, 3) with slope –1 is:", options: ["x + y = 5", "x – y = –1", "y – x = 1", "x + y = –5"], correctOption: 0, section: "Coordinate Geometry", marks: 5, difficulty: "Easy" },
    { id: 14, text: "If A and B are two events with P(A) = 0.4, P(B) = 0.5, P(A∩B) = 0.2, then P(A∪B) =", options: ["0.7", "0.6", "0.9", "0.3"], correctOption: 0, section: "Probability", marks: 5, difficulty: "Easy" },
    { id: 15, text: "The sum of the infinite geometric series 1 + 1/2 + 1/4 + 1/8 + … is:", options: ["2", "3", "1.5", "∞"], correctOption: 0, section: "Sequences & Series", marks: 5, difficulty: "Easy" },
  ],

  e1: [
    {
      id: 1,
      passage: "India's National Education Policy (NEP) 2020 marks a landmark reform in the country's education landscape. The policy replaces the three-decade-old NEP 1986 and aims to transform India into a vibrant knowledge society by making both school and college education more holistic, flexible, and multidisciplinary. The 5+3+3+4 curricular structure aligns with age groups 3–8, 8–11, 11–14, and 14–18 years respectively. One of the key highlights is the emphasis on the mother tongue as the medium of instruction up to at least Class 5. The policy proposes to increase the Gross Enrolment Ratio (GER) in higher education to 50% by 2035, from the current 26.3%. Vocational education will be integrated from Class 6 onwards, with internship opportunities for students.",
      text: "According to the passage, what is the primary aim of NEP 2020?",
      options: [
        "To replace NEP 1986 with a fully digital education system",
        "To transform India into a knowledge society through holistic, flexible education",
        "To introduce English as the medium of instruction from Class 1",
        "To reduce the Gross Enrolment Ratio in higher education",
      ],
      correctOption: 1, section: "Reading Comprehension", marks: 5, difficulty: "Easy"
    },
    {
      id: 2,
      passage: "India's National Education Policy (NEP) 2020 marks a landmark reform in the country's education landscape. The policy replaces the three-decade-old NEP 1986 and aims to transform India into a vibrant knowledge society by making both school and college education more holistic, flexible, and multidisciplinary. The 5+3+3+4 curricular structure aligns with age groups 3–8, 8–11, 11–14, and 14–18 years respectively. One of the key highlights is the emphasis on the mother tongue as the medium of instruction up to at least Class 5. The policy proposes to increase the Gross Enrolment Ratio (GER) in higher education to 50% by 2035, from the current 26.3%. Vocational education will be integrated from Class 6 onwards, with internship opportunities for students.",
      text: "As per the passage, what is the recommended medium of instruction up to at least Class 5?",
      options: ["English", "Hindi", "Mother tongue", "A classical language"],
      correctOption: 2, section: "Reading Comprehension", marks: 5, difficulty: "Easy"
    },
    {
      id: 3,
      passage: "India's National Education Policy (NEP) 2020 marks a landmark reform in the country's education landscape. The policy replaces the three-decade-old NEP 1986 and aims to transform India into a vibrant knowledge society by making both school and college education more holistic, flexible, and multidisciplinary. The 5+3+3+4 curricular structure aligns with age groups 3–8, 8–11, 11–14, and 14–18 years respectively. One of the key highlights is the emphasis on the mother tongue as the medium of instruction up to at least Class 5. The policy proposes to increase the Gross Enrolment Ratio (GER) in higher education to 50% by 2035, from the current 26.3%. Vocational education will be integrated from Class 6 onwards, with internship opportunities for students.",
      text: "According to the passage, from which class will vocational education be integrated?",
      options: ["Class 1", "Class 4", "Class 6", "Class 9"],
      correctOption: 2, section: "Reading Comprehension", marks: 5, difficulty: "Easy"
    },
    {
      id: 4,
      passage: "India's National Education Policy (NEP) 2020 marks a landmark reform in the country's education landscape. The policy replaces the three-decade-old NEP 1986 and aims to transform India into a vibrant knowledge society by making both school and college education more holistic, flexible, and multidisciplinary. The 5+3+3+4 curricular structure aligns with age groups 3–8, 8–11, 11–14, and 14–18 years respectively. One of the key highlights is the emphasis on the mother tongue as the medium of instruction up to at least Class 5. The policy proposes to increase the Gross Enrolment Ratio (GER) in higher education to 50% by 2035, from the current 26.3%. Vocational education will be integrated from Class 6 onwards, with internship opportunities for students.",
      text: "What is the target Gross Enrolment Ratio (GER) in higher education by 2035 according to NEP 2020?",
      options: ["26.3%", "40%", "50%", "75%"],
      correctOption: 2, section: "Reading Comprehension", marks: 5, difficulty: "Easy"
    },
    {
      id: 5,
      passage: "India's National Education Policy (NEP) 2020 marks a landmark reform in the country's education landscape. The policy replaces the three-decade-old NEP 1986 and aims to transform India into a vibrant knowledge society by making both school and college education more holistic, flexible, and multidisciplinary. The 5+3+3+4 curricular structure aligns with age groups 3–8, 8–11, 11–14, and 14–18 years respectively. One of the key highlights is the emphasis on the mother tongue as the medium of instruction up to at least Class 5. The policy proposes to increase the Gross Enrolment Ratio (GER) in higher education to 50% by 2035, from the current 26.3%. Vocational education will be integrated from Class 6 onwards, with internship opportunities for students.",
      text: "The word 'multidisciplinary' in the passage most nearly means:",
      options: ["Focused on a single subject", "Involving several academic disciplines", "Compulsory and structured", "Based only on vocational training"],
      correctOption: 1, section: "Reading Comprehension", marks: 5, difficulty: "Easy"
    },
    { id: 6, text: "Choose the grammatically correct sentence:", options: ["Neither of the boys have done their homework.", "Neither of the boys has done his homework.", "Neither of the boys has done their homework.", "Neither boys has done his homework."], correctOption: 1, section: "Grammar", marks: 5, difficulty: "Easy" },
    { id: 7, text: "The word 'PERSPICACIOUS' most nearly means:", options: ["Stubborn", "Shrewd and having ready insight", "Excessively talkative", "Deeply pessimistic"], correctOption: 1, section: "Vocabulary", marks: 5, difficulty: "Hard" },
    { id: 8, text: "Choose the correct antonym of 'BENEVOLENT':", options: ["Generous", "Charitable", "Malevolent", "Compassionate"], correctOption: 2, section: "Vocabulary", marks: 5, difficulty: "Easy" },
    { id: 9, text: "Fill in the blank: She insisted _____ going to the meeting alone.", options: ["at", "on", "for", "in"], correctOption: 1, section: "Grammar", marks: 5, difficulty: "Medium" },
    { id: 10, text: "'To burn the midnight oil' means:", options: ["To waste electricity", "To work or study late into the night", "To set things on fire", "To be extremely angry"], correctOption: 1, section: "Idioms & Phrases", marks: 5, difficulty: "Easy" },
    { id: 11, text: "Which figure of speech is used in 'The sun smiled upon the golden fields'?", options: ["Metaphor", "Simile", "Personification", "Alliteration"], correctOption: 2, section: "Literary Devices", marks: 5, difficulty: "Medium" },
    { id: 12, text: "Identify the correct passive voice: 'The committee decided to postpone the meeting.'", options: ["The meeting was decided to be postponed by the committee.", "The meeting has been postponed by the committee.", "The committee has postponed the meeting.", "It was decided by the committee that the meeting should be postponed."], correctOption: 3, section: "Grammar", marks: 5, difficulty: "Medium" },
    { id: 13, text: "The synonym of 'EPHEMERAL' is:", options: ["Eternal", "Transient and short-lived", "Permanent", "Substantial"], correctOption: 1, section: "Vocabulary", marks: 5, difficulty: "Medium" },
    { id: 14, text: "One-word substitution for 'A person who walks in sleep' is:", options: ["Somnambulist", "Insomniac", "Narcissist", "Hedonist"], correctOption: 0, section: "One Word Substitution", marks: 5, difficulty: "Easy" },
    { id: 15, text: "Fill in the blank with the correct form: 'He was tired, _____ he continued working.'", options: ["because", "so", "yet", "for"], correctOption: 2, section: "Grammar", marks: 5, difficulty: "Medium" },
  ],

  g1: [
    { id: 1, text: "Which Indian state was bifurcated in 2014 to form the new state of Telangana?", options: ["Karnataka", "Andhra Pradesh", "Maharashtra", "Madhya Pradesh"], correctOption: 1, section: "Indian Polity", marks: 5, difficulty: "Easy" },
    { id: 2, text: "India's Chandrayaan-3 mission successfully soft-landed on the Moon's south polar region in:", options: ["2022", "2023", "2024", "2021"], correctOption: 1, section: "Science & Technology", marks: 5, difficulty: "Easy" },
    { id: 3, text: "India's first indigenously designed and built aircraft carrier is:", options: ["INS Viraat", "INS Vikrant", "INS Vikramaditya", "INS Arihant"], correctOption: 1, section: "Defence & Security", marks: 5, difficulty: "Easy" },
    { id: 4, text: "The 2024 Paris Summer Olympics were held from:", options: ["July 26 – August 11", "August 5 – August 21", "July 20 – August 4", "August 1 – August 17"], correctOption: 0, section: "Sports", marks: 5, difficulty: "Medium" },
    { id: 5, text: "Who was the first Indian to win the Nobel Prize in Economics?", options: ["Amartya Sen", "Abhijit Banerjee", "Manmohan Singh", "C. V. Raman"], correctOption: 0, section: "Awards & Honours", marks: 5, difficulty: "Easy" },
    { id: 6, text: "Which Article of the Indian Constitution deals with the Right to Elementary Education (Right to Education)?", options: ["Article 19", "Article 21A", "Article 32", "Article 44"], correctOption: 1, section: "Indian Constitution", marks: 5, difficulty: "Medium" },
    { id: 7, text: "India's Dhola-Sadiya Bridge — the longest river bridge in India — spans over which river?", options: ["Brahmaputra", "Ganga", "Yamuna", "Godavari"], correctOption: 0, section: "Geography", marks: 5, difficulty: "Medium" },
    { id: 8, text: "Which is the highest civilian award of India?", options: ["Padma Bhushan", "Padma Vibhushan", "Bharat Ratna", "Padma Shri"], correctOption: 2, section: "Awards & Honours", marks: 5, difficulty: "Easy" },
    { id: 9, text: "The G20 Summit 2023 was hosted by India in which city?", options: ["Mumbai", "New Delhi", "Chennai", "Bengaluru"], correctOption: 1, section: "International Affairs", marks: 5, difficulty: "Easy" },
    { id: 10, text: "Which organisation publishes the annual 'World Happiness Report'?", options: ["World Bank", "UN Sustainable Development Solutions Network", "WHO", "IMF"], correctOption: 1, section: "International Affairs", marks: 5, difficulty: "Medium" },
    { id: 11, text: "A train travels 360 km in 4 hours. Its average speed is:", options: ["80 km/h", "90 km/h", "100 km/h", "72 km/h"], correctOption: 1, section: "Numerical Ability", marks: 5, difficulty: "Easy" },
    { id: 12, text: "If 3x + 7 = 22, what is the value of x?", options: ["4", "5", "6", "3"], correctOption: 1, section: "Numerical Ability", marks: 5, difficulty: "Easy" },
    { id: 13, text: "A shopkeeper marks goods 40% above cost price and gives a 20% discount. His profit percentage is:", options: ["12%", "16%", "18%", "20%"], correctOption: 1, section: "Numerical Ability", marks: 5, difficulty: "Medium" },
    { id: 14, text: "What fraction of 1 hour is 45 minutes?", options: ["1/3", "2/3", "3/4", "4/5"], correctOption: 2, section: "Numerical Ability", marks: 5, difficulty: "Easy" },
    { id: 15, text: "If the ratio of ages of P and Q is 5:3 and their total age is 40 years, what is P's age?", options: ["20 years", "25 years", "15 years", "30 years"], correctOption: 1, section: "Numerical Ability", marks: 5, difficulty: "Medium" },
    { id: 16, text: "Which of the following is a prime number?", options: ["91", "87", "97", "77"], correctOption: 2, section: "Numerical Ability", marks: 5, difficulty: "Easy" },
  ],

  r1: [
    { id: 1, text: "If FRIEND is coded as GSJFOE, how is ENEMY coded in the same logic?", options: ["FOFNZ", "FOGMZ", "DMDLX", "FNEMZ"], correctOption: 0, section: "Coding-Decoding", marks: 5, difficulty: "Medium" },
    { id: 2, text: "Pointing to a photograph, Rahul says 'She is the daughter of the woman who is the mother of the husband of my mother.' How is the person in the photograph related to Rahul?", options: ["Sister", "Maternal Aunt", "Cousin sister", "Cannot be determined"], correctOption: 1, section: "Blood Relations", marks: 5, difficulty: "Hard" },
    { id: 3, text: "Find the odd one out: 2, 5, 10, 17, 26, 37, 50, 64", options: ["37", "50", "64", "26"], correctOption: 2, section: "Number Series", marks: 5, difficulty: "Medium" },
    { id: 4, text: "All pens are books. Some books are magazines. Conclusions: I. Some pens are magazines. II. All books are pens. Which conclusion(s) follow?", options: ["Only I follows", "Only II follows", "Both I and II follow", "Neither I nor II follows"], correctOption: 3, section: "Syllogisms", marks: 5, difficulty: "Medium" },
    { id: 5, text: "A is 40 m south of B. C is 40 m east of A. D is 40 m north of C. In what direction is D with respect to B?", options: ["East", "West", "South-East", "North-West"], correctOption: 0, section: "Direction Sense", marks: 5, difficulty: "Medium" },
    { id: 6, text: "Which number replaces '?' in the series: 2, 6, 12, 20, 30, 42, ?", options: ["52", "56", "60", "54"], correctOption: 1, section: "Number Series", marks: 5, difficulty: "Easy" },
    { id: 7, text: "All dogs are animals. All animals are living beings. Conclusion: All dogs are living beings. This conclusion is:", options: ["False", "True", "Partially true", "Cannot be determined"], correctOption: 1, section: "Syllogisms", marks: 5, difficulty: "Easy" },
    { id: 8, text: "Today is Monday. What day will it be 100 days from now?", options: ["Tuesday", "Wednesday", "Thursday", "Friday"], correctOption: 1, section: "Calendar", marks: 5, difficulty: "Medium" },
    { id: 9, text: "In a certain code: 'MANGO' is written as 'NBOHP'. Then 'APPLE' is written as:", options: ["BQQMF", "BQPMF", "BQQNF", "CQQMF"], correctOption: 0, section: "Coding-Decoding", marks: 5, difficulty: "Medium" },
    { id: 10, text: "Statements: All cats are dogs. No dog is a bird. Conclusion: I. No cat is a bird. II. Some cats are birds. Which follows?", options: ["Only I follows", "Only II follows", "Both follow", "Neither follows"], correctOption: 0, section: "Syllogisms", marks: 5, difficulty: "Medium" },
    { id: 11, text: "If A can do a work in 15 days and B in 10 days, together they finish it in:", options: ["6 days", "7 days", "8 days", "5 days"], correctOption: 0, section: "Numerical Reasoning", marks: 5, difficulty: "Easy" },
    { id: 12, text: "Five friends P, Q, R, S, T are sitting in a row facing north. Q is between T and S. P is to the right of T. R is to the left of T. Who is at the extreme left?", options: ["R", "T", "P", "S"], correctOption: 0, section: "Arrangement", marks: 5, difficulty: "Hard" },
    { id: 13, text: "In a mirror image, if a clock shows 3:45, what is the actual time?", options: ["8:15", "7:15", "8:45", "9:15"], correctOption: 0, section: "Mirror Image", marks: 5, difficulty: "Medium" },
    { id: 14, text: "Choose the figure that is different from the others: Triangle, Square, Pentagon, Circle, Hexagon", options: ["Triangle", "Circle", "Square", "Pentagon"], correctOption: 1, section: "Odd One Out", marks: 5, difficulty: "Easy" },
    { id: 15, text: "A man walks 5 km east, then 3 km north, then 5 km west. How far is he from the starting point?", options: ["3 km north", "5 km north", "8 km", "13 km"], correctOption: 0, section: "Direction Sense", marks: 5, difficulty: "Easy" },
  ],

  p2: [
    { id: 1, text: "A car starts from rest and accelerates uniformly at 2 m/s² for 10 seconds. Its final velocity is:", options: ["10 m/s", "20 m/s", "5 m/s", "40 m/s"], correctOption: 1, section: "Kinematics", marks: 5, difficulty: "Easy" },
    { id: 2, text: "The slope of a velocity-time (v-t) graph gives:", options: ["Displacement", "Acceleration", "Distance", "Speed"], correctOption: 1, section: "Kinematics", marks: 5, difficulty: "Easy" },
    { id: 3, text: "A ball is dropped from a height of 20 m. Time to reach the ground (g = 10 m/s²) is:", options: ["1 s", "2 s", "3 s", "4 s"], correctOption: 1, section: "Free Fall", marks: 5, difficulty: "Easy" },
    { id: 4, text: "The area under a velocity-time graph gives:", options: ["Acceleration", "Force", "Displacement", "Power"], correctOption: 2, section: "Kinematics", marks: 5, difficulty: "Easy" },
    { id: 5, text: "A stone is thrown vertically upward with u = 20 m/s. Maximum height reached (g = 10 m/s²) is:", options: ["10 m", "20 m", "40 m", "5 m"], correctOption: 1, section: "Kinematics", marks: 5, difficulty: "Easy" },
    { id: 6, text: "An object moves with uniform velocity. Its acceleration is:", options: ["Positive", "Negative", "Zero", "Variable"], correctOption: 2, section: "Kinematics", marks: 5, difficulty: "Easy" },
    { id: 7, text: "The range of a projectile is maximum at a projection angle of:", options: ["30°", "45°", "60°", "90°"], correctOption: 1, section: "Projectile Motion", marks: 5, difficulty: "Easy" },
    { id: 8, text: "A force of 10 N acts on a 5 kg body initially at rest for 2 seconds. Its final velocity is:", options: ["1 m/s", "2 m/s", "4 m/s", "5 m/s"], correctOption: 2, section: "Newton's Laws", marks: 5, difficulty: "Easy" },
    { id: 9, text: "Relative velocity of two objects moving in the same direction at speeds v₁ and v₂ (v₁ > v₂) is:", options: ["v₁ + v₂", "v₁ – v₂", "v₁ × v₂", "v₁ / v₂"], correctOption: 1, section: "Relative Motion", marks: 5, difficulty: "Easy" },
    { id: 10, text: "The first equation of motion is:", options: ["v = u + at", "s = ut + ½at²", "v² = u² + 2as", "s = vt – ½at²"], correctOption: 0, section: "Kinematics", marks: 5, difficulty: "Easy" },
  ],
};

// SIUAT / Talent Hunt Exam Questions (General Aptitude)
export const SIUAT_QUESTIONS: Question[] = [
  { id: 1, text: "If 5x + 3 = 28, what is the value of x?", options: ["4", "5", "6", "7"], correctOption: 1, section: "Quantitative Aptitude", marks: 4, difficulty: "Easy" },
  { id: 2, text: "A train travels 300 km in 5 hours. Its average speed is:", options: ["50 km/h", "55 km/h", "60 km/h", "65 km/h"], correctOption: 2, section: "Quantitative Aptitude", marks: 4, difficulty: "Easy" },
  { id: 3, text: "Choose the word most similar in meaning to 'ELOQUENT':", options: ["Silent", "Fluent and persuasive in speaking", "Aggressive", "Confused"], correctOption: 1, section: "English Language", marks: 4, difficulty: "Easy" },
  { id: 4, text: "Find the next number in series: 3, 7, 13, 21, 31, ?", options: ["41", "43", "45", "47"], correctOption: 1, section: "Reasoning", marks: 4, difficulty: "Medium" },
  { id: 5, text: "The capital of India was shifted from Calcutta to Delhi in:", options: ["1905", "1911", "1919", "1947"], correctOption: 1, section: "General Knowledge", marks: 4, difficulty: "Easy" },
  { id: 6, text: "A shopkeeper marks goods 25% above cost price and gives 10% discount. His profit percentage is:", options: ["12.5%", "15%", "17.5%", "10%"], correctOption: 0, section: "Quantitative Aptitude", marks: 4, difficulty: "Medium" },
  { id: 7, text: "Which of the following is NOT a primary colour of light?", options: ["Red", "Green", "Yellow", "Blue"], correctOption: 2, section: "Science", marks: 4, difficulty: "Easy" },
  { id: 8, text: "If the ratio of ages of A and B is 3:4 and their sum is 35 years, B's age is:", options: ["15", "20", "25", "18"], correctOption: 1, section: "Quantitative Aptitude", marks: 4, difficulty: "Medium" },
  { id: 9, text: "The Headquarters of the United Nations is located in:", options: ["Geneva", "London", "New York", "Paris"], correctOption: 2, section: "General Knowledge", marks: 4, difficulty: "Easy" },
  { id: 10, text: "If A can do a work in 12 days and B in 18 days, working together they finish the work in:", options: ["6 days", "7.2 days", "8 days", "9 days"], correctOption: 1, section: "Quantitative Aptitude", marks: 4, difficulty: "Medium" },
  { id: 11, text: "Arrange the letters of 'EDUCATION' alphabetically. The 4th letter is:", options: ["C", "D", "I", "N"], correctOption: 1, section: "Reasoning", marks: 4, difficulty: "Medium" },
  { id: 12, text: "Fill in the blank: The government has _____ new policies for rural development.", options: ["announced", "announcement", "announcing", "announces"], correctOption: 0, section: "English Language", marks: 4, difficulty: "Easy" },
  { id: 13, text: "Which planet is known as the Red Planet?", options: ["Jupiter", "Saturn", "Mars", "Venus"], correctOption: 2, section: "Science", marks: 4, difficulty: "Easy" },
  { id: 14, text: "A cube of side 4 cm has volume:", options: ["16 cm³", "32 cm³", "48 cm³", "64 cm³"], correctOption: 3, section: "Quantitative Aptitude", marks: 4, difficulty: "Easy" },
  { id: 15, text: "Who wrote the Indian national anthem 'Jana Gana Mana'?", options: ["Bankim Chandra Chattopadhyay", "Rabindranath Tagore", "Sarat Chandra", "Subramania Bharati"], correctOption: 1, section: "General Knowledge", marks: 4, difficulty: "Easy" },
];

export const SEEDED_LEADERBOARD = [
  { id: 1, name: "Rahul Sharma", state: "Uttar Pradesh", score: 98, testsTaken: 12, accuracy: 96, rank: 1 },
  { id: 2, name: "Anjali Gupta", state: "Delhi", score: 95, testsTaken: 15, accuracy: 94, rank: 2 },
  { id: 3, name: "Vikram Singh", state: "Haryana", score: 94, testsTaken: 8, accuracy: 95, rank: 3 },
  { id: 4, name: "Priya Patel", state: "Uttar Pradesh", score: 92, testsTaken: 10, accuracy: 91, rank: 4 },
  { id: 5, name: "Arjun Reddy", state: "Gujarat", score: 89, testsTaken: 20, accuracy: 88, rank: 5 },
  { id: 6, name: "Neha Desai", state: "Delhi", score: 88, testsTaken: 14, accuracy: 89, rank: 6 },
  { id: 7, name: "Aditya Kumar", state: "Uttar Pradesh", score: 85, testsTaken: 7, accuracy: 86, rank: 7 },
  { id: 8, name: "Kavita Yadav", state: "Bihar", score: 84, testsTaken: 11, accuracy: 85, rank: 8 },
  { id: 9, name: "Rohan Mishra", state: "Madhya Pradesh", score: 82, testsTaken: 9, accuracy: 83, rank: 9 },
  { id: 10, name: "Sanya Jain", state: "Rajasthan", score: 80, testsTaken: 16, accuracy: 81, rank: 10 },
  { id: 11, name: "Karan Verma", state: "Uttar Pradesh", score: 78, testsTaken: 5, accuracy: 79, rank: 11 },
  { id: 12, name: "Divya Shah", state: "Delhi", score: 75, testsTaken: 13, accuracy: 76, rank: 12 },
  { id: 13, name: "Aman Tiwari", state: "Uttar Pradesh", score: 72, testsTaken: 8, accuracy: 74, rank: 13 },
  { id: 14, name: "Pooja Joshi", state: "Haryana", score: 68, testsTaken: 6, accuracy: 70, rank: 14 },
  { id: 15, name: "Vivek Chauhan", state: "Punjab", score: 65, testsTaken: 10, accuracy: 67, rank: 15 },
];

export const SEEDED_REGISTRATIONS = [
  {
    id: "SIU104928",
    firstName: "Riya", lastName: "Singh",
    mobile: "9876543210", email: "riya.singh@example.com",
    city: "Lucknow", state: "Uttar Pradesh",
    qualification: "Class 12", board: "CBSE", marks: "88%", year: "2025",
    courses: ["B.Tech", "BCA"],
    examDate: "15 May 2026 (Morning)", examMode: "Online (CBT)", examCentre: "Lucknow Main Campus",
    medium: "English", category: "General", source: "Social Media",
    status: "Pending" as const,
    registeredAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    examCompleted: false, score: null as number | null
  },
  {
    id: "SIU839201",
    firstName: "Kabir", lastName: "Das",
    mobile: "9123456780", email: "kabir.das@example.com",
    city: "Delhi", state: "Delhi",
    qualification: "Class 12", board: "ICSE", marks: "92%", year: "2025",
    courses: ["BBA"],
    examDate: "15 May 2026 (Morning)", examMode: "Online (CBT)", examCentre: "Noida",
    medium: "English", category: "OBC", source: "Google Search",
    status: "Approved" as const,
    registeredAt: new Date(Date.now() - 86400000 * 5).toISOString(),
    examCompleted: true, score: 85 as number | null
  },
  {
    id: "SIU472910",
    firstName: "Meera", lastName: "Kapoor",
    mobile: "9988776655", email: "meera.k@example.com",
    city: "Kanpur", state: "Uttar Pradesh",
    qualification: "Undergraduate", board: "Lucknow University", marks: "7.8 CGPA", year: "2025",
    courses: ["MBA"],
    examDate: "01 Jun 2026 (Morning)", examMode: "Offline (Pen & Paper)", examCentre: "Kanpur",
    medium: "Hindi", category: "General", source: "Friend",
    status: "Approved" as const,
    registeredAt: new Date(Date.now() - 86400000 * 10).toISOString(),
    examCompleted: true, score: 92 as number | null
  },
  {
    id: "SIU293847",
    firstName: "Dev", lastName: "Verma",
    mobile: "8877665544", email: "dev.verma@example.com",
    city: "Varanasi", state: "Uttar Pradesh",
    qualification: "Class 12", board: "UP Board", marks: "75%", year: "2025",
    courses: ["B.Sc", "BA"],
    examDate: "22 May 2026 (Morning)", examMode: "Offline (Pen & Paper)", examCentre: "Varanasi",
    medium: "Hindi", category: "SC", source: "Newspaper",
    status: "Rejected" as const,
    registeredAt: new Date(Date.now() - 86400000 * 15).toISOString(),
    examCompleted: false, score: null as number | null
  },
  {
    id: "SIU564738",
    firstName: "Zara", lastName: "Khan",
    mobile: "7766554433", email: "zara.k@example.com",
    city: "Agra", state: "Uttar Pradesh",
    qualification: "Class 12", board: "CBSE", marks: "95%", year: "2025",
    courses: ["B.Pharma"],
    examDate: "01 Jun 2026 (Morning)", examMode: "Online (CBT)", examCentre: "Agra",
    medium: "English", category: "General", source: "Email",
    status: "Approved" as const,
    registeredAt: new Date(Date.now() - 86400000 * 1).toISOString(),
    examCompleted: false, score: null as number | null
  },
];

// ─── CUET Registration ───────────────────────────────────────────────────────

export type CUETRegistration = {
  id: string;
  firstName: string;
  lastName: string;
  dob: string;
  gender: string;
  mobile: string;
  email: string;
  city: string;
  state: string;
  qualification: string;
  board: string;
  marks: string;
  year: string;
  languages: string[];
  domainSubjects: string[];
  generalTest: boolean;
  testCity1: string;
  testCity2: string;
  testCity3: string;
  category: string;
  pwd: string;
  source: string;
  registeredAt: string;
};

export const CUET_LANGUAGES = [
  "English", "Hindi", "Assamese", "Bengali", "Gujarati",
  "Kannada", "Malayalam", "Marathi", "Odia", "Punjabi",
  "Tamil", "Telugu", "Urdu", "Sanskrit",
];

export const CUET_DOMAIN_SUBJECTS = [
  "Physics", "Chemistry", "Biology (Botany & Zoology)", "Mathematics",
  "Accountancy", "Business Studies", "Economics",
  "History", "Political Science", "Geography", "Sociology", "Psychology",
  "Computer Science", "Information Practices", "Agriculture",
  "Home Science", "Fine Arts", "Entrepreneurship", "Legal Studies",
  "Environmental Science", "Physical Education",
];

export const CUET_TEST_CITIES = [
  "Lucknow", "Delhi", "Varanasi", "Agra", "Kanpur", "Prayagraj",
  "Bareilly", "Meerut", "Mumbai", "Bengaluru", "Chennai", "Hyderabad",
  "Kolkata", "Jaipur", "Chandigarh", "Patna", "Bhopal", "Ahmedabad",
  "Pune", "Guwahati",
];

export const SEEDED_CUET_REGISTRATIONS: CUETRegistration[] = [
  {
    id: "CUET2026847382",
    firstName: "Priya", lastName: "Sharma",
    dob: "2007-03-15", gender: "Female",
    mobile: "9876543200", email: "priya.sharma@example.com",
    city: "Lucknow", state: "Uttar Pradesh",
    qualification: "Class 12", board: "CBSE", marks: "92%", year: "Appearing 2026",
    languages: ["English", "Hindi"],
    domainSubjects: ["Physics", "Chemistry", "Mathematics"],
    generalTest: true,
    testCity1: "Lucknow", testCity2: "Kanpur", testCity3: "Agra",
    category: "General", pwd: "No", source: "School / College",
    registeredAt: new Date(Date.now() - 86400000 * 3).toISOString(),
  },
  {
    id: "CUET2026293847",
    firstName: "Aryan", lastName: "Mehta",
    dob: "2006-11-20", gender: "Male",
    mobile: "9123456789", email: "aryan.mehta@example.com",
    city: "Delhi", state: "Delhi",
    qualification: "Class 12", board: "CBSE", marks: "88%", year: "Appearing 2026",
    languages: ["English"],
    domainSubjects: ["Biology (Botany & Zoology)", "Chemistry", "Physics"],
    generalTest: true,
    testCity1: "Delhi", testCity2: "Noida", testCity3: "Gurgaon",
    category: "OBC", pwd: "No", source: "Social Media",
    registeredAt: new Date(Date.now() - 86400000 * 7).toISOString(),
  },
];
