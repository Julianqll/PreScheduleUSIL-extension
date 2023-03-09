import React from 'react';
import { ColorSwatch, Flex, Group, Table, Text} from '@mantine/core';

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
  color?: string;
  mondayData?: string;
  tuesdayData?: string;
  wednesdayData?: string;
  thursdayData?: string;
  fridayData?: string;
  saturdayData?: string;
  sundayData?: string;
}

let colors = [
    '#A7E97E',
    '#9A7EE9',
    '#5AA6EC',
    '#EB6F54',
    '#3BCBA8',
    '#1C59B6',
    '#DE649F',
    '#4AA413',
    '#D2A01F',
    '#B4493A',
    '#526075',
    '#848544'
]

let schedule: ScheduleItem[] = [
  { id: 7, time: '7:00am', monday: '', tuesday: '', wednesday: '', thursday: '', friday: '', saturday: '', sunday: ''},
  { id: 8, time: '8:00am', monday: '', tuesday: '', wednesday: '', thursday: '', friday: '', saturday: '', sunday: ''},
  { id: 9, time: '9:00am', monday: '', tuesday: '', wednesday: '', thursday: '', friday: '', saturday: '', sunday: ''},
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

type CursoItem ={
    id: string;
    nombre: string;
    color: string;
}

const WeekSchedule = () => {

    const [cursosL, setCursosL] = React.useState<CursoItem[]>([]);

    const [scheduleCompleted, setScheduleCompleted] = React.useState<ScheduleItem[]>([]);

    React.useEffect(() => {

        let newSchedule = [...schedule];
        chrome.storage.local.get(["cursos"]).then((result) => {
            if (result.cursos){
                let cursos = result.cursos;
                console.log(cursos);
                for (let i = 0; i < cursos.length; i++) {
                    let nuevoCurso : CursoItem = {
                        id: '',
                        nombre: '',
                        color: '',
                    };
                    nuevoCurso.id = cursos[i].bloqueId;
                    nuevoCurso.nombre = cursos[i].nombreCurso;
                    nuevoCurso.color = colors[i];
                    setCursosL([...cursosL, nuevoCurso]);
                    let curso = cursos[i];
                    let color = colors[i];
                    let frecuencia = curso.frecuencia;
                    let bloqueId = curso.bloqueId;
                    for (let j = 0; j < frecuencia; j++) {
                        let dia : keyof ScheduleItem = 'monday';
                        let diaData: keyof ScheduleItem = 'mondayData';
                        let diaString = 'dia' + j;
                        switch(curso[diaString]){
                            case "Lunes":
                                dia = 'monday';
                                diaData = 'mondayData';
                                break;
                            case "Martes":
                                dia = 'tuesday';
                                diaData = 'tuesdayData';
                                break;
                            case "Miércoles":
                                dia = 'wednesday';
                                diaData = 'wednesdayData';
                                break;
                            case "Jueves":
                                dia = 'thursday';
                                diaData = 'thursdayData';
                                break;
                            case "Viernes":
                                dia = 'friday';
                                diaData = 'fridayData';
                                break;
                            case "Sábado":
                                dia = 'saturday';
                                diaData = 'saturdayData';
                                break;
                            case "Domingo":
                                dia = 'sunday';
                                diaData = 'sundayData';
                                break;
                        }
                        let horaString = 'hora' + j;
                        let horas = curso[horaString];
                        for (let k = 0; k < horas.length; k++){
                            let horasindex : number = horas[k] - 7;
                            newSchedule[horasindex][dia] = 'True';
                            newSchedule[horasindex][diaData] = bloqueId;
                            newSchedule[horasindex]["color"] = color;
                        }
    
                    }
                }
                setScheduleCompleted(newSchedule);
            }
          });
          
        },[]);
    
  return (
    <Flex
    mih={50}
    gap="md"
    justify="center"
    align="center"
    direction="row"
    wrap="wrap"
    >
        <div
        style={{
            maxWidth: '90vw',
            maxHeight: '100vh',
            overflowX: 'auto',
            margin: '0 auto',
        }}
        >
            <Table highlightOnHover withBorder withColumnBorders  
            style={{ backgroundColor: "#ffffff",  width: '100%'}}
            >
                <thead>
                <tr>
                <th style={{ width: '10%', textAlign: 'center' }}>Hora</th>
                <th style={{ width: '15%', textAlign: 'center' }}>Lunes</th>
                <th style={{ width: '15%', textAlign: 'center' }}>Martes</th>
                <th style={{ width: '15%', textAlign: 'center' }}>Miercoles</th>
                <th style={{ width: '15%', textAlign: 'center' }}>Jueves</th>
                <th style={{ width: '15%', textAlign: 'center' }}>Viernes</th>
                <th style={{ width: '15%', textAlign: 'center' }}>Sabado</th>
                <th style={{ width: '15%', textAlign: 'center' }}>Domingo</th>
                </tr>
                </thead>
                <tbody>
                {scheduleCompleted.map((item, index) => (
                <tr key={index}>
                <td>{item.time}</td>
                <td style={{ backgroundColor: item.monday == 'True' ? item.color : 'white' }}>{item.mondayData}</td>
                <td style={{ backgroundColor: item.tuesday == 'True' ? item.color : 'white' }}>{item.tuesdayData}</td>
                <td style={{ backgroundColor: item.wednesday == 'True' ? item.color : 'white' }}>{item.wednesdayData}</td>
                <td style={{ backgroundColor: item.thursday == 'True' ? item.color : 'white' }}>{item.thursdayData}</td>
                <td style={{ backgroundColor: item.friday == 'True' ? item.color : 'white' }}>{item.fridayData}</td>
                <td style={{ backgroundColor: item.saturday == 'True' ? item.color : 'white' }}>{item.saturdayData}</td>
                <td style={{ backgroundColor: item.sunday == 'True' ? item.color : 'white' }}>{item.sundayData}</td>
                </tr>
                ))}
                </tbody>
            </Table>
        </div>
        <Flex
        mih={50}
        gap="md"
        justify="center"
        align="center"
        direction="column"
        wrap="wrap"
        >          
            <Text
                c="blue"
                sx={{ fontFamily: 'Greycliff CF, sans-serif' }}
                ta="center"
                fz={30}
                fw={700}
            >
                USIL Pre-horario
            </Text>
            {cursosL.map((item, index) => (
                <Group>
                    <Text fz="md">{item.nombre}</Text>
                    <Text fz="md">({item.id})</Text>
                    <ColorSwatch key={index} color={item.color} />
                </Group>
            ))}
        </Flex>
    </Flex>
    );
};
    
export default WeekSchedule;
