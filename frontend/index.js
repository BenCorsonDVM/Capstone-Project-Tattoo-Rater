const tattoosContainer = document.querySelector('#tattoos-container')

const baseURL = `http://localhost:5500/api/tattoos`

const tattoosCallback = ({ data: tattoos }) => displayTattoos(tattoos)
const errCallback = err => console.log(err)

const getAllTattoos = () => axios.get(baseURL).then(tattoosCallback).catch(errCallback)


function createTattooCard(tattoos) {
    const tattooCard = document.createElement('div')
    tattooCard.setAttribute(`id`, `${tattoos.name}`)
    tattooCard.classList.add('tattoo-card')
    
    tattooCard.innerHTML = 
    `<img alt='tattoo cover' id='${tattoos.name}' src=${tattoos.image_path} class='tattoo cover' />
    <div class='ratings'>
        <p>${tattoos.avgrating} average based on ${tattoos.ratingtotal} reviews</p>
        <form class='dropdowns'>
            <label for='tattoo-rating'>Rate This Tattoo</label>
            <select name='tattoo-rating' id='tattoo-rating'>
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
        <button id='request-${tattoos.name}' class='request-tattoo-btn'>I Want This Tattoo!</button>
    </div>`

    tattoosContainer.appendChild(tattooCard)  
}

function displayTattoos(arr) {
    tattoosContainer.innerHTML = ``
    for(let i = 0; i<arr.length; i++) {
        createTattooCard(arr[i])
    }
}

getAllTattoos()