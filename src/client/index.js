import { performAction} from './js/app'
import { getLocation} from './js/app'
import { postData} from './js/app'
import { updateUI} from './js/app'

import './styles/resets.scss'
import './styles/header.scss'
import './styles/form.scss'
import './styles/base.scss'
import './styles/footer.scss'

import img from './media/paris.jpg';

var image = document.getElementById('img-trip');
image.src = img;



// toggle add note
let addbtn = document.getElementById('btn-note');
addbtn.addEventListener('click', function(){
    let notes = document.querySelector('.notes');
    notes.classList.toggle('text-show');
});



let newTag = document.createElement('p');
// newTag.textContent = ''


let btn = document.getElementById('text-submit-btn');
// console.log(btn);
let input_text = document.getElementById('text-notes').innerHTML;
// console.log(input_text);



//export{performAction, getLocation, postData, updateUI}
