const inputTarefa = document.querySelector('.input-tarefa')
const btnTarefa = document.querySelector('.btn-tarefa')
const tarefas = document.querySelector('.tarefas')

function criaLi() {
  const li = document.createElement('li')
  return li
}

inputTarefa.addEventListener('keypress', function (event) {
  if (event.keyCode === 13) {
    if (!inputTarefa.value) return
    criaTarefa(inputTarefa.value)
  }
})

function clearInput() {
  inputTarefa.value = ''
  inputTarefa.focus()
}

function criaBotaoApagar(li) {
  li.innerTex += ' '
  const botaoApagar = document.createElement('button')
  botaoApagar.innerHTML = 'Apagar'
  botaoApagar.setAttribute('class', 'apagar')
  botaoApagar.setAttribute('title', 'Apagar essa tarefa')
  li.appendChild(botaoApagar)
}

function criaTarefa(textoInput) {
  const li = criaLi()
  li.innerHTML = textoInput
  tarefas.appendChild(li)
  clearInput()
  criaBotaoApagar(li)
  salveTarefas()
}

btnTarefa.addEventListener('click', function () {
  if (!inputTarefa.value) return
  criaTarefa(inputTarefa.value)
})

document.addEventListener('click', function (event) {
  const el = event.target

  if (el.classList.contains('apagar')) {
    el.parentElement.remove()
    salveTarefas()
  }
})

function salveTarefas() {
  const liTarefas = tarefas.querySelectorAll('li')
  const listaDeTarefas = []

  for (let tarefa of liTarefas) {
    let tarefaTexto = tarefa.innerText
    tarefaTexto = tarefaTexto.replace('Apagar', '').trim()
    listaDeTarefas.push(tarefaTexto)
  }

  const tarejasJSON = JSON.stringify(listaDeTarefas)
  localStorage.setItem('tarefas', tarejasJSON)
}

function adicionaTarefasSalvas() {
  const tarefas = localStorage.getItem('tarefas')
  const listaDeTarefas = JSON.parse(tarefas)

  for (let tarefa of listaDeTarefas) {
    criaTarefa(tarefa)
  }
}
adicionaTarefasSalvas()
