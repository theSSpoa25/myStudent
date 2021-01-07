export interface LoginResponse {
    id: number;
    username: string;
    token: string;
    email: string;
    roles: string[];
}