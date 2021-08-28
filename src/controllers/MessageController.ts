import express from 'express';
import { logger, responseError, responseSuccess } from '../helper';
import { isDBConnected } from '../mongo.connection';
import MessageModel, { Message } from '../models/MessageModel';


class MessageController {
    
    /**
     * Creates a new purchase
     * 
     * @param req 
     * @param res 
     * @returns 
     */
    async create( req: express.Request, res: express.Response ) {
        
        const { body } = req
        const message = new MessageModel(body);
        const hasErrors = message.validateSync();

        if( hasErrors )        
            return res.status(400).json(responseError(hasErrors.message));

        if( !isDBConnected() )
            return res.status(400).json(responseError('Your DB isn\'t started, but your request is ok!'));

        try {

            const saved = await message.save();
            message._id = saved._id;
        } catch( e ) {
            logger.error(e.message)
            return res.status(400).json(responseError(e.message));
        }

        return res.json(responseSuccess<Message>(message))
    }

    /**
     * Will list all purchases realised.
     * 
     * @param req 
     * @param res 
     * @returns 
     */
    async listMessages( req: express.Request, res: express.Response ) {
        
        if( !isDBConnected() )
            return res.status(400).json(responseError('Your DB isn\'t started, but your request is ok!'));

        const messages: any = await MessageModel.aggregate([
            { $lookup: { from: "users", localField: "userId", foreignField: "_id", as: "user" } },
            { $unwind: { path: "$user", preserveNullAndEmptyArrays: true} },
        ]);

        return res.json(responseSuccess<Message[]>(messages || []))
    }
}

export default new MessageController()