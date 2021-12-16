import { Chain } from './Chain'
import { Wallet } from './Wallet'


const nakamoto = new Wallet()
const bob = new Wallet()
const alice = new Wallet()

nakamoto.sendMoney(50, bob.publicKey)
bob.sendMoney(25, alice.publicKey)
alice.sendMoney(7, nakamoto.publicKey)

console.info(Chain.instance)