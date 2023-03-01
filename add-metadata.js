const anchor = require('@project-serum/anchor');
import { Metadata } from "@metaplex-foundation/js";

const rpcUrl = 'https://api.devnet.solana.com';
const connection = new anchor.web3.Connection(rpcUrl);

const metadataAccount = new anchor.web3.Account();
const mintAddress = '<your token address here>'; // Replace with your token's address
const metadata = new Metadata({
    data: {
        name: 'YaCoin', // Replace with the name of your token
        symbol: 'YRC', // Replace with the symbol of your token
        uri: 'https://github.com/yashpyraj/solana_add_metadata/blob/main/metadata.json', // Replace with the URL of your token's metadata file
    },
    primarySaleHappened: false,
}, metadataAccount.publicKey);

async function main() {
    // Add metadata to the token
    const tokenMint = new anchor.web3.PublicKey(mintAddress);
    const metadataAccountAddress = metadataAccount.publicKey;
    await anchor.program.token.metadata.create(
        metadata,
        tokenMint,
        metadataAccountAddress,
        metadataAccount
    );

    console.log('Metadata added successfully');
}

main().catch((error) => {
    console.error(error);
});
