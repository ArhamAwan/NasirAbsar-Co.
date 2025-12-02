import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Calculator, 
  FileText, 
  TrendingUp, 
  Shield, 
  Users, 
  PieChart,
  Building,
  Briefcase,
  CheckCircle,
  Scale,
  Globe,
  Lightbulb,
  Target,
  BookOpen,
  Award,
  ArrowRight
} from 'lucide-react';
import ServiceModal from './ServiceModal';

const Services: React.FC = () => {
  const [expandedService, setExpandedService] = useState<number | null>(null);
  const [selectedService, setSelectedService] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const services = [
    {
      icon: TrendingUp,
      title: 'Transaction Advisory Services',
      description: 'Comprehensive financial analysis and due diligence for corporate entities and private equity firms.',
      features: [
        'Financial Analysis & Due Diligence',
        'Revenue & Cost Factor Investigation',
        'Project Identification & Evaluation',
        'Financial & Valuation Modeling',
        'Information Memorandums',
        'Financial Feasibility Reports',
        'Economic & Financial Analysis',
        'Cross-Border Transaction Consultancy'
      ],
      detailedDescription: 'Our Transaction Advisory Services provide expert commentary on prospective financial information, examining the risk and reward landscape of target firms. We conduct in-depth investigations into revenue and cost factors, providing insightful estimates of sustainable cash flows. Our team specializes in project identification, evaluation, analysis & due diligence to ensure careful assessment of opportunities and mitigation of risks, including scrutinizing and validating financial, commercial, operational, and strategic assumptions.'
    },
    {
      icon: Scale,
      title: 'Corporate Law',
      description: 'Legal advice in all major business areas including employment, environmental, intellectual property, finance, and tax law.',
      features: [
        'Corporate Legal Advisory',
        'Employment & Benefits Law',
        'Environmental Law Compliance',
        'Intellectual Property Law',
        'Corporate Reorganizations',
        'Mergers & Acquisitions',
        'Equity Investments',
        'Corporate Compliance Programs'
      ],
      detailedDescription: 'Our Corporate Law services provide comprehensive legal representation for companies from establishment through various aspects of evolution. We offer planning and implementation support for corporate reorganizations and domestic/cross-border transactions, including mergers, acquisitions, and joint ventures. Our expertise extends to dealing with government bodies related to corporate legislation and obtaining relevant permissions for foreign investment.'
    },
    {
      icon: Briefcase,
      title: 'Commercial Law',
      description: 'Counseling businesses on ongoing contractual relationships with domestic and international partners.',
      features: [
        'Contract Advisory Services',
        'Outsourcing Agreements',
        'Distribution Contracts',
        'Software Licensing',
        'Product Marketing Agreements',
        'Manufacturing Contracts',
        'Supply Chain Agreements',
        'Online Terms & Conditions'
      ],
      detailedDescription: 'We provide comprehensive advice on all forms of commercial contracts for day-to-day and strategic business activities, extending across various sectors and regulatory regimes. Our services include counseling businesses on ongoing contractual relationships with domestic and international customers, suppliers, and distributors, covering outsourcing, services distribution, software licensing, development, and product marketing.'
    },
    {
      icon: FileText,
      title: 'Audit and Assurance',
      description: 'Constructive approach to auditing, recommending improvements for efficient operation and stronger financial structure.',
      features: [
        'External Audit & Assurance',
        'Internal Audit Services',
        'System Audits',
        'Compliance Audits',
        'Investigation & Accounting Audits',
        'Internal Control Review',
        'Monitoring & Evaluation',
        'Risk Assessment'
      ],
      detailedDescription: 'Our Audit and Assurance services focus on value creation by assessing and managing strategic risk. We offer complete or partial outsourcing of internal audit departments, review and restructuring of internal audit departments, and designing charters for Audit Committees. Our constructive approach to auditing includes recommending improvements for efficient operation, stronger financial structure, and improved controls.'
    },
    {
      icon: Calculator,
      title: 'Accounts & Financial Management',
      description: 'Provision of timely and reliable financial information with modern technology solutions.',
      features: [
        'SAP / ERP Implementation',
        'Electronic Record Keeping',
        'Online Financial Management',
        'Cost & Management Accounting',
        'Financial Statement Review',
        'Payroll Consultancy',
        'Budgetary Controls',
        'Stock Valuation'
      ],
      detailedDescription: 'We provide comprehensive accounting and financial management services including SAP/ERP implementation, electronic record keeping, and online financial record management. Our services include designing and evaluation of cost and management accounting systems, counseling on internal control weaknesses, and recommending remedial measures for improved financial operations.'
    },
    {
      icon: TrendingUp,
      title: 'Tax Services',
      description: 'Comprehensive range of services covering direct and indirect taxes, aligning strategies with business needs.',
      features: [
        'Tax Planning & Strategy',
        'Corporate Tax Advisory',
        'International Tax Services',
        'Tax Registration & Compliance',
        'Tax Audits & Representations',
        'Tax Exemptions',
        'Withholding Tax Services',
        'Import/Export Tax Advisory'
      ],
      detailedDescription: 'Our Tax Services focus on managing tax obligations responsibly and proactively to reduce tax burden. We provide a comprehensive range of services covering direct and indirect taxes, aligning tax strategies with business needs and meeting compliance obligations. Our tailored services for foreign companies consider both international and local implications.'
    },
    {
      icon: Users,
      title: 'INGO / NGOs / NPOs Consultancy',
      description: 'Registration and compliance services for non-profit organizations under various Pakistani laws.',
      features: [
        'INGO Registration with EAD',
        'Companies Act 2017 Registration',
        'Societies Registration Act 1860',
        'Trust Act 2020 Registration',
        'Charitable Endowment Act 1890',
        'Performance Evaluation Certification',
        'Tax Exemptions for NPOs',
        'Financial Management Systems'
      ],
      detailedDescription: 'We provide comprehensive registration and compliance services for non-profit organizations under various laws in Pakistan. Our services include regulatory compliance in accordance with relevant incorporation laws, performance evaluation certification from Pakistan Center for Philanthropy, and advising various NGOs on their financial management and accounting systems needs.'
    },
    {
      icon: PieChart,
      title: 'Business & Financial Consultancies',
      description: 'Strategic business advice to optimize operations and drive growth through comprehensive analysis.',
      features: [
        'Feasibility Studies',
        'Business Appraisal & Evaluation',
        'Performance Measurement',
        'Process Improvement Services',
        'Cost Management Services',
        'Turnaround Consulting',
        'Post-Merger Integration',
        'Strategic Planning'
      ],
      detailedDescription: 'Our Business & Financial Consultancy services include feasibility studies for establishment of new entities/industries, covering market study, demand-supply gap analysis, strategic planning, and financial analysis. We provide support through transactions from corporate strategy to post-merger integration and assistance for under-performing companies in turnaround situations.'
    },
    {
      icon: Lightbulb,
      title: 'Intellectual Property Services',
      description: 'Comprehensive IP registration, protection, and litigation services for all types of intellectual property.',
      features: [
        'Trademark Registration',
        'Copyright Protection',
        'Industrial Design Registration',
        'Patent Filing & Prosecution',
        'IP Litigation Support',
        'Infringement Search',
        'IP Licensing',
        'Geographical Indication'
      ],
      detailedDescription: 'We provide comprehensive intellectual property services including trademark, copyright, industrial design, and patent registration, filing, prosecution, enforcement, and protection. Our expertise includes patent specification drafting for various technology and engineering-related inventions, IP litigation and documentation, and IP licensing services.'
    },
    {
      icon: Globe,
      title: 'Import & Export Consultancy',
      description: 'Complete documentation and consultancy services for international trade operations.',
      features: [
        'Import/Export Documentation',
        'Turn-key Solutions',
        'Bank Account Handling',
        'Invoice Management',
        'Record Keeping Services',
        'Tax Statement Submissions',
        'One Window Operations',
        'Re-export Documentation'
      ],
      detailedDescription: 'We have extensive experience in all documentation for imports and exports or import for re-export. Our services include provision of turn-key solutions, complete outsourcing of documentation for imports and exports, including bank account handling, invoice issuance, record keeping, and submission of monthly sales tax and withholding tax statements.'
    }
  ];

  const associatedCompanies = [
    {
      name: 'Nasir Absar & Co. (Private) Limited',
      location: 'Islamabad',
      services: ['Corporate & Secretarial Services', 'Electronic Record Keeping', 'Online Financial Management', 'Accounting System Design', 'Internal Control Counseling', 'Assurance Services']
    },
    {
      name: 'Soft Corridor (Private) Limited',
      location: 'Islamabad',
      services: ['Offshore Software Development', 'Application Development', 'IT Solutions', 'Technology Consulting']
    },
    {
      name: 'Nasir Absar Consulting (Private) Limited',
      location: 'Islamabad',
      services: ['Power Sector Services', 'Environmental & Social Impact Assessment', 'Project Development Activities', 'Engineering & Construction Supervision']
    }
  ];

  const toggleExpanded = (index: number) => {
    setExpandedService(expandedService === index ? null : index);
  };

  const openModal = (service: any) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedService(null);
  };

  return (
    <section id="services" className="py-20 bg-gradient-to-br from-white via-blue-50/20 to-gray-50 w-full max-w-full" style={{ overflow: 'visible' }}>
      <div className="container mx-auto px-4 w-full max-w-full" style={{ overflow: 'visible' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Comprehensive Professional Services
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto">
            Nasir Absar & Co. provides a comprehensive range of professional services designed to help 
            organizations and individuals achieve their objectives, succeed by measuring performance, 
            managing risks, and leveraging knowledge across various functions and sectors.
          </p>
        </motion.div>

        <div className="mb-20 relative" style={{ overflow: 'visible', paddingTop: '8px' }}>
          {/* Horizontal Scroll Container */}
          <div className="overflow-x-auto overflow-y-visible pb-6 -mx-4 px-4 scrollbar-hide carousel-container" style={{ scrollBehavior: 'smooth', WebkitOverflowScrolling: 'touch', overflowY: 'visible', paddingTop: '8px' }}>
            <div className="flex gap-6" style={{ width: 'max-content', overflow: 'visible' }}>
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  className="glass-card rounded-3xl hover:shadow-2xl transition-all duration-300 border border-white/50 flex-shrink-0"
                  style={{ width: '420px', maxWidth: 'calc(100vw - 3rem)', overflow: 'visible', willChange: 'transform, opacity' }}
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true, margin: '-100px' }}
                  whileHover={{ y: -8, scale: 1.02 }}
                >
                  <div className="p-8 h-full flex flex-col overflow-hidden rounded-3xl">
                <div className="flex items-start mb-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                      <service.icon className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">{service.title}</h3>
                    </div>
                  </div>
                </div>
                
                <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
                
                {expandedService === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mb-6"
                  >
                    <p className="text-gray-600 mb-4 leading-relaxed italic">
                      {service.detailedDescription}
                    </p>
                  </motion.div>
                )}
                
                <div className="flex flex-col gap-3 mb-6 flex-grow">
                  {service.features.slice(0, expandedService === index ? service.features.length : 4).map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-start space-x-3">
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 text-sm leading-relaxed">{feature}</span>
                    </div>
                  ))}
                </div>

                {service.features.length > 4 && expandedService !== index && (
                  <p className="text-blue-600 text-sm mb-4">
                    +{service.features.length - 4} more services...
                  </p>
                )}
                
                <motion.button
                  onClick={() => openModal(service)}
                  className="w-full glass-button text-white py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center space-x-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
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
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              >
                ←
              </motion.span>
              <span className="text-xs font-medium">Scroll horizontally to view all services</span>
              <motion.span
                animate={{ x: [0, -5, 0] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
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
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">Associated Undertakings</h3>
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
                <h4 className="text-xl font-bold text-gray-900 mb-2">{company.name}</h4>
                <p className="text-blue-600 font-semibold mb-4">{company.location}</p>
                <ul className="space-y-2">
                  {company.services.map((service, serviceIndex) => (
                    <li key={serviceIndex} className="flex items-center space-x-2">
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
          <h3 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-white">Our Service Excellence</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            <div>
              <div className="text-3xl sm:text-4xl font-bold mb-2 text-white">10+</div>
              <div className="text-blue-50 text-sm sm:text-base">Service Categories</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-bold mb-2 text-white">50+</div>
              <div className="text-blue-50 text-sm sm:text-base">Specialized Services</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-bold mb-2 text-white">3</div>
              <div className="text-blue-50 text-sm sm:text-base">Associated Companies</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-bold mb-2 text-white">100%</div>
              <div className="text-blue-50 text-sm sm:text-base">Client Satisfaction</div>
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
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Ready to Get Started?</h3>
            <p className="text-xl text-gray-600 mb-8">
              Contact us today for a free consultation and discover how our comprehensive 
              professional services can help your business achieve its objectives and drive sustainable growth.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                className="glass-button text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center space-x-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Schedule Consultation</span>
                <ArrowRight size={20} />
              </motion.button>
              <motion.button
                className="glass-card border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-blue-600 hover:text-white transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Download Service Brochure
              </motion.button>
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
    </section>
  );
};

export default Services;