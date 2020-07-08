import firebase  from 'firebase/app'
import request from 'request'
import Pipefy from './pipefy'
import moment from 'moment'
import 'moment/locale/pt-br'
import * as Sentry from '@sentry/browser';

export default function(setCartoes, setLoading, setSnack) {
    const uid = localStorage.getItem("id_token")
    setLoading(true)
    firebase.database().ref(`/usuarios/${uid}/cartoes`)
    .on("value", function(snapshot) {
        const cardIds = snapshot.val()
        if(cardIds){
            let sql =  "{  \"query\": \"{";
            Object.keys(cardIds).forEach((key) => {
                sql += `c${key}: card(id: ${key}) { id title age createdAt done current_phase { name } due_date fields{ field { id } name value } } `
            });
            sql += " }\"}"

            request(Pipefy(sql) , async (error, response, body) => {
                if(error){
                    Sentry.captureException(error);
                } 
                const dados = JSON.parse(body).data;
                //console.log(dados)
                const cards  = []
                Object.keys(dados).forEach(function(key) {
                    const cartao = dados[key]
                    if(cartao){
                        let categoria = false
                        let setor = false

                        for (var i = 0; i <  cartao.fields.length; i++) {
                            if(categoria !== false && setor !== false){
                                break
                            }else{
                                if(cartao.fields[i].field.id === "categoria"){
                                    categoria = cartao.fields[i].value
                                }
                                if(cartao.fields[i].field.id === "setor"){
                                    setor = cartao.fields[i].value
                                }
                            }
                        }
                        cards.push({id: cartao.id,
                        titulo: cartao.title, 
                        fase: cartao.current_phase.name, 
                        criado: moment(cartao.createdAt).format('DD/MM/YYYY HH:mm'),
                        concluido: cartao.done ? 'Sim' : 'Não',
                        previsao: !cartao.due_date ? false : moment(cartao.due_date).format('DD/MM/YYYY'),
                        categoria, setor})
                    }
                    
                })
                setCartoes(cards)
                setLoading(false)
            }, function (errorObject) {
                if(errorObject){
                    Sentry.captureException(errorObject);
                } 
                setCartoes([])
                setLoading(false)
                setSnack({ open: true,  mensagem: "Houve problemas ao buscar informações, pode haver divergências no acesso!"})
            })
        }else{
            setLoading(false)
        }
    })
}
