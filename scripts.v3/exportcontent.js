/**
 * This script exports customisations from a developer portal instance.
 * In order to run it, you need to:
 * 
 * 1) Clone the api-management-developer-portal repository:
 *    git clone https://github.com/Azure/api-management-developer-portal.git
 * 
 * 2) Install NPM  packages:
 *    npm install
 * 
 * 3) Run this script with a valid combination of arguments:
 *    node ./migrate ^
 *    --sourceSubscriptionId "< your subscription ID >" ^
 *    --sourceResourceGroupName "< your resource group name >" ^
 *    --sourceServiceName "< your service name >" ^
 *    --sourceTenantId "< optional (needed if source and destination is in different subscription) source tenant ID >" ^
 *    --sourceServicePrincipal "< optional (needed if source and destination is in different subscription) source service principal or user name. >" ^
 *    --sourceServicePrincipalSecret "< optional (needed if source and destination is in different subscription) secret or password for service principal or az login for the source apim. >" ^
 * 
 * You can specify the SAS tokens directly (via sourceToken), or you can supply an identifier and key,
 * and the script will generate tokens that expire in 1 hour. (via sourceId, sourceKey, destId, destKey)
 */

const { ImporterExporter } = require('./utils.js');

const yargs = require('yargs')
    .example(`node ./exportcontent ^ \r
    *    --sourceSubscriptionId "< your subscription ID > \r
    *    --sourceResourceGroupName "< your resource group name > \r
    *    --sourceServiceName "< your service name > \r
    *    --sourceTenantId "< optional (needed if source and destination is in different subscription) source tenant ID > \r
    *    --sourceServicePrincipal "< optional (needed if source and destination is in different subscription) source service principal or user name. > \r
    *    --sourceServicePrincipalSecret "< optional (needed if source and destination is in different subscription) secret or password for service principal or az login for the source apim. >\n`)
    .option('sourceSubscriptionId', {
        type: 'string',
        description: 'Azure subscription ID.',
        demandOption: true
    })
    .option('sourceResourceGroupName', {
        type: 'string',
        description: 'Azure resource group name.',
        demandOption: true
    })
    .option('sourceServiceName', {
        type: 'string',
        description: 'API Management service name.',
        demandOption: true
    })
    .option('sourceTenantId', {
        type: 'string',
        description: 'source tenant ID.',
        demandOption: false
    })
    .option('sourceServicePrincipal', {
        type: 'string',
        description: 'source service principal ID.',
        demandOption: false
    })
    .option('sourceServicePrincipalSecret', {
        type: 'string',
        description: 'source service principal secret.',
        demandOption: false
    })
    .help()
    .argv;

async function exportcontent() {
    try {
        const sourceImporterExporter = new ImporterExporter(yargs.sourceSubscriptionId, yargs.sourceResourceGroupName, yargs.sourceServiceName, yargs.sourceTenantId, yargs.sourceServicePrincipal, yargs.sourceServicePrincipalSecret);
        await sourceImporterExporter.export();
    } 
    catch (error) {
        throw new Error(`Unable to complete export. ${error.message}`);
    }
}

exportcontent()
    .then(() => {
        console.log("DONE");
        process.exit(0);
    })
    .catch(error => {
        console.error(error.message);
        process.exit(1);
    });