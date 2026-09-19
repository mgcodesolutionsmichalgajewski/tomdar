import { Header } from "./components/header";
import { Hero, Products, About, Services, Partners, Contact, Footer } from "./components/sections";
import { Advice } from "./components/advice";
export default function App() {
  return (
    <>
      <Header />
      <main>
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
