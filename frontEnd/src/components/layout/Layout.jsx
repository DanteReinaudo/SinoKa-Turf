import { Fragment } from 'react';

import classes from './Layout.module.css';
import MainNavigation from './MainNavigation';
import Footer from '../Footer'
const Layout = (props) => {
  return (
    <Fragment>
      <MainNavigation />
      <main className={classes.main}>{props.children} </main>
      <Footer/>
    </Fragment>
  );
};

export default Layout;
