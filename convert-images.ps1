# PowerShell script to convert PNG to optimized JPG
Add-Type -AssemblyName System.Drawing

$publicDir = "c:\Users\Guido\Documents\Web Development\Projects\fontanerialowcost\public"

# Images to convert
$images = @("adamback.png", "camionetaplot2.png", "camionetaplot.png", "calderamodificada.png", "caldera.png", "landing.png")

foreach ($imageName in $images) {
    $sourcePath = Join-Path $publicDir $imageName
    
    if (-not (Test-Path $sourcePath)) {
        Write-Host "Skipping $imageName - file not found"
        continue
    }
    
    Write-Host "Converting $imageName..." -ForegroundColor Cyan
    
    $originalFile = Get-Item $sourcePath
    $originalSize = $originalFile.Length
    
    try {
        $img = [System.Drawing.Image]::FromFile($sourcePath)
        Write-Host "  Original: $($img.Width)x$($img.Height) ($([Math]::Round($originalSize/1KB, 2)) KB)"
        
        # Save as JPEG with quality 85
        $outputPath = $sourcePath -replace '\.png$', '-optimized.jpg'
        
        $encoderParams = New-Object System.Drawing.Imaging.EncoderParameters(1)
        $encoderParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, [long]85)
        $jpegCodec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
        
        $img.Save($outputPath, $jpegCodec, $encoderParams)
        $img.Dispose()
        
        $newFile = Get-Item $outputPath
        $newSize = $newFile.Length
        $reduction = [Math]::Round((1 - ($newSize / $originalSize)) * 100, 1)
        
        Write-Host "  Saved: $($newFile.Name) ($([Math]::Round($newSize/1KB, 2)) KB, ${reduction}% reduction)" -ForegroundColor Green
        
    } catch {
        Write-Host "  Error: $_" -ForegroundColor Red
    }
}

Write-Host "`nConversion complete!" -ForegroundColor Green
