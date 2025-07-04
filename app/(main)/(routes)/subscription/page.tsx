import { SubscriptionNavBar } from "./_components/subscription-navbar";
import { SubscriptionFooter } from "./_components/subscription-footer";
import { PricingSection } from "./_components/pricing-cards";

export default function SubscriptionPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-tl from-indigo-950 to-black">
      <SubscriptionNavBar />
      <main className="flex-1">
        <PricingSection />
      </main>
      <SubscriptionFooter />
    </div>
  );
}
