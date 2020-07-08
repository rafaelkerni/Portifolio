/*class List{
    constructor() {
        this.data = [];
    }

    add(data){
        this.data.push(data);
        console.log(this.data);
        
    }
}

class TodoList extends List{
    constructor(){
        super();

        this.usuario = 'Rafael';
    }

    mostraUsuario(){
        console.log(this.usuario);
    }
}

var MinhaLista = new TodoList();

document.getElementById('novotodo').onclick =  function(){
    MinhaLista.add('Novo todo');
} 

MinhaLista.mostraUsuario();

class Matematica{
    static soma(a, b){
        console.log(a+ b);
        
    }
}

Matematica.soma(1, 2);

const usuario = { nome: 'Rafael'};

usuario.nome = 'Dougras';

console.log(usuario); 

function teste(x) {
    //let y = 2;
    let y = 2;
    if(x > 5){
        //let y = 4;
        
        console.log(x, y);
        
    }
}



console.log(teste(10));

console.log(y);

//REST


const usuario = {
    nome: 'Rafael',
    idade: 25,
    empresa: 'WMC'
}

const { nome, ...resto} = usuario;

console.log(nome);
console.log(resto);

const arr = [1,2,3, 4];

const[a,b, ...c] = arr;

console.log(a);
console.log(b);
console.log(c);

function soma(a, b, ...params) {
    return params;
}

console.log(soma(1,2, 3, 4,5, 6,7));

//SPREAD

const arr1 = [1,2,3];
const arr2 = [4,5,6];
const arr3 = [...arr1, ...arr2];

console.log(arr3);

const usuario1 = {
    nome: 'Rafael',
    idade: 25,
    empresa: 'WMC'
}

const usuario2 = {... usuario1, nome: 'Gabriel'};

console.log(usuario2);


const nome = 'Rafael';
const idade = 25;

//console.log('Meu nome é ' + nome + ' e tenho ' + idade + ' anos');

console.log(`Meu nome é ${nome} e tenho ${idade} anos.`);


const nome = 'Rafael';
const idade = 25;

const usuario = {
    nome,
    idade,
    empresa: 'WMC',
}

console.log(usuario);


class Usuario{
    constructor(email, senha){
        this.email = email;
        this.senha = senha;
        this.admin = false;
    }

    isAdmin(){
        return this.admin;
    }
}

class Admin extends Usuario{
    constructor(email, senha){
        super(email, senha);
        this.admin = true;
    }
}

//const admin = new Admin('email', 'senha');

const User1 = new Usuario('email@teste.com', 'senha123');
const Adm1 = new Admin('email@teste.com', 'senha123');

console.log(User1.isAdmin()) // false
console.log(Adm1.isAdmin()) // true


//console.log(admin);*/
/*
const usuarios = [
    { nome: 'Diego', idade: 23, empresa: 'Rocketseat' },
    { nome: 'Gabriel', idade: 15, empresa: 'Rocketseat' },
    { nome: 'Lucas', idade: 30, empresa: 'Facebook' },
];

const idades = usuarios.map(function(item) {
    return item.idade;
});

console.log(idades);

const filtrar = usuarios.filter(function(item){
    return (item.empresa == 'Rocketseat') && (item.idade > 18);
});

console.log(filtrar);

const encontrar = usuarios.find(function(item){
    return (item.empresa == 'Google');
});

console.log(encontrar);

const usuariosA = usuarios.map(function(item) {
    item.idade = item.idade * 2;
    return item;
});

const filterA = usuariosA.filter(function(item){
    return item.idade <= 50;
});

console.log(filterA);*/

/*
const arr = [1, 2, 3, 4, 5];

const arr2 = arr.map(item =>item + 10);

console.log(arr2);


// Dica: Utilize uma constante pra function
const usuario = { nome: 'Diego', idade: 23 };

/*function mostraIdade(usuario) {
 return usuario.idade;
}
mostraIdade(usuario);

const mostraIdade2 = (usuario) => usuario.idade;

console.log(mostraIdade2(usuario));

// Dica: Utilize uma constante pra function
const nome = "Diego";
const idade = 23;

const mostraUser = (nome = 'Diego', idade = 18) => ({ nome, idade });

console.log(mostraUser(nome, idade));

console.log(mostraUser(nome));*/

//const promise = () => new Promise((resolve, reject) => resolve());
/*
const empresa = {
    nome: 'Rocketseat',
    idade: '2',
    endereco: {
    cidade: 'Rio do Sul',
    estado: 'SC',
    }
};

const { nome, endereco:{ cidade, estado }} = empresa;

console.log(nome);
console.log(cidade);
console.log(estado);

/*function mostraInfo(usuario) {
    return `${usuario.nome} tem ${usuario.idade} anos.`;
   }
   mostraInfo({ nome: 'Diego', idade: 23 })

function info({nome, idade}){
    return `$(nome) tem $(idade).`;
} 

const info = ({nome, idade}) => `${nome} tem ${idade}.`;

console.log(info(empresa));*/

/*const arr = [1, 2, 3, 4, 5, 6];

const [x, ...y] = arr;

console.log(x); // 1
console.log(y); // [2, 3, 4, 5, 6]


function soma(...params){
    return params.reduce((total, next) => total + next);
}

console.log(soma(1, 2, 3, 4, 5, 6));
console.log(soma(1, 2));

const usuario = {
    nome: 'Diego',
    idade: 23,
    endereco: {
        cidade: 'Rio do Sul',
        uf: 'SC',
        pais: 'Brasil',
    }
};
   
const usuario2 = {...usuario, nome: 'Gabriel'};

const usuario3 = {...usuario, endereco: { ...usuario.endereco, cidade: 'Lontras' } };

console.log(usuario3);

const usuario = 'Diego';
const idade = 23;
console.log(`O usuário ${usuario} possui ${idade} anos`);


const nome = 'Diego';
const idade = 23;

const usuario = {
 nome,
 idade,
 cidade: 'Rio do Sul',
};*/

//------- webpack ----------
/*
import * as funcoes from '../funcoes';
//import somaFunction from './soma';

console.log(funcoes);
console.log(funcoes.soma(1, 2));
console.log(funcoes.sub(3, 2));

*/

//------- await/sync ----------
/*
const minhaPromise = () => new Promise((resolve, reject) => {
    setTimeout(() => {resolve('OK')}, 2000)
});

/*minhaPromise().then(resolve => {
    console.log(resolve);
}).catch(err =>{

});

async function executaPromisse() {
    const resolve = await minhaPromise();
    console.log(resolve);
}

executaPromisse();

const executaPromisse2 = async () =>{
    console.log(await minhaPromise());
    console.log(await minhaPromise());
    console.log(await minhaPromise());
};

executaPromisse2();

import axios from 'axios';

class api {
  static async getUserInfo(username){
    try{
    const response = await axios.get(`https://api.github.com/users/${username}`);
        console.log(response);
    }catch(err){    
        console.warn('Erro na API');
    }
    
  }
}

api.getUserInfo('diego3g');
api.getUserInfo('diego3gs');*/


//------- aplicacao ----------

import api from './api';

class App{

    constructor(){
        this.repositories = [];

        this.formEl = document.getElementById('repo-form');
        this.inputEl = document.querySelector('input[name=repository]');
        this.listEl = document.getElementById('repo-list');

        this.registerHandlers();
    }

    registerHandlers(){
        this.formEl.onsubmit = event => this.addRepository(event);
    }

    setLoading(loading = true){
        if(loading === true){
            let loadingEl = document.createElement('span');
            loadingEl.appendChild(document.createTextNode('Carregando...'));
            loadingEl.setAttribute('id', 'loading');
            
            this.formEl.appendChild(loadingEl);
        }else{
            document.getElementById('loading').remove();
        }
    }

    async addRepository(event){
        event.preventDefault();

        const repoInput = this.inputEl.value;

        if(repoInput.length === 0){
            return;
        }

        this.setLoading();

        try{
            const response = await api.get(`/repos/${repoInput}`);

            const { name, description, html_url, owner: { avatar_url }} = response.data;
                
            this.repositories.push({
                name,
                description,
                avatar_url,
                html_url,
            });

            this.inputEl.value = '';

            this.render();
        }catch(err){
            alert('O repositório não existe!');
        }

        this.setLoading(false);
        
    }

    render(){
        this.listEl.innerHTML = '';

        this.repositories.forEach(repo => {
            let imgEl = document.createElement('img');
            imgEl.setAttribute('src', repo.avatar_url);

            let titleEl = document.createElement('strong');
            titleEl.appendChild(document.createTextNode(repo.name));

            let descriptionEl = document.createElement('p');
            descriptionEl.appendChild(document.createTextNode(repo.description));

            let linkEl = document.createElement('a');
            linkEl.setAttribute('target', '_blank');
            linkEl.setAttribute('href', repo.html_url);
            linkEl.appendChild(document.createTextNode('Acessar'));

            let listItemEl = document.createElement('li');
            listItemEl.appendChild(imgEl);
            listItemEl.appendChild(titleEl);
            listItemEl.appendChild(descriptionEl);
            listItemEl.appendChild(linkEl);

            this.listEl.appendChild(listItemEl);
        });
    }

}

//const MeuApp = new App();
new App();







   

