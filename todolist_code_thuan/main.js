var list = [
    {
        'id'    :1,
        'name'  :'Đào',
    },
    {
        'id'    :2,
        'name'  :'Nguyệt',
    }
];
let inputElement = document.getElementById('myInput');
var listElement = document.getElementById('myUl');
var idEditing = null;

renderContent();

function listComponent(item){

    let li = document.createElement('li');
    li.innerText = item.name;
    li.setAttribute("id", item.id);

    let spandelete = document.createElement('span');
    spandelete.innerText = "delete";
    spandelete.className = "delete";
    spandelete.addEventListener('click' , () => deleteComponent(item.id));
    li.appendChild(spandelete);

    let spanedit = document.createElement('span');
    spanedit.className = "edit";
    spanedit.innerText = "edit";
    spanedit.addEventListener('click' ,  () => {
        editComponent(item)
    });
    li.appendChild(spanedit);

    return li;
}

function renderContent() {
    let i;
    listElement.innerHTML = "";
    for (i = 0; i < list.length; i++){
        listElement.appendChild(listComponent(list[i]));
    }
}

function editComponent(item) {
    idEditing = item.id;
    inputElement.value = item.name;

}

function addComponent () { 
    if (inputElement.value === ''){
        alert('Oh no!You forgot your girlfriend\'s name???')
    } else {
        var newItem = {
            'id':   (list.length+1),
            'name': inputElement.value
        }
        list.push(newItem);
        listElement.appendChild(listComponent(newItem));
    }
    document.getElementById('myInput').value = '';
}

function handleUpdate() {
    if(!idEditing || !inputElement.value) {
        alert(' Input is empty or is current not editing! ');
        return;
    }

    const newArray = list.map(function(i) {
        if(i.id === idEditing) {
            return {
                id: i.id,
                name: inputElement.value
            }
        }
         return i;
     });
    list = newArray;
    inputElement.value = '';
    idEditing = null;
    renderContent();
}

function deleteComponent(idItem){
    let i;
    for (i = 0; i < list.length; i++){
        if (list[i].id == idItem){
            list.splice(i, 1);
        }
    }

    renderContent();
}