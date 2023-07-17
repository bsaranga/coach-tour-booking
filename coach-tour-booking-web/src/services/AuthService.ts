export default class AuthService {
    
    private host?: string;

    constructor(host?: string) {
        this.host = host ?? "https://localhost:5000";
    }

    isAuthenticated () {
        return fetch(`${this.host}/api/auth/status`, {
            method: "GET",
        });
    }
}