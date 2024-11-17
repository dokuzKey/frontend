import { Features } from '@/components/features';
import { Hero } from '@/components/hero';
import { PricingBanner } from '@/components/pricing-banner';

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Hero />
      <PricingBanner />
      <Features />
    </div>
  );
}