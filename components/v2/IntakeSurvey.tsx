"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  ArrowRight,
  ArrowLeft,
  Check,
  User,
  Building2,
  Home,
  DollarSign,
  PiggyBank,
  Target,
  Clock,
  Mail,
  Phone,
  CheckCircle,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

// Types for survey data
interface SurveyData {
  employmentStatus: string;
  ownsBusiness: string;
  ownsHome: string;
  householdIncome: string;
  businessRevenue: string;
  contributesToRetirement: string;
  primaryGoal: string;
  timeline: string;
  name: string;
  email: string;
  phone: string;
  consent: boolean;
}

// Internal flags for opportunity summary (not shown to lead)
interface OpportunityFlags {
  cashFlowOptimization: boolean;
  retirementAccountReview: boolean;
  homeownerPlanning: boolean;
  businessPlanning: boolean;
  taxEfficiency: boolean;
}

const initialSurveyData: SurveyData = {
  employmentStatus: "",
  ownsBusiness: "",
  ownsHome: "",
  householdIncome: "",
  businessRevenue: "",
  contributesToRetirement: "",
  primaryGoal: "",
  timeline: "",
  name: "",
  email: "",
  phone: "",
  consent: false,
};

// Question configurations
const questions = [
  {
    id: "employmentStatus",
    question: "What best describes your current situation?",
    icon: User,
    options: [
      { value: "employed", label: "Employed (W-2)" },
      { value: "self-employed", label: "Self-Employed / 1099" },
      { value: "business-owner", label: "Business Owner" },
      { value: "exploring", label: "Exploring Options" },
    ],
  },
  {
    id: "ownsBusiness",
    question: "Do you own or operate a business?",
    icon: Building2,
    options: [
      { value: "yes", label: "Yes" },
      { value: "no", label: "No" },
      { value: "planning", label: "Planning to start one" },
    ],
  },
  {
    id: "ownsHome",
    question: "Do you currently own a home?",
    icon: Home,
    options: [
      { value: "yes", label: "Yes, I own my home" },
      { value: "no", label: "No, I rent" },
      { value: "planning", label: "Planning to buy soon" },
    ],
  },
  {
    id: "householdIncome",
    question: "What is your approximate household income?",
    icon: DollarSign,
    options: [
      { value: "under-75k", label: "Under $75,000" },
      { value: "75k-150k", label: "$75,000 - $150,000" },
      { value: "150k-300k", label: "$150,000 - $300,000" },
      { value: "300k-plus", label: "$300,000+" },
    ],
  },
  {
    id: "businessRevenue",
    question: "What is your annual business revenue?",
    icon: Building2,
    conditional: (data: SurveyData) =>
      data.ownsBusiness === "yes" || data.employmentStatus === "business-owner",
    options: [
      { value: "under-250k", label: "Under $250,000" },
      { value: "250k-500k", label: "$250,000 - $500,000" },
      { value: "500k-1m", label: "$500,000 - $1M" },
      { value: "1m-plus", label: "$1M+" },
    ],
  },
  {
    id: "contributesToRetirement",
    question: "Do you currently contribute to retirement accounts?",
    icon: PiggyBank,
    options: [
      { value: "yes-maxing", label: "Yes, I max out contributions" },
      { value: "yes-some", label: "Yes, but not maxing out" },
      { value: "no", label: "No, not currently" },
      { value: "unsure", label: "I'm not sure" },
    ],
  },
  {
    id: "primaryGoal",
    question: "What is your primary financial goal right now?",
    icon: Target,
    options: [
      { value: "reduce-taxes", label: "Reduce my tax burden" },
      { value: "grow-wealth", label: "Grow my wealth faster" },
      { value: "protect-family", label: "Protect my family" },
      { value: "retirement", label: "Plan for retirement" },
      { value: "business-growth", label: "Optimize my business finances" },
    ],
  },
  {
    id: "timeline",
    question: "How soon are you looking to take action?",
    icon: Clock,
    options: [
      { value: "asap", label: "As soon as possible" },
      { value: "1-3-months", label: "Within 1-3 months" },
      { value: "3-6-months", label: "Within 3-6 months" },
      { value: "exploring", label: "Just exploring for now" },
    ],
  },
];

// Option button component
function OptionButton({
  label,
  selected,
  onClick,
  index,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
  index: number;
}) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      onClick={onClick}
      className={cn(
        "w-full text-left p-4 rounded-xl border transition-all duration-200",
        selected
          ? "border-accent bg-accent/10 text-white"
          : "border-white/[0.08] bg-white/[0.02] text-text-secondary hover:border-white/[0.15] hover:bg-white/[0.04]"
      )}
    >
      <div className="flex items-center justify-between">
        <span className="font-medium">{label}</span>
        {selected && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-5 h-5 rounded-full bg-accent flex items-center justify-center"
          >
            <Check className="w-3 h-3 text-white" />
          </motion.div>
        )}
      </div>
    </motion.button>
  );
}

// Progress indicator
function ProgressBar({
  currentStep,
  totalSteps,
}: {
  currentStep: number;
  totalSteps: number;
}) {
  const progress = ((currentStep + 1) / totalSteps) * 100;

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between text-sm mb-2">
        <span className="text-text-muted">
          Step {currentStep + 1} of {totalSteps}
        </span>
        <span className="text-accent font-medium">{Math.round(progress)}%</span>
      </div>
      <div className="h-1.5 bg-background-elevated rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-accent/80 to-accent rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </div>
  );
}

// Contact form step
function ContactForm({
  data,
  onChange,
  errors,
}: {
  data: SurveyData;
  onChange: (field: keyof SurveyData, value: string | boolean) => void;
  errors: Record<string, string>;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="text-center mb-8">
        <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-4">
          <Sparkles className="w-8 h-8 text-accent" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">
          Almost there!
        </h3>
        <p className="text-text-secondary">
          Enter your details to receive your personalized strategy.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-text-secondary mb-2">
            Full Name
          </label>
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
            <input
              type="text"
              value={data.name}
              onChange={(e) => onChange("name", e.target.value)}
              placeholder="John Smith"
              className={cn(
                "w-full pl-12 pr-4 py-3 rounded-xl bg-background-elevated border text-white placeholder:text-text-muted focus:outline-none focus:border-accent transition-colors",
                errors.name ? "border-red-500" : "border-white/[0.08]"
              )}
            />
          </div>
          {errors.name && (
            <p className="text-red-400 text-xs mt-1">{errors.name}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-text-secondary mb-2">
            Email Address
          </label>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
            <input
              type="email"
              value={data.email}
              onChange={(e) => onChange("email", e.target.value)}
              placeholder="john@example.com"
              className={cn(
                "w-full pl-12 pr-4 py-3 rounded-xl bg-background-elevated border text-white placeholder:text-text-muted focus:outline-none focus:border-accent transition-colors",
                errors.email ? "border-red-500" : "border-white/[0.08]"
              )}
            />
          </div>
          {errors.email && (
            <p className="text-red-400 text-xs mt-1">{errors.email}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-text-secondary mb-2">
            Phone Number
          </label>
          <div className="relative">
            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
            <input
              type="tel"
              value={data.phone}
              onChange={(e) => onChange("phone", e.target.value)}
              placeholder="(555) 123-4567"
              className={cn(
                "w-full pl-12 pr-4 py-3 rounded-xl bg-background-elevated border text-white placeholder:text-text-muted focus:outline-none focus:border-accent transition-colors",
                errors.phone ? "border-red-500" : "border-white/[0.08]"
              )}
            />
          </div>
          {errors.phone && (
            <p className="text-red-400 text-xs mt-1">{errors.phone}</p>
          )}
        </div>

        <div className="pt-4">
          <label className="flex items-start gap-3 cursor-pointer group">
            <div className="relative mt-0.5">
              <input
                type="checkbox"
                checked={data.consent}
                onChange={(e) => onChange("consent", e.target.checked)}
                className="sr-only"
              />
              <div
                className={cn(
                  "w-5 h-5 rounded border-2 flex items-center justify-center transition-all",
                  data.consent
                    ? "bg-accent border-accent"
                    : "border-white/20 group-hover:border-white/40"
                )}
              >
                {data.consent && <Check className="w-3 h-3 text-white" />}
              </div>
            </div>
            <span className="text-sm text-text-secondary leading-relaxed">
              I consent to being contacted by email, phone, or text message
              regarding my inquiry. I understand I can opt out at any time.
            </span>
          </label>
          {errors.consent && (
            <p className="text-red-400 text-xs mt-2">{errors.consent}</p>
          )}
        </div>
      </div>
    </motion.div>
  );
}

// Success state
function SuccessState() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center py-8"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", delay: 0.2 }}
        className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6"
      >
        <CheckCircle className="w-10 h-10 text-green-400" />
      </motion.div>
      <h3 className="text-2xl font-bold text-white mb-3">
        Thank You!
      </h3>
      <p className="text-text-secondary text-lg mb-6 max-w-md mx-auto">
        We've received your information and will be in touch within 24 hours
        with your personalized strategy.
      </p>
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20">
        <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
        <span className="text-green-400 text-sm font-medium">
          Confirmation email sent
        </span>
      </div>
    </motion.div>
  );
}

export function IntakeSurvey() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const [currentStep, setCurrentStep] = useState(0);
  const [data, setData] = useState<SurveyData>(initialSurveyData);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Filter questions based on conditions
  const activeQuestions = questions.filter(
    (q) => !q.conditional || q.conditional(data)
  );

  const totalSteps = activeQuestions.length + 1; // +1 for contact form
  const isContactStep = currentStep === activeQuestions.length;
  const currentQuestion = activeQuestions[currentStep];

  // Generate opportunity flags for internal use
  const generateOpportunityFlags = (surveyData: SurveyData): OpportunityFlags => {
    return {
      cashFlowOptimization:
        surveyData.primaryGoal === "reduce-taxes" ||
        surveyData.contributesToRetirement === "no" ||
        surveyData.contributesToRetirement === "yes-some",
      retirementAccountReview:
        surveyData.contributesToRetirement !== "yes-maxing" ||
        surveyData.primaryGoal === "retirement",
      homeownerPlanning:
        surveyData.ownsHome === "yes" || surveyData.ownsHome === "planning",
      businessPlanning:
        surveyData.ownsBusiness === "yes" ||
        surveyData.employmentStatus === "business-owner" ||
        surveyData.primaryGoal === "business-growth",
      taxEfficiency:
        surveyData.householdIncome === "150k-300k" ||
        surveyData.householdIncome === "300k-plus" ||
        surveyData.primaryGoal === "reduce-taxes",
    };
  };

  const handleOptionSelect = (value: string) => {
    const field = currentQuestion.id as keyof SurveyData;
    setData((prev) => ({ ...prev, [field]: value }));
    // Auto-advance after selection with slight delay
    setTimeout(() => {
      if (currentStep < totalSteps - 1) {
        setCurrentStep((prev) => prev + 1);
      }
    }, 300);
  };

  const handleInputChange = (field: keyof SurveyData, value: string | boolean) => {
    setData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user types
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validateContactForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!data.name.trim()) {
      newErrors.name = "Please enter your name";
    }

    if (!data.email.trim()) {
      newErrors.email = "Please enter your email";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!data.phone.trim()) {
      newErrors.phone = "Please enter your phone number";
    }

    if (!data.consent) {
      newErrors.consent = "Please accept the consent to continue";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateContactForm()) return;

    setIsSubmitting(true);

    // Generate opportunity flags for internal review
    const opportunityFlags = generateOpportunityFlags(data);

    // Simulate API call - in production, send data + flags to your backend
    console.log("Survey Data:", data);
    console.log("Opportunity Flags (Internal):", opportunityFlags);

    // Simulate delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (isContactStep) {
      handleSubmit();
    } else if (data[currentQuestion.id as keyof SurveyData]) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const canProceed = isContactStep
    ? data.name && data.email && data.phone && data.consent
    : !!data[currentQuestion?.id as keyof SurveyData];

  return (
    <section
      ref={sectionRef}
      id="intake"
      className="section-padding relative overflow-hidden"
    >
      {/* Background layers */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background-subtle/20 to-background" />

      <motion.div
        className="absolute top-1/4 left-0 w-[500px] h-[500px] rounded-full pointer-events-none"
        animate={{
          opacity: [0.15, 0.25, 0.15],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        style={{
          background:
            "radial-gradient(circle, rgba(255, 107, 53, 0.08) 0%, transparent 70%)",
          filter: "blur(100px)",
        }}
      />

      <div
        className="absolute inset-0 opacity-[0.01] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="container-custom relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <span className="text-accent text-sm font-semibold uppercase tracking-wider mb-4 block">
            Personalized Strategy
          </span>
          <h2 className="text-display-mobile md:text-display font-bold text-white mb-4">
            Get Your Custom Financial Plan
          </h2>
          <p className="text-text-secondary text-lg">
            Answer a few questions to help us understand your situation. We'll
            create a personalized strategy just for you.
          </p>
        </motion.div>

        {/* Survey card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="max-w-2xl mx-auto"
        >
          <div
            className="relative bg-background-card/50 backdrop-blur-xl border border-white/[0.08] rounded-3xl p-8 md:p-10 overflow-hidden"
            style={{
              boxShadow:
                "0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.03) inset",
            }}
          >
            {/* Subtle inner glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-accent/[0.02] via-transparent to-transparent pointer-events-none rounded-3xl" />

            <div className="relative">
              {isSubmitted ? (
                <SuccessState />
              ) : (
                <>
                  <ProgressBar
                    currentStep={currentStep}
                    totalSteps={totalSteps}
                  />

                  <AnimatePresence mode="wait">
                    {isContactStep ? (
                      <ContactForm
                        key="contact"
                        data={data}
                        onChange={handleInputChange}
                        errors={errors}
                      />
                    ) : (
                      <motion.div
                        key={currentQuestion.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="flex items-center gap-3 mb-6">
                          <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                            <currentQuestion.icon className="w-6 h-6 text-accent" />
                          </div>
                          <h3 className="text-xl font-semibold text-white">
                            {currentQuestion.question}
                          </h3>
                        </div>

                        <div className="space-y-3">
                          {currentQuestion.options.map((option, index) => (
                            <OptionButton
                              key={option.value}
                              label={option.label}
                              selected={
                                data[currentQuestion.id as keyof SurveyData] ===
                                option.value
                              }
                              onClick={() => handleOptionSelect(option.value)}
                              index={index}
                            />
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Navigation */}
                  <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/[0.06]">
                    <button
                      onClick={handleBack}
                      disabled={currentStep === 0}
                      className={cn(
                        "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all",
                        currentStep === 0
                          ? "text-text-muted cursor-not-allowed"
                          : "text-text-secondary hover:text-white hover:bg-white/5"
                      )}
                    >
                      <ArrowLeft className="w-4 h-4" />
                      Back
                    </button>

                    <div className="relative group">
                      {canProceed && (
                        <div className="absolute -inset-1 bg-accent/20 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      )}
                      <Button
                        onClick={handleNext}
                        disabled={!canProceed || isSubmitting}
                        className={cn(
                          "relative",
                          !canProceed && "opacity-50 cursor-not-allowed"
                        )}
                      >
                        {isSubmitting ? (
                          <>
                            <motion.div
                              className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                              animate={{ rotate: 360 }}
                              transition={{
                                duration: 1,
                                repeat: Infinity,
                                ease: "linear",
                              }}
                            />
                            Submitting...
                          </>
                        ) : isContactStep ? (
                          <>
                            Get My Strategy
                            <ArrowRight className="w-4 h-4" />
                          </>
                        ) : (
                          <>
                            Continue
                            <ArrowRight className="w-4 h-4" />
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Trust message */}
          {!isSubmitted && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.5 }}
              className="text-center text-text-muted text-sm mt-6"
            >
              Your information is secure and will never be shared with third
              parties.
            </motion.p>
          )}
        </motion.div>
      </div>
    </section>
  );
}
