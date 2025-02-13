#!/usr/bin/env node

import { Command } from "commander";
import sharp from "sharp";
import { glob } from "glob";
import path from "path";
import fs from "fs";

const DEBUG = false;

const program = new Command();

program
  .name("batch-paper")
  .description("CLI tool for batch converting PNGs to PDFs for printing.")
  .version("1.0.0");

const ICC_PROFILE_PATH = path.resolve(__dirname, "../assets/GRACoL2013_CRPC6.icc");

async function processImage(inputPath: string, outputDir: string): Promise<void> {
  try {
    // Create output directory if it doesn't exist
    fs.mkdirSync(outputDir, { recursive: true });

    // Prepare output filename (change extension to pdf)
    const basePath = path.join(outputDir, `${path.basename(inputPath, path.extname(inputPath))}`);
    const outputPath = `${basePath}.tiff`;

    // Load and process the image with Sharp
    const image = sharp(inputPath);
    const metadata = await image.metadata();

    if (!metadata.width || !metadata.height) {
      throw new Error("Could not determine image dimensions");
    }

    // Convert to CMYK and embed ICC profile
    const tiff = image
      .withMetadata({ density: 600, icc: ICC_PROFILE_PATH })
      .toColourspace("cmyk")
      .tiff({
        compression: "lzw",
        resolutionUnit: "inch",
      })
      .withIccProfile(ICC_PROFILE_PATH, { attach: true });

    const tiffOutput = await tiff.toFile(outputPath);
    console.log("Processed TIFF output:", tiffOutput);

    // Create a new PDF document
    // TODO: Figure out why imagemagick is not preserving the ICC profile.
    // $ identify -verbose [tiff_path]
    // TODO: Try again later.
    console.log(`Processed: ${inputPath} -> ${outputPath}`);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(`Error processing ${inputPath}:`, error.message);
    } else {
      console.error(`Error processing ${inputPath}:`, String(error));
    }
  }
}

program
  .command("process")
  .description(
    "Process PNG files and convert them to CMYK PDFs. Supports both individual files and directories."
  )
  .argument(
    "<paths...>",
    "One or more paths to PNG files or directories containing PNGs (processes recursively)"
  )
  .option("-o, --output <dir>", "Output directory (defaults to ./output in current directory)")
  .action(async (paths: string[], options: { output?: string }) => {
    // Use specified output directory or default to cwd/output
    const outputDir = options.output
      ? path.resolve(options.output)
      : path.join(process.cwd(), "output");

    for (const inputPath of paths) {
      const stats = fs.statSync(inputPath);

      if (stats.isDirectory()) {
        // Process all PNG files in the directory
        const files = await glob("**/*.png", { cwd: inputPath });
        for (const file of files) {
          await processImage(path.join(inputPath, file), outputDir);
        }
      } else if (stats.isFile() && inputPath.toLowerCase().endsWith(".png")) {
        // Process single file
        await processImage(inputPath, outputDir);
      } else {
        console.warn(`Skipping ${inputPath}: Not a PNG file or directory`);
      }
    }
  });

program.parse();
