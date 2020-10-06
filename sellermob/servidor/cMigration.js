const { exec } = require('child_process')
 


 const migrations = () => {
    
    const banco = process.argv[2]
    const migration = process.argv[3]

    if((typeof banco !== 'undefined') && (typeof migration !== 'undefined')){
        if(['a', 'd'].includes(banco))  {
            //    
            const cmd = `cd /d ${__dirname} && knex migrate:make --knexfile ${banco == 'a' ? 'knexfile.js' : 'knexfileDados.js'} ${migration}`
            exec(cmd, (err, stdout, stderr) => {
                if (err) {
                    console.log(`Erro: ${err}`) 
                    return
                }
                if(stdout != '')
                    console.log(`Sucesso: ${stdout}`)
                if(stderr != '')
                    console.log(`Erro: ${stderr}`)
            })
        }else{
            if(!banco){
                console.log('Erro: É necessário informar o Banco!')
            }else if (!migration){
                console.log('Erro: É necessário informar a migration!') 
            }else{
                console.log(`Erro: Houve um erro ao criar o comando - banco:${banco} - migration:${migration}`) 
            }
        }
    }
}

migrations()

