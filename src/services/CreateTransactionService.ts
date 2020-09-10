import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: Request): Transaction {
    const typeOfTransaction = type;
    const { total } = this.transactionsRepository.getBalance();
    if (type === 'outcome' && total < value) {
      throw Error("You don't have balance to do this transaction");
    }
    if (typeOfTransaction !== 'income' && typeOfTransaction !== 'outcome') {
      throw Error('Invalid transaction type');
    }

    const transaction = this.transactionsRepository.create({
      title,
      value,
      type: typeOfTransaction,
    });
    return transaction;
  }
}

export default CreateTransactionService;
