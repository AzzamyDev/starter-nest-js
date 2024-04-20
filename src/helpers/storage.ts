import { extname } from 'path'
import { existsSync, mkdirSync } from 'fs'
import { diskStorage } from 'multer'
import { v4 as uuid } from 'uuid'
import { HttpException, HttpStatus } from '@nestjs/common'

export const MAX_PROFILE_PICTURE_SIZE_IN_BYTES = 10 * 1024 * 1024
// Multer configuration
export const multerConfig = {
    dest: './uploads'
}

// Multer upload options
export const financerUploadOption = {
    // Enable file size limits
    limits: {
        fileSize: 20 * 1024 * 1000
    },
    // Check the mimetypes to allow for upload
    fileFilter: (req: any, file: any, cb: any) => {
        if (file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
            // Allow storage of file
            cb(null, true)
        } else {
            // Reject file
            cb(
                new HttpException(
                    `Unsupported file type ${extname(file.originalname)}`,
                    HttpStatus.BAD_REQUEST
                ),
                false
            )
        }
    },
    // Storage properties
    storage: diskStorage({
        // Destination storage path details
        destination: (req: any, file: any, cb: any) => {
            if (!existsSync(multerConfig.dest)) {
                mkdirSync(multerConfig.dest)
            }

            const uploadPath = multerConfig.dest + '/financers'
            // Create folder if doesn't exist
            if (!existsSync(uploadPath)) {
                mkdirSync(uploadPath)
            }
            cb(null, uploadPath)
        },
        // File modification details
        filename: (req: any, file: any, cb: any) => {
            // Calling the callback passing the random name generated with the original extension name
            cb(null, `${uuid()}${extname(file.originalname)}`)
        }
    })
}

export const hotelUploadOption = {
    // Enable file size limits
    limits: {
        fileSize: 20 * 1024 * 1000
    },
    // Check the mimetypes to allow for upload
    fileFilter: (req: any, file: any, cb: any) => {
        if (file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
            // Allow storage of file
            cb(null, true)
        } else {
            // Reject file
            cb(
                new HttpException(
                    `Unsupported file type ${extname(file.originalname)}`,
                    HttpStatus.BAD_REQUEST
                ),
                false
            )
        }
    },
    // Storage properties
    storage: diskStorage({
        // Destination storage path details
        destination: (req: any, file: any, cb: any) => {
            if (!existsSync(multerConfig.dest)) {
                mkdirSync(multerConfig.dest)
            }

            const uploadPath = multerConfig.dest + '/hotels'
            // Create folder if doesn't exist
            if (!existsSync(uploadPath)) {
                mkdirSync(uploadPath)
            }
            cb(null, uploadPath)
        },
        // File modification details
        filename: (req: any, file: any, cb: any) => {
            // Calling the callback passing the random name generated with the original extension name
            cb(null, `${uuid()}${extname(file.originalname)}`)
        }
    })
}

function getFolderName(data: string): string {
    switch (data) {
        case 'identityFile':
            return 'dokumen_identitas'
        case 'invoiceVehicleFile':
        case 'stnkFile':
            return 'dokumen_kendaraan'
        case 'attachment':
            return 'lampiran'
        case 'front':
        case 'back':
        case 'left1':
        case 'left2':
        case 'left3':
        case 'right1':
        case 'right2':
        case 'right3':
            return 'foto_kendaraan'
        case 'video':
            return 'video'
        default:
            return 'lainnya'
    }
}
