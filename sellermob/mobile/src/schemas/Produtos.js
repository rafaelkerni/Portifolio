export default class Produtos{
    static schema = {
        name: 'produtos',
        primaryKey: 'id',
        properties:{
            id: { type: 'int', indexed: true },
            codigo: {type: 'string', optional: true},
            situacao: 'string',
            grupo_id: {type: 'int', optional: true},
            nome: 'string',
            descricao: {type: 'string', optional: true},
            imagem: {type: 'string', optional: true},
            campos: {type: 'string', optional: true},
            detalhes: {type: 'string', optional: true},
            created_at: {type: 'string', optional: true},
            updated_at: {type: 'string', optional: true},
            delete_at: {type: 'string', optional: true}
        }
    }
}