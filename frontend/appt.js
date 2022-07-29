let tattooId = sessionStorage.getItem('id')
let homeURL = sessionStorage.getItem('baseURL')
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
    

    alert('Thank you for scheduling your appointment! \n\n\*This website is for test purposes only. Your appointment has NOT been scheduled\*')
    // alert(`Thank you ${fname} ${lname} for scheduling an appointment. Your appointment is scheduled for ${date} at ${time}. 
        
    // *This website is for test purposes only. Your appointment has not actually been scheduled*`)
    sessionStorage.clear()
    location.href= homeURL
}
function apptForm(tattoo) {
    const apptCard = document.createElement('div')
    apptCard.setAttribute(`id`, `form-display`)
    apptCard.classList.add('appt-card')
    
    apptCard.innerHTML =
    `<img id='${tattoo.name}' src='${tattoo.image_path}' />
    <p>Fill out your information below to schedule an appointment.</p>
    <form>
        <label for="fname">First Name:</label>
        <input type="textbox" id="fname" name="fname"><br>
        <label for="lname">Last Name:</label>
        <input type="textbox" id="lname" name="lname"><br>
        <label for="email">Email:</label>
        <input type="email" id="email" name="email"><br>
        <label for="date">Date:</label>
        <input type="date" id="date" name="date"><br>
        <label for="time">Time:</label>
        <select id="time" name="time">
            <option value="10">10:00</option>
            <option value="11">11:00</option>
            <option value="12">12:00</option>
            <option value="13">1:00</option>
            <option value="14">2:00</option>
            <option value="15">3:00</option>
            <option value="16">4:00</option>
            <option value="17">5:00</option>
            <option value="18">6:00</option>
        </select><br>
        <button id="submit">Submit</button><br>
    </form>
    <button id="cancel" onclick="homepage()">Cancel</button><br>`

    apptContainer.appendChild(apptCard)
    document.querySelector('form').addEventListener('submit', submitAppt)
}



getTattoo()