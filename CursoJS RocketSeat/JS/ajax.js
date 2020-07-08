/*var xhr = new XMLHttpRequest();
xhr.open('GET', 'https://www.googleapis.com/youtube/v3/channels?part=contentDetails&forUsername=viniccius13&key=AIzaSyDUHVRtsVJxQR7Eot_rDKBzmTw4jZEeiJY');
xhr.send(null);

xhr.onreadystatechange = function(){
    if(xhr.readyState === 4){
        console.log(JSON.parse(xhr.responseText));
    }
}*/

//var minhaPromise = function() {

/*
(function() {
    return new Promise(function(resolve, reject){
        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'https://www.googleapis.com/youtube/v3/channels?part=contentDetails&forUsername=viniccius13&key=AIzaSyDUHVRtsVJxQR7Eot_rDKBzmTw4jZEeiJY');
        xhr.send(null);

        xhr.onreadystatechange = function(){
            if(xhr.readyState === 4){
                if(xhr.status === 200){
                    resolve(JSON.parse(xhr.responseText));
                }else{
                    reject('Erro na requesição');
                }
            }
        }
    });
})().then(function(resolve){
    console.log(resolve);
})
.catch(function(error){
    console.warn(error);
});


 minhaPromise()
    .then(function(resolve){
        console.log(resolve);
    })
    .catch(function(error){
        console.warn(error);
    });
*/

axios.get('https://www.googleapis.com/youtube/v3/channels?part=contentDetails&forUsername=viniccius13&key=AIzaSyDUHVRtsVJxQR7Eot_rDKBzmTw4jZEeiJY')
.then(function(resolve){
    console.log(resolve);
})
.catch(function(error){
    console.warn(error);
});
