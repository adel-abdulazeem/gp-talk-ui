import Header from './partials/Header';
import Footer from './partials/Footer';
const Layout = ({ children }) => {

    const navLinks = [
      { path: '/', name: 'Dashboard' },
    ];

    return (
      <div>
        <Header links={navLinks} />
        {children}
        <Footer/>
      </div>
    );
  };

  export default Layout
