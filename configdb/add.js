const classImovel = require('./classImovel');


async function main(){
    await classImovel.start();
    await classImovel.consultadiaatual();
    await classImovel.close();
}

main();