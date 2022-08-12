window.addEventListener('load',init);

function init(){
    document.getElementById('add').addEventListener('click',Add);
    document.getElementById('delete').addEventListener('click',Delete);
    document.getElementById('save').addEventListener('click',Save);
    document.getElementById('load').addEventListener('click',Load);
    printData;
}

function Add(){
    const idArray=["title","notes"];
    let obj={};
    for(let i=0;i<idArray.length;i++){
        obj[idArray[i]]=document.getElementById(idArray[i]).value;
    }
    obj.isMarked=false;
    notesObject.add(obj);
    print(obj);
}

function Delete(){
    document.getElementById('result').innerText='';
    notesObject.deleteNote();
    printData(notesObject.data);
}

function Save(){
    if(window.localStorage){
        notesObject.save();
    }
    else{
        alert("Please Update Your Browser!!!");
    }
}

function Load(){
    if(window.localStorage){
        let data=notesObject.load();
        printData(data);
    }
    else{
        alert("Please Update Your Browser!!!");
    }
}

function printData(data){
    data.forEach(Element=>print(Element));
}

const createButton=(attr,buttonName,id,func)=>{
    let button=document.createElement('button');
    button.className=attr;
    button.innerText=buttonName;
    button.setAttribute('id',id);
    if(buttonName=="Mark Delete"){
        button.addEventListener('click',function(){func(id)});
    }
    else if(buttonName=="Edit"){
        button.addEventListener('click',function(){func(id)})
    }
    return button;
}

const markDelete=(id)=>{
    let parent=document.getElementById(id);
    parent.classList.toggle("border-danger");
    parent.classList.toggle("bg-danger");
    notesObject.markTrue(id);
}

const markEdit=(note)=>{
    console.log(note);
    Object.keys(note).forEach(key=>{
        if(key=="isMarked"){
            console.log("mark");
        }
        else{
        console.log(`${key} : ${note[key]}`);
        document.getElementById(key).innerText=note[key];
        }
    })
    notesObject.markTrue(note.title);
    Delete();
}

function print(note){
    if(note.title==''){
        alert("Entering an empty Note!!!");
    }
    else{
        let container=document.getElementById('result');
        container.style="display:flex;"
        let div=document.createElement('div');
        div.style="width:230px; height:200px; margin:10px 10px; overflow:auto;";
        div.className="border border-primary mt-3 border-3 bg-info bg-opacity-10";
        div.setAttribute('id',note.title);
        for(let key in note){
            if(key==='title'){
                var h=document.createElement('h5');
                h.className="p-1 text-center";
                h.innerText=note[key];
            }
            else if(key==='isMarked'){
                continue;
            }
            else{
                var p=document.createElement('p');
                p.className="p-1";
                p.innerText=note[key];
            }
        }
        container.appendChild(div);
        document.getElementById('title').value='';
        document.getElementById('notes').value='';
        let trash_can=createButton("btn btn-outline-danger btn-sm m-2","Mark Delete",note.title,markDelete);
        let edit=createButton("btn btn-outline-secondary btn-sm m-2","Edit",note,markEdit);
        div.append(h,p,trash_can,edit);
    }
}