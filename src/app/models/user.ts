export class User {
    id: number;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
    hashPassword: string;

    constructor() {
        this.id = 0;
        this.firstName = '';
        this.lastName = '';
        this.username = '';
        this.email = '';
        this.password = '';
        this.hashPassword = '';
    }
}