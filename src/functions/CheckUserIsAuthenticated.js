const CheckUserIsAuthenticated = (access, refresh, setIsAuthenticated) => {
    (access || refresh) ? setIsAuthenticated(pre => true) : setIsAuthenticated(pre => false)
}

export default CheckUserIsAuthenticated