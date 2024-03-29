console.log("client side javascript file is loaded")

const weatherForm = document.querySelector("form")
const search = document.querySelector("input")
const messageOne = document.querySelector("#message-1")
const messageTwo = document.querySelector("#message-2")

messageOne.textContent = "Welcome to weather app"

weatherForm.addEventListener("submit",(e) => {
    e.preventDefault()
    const location =  search.value

    messageOne.textContent = "Loading ...."
    messageTwo.textContent = ""

    fetch("/weather?address=" + location).then((response) => {
    response.json().then((data)=>{
        if(data.error){
          //  return console.log("Unable to find location")
            messageOne.textContent = ""
            messageTwo.textContent = data.error
        }
        else{
            messageOne.textContent = data.location
            messageTwo.textContent = data.forecast
        }

    })
})
    
})


