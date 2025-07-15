import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpStatus
} from '@nestjs/common'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { Response } from 'express'

@Catch(PrismaClientKnownRequestError)
export class NotFoundExceptionFilter implements ExceptionFilter {
    catch(exception: PrismaClientKnownRequestError, host: ArgumentsHost) {
        const ctx = host.switchToHttp()
        const response = ctx.getResponse<Response>()
        if (exception.code === 'P2025') {
            const status = HttpStatus.NOT_FOUND

            response.status(status).json({
                statusCode: status,
                message: exception.meta
                    ? `Data ${exception.meta?.modelName ?? ''} tidak ditemukan`
                    : 'Data tidak ditemukan'
            })
        } else {
            console.log(exception)
            response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                statusCode: exception.code,
                meta: exception.meta
            })
        }
    }
}
