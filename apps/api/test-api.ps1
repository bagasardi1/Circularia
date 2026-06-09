# Test API Circularia
Write-Host "==================================" -ForegroundColor Cyan
Write-Host "Testing Circularia API" -ForegroundColor Cyan
Write-Host "==================================" -ForegroundColor Cyan
Write-Host ""

$baseUrl = "http://localhost:3000/api"

# Test 1: Health Check
Write-Host "1. Testing Health Check..." -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "http://localhost:3000" -Method GET -TimeoutSec 5
    Write-Host "✓ Server is running!" -ForegroundColor Green
    Write-Host "Status: $($response.StatusCode)" -ForegroundColor Gray
} catch {
    Write-Host "✗ Server is not running. Please start with: npm run start:dev" -ForegroundColor Red
    Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}

Write-Host ""

# Test 2: Register User
Write-Host "2. Testing User Registration..." -ForegroundColor Yellow
$registerBody = @{
    email = "test@circularia.com"
    password = "password123"
    name = "Test User"
    role = "USER"
} | ConvertTo-Json

try {
    $response = Invoke-RestMethod -Uri "$baseUrl/auth/register" -Method POST -Body $registerBody -ContentType "application/json"
    Write-Host "✓ Registration successful!" -ForegroundColor Green
    Write-Host "User ID: $($response.user.id)" -ForegroundColor Gray
    Write-Host "Access Token: $($response.accessToken.Substring(0,20))..." -ForegroundColor Gray
    $global:accessToken = $response.accessToken
} catch {
    if ($_.Exception.Response.StatusCode -eq 409) {
        Write-Host "✓ User already exists (expected)" -ForegroundColor Green
    } else {
        Write-Host "✗ Registration failed" -ForegroundColor Red
        Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
    }
}

Write-Host ""

# Test 3: Login
Write-Host "3. Testing User Login..." -ForegroundColor Yellow
$loginBody = @{
    email = "test@circularia.com"
    password = "password123"
} | ConvertTo-Json

try {
    $response = Invoke-RestMethod -Uri "$baseUrl/auth/login" -Method POST -Body $loginBody -ContentType "application/json"
    Write-Host "✓ Login successful!" -ForegroundColor Green
    Write-Host "User Role: $($response.user.role)" -ForegroundColor Gray
    $global:accessToken = $response.accessToken
} catch {
    Write-Host "✗ Login failed" -ForegroundColor Red
    Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""

# Test 4: Get Profile (dengan auth)
Write-Host "4. Testing Get Profile (with auth)..." -ForegroundColor Yellow
if ($global:accessToken) {
    $headers = @{
        "Authorization" = "Bearer $($global:accessToken)"
    }
    
    try {
        $response = Invoke-RestMethod -Uri "$baseUrl/users/profile" -Method GET -Headers $headers
        Write-Host "✓ Profile retrieved!" -ForegroundColor Green
        Write-Host "Name: $($response.name)" -ForegroundColor Gray
        Write-Host "Email: $($response.email)" -ForegroundColor Gray
    } catch {
        Write-Host "✗ Failed to get profile" -ForegroundColor Red
        Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
    }
} else {
    Write-Host "✗ No access token available" -ForegroundColor Red
}

Write-Host ""
Write-Host "==================================" -ForegroundColor Cyan
Write-Host "API Testing Complete!" -ForegroundColor Cyan
Write-Host "==================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "To test more endpoints:" -ForegroundColor Yellow
Write-Host "- Visit Swagger UI: http://localhost:3000/docs" -ForegroundColor Cyan
Write-Host "- Use Postman with base URL: http://localhost:3000/api" -ForegroundColor Cyan