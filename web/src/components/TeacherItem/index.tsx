import React from 'react';

import whatsappIcon from '../../assets/images/icons/whatsapp.svg'
import api from '../../services/api';

import './styles.css'

export interface Teacher{
    avatar: string,
    bio: string,
    cost: number,
    id:number,
    name: string,
    subject: string,
    whatsapp: string,
    from: number,
    to: number,
    week_day: string
}
interface TeacherItemProps{
    teacher: Teacher
}

const TeacherItem: React.FC<TeacherItemProps> = ({teacher}) => {

    const week_days =['Domingo',
    'Segunda-feira ',
    'Terça-feira ',
    'Quarta-feira ',
    'Quinta-feira ',
    'Sexta-feira ',
    'Sábado ']

    function createNewConnection(){
        api.post('connections',{
            user_id: teacher.id
        })
    }

    return(
        <article className="teacher-item">
            <header>
                <img src={teacher.avatar} alt="Vicente Mattos"/>
                <div>
                    <strong>{teacher.name}</strong>
                    <span>{teacher.subject}</span>
                </div>
            </header>

            <p> 
                {teacher.bio}
            </p>
            <footer>
                <p>
                    <span>
                        Preço/hora
                        <strong>R${teacher.cost}</strong>
                    </span>
                    <span>
                        Horário: { week_days.map((day,index) =>{
                            if(index.toString()===teacher.week_day){
                                return day
                            }
                        })} {teacher.from%60===0 ? teacher.from/60 : `${Math.trunc(teacher.from/60)}:${teacher.from%60}`} ás {teacher.to%60===0 ? teacher.to/60 : `${Math.trunc(teacher.to/60)}:${teacher.to%60}`}
                    </span>
                </p>
                <a target="_blank" onClick={createNewConnection} href={`https://wa.me/${teacher.whatsapp}`}>
                    <img src={whatsappIcon} alt="Entrar em contato"/>
                    Entrar em contato
                </a>

            </footer>
        </article>

    )
}

export default TeacherItem