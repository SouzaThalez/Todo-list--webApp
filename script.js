// SELECTORS for the Body ------------
const incompletedTaskpag = document.querySelector('.navegation-links li:first-child');
const completedTaskpag = incompletedTaskpag.nextElementSibling;
const firsPage =  document.querySelector('.navegation-links li:first-child a');
const secondPage =  document.querySelector('.navegation-links li:last-child a');
const classContent =  document.querySelector('.content');
const count = document.getElementById('count');

const subLinksLi =  document.getElementById('sub-links-list');
let lastElementLi = subLinksLi.lastElementChild;

// SELECTORS for manipulation ------------
    let itemsV = []; //Creating new array of Items to pass the divItems to it
   /* 
    let clientsV= [];
    const portifolio = {
        person: 'jhon',
        projects: 5,
        available: true,

    };
    clientsV.push(portifolio);
    let stringData =  JSON.stringify(clientsV);
    let originalData = JSON.parse(stringData);
    localStorage.setItem('mydata',stringData);


    count.addEventListener('click',numberOfClicks);
    function numberOfClicks(){
            countNumber++
            localStorage.setItem('num',countNumber);
            //let stringData = JSON.stringify(countNumber)
            let getDataFrom =  localStorage.getItem('num');
            //let originalData =  JSON.parse(getDataFrom);
            let displaytext = document.querySelector('.display-text');
            displaytext.innerHTML = getDataFrom;
        }


        let getDataFrom =  localStorage.getItem('num');
        //let originalData =  JSON.parse(getDataFrom);
        let displaytext = document.querySelector('.display-text');
        displaytext.innerHTML = getDataFrom;
        */

// -------- Pages EVENT TRIGGER ------------------
    incompletedTaskpag.addEventListener('click', function() {
        initIncompleteView(); 
    });
    completedTaskpag.addEventListener('click',completedList);
    initIncompleteView();


function initIncompleteView(){
        classContent.innerHTML = '';
        firsPage.setAttribute('value','2');
        let divInputField = document.createElement('div');
        divInputField.className = 'user-input-field';
        inputTag = document.createElement('input');
        inputTag.type = 'text';
        inputTag.placeholder = '  Enter a Task ... ';
        inputTag.size = '30';
        inputTag.maxLength = '100';
        inputTag.id = 'text-input';
        let addTaskBtn = document.createElement('button');
        addTaskBtn.textContent = 'Add Task';
        addTaskBtn.addEventListener('click',addItem);
        divInputField.append(inputTag);
        divInputField.append(addTaskBtn);
        classContent.append(divInputField);
        divListContent =  document.createElement('div');
        divListContent.className = 'list-content';
        classContent.append(divListContent);
        let getDatafrom =  sessionStorage.getItem('localArray');
        let localStorageV = JSON.parse(getDatafrom);
        
        if (localStorageV){
            itemsV = localStorageV;
         }

         updateView();
       
}   

function updateView() {
// atualiza a tela

    divListContent.innerHTML = '';
    for (let index = 0; index < itemsV.length; index++) {

        if(itemsV[index].isCompleted == false){
                    
            let divItems =  document.createElement('div');
            divItems.className = 'items';
            let barLine = document.createElement('hr');
            
            let lineText =  document.createElement('span');
            lineText.className = 'line-text';
            let iconTrash =  document.createElement('span');
            iconTrash.className = 'material-icons trash-icon';
            iconTrash.textContent = 'delete_outline';
            let iconCheck=  document.createElement('span');
            iconCheck.className = 'material-icons check-icon';
            iconCheck.textContent = 'check';
            divListContent.append(divItems);
            divItems.append(barLine);
            divItems.append(lineText);
            divItems.append(iconCheck);
            divItems.append(iconTrash);
            divItems.setAttribute('index',index); // getting the position by adding index to each
            //let getDataFrom = localStorage.getItem('localArray');
            //let original =  JSON.parse(getDataFrom);
            lineText.innerHTML =  itemsV[index].value; //itemsV[index].value; 
            iconTrash.addEventListener('click',removeFromTrash);
            iconCheck.addEventListener('click',moveToComplete);
        }    
    }
        if(!itemsV){
            
        }
        else if(itemsV){
             // Counting incompleted task by the lenght of the localArray
            let getDataFrom = sessionStorage.getItem('localArray');
            let localArray = JSON.parse(getDataFrom);
            let localArraySize = localArray.length;

            // creating filter of LocalArray to sort only isCompleted = true
            // and get the lenght of that
            let localArrayIscompleted = localArray.filter(checkAtt);
            function checkAtt(elem){
                if(elem.isCompleted == true){
                    return true;
                }else{
                    return false;
                    }
            }
     
            let localV = localArrayIscompleted.length;
            lastElementLi.textContent = localArraySize - localV;

        }
    

}

function addItem(){
   
    if(!inputTag.value){
        alert('The box is Empty!!');
        return;
    }
    //itemsV.push(inputTag.value); //Passing userInput to Array 
    const itemsObject = { value:inputTag.value, isCompleted:false};
    itemsV.push(itemsObject);//Passing objecte created  to an  Array isntead!
    clearInputBox();
    let stringData = JSON.stringify(itemsV);
    sessionStorage.setItem('localArray',stringData);
    //let getDatafrom =  localStorage.getItem('localArray');
    //let originalV = JSON.parse(getDatafrom);
    updateView();
}

function clearInputBox(){
        inputTag.value = '';
}
    
function completedList(){
 
    classContent.innerHTML= '';
    secondPage.setAttribute('value','1');
    let divInputField = document.createElement('div');
    divInputField.className = 'user-input-field';
    classContent.append(divInputField);

    let getDataFrom = sessionStorage.getItem('localArray');
    let localStorageV =  JSON.parse(getDataFrom);// conversion to original

    if (localStorageV){
        itemsV = localStorageV;
    }
    for (let index = 0; index < itemsV.length; index++) {
            if(itemsV[index].isCompleted == true){
                let divListContent =  document.createElement('div');
                divListContent.className = 'list-content';
                let divItems =  document.createElement('div');
                divItems.className = 'items';
                let barLine = document.createElement('hr');
                let lineText =  document.createElement('span');
                lineText.className = 'line-text';
                
                divListContent.append(divItems);
                divItems.append(barLine);
                divItems.append(lineText);
               
                classContent.append(divListContent);
                divItems.setAttribute('index',index); // getting the position by adding index to each
                lineText.innerHTML =  itemsV[index].value  //itemsV[index].value; 
                }
        }
        
}
    
function removeFromTrash(e){

    let position = 0;
    let target =  e.target;
    let  iconsTrash =  document.getElementsByClassName('trash-icon');// node list of icons created
    target.setAttribute('name','trash');

    for (let index = 0; index < iconsTrash.length; index++) {
        const element = iconsTrash[index];
        if(element.hasAttribute('name')){
            position = index ; 
            break
        }     
    }
    itemsV.splice(position,1); // retira o item do Vetor base!
    let getDataFrom =  sessionStorage.getItem('localArray');
    let localArray =  JSON.parse(getDataFrom);
    localArray.splice(position,1);
    let stringData = JSON.stringify(localArray);
    sessionStorage.setItem('localArray',stringData);
    updateView();
}

function moveToComplete(e){
   
    let target =  e.target;
    //let  iconsCheck =  document.getElementsByClassName('check-icon'); // node list of icons created
    let parentNode =  target.parentNode;
    let position = parentNode.getAttribute('index');
    giveAtribu = position;

    //let stringData = JSON.stringify(itemsV);
    let getDataFrom = sessionStorage.getItem('localArray');
    let originalV = JSON.parse(getDataFrom);
    originalV[position].isCompleted = true; //pega a posicao encontrada e nela muda o valor do atributo
    itemsV[position].isCompleted = true; //pega a posicao encontrada e nela muda o valor do atributo
    let stringData = JSON.stringify(originalV);
    sessionStorage.setItem('localArray',stringData); // atualizando local storage
    updateView();
}

