var database = firebase.database().ref('/')
var getdata = document.getElementById('getdata');
var getInput = document.getElementById('demo')
var output = document.getElementById("output")
var list = document.getElementById("list")
var arr = [];
var finalarr;



function submitfunction() {
    if(getdata.value!=""){
    database.child('Todo').push({ name: getdata.value })
}
else{
    alert("Field Empty")
}
}

function getdatafun() {
    database.child('Todo').on("child_added", function (snap) {
        var obj = snap.val()
        obj.key = snap.key
        arr.push(obj.name);
        var span = document.createElement("span");
        span.style.fontSize="25px"
        var span2 = document.createElement("button");
        span2.style.cssFloat="right"
        
        span2.innerHTML = "X"
        var button = document.createElement("button").innerHTML = "Remove"
        var container = document.createTextNode(obj.name)
        span.appendChild(container);
        var newTag = document.createElement('li')
        span2.setAttribute("id", obj.key)
        span2.setAttribute("class","removetodo")
        span2.setAttribute("onclick", "removetodo(this,this.id)")
        

        newTag.appendChild(span)
        newTag.appendChild(span2)

        list.appendChild(newTag)
        getdata.value=""
        // console.log(obj)
        // console.log(snap)
    })
}

function removetodo(id, did) {
    database.child('Todo').child(did).remove();
    id.parentNode.remove();
}

getdatafun()