import Cookie from 'js-cookie';

var useCookie = (function() {
    var full_name = "";
  
    var getCookie = (name, params ) => {
      return  Cookie.get(name, params) ;    // Or pull this from cookie/localStorage
    };

    var setCookie = (name, value) => {
        const expD = new Date().getTime() + 60 * 1000;
      full_name = Cookie.set(name, value, {
        expires : expD
      });     
      // Also set this in cookie/localStorage
    };

    /**
     * Fonction de récupération des cookies
     * @param {String} name - nom du cookie
     * @returns {Boolean} true|false - true s'il existe et false si non
     */
    var existCookie = (name) => {
      if ( Cookie.get(name) != undefined || Cookie.get(name) != null || Cookie.get(name) != '') {
        return true
      } else {
        return false
      }
    };
  
    return {
        getCookie,
        setCookie,
        existCookie,
    }
  
  })();
  
  export default useCookie;