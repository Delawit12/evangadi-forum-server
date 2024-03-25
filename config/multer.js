import multer from "multer";

// Multer storage configuration
const storage = multer.diskStorage({
  // Destination folder where uploaded files will be stored
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },

  // File naming configuration
  filename: function (req, file, cb) {
    // Generating a unique filename based on current timestamp and original filename
    const currentTime = Date.now();
    cb(null, currentTime + "_" + file.originalname);
  },
});

// Multer upload configuration
export const upload = multer({ storage: storage });

// Multer middleware for handling file uploads
export const handleFileUpload = upload.single("image"); // Assumes the input field name in your form is 'image'
