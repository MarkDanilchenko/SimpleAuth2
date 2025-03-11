// --------------------------------------IMGSTORAGE_CONFIG
const multer = require('multer');
const path = require('path');

// --------------------------------------IMGSTORAGE
const imgStorage = multer.diskStorage({
	destination: (req, file, callBack) => {
		callBack(null, './assets/IMG');
	},
	filename: (req, file, callBack) => {
		callBack(null, `${file.fieldname}-${Date.now().toString(16)}${Math.trunc(Math.random() * 1_000_000).toString(16)}${path.extname(file.originalname)}`);
	},
});
const multer_config = multer({
	storage: imgStorage,
	fileFilter: (req, file, callBack) => {
		if (file.mimetype == 'image/png' || file.mimetype == 'image/jpg' || file.mimetype == 'image/jpeg') {
			callBack(null, true);
		} else {
			req.imageFileTypeValidationError = 'File type is not supported. Only .JPG, .PNG, .JPEG are allowed!';
			callBack(null, false);
		}
	},
	// limits: {
	// 	fileSize: 100_000,
	// },
});

// --------------------------------------EXPORT
module.exports = { multer_config };
