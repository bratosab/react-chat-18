import { GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { auth } from "../App"

export function Login() {
    const googleLogin = () => {
        const provider = new GoogleAuthProvider()

        signInWithPopup(auth, provider)
    }

    return (
        <button onClick={googleLogin}>Sign in with Google</button>
    )
}