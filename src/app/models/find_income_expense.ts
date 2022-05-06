export class FindIncomeExpense {
    page: number;
    pageSize: number;
    type: string;

    constructor() {
        this.page = 1;
        this.pageSize = 10;
        this.type = '';
    }

}