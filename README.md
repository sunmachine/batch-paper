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

2. Open a terminal (choose one of these options):

   Option A - Command Prompt (Admin):
   - Right-click on the Start button
   - Select "Windows Terminal (Admin)" or "Command Prompt (Admin)"
   - Click "Yes" when prompted by User Account Control

   Option B - PowerShell:
   - Press Win + X and select "Windows PowerShell" or "Windows Terminal"
   - Enable script execution (one-time setup):
     ```powershell
     Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
     ```
   - Type "Y" when prompted to confirm

3. Verify installation:
   - Type `node --version` and press Enter
   - It should start with "v22."
   - Continue to the next steps or install the correct version!

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
   - Continue to the next steps or install the correct version!

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
   npm link  # Makes the 'batch-paper' command available globally
   ```

3. Process your PNG files:
   ```bash
   # Process a single PNG file
   batch-paper process path/to/your/image.png

   # Process all PNGs in a directory
   batch-paper process path/to/your/folder

   # Specify custom output directory
   batch-paper process path/to/your/folder -o path/to/output
   ```

   The processed files will be saved in the `output` directory by default.

   Note: If you prefer not to install globally, you can still use `npm start` instead of `batch-paper`:
   ```bash
   npm start process path/to/your/image.png
   ```

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
   - "batch-paper: command not found": Run `npm link` in the project directory
   - To remove global command: Run `npm unlink` in the project directory

## For Developers

Building from source:

```bash
# Install dependencies
npm install

# Run in development mode
npm run dev

# Build the TypeScript code
npm run build
```