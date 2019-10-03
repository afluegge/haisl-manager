param (
    [string]$projectName = "haisl-manager-server"
)

$env:SENTRY_AUTH_TOKEN = "113e2926f6374935821328927e44913c2eaf80aaec144f43a381e0eea211e91e"
$env:SENTRY_ORG = "fredinger"
$VERSION = $( sentry-cli releases propose-version )

# Create a release
sentry-cli releases new -p $projectName $VERSION

# Associate commits with the release
sentry-cli releases set-commits --auto $VERSION
