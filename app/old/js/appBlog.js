const actSendFiles = document.querySelector('.action-sendFiles')
const fieldFiles = document.getElementById("field-file")
const fieldTitle = document.querySelector('.field-title')
const btnGetDrawing = document.querySelector('#btnGetDrawing')
const wrapperDrawing = document.querySelector('.wrapper-drawing')
const DRAWING_FOLDER_SIZE_NAME = {
    original: {
        path: "",
        folder: ""
    },
    full: {},
    large: {},
    medium: {},
    medium: {},
    small: {},
    Thumbnail: {},
}


let param = 'okkkkkkkk'

const dimensions = {  
    "Thumbnail" : "150px",
    "Medium" : "300px",
    "Large": "1024px",
    "Full": 'original'
}





btnGetDrawing.addEventListener('click', function() {
    console.log('get drawing')
    let params = {
        controller: "TestBlogController",
        action: "getDrawing",
        params: "",
    }
    params = JSON.stringify(params)

    formData.append("controller", 'TestBlogController')
    formData.append("action", "getDrawing")
    // formData.append("action", "getDrawing")
    // fetch('http://localhost/projet_web/api-starter/api-back/index.php',{
    // method: 'POST',
    // headers: {
    //     Accept: 'application/json',
    //     'Content-Type': 'application/json',
    // },
    // body: JSON.stringify(params)
    // }).then(function(response) {
    //     return response
    //  })
    //   .then(function(json) {
    //     console.log(json)
    //  });
    const request = new XMLHttpRequest();
    request.open("POST", "http://localhost/projet_web/api-starter/api-back/index.php");
    request.send(params);

})
// fetch('https://jsonplaceholder.typicode.com/posts',{
//     method: 'POST',
//     headers: {
//         Accept: 'application/json',
//         'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({title: 'Hello world'})