const form = document.querySelector('.data-form')
const btnGetArticles = document.querySelector('.btn-get-articles')
const btnsendArticles = document.querySelector('.btn-send')
const btnSendDrawing = document.querySelector('.btnSendDrawing')
const a = document.querySelectorAll('.data-form [data-field-name]')


const formTest = document.querySelector('[data-form-wrap-name="form-test"]')
const formBtnTest = document.querySelector('[data-form-button-name="btn-form-test"]')
console.log(formTest)
console.log(formBtnTest)



  


formBtnTest.addEventListener('click', (e) => {
    e.preventDefault()
    let arrayFieldText = getValuesFieldText('[data-form-wrap-name="form-test"]', '[data-field-type="text"]')
    let arrayCheckBox = getValuesFieldCheckbox('[data-form-wrap-name="form-test"]', '[data-field-wrap-type="checkbox"]')
    console.log(arrayFieldText)
    console.log(arrayCheckBox)
})

console.log(a)

async function fetchArticles() {

    let data = {
        controller: "TestBlogController",
        action: "getArticles",
        params: "",
    }


    const req = await fetch('http://localhost/projet_web/api-starter/api-back/index.php',{
    method: 'POST',
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
    })

    if (req.ok === true) {
        return req.json()
    }
    throw new Error('nouvelle erreur')
}

async function fetchAddArticles() {
    // let data = {
    //     controller: "TestBlogController",
    //     action: "createArticle",
    //     params: JSON.stringify({
    //         title: 'newwwwwwwwwww article',
    //         content: 'newwwwwwwwwww content',
    //         price: 25
    //     }),
    // }


    let data = JSON.stringify({
            title: 'newwwwwwwwwww article okkkkkkk',
            content: 'newwwwwwwwwww content 2000000',
            price: 250
        })
    


    let formData = new FormData();
    formData.append("controller", 'TestBlogController')
    formData.append("action", "createArticle")
    formData.append("params", data)


    const req = await fetch('http://localhost/projet_web/api-starter/api-back/index.php',{
    method: 'POST',
    headers: {
        "Accept": "application/json",
        // "Content-Type": "application/json"
    },
    // body: JSON.stringify(data)
    body: formData
    })

    if (req.ok === true) {
        return req.json()
    }
    throw new Error('nouvelle erreur lors de la creation')
}


btnGetArticles.addEventListener('click', (e) => {
    e.preventDefault()

    fetchArticles().then((articles) => {
        console.log(articles)
    })
})




