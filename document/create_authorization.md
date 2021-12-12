# Creating Authorization

## Approach

we will go create a new authorization, allowed the user of service make a payments through on platform.

## Rules

### Business rules

- the transaction must be value less than 1000 or equal.
- the transaction must be value greater than 10.
- the transaction must be number of installments less than 12 or equal.
- the transaction must be number of installments greater than 1 or equal.
- only transactions on credit and debit card are allowed.
- the installments are allowed only in the credit.

### Application rules

- the application must validate the transaction with the business rules.
- the application must return status from the transaction.

## Inputs/Output

### inputs

- type
  - type: string
  - max_length: 12
  - min_length: 10
  - allowed: 'credit_card' or 'debit_card'
  - required: true
  - default: none
  - description: indicate the operation type.

- amount
  - type: integer
  - max_length: 1000
  - min_length: 10
  - allowed: between 10 and 1000
  - required: true
  - default: none
  - description: indicate the value of the transaction.

- installments
  - type: interger
  - max_length: 12
  - min_length: 1
  - allowed: between 1 and 12
  - required: false
  - default: none
  - description: indicate the installments of the transaction.

### Outputs

- status
  - type: string
  - max_length: 12
  - min_length: 10
  - allowed: 'approved' or 'rejected'
  - required: true
  - default: none
  - description: indicate the status of the transaction.

- type
  - type: string
  - max_length: 12
  - min_length: 10
  - allowed: 'credit_card' or 'debit_card'
  - required: true
  - default: none
  - description: indicate the operation type.

- amount
  - type: interger
  - max_length: 1000
  - min_length: 10
  - allowed: between 10 and 1000
  - required: true
  - default: none
  - description: indicate the value of the transaction.

- installments
  - type: interger
  - max_length: 12
  - min_length: 1
  - allowed: between 1 and 12
  - required: false
  - default: none
  - description: indicate the installments of the transaction.
