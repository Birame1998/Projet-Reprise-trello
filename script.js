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
const deletedTask = document.querySelector('.deleted-task')
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
        var nowTime = now.getHours()*3600000+now.getMinutes()*60000+now.getSeconds()*1000+now.getMilliseconds(); 
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
        modal.classList.remove('active-modal');
        clean();
}
})




// function createTask() {
//     divTask = document.createElement('div');
//     divTask.className='div-task';
//     containDivTask = document.createElement('div');
//     containDivTask.className = 'contain-div-task';
    
//     spanTaskContent = document.createElement('span');
//     spanTaskContent.innerHTML = task_content.value;
//     spanTaskContent.className = "task-content";
    
//     spanTaskDate = document.createElement('span');
//     spanTaskDate.innerHTML='Date : '+task_date.value;
//     spanTaskDate.className = 'span-task-date';

//     spanTaskStart = document.createElement('span');
//     spanTaskStart.innerHTML = 'Heure de début : '+task_start.value;
//     spanTaskStart.className = 'span-task-start';
    
//     spanTaskEnd = document.createElement('span');
//     spanTaskEnd.innerHTML = 'Heure de fin : '+task_end.value;
//     spanTaskEnd.className = 'span-task-end';
    
//     iconTrash = document.createElement('i');
//     iconTrash.className ='fa-solid fa-trash-can';
    
//     iconEdit = document.createElement('i');
//     iconEdit.className = 'fa-solid fa-pen';
    
//     arrowLeft = document.createElement('i');
//     arrowLeft.className='fa-solid fa-circle-arrow-left';
//     arrowLeft.classList.add('arrow-left');
    
//     arrowRight = document.createElement('i');
//     arrowRight.className='fa-solid fa-circle-arrow-right';
//     arrowRight.classList.add('arrow-right');    
    
//     visibleDivTask = document.createElement('div');
//     visibleDivTask.appendChild(spanTaskContent);
//     visibleDivTask.appendChild(iconEdit);
//     visibleDivTask.appendChild(iconTrash);
//     visibleDivTask.className = 'visible-div-task';
    
//     hiddenDivTask = document.createElement('div');
//     hiddenDivTask.className = 'hidden-div-task';                  
//     hiddenDivTask.appendChild(spanTaskDate);
//     hiddenDivTask.appendChild(spanTaskStart);
//     hiddenDivTask.appendChild(spanTaskEnd);
    
//     containDivTask.appendChild(visibleDivTask);
//     containDivTask.appendChild(hiddenDivTask);       
        
//     divTask.appendChild(arrowLeft);
//     divTask.appendChild(containDivTask);
//     divTask.appendChild(arrowRight);
    
//     })
//     containDivTask.addEventListener('dblclick',(e)=>{
//         var column = e.target.parentElement.parentElement.parentElement;
//         var n = parseInt(column.id);
//         var deletedTasks = document.getElementById(8);
//         deletedTasks.lastChild.appendChild(e.target.parentElement);
//     })
//     return divTask;
// }

function createTask() {
    var divIcons  = document.createElement('div');
    divIcons.className='div-icons'; 
    
    iconTrash = document.createElement('i');
    iconTrash.className ='fa-solid fa-trash-can';
    iconEdit = document.createElement('i');
    iconEdit.className = 'fa-solid fa-pen';
    
    divIcons.appendChild(iconEdit);
    divIcons.appendChild(iconTrash);

    var taskArea = document.createElement('textarea');
    taskArea.className='task-area';
    var taskDesc = task_content.value
    taskArea.value = taskDesc;


    var divTask = document.createElement('div');
    divTask.className='div-task';

    arrowLeft = document.createElement('i');
    arrowLeft.className='fa-solid fa-circle-arrow-left';
    arrowLeft.classList.add('arrow-left');
    
    arrowRight = document.createElement('i');
    arrowRight.className='fa-solid fa-circle-arrow-right';
    arrowRight.classList.add('arrow-right');    
    
    
    hideTask = document.createElement('div');
    hideTask.className = 'hide-task';

    span_date = document.createElement('span');
    var taskDate = task_date.value;
    span_date.innerHTML = 'Date : '+ taskDate;
    span_date.className = 'span-date'; 
    
    span_start = document.createElement('span');
    var taskStart = task_start.value;
    span_start.innerHTML = 'Start : '+ taskStart;
    span_start.className = 'span-start'; 

    
    span_end = document.createElement('span');
    var taskEnd = task_end.value;
    span_end.innerHTML = 'End : '+ taskEnd;
    span_end.className = 'span-end'; 

    hideTask.appendChild(span_date)
    hideTask.appendChild(span_start)
    hideTask.appendChild(span_end);
     
    divTask.appendChild(taskArea);
    divTask.appendChild(divIcons);
    divTask.appendChild(arrowLeft);
    divTask.appendChild(arrowRight);
    divTask.appendChild(hideTask);

    arrowRight.addEventListener('click',(e)=>{
            var column = e.target.parentElement.parentElement.parentElement;
            var n = parseInt(column.id);
            var next_column = document.getElementById(n+1);
            next_column.lastChild.appendChild(e.target.parentElement);
            
    });
    arrowLeft.addEventListener('click',(e)=>{
        
            var column = e.target.parentElement.parentElement.parentElement;
            var n = parseInt(column.id);
            var next_column = document.getElementById(n-1);
            next_column.lastChild.appendChild(e.target.parentElement);
        });
        iconTrash.addEventListener('click',(e)=>{
            var column = e.target.parentElement.parentElement.parentElement.parentElement;
            if (confirm('Voulez-vous supprimer cette tache ?')) {   
                deletedTask.appendChild(e.target.parentElement.parentElement);
            }
            if (deletedTask.contains(e.target.parentElement.parentElement)) {
                e.target.parentElement.parentElement.addEventListener('dblclick',()=>{
                    if (confirm('Voulez-vous restaurer cette tache ?')) {
                    if (document.body.contains(column)) {
                                column.lastChild.appendChild(e.target.parentElement.parentElement)    
                            }
                        }else{
                            main.firstChild.lastChild.appendChild(e.target.parentElement.parentElement);
                    }
                    
                })
            }
        })
        iconEdit.addEventListener('click',()=>{
            modal.classList.add('active-modal');
            task_content.value = taskDesc;
            task_date.value = taskDate;
            task_start.value = taskStart;
            task_end.value = taskEnd;
            add_tasks.addEventListener('click',(e)=>{
                if (!hasError()) {
                    divTask.remove();
                }
            });
        });







    
    showTask(divTask,hideTask);    


    return divTask;
}











function showTask(divTask,hideTask) {
  divTask.addEventListener('mouseover',()=>{
      hideTask.classList.toggle('complete-task');
  })
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


