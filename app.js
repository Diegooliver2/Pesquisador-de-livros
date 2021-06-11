let tema = document.querySelector('.inputBook')

async function getBooks(pesquisado) {
    const request = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${pesquisado}&maxResults=10`)

    return request.json()
}

let addBookInTheDOM = async (p) => {
    document.querySelector('.areaDeResultados').innerHTML = ''

    const data = await getBooks(p)

    let databooks = data.items.map(x => {

        let card = document.createElement('div')
        card.setAttribute('class', 'card')

        let titulo = document.createElement('div')
        titulo.setAttribute('class', 'titulo')
        titulo.textContent = x.volumeInfo.title

        let descricao = document.createElement('div')
        descricao.setAttribute('class', 'descricao')
        descricao.textContent = x.volumeInfo.description != null ? x.volumeInfo.description : 'Sem descrição.'

        let capa = document.createElement('div')
        capa.setAttribute('class', 'capa')
        capa.textContent = x.volumeInfo.imageLinks.thumbnail

        let dataPublicacao = document.createElement('div')
        dataPublicacao.setAttribute('class', 'dataPublicacao')
        dataPublicacao.textContent = x.volumeInfo.publishedDate

        card.appendChild(titulo)
        card.appendChild(descricao)
        card.appendChild(capa)
        card.appendChild(dataPublicacao)

        document.querySelector('.areaDeResultados').appendChild(card)
    })
}

let btnPesq = document.querySelector('.pesquisador')

btnPesq.addEventListener('click', () => {
    addBookInTheDOM(tema.value)
})

/**/