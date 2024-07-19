import { View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { FIREBASE_AUTH } from '../FirebaseConfig';

const useAuth = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsub = onAuthStateChanged(FIREBASE_AUTH, user => {
            console.log('Got user = ', user);
            if (user) {
                setUser(user)
            } else {
                setUser(null)
            }
        });
        return unsub;
    }, [])

    return { user }
}

export default useAuth;