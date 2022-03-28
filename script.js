const add_col = document.querySelector('.add-colonne');
const add_note = document.querySelector('.add-note');
const main = document.querySelector('main');



console.log(main.childNodes.length)

let i = 1
add_col.addEventListener('click',()=>{
    if (main.childNodes.length<=5) {
        if (i<=5) {
            main.appendChild(createCol());
            i++;    
        }else{
            i=main.childNodes.length+1; 
        }
    }
    console.log(getColor());
})






function createCol() {
    var col = document.createElement('div');
    col.className = "col";
    // col.classList.add(getColor());
    var col_title = document.createElement('div');
    col_title.className="col-title";
    var h2_title = document.createElement('h2');
    h2_title.innerText = 'Colonne '+i;
    h2_title.addEventListener('dblclick',()=>{
        input_title = document.createElement('input');
        input_title.type = 'text';
    })
    var span_title = document.createElement('span');
    span_title.innerText = 'X';
    span_title.addEventListener('click',e=> {
        if (e.target.parentNode.parentNode!=main.firstChild) {
            e.target.parentNode.parentNode.remove();
        }
        refresh();
    });
    col_title.appendChild(h2_title);
    col_title.appendChild(span_title);
    
    var task_contain = document.createElement('div');
    task_contain.className = 'task-contain';
    var logo = document.createElement('img');
    logo.src = 'img/Logobmd.png';
    task_contain.appendChild(logo);
    col.appendChild(col_title);
    col.appendChild(task_contain);
    getColor();
    return col;
}



function refresh() {
    const listTitles = document.querySelectorAll('.col-title');
    listTitles.forEach((col_title,i) => {
            col_title.firstChild.innerText = 'Colonne '+(i+1);        
        }); 
    }
    



    function getColor() {
        var array = ['color1','color2','color3','color4','color5'];
        const listCol = document.querySelectorAll('.col');
        for (let i = 0; i < array.length; i++) {
        listCol.forEach(col =>{
                col.classList.add(array[i]);
            })
        }
        }
            