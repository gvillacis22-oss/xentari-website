import type { Metadata } from "next";
import { Award, Target, Heart, Users } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { siteConfig } from "@/lib/constants";

export const metadata: Metadata = {
  title: "About Us",
  description: `Learn about ${siteConfig.name} and our mission to help individuals, families, and businesses navigate health insurance and tax strategies since ${siteConfig.foundedYear}.`,
};

const values = [
  {
    icon: <Target className="h-6 w-6" />,
    title: "Clarity Over Complexity",
    description:
      "We break down complex insurance and tax concepts into simple, actionable guidance. No jargon, no confusion—just clear answers.",
  },
  {
    icon: <Heart className="h-6 w-6" />,
    title: "Client-First Always",
    description:
      "Your goals drive our recommendations. We never push products—we find solutions that genuinely fit your situation.",
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: "Long-Term Partnership",
    description:
      "We build relationships, not transactions. We're here year after year to adjust, optimize, and support you.",
  },
  {
    icon: <Award className="h-6 w-6" />,
    title: "Continuous Expertise",
    description:
      "Markets change, regulations evolve. We stay ahead so you don't have to—bringing you the latest strategies and options.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-background pb-16 pt-32 sm:pb-24 sm:pt-40">
        <div className="absolute right-0 top-20 h-[500px] w-[500px] rounded-full bg-accent/10 blur-[150px]" />

        <div className="container-custom relative z-10">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-display-mobile font-bold text-white sm:text-display">
              About Xentari
            </h1>
            <p className="mt-6 text-xl text-text-secondary">
              Since {siteConfig.foundedYear}, we've helped hundreds of clients
              navigate the complexities of health insurance and tax strategy
              with clarity, confidence, and care.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="section-padding bg-background-subtle">
        <div className="container-custom">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-8 text-3xl font-bold text-white">Our Story</h2>
            <div className="space-y-6 text-lg text-text-secondary">
              <p>
                Xentari was founded on a simple belief: everyone deserves access
                to clear, unbiased guidance when making important financial
                decisions about their health coverage and tax positioning.
              </p>
              <p>
                Too often, we saw individuals and businesses overwhelmed by
                confusing options, pressured by salespeople, or simply
                unaware of strategies that could save them thousands. We knew
                there had to be a better way.
              </p>
              <p>
                Today, we serve clients across South Florida—from
                self-employed professionals seeking individual coverage, to
                growing families planning for the future, to business owners
                building competitive benefits packages. Our approach remains
                the same: listen first, understand deeply, and guide
                strategically.
              </p>
              <p>
                We're not just insurance agents. We're advisors who connect
                health coverage with tax strategy to create smarter financial
                outcomes. We're partners who stay with you year after year as
                your needs evolve.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <h2 className="text-display-mobile font-bold text-white sm:text-display">
              What Guides Us
            </h2>
            <p className="mt-4 text-lg text-text-secondary">
              Our values shape every conversation, recommendation, and
              relationship we build.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {values.map((value) => (
              <Card key={value.title}>
                <div className="mb-4 inline-flex rounded-xl bg-accent/10 p-3 text-accent">
                  {value.icon}
                </div>
                <h3 className="mb-3 text-xl font-semibold text-white">
                  {value.title}
                </h3>
                <p className="text-text-secondary">{value.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="section-padding bg-background-subtle">
        <div className="container-custom">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <h2 className="mb-6 text-3xl font-bold text-white">
                Experience You Can Trust
              </h2>
              <div className="space-y-4 text-lg text-text-secondary">
                <p>
                  With over seven years in the industry, we've guided clients
                  through market changes, regulatory shifts, and life
                  transitions of all kinds.
                </p>
                <p>
                  We've helped families welcome new members and find coverage
                  that grows with them. We've supported business owners in
                  building benefits packages that attract top talent. We've
                  shown clients tax strategies they didn't know existed.
                </p>
                <p>
                  Every situation is unique, but our commitment stays constant:
                  provide the guidance you need to make confident decisions.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <Card className="text-center">
                <div className="text-4xl font-bold text-accent">7+</div>
                <div className="mt-2 text-text-muted">Years Experience</div>
              </Card>
              <Card className="text-center">
                <div className="text-4xl font-bold text-accent">500+</div>
                <div className="mt-2 text-text-muted">Clients Served</div>
              </Card>
              <Card className="text-center">
                <div className="text-4xl font-bold text-accent">$10M+</div>
                <div className="mt-2 text-text-muted">Coverage Placed</div>
              </Card>
              <Card className="text-center">
                <div className="text-4xl font-bold text-accent">98%</div>
                <div className="mt-2 text-text-muted">Retention Rate</div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
