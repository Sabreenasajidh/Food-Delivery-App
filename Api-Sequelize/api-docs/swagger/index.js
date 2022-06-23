//top informatiom section 
import info from './info.json'

import modules from './modules/index.js'
console.log(modules);

//import definitions
import definitions from './definitions/index.js'
//console.log(definitions);

//footer section
import footer from './footer.json'

let swaggerPayload = {
    ...info,
      ...modules,
      ...definitions,
      ...footer
}

export default swaggerPayload
