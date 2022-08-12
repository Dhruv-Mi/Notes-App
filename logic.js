
const notesObject={
    data:[],

    add:function(note){
        this.data.push(note);
    },

    markTrue:function(noteID){
        let found=this.data.find(element=>element.title===noteID);
        found.isMarked=!found.isMarked;
    },

    deleteNote:function(){
        let newData=this.data.filter(element=>!element.isMarked);
        this.data=newData;
    },

    save:function(){
        localStorage.clear();
        localStorage.setItem('data',JSON.stringify(this.data));
        console.log(localStorage.getItem('data'));
    },

    load:function(){
        if(localStorage){
            return JSON.parse(localStorage.getItem('data'));
        }
        else{
            alert("Nothing To Load!!!");
        }
    }
}
