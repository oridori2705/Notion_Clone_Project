import { requestDocumentInfo } from '../apis/documents.js'
export default class Sidebar {
  constructor({ $target }) {
    this.$target = $target
    this.setup()
    this.fetchDirectory()
    this.setEvent()
  }
  setup() {
    //sidebar 안에 div들이 들어가야 함
    this.$sidebar = document.createElement('div')
    this.$sidebar.id = 'sidebar'
    this.$directory = document.createElement('div')
    this.$directory.id = 'directory'
    this.$add = document.createElement('div')
    this.$add.innerText = '추가'
  }
  renderTreeByDiv(data, parentElement) {
    for (const item of data) {
      const $node = document.createElement('div')
      const $button = document.createElement('button')
      $node.textContent = item.title
      $node.appendChild($button)
      $button.addEventListener('click', (e) => {
        e.stopPropagation()
        this.findNodeById(this.state, +e.target.parentNode.dataset.id)
        //해당 id값으로 post요청하면 -> 생성된 객체 전달
        //찾은 객체의 documents에 응답받은 데이터 넣으면 됨
      })
      $node.dataset.id = item.id
      $node.classList.add('document')
      parentElement.appendChild($node)
      if (item.documents.length) {
        this.renderTreeByDiv(item.documents, $node)
      }
    }
  }
  renderTreeByList(data, parentElement) {
    const $ul = document.createElement('ul')
    for (const item of data) {
      const $li = document.createElement('li')
      const $span = document.createElement('span')
      $span.innerText = item.title
      $li.appendChild($span)
      if (item.documents.length) {
        this.renderTreeByList(item.documents, $li)
      }
      $ul.appendChild($li)
    }
    parentElement.appendChild($ul)
  }

  createNewDocument(parentId) {
    const newDocument = {
      title: 'new document',
      parent: parentId ?? null,
    }
    requestDocumentInfo('documents', {
      method: 'POST',
      body: JSON.stringify(newDocument),
    }).then((data) => console.log(data))
    //추가했으면 -> 데이터 새로 요청할수도 or 현재 state에 껴넣을수도
  }

  findNodeById(data, targetId) {
    for (const item of data) {
      if (item.id === targetId) {
        console.log(item)
        return item
      }
      if (item.documents.length) {
        this.findNodeById(item.documents, targetId)
      }
    }
  }

  setState(nextState) {
    this.state = nextState
    this.replace()
  }

  render() {
    const fragment = new DocumentFragment()
    this.renderTreeByDiv(this.state, fragment)
    this.$directory.appendChild(fragment)
    this.$sidebar.appendChild(this.$directory)
    this.$sidebar.appendChild(this.$add)
    this.$target.appendChild(this.$sidebar)

    return fragment
  }

  replace() {
    const fragment = new DocumentFragment()
    this.renderTreeByDiv(this.state, fragment)
    this.$sidebar.replaceChild(fragment, this.prev)
    this.prevChildren = fragment
  }

  async fetchDirectory() {
    this.state = await requestDocumentInfo('documents')
    this.render()
  }

  setEvent() {
    this.$directory.addEventListener('click', (e) => {
      const { id } = e.target.dataset
      console.log(id)
      //
    })
    this.$add.addEventListener('click', (e) => this.createNewDocument())
  }
}