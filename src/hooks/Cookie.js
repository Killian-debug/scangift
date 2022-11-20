import Cookie from 'js-cookie';

var useCookie = (function() {
  
  
    var getCookie = (name ) => {
      var x = Cookie.get(name)
    
      return x;    // Or pull this from cookie/localStorage
    };

    var setCookie = (name, value) => {
        const expD = new Date().getTime() + 60 * 1000;
        Cookie.set(name, JSON.stringify(value) , {
          expires : expD
        })
        console.log('cc : ' + JSON.parse(value))
        console.log('cok :' + Cookie.get(name))
    }; 
  
    var delCookie = (name) => {
      Cookie.remove(name)
    }

    /**
     * Fonction de récupération des cookies
     * @param {String} name - nom du cookie
     * @returns {Boolean} true|false - true s'il existe et false si non
     */
    function ifCookie(name){
      if ( Cookie.get(name) !== undefined && Cookie.get(name) !== null && Cookie.get(name) != '') 
        return true
      else return false
    };
  
    return {
        getCookie,
        setCookie,
        ifCookie,
        delCookie
    }
  
  })();
  
  export default useCookie;