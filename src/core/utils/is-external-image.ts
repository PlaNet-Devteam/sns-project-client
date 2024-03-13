const isExternalImage = (imagePath: string): boolean => {
  return imagePath.includes('http://') || imagePath.includes('https://');
};

export default isExternalImage;
