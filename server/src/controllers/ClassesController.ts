import {Request, Response} from 'express'

import db from '../database/connection';
import convertHourToMinutes from '../utils/convertHourToMinutes';

interface ScheduleItem {
    week_day: number;
    from: string;
    to: string;
}


export default class ClassesController {

    async index (request: Request, response: Response){

        const classes = await db('classes')
            .select('*')
            .join('users','classes.user_id','users.id')
            .join('class_schedule','class_schedule.class_id','classes.id')

        response.json(classes);
    }


    async create(request: Request, response: Response) {

        const {
            name,
            avatar,
            whatsapp,
            bio,
            subject,
            cost,
            schedule
        } = request.body;
    
        const trx = await db.transaction();
        
        try{
            const isertedUsersIds = await trx('users').insert({
                name,
                avatar,
                whatsapp,
                bio,
            });
        
            const user_id = isertedUsersIds[0]
        
            const insertedClassesId = await trx('classes').insert({
                subject,
                cost,
                user_id,
            });
        
            const class_id = insertedClassesId[0];
        
            const classSchedule = schedule.map( (scheduleItem: ScheduleItem) => {
                return {
                    class_id,
                    week_day: scheduleItem.week_day,
                    from: convertHourToMinutes(scheduleItem.from),
                    to: convertHourToMinutes(scheduleItem.to)
                };
            });
            
            await trx('class_schedule').insert(classSchedule);
        
            await trx.commit();
        
            return response.status(201).send()
        }
        catch(err){
    
            await trx.rollback();
    
            return response.status(400).json({
                error: 'Unexpected error while creating new class'
            })
        }
    
    }

}