type InputTransaction = {
    type: string;
    amount: number;
    installments?: number;
}

class Transaction {
    private readonly data: InputTransaction;

    constructor(inputTransaction: InputTransaction) {
        this.data = inputTransaction;
    }

    private isBetween(): void {
        const isBetween = this.data.amount >= 10 && this.data.amount <= 1000;
        
        if (!isBetween) {
            throw new Error('the amount must be between 10 and 1000');
        }
    }

    private debit(): void {
        this.isBetween();

        const isDebitWithInstallment = this.data.installments && this.data.type === 'debit_card';
        
        if (isDebitWithInstallment) {
            throw new Error('cannot create transactions installments on debit card');
        }
        
    }

    private credit(): void {
        this.isBetween();

        const hasInstallments = this.data.type === 'credit_card' && this.data.installments;
        
        if (!hasInstallments) {
            throw new Error('the installment field is required on transactions with credit card');
        }

        const installmentValid = this.data.installments ? this.data?.installments >= 1 && this.data?.installments <= 12 : false;

        if (!installmentValid) {
            throw new Error('the installment must be between 1 and 12 (inclusive)');
        }
    }

    private operation(): void {
        const operationsAccept = ['credit_card', 'debit_card'];
        
        const operationValid = operationsAccept.includes(this.data.type);
        
        if (!operationValid) {
            throw new Error('the operation must be one of the following: credit_card or debit_card');
        }
    }

    public async validate(): Promise<InputTransaction | Error> {
        const operation = {
            'credit_card': this.credit,
            'debit_card': this.debit,
        } as any;
        
        this.operation();

        operation[this.data.type].call(this)
        
        return this.data;
    }
}

export default Transaction;