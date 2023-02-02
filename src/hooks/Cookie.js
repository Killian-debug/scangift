import Cookie from 'js-cookie';

var useCookie = (function() {
  
  
    var getCookie = (name ) => {
      var x = Cookie.get(name)
      return x;    // Or pull this from cookie/localStorage
    };

    var setCookie = (name, value, min = 1440) => {
        //var expD = new Date(new Date().getTime() + 1 * 60 * 1000);
        // cookie de 15min
      
        var duration = new Date(new Date().getTime() + min * 60 * 1000);
        const d = JSON.stringify({
          value : value,
          expiry : duration
        })

        Cookie.set(name, d , {
          expires : duration
        })
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
      if ( Cookie.get(name) !== undefined && Cookie.get(name) !== null && Cookie.get(name) !== '') 
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