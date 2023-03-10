import { CursoItem, HorarioCurso, ScheduleItem } from "../types/types";

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


type getCoursesProps = {
    setCursos : (cursos: CursoItem[]) => void;
}

export function getCourses({setCursos} : getCoursesProps) {
    chrome.storage.local.get(["cursos"]).then((result) => {
        if (result.cursos){
            let cursosList : CursoItem[] = [];
            let cursosTemp = result.cursos;
            console.log(cursosTemp);
            cursosTemp.map((item : any, index : number) => {
                let nuevoCurso : CursoItem = {};
                nuevoCurso.id = item.bloqueId;
                nuevoCurso.nombre = item.nombreCurso;
                nuevoCurso.color = colors[index];
                let listaHorarios : HorarioCurso[] = [];
                for (let j = 0; j < item.frecuencia; j++) {
                    let horario: HorarioCurso = {};
                    let diaString = 'dia' + j;
                    let horaString = 'hora' + j;
                    horario.dia = item[diaString];
                    horario.horas = item[horaString];
                    listaHorarios.push(horario);
                }
                nuevoCurso.horario = listaHorarios;
                cursosList.push(nuevoCurso);
            });
            setCursos([...cursosList]);
        }
    });
}

type getScheduleDataProps = {
    setSchedule : (schedule: ScheduleItem[]) => void;
    cursos: CursoItem[];
}

export function getScheduleData({setSchedule, cursos} : getScheduleDataProps) {
    let newSchedule: ScheduleItem[] = [
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
    cursos.map((curso) => {
        for (let j = 0; j < curso.horario!.length; j++) {
            let cursoHora = curso.horario![j];
            let dia : keyof ScheduleItem = 'monday';
            let diaData: keyof ScheduleItem = 'mondayData';
            switch(cursoHora.dia){
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
            let horas = cursoHora.horas;
            for (let k = 0; k < horas!.length; k++){
                let horasindex : number = horas![k] - 7;
                newSchedule[horasindex][dia] = 'True';
                newSchedule[horasindex][diaData] = curso.id;
                newSchedule[horasindex]["color"] = curso.color;
            }
        }
    });
    setSchedule(newSchedule);
}

export function getColorById(id : string, cursos: CursoItem[]){
    let cursoEncontrado = cursos.filter((curso) => curso.id === id);
    if (cursoEncontrado.length > 0)
    {
        return cursoEncontrado[0].color;
    }
    return 'white';
}

export function eliminarCurso(id : string){
    chrome.storage.local.get(["cursos"]).then((result) => {
        if (result.cursos){
            let cursosTemp = result.cursos;
            cursosTemp = cursosTemp.filter((item : any) => item.bloqueId !== id);
            chrome.storage.local.set({ cursos: cursosTemp }).then(() => {
                
            });
        }
    });
}