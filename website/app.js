/* Global Variables */
const api = 'd8e31829a5078d9bbf55c05f673a3c58'
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = (d.getMonth()+1)+'.'+ d.getDate()+'.'+ d.getFullYear();

document.getElementById('generate').addEventListener('click', async() => {
    const zipCode = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;
    const temp = await getTemp(zipCode);
    if(temp === '-0'){
        alert("please enter a valid zip code");
    }else{
       await postData(temp, feelings)
        .then(UpdateUi);
    }
})

const getTemp = async function(zipCode){
    const url = `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=${api}&units=metric`;
    const response = await fetch(url);
    if(response.status === 404){
        return '-0';
    }
    const data = await response.json();
    const temp = data.main.temp;
    return temp;

} 

async function getData (){
    const res = await fetch('/getData');
    const data = res.json();
    return data;
}

async function postData (temp ,feelings){
    await fetch('/postData', {
        method : 'POST',
        headers : {
            "Content-Type" : "application/json"
        },
        body : JSON.stringify({
            date : newDate,
            temperatur : temp,
            content : feelings
        })
    })
}

async function UpdateUi (){
    const data = await getData();
    document.getElementById('date').innerHTML = `Date is: ${data.date}`;
    document.getElementById('temp').innerHTML = `Temp is ${data.temperatur}`;    
    document.getElementById('content').innerHTML = `Feeling is ${data.content}`;
}