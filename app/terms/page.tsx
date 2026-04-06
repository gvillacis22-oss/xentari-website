import type { Metadata } from "next";
import { siteConfig, contactInfo } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `Terms of Service for ${siteConfig.name}. Read our terms and conditions for using our website and services.`,
};

export default function TermsPage() {
  return (
    <section className="bg-background pb-24 pt-32 sm:pt-40">
      <div className="container-custom">
        <div className="mx-auto max-w-3xl">
          <h1 className="mb-8 text-display-mobile font-bold text-white sm:text-display">
            Terms of Service
          </h1>
          <p className="mb-8 text-text-muted">
            Last updated: {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
          </p>

          <div className="prose prose-invert max-w-none space-y-8">
            <section>
              <h2 className="mb-4 text-2xl font-semibold text-white">
                Agreement to Terms
              </h2>
              <p className="text-text-secondary">
                By accessing or using the {siteConfig.name} website and services,
                you agree to be bound by these Terms of Service. If you do not
                agree to these terms, please do not use our website or services.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-semibold text-white">
                Services Description
              </h2>
              <p className="text-text-secondary">
                {siteConfig.name} provides educational information and guidance
                related to health insurance, employee benefits, and tax
                structuring strategies. Our services are informational and
                advisory in nature. We help clients understand their options and
                make informed decisions.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-semibold text-white">
                No Guarantee of Results
              </h2>
              <p className="text-text-secondary">
                While we strive to provide accurate and helpful information, we
                cannot guarantee specific outcomes, savings, or results. Insurance
                coverage, costs, and tax implications vary based on individual
                circumstances and are subject to change based on carrier
                decisions, regulatory changes, and other factors outside our
                control.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-semibold text-white">
                Not Legal or Tax Advice
              </h2>
              <p className="text-text-secondary">
                The information provided through our website and services is for
                educational purposes only and should not be considered legal,
                tax, or financial advice. We recommend consulting with licensed
                professionals (such as CPAs, tax attorneys, or financial
                advisors) for specific advice related to your situation.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-semibold text-white">
                User Responsibilities
              </h2>
              <p className="mb-4 text-text-secondary">
                When using our services, you agree to:
              </p>
              <ul className="list-disc space-y-2 pl-6 text-text-secondary">
                <li>Provide accurate and complete information</li>
                <li>Use our services for lawful purposes only</li>
                <li>Not misrepresent your identity or circumstances</li>
                <li>Respect our intellectual property rights</li>
              </ul>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-semibold text-white">
                Intellectual Property
              </h2>
              <p className="text-text-secondary">
                All content on this website, including text, graphics, logos, and
                images, is the property of {siteConfig.name} and is protected by
                copyright and other intellectual property laws. You may not
                reproduce, distribute, or create derivative works without our
                written permission.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-semibold text-white">
                Limitation of Liability
              </h2>
              <p className="text-text-secondary">
                To the fullest extent permitted by law, {siteConfig.name} shall
                not be liable for any indirect, incidental, special, or
                consequential damages arising from your use of our website or
                services. Our total liability shall not exceed the amount you
                paid us for services, if any.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-semibold text-white">
                Changes to Terms
              </h2>
              <p className="text-text-secondary">
                We reserve the right to modify these Terms of Service at any
                time. Changes will be effective immediately upon posting to our
                website. Your continued use of our services after changes
                constitutes acceptance of the modified terms.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-semibold text-white">
                Contact Us
              </h2>
              <p className="text-text-secondary">
                If you have questions about these Terms of Service, please
                contact us at:
              </p>
              <p className="mt-4 text-text-secondary">
                Email:{" "}
                <a
                  href={contactInfo.emailHref}
                  className="text-accent hover:underline"
                >
                  {contactInfo.email}
                </a>
                <br />
                Phone:{" "}
                <a
                  href={contactInfo.phoneHref}
                  className="text-accent hover:underline"
                >
                  {contactInfo.phone}
                </a>
              </p>
            </section>
          </div>
        </div>
      </div>
    </section>
  );
}
