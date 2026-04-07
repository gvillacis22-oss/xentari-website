import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export function Card({ children, className, hover = true }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-[#FF6B35]/20 bg-background-card p-6 sm:p-8",
        hover &&
          "transition-all duration-300 hover:border-[#FF6B35]/40",
        className
      )}
    >
      {children}
    </div>
  );
}

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
}

export function ServiceCard({
  icon,
  title,
  description,
  href,
}: ServiceCardProps) {
  return (
    <Link href={href} className="group block">
      <Card className="h-full">
        <div className="mb-4 inline-flex rounded-xl bg-accent/10 p-3 text-accent">
          {icon}
        </div>
        <h3 className="mb-3 text-xl font-semibold text-white">{title}</h3>
        <p className="mb-4 text-text-secondary">{description}</p>
        <span className="inline-flex items-center gap-2 text-sm font-medium text-accent transition-all group-hover:gap-3">
          Learn More
          <ArrowRight className="h-4 w-4" />
        </span>
      </Card>
    </Link>
  );
}

interface StatCardProps {
  value: string;
  label: string;
}

export function StatCard({ value, label }: StatCardProps) {
  return (
    <div className="text-center">
      <div className="text-3xl font-bold text-accent sm:text-4xl">{value}</div>
      <div className="mt-1 text-sm text-text-muted">{label}</div>
    </div>
  );
}

interface TestimonialCardProps {
  quote: string;
  author: string;
  role: string;
}

export function TestimonialCard({ quote, author, role }: TestimonialCardProps) {
  return (
    <Card className="flex h-full flex-col">
      <blockquote className="flex-1">
        <p className="text-lg leading-relaxed text-white">&ldquo;{quote}&rdquo;</p>
      </blockquote>
      <div className="mt-6 border-t border-border pt-4">
        <p className="font-semibold text-white">{author}</p>
        <p className="text-sm text-text-muted">{role}</p>
      </div>
    </Card>
  );
}
