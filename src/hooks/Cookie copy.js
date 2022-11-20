import Cookie from 'js-cookie';

var useCookie = (function() {
    var annonce = {};
  
    var getCookie = (name ) => {

      function logCookie(cookie) {
        if (cookie) {
          console.log(cookie.value);
          return cookie.value
        }
      }
      function getCook(tabs) {
        let getting = browser.cookies.get({
          url: tabs[0].url,
          name: name
        });
        getting.then(logCookie);
      }
      
      let getActive = browser.tabs.query({
        active: true,
        currentWindow: true
      });
      getActive.then(getCook);
      //return  Cookie.get(name) ;    // Or pull this from cookie/localStorage
    };

    var setCookie = (name, value) => {
        const expD = new Date().getTime() + 60 * 1000;

        let getActive = browser.tabs.query({active: true, currentWindow: true});
        getActive.then(setCook);

        function setCook(tabs) {
          browser.cookies.set({
            url: tabs[0].url,
            name: name,
            value: value,
            expirationDate : expD
          });
        }
      //   annonce = Cookie.set(name, value, {
      //   expires : expD
      // });     
      // Also set this in cookie/localStorage
    };

    /**
     * Fonction de récupération des cookies
     * @param {String} name - nom du cookie
     * @returns {Boolean} true|false - true s'il existe et false si non
     */
    var existCookie = (name) => {
      if ( getCookie(name) != undefined && getCookie(name) != null && getCookie(name) != '') {
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