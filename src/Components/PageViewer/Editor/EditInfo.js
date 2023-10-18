export default function EditInfo({ target, state }) {
  const infoElement = document.createElement('div')
  infoElement.setAttribute('class', 'pageViewer_editor_info')
  target.appendChild(infoElement)

  const { createdAt, updatedAt } = state

  const createdAtElement = document.createElement('p')
  createdAtElement.setAttribute('class', 'pageViewer_editor_info_createdAt')
  createdAtElement.textContent = `생성일시 : ${createdAt}`
  infoElement.appendChild(createdAtElement)

  const updatedAtElement = document.createElement('p')
  updatedAtElement.setAttribute('class', 'pageViewer_editor_info_updatedAt')
  updatedAtElement.textContent = `생성일시 : ${updatedAt}`
  infoElement.appendChild(updatedAtElement)
}
