const express = require('express');
const dotenv = require('dotenv');
const multer = require('multer');

dotenv.config();

const uploadToCloudinary = require('./cloudinary');

const app = express()
  .use(express.urlencoded({ extended: true }))
  .use(express.json());

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 2 * 1024 * 1024,
    files: 1,
  },
});

app.post("/upload", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const result = await uploadToCloudinary(req.file);

    return res.status(201).json({
      url: result.secure_url,
    });
  } catch (err) {
    console.error("Error uploading to Cloudinary:", err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/', (req, res) => {
  return res.json({
    message: 'Hello',
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});