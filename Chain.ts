import * as crypto from 'crypto'
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
		const verifier = crypto.createVerify('SHA256')
		verifier.update(transaction.toString())

		const isValid = verifier.verify(senderPublicKey, signature)
		if (isValid) {
			const nextBlock = new Block(this.lastBlock.hash, transaction)
			this.chain.push(nextBlock)
		}
	}
}
