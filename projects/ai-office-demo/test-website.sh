#!/bin/bash

# AI Office Demo Website Testing Script
# This script tests the website functionality and validates the setup

echo "🚀 Starting AI Office Demo Website Testing..."
echo "=================================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print status
print_status() {
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✅ $1${NC}"
    else
        echo -e "${RED}❌ $1${NC}"
        exit 1
    fi
}

echo -e "${YELLOW}📦 Installing dependencies...${NC}"
npm install
print_status "Dependencies installed"

echo -e "${YELLOW}🔍 Running TypeScript compilation check...${NC}"
npx tsc --noEmit
print_status "TypeScript compilation passed"

echo -e "${YELLOW}🎨 Running ESLint...${NC}"
npm run lint
print_status "ESLint passed"

echo -e "${YELLOW}📏 Running Prettier check...${NC}"
npx prettier --check "src/**/*.{ts,tsx,css}"
print_status "Prettier check passed"

echo -e "${YELLOW}🏗️ Building project...${NC}"
npm run build
print_status "Build successful"

echo -e "${YELLOW}📊 Analyzing bundle size...${NC}"
if [ -d "dist" ]; then
    echo "Bundle size:"
    du -sh dist/*
    print_status "Bundle analysis completed"
else
    echo -e "${YELLOW}⚠️  Build directory not found, but build may have succeeded${NC}"
fi

echo -e "${YELLOW}🔧 Starting development server for manual testing...${NC}"
echo "Development server will start at http://localhost:3000"
echo "Press Ctrl+C to stop the server when testing is complete"
echo ""
echo -e "${YELLOW}Manual Testing Checklist:${NC}"
echo "1. ✅ Website loads without errors"
echo "2. ✅ All components render properly"
echo "3. ✅ Responsive design works on mobile/tablet/desktop"
echo "4. ✅ Navigation links work"
echo "5. ✅ No console errors"
echo "6. ✅ Images and icons load correctly"
echo "7. ✅ Tailwind CSS styles applied correctly"
echo ""
echo -e "${GREEN}🎉 Ready to start development server!${NC}"
echo ""

# Start development server
npm run dev
