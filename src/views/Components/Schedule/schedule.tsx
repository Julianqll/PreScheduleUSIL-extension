import React from 'react';
import { Button, ColorSwatch, Flex, Group, Table, Text} from '@mantine/core';
import { ScheduleItem, HorarioCurso, CursoItem } from '../../types/types';
import { eliminarCurso, getColorById, getCourses, getScheduleData } from '../../Utils/utils';



const WeekSchedule = () => {

    const [cursos, setCursos] = React.useState<CursoItem[]>([]);

    const [schedule, setSchedule] = React.useState<ScheduleItem[]>([]);

    React.useEffect(() => {
        getCourses({setCursos});
        getScheduleData({setSchedule, cursos});
    },[cursos]);
    
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
                {schedule.map((item, index) => (
                <tr key={index}>
                <td>{item.time}</td>
                <td style={{ backgroundColor: item.monday == 'True' ? getColorById(item.mondayData as string, cursos) : 'white' }}>{item.mondayData}</td>
                <td style={{ backgroundColor: item.tuesday == 'True' ? getColorById(item.tuesdayData as string, cursos) : 'white' }}>{item.tuesdayData}</td>
                <td style={{ backgroundColor: item.wednesday == 'True' ? getColorById(item.wednesdayData as string, cursos) : 'white' }}>{item.wednesdayData}</td>
                <td style={{ backgroundColor: item.thursday == 'True' ? getColorById(item.thursdayData as string, cursos) : 'white' }}>{item.thursdayData}</td>
                <td style={{ backgroundColor: item.friday == 'True' ? getColorById(item.fridayData as string, cursos) : 'white' }}>{item.fridayData}</td>
                <td style={{ backgroundColor: item.saturday == 'True' ? getColorById(item.saturdayData as string, cursos) : 'white' }}>{item.saturdayData}</td>
                <td style={{ backgroundColor: item.sunday == 'True' ? getColorById(item.sundayData as string, cursos) : 'white' }}>{item.sundayData}</td>
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
            {cursos.map((item, index) => (
                <Group>
                    <Text fz="md">{item.nombre}</Text>
                    <Text fz="md">({item.id})</Text>
                    <ColorSwatch key={index} color={item.color ?? 'white'} />
                    <Button 
                        style={ {backgroundColor: 'red'}}
                        radius="xl"
                        onClick={() => eliminarCurso(item.id as string)}
                    >
                        Eliminar
                    </Button>
                </Group>
            ))}
        </Flex>
    </Flex>
    );
};
    
export default WeekSchedule;
