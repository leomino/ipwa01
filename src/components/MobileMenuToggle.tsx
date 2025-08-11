import { useState } from 'react';
import mobileMenu from '../assets/mobile_menu_button.svg';
import { useTranslations } from '../i18n/utils';
import {getRelativeLocaleUrl} from "astro:i18n";

export default function MobileMenu({locale}: {locale: 'ar' | 'de'}) {
    const [open, setOpen] = useState(false);
    const t = useTranslations(locale);
    return (
        <>
            <button
                onClick={() => setOpen(true)}
            >
                <img src={mobileMenu.src} alt="nav-menu" />
            </button>

            {open && (
                <div className="sm:hidden absolute top-0 right-0 bg-black/50 h-screen w-screen z-1">
                    <div
                        className="sm:hidden flex flex-col gap-8 absolute top-0 right-0 bg-white h-1/3 w-screen z-2 items-center justify-center">
                        <button className="absolute top-0 right-0 p-10" onClick={() => setOpen(false)}>X</button>
                        <a href={getRelativeLocaleUrl(locale, '/')} className="hover:underline">{t('nav.home')}</a>
                        <a href={getRelativeLocaleUrl(locale, '/emissions')}
                           className="hover:underline">{t('nav.emissions')}</a>
                        <a href={getRelativeLocaleUrl(locale, '/about')} className="hover:underline">{t('nav.about')}</a>
                    </div>
                </div>

            )}
        </>
    );
}
