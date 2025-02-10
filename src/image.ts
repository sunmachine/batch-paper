import imagemagick from "imagemagick";

export async function convert(...args: string[]): Promise<void> {
  return new Promise((resolve, reject) => {
    imagemagick.convert(args, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}
