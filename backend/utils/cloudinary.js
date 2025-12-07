const cloudinary = require('cloudinary').v2;

// Make sure dotenv is loaded FIRST in this file
require('dotenv').config();

console.log('\n🔧 Cloudinary Configuration Check:');
console.log('CLOUDINARY_CLOUD_NAME:', process.env.CLOUDINARY_CLOUD_NAME ? `"${process.env.CLOUDINARY_CLOUD_NAME}"` : 'Not set');
console.log('CLOUDINARY_API_KEY exists:', !!process.env.CLOUDINARY_API_KEY);
console.log('CLOUDINARY_API_SECRET exists:', !!process.env.CLOUDINARY_API_SECRET);

// Check if Cloudinary is configured
const isCloudinaryConfigured = () => {
    const hasConfig = process.env.CLOUDINARY_CLOUD_NAME && 
                     process.env.CLOUDINARY_API_KEY && 
                     process.env.CLOUDINARY_API_SECRET &&
                     process.env.CLOUDINARY_CLOUD_NAME.trim() !== '' &&
                     process.env.CLOUDINARY_CLOUD_NAME !== 'dummy';
    
    return hasConfig;
};

// Configure Cloudinary
let cloudinaryConfigured = false;
if (isCloudinaryConfigured()) {
    try {
        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME.trim(),
            api_key: process.env.CLOUDINARY_API_KEY.trim(),
            api_secret: process.env.CLOUDINARY_API_SECRET.trim(),
            secure: true
        });
        cloudinaryConfigured = true;
        console.log('✅ Cloudinary configured successfully');
    } catch (error) {
        console.error('❌ Error configuring Cloudinary:', error.message);
        cloudinaryConfigured = false;
    }
} else {
    console.log('⚠️ Cloudinary not configured. Using local file storage fallback.');
    cloudinaryConfigured = false;
}

// Upload directly from buffer
const uploadBufferToCloudinary = async (fileBuffer, filename, folder = 'evidence') => {
    console.log(`📤 Attempting upload: ${filename} (${fileBuffer.length} bytes)`);
    
    if (!cloudinaryConfigured) {
        console.log('⚠️ Cloudinary not configured, using local fallback');
        const localUrl = `local://uploads/${Date.now()}-${filename}`;
        return {
            secure_url: localUrl,
            public_id: `local_${Date.now()}_${filename}`,
            url: localUrl,
            resource_type: 'auto'
        };
    }
    
    try {
        return new Promise((resolve, reject) => {
            const uploadOptions = {
                folder: folder || 'evidence',
                public_id: `${Date.now()}_${filename.replace(/\.[^/.]+$/, "")}`, // Remove extension
                resource_type: 'auto',
                overwrite: false,
                timeout: 30000
            };

            const stream = cloudinary.uploader.upload_stream(
                uploadOptions,
                (error, result) => {
                    if (error) {
                        console.error('❌ Cloudinary upload error:', error.message);
                        const localUrl = `local://uploads/${Date.now()}-${filename}`;
                        console.log('⚠️ Falling back to local storage');
                        resolve({
                            secure_url: localUrl,
                            public_id: `local_${Date.now()}_${filename}`,
                            url: localUrl,
                            resource_type: 'auto'
                        });
                    } else {
                        console.log(`✅ Upload successful: ${result.public_id}`);
                        resolve(result);
                    }
                }
            );
            
            stream.on('error', (streamError) => {
                console.error('❌ Stream error:', streamError.message);
                const localUrl = `local://uploads/${Date.now()}-${filename}`;
                resolve({
                    secure_url: localUrl,
                    public_id: `local_${Date.now()}_${filename}`,
                    url: localUrl,
                    resource_type: 'auto'
                });
            });
            
            stream.write(fileBuffer);
            stream.end();
        });
    } catch (error) {
        console.error('❌ Error in uploadBufferToCloudinary:', error.message);
        const localUrl = `local://uploads/${Date.now()}-${filename}`;
        return {
            secure_url: localUrl,
            public_id: `local_${Date.now()}_${filename}`,
            url: localUrl,
            resource_type: 'auto'
        };
    }
};

module.exports = { 
    uploadBufferToCloudinary, 
    isCloudinaryConfigured: () => cloudinaryConfigured
};