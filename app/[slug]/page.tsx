import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Events from "@/components/sections/Events";
import Music from "@/components/sections/Music";
import Gallery from "@/components/sections/Gallery";
import Rider from "@/components/sections/Rider";
import Contact from "@/components/sections/Contact";

export default async function DJPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  
  return (
    <main>
      <Hero />
      <About />
      <Events />
      <Music />
      <Gallery />
      <Rider />
      <Contact />
    </main>
  );
}