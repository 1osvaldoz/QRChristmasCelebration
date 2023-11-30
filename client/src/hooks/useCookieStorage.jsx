import { useState } from 'react';
import Cookies from 'js-cookie';

export function useCookieStorage(key, initialValue) {
    const [storedValue, setValue] = useState(() => {
        try {
            const sessionCookie = Cookies.get(key);
            return sessionCookie ? JSON.parse(sessionCookie) : initialValue;
        } catch (error) {
            return initialValue;
        }
    });

    const setCookieStorage = (value) => {
        try {
            Cookies.remove(key);
            Cookies.set(key, JSON.stringify(value), { expires: 5 });
            setValue(value);
        } catch (error) {
            console.log(error);
        }
    };

    const updateCookieStorage = (value) => {
        try {
            Cookies.set(key, JSON.stringify(value), { expires: 5 });
            setValue(value);
        } catch (error) {
            console.log(error);
        }
    };

    const deleteCookieStorage = () => {
        try {
            Cookies.remove(key);
            setValue(initialValue);
        } catch (error) {
            console.log('Error at deleting the cookie', error);
        }
    };

    return [
        storedValue,
        setCookieStorage,
        updateCookieStorage,
        deleteCookieStorage,
    ];
}
