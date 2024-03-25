import fs from "fs";

const profileController = {
  profilePicture: async (req, res) => {
    try {
      const image = req.file; // Assuming you're using multer to handle file uploads
      console.log("Uploaded File:", image);

      // Check if file exists
      if (!image) {
        return res.status(400).json({ error: "No file uploaded" });
      }

      // Move the uploaded file to a desired location (e.g., public/uploads)
      const tempPath = image.path;
      const targetPath = "public/uploads/" + image.originalname;

      // Create a read stream from the temporary file
      const readStream = fs.createReadStream(tempPath);

      // Create a write stream to the target file
      const writeStream = fs.createWriteStream(targetPath);

      // Pipe the read stream to the write stream to move the file
      readStream.pipe(writeStream);

      // Once the file is moved, respond with success
      readStream.on("end", () => {
        fs.unlinkSync(tempPath); // Remove the temporary file
        res.json({ message: "File uploaded successfully" });
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
};

export default profileController;
