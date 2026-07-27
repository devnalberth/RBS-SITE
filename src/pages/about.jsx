import Head from 'next/head';
import AboutHero from '@/components/about/AboutHero';
import AboutStory from '@/components/about/AboutStory';
import AboutMission from '@/components/about/AboutMission';
import AboutTeam from '@/components/about/AboutTeam';
import AboutTimeline from '@/components/about/AboutTimeline';
import AboutClients from '@/components/about/AboutClients';
import AboutCTA from '@/components/about/AboutCTA';

export default function About() {
  return (
    <>
      <Head>
        <title>About Us - Empower | Business Consulting & Training</title>
        <meta
          name="description"
          content="Learn about Empower — our story, mission, team, and the values that drive us to deliver exceptional strategic consulting."
        />
      </Head>
      <main className="selection:bg-accent selection:text-white">
        <AboutHero />
        <AboutStory />
        <AboutMission />
        <AboutTeam />
        <AboutTimeline />
        <AboutClients />
        <AboutCTA />
      </main>
    </>
  );
}
