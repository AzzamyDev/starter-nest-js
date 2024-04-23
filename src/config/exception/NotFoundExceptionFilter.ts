import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpStatus
} from '@nestjs/common'
import { NotFoundError } from '@prisma/client/runtime/library'
import { Response } from 'express'

@Catch(NotFoundError)
export class NotFoundExceptionFilter implements ExceptionFilter {
    catch(exception: NotFoundError, host: ArgumentsHost) {
        const ctx = host.switchToHttp()
        const response = ctx.getResponse<Response>()
        const status = HttpStatus.NOT_FOUND

        response.status(status).json({
            statusCode: status,
            message: exception.message
        })
    }
}
