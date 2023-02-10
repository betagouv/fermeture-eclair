import { Request, Response } from 'express';
import httpStatus from 'http-status';
import Joi from 'joi';

export { buildController };

function buildController<bodyT>(
    controller: (body: bodyT) => any,
    options?: {
        schema?: Joi.Schema;
        checkAuthorization?: (headers: Record<string, string>, body: string) => boolean;
    },
) {
    return async (req: Request, res: Response) => {
        if (options?.checkAuthorization) {
            console.log(req.body);
            const isSignatureValid = options.checkAuthorization(req.headers as any, req.body);
            console.log(isSignatureValid);
            if (!isSignatureValid) {
                console.error(`The signature of the payload is not valid.`);
                res.sendStatus(httpStatus.UNAUTHORIZED);
                return;
            }
        }
        const body = req.body ? JSON.parse(req.body) : {};

        if (options?.schema) {
            const { error } = options.schema.validate(body);
            if (error) {
                res.status(httpStatus.BAD_REQUEST).send(error.message);
                return;
            }
        }

        try {
            const result = await controller(body);
            res.set('Content-Type', 'application/json');
            res.send(result);
            return;
        } catch (error) {
            console.error(error);
            res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
        }
    };
}
