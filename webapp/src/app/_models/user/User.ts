export interface User {
    id: number;
    username: string;
    token?: string;
    email: string;
    roles: string[];
}