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

	addBlock(transaction: Transaction, senderPublicKey: string, signature: Buffer) {
		const verifier = crypto.createVerify('SHA256')
		verifier.update(transaction.toString())

		const isValid = verifier.verify(senderPublicKey, signature)
		if (isValid) {
			const nextBlock = new Block(this.lastBlock.hash, transaction)
			this.mine(nextBlock.nonce)
			this.chain.push(nextBlock)
		}
	}


	private mine(nonce: number) {
		let solution = 1;
		console.info('Mining...')

		while (true) {
			const hash = crypto.createHash('MD5')
			hash.update((nonce + solution).toString()).end()

			const attempt = hash.digest('hex')
			if (attempt.endsWith('7777')) {
				console.info(`Solved: ${solution}`)
				return solution
			}

			solution++
		}
	}
}
