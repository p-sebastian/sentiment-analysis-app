import firebase from 'firebase'

import {FIREBASE_CONFIG} from './firebase.credentials'

firebase.initializeApp(FIREBASE_CONFIG)

export const auth = firebase.auth
export const db = firebase.database()
