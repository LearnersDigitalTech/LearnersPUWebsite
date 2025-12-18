import fs from 'fs';
import path from 'path';
import Hero from '../components/Hero';
import MainStreams from '../components/MainStreams';
import Methodology from '../components/Methodology';
import Achievers from '../components/Achievers';
import BeyondClassroom from '../components/BeyondClassroom';
import CK12Section from '../components/CK12Section';
import OtherBranches from '../components/OtherBranches';
import NoticeBoard from '../components/NoticeBoard';

export default async function Home() {
  const popupDir = path.join(process.cwd(), 'public/popup');
  let popupSlides: { type: 'image' | 'video'; src: string; alt: string; }[] = [];

  try {
    if (fs.existsSync(popupDir)) {
      const files = fs.readdirSync(popupDir);
      // Filter out unwanted old images and keep new ones
      const excludedFiles = ['2.jpg', '3.jpeg', '4.jpg'];
      popupSlides = files
        .filter(file => /\.(jpg|jpeg|png|gif|webp|mp4|webm)$/i.test(file))
        .filter(file => !excludedFiles.includes(file))
        .sort((a, b) => {
          if (a === '1.jpeg') return -1;
          if (b === '1.jpeg') return 1;
          return a.localeCompare(b);
        })
        .map(file => ({
          type: /\.(mp4|webm)$/i.test(file) ? 'video' : 'image' as 'video' | 'image',
          src: `/popup/${file}`,
          alt: file.split('.')[0].replace(/[-_]/g, ' ')
        }));
    }
  } catch (error) {
    console.error("Error reading popup directory:", error);
  }

  return (
    <>
      <Hero />
      <MainStreams />
      <Methodology />
      <Achievers />
      <BeyondClassroom />
      <CK12Section />
      <OtherBranches />
      <NoticeBoard initialSlides={popupSlides} />
    </>
  );
}
