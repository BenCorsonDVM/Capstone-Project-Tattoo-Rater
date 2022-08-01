let tattooId = sessionStorage.getItem('id')
let homeURL = sessionStorage.getItem('baseURL', location.href)
let apptContainer = document.querySelector('#appt-container')

const getTattoo = () => {
    axios.get(`/api/tattoos/${tattooId}`)
    .then(res => {
        apptContainer.innerHTML = ``
        apptForm(res.data)
    })
}
function homepage(){
    sessionStorage.clear()
    location.href= homeURL
}

function submitAppt(event){
    event.preventDefault()
    
    let fname = document.getElementById('fname').value
    let lname = document.getElementById('lname').value
    let time = document.getElementById('time').value
    let dateInput = document.getElementById('date').value
    let dateString = new Date(dateInput)
    let date = dateString.toLocaleDateString()

    alert(`Thank you ${fname} ${lname} for scheduling an appointment. Your appointment is scheduled for ${date} at ${time}. \n\n\*This website is for test purposes only. Your appointment has NOT actually been scheduled\*`)
    sessionStorage.clear()
    location.href= homeURL
}

function apptForm(tattoo) {
    const apptCard = document.createElement('div')
    apptCard.setAttribute(`id`, `form-display`)
    apptCard.classList.add('appt-card')
    
    apptCard.innerHTML =
    `<img id='${tattoo.name}' src='${tattoo.image_path}' />
        <div>
        <p>Fill out your information below to schedule an appointment.</p>
        <form>
            <div>
                <label for="fname">First Name:</label>
                <input type="textbox" id="fname" name="fname"><br>
            </div>
            <div>
                <label for="lname">Last Name:</label>
                <input type="textbox" id="lname" name="lname"><br>
            </div>
            <div>
                <label for="email">Email:</label>
                <input type="email" id="email" name="email"><br>
            </div>
            <div>
                <label for="date">Date:</label>
                <input type="date" id="date" name="date"><br>
            </div>
            <div>
                <label for="time">Time:</label>
                <select id="time" name="time">
                    <option value="10:00 AM">10:00 AM</option>
                    <option value="11:00 AM">11:00 AM</option>
                    <option value="12:00 PM">12:00 PM</option>
                    <option value="1:00 PM">1:00 PM</option>
                    <option value="2:00 PM">2:00 PM</option>
                    <option value="3:00 PM">3:00 PM</option>
                    <option value="4:00 PM">4:00 PM</option>
                    <option value="5:00 PM">5:00 PM</option>
                    <option value="6:00 PM">6:00 PM</option>
                </select><br>
            </div>
            <button id="submit">Submit</button>
        </form>
        <button id="cancel" onclick="homepage()">Cancel</button>
        </div>`

    apptContainer.appendChild(apptCard)
    document.querySelector('form').addEventListener('submit', submitAppt)
}



getTattoo()