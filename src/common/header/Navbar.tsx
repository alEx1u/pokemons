import { useMediaQuery } from 'react-responsive';
import { MobileMenu } from './MobileMenu/MobileMenu';
import { DesktopMenu } from './DesktopMenu/DesktopMenu';

export const Navbar = () => {
  const isMobile = useMediaQuery({ maxWidth: 768 });
  return isMobile ? <MobileMenu /> : <DesktopMenu />;
};
