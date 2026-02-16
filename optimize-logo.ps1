# PowerShell script to optimize logo for 96x96 (2x for 48x48 display)
Add-Type -AssemblyName System.Drawing

$sourcePath = "c:\Users\Guido\Documents\Web Development\Projects\fontanerialowcost\public\logo.jpeg"
$outputPath = "c:\Users\Guido\Documents\Web Development\Projects\fontanerialowcost\public\logo-optimized.jpg"

# Load the image
$img = [System.Drawing.Image]::FromFile($sourcePath)

# Create new bitmap with target size (96x96 for retina)
$newImg = New-Object System.Drawing.Bitmap(96, 96)
$graphics = [System.Drawing.Graphics]::FromImage($newImg)

# Set high quality settings
$graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
$graphics.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality

# Draw resized image
$graphics.DrawImage($img, 0, 0, 96, 96)

# Save with quality 85
$encoderParams = New-Object System.Drawing.Imaging.EncoderParameters(1)
$encoderParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, 85)
$jpegCodec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }

$newImg.Save($outputPath, $jpegCodec, $encoderParams)

# Cleanup
$graphics.Dispose()
$newImg.Dispose()
$img.Dispose()

Write-Host "Logo optimized successfully: $outputPath"
Get-Item $outputPath | Select-Object Name, Length
