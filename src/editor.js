//편집화면 렌더링 
export default function Editor({
    $target,
    initialState = {
        title: '',
        content: ''
    },
    onEditing
}) {
    this.state = initialState
    const $editor = document.createElement('div')
    $editor.style.display = 'flex'
    $editor.style.flexDirection = 'column'

    $target.appendChild($editor)

    let isinitialize = true

    this.setState = (nextState) => {
        this.state = nextState
        console.log(nextState)
        $editor.querySelector('[name=title]').value = this.state.title
        $editor.querySelector('[name=content]').value = this.state.content
        //this.render()
    }

    this.render = () => {
        if (isinitialize) {
            $editor.innerHTML = `
            <input type = "text" name = "title" style = "width: 600px;" value = "${this.state.title}"/>
            <textarea name = "content" style = "width: 600px; height: 400px">${this.state.content}</textarea>
        `
            isinitialize = false
        }
    }
    this.render()


    $editor.addEventListener('keyup', e => {
        const {target} = e
        const name = target.getAttribute('name')
        if (this.state[name] !== undefined) {
            const nextState = {
                ...this.state,
                [name]: target.value
            }
            this.setState(nextState)
            onEditing(this.state)
        }
    })
}