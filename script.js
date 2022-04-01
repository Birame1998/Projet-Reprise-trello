const add_col = document.querySelector('.add-colonne');
const add_note = document.querySelector('.add-note');
const header = document.querySelector('header');
const main = document.querySelector('main');
const modal = document.querySelector('.modal');
const form_modal = document.querySelector('form');
const add_tasks = document.querySelector('.add-tasks');
const close_modal = document.querySelector('.close-modal');
const containDeletedTasks = document.querySelector('.contain-deleted-tasks');
const deletedTasks = document.querySelector('.deleted-tasks')
const show_header = document.querySelector('.show-header');
const content = document.querySelector('.content');
const date = document.querySelector('.date');
const start= document.querySelector('.start');
const end = document.querySelector('.end');
const task_content = document.querySelector('#content');
const task_date = document.querySelector('#date');
const task_start= document.querySelector('#start-time');
const task_end = document.querySelector('#end-time');




add_col.addEventListener('click',()=>{
    if (main.childElementCount<5) {
            main.appendChild(createCol());
            console.log(main.childElementCount);
        }
    })
    
    add_note.addEventListener('click',()=>{
        if (main.childNodes.length>=1) {    
            modal.classList.add('active-modal');
            close_modal.addEventListener('click',()=>{
                modal.classList.remove('active-modal');
                clean();
        })
    }
})


show_header.addEventListener('click',()=>{
    header.classList.toggle('visible-header');
    if (header.classList.contains('visible-header')) {
    show_header.innerHTML='Cacher menu';
}else{
    show_header.innerHTML='Afficher menu';
}
})




add_tasks.addEventListener('click',(e)=>{
    var now = new Date();
    if (task_content.value=="") {
        e.preventDefault()
        showError(content,task_content,"Veuillez remplir le champ");
    }
    if (task_date.value=="") {
        e.preventDefault()
        showError(date,task_date,"Veuillez remplir le champ");
    }else{
        var new_date = task_date.valueAsNumber+now.getHours()*3600000+now.getMinutes()*60000+now.getSeconds()*1000+now.getMilliseconds(); 
        var new_task_date = (task_start.valueAsNumber)+now.getSeconds()*1000+now.getMilliseconds();
        var nowTime = now.getHours()*3600000+now.getMinutes()*60000+now.getSeconds()*1000+now.getMilliseconds() 
        console.log((task_start.valueAsNumber)+now.getSeconds()*1000+now.getMilliseconds());
        console.log(now.getHours()*3600000+now.getMinutes()*60000+now.getSeconds()*1000+now.getMilliseconds());
        console.log(now.getTime());
        console.log(new_date==now)
        if (new_date<now) {
            e.preventDefault();
            showError(date,task_date,"Veuilez saisir une date ultérieure ou égale à celle actuelle");
        }
    } 
    if (task_start.value=="") {
        e.preventDefault()
        showError(start,task_start,"Veuillez remplir le champ");
    }else{
        if (new_task_date<nowTime && new_date==now.getTime()) {
            e.preventDefault();
            showError(start,task_start,"Veuilez saisir une heure de début ultérieure ou égale à celle actuelle");
        }
        if (task_end.value!="" && task_start.value!="") {
            if (task_start.value>task_end.value) {
                e.preventDefault();
            showError(start,task_start,"Veuillez prendre une heure de début antérieure à celle de fin");
            showError(end,task_end,"Veuillez prendre une heure de fin ultérieure à celle de début");
        }
        
    }
}
if (task_end.value=="") {
    e.preventDefault()
    showError(end,task_end,"Veuillez remplir le champ");
}
if (!hasError()) {   
    main.firstChild.childNodes[1].appendChild(createTask());
    showTask();
    modal.classList.remove('active-modal');
    clean();
}
})




function createTask() {
    let k = main.childNodes[i].childElementCount
    divTask = document.createElement('div');
    divTask.className='div-task';
    containDivTask = document.createElement('div');
    containDivTask.className = 'contain-div-task';
    spanTaskContent = document.createElement('span');
    spanTaskContent.className = "task-content";
    spanTaskContent.innerHTML = task_content.value;
    spanTaskDate = document.createElement('span');
    spanTaskDate.innerHTML='Date : '+task_date.value;
    spanTaskStart = document.createElement('span');
    spanTaskStart.innerHTML = 'Heure de début : '+task_start.value;
    spanTaskEnd = document.createElement('span');
    spanTaskEnd.innerHTML = 'Heure de fin : '+task_end.value;
    
    arrowLeft = document.createElement('i');
    arrowLeft.className='fa-solid fa-circle-arrow-left';
    arrowLeft.classList.add('arrow-left');
    arrowRight = document.createElement('i');
    arrowRight.className='fa-solid fa-circle-arrow-right';
    arrowRight.classList.add('arrow-right');
    
    visibleDivTask = document.createElement('div');
    visibleDivTask.className = 'visible-div-task';
    visibleDivTask.appendChild(spanTaskContent);
    containDivTask.appendChild(visibleDivTask);       
    
        
    
    divTask.appendChild(arrowLeft);
    divTask.appendChild(containDivTask);
    divTask.appendChild(arrowRight);
    
    arrowRight.addEventListener('click',(e)=>{
            var column = e.target.parentElement.parentElement.parentElement;
            var n = parseInt(column.id);
            var next_column = document.getElementById(n+1);
            next_column.lastChild.appendChild(e.target.parentElement);
            
    })
    arrowLeft.addEventListener('click',(e)=>{
        
            var column = e.target.parentElement.parentElement.parentElement;
            var n = parseInt(column.id);
            var next_column = document.getElementById(n-1);
            next_column.lastChild.appendChild(e.target.parentElement);
    })
    return divTask;
}












function showTask() {
    var containDivTasks = document.querySelectorAll('.contain-div-task');
    containDivTasks.forEach(containDivTask => {
        containDivTask.addEventListener('mouseover',()=>{
            divTask = containDivTask.parentNode;
            let k = divTask.parentNode.childElementCount; 
            divTask.classList.toggle('complete-task');
            var hiddenDivTask = document.createElement('div');
            hiddenDivTask.className='hidden-div-task';
            hiddenDivTask.appendChild(spanTaskDate);
            hiddenDivTask.appendChild(spanTaskStart);
            hiddenDivTask.appendChild(spanTaskEnd);
            if (divTask.classList.contains('complete-task')) {
                containDivTask.appendChild(hiddenDivTask);
            }
        })
    });
}









function hasError() {
    let result=false;
    var spanErrors = document.querySelectorAll('.span-error');
    spanErrors.forEach(element => {
        if (modal.contains(element)) {
           result=true;
        }
    });
    return result;
}










containDeletedTasks.addEventListener('click',()=>{
    deletedTasks.classList.add('actived-deleted-tasks');
    const span = document.querySelector('.close-deleted-tasks');
    span.addEventListener('click',()=>{
        deletedTasks.classList.remove('actived-deleted-tasks');
})
})



function createCol() {
    var col = document.createElement('div');
    i = main.childElementCount;
    col.className = "col";
    col.id = i;
    col.classList.add('color'+(i+1));
    var col_title = document.createElement('div');
    col_title.className="col-title";
    var h2_title = document.createElement('h2');
    h2_title.innerText = 'Colonne '+(i+1);

    h2_title.addEventListener('dblclick',()=>{
        h2_title.innerHTML='';
        var input = document.createElement('input');
        input.type = 'text';
        var button = document.createElement('button');
        button.innerText='OK';
        col_title.appendChild(input);
        col_title.appendChild(button);
        button.addEventListener('click',()=>{
            if (input.value!="") {
                h2_title.innerHTML=input.value;
                col_title.classList.add('has-new-title');
                col_title.removeChild(input);
                col_title.removeChild(button);
            }
        })
        span_title.addEventListener('click',()=>{
            col_title.removeChild(input);
            col_title.removeChild(button);
        })
    })
    var span_title = document.createElement('span');
    span_title.innerText='X'
    span_title.addEventListener('click',e=> {
        if (e.target.parentNode.parentNode!=main.firstChild || main.childElementCount==1) {
            if (confirm('Voulez-vous supprimer la colonne')) {
                e.target.parentNode.parentNode.remove();
            }
        }
        refresh();
    });
    col_title.appendChild(h2_title);
    col_title.appendChild(span_title);
    
    var task_contain = document.createElement('div');
    task_contain.className = 'task-contain';
    var logo = document.createElement('img');
    logo.src = 'img/bmd.png';
    task_contain.appendChild(logo);
    col.appendChild(col_title);
    col.appendChild(task_contain);
    return col;
}



function refresh() {
    const listTitles = document.querySelectorAll('.col-title');
    listTitles.forEach((col_title,i) => {
        if (!col_title.classList.contains('has-new-title')) {
            col_title.firstChild.innerHTML = 'Colonne '+(i+1);
            col_title.parentElement.id = i+1;
        }
    }); 
}
    


function clean() {
    var task_settings = document.querySelectorAll('.task-setting');
    task_settings.forEach(element => {
        element.value="";
    });
   
}
function showError(div,field,message) {
    spanError = document.createElement('span');
    spanError.innerHTML=message;
    spanError.className="span-error";
    div.appendChild(spanError);
    removeError();
    }
    function removeError() {
        spanErrors = document.querySelectorAll('.span-error');
        spanErrors.forEach(element => {
            setTimeout(() => {
                element.remove()
            }, 1000);
        });
    }


