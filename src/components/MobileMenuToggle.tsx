import { useState } from 'react';
import mobileMenu from '../assets/mobile_menu_button.svg';

export default function MobileMenu() {
    const [open, setOpen] = useState(false);

    return (
        <>
            <button
                onClick={() => setOpen(!open)}
                aria-expanded={open}
                aria-label="Toggle menu"
            >
                <img src={mobileMenu.src} alt="nav-menu" />
            </button>

            {open && (
                <div className="sm:hidden flex flex-col px-5 mt-3 gap-3">
                    <a href="/" className="hover:underline">Was ist der Klimawandel?</a>
                    <a href="/emissions" className="hover:underline">CO₂-Emissionen</a>
                    <a href="/about" className="hover:underline">Über uns</a>
                </div>
            )}
        </>
    );
}
