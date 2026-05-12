"use client";

import css from "@/app/(private routes)/profile/edit/EditProfilePage.module.css";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getMe, updateMe } from "@/lib/api/clientApi";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useAuthStore } from "@/lib/store/authStore";

export default function EditProfilePage() {
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);

  const { data: user } = useQuery({
    queryKey: ["user"],
    queryFn: getMe,
  });


  const { mutate, isPending } = useMutation({
    mutationFn: updateMe,
    onSuccess: (updatedUser) => {
      setUser(updatedUser);
      router.push("/profile");
    },
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
     const formData = new FormData(event.currentTarget);

  const username = formData.get("username") as string;
    mutate({ username });
  };

  const handleCancel = () => {
    router.push("/profile");
  };

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>

        {user?.avatar && (
          <Image
            src={user.avatar}
            alt="User Avatar"
            width={120}
            height={120}
            className={css.avatar}
          />
        )}

        <form className={css.profileInfo} onSubmit={handleSubmit}>
          <div className={css.usernameWrapper}>
            <label htmlFor="username">Username</label>
            <input
  id="username"
  name="username"
  type="text"
  className={css.input}
  defaultValue={user?.username}
/>
          </div>

          <p>Email: {user?.email}</p>

          <div className={css.actions}>
            <button type="submit" className={css.saveButton} disabled={isPending}>
              {isPending ? "Saving..." : "Save"}
            </button>
            <button type="button" className={css.cancelButton} onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}