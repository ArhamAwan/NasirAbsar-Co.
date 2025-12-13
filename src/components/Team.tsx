import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Linkedin, X } from "lucide-react";
// Removed getVercelOptimizedImage import - using direct paths for Vercel auto-optimization

const placeholderImg = `data:image/svg+xml;base64,${btoa(`<svg width="300" height="400" xmlns="http://www.w3.org/2000/svg">
  <rect width="300" height="400" fill="#E5E7EB" rx="8"/>
  <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="Arial, sans-serif" font-size="16" fill="#6B7280" font-weight="500">No Image</text>
</svg>`)}`;

const team = [
  {
    name: "Muhammad Nasir",
    lastName: "Nasir",
    position: "CEO",
    image: "/team/Muhammad Nasir.webp",
    linkedin: "https://pk.linkedin.com/company/nasir-absar-co",
    bio: `Seasoned Financial Management Consultant with 20+ years guiding business development and new ventures. Leads financial management assessments, system strengthening, and implementation of administrative, financial, and accounting policies. Specializes in accounting system design, IT enablement, financial restructuring, and M&A accounting.`,
  },
  {
    name: "Absar Nasir",
    lastName: "Nasir",
    position: "COO",
    image: "/team/Absar Nasir 1.webp",
    linkedin: "https://pk.linkedin.com/company/nasir-absar-co",
    bio: `Corporate and tax specialist known for expert guidance on structuring, compliance, and tax planning. Advocate High Court with LLM and MBA, providing opinion on corporate frameworks, tax strategy, and regulatory matters.`,
  },
  {
    name: "Syed M. Imran",
    lastName: "Imran",
    position: "CCO",
    image: "/team/Imran.webp",
    linkedin: "https://pk.linkedin.com/in/sayidimran",
    bio: `Management Consultant, Associate Tax Advisor, licensed Tax Practitioner, and Advocate High Court with 10+ years across corporate, taxation, and financial laws. Strong grounding in GAAP, IFRS, and auditing standards; pursuing Bar of England and Wales.`,
  },
  {
    name: "M. Javed Iqbal Khan",
    lastName: "Khan",
    position: "CIA",
    image: "/team/Javed.webp",
    linkedin:
      "https://www.linkedin.com/in/rana-javed-iqbal-khan-fca-51862418?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
    bio: `Fellow Chartered Accountant with 20+ years across food, real estate, construction, and technology. Leads audit and transaction advisory with a focus on controls, risk, and financial reporting quality.`,
  },
  {
    name: "Rizwan Saeed",
    lastName: "Saeed",
    position: "CFO",
    image: "/team/Rizwan Saeed.webp",
    linkedin:
      "https://www.linkedin.com/in/rizwan-saeed-49251063?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
    bio: `Fellow Chartered Accountant with 20+ years spanning automotive, food, technology, and defense industries. Drives financial strategy, controls, and reporting with a proven delivery record.`,
  },
  {
    name: "Aadil Ameen",
    lastName: "Ameen",
    position: "Management Consultant",
    image: "/team/Adil Ameen.webp",
    linkedin:
      "https://www.linkedin.com/in/adil-ameen-324743b0?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
    bio: `Fellow Member of Institute of Cost and Management Accountants\nExperience: 20 years of professional experience in field of Management Consultancy.`,
  },
  {
    name: "Shahid Shoaib",
    lastName: "Shoaib",
    position: "Associate Chartered Accountant",
    image: "/team/Shahid Shoaib.webp",
    linkedin:
      "https://www.linkedin.com/in/shahidshoaib82?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
    bio: `Fellow Member of Certified Chartered Accountants\nExperience: 20 years of professional experience in field of Transaction Advisory.`,
  },
  {
    name: "Asif Gulzar",
    lastName: "Gulzar",
    position: "CAO",
    image: "/team/Asif Gulzar.webp",
    linkedin: "https://pk.linkedin.com/company/nasir-absar-co",
    bio: `Licensed tax practitioner (FBR, Pakistan) with 20+ years of diversified industry practice. Focused on compliance, advisory, and strengthening tax governance for complex organizations.`,
  },
  {
    name: "Syed Musharraf Imam",
    lastName: "Imam",
    position: "CTO",
    image: "/team/Musharraf Imam.webp",
    linkedin: "https://pk.linkedin.com/company/nasir-absar-co",
    bio: `Technology leader with 20+ years across multinational environments and varied industries. Experienced in scaling IT architectures and delivering secure, resilient technology solutions.`,
  },
  {
    name: "Tariq Jamal",
    lastName: "Jamal",
    position: "Manager Taxation",
    image: "/team/Tariq Jamal.webp",
    linkedin: "https://pk.linkedin.com/company/nasir-absar-co",
    bio: `CA-Finalist\nExperience: 7 years of professional experience in field of Taxation.`,
  },
  {
    name: "Asad Mehmood",
    lastName: "Mehmood",
    position: "Manager Legal",
    image: "/team/Asad.webp",
    linkedin: "https://www.linkedin.com/in/asad-malik-246b5b108",
    bio: `Advocate High Courts\nExperience: 7 years of professional experience in the field of Law.`,
  },
];

// Helper function to split name into first name and last name
const splitName = (fullName: string) => {
  const parts = fullName.trim().split(" ");
  if (parts.length === 1) return { firstName: parts[0], lastName: "" };
  const lastName = parts[parts.length - 1];
  const firstName = parts.slice(0, -1).join(" ");
  return { firstName, lastName };
};

const Team: React.FC = () => {
  const [selected, setSelected] = useState<number | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [isUserScrolling, setIsUserScrolling] = useState(false);
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const lastScrollLeftRef = useRef(0);
  const modalRef = useRef<HTMLDivElement>(null);
  const modalContentRef = useRef<HTMLDivElement>(null);
  const ceoCardRef = useRef<HTMLDivElement>(null);

  // Preload team member images only when component is mounted (since it's lazy loaded)
  // Use Intersection Observer to preload images when section is about to be visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Preload images only when section is about to be visible
            team.forEach((member, idx) => {
              if (member.image) {
                const img = new Image();
                img.src = member.image;
                (img as any).fetchPriority = idx < 4 ? "high" : "low";
              }
            });
            observer.disconnect();
          }
        });
      },
      { rootMargin: "200px" } // Start preloading 200px before section is visible
    );

    const sectionElement = document.getElementById("team");
    if (sectionElement) {
      observer.observe(sectionElement);
    }

    return () => observer.disconnect();
  }, []);

  // Handle user scroll detection
  const handleUserScroll = () => {
    if (!isUserScrolling) {
      setIsUserScrolling(true);
      setIsPaused(true);
    }

    // Update last scroll position
    if (scrollContainerRef.current) {
      lastScrollLeftRef.current = scrollContainerRef.current.scrollLeft;
    }

    // Clear existing timeout
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }

    // Resume auto-scroll after 4 seconds of no user interaction
    scrollTimeoutRef.current = setTimeout(() => {
      setIsUserScrolling(false);
      setIsPaused(false);
    }, 4000);
  };

  // Center CEO at start
  useEffect(() => {
    if (scrollContainerRef.current && ceoCardRef.current) {
      // Wait for layout to be ready
      const timer = setTimeout(() => {
        if (scrollContainerRef.current && ceoCardRef.current) {
          const container = scrollContainerRef.current;
          const card = ceoCardRef.current;
          const containerWidth = container.clientWidth;
          const cardLeft = card.offsetLeft;
          const cardWidth = card.offsetWidth;

          // Calculate scroll position to center the card
          const scrollToPosition =
            cardLeft - containerWidth / 2 + cardWidth / 2;

          container.scrollLeft = Math.max(0, scrollToPosition);
          lastScrollLeftRef.current = container.scrollLeft;
        }
      }, 200);

      return () => clearTimeout(timer);
    }
  }, []);

  // Auto-scroll functionality
  useEffect(() => {
    if (!scrollContainerRef.current || isPaused) {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
      return;
    }

    const scrollContainer = scrollContainerRef.current;
    let scrollPosition = scrollContainer.scrollLeft;
    const speed = 0.3; // pixels per frame (slower for smoother experience)
    let lastTime = performance.now();

    const animate = (currentTime: number) => {
      if (isPaused || !scrollContainerRef.current) return;

      const deltaTime = currentTime - lastTime;
      lastTime = currentTime;

      // Only auto-scroll if user hasn't scrolled recently
      const currentScrollLeft = scrollContainer.scrollLeft;
      const expectedScrollLeft = scrollPosition;

      // If scroll position differs significantly from expected, user is scrolling
      if (Math.abs(currentScrollLeft - expectedScrollLeft) > 10) {
        scrollPosition = currentScrollLeft;
        lastScrollLeftRef.current = currentScrollLeft;
        animationFrameRef.current = requestAnimationFrame(animate);
        return;
      }

      scrollPosition += speed * Math.min(deltaTime / 16, 2); // Normalize by frame time, cap at 2x
      const scrollWidth = scrollContainer.scrollWidth;
      const clientWidth = scrollContainer.clientWidth;

      // Reset to start when reaching the end
      if (scrollPosition >= scrollWidth - clientWidth - 1) {
        scrollPosition = 0;
      }

      scrollContainer.scrollLeft = scrollPosition;
      lastScrollLeftRef.current = scrollPosition;
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    lastTime = performance.now();
    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [isPaused]);

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (selected === null) return;

    // Save current scroll position
    const scrollY = window.scrollY;
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";
    document.body.style.overflow = "hidden";

    return () => {
      // Restore scroll position after a small delay to let React finish updating
      requestAnimationFrame(() => {
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.width = "";
        document.body.style.overflow = "";
        window.scrollTo({ top: scrollY, behavior: "instant" });
      });
    };
  }, [selected]);

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && selected !== null) {
        setSelected(null);
      }
    };

    if (selected !== null) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [selected]);

  return (
    <section
      id="team"
      className="py-12 sm:py-16 md:py-20 bg-white min-h-[400px] sm:min-h-[500px] md:min-h-[600px] overflow-x-hidden w-full max-w-full relative"
    >
      <div className="container mx-auto px-4 sm:px-6 flex flex-col items-center w-full max-w-full">
        <h2 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-3 sm:mb-4 md:mb-6 text-center px-2">
          Meet Our Expert Team
        </h2>
        <p className="text-sm xs:text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-8 sm:mb-10 md:mb-12 text-center px-2">
          Our leadership brings decades of combined experience in accounting,
          auditing, tax advisory, legal services, and comprehensive financial
          consulting.
        </p>

        {/* Horizontal Auto-Scrolling Container */}
        <div
          ref={scrollContainerRef}
          className="w-full overflow-x-auto overflow-y-hidden scrollbar-hide pr-4"
          style={{ scrollBehavior: "smooth" }}
          onScroll={handleUserScroll}
          onTouchStart={handleUserScroll}
          onMouseDown={handleUserScroll}
          onWheel={handleUserScroll}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => {
            if (!isUserScrolling) {
              setIsPaused(false);
            }
          }}
        >
          <div className="flex gap-8 pb-6" style={{ width: "max-content" }}>
            {team.map((member, idx) => {
              const { firstName, lastName } = splitName(member.name);
              const displayLastName = member.lastName || lastName;
              const displayFirstName = displayLastName
                ? member.name.replace(displayLastName, "").trim()
                : member.name;

              const isCEO = member.position === "CEO";

              return (
                <motion.div
                  key={member.name}
                  ref={isCEO ? ceoCardRef : null}
                  className="flex-shrink-0 w-[240px] xs:w-[260px] sm:w-[280px] md:w-[300px] lg:w-[320px] bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  onClick={() => setSelected(idx)}
                  whileHover={{ y: -5 }}
                  style={{ willChange: "transform, opacity" }}
                >
                  {/* Image */}
                  <div className="w-full h-[280px] xs:h-[320px] sm:h-[350px] md:h-[380px] lg:h-[400px] overflow-hidden rounded-t-lg bg-gray-100">
                    <img
                      src={member.image || placeholderImg}
                      alt={member.name}
                      className="w-full h-full object-cover"
                      loading={idx < 4 ? "eager" : "lazy"}
                      decoding="async"
                      width={320}
                      height={400}
                      {...({ fetchPriority: idx < 4 ? "high" : "auto" } as any)}
                      style={{ willChange: "auto" }}
                      onError={(e) => {
                        // Fallback to placeholder if image fails to load
                        const target = e.target as HTMLImageElement;
                        if (target.src !== placeholderImg) {
                          target.src = placeholderImg;
                        }
                      }}
                    />
                  </div>

                  {/* Content */}
                  <div className="p-4 sm:p-5 md:p-6 flex flex-col">
                    {/* LinkedIn Icon - positioned at top */}
                    <div className="mb-3 sm:mb-4">
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-block"
                      >
                        <Linkedin className="w-5 h-5 sm:w-6 sm:h-6 text-gray-900 hover:text-blue-600 transition-colors" />
                      </a>
                    </div>

                    {/* Name with last name in blue */}
                    <h3 className="text-lg xs:text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-1 sm:mb-2 break-words">
                      {displayFirstName}{" "}
                      <span className="text-blue-600">{displayLastName}</span>
                    </h3>

                    {/* Position */}
                    <p className="text-gray-600 text-sm xs:text-base sm:text-lg break-words">
                      {member.position}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Team Member Detail Modal */}
      <AnimatePresence>
        {selected !== null && (
          <motion.div
            ref={modalRef}
            className="fixed inset-0 z-[70] flex items-center justify-center bg-black/50 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(e) => {
              e.preventDefault();
              setSelected(null);
            }}
          >
            <motion.div
              ref={modalContentRef}
              className="glass-card rounded-xl sm:rounded-2xl md:rounded-3xl shadow-2xl max-w-[90vw] sm:max-w-md md:max-w-lg w-full p-3 sm:p-5 md:p-8 relative overflow-y-auto max-h-[85vh] sm:max-h-[90vh] border border-white/50 backdrop-blur-xl mx-2 sm:mx-4"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                className="absolute top-2 right-2 sm:top-4 sm:right-4 glass-light rounded-full p-1.5 sm:p-2 hover:bg-white/80 backdrop-blur-md border border-white/30"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setSelected(null);
                }}
              >
                <X className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" />
              </button>
              <div className="flex flex-col items-center mb-3 sm:mb-4 md:mb-6">
                <img
                  src={team[selected].image || placeholderImg}
                  alt={team[selected].name}
                  className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 rounded-full object-cover border-2 sm:border-3 md:border-4 border-blue-600 shadow mb-2 sm:mb-3 md:mb-4"
                  width={112}
                  height={112}
                  loading="eager"
                  decoding="async"
                  {...({ fetchPriority: "high" } as any)}
                  onError={(e) => {
                    // Fallback to placeholder if image fails to load
                    const target = e.target as HTMLImageElement;
                    if (target.src !== placeholderImg) {
                      target.src = placeholderImg;
                    }
                  }}
                />
                {(() => {
                  const { firstName, lastName } = splitName(
                    team[selected].name
                  );
                  const displayLastName = team[selected].lastName || lastName;
                  const displayFirstName = displayLastName
                    ? team[selected].name.replace(displayLastName, "").trim()
                    : team[selected].name;
                  return (
                    <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-extrabold text-gray-900 mb-1.5 sm:mb-2 md:mb-3 tracking-tight text-center">
                      {displayFirstName}{" "}
                      <span className="text-blue-600">{displayLastName}</span>
                    </h3>
                  );
                })()}
                <div className="text-gray-600 font-semibold text-sm sm:text-base md:text-lg lg:text-xl mb-3 sm:mb-4 md:mb-6 text-center">
                  {team[selected].position}
                </div>
              </div>
              <div className="text-gray-700 text-xs sm:text-sm md:text-base leading-relaxed space-y-3 sm:space-y-4 md:space-y-5 text-left text-justify">
                {team[selected].bio.split("\n\n").map((paragraph, index) => {
                  const trimmedParagraph = paragraph.trim();
                  if (!trimmedParagraph) return null;

                  // Check if paragraph starts with a label (e.g., "Profession:", "Experience:", etc.)
                  const colonIndex = trimmedParagraph.indexOf(":");
                  if (colonIndex > 0 && colonIndex < 30) {
                    const label = trimmedParagraph
                      .substring(0, colonIndex)
                      .trim();
                    const content = trimmedParagraph
                      .substring(colonIndex + 1)
                      .trim();

                    // Check if it's a section header (short label, typically 1-3 words)
                    if (label.split(" ").length <= 4 && label.length < 25) {
                      return (
                        <div key={index} className="space-y-2">
                          <h4 className="text-gray-900 font-bold text-sm sm:text-base md:text-lg uppercase tracking-wide">
                            {label}
                          </h4>
                          <div className="text-gray-700 leading-relaxed space-y-1 text-justify">
                            {content.split("\n").map((line, lineIndex) => {
                              const trimmedLine = line.trim();
                              if (!trimmedLine) return null;

                              // Check if line starts with bullet point indicators
                              if (
                                trimmedLine.startsWith("*") ||
                                trimmedLine.startsWith("-") ||
                                trimmedLine.match(/^\d+[\.\)]/)
                              ) {
                                return (
                                  <div
                                    key={lineIndex}
                                    className="flex items-start pl-3 sm:pl-4"
                                  >
                                    <span className="text-blue-600 mr-1.5 sm:mr-2">
                                      •
                                    </span>
                                    <span className="text-xs sm:text-sm md:text-base">
                                      {trimmedLine.replace(
                                        /^[\*\-\d+\.\)]\s*/,
                                        ""
                                      )}
                                    </span>
                                  </div>
                                );
                              }

                              return (
                                <p
                                  key={lineIndex}
                                  className="text-gray-700 text-xs sm:text-sm md:text-base text-justify"
                                >
                                  {trimmedLine}
                                </p>
                              );
                            })}
                          </div>
                        </div>
                      );
                    }
                  }

                  // Regular paragraph - left aligned
                  return (
                    <p
                      key={index}
                      className="text-gray-700 leading-relaxed text-xs sm:text-sm md:text-base text-justify"
                    >
                      {trimmedParagraph
                        .split("\n")
                        .map((line, lineIndex, array) => (
                          <span key={lineIndex}>
                            {line.trim()}
                            {lineIndex < array.length - 1 && <br />}
                          </span>
                        ))}
                    </p>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Team;
