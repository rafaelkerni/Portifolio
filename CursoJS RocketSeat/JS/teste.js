function checaIdade(idade) {
  return new Promise(function(resolve, reject) {
    //await(2000);
    setTimeout(() => {
      if (idade > 18) {
        resolve();
      } else {
        reject();
      }
    }, 2000);
  });
}

checaIdade(20)
  .then(function() {
    console.log("Maior que 18");
  })
  .catch(function() {
    console.log("Menor que 18");
  });


  var repos = [];
  var inputElement = document.querySelector('#app input');
  var buttonElement = document.querySelector('#app button');
  var listElement = document.querySelector('#app ul');

  function renderRepos(){
    listElement.innerHTML = '';

    for(rep of repos){
      var repElement = document.createElement('li');
      var repName = document.createTextNode(rep);

      repElement.appendChild(repName);   
      listElement.appendChild(repElement);
    }

  }

  function pesquisar(){
    var userText = inputElement.value;  
    axios.get('https://api.github.com/users/'+ userText +'/repos')
    .then(function(resolve){
      listElement.innerHTML = "";
      repos = [];
      var carregandoElement = document.createElement('li');
      var carregandName = document.createTextNode("Carregando");
      carregandoElement.classList.add('carregando');

      carregandoElement.appendChild(carregandName);   
      listElement.appendChild(carregandoElement);

      var result = JSON.parse(resolve.request.response);
      result.forEach(element => {
          repos.push(element.name);
          renderRepos();          
      });
    })
    .catch(function(error){
        console.warn(error);
    });
  }

  buttonElement.onclick = pesquisar;