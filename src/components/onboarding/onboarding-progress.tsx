"use client";

import { cn } from "@/lib/utils/cn";
import { ONBOARDING_STEPS, type OnboardingStepId } from "@/lib/constants/app";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";

interface OnboardingProgressProps {
  currentStep: OnboardingStepId;
}

export function OnboardingProgress({ currentStep }: OnboardingProgressProps) {
  const currentIndex = ONBOARDING_STEPS.findIndex((s) => s.id === currentStep);
  const progress = ((currentIndex + 1) / ONBOARDING_STEPS.length) * 100;

  return (
    <div className="mb-8">
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm font-medium text-text-secondary">
          Step {currentIndex + 1} of {ONBOARDING_STEPS.length}
        </p>
        <p className="text-sm font-medium text-accent">{Math.round(progress)}%</p>
      </div>
      <Progress value={progress} className="h-1.5" />
      <div className="mt-6 hidden gap-2 sm:flex">
        {ONBOARDING_STEPS.map((step, i) => (
          <div key={step.id} className="flex-1">
            <motion.div
              className={cn(
                "h-1 rounded-full transition-colors",
                i <= currentIndex ? "bg-accent" : "bg-border"
              )}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: i * 0.05 }}
            />
            <p
              className={cn(
                "mt-2 text-xs",
                i === currentIndex ? "font-medium text-accent" : "text-text-tertiary"
              )}
            >
              {step.title}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
