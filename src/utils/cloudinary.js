import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs'

const upLoadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null;

        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET
        });
        const fileName = path.basename(localFilePath, path.extname(localFilePath));
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto",
            public_id: fileName
        });

        console.log("File is Uploaded on Cloudinary", response.url);
        return response;
    } catch (error) {
        console.log(error);
        if (fs.existsSync(localFilePath)) fs.unlinkSync(localFilePath);
        return null;
    }
}


export { upLoadOnCloudinary }