import css from "@/components/SidebarNotes/SidebarNotes.module.css";

import Link from "next/link";

export const SidebarNotes = async () => {
    const categories = ["Todo", "Work", "Personal", "Meeting", "Shopping"]

    return (
        <ul className={css.menuList}>
            <li className={css.menuItem}>
                <Link href={`/notes/filter/all`} className={css.menuLink}>
                    All notes
                </Link>
            </li>
            {categories.map((tag) => (
                <li key={tag} className={css.menuItem}>
                    <Link className={css.menuLink} href={`/notes/filter/${tag}`}>{tag}
                    </Link>
                </li>))}
        </ul>
 
    );
};