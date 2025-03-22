import multer from "multer";
import path from "path";
import { v4 as uuidv4 } from "uuid";

const avatarStorage = multer.diskStorage({
  destination: (req, file, callBack) => {
    callBack(null, "./uploads/avatars");
  },
  filename: (req, file, callBack) => {
    const fileName = `${file.fieldname}-${uuidv4()}${path.extname(file.originalname)}`;

    callBack(null, fileName);
  },
});

const uploadAvatar = multer({
  storage: avatarStorage,
  fileFilter: (req, file, callBack) => {
    if (!["image/png", "image/jpg", "image/jpeg"].includes(file.mimetype)) {
      return callBack(new Error("File type is not supported. Only .JPG, .PNG, .JPEG are allowed!"));
    }

    callBack(null, true);
  },
  limits: {
    files: 1,
    fileSize: 1024 * 1024 * 1,
  },
});

export { uploadAvatar };
