"use client"
import css from "@/app/(privat routes)/profile/edit/EditProfilePage.module.css";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { updateMe } from "@/lib/api/clientApi";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getMe } from "@/lib/api/clientApi";

export default function EditProfilePage() {
  const router = useRouter();
  const [username, setUsername] = useState("");


  const { mutate, isPending } = useMutation({
    mutationFn: updateMe,
    onSuccess: () => {
      router.push("/profile")
    }
  });

  const { data: user } = useQuery({
  queryKey: ["user"],
  queryFn: getMe,
});

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    mutate(username);
  };
  const handleCancel = () => {
router.push("/profile")
}

    return (
       <main className={css.mainContent}>
  <div className={css.profileCard}>
    <h1 className={css.formTitle}>Edit Profile</h1>

          <Image
            src="/notehub-og-meta.jpg"
      alt="User Avatar"
      width={120}
      height={120}
      className={css.avatar}
    />

    <form className={css.profileInfo} onSubmit={handleSubmit}>
      <div className={css.usernameWrapper}>
              <label htmlFor="username">Username:{user?.username }</label>
        <input id="username"
          type="text"
                className={css.input}
                value={username}
                onChange={(event)=> setUsername(event.target.value)}
        />
      </div>

            <p>Email: {user?.email }</p>

      <div className={css.actions}>
        <button type="submit" className={css.saveButton} disabled={isPending}>
                {isPending ? "Saving..." : "Save" }
        </button>
        <button type="button" className={css.cancelButton} onClick={handleCancel}>
          Cancel
        </button>
      </div>
    </form>
  </div>
</main>
 
    )
}