const request = require('request');
const cheerio = require('cheerio');
const fetch = require('isomorphic-unfetch')

loadUrl = async (url) => {

  let res  = await fetch(url)
  let HTML = await res.text() 
  let $ = cheerio.load(HTML)
  return $

  
}


// Feed Site MAp ?? 

exports.SEOCheck = async ({url, options}) => {
  let HTML =  loadUrl(url)
  SEO = {}
  PageData = {}

  let title = HTML('title').text()
  // let heading1 = HTML('h1').text() 
  // let canonnical = HTML('canonical').txt()
  
  if(title.lenght > 0 ){
    SEO.title = true
  } else {
    SEO.title = false
  }

  // if(options.og){
  //   let OG = HTML('og').txt()

  //   // Check OG 
  //   if(True){
  //     SEO.og = true
  //   } else{
  //     SEO.og = false
  //   }
  //   PageData.og = OG  
    
  // } 

  PageData.title = title

  return {
    TestResults,
    PageData
  }


} 



exports.getHTML = async (url) =>{
  let HTML = await loadUrl(url)
  return HTML
  console.log(HTML('title').text()) 

}
