fetch('experienced.json')
.then(res => res.json())
.then(data => {
    var expdata = data
    console.log(typeof(data))
    console.log(typeof(expdata))
    main(expdata)
})
function counter(arr){
    count = {}
    for(a of arr){
        if (count[a]){
            count[a]++
        }
        else{
            count[a]=1
        }
    }
    orderedList = Object.keys(count).sort((a,b)=>count[a]<count[b]?1:-1)
    out = {}
    orderedList = orderedList.slice(0,10)

    for (company of orderedList){
        out[company] = count[company]
    }
    return out
}
function counterObj(count){
    orderedList = Object.keys(count).sort((a,b)=>count[a]<count[b]?1:-1)
    out = {}
    orderedList = orderedList.slice(0,10)
    for (company of orderedList){
        out[company] = count[company]
    }
    return out
}


function topCompanies(expdata){
    expUsers = expdata
    companyNames = []
    expUsers.forEach(element => {
        companyNames.push(element.experience.companyName.toLowerCase().replace('full-time','').trim())
    });
    // keywords  = ['']

    result = counter(companyNames)
    return result
}
function topDesignations(expdata){
    expUsers = expdata
    companyNames = []
    expUsers.forEach(element => {
        companyNames.push(element.experience.designation.toLowerCase().replace('full-time','').trim())
    });
    // keywords  = ['']

    result = counter(companyNames)
    return result
}

function main(expdata){
    chartcompany ={
        'color':'#FC4A1A',
        'label':'Top 10 companies'
    }
    chartDesignation ={
        'color':'#007849',
        'label':'Top 10 Designations'
    }
    companys = topCompanies(expdata)
    desgnations = topDesignations(expdata)
    companyChart('myChart',companys,chartcompany)
    companyChart('myChart2',desgnations,chartDesignation)
    
    
}

function companyChart(chartId,data,extra){
    console.log(data)
    var ctx = document.getElementById(chartId).getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'horizontalBar',
        data: {
            labels: Object.keys(data),
            datasets: [{
                label: extra.label,
                data: Object.keys(data).map(d=>data[d]),
                backgroundColor: extra.color,
                
            }],
               
            
        },
        options: {
            scales: {
                xAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
}
