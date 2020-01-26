var app;
app = new Vue({
    el: "#app",
    data: {
        formPostData: [],

    }
});


function start(){
    $.getJSON("http://localhost:8000/posts",processPosts);
}


// $.getJSON("http://localhost:8000/comments")  ADD comments URL


function processPosts(data){
    app.formPostData = data;
}

