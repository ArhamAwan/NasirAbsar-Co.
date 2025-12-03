import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Linkedin, X } from "lucide-react";
import { getVercelOptimizedImage } from "../utils/imageOptimization";

const placeholderImg = "https://via.placeholder.com/300x400?text=No+Image";

const team = [
  {
    name: "Muhammad Nasir",
    lastName: "Nasir",
    position: "CEO",
    image: "/team/Muhammad Nasir.jpeg",
    linkedin: "https://pk.linkedin.com/company/nasir-absar-co",
    bio: `Profession: Chartered Accountant\nNationality: Pakistani\nContact: +92 321 5216303\nEmail: nasir@nasirabsar.com\n\nExperience: As Financial Management Consultant (FMC) for business development and establishment of new ventures...\n\nKey qualifications: As Senior Partner of Nasir Absar & Co. (the Firm), share responsibilities with other partners, for all types of professional work carried out by the Firm. However, specifically responsible for accounting system development, computerization (IT), financial restructuring, mergers and acquisition accounting.\n\nEmployment Record: 2001 - to-date: CEO in Nasir Absar & Co. (Pvt) Ltd. (Auditors, Accountants, Corporate, Financial, Management & Tax Consultants)\n1998 - 2005 : Finance Controller and Director Finance in Islamic International Medical College Trust and Riphah International University, Islamabad, respectively.\n1996 - 1998 : Manager Audit & Tax in Jawaid Qadeer Rashid & Co. Chartered Accountants.\n\nSocial Services: Ex-Member Finance, Prime Minister's Task Force for Gems and Jewelry, Ex-Member Management Committee – Pakistan Red Crescent Society, Punjab, Ex-Member Board of Governors – Pak Red Crescent Medical & Dental College, Lahore, and more.`,
  },
  {
    name: "Absar Nasir",
    lastName: "Nasir",
    position: "Executive Director",
    image: "/team/Absar Nasir 1.png",
    linkedin: "https://pk.linkedin.com/company/nasir-absar-co",
    bio: `Profession: Corporate and Tax Consultant\nNationality: Pakistani\nContact: 092 300 9569379\nEmail: absar@nasirabsar.com\n\nExperience: As Partner of Nasir Absar & Co. (Pvt) Limited (the Company), share responsibilities with other Directors, for all types of professional work carried out by the Firm. However, specifically responsible for Tax, Corporate, Intellectual Property Laws, share registrar and NPO Legal Frame work.\n\nKey qualifications: Several distinctions in LLM (Master in Corporate Law). Position holder in the LLB (Graduate in Law). Distinction in Finance during MBA. First Position in Bachelor of Commerce.\n\nEmployment Record: 2001 – to-date: Executive Director, Nasir Absar & Co. (Pvt) Limited. 1997 – 2001 : Manager Tax & Corporate in Nadeem Ahmed & Co. Islamabad.`,
  },
  {
    name: "Syed Muhammad Imran",
    lastName: "Imran",
    position: "Director Tax & Corporate Regulatory Services",
    image: "/team/Imran.png",
    linkedin: "https://pk.linkedin.com/company/nasir-absar-co",
    bio: `Advocate High Courts\nExperience: 15 years of professional experience in field of Taxation and Corporate Regulatory Services.`,
  },
  {
    name: "Muhammad Jawaid Iqbal Khan",
    lastName: "Khan",
    position: "Associate Chartered Accountant",
    image: "/team/Javed.jpg",
    linkedin: "https://pk.linkedin.com/company/nasir-absar-co",
    bio: `Fellow Member of Chartered Accountants\nExperience: 22 years of professional experience in field of Audit and transaction advisory.`,
  },
  {
    name: "Rizwan Saeed",
    lastName: "Saeed",
    position: "Associate Chartered Accountant",
    image: "/team/Rizwan Saeed.png",
    linkedin: "https://pk.linkedin.com/company/nasir-absar-co",
    bio: `Associate Member of Chartered Accountants\nExperience: 21 years of professional experience in field of Audit and Accounts.`,
  },
  {
    name: "Aadil Ameen",
    lastName: "Ameen",
    position: "Management Consultant",
    image: "/team/Adil Ameen.png",
    linkedin: "https://pk.linkedin.com/company/nasir-absar-co",
    bio: `Fellow Member of Institute of Cost and Management Accountants\nExperience: 20 years of professional experience in field of Management Consultancy.`,
  },
  {
    name: "Shahid Shoaib",
    lastName: "Shoaib",
    position: "Associate Chartered Accountant",
    image: "/team/Shahid Shoaib.png",
    linkedin: "https://pk.linkedin.com/company/nasir-absar-co",
    bio: `Fellow Member of Certified Chartered Accountants\nExperience: 20 years of professional experience in field of Transaction Advisory.`,
  },
  {
    name: "Asif Gulzar",
    lastName: "Gulzar",
    position: "Director Audit",
    image: "/team/Asif Gulzar.jpg",
    linkedin: "https://pk.linkedin.com/company/nasir-absar-co",
    bio: `CFA\nExperience: 22 years of professional experience in the field Audit.`,
  },
  {
    name: "Ahsan Jamal",
    lastName: "Jamal",
    position: "Director Public Relations",
    image: "",
    linkedin: "https://pk.linkedin.com/company/nasir-absar-co",
    bio: `MBA\nExperience: 16 years of professional experience in field of Business Promotion and investment advisor.`,
  },
  {
    name: "Syed Musharraf Imam",
    lastName: "Imam",
    position: "Director Corporate Registrations",
    image: "/team/Musharraf Imam.png",
    linkedin: "https://pk.linkedin.com/company/nasir-absar-co",
    bio: `Experience: 20 years of professional experience in field of Business Promotion.`,
  },
  {
    name: "Tariq Jamal",
    lastName: "Jamal",
    position: "Manager Taxation",
    image: "/team/Tariq Jamal.png",
    linkedin: "https://pk.linkedin.com/company/nasir-absar-co",
    bio: `CA-Finalist\nExperience: 7 years of professional experience in field of Taxation.`,
  },
  {
    name: "Asad Mehmood",
    lastName: "Mehmood",
    position: "Manager Legal",
    image: "/team/Asad.png",
    linkedin: "https://pk.linkedin.com/company/nasir-absar-co",
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

  // Preload critical team member images (all images for faster loading)
  useEffect(() => {
    team.forEach((member, idx) => {
      if (member.image) {
        const img = new Image();
        // Use optimized URL for preloading - this will track in Vercel dashboard
        img.src = getVercelOptimizedImage(member.image, 640, 85);
        // Set fetch priority for first 4 images
        if (idx < 4) {
          img.fetchPriority = "high";
        }
      }
    });
  }, []);

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

    const handleWheel = (e: WheelEvent) => {
      if (!modalRef.current || !modalContentRef.current) {
        e.preventDefault();
        return;
      }

      const target = e.target as HTMLElement;
      const isInsideModal = modalRef.current.contains(target);

      if (!isInsideModal) {
        // Prevent scrolling outside modal
        e.preventDefault();
        e.stopPropagation();
        return;
      }

      // Inside modal - check if we can scroll
      const contentEl = modalContentRef.current;
      const isAtTop = contentEl.scrollTop <= 0;
      const isAtBottom =
        contentEl.scrollTop + contentEl.clientHeight >=
        contentEl.scrollHeight - 1;

      // If at boundaries and trying to scroll further, prevent default
      if ((e.deltaY < 0 && isAtTop) || (e.deltaY > 0 && isAtBottom)) {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!modalRef.current) {
        e.preventDefault();
        return;
      }

      const target = e.target as HTMLElement;
      const isInsideModal = modalRef.current.contains(target);

      if (!isInsideModal) {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    // Use capture phase to catch events early
    document.addEventListener("wheel", handleWheel, {
      passive: false,
      capture: true,
    });
    document.addEventListener("touchmove", handleTouchMove, {
      passive: false,
      capture: true,
    });
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("wheel", handleWheel, { capture: true });
      document.removeEventListener("touchmove", handleTouchMove, {
        capture: true,
      });
      document.body.style.overflow = "";
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
                      src={getVercelOptimizedImage(
                        member.image || placeholderImg,
                        640,
                        85
                      )}
                      alt={member.name}
                      className="w-full h-full object-cover"
                      loading={idx < 4 ? "eager" : "lazy"}
                      decoding="async"
                      width={320}
                      height={400}
                      fetchPriority={idx < 4 ? "high" : "auto"}
                      style={{ willChange: "auto" }}
                      onError={(e) => {
                        // Fallback to placeholder if image fails to load
                        const target = e.target as HTMLImageElement;
                        if (
                          target.src !== placeholderImg &&
                          !target.src.includes("_vercel/image")
                        ) {
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
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              ref={modalContentRef}
              className="glass-card rounded-2xl sm:rounded-3xl shadow-2xl max-w-lg w-full p-4 sm:p-6 md:p-8 relative overflow-y-auto max-h-[90vh] border border-white/50 backdrop-blur-xl mx-2 sm:mx-4"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-2 right-2 sm:top-4 sm:right-4 glass-light rounded-full p-1.5 sm:p-2 hover:bg-white/80 backdrop-blur-md border border-white/30"
                onClick={() => setSelected(null)}
              >
                <X className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" />
              </button>
              <div className="flex flex-col items-center mb-4 sm:mb-5 md:mb-6">
                <img
                  src={getVercelOptimizedImage(
                    team[selected].image || placeholderImg,
                    224,
                    90
                  )}
                  alt={team[selected].name}
                  className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full object-cover border-2 sm:border-4 border-blue-600 shadow mb-3 sm:mb-4"
                  width={112}
                  height={112}
                  loading="eager"
                  decoding="async"
                  fetchPriority="high"
                  onError={(e) => {
                    // Fallback to placeholder if image fails to load
                    const target = e.target as HTMLImageElement;
                    if (
                      target.src !== placeholderImg &&
                      !target.src.includes("_vercel/image")
                    ) {
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
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-gray-900 mb-2 sm:mb-3 tracking-tight text-center">
                      {displayFirstName}{" "}
                      <span className="text-blue-600">{displayLastName}</span>
                    </h3>
                  );
                })()}
                <div className="text-gray-600 font-semibold text-base sm:text-lg md:text-xl mb-4 sm:mb-5 md:mb-6 text-center">
                  {team[selected].position}
                </div>
              </div>
              <div className="text-gray-700 text-sm sm:text-base leading-relaxed space-y-4 sm:space-y-5 text-left">
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
                          <h4 className="text-gray-900 font-bold text-base sm:text-lg uppercase tracking-wide">
                            {label}
                          </h4>
                          <div className="text-gray-700 leading-relaxed space-y-1">
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
                                    className="flex items-start pl-4"
                                  >
                                    <span className="text-blue-600 mr-2">
                                      •
                                    </span>
                                    <span className="text-sm sm:text-base">
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
                                  className="text-gray-700 text-sm sm:text-base"
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
                      className="text-gray-700 leading-relaxed text-sm sm:text-base text-left"
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
