$envPath = ".env"
if (Test-Path $envPath) {
  $content = Get-Content $envPath -ErrorAction Stop
  foreach ($line in $content) {
    if ($line.StartsWith("#")) { continue };
    if ($line.Trim()) {
      $line = $line.Replace("`"", "")
      $kvp = $line -split ":", 2
      [Environment]::SetEnvironmentVariable($kvp[0].Trim(), $kvp[1].Trim()) | Out-Null
    }
  }
}

$hub = $env:DEPLOY_HUB
$user = $env:DEPLOY_USER
$path = $env:DEPLOY_PATH
$zip = $env:DEPLOY_ZIP

Write-Host "ARCHIVE"
7z a -xr@".runignore" ${zip} | Out-Null

Write-Host "DEPLOY"
ssh "${user}@${hub}" "mkdir -p ${path}"
scp -q "${zip}" "${user}@${hub}:${path}/${zip}"
if (!$?) {
  Write-Host "FAIL!" -ForegroundColor red
  return
}

Write-Host "EXTRACT"
ssh "${user}@${hub}" "unzip -q -o ${path}/${zip} -d ${path}"
if (!$?) {
  Write-Host "FAIL!" -ForegroundColor red
  return
}

if ($args.Contains('i')) {
  Write-Host "INSTALL"
  ssh -t "${user}@${hub}" "npm i --prefix ${path}"
  if (!$?) {
    Write-Host "FAIL!" -ForegroundColor red
    return
  }
}

Write-Host "RUN"
ssh -t "${user}@${hub}" "npm start --prefix ${path}"
if (!$?) {
  Write-Host "FAIL!" -ForegroundColor red
  return
}
