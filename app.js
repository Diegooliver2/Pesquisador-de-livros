async function getBooks(pesquisado) {
    const request = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${pesquisado}&maxResults=10`)

    return request.json()
}

function apresentacao(ident){
    let livro = document.createElement('div')
    livro.setAttribute('class', 'livro')

    document.body.appendChild(livro)
}

let prepBookForDOM = async (p) => {
    const data = await getBooks(p)
    let cont = 0

    let databooks = data.items.map(x => {

        let card = document.createElement('div')
        card.setAttribute('class', 'card')
        card.setAttribute('id', `card${++cont}`)
        card.setAttribute('onclick', `apresentacao('card${cont}')`)

        let titulo = document.createElement('div')
        titulo.setAttribute('class', 'titulo')
        titulo.textContent = x.volumeInfo.title

        let descricao = document.createElement('div')
        descricao.setAttribute('class', 'descricao')
        descricao.textContent = x.volumeInfo.description != null ? x.volumeInfo.description : 'Sem descrição.'

        let capa = document.createElement('img')
        capa.setAttribute('class', 'capa')
        capa.src = x.volumeInfo.imageLinks.thumbnail

        let dataPublicacao = document.createElement('div')
        dataPublicacao.setAttribute('class', 'dataPublicacao')
        dataPublicacao.textContent = x.volumeInfo.publishedDate

        let idBook = x.id

        return {
            card,
            titulo,
            descricao,
            capa, 
            dataPublicacao, 
            idBook
        }

    })

    return databooks
}

function addBooksInTheDOM(b){
    for(let i = 0; i < b.length; i++){
        b[i].card.appendChild(b[i].capa)
        b[i].card.appendChild(b[i].titulo)

        document.querySelector('.areaDeResultados').appendChild(b[i].card)
    }
}

let tema = document.querySelector('.inputBook')

document.querySelector('.pesquisador').addEventListener('click', async () => {
    let a = await prepBookForDOM(tema.value)

    addBooksInTheDOM(a)
    //
})

/**/