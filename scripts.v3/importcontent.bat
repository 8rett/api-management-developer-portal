@REM This script automates content import into developer portal instances.
@REM Make sure you're logged-in with `az login` command before running the script.

node ./importcontent ^
--destSubscriptionId "< your subscription ID >" ^
--destResourceGroupName "< your resource group name >" ^
--destServiceName "< your service name >"
