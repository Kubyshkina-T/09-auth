import css from "@/app/page.module.css";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Page Not Found",
    description: "Oops! This page does not exist.",
    openGraph: {
        title: "Page Not Found",
        description: "Oops! This page does not exist.",
        url: "not-found",
        images: [
            {
                alt:"Page not found",
                url: "/notehub-og-meta.jpg",
                width: 1200,
                height: 630,
            },
        ],
    },
};

const NotFound = () => {

    return (
        <>
            <h1 className={css.title}>404 - Page not found</h1>
            <p className={css.description}>Sorry, the page you are looking for does not exist.</p>
        </>
    );
};

export default NotFound;
