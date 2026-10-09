// OWNER: B5. Pricing page.
import MarketingShell from '../../components/marketing/Shell.jsx';
import PricingPlans from '../../components/marketing/PricingPlans.jsx';
import DemoButton from '../../components/marketing/DemoButton.jsx';
import { Compare, Faq, FinalCta } from '../../components/marketing/Sections.jsx';
import { useM, useSeo } from '../../components/marketing/useMarketing.js';

export default function Pricing() {
  const m = useM();
  useSeo(m.meta.pricingTitle, m.meta.pricingDesc);
  return (
    <MarketingShell>
      <section aria-labelledby="pricing-h" className="pt-16 sm:pt-20 pb-20">
        <div className="max-w-6xl mx-auto px-4 lg:px-6">
          <div className="max-w-2xl mx-auto text-center mb-10">
            <h1 id="pricing-h" className="text-4xl sm:text-5xl font-bold leading-tight">{m.pricing.pageTitle}</h1>
            <p className="mt-4 text-lg text-sand-700">{m.pricing.pageSub}</p>
            <p className="mt-2 text-sand-600">{m.pricing.sub}</p>
          </div>
          <PricingPlans />
        </div>
      </section>
      <Compare />
      <Faq />
      <FinalCta demo={<DemoButton tone="dark" />} />
    </MarketingShell>
  );
}
