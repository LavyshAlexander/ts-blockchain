import * as crypto from 'crypto'
import { Transaction } from './Transaction'

export class Block {
	public nonce = Math.random() * 999999999999 | 0

	constructor(
		public prevHash: string,
		public transaction: Transaction,
		public ts = Date.now()
	) { }

	get hash(): string {
		const value = JSON.stringify(this)
		const hasher = crypto.createHash('SHA256')

		hasher.update(value).end()
		const hash = hasher.digest('hex')

		return hash
	}
}
