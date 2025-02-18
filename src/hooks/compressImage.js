export const compressImage = (
  imageUrl,
  maxWidth = 300,
  maxHeight = 300,
  quality = 0.1
) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = imageUrl;

    img.onload = () => {
      const canvas = document.createElement("canvas");
      let { width, height } = img;

      if (width > maxWidth || height > maxHeight) {
        const aspectRatio = width / height;
        if (width > height) {
          width = maxWidth;
          height = maxWidth / aspectRatio;
        } else {
          height = maxHeight;
          width = maxHeight * aspectRatio;
        }
      }

      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");

      ctx.drawImage(img, 0, 0, width, height);

      canvas.toBlob(
        (blob) => {
          if (blob) {
            const compressedImageUrl = URL.createObjectURL(blob);
            resolve(compressedImageUrl);
          } else {
            reject(new Error("Ошибка при создании Blob"));
          }
        },
        "image/webp",
        quality
      );
    };

    img.onerror = (error) => reject(error);
  });
};
