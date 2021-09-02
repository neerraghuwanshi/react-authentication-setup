let dev = false;

let mainUrl = 'https://express-authentication-setup.herokuapp.com'

if (dev){
    mainUrl = 'http://localhost:8000'
}

export default mainUrl