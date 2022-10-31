import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/router";
import { useRef } from "react";
import { auth } from "../lib/firebase";


const Login = () => {
    const form = useRef(null)
    const router = useRouter()

    const submit = async () => {
        const formValues = form.current

        const email = formValues['email'].value
        const password = formValues['password'].value

        await signInWithEmailAndPassword(auth, email, password)
        router.push('/home')
    }

    return (
        <div className="container mx-auto w-max">
            <div className="flex justify-center align-center flex-col">
                <h1 className="header">Login</h1>
                <form className="flex flex-col" ref={form} onSubmit={e => {e.preventDefault(); submit()}}>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="text" name="email" placeholder="Enter your email" />    
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" placeholder="Enter your password" />
                    </div>
                    <button type="submit">Login</button>
                </form>
            </div>
        </div>
    )
}

export default Login