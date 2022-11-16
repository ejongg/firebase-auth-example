import admin from 'firebase-admin'
import { initializeApp, getApps } from 'firebase-admin/app'
import { getAuth } from 'firebase-admin/auth'
import { getFirestore } from 'firebase-admin/firestore'

const apps = getApps()

if (apps.length === 0) {
    const config = require('./firebase-admin-config.json')
    const credential = admin.credential.cert(config)
    initializeApp({
        credential
    }, 'admin')
}

const [app] = apps
const auth = getAuth(app)
const db = getFirestore(app)

export {
    auth,
    db
}

