import axios from "axios";
import { logger } from "../helper";

export const MessageResolver = {
    Query: {
        messages: async () => {                                                                         
            try {
                const { data } = await axios.get(`http://localhost:${process.env.NODE_PORT}/messages`);
                return data.data
            } catch (e) {
                logger.error(e.message)
                return [];
            }
        },
    },
    Mutation: {
        createMessage: async ( _: any, body: any ) => {  
            try {
                const { data } = await axios.post(`http://localhost:${process.env.NODE_PORT}/message`, body);
                return data.data
            } catch (e) {
                logger.error(e.message)
            }
        }
    }
};