import express from 'express';
import UserModel from '../models/UserModel';
import { logger, responseError, responseSuccess } from '../helper';
import { isDBConnected } from '../mongo.connection';

class UserController {
    
     /**
     * Make a new login
     * 
     * @param req 
     * @param res 
     * @returns 
     */
      async signIn( req: express.Request, res: express.Response ) {
        
        const { name } = req.body
        let user: any = null;
        const hasErrors = (new UserModel({name: name})).validateSync(['name']);

        if( hasErrors )        
            return res.status(400).json(responseError(hasErrors.message));

        if( !isDBConnected() )
            return res.status(400).json(responseError('Your DB isn\'t started, but your request is ok!'));

        try {   
            user = await UserModel.findOne({name}, 'name');
            
            if( !user ) {
                user = await UserModel.create({name})
            }

        } catch( e ) {
            logger.error(e.message)
            return res.status(400).json(responseError(e.message));
        }

        return res.json(responseSuccess<any>(user))
    }
}


export default new UserController()