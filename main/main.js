Vue.filter('capitalize', function(value) {
value = value.tostring();
  // value = value.toupperCase();
  value=value.charAt();
return value;
});
new Vue({
    el:"#capitalize",
    data:{ 
        message:""
    }
});