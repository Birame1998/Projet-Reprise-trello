const add_col = document.querySelector('.add-colonne');
const add_note = document.querySelector('.add-note');
const header = document.querySelector('header');
const main = document.querySelector('main');
const modal = document.querySelector('.modal');
const close_modal = document.querySelector('.close-modal');
const containDeletedTasks = document.querySelector('.contain-deleted-tasks');
const deletedTasks = document.querySelector('.deleted-tasks')
const show_header = document.querySelector('.show-header');


let i = 1
add_col.addEventListener('click',()=>{
    if (main.childNodes.length<=5) {
        if (i<=5) {
            main.appendChild(createCol());
            // getColor();
            i++;    
        }else{
            i=main.childNodes.length+1; 
        }
    }
})

add_note.addEventListener('click',()=>{
    if (main.childNodes.length>=1) {    
        modal.classList.add('active-modal');
        close_modal.addEventListener('click',()=>{
            modal.classList.remove('active-modal');
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










containDeletedTasks.addEventListener('click',()=>{
deletedTasks.classList.add('actived-deleted-tasks');
})



function createCol() {
    var col = document.createElement('div');
    i = main.children.length;
    col.className = "col";
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
        if (e.target.parentNode.parentNode!=main.firstChild || main.children.length==1) {
            e.target.parentNode.parentNode.remove();
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
            col_title.firstChild.innerHTML = 'Colonne '+(i+1);
        }); 
    }
    
function getColor() {
    for (let i = 0; i < main.children.length; i++) {
            main.children[i].classList.add('color'+i);        
    }
}

            