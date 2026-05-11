"use client"
import css from "@/components/AuthNavigation/AuthNavigation.module.css";
import Link from "next/link";
import { useAuthStore } from "@/lib/store/authStore";
import { useRouter } from "next/navigation";
import { logout } from "@/lib/api/clientApi";
export default function AuthNavigation() {
  const router = useRouter();
  const isAuthed = useAuthStore((state) => state.isAuthenticated);
  const user = useAuthStore((state) => state.user);
const clearIsAuthed = useAuthStore((state) => state.clearIsAuthenticated)

  const handleLogout = async() => {
    await logout();
    clearIsAuthed();
    router.push("/sign-in")
  }
  
    return (
      <>
        {isAuthed && (
     <li className={css.navigationItem}>
  <Link href="/profile" prefetch={false} className={css.navigationLink}>
    Profile
  </Link>
</li>
        )}
        
{isAuthed && ( 
<li className={css.navigationItem}>
            <p className={css.userEmail}>{user?.email}</p>
  <button className={css.logoutButton} onClick={handleLogout}>
    Logout
  </button>
          </li>
        )}
        

        {!isAuthed && (
          <>
<li className={css.navigationItem}>
  <Link href="/sign-in" prefetch={false} className={css.navigationLink}>
    Login
  </Link>
</li>

<li className={css.navigationItem}>
  <Link href="/sign-up" prefetch={false} className={css.navigationLink}>
    Sign up
  </Link>
            </li>
            </>
          )}
            </>
)
  
 
}


