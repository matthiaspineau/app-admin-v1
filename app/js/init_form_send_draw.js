import { getFieldTypeText, getFieldTypeFileDraw, getFieldTypeCheckox, getFieldTypeSubmit } from "./models_form.js";
import {getValuesFieldText, getValuesFieldCheckbox} from "./tools_form.js";
import { fetchDataFormAddDraw } from './fetch_data.js';

function createFormAddDraw() {
    fetchDataFormAddDraw("../../data/data-form-add-draw.json").then((data) => {
        let html = "";
        html += getFieldTypeText(data.name);
        html += getFieldTypeFileDraw(data.file);
        html += getFieldTypeText(data.title);  
        
        html += getFieldTypeText(data.desc);
        html += getFieldTypeCheckox(data.tags);
        html += getFieldTypeSubmit(data.button);
    
        document.getElementById("form-send-draw").innerHTML = html;
        document.querySelector('[data-field-name="draw-file-name"]').setAttribute('disabled', 'disabled');
        
    })
    .then(() => {
        initFormSendDraw();
    });
}


function initFormSendDraw() {
    const fieldFileDraw = document.querySelector('[data-field-name="draw-file"]');
    const formBtnAddDrawing = document.querySelector("#send-draw");
    const fieldFileDrawName = document.querySelector('[data-field-name="draw-file-name"]');

    /**
     * chager le fichier
     *  - verification fu fichier
     *  - met a jour le champs "darw-name"
     */
    fieldFileDraw.addEventListener("change", () => {
        console.log('file change')
        let files = fieldFileDraw.files;
        document.querySelector('#send-draw').style.display = "block"
        document.querySelector(".feedback-file").style.display = "none";
        console.log(files)

        console.log(typeof files)

        // document.querySelector(".feedback-file").style.display = "none";
        if (files.length > 0) {
            // let imgName = "Offrande_Ou_Délivrance_3.png"
            let imgName = files[0].name;
            let imgSize = files[0].size;
            let imgType = files[0].type;
            
            let errors = []; // 600000
            if (imgSize >= 10000000) {
                errors.push("Le fichier est trop volumineux");
            }
            if (imgType != "image/png") {
                errors.push("format de fichier non accepter");
            }
            console.log(imgSize)

            if (errors.length > 0) {
                document.querySelector(".feedback-file").textContent = "erreur";
                document.querySelector(".feedback-file").style.display = "block";
                document.querySelector('#send-draw').style.display = "none"
                fieldFileDrawName.value = "";
                return errors;
            }
            let imgNamelength = imgName.length;

            fieldFileDrawName.value = imgName.substring(0, imgNamelength - 4);
        }
    });

    formBtnAddDrawing.addEventListener("click", (e) => {
        e.preventDefault();
        // console.log('send drawing')
        fetchUploadDrawing().then((response) => {
            console.log(response);
        });
    });

    async function fetchUploadDrawing() {
        let files = fieldFileDraw.files;
        // console.log(files)

        let textValue = getValuesFieldText({
            format: 'objectOfValue',
            wrapper: '[data-form-wrap-name="form-add-drawing"]',
            field: '[data-field-type="text"]',
        });

        let checkValue = getValuesFieldCheckbox({
            format: 'objectOfValue',
            wrapper: '[data-form-wrap-name="form-add-drawing"]',
            field: '[data-field-wrap-type="checkbox"]',
        });
        // console.log(textValue);
        // console.log(checkValue);

        if (files.length > 0) {
            console.log(files[0])
            
            let data = {
                file: files[0],
                drawing_name: textValue["draw-file-name"],
                drawing_title: textValue["draw-file-title"],
                drawing_desc: textValue["draw-file-desc"],
                drawing_info: JSON.stringify({}),
                id_drawing_category: 1,
                drawing_tags: checkValue.tags,
            };
            console.log(data);
            data = JSON.stringify(data);

            let formData = new FormData();
            formData.append("file", files[0]);
            formData.append("controller", "DrawingController");
            formData.append("action", "uploadImage");
            formData.append("params", data);

            const req = await fetch(
                "http://localhost/projet_web/api-starter/api-back/index.php",
                {
                    method: "POST",
                    headers: {
                        Accept: "application/json",
                    },
                    body: formData,
                }
            );

            if (req.ok === true) {
                return req.json();
            }
            throw new Error("nouvelle erreur lors de la creation");
        }
    }
}


export { createFormAddDraw };