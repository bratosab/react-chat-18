import "./App.css";
import { Chatroom } from "./components/Chatroom";
import { initializeApp } from "firebase/app";
import firebaseConfig from "./config";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { Login } from "./components/Login";

// firebase config
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const store = getFirestore(app);

function App() {
  const [user] = useAuthState(auth);

  return (
    <div className="App">
      <header>
        <h1>Reyact chat</h1>
      </header>
      <section>{user ? <Chatroom /> : <Login />}</section>
    </div>
  );
}

export default App;
