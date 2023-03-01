const { Connection, PublicKey } = require('@solana/web3.js');

// Connect to the Solana network
const connection = new Connection('https://api.devnet.solana.com');

// Define the token address and metadata URL
const tokenAddress = new PublicKey('HVDWSWMwRtUhc7fLS2bsh8QqaKuPpVQbS16H3JNMnTLF');
const metadataUrl = 'https://example.com/my-metadata.json';

// Get the token account's owner address
const tokenAccountInfo = await connection.getAccountInfo(tokenAddress);
const ownerAddress = tokenAccountInfo.owner;

// Create the metadata account
const metadataAccount = new Account();

// Define the metadata instruction
const metadataProgramId = new PublicKey('metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s');
const metadataInstruction = TokenMetadata.createMetadataInstruction(
    metadataProgramId,
    metadataAccount.publicKey,
    ownerAddress,
    tokenAddress,
    metadataUrl,
    null
);

// Sign and send the transaction
const transaction = new Transaction().add(metadataInstruction);
await sendAndConfirmTransaction(connection, transaction, [metadataAccount]);

console.log('Metadata added successfully!');
