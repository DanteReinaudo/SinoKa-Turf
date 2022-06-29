import { Navbar, Welcome, Footer, HorseCreator, Betting } from "./components";

const App = () => (
  <div className="min-h-screen">
    <div className="gradient-bg-welcome">
      <Navbar />
      <Welcome />
      <HorseCreator />
    </div>
    <div className="gradient-bg-footer">
      <Betting />
      <Footer />
    </div>
  </div>
);

export default App;
