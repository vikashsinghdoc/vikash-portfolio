import data from './placeholder-images.json';
import profilePic from '@/assets/vikash-profile.png';
import heroBg from '@/assets/hero-background.jpeg';
import type { StaticImageData } from 'next/image';

export type ImagePlaceholder = {
  id: string;
  description: string;
  imageUrl: string | StaticImageData;
  imageHint: string;
};

// Replace local root URL with imported static image so components can use static import
export const PlaceHolderImages: ImagePlaceholder[] = data.placeholderImages.map((p) => {
  if (p.imageUrl === '/vikash-profile.png') {
    return { ...p, imageUrl: profilePic };
  }
  if (p.id === 'hero-background') {
    return { ...p, imageUrl: heroBg };
  }
  return p as ImagePlaceholder;
});

// Helper function to extract URL from StaticImageData or string
export const getImageUrl = (imageUrl: string | StaticImageData): string => {
  if (typeof imageUrl === 'string') {
    return imageUrl;
  }
  // StaticImageData object has a 'src' property
  return (imageUrl as any).src || '';
};
