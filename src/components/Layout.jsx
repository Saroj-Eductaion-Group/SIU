import Header from './Header'
import Footer from './Footer'
import TopNav from './Topnav';
import FloatingSocialMediaIcons from './FloatingSocialMediaIcons';
import HeaderCTA from './HeaderCTA';
import HelpDesk from './HelpDesk';




function Layout({children}){
    return (
        <div className="flex flex-col min-h-screen ">
          
            <HeaderCTA />
            <TopNav/>
            <Header  />
            <FloatingSocialMediaIcons />
            <div className="flex-1 overflow-hidden ">
                {children}
            </div>
            <HelpDesk />
            <Footer />
        </div>
    );
}

export default Layout;