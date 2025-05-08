import { motion, AnimatePresence } from "framer-motion";
import { navItems } from "../navItems";
import "@/styles/globals.css";
import { useRouter, usePathname } from "next/navigation";

interface MobileNavbarProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (isOpen: boolean) => void;
}

const MobileNavbar = ({ isMenuOpen, setIsMenuOpen }: MobileNavbarProps) => {
  const router = useRouter();
  const pathname = usePathname();
  
  const handleNavigation = (anchor: string) => {
    setIsMenuOpen(false);
    
    if (anchor.startsWith('#')) {
      // Handle hash/anchor links
      if (anchor === '#') {
        router.push(`/`);
      } else {
        router.push(`/${anchor}`);
      }
    } else if (anchor.startsWith('/')) {
      // Handle regular page navigation
      router.push(`${anchor}`);
    }
  };

  // Function to check if a menu item is active
  const isActive = (anchor: string) => {
    if (anchor === '/') {
      return pathname === `/` || pathname === `//`;
    } else if (anchor.startsWith('#')) {
      return pathname === `/` || pathname === `//`;
    } else {
      return pathname === `${anchor}`;
    }
  };

  // Animation variants
  const menuVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { 
        type: "spring",
        stiffness: 350,
        damping: 30,
        mass: 0.8
      }
    },
    exit: { 
      opacity: 0, 
      y: 20, 
      scale: 0.95,
      transition: { 
        duration: 0.2,
        ease: "easeInOut"
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i: number) => ({ 
      opacity: 1, 
      y: 0,
      transition: { 
        delay: i * 0.05,
        type: "spring",
        stiffness: 400,
        damping: 20
      }
    })
  };

  return (
    <>
    {/* Fullscreen backdrop blur */}
    {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-md" 
          style={{ zIndex: 40 }}
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    
    {/* Menu content */}
    <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed inset-x-0 bottom-0 flex justify-center items-end pb-[75px] z-[60] pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white/90 rounded-3xl p-6 w-[200px] shadow-lg border border-gray-200 pointer-events-auto"
              variants={menuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <ul className="space-y-4 text-center select-none">
                {navItems.map((item, i) => (
                  <motion.li 
                    key={item.label}
                    custom={i}
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <motion.button 
                      onClick={() => handleNavigation(item.anchor)}
                      className={`w-full py-2 px-4 rounded-lg transition-colors ${
                        isActive(item.anchor) ? 'bg-black/5 font-bold' : 'font-regular'
                      }`}
                      whileHover={{ 
                        backgroundColor: "rgba(0,0,0,0.06)", 
                        scale: 1.02 
                      }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {item.label}
                    </motion.button>
                  </motion.li>
                ))}
              </ul>
              </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
    {/* Navigation bar with menu button */}
    <nav className="bg-white/95 backdrop-blur-md outline-none outline-1 outline-black/60 flex justify-center items-center outline-offset-0 rounded-full p-4 fixed bottom-[20px] left-1/2 transform -translate-x-1/2 w-[100px] h-[40px] select-none z-50">
    <button
      onClick={() => setIsMenuOpen(!isMenuOpen)}
      className="px-7 py-5 rounded text-black font-bold"
    >
      {isMenuOpen ? "ХААХ" : "ЦЭС"}
    </button>
    </nav>
  </>
  );
};

export default MobileNavbar;