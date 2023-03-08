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
        "nombreCurso" : nombreCurso
    }
    let row = bloquetr;
    for (let i = 0; i < rowspan; i++) {
        if (i >= 1)
        {
            row = bloquetr.nextElementSibling;
            horarios["dia"+i] = row.cells[2].textContent.trim();
            horarios["hora"+i] = row.cells[4].textContent.trim();
        }
        else{
            horarios["dia"+i] = row.cells[5].textContent.trim();
            horarios["hora"+i] = row.cells[7].textContent.trim();
        }
        bloquetr = row;
    }
    chrome.storage.local.set({ nombreCurso : horarios }, function(){
    });
    chrome.runtime.sendMessage({method: "set", value: nombreCurso }, () => {});
  }

export  {
    searchBloque, 
    goToSchedule};