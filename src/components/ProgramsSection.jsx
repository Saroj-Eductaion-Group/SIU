import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Cpu,
  Briefcase,
  School,
  FlaskConical,
  Pill,
  Dumbbell,
  Film,
  ChevronRight,
  ArrowRight,
  BookOpen,
  GraduationCap,
  ClipboardList,
  UserCheck,
  Hand,
  Gavel,
  Search,
  Filter,
} from "lucide-react";
import { Link } from "react-router-dom";

const ProgramsSection = () => {
  const programs = [
    {
      id: 1,
      title: "Artificial Intelligence & Technology",
      description: "Cutting-edge programs in AI, ML, Data Science, and Robotics",
      degrees: [
        {
          name: "B.Tech in Artificial Intelligence",
          duration: "4 Years",
          fee: "₹1,20,000/yr",
          mode: "Regular",
          criteria: [
            "10+2 with Physics, Chemistry, Mathematics",
            "Minimum 50% marks",
            "JEE Main/University Entrance Exam",
          ],
        },
        {
          name: "B.Tech in Machine Learning",
          duration: "4 Years",
          fee: "₹1,20,000/yr",
          mode: "Regular",
          criteria: [
            "10+2 with Physics, Chemistry, Mathematics",
            "Minimum 50% marks",
            "JEE Main/University Entrance Exam",
          ],
        },
        {
          name: "B.Tech in Data Science",
          duration: "4 Years",
          fee: "₹1,20,000/yr",
          mode: "Regular",
          criteria: [
            "10+2 with Physics, Chemistry, Mathematics",
            "Minimum 50% marks",
            "JEE Main/University Entrance Exam",
          ],
        },
        {
          name: "B.Tech in Robotics",
          duration: "4 Years",
          fee: "₹1,20,000/yr",
          mode: "Regular",
          criteria: [
            "10+2 with Physics, Chemistry, Mathematics",
            "Minimum 50% marks",
            "JEE Main/University Entrance Exam",
          ],
        },
        {
          name: "B.Tech Computer Science & Engineering",
          duration: "4 Years",
          fee: "₹1,10,000/yr",
          mode: "Regular",
          criteria: [
            "10+2 with Physics, Chemistry, Mathematics",
            "Minimum 50% marks",
            "JEE Main/University Entrance Exam",
          ],
        },
        {
          name: "M.Tech in Artificial Intelligence",
          duration: "2 Years",
          fee: "₹1,40,000/yr",
          mode: "Regular",
          criteria: [
            "B.Tech/B.E. in relevant field",
            "Minimum 55% marks",
            "GATE score preferred",
          ],
        },
        {
          name: "M.Tech in Machine Learning",
          duration: "2 Years",
          fee: "₹1,40,000/yr",
          mode: "Regular",
          criteria: [
            "B.Tech/B.E. in relevant field",
            "Minimum 55% marks",
            "GATE score preferred",
          ],
        },
        {
          name: "M.Tech in Data Science",
          duration: "2 Years",
          fee: "₹1,40,000/yr",
          mode: "Regular",
          criteria: [
            "B.Tech/B.E. in relevant field",
            "Minimum 55% marks",
            "GATE score preferred",
          ],
        },
        {
          name: "M.Tech Computer Science & Engineering",
          duration: "2 Years",
          fee: "₹1,35,000/yr",
          mode: "Regular",
          criteria: [
            "B.Tech/B.E. in relevant field",
            "Minimum 55% marks",
            "GATE score preferred",
          ],
        },
        {
          name: "PhD in Computer Science",
          duration: "3-5 Years",
          fee: "₹1,00,000/yr",
          mode: "Regular",
          criteria: [
            "M.Tech/M.E. in relevant field",
            "Minimum 60% marks",
            "University Entrance Exam",
          ],
        },
      ],
      icon: <Cpu className="w-5 h-5" />,
      color: "bg-blue-100 text-blue-800",
      borderColor: "border-blue-200",
      bgColor: "from-blue-50 to-blue-100",
      buttonColor: "from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900",
      institute: "Saroj Institute of Artificial Intelligence"
    },
    {
      id: 2,
      title: "Management & Technology",
      description: "Programs blending technology with business management",
      degrees: [
        {
          name: "B.Tech in Computer Science & Engineering",
          duration: "4 Years",
          fee: "₹1,10,000/yr",
          mode: "Regular",
          criteria: [
            "10+2 with Physics, Chemistry, Mathematics",
            "Minimum 50% marks",
            "JEE Main/University Entrance Exam",
          ],
        },
        {
          name: "B.Tech in Information Technology",
          duration: "4 Years",
          fee: "₹1,10,000/yr",
          mode: "Regular",
          criteria: [
            "10+2 with Physics, Chemistry, Mathematics",
            "Minimum 50% marks",
            "JEE Main/University Entrance Exam",
          ],
        },
        {
          name: "B.Tech in Cyber Security",
          duration: "4 Years",
          fee: "₹1,15,000/yr",
          mode: "Regular",
          criteria: [
            "10+2 with Physics, Chemistry, Mathematics",
            "Minimum 50% marks",
            "JEE Main/University Entrance Exam",
          ],
        },
        {
          name: "B.Tech in Internet of Things",
          duration: "4 Years",
          fee: "₹1,15,000/yr",
          mode: "Regular",
          criteria: [
            "10+2 with Physics, Chemistry, Mathematics",
            "Minimum 50% marks",
            "JEE Main/University Entrance Exam",
          ],
        },
        {
          name: "BCA in Artificial Intelligence",
          duration: "3 Years",
          fee: "₹85,000/yr",
          mode: "Regular",
          criteria: [
            "10+2 from recognized board",
            "Minimum 50% marks",
            "Basic computer knowledge preferred",
          ],
        },
        {
          name: "BCA in Machine Learning",
          duration: "3 Years",
          fee: "₹85,000/yr",
          mode: "Regular",
          criteria: [
            "10+2 from recognized board",
            "Minimum 50% marks",
            "Basic computer knowledge preferred",
          ],
        },
        {
          name: "BCA in Cyber Security",
          duration: "3 Years",
          fee: "₹90,000/yr",
          mode: "Regular",
          criteria: [
            "10+2 from recognized board",
            "Minimum 50% marks",
            "Basic computer knowledge preferred",
          ],
        },
        {
          name: "MCA in Artificial Intelligence",
          duration: "2 Years",
          fee: "₹1,00,000/yr",
          mode: "Regular",
          criteria: [
            "Bachelor's degree in any discipline",
            "Minimum 50% marks",
            "Mathematics in 10+2 preferred",
          ],
        },
        {
          name: "MCA in Machine Learning",
          duration: "2 Years",
          fee: "₹1,00,000/yr",
          mode: "Regular",
          criteria: [
            "Bachelor's degree in any discipline",
            "Minimum 50% marks",
            "Mathematics in 10+2 preferred",
          ],
        },
        {
          name: "MCA in Cyber Security",
          duration: "2 Years",
          fee: "₹1,05,000/yr",
          mode: "Regular",
          criteria: [
            "Bachelor's degree in any discipline",
            "Minimum 50% marks",
            "Mathematics in 10+2 preferred",
          ],
        },
        {
          name: "M.Tech in Computer Science & Engineering",
          duration: "2 Years",
          fee: "₹1,30,000/yr",
          mode: "Regular",
          criteria: [
            "B.Tech/B.E. in relevant field",
            "Minimum 55% marks",
            "GATE score preferred",
          ],
        },
        {
          name: "M.Tech in Information Technology",
          duration: "2 Years",
          fee: "₹1,30,000/yr",
          mode: "Regular",
          criteria: [
            "B.Tech/B.E. in relevant field",
            "Minimum 55% marks",
            "GATE score preferred",
          ],
        },
      ],
      icon: <Briefcase className="w-5 h-5" />,
      color: "bg-purple-100 text-purple-800",
      borderColor: "border-purple-200",
      bgColor: "from-purple-50 to-purple-100",
      buttonColor: "from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900",
      institute: "Saroj Institute of Management & Technology"
    },
    {
      id: 3,
      title: "Entrepreneurship & Business",
      description: "Programs designed for future business leaders and entrepreneurs",
      degrees: [
        {
          name: "BBA in General Management",
          duration: "3 Years",
          fee: "₹95,000/yr",
          mode: "Regular",
          criteria: [
            "10+2 from recognized board",
            "Minimum 50% marks",
            "University Entrance Exam",
          ],
        },
        {
          name: "BBA in Banking & Finance",
          duration: "3 Years",
          fee: "₹1,00,000/yr",
          mode: "Regular",
          criteria: [
            "10+2 from recognized board",
            "Minimum 50% marks",
            "University Entrance Exam",
          ],
        },
        {
          name: "BBA in Marketing",
          duration: "3 Years",
          fee: "₹95,000/yr",
          mode: "Regular",
          criteria: [
            "10+2 from recognized board",
            "Minimum 50% marks",
            "University Entrance Exam",
          ],
        },
        {
          name: "BBA in Logistics & Supply Chain",
          duration: "3 Years",
          fee: "₹1,00,000/yr",
          mode: "Regular",
          criteria: [
            "10+2 from recognized board",
            "Minimum 50% marks",
            "University Entrance Exam",
          ],
        },
        {
          name: "BBA in Human Resource Management",
          duration: "3 Years",
          fee: "₹95,000/yr",
          mode: "Regular",
          criteria: [
            "10+2 from recognized board",
            "Minimum 50% marks",
            "University Entrance Exam",
          ],
        },
        {
          name: "BBA in Information Technology",
          duration: "3 Years",
          fee: "₹1,05,000/yr",
          mode: "Regular",
          criteria: [
            "10+2 from recognized board",
            "Minimum 50% marks",
            "University Entrance Exam",
          ],
        },
        {
          name: "BBA in Entrepreneurship",
          duration: "3 Years",
          fee: "₹1,00,000/yr",
          mode: "Regular",
          criteria: [
            "10+2 from recognized board",
            "Minimum 50% marks",
            "University Entrance Exam",
          ],
        },
        {
          name: "BBA in Insurance",
          duration: "3 Years",
          fee: "₹95,000/yr",
          mode: "Regular",
          criteria: [
            "10+2 from recognized board",
            "Minimum 50% marks",
            "University Entrance Exam",
          ],
        },
        {
          name: "BBA in Retail Management",
          duration: "3 Years",
          fee: "₹95,000/yr",
          mode: "Regular",
          criteria: [
            "10+2 from recognized board",
            "Minimum 50% marks",
            "University Entrance Exam",
          ],
        },
        {
          name: "BBA in Start-up Management",
          duration: "3 Years",
          fee: "₹1,00,000/yr",
          mode: "Regular",
          criteria: [
            "10+2 from recognized board",
            "Minimum 50% marks",
            "University Entrance Exam",
          ],
        },
        {
          name: "MBA in General Management",
          duration: "2 Years",
          fee: "₹1,20,000/yr",
          mode: "Regular",
          criteria: [
            "Bachelor's degree in any discipline",
            "Minimum 50% marks",
            "CAT/MAT/University Entrance Exam",
          ],
        },
        {
          name: "MBA in Marketing",
          duration: "2 Years",
          fee: "₹1,20,000/yr",
          mode: "Regular",
          criteria: [
            "Bachelor's degree in any discipline",
            "Minimum 50% marks",
            "CAT/MAT/University Entrance Exam",
          ],
        },
        {
          name: "MBA in Finance",
          duration: "2 Years",
          fee: "₹1,20,000/yr",
          mode: "Regular",
          criteria: [
            "Bachelor's degree in any discipline",
            "Minimum 50% marks",
            "CAT/MAT/University Entrance Exam",
          ],
        },
        {
          name: "MBA in Human Resources",
          duration: "2 Years",
          fee: "₹1,20,000/yr",
          mode: "Regular",
          criteria: [
            "Bachelor's degree in any discipline",
            "Minimum 50% marks",
            "CAT/MAT/University Entrance Exam",
          ],
        },
        {
          name: "PhD in Management",
          duration: "3-5 Years",
          fee: "₹90,000/yr",
          mode: "Regular",
          criteria: [
            "Master's degree in relevant field",
            "Minimum 55% marks",
            "University Entrance Exam",
          ],
        },
      ],
      icon: <Briefcase className="w-5 h-5" />,
      color: "bg-green-100 text-green-800",
      borderColor: "border-green-200",
      bgColor: "from-green-50 to-green-100",
      buttonColor: "from-green-600 to-green-800 hover:from-green-700 hover:to-green-900",
      institute: "Saroj Institute of Entrepreneurship and Business"
    },
    {
      id: 4,
      title: "Humanities & Education",
      description: "Programs in arts, commerce, and education",
      degrees: [
        {
          name: "BA in English Literature",
          duration: "3 Years",
          fee: "₹55,000/yr",
          mode: "Regular",
          criteria: ["10+2 from recognized board", "Minimum 45% marks"],
        },
        {
          name: "BA in History",
          duration: "3 Years",
          fee: "₹55,000/yr",
          mode: "Regular",
          criteria: ["10+2 from recognized board", "Minimum 45% marks"],
        },
        {
          name: "BA in Political Science",
          duration: "3 Years",
          fee: "₹55,000/yr",
          mode: "Regular",
          criteria: ["10+2 from recognized board", "Minimum 45% marks"],
        },
        {
          name: "BA in Sociology",
          duration: "3 Years",
          fee: "₹55,000/yr",
          mode: "Regular",
          criteria: ["10+2 from recognized board", "Minimum 45% marks"],
        },
        {
          name: "BA in Psychology",
          duration: "3 Years",
          fee: "₹60,000/yr",
          mode: "Regular",
          criteria: ["10+2 from recognized board", "Minimum 45% marks"],
        },
        {
          name: "B.Com in General",
          duration: "3 Years",
          fee: "₹60,000/yr",
          mode: "Regular",
          criteria: ["10+2 from recognized board", "Minimum 45% marks"],
        },
        {
          name: "B.Com in Accounting & Finance",
          duration: "3 Years",
          fee: "₹65,000/yr",
          mode: "Regular",
          criteria: ["10+2 from recognized board", "Minimum 45% marks"],
        },
        {
          name: "B.Com in Business Administration",
          duration: "3 Years",
          fee: "₹65,000/yr",
          mode: "Regular",
          criteria: ["10+2 from recognized board", "Minimum 45% marks"],
        },
        {
          name: "B.Ed in General",
          duration: "2 Years",
          fee: "₹60,000/yr",
          mode: "Regular",
          criteria: [
            "Bachelor's degree in any discipline",
            "Minimum 50% marks",
          ],
        },
        {
          name: "B.Ed in Special Education",
          duration: "2 Years",
          fee: "₹65,000/yr",
          mode: "Regular",
          criteria: [
            "Bachelor's degree in any discipline",
            "Minimum 50% marks",
          ],
        },
        {
          name: "MA in English",
          duration: "2 Years",
          fee: "₹60,000/yr",
          mode: "Regular",
          criteria: [
            "Bachelor's degree in relevant subject",
            "Minimum 50% marks",
          ],
        },
        {
          name: "MA in History",
          duration: "2 Years",
          fee: "₹60,000/yr",
          mode: "Regular",
          criteria: [
            "Bachelor's degree in relevant subject",
            "Minimum 50% marks",
          ],
        },
        {
          name: "MA in Political Science",
          duration: "2 Years",
          fee: "₹60,000/yr",
          mode: "Regular",
          criteria: [
            "Bachelor's degree in relevant subject",
            "Minimum 50% marks",
          ],
        },
        {
          name: "M.Com in General",
          duration: "2 Years",
          fee: "₹65,000/yr",
          mode: "Regular",
          criteria: [
            "B.Com or equivalent degree",
            "Minimum 50% marks",
          ],
        },
        {
          name: "M.Ed in General",
          duration: "2 Years",
          fee: "₹65,000/yr",
          mode: "Regular",
          criteria: [
            "B.Ed degree",
            "Minimum 55% marks",
          ],
        },
      ],
      icon: <School className="w-5 h-5" />,
      color: "bg-yellow-100 text-yellow-800",
      borderColor: "border-yellow-200",
      bgColor: "from-yellow-50 to-yellow-100",
      buttonColor: "from-yellow-600 to-yellow-800 hover:from-yellow-700 hover:to-yellow-900",
      institute: "Saroj Institute of Humanities & Education"
    },
    {
      id: 5,
      title: "Basic & Health Sciences",
      description: "Programs in pure sciences and health-related fields",
      degrees: [
        {
          name: "B.Sc in Physics",
          duration: "3 Years",
          fee: "₹70,000/yr",
          mode: "Regular",
          criteria: [
            "10+2 with Physics, Chemistry, Mathematics",
            "Minimum 50% marks",
          ],
        },
        {
          name: "B.Sc in Chemistry",
          duration: "3 Years",
          fee: "₹70,000/yr",
          mode: "Regular",
          criteria: [
            "10+2 with Physics, Chemistry, Mathematics/Biology",
            "Minimum 50% marks",
          ],
        },
        {
          name: "B.Sc in Mathematics",
          duration: "3 Years",
          fee: "₹70,000/yr",
          mode: "Regular",
          criteria: [
            "10+2 with Mathematics",
            "Minimum 50% marks",
          ],
        },
        {
          name: "B.Sc in Biology",
          duration: "3 Years",
          fee: "₹75,000/yr",
          mode: "Regular",
          criteria: [
            "10+2 with Physics, Chemistry, Biology",
            "Minimum 50% marks",
          ],
        },
        {
          name: "B.Sc in Data Science",
          duration: "3 Years",
          fee: "₹85,000/yr",
          mode: "Regular",
          criteria: [
            "10+2 with Mathematics",
            "Minimum 50% marks",
          ],
        },
        {
          name: "BS in Physiotherapy",
          duration: "4 Years",
          fee: "₹95,000/yr",
          mode: "Regular",
          criteria: [
            "10+2 with Physics, Chemistry, Biology",
            "Minimum 55% marks",
          ],
        },
        {
          name: "M.Sc in Physics",
          duration: "2 Years",
          fee: "₹75,000/yr",
          mode: "Regular",
          criteria: ["B.Sc in Physics", "Minimum 55% marks"],
        },
        {
          name: "M.Sc in Chemistry",
          duration: "2 Years",
          fee: "₹75,000/yr",
          mode: "Regular",
          criteria: ["B.Sc in Chemistry", "Minimum 55% marks"],
        },
        {
          name: "M.Sc in Mathematics",
          duration: "2 Years",
          fee: "₹75,000/yr",
          mode: "Regular",
          criteria: ["B.Sc in Mathematics", "Minimum 55% marks"],
        },
        {
          name: "M.Sc in Biology",
          duration: "2 Years",
          fee: "₹80,000/yr",
          mode: "Regular",
          criteria: ["B.Sc in Biology", "Minimum 55% marks"],
        },
        {
          name: "MS in Data Science",
          duration: "2 Years",
          fee: "₹90,000/yr",
          mode: "Regular",
          criteria: [
            "Bachelor's degree in relevant field",
            "Minimum 55% marks",
          ],
        },
        {
          name: "MS in Physiotherapy",
          duration: "2 Years",
          fee: "₹1,00,000/yr",
          mode: "Regular",
          criteria: [
            "BS in Physiotherapy or equivalent",
            "Minimum 55% marks",
          ],
        },
        {
          name: "PhD in Physics",
          duration: "3-5 Years",
          fee: "₹80,000/yr",
          mode: "Regular",
          criteria: [
            "M.Sc in Physics",
            "Minimum 60% marks",
            "University Entrance Exam",
          ],
        },
        {
          name: "PhD in Chemistry",
          duration: "3-5 Years",
          fee: "₹80,000/yr",
          mode: "Regular",
          criteria: [
            "M.Sc in Chemistry",
            "Minimum 60% marks",
            "University Entrance Exam",
          ],
        },
      ],
      icon: <FlaskConical className="w-5 h-5" />,
      color: "bg-red-100 text-red-800",
      borderColor: "border-red-200",
      bgColor: "from-red-50 to-red-100",
      buttonColor: "from-red-600 to-red-800 hover:from-red-700 hover:to-red-900",
      institute: "Saroj Institute of Basic & Health Sciences"
    },
    {
      id: 6,
      title: "Pharmacy",
      description: "Programs in pharmaceutical sciences",
      degrees: [
        {
          name: "B.Pharm (Bachelor of Pharmacy)",
          duration: "4 Years",
          fee: "₹1,10,000/yr",
          mode: "Regular",
          criteria: [
            "10+2 with Physics, Chemistry, Biology/Mathematics",
            "Minimum 50% marks",
            "State/National Entrance Exam",
          ],
        },
        {
          name: "D.Pharm (Diploma in Pharmacy)",
          duration: "2 Years",
          fee: "₹85,000/yr",
          mode: "Regular",
          criteria: [
            "10+2 with Physics, Chemistry, Biology/Mathematics",
            "Minimum 45% marks",
          ],
        },
        {
          name: "M.Pharm in Pharmaceutics",
          duration: "2 Years",
          fee: "₹1,20,000/yr",
          mode: "Regular",
          criteria: ["B.Pharm degree", "Minimum 55% marks", "GPAT score preferred"],
        },
        {
          name: "M.Pharm in Pharmacology",
          duration: "2 Years",
          fee: "₹1,20,000/yr",
          mode: "Regular",
          criteria: ["B.Pharm degree", "Minimum 55% marks", "GPAT score preferred"],
        },
        {
          name: "M.Pharm in Pharmaceutical Chemistry",
          duration: "2 Years",
          fee: "₹1,20,000/yr",
          mode: "Regular",
          criteria: ["B.Pharm degree", "Minimum 55% marks", "GPAT score preferred"],
        },
        {
          name: "PhD in Pharmacy",
          duration: "3-5 Years",
          fee: "₹1,00,000/yr",
          mode: "Regular",
          criteria: ["M.Pharm or equivalent", "Minimum 60% marks", "University Entrance Exam"],
        },
      ],
      icon: <Pill className="w-5 h-5" />,
      color: "bg-indigo-100 text-indigo-800",
      borderColor: "border-indigo-200",
      bgColor: "from-indigo-50 to-indigo-100",
      buttonColor: "from-indigo-600 to-indigo-800 hover:from-indigo-700 hover:to-indigo-900",
      institute: "Lucknow Institute of Pharmacy"
    },
    {
      id: 7,
      title: "Sports Science",
      description: "Programs in sports science and research",
      degrees: [
        {
          name: "BS in Sports Science",
          duration: "3 Years",
          fee: "₹85,000/yr",
          mode: "Regular",
          criteria: ["10+2 from recognized board", "Minimum 45% marks", "Sports background preferred"],
        },
        {
          name: "BS in Sports Nutrition",
          duration: "3 Years",
          fee: "₹90,000/yr",
          mode: "Regular",
          criteria: ["10+2 with Science subjects", "Minimum 45% marks"],
        },
        {
          name: "BS in Sports Psychology",
          duration: "3 Years",
          fee: "₹85,000/yr",
          mode: "Regular",
          criteria: ["10+2 from recognized board", "Minimum 45% marks"],
        },
        {
          name: "MS in Sports Science",
          duration: "2 Years",
          fee: "₹95,000/yr",
          mode: "Regular",
          criteria: [
            "Bachelor's degree in any discipline",
            "Minimum 50% marks",
          ],
        },
        {
          name: "MS in Sports Medicine",
          duration: "2 Years",
          fee: "₹1,00,000/yr",
          mode: "Regular",
          criteria: [
            "Bachelor's degree in Medical/Science field",
            "Minimum 55% marks",
          ],
        },
        {
          name: "Diploma in Sports Coaching",
          duration: "1 Year",
          fee: "₹60,000",
          mode: "Regular",
          criteria: ["10+2 from recognized board", "Sports background required"],
        },
        {
          name: "Certificate in Sports Management",
          duration: "6 Months",
          fee: "₹40,000",
          mode: "Regular",
          criteria: ["10+2 from recognized board"],
        },
      ],
      icon: <Dumbbell className="w-5 h-5" />,
      color: "bg-orange-100 text-orange-800",
      borderColor: "border-orange-200",
      bgColor: "from-orange-50 to-orange-100",
      buttonColor: "from-orange-600 to-orange-800 hover:from-orange-700 hover:to-orange-900",
      institute: "Saroj Institute of Sports Science & Research"
    },
    {
      id: 8,
      title: "Film & Fashion",
      description: "Creative programs in film, fashion, and media",
      degrees: [
        {
          name: "B.Sc in Film Making",
          duration: "3 Years",
          fee: "₹95,000/yr",
          mode: "Regular",
          criteria: ["10+2 from recognized board", "Minimum 45% marks", "Portfolio review"],
        },
        {
          name: "B.Sc in Cinematography",
          duration: "3 Years",
          fee: "₹1,00,000/yr",
          mode: "Regular",
          criteria: ["10+2 from recognized board", "Minimum 45% marks", "Portfolio review"],
        },
        {
          name: "BA in Acting",
          duration: "3 Years",
          fee: "₹90,000/yr",
          mode: "Regular",
          criteria: ["10+2 from recognized board", "Minimum 45% marks", "Audition required"],
        },
        {
          name: "BA in Journalism & Mass Communication",
          duration: "3 Years",
          fee: "₹85,000/yr",
          mode: "Regular",
          criteria: ["10+2 from recognized board", "Minimum 45% marks"],
        },
        {
          name: "BA in Public Relations",
          duration: "3 Years",
          fee: "₹85,000/yr",
          mode: "Regular",
          criteria: ["10+2 from recognized board", "Minimum 45% marks"],
        },
        {
          name: "Diploma in Film Making",
          duration: "1 Year",
          fee: "₹80,000",
          mode: "Regular",
          criteria: ["10+2 from recognized board", "Minimum 45% marks"],
        },
        {
          name: "Diploma in Acting",
          duration: "1 Year",
          fee: "₹75,000",
          mode: "Regular",
          criteria: ["10+2 from recognized board", "Minimum 45% marks", "Audition required"],
        },
        {
          name: "M.Sc in Film Making",
          duration: "2 Years",
          fee: "₹1,10,000/yr",
          mode: "Regular",
          criteria: [
            "Bachelor's degree in any discipline",
            "Minimum 50% marks",
            "Portfolio review",
          ],
        },
        {
          name: "M.Sc in Cinematography",
          duration: "2 Years",
          fee: "₹1,15,000/yr",
          mode: "Regular",
          criteria: [
            "Bachelor's degree in any discipline",
            "Minimum 50% marks",
            "Portfolio review",
          ],
        },
        {
          name: "MA in Journalism",
          duration: "2 Years",
          fee: "₹90,000/yr",
          mode: "Regular",
          criteria: [
            "Bachelor's degree in any discipline",
            "Minimum 50% marks",
          ],
        },
      ],
      icon: <Film className="w-5 h-5" />,
      color: "bg-pink-100 text-pink-800",
      borderColor: "border-pink-200",
      bgColor: "from-pink-50 to-pink-100",
      buttonColor: "from-pink-600 to-pink-800 hover:from-pink-700 hover:to-pink-900",
      institute: "Saroj Institute of Film & Fashion"
    },
    {
      id: 9,
      title: "Saroj Institute of Law",
      description: "Comprehensive law degree programs with practical training",
      degrees: [
        {
          name: "BA LLB (Hons)",
          duration: "5 Years",
          fee: "₹80,000/yr",
          mode: "Regular",
          criteria: [
            "10+2 from recognized board",
            "Minimum 45% marks",
            "CLAT/LSAT/University Entrance Exam",
          ],
        },
      ],
      icon: <Gavel className="w-5 h-5" />,
      color: "bg-teal-100 text-teal-800",
      borderColor: "border-teal-200",
      bgColor: "from-teal-50 to-teal-100",
      buttonColor: "from-teal-600 to-teal-800 hover:from-teal-700 hover:to-teal-900",
      institute: "Saroj Institute of Law"
    },
  ];

  const [activeTab, setActiveTab] = useState(programs[0].id);
  const [hoveredProgram, setHoveredProgram] = useState(null);
  const [isAutoRotating, setIsAutoRotating] = useState(false);
  const [expandedDegree, setExpandedDegree] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Filter programs based on search term
  const filteredPrograms = programs.filter(program =>
    program.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    program.institute.toLowerCase().includes(searchTerm.toLowerCase()) ||
    program.degrees.some(degree => 
      degree.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // Calculate counts
  const totalProgramsCount = programs.reduce((total, program) => total + program.degrees.length, 0);
  const totalFilteredProgramsCount = filteredPrograms.reduce((total, program) => total + program.degrees.length, 0);
  
  // Calculate program types
  const undergradCount = programs.reduce((total, program) => 
    total + program.degrees.filter(deg => 
      deg.name.includes('B.') || deg.name.includes('BA') || deg.name.includes('B.Sc') || 
      deg.name.includes('B.Com') || deg.name.includes('BCA') || deg.name.includes('B.Pharm') || 
      deg.name.includes('BS') || deg.name.includes('B.Ed')
    ).length, 0
  );
  
  const postgradCount = programs.reduce((total, program) => 
    total + program.degrees.filter(deg => 
      deg.name.includes('M.') || deg.name.includes('MA') || deg.name.includes('M.Sc') || 
      deg.name.includes('M.Com') || deg.name.includes('MCA') || deg.name.includes('M.Pharm') || 
      deg.name.includes('MS') || deg.name.includes('MBA') || deg.name.includes('M.Ed')
    ).length, 0
  );
  
  const doctorateCount = programs.reduce((total, program) => 
    total + program.degrees.filter(deg => deg.name.includes('PhD')).length, 0
  );
  
  const diplomaCount = programs.reduce((total, program) => 
    total + program.degrees.filter(deg => 
      deg.name.includes('Diploma') || deg.name.includes('Certificate')
    ).length, 0
  );

  // Auto-rotation effect - updated to use filteredPrograms
  useEffect(() => {
    if (isAutoRotating && filteredPrograms.length > 0) {
      const interval = setInterval(() => {
        setActiveTab((prev) => {
          const currentIndex = filteredPrograms.findIndex((p) => p.id === prev);
          const nextIndex = (currentIndex + 1) % filteredPrograms.length;
          return filteredPrograms[nextIndex].id;
        });
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isAutoRotating, filteredPrograms]);

  const currentProgram = filteredPrograms.find((program) => program.id === activeTab);

  const toggleDegreeExpand = (index) => {
    setExpandedDegree(expandedDegree === index ? null : index);
  };

  // Reset active tab when search results change
  useEffect(() => {
    if (filteredPrograms.length > 0 && !filteredPrograms.find(p => p.id === activeTab)) {
      setActiveTab(filteredPrograms[0].id);
    }
  }, [filteredPrograms, activeTab]);

  return (
    <section className="py-16 bg-blue-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12 max-w-7xl mx-auto"
        >
          <h1 className="text-4xl md:text-5xl font-funneldisplay font-bold text-gray-900 mb-4">
            Saroj International University
          </h1>
          <p className="text-xl md:text-2xl font-funneldisplay text-gray-700 mb-6">
            Explore {totalProgramsCount}+ programs across {programs.length} institutes
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search programs by name, specialization, or institute..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            </div>
          </div>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Program Categories - Left Side */}
          <div className="lg:w-1/3">
            <div
              className="mb-4 p-3 bg-white rounded-lg shadow-sm border border-gray-200 flex justify-between items-center"
              onMouseEnter={() => setIsAutoRotating(false)}
              onMouseLeave={() => setIsAutoRotating(true)}
            >
              <span className="font-medium text-gray-700 flex items-center gap-2 text-sm">
                <Hand className="w-4 h-4" />
                Program Categories ({filteredPrograms.length})
              </span>
              <button
                onClick={() => setIsAutoRotating(!isAutoRotating)}
                className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 transition-all ${
                  isAutoRotating
                    ? "bg-blue-100 text-blue-800"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {isAutoRotating ? (
                  <>
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                    </span>
                    Auto
                  </>
                ) : (
                  "Manual"
                )}
              </button>
            </div>

            <div className="space-y-2 max-h-[800px] overflow-y-auto pr-2 custom-scrollbar">
              {filteredPrograms.map((program) => (
                <motion.div
                  key={program.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <button
                    onClick={() => {
                      setActiveTab(program.id);
                      setIsAutoRotating(false);
                      setExpandedDegree(null);
                    }}
                    onMouseEnter={() => setHoveredProgram(program.id)}
                    onMouseLeave={() => setHoveredProgram(null)}
                    className={`w-full text-left p-3 rounded-lg transition-all duration-300 flex items-center gap-3 border
                      ${
                        activeTab === program.id
                          ? `${program.color} shadow-md border-transparent`
                          : `bg-white hover:bg-gray-50 ${program.borderColor}`
                      }
                      ${
                        hoveredProgram === program.id &&
                        hoveredProgram !== activeTab
                          ? "ring-2 ring-opacity-50 ring-gray-300"
                          : ""
                      }
                      ${program.id === 9 ? 'border-2 border-teal-300' : ''}`}
                  >
                    <div
                      className={`p-2 rounded-lg ${
                        activeTab === program.id
                          ? "bg-white text-blue-700"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {program.icon}
                    </div>
                    <div className="text-left flex-1 min-w-0">
                      <span className="font-medium text-sm block truncate">
                        {program.title}
                        {program.id === 9 && (
                          <span className="ml-1 text-xs bg-teal-500 text-white px-1.5 py-0.5 rounded-full">New</span>
                        )}
                      </span>
                      <span className="text-xs text-gray-500 line-clamp-1">
                        {program.institute}
                      </span>
                    </div>
                    <span
                      className={`ml-auto text-xs font-medium px-2 py-1 rounded-full ${
                        activeTab === program.id
                          ? "bg-white text-blue-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {program.degrees.length} programs
                    </span>
                  </button>
                </motion.div>
              ))}
            </div>

            {/* Statistics */}
            <div className="mt-6 p-4 bg-white rounded-lg border border-gray-200">
              <h3 className="font-semibold text-gray-800 mb-3">Program Statistics</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Institutes:</span>
                  <span className="font-medium">{programs.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Programs:</span>
                  <span className="font-medium">{totalProgramsCount}+</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Undergraduate:</span>
                  <span className="font-medium">{undergradCount}+ programs</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Postgraduate:</span>
                  <span className="font-medium">{postgradCount}+ programs</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Doctorate:</span>
                  <span className="font-medium">{doctorateCount}+ programs</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Diploma/Certificate:</span>
                  <span className="font-medium">{diplomaCount}+ programs</span>
                </div>
              </div>
            </div>

            {/* Explore All Programs Button */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="mt-6"
            >
              <Link
                to="/programs"
                className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white rounded-lg transition-all shadow-md hover:shadow-lg font-medium text-sm"
              >
                Explore All Programs
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>

          {/* Program Details - Right Side */}
          <div className="lg:w-2/3">
            <AnimatePresence mode="wait">
              {currentProgram && (
                <motion.div
                  key={currentProgram.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-xl shadow-lg overflow-hidden h-full border border-gray-200"
                >
                  <div
                    className={`p-5 ${currentProgram.color} flex items-start gap-4`}
                  >
                    <div className="p-2 rounded-lg bg-white text-blue-700 shadow-sm">
                      {currentProgram.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900">
                            {currentProgram.title}
                          </h3>
                          <p className="text-xs opacity-90 mt-1">
                            {currentProgram.description}
                          </p>
                        </div>
                        {currentProgram.id === 9 && (
                          <span className="bg-teal-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                            New Institute
                          </span>
                        )}
                      </div>
                      {currentProgram.institute && (
                        <div className="mt-2 flex items-center gap-1 text-xs text-gray-700">
                          <School className="w-3 h-3" />
                          <span className="font-medium">{currentProgram.institute}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="p-5">
                    <div className="grid md:grid-cols-2 gap-4">
                      {currentProgram.degrees.map((degree, index) => (
                        <motion.div
                          key={index}
                          whileHover={{ y: -3 }}
                          className={`border rounded-lg p-4 transition-all shadow-sm ${
                            expandedDegree === index
                              ? `bg-gradient-to-b ${currentProgram.bgColor} border-transparent shadow-md`
                              : "bg-white border-gray-200 hover:shadow-md"
                          }`}
                        >
                          <div
                            className="cursor-pointer"
                            onClick={() => toggleDegreeExpand(index)}
                          >
                            <div className="flex justify-between items-start gap-2">
                              <h4 className="font-semibold text-base mb-1 text-gray-800">
                                {degree.name}
                              </h4>
                              <span
                                className={`text-xs px-2 py-1 rounded-full ${
                                  degree.mode.includes("Global")
                                    ? "bg-green-100 text-green-800"
                                    : "bg-gray-100 text-gray-800"
                                }`}
                              >
                                {degree.mode}
                              </span>
                            </div>
                            <div className="flex justify-between text-xs text-gray-600 mb-2">
                              <span className="flex items-center gap-1">
                                <BookOpen className="w-3 h-3 opacity-70" />
                                {degree.duration}
                              </span>
                              <span className="flex items-center gap-1">
                                <GraduationCap className="w-3 h-3 opacity-70" />
                                {degree.fee}
                              </span>
                            </div>
                          </div>

                          <AnimatePresence>
                            {expandedDegree === index && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.2 }}
                                className="overflow-hidden"
                              >
                                <div className="mt-2 pt-2 border-t border-gray-200">
                                  <h5 className="font-semibold text-xs flex items-center gap-2 mb-1 text-gray-700">
                                    <ClipboardList className="w-3 h-3" />
                                    Eligibility Criteria
                                  </h5>
                                  <ul className="space-y-1 text-xs text-gray-700">
                                    {degree.criteria.map((item, i) => (
                                      <li
                                        key={i}
                                        className="flex items-start gap-2"
                                      >
                                        <span className="text-green-500 mt-0.5">
                                          ✓
                                        </span>
                                        <span>{item}</span>
                                      </li>
                                    ))}
                                  </ul>
                                  {degree.features && (
                                    <div className="mt-3">
                                      <h5 className="font-semibold text-xs flex items-center gap-2 mb-1 text-gray-700">
                                        <UserCheck className="w-3 h-3" />
                                        Key Features
                                      </h5>
                                      <ul className="space-y-1 text-xs text-gray-700">
                                        {degree.features.map((feature, i) => (
                                          <li
                                            key={i}
                                            className="flex items-start gap-2"
                                          >
                                            <span className="text-blue-500 mt-0.5">
                                              •
                                            </span>
                                            <span>{feature}</span>
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                  )}
                                </div>
                                <a
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  href="https://siu.in8.nopaperforms.com/"
                                >
                                  <button
                                    className={`mt-3 w-full py-1.5 bg-gradient-to-r ${currentProgram.buttonColor} text-white rounded-md transition-all flex items-center justify-center gap-1 shadow-md hover:shadow-lg font-medium text-sm`}
                                  >
                                    Apply Now
                                    <ChevronRight className="w-3 h-3" />
                                  </button>
                                </a>
                              </motion.div>
                            )}
                          </AnimatePresence>

                          {expandedDegree !== index && (
                            <button
                              className="mt-2 w-full py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-md transition-colors flex items-center justify-center gap-1 text-xs font-medium"
                              onClick={() => toggleDegreeExpand(index)}
                            >
                              View Details
                              <ChevronRight className="w-3 h-3" />
                            </button>
                          )}
                        </motion.div>
                      ))}
                    </div>

                    <div className="mt-6 bg-gradient-to-br from-gray-50 to-gray-100 p-4 rounded-lg border border-gray-200">
                      <h4 className="font-bold text-lg mb-3 text-gray-800 flex items-center gap-2">
                        <div className="p-1.5 rounded-lg bg-blue-100 text-blue-700">
                          <UserCheck className="w-4 h-4" />
                        </div>
                        Admission Process Overview
                      </h4>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <h5 className="font-semibold mb-2 text-gray-700 flex items-center gap-2 text-sm">
                            <span className="w-4 h-4 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs">
                              1
                            </span>
                            Regular Mode
                          </h5>
                          <ul className="space-y-2 text-xs text-gray-700">
                            <li className="flex items-start gap-2">
                              <div className="bg-blue-100 text-blue-800 rounded-full p-0.5 flex-shrink-0 mt-0.5">
                                <span className="text-xs font-bold">1</span>
                              </div>
                              <span>
                                Submit online application with required documents
                              </span>
                            </li>
                            <li className="flex items-start gap-2">
                              <div className="bg-blue-100 text-blue-800 rounded-full p-0.5 flex-shrink-0 mt-0.5">
                                <span className="text-xs font-bold">2</span>
                              </div>
                              <span>
                                Appear for entrance exam (if applicable)
                              </span>
                            </li>
                            <li className="flex items-start gap-2">
                              <div className="bg-blue-100 text-blue-800 rounded-full p-0.5 flex-shrink-0 mt-0.5">
                                <span className="text-xs font-bold">3</span>
                              </div>
                              <span>
                                Attend personal interview/counseling session
                              </span>
                            </li>
                          </ul>
                        </div>
                        <div>
                          <h5 className="font-semibold mb-2 text-gray-700 flex items-center gap-2 text-sm">
                            <span className="w-4 h-4 rounded-full bg-green-600 text-white flex items-center justify-center text-xs">
                              2
                            </span>
                            Global Mode
                          </h5>
                          <ul className="space-y-2 text-xs text-gray-700">
                            <li className="flex items-start gap-2">
                              <div className="bg-green-100 text-green-800 rounded-full p-0.5 flex-shrink-0 mt-0.5">
                                <span className="text-xs font-bold">1</span>
                              </div>
                              <span>Complete regular admission process</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <div className="bg-green-100 text-green-800 rounded-full p-0.5 flex-shrink-0 mt-0.5">
                                <span className="text-xs font-bold">2</span>
                              </div>
                              <span>
                                Submit additional documents for international study
                              </span>
                            </li>
                            <li className="flex items-start gap-2">
                              <div className="bg-green-100 text-green-800 rounded-full p-0.5 flex-shrink-0 mt-0.5">
                                <span className="text-xs font-bold">3</span>
                              </div>
                              <span>Complete visa and travel formalities</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="mt-4 flex flex-col sm:flex-row gap-2">
                        <a
                          href="https://siu.in8.nopaperforms.com/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`flex-1 px-4 py-2 bg-gradient-to-r ${currentProgram.buttonColor} text-white rounded-md transition-all flex items-center justify-center gap-1 shadow-md hover:shadow-lg font-medium text-sm`}
                        >
                          Start Application
                          <ArrowRight className="w-4 h-4" />
                        </a>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #c1c1c1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #a8a8a8;
        }
      `}</style>
    </section>
  );
};

export default ProgramsSection;