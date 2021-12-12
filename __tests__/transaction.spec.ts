import Transaction from '../src/Entities/Transaction';

describe('CreateAuthorization', () => {
    it('should not be able to create authorization with amount greater 1000', () => {
        const authorization = {
            type: 'credit_card',
            amount: 1001,
        }

        const newAuthorization = new Transaction(authorization);

        expect(newAuthorization.validate()).rejects.toThrow('the amount must be between 10 and 1000');
    });

    it('should not be able to create authorization with amount less than 10', () => {
        const authorization = {
            type: 'credit_card',
            amount: 9,
        }

        const newAuthorization = new Transaction(authorization);

        expect(newAuthorization.validate()).rejects.toThrow('the amount must be between 10 and 1000');
    });

    it('should not be able to create authorization with type different than credit_card and debit_card', () => {
        const authorization = {
            type: 'other operation',
            amount: 100,
        }

        const newAuthorization = new Transaction(authorization);

        expect(newAuthorization.validate()).rejects.toThrow('the operation must be one of the following: credit_card or debit_card');
    });

    it('should be able to create authorization with installments parameters', async () => {
        const authorization = {
            type: 'credit_card',
            amount: 100,
            installments: 4
        }

        const newAuthorization = new Transaction(authorization);
        const result = await newAuthorization.validate();

        expect(result).toMatchObject({
            type: 'credit_card',
            amount: 100,
            installments: 4
        })
    });

    it('should not be able to create authorization with installments parameters on debit_card', () => {
        const authorization = {
            type: 'debit_card',
            amount: 100,
            installments: 4
        }

        const newAuthorization = new Transaction(authorization);

        expect(newAuthorization.validate()).rejects.toThrow('cannot create transactions installments on debit card')
    });

    it('should not be able to create authorization on credit when not pass the installment field', () => {
        const authorization = {
            type: 'credit_card',
            amount: 100,
        }

        const newAuthorization = new Transaction(authorization);

        expect(newAuthorization.validate()).rejects.toThrow('the installment field is required on transactions with credit card');
    });

    it('should not be able to create authorization on credit when not pass the installment greater than 12', () => {
        const authorization = {
            type: 'credit_card',
            amount: 100,
            installments: 13
        }

        const newAuthorization = new Transaction(authorization);

        expect(newAuthorization.validate()).rejects.toThrow('the installment must be between 1 and 12 (inclusive)');
    });

    it('should not be able to create authorization on credit when not pass the installment less than 1', () => {
        const authorization = {
            type: 'credit_card',
            amount: 100,
            installments: -1
        }

        const newAuthorization = new Transaction(authorization);

        expect(newAuthorization.validate()).rejects.toThrow('the installment must be between 1 and 12 (inclusive)');
    });

    it('should be able to create authorization on credit', async () => {
        const authorization = {
            type: 'credit_card',
            amount: 100,
            installments: 4
        }

        const newAuthorization = new Transaction(authorization);
        const result = await newAuthorization.validate();

        expect(result).toMatchObject({
            type: 'credit_card',
            amount: 100,
            installments: 4
        })
    });

    it('should be able to create authorization on debit', async () => {
        const authorization = {
            type: 'debit_card',
            amount: 100,
        }

        const newAuthorization = new Transaction(authorization);
        const result = await newAuthorization.validate();

        expect(result).toMatchObject({
            type: 'debit_card',
            amount: 100,
        })
    });
});