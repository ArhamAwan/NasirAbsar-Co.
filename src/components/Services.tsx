import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Calculator,
  FileText,
  TrendingUp,
  Users,
  PieChart,
  Building,
  Briefcase,
  CheckCircle,
  Scale,
  Globe,
  Lightbulb,
  ArrowRight,
} from "lucide-react";
import ServiceModal from "./ServiceModal";
import ConsultationModal from "./ConsultationModal";

const Services: React.FC = () => {
  const [selectedService, setSelectedService] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConsultationModalOpen, setIsConsultationModalOpen] = useState(false);

  const services = useMemo(
    () => [
      {
        icon: TrendingUp,
        title: "Incorporation & Registrations",
        description:
          "Tailored incorporation and registrations guided by experienced corporate lawyers.",
        features: [
          "Company Incorporation",
          "Firm Registration",
          "Sole Proprietorship Registration",
          "Tax, PSW, CoC, PEC, NGO Registrations",
        ],
        detailedDescription:
          "Incorporation & Registrations is one of our most highly requested solutions. We take the time to listen to each client and tailor the service to their needs. In our introductory consultation, we will walk you through all of the benefits involved.",
        learnMoreSections: [
          {
            title: "Company Incorporation",
            content:
              "Our team of experienced corporate lawyers are here to guide you through the complexities of business formation and incorporation. We provide personalised services tailored to each individual’s specific needs. With us, you can rest assured that your business is in good hands.",
          },
          {
            title: "Firm Registration",
            content:
              "Whether you are just starting out or have been in business for some time, our experienced team of professionals will provide you with the assistance and guidance you need.",
          },
          {
            title: "Sole Proprietorship Registration",
            content:
              "We understand that starting a business can be a daunting task, so we make the process as simple and straightforward as possible. Our team is dedicated to providing personalised service and will guide you through the process, step-by-step. With our help, you can be sure your business is fully compliant and ready to hit the ground running.",
          },
          {
            title: "Tax, PSW, CoC, PEC, NGO Registrations",
            content:
              "We take pride in our ability to provide our clients with the best possible service and our commitment to getting the job done right. With NASIR ABSAR, you can rest assured that you are in good hands and that your registration or licensing needs will be taken care of.",
          },
        ],
      },
      {
        icon: Scale,
        title: "Tax Preparation",
        description:
          "NASIR ABSAR & CO is known for Tax Preparation projects that are free of stress and confusion. We provide detailed status updates and expected delivery dates.",
        features: [
          "Federal & Provincial Income Tax & Sales Tax Returns",
          "Withholding Tax Statements & Compliance",
          "Tax Accounting",
          "PSW, AML, DNFBP Reporting and Compliances",
        ],
        detailedDescription:
          "NASIR ABSAR & CO is known for Tax Preparation projects that are free of stress and confusion. As we go through the process, we provide detailed status updates and expected delivery dates. Schedule a consultation to learn more.",
        learnMoreSections: [
          {
            title: "Federal & Provincial Income Tax & Sales Tax Returns",
            content:
              "Our attention to detail and commitment to customer service make us stand out from the rest. We guarantee accurate and timely filing of your return, so that you can rest easy knowing that everything is taken care of. Let us help you get the most from your tax return – contact us today!",
          },
          {
            title: "Withholding Tax Statements & Compliance",
            content:
              "Our services go beyond just compliance. We make sure to stay on top of the latest regulations, so our clients can rest assured that their taxes are in good hands. We are committed to providing the highest level of service, so you can be confident that your withholding statement and compliance needs are taken care of.",
          },
          {
            title: "Tax Accounting",
            content:
              "Our clients come from a wide range of backgrounds and our services are tailored to meet the needs of individuals, businesses, and organisations. With our in-depth knowledge of tax laws and regulations, we strive to help our clients maximise their returns and minimise the burden of filing taxes.",
          },
          {
            title: "PSW, AML, DNFBP Reporting and Compliances",
            content:
              "We are committed to providing our clients with the necessary tools and guidance they need to make sure their businesses are compliant and secure. With our expertise and experience, we can help you stay ahead of the ever-changing landscape of anti-money laundering and DNFPB compliances.",
          },
        ],
      },
      {
        icon: Briefcase,
        title: "Tax Litigation",
        description:
          "When you choose our team, which includes advocates of the High Courts, you receive partners who work tirelessly to minimise stress and safeguard your financial health.",
        features: [
          "Representation Before Tax Authorities",
          "Appeals & Tribunal Matters",
          "Show Cause Notices & Penalty Proceedings",
          "Legal Strategy & Risk Management",
          "End-to-End Case Handling",
        ],
        detailedDescription:
          "When you choose our team which includes advocates of the High Courts to handle your Tax Litigation, you receive more than our expertise and insight. You receive professional partners who work tirelessly to minimise your stress and ensure your financial health.",
        learnMoreSections: [
          {
            title: "Representation Before Tax Authorities",
            content:
              "We assist clients throughout audits, assessments, inquiries, and enforcement actions, ensuring that every step is handled with professionalism and strong legal grounding.",
          },
          {
            title: "Appeals & Tribunal Matters",
            content:
              "From drafting appeals to presenting your case before appellate forums and tribunals, our team manages the entire process with precision and preparation.",
          },
          {
            title: "Show Cause Notices & Penalty Proceedings",
            content:
              "We prepare detailed responses to notices, penalties, and recovery actions to protect your rights and reduce exposure.",
          },
          {
            title: "Legal Strategy & Risk Management",
            content:
              "Our advisory services help you avoid future disputes by strengthening compliance and identifying potential risk areas early.",
          },
          {
            title: "End-to-End Case Handling",
            content:
              "From documentation and filings to hearings and follow-ups, we manage every aspect of the litigation process so you remain focused and informed.",
          },
        ],
      },
      {
        icon: FileText,
        title: "Assurance & Related Services",
        description:
          "At NASIR ABSAR, our experienced auditors provide the highest quality service and insight to keep you compliant and confident.",
        features: [
          "Audit of Historical Financial Information",
          "Assurance of Feasibilities, Projections & Forecasts",
          "Compilation Reports",
          "Other Financial Reports and Certifications",
        ],
        detailedDescription:
          "At NASIR ABSAR, our experienced auditors provide the highest quality service and professional insight to ensure your business is compliant with the latest regulations and standards. Let us help you navigate the complexities of financial auditing and give you the confidence you need to succeed. Make NASIR ABSAR your trusted partner for all your audit needs.",
        learnMoreSections: [
          {
            title: "Audit of Historical Financial Information",
            content:
              "Our attention to detail and commitment to customer service make us stand out from the rest. We guarantee accurate and timely audits, so that you can rest easy knowing that everything is taken care of. Let us help you get the most from your business – contact us today!",
          },
          {
            title:
              "Assurance of Feasibilities, Financial Projections and Forecast",
            content:
              "Our services go beyond just compliance. We make sure to stay on top of the latest regulations, so our clients can rest assured that their systems are in good hands. We are committed to providing the highest level of service, so you can be confident that your compliance needs are taken care of.",
          },
          {
            title: "Compilation Reports",
            content:
              "Our clients come from a wide range of backgrounds and our services are tailored to meet the needs of individuals, businesses, and organisations. With our in-depth knowledge of regulations, we strive to help our clients maximise their potential and minimise their cost by identifying their financial data.",
          },
          {
            title: "Other Financial Reports and Certifications",
            content:
              "We are committed to providing our clients with the necessary tools and guidance they need to make sure their businesses are compliant and secure. With our expertise and experience, we can help you stay ahead of the ever-changing landscape of compliances.",
          },
        ],
      },
      {
        icon: Calculator,
        title: "Transaction Advisory",
        description:
          "NASIR ABSAR provides a comprehensive suite of transaction advisory services to maximise value and minimise risk in any deal.",
        features: [
          "Due Diligence Services",
          "Valuation & Financial Modelling",
          "Deal Structuring & Negotiation Support",
          "Mergers & Acquisitions Support",
          "Capital Raising Assistance",
          "Post-Transaction Integration",
        ],
        detailedDescription:
          "NASIR ABSAR provides a comprehensive suite of transaction advisory services, allowing organisations to maximise value and minimise risk in any transaction they undertake. Our experienced professionals provide advice on M&A, corporate finance, transaction structuring, and capital raising projects.",
        learnMoreSections: [
          {
            title: "Due Diligence Services",
            content:
              "We conduct thorough financial, tax, legal, and operational due diligence to help you make informed decisions and identify potential risks before finalizing a transaction.",
          },
          {
            title: "Valuation & Financial Modelling",
            content:
              "Accurate valuations and detailed financial models ensure you understand the true value of your business or investment and make strategic choices with clarity.",
          },
          {
            title: "Deal Structuring & Negotiation Support",
            content:
              "Our team assists in crafting transaction structures that align with your goals while minimising tax exposure and regulatory complications.",
          },
          {
            title: "Mergers & Acquisitions Support",
            content:
              "From initial assessment to closing, we guide clients through the entire M&A process, ensuring smooth execution and maximum value creation.",
          },
          {
            title: "Capital Raising Assistance",
            content:
              "We support businesses in raising funds through debt, equity, and hybrid instruments by preparing documentation, managing investor discussions, and advising on optimal financing structures.",
          },
          {
            title: "Post-Transaction Integration",
            content:
              "After the deal closes, we help streamline integration processes, align financial and operational systems, and ensure the transaction delivers the intended value.",
          },
        ],
      },
      {
        icon: TrendingUp,
        title: "Intellectual Property Services",
        description:
          "NASIR ABSAR provides unparalleled intellectual property rights services to protect your valuable IP.",
        features: [
          "Trademark Solutions",
          "Copyright Solutions",
          "Patent Solutions",
          "Design Solutions",
        ],
        detailedDescription:
          "NASIR ABSAR provides unparalleled intellectual property rights services to individuals and organizations. With a strong background in patent, trademark and copyright law, NASIR ABSAR offers high-quality legal advice and resources to protect your valuable IP rights.",
        learnMoreSections: [
          {
            title: "Trademark Solutions",
            content:
              "Trademark registration can be a complex and time-consuming process, but it's for protecting your brand. Our service offers a streamlined and affordable solution to help you register your trademark quickly and easily. With our expert guidance, you can rest assured that your brand is in good hands. Contact us today to learn more about our registration services.",
          },
          {
            title: "Copyright Solutions",
            content:
              "Copyright registration is the best way to ensure that your intellectual property is safeguarded. Our service makes it easy to register your copyrights and provides you with the peace of mind that your work is protected. Get started today and take the first step towards securing your creative rights.",
          },
          {
            title: "Patent Solutions",
            content:
              "Are you looking to protect your intellectual property? Our patent registration service can help you secure your inventions and innovations. Our team of experts will guide you through the process and ensure your patent application is filed correctly and efficiently. Don't let your ideas go unprotected - contact us today to learn more about our registration service.",
          },
          {
            title: "Design Solutions",
            content:
              "We understand the importance of a strong brand identity. That is why we offer a comprehensive range of design to help businesses create a unique and memorable brand. From logo design to brand strategy, our team of experts will work with you develop a brand that truly represents your business. Let us help you make a lasting impression on your customers.",
          },
        ],
      },
      {
        icon: Users,
        title: "Financial & Investment Advisory Services",
        description:
          "We are dedicated to helping you achieve your financial goals through personalized advice and guidance.",
        features: [
          "Transaction Advisory Service",
          "Investment Due Diligence",
          "Mergers & Acquisitions",
          "Investment Plan & Pitch Decks",
        ],
        detailedDescription:
          "We are dedicated to helping you achieve your financial goals through personalized advice and guidance. Our team of experts is committed to providing you with the highest level of service and support. Let us help you navigate the complex world of finance and investments.",
        learnMoreSections: [
          {
            title: "Transaction Advisory Service",
            content:
              "Welcome to our Transaction Advisory Service. Our team of experts is dedicated to providing you with the best advice and support for your business transactions. We understand the complexities of the market and are committed to helping you navigate through them. Let us help you achieve your goals and maximize your success.",
          },
          {
            title: "Investment Due Diligence",
            content:
              "Investment due diligence is a crucial step in any investment process. Our service provides a comprehensive analysis of potential investments, including financial, legal, and operational aspects. With our expertise, you can make informed investment decisions and minimize risks.",
          },
          {
            title: "Mergers & Acquisitions",
            content:
              "Mergers and acquisitions can be complex and time-consuming processes. Our team can guide you through every step, from identifying potential targets to negotiating deals and closing transactions, helping you maximize value and achieve your business goals.",
          },
          {
            title: "Investment Plan & Pitch Decks",
            content:
              "Our team helps you create compelling investment plans and pitch decks that attract investors and secure funding. We'll work with you to develop a solid plan and deliver a winning pitch that showcases your unique value proposition.",
          },
        ],
      },
      {
        icon: PieChart,
        title: "Non Profit Registrations & Concession",
        description:
          "NASIR ABSAR is a premier Non-Profit Organization Registration and Exemption Services firm, providing high-quality filing and compliance.",
        features: [
          "Non-Profit Organization Registration",
          "Tax-Exempt Status Applications",
          "Licenses & Permits",
          "Compliance & Reporting",
          "Consultation & Advisory",
        ],
        detailedDescription:
          "NASIR ABSAR is a premier Non-Profit Organization Registration and Exemption Services firm. We provide high-quality filing and compliance services that enable our clients to set up their non-profit organisations and obtain the tax-exempt status they need to operate successfully.",
        learnMoreSections: [
          {
            title: "Non-Profit Organization Registration",
            content:
              "We assist clients in registering their non-profit organizations under the applicable laws, ensuring full compliance with regulatory requirements from day one.",
          },
          {
            title: "Tax-Exempt Status Applications",
            content:
              "Our team helps secure tax-exempt status for eligible organizations, including drafting and filing all required documentation with the relevant authorities.",
          },
          {
            title: "Licenses & Permits",
            content:
              "We guide organizations in obtaining the necessary permits, certifications, and approvals to operate legally and efficiently in their sector.",
          },
          {
            title: "Compliance & Reporting",
            content:
              "We provide ongoing support to ensure your non-profit stays compliant with annual reporting requirements, audits, and regulatory updates.",
          },
          {
            title: "Consultation & Advisory",
            content:
              "Our experts offer strategic advice on governance, fundraising regulations, and operational best practices to help your organization grow sustainably.",
          },
        ],
      },
      {
        icon: Lightbulb,
        title: "Corporate Regulatory Services",
        description:
          "Top-tier corporate regulatory services to keep your business compliant with evolving laws and filings.",
        features: [
          "Corporate Compliance Advisory",
          "Regulatory Filings & Documentation",
          "Licensing & Approvals",
          "Corporate Governance Support",
          "Risk Management & Regulatory Updates",
        ],
        detailedDescription:
          "NASIR ABSAR provides top-tier corporate regulatory services, allowing business owners to navigate changes in regulations with ease. Our expert team is dedicated to helping you stay up-to-date with the latest regulations and maintain compliance.",
        learnMoreSections: [
          {
            title: "Corporate Compliance Advisory",
            content:
              "We guide businesses on compliance requirements under corporate laws, ensuring timely filings and adherence to statutory obligations.",
          },
          {
            title: "Regulatory Filings & Documentation",
            content:
              "Our team handles all required corporate filings, including annual returns, board resolutions, and statutory notifications, minimizing administrative burden for your business.",
          },
          {
            title: "Licensing & Approvals",
            content:
              "We assist in obtaining and renewing necessary licenses and permits, keeping your operations fully compliant with legal requirements.",
          },
          {
            title: "Corporate Governance Support",
            content:
              "We advise on governance frameworks, policies, and procedures to help your organization operate efficiently and ethically.",
          },
          {
            title: "Risk Management & Regulatory Updates",
            content:
              "Stay ahead of regulatory changes with our proactive monitoring and advisory services, helping you mitigate compliance risks and avoid penalties.",
          },
        ],
      },
      {
        icon: Globe,
        title: "Enterprise Resource Planning & Tech Solutions",
        description:
          "Reliable, tailored ERP and tech solutions that maximize operational efficiency and fit your business needs.",
        features: [
          "ERP Solutions (SaaS - FinDroid)",
          "Standalone Bookkeeping & Accounting Solutions",
          "Payroll Solutions",
          "Compliance Reporting Solution",
        ],
        detailedDescription:
          "NASIR ABSAR is a reliable and experienced ERP consultant offering comprehensive services to help you make the most of your ERP system. We design and implement tailored ERP solutions that fit your specific business needs and maximize operational efficiency.",
        learnMoreSections: [
          {
            title: "ERP Solutions",
            content:
              "Our ERP Solutions are offered under the SaaS model (FinDroid), a cloud-based platform that helps businesses manage day-to-day operations. Streamline processes, improve efficiency, and reduce costs with a user-friendly, customizable solution.",
          },
          {
            title: "Standalone bookkeeping and accounting solutions",
            content:
              "We provide accurate and reliable financial management solutions for businesses of all sizes. Our team streamlines financial processes and helps you make informed decisions.",
          },
          {
            title: "Payroll Solutions",
            content:
              "Our payroll service simplifies payroll for businesses of all sizes with a user-friendly platform and expert support, saving you time and money.",
          },
          {
            title: "Compliance Reporting Solution",
            content:
              "Compliance reporting is crucial. We provide tools and expertise to keep your business aligned with regulations and standards so you can operate confidently.",
          },
        ],
      },
    ],
    []
  );

  const associatedCompanies = [
    {
      name: "Nasir Absar & Co. (Private) Limited",
      location: "Islamabad",
      services: [
        "Corporate & Secretarial Services",
        "Electronic Record Keeping",
        "Online Financial Management",
        "Accounting System Design",
        "Internal Control Counseling",
        "Assurance Services",
      ],
    },
    {
      name: "Soft Corridor (Private) Limited",
      location: "Islamabad",
      services: [
        "Offshore Software Development",
        "Application Development",
        "IT Solutions",
        "Technology Consulting",
      ],
    },
    {
      name: "Nasir Absar Consulting (Private) Limited",
      location: "Islamabad",
      services: [
        "Power Sector Services",
        "Environmental & Social Impact Assessment",
        "Project Development Activities",
        "Engineering & Construction Supervision",
      ],
    },
  ];

  const openModal = (service: any) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedService(null);
  };

  return (
    <section
      id="services"
      className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-white via-blue-50/20 to-gray-50 w-full max-w-full"
      style={{ overflow: "visible" }}
    >
      <div
        className="container mx-auto px-4 sm:px-6 w-full max-w-full"
        style={{ overflow: "visible" }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-10 sm:mb-12 md:mb-16"
        >
          <h2 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 md:mb-6 px-2">
            Comprehensive Professional Services
          </h2>
          <p className="text-sm xs:text-base sm:text-lg md:text-xl text-gray-600 max-w-4xl mx-auto px-2">
            Nasir Absar & Co. provides a comprehensive range of professional
            services designed to help organizations and individuals achieve
            their objectives, succeed by measuring performance, managing risks,
            and leveraging knowledge across various functions and sectors.
          </p>
        </motion.div>

        <div
          className="mb-20 relative"
          style={{ overflow: "visible", paddingTop: "8px" }}
        >
          {/* Horizontal Scroll Container */}
          <div
            className="overflow-x-auto overflow-y-visible pb-6 -mx-4 px-4 scrollbar-hide carousel-container"
            style={{
              scrollBehavior: "smooth",
              WebkitOverflowScrolling: "touch",
              overflowY: "visible",
              paddingTop: "8px",
              contain: "layout style paint", // CSS containment for performance
            }}
          >
            <div
              className="flex gap-6"
              style={{ width: "max-content", overflow: "visible" }}
            >
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  className="glass-card rounded-2xl sm:rounded-3xl hover:shadow-2xl transition-all duration-300 border border-white/50 flex-shrink-0"
                  style={{
                    width: "min(420px, calc(100vw - 2rem))",
                    maxWidth: "calc(100vw - 2rem)",
                    overflow: "visible",
                    willChange: "transform",
                    transform: "translateZ(0)", // GPU acceleration
                  }}
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.4,
                    delay: Math.min(index * 0.05, 0.3),
                  }}
                  viewport={{ once: true, margin: "-50px" }}
                  whileHover={{ y: -4, scale: 1.01 }}
                >
                  <div className="p-5 sm:p-6 md:p-8 h-full flex flex-col gap-5 overflow-hidden rounded-2xl sm:rounded-3xl">
                    <div className="flex items-start mb-4 sm:mb-6 min-h-[48px]">
                      <div className="flex items-center space-x-3 sm:space-x-4">
                        <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg flex-shrink-0">
                          <service.icon className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" />
                        </div>
                        <div className="min-w-0">
                          <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-1 sm:mb-2 break-words">
                            {service.title}
                          </h3>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col gap-3.5 sm:gap-4 flex-grow">
                      <p className="text-gray-600 leading-relaxed min-h-[72px] sm:min-h-[88px]">
                        {service.description}
                      </p>

                      <div className="flex flex-col gap-2.5 min-h-[180px]">
                        {service.features.map((feature, featureIndex) => (
                          <div
                            key={featureIndex}
                            className="flex items-start space-x-3"
                          >
                            <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-700 text-sm leading-relaxed">
                              {feature}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <motion.button
                      onClick={() => openModal(service)}
                      className="w-full glass-button text-white py-3 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center space-x-2 mt-auto"
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      style={{ willChange: "transform" }}
                    >
                      <span>Learn More</span>
                      <ArrowRight size={16} />
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Scroll Indicator */}
          <motion.div
            className="flex justify-center mt-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="text-sm text-gray-500 flex items-center space-x-2 bg-blue-50/50 px-4 py-2 rounded-full border border-blue-100">
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 1.5,
                  ease: "easeInOut",
                }}
              >
                ←
              </motion.span>
              <span className="text-xs font-medium">
                Scroll horizontally to view all services
              </span>
              <motion.span
                animate={{ x: [0, -5, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 1.5,
                  ease: "easeInOut",
                }}
              >
                →
              </motion.span>
            </div>
          </motion.div>
        </div>

        {/* Associated Companies */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Associated Undertakings
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            {associatedCompanies.map((company, index) => (
              <motion.div
                key={index}
                className="glass-card rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 border border-white/50"
                whileHover={{ y: -8, scale: 1.02 }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-5 shadow-lg">
                  <Building className="w-7 h-7 text-white" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">
                  {company.name}
                </h4>
                <p className="text-blue-600 font-semibold mb-4">
                  {company.location}
                </p>
                <ul className="space-y-2">
                  {company.services.map((service, serviceIndex) => (
                    <li
                      key={serviceIndex}
                      className="flex items-center space-x-2"
                    >
                      <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                      <span className="text-gray-600 text-sm">{service}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Service Statistics */}
        <motion.div
          className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-8 sm:p-12 text-center text-white mb-20 border border-blue-500/30 shadow-2xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-white">
            Our Service Excellence
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            <div>
              <div className="text-3xl sm:text-4xl font-bold mb-2 text-white">
                10+
              </div>
              <div className="text-blue-50 text-sm sm:text-base">
                Service Categories
              </div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-bold mb-2 text-white">
                50+
              </div>
              <div className="text-blue-50 text-sm sm:text-base">
                Specialized Services
              </div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-bold mb-2 text-white">
                3
              </div>
              <div className="text-blue-50 text-sm sm:text-base">
                Associated Companies
              </div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-bold mb-2 text-white">
                100%
              </div>
              <div className="text-blue-50 text-sm sm:text-base">
                Client Satisfaction
              </div>
            </div>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          className="glass-card rounded-3xl p-12 text-center border border-blue-200/50 shadow-2xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="max-w-3xl mx-auto">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Ready to Get Started?
            </h3>
            <p className="text-xl text-gray-600 mb-8">
              Contact us today for a free consultation and discover how our
              comprehensive professional services can help your business achieve
              its objectives and drive sustainable growth.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                onClick={() => setIsConsultationModalOpen(true)}
                className="glass-button text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center space-x-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Schedule Consultation</span>
                <ArrowRight size={20} />
              </motion.button>
              <motion.a
                href="/CompanyProfile/Nasir Absar Profile 2024.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="glass-card border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-blue-600 hover:text-white transition-all duration-300 inline-block text-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Download Service Brochure
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Service Modal */}
      <ServiceModal
        isOpen={isModalOpen}
        onClose={closeModal}
        service={selectedService}
      />

      {/* Consultation Modal */}
      <ConsultationModal
        isOpen={isConsultationModalOpen}
        onClose={() => setIsConsultationModalOpen(false)}
      />
    </section>
  );
};

export default Services;
