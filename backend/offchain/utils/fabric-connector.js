const path = require('path');
const fsBase = require('fs');
const fs = fsBase.promises;

let gateway;

// Connect to the blockchain
async function connectBlockchain() {
    let contract;
    try {
        const { Wallets, Gateway} = require('fabric-network'); //Creates a new gateway and use it to connect to the network
        //const walletPath = await fs.mkdir(path.join(process.cwd(), 'wallet'),{recursive:true});
        const walletPath = path.join('/home/user/doceyes/', 'wallet', 'Org1', '')
        // Successfully exported wallet 1 Org Local Fabric - Org1 to /home/user/doceyes/wallet/Org1
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        gateway = new Gateway();

        // load the network configuration
        // Successfully exported connection profile to /home/user/doceyes/profile/1OrgLocalFabricOrg1GatewayConnection.json
        const ccpPath = path.join('/home/user/doceyes/profile', '1OrgLocalFabricOrg1GatewayConnection.json')
        // const ccpPath = path.resolve(__dirname, '..', '..', '..', 'test-network', 'organizations', 'peerOrganizations', 'org1.example.com', 'connection-org1.json');
        const ccp = JSON.parse(await fs.readFile(ccpPath, 'utf8'));

        const connectionOptions = {
            wallet, identity: 'Org1 Admin', discovery:
                { enabled: true, asLocalhost: true }
        };
        await gateway.connect(ccp, connectionOptions);
        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('mychannel');
        // Get the contract from the network.
        contract = network.getContract('doceyes');

        console.log('---------------------------- RESULT from backend server --------')
        return contract;


    } catch (error) {
        console.error('Failed to initialize transaction:', error);
        process.exit(1);
    }
}

async function disconnectBlockchain() {
    gateway.disconnect();
}

module.exports = {
    connect: connectBlockchain,
    disconnect: disconnectBlockchain
}