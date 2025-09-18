import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({ storage });

// Accept profileImage (single) and up to 4 gallery images
export default upload.fields([
	{ name: 'profileImage', maxCount: 1 },
	{ name: 'galleryImage1', maxCount: 1 },
	{ name: 'galleryImage2', maxCount: 1 },
	{ name: 'galleryImage3', maxCount: 1 },
	{ name: 'galleryImage4', maxCount: 1 },
]);
