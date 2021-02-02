import React, {FormEvent, useState} from 'react';
import { useHistory } from 'react-router-dom'

import Input from '../../components/Input';
import warningIcon from '../../assets/images/icons/warning.svg'
import Textarea from '../../components/Textarea';
import PageHeader from  '../../components/PageHeader'
import Select from '../../components/Select';
import api from '../../services/api';

import './styles.css'



function TeacherForm() {
    const history = useHistory();

    const [name, setName] = useState('');
    const [avatar, setAvatar] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [bio, setBio] = useState('');

    const [subject, setSubject] = useState('');
    const [cost, setCost] = useState('');

    const [scheduleItems, setScheduleItems] = useState([{ week_day: 7, from:"", to:"" }]);
    
    function addNewScheduleItem(){
        setScheduleItems([...scheduleItems, { week_day: 7, from:"", to:"" }])
    }

    function handleCreateClass(e: FormEvent){
        e.preventDefault()

        scheduleItems.map(scheduleItem => {
            if( Number(scheduleItem.from.split(':')[0]) >= 22 && Number(scheduleItem.to.split(':')[0]) <= 5){
                alert('Data inválida')
            }else{
                api.post('classes',{
                    name,
                    avatar,
                    whatsapp,
                    bio,
                    subject,
                    cost: Number(cost),
                    schedule: scheduleItems
                }).then(() => {
                    alert('Cadastro com sucesso')
                    history.push('/')
                }).catch(()=>{
                    alert('Erro no cadastro')
                })
            }
            return 0
        })
    }

    function setScheduleItemValue(position: number, field: string,  value: string){
        const updatedScheduleItem = scheduleItems.map((scheduleItem, index) => {
            if(index === position){
                return { ...scheduleItem, [field]: value }
            }
            
            return scheduleItem
        });

        setScheduleItems(updatedScheduleItem);
    }

    return (
        <div id="page-teacher-form" className="container">
            <PageHeader 
            title="Que incrível que você quer dar aulas."
            description="O primeiro passo é preencher este formulário de inscrição" />

            <main>
                <form onSubmit={handleCreateClass}>
                    <fieldset>
                        <legend>Seus dados</legend>
                        <Input 
                            required
                            name="name"
                            label="Nome completo"
                            value={name}
                            onChange={(e) => {setName(e.target.value)}}/>
                        <Input 
                            required
                            name="avatar"  
                            label="Avatar"
                            value={avatar}
                            onChange={(e) => {setAvatar(e.target.value)}} 

                        />
                        <Input 
                            required
                            name="whatsapp"  
                            label="Whatsapp"
                            value={whatsapp}
                            onChange={(e) => {setWhatsapp(e.target.value)}} 

                        />
                        <Textarea
                            required
                            name="bio" 
                            label="Biografia"
                            value={bio}
                            onChange={(e) => {setBio(e.target.value)}}

                        />
                    </fieldset>

                    <fieldset>
                        <legend>Sobre a aula</legend>
                        <Select 
                            required
                            name="subject"  
                            label="Matéria"
                            value={subject}
                            onChange={(e)=>{setSubject(e.target.value)}}
                            options={[
                                {value: 'Artes', label:'Artes'},
                                {value: 'Biologia', label:'Biologia'},
                                {value: 'Ciências', label:'Ciências'},
                                {value: 'Educação física', label:'Educação física'},
                                {value: 'Geografia', label:'Geografia'},
                                {value: 'História', label:'História'},
                                {value: 'Matemática', label:'Matemática'},
                                {value: 'Português', label:'Português'},
                                {value: 'Química', label:'Química'},
                            ]}
                        />
                        <Input 
                            required
                            name="cost"  
                            label="Custo da hora por aula" 
                            value={cost}
                            onChange={(e)=>{setCost(e.target.value)}}
                            />
                    </fieldset>

                    <fieldset>
                        <legend>Horários disponíveis
                        <button type="button" onClick={addNewScheduleItem}>
                            + Novo horário
                        </button>
                        </legend>

                        {scheduleItems.map( (scheduleItem,index) => {
                            return (
                                <div key={scheduleItem.week_day} className="schedule-item">
                                    <Select 
                                        name="week_day"  
                                        label="Dia da semana"
                                        value={scheduleItem.week_day}
                                        onChange={ e => setScheduleItemValue(index, 'week_day', e.target.value)}
                                        options={[
                                            {value: '0', label:'Domingo'},
                                            {value: '1', label:'Segunda-feira'},
                                            {value: '2', label:'Terça-feira'},
                                            {value: '3', label:'Quarta-feira'},
                                            {value: '4', label:'Quinta-feira'},
                                            {value: '5', label:'Sexta-feira'},
                                            {value: '6', label:'Sábado'},
                                        ]}
                                    />
                                    <Input name="from" value={scheduleItem.from} label="Das" type="time" onChange={ e => setScheduleItemValue(index, 'from', e.target.value)}/>
                                    <Input name="to" value={scheduleItem.to} label="Até" type="time" onChange={ e => setScheduleItemValue(index, 'to', e.target.value)}/>
                                </div>
                            );
                        })}
                    </fieldset>

                    <footer>
                        <p>
                            <img src={warningIcon} alt="Aviso important"/>
                            Importante <br />
                            Preencha todos os dados
                        </p>
                        <button type="submit">
                            Salvar cadastro
                        </button>
                    </footer>
                </form>
            </main>
        </div>
    );
}

export default TeacherForm;