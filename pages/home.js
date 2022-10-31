import { onAuthStateChanged } from "firebase/auth"
import { doc, getDoc } from "firebase/firestore"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { auth, db } from "../lib/firebase"

const Home = () => {
    const router = useRouter()
    const [user, setUser] = useState(null)
    const currentUser = auth.currentUser

    useEffect(() => {
        (async () => {
            if (currentUser) {
                const ref = doc(db, "users", currentUser.uid)
                const snap = await getDoc(ref)
                setUser(snap.data())
            }
        })()
        
    }, [currentUser])

    const logout = () => {
        auth.signOut()
        router.push('/')
    }

    if (!currentUser) {
        return (
            <>
                <h1>User not logged in</h1>
                <a href="/">Log in</a>
            </>
        )
    }

    return (
        <div className="container mx-auto w-max">
            <div className="flex justify-center align-center flex-col">
                <h1 className="header">Home</h1>
                <ul>
                    <li>Name: { user?.name }</li>
                    <li>Address: { user?.address }</li>
                    <li>Fave animal: { user?.fave }</li>
                </ul>
                <button type="button" onClick={() => logout()}>Logout</button>
            </div>
        </div>
    )
}

export default Home