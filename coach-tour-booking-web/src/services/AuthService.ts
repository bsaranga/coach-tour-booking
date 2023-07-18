import ICustomerRegistration from "../interfaces/ICustomerRegistration";

export default class AuthService {
    
    private host?: string;

    constructor(host?: string) {
        this.host = host ?? "https://localhost:5000";
    }

    isAuthenticated () {
        return fetch(`${this.host}/api/auth/status`, {
            method: "GET",
            credentials: 'include'
        });
    }

    login(username: string, password: string) {
        return fetch(`${this.host}/api/auth/login`, {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            credentials: 'include',
            headers: {
                "Content-Type": "application/json"
            }
        })
    }

    logout() {
        return fetch(`${this.host}/api/auth/logout`, {
            method: "GET",
            credentials: "include"
        })
    }

    register(customerInfo: ICustomerRegistration) {
        return fetch(`${this.host}/api/auth/register/customer`, {
            method: "POST",
            credentials: "include",
            body: JSON.stringify(customerInfo),
            headers: {
                "Content-Type": "application/json"
            }
        })
    }
}