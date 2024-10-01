function logoutUser(): void {
    delete sessionStorage.token
}

export default logoutUser