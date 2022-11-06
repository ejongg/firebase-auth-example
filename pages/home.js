import { onAuthStateChanged } from "firebase/auth"
import { doc, getDoc, getDocs, collection  } from "firebase/firestore"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { auth, db } from "../lib/firebase"

const Home = () => {
    const router = useRouter()
    const [user, setUser] = useState(null)
    const [users, setUsers] = useState([])

    useEffect(() => {
        (async () => {
            const usersRef = await getDocs(collection(db, "users"))
            const usersSnap = usersRef.docs.map(u => u.data())
            setUsers(usersSnap)
        })()

        onAuthStateChanged(auth, async user => {
            if (user) {
                const ref = doc(db, "users", user.uid)
                const snap = await getDoc(ref)
                setUser(snap.data())
            }
        })
    }, [])

    const logout = () => {
        auth.signOut()
        router.push('/')
    }

    if (!user) {
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
            <hr />
            <h3>Users</h3>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Address</th>
                        <th>Fave animal</th>
                    </tr>
                </thead>
                <tbody>
                    { users?.map((u, i) => (
                        <tr key={i}>
                            <td>{u.name}</td>
                            <td>{u.address}</td>
                            <td>{u.fave}</td>
                        </tr>
                    )) }
                </tbody>
            </table>
        </div>
    )
}

export default Home