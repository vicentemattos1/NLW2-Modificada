import {Request, Response} from 'express'

import db from '../database/connection';
import convertHourToMinutes from '../utils/convertHourToMinutes';


export default class SearchClassesController {

    async index (request: Request, response: Response){
        const filters = request.query;

        const subject = filters.subject as string
        const time = filters.time as string
        const week_day = filters.week_day as string

        if(!filters.week_day || !filters.subject || !filters.time){
            return response.status(400).json({
                error : 'Missing filters to search classes'
            });
        }

        const timeInMinumtes = convertHourToMinutes(time)

        // const classes = await db('classes')
        //     .whereExists(function(){
        //         this.select('class_schedule.*')
        //         .from('class_schedule')
        //         .whereRaw('`class_schedule`.`class_id` = `classes`.`id`')
        //         .whereRaw('`class_schedule`.`week_day` = ??', [Number(week_day)])
        //         .whereRaw('`class_schedule`.`from` <= ??', [timeInMinumtes])
        //         .whereRaw('`class_schedule`.`to` > ??', [timeInMinumtes])
        //     })
        //     .where('classes.subject', '=', subject)
        //     .join('users','classes.user_id', '=', 'users.id')
        //     .select(['classes.*','users.*'])

        const classes = await db('classes')
        .select('*')
        .join('users','classes.user_id','users.id')
        .join('class_schedule','class_schedule.class_id','classes.id')
        .where('class_schedule.week_day','=', [Number(week_day)])
        .where('class_schedule.from','<=',[timeInMinumtes])
        .where('class_schedule.to','>',[timeInMinumtes])


        response.json(classes);
    }
}