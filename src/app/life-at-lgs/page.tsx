import React from 'react';
import fs from 'fs';
import path from 'path';
import LifeAtLGSClient, { GalleryItem } from '../../components/LifeAtLGSClient';

const LifeAtLGS = async () => {
    const galleryDir = path.join(process.cwd(), 'public/gallery');

    // Function to get files recursively or just from specific folders
    const getGalleryItems = (): GalleryItem[] => {
        const items: GalleryItem[] = [];

        try {
            // Read root directory
            const rootFiles = fs.readdirSync(galleryDir);

            rootFiles.forEach(file => {
                const filePath = path.join(galleryDir, file);
                const stat = fs.statSync(filePath);

                if (stat.isDirectory()) {
                    // Handle subdirectories
                    const category = file; // Use folder name as category
                    const subFiles = fs.readdirSync(filePath);

                    subFiles.forEach(subFile => {
                        if (/\.(jpg|jpeg|png|gif|webp)$/i.test(subFile)) {
                            items.push({
                                src: `/gallery/${file}/${subFile}`,
                                category: category,
                                title: subFile.split('.')[0].replace(/[-_]/g, ' ') // Simple title generation
                            });
                        }
                    });
                } else if (/\.(jpg|jpeg|png|gif|webp)$/i.test(file)) {
                    // Handle root files - default to 'events' or 'all'
                    // Based on user request, root files might be general. Let's assign 'events' as a safe default or 'general'
                    items.push({
                        src: `/gallery/${file}`,
                        category: 'events', // Default category for root items
                        title: file.split('.')[0].replace(/[-_]/g, ' ')
                    });
                }
            });
        } catch (error) {
            console.error("Error reading gallery directory:", error);
        }

        return items;
    };

    const galleryItems = getGalleryItems();

    return <LifeAtLGSClient initialGalleryItems={galleryItems} />;
};

export default LifeAtLGS;
