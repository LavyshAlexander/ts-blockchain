import * as crypto from 'crypto'


export class Wallet {
	private publicKey: string
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
}
