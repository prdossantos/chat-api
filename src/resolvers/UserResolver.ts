import axios from "axios";
import { logger } from "../helper";

export const UserResolver = {
    Query: {
        users: async () => {
            try {
                const { data } = await axios.get(`http://localhost:${process.env.NODE_PORT}/users`);
                return data.data
            } catch (e) {
                logger.error(e.message)
                return [];
            }
        },
    },
    Mutation: {
        signIn: async ( _: any, body: any ) => {  
            try {
                const { data } = await axios.post(`http://localhost:${process.env.NODE_PORT}/signin`, body);
                return data.data
            } catch (e) {
                logger.error(e.message)
            }
        }
    }
};