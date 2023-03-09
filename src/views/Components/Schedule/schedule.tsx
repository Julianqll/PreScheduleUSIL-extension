import React from 'react';
import { Table} from '@mantine/core';

type ScheduleItem = {
    id: number;
  time: string;
  monday: string;
  tuesday: string;
  wednesday: string;
  thursday: string;
  friday: string;
  saturday: string;
  sunday: string;
}


let schedule: ScheduleItem[] = [
  { id: 7, time: '7:00am', monday: '', tuesday: '', wednesday: '', thursday: '', friday: '', saturday: '', sunday: '' },
  { id: 8, time: '8:00am', monday: '', tuesday: '', wednesday: '', thursday: '', friday: '', saturday: '', sunday: '' },
  { id: 9, time: '9:00am', monday: '', tuesday: '', wednesday: '', thursday: '', friday: '', saturday: '', sunday: '' },
  { id: 10, time: '10:00am', monday: '', tuesday: '', wednesday: '', thursday: '', friday: '', saturday: '', sunday: '' },
  { id: 11, time: '11:00am', monday: '', tuesday: '', wednesday: '', thursday: '', friday: '', saturday: '', sunday: '' },
  { id: 12, time: '12:00pm', monday: '', tuesday: '', wednesday: '', thursday: '', friday: '', saturday: '', sunday: '' },
  { id: 13, time: '13:00pm', monday: '', tuesday: '', wednesday: '', thursday: '', friday: '', saturday: '', sunday: '' },
  { id: 14, time: '14:00pm', monday: '', tuesday: '', wednesday: '', thursday: '', friday: '', saturday: '', sunday: '' },
  { id: 15, time: '15:00pm', monday: '', tuesday: '', wednesday: '', thursday: '', friday: '', saturday: '', sunday: '' },
  { id: 16, time: '16:00pm', monday: '', tuesday: '', wednesday: '', thursday: '', friday: '', saturday: '', sunday: '' },
  { id: 17, time: '17:00pm', monday: '', tuesday: '', wednesday: '', thursday: '', friday: '', saturday: '', sunday: '' },
  { id: 18, time: '18:00pm', monday: '', tuesday: '', wednesday: '', thursday: '', friday: '', saturday: '', sunday: '' },
  { id: 19, time: '19:00pm', monday: '', tuesday: '', wednesday: '', thursday: '', friday: '', saturday: '', sunday: '' },
  { id: 20, time: '20:00pm', monday: '', tuesday: '', wednesday: '', thursday: '', friday: '', saturday: '', sunday: '' },
  { id: 21, time: '21:00pm', monday: '', tuesday: '', wednesday: '', thursday: '', friday: '', saturday: '', sunday: '' },
  { id: 22, time: '22:00pm', monday: '', tuesday: '', wednesday: '', thursday: '', friday: '', saturday: '', sunday: '' },
  { id: 23, time: '23:00pm', monday: '', tuesday: '', wednesday: '', thursday: '', friday: '', saturday: '', sunday: '' },
  { id: 24, time: '00:00am', monday: '', tuesday: '', wednesday: '', thursday: '', friday: '', saturday: '', sunday: '' },
];

const WeekSchedule = () => {

    const [scheduleCompleted, setScheduleCompleted] = React.useState<ScheduleItem[]>([]);

    React.useEffect(() => {
        let newSchedule = schedule;
        chrome.storage.local.get(["cursos"]).then((result) => {
            if (result.cursos){
                let cursos = result.cursos;
                console.log(cursos);
                for (let i = 0; i < cursos.length; i++) {
                    let curso = cursos[i];
                    let frecuencia = curso.frecuencia;
                    for (let j = 0; j < frecuencia; j++) {
                        let dia : keyof ScheduleItem = 'monday';
                        let diaString = 'dia' + j;
                        switch(curso[diaString]){
                            case "Lunes":
                                dia = 'monday';
                                break;
                            case "Martes":
                                dia = 'tuesday';
                                break;
                            case "Miércoles":
                                dia = 'wednesday';
                                break;
                            case "Jueves":
                                dia = 'thursday';
                                break;
                            case "Viernes":
                                dia = 'friday';
                                break;
                            case "Sábado":
                                dia = 'saturday';
                                break;
                            case "Domingo":
                                dia = 'sunday';
                                break;
                        }
                        let horaString = 'hora' + j;
                        let horas = curso[horaString];
                        for (let k = 0; k < horas.length; k++){
                            let horasindex : number = horas[k] - 7;
                            newSchedule[horasindex][dia] = 'True';
                        }
    
                    }
                }
            }
          });
          setScheduleCompleted([...newSchedule]);
        });
    

  return (
    <div style={{ width: "900px", overflowX: "auto" }}>
    <Table highlightOnHover withBorder withColumnBorders  
    style={{ backgroundColor: "#ffffff", margin: "auto"}}
    
    >
    <thead>
    <tr>
    <th style={{ width: '10%' }}>Hora</th>
    <th style={{ width: '15%' }}>Lunes</th>
    <th style={{ width: '15%' }}>Martes</th>
    <th style={{ width: '15%' }}>Miercoles</th>
    <th style={{ width: '15%' }}>Jueves</th>
    <th style={{ width: '15%' }}>Viernes</th>
    <th style={{ width: '15%' }}>Sabado</th>
    <th style={{ width: '15%' }}>Domingo</th>
    </tr>
    </thead>
    <tbody>
    {scheduleCompleted.map((item, index) => (
    <tr key={index}>
    <td>{item.time}</td>
    <td>{item.monday}</td>
    <td>{item.tuesday}</td>
    <td>{item.wednesday}</td>
    <td>{item.thursday}</td>
    <td style={{ backgroundColor: item.friday == 'True' ? 'red' : 'white' }}></td>
    <td>{item.saturday}</td>
    <td>{item.sunday}</td>
    </tr>
    ))}
    </tbody>
    </Table>
    </div>
    );
    };
    
export default WeekSchedule;
