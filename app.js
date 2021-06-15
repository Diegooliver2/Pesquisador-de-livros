async function getBooks(pesquisado) {
    const request = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${pesquisado}&maxResults=12`)

    return request.json()
}

let prepBookForDOM = async (p) => {
    const data = await getBooks(p)
    let cont = 0

    let databooks = data.items.map(x => {

        let card = document.createElement('div')
        card.setAttribute('class', 'card')
        card.setAttribute('id', `card${cont}`)
        card.setAttribute('onclick', `apresentacao('card${cont}', '${p}')`)
        cont++

        let titulo = document.createElement('p')
        titulo.setAttribute('class', 'titulo')
        titulo.textContent = x.volumeInfo.title

        let descricao = document.createElement('div')
        descricao.setAttribute('class', 'descricao')
        descricao.innerHTML = x.volumeInfo.description != null ? `<strong>DESCRIÇÃO:</strong> ${x.volumeInfo.description}` : 'Sem descrição.'
        
        let molde = document.createElement('div')
        molde.setAttribute('class', 'molde')

        let capa = document.createElement('img')
        capa.setAttribute('class', 'capa')
        if(x.volumeInfo.imageLinks !== undefined){
            capa.src = x.volumeInfo.imageLinks.thumbnail
            molde.appendChild(capa)
        } else {
            molde.appendChild(titulo)
        }

        console.log(molde, capa.src, x.volumeInfo)

        let dataPublicacao = document.createElement('p')
        dataPublicacao.setAttribute('class', 'dataPublicacao')
        x.volumeInfo.publishedDate = x.volumeInfo.publishedDate !== undefined ? x.volumeInfo.publishedDate.split('-',1) : 'Sem data'
        dataPublicacao.textContent = `Ano de lançamento: ${x.volumeInfo.publishedDate}`

        let idBook = x.id

        return {
            card,
            capa,
            titulo,
            dataPublicacao,
            descricao,
            molde,
            idBook
        }
    })

    return databooks
}

function addBooksInTheDOM(b){
    document.querySelector('.areaDeResultados').innerHTML = ''

    for(let i = 0; i < b.length; i++){
        b[i].card.appendChild(b[i].molde)

        document.querySelector('.areaDeResultados').appendChild(b[i].card)
    }
}

async function apresentacao(ident, p){
    let telaDoLivro = document.createElement('div')
    telaDoLivro.setAttribute('class', 'telaDoLivro')

    let btnFechar = document.createElement('div')
    btnFechar.setAttribute('class', 'btnFechar')
    btnFechar.textContent = 'x'

    telaDoLivro.appendChild(btnFechar)
    document.querySelector('.areaDeResultados').appendChild(telaDoLivro)

    function removeAllData() {
        document.querySelector('.areaDeResultados').removeChild(telaDoLivro)
    }

    btnFechar.addEventListener('click', () => {
        removeAllData()
    })
    telaDoLivro.addEventListener('click', () => {
        removeAllData()
    })

    let i = ident.substr(4)
    console.log(i)

    let dadosDoLivro = await prepBookForDOM(p)
    let livro = document.createElement('div')
    livro.setAttribute('class', 'livro')
    
    let = mld = dadosDoLivro[i].molde
    let = ttl = dadosDoLivro[i].titulo
    let = dscc = dadosDoLivro[i].descricao    
    let = dataP = dadosDoLivro[i].dataPublicacao

    livro.appendChild(mld)
    livro.appendChild(ttl)
    livro.appendChild(dscc)
    livro.appendChild(dataP)

    console.log(dadosDoLivro[i])

    telaDoLivro.appendChild(livro)
}

let tema = document.querySelector('.inputBook')

document.querySelector('.pesquisador').addEventListener('click', async () => {
    let a = await prepBookForDOM(tema.value)

    addBooksInTheDOM(a)
})