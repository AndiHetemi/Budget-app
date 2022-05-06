export class IncomeExpense {
    id: number;
    amount: number;
    categoryId: number;
    description: string;
    type: string;
    userId: number;
    createdAt: Date;
    updatedAt: Date;

    constructor() {
        this.id = 0;
        this.amount = 0;
        this.categoryId = 0;
        this.description = '';
        this.type = '';
        this.userId = 0;
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }

}