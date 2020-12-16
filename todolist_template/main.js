// button
function buttonComponent(options) {
    const defaultOptions = {
        className: "wil-btn",
        onClick: function () {
        },
        text: "Submit"
    };
    const {className, text, onClick} = {...defaultOptions, ...options};
    const buttonElement = document.createElement("button");

    buttonElement.classList.add(className);
    buttonElement.innerText = text;
    buttonElement.addEventListener("click", () => {
        onClick();
    });

    return buttonElement;
}

// tao task voi 3 thanh phan la text, nut delete va edit
function taskComponent({text, onDelete, onEdit}) {
    const listElement = document.createElement("li")
    const buttonDelete = buttonComponent({
        className: "delete",
        text: "Delete",
        onClick: () => {
            onDelete();
        }
    });
    const buttonEdit = buttonComponent({
        className: "edit",
        text: "Edit",
        onClick: () => {
            onEdit();
        }
    });

    listElement.innerText = text;
    listElement.appendChild(buttonEdit);
    listElement.appendChild(buttonDelete);

    return listElement;
}

// tao input voi 2 thanh phan gom 1 input va 1 btn add task
function inputComponent({options, onAdd, onHandleEdit}) {
    const btnAdd = buttonComponent({
        className: "addBtn",
        text: "Add",
        onClick: () => onAdd()
    });
    const btnEdit = buttonComponent({
        className: "editBtn",
        text: "Edit",
        onClick: () => onHandleEdit()
    });

    const defaultOptions = {
        typeInput: "text",
        idInput: "myInput",
        placeholder: "Title..."
    };
    const {typeInput, idInput, placeholder} = {...defaultOptions, ...options};
    const inputElement = document.createElement("input");
    inputElement.type = typeInput;
    inputElement.id = idInput;
    inputElement.placeholder = placeholder;

    const divElement = document.createElement("div");
    divElement.appendChild(inputElement);
    divElement.appendChild(btnAdd);
    divElement.appendChild(btnEdit);

    return divElement;
}

// header
function headerComponent() {
    const divElement = document.createElement("div");
    divElement.className = "header";
    const h2Element = document.createElement("h2");
    h2Element.innerText = "Bubble tea menu";

    const tdlInputComponent = inputComponent({
        options: {},
        onAdd: () => {
            addComponent();
        },
        onHandleEdit: () => {
            handleEditComponent();
        }
    });

    divElement.appendChild(h2Element);
    divElement.appendChild(tdlInputComponent)

    return divElement;
}

// body
function bodyComponent() {
    const ulElement = document.createElement("ul");
    ulElement.id = "myUl";

    return ulElement;
}

const __ab = headerComponent();
const __ba = bodyComponent();
const containerElement = document.getElementById("container");

containerElement.appendChild(__ab);
containerElement.appendChild(__ba);

//====......====//
let list = [
    {
        id: 1,
        name: 'Trà đào cam xả'
    },
    {
        id: 2,
        name: 'Trà xanh kem chee'
    },
    {
        id: 3,
        name: 'Sữa chua chân trâu đường đen'
    }
];

let inputElement = document.getElementById('myInput');
let listElement = document.getElementById('myUl');
let idEditing = null;

renderContent();

function listComponent(item) {
    return taskComponent({
        text: item.name,
        onDelete: () => {
            deleteComponent(item.id);
        },
        onEdit: () => {
            editComponent(item);
        }
    });
}

function renderContent() {
    let i;
    listElement.innerHTML = "";
    for (i = 0; i < list.length; i++) {
        listElement.appendChild(listComponent(list[i]));
    }
}

function editComponent(item) {
    idEditing = item.id;
    inputElement.value = item.name;
}

function addComponent() {
    if (inputElement.value === '') {
        alert('You haven\'t entered the tea name!')
    } else {
        var newItem = {
            'id': (list.length + 1),
            'name': inputElement.value
        }
        list.push(newItem);
        listElement.appendChild(listComponent(newItem));
    }
    document.getElementById('myInput').value = '';
}

function handleEditComponent() {
    if (!idEditing || !inputElement.value) {
        alert('The change value cannot be empty!');
        return;
    }

    list = list.map(function (item) {
        if (item.id === idEditing) {
            return {
                id: item.id,
                name: inputElement.value
            }
        }
        return item;
    });

    inputElement.value = '';
    idEditing = null;
    renderContent();
}

function deleteComponent(idItem) {
    let i;
    for (i = 0; i < list.length; i++) {
        if (list[i].id === idItem) {
            list.splice(i, 1);
        }
    }

    renderContent();
}