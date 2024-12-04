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
        if (exception.code === 'P2025') {
            // RecordNotFound
            const ctx = host.switchToHttp()
            const response = ctx.getResponse<Response>()
            const status = HttpStatus.NOT_FOUND

            response.status(status).json({
                statusCode: status,
                message: exception.message
            })
        } else {
            // Handle other Prisma errors
        }
    }
}
