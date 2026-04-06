import type { Metadata } from "next";
import { siteConfig, contactInfo } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Privacy Policy for ${siteConfig.name}. Learn how we collect, use, and protect your personal information.`,
};

export default function PrivacyPage() {
  return (
    <section className="bg-background pb-24 pt-32 sm:pt-40">
      <div className="container-custom">
        <div className="mx-auto max-w-3xl">
          <h1 className="mb-8 text-display-mobile font-bold text-white sm:text-display">
            Privacy Policy
          </h1>
          <p className="mb-8 text-text-muted">
            Last updated: {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
          </p>

          <div className="prose prose-invert max-w-none space-y-8">
            <section>
              <h2 className="mb-4 text-2xl font-semibold text-white">
                Introduction
              </h2>
              <p className="text-text-secondary">
                {siteConfig.name} ("we," "our," or "us") respects your privacy and is
                committed to protecting your personal information. This Privacy
                Policy explains how we collect, use, disclose, and safeguard your
                information when you visit our website or use our services.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-semibold text-white">
                Information We Collect
              </h2>
              <p className="mb-4 text-text-secondary">
                We may collect personal information that you voluntarily provide
                to us when you:
              </p>
              <ul className="list-disc space-y-2 pl-6 text-text-secondary">
                <li>Fill out a contact or consultation request form</li>
                <li>Subscribe to our newsletter or communications</li>
                <li>Request information about our services</li>
                <li>Communicate with us via phone, email, or other methods</li>
              </ul>
              <p className="mt-4 text-text-secondary">
                This information may include your name, email address, phone
                number, and any other information you choose to provide.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-semibold text-white">
                How We Use Your Information
              </h2>
              <p className="mb-4 text-text-secondary">
                We use the information we collect to:
              </p>
              <ul className="list-disc space-y-2 pl-6 text-text-secondary">
                <li>Respond to your inquiries and provide requested services</li>
                <li>Send you information about our services</li>
                <li>Improve our website and services</li>
                <li>Comply with legal obligations</li>
                <li>Protect against fraudulent or illegal activity</li>
              </ul>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-semibold text-white">
                Information Sharing
              </h2>
              <p className="text-text-secondary">
                We do not sell, trade, or rent your personal information to third
                parties. We may share your information with trusted service
                providers who assist us in operating our website and conducting
                our business, provided they agree to keep this information
                confidential.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-semibold text-white">
                Data Security
              </h2>
              <p className="text-text-secondary">
                We implement appropriate technical and organizational measures to
                protect your personal information against unauthorized access,
                alteration, disclosure, or destruction. However, no method of
                transmission over the Internet is 100% secure.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-semibold text-white">
                Your Rights
              </h2>
              <p className="text-text-secondary">
                You have the right to access, correct, or delete your personal
                information. You may also opt out of receiving marketing
                communications from us at any time. To exercise these rights,
                please contact us using the information below.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-semibold text-white">
                Contact Us
              </h2>
              <p className="text-text-secondary">
                If you have questions about this Privacy Policy, please contact us
                at:
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
