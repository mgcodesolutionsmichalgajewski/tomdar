import { Header } from "./components/header";
import { Hero, Products, About, Services, Partners, Contact, Footer } from "./components/sections";
import { Advice } from "./components/advice";
import { useReveal } from "./use-reveal";
export default function App() {
  const main = useReveal();
  return (
    <>
      <Header />
      <main ref={main}>
        <Hero />
        <About />
        <Services />
        <Products />
        <Advice />
        <Partners />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
