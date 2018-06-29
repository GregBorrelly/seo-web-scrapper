const { Builder, By, promise} = require('selenium-webdriver')
const chrome = require('selenium-webdriver/chrome')
const { path } = require('chromedriver')

const getAllAttributes = (webEl, attributes) => new Promise((resolve, reject) => {
      const promises = attributes.map(attr => { 
          if(attr == 'text'){
              let text =  webEl.getText().then( text => text)
              return text
          } else {
          return webEl.getAttribute(attr) }
      })
      Promise.all(promises).then(results => resolve(results))
          .catch(error => reject(error))
  })

const scraper = (baseUrl, {childXpath, parentXpath, tags, attributes}) =>
  new Promise(async (resolve, ) => {
    const scraped = {}

    const driver = await new Builder()
    .forBrowser('chrome')
    .setChromeOptions(new chrome.Options().headless())
    .build()

    await driver.get(baseUrl)

    await driver.findElement(By.className(
      "email-capture--close modal-capture--close js-email-capture--close"
    )).click()

    const parent = (parentXpath !== null) ? parentXpath : "//main[@class='global__main']"

    const navLink = await driver.findElement(By.xpath(parent))

    await driver
      .actions({ bridge: true })
      .move({ origin: navLink })
      .pause()
      .perform()
      .then(async () => {
        const childElement = await driver.findElement(By.xpath(childXpath))
        

        for (let index = 0; index < tags.length; index++) {
            formattedTag = tags[index].replace('//', '')
            scraped[formattedTag] = [] 
            await childElement.findElements(By.xpath(tags[index])).then(async els => {
                await promise.map(els, el => getAllAttributes(el, attributes))
                    .then(result => {
                        for(let i = 0; i < result.length; i+=1) {
                          scraped[formattedTag][i] = {}
                          for(let x = 0; x < attributes.length; x+=1) {
                            if(result[i][x]){
                                scraped[formattedTag][i][attributes[x]] = result[i][x]
                            } 
                          }
                          
                            scraped[formattedTag].push(scraped[formattedTag][i])
                        
                          
                        }

                        scraped[formattedTag] = scraped[formattedTag].filter( element => { 
                            if( Object.keys(element).length != 0) return element
                         } )
                     })
              })
            
        }
       
    })

    await driver.quit()

    resolve(scraped)
})


module.exports = (baseUrl, scrape) => scraper(baseUrl, scrape)
