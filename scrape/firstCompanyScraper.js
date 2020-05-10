'Place all links here inside data array'
data = [
    'https://www.linkedin.com/in/abhishek-powar/',
  ]
selector = {
    name : '.t-24',
    headline:'.t-18',
    profileLocation:'.t-black.inline-block',
    about :'.t-14 .lt-line-clamp__line--last',
    
}


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

 function extractInfo(win,link){
    obj = {
        name : '',
        headline:'',
        profileLocation:'',
        about :'',
        link:link,
    }
    obj.name = win.document.querySelector(selector.name).innerText
    obj.headline = win.document.querySelector(selector.headline).innerText
    obj.profileLocation = win.document.querySelector(selector.profileLocation).innerText
    obj.about = win.document.querySelector(selector.about).innerText
    obj.link = link
    return obj
}

expSelector ={
    expCard :'#experience-section',
    workCards : '.pv-position-entity',
    designation : '.t-bold',
    companyName : '.pv-entity__secondary-title.t-normal',
    timePeriod : '.pv-entity__date-range span',
    years : '.pv-entity__bullet-item-v2',
    location : '.block span'
}
async function extractExp(win,link){
    exp ={
        companyName : '',
        designation : '',
        timePeriod : '',
        years : '',
        location : ''
    }
    await sleep(3000)
    win.scrollTo(0,1000)
    await sleep(3000)
    expCard = win.document.querySelector(expSelector.expCard)
    if (expCard){
        workCard = expCard.querySelector(expSelector.workCards)
        if(workCard){
            try {
                obj = Object.assign({}, exp);
                obj.companyName = workCard.querySelector(expSelector.companyName).innerText
                obj.designation = workCard.querySelector(expSelector.designation).innerText
                obj.timePeriod = workCard.querySelectorAll(expSelector.timePeriod)[1].innerText
                obj.years = workCard.querySelector(expSelector.years).innerText
                obj.location = workCard.querySelectorAll(expSelector.location)[1].innerText 
            } catch (error) {
                return 'Error' + link
            } 
        }  
    }
    else{
        return 'None'
    }
        
    return obj
    
   
}

async function extractAll(link){
    
        win =await  window.open(link)
        if (win){
            await win.focus()
            await sleep(15000)
            info =await extractInfo(win,link)
            console.log('Info - ',info)
            exp = await extractExp(win,link)
            console.log('Experience - ',exp)
            await win.close()
            info.experience = exp
            return info
        }
    

}
async function run(){
    myUsers = []
    count = 0
    total = data.length
    for(link of data){ 
        console.log(`user ${count} of ${total}`)
        count++
        userData = await extractAll(link)  
        myUsers.push(userData)
    }
}
