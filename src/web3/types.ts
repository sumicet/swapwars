export type Contract = 'Grogu' | 'Mando' | 'TokenSwap' | 'Matic';

export type Token = Exclude<Contract, 'TokenSwap'>;
