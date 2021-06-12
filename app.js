async function getBooks(pesquisado) {
    const request = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${pesquisado}&maxResults=12`)

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
        console.log(x)

        let card = document.createElement('div')
        card.setAttribute('class', 'card')
        card.setAttribute('id', `card${++cont}`)
        card.setAttribute('onclick', `apresentacao('card${cont}')`)

        let descricao = document.createElement('div')
        descricao.setAttribute('class', 'descricao')
        descricao.textContent = x.volumeInfo.description != null ? x.volumeInfo.description : 'Sem descrição.'

        let capa = document.createElement('img')
        capa.setAttribute('class', 'capa')
        capa.src = x.volumeInfo.imageLinks.thumbnail
        
        let molde = document.createElement('div')
        molde.setAttribute('class', 'molde')
        molde.appendChild(capa)

        let titulo = document.createElement('div')
        titulo.setAttribute('class', 'titulo')
        titulo.textContent = x.volumeInfo.title

        let dataPublicacao = document.createElement('div')
        dataPublicacao.setAttribute('class', 'dataPublicacao')
        x.volumeInfo.publishedDate = x.volumeInfo.publishedDate !== undefined ? x.volumeInfo.publishedDate.split('-',1) : 'Sem data'
        dataPublicacao.textContent = x.volumeInfo.publishedDate

        let dados = document.createElement('div')
        dados.setAttribute('class', 'dados')
        dados.appendChild(titulo)
        dados.appendChild(dataPublicacao)

        let idBook = x.id

        return {
            card,
            descricao,
            molde,
            dados, 
            idBook
        }
    })

    return databooks
}

function addBooksInTheDOM(b){
    document.querySelector('.areaDeResultados').innerHTML = ''

    for(let i = 0; i < b.length; i++){
        b[i].card.appendChild(b[i].molde)
        b[i].card.appendChild(b[i].dados)

        document.querySelector('.areaDeResultados').appendChild(b[i].card)
    }
}

let tema = document.querySelector('.inputBook')

document.querySelector('.pesquisador').addEventListener('click', async () => {
    let a = await prepBookForDOM(tema.value)

    addBooksInTheDOM(a)
})