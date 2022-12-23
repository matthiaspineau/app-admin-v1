import { fetchGetTableDraw, fetchDelete, fetchGetDraw } from './fetch_data.js';

const ressource = {
    pathUpload:  'http://localhost/projet_web/api-starter/uploads/',
    sizeSmall:  'small'
}

const storeDraw = {
    drawList: [],
    drawId: 0,
    drawItem: {}
}

// 'http://localhost/projet_web/api-starter/api-back/index.php'

function createTableDraw() {
    fetchGetTableDraw("http://localhost/projet_web/api-starter/api-back/index.php").then((json) => {
        storeDraw.drawList = []
        storeDraw.drawId = 0,
        storeDraw.drawItem = {}
        storeDraw.drawList = json.data
        console.log(storeDraw.drawList)

        const gridjs = new window.gridjs.Grid({
            // columns: ['id', 'drawing_name', 'drawing_title', 'id_drawing_category', 'img'],
            columns: [
                'id',
                'drawing_name',
                'drawing_title',
                'id_drawing_category',
                { 
                  name: 'image',
                  data: null,
                    formatter: (_, row) => window.gridjs.html(`
                        <img 
                            src="${ressource.pathUpload+'small/'+(row.cells[1].data)+'.png'}" 
                            alt="img" style="width:32px;max-width:100%;height:auto;" />`)
                },
                { 
                    name: 'Actions',
                    formatter: (cell, row) => {
                      return window.gridjs.h('button', {
                        className: 'py-2 mb-4 px-4 border rounded-md text-white bg-blue-600',
                        // onClick: () => alert(`Editing "${row.cells[0].data}" "${row.cells[1].data}"`)
                        onClick: () => {
                            // viewEditDraw(row.cells[0].data)
                            let item = {
                                id: row.cells[0].data,
                                name: row.cells[1].data
                            }
                            deleteDraw(item)

                        }
                      }, 'Delete');
                    }
                  },
             ],
            data: json.data,
            sort: true,
            search: true,
            pagination: true,
            // fixedHeader: true,
            // height: '500px',
          }).render(document.getElementById("table-get-draw-gridjs"));

        // grid.on('rowClick', (...args) => console.log('row: ' + JSON.stringify(args), args));
        // grid.on('cellClick', (...args) => console.log('cell: ' + JSON.stringify(args), args));
                
    })

    console.log(gridjs)
}

function deleteDraw(item) {
    let params = {
        id: item.id,
        name: item.name
    }
    console.log(params)
    fetchDelete("http://localhost/projet_web/api-starter/api-back/index.php", params).then((json) => {

        if (json.success) {
            console.log('succes')

        }
    })
}

// function viewEditDraw(id) {

//     // console.log('id')
//     // console.log(id)
//     let params = {"id":[id]}
//     fetchGetDraw("http://localhost/projet_web/api-starter/api-back/index.php", params).then((json) => {
//         let item = json.data[0]

//         let htmlTop = `<h5>Editer</h5>`
//         let htmlMiddle = `<div>
//                             <div data-item-id="${item.id}">id : ${item.id}</div>
//                             <div>name : ${item.drawing_name}</div>
//                         </div>`
//         let htmlBbot = `<div>
//                 <button class="btn btn-sm btn-danger" data-modal-controller="drawAdmin" data-modal-action="deleteDraw">delete</button>
//             </div>`

//         componentsModal({
//             target: "[data-dock-main-id='dock-main']",
//             id: Date.now(),
//             top: htmlTop,
//             middle: htmlMiddle,
//             bot: htmlBbot,
//         })
    
//         let html = ''
    
//         return html
//     })

// }

function switchAction(action) {

    switch (action) {
        case "delete":  

            let params = {
                id: storeDraw.drawItem[0].id,
                name: storeDraw.drawItem[0].drawing_name
            }
            console.log(params)
            fetchDelete("http://localhost/projet_web/api-starter/api-back/index.php", params).then((json) => {

                if (json.success) {
                    // console.log(document.querySelector('[data-draw-row-id="'+storeDraw.drawId+'"]'))
                    // document.querySelector('tr[data-draw-row-id="'+storeDraw.drawItem[0].id+'"]').removeChild();
                    storeDraw.drawList = storeDraw.drawList.filter(elt => elt.id != storeDraw.drawId)
                    storeDraw.drawItem = []
                    storeDraw.drawId = 0
                    // console.log(storeDraw)
                    createTableDraw()
                }
            })
            break;
        case "aa":
            // htmlTemplate = `<div id="table-get-draw" data-form-wrap-name="table-get-draw" dock-main-template="table-get-draw"></div>`
            // createTemplate(htmlTemplate)
            break;
        case "aaa":
            // htmlTemplate = `<div id="table-get-draw" data-form-wrap-name="table-get-draw" dock-main-template="table-get-draw"></div>`
            // createTemplate()
            break;
        default:
            break;
    }
}

export { createTableDraw };
