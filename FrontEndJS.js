var app;
app = new Vue({
    el: "#app",
    data: {
        formPostData: [],

    },
});

$.getJSON("http://localhost:8000/posts",processPosts);



function processPosts(data){
    app.formPostData = data;
}