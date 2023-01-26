import { Request, Response } from 'express';
import httpStatus from 'http-status';
import Joi from 'joi';
import { alertHandler } from '../modules';

export { buildController };

export type { routeType };

type authenticationType = 'signature' | 'none';

type routeType =
    | { kind: 'success'; data?: any }
    | { kind: 'error'; message: string; statusCode: number };

function buildController<bodyT>(
    controller: (body: bodyT) => routeType | Promise<routeType>,
    options?: { schema?: Joi.Schema; authentication?: authenticationType },
) {
    return async (req: Request, res: Response) => {
        switch (options?.authentication) {
            case 'signature':
                try {
                    await checkAuthentication(req);
                } catch (error) {
                    console.error(error);
                    res.sendStatus(httpStatus.UNAUTHORIZED);
                    return;
                }
                break;
            default:
        }

        if (options?.schema) {
            const { error } = options.schema.validate(req.body);
            if (error) {
                res.status(httpStatus.BAD_REQUEST).send(error.message);
                return;
            }
        }

        try {
            const result = await controller(req.body);
            switch (result.kind) {
                case 'success':
                    res.send(result.data);
                    return;
                case 'error':
                    res.status(result.statusCode);
                    res.send(result.message);
                    return;
            }
        } catch (error) {
            console.error(error);
            res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
        }
    };
}

async function checkAuthentication(req: Request) {
    if (alertHandler.verifySignature(req, {})) {
        console.log('YOUPI, ça vient bien de GitGuardian');
    } else {
        console.log('WRONG TOKEN');
    }
}
