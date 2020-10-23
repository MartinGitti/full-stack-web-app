import cookie from 'js-cookie';// Cookie package.

// Set cookie to store small chucks of info:
const setCookie = (key, value) => {
    if (window !== 'undefined') {
        cookie.set(key, value, {
            expires: 1
        })
    }
}

// Remove from cookie -- upon signout:
const removeCookie = (key) => {
    if (window !== 'undefined') {
        cookie.remove(key, {
            expires: 1
        })
    }
}

// Get cookie from stored token:
const getCookie = (key) => {
    if (window !== 'undefined') {
        return cookie.get(key)
    }
}

// Set in localStorage to store info between user sessions:
const setLocalStorage = (key, value) => {
    if (window !== 'undefined') {
        localStorage.setItem(key, JSON.stringify(value))
    }
}

const removeLocalStorage = (key) => {
    if (window !== 'undefined') {
        localStorage.removeItem(key);
    }
}
// Authentication Check:
const authenticate = (response, next) => {
    setCookie('token', response.data.token);
    setLocalStorage('user', response.data.user);

    next();
}

const isAuth = () => {
    if (window !== 'undefined') {
        const cookieChecked = getCookie('token');

        if (cookieChecked) {
            if (localStorage.getItem('user')) {
                return JSON.parse(localStorage.getItem('user'))
            } else {
                return false
            }
        }
    }
}
// Remove cookie upon signout:
const signout = (next) => {
    removeCookie('token');
    removeLocalStorage('user');

    next();
}

const updateUser = (response, next) => {
    // // console.log('UPDATE USER IN LOCALSTORAGE HELPERS', response)

    if (typeof window !== 'undefined') {
        let auth = JSON.parse(localStorage.getItem('user'));
        auth = response.data
        localStorage.setItem('user', JSON.stringify(auth));
    }
    next();
}

// Unpack all of the above:
export {
    setCookie,
    removeCookie,
    getCookie,
    setLocalStorage,
    removeLocalStorage,
    authenticate,
    signout,
    isAuth,
    updateUser
}