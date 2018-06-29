const request = require('request');
const cheerio = require('cheerio');
const fetch = require('isomorphic-unfetch')
const towser = require('cheerio')
// tags: ["//link[@hreflang]", "//h1", "//title", "//meta[@name='description']"],

loadUrl = async (url) => {
 
  const scrape = {
    parentXpath: null,
    childXpath: "//html",
    tags:  ["//link[@hreflang]", "//h1", "//title", "//meta[@name='description']"],
    attributes: ['hreflang', 'text', 'id', 'content', 'name']
  }

  let fgfdd = await require('./lib/scraper')('https://www.jcrew.com', scrape)
 
}


// Feed Site MAp ?? 
// USAGE 


towser.check()

exports.SEOCheck = async (url, options) => {
  
  
  let HTML = await loadUrl(url)
  
  // if(HTML != false){

  // SEO = {}
  // PageData = {}

  // let title = HTML('title').text()

  // console.log(HTML("meta[name='description']").html())
  // // let heading1 = HTML('h1').text() 
  // // let canonnical = HTML('canonical').txt()
  
  // if(title.lenght > 0 ){
  //   SEO.title = true
  // } else {
  //   SEO.title = false
  // }

  // // if(options.og){
  // //   let OG = HTML('og').txt()

  // //   // Check OG 
  // //   if(True){
  // //     SEO.og = true
  // //   } else{
  // //     SEO.og = false
  // //   }
  // //   PageData.og = OG  
    
  // // } 

  // PageData.title = title

  // return {
  //   SEO,
  //   PageData
  // }

  // }


  

} 



exports.getHTML = async (url) =>{
  let HTML = await loadUrl(url)
  return HTML
  console.log(HTML('title').text()) 

}
