"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

export function PricingSection() {
  // Example 4 plans (Free, Basic, Pro, Institution) with different features:
  const plans = [
    {
      title: "Free",
      price: "0",
      features: [
        "5 Mock Tests",
        "Basic Performance Analytics",
        "Community Support",
        "30 Day Access",
      ],
    },
    {
      title: "Basic",
      price: "99",
      features: [
        "10 Mock Tests",
        "Basic Performance Analytics",
        "Email Support",
        "3 Month Access",
      ],
    },
    {
      // We'll highlight "Professional" in styling
      title: "Professional",
      price: "269",
      features: [
        "Unlimited Mock Tests",
        "Advanced Analytics",
        "Priority Support",
        "1 Year Access",
        "Personal Feedback",
      ],
    },
    {
      title: "Business",
      price: "Custom",
      features: [
        "Custom Test Creation",
        "Admin Dashboard",
        "Bulk User Management",
        "API Access",
        "Dedicated Support",
      ],
    },
  ];

  return (
    <section id="pricing" className="py-20 bg-gradient-to-tl from-indigo-950 to-black">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-white text-center mb-12">
          Simple, Transparent Pricing
        </h2>

        {/* 4-column grid on md+ screens */}
        <div className="grid md:grid-cols-4 gap-8">
          {plans.map((plan, i) => {
            // We'll highlight the 3rd plan (i === 2 => "Professional") as an example:
            const isHighlighted = i === 2;

            return (
              <Card
                key={plan.title}
                className={`p-8 transition-transform ${
                  isHighlighted
                    ? "bg-white text-indigo-900 scale-105"
                    : "bg-white/10 text-white"
                }`}
              >
                <h3 className="text-2xl font-bold mb-2">{plan.title}</h3>

                {/* Price */}
                <div className="mb-6">
                  {plan.price === "Custom" ? (
                    <span className="text-4xl font-bold">{plan.price}</span>
                  ) : (
                    <>
                      <span className="text-4xl font-bold">
                        ${plan.price}
                      </span>
                      <span className="text-sm">/month</span>
                    </>
                  )}
                </div>

                {/* Feature List */}
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <CheckCircle className="h-5 w-5 mr-2 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <Button
                  className={`w-full ${
                    isHighlighted
                      ? "bg-indigo-900 text-white hover:bg-indigo-800"
                      : ""
                  }`}
                >
                  Get Started
                </Button>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
