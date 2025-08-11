import { useState } from 'react';
import mobileMenu from '../assets/mobile_menu_button.svg';

export default function MobileMenu() {
    const [open, setOpen] = useState(false);

    return (
        <>
            <button
                onClick={() => setOpen(true)}
            >
                <img src={mobileMenu.src} alt="nav-menu" />
            </button>

            {open && (
                <div className="sm:hidden absolute top-0 right-0 bg-black/50 h-screen w-screen z-1">
                    <div className="sm:hidden flex flex-col gap-8 absolute top-0 right-0 bg-white h-1/3 w-screen z-2 items-center justify-center">
                        <button className="absolute top-0 right-0 p-10" onClick={() => setOpen(false)}>X</button>
                        <a href="/">Was ist der Klimawandel?</a>
                        <a href="/emissions">CO₂-Emissionen</a>
                        <a href="/about">Über uns</a>
                    </div>
                </div>

            )}
        </>
    );
}
