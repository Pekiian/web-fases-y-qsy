

const btn = document.querySelector('button')
const mm = document.querySelector('#mm')
const mv = document.querySelector('#mv')
const vv = document.querySelector('#vv')
const respuestas = document.querySelector('#respuestas')

class Elemento{
    constructor(nombre, cantidad, unidad, estado, densidad){
        this.nombre = nombre
        this.estado = estado
        if(unidad == 'g' && estado == 'n'){
            this.masa = cantidad
            this.volumen = 0
        } else if(unidad == 'g' && estado == 's'){
            this.masa = cantidad
            this.volumen = cantidad / densidad
        } else if(unidad == 'ml'){
            this.masa = cantidad * densidad
            this.volumen = cantidad
        }
    }

    cososobrecoso(solutos, mov_a, mov_b){
        let xTotal = 0
        solutos.forEach(soluto => {
            // console.log(`Los slutos son: ${solutos}`)
            xTotal = xTotal + soluto.mov_a
        })
        
        console.log(`La respuesta es: ${parseFloat(this['masa'])*100 / xTotal}`)
    }

    mm(solutos){
        let xTotal = 0
        //console.log(`Solutos: ${solutos}`)
        solutos.forEach(soluto => {
            xTotal +=parseFloat(soluto['masa'])
            //console.log(`Ta troll? ${soluto['masa']}`)
        })

        //console.log(`Los solutos: ${solutos}; \n El volumenTotal: ${xTotal}; \n This: ${this}`)

        console.log(`Este es: ${JSON.stringify(this)}\n masa: ${this['masa']*100} \n xTotal: ${xTotal}`)
        return (this['masa']*100 / parseFloat(xTotal)).toFixed(3)
    }

    mv(solutos){
        //this.cososobrecoso(solutos, 'masa', 'volumen')
        let volumenTotal = 0
        solutos.forEach(soluto => {
            volumenTotal += parseFloat(soluto['volumen'])
        })
        return (this['masa']*100 / parseFloat(volumenTotal)).toFixed(3)
    }

    vv(solutos){
        if(this.estado == 'n'){
            return 'No se puede calcular'
        } else{
            let xTotal = 0
            solutos.forEach(soluto => {
                // console.log(`Los slutos son: ${solutos}`)
                xTotal += parseFloat(soluto['volumen'])
            })
            
            return (this['volumen']*100 / parseFloat(xTotal)).toFixed(3)
        }
    }


}

btn.addEventListener('click', (e) => {
    e.preventDefault()
    let solvente = document.querySelector('#solvente').value
    let componentes = document.querySelector('#componentes').value.split('\n')    
    
    //0: elemento; 1:cantidad; 2: ml/g;
    let solventeSplited = prePrerpocesar(solvente)
    //let miSolvente = new Elemento(solventeSplited[0], solventeSplited[1], solventeSplited[2], solventeSplited[3], solventeSplited[4])

    let elementos = []

    componentes.forEach(componente => {
        let componenteSplited = prePrerpocesar(componente)
        elementos.push(new Elemento(componenteSplited[0], componenteSplited[1], componenteSplited[2], componenteSplited[3], componenteSplited[4]))
    });

    console.log(`Elementos: ${JSON.stringify(elementos)}`)

    let solutos = []
    solutos.push(componentes.map(componente => prePrerpocesar(componente)))
    solutos[0].push(solventeSplited)
    //console.log(JSON.stringify(solutos))
    let solutos2 = []
    solutos2.push(solutos[0].map(soluto => new Elemento(soluto[0],soluto[1],soluto[2],soluto[3],soluto[4])))

    //solutos2.forEach(lol => console.log(`Lol: ${JSON.stringify(lol)}`))

    solutos2[0].forEach(elemento => {
        if(elemento['nombre'] != 'agua'){
            mm.innerHTML+=`<p>${elemento.mm(solutos2[0])}</p>`
            mv.innerHTML+=`<p>${elemento.mv(solutos2[0])}</p>`
            vv.innerHTML+=`<p>${elemento.vv(solutos2[0])}</p>`
        }
    })
})


const prePrerpocesar = (values) => {
    return values.split('-')
}