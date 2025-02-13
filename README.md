# Batch Paper

A cross-platform CLI tool for batch converting PNG images to CMYK TIFF files for printing.

## Installation Instructions

### Required Version
This tool requires Node.js version 22.x or later. Please follow the instructions below to install Node.js.

### Windows Users

1. Install Node.js:
   - Visit [Node.js official website](https://nodejs.org/)
   - Download the latest version that starts with "22.x"
   - Run the downloaded installer (.msi file)
   - Follow the installation wizard, keeping all default settings
   - Click "Finish" when complete

2. Verify installation:
   - Open Command Prompt (press Win + R, type `cmd`, press Enter)
   - Type `node --version` and press Enter
   - It should start with "v22."
   - Type `npm --version` and press Enter
   - This should show a version number (exact version may vary)

### macOS Users

1. Install Node.js:
   - Visit [Node.js official website](https://nodejs.org/)
   - Download the latest version that starts with "22.x"
   - Run the downloaded package (.pkg file)
   - Follow the installation wizard
   - Enter your password when prompted

2. Verify installation:
   - Open Terminal (press Cmd + Space, type "Terminal", press Enter)
   - Type `node --version` and press Enter
   - It should start with "v22."
   - Type `npm --version` and press Enter
   - This should show a version number (exact version may vary)

## Using the Tool

1. Download this tool:
   - Download and unzip the tool to a location on your computer
   - Open Terminal (macOS) or Command Prompt (Windows)
   - Navigate to the tool's directory:
     ```bash
     cd path/to/batch-paper
     ```

2. First-time setup:
   ```bash
   npm install
   npm run build
   ```

3. Process your PNG files:
   ```bash
   # Process a single PNG file
   npm start process path/to/your/image.png

   # Process all PNGs in a directory
   npm start process path/to/your/folder

   # Specify custom output directory
   npm start process path/to/your/folder -o path/to/output
   ```

   The processed files will be saved in the `output` directory by default.

## Troubleshooting

If you encounter any issues:

1. Make sure Node.js is properly installed:
   ```bash
   node --version
   npm --version
   ```

2. Try reinstalling the dependencies:
   ```bash
   npm install
   ```

3. Common issues:
   - "node not found": Restart your Terminal/Command Prompt or reinstall Node.js
   - Permission errors (macOS/Linux): Add `sudo` before commands
   - Path issues: Make sure you're in the correct directory

## For Developers

Building from source:

```bash
# Install dependencies
npm install

# Run in development mode
npm run dev

# Build the TypeScript code
npm run build

# Create executables
npm run package
```

The executables will be created in the `executables` directory for both macOS and Windows.
