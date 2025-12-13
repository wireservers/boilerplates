# PowerShell script to remove version numbers from import statements
# Usage: .\fix-imports.ps1

Write-Host "Fixing versioned imports in all TypeScript files..." -ForegroundColor Green

# Get all .tsx and .ts files excluding node_modules
$files = Get-ChildItem -Path . -Include *.tsx,*.ts -Recurse -File | Where-Object { $_.FullName -notmatch '\\node_modules\\' }

$count = 0
foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw
    $newContent = $content -replace '@\d+\.\d+\.\d+"', '"'
    
    if ($content -ne $newContent) {
        Set-Content -Path $file.FullName -Value $newContent -NoNewline
        $count++
        Write-Host "Fixed: $($file.Name)" -ForegroundColor Yellow
    }
}

Write-Host "`nDone! Fixed $count files." -ForegroundColor Green
Write-Host "All versioned imports have been removed." -ForegroundColor Green
