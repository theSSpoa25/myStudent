export interface LoginResponse {
    id: number;
    username: string;
    token: string;
    email: string;
    roles: string[];
    name: string;
    surname: string;
    active: boolean;
    address: string;
}