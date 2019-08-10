export interface User {
    email: string;
    first_name: string;
    last_name: string;
    id: number;
}

export default interface UserData extends User {
    role: string;
    token: string;
    manager_approval_settings: string;
}