 //PARSE THE urL
 function getParameterByName(name){
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]")
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)")
    var results = regex.exec(location.search)
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "))
}

try {
    //GIVE THE URL PARAMETER A VARIABLE NAME
    var cjeventid = getParameterByName('cjevent')

    //GIVE THE COOKIE A DURATION OF 1 YEAR
    var now = new Date()
    var time = now.getTime()
    var expTime = time + 1000*3153600
    now.setTime(expTime)

    if(expTime){
        document.cookie = "cjevent=" + cjeventid + "; expires=" + now.toGMTString()
    }

} catch (error) {
    console.log('OPPS: ', error)
}


