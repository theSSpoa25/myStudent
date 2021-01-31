export interface User {
    id: number;
    username: string;
    token?: string;
    email: string;
    roles: string[];
    name: string;
    surname: string;
    address: string;
    active: boolean;
}