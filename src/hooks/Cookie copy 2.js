import Cookie from 'js-cookie';

var useCookie = (function() {
  
  
    var getCookie = (name ) => {

      var result = document.cookie.match(new RegExp(name + '=([^;]+)'));
      result && (result = JSON.parse(result[1]));
      return result;    // Or pull this from cookie/localStorage
    };

    var setCookie = (name, value) => {
        const expD = 60*30*1000 // expd = 30min - new Date().getTime() + 60 * 1000;
        
        var data = [name, '=', JSON.stringify(value), '; domain=.', window.location.host.toString(), ';path=/;expires='+ expD].join('');
        document.cookie = data;
        console.log('cookie ' + document.cookie) 
      // Also set this in cookie/localStorage
    };
 
    var delCookie = (name) => {
      document.cookie = [name, '=; expires=Thu, 01-Jan-1970 00:00:01 GMT; path=/; domain=.', window.location.host.toString()].join('');
    }

    /**
     * Fonction de récupération des cookies
     * @param {String} name - nom du cookie
     * @returns {Boolean} true|false - true s'il existe et false si non
     */
    var ifCookie = (name) => {
      if ( getCookie(name) !== undefined && getCookie(name) !== null && getCookie(name) != '') 
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