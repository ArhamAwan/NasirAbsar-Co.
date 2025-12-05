import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  Factory,
  Heart,
  GraduationCap,
  Building,
  ShoppingCart,
  Briefcase,
  Mountain,
  Zap,
  Award,
  Users,
  TrendingUp,
  Globe,
  CheckCircle,
  Monitor,
} from "lucide-react";
// Removed getVercelOptimizedImage import - using direct paths for Vercel auto-optimization

const placeholderImg = "https://via.placeholder.com/200x120?text=Logo";

const Clients: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState(0);

  // Logo mapping for non-profit organizations
  const nonProfitLogos: { [key: string]: string } = {
    "National Testing Service - Pakistan (NTS)":
      "/non-profit/National Testing Service - Pakistan (NTS).png",
    "Muslim Aid, UK": "/non-profit/Muslim Aid, UK.png",
    "HelpAge International, UK": "/non-profit/HelpAge International , UK.png",
    "Consumer Rights Commission of Pakistan":
      "/non-profit/Consumer Rights Commission of Pakistan.png",
    "Michigan State University (MSU), USA":
      "/non-profit/Michigan_State_University.png",
    "Federation of Islamic Medical Associations":
      "/non-profit/Federation of Islamic Medical Associations.png",
    "Institute of Social & Policy Sciences (I-SAPS)":
      "/non-profit/Institute of Social & Policy Sciences (I-SAPS).png",
    "Islamic International Medical College Trust, Rawalpindi":
      "/non-profit/Islamic International Medical College Trust,.png",
    "Pakistan Islamic Medical Associations (PIMA)":
      "/non-profit/Pakistan Islamic Medical Associations (PIMA).png",
    "International Brotherhood Organization":
      "/non-profit/International Brotherhood Organization.png",
    "Madinah Foundation": "/non-profit/Madinah Foundation.png",
    "Khubaib Foundation": "/non-profit/Khubaib Foundation.png",
    "MEHARGARH Centre of Learning":
      "/non-profit/MEHARGARH centre of Learning.png",
    "Pak-China Institute": "/non-profit/Pak-China Institute.png",
    "SAACH Foundation": "/non-profit/SAACH Foundation.png",
    "Noor Educational & Economic Development (NEED) Foundation":
      "/non-profit/Noor Educational & Economic Development.jpg",
    "Task Force for Global Health, USA":
      "/non-profit/Task Force for Global Health, USA.png",
    "USAID several Projects in Pakistan": "/non-profit/USAID.png",
    "DEFID several Projects in Pakistan": "/non-profit/DEFID.jpg",
    "American Institute for Research (AIR)":
      "/non-profit/American Institute for Research (AIR).png",
    FELTP: "/non-profit/FELTP .png",
  };

  // Logo mapping for manufacturing organizations
  const manufacturingLogos: { [key: string]: string } = {
    "Apex Polymers (Pvt) Limited":
      "/manufacturing/Apex Polymers (Pvt) Limited.png",
    "Apex Industries (Pvt) Limited": "/manufacturing/APEX.png",
    "Decent Furnishers (Pvt) Limited":
      "/manufacturing/Decent Furnishers (Pvt) Limited.png",
    "JX Compressors (Private) Limited":
      "/manufacturing/JX Compressors (Private) Limited.png",
    "Suhail Jute Mills Limited (Listed Company)":
      "/manufacturing/Suhail Jute Mills Limited .png",
    "Madina Group of Industries":
      "/manufacturing/Madina Group of Industries.png",
    "Hamza Sugar Mills Limited": "/manufacturing/Hamza Sugar Mills Limited.png",
    "Kisan Ghee Mills": "/manufacturing/Kisan Ghee Mills .png",
    "Sunlight Pakistan": "/manufacturing/Sunlight Pakistan.png",
    "SIGMA Motors Limited": "/manufacturing/SIGMA Motors Limited.png",
    "Chiniot Safety Fuse Manufacturing Company":
      "/manufacturing/Chiniot Safety Fuse Manufacturing Company.png",
    "Filix Pharmaceuticals (Private) Limited":
      "/manufacturing/Filix Pharmaceuticals (Private) Limited.png",
    "Leads Pharma (Private) Limited":
      "/manufacturing/Leads Pharma (Private) Limited.jpeg",
    "Murgh Brand Masalajat": "/manufacturing/Murgh Brand Masalajat.png",
    "Pakistan Steel Mills": "/manufacturing/Pakistan Steel Mills.png",
    "Saibins Pharmaceuticals": "/manufacturing/Saibins Pharmaceuticals.jpg",
  };

  // Logo mapping for educational institutions
  const educationLogos: { [key: string]: string } = {
    "COMSATS Institute of Information Technology (CIIT)":
      "/education/COMSATS Institute of Information.jpg",
    "Riphah International University, Islamabad":
      "/education/Riphah International University, Islamabad.png",
    "The University of Faisalabad":
      "/education/The University of Faisalabad.png",
    "Abasyn University": "/education/Abasyn University.png",
    "Iqra University, Karachi": "/education/Iqra University, Karachi.png",
    "Islamic International Medical & Dental College":
      "/education/Islamic International Medical & Dental.png",
    "University Medical & Dental College, Faisalabad":
      "/education/University Medical & Dental College.png",
    "RAK College of Dental Sciences, UAE":
      "/education/RAK College of Dental Sciences, UAE.png",
    "Connoisseur Grammar School": "/education/Connoisseur Grammar School.png",
    "Askaria College, Rawalpindi": "/education/Askaria College, Rawalpindi.png",
    "Cadet College Hummak, Islamabad":
      "/education/Cadet College Hummak, Islamabad.png",
    "University Cambridge School, Faisalabad":
      "/education/University Cambridge School, Faisalabad.png",
    "Swedish College of Engineering & Technology":
      "/education/Swedish College of Engineering & Technology.png",
    "Siddique Public School": "/education/Siddique Public School.png",
    "Muslim Youth University": "/education/Muslim Youth University.png",
    "Aeo Pakistan": "/education/Aeo Pakistan.png",
    EBC: "/education/EBC.jpg",
    FLS: "/education/FLS.png",
    Mentors: "/education/Mentors.jpg",
    Sirsyed: "/education/Sirsyed.png",
    "Trillium Montessori": "/education/Trillium montessori.jpg",
  };

  // Logo mapping for health sector organizations
  const healthLogos: { [key: string]: string } = {
    "Pakistan Railways Hospital, Rawalpindi":
      "/health/Pakistan Railways Hospital, Rawalpindi.png",
    "IIDC Hospital, Islamabad": "/health/IIDC Hospital, Islamabad.png",
    "Max Health Hospital, Islamabad":
      "/health/Max Health Hospital, Islamabad.png",
    "PIMA Hospital": "/health/PIMA Hospital.png",
    "Raazi Hospital, Rawalpindi (Project of Al-Khidmat Foundation)":
      "/health/Raazi Hospital, Rawalpindi.png",
    "Riphah International Hospital, Islamabad":
      "/health/Riphah International Hospital, Islamabad.png",
    "Pak Red Crescent Hospital, Lahore":
      "/health/Pak Red Crescent Hospital, Lahore.png",
    "Prime Health Pharma (Pvt) Limited":
      "/health/Prime Health Pharma (Pvt) Limited.png",
    "Apex Industries (Private) Limited": "/health/Apex Industries pvt ltd.jfif",
    "Filix Pharmaceuticals (Private) Limited":
      "/health/Filix Pharmaceuticals (Private) Limited.png",
    "Leads Pharma (Private) Limited":
      "/health/Leads Pharma (Private) Limited.jfif",
    "Saibins Pharmaceuticals": "/health/Saibins Pharmaceuticals.png",
  };

  // Logo mapping for construction organizations
  const constructionLogos: { [key: string]: string } = {
    "Suckh Chain Vellay (Pvt) Limited":
      "/construction/Suckh Chain Vellay (Pvt) Limited.png",
    "Such Chain Garden (Pvt) Limited":
      "/construction/Such Chain Garden (Pvt) Limited.jpg",
    "Islamabad Corporative Housing Society":
      "/construction/Islamabad Corporative Housing Society .png",
    "Istanbul International": "/construction/Istanbul International.png",
    "Built Robust": "/construction/Built Robust.png",
    "AKRON (Pvt) Limited": "/construction/AKRON (Pvt) Limited.png",
    "Perfect Builders": "/construction/Perfect Builders.png",
    "LAC (PVT) LTD": "/construction/LAC (PVT) LTD.png",
    "Aaj Sons (Pvt) Limited": "/construction/Aaj Sons (Pvt) Limited.png",
    "Ultracon (Pvt) Ltd": "/construction/Ultracon (Pvt) Ltd.png",
    "APEX Homes (Pvt) Ltd.": "/construction/APEX Homes (Pvt) Ltd..png",
    "J7 Group": "/construction/J7 Group.png",
    "Tahir Builders (Pvt) Limited":
      "/construction/Tahir Builders (Pvt) Limited.png",
    "Faatir Engineers (Pvt) Limited":
      "/construction/Faatir Engineers (Pvt) Limited.png",
    "Abul Qasim Builders & Developers":
      "/construction/Abul Qasim Builders & Developers.jpg",
    "Haadi Developers": "/construction/Haadi Developers.jpg",
  };

  // Logo mapping for trading sector organizations
  const tradingLogos: { [key: string]: string } = {
    "Al-Karam International, Rawalpindi":
      "/trading/Al-Karam International, Rawalpindi.png",
    "APEX Trading International (Private) Limited":
      "/trading/APEX Trading International (Private) Limited.png",
    "AHA Trading (Pvt) Limited":
      "/trading/American Gardens - Sole Distributor.jpg",
    "Sigma Motors Limited": "/trading/Sigma Motors Limited.png",
    "Sky Traders": "/trading/Sky Traders.png",
    "M.N. Traders": "/trading/MN traders.png",
    "Islamabad Distributors (Pvt) Ltd": "/trading/Nishat Linen.jpg",
    "Islamabad Pharma": "/trading/Islamabad Pharma.png",
    "Khyber Electric Co. (Pvt) Limited":
      "/trading/Khyber Electric Co. (Pvt) Limited.png",
    "Multitech Engineers, UK": "/trading/Multitech Engineers, UK.png",
    "Gillion Pharmacy, Lahore": "/trading/Khaadi.jpg",
    "SMS Pakistan": "/trading/SMS Pakistan.jpg",
    "IMCO Technologies (Pvt) Limited":
      "/trading/IMCO Technologies (Pvt) Limited.png",
    "City Supermarket, Rawalpindi": "/trading/Family cash and carry.png",
    "Family Cash & Carry (FCC)": "/trading/Family cash and carry.png",
  };

  // Logo mapping for services sector organizations
  const servicesLogos: { [key: string]: string } = {
    "Royal Airport Services (Pvt) Limited":
      "/services/imagesRoyal Airport Services (Pvt) Limited.png",
    "Royal Ease Travel (Pvt) Limited": "/services/RAS.jpg",
    "AH Aviation (Pvt) Limited": "/services/AH Aviation (Pvt) Limited.png",
    "Appolo Telecom (Pvt) Limited":
      "/services/Appolo Telecom (Pvt) Limited.png",
    "Baarik Travels (Pvt) Limited":
      "/services/Baarik Travels (Pvt) Limited.png",
    "Al-Fursan Travels (Pvt) Limited":
      "/services/Al-Fursan Travels (Pvt) Limited.png",
    "Qutbain International (Pvt) Limited":
      "/services/Qutbain International (Pvt) Limited.png",
    "Dedar-e Madina (Pvt) Limited":
      "/services/Dedar-e Madina (Pvt) Limited.png",
    "Arjumand And Associates (AAA) (World Bank Consultant)":
      "/services/Designmen.jpg",
    "DAMCON Engineering Solutions (Pvt) Ltd":
      "/services/DAMCON Engineering Solutions (Pvt) Ltd.png",
    "Buzzard Securities (Pvt) Limited":
      "/services/Buzzard Securities (Pvt) Limited.png",
    "CFC Consultant (Pvt) Limited":
      "/services/CFC Consultant (Pvt) Limited.png",
    "ITC Communications (Pvt) Limited":
      "/services/ITC Communications (Pvt) Limited.png",
    "Telezone Communication":
      "/services/Telezone Communication (Pvt) Limited.png",
    "MAXNET (Pvt) Limited": "/services/MAXNET (Pvt) Limited.png",
    "SELECTUM (Pvt) Limited": "/services/SELECTUM (Pvt) Limited.png",
    "Seven Software Development (Pvt) Limited":
      "/services/Seven Software Development (Pvt) Limited.png",
    "Converge Enterprise Services (Pvt) Limited":
      "/services/Converge Enterprise Services (Pvt) Limited.png",
    "Al-Khaleej Exchange Company – B (Pvt) Ltd":
      "/services/Echo Oil (Private) Limited.jpg",
    "Perception Safety Solutions (Pvt) Ltd":
      "/services/Skyways H. J (Private) Limited.jpeg",
  };

  // Logo mapping for mining organizations
  const miningLogos: { [key: string]: string } = {
    "AJK Coal Mining Company (Private) Limited":
      "/mining/AJK Coal Mining Company (Private) Limited.png",
    "South Asia Mining Company (Private) Limited":
      "/mining/South Asia Mining Company (Private) Limited.png",
    "SGB Mining (Pvt) Limited": "/mining/SGB Mining (Pvt) Limited.png",
    "Apex Industries": "/mining/Apex Industries.png",
  };

  // Logo mapping for power sector organizations
  const powerLogos: { [key: string]: string } = {
    "Farooq Energy Company (Pvt) Limited (FARENCO) (500 MW Hydro Power Project, Chakkoti)":
      "/power/Farooq Energy Company.png",
    "Neelum Green Energy (Pvt) Limited (49 MW Hydro Power Project, Luat)":
      "/power/images.png",
    "Green Energy (Private) Limited (3 MW Raili-III Hydro Power Project)":
      "/power/images (1).png",
    "Karimi Energy (Pvt.) Ltd. (4.3 MW Jabri Bedar Hydro Power Project)":
      "/power/Karimi Energy (Pvt.) Ltd.png",
    "(SHYDO), NWFP": "/power/SHYDO), NWFP.png",
    "Agha Khan Rural Support Programme (AKRSP)":
      "/power/Agha Khan Rural Support Programme (AKRSP).png",
    PAEC: "/power/PAEC.logo.png",
    "S.K. Hydro Consortium": "/power/SK-HYDRO.png",
  };

  // Logo mapping for IT organizations
  const itLogos: { [key: string]: string } = {
    "J Telemarketing": "/IT/J telemarketing.png",
    "Newage Management (Pvt) Ltd": "/IT/Newage Management (Pvt) LTd.png",
    "Seven Soft (Pvt) Ltd": "/IT/Seven Soft (Pvt) Ltd.webp",
    "Simplicity Technologies (Pvt) Ltd":
      "/IT/Simplicity Technologies (Pvt) Ltd.jpg",
    "Siparadigm Diagnostic Informatics (Pvt) Limited":
      "/IT/Siparadigm Diagnostic Informatics (Pvt) limited.png",
    "Veyn (Private) Limited": "/IT/Veyn (Private) Limited.jpeg",
    "We are Nova (Pvt) Ltd": "/IT/We are Nova (Pvt) Ltd.webp",
  };

  // Color mapping for category buttons
  const getCategoryColor = (title: string) => {
    const colorMap: {
      [key: string]: {
        bg: string;
        hover: string;
        border: string;
        text: string;
        icon: string;
        hoverIcon: string;
      };
    } = {
      Manufacturing: {
        bg: "bg-gray-600",
        hover: "hover:bg-gray-700",
        border: "border-gray-500",
        text: "text-white",
        icon: "text-white",
        hoverIcon: "group-hover:text-gray-600",
      },
      "Non-Profit": {
        bg: "bg-green-600",
        hover: "hover:bg-green-700",
        border: "border-green-500",
        text: "text-white",
        icon: "text-white",
        hoverIcon: "group-hover:text-green-600",
      },
      "Health Sector": {
        bg: "bg-blue-600",
        hover: "hover:bg-blue-700",
        border: "border-blue-500",
        text: "text-white",
        icon: "text-white",
        hoverIcon: "group-hover:text-blue-600",
      },
      "Educational Institutions": {
        bg: "bg-purple-600",
        hover: "hover:bg-purple-700",
        border: "border-purple-500",
        text: "text-white",
        icon: "text-white",
        hoverIcon: "group-hover:text-purple-600",
      },
      Construction: {
        bg: "bg-orange-600",
        hover: "hover:bg-orange-700",
        border: "border-orange-500",
        text: "text-white",
        icon: "text-white",
        hoverIcon: "group-hover:text-orange-600",
      },
      "Trading Sector": {
        bg: "bg-emerald-600",
        hover: "hover:bg-emerald-700",
        border: "border-emerald-500",
        text: "text-white",
        icon: "text-white",
        hoverIcon: "group-hover:text-emerald-600",
      },
      Services: {
        bg: "bg-teal-600",
        hover: "hover:bg-teal-700",
        border: "border-teal-500",
        text: "text-white",
        icon: "text-white",
        hoverIcon: "group-hover:text-teal-600",
      },
      Mining: {
        bg: "bg-stone-700",
        hover: "hover:bg-stone-800",
        border: "border-stone-600",
        text: "text-white",
        icon: "text-white",
        hoverIcon: "group-hover:text-stone-700",
      },
      Power: {
        bg: "bg-yellow-500",
        hover: "hover:bg-yellow-600",
        border: "border-yellow-400",
        text: "text-white",
        icon: "text-white",
        hoverIcon: "group-hover:text-yellow-500",
      },
      IT: {
        bg: "bg-cyan-600",
        hover: "hover:bg-cyan-700",
        border: "border-cyan-500",
        text: "text-white",
        icon: "text-white",
        hoverIcon: "group-hover:text-cyan-600",
      },
    };
    return (
      colorMap[title] || {
        bg: "bg-blue-600",
        hover: "hover:bg-blue-700",
        border: "border-blue-500",
        text: "text-white",
        icon: "text-white",
        hoverIcon: "group-hover:text-blue-600",
      }
    );
  };

  const clientCategories = [
    {
      icon: Factory,
      title: "Manufacturing",
      color: "from-blue-500 to-blue-600",
      clients: [
        "Apex Polymers (Pvt) Limited",
        "(Colony) Sarhad Textiles Mills Limited (Listed Company)",
        "Apex Industries (Pvt) Limited",
        "Decent Furnishers (Pvt) Limited",
        "JX Compressors (Private) Limited",
        "Suhail Jute Mills Limited (Listed Company)",
        "Madina Group of Industries",
        "Hamza Sugar Mills Limited",
        "Kisan Ghee Mills",
        "Sunlight Pakistan",
        "SIGMA Motors Limited",
        "Chiniot Safety Fuse Manufacturing Company",
        "Filix Pharmaceuticals (Private) Limited",
        "Leads Pharma (Private) Limited",
        "Murgh Brand Masalajat",
        "Pakistan Steel Mills",
        "Saibins Pharmaceuticals",
      ],
    },
    {
      icon: Heart,
      title: "Non-Profit",
      color: "from-green-500 to-green-600",
      clients: [
        "National Testing Service - Pakistan (NTS)",
        "Muslim Aid, UK",
        "HelpAge International, UK",
        "Consumer Rights Commission of Pakistan",
        "Michigan State University (MSU), USA",
        "Federation of Islamic Medical Associations",
        "Institute of Social & Policy Sciences (I-SAPS)",
        "Islamic International Medical College Trust, Rawalpindi",
        "Pakistan Islamic Medical Associations (PIMA)",
        "International Brotherhood Organization",
        "Madinah Foundation",
        "Khubaib Foundation",
        "MEHARGARH Centre of Learning",
        "Pak-China Institute",
        "SAACH Foundation",
        "Noor Educational & Economic Development (NEED) Foundation",
        "Task Force for Global Health, USA",
        "USAID several Projects in Pakistan",
        "DEFID several Projects in Pakistan",
      ],
    },
    {
      icon: Heart,
      title: "Health Sector",
      color: "from-red-500 to-red-600",
      clients: [
        "Pakistan Railways Hospital, Rawalpindi",
        "IIDC Hospital, Islamabad",
        "Max Health Hospital, Islamabad",
        "Madina Teaching Hospital, Faisalabad",
        "PIMA Hospital",
        "Raazi Hospital, Rawalpindi (Project of Al-Khidmat Foundation)",
        "Riphah International Hospital, Islamabad",
        "Pak Red Crescent Hospital, Lahore",
        "Prime Health Pharma (Pvt) Limited",
        "Apex Industries (Private) Limited",
        "Filix Pharmaceuticals (Private) Limited",
        "Leads Pharma (Private) Limited",
        "Saibins Pharmaceuticals",
      ],
    },
    {
      icon: GraduationCap,
      title: "Educational Institutions",
      color: "from-purple-500 to-purple-600",
      clients: [
        "COMSATS Institute of Information Technology (CIIT)",
        "Riphah International University, Islamabad",
        "The University of Faisalabad",
        "Abasyn University",
        "Iqra University, Karachi",
        "National Testing Services (NTS)",
        "Islamic International Medical & Dental College",
        "University Medical & Dental College, Faisalabad",
        "RAK College of Dental Sciences, UAE",
        "Connoisseur Grammar School",
        "Askaria College, Rawalpindi",
        "Cadet College Hummak, Islamabad",
        "University Cambridge School, Faisalabad",
        "Swedish College of Engineering & Technology",
        "Muslim Youth University",
        "Siddique Public School",
        "Aeo Pakistan",
        "EBC",
        "FLS",
        "Mentors",
        "Sirsyed",
        "Trillium Montessori",
      ],
    },
    {
      icon: Building,
      title: "Construction",
      color: "from-orange-500 to-orange-600",
      clients: [
        "Suckh Chain Vellay (Pvt) Limited",
        "Such Chain Garden (Pvt) Limited",
        "Islamabad Corporative Housing Society",
        "Istanbul International",
        "Built Robust",
        "AKRON (Pvt) Limited",
        "Perfect Builders",
        "LAC (PVT) LTD",
        "Aaj Sons (Pvt) Limited",
        "Ultracon (Pvt) Ltd",
        "APEX Homes (Pvt) Ltd.",
        "J7 Group",
        "Tahir Builders (Pvt) Limited",
        "Faatir Engineers (Pvt) Limited",
        "Abul Qasim Builders & Developers",
        "Haadi Developers",
      ],
    },
    {
      icon: ShoppingCart,
      title: "Trading Sector",
      color: "from-indigo-500 to-indigo-600",
      clients: [
        "Al-Karam International, Rawalpindi",
        "APEX Trading International (Private) Limited",
        "AHA Trading (Pvt) Limited",
        "Sigma Motors Limited",
        "Sky Traders",
        "M.N. Traders",
        "Islamabad Distributors (Pvt) Ltd",
        "Islamabad Pharma",
        "Khyber Electric Co. (Pvt) Limited",
        "Multitech Engineers, UK",
        "Gillion Pharmacy, Lahore",
        "SMS Pakistan",
        "IMCO Technologies (Pvt) Limited",
        "City Supermarket, Rawalpindi",
        "Family Cash & Carry (FCC)",
        "Dynamic Engineering",
      ],
    },
    {
      icon: Briefcase,
      title: "Services",
      color: "from-blue-500 to-blue-600",
      clients: [
        "Royal Airport Services (Pvt) Limited",
        "Royal Ease Travel (Pvt) Limited",
        "AH Aviation (Pvt) Limited",
        "Appolo Telecom (Pvt) Limited",
        "Baarik Travels (Pvt) Limited",
        "Al-Fursan Travels (Pvt) Limited",
        "Qutbain International (Pvt) Limited",
        "Dedar-e Madina (Pvt) Limited",
        "Arjumand And Associates (AAA) (World Bank Consultant)",
        "DAMCON Engineering Solutions (Pvt) Ltd",
        "Buzzard Securities (Pvt) Limited",
        "CFC Consultant (Pvt) Limited",
        "ITC Communications (Pvt) Limited",
        "Telezone Communication",
        "MAXNET (Pvt) Limited",
        "SELECTUM (Pvt) Limited",
        "Seven Software Development (Pvt) Limited",
        "Converge Enterprise Services (Pvt) Limited",
        "Al-Khaleej Exchange Company – B (Pvt) Ltd",
        "Perception Safety Solutions (Pvt) Ltd",
      ],
    },
    {
      icon: Mountain,
      title: "Mining",
      color: "from-gray-600 to-gray-700",
      clients: [
        "AJK Coal Mining Company (Private) Limited",
        "Pak-Kashmir Mineral Resources (Private) Limited",
        "South Asia Mining Company (Private) Limited",
        "SGB Mining (Pvt) Limited",
        "Apex Industries",
      ],
    },
    {
      icon: Zap,
      title: "Power",
      color: "from-yellow-500 to-yellow-600",
      clients: [
        "Farooq Energy Company (Pvt) Limited (FARENCO) (500 MW Hydro Power Project, Chakkoti)",
        "Neelum Green Energy (Pvt) Limited (49 MW Hydro Power Project, Luat)",
        "Green Energy (Private) Limited (3 MW Raili-III Hydro Power Project)",
        "Karimi Energy (Pvt.) Ltd. (4.3 MW Jabri Bedar Hydro Power Project)",
        "(SHYDO), NWFP",
        "Agha Khan Rural Support Programme (AKRSP)",
        "PAEC",
        "NAPWD",
        "Riali-II Hydro Power Project",
        "Waleed Hydro Project",
        "S.K. Hydro Consortium",
        "BedRock (Pvt.) Ltd. (49.5 MW Gomat Nar Hydro Power Project)",
      ],
    },
    {
      icon: Monitor,
      title: "IT",
      color: "from-cyan-500 to-cyan-600",
      clients: [
        "J Telemarketing",
        "Newage Management (Pvt) Ltd",
        "Seven Soft (Pvt) Ltd",
        "Simplicity Technologies (Pvt) Ltd",
        "Siparadigm Diagnostic Informatics (Pvt) Limited",
        "Veyn (Private) Limited",
        "We are Nova (Pvt) Ltd",
      ],
    },
  ];

  const stats = [
    { icon: Users, value: "200+", label: "Prestigious Clients" },
    { icon: Globe, value: "10", label: "Industry Sectors" },
    { icon: Award, value: "25+", label: "Years of Trust" },
    { icon: TrendingUp, value: "98%", label: "Client Retention" },
  ];

  // Preload all logos from all categories
  useEffect(() => {
    const allLogoMaps = [
      nonProfitLogos,
      manufacturingLogos,
      educationLogos,
      healthLogos,
      constructionLogos,
      tradingLogos,
      servicesLogos,
      miningLogos,
      powerLogos,
      itLogos,
    ];

    // Collect all unique logo paths
    const allLogos = new Set<string>();
    allLogoMaps.forEach((logoMap) => {
      Object.values(logoMap).forEach((logoPath) => {
        if (
          logoPath &&
          !logoPath.startsWith("data:") &&
          !logoPath.startsWith("http")
        ) {
          allLogos.add(logoPath);
        }
      });
    });

    // Preload all logos with priority: first 20 logos get high priority, others get low
    let logoIndex = 0;
    allLogos.forEach((logoPath) => {
      // Use link preload for better browser support
      const link = document.createElement("link");
      link.rel = "preload";
      link.as = "image";
      link.href = logoPath;
      if (logoIndex < 20) {
        link.setAttribute("fetchpriority", "high");
      } else {
        link.setAttribute("fetchpriority", "low");
      }
      document.head.appendChild(link);

      // Also preload via Image object for browser cache
      const img = new Image();
      img.src = logoPath;
      if (logoIndex < 20) {
        img.fetchPriority = "high";
      } else {
        img.fetchPriority = "low";
      }
      logoIndex++;
    });
  }, []);

  // Infinite Logo Carousel Component
  const InfiniteLogoCarousel: React.FC<{
    clients: string[];
    logoMap: { [key: string]: string };
    hasLogos?: boolean;
  }> = React.memo(({ clients, logoMap, hasLogos = false }) => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const animationRef = useRef<number>();
    const scrollPositionRef = useRef(0);
    const lastTimeRef = useRef(performance.now());
    const isVisibleRef = useRef(false);

    useEffect(() => {
      const scrollContainer = scrollRef.current;
      if (!scrollContainer) return;

      // Reset scroll position on mount
      scrollPositionRef.current = 0;
      scrollContainer.scrollLeft = 0;

      // Use IntersectionObserver to only animate when visible
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            isVisibleRef.current = entry.isIntersecting;
            if (!entry.isIntersecting && animationRef.current) {
              // Pause animation when not visible
              cancelAnimationFrame(animationRef.current);
              animationRef.current = undefined;
            } else if (entry.isIntersecting && !animationRef.current) {
              // Resume animation when visible
              lastTimeRef.current = performance.now();
              animationRef.current = requestAnimationFrame(animate);
            }
          });
        },
        { threshold: 0.1 }
      );

      observer.observe(scrollContainer);

      const animate = (currentTime: number) => {
        if (!scrollContainer || !isVisibleRef.current) return;

        const deltaTime = currentTime - lastTimeRef.current;
        lastTimeRef.current = currentTime;

        // Throttle animation based on frame time (normalize to 60fps)
        scrollPositionRef.current += 0.5 * Math.min(deltaTime / 16, 2);

        // Get the width of one set of logos (since we have 2 sets, divide by 2)
        const singleSetWidth = scrollContainer.scrollWidth / 2;

        // Reset scroll position when reaching the end of first set for seamless loop
        if (scrollPositionRef.current >= singleSetWidth) {
          scrollPositionRef.current = 0;
        }

        scrollContainer.scrollLeft = scrollPositionRef.current;

        if (isVisibleRef.current) {
          animationRef.current = requestAnimationFrame(animate);
        }
      };

      // Start animation only if visible
      if (isVisibleRef.current) {
        lastTimeRef.current = performance.now();
        animationRef.current = requestAnimationFrame(animate);
      }

      return () => {
        observer.disconnect();
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
        }
      };
    }, []);

    // Get logos for clients that have them, or create placeholders
    const logosWithClients = hasLogos
      ? clients
          .filter((client) => logoMap[client])
          .map((client) => {
            let logoPath = logoMap[client];
            // Ensure path starts with / for absolute paths
            if (!logoPath.startsWith("/")) {
              logoPath = "/" + logoPath;
            }
            return {
              name: client,
              logo: logoPath,
            };
          })
      : clients.map((client) => ({
          name: client,
          logo: `data:image/svg+xml;base64,${btoa(`<svg width="200" height="120" xmlns="http://www.w3.org/2000/svg">
            <rect width="200" height="120" fill="#E5E7EB" rx="8"/>
            <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="Arial, sans-serif" font-size="12" fill="#6B7280" font-weight="500">${client.substring(
              0,
              25
            )}</text>
          </svg>`)}`,
        }));

    // Duplicate logos for seamless infinite scroll (2 sets is enough)
    const duplicatedLogos = [...logosWithClients, ...logosWithClients];

    return (
      <div className="relative py-4" style={{ overflow: "hidden" }}>
        <div className="relative">
          {/* Gradient fade on right edge */}
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-r from-transparent via-white/80 to-white z-10 pointer-events-none"></div>
          <div
            ref={scrollRef}
            className="flex gap-8 md:gap-12 items-center carousel-container"
            style={{
              willChange: "transform",
              overflowX: "hidden",
              paddingRight: "200px",
              pointerEvents: "none",
              userSelect: "none",
              touchAction: "none",
              transform: "translateZ(0)",
              backfaceVisibility: "hidden",
            }}
            onWheel={(e) => e.preventDefault()}
            onTouchMove={(e) => e.preventDefault()}
            onScroll={(e) => e.preventDefault()}
          >
            {duplicatedLogos.map((item, index) => (
              <div
                key={`${item.name}-${index}`}
                className="flex-shrink-0 flex items-center justify-center px-4"
                style={{
                  width: "200px",
                  height: "120px",
                  transform: "translateZ(0)",
                  backfaceVisibility: "hidden",
                }}
              >
                <img
                  src={item.logo}
                  alt={item.name}
                  className="max-w-full max-h-full object-contain"
                  loading="lazy"
                  draggable={false}
                  width={200}
                  height={120}
                  style={{
                    pointerEvents: "none",
                    willChange: "auto",
                    transform: "translateZ(0)",
                    backfaceVisibility: "hidden",
                  }}
                  decoding="async"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    if (target.src !== placeholderImg) {
                      target.src = placeholderImg;
                    }
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  });

  return (
    <section
      id="clients"
      className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50/30 overflow-x-hidden w-full max-w-full"
    >
      <div className="container mx-auto px-4 sm:px-6 w-full max-w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-10 sm:mb-12 md:mb-16"
        >
          <h2 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-5 md:mb-6 px-2">
            Our Prestigious Clients
          </h2>
          <p className="text-sm xs:text-base sm:text-lg md:text-xl text-gray-600 max-w-4xl mx-auto px-2">
            Over 25 years, we have had the privilege of serving a diverse
            portfolio of prestigious clients across multiple sectors, from
            listed companies and multinational organizations to leading
            educational institutions and government entities.
          </p>
        </motion.div>

        {/* Client Statistics */}
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8 mb-12 sm:mb-16 md:mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="glass-card rounded-xl sm:rounded-2xl md:rounded-3xl p-4 sm:p-6 md:p-8 text-center shadow-xl hover:shadow-2xl transition-all duration-300 border border-white/50"
              whileHover={{ y: -8, scale: 1.03 }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 shadow-lg">
                <stat.icon className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" />
              </div>
              <div className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-1 sm:mb-2">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm md:text-base text-gray-600">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Tab Navigation */}
        <motion.div
          className="mb-6 sm:mb-8 w-full"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-5 xl:flex xl:flex-nowrap gap-2.5 sm:gap-3 md:gap-2.5 lg:gap-2.5 xl:gap-2 px-2 sm:px-4 md:px-4 lg:px-4 xl:px-4 max-w-2xl md:max-w-full mx-auto md:justify-items-center lg:justify-items-center xl:justify-center xl:items-center">
            {clientCategories.map((category, index) => {
              const Icon = category.icon;
              const isSelected = selectedCategory === index;
              const isITButton = index === 9; // IT button is the 10th button (index 9)
              const categoryColor = getCategoryColor(category.title);
              return (
                <motion.button
                  key={index}
                  onClick={() => setSelectedCategory(index)}
                  className={`
                      group relative flex flex-col items-center justify-center gap-1.5 sm:gap-2 xl:flex-row xl:gap-2
                      px-2 sm:px-3 xl:px-3 py-3 sm:py-3.5 xl:py-2
                      rounded-xl xl:rounded-lg
                      font-semibold transition-all duration-300
                      text-[10px] xs:text-[11px] sm:text-sm xl:text-xs
                      w-full xl:w-auto xl:whitespace-nowrap xl:flex-shrink
                      min-h-[70px] sm:min-h-[75px] md:min-h-0
                      border-2
                      ${
                        isITButton
                          ? "col-start-2 md:col-start-auto lg:col-start-auto xl:col-start-auto"
                          : ""
                      }
                      ${
                        isSelected
                          ? `${categoryColor.bg} ${categoryColor.text} shadow-lg ${categoryColor.border} scale-105 xl:scale-100`
                          : "bg-white text-gray-700 hover:bg-gray-50 hover:shadow-sm border-gray-200 hover:border-gray-300"
                      }
                    `}
                  style={
                    isSelected
                      ? {
                          boxShadow: `0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)`,
                        }
                      : {}
                  }
                  whileHover={!isSelected ? { scale: 1.02, y: -2 } : {}}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                >
                  <Icon
                    className={`w-5 h-5 sm:w-6 sm:h-6 xl:w-4 xl:h-4 flex-shrink-0 transition-colors duration-300 ${
                      isSelected
                        ? categoryColor.icon
                        : `text-gray-600 ${categoryColor.hoverIcon}`
                    }`}
                  />
                  <span className="text-center xl:text-left leading-tight break-words xl:break-normal xl:whitespace-nowrap px-0.5 w-full xl:w-auto">
                    {category.title}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* Selected Category Content */}
        {clientCategories[selectedCategory] &&
          (() => {
            const category = clientCategories[selectedCategory];
            const Icon = category.icon;
            return (
              <motion.div
                key={selectedCategory}
                className="glass-card rounded-2xl overflow-hidden shadow-xl border border-white/50 bg-white"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {/* Category Header */}
                <div className="bg-white p-6 sm:p-8 border-b border-gray-200">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center">
                      <Icon className="w-8 h-8 text-blue-500" />
                    </div>
                    <div>
                      <h3 className="text-2xl sm:text-3xl font-bold text-gray-900">
                        {category.title} Sector
                      </h3>
                      <p className="text-gray-600 mt-1 text-sm sm:text-base">
                        Trusted by {category.clients.length} leading
                        organizations
                      </p>
                    </div>
                  </div>
                </div>

                {/* Clients Grid or Logo Carousel */}
                <div className="p-6 sm:p-8">
                  <InfiniteLogoCarousel
                    clients={category.clients}
                    logoMap={
                      category.title === "Non-Profit"
                        ? nonProfitLogos
                        : category.title === "Manufacturing"
                        ? manufacturingLogos
                        : category.title === "Educational Institutions"
                        ? educationLogos
                        : category.title === "Health Sector"
                        ? healthLogos
                        : category.title === "Construction"
                        ? constructionLogos
                        : category.title === "Trading Sector"
                        ? tradingLogos
                        : category.title === "Services"
                        ? servicesLogos
                        : category.title === "Mining"
                        ? miningLogos
                        : category.title === "Power"
                        ? powerLogos
                        : category.title === "IT"
                        ? itLogos
                        : {}
                    }
                    hasLogos={
                      category.title === "Non-Profit" ||
                      category.title === "Manufacturing" ||
                      category.title === "Educational Institutions" ||
                      category.title === "Health Sector" ||
                      category.title === "Construction" ||
                      category.title === "Trading Sector" ||
                      category.title === "Services" ||
                      category.title === "Mining" ||
                      category.title === "Power" ||
                      category.title === "IT"
                    }
                  />
                </div>
              </motion.div>
            );
          })()}

        {/* Notable Achievements */}
        <motion.div
          className="mt-20 glass-card rounded-2xl p-8 sm:p-10 border border-white/50 shadow-xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-10">
            <h3 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Notable Client Achievements
            </h3>
            <p className="text-gray-600 text-lg max-w-4xl mx-auto">
              Our diverse client portfolio demonstrates our expertise across
              multiple sectors and our ability to deliver exceptional results
              for organizations of all sizes.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
            <motion.div
              className="glass-light rounded-xl p-6 text-center border border-white/30"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Building className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-gray-900 font-bold mb-3 text-lg">
                Listed Companies
              </h4>
              <p className="text-gray-600 text-sm leading-relaxed">
                Serving multiple listed companies including Colony Sarhad
                Textiles Mills Limited and Suhail Jute Mills Limited
              </p>
            </motion.div>

            <motion.div
              className="glass-light rounded-xl p-6 text-center border border-white/30"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Globe className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-gray-900 font-bold mb-3 text-lg">
                International Clients
              </h4>
              <p className="text-gray-600 text-sm leading-relaxed">
                Trusted by international organizations including Muslim Aid UK,
                Michigan State University USA, and RAK College UAE
              </p>
            </motion.div>

            <motion.div
              className="glass-light rounded-xl p-6 text-center border border-white/30"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-gray-900 font-bold mb-3 text-lg">
                Major Projects
              </h4>
              <p className="text-gray-600 text-sm leading-relaxed">
                Managing large-scale projects including 500 MW Hydro Power
                Projects and multiple USAID & DFID initiatives
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Client Testimonial Section */}
        <motion.div
          className="mt-20 glass-card rounded-3xl p-12 text-center border border-blue-200/50 shadow-2xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold text-gray-900 mb-6">
              Join Our Prestigious Client Family
            </h3>
            <p className="text-xl text-gray-600 mb-8">
              From startups to multinational corporations, from NGOs to
              government entities, we have the expertise and experience to serve
              your organization's unique needs.
            </p>
            <motion.button
              className="glass-button text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 inline-flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Become Our Next Success Story</span>
              <Award className="w-5 h-5" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Clients;
