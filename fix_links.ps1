$files = Get-ChildItem 'c:\Users\burak\Desktop\motokap\motokap\*.html'
foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw
    $content = $content -replace 'href="index\.html"', 'href="/"'
    $content = $content -replace 'href="motokap-orta\.html"', 'href="motokap-orta"'
    $content = $content -replace 'href="motokap-buyuk\.html"', 'href="motokap-buyuk"'
    $content = $content -replace 'href="motokap-ikili\.html"', 'href="motokap-ikili"'
    $content = $content -replace 'href="hakkimizda\.html"', 'href="hakkimizda"'
    $content = $content -replace 'href="iletisim\.html"', 'href="iletisim"'
    $content = $content -replace 'href="teknoloji\.html"', 'href="teknoloji"'
    Set-Content $file.FullName -Value $content -NoNewline
    Write-Host "Updated: $($file.Name)"
}
