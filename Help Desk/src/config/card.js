import request from 'request'
import Pipefy from './pipefy'
import moment from 'moment'
import 'moment/locale/pt-br'
import * as Sentry from '@sentry/browser';

export default function(cardId, setCard, setModalViewTicket, setSnack) {
    if(cardId){
        //eslint-disable-next-line
        request(Pipefy(`{  \"query\": \"{ card(id: ${cardId}) { id title age createdAt done current_phase { name } due_date fields{ field { id } name value } } } }\"}`) 
        , async (error, response, body) => {
            if(error){
                Sentry.captureException(error);
            }    
            const dados = JSON.parse(body).data;
            const cartao = dados.card
            //console.log(cartao)
            if(cartao){
                let categoria = false
                let setor = false
                let anexos = false
                let descricao = false

                for (var i = 0; i <  cartao.fields.length; i++) {
                    if(categoria !== false && setor !== false && anexos !== false && descricao !== false){
                        break
                    }else{
                        if(cartao.fields[i].field.id === "categoria"){
                            categoria = cartao.fields[i].value
                        }else if(cartao.fields[i].field.id === "setor"){
                            setor = cartao.fields[i].value
                        }else if(cartao.fields[i].field.id === "anexos_ticket"){
                            if(cartao.fields[i].value !== ''){
                                anexos = cartao.fields[i].value.split('\n')
                            }else{
                                anexos = cartao.fields[i].value
                            }
                        }else if(cartao.fields[i].field.id === "descri_o"){
                            descricao = cartao.fields[i].value
                        }
                        
                    }
                }
                setCard({id: cartao.id,
                titulo: cartao.title, 
                fase: cartao.current_phase.name, 
                criado: moment(cartao.createdAt).format('DD/MM/YYYY HH:mm'),
                concluido: cartao.done ? 'Sim' : 'Não',
                previsao: !cartao.due_date ? false : moment(cartao.due_date).format('DD/MM/YYYY'),
                descricao, anexos, categoria, setor})
            }
            setModalViewTicket(true)
        }, function (errorObject) {
            if(errorObject){
                Sentry.captureException(errorObject);
            } 
            setCard([])
            setModalViewTicket(false)
            setSnack({ open: true,  mensagem: "Houve problemas ao buscar informações do Ticket!"})
        })
    }
}