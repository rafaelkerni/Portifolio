import Realm from 'realm';

import Config from '../schemas/Config'
import Imagem_Config from '../schemas/Imagem_Config'
import Categorias from '../schemas/Categorias'
import Grupos from '../schemas/Grupos'
import Produtos from '../schemas/Produtos'

export default function getRealm(){
    Realm.delete
    return Realm.open({
        schema:[Config, Imagem_Config, Categorias, Grupos, Produtos],
        schemaVersion: 7
    })
}