import { createUserWithEmailAndPassword } from "firebase/auth"
import { doc, setDoc } from "firebase/firestore"
import { useRouter } from "next/router"
import { useRef } from "react"
import { auth, db } from "../lib/firebase"

const Register = () => {
    const router = useRouter()
    const form = useRef(null)

    const submit = async () => {
        const formValues = form.current
        
        const email = formValues['email'].value
        const password = formValues['password'].value
        const name = formValues['name'].value
        const address = formValues['address'].value
        const fave = formValues['fave'].value

        const { user } = await createUserWithEmailAndPassword(auth, email, password)
        await setDoc(doc(db, 'users', user.uid), {
            name,
            address,
            fave,
        })

        router.push('/')
    }

    return (
        <div className="container mx-auto w-max">
            <div className="flex justify-center align-center flex-col">
                <h1 className="header">Register</h1>
                <form className="flex flex-col" ref={form} onSubmit={e => {e.preventDefault(); submit()}}>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="text" name="email" placeholder="Enter your email" />    
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" placeholder="Enter your password" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input type="text" name="name" placeholder="Enter your name" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="address">Address</label>
                        <input type="text" name="address" placeholder="Enter your address" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="address">Fave animal</label>
                        <input type="text" name="fave" placeholder="Enter your favorite animal" />
                    </div>
                    <button type="submit">Register</button>
                </form>
            </div>
        </div>
    )
}

export default Register