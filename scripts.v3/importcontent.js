/**
 * This script imports customisations from a developer portal instance.
 * In order to run it, you need to:
 * 
 * 1) Clone the api-management-developer-portal repository:
 *    git clone https://github.com/Azure/api-management-developer-portal.git
 * 
 * 2) Install NPM  packages:
 *    npm install
 * 
 * 3) Run this script with a valid combination of arguments:
 *    node ./importcontent ^
 *    --destSubscriptionId "< your subscription ID >" ^
 *    --destResourceGroupName "< your resource group name >" ^
 *    --destServiceName "< your service name >"
 *    --destTenantId "< optional (needed if source and destination is in different subscription) destination tenant ID >"
 *    --destServicePrincipal "< optional (needed if source and destination is in different subscription)destination service principal or user name. >"
 *    --destServicePrincipalSecret "< optional (needed if source and destination is in different subscription) secret or password for service principal or az login for the destination. >"
 * 
 * Auto-publishing is not supported for self-hosted versions, so make sure you publish the portal (for example, locally)
 * and upload the generated static files to your hosting after the migration is completed.
 * 
 * You can specify the SAS tokens directly (via sourceToken and destToken), or you can supply an identifier and key,
 * and the script will generate tokens that expire in 1 hour. (via sourceId, sourceKey, destId, destKey)
 */

const { ImporterExporter } = require('./utils.js');

const yargs = require('yargs')
    .example(`node ./importcontent ^ \r
    *    --destSubscriptionId "< your subscription ID > \r
    *    --destResourceGroupName "< your resource group name > \r
    *    --destServiceName "< your service name > \r
    *    --destTenantId "< optional (needed if source and destination is in different subscription) destination tenant ID > \r
    *    --destServicePrincipal "< optional (needed if source and destination is in different subscription) destination service principal or user name. > \r
    *    --destServicePrincipalSecret "< optional (needed if source and destination is in different subscription) secret or password for service principal or az login for the destination. >\n`)
    .option('destSubscriptionId', {
        type: 'string',
        description: 'Azure subscription ID.',
        demandOption: true
    })
    .option('destResourceGroupName', {
        type: 'string',
        description: 'Azure resource group name.',
        demandOption: true
    })
    .option('destServiceName', {
        type: 'string',
        description: 'API Management service name.',
        demandOption: true
    })
    .option('destTenantId', {
        type: 'string',
        description: ' destination tenantId.',
        demandOption: false
    })
    .option('destServicePrincipal', {
        type: 'string',
        description: 'destination service principal or user name.',
        demandOption: false
    })
    .option('destServicePrincipalSecret', {
        type: 'string',
        description: 'destination service principal secret.',
        demandOption: false
    })
    .help()
    .argv;

async function importcontent() {
    try {
        const destImporterExporter = new ImporterExporter(yargs.destSubscriptionId, yargs.destResourceGroupName, yargs.destServiceName, yargs.destTenantId, yargs.destServicePrincipal, yargs.destServicePrincipalSecret);
        await destImporterExporter.cleanup();
        await destImporterExporter.import();

        await destImporterExporter.publish();
    } 
    catch (error) {
        throw new Error(`Unable to complete import. ${error.message}`);
    }
}

importcontent()
    .then(() => {
        console.log("DONE");
        process.exit(0);
    })
    .catch(error => {
        console.error(error.message);
        process.exit(1);
    });