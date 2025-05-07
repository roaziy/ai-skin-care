'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { usePathname, useRouter } from 'next/navigation';
import { navItems } from "@/components/Navbar/navItems";

export default function DesktopNavbar() {
    const [selected, setSelected] = useState<number | null>(0);
    const [hovered, setHovered] = useState<number | null>(null);
    const [isSubmenuOpen, setIsSubmenuOpen] = useState(false);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const pathname = usePathname();
    const router = useRouter();

    // Update these to match the actual number of nav items (4 items)
    const widths = [78, 80, 112, 144];
    const positions = [4, 76, 154, 265];   

    useEffect(() => {
        // Check if path matches any nav item anchor
        let index = -1;
        for (let i = 0; i < navItems.length; i++) {
            if (pathname === navItems[i].anchor || 
                (navItems[i].anchor === '/' && pathname === '/')) {
                index = i;
                break;
            }
        }
        
        // Default to first item if no match
        setSelected(index !== -1 ? index : 0);
    }, [pathname]);

    const handleMouseEnter = (index: number) => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        setHovered(index);
        if (navItems[index].subItems.length > 0) setIsSubmenuOpen(true);
    };

    const handleMouseLeave = () => {
        timeoutRef.current = setTimeout(() => {
            setHovered(null);
            setIsSubmenuOpen(false);
        }, 200);
    };

    const handleNavClick = (index: number) => {
        setSelected(index);
        
        const item = navItems[index];
        // Direct navigation without locale prefix
        router.push(item.anchor);
    };

    return (
        <div>
            <div className="relative flex items-center bg-white/85 px-2 h-[48px] rounded-full shadow-[0px_1px_7px] shadow-gray-300/80 backdrop-blur-md">
                {selected !== null && (
                    <motion.div
                        className="absolute rounded-full bg-[#dadada]"
                        initial={false}
                        animate={{ 
                            left: positions[selected] || 0,
                            width: widths[selected] || 80
                        }}
                        transition={{ type: 'spring', stiffness: 150, damping: 20 }}
                        style={{
                            height: '40px',
                        }}
                    />
                )}

                {navItems.map((item, index) => (
                    <div
                        key={item.label}
                        className="relative"
                        onMouseEnter={() => handleMouseEnter(index)}
                        onMouseLeave={handleMouseLeave}
                    >
                        <motion.button
                            className={`relative z-10 px-4 py-2 text-[16px] transition-colors select-none ${
                                selected === index ? 'text-black' : 'text-gray-500 hover:text-black'
                            }`}
                            onClick={() => handleNavClick(index)}
                            whileTap={{ scale: 0.95 }}
                            whileHover={{ scale: 1.05 }}
                            transition={{ 
                                type: "spring", 
                                stiffness: 400, 
                                damping: 17 
                            }}
                        >
                            {item.label}
                        </motion.button>
                    </div>
                ))}
            </div>
        </div>
    );
}