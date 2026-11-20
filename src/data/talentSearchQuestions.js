// Question Bank for Talent Search Program 2026-27 (Level 1 Test)
// 50 Questions per stream (10 per subject) with 4 Paper Sets (A, B, C, D)
// Supports Dual Language: English & Hindi

export const STREAMS = [
  { id: 'PCM', label: 'PCM (Physics, Chemistry, Maths)', subjects: ['General Knowledge', 'General English', 'Mathematics', 'Chemistry', 'Physics'] },
  { id: 'PCB', label: 'PCB (Physics, Chemistry, Biology)', subjects: ['General Knowledge', 'General English', 'Biology', 'Chemistry', 'Physics'] },
  { id: 'PCM+Bio', label: 'PCM + Biology (PCMB)', subjects: ['English & GK', 'Biology', 'Mathematics', 'Chemistry', 'Physics'] },
  { id: 'Commerce', label: 'Commerce', subjects: ['General Knowledge', 'General English', 'Economics', 'Business Studies', 'Accountancy'] },
  { id: 'Arts', label: 'Arts', subjects: ['General Knowledge', 'General English', 'Geography & Sociology', 'Political Science', 'History'] },
  { id: 'Humanities', label: 'Humanities', subjects: ['General Knowledge', 'General English', 'Economics & Psychology', 'Political Science', 'History'] },
];

export const SUBJECT_POOLS = {
  Physics: [
    {
      q: "What is the SI unit of electric flux?",
      qHindi: "विद्युत फ्लक्स (Electric Flux) का SI मात्रक क्या है?",
      opts: ["Volt × metre", "Newton / Coulomb", "Tesla × metre²", "Weber / metre"],
      optsHindi: ["वोल्ट × मीटर", "न्यूटन / कूलॉम", "टेस्ला × मीटर²", "वेबर / मीटर"],
      ans: 0
    },
    {
      q: "The dimensional formula of the universal gravitational constant (G) is:",
      qHindi: "सार्वत्रिक गुरुत्वाकर्षण नियतांक (G) का विमीय सूत्र है:",
      opts: ["[M⁻¹ L³ T⁻²]", "[M¹ L² T⁻¹]", "[M⁻¹ L² T⁻²]", "[M⁰ L³ T⁻¹]"],
      optsHindi: ["[M⁻¹ L³ T⁻²]", "[M¹ L² T⁻¹]", "[M⁻¹ L² T⁻²]", "[M⁰ L³ T⁻¹]"],
      ans: 0
    },
    {
      q: "What is the total work done in moving a test charge over an equipotential surface?",
      qHindi: "समविभव पृष्ठ पर किसी परीक्षण आवेश को गति कराने में किया गया कुल कार्य क्या होता है?",
      opts: ["Positive", "Negative", "Zero", "Infinite"],
      optsHindi: ["धनात्मक", "ऋणात्मक", "शून्य", "अनंत"],
      ans: 2
    },
    {
      q: "The phenomenon primarily responsible for the twinkling of stars is:",
      qHindi: "तारों के टिमटिमाने के लिए मुख्य रूप से उत्तरदायी परिघटना कौन सी है?",
      opts: ["Total internal reflection", "Atmospheric refraction", "Optical dispersion", "Diffraction of light"],
      optsHindi: ["पूर्ण आंतरिक परावर्तन", "वायुमंडलीय अपवर्तन", "प्रकाश का वर्ण-विक्षेपण", "प्रकाश का विवर्तन"],
      ans: 1
    },
    {
      q: "Lenz's Law is a direct consequence of the law of conservation of:",
      qHindi: "लेन्ज़ का नियम किसके संरक्षण के नियम का प्रत्यक्ष परिणाम है?",
      opts: ["Mass", "Charge", "Energy", "Momentum"],
      optsHindi: ["द्रव्यमान", "आवेश", "ऊर्जा", "संवेग"],
      ans: 2
    },
    {
      q: "The de Broglie wavelength (λ) associated with a particle of momentum 'p' is:",
      qHindi: "संवेग 'p' वाले कण से संबद्ध डी ब्रोग्ली तरंगदैर्ध्य (λ) क्या होता है?",
      opts: ["h / p", "p / h", "h × p", "p / h²"],
      optsHindi: ["h / p", "p / h", "h × p", "p / h²"],
      ans: 0
    },
    {
      q: "A pure semiconductor behaves as an insulator at what temperature?",
      qHindi: "एक शुद्ध अर्धचालक किस तापमान पर विद्युतरोधी (Insulator) की भाँति व्यवहार करता है?",
      opts: ["0°C", "Room temperature", "0 Kelvin (Absolute zero)", "100°C"],
      optsHindi: ["0°C", "कमरे के तापमान पर", "0 केल्विन (परम शून्य)", "100°C"],
      ans: 2
    },
    {
      q: "Two equal and opposite charges (+q and -q) separated by a small distance 2a form an:",
      qHindi: "अल्प दूरी 2a से पृथक दो समान एवं विपरीत आवेश (+q और -q) किसका निर्माण करते हैं?",
      opts: ["Electric monopole", "Electric dipole", "Electric quadrupole", "Electromagnetic wave"],
      optsHindi: ["विद्युत एकलध्रुव", "विद्युत द्विध्रुव (Electric Dipole)", "विद्युत चतुर्ध्रुव", "विद्युत चुंबकीय तरंग"],
      ans: 1
    },
    {
      q: "What is the focal length of a flat plane mirror?",
      qHindi: "समतल दर्पण की फोकस दूरी (Focal Length) कितनी होती है?",
      opts: ["Zero", "Infinite", "1 metre", "100 cm"],
      optsHindi: ["शून्य", "अनंत", "1 मीटर", "100 सेमी"],
      ans: 1
    },
    {
      q: "The speed of electromagnetic waves in a vacuum is given by:",
      qHindi: "निर्वात में विद्युत चुंबकीय तरंगों की चाल किसके द्वारा दी जाती है?",
      opts: ["1 / √(μ₀ε₀)", "√(μ₀ε₀)", "μ₀ / ε₀", "ε₀ / μ₀"],
      optsHindi: ["1 / √(μ₀ε₀)", "√(μ₀ε₀)", "μ₀ / ε₀", "ε₀ / μ₀"],
      ans: 0
    },
  ],

  Chemistry: [
    {
      q: "What is the oxidation state of Chromium (Cr) in potassium dichromate (K₂Cr₂O₇)?",
      qHindi: "पोटेशियम डाइक्रोमेट (K₂Cr₂O₇) में क्रोमियम (Cr) की ऑक्सीकरण अवस्था क्या है?",
      opts: ["+3", "+4", "+6", "+7"],
      optsHindi: ["+3", "+4", "+6", "+7"],
      ans: 2
    },
    {
      q: "How many effective atoms are present in a Face-Centered Cubic (FCC) unit cell?",
      qHindi: "फलक केंद्रित घनीय (FCC) एकक कोष्ठिका में कुल प्रभावी परमाणुओं की संख्या कितनी होती है?",
      opts: ["1", "2", "3", "4"],
      optsHindi: ["1", "2", "3", "4"],
      ans: 3
    },
    {
      q: "What is the hybridization of the carbon atom in methane (CH₄)?",
      qHindi: "मीथेन (CH₄) में कार्बन परमाणु का संकरण (Hybridization) क्या है?",
      opts: ["sp", "sp²", "sp³", "dsp²"],
      optsHindi: ["sp", "sp²", "sp³", "dsp²"],
      ans: 2
    },
    {
      q: "Which gas is evolved when granulated zinc reacts with dilute sulfuric acid (H₂SO₄)?",
      qHindi: "जब दानेदार जिंक तनु सल्फ्यूरिक अम्ल (H₂SO₄) से अभिक्रिया करता है, तो कौन सी गैस निकलती है?",
      opts: ["Oxygen (O₂)", "Hydrogen (H₂)", "Sulfur dioxide (SO₂)", "Nitrogen (N₂)"],
      optsHindi: ["ऑक्सीजन (O₂)", "हाइड्रोजन (H₂)", "सल्फर डाइऑक्साइड (SO₂)", "नाइट्रोजन (N₂)"],
      ans: 1
    },
    {
      q: "What is the correct IUPAC name of the compound CH₃-CH₂-CHO?",
      qHindi: "यौगिक CH₃-CH₂-CHO का सही IUPAC नाम क्या है?",
      opts: ["Propanone", "Propanal", "Propanoic acid", "Propanol"],
      optsHindi: ["प्रोपेनोन", "प्रोपेनल", "प्रोपेनोइक अम्ल", "प्रोपेनॉल"],
      ans: 1
    },
    {
      q: "Which metal is used as a promoter/catalyst in Haber's process for synthesizing ammonia?",
      qHindi: "अमोनिया संश्लेषण के लिए हैबर प्रक्रम में किस धातु का उपयोग उत्प्रेरक के रूप में किया जाता है?",
      opts: ["Iron (Fe)", "Nickel (Ni)", "Platinum (Pt)", "Copper (Cu)"],
      optsHindi: ["आयरन (Fe)", "निकेल (Ni)", "प्लेटिनम (Pt)", "कॉपर (Cu)"],
      ans: 0
    },
    {
      q: "Which of the following is classified as a transition metal (d-block)?",
      qHindi: "निम्नलिखित में से किसे संक्रमण तत्व (d-ब्लॉक) के रूप में वर्गीकृत किया गया है?",
      opts: ["Sodium (Na)", "Calcium (Ca)", "Copper (Cu)", "Aluminium (Al)"],
      optsHindi: ["सोडियम (Na)", "कैल्शियम (Ca)", "कॉपर (Cu)", "एल्युमिनियम (Al)"],
      ans: 2
    },
    {
      q: "The unit of rate constant for a first-order chemical reaction is:",
      qHindi: "प्रथम कोटि की रासायनिक अभिक्रिया के लिए वेग स्थिरांक (Rate Constant) का मात्रक क्या है?",
      opts: ["mol L⁻¹ s⁻¹", "L mol⁻¹ s⁻¹", "s⁻¹", "mol⁻² L² s⁻¹"],
      optsHindi: ["mol L⁻¹ s⁻¹", "L mol⁻¹ s⁻¹", "s⁻¹", "mol⁻² L² s⁻¹"],
      ans: 2
    },
    {
      q: "Deficiency of Vitamin C (Ascorbic acid) causes which disease?",
      qHindi: "विटामिन C (एस्कॉर्बिक एसिड) की कमी से कौन सा रोग होता है?",
      opts: ["Rickets", "Beriberi", "Scurvy", "Night blindness"],
      optsHindi: ["रिकेट्स", "बेरीबेरी", "स्कर्वी", "रतौंधी"],
      ans: 2
    },
    {
      q: "Which of the following is a colligative property of a solution?",
      qHindi: "निम्नलिखित में से कौन सा विलयन का अणुसंख्य गुणधर्म (Colligative Property) है?",
      opts: ["Refractive index", "Viscosity", "Osmotic pressure", "Surface tension"],
      optsHindi: ["अपवर्तनांक", "श्यानता", "परासरण दाब (Osmotic Pressure)", "पृष्ठ तनाव"],
      ans: 2
    },
  ],

  Mathematics: [
    {
      q: "What is the derivative of sin(2x) with respect to x?",
      qHindi: "x के सापेक्ष sin(2x) का अवकलज (Derivative) क्या है?",
      opts: ["cos(2x)", "2 cos(2x)", "-2 cos(2x)", "2 sin(x)"],
      optsHindi: ["cos(2x)", "2 cos(2x)", "-2 cos(2x)", "2 sin(x)"],
      ans: 1
    },
    {
      q: "The value of the 2x2 determinant |[2, 3], [1, 4]| is:",
      qHindi: "2x2 सारणिक |[2, 3], [1, 4]| का मान क्या है?",
      opts: ["5", "8", "11", "-5"],
      optsHindi: ["5", "8", "11", "-5"],
      ans: 0
    },
    {
      q: "Evaluate the indefinite integral: ∫ (1 / x) dx (for x > 0):",
      qHindi: "अनिश्चित समाकलन का मान ज्ञात करें: ∫ (1 / x) dx (x > 0 के लिए):",
      opts: ["ln(x) + C", "x² / 2 + C", "-1 / x² + C", "eˣ + C"],
      optsHindi: ["ln(x) + C", "x² / 2 + C", "-1 / x² + C", "eˣ + C"],
      ans: 0
    },
    {
      q: "A square matrix A is called an idempotent matrix if:",
      qHindi: "एक वर्ग आव्यूह A वर्गसम (Idempotent Matrix) कहलाता है यदि:",
      opts: ["A² = 0", "A² = I", "A² = A", "Aᵀ = -A"],
      optsHindi: ["A² = 0", "A² = I", "A² = A", "Aᵀ = -A"],
      ans: 2
    },
    {
      q: "What is the principal value of sin⁻¹(1/2)?",
      qHindi: "sin⁻¹(1/2) का मुख्य मान क्या है?",
      opts: ["π/6", "π/3", "π/4", "π/2"],
      optsHindi: ["π/6", "π/3", "π/4", "π/2"],
      ans: 0
    },
    {
      q: "Two non-zero vectors a and b are perpendicular to each other if and only if:",
      qHindi: "दो शून्येतर सदिश a और b एक दूसरे के लंबवत होते हैं यदि और केवल यदि:",
      opts: ["a · b = 0", "a × b = 0", "a + b = 0", "|a| = |b|"],
      optsHindi: ["a · b = 0", "a × b = 0", "a + b = 0", "|a| = |b|"],
      ans: 0
    },
    {
      q: "What is the Euclidean distance between points (1, 2) and (4, 6)?",
      qHindi: "बिंदुओं (1, 2) और (4, 6) के बीच की दूरी क्या है?",
      opts: ["4", "5", "6", "7"],
      optsHindi: ["4", "5", "6", "7"],
      ans: 1
    },
    {
      q: "The sum of the first n natural numbers is represented by:",
      qHindi: "प्रथम n प्राकृतिक संख्याओं के योग का सूत्र है:",
      opts: ["n(n+1)/2", "n²", "n(n-1)/2", "n(2n+1)/2"],
      optsHindi: ["n(n+1)/2", "n²", "n(n-1)/2", "n(2n+1)/2"],
      ans: 0
    },
    {
      q: "What is the value of limit: lim (x → 0) [sin(x) / x]?",
      qHindi: "सीमा (Limit) का मान क्या है: lim (x → 0) [sin(x) / x]?",
      opts: ["0", "1", "Undefined", "Infinity"],
      optsHindi: ["0", "1", "अपरिभाषित", "अनंत"],
      ans: 1
    },
    {
      q: "If a fair six-sided die is rolled, what is the probability of rolling a prime number (2, 3, 5)?",
      qHindi: "यदि एक निष्पक्ष पासा फेंका जाता है, तो एक अभाज्य संख्या (2, 3, 5) आने की प्रायिकता क्या है?",
      opts: ["1/6", "1/3", "1/2", "2/3"],
      optsHindi: ["1/6", "1/3", "1/2", "2/3"],
      ans: 2
    },
  ],

  Biology: [
    {
      q: "Which cellular organelle is universally referred to as the 'powerhouse of the cell'?",
      qHindi: "किस कोशिकांग को सार्वभौमिक रूप से 'कोशिका का पावरहाउस' कहा जाता है?",
      opts: ["Ribosome", "Golgi apparatus", "Mitochondria", "Lysosome"],
      optsHindi: ["राइबोसोम", "गॉल्जी काय", "माइटोकॉन्ड्रिया", "लाइसोसोम"],
      ans: 2
    },
    {
      q: "The basic structural and functional filtration unit of the human kidney is the:",
      qHindi: "मानव वृक्क (Kidney) की मूलभूत संरचनात्मक एवं क्रियात्मक निस्यंदन इकाई क्या है?",
      opts: ["Nephron", "Neuron", "Alveolus", "Hepatic lobule"],
      optsHindi: ["नेफ्रॉन", "न्यूरॉन", "कूपिका (Alveolus)", "यकृत पालिका"],
      ans: 0
    },
    {
      q: "Where does the light-dependent reaction of photosynthesis occur in chloroplasts?",
      qHindi: "क्लोरोप्लास्ट में प्रकाश-संश्लेषण की प्रकाश-निर्भर अभिक्रिया कहाँ होती है?",
      opts: ["Stroma", "Thylakoid membranes (Grana)", "Outer membrane", "Cytoplasm"],
      optsHindi: ["स्ट्रोमा", "थायलाकोइड झिल्ली (Grana)", "बाहरी झिल्ली", "कोशिका द्रव्य"],
      ans: 1
    },
    {
      q: "Which endocrine hormone regulates glucose uptake and reduces blood sugar levels?",
      qHindi: "कौन सा अंतःस्रावी हार्मोन ग्लूकोज अवशोषण को नियंत्रित करता है और रक्त शर्करा के स्तर को कम करता है?",
      opts: ["Glucagon", "Insulin", "Thyroxine", "Adrenaline"],
      optsHindi: ["ग्लूकागन", "इंसुलिन", "थायरोक्सिन", "एड्रेनालाईन"],
      ans: 1
    },
    {
      q: "Mendel's law stating that paired allele factors separate cleanly during gamete formation is:",
      qHindi: "मेंडल का वह नियम जो बताता है कि युग्मक निर्माण के दौरान युग्मविकल्पी कारक अलग हो जाते हैं:",
      opts: ["Law of Segregation", "Law of Independent Assortment", "Law of Dominance", "Law of Linkage"],
      optsHindi: ["प्रथक्करण का नियम (Law of Segregation)", "स्वतंत्र अपव्यूहन का नियम", "प्रभाविता का नियम", "सहलग्नता का नियम"],
      ans: 0
    },
    {
      q: "In a double-stranded DNA helix, Adenine forms hydrogen bonds with Thymine through:",
      qHindi: "द्वि-रज्जुक डीएनए हेलिक्स में, एडेनिन थायमीन के साथ कितने हाइड्रोजन बंध बनाता है?",
      opts: ["1 Hydrogen bond", "2 Hydrogen bonds", "3 Hydrogen bonds", "Covalent bond"],
      optsHindi: ["1 हाइड्रोजन बंध", "2 हाइड्रोजन बंध", "3 हाइड्रोजन बंध", "सहसंयोजक बंध"],
      ans: 1
    },
    {
      q: "Which ABO blood group lacks A and B antigens on RBCs and is a universal donor?",
      qHindi: "किस रक्त समूह की आरबीसी पर A और B एंटीजन नहीं होते और यह सर्वदाता (Universal Donor) होता है?",
      opts: ["AB positive", "A positive", "B positive", "O negative / O"],
      optsHindi: ["AB पॉजिटिव", "A पॉजिटिव", "B पॉजिटिव", "O नेगेटिव / O"],
      ans: 3
    },
    {
      q: "The conversion of atmospheric nitrogen gas (N₂) into bioavailable ammonia (NH₃) is called:",
      qHindi: "वायुमंडलीय नाइट्रोजन गैस (N₂) का अमोनिया (NH₃) में रूपांतरण क्या कहलाता है?",
      opts: ["Nitrification", "Denitrification", "Biological Nitrogen Fixation", "Ammonification"],
      optsHindi: ["नाइट्रीकरण", "विनाइट्रीकरण", "जैविक नाइट्रोजन स्थिरीकरण", "अमोनीकरण"],
      ans: 2
    },
    {
      q: "Who is globally recognized as the 'Father of Classical Genetics'?",
      qHindi: "शास्त्रीय आनुवंशिकी के जनक (Father of Classical Genetics) के रूप में किसे जाना जाता है?",
      opts: ["Charles Darwin", "Gregor Johann Mendel", "Louis Pasteur", "Thomas Hunt Morgan"],
      optsHindi: ["चार्ल्स डार्विन", "ग्रेगर जोहान मेंडल", "लुई पाश्चर", "थॉमस हंट मॉर्गन"],
      ans: 1
    },
    {
      q: "Which molecular biotechnology technique is used to amplify DNA sequences into millions of copies?",
      qHindi: "डीएनए अनुक्रमों को लाखों प्रतियों में प्रवर्धित करने के लिए किस तकनीक का उपयोग किया जाता है?",
      opts: ["Western Blotting", "Polymerase Chain Reaction (PCR)", "Gel Electrophoresis", "Chromatography"],
      optsHindi: ["वेस्टर्न ब्लॉटिंग", "पॉलीमरेज़ चेन रिएक्शन (PCR)", "जेल वैद्युतकणसंचलन", "क्रोमैटोग्राफी"],
      ans: 1
    },
  ],

  Accountancy: [
    {
      q: "According to golden rules of accounting, the rule for Real Accounts is:",
      qHindi: "लेखांकन के नियमों के अनुसार, वास्तविक खातों (Real Accounts) का नियम क्या है?",
      opts: ["Debit all expenses, Credit all incomes", "Debit the receiver, Credit the giver", "Debit what comes in, Credit what goes out", "Debit all assets, Credit all capital"],
      optsHindi: ["सभी व्ययों को नाम, सभी आय को जमा करें", "पाने वाले को नाम, देने वाले को जमा करें", "जो वस्तु व्यापार में आए उसे नाम, जो जाए उसे जमा करें", "सभी संपत्तियों को नाम, पूंजी को जमा करें"],
      ans: 2
    },
    {
      q: "A Trial Balance is prepared primarily to verify:",
      qHindi: "तलपट (Trial Balance) मुख्य रूप से किसकी जांच के लिए तैयार किया जाता है?",
      opts: ["Financial position", "Arithmetical accuracy of ledger postings", "Net profit or loss", "Cash flow position"],
      optsHindi: ["वित्तीय स्थिति", "खाता बही की अंकगणितीय शुद्धता", "शुद्ध लाभ या हानि", "रोकड़ प्रवाह की स्थिति"],
      ans: 1
    },
    {
      q: "Goodwill in accounting is classified under which category of assets?",
      qHindi: "लेखांकन में ख्याति (Goodwill) को किस श्रेणी की संपत्ति में वर्गीकृत किया जाता है?",
      opts: ["Current Asset", "Intangible Fixed Asset", "Fictitious Asset", "Liquid Asset"],
      optsHindi: ["चालू संपत्ति", "अमूर्त अचल संपत्ति (Intangible Fixed Asset)", "कृत्रिम संपत्ति", "तरल संपत्ति"],
      ans: 1
    },
    {
      q: "In the absence of a registered Partnership Deed, profits and losses are shared:",
      qHindi: "साझेदारी संलेख के अभाव में लाभ और हानि का बंटवारा कैसे किया जाता है?",
      opts: ["In capital ratio", "Equally among all partners", "As decided by senior partner", "60:40 ratio"],
      optsHindi: ["पूंजी के अनुपात में", "सभी साझेदारों में बराबर-बराबर", "वरिष्ठ साझेदार के निर्णय अनुसार", "60:40 अनुपात में"],
      ans: 1
    },
    {
      q: "What is the maximum number of partners allowed in a partnership firm under Companies Act 2013?",
      qHindi: "कंपनी अधिनियम 2013 के तहत साझेदारी फर्म में अधिकतम कितने साझेदार हो सकते हैं?",
      opts: ["20", "50", "100", "Unlimited"],
      optsHindi: ["20", "50", "100", "असीमित"],
      ans: 1
    },
    {
      q: "In Not-for-Profit Organizations (NPO), excess of total assets over total liabilities is termed:",
      qHindi: "गैर-लाभकारी संगठनों (NPO) में कुल संपत्तियों का कुल देनदारियों पर आधिक्य क्या कहलाता है?",
      opts: ["Surplus", "Capital Fund", "Deficit", "Working Capital"],
      optsHindi: ["अधिशेष (Surplus)", "पूंजी कोष (Capital Fund)", "घाटा (Deficit)", "कार्यशील पूंजी"],
      ans: 1
    },
    {
      q: "When shares are forfeited by a company, the Share Capital Account is debited with:",
      qHindi: "जब कंपनी द्वारा अंशों का हरण (Forfeiture) किया जाता है, तो अंश पूंजी खाता किससे नाम (Debit) किया जाता है?",
      opts: ["Face value", "Called-up amount", "Paid-up amount", "Market value"],
      optsHindi: ["अंकित मूल्य", "मांगी गई राशि (Called-up amount)", "चुक्ता राशि", "बाजार मूल्य"],
      ans: 1
    },
    {
      q: "Depreciation is defined in accounting as the gradual:",
      qHindi: "लेखांकन में ह्रास (Depreciation) को किस रूप में परिभाषित किया जाता है?",
      opts: ["Decrease in market price", "Allocation of depreciable cost over asset's life", "Physical destruction of asset", "Cash expenditure for repair"],
      optsHindi: ["बाजार मूल्य में कमी", "परिसंपत्ति के उपयोगी जीवन पर लागत का आवंटन", "परिसंपत्ति का भौतिक विनाश", "मरम्मत के लिए नकद व्यय"],
      ans: 1
    },
    {
      q: "In India, Cash Flow Statements are prepared in accordance with Accounting Standard:",
      qHindi: "भारत में रोकड़ प्रवाह विवरण किस लेखांकन मानक (Accounting Standard) के अनुसार तैयार किया जाता है?",
      opts: ["AS-1", "AS-3 (Revised)", "AS-10", "AS-14"],
      optsHindi: ["AS-1", "AS-3 (संशोधित)", "AS-10", "AS-14"],
      ans: 1
    },
    {
      q: "Debentures issued by a joint stock company represent:",
      qHindi: "एक संयुक्त पूंजी कंपनी द्वारा जारी ऋणपत्र (Debentures) क्या दर्शाते हैं?",
      opts: ["Ownership capital", "Borrowed / Debt capital", "Retained earnings", "Reserve funds"],
      optsHindi: ["स्वामित्व पूंजी", "ऋण / उधार पूंजी (Debt Capital)", "संचित आय", "आरक्षित निधि"],
      ans: 1
    },
  ],

  BusinessStudies: [
    {
      q: "Who is celebrated as the 'Father of Scientific Management'?",
      qHindi: "'वैज्ञानिक प्रबंध के जनक' के रूप में किसे जाना जाता है?",
      opts: ["Henri Fayol", "F.W. Taylor", "Peter Drucker", "Elton Mayo"],
      optsHindi: ["हेनरी फेयोल", "एफ.डब्ल्यू. टेलर", "पीटर ड्रकर", "एल्टन मेयो"],
      ans: 1
    },
    {
      q: "How many fundamental general principles of management were formulated by Henri Fayol?",
      qHindi: "हेनरी फेयोल द्वारा प्रबंध के कितने मौलिक सिद्धांतों का प्रतिपादन किया गया था?",
      opts: ["10", "12", "14", "16"],
      optsHindi: ["10", "12", "14", "16"],
      ans: 2
    },
    {
      q: "Which is the primary and initial function of the management process?",
      qHindi: "प्रबंध प्रक्रिया का प्राथमिक और प्रारंभिक कार्य कौन सा है?",
      opts: ["Directing", "Staffing", "Planning", "Controlling"],
      optsHindi: ["निर्देशन", "नियुक्तिकरण", "नियोजन (Planning)", "नियंत्रण"],
      ans: 2
    },
    {
      q: "The process of dividing work and grouping related activities into units is known as:",
      qHindi: "कार्य का विभाजन करने और संबंधित गतिविधियों को इकाइयों में समूहीकृत करने की प्रक्रिया कहलाती है:",
      opts: ["Planning", "Organizing", "Delegation", "Coordination"],
      optsHindi: ["नियोजन", "संगठन (Organizing)", "प्रत्यायोजन", "समन्वय"],
      ans: 1
    },
    {
      q: "Delegation of authority essentially involves the transfer of:",
      qHindi: "अधिकार के प्रत्यायोजन (Delegation of Authority) में मुख्य रूप से किसका अंतरण शामिल होता है?",
      opts: ["Only authority", "Only responsibility", "Authority and corresponding responsibility", "Ultimate accountability"],
      optsHindi: ["केवल अधिकार", "केवल उत्तरदायित्व", "अधिकार और संबंधित उत्तरदायित्व", "अंतिम जवाबदेही"],
      ans: 2
    },
    {
      q: "Which of the following is considered a non-financial incentive for employees?",
      qHindi: "निम्नलिखित में से किसे कर्मचारियों के लिए गैर-वित्तीय प्रोत्साहन (Non-Financial Incentive) माना जाता है?",
      opts: ["Bonus", "Job recognition & status", "Commission", "Profit sharing"],
      optsHindi: ["बोनस", "पद और कार्य की पहचान (Job Recognition)", "कमीशन", "लाभ में हिस्सेदारी"],
      ans: 1
    },
    {
      q: "Under Consumer Protection Act in India, which apex commission handles national-level claims?",
      qHindi: "भारत में उपभोक्ता संरक्षण अधिनियम के तहत कौन सा शीर्ष आयोग राष्ट्रीय स्तर के मामलों का निपटारा करता है?",
      opts: ["District Consumer Commission", "State Consumer Commission", "National Consumer Disputes Redressal Commission (NCDRC)", "Supreme Court"],
      optsHindi: ["जिला उपभोक्ता आयोग", "राज्य उपभोक्ता आयोग", "राष्ट्रीय उपभोक्ता विवाद निवारण आयोग (NCDRC)", "सर्वोच्च न्यायालय"],
      ans: 2
    },
    {
      q: "The 4 Ps of the traditional Marketing Mix are:",
      qHindi: "पारंपरिक विपणन मिश्रण (Marketing Mix) के 4 Ps क्या हैं?",
      opts: ["Product, Price, Place, Promotion", "Plan, Price, People, Process", "Product, Person, Place, Package", "Purchase, Profit, Price, Place"],
      optsHindi: ["Product, Price, Place, Promotion", "Plan, Price, People, Process", "Product, Person, Place, Package", "Purchase, Profit, Price, Place"],
      ans: 0
    },
    {
      q: "The statutory regulatory body governing securities and stock exchanges in India is:",
      qHindi: "भारत में प्रतिभूतियों और शेयर बाजारों को विनियमित करने वाली वैधानिक संस्था कौन सी है?",
      opts: ["RBI", "SEBI", "IRDAI", "TRAI"],
      optsHindi: ["RBI", "SEBI", "IRDAI", "TRAI"],
      ans: 1
    },
    {
      q: "The crucial link bridging agricultural and manufactured goods from producers to consumers is:",
      qHindi: "उत्पादकों से उपभोक्ताओं तक माल पहुंचाने वाली महत्वपूर्ण कड़ी क्या कहलाती है?",
      opts: ["Creditors", "Distribution Channels / Middlemen", "Competitors", "Shareholders"],
      optsHindi: ["लेनदार", "वितरण माध्यम / बिचौलिए (Distribution Channels)", "प्रतियोगी", "अंशधारक"],
      ans: 1
    },
  ],

  Economics: [
    {
      q: "Who is widely regarded as the 'Father of Modern Economics'?",
      qHindi: "'आधुनिक अर्थशास्त्र के जनक' के रूप में किसे जाना जाता है?",
      opts: ["John Maynard Keynes", "Adam Smith", "Alfred Marshall", "Karl Marx"],
      optsHindi: ["जॉन मेनार्ड कीन्स", "एडम स्मिथ", "अल्फ्रेड मार्शल", "कार्ल मार्क्स"],
      ans: 1
    },
    {
      q: "When Marginal Utility (MU) reaches zero, Total Utility (TU) is at its:",
      qHindi: "जब सीमांत उपयोगिता (MU) शून्य हो जाती है, तो कुल उपयोगिता (TU) होती है:",
      opts: ["Minimum", "Zero", "Maximum", "Negative"],
      optsHindi: ["न्यूनतम", "शून्य", "अधिकतम", "ऋणात्मक"],
      ans: 2
    },
    {
      q: "The Law of Demand states that, other things remaining equal, there is:",
      qHindi: "मांग का नियम बताता है कि अन्य बातें समान रहने पर क्या होता है?",
      opts: ["Direct relation between price and demand", "Inverse relation between price and quantity demanded", "No relation between price and demand", "Positive relation with income"],
      optsHindi: ["कीमत और मांग में सीधा संबंध", "कीमत और मांग की मात्रा में विपरीत संबंध", "कीमत और मांग में कोई संबंध नहीं", "आय के साथ धनात्मक संबंध"],
      ans: 1
    },
    {
      q: "Which institution functions as the Central Monetary Bank of India?",
      qHindi: "भारत के केंद्रीय बैंक (Central Monetary Bank) के रूप में कौन सी संस्था कार्य करती है?",
      opts: ["State Bank of India (SBI)", "Reserve Bank of India (RBI)", "NABARD", "Ministry of Finance"],
      optsHindi: ["भारतीय स्टेट बैंक (SBI)", "भारतीय रिजर्व बैंक (RBI)", "नाबार्ड (NABARD)", "वित्त मंत्रालय"],
      ans: 1
    },
    {
      q: "What does the abbreviation GDP stand for in macroeconomics?",
      qHindi: "समष्टि अर्थशास्त्र (Macroeconomics) में GDP का पूर्ण रूप क्या है?",
      opts: ["Gross Domestic Product", "General Domestic Profit", "Global Development Plan", "Gross Deposit Portfolio"],
      optsHindi: ["सकल घरेलू उत्पाद (Gross Domestic Product)", "सामान्य घरेलू लाभ", "वैश्विक विकास योजना", "सकल जमा पोर्टफोलियो"],
      ans: 0
    },
    {
      q: "Inflation in an economy is defined as:",
      qHindi: "किसी अर्थव्यवस्था में मुद्रास्फीति (Inflation) को किस रूप में परिभाषित किया जाता है?",
      opts: ["Rise in stock prices", "Persistent general increase in price level", "Decrease in money supply", "Deficit in trade"],
      optsHindi: ["शेयर की कीमतों में वृद्धि", "सामान्य मूल्य स्तर में निरंतर वृद्धि", "मुद्रा आपूर्ति में कमी", "व्यापार घाटा"],
      ans: 1
    },
    {
      q: "A curve showing combinations of two consumer goods offering identical level of satisfaction is:",
      qHindi: "दो उपभोक्ता वस्तुओं के ऐसे संयोजनों को दर्शाने वाला वक्र जो समान संतुष्टि प्रदान करता है:",
      opts: ["Demand curve", "Indifference curve", "Production Possibility Curve", "Supply curve"],
      optsHindi: ["मांग वक्र", "उदासीनता वक्र (Indifference Curve)", "उत्पादन संभावना वक्र", "पूर्ति वक्र"],
      ans: 1
    },
    {
      q: "Which premier policy think tank replaced the Planning Commission in India in 2015?",
      qHindi: "2015 में भारत में योजना आयोग के स्थान पर किस प्रमुख नीति थिंक टैंक की स्थापना की गई?",
      opts: ["Finance Commission", "NITI Aayog", "National Statistical Office", "Central Vigilance Commission"],
      optsHindi: ["वित्त आयोग", "नीति आयोग (NITI Aayog)", "राष्ट्रीय सांख्यिकी कार्यालय", "केंद्रीय सतर्कता आयोग"],
      ans: 1
    },
    {
      q: "Fiscal Policy in India is formulated and implemented by:",
      qHindi: "भारत में राजकोषीय नीति (Fiscal Policy) किसके द्वारा बनाई और लागू की जाती है?",
      opts: ["Reserve Bank of India", "Government of India / Ministry of Finance", "SEBI", "Supreme Court"],
      optsHindi: ["भारतीय रिजर्व बैंक", "भारत सरकार / वित्त मंत्रालय", "सेबी", "सर्वोच्च न्यायालय"],
      ans: 1
    },
    {
      q: "A market structure characterized by a single seller selling a unique product with no close substitutes is:",
      qHindi: "वह बाजार संरचना जिसमें केवल एक विक्रेता होता है और उसका कोई निकट स्थानापन्न नहीं होता:",
      opts: ["Perfect Competition", "Monopoly", "Monopolistic Competition", "Oligopoly"],
      optsHindi: ["पूर्ण प्रतियोगिता", "एकाधिकार (Monopoly)", "एकाधिकृत प्रतियोगिता", "अल्पाधिकार"],
      ans: 1
    },
  ],

  History: [
    {
      q: "The famous 'Great Bath' of the ancient Indus Valley Civilization was excavated at:",
      qHindi: "प्राचीन सिंधु घाटी सभ्यता का प्रसिद्ध 'विशाल स्नानागार' कहाँ उत्खनित किया गया था?",
      opts: ["Harappa", "Mohenjo-daro", "Lothal", "Kalibangan"],
      optsHindi: ["हड़प्पा", "मोहनजोदड़ो", "लोथल", "कालीबंगा"],
      ans: 1
    },
    {
      q: "Who was the founder of the Mauryan Empire in ancient India?",
      qHindi: "प्राचीन भारत में मौर्य साम्राज्य के संस्थापक कौन थे?",
      opts: ["Ashoka", "Chandragupta Maurya", "Bindusara", "Samudragupta"],
      optsHindi: ["अशोक", "चंद्रगुप्त मौर्य", "बिंदुसार", "समुद्रगुप्त"],
      ans: 1
    },
    {
      q: "The royal inscriptions and rock edicts of Emperor Ashoka were predominantly written in:",
      qHindi: "सम्राट अशोक के राजकीय अभिलेख और शिलालेख मुख्य रूप से किस लिपि में लिखे गए थे?",
      opts: ["Devanagari script", "Brahmi script", "Kharosthi script", "Greek script"],
      optsHindi: ["देवनागरी लिपि", "ब्राह्मी लिपि", "खरोष्ठी लिपि", "ग्रीक लिपि"],
      ans: 1
    },
    {
      q: "The monumental 11th-century travelogue 'Kitab-ul-Hind' was authored by:",
      qHindi: "11वीं शताब्दी का ऐतिहासिक यात्रा वृत्तांत 'किताब-उल-हिंद' किसके द्वारा लिखा गया था?",
      opts: ["Ibn Battuta", "Al-Biruni", "Francois Bernier", "Abul Fazl"],
      optsHindi: ["इब्न बतूता", "अल-बरूनी", "फ्रांस्वा बर्नियर", "अबुल फजल"],
      ans: 1
    },
    {
      q: "The capital city of the historic Vijayanagara Empire was located at:",
      qHindi: "ऐतिहासिक विजयनगर साम्राज्य की राजधानी कहाँ स्थित थी?",
      opts: ["Madurai", "Hampi", "Tanjore", "Golconda"],
      optsHindi: ["मदुरै", "हम्पी", "तंजावुर", "गोलकुंडा"],
      ans: 1
    },
    {
      q: "The historic Battle of Plassey, laying foundations of British rule in Bengal, took place in:",
      qHindi: "बंगाल में ब्रिटिश शासन की नींव रखने वाला प्लासी का ऐतिहासिक युद्ध किस वर्ष हुआ था?",
      opts: ["1757", "1764", "1857", "1773"],
      optsHindi: ["1757", "1764", "1857", "1773"],
      ans: 0
    },
    {
      q: "Who was declared the symbolic leader and Emperor of India during the 1857 Revolt in Delhi?",
      qHindi: "दिल्ली में 1857 के विद्रोह के दौरान भारत का प्रतीकात्मक सम्राट किसे घोषित किया गया था?",
      opts: ["Nana Saheb", "Bahadur Shah Zafar II", "Mangal Pandey", "Tantia Tope"],
      optsHindi: ["नाना साहेब", "बहादुर शाह जफर द्वितीय", "मंगल पांडे", "तात्या टोपे"],
      ans: 1
    },
    {
      q: "Mahatma Gandhi launched the historic Salt March (Dandi Satyagraha) in the year:",
      qHindi: "महात्मा गांधी ने ऐतिहासिक दांडी मार्च (नमक सत्याग्रह) किस वर्ष शुरू किया था?",
      opts: ["1920", "1930", "1942", "1919"],
      optsHindi: ["1920", "1930", "1942", "1919"],
      ans: 1
    },
    {
      q: "Who served as the Chairman of the Drafting Committee of the Indian Constituent Assembly?",
      qHindi: "भारतीय संविधान सभा की प्रारूप समिति के अध्यक्ष कौन थे?",
      opts: ["Dr. Rajendra Prasad", "Dr. B.R. Ambedkar", "Jawaharlal Nehru", "Sardar Vallabhbhai Patel"],
      optsHindi: ["डॉ. राजेंद्र प्रसाद", "डॉ. बी.आर. अंबेडकर", "जवाहरलाल नेहरू", "सरदार वल्लभभाई पटेल"],
      ans: 1
    },
    {
      q: "The historic slogan 'Do or Die' (Karo ya Maro) was given during which nationalist movement?",
      qHindi: "'करो या मरो' का ऐतिहासिक नारा किस राष्ट्रवादी आंदोलन के दौरान दिया गया था?",
      opts: ["Non-Cooperation Movement", "Civil Disobedience Movement", "Quit India Movement (1942)", "Swadeshi Movement"],
      optsHindi: ["असहयोग आंदोलन", "सविनय अवज्ञा आंदोलन", "भारत छोड़ो आंदोलन (1942)", "स्वदेशी आंदोलन"],
      ans: 2
    },
  ],

  PoliticalScience: [
    {
      q: "Who is venerated as the 'Father of the Constitution of India'?",
      qHindi: "'भारतीय संविधान के जनक' के रूप में किसे सम्मानित किया जाता है?",
      opts: ["Mahatma Gandhi", "Dr. B.R. Ambedkar", "Dr. Rajendra Prasad", "B.N. Rau"],
      optsHindi: ["महात्मा गांधी", "डॉ. बी.आर. अंबेडकर", "डॉ. राजेंद्र प्रसाद", "बी.एन. राव"],
      ans: 1
    },
    {
      q: "Which Article of the Indian Constitution guarantees the 'Right to Constitutional Remedies'?",
      qHindi: "भारतीय संविधान का कौन सा अनुच्छेद 'संवैधानिक उपचारों का अधिकार' प्रदान करता है?",
      opts: ["Article 14", "Article 19", "Article 21", "Article 32"],
      optsHindi: ["अनुच्छेद 14", "अनुच्छेद 19", "अनुच्छेद 21", "अनुच्छेद 32"],
      ans: 3
    },
    {
      q: "What is the minimum age qualification prescribed to contest the election for the President of India?",
      qHindi: "भारत के राष्ट्रपति पद का चुनाव लड़ने के लिए न्यूनतम आयु क्या निर्धारित है?",
      opts: ["25 years", "30 years", "35 years", "40 years"],
      optsHindi: ["25 वर्ष", "30 वर्ष", "35 वर्ष", "40 वर्ष"],
      ans: 2
    },
    {
      q: "The Rajya Sabha is a permanent legislative house where one-third of its members retire every:",
      qHindi: "राज्यसभा एक स्थायी सदन है जहाँ इसके एक-तिहाई सदस्य प्रत्येक कितने वर्ष में सेवानिवृत्त होते हैं?",
      opts: ["1 year", "2 years", "3 years", "5 years"],
      optsHindi: ["1 वर्ष", "2 वर्ष", "3 वर्ष", "5 वर्ष"],
      ans: 1
    },
    {
      q: "How many Fundamental Rights are currently enshrined in Part III of the Constitution of India?",
      qHindi: "वर्तमान में भारतीय संविधान के भाग III में कितने मौलिक अधिकार निहित हैं?",
      opts: ["5", "6", "7", "8"],
      optsHindi: ["5", "6", "7", "8"],
      ans: 1
    },
    {
      q: "The doctrine of 'Judicial Review' in the Indian Constitution was adopted from which country?",
      qHindi: "भारतीय संविधान में 'न्यायिक पुनरावलोकन' की अवधारणा किस देश से ली गई है?",
      opts: ["United Kingdom", "United States of America", "Canada", "Australia"],
      optsHindi: ["यूनाइटेड किंगडम", "संयुक्त राज्य अमेरिका (USA)", "कनाडा", "ऑस्ट्रेलिया"],
      ans: 1
    },
    {
      q: "The first nationwide General Elections in independent India took place during:",
      qHindi: "स्वतंत्र भारत में प्रथम राष्ट्रव्यापी आम चुनाव किस दौरान हुए थे?",
      opts: ["1947–1948", "1951–1952", "1955–1956", "1960–1961"],
      optsHindi: ["1947–1948", "1951–1952", "1955–1956", "1960–1961"],
      ans: 1
    },
    {
      q: "The historic 73rd Constitutional Amendment Act of 1992 granted constitutional status to:",
      qHindi: "1992 के ऐतिहासिक 73वें संविधान संशोधन अधिनियम ने किसे संवैधानिक दर्जा प्रदान किया?",
      opts: ["Urban Municipalities", "Panchayati Raj Institutions", "Finance Commission", "NITI Aayog"],
      optsHindi: ["शहरी नगर पालिकाओं", "पंचायती राज संस्थाओं", "वित्त आयोग", "नीति आयोग"],
      ans: 1
    },
    {
      q: "The international headquarters of the United Nations (UN) is situated in:",
      qHindi: "संयुक्त राष्ट्र (UN) का अंतरराष्ट्रीय मुख्यालय कहाँ स्थित है?",
      opts: ["Geneva", "New York City", "Paris", "Washington D.C."],
      optsHindi: ["जिनेवा", "न्यूयॉर्क शहर", "पेरिस", "वाशिंगटन डी.सी."],
      ans: 1
    },
    {
      q: "The Election Commission of India functions under which Article of the Constitution?",
      qHindi: "भारत का चुनाव आयोग संविधान के किस अनुच्छेद के तहत कार्य करता है?",
      opts: ["Article 280", "Article 312", "Article 324", "Article 356"],
      optsHindi: ["अनुच्छेद 280", "अनुच्छेद 312", "अनुच्छेद 324", "अनुच्छेद 356"],
      ans: 2
    },
  ],

  GeographySociology: [
    {
      q: "Which is the largest state in India by total land surface area?",
      qHindi: "कुल क्षेत्रफल की दृष्टि से भारत का सबसे बड़ा राज्य कौन सा है?",
      opts: ["Madhya Pradesh", "Maharashtra", "Rajasthan", "Uttar Pradesh"],
      optsHindi: ["मध्य प्रदेश", "महाराष्ट्र", "राजस्थान", "उत्तर प्रदेश"],
      ans: 2
    },
    {
      q: "The Standard Meridian of India (82°30' E) passes through which town in Uttar Pradesh?",
      qHindi: "भारत की मानक याम्योत्तर रेखा (82°30' E) उत्तर प्रदेश के किस शहर से होकर गुजरती है?",
      opts: ["Varanasi", "Mirzapur", "Kanpur", "Gorakhpur"],
      optsHindi: ["वाराणसी", "मिर्जापुर", "कानपुर", "गोरखपुर"],
      ans: 1
    },
    {
      q: "What is the highest mountain peak in South India / Western Ghats?",
      qHindi: "दक्षिण भारत / पश्चिमी घाट की सबसे ऊंची पर्वत चोटी कौन सी है?",
      opts: ["Doda Betta", "Anamudi", "Kalsubai", "Mahendragiri"],
      optsHindi: ["दोद्दाबेट्टा", "अनामुडी", "कलसूबाई", "महेंद्रगिरि"],
      ans: 1
    },
    {
      q: "Which major peninsular river in India is traditionally referred to as 'Dakshin Ganga'?",
      qHindi: "भारत की किस प्रमुख प्रायद्वीपीय नदी को पारंपरिक रूप से 'दक्षिण गंगा' कहा जाता है?",
      opts: ["Krishna", "Godavari", "Cauvery", "Mahanadi"],
      optsHindi: ["कृष्णा", "गोदावरी", "कावेरी", "महानदी"],
      ans: 1
    },
    {
      q: "Which specialized soil type is also known as 'Regur Soil' and is best for cotton cultivation?",
      qHindi: "किस मिट्टी को 'रेगुर मिट्टी' भी कहा जाता है और यह कपास की खेती के लिए सर्वोत्तम है?",
      opts: ["Alluvial soil", "Black soil", "Red soil", "Laterite soil"],
      optsHindi: ["जलोढ़ मिट्टी", "काली मिट्टी", "लाल मिट्टी", "लैटेराइट मिट्टी"],
      ans: 1
    },
    {
      q: "The traditional Indian Joint Family system is primarily characterized by:",
      qHindi: "पारंपरिक भारतीय संयुक्त परिवार प्रणाली की मुख्य विशेषता क्या है?",
      opts: ["Nuclear residence only", "Common residence, shared property & kitchen", "Individual property rights", "Absence of kinship bonds"],
      optsHindi: ["केवल एकल निवास", "साझा निवास, साझा संपत्ति एवं साझा रसोई", "व्यक्तिगत संपत्ति अधिकार", "नातेदारी संबंधों का अभाव"],
      ans: 1
    },
    {
      q: "Social stratification under the caste system in India is fundamentally based on:",
      qHindi: "भारत में जाति व्यवस्था के तहत सामाजिक स्तरीकरण मूल रूप से किस पर आधारित है?",
      opts: ["Educational achievement", "Ascription by birth", "Wealth accumulation", "Political affiliation"],
      optsHindi: ["शैक्षिक उपलब्धि", "जन्म पर आधारित (Ascription by birth)", "धन संचय", "राजनीतिक संबद्धता"],
      ans: 1
    },
    {
      q: "The sociological concept of 'Sanskritization' to explain upward social mobility was formulated by:",
      qHindi: "सामाजिक गतिशीलता की व्याख्या करने के लिए 'संस्कृतिकरण' की अवधारणा किसने प्रतिपादित की थी?",
      opts: ["G.S. Ghurye", "M.N. Srinivas", "Andre Beteille", "Yogendra Singh"],
      optsHindi: ["जी.एस. घुर्ये", "एम.एन. श्रीनिवास", "आंद्रे बेतेय", "योगेंद्र सिंह"],
      ans: 1
    },
    {
      q: "According to Census 2011, which Indian state records the lowest population density (17 persons/km²)?",
      qHindi: "2011 की जनगणना के अनुसार, भारत के किस राज्य में सबसे कम जनसंख्या घनत्व (17 व्यक्ति/किमी²) दर्ज किया गया?",
      opts: ["Sikkim", "Mizoram", "Arunachal Pradesh", "Nagaland"],
      optsHindi: ["सिक्किम", "मिजोरम", "अरुणाचल प्रदेश", "नागालैंड"],
      ans: 2
    },
    {
      q: "The Indian Meteorological Department (IMD) operates under which Central Ministry?",
      qHindi: "भारतीय मौसम विज्ञान विभाग (IMD) किस केंद्रीय मंत्रालय के अंतर्गत कार्य करता है?",
      opts: ["Ministry of Environment", "Ministry of Earth Sciences", "Ministry of Science & Tech", "Ministry of Home Affairs"],
      optsHindi: ["पर्यावरण मंत्रालय", "पृथ्वी विज्ञान मंत्रालय", "विज्ञान एवं प्रौद्योगिकी मंत्रालय", "गृह मंत्रालय"],
      ans: 1
    },
  ],

  EconomicsPsychology: [
    {
      q: "The concept of Intelligence Quotient (IQ) was originally formulated by psychologist:",
      qHindi: "बुद्धि लब्धि (IQ) की अवधारणा मूल रूप से किस मनोवैज्ञानिक द्वारा तैयार की गई थी?",
      opts: ["Alfred Binet", "William Stern", "Lewis Terman", "David Wechsler"],
      optsHindi: ["अल्फ्रेड बिने", "विलियम स्टर्न", "लुईस टर्मन", "डेविड वेक्सलर"],
      ans: 1
    },
    {
      q: "The landmark 'Theory of Multiple Intelligences' (8 distinct modalities) was proposed by:",
      qHindi: "प्रसिद्ध 'बहुबुद्धि सिद्धांत' (Theory of Multiple Intelligences) किसके द्वारा प्रस्तावित किया गया था?",
      opts: ["Howard Gardner", "Robert Sternberg", "Charles Spearman", "Jean Piaget"],
      optsHindi: ["हावर्ड गार्डनर", "रॉबर्ट स्टर्नबर्ग", "चार्ल्स स्पीयरमैन", "जीन पियाजे"],
      ans: 0
    },
    {
      q: "In psychoanalytic theory, the structural personality components Id, Ego, and Superego were introduced by:",
      qHindi: "मनोविश्लेषणात्मक सिद्धांत में व्यक्तित्व घटक (इदम, अहम्, पराहम्) किसके द्वारा प्रस्तुत किए गए थे?",
      opts: ["Carl Jung", "Sigmund Freud", "Erik Erikson", "Alfred Adler"],
      optsHindi: ["कार्ल युंग", "सिगमंड फ्रायड", "एरिक एरिक्सन", "अल्फ्रेड एडलर"],
      ans: 1
    },
    {
      q: "A persistent, irrational, and intense fear of an object, animal, or specific situation is termed a:",
      qHindi: "किसी वस्तु, जानवर या स्थिति का अत्यधिक और अतार्किक डर क्या कहलाता है?",
      opts: ["Mania", "Phobia", "Hallucination", "Obsession"],
      optsHindi: ["उन्माद (Mania)", "फोबिया (Phobia)", "मतिभ्रम (Hallucination)", "जुनून (Obsession)"],
      ans: 1
    },
    {
      q: "The psychological defense mechanism where a person projects their own negative impulses onto others is:",
      qHindi: "वह रक्षा तंत्र जिसमें व्यक्ति अपनी नकारात्मक भावनाओं या कमियों को दूसरों पर आरोपित करता है:",
      opts: ["Repression", "Projection", "Sublimation", "Rationalization"],
      optsHindi: ["दमन (Repression)", "प्रक्षेपण (Projection)", "उदात्तीकरण (Sublimation)", "तर्कसंगतता (Rationalization)"],
      ans: 1
    },
    {
      q: "In microeconomics, the point where total revenue equals total cost (TR = TC) is known as the:",
      qHindi: "व्यष्टि अर्थशास्त्र में वह बिंदु जहाँ कुल आगम कुल लागत के बराबर (TR = TC) होता है, क्या कहलाता है?",
      opts: ["Shut-down point", "Break-even point", "Profit-maximizing point", "Equilibrium price"],
      optsHindi: ["शट-डाउन बिंदु", "सम-विच्छेद बिंदु (Break-even point)", "लाभ-अधिकतमीकरण बिंदु", "संतुलन कीमत"],
      ans: 1
    },
    {
      q: "The apex development bank in India dedicated to agricultural credit and rural advancement is:",
      qHindi: "भारत में कृषि साख और ग्रामीण विकास के लिए समर्पित शीर्ष विकास बैंक कौन सा है?",
      opts: ["IDBI", "NABARD", "SIDBI", "EXIM Bank"],
      optsHindi: ["IDBI", "नाबार्ड (NABARD)", "सिडबी (SIDBI)", "एग्जिम बैंक"],
      ans: 1
    },
    {
      q: "Which psychological school emphasizes that the whole of human perception is greater than the sum of its parts?",
      qHindi: "कौन सा मनोवैज्ञानिक संप्रदाय इस बात पर बल देता है कि 'समग्र अपने भागों के योग से बड़ा होता है'?",
      opts: ["Behaviorism", "Gestalt Psychology", "Structuralism", "Functionalism"],
      optsHindi: ["व्यवहारवाद", "गेस्टाल्ट मनोविज्ञान (Gestalt)", "संरचनावाद", "प्रकार्यवाद"],
      ans: 1
    },
    {
      q: "A learned predisposition to respond favorably or unfavorably toward a person, institution, or issue is an:",
      qHindi: "किसी व्यक्ति, संस्था या मुद्दे के प्रति अनुकूल या प्रतिकूल प्रतिक्रिया देने की सीखी गई प्रवृत्ति है:",
      opts: ["Aptitude", "Attitude", "Instinct", "Emotion"],
      optsHindi: ["अभिक्षमता (Aptitude)", "अभिवृत्ति / दृष्टिकोण (Attitude)", "मूलप्रवृत्ति (Instinct)", "संवेग (Emotion)"],
      ans: 1
    },
    {
      q: "The Gini Coefficient in economic statistics is a standard metric used to quantify:",
      qHindi: "आर्थिक सांख्यिकी में गिनी गुणांक (Gini Coefficient) का उपयोग किसे मापने के लिए किया जाता है?",
      opts: ["Rate of unemployment", "Income & wealth inequality", "Rate of inflation", "Balance of trade"],
      optsHindi: ["बेरोजगारी दर", "आय एवं संपत्ति असमानता", "मुद्रास्फीति दर", "व्यापार संतुलन"],
      ans: 1
    },
  ],

  English: [
    {
      q: "Choose the word which is the OPPOSITE (Antonym) in meaning to 'BENEVOLENT':",
      qHindi: "'BENEVOLENT' (परोपकारी) शब्द का विलोम (Antonym) शब्द चुनें:",
      opts: ["Kind", "Generous", "Malevolent", "Sympathetic"],
      optsHindi: ["Kind (दयालु)", "Generous (उदार)", "Malevolent (दुर्भावनापूर्ण)", "Sympathetic (सहानुभूतिपूर्ण)"],
      ans: 2
    },
    {
      q: "Choose the word which is most SIMILAR (Synonym) in meaning to 'CANDID':",
      qHindi: "'CANDID' (स्पष्टवादी/खरा) शब्द का पर्यायवाची (Synonym) चुनें:",
      opts: ["Deceitful", "Frank / Honest", "Secretive", "Shy"],
      optsHindi: ["Deceitful (धोखेबाज़)", "Frank / Honest (स्पष्ट/ईमानदार)", "Secretive (गुप्त)", "Shy (शर्मीला)"],
      ans: 1
    },
    {
      q: "Fill in the blank with the grammatically correct verb: 'Neither the principal nor the teachers ______ present.'",
      qHindi: "व्याकरणिक रूप से सही क्रिया से रिक्त स्थान भरें: 'Neither the principal nor the teachers ______ present.'",
      opts: ["was", "were", "is", "has been"],
      optsHindi: ["was", "were", "is", "has been"],
      ans: 1
    },
    {
      q: "Identify the correctly spelled word from the given choices:",
      qHindi: "दिए गए विकल्पों में से सही वर्तनी (Correct Spelling) वाला शब्द पहचानें:",
      opts: ["Accomodation", "Acommodation", "Accommodation", "Accomadation"],
      optsHindi: ["Accomodation", "Acommodation", "Accommodation", "Accomadation"],
      ans: 2
    },
    {
      q: "What does the popular English idiom 'To burn the midnight oil' mean?",
      qHindi: "अंग्रेजी मुहावरे 'To burn the midnight oil' का क्या अर्थ है?",
      opts: ["To waste electricity", "To work or study late into the night", "To create a disturbance", "To cook food at night"],
      optsHindi: ["बिजली व्यर्थ करना", "देर रात तक कड़ी मेहनत या पढ़ाई करना", "शोर-शराबा मचाना", "रात में खाना बनाना"],
      ans: 1
    },
    {
      q: "Fill in the appropriate preposition: 'The student is proficient ______ both English and Hindi.'",
      qHindi: "उपयुक्त Preposition चुनें: 'The student is proficient ______ both English and Hindi.'",
      opts: ["at", "in", "with", "on"],
      optsHindi: ["at", "in", "with", "on"],
      ans: 1
    },
    {
      q: "Convert to Passive Voice: 'The artist painted a magnificent portrait.'",
      qHindi: "Passive Voice में परिवर्तित करें: 'The artist painted a magnificent portrait.'",
      opts: ["A magnificent portrait was painted by the artist.", "A magnificent portrait is painted by the artist.", "The portrait painted the artist.", "A portrait had been painted by the artist."],
      optsHindi: ["A magnificent portrait was painted by the artist.", "A magnificent portrait is painted by the artist.", "The portrait painted the artist.", "A portrait had been painted by the artist."],
      ans: 0
    },
    {
      q: "Choose the appropriate one-word substitute: 'A person who always looks on the bright and positive side of things':",
      qHindi: "एक शब्द (One Word Substitute) चुनें: 'A person who always looks on the bright and positive side of things':",
      opts: ["Pessimist", "Optimist", "Pacifist", "Altruist"],
      optsHindi: ["Pessimist (निराशावादी)", "Optimist (आशावादी)", "Pacifist (शांतिवादी)", "Altruist (परोपकारी)"],
      ans: 1
    },
    {
      q: "Identify the grammatical error: 'He is one of the most brilliant (A) student (B) in the entire college (C).'",
      qHindi: "व्याकरण संबंधी त्रुटि पहचानें: 'He is one of the most brilliant (A) student (B) in the entire college (C).'",
      opts: ["A", "B (should be 'students')", "C", "No error"],
      optsHindi: ["A", "B ('students' होना चाहिए)", "C", "No error"],
      ans: 1
    },
    {
      q: "Complete the proverb: 'A stitch in time saves ______.'",
      qHindi: "कहावत को पूरा करें: 'A stitch in time saves ______.'",
      opts: ["ten", "nine", "five", "all"],
      optsHindi: ["ten", "nine", "five", "all"],
      ans: 1
    },
  ],

  GK: [
    {
      q: "What is the official administrative capital of Uttar Pradesh?",
      qHindi: "उत्तर प्रदेश की आधिकारिक प्रशासनिक राजधानी कौन सी है?",
      opts: ["Kanpur", "Varanasi", "Lucknow", "Prayagraj"],
      optsHindi: ["कानपुर", "वाराणसी", "लखनऊ", "प्रयागराज"],
      ans: 2
    },
    {
      q: "Who is the Honorable President of India (as of 2024-2026)?",
      qHindi: "भारत के माननीय राष्ट्रपति कौन हैं?",
      opts: ["Smt. Droupadi Murmu", "Shri Jagdeep Dhankhar", "Shri Ram Nath Kovind", "Shri Narendra Modi"],
      optsHindi: ["श्रीमती द्रौपदी मुर्मू", "श्री जगदीप धनखड़", "श्री राम नाथ कोविंद", "श्री नरेंद्र मोदी"],
      ans: 0
    },
    {
      q: "Where is the national headquarters of the Indian Space Research Organisation (ISRO) located?",
      qHindi: "भारतीय अंतरिक्ष अनुसंधान संगठन (ISRO) का राष्ट्रीय मुख्यालय कहाँ स्थित है?",
      opts: ["New Delhi", "Hyderabad", "Bengaluru", "Thiruvananthapuram"],
      optsHindi: ["नई दिल्ली", "हैदराबाद", "बेंगलुरु", "तिरुवनंतपुरम"],
      ans: 2
    },
    {
      q: "Which tree is recognized as the National Tree of the Republic of India?",
      qHindi: "भारत गणराज्य का राष्ट्रीय वृक्ष किसे माना जाता है?",
      opts: ["Neem Tree", "Banyan Tree (Ficus benghalensis)", "Peepal Tree", "Mango Tree"],
      optsHindi: ["नीम का पेड़", "बरगद का पेड़ (Ficus benghalensis)", "पीपल का पेड़", "आम का पेड़"],
      ans: 1
    },
    {
      q: "Which historic Indian mission successfully accomplished a soft lunar landing near the Moon's South Pole in 2023?",
      qHindi: "2023 में किस ऐतिहासिक भारतीय मिशन ने चंद्रमा के दक्षिणी ध्रुव के पास सफल सॉफ्ट लैंडिंग की?",
      opts: ["Chandrayaan-1", "Chandrayaan-2", "Chandrayaan-3", "Mangalyaan"],
      optsHindi: ["चंद्रयान-1", "चंद्रयान-2", "चंद्रयान-3", "मंगलयान"],
      ans: 2
    },
    {
      q: "Which holy river was officially declared as the 'National River of India'?",
      qHindi: "किस पवित्र नदी को आधिकारिक रूप से 'भारत की राष्ट्रीय नदी' घोषित किया गया था?",
      opts: ["Yamuna", "Ganga", "Brahmaputra", "Narmada"],
      optsHindi: ["यमुना", "गंगा", "ब्रह्मपुत्र", "नर्मदा"],
      ans: 1
    },
    {
      q: "Who was the first Indian woman athlete to win an Olympic medal (Bronze in Sydney 2000)?",
      qHindi: "ओलंपिक पदक (सिडनी 2000 में कांस्य) जीतने वाली पहली भारतीय महिला एथलीट कौन थीं?",
      opts: ["P.T. Usha", "Karnam Malleswari", "Mary Kom", "Saina Nehwal"],
      optsHindi: ["पी.टी. उषा", "कर्णम मल्लेश्वरी", "मैरी कॉम", "साइना नेहवाल"],
      ans: 1
    },
    {
      q: "What is the official currency of the United Kingdom?",
      qHindi: "यूनाइटेड किंगडम (UK) की आधिकारिक मुद्रा क्या है?",
      opts: ["Euro", "Pound Sterling", "Dollar", "Franc"],
      optsHindi: ["यूरो", "पाउंड स्टर्लिंग", "डॉलर", "फ़्रैंक"],
      ans: 1
    },
    {
      q: "World Environment Day is observed internationally every year on:",
      qHindi: "विश्व पर्यावरण दिवस अंतरराष्ट्रीय स्तर पर प्रत्येक वर्ष किस दिन मनाया जाता है?",
      opts: ["22nd April", "5th June", "16th September", "1st December"],
      optsHindi: ["22 अप्रैल", "5 जून", "16 सितंबर", "1 दिसंबर"],
      ans: 1
    },
    {
      q: "The revered Golden Temple (Sri Harmandir Sahib) is located in which historic city?",
      qHindi: "पवित्र स्वर्ण मंदिर (श्री हरमंदिर साहिब) किस ऐतिहासिक शहर में स्थित है?",
      opts: ["Amritsar", "Chandigarh", "Ludhiana", "Patiala"],
      optsHindi: ["अमृतसर", "चंडीगढ़", "लुधियाना", "पटियाला"],
      ans: 0
    },
  ],
};

// Generates stream-specific 50 questions (Reversed: GK first, English second, then core subjects)
export function getBaseQuestionsForStream(streamId) {
  let questions = [];

  switch (streamId) {
    case 'PCM':
      questions = [
        ...SUBJECT_POOLS.GK.map(q => ({ ...q, subject: 'General Knowledge' })),
        ...SUBJECT_POOLS.English.map(q => ({ ...q, subject: 'General English' })),
        ...SUBJECT_POOLS.Mathematics.map(q => ({ ...q, subject: 'Mathematics' })),
        ...SUBJECT_POOLS.Chemistry.map(q => ({ ...q, subject: 'Chemistry' })),
        ...SUBJECT_POOLS.Physics.map(q => ({ ...q, subject: 'Physics' })),
      ];
      break;

    case 'PCB':
      questions = [
        ...SUBJECT_POOLS.GK.map(q => ({ ...q, subject: 'General Knowledge' })),
        ...SUBJECT_POOLS.English.map(q => ({ ...q, subject: 'General English' })),
        ...SUBJECT_POOLS.Biology.map(q => ({ ...q, subject: 'Biology' })),
        ...SUBJECT_POOLS.Chemistry.map(q => ({ ...q, subject: 'Chemistry' })),
        ...SUBJECT_POOLS.Physics.map(q => ({ ...q, subject: 'Physics' })),
      ];
      break;

    case 'PCM+Bio':
      // 5 English + 5 GK, 10 Biology, 10 Maths, 10 Chemistry, 10 Physics = 50 Qs
      questions = [
        ...SUBJECT_POOLS.GK.slice(0, 5).map(q => ({ ...q, subject: 'English & GK' })),
        ...SUBJECT_POOLS.English.slice(0, 5).map(q => ({ ...q, subject: 'English & GK' })),
        ...SUBJECT_POOLS.Biology.map(q => ({ ...q, subject: 'Biology' })),
        ...SUBJECT_POOLS.Mathematics.map(q => ({ ...q, subject: 'Mathematics' })),
        ...SUBJECT_POOLS.Chemistry.map(q => ({ ...q, subject: 'Chemistry' })),
        ...SUBJECT_POOLS.Physics.map(q => ({ ...q, subject: 'Physics' })),
      ];
      break;

    case 'Commerce':
      questions = [
        ...SUBJECT_POOLS.GK.map(q => ({ ...q, subject: 'General Knowledge' })),
        ...SUBJECT_POOLS.English.map(q => ({ ...q, subject: 'General English' })),
        ...SUBJECT_POOLS.Economics.map(q => ({ ...q, subject: 'Economics' })),
        ...SUBJECT_POOLS.BusinessStudies.map(q => ({ ...q, subject: 'Business Studies' })),
        ...SUBJECT_POOLS.Accountancy.map(q => ({ ...q, subject: 'Accountancy' })),
      ];
      break;

    case 'Arts':
      questions = [
        ...SUBJECT_POOLS.GK.map(q => ({ ...q, subject: 'General Knowledge' })),
        ...SUBJECT_POOLS.English.map(q => ({ ...q, subject: 'General English' })),
        ...SUBJECT_POOLS.GeographySociology.map(q => ({ ...q, subject: 'Geography & Sociology' })),
        ...SUBJECT_POOLS.PoliticalScience.map(q => ({ ...q, subject: 'Political Science' })),
        ...SUBJECT_POOLS.History.map(q => ({ ...q, subject: 'History' })),
      ];
      break;

    case 'Humanities':
      questions = [
        ...SUBJECT_POOLS.GK.map(q => ({ ...q, subject: 'General Knowledge' })),
        ...SUBJECT_POOLS.English.map(q => ({ ...q, subject: 'General English' })),
        ...SUBJECT_POOLS.EconomicsPsychology.map(q => ({ ...q, subject: 'Economics & Psychology' })),
        ...SUBJECT_POOLS.PoliticalScience.map(q => ({ ...q, subject: 'Political Science' })),
        ...SUBJECT_POOLS.History.map(q => ({ ...q, subject: 'History' })),
      ];
      break;

    default:
      // Fallback to PCM
      questions = [
        ...SUBJECT_POOLS.GK.map(q => ({ ...q, subject: 'General Knowledge' })),
        ...SUBJECT_POOLS.English.map(q => ({ ...q, subject: 'General English' })),
        ...SUBJECT_POOLS.Mathematics.map(q => ({ ...q, subject: 'Mathematics' })),
        ...SUBJECT_POOLS.Chemistry.map(q => ({ ...q, subject: 'Chemistry' })),
        ...SUBJECT_POOLS.Physics.map(q => ({ ...q, subject: 'Physics' })),
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

  // Group base questions by subject (5 subjects, 10 questions each)
  const subjectGroups = [];
  let currentGroup = [];
  let currentSub = '';

  base.forEach((q) => {
    if (q.subject !== currentSub) {
      if (currentGroup.length > 0) subjectGroups.push(currentGroup);
      currentGroup = [q];
      currentSub = q.subject;
    } else {
      currentGroup.push(q);
    }
  });
  if (currentGroup.length > 0) subjectGroups.push(currentGroup);

  // Deterministically shuffle question order WITHIN each subject section (keeps 10 per subject intact)
  let currentSeed = seed;
  const questions = [];

  subjectGroups.forEach((group) => {
    const groupCopy = [...group];
    if (paperSet !== 'Set A') {
      for (let i = groupCopy.length - 1; i > 0; i--) {
        const rand = seededRandom(currentSeed++);
        const j = Math.floor(rand * (i + 1));
        [groupCopy[i], groupCopy[j]] = [groupCopy[j], groupCopy[i]];
      }
    }
    questions.push(...groupCopy);
  });

  // Permute options for each question deterministically so answers can't be peeked
  let optionSeed = seed + 500;
  return questions.map((q, idx) => {
    const originalCorrectText = q.opts[q.ans];
    const permutedIndices = [0, 1, 2, 3];

    for (let i = permutedIndices.length - 1; i > 0; i--) {
      const rand = seededRandom(optionSeed++);
      const j = Math.floor(rand * (i + 1));
      [permutedIndices[i], permutedIndices[j]] = [permutedIndices[j], permutedIndices[i]];
    }

    const permutedOpts = permutedIndices.map(i => q.opts[i]);
    const permutedOptsHindi = permutedIndices.map(i => (q.optsHindi ? q.optsHindi[i] : q.opts[i]));
    const newCorrectIdx = permutedOpts.indexOf(originalCorrectText);

    return {
      id: idx + 1,
      q: q.q,
      qHindi: q.qHindi || q.q,
      options: permutedOpts,
      optionsHindi: permutedOptsHindi,
      correct: newCorrectIdx,
      subject: q.subject,
      paperSet,
    };
  });
}
