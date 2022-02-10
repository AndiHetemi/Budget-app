export class User {
    id: number;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    newPassword: string;
    hashPassword: string;

    constructor() {
        this.id = 0;
        this.firstName = '';
        this.lastName = '';
        this.username = '';
        this.email = '';
        this.newPassword = '';
        this.hashPassword = '';
    }
}