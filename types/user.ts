export interface userInterface {
    id: number;
    email: string;
    name: string;
    created_at?: string;
    updated_at?: string;
}
export interface userRegisterInterface {
    id?: number;
    email: string;
    name: string;
    created_at?: string;
    updated_at?: string;
    password: string;
    passwordConfirmation?: string;
}
