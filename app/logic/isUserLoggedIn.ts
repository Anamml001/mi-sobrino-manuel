function isUserLoggedIn(): boolean {
    if (typeof window !== 'undefined')
        return !!sessionStorage.token
    else
        return false
}

export default isUserLoggedIn