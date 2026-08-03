$Root = Split-Path -Parent $PSScriptRoot
$Output = Join-Path (Split-Path -Parent $Root) "ajuy-municipality-website-complete.zip"
$Temp = Join-Path $env:TEMP "ajuy-site-package"
Remove-Item $Temp -Recurse -Force -ErrorAction SilentlyContinue
New-Item $Temp -ItemType Directory | Out-Null
robocopy $Root $Temp /E /XD .git node_modules .next .vercel /XF .env.local *.zip | Out-Null
Remove-Item $Output -Force -ErrorAction SilentlyContinue
Compress-Archive -Path "$Temp\*" -DestinationPath $Output -CompressionLevel Optimal
Remove-Item $Temp -Recurse -Force
Write-Output $Output
