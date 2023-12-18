import { useNavigate } from "react-router-dom";
import { UseAuth } from "../contexts/FakeAuthContext";
import styles from "./User.module.css";

function User() {
  const { user, logOut } = UseAuth();
  const navigate = useNavigate();

  function handleClick() {
    logOut();
    navigate("/");
  }

  return (
    <div className={styles.user}>
      <img src={user?.avatar} alt={user?.name} />
      <span>Welcome, {user?.name}</span>
      <button onClick={handleClick}>Logout</button>
    </div>
  );
}

export default User;

/*
CHALLENGE

1) Add `AuthProvider` to `App.jsx`
2) In the `Login.jsx` page, call `login()` from context
3) Inside an effect, check whether `isAuthenticated === true`. If so, programatically navigate to `/app`
4) In `User.js`, read and display logged in user from context (`user` object). Then include this component in `AppLayout.js`
5) Handle logout button by calling `logout()` and navigating back to `/`
*/

/*
1) `App.jsx` ga `AuthProvider` qo'shing
2) `Login.jsx` sahifasida, kontekstdan `login()` ni chaqiring
3) Effekt ichida `isAuthenticated === true` bo'lsa, avtomatik ravishda `/app` ga o'ting
4) `User.js` da, kontekstdan kirgan foydalanuvchi ma'lumotlarini o'qib ko'ring va ko'rsatish (`user` obyekti). Keyin, ushbu komponentni `AppLayout.js` ga qo'shing
5) `logout()` ni chaqirib, `/` ga o'tish tugmasini boshqaring
*/
