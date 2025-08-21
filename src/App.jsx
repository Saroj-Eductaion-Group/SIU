import { Routes, Route } from "react-router-dom";

// Pages
import HomePage from "./pages/HomePage";
import ErrorPage from "./pages/notFoundPage";
import Contact from "./pages/contact/Contact";

// About Pages
import AboutSIU from "./pages/about/AboutSIU";
import HistoryPage from "./pages/about/HistoryPage";
import VisionMissionPage from "./pages/about/VisionMissionPage";
import Acts from "./pages/about/Acts";
import ApprovalsDocuments from "./pages/about/ApprovalsDocuments";
import Courses from "./pages/programs/Courses";

// Admission Pages
import AdmissionCriteria from "./pages/Admission/AdmissionCriteria";
import AdmissionProcess from "./pages/Admission/AdmissionProcess";
import ScholarshipPage from "./pages/Admission/ScholarshipPage";
import SIUFeeStructure from "./pages/Admission/FeeStructure";

// Program Categories
import AiAndTechPage from "./pages/programs/AiAndTechPage";
import HealthSciencesPage from "./pages/programs/HealthSciencePage";
import HumanitiesPage from "./pages/programs/HumanitiesPage";
import EntrepreneurshipAndBusiness from "./pages/programs/EntrepreneurshipAndBusiness";
import FilmsAndFashion from "./pages/programs/FilmsAndFashion";
import ManagementAndTechPage from "./pages/programs/ManagementAndTechPage";
import PharmacyPage from "./pages/programs/PharmacyPage";
import SportsScience from "./pages/programs/SportsScience";

// Program Subpages
import BtechAIMLPage from "./pages/programs/AiAndTech/BtechAiPage";
import BtechDataSciencePage from "./pages/programs/AiAndTech/BtechDataScience";
import BAPage from "./pages/programs/Humanities/BA";
import BSPage from "./pages/programs/Humanities/BS";
import BPharmaPage from "./pages/programs/Pharma/Bpharma";
import DPharmaPage from "./pages/programs/Pharma/Dpharma";
import BscFilmMakingPage from "./pages/programs/film/BscFilmMaking";
import BscScriptWritingPage from "./pages/programs/film/BscScriptWriting";
import BBAPage from "./pages/programs/Business/BBA";
import BBAfinancePage from "./pages/programs/Business/BBAfinance";
import BtechCsePage from "./pages/programs/Btech/Cse";
import BtechItPage from "./pages/programs/Btech/It";
import MsSportsSciencePage from "./pages/programs/SportsScience/Ms";
import BsSportsSciencePage from "./pages/programs/SportsScience/Bs";
import BscPhysicsPage from "./pages/programs/HealthSciences/BscPhysics";
import BscChemistryPage from "./pages/programs/HealthSciences/BscChemistry";

// Administration Pages
import ChancellorPage from "./pages/administration/Chancellor";

import AcademicCouncil from "./pages/administration/AcademicCouncil";
import ExecutiveCouncil from "./pages/administration/ExecutiveCouncil";
import InternalComplaint from "./pages/administration/InternalComplaint";

// Academics
import AcademicCalendar from "./pages/Academics/AcademicCalendar";
import Statutes from "./pages/Academics/Statutes";
import AnnualReport from "./pages/Academics/AnnualReport";

// Legal
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsAndConditions from "./pages/TermsConditions";

// Components
import CoursePage from "./components/ShowPrograms";
import BoardOfGovernance from "./pages/about/Boards";
import Boards from "./pages/about/Boards";
import Deans from "./pages/about/Dean";
import FinanceCommitee from "./pages/administration/FinanceCommitee";
import PublicSelfDisclosure from "./pages/about/PublicSelfDisclosure";
import Recognition from "./pages/about/Recognition";
import Faculty from "./pages/Academics/Faculty";
import PharmacyCouncil from "./pages/about/PharmacyCouncilofIndia";
import Committees from "./pages/about/Committees";
import AICTEApproval from "./pages/about/AICTEApproval";
import BBAFinancePage from "./pages/programs/Business/BBAfinance";
import TempPage from "./pages/tempPage";

import InstituteFilmFashion from "./pages/InstitutePages/FilmFashion";
import InstitutePharmacy from "./pages/InstitutePages/Pharmacy";
import InstituteEntrepreneurshipBusiness from "./pages/InstitutePages/Business";
import InstituteSportsScience from "./pages/InstitutePages/SportsScience";
import InstituteHumanitiesEducation from "./pages/InstitutePages/Humanities";
import InstituteBasicHealthSciences from "./pages/InstitutePages/HealthScience";
import InstituteManagementTechnology from "./pages/InstitutePages/ManagementTech";
import InstituteArtificialIntelligence from "./pages/InstitutePages/Ai";
import DesignThinkingPage from "./pages/tcs/DesignThinking";
import InnovationEntrepreneurshipPage from "./pages/tcs/InnovationEntrepreneurship";
import ArtificialIntelligencePage from "./pages/tcs/Artificial-Intelligence";
import MachineLearningPage from "./pages/tcs/MachineLearning";
import StatisticsPage from "./pages/tcs/Statistics";
import SarojCollegeOfLaw from "./pages/Academics/Scp";
import CloudDevelopmentPage from "./pages/tcs/CloudDevelopment";
import InformationSecurityPage from "./pages/tcs/InfoSecurity";
import DlPage from "./pages/tcs/Dl";
import CyberSecurityPage from "./pages/tcs/CyberSecurity";
import CryptographyPage from "./pages/tcs/Cryptography";

function App() {
  return (
    <Routes>
      {/* Fallback */}
      <Route path='*' element={<ErrorPage />} />

      {/* Home */}
      <Route path='/' element={<HomePage />} />

      {/* Programs Overview */}
      <Route path='/programs' element={<Courses />} />

      {/* Institute pages */}
       <Route path='/academics/Saroj-Institute-of-Film-and-Fashion' element={< InstituteFilmFashion/>} />
       <Route path='/academics/Lucknow-Institute-of-Pharmacy' element={< InstitutePharmacy/>} />
        <Route path='/academics/Saroj-Insitute-of-Entrepreneurship-and-Business' element={< InstituteEntrepreneurshipBusiness/>} />
        <Route path='/academics/Saroj-Institute-of-Sports-Science-and-Research' element={< InstituteSportsScience/>} />
               <Route path='/academics/Saroj-Institute-of-Humanities-and-Education' element={< InstituteHumanitiesEducation/>} />
       <Route path='/academics/Saroj-Institute-of-Basic-and-Health-Sciences' element={< InstituteBasicHealthSciences/>} />
       <Route path='/academics/Saroj-Institute-of-Management-and-Technology' element={< InstituteManagementTechnology/>} />
       <Route path='/academics/Saroj-Institute-of-Artificial-Intelligence' element={< InstituteArtificialIntelligence/>} />

        <Route path='/academics/saroj-college-of-law' element={< SarojCollegeOfLaw/>} />




      {/* About */}
      <Route path='/about/about-siu' element={<AboutSIU />} />
      <Route path='/about/history' element={<HistoryPage />} />
      <Route path='/about/vision-mission' element={<VisionMissionPage />} />
      {/* 1 */}
      <Route path='/act-statutes-and-ordinances/' element={<Acts />} />   
      <Route path='/about/approvals-documents' element={<ApprovalsDocuments />} />
      {/* 2 */}
      <Route path='/annual-account' element={<AnnualReport />} /> 
      <Route path='/about/boards' element={<Boards />} />
      
      <Route path='/about/deans' element={<Deans />} />
      <Route path='/about/public-self-disclosure' element={<PublicSelfDisclosure />} />
      <Route path='/about/recognition' element={<Recognition />} />
      <Route path='/about/lip-pharmacy-council' element={<PharmacyCouncil />} />
      <Route path='/about/aicte-approval' element={<AICTEApproval />} />
      <Route path='/about/committees' element={<Committees />} />

      {/* ----TEMP----  */}
      {/* 3 */}
      <Route path='/insituional-development-plan-2' element={<TempPage heading='Insituional Development Plan' />} />
      <Route path='/registrar' element={<TempPage heading='Registrar' />} />
      <Route path='/controller-of-examination' element={<TempPage heading='Controller Of Examination' />} />
      <Route path='/ombudsperson/' element={<TempPage heading='Ombudsperson' />} />
      <Route path='/internal-qualityassurance-cell-iqac/' element={<TempPage heading='Internal Quality Assurance Cell (IQAC)' />} />
      <Route path='/library/' element={<TempPage heading='Library' />} />
      <Route path='/academiccollaboration/' element={<TempPage heading='Academic Collaborations' />} />
      <Route path='/prospects' element={<TempPage heading='Prospects' />} />
      <Route path='/refund-policy' element={<TempPage heading='Refund Policy' />} />
      <Route path='/research-and-development-cell' element={<TempPage heading='Research And Development Cell' />} />
      <Route path='/innovation-center' element={<TempPage heading='Innovation Center' />} />
      <Route path='/campus-facilities' element={<TempPage heading='Campus Facilities' />} />
      <Route path='/sports' element={<TempPage heading='Sports' />} />
      <Route path='/hostel-details' element={<TempPage heading='Hostel Details' />} />
      <Route path='/placement-cell' element={<TempPage heading='Placement Cell' />} />
      <Route path='/health-facilities' element={<TempPage heading='Health Facilities' />} />
      <Route path='/alumni-connect/' element={<TempPage heading='Alumni Connect' />} />
      <Route path='/rti/' element={<TempPage heading='RTI' />} />
      <Route path='/circular-notice' element={<TempPage heading='Circular Notice' />} />
      <Route path='/announcements' element={<TempPage heading='Announcements' />} />
      <Route path='/news-letter' element={<TempPage heading='News Letter' />} />
      <Route path='/admissions-overview' element={<TempPage heading='Admissions Overview' />} />
      <Route path='/why-study-global-mode' element={<TempPage heading='Why Study Global Mode' />} />
      <Route path='/image-gallery' element={<TempPage heading='Image Gallery' />} />
      <Route path='/facilities-for-differently-abled/' element={<TempPage heading='Facili-es for Differently Abled (e.g., Barrier-Free Environment)' />} />
      <Route path='/socioeconomically-disadvantaged-groups-cell-sedg/' element={<TempPage heading='Health Facilities' />} />
      <Route path='/details-of-student-grievance-redressal-committee' element={<TempPage heading='Socio-Economically Disadvantaged Groups Cell (SEDG)' />} />



      {/* <Route path='/controller-of-examination' element={<TempPage heading='Chief Vigilance Officer' />} /> */}
      

      {/* Academics */}
      <Route path='/academics/academic-calendar' element={<AcademicCalendar />} />
      <Route path='/academics/statutes' element={<Statutes />} />
      <Route path='/academics/faculty' element={<Faculty />} />

      {/* Admissions */}

      <Route path='/admissions/admission-criteria' element={<AdmissionCriteria />} />
      <Route path='/admissions/scholarship' element={<ScholarshipPage />} />

      {/* changes  */}
      <Route path='/admissions/admission-process' element={<AdmissionProcess />} />
      <Route path='/admissions/fee-structure' element={<SIUFeeStructure />} />

      {/* TCS Programs */}
      <Route path='/programs/design-thinking' element={<DesignThinkingPage />} />
      <Route path='/programs/innovation-entrepreneurship' element={<InnovationEntrepreneurshipPage />} />
      <Route path='/programs/artificial-intelligence-real-world' element={<ArtificialIntelligencePage />} />
      <Route path='/programs/machine-learning-real-world' element={<MachineLearningPage />} />
      <Route path='/programs/statistics-r-python' element={<StatisticsPage />} />
      <Route path='/programs/information-security' element={<InformationSecurityPage />} />
      <Route path='/programs/cloud-development' element={<CloudDevelopmentPage />} />
      <Route path='/programs/deep-learning-neural-networks' element={<DlPage />} />
      <Route path='/programs/advanced-cyber-security' element={<CyberSecurityPage />} />
      <Route path='/programs/cryptography' element={<CryptographyPage />} />





      {/* Program Categories */}
      <Route path='/programs/artificial-intelligence-technology' element={<AiAndTechPage />} />
      <Route path='/programs/health-sciences' element={<HealthSciencesPage />} />
      <Route path='/programs/humanities-education' element={<HumanitiesPage />} />
      <Route path='/programs/entrepreneurship-and-business' element={<EntrepreneurshipAndBusiness />} />
      <Route path='/programs/film-fashion' element={<FilmsAndFashion />} />
      <Route path='/programs/management-and-tech' element={<ManagementAndTechPage />} />
      <Route path='/programs/pharmacy' element={<PharmacyPage />} />
      <Route path='/programs/sports-science' element={<SportsScience />} />

      {/* Program Sub-Pages */}
      <Route path='/programs/btech-ai-ml' element={<BtechAIMLPage />} />
      <Route path='/programs/btech-data-science' element={<BtechDataSciencePage />} />
      <Route path='/programs/ba' element={<BAPage />} />
      <Route path='/programs/bs-international-relations' element={<BSPage />} />
      <Route path='/programs/bpharm' element={<BPharmaPage />} />
      <Route path='/programs/dpharm' element={<DPharmaPage />} />
      <Route path='/programs/bsc-film-making' element={<BscFilmMakingPage />} />
      <Route path='/programs/bsc-script-writing' element={<BscScriptWritingPage />} />
      <Route path='/programs/bba-general' element={<BBAPage />} />
      <Route path='/programs/bba-banking-finance' element={<BBAFinancePage />} />
      <Route path='/programs/btech-cse' element={<BtechCsePage />} />
      <Route path='/programs/btech-it' element={<BtechItPage />} />
      <Route path='/programs/ms-sports-science' element={<MsSportsSciencePage />} />
      <Route path='/programs/bs-sports-science' element={<BsSportsSciencePage />} />
      <Route path='/programs/bsc-physics' element={<BscPhysicsPage />} />
      <Route path='/programs/bsc-Chemistry' element={<BscChemistryPage />} />

      {/* Administration */}
      {/* 4 */}
      <Route path='/chancellor' element={<ChancellorPage />} />


      {/* 5 */}
      <Route path='/administration/academic-council' element={<AcademicCouncil />} />
      <Route path='/administration/finance-commitee' element={<FinanceCommitee/>}/>
      <Route path='/administration/executive-council' element={<ExecutiveCouncil />} />
      <Route path='/administration/internal-complaint' element={<InternalComplaint />} />
      <Route path='/finance-officer' element={<FinanceCommitee />} />

      {/* Contact & Legal */}
      <Route path='/contact-us' element={<Contact />} />
      <Route path='/privacy-policy' element={<PrivacyPolicy />} />
      <Route path='/terms-and-conditions' element={<TermsAndConditions />} />
    </Routes>
  );
}

export default App;
