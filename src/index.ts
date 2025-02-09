#!/usr/bin/env node

import { Command } from "commander";
import sharp from "sharp";
import { PDFDocument } from "pdf-lib";
import { glob } from "glob";
import path from "path";
import fs from "fs";

const program = new Command();

program
  .name("batch-paper")
  .description("CLI tool for batch converting PNGs to PDFs for printing.")
  .version("1.0.0");

const ICC_PROFILE_PATH = path.join(__dirname, "../assets/GRACoL2013_CRPC6.icc");

async function processImage(inputPath: string, outputDir: string): Promise<void> {
  try {
    // Create output directory if it doesn't exist
    fs.mkdirSync(outputDir, { recursive: true });

    // Prepare output filename (change extension to pdf)
    const outputPath = path.join(
      outputDir,
      `${path.basename(inputPath, path.extname(inputPath))}.pdf`
    );

    // Load and process the image with Sharp
    const image = sharp(inputPath);
    const metadata = await image.metadata();
    console.log("Processing:", inputPath, "\nImage Metadata:", metadata);

    if (!metadata.width || !metadata.height) {
      throw new Error("Could not determine image dimensions");
    }

    // Convert to CMYK and embed ICC profile
    const processedBuffer = await image
      .toColorspace("cmyk")
      .withIccProfile(ICC_PROFILE_PATH, { attach: true })
      .withMetadata({ density: 600 })
      .toFormat("jpg", { quality: 100 })
      .toBuffer();

    // Create a new PDF document
    const pdfDoc = await PDFDocument.create();

    // Add the image as a page
    const page = pdfDoc.addPage([metadata.width, metadata.height]);
    const pngImage = await pdfDoc.embedJpg(processedBuffer);

    page.drawImage(pngImage, {
      x: 0,
      y: 0,
      width: metadata.width,
      height: metadata.height,
    });

    // Save the PDF
    const pdfBytes = await pdfDoc.save();
    fs.writeFileSync(outputPath, pdfBytes, { flag: "w" });

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
  .description("Process PNG files and convert them to CMYK PDFs")
  .argument("<paths...>", "File or directory paths to process")
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
