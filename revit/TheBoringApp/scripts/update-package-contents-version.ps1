param(
    [string]$xmlFilePath,
    [string]$newVersion
)

# Print the arguments
Write-Host "xmlFilePath: $xmlFilePath"
Write-Host "newVersion: $newVersion"

# Ensure the file exists
if (-not (Test-Path $xmlFilePath)) {
    Write-Error "File not found: $xmlFilePath"
    exit
}

# Load the XML file
$xml = New-Object System.Xml.XmlDocument
$xml.Load($xmlFilePath)

# Update the Version attribute in ComponentEntry
$componentEntry = $xml.SelectSingleNode("//ComponentEntry")
if ($componentEntry -ne $null -and $componentEntry.HasAttribute("Version")) {
    $componentEntry.SetAttribute("Version", $newVersion)
}

# Update the ModuleName attribute to include the new version
if ($componentEntry -ne $null -and $componentEntry.HasAttribute("ModuleName")) {
    $moduleName = $componentEntry.GetAttribute("ModuleName")
    $updatedModuleName = $moduleName -replace "THE_BORING_APP_VERSION", $newVersion
    $componentEntry.SetAttribute("ModuleName", $updatedModuleName)
}

# Save the updated XML file
$xml.Save($xmlFilePath)

Write-Host "Updated PackageContents.xml with version '$newVersion'."
