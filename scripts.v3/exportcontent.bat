@REM This script automates content export from developer portal instances.
@REM Make sure you're logged-in with `az login` command before running the script.

node ./exportcontent ^
--sourceSubscriptionId "< your subscription ID >" ^
--sourceResourceGroupName "< your resource group name >" ^
--sourceServiceName "< your service name >" ^
