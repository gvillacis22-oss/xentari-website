"use client";

import { useState } from "react";
import { Send, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input, Textarea, Select } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";
import { coverageTypes, contactInfo } from "@/lib/constants";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  coverageType: string;
  message: string;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  coverageType?: string;
}

type FormStatus = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    coverageType: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<FormStatus>("idle");

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    }

    if (!formData.coverageType) {
      newErrors.coverageType = "Please select a coverage type";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setStatus("submitting");

    // Simulate form submission
    // Replace this with your actual form submission logic
    // (e.g., API call, email service, CRM integration)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // For now, we'll just log the data
      console.log("Form submitted:", formData);

      setStatus("success");
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        coverageType: "",
        message: "",
      });
    } catch {
      setStatus("error");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  if (status === "success") {
    return (
      <Card className="mx-auto max-w-2xl text-center">
        <div className="py-8">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10">
            <CheckCircle className="h-8 w-8 text-green-500" />
          </div>
          <h3 className="mb-2 text-2xl font-semibold text-white">
            Thank You!
          </h3>
          <p className="mb-6 text-text-secondary">
            We've received your message and will be in touch within 24 hours.
          </p>
          <Button onClick={() => setStatus("idle")} variant="secondary">
            Submit Another Request
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <div className="grid gap-12 lg:grid-cols-5">
      {/* Form */}
      <div className="lg:col-span-3">
        <Card hover={false}>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Fields */}
            <div className="grid gap-6 sm:grid-cols-2">
              <Input
                id="firstName"
                name="firstName"
                label="First Name"
                placeholder="John"
                value={formData.firstName}
                onChange={handleChange}
                error={errors.firstName}
                required
              />
              <Input
                id="lastName"
                name="lastName"
                label="Last Name"
                placeholder="Smith"
                value={formData.lastName}
                onChange={handleChange}
                error={errors.lastName}
                required
              />
            </div>

            {/* Contact Fields */}
            <div className="grid gap-6 sm:grid-cols-2">
              <Input
                id="email"
                name="email"
                type="email"
                label="Email Address"
                placeholder="john@example.com"
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
                required
              />
              <Input
                id="phone"
                name="phone"
                type="tel"
                label="Phone Number"
                placeholder="(555) 555-5555"
                value={formData.phone}
                onChange={handleChange}
                error={errors.phone}
                required
              />
            </div>

            {/* Coverage Type */}
            <Select
              id="coverageType"
              name="coverageType"
              label="Coverage Type Needed"
              options={coverageTypes}
              value={formData.coverageType}
              onChange={handleChange}
              error={errors.coverageType}
              required
            />

            {/* Message */}
            <Textarea
              id="message"
              name="message"
              label="Message (Optional)"
              placeholder="Tell us about your situation or any specific questions you have..."
              rows={4}
              value={formData.message}
              onChange={handleChange}
            />

            {/* Error Message */}
            {status === "error" && (
              <div className="flex items-center gap-2 rounded-lg bg-red-500/10 p-4 text-red-500">
                <AlertCircle className="h-5 w-5 flex-shrink-0" />
                <p className="text-sm">
                  Something went wrong. Please try again or contact us directly.
                </p>
              </div>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              size="lg"
              className="w-full justify-center"
              disabled={status === "submitting"}
            >
              {status === "submitting" ? (
                "Sending..."
              ) : (
                <>
                  Send Message
                  <Send className="h-5 w-5" />
                </>
              )}
            </Button>

            <p className="text-center text-sm text-text-muted">
              By submitting this form, you agree to be contacted about our
              services.
            </p>
          </form>
        </Card>
      </div>

      {/* Contact Info Sidebar */}
      <div className="lg:col-span-2">
        <div className="sticky top-28 space-y-8">
          {/* Direct Contact */}
          <Card hover={false}>
            <h3 className="mb-4 text-lg font-semibold text-white">
              Prefer to Talk?
            </h3>
            <p className="mb-6 text-text-secondary">
              Skip the form and reach out directly. We're here to help.
            </p>
            <div className="space-y-4">
              <a
                href={contactInfo.phoneHref}
                className="block rounded-lg bg-background-subtle p-4 transition-colors hover:bg-accent/10"
              >
                <p className="text-sm text-text-muted">Phone</p>
                <p className="text-lg font-medium text-white">
                  {contactInfo.phone}
                </p>
              </a>
              <a
                href={contactInfo.emailHref}
                className="block rounded-lg bg-background-subtle p-4 transition-colors hover:bg-accent/10"
              >
                <p className="text-sm text-text-muted">Email</p>
                <p className="text-lg font-medium text-white">
                  {contactInfo.email}
                </p>
              </a>
            </div>
          </Card>

          {/* What to Expect */}
          <Card hover={false}>
            <h3 className="mb-4 text-lg font-semibold text-white">
              What to Expect
            </h3>
            <ul className="space-y-3 text-text-secondary">
              <li className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-accent" />
                Response within 24 hours
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-accent" />
                Free, no-obligation consultation
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-accent" />
                Personalized coverage analysis
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-accent" />
                No pressure, just honest guidance
              </li>
            </ul>
          </Card>

          {/* Calendly/Cal.com Integration Note */}
          {/*
          To integrate Calendly or Cal.com:

          1. For Calendly:
             <div
               className="calendly-inline-widget"
               data-url="https://calendly.com/YOUR_USERNAME"
               style={{ minWidth: '320px', height: '630px' }}
             />
             <script src="https://assets.calendly.com/assets/external/widget.js" async />

          2. For Cal.com:
             import Cal from "@calcom/embed-react";
             <Cal calLink="YOUR_USERNAME" />
          */}
        </div>
      </div>
    </div>
  );
}
