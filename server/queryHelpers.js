 module.exports = {
   dollarString : function(n) {
     let string = '';
     for (let i=1;i<=n;i++) {
       if (i>1) string+= ', ';
       string += '$'+i;
     }
     return string;
   }
 }
