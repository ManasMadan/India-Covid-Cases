const total = document.getElementById("total_cases")
const active = document.getElementById("active_cases")
const recovered = document.getElementById("recovered_cases")
const deaths = document.getElementById("deaths")
const selected = document.getElementById("selected")
const updated = document.getElementById("updated")
const cross = document.getElementById("cross")
const cardContainer = document.getElementById("cardContainer")
const spinner = document.getElementById("spinner")
const url = "https://api.apify.com/v2/key-value-stores/toDWvRj1JpTXiM8FF/records/LATEST?disableRedirect=true"
btn1 = document.getElementById("btn1")
btn2 = document.getElementById("btn2")
btn3 = document.getElementById("btn3")
btn4 = document.getElementById("btn4")

function showSpinner(val){
    if (val == true){
        cardContainer.style.display = "none"
        spinner.style.display = "block"
    }
    else{
        cardContainer.style.display = "block"
        spinner.style.display = "none"
    }
}

const key = {
    "Andaman and Nicobar Islands" : 0,
    "Andhra Pradesh" : 1,
    "Arunachal Pradesh" : 2,
    "Assam" : 3,
    "Bihar" : 4,
    "Chandigarh" : 5,
    "Chhattisgarh" : 6,
    "Dadra and Nagar Haveli and Daman and Diu" : 7,
    "Delhi" : 8,
    "Goa" : 9,
    "Gujarat" : 10,
    "Haryana" : 11,
    "Himachal Pradesh" : 12,
    "Jammu and Kashmir" : 13,
    "Jharkhand" : 14,
    "Karnataka" : 15,
    "Kerala" : 16,
    "Ladakh" : 17,
    "Lakshadweep" : 18,
    "Madhya Pradesh" : 19,
    "Maharashtra" : 20,
    "Manipur" : 21,
    "Meghalaya" : 22,
    "Mizoram" : 23,
    "Nagaland" : 24,
    "Odisha" : 25,
    "Puducherry" : 26,
    "Punjab" : 27,
    "Rajasthan" : 28,
    "Sikkim" : 29,
    "Tamil Nadu" : 30,
    "Telangana" : 31,
    "Tripura" : 32,
    "Uttarakhand" : 33,
    "Uttar Pradesh" : 34,
    "West Bengal" : 35,
}

function fetchData() {
    showSpinner(true)    
    setTimeout(showSpinner,1000,false)
    cross.style.display = "none"
    fetch(url).then(res => res.json())
    .then((data) => {
        selected.innerHTML = "India"
        total.innerHTML = place_value(data.totalCases)
        active.innerHTML = place_value(data.activeCases)
        recovered.innerHTML = place_value(data.recovered)
        deaths.innerHTML = place_value(data.deaths)
        dateArr = (data.lastUpdatedAtApify).split("-")
        updated.innerHTML = "Last Updated On " + dateArr[2].split("T")[0] + "-" + dateArr[1] + "-" + dateArr[0]
    })
}

function fetchStats(name){
    showSpinner(true)    
    setTimeout(showSpinner,1000,false)
    cross.style.display = "block"
    fetch(url).then(res => res.json())
    .then((data) => {
        selected.innerHTML = name

        t = data["regionData"][key[name]]["totalInfected"]
        a = data["regionData"][key[name]]["activeCases"]
        r = data["regionData"][key[name]]["recovered"]

        total.innerHTML = place_value(t)
        active.innerHTML = place_value(a)
        recovered.innerHTML = place_value(r)
        deaths.innerHTML = place_value(t - (a + r))
        dateArr = (data.lastUpdatedAtApify).split("-")
        updated.innerHTML = "Last Updated On " + dateArr[2].split("T")[0] + "-" + dateArr[1] + "-" + dateArr[0]
    })
    

}


function speak(name){
    btn(true)
    number = name.innerHTML
    var speech = new SpeechSynthesisUtterance()
    if(name == deaths){
        speech.text = "The Number Of Deaths In " + selected.innerHTML + " is " + number
    }else if(name == total){
        speech.text = "The Number Of Total Cases In " + selected.innerHTML + " is " + number
    }else if(name == recovered){
        speech.text = "The Number Of Recovered Cases In " + selected.innerHTML + " is " + number
    }else if(name == active){
        speech.text = "The Number Of Active Cases In " + selected.innerHTML + " is " + number
    }

    speech.lang = 'en-US';


    window.speechSynthesis.speak(speech)


    setTimeout(()=>btn(false),8000)
}

function btn(val){
    btn1.disabled = val
    btn2.disabled = val
    btn3.disabled = val
    btn4.disabled = val
}

function place_value(num){
    var numberArr = (num.toString().split(""))
    var number = String("")
    var j = 0

    for(var i = numberArr.length-1;i >=0;i--){
        // console.log(numberArr[i])
        if (j == 3){
            j = 0
            i += 1
            number+=","
        }
        else{
            number+=numberArr[i]
            j+=1    
        }
    }

    numberArr = number.split('')
    number = ""
    for(var i = numberArr.length-1;i >= 0;i--){
        number += numberArr[i]
    }
    return number
}

simplemaps_countrymap.hooks.click_state  = function (id) {
    let name = simplemaps_countrymap_mapdata.state_specific[id].name
    window.scrollBy(0,2*window.innerHeight)
    fetchStats(name)
}

fetchData()