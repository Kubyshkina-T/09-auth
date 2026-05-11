import type { Metadata } from "next";
import css from "./ProfilePage.module.css";
import Link from "next/link";
import { User } from "@/types/user";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Profile | NoteHub",
  description: "User profile page",
  openGraph: {
    title: "Profile | NoteHub",
    description: "User profile page",
    url: "https://09-auth-eta-ebon.vercel.app/profile",
    images: [
      {
        url: "/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "NoteHub preview",
      },
    ],
  },
};

export default function Profile() {
  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <div className={css.header}>
          <h1 className={css.formTitle}>Profile Page</h1>
          <Link href="/profile/edit" className={css.editProfileButton}>
            Edit Profile
          </Link>
        </div>

        <div className={css.avatarWrapper}>
          <Image
            src={"/notehub-og-meta.jpg"}
            alt="User Avatar"
            width={120}
            height={120}
            className={css.avatar}
          />
        </div>

        <div className={css.profileInfo}>
          <p>Username: your_username</p>
          <p>Email: your_email@example.com</p>
        </div>
      </div>
    </main>
  );
}