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
  { id: "p1", subject: "Physics",     name: "NEET Physics — Full Mock Test",          cuetSection: "Physics",     cuetCode: "PHY-01", difficulty: "Hard",     durationMinutes: 60, questionsCount: 50, attemptCount: 50, marks: 200, iconColor: "bg-blue-100 text-blue-700" },
  { id: "c1", subject: "Chemistry",   name: "NEET Chemistry — Full Mock Test",        cuetSection: "Chemistry",   cuetCode: "CHE-01", difficulty: "Medium",   durationMinutes: 60, questionsCount: 50, attemptCount: 50, marks: 200, iconColor: "bg-green-100 text-green-700" },
  { id: "b1", subject: "Biology",     name: "NEET Biology — Botany & Zoology",        cuetSection: "Biology",     cuetCode: "BIO-01", difficulty: "Medium",   durationMinutes: 60, questionsCount: 50, attemptCount: 50, marks: 200, iconColor: "bg-emerald-100 text-emerald-700" },
  { id: "b2", subject: "Biology",     name: "NEET Biology — Genetics & Evolution",    cuetSection: "Biology",     cuetCode: "BIO-02", difficulty: "Hard",     durationMinutes: 60, questionsCount: 50, attemptCount: 50, marks: 200, iconColor: "bg-teal-100 text-teal-700" },
  { id: "p2", subject: "Physics",     name: "NEET Physics — Mechanics & Waves",       cuetSection: "Physics",     cuetCode: "PHY-02", difficulty: "Medium",   durationMinutes: 60, questionsCount: 50, attemptCount: 50, marks: 200, iconColor: "bg-sky-100 text-sky-700" },
  { id: "c2", subject: "Chemistry",   name: "NEET Chemistry — Organic Focus",         cuetSection: "Chemistry",   cuetCode: "CHE-02", difficulty: "Hard",     durationMinutes: 60, questionsCount: 50, attemptCount: 50, marks: 200, iconColor: "bg-lime-100 text-lime-700" },
  { id: "f1", subject: "Full Mock",   name: "NEET Full Mock Test — Paper 1",          cuetSection: "Full Mock",   cuetCode: "NMK-01", difficulty: "Hard",     durationMinutes: 200, questionsCount: 180, attemptCount: 180, marks: 720, iconColor: "bg-purple-100 text-purple-700" },
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
    // ── EASY (Q1–12) ──
    { id:1,  text:"A body is thrown vertically upward with velocity u. The ratio of time of ascent to time of descent is:", options:["1:2","2:1","1:1","Depends on u"], correctOption:2, section:"Kinematics", marks:4, difficulty:"Easy" },
    { id:2,  text:"Which phenomena confirms the WAVE nature of light?", options:["Photoelectric effect","Compton scattering","Polarisation","Emission of photoelectrons"], correctOption:2, section:"Wave Optics", marks:4, difficulty:"Easy" },
    { id:3,  text:"A convex lens immersed in a liquid whose refractive index equals that of the lens. Its focal length:", options:["Becomes zero","Becomes infinite","Remains unchanged","Becomes very small"], correctOption:1, section:"Ray Optics", marks:4, difficulty:"Easy" },
    { id:4,  text:"The maximum KE of photoelectrons emitted from a metal depends on:", options:["Intensity only","Frequency only","Both intensity and frequency","Work function only"], correctOption:1, section:"Dual Nature", marks:4, difficulty:"Easy" },
    { id:5,  text:"SI unit of electric charge is:", options:["Ampere","Volt","Coulomb","Ohm"], correctOption:2, section:"Electrostatics", marks:4, difficulty:"Easy" },
    { id:6,  text:"A concave mirror has focal length 10 cm. Its radius of curvature is:", options:["5 cm","10 cm","20 cm","40 cm"], correctOption:2, section:"Ray Optics", marks:4, difficulty:"Easy" },
    { id:7,  text:"The first law of thermodynamics is based on:", options:["Conservation of momentum","Conservation of energy","Conservation of charge","Conservation of mass"], correctOption:1, section:"Thermodynamics", marks:4, difficulty:"Easy" },
    { id:8,  text:"Speed of light in vacuum is approximately:", options:["3×10⁶ m/s","3×10⁸ m/s","3×10¹⁰ m/s","3×10⁴ m/s"], correctOption:1, section:"Wave Optics", marks:4, difficulty:"Easy" },
    { id:9,  text:"A force of 10 N acts on a 2 kg body at rest. Acceleration is:", options:["2 m/s²","5 m/s²","10 m/s²","20 m/s²"], correctOption:1, section:"Newton's Laws", marks:4, difficulty:"Easy" },
    { id:10, text:"Ohm's law states V = IR. If V doubles and R stays same, current:", options:["Halves","Doubles","Stays same","Quadruples"], correctOption:1, section:"Current Electricity", marks:4, difficulty:"Easy" },
    { id:11, text:"The range of a projectile is maximum at projection angle:", options:["30°","45°","60°","90°"], correctOption:1, section:"Kinematics", marks:4, difficulty:"Easy" },
    { id:12, text:"An object at rest will remain at rest unless acted upon by an external force. This is Newton's:", options:["Second law","Third law","First law","Law of gravitation"], correctOption:2, section:"Newton's Laws", marks:4, difficulty:"Easy" },
    // ── MODERATE (Q13–25) ──
    { id:13, text:"In Young's double slit experiment, if slit separation is halved and distance to screen is doubled, fringe width:", options:["Remains same","Becomes half","Becomes double","Becomes four times"], correctOption:3, section:"Wave Optics", marks:4, difficulty:"Medium" },
    { id:14, text:"The resistance of a wire is R. If melted and stretched to n times its length, new resistance:", options:["nR","R/n","n²R","R/n²"], correctOption:2, section:"Current Electricity", marks:4, difficulty:"Medium" },
    { id:15, text:"Two particles of mass m and 2m have the same linear momentum. Ratio of KE (m:2m):", options:["1:2","2:1","1:1","1:4"], correctOption:1, section:"Mechanics", marks:4, difficulty:"Medium" },
    { id:16, text:"In a series LCR circuit at resonance, impedance equals:", options:["Zero","XL","R only","XC"], correctOption:2, section:"Alternating Current", marks:4, difficulty:"Medium" },
    { id:17, text:"Work done by gas during isothermal expansion from V₁ to V₂ at temperature T:", options:["nRT ln(V₂/V₁)","nRT(V₂−V₁)","Zero","nCv(T₂−T₁)"], correctOption:0, section:"Thermodynamics", marks:4, difficulty:"Medium" },
    { id:18, text:"Magnetic force on a charge q moving with velocity v in field B is:", options:["qvB","qE","qvB sinθ","qvB cosθ"], correctOption:2, section:"Magnetism", marks:4, difficulty:"Medium" },
    { id:19, text:"If a current-carrying conductor is placed in a magnetic field perpendicular to it, force on it is:", options:["Zero","Maximum","Minimum","Depends on length"], correctOption:1, section:"Magnetism", marks:4, difficulty:"Medium" },
    { id:20, text:"De Broglie wavelength of a particle of mass m and kinetic energy KE is:", options:["h/mv","h/√(2mKE)","h×mv","2mKE/h"], correctOption:1, section:"Dual Nature", marks:4, difficulty:"Medium" },
    { id:21, text:"A transformer steps up voltage from 220V to 2200V. Turns ratio (primary:secondary) is:", options:["10:1","1:10","1:1","100:1"], correctOption:1, section:"Alternating Current", marks:4, difficulty:"Medium" },
    { id:22, text:"Total internal reflection occurs when light travels from:", options:["Rarer to denser medium above critical angle","Denser to rarer medium above critical angle","Any medium at 90°","Denser to rarer below critical angle"], correctOption:1, section:"Ray Optics", marks:4, difficulty:"Medium" },
    { id:23, text:"The time period of a simple pendulum depends on:", options:["Mass of bob","Length and g","Amplitude","Material of bob"], correctOption:1, section:"Oscillations", marks:4, difficulty:"Medium" },
    { id:24, text:"Velocity of sound in air at 0°C is 332 m/s. At 4°C it will be:", options:["Less than 332 m/s","332 m/s exactly","Slightly more than 332 m/s","Cannot be determined"], correctOption:2, section:"Waves", marks:4, difficulty:"Medium" },
    { id:25, text:"Binding energy per nucleon is maximum for:", options:["Hydrogen","Uranium","Iron (Fe-56)","Carbon"], correctOption:2, section:"Modern Physics", marks:4, difficulty:"Medium" },
    // ── HARD (Q26–38) ──
    { id:26, text:"A particle moves in a circle of radius R with constant speed v. Change in velocity when it moves through 60°:", options:["v","v√2","v√3","2v sin30°"], correctOption:3, section:"Circular Motion", marks:4, difficulty:"Hard" },
    { id:27, text:"An ideal gas undergoes adiabatic process PV^1.5 = constant. Ratio Cp/Cv is:", options:["1.5","1.4","1.33","1.67"], correctOption:0, section:"Thermodynamics", marks:4, difficulty:"Hard" },
    { id:28, text:"Half-life of a radioactive substance is 30 days. Time for 3/4 of original mass to disintegrate:", options:["30 days","45 days","60 days","90 days"], correctOption:2, section:"Modern Physics", marks:4, difficulty:"Hard" },
    { id:29, type:"AR", text:"Assertion (A): Centripetal force on a particle in circular path does no work.\nReason (R): Centripetal force is always perpendicular to velocity.", options:AR_OPTIONS, correctOption:0, section:"Circular Motion", marks:4, difficulty:"Hard" },
    { id:30, type:"AR", text:"Assertion (A): In pure inductive AC circuit, current lags voltage by 90°.\nReason (R): An inductor stores energy in its electric field.", options:AR_OPTIONS, correctOption:2, section:"Alternating Current", marks:4, difficulty:"Hard" },
    { id:31, text:"A photon has energy E = hν. If frequency doubles, momentum of photon:", options:["Stays same","Doubles","Halves","Quadruples"], correctOption:1, section:"Dual Nature", marks:4, difficulty:"Hard" },
    { id:32, text:"In a p-n junction diode under forward bias, the depletion region:", options:["Widens","Narrows","Stays same","Disappears completely"], correctOption:1, section:"Semiconductors", marks:4, difficulty:"Hard" },
    { id:33, text:"Two identical conducting spheres carry charges +3q and −q. They touch and separate. Charge on each sphere:", options:["q","+q","−q","+2q"], correctOption:1, section:"Electrostatics", marks:4, difficulty:"Hard" },
    { id:34, text:"Escape velocity from Earth's surface is v. Escape velocity from a planet of same mass but double radius:", options:["v/√2","v√2","v/2","2v"], correctOption:0, section:"Gravitation", marks:4, difficulty:"Hard" },
    { id:35, text:"In photoelectric effect, stopping potential depends on:", options:["Intensity of light","Frequency of light","Both","Neither"], correctOption:1, section:"Dual Nature", marks:4, difficulty:"Hard" },
    { id:36, text:"A charged particle enters a uniform magnetic field perpendicular to it. It moves in:", options:["Straight line","Parabola","Circle","Ellipse"], correctOption:2, section:"Magnetism", marks:4, difficulty:"Hard" },
    { id:37, text:"Coefficient of performance of a Carnot refrigerator working between −23°C and 27°C:", options:["4","5","6","3"], correctOption:1, section:"Thermodynamics", marks:4, difficulty:"Hard" },
    { id:38, text:"An electron and a proton are accelerated through same potential difference. Ratio of their de Broglie wavelengths λe/λp:", options:["1","mp/me","√(mp/me)","√(me/mp)"], correctOption:2, section:"Dual Nature", marks:4, difficulty:"Hard" },
    // ── ADVANCED / CONCEPTUAL (Q39–50) ──
    { id:39, text:"A uniform rod of mass M and length L is pivoted at one end. Moment of inertia about pivot:", options:["ML²/12","ML²/3","ML²/2","ML²"], correctOption:1, section:"Rotational Motion", marks:4, difficulty:"JEE Level" },
    { id:40, text:"For a standing wave on a string fixed at both ends, which harmonic has exactly 3 antinodes?", options:["1st","2nd","3rd","4th"], correctOption:2, section:"Waves", marks:4, difficulty:"JEE Level" },
    { id:41, type:"AR", text:"Assertion (A): MOSFET is preferred over BJT in VLSI circuits.\nReason (R): MOSFETs occupy less space, consume less power, and are easier to fabricate.", options:AR_OPTIONS, correctOption:0, section:"Semiconductors", marks:4, difficulty:"JEE Level" },
    { id:42, text:"A capacitor C is connected to a battery of EMF ε with internal resistance r. Energy stored in capacitor at steady state:", options:["½Cε²","Cε²","½Cε²r²","Cε²(1−r)"], correctOption:0, section:"Electrostatics", marks:4, difficulty:"JEE Level" },
    { id:43, text:"An ideal gas expands adiabatically. Which of the following is true?", options:["ΔQ=0, ΔU=W","ΔQ=0, ΔU=−W","ΔW=0","ΔU=0"], correctOption:1, section:"Thermodynamics", marks:4, difficulty:"JEE Level" },
    { id:44, text:"Poynting vector in electromagnetic wave represents:", options:["Energy density","Direction and rate of energy flow","Amplitude of wave","Frequency of wave"], correctOption:1, section:"EM Waves", marks:4, difficulty:"JEE Level" },
    { id:45, text:"In YDSE with monochromatic light, what happens to fringe pattern if entire setup is immersed in liquid of μ=1.5?", options:["Fringe width increases by 1.5×","Fringe width decreases to 2/3","No change","Fringes disappear"], correctOption:1, section:"Wave Optics", marks:4, difficulty:"JEE Level" },
    { id:46, text:"Two sources emit light with wavelength 500 nm. They are coherent if phase difference between them remains:", options:["Constantly varying","Zero always","Constant over time","Equal to π"], correctOption:2, section:"Wave Optics", marks:4, difficulty:"JEE Level" },
    { id:47, text:"Carnot engine works between 227°C and 27°C. Its efficiency and COP as heat pump respectively:", options:["40%, 2.5","50%, 2","40%, 1.67","50%, 2.5"], correctOption:0, section:"Thermodynamics", marks:4, difficulty:"JEE Level" },
    { id:48, text:"A proton and alpha particle enter same magnetic field with same KE. Ratio of radii (rp:rα):", options:["1:1","1:√2","√2:1","1:2"], correctOption:1, section:"Magnetism", marks:4, difficulty:"JEE Level" },
    { id:49, text:"Heisenberg uncertainty principle states Δx·Δp ≥ h/4π. This implies:", options:["We can never know position","Measurement disturbs the system fundamentally","Particles don't have definite position and momentum simultaneously","Only applies to electrons"], correctOption:2, section:"Modern Physics", marks:4, difficulty:"JEE Level" },
    { id:50, text:"A conducting loop is placed in a time-varying magnetic field. According to Lenz's law, induced current opposes:", options:["The voltage source","The change in magnetic flux","The resistance","The electric field"], correctOption:1, section:"Electromagnetic Induction", marks:4, difficulty:"JEE Level" },
  ],

  c1: [
    // ── EASY (Q1–12) ──
    { id:1,  text:"Which of the following is the correct IUPAC name for CH₃–CH(OH)–CH₂–CH₃?", options:["2-Butanol","3-Butanol","Butan-2-ol","Sec-butanol"], correctOption:2, section:"Nomenclature", marks:4, difficulty:"Easy" },
    { id:2,  text:"Which reagent distinguishes between aldehyde and ketone?", options:["Fehling's solution","Lucas reagent","Molisch reagent","Baeyer's reagent"], correctOption:0, section:"Carbonyl Compounds", marks:4, difficulty:"Easy" },
    { id:3,  text:"Which of the following compounds is a primary amine?", options:["(CH₃)₃N","(CH₃)₂NH","CH₃NH₂","C₆H₅NHCH₃"], correctOption:2, section:"Amines", marks:4, difficulty:"Easy" },
    { id:4,  text:"Which of the following is NOT a characteristic of benzene?", options:["All C–C bond lengths are equal","It is planar","It readily undergoes addition reactions","It has 6 π-electrons"], correctOption:2, section:"Aromatic Chemistry", marks:4, difficulty:"Easy" },
    { id:5,  text:"PCC oxidises primary alcohol to:", options:["Carboxylic acid","Aldehyde","Ketone","Alkene"], correctOption:1, section:"Carbonyl Compounds", marks:4, difficulty:"Easy" },
    { id:6,  text:"NaOH solution turns red litmus:", options:["Red","Blue","Green","No change"], correctOption:1, section:"Acids & Bases", marks:4, difficulty:"Easy" },
    { id:7,  text:"Chemical formula of baking soda is:", options:["Na₂CO₃","NaHCO₃","NaOH","Na₂SO₄"], correctOption:1, section:"General Chemistry", marks:4, difficulty:"Easy" },
    { id:8,  text:"Valency of nitrogen in NH₃ is:", options:["1","2","3","4"], correctOption:2, section:"General Chemistry", marks:4, difficulty:"Easy" },
    { id:9,  text:"Which gas is produced when zinc reacts with dilute H₂SO₄?", options:["O₂","SO₂","H₂","CO₂"], correctOption:2, section:"General Chemistry", marks:4, difficulty:"Easy" },
    { id:10, text:"The bond angle in water molecule is approximately:", options:["90°","104.5°","109.5°","120°"], correctOption:1, section:"Chemical Bonding", marks:4, difficulty:"Easy" },
    { id:11, text:"Ethanol on oxidation with acidified K₂Cr₂O₇ gives:", options:["Methanol","Ethanoic acid","Ethene","Propanol"], correctOption:1, section:"Alcohols", marks:4, difficulty:"Easy" },
    { id:12, text:"Which element has the highest electronegativity?", options:["Oxygen","Chlorine","Fluorine","Nitrogen"], correctOption:2, section:"Periodic Table", marks:4, difficulty:"Easy" },
    // ── MODERATE (Q13–25) ──
    { id:13, text:"Benzene reacts with Cl₂ in presence of anhydrous FeCl₃. This is:", options:["Nucleophilic addition","Electrophilic substitution","Free radical substitution","Nucleophilic substitution"], correctOption:1, section:"Aromatic Chemistry", marks:4, difficulty:"Medium" },
    { id:14, text:"Aldol condensation occurs when:", options:["Both are ketones only","One or both have α-hydrogen, in presence of base","Neither has α-hydrogen","Only aldehydes are used"], correctOption:1, section:"Named Reactions", marks:4, difficulty:"Medium" },
    { id:15, text:"Markovnikov's rule: In addition of HX to unsymmetrical alkene:", options:["H adds to more substituted carbon","X adds to less substituted carbon","H adds to less substituted carbon","X adds randomly"], correctOption:2, section:"Alkenes", marks:4, difficulty:"Medium" },
    { id:16, text:"Grignard reagent reacted with CO₂ then hydrolysis gives:", options:["Alcohol","Carboxylic acid","Aldehyde","Ketone"], correctOption:1, section:"Named Reactions", marks:4, difficulty:"Medium" },
    { id:17, text:"Coupling reaction of diazonium salt with phenol in alkaline medium gives:", options:["Azo dye","Phenol ether","Biphenyl","Quinone"], correctOption:0, section:"Amines", marks:4, difficulty:"Medium" },
    { id:18, text:"In SN2 reaction, attack of nucleophile occurs:", options:["From same side as leaving group","From opposite side of leaving group","From top of molecule","Randomly"], correctOption:1, section:"Alkyl Halides", marks:4, difficulty:"Medium" },
    { id:19, text:"Which of the following is a reducing sugar?", options:["Sucrose","Glucose","Starch","Cellulose"], correctOption:1, section:"Biomolecules", marks:4, difficulty:"Medium" },
    { id:20, text:"Amino acids are joined by:", options:["Glycosidic bond","Peptide bond","Ester bond","Hydrogen bond"], correctOption:1, section:"Biomolecules", marks:4, difficulty:"Medium" },
    { id:21, text:"Which of following has highest boiling point?", options:["n-butane","2-methylpropane","n-pentane","2-methylbutane"], correctOption:2, section:"Alkanes", marks:4, difficulty:"Medium" },
    { id:22, text:"Rate of reaction depends on:", options:["Concentration of reactants","Temperature","Catalyst","All of these"], correctOption:3, section:"Chemical Kinetics", marks:4, difficulty:"Medium" },
    { id:23, text:"Half-life of first order reaction does NOT depend on:", options:["Rate constant","Initial concentration","Temperature","Catalyst"], correctOption:1, section:"Chemical Kinetics", marks:4, difficulty:"Medium" },
    { id:24, text:"ΔG = ΔH − TΔS. Reaction is spontaneous when ΔG is:", options:["Positive","Zero","Negative","Equal to ΔH"], correctOption:2, section:"Thermodynamics", marks:4, difficulty:"Medium" },
    { id:25, text:"Osmotic pressure π = CRT. If concentration doubles at same T, osmotic pressure:", options:["Halves","Stays same","Doubles","Quadruples"], correctOption:2, section:"Solutions", marks:4, difficulty:"Medium" },
    // ── HARD (Q26–38) ──
    { id:26, text:"Cannizzaro reaction is exhibited by:", options:["Acetaldehyde","Benzaldehyde only","Formaldehyde only","Both formaldehyde and benzaldehyde"], correctOption:3, section:"Named Reactions", marks:4, difficulty:"Hard" },
    { id:27, text:"Gabriel synthesis is used to prepare:", options:["Secondary aliphatic amines","Tertiary amines","Primary aliphatic amines","Aromatic amines"], correctOption:2, section:"Amines", marks:4, difficulty:"Hard" },
    { id:28, text:"Which is the strongest acid? (pKa values given)", options:["CH₃COOH (4.75)","Cl₂CHCOOH (1.48)","ClCH₂COOH (2.86)","F₃CCOOH (0.52)"], correctOption:3, section:"Acids & Bases", marks:4, difficulty:"Hard" },
    { id:29, type:"AR", text:"Assertion (A): The nitro group (–NO₂) is a meta-director.\nReason (R): It withdraws electron density through induction and resonance making ortho/para less reactive.", options:AR_OPTIONS, correctOption:0, section:"Aromatic Chemistry", marks:4, difficulty:"Hard" },
    { id:30, type:"AR", text:"Assertion (A): SN2 reactions are favoured by primary alkyl halides over tertiary.\nReason (R): Primary carbocations are more stable than tertiary.", options:AR_OPTIONS, correctOption:2, section:"Alkyl Halides", marks:4, difficulty:"Hard" },
    { id:31, text:"Kolbe's reaction involves reaction of sodium phenoxide with:", options:["CO₂ under pressure","CO at high temp","CH₃Cl","Cl₂"], correctOption:0, section:"Named Reactions", marks:4, difficulty:"Hard" },
    { id:32, text:"Diazotization reaction requires temperature:", options:["100°C","50°C","0–5°C","Room temperature"], correctOption:2, section:"Amines", marks:4, difficulty:"Hard" },
    { id:33, text:"Which polymer is formed by condensation polymerisation?", options:["Polyethylene","PVC","Nylon-6,6","Polystyrene"], correctOption:2, section:"Polymers", marks:4, difficulty:"Hard" },
    { id:34, text:"In electrolysis of water, volume of H₂ produced at cathode vs O₂ at anode is:", options:["Equal","H₂ is double O₂","O₂ is double H₂","Depends on voltage"], correctOption:1, section:"Electrochemistry", marks:4, difficulty:"Hard" },
    { id:35, text:"Nernst equation gives EMF of cell under:", options:["Standard conditions only","Non-standard conditions","Zero current conditions","Reversible conditions only"], correctOption:1, section:"Electrochemistry", marks:4, difficulty:"Hard" },
    { id:36, text:"Baeyer's reagent is:", options:["Conc. H₂SO₄","Alkaline KMnO₄","HNO₃","H₂O₂"], correctOption:1, section:"Alkenes", marks:4, difficulty:"Hard" },
    { id:37, text:"Degree of unsaturation (DoU) of C₆H₅–NH₂ is:", options:["3","4","5","6"], correctOption:1, section:"Nomenclature", marks:4, difficulty:"Hard" },
    { id:38, text:"Lyophilic colloids are:", options:["Irreversible","Reversible","Always positive","Always negative"], correctOption:1, section:"Surface Chemistry", marks:4, difficulty:"Hard" },
    // ── ADVANCED / CONCEPTUAL (Q39–50) ──
    { id:39, text:"Order of stability of carbocations: CH₃⁺ vs (CH₃)₂CH⁺ vs (CH₃)₃C⁺:", options:["Primary > Secondary > Tertiary","Tertiary > Secondary > Primary","All equal","Secondary > Tertiary > Primary"], correctOption:1, section:"Reaction Mechanisms", marks:4, difficulty:"JEE Level" },
    { id:40, text:"Optical isomers are non-superimposable mirror images. The minimum requirement is:", options:["Double bond","Chiral centre","Ring structure","Aromatic ring"], correctOption:1, section:"Stereochemistry", marks:4, difficulty:"JEE Level" },
    { id:41, text:"Fries rearrangement converts phenyl ester to:", options:["Biphenyl","Hydroxy ketone","Phenol","Ester"], correctOption:1, section:"Named Reactions", marks:4, difficulty:"JEE Level" },
    { id:42, text:"Which of the following is an example of E2 elimination?", options:["Heating primary alcohol with conc H₂SO₄","Treating alkyl halide with alcoholic KOH","Hydrogenation of alkene","Hydration of alkene"], correctOption:1, section:"Alkyl Halides", marks:4, difficulty:"JEE Level" },
    { id:43, text:"In coordination compound [Co(NH₃)₆]Cl₃, oxidation state of Co is:", options:["+1","+2","+3","+6"], correctOption:2, section:"Coordination Chemistry", marks:4, difficulty:"JEE Level" },
    { id:44, text:"Crystal field theory: In octahedral field, d-orbitals split into:", options:["eg and t2g with eg higher","t2g and eg with eg higher","t2g and eg with t2g higher","No splitting"], correctOption:1, section:"Coordination Chemistry", marks:4, difficulty:"JEE Level" },
    { id:45, text:"Zwitter ion formation is characteristic of:", options:["Carbohydrates","Proteins","Amino acids","Lipids"], correctOption:2, section:"Biomolecules", marks:4, difficulty:"JEE Level" },
    { id:46, text:"Beckmann rearrangement converts oxime to:", options:["Amide","Amine","Carboxylic acid","Nitrile"], correctOption:0, section:"Named Reactions", marks:4, difficulty:"JEE Level" },
    { id:47, text:"In cis-platin [Pt(NH₃)₂Cl₂], the geometry around Pt is:", options:["Tetrahedral","Square planar","Octahedral","Linear"], correctOption:1, section:"Coordination Chemistry", marks:4, difficulty:"JEE Level" },
    { id:48, text:"Which is NOT a property of a catalyst?", options:["Increases rate of reaction","Unchanged at end of reaction","Changes equilibrium position","Lowers activation energy"], correctOption:2, section:"Chemical Kinetics", marks:4, difficulty:"JEE Level" },
    { id:49, text:"Born-Haber cycle is used to calculate:", options:["Lattice energy","Bond energy","Activation energy","Ionization energy"], correctOption:0, section:"Thermodynamics", marks:4, difficulty:"JEE Level" },
    { id:50, text:"Isoelectronic species: which pair has same number of electrons?", options:["N₂ and CO","O₂ and F₂","CO₂ and NO₂","SO₂ and CO₂"], correctOption:0, section:"Chemical Bonding", marks:4, difficulty:"JEE Level" },
  ],

  b1: [
    // ── EASY (Q1–12) ──
    { id:1,  text:"Which nitrogenous base is present in RNA but NOT in DNA?", options:["Cytosine","Adenine","Uracil","Guanine"], correctOption:2, section:"Molecular Biology", marks:4, difficulty:"Easy" },
    { id:2,  text:"The central dogma of molecular biology:", options:["Protein→RNA→DNA","DNA→RNA→Protein","RNA→DNA→Protein","DNA→Protein→RNA"], correctOption:1, section:"Molecular Biology", marks:4, difficulty:"Easy" },
    { id:3,  text:"Mendel's law of independent assortment is valid for genes on:", options:["Same chromosome","Different non-homologous chromosomes","X chromosome only","Autosomes only"], correctOption:1, section:"Mendelian Genetics", marks:4, difficulty:"Easy" },
    { id:4,  text:"In DNA double helix, adenine pairs with thymine through:", options:["3 hydrogen bonds","2 hydrogen bonds","1 hydrogen bond","Covalent bonds"], correctOption:1, section:"Molecular Biology", marks:4, difficulty:"Easy" },
    { id:5,  text:"Photosynthesis takes place in:", options:["Mitochondria","Chloroplast","Ribosome","Nucleus"], correctOption:1, section:"Plant Physiology", marks:4, difficulty:"Easy" },
    { id:6,  text:"Which blood group is universal donor?", options:["A","B","AB","O"], correctOption:3, section:"Human Physiology", marks:4, difficulty:"Easy" },
    { id:7,  text:"Insulin is secreted by which cells in pancreas?", options:["Alpha cells","Beta cells","Delta cells","PP cells"], correctOption:1, section:"Human Physiology", marks:4, difficulty:"Easy" },
    { id:8,  text:"Cell wall of plants is mainly composed of:", options:["Chitin","Cellulose","Pectin","Lignin"], correctOption:1, section:"Cell Biology", marks:4, difficulty:"Easy" },
    { id:9,  text:"Process of cell division that produces gametes is:", options:["Mitosis","Meiosis","Amitosis","Binary fission"], correctOption:1, section:"Cell Division", marks:4, difficulty:"Easy" },
    { id:10, text:"Richest source of Vitamin C is:", options:["Mango","Banana","Amla (Indian gooseberry)","Apple"], correctOption:2, section:"Nutrition", marks:4, difficulty:"Easy" },
    { id:11, text:"Malaria is caused by:", options:["Virus","Bacteria","Plasmodium","Fungus"], correctOption:2, section:"Human Health", marks:4, difficulty:"Easy" },
    { id:12, text:"Which organ produces bile juice?", options:["Pancreas","Stomach","Liver","Gall bladder"], correctOption:2, section:"Human Physiology", marks:4, difficulty:"Easy" },
    // ── MODERATE (Q13–25) ──
    { id:13, text:"In a dihybrid cross TtRr × TtRr, fraction of offspring that will be ttRR:", options:["1/4","1/8","1/16","3/16"], correctOption:2, section:"Dihybrid Cross", marks:4, difficulty:"Medium" },
    { id:14, text:"Restriction endonucleases recognise and cut DNA at:", options:["Any random sequence","Specific palindromic sequences","Only single-stranded DNA","Only RNA sequences"], correctOption:1, section:"Biotechnology", marks:4, difficulty:"Medium" },
    { id:15, text:"Natural selection acts directly on:", options:["Genotype only","Phenotype","Random mutations only","Neither"], correctOption:1, section:"Evolution", marks:4, difficulty:"Medium" },
    { id:16, text:"Wings of bats and wings of insects are example of:", options:["Homologous — divergent evolution","Analogous — convergent evolution","Vestigial organs","Homologous — convergent evolution"], correctOption:1, section:"Evolution", marks:4, difficulty:"Medium" },
    { id:17, text:"PCR (Polymerase Chain Reaction) requires:", options:["RNA Polymerase","Short DNA primers","Restriction enzymes","DNA Ligase only"], correctOption:1, section:"Biotechnology", marks:4, difficulty:"Medium" },
    { id:18, text:"Founder effect is a type of:", options:["Natural selection","Sexual selection","Genetic drift","Gene flow"], correctOption:2, section:"Evolution", marks:4, difficulty:"Medium" },
    { id:19, text:"Osmosis is movement of water from:", options:["High solute to low solute through semi-permeable membrane","Low solute to high solute through semi-permeable membrane","High pressure to low pressure","Low pressure to high pressure"], correctOption:1, section:"Plant Physiology", marks:4, difficulty:"Medium" },
    { id:20, text:"Which hormone is responsible for 'fight or flight' response?", options:["Insulin","Thyroxine","Adrenaline","Cortisol"], correctOption:2, section:"Human Physiology", marks:4, difficulty:"Medium" },
    { id:21, text:"Krebs cycle occurs in:", options:["Cytoplasm","Mitochondrial matrix","Inner mitochondrial membrane","Nucleus"], correctOption:1, section:"Cell Respiration", marks:4, difficulty:"Medium" },
    { id:22, text:"Which type of RNA carries amino acids to ribosome?", options:["mRNA","rRNA","tRNA","hnRNA"], correctOption:2, section:"Molecular Biology", marks:4, difficulty:"Medium" },
    { id:23, text:"Hardy-Weinberg equilibrium is disturbed by:", options:["Large population","Random mating","Natural selection","Absence of mutation"], correctOption:2, section:"Evolution", marks:4, difficulty:"Medium" },
    { id:24, text:"Lac operon in bacteria: lactose acts as:", options:["Repressor","Inducer","Promoter","Operator"], correctOption:1, section:"Molecular Biology", marks:4, difficulty:"Medium" },
    { id:25, text:"Which plant hormone promotes fruit ripening?", options:["Auxin","Cytokinin","Gibberellin","Ethylene"], correctOption:3, section:"Plant Physiology", marks:4, difficulty:"Medium" },
    // ── HARD (Q26–38) ──
    { id:26, text:"Aa × Aa cross with a recessive lethal allele — viable offspring ratio:", options:["3:1","1:2:1","2:1","1:1"], correctOption:2, section:"Mendelian Genetics", marks:4, difficulty:"Hard" },
    { id:27, type:"AR", text:"Assertion (A): Sickle cell anaemia results from a point mutation in beta-globin gene.\nReason (R): Glutamic acid is substituted by valine at position 6 causing polymerisation under low O₂.", options:AR_OPTIONS, correctOption:0, section:"Genetics", marks:4, difficulty:"Hard" },
    { id:28, type:"AR", text:"Assertion (A): Restriction endonucleases are called 'molecular scissors'.\nReason (R): They cut DNA at specific palindromic sequences generating sticky or blunt ends.", options:AR_OPTIONS, correctOption:0, section:"Biotechnology", marks:4, difficulty:"Hard" },
    { id:29, text:"Which of the following about lac operon is CORRECT?", options:["It is constitutive","Lactose inactivates the repressor","Always in 'on' state","Repressor promotes transcription"], correctOption:1, section:"Molecular Biology", marks:4, difficulty:"Hard" },
    { id:30, text:"Crossing over occurs during:", options:["Leptotene","Zygotene","Pachytene","Diplotene"], correctOption:2, section:"Cell Division", marks:4, difficulty:"Hard" },
    { id:31, text:"Which immunoglobulin crosses placenta to provide passive immunity to foetus?", options:["IgA","IgM","IgG","IgE"], correctOption:2, section:"Human Health", marks:4, difficulty:"Hard" },
    { id:32, text:"In which phase of meiosis does chiasmata formation occur?", options:["Leptotene","Zygotene","Pachytene","Diplotene"], correctOption:3, section:"Cell Division", marks:4, difficulty:"Hard" },
    { id:33, text:"Bt cotton is resistant to bollworm because it produces:", options:["Insecticide from soil bacteria","Cry protein toxic to insect larvae","Antifungal compounds","Herbicide tolerance"], correctOption:1, section:"Biotechnology", marks:4, difficulty:"Hard" },
    { id:34, text:"Satellite DNA is useful in:", options:["Gene therapy","DNA fingerprinting","PCR amplification","Restriction mapping"], correctOption:1, section:"Molecular Biology", marks:4, difficulty:"Hard" },
    { id:35, text:"ABO blood grouping is an example of:", options:["Complete dominance","Incomplete dominance","Codominance","Epistasis"], correctOption:2, section:"Genetics", marks:4, difficulty:"Hard" },
    { id:36, text:"Which plant tissue is responsible for secondary growth?", options:["Apical meristem","Intercalary meristem","Lateral meristem (Cambium)","Ground meristem"], correctOption:2, section:"Plant Anatomy", marks:4, difficulty:"Hard" },
    { id:37, text:"ETS (Electron Transport System) is located in:", options:["Cytoplasm","Mitochondrial matrix","Inner mitochondrial membrane","Outer mitochondrial membrane"], correctOption:2, section:"Cell Respiration", marks:4, difficulty:"Hard" },
    { id:38, text:"Golden Rice has been genetically modified to produce:", options:["Vitamin C","Vitamin D","Beta-carotene","Iron"], correctOption:2, section:"Biotechnology", marks:4, difficulty:"Hard" },
    // ── ADVANCED / CONCEPTUAL (Q39–50) ──
    { id:39, text:"Which enzyme is used to join two DNA fragments in recombinant DNA technology?", options:["Restriction endonuclease","DNA Polymerase","DNA Ligase","RNA Polymerase"], correctOption:2, section:"Biotechnology", marks:4, difficulty:"JEE Level" },
    { id:40, text:"Meselson and Stahl experiment proved DNA replication is:", options:["Conservative","Semi-conservative","Dispersive","Random"], correctOption:1, section:"Molecular Biology", marks:4, difficulty:"JEE Level" },
    { id:41, text:"Post-transcriptional modification includes all EXCEPT:", options:["5' capping","3' poly-A tail addition","Splicing of introns","Amino acid attachment"], correctOption:3, section:"Molecular Biology", marks:4, difficulty:"JEE Level" },
    { id:42, text:"Which theory of evolution states that evolution is gradual and continuous?", options:["De Vries mutation theory","Darwin's natural selection","Lamarck's use & disuse","Punctuated equilibrium"], correctOption:1, section:"Evolution", marks:4, difficulty:"JEE Level" },
    { id:43, text:"In somatic hybridization, protoplast fusion is achieved using:", options:["Colchicine","PEG or electrofusion","Restriction enzymes","Agrobacterium"], correctOption:1, section:"Biotechnology", marks:4, difficulty:"JEE Level" },
    { id:44, text:"Which of the following is correct about HIV?", options:["It is a DNA virus","It uses reverse transcriptase","It attacks RBC","It is destroyed by normal immune system"], correctOption:1, section:"Human Health", marks:4, difficulty:"JEE Level" },
    { id:45, text:"Transgenic animals are used for all EXCEPT:", options:["Studying gene function","Producing therapeutic proteins","Vaccine safety testing","Replacing humans in organ transplants"], correctOption:3, section:"Biotechnology", marks:4, difficulty:"JEE Level" },
    { id:46, text:"Miller and Urey experiment simulated early Earth conditions and produced:", options:["DNA","Amino acids","Proteins","ATP"], correctOption:1, section:"Evolution", marks:4, difficulty:"JEE Level" },
    { id:47, text:"Apomixis in plants means:", options:["Sexual reproduction","Seed formation without fertilization","Vegetative propagation","Asexual spore formation"], correctOption:1, section:"Plant Reproduction", marks:4, difficulty:"JEE Level" },
    { id:48, text:"Cancer cells differ from normal cells because they:", options:["Divide at slower rate","Show contact inhibition","Undergo uncontrolled division","Have higher apoptosis rate"], correctOption:2, section:"Human Health", marks:4, difficulty:"JEE Level" },
    { id:49, text:"Totipotency means:", options:["Ability of cell to divide indefinitely","Ability of cell to develop into complete organism","Ability to photosynthesize","Ability to undergo meiosis"], correctOption:1, section:"Biotechnology", marks:4, difficulty:"JEE Level" },
    { id:50, text:"Primary productivity in an ecosystem is measured as:", options:["Biomass per unit area","Energy fixed per unit area per unit time","Number of organisms","Decomposition rate"], correctOption:1, section:"Ecology", marks:4, difficulty:"JEE Level" },
  ],

  b2: [
    // Biology — Genetics & Evolution (50 Qs progressive)
    { id:1, text:"DNA is a double helix. Who proposed this model?", options:["Griffith & Avery","Watson & Crick","Hershey & Chase","Meselson & Stahl"], correctOption:1, section:"Molecular Biology", marks:4, difficulty:"Easy" },
    { id:2, text:"Number of chromosomes in human somatic cell:", options:["23","46","48","44"], correctOption:1, section:"Cell Biology", marks:4, difficulty:"Easy" },
    { id:3, text:"Which is the genetic material in most organisms?", options:["RNA","DNA","Protein","Lipid"], correctOption:1, section:"Molecular Biology", marks:4, difficulty:"Easy" },
    { id:4, text:"Mendel used which plant for his experiments?", options:["Tomato","Pea (Pisum sativum)","Maize","Wheat"], correctOption:1, section:"Mendelian Genetics", marks:4, difficulty:"Easy" },
    { id:5, text:"Sickle cell anemia is caused by:", options:["Chromosomal deletion","Point mutation in beta-globin gene","Trisomy","Translocation"], correctOption:1, section:"Genetics", marks:4, difficulty:"Easy" },
    { id:6, text:"Which enzyme replicates DNA?", options:["RNA polymerase","DNA polymerase","DNA ligase","Helicase"], correctOption:1, section:"Molecular Biology", marks:4, difficulty:"Easy" },
    { id:7, text:"Down syndrome is caused by trisomy of chromosome:", options:["18","13","21","X"], correctOption:2, section:"Genetics", marks:4, difficulty:"Easy" },
    { id:8, text:"Gene mutation involves change in:", options:["Chromosome number","Chromosome structure","DNA base sequence","Cell organelles"], correctOption:2, section:"Genetics", marks:4, difficulty:"Easy" },
    { id:9, text:"Which of these is a sex-linked disease?", options:["Sickle cell anemia","Colour blindness","Cystic fibrosis","Phenylketonuria"], correctOption:1, section:"Genetics", marks:4, difficulty:"Easy" },
    { id:10, text:"Template strand of DNA is also called:", options:["Coding strand","Non-template strand","Antisense strand","Sense strand"], correctOption:2, section:"Molecular Biology", marks:4, difficulty:"Easy" },
    { id:11, text:"Ozone layer depletion is caused by:", options:["CO₂","NO₂","CFCs","SO₂"], correctOption:2, section:"Ecology", marks:4, difficulty:"Easy" },
    { id:12, text:"Which is an example of commensalism?", options:["Lichen","Orchid on tree","Mistletoe on tree","Clownfish in anemone"], correctOption:1, section:"Ecology", marks:4, difficulty:"Easy" },
    { id:13, text:"In ABO blood groups, universal recipient is:", options:["A","B","O","AB"], correctOption:3, section:"Genetics", marks:4, difficulty:"Medium" },
    { id:14, text:"Incomplete dominance is seen in:", options:["ABO blood groups","Flower colour in Antirrhinum","Height in pea","Seed colour in pea"], correctOption:1, section:"Genetics", marks:4, difficulty:"Medium" },
    { id:15, text:"If mother is carrier of haemophilia and father is normal, probability of son being haemophilic:", options:["0%","25%","50%","100%"], correctOption:2, section:"Genetics", marks:4, difficulty:"Medium" },
    { id:16, text:"Monocistronic mRNA is characteristic of:", options:["Prokaryotes","Eukaryotes","Both","Viruses only"], correctOption:1, section:"Molecular Biology", marks:4, difficulty:"Medium" },
    { id:17, text:"Retroviruses contain:", options:["DNA only","RNA and reverse transcriptase","RNA only","Both DNA and RNA"], correctOption:1, section:"Molecular Biology", marks:4, difficulty:"Medium" },
    { id:18, text:"Species that live in a wide range of habitats are called:", options:["Stenotypic","Eurytopic","Endemic","Exotic"], correctOption:1, section:"Ecology", marks:4, difficulty:"Medium" },
    { id:19, text:"Biome with highest biodiversity is:", options:["Grassland","Desert","Tropical rainforest","Temperate forest"], correctOption:2, section:"Ecology", marks:4, difficulty:"Medium" },
    { id:20, text:"IUCN Red List category for species facing very high risk of extinction in wild:", options:["Vulnerable","Endangered","Critically Endangered","Extinct in Wild"], correctOption:2, section:"Biodiversity", marks:4, difficulty:"Medium" },
    { id:21, text:"BOD (Biological Oxygen Demand) high value indicates:", options:["Clean water","High oxygen content","High organic pollution","Less microbial activity"], correctOption:2, section:"Environmental Biology", marks:4, difficulty:"Medium" },
    { id:22, text:"Test cross involves crossing an organism of unknown genotype with:", options:["Heterozygous dominant","Homozygous dominant","Homozygous recessive","F1 hybrid"], correctOption:2, section:"Mendelian Genetics", marks:4, difficulty:"Medium" },
    { id:23, text:"Which is NOT part of Human Genome Project output?", options:["Sequence of all 3 billion base pairs","Identification of all human genes","Cloning of individual genes","Storing information in databases"], correctOption:2, section:"Genomics", marks:4, difficulty:"Medium" },
    { id:24, text:"Biomagnification refers to:", options:["Increase in organism size","Increase in toxin concentration up food chain","Increase in biodiversity","Increase in soil fertility"], correctOption:1, section:"Ecology", marks:4, difficulty:"Medium" },
    { id:25, text:"Which hormone is produced by corpus luteum?", options:["FSH","LH","Progesterone","Estrogen only"], correctOption:2, section:"Human Reproduction", marks:4, difficulty:"Medium" },
    { id:26, text:"Epistasis is:", options:["Interaction between alleles of same gene","Interaction between alleles of different genes","Multiple alleles","Incomplete dominance"], correctOption:1, section:"Genetics", marks:4, difficulty:"Hard" },
    { id:27, text:"A mutation in a codon UAC→UAU. Both code for tyrosine. This is:", options:["Missense mutation","Nonsense mutation","Silent mutation","Frameshift mutation"], correctOption:2, section:"Molecular Biology", marks:4, difficulty:"Hard" },
    { id:28, text:"In DNA replication, lagging strand is synthesized:", options:["Continuously 5'→3'","Discontinuously as Okazaki fragments","Continuously 3'→5'","Simultaneously with leading strand"], correctOption:1, section:"Molecular Biology", marks:4, difficulty:"Hard" },
    { id:29, type:"AR", text:"Assertion (A): In Drosophila, white eye is X-linked recessive.\nReason (R): X-linked traits show criss-cross pattern of inheritance.", options:AR_OPTIONS, correctOption:0, section:"Genetics", marks:4, difficulty:"Hard" },
    { id:30, text:"Which contributes to genetic variation in sexually reproducing organisms?", options:["Crossing over alone","Independent assortment alone","Both crossing over and independent assortment","Neither"], correctOption:2, section:"Genetics", marks:4, difficulty:"Hard" },
    { id:31, text:"Significance of high GC content in DNA:", options:["More stable due to 3 H-bonds between G-C","Less stable","Faster replication","More mutation prone"], correctOption:0, section:"Molecular Biology", marks:4, difficulty:"Hard" },
    { id:32, text:"Gene therapy using retroviral vector: main concern is:", options:["Low efficiency","Insertional mutagenesis","Immune rejection","High cost"], correctOption:1, section:"Biotechnology", marks:4, difficulty:"Hard" },
    { id:33, text:"Linkage and crossing over are studied together because:", options:["They are on different chromosomes","Crossing over reduces linkage","They both increase variation","They are the same phenomenon"], correctOption:1, section:"Genetics", marks:4, difficulty:"Hard" },
    { id:34, text:"Molecular clock concept uses:", options:["Fossil record","Rate of DNA mutations over time","Anatomical features","Geographical distribution"], correctOption:1, section:"Evolution", marks:4, difficulty:"Hard" },
    { id:35, text:"In humans, sex determination is of type:", options:["ZW type","XY type","XX-XO type","ZZ-ZW type"], correctOption:1, section:"Genetics", marks:4, difficulty:"Hard" },
    { id:36, text:"Transformer mice produced by injecting rat growth hormone gene showed:", options:["Same size","Larger than normal","Smaller than normal","No difference"], correctOption:1, section:"Biotechnology", marks:4, difficulty:"Hard" },
    { id:37, text:"Chemosynthetic bacteria obtain energy from:", options:["Sunlight","Organic compounds","Inorganic chemical oxidation","Dead organisms"], correctOption:2, section:"Microbiology", marks:4, difficulty:"Hard" },
    { id:38, text:"Eutrophication of water bodies leads to:", options:["Increase in fish population","Algal bloom and oxygen depletion","Cleaner water","Increase in biodiversity"], correctOption:1, section:"Ecology", marks:4, difficulty:"Hard" },
    { id:39, text:"Difference between autosomes and sex chromosomes:", options:["Autosomes determine sex","Sex chromosomes carry only sex determining genes","Autosomes carry genes for non-sex traits; sex chromosomes determine sex","They are identical in function"], correctOption:2, section:"Genetics", marks:4, difficulty:"JEE Level" },
    { id:40, text:"Operon model explains gene regulation in prokaryotes. Operator is:", options:["The protein that binds RNA polymerase","The DNA sequence where repressor binds","The gene that codes for repressor","The structural gene"], correctOption:1, section:"Molecular Biology", marks:4, difficulty:"JEE Level" },
    { id:41, text:"Genetic code is degenerate means:", options:["One codon codes for multiple amino acids","Multiple codons can code for same amino acid","Some codons have no meaning","Codons vary between organisms"], correctOption:1, section:"Molecular Biology", marks:4, difficulty:"JEE Level" },
    { id:42, text:"Transgenerational epigenetic inheritance involves:", options:["Changes in DNA sequence passed to offspring","Heritable changes in gene expression without DNA change","Horizontal gene transfer","Mutation accumulation"], correctOption:1, section:"Epigenetics", marks:4, difficulty:"JEE Level" },
    { id:43, text:"Adaptive radiation means:", options:["Migration to new habitat","Evolution of multiple species from common ancestor in different habitats","Extinction of species","Genetic drift in small population"], correctOption:1, section:"Evolution", marks:4, difficulty:"JEE Level" },
    { id:44, text:"Restriction fragment length polymorphism (RFLP) is used in:", options:["Sequencing proteins","DNA fingerprinting and gene mapping","Measuring enzyme activity","Cloning vectors"], correctOption:1, section:"Biotechnology", marks:4, difficulty:"JEE Level" },
    { id:45, text:"Nucleosome is composed of:", options:["DNA only","RNA and protein","DNA wound around 8 histone proteins","DNA and non-histone proteins"], correctOption:2, section:"Molecular Biology", marks:4, difficulty:"JEE Level" },
    { id:46, text:"Which is correct about proto-oncogenes?", options:["They are cancer-causing genes","They are normal genes that regulate cell division","They are found only in cancer cells","They inhibit cell division"], correctOption:1, section:"Molecular Biology", marks:4, difficulty:"JEE Level" },
    { id:47, text:"Gause's competitive exclusion principle states:", options:["Two species can coexist indefinitely","Two species occupying identical ecological niche cannot coexist","Predators control prey population","Species diversity increases ecosystem stability"], correctOption:1, section:"Ecology", marks:4, difficulty:"JEE Level" },
    { id:48, text:"Somatic hybridization is used to produce:", options:["Clones","Allopolyploids by fusion of protoplasts","Transgenic organisms","Haploid plants"], correctOption:1, section:"Biotechnology", marks:4, difficulty:"JEE Level" },
    { id:49, text:"Difference between primary and secondary succession:", options:["Primary has soil; secondary does not","Secondary occurs in area with existing soil; primary in bare area","Primary is faster","Both are identical processes"], correctOption:1, section:"Ecology", marks:4, difficulty:"JEE Level" },
    { id:50, text:"Riboswitch is an example of:", options:["Translational regulation by mRNA itself","Post-translational modification","Transcriptional activator","DNA methylation"], correctOption:0, section:"Molecular Biology", marks:4, difficulty:"JEE Level" },
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

// ─── CUET Registration ───────────────────────────────────────────────────────
// NOTE: SEEDED_REGISTRATIONS removed — all SIUAT data comes from /api/siuat (MongoDB)
// NOTE: SEEDED_CUET_REGISTRATIONS removed — all CUET data comes from /api/cuet (MongoDB)

export type CUETRegistration = {
  id: string;  // cuetId from MongoDB
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

