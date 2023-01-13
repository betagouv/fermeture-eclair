import { Request, Response } from 'express';
import httpStatus from 'http-status';
import Joi from 'joi';

export { buildController };

export type { routeType };

type routeType =
    | { kind: 'success'; data: any }
    | { kind: 'error'; message: string; statusCode: number };

function buildController<bodyT>(
    controller: (body: bodyT) => routeType | Promise<routeType>,
    options?: { schema?: Joi.Schema },
) {
    return async (req: Request, res: Response) => {
        try {
            await checkAuthentication(req);
        } catch (error) {
            console.error(error);
            res.sendStatus(httpStatus.UNAUTHORIZED);
            return;
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
    // Vérifie que la signature vient bien de GitGuardian
}
