import { useDispatch } from 'react-redux';
import Button from '../shared/Button';
import { ReactComponent as Icon } from "../../assets/pageicon.svg";
import { logout } from "../auth/service";
import classNames from "classnames";
import "./Header.css";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../auth/context";
import { authLogout } from '../../redux/actions';

const Header = ({ className }) => {
  const { isLogged } = useAuth();
  const dispatch = useDispatch();
  const onLogout = () => dispatch(authLogout());
  const handleLogoutClick = async () => {
    await logout();
    onLogout();
  };

  return (
    <header className={classNames('header', className)}>
      <Link to="/">
        <div className="header-logo">
          <Icon width="45" height="45" />
        </div>
      </Link>
      <nav className="header-nav">
        <NavLink to="/adverts/new" className="header-nav-item">
          Create new advert
        </NavLink>{' '}
        |
        <NavLink to="/adverts" className="header-nav-item" end>
          See latest adverts
        </NavLink>
        {isLogged ? (
          <Button onClick={handleLogoutClick} className="header-button">
            Logout
          </Button>
        ) : (
          <Button
            as={Link}
            variant="primary"
            className="header-button"
            to="/login"
          >
            Login
          </Button>
        )}
      </nav>
    </header>
  );
};

export default Header;
