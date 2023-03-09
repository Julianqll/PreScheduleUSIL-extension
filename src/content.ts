function searchBloque (
    nombre : string , 
    setCourse : (course : boolean) => void, 
    setNombreCourse : (course : string) => void) {
    chrome.runtime.sendMessage({method: "clear"}, () => {
      chrome.tabs.query({ active: true, currentWindow: true}, (tabs) => {
          chrome.scripting.executeScript({
              target: {tabId: tabs[0].id as number},
              func: getDocumentInfo,
              args: [nombre]
          }, () => {
              if (chrome.runtime.lastError) {
                setCourse(true);
              }
              else{
                  chrome.runtime.sendMessage({method: "get"}, (response) => {
                        setNombreCourse(response.value);
                        setCourse(false);
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
    }

    let n_nombre_bloque = nombre.trim()+'\u00A0';
    let frame : any = document.querySelector('frame[name="ficha Matricula"]');
    let bloque : any = Array.from(frame.contentDocument.getElementsByTagName('font')).filter((el: any)  => el.textContent.trim() === n_nombre_bloque.trim());
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
    chrome.storage.local.get(["cursos"]).then((result) => {
        if (result.cursos){
            addCursos = result.cursos;
            addCursos.push(horarios);
            chrome.storage.local.set({ cursos: addCursos }).then(() => {
            });
        }
        else{
            chrome.storage.local.set({ cursos: addCursos }).then(() => {
              });
        }
      });
    chrome.runtime.sendMessage({method: "set", value: nombreCurso }, () => {});
  }

export  {
    searchBloque, 
    goToSchedule};