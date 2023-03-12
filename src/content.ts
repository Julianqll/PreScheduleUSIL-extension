import { CursoItem, HorarioCurso } from "./views/types/types";
import { cursoDisponible } from "./views/Utils/utils";

function searchBloque (
    nombre : string , 
    setCourse : (course : boolean) => void, 
    setNombreCourse : (course : string) => void,
    setLoading: (loading : boolean) => void
    ) {
    chrome.runtime.sendMessage({method: "clear"}, () => {
      chrome.tabs.query({ active: true, currentWindow: true}, (tabs) => {
          chrome.scripting.executeScript({
              target: {tabId: tabs[0].id as number},
              func: getDocumentInfo,
              args: [nombre]
          }, () => {
              if (chrome.runtime.lastError) {
                setCourse(true);
                setLoading(false);

              }
              else{
                  chrome.runtime.sendMessage({method: "get"}, (response) => {
                    if (response.value === "Mismo curso"){
                        setNombreCourse('El curso ya se encuentra en su horario');
                        setCourse(true);
                    }
                    else if (response.value === "Horario cruzado"){
                        setNombreCourse('El curso presenta cruce con un curso ya registrado');
                        setCourse(true);
                    }
                    else if (response.value === "Curso no encontrado"){
                        setNombreCourse('El bloque-curso no se encontró');
                        setCourse(true);
                    }
                    else{
                        setNombreCourse(response.value);
                        setCourse(false);
                    }
                    setLoading(false);
                  });
              }
          });
      });
  });
  return false;
  }

function goToSchedule(){
    chrome.tabs.create({ url: chrome.runtime.getURL("options.html") });
}
  
const getDocumentInfo = (nombre: string) => {

    const approxTimes = (timeString: string): number[] =>{
        const times = timeString.split('-'); // separar los tiempos
        const start = times[0].split(':').map(Number); // convertir a números
        const end = times[1].split(':').map(Number);
        const startHour = start[1] >= 40 ? start[0] + 1 : start[0]; // aproximar horas de inicio
        const endHour = end[1] >= 40 ? end[0] + 1 : end[0]; // aproximar horas de fin
        const endArr = Array.from({ length: endHour - startHour }, (_, i) => startHour + i); // generar array de horas de fin
        return endArr;
    };
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
    ];
    
    const convertirCursosdeStorage = (cursosLista:any) : CursoItem[] => {
        let cursosList : CursoItem[] = [];
        if (!Array.isArray(cursosLista)){
            cursosLista = [cursosLista];
        }
        let cursosTemp = cursosLista;
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
        return cursosList;
    };

    let n_nombre_bloque = nombre.trim()+'\u00A0';
    let frame : any = document.querySelector('frame[name="ficha Matricula"]');
    let bloque : any = Array.from(frame.contentDocument.getElementsByTagName('font')).filter((el: any)  => el.textContent.trim() === n_nombre_bloque.trim());
    if (bloque.length == 0) {
        chrome.runtime.sendMessage({method: "set", value: "Curso no encontrado" }, () => {});
    }
    let bloquep = bloque[0].parentNode;
    let bloquetd = bloquep.parentNode;
    let rowspan = bloquetd.getAttribute('rowspan');
    let bloquetr = bloquetd.parentNode;
    let bloquetable = bloquetr.parentNode;
    let tabletag = bloquetable.parentNode;
    let centertag = tabletag.parentNode;
    let fonttag = centertag.firstElementChild;
    let btag = fonttag.firstElementChild;
    let nombreCurso = btag.textContent.trim();
    let horarios : any = {
        "nombreCurso" : nombreCurso,
        "frecuencia" : rowspan,
        "bloqueId" : nombre.trim()
    }
    let row = bloquetr;
    for (let i = 0; i < rowspan; i++) {
        if (i >= 1)
        {
            row = bloquetr.nextElementSibling;
            horarios["dia"+i] = row.cells[2].textContent.trim();
            horarios["hora"+i] = approxTimes(row.cells[4].textContent.trim());
        }
        else{

            horarios["dia"+i] = row.cells[5].textContent.trim();
            horarios["hora"+i] = approxTimes(row.cells[7].textContent.trim());
        }
        bloquetr = row;
    }
    let addCursos = [horarios]
    let horarioCruzado : boolean = false;
    let cursoRepetido : boolean = false;
    chrome.storage.local.get(["cursos"]).then((result) => {
        if (result.cursos){
            let cursosGuardados = convertirCursosdeStorage(result.cursos);
            let cursoNuevo = convertirCursosdeStorage(horarios)[0];
            if (cursosGuardados.length > 0){
                cursosGuardados.forEach((cursoGuardado) => {
                    if (cursoGuardado.id === cursoNuevo.id || cursoGuardado.nombre === cursoNuevo.nombre){
                        cursoRepetido = true;
                        chrome.runtime.sendMessage({method: "set", value: "Mismo curso" }, () => {});
                    }
                    else{
                        cursoGuardado.horario?.forEach((horarioGuardado) => {
                            cursoNuevo.horario?.forEach((horarioNuevo) => {
                                if (horarioGuardado.dia === horarioNuevo.dia){
                                    horarioGuardado.horas?.forEach((horaGuardada) => {
                                        horarioNuevo.horas?.forEach((horaNueva) => {
                                            if (horaGuardada === horaNueva){
                                                horarioCruzado = true;
                                                chrome.runtime.sendMessage({method: "set", value: "Horario cruzado" }, () => {});
                                            }
                                        })
                                    })
                                }
                            })
                        })
                    }
                });
                
            }
            if (!horarioCruzado && !cursoRepetido){
                addCursos = result.cursos;
                addCursos.push(horarios);
                chrome.storage.local.set({ cursos: addCursos }).then(() => {
                });
                chrome.runtime.sendMessage({method: "set", value: nombreCurso }, () => {});
            }
        }
        else{
            chrome.storage.local.set({ cursos: addCursos }).then(() => {
            });
            chrome.runtime.sendMessage({method: "set", value: nombreCurso }, () => {});
        }
      });
  }

export  {
    searchBloque, 
    goToSchedule};