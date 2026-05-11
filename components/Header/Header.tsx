"use client"
import css from "@/components/Header/Header.module.css";
import Link from "next/link";
import AuthNavigation from "../AuthNavigation/AuthNavigation";
import { useAuthStore } from "@/lib/store/authStore";


const Header = () => {
 const isAuthed = useAuthStore((state) => state.isAuthenticated);
    return (
        <header className={css.header}>
            <Link className={css.headerLink} href="/" aria-label="Home">
                NoteHub
            </Link>
            <nav aria-label="Main Navigation">
                <ul className={css.navigation}>
                
                    <li>
                        <Link className={css.headerLink} href="/">Home</Link>
                        </li>
                        {isAuthed && ( 
                    <li>
                        <Link className={css.headerLink} href="/notes/filter/all">Notes</Link>
                            </li>
                        )}
                    <AuthNavigation/>
                </ul>
            </nav>
        </header>
    )
}
export default Header;
