import DarkMode from "../buttons/DarkMode";
import NewChat from "../buttons/NewChat";
import SideWindow from "../buttons/SideWindow";
const Header = ({ links }) => {
    return (
      <header className="main-header sticky top-0 z-50">
        <nav className="main-nav">
            <ul>
                <li>
                <SideWindow/>
                </li>
                <li>
                  convo AI
                </li>
                <div className="action-buttons">
                <li >
                  <NewChat/>
                </li>
                <li>
                  <DarkMode/>
                </li>
                </div>
            </ul>
        </nav>
      </header>
    );
  };

  export default Header