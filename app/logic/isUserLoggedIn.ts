function isUserLoggedIn() {
    if (sessionStorage) return sessionStorage.token ? true : false
    else return false


}

export default isUserLoggedIn