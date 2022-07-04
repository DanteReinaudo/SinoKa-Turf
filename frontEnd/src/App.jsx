import { Route, Switch } from 'react-router-dom';
import Layout from './components/layout/Layout';
import VerCaballo from "./pages/caballo/VerCaballo";
import VerCarrera from "./pages/carreras/VerCarrera";
import VerCarreras from "./pages/carreras/VerCarreras";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

const App = () => {
  return (
    <Layout>
      <Switch>
        <Route path='/' exact>
          <Home/>
        </Route>
        <Route path='/carreras'>
          <VerCarreras />
        </Route>
        <Route path='/carrera'>
          <VerCarrera />
        </Route>
        <Route path='/caballo'>
          <VerCaballo />
        </Route>
        <Route path='*'>
          <NotFound />
        </Route>
      </Switch>
    </Layout>
  )
};

export default App;
