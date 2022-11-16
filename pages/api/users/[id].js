import { auth, db } from '../../../lib/firebase-admin'

export default async function (req, res) {
    if (req.method !== 'DELETE') {
        res.status(404).end()
        return
    }

    const { id } = req.query

    await auth.deleteUser(id)
    const doc = db.doc(`users/${id}`)
    await doc.delete()

    res.status(204).end()
}