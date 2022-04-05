export class Expense {
    id: number;
    amount: number;
    categoryId: number;
    description: string;
    type: string;
    createdAt: Date;

    constructor() {
        this.id = 0;
        this.amount = 0;
        this.categoryId = 0;
        this.description = '';
        this.type = '';
        this.createdAt = new Date();
    }
}