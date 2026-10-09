// OWNER: B5. Marketing landing page (Arabic-first, EN toggle).
import { Link } from 'react-router-dom';
import MarketingShell from '../../components/marketing/Shell.jsx';
import HeroMock from '../../components/marketing/HeroMock.jsx';
import DemoButton from '../../components/marketing/DemoButton.jsx';
import PricingPlans from '../../components/marketing/PricingPlans.jsx';
import { Leaks, Features, HowItWorks, Compare, Faq, FinalCta, SectionHead } from '../../components/marketing/Sections.jsx';
import { useM, useSeo } from '../../components/marketing/useMarketing.js';

export default function Landing() {
  const m = useM();
  useSeo(m.meta.landingTitle, m.meta.landingDesc);

  return (
    <MarketingShell>
      {/* Hero: petrol full-bleed, the product itself is the illustration */}
      <section aria-labelledby="hero-h" className="bg-petrol-800 text-sand-50 relative overflow-hidden">
        <div aria-hidden="true" className="absolute inset-0 opacity-[.07]"
          style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #FBF9F5 1px, transparent 0)', backgroundSize: '22px 22px' }} />
        <div className="relative max-w-6xl mx-auto px-4 lg:px-6 pt-14 sm:pt-20 pb-24 sm:pb-32 grid gap-14 lg:grid-cols-[1fr_1.05fr] items-center">
          <div>
            <p className="text-petrol-200 text-base">{m.hero.kicker}</p>
            <h1 id="hero-h" className="mt-4 text-[2.4rem] leading-[1.25] sm:text-6xl sm:leading-[1.15] ltr:sm:text-[3.2rem] font-bold text-balance">{m.hero.title}</h1>
            <p className="mt-6 text-lg sm:text-xl leading-8 sm:leading-9 text-petrol-100 max-w-xl">{m.hero.sub}</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link to="/signup" className="h-12 px-6 inline-flex items-center rounded-xl bg-saffron-400 text-petrol-900 text-lg font-semibold hover:bg-saffron-300 focus-visible:outline-none focus-visible:shadow-ring">
                {m.hero.cta}
              </Link>
              <DemoButton tone="dark" />
            </div>
            <p className="mt-4 text-sm text-petrol-200">{m.hero.note}</p>
          </div>
          <div className="lg:ps-4"><HeroMock /></div>
        </div>
      </section>

      <Leaks />
      <Features />
      <HowItWorks />
      <Compare />

      <section id="pricing" aria-labelledby="pricing-h" className="py-20 sm:py-24 scroll-mt-16">
        <div className="max-w-6xl mx-auto px-4 lg:px-6">
          <SectionHead id="pricing-h" title={m.pricing.title} sub={m.pricing.sub} className="mx-auto text-center mb-10" />
          <PricingPlans />
        </div>
      </section>

      <Faq />
      <FinalCta demo={<DemoButton tone="dark" />} />
    </MarketingShell>
  );
}
