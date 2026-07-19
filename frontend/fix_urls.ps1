 = Get-ChildItem -Recurse -Path src -Include *.tsx,*.ts  
foreach( in ) {  
   = Get-Content .FullName -Raw -Encoding UTF8  
  if( -match 'http://localhost:5000') {  
     =  -replace 'http://localhost:5000', ''  
    Set-Content -Path .FullName -Value  -Encoding UTF8  
    Write-Host ('Updated: ' + .Name)  
  }  
} 
