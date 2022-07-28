const tattoosContainer = document.querySelector('#tattoos-container')

const baseURL = `/api/tattoos`

const tattoosCallback = ({ data: tattoos }) => displayTattoos(tattoos)
const errCallback = err => console.log(err)

const getAllTattoos = () => axios.get(baseURL).then(tattoosCallback).catch(errCallback)

const rateTattoo = (event) => {
    event.preventDefault()
    let tattooId = event.target.id
    let selectId = `rating-${tattooId}`
    const ratingSelect = document.getElementById(selectId)
    const rating = ratingSelect.value

    const body = {
        tattooId,
        rating
    }
    
    axios.post(baseURL, body).then(tattoosCallback).catch(errCallback)
}

function scheduleAppt(id) {
    sessionStorage.setItem('id', id)
    location.href='/appt.html'
}

function createTattooCard(tattoos) {
    const tattooCard = document.createElement('div')
    tattooCard.setAttribute(`id`, `${tattoos.name}`)
    tattooCard.classList.add('tattoo-card')
    
    tattooCard.innerHTML = 
    `<img alt='tattoo cover' id='${tattoos.name}' src=${tattoos.image_path} class='tattoo cover' />
    <div class='ratings'>
        <p>${tattoos.avgrating} average based on ${tattoos.ratingtotal} reviews</p>
        <form id='${tattoos.tattoo_id}' class='dropdowns'>
            <label for='tattoo-rating'>Rate This Tattoo</label>
            <select name='tattoo-rating' class='tattoo-rating' id='rating-${tattoos.tattoo_id}'>
                <option value='5'>5</option>
                <option value='4'>4</option>
                <option value='3'>3</option>
                <option value='2'>2</option>
                <option value='1'>1</option>
            </select>
            <button id='submit-${tattoos.name}' class='submit-btn'>Submit</button>
        </form>
    </div>
    <div>
        <button id='request-${tattoos.name}' class='request-tattoo-btn' onclick='scheduleAppt(${tattoos.tattoo_id})' >I Want This Tattoo!</button>
    </div>`

    tattoosContainer.appendChild(tattooCard)  
}

function displayTattoos(arr) {
    tattoosContainer.innerHTML = ``
    for(let i = 0; i<arr.length; i++) {
        createTattooCard(arr[i])
    }
    
    const forms = document.querySelectorAll('form')
    
    forms.forEach((form) => {
        form.addEventListener('submit', rateTattoo)
    })
}


getAllTattoos()