'use client';

import { useState, useEffect } from 'react';
import Logobar from "@/components/Navbar/LogoNavbar";
import ScrollAwareLogobar from "./ScrollAwareLogobar";
import DesktopNavbar from "./Desktop/DesktopNavbar";
import MobileNavbar from "./Mobile/MobileNavbar";
import TryNavbar from './Desktop/TryNavbar';

// Responsive Navbar component with separate positioning logic
const Navbar = ({ 
    isMobile, 
    isMenuOpen, 
    setIsMenuOpen 
  }: { 
    isMobile: boolean;
    isMenuOpen?: boolean;
    setIsMenuOpen?: (isOpen: boolean) => void;
  }) => {
    if (isMobile) {
      return (
        <>
          <ScrollAwareLogobar />
          {isMenuOpen !== undefined && setIsMenuOpen !== undefined ? (
            <MobileNavbar 
              isMenuOpen={isMenuOpen} 
              setIsMenuOpen={setIsMenuOpen} 
            />
          ) : null}
        </>
      );
    } else {
      // Desktop navbar stays at the top
      return (
        <>
          <Logobar />
          <DesktopNavbar />
          <TryNavbar />
        </>
      );
    }
  };

export default function MainNavbar() {
    const [isMobile, setIsMobile] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        setMounted(true);
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 900);
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    if (!mounted) return null;

    return (
        <div className={isMobile ? "" : "my-[28px]"}>
        {isMobile ? (
            <>
                {!isMobileMenuOpen && <ScrollAwareLogobar />}
                <MobileNavbar 
                    isMenuOpen={isMobileMenuOpen} 
                    setIsMenuOpen={setIsMobileMenuOpen} 
                />
            </>
            ) : (
                <div className="flex items-center justify-between w-full">
                    <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center gap-[15px] top-[28px]">
                        <Navbar isMobile={false} />
                    </div>
                </div>
            )}
        </div>
    );
}