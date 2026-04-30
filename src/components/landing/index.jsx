import Hero from './Hero';
import StatsSection from './StatsSection';
import WhyVote from './WhyVote';
import ConstitutionSection from './ConstitutionSection';
import ElectionTimeline from './ElectionTimeline';
import ElectionBodies from './ElectionBodies';
import FeatureStrip from './FeatureStrip';

export default function LandingPage() {
  return (
    <div className='flex flex-col min-h-screen'>
      <Hero />
      <StatsSection />
      <WhyVote />
      <ConstitutionSection />
      <ElectionTimeline />
      <ElectionBodies />
      <FeatureStrip />
    </div>
  );
}