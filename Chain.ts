import { Block } from './Block'
import { Transaction } from './Transaction'


export class Chain {
	public static instance = new Chain();

	private chain: Block[]

	private constructor() {
		this.chain = [new Block('', new Transaction(100, 'genesis', 'satoshi_nakamoto'))]
	}

	get lastBlock() {
		return this.chain[this.chain.length - 1]
	}

	addBlock(transaction: Transaction, senderPublicKey: string, signature: string) {
	}
}
