import * as crypto from 'crypto'
import { Transaction } from './Transaction'
import { Chain } from './Chain'


export class Wallet {
	public publicKey: string
	private privateKey: string

	constructor() {
		const keyPair = crypto.generateKeyPairSync('rsa', {
			modulusLength: 2048,
			publicKeyEncoding: { type: 'spki', format: 'pem' },
			privateKeyEncoding: { type: 'pkcs8', format: 'pem' },
		})

		this.publicKey = keyPair.publicKey
		this.privateKey = keyPair.privateKey
	}

	sendMoney(amount: number, payeePublicKey: string) {
		const transaction = new Transaction(amount, this.publicKey, payeePublicKey)

		const signer = crypto.createSign('SHA256')
		signer.update(transaction.toString()).end()

		const signature = signer.sign(this.privateKey)
		Chain.instance.addBlock(transaction, this.publicKey, signature)
	}
}
