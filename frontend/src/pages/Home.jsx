/**
 * Home Page
 * Combines all homepage sections: Hero, Stats, Services, Benefits, Team, Contact.
 */
import Hero from '../components/Hero';
import Intro from '../components/Intro';
import Services from '../components/Services';
import Benefits from '../components/Benefits';
import Team from '../components/Team';
import Stats from '../components/Stats';
import Contact from '../components/Contact';


export default function Home() {
  return (
    <>
      <Hero />
      <Intro />
      <Services />
      <Benefits />
      <Stats />
      <Team />
      <Contact />
    </>
  );
}
