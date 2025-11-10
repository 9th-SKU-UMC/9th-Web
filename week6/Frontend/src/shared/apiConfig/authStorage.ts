export const authStorage = {
    // get or set token in localStorage
    getToken: (type: 'access' | 'refresh') => {
        const token = localStorage.getItem(`${type}Token`);

        console.log(`authStorage - ${type}Token:`, token);
        console.log(`authStorage - typeof token:`, typeof token);

        if (!token || token === 'undefined' || token === 'null') return null;
        return token;
    },
    setToken: (type: 'access' | 'refresh', token: string | null | undefined) => {
        if (typeof token === 'string' && token.trim() !== '') {
            localStorage.setItem(`${type}Token`, token);
        } 
        else {
            localStorage.removeItem(`${type}Token`);
        }
    },
    // check if user is authenticated
    isAuthenticated: (): boolean => {
        const token = authStorage.getToken('access');
        return !!token;
    },
    // logout user
    logout: () => {
        authStorage.setToken('access', null);
        authStorage.setToken('refresh', null);
        window.location.href = '/login';
    }
}