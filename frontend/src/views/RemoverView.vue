<script setup lang="ts">
import NavbarComponent from '@/components/layout/NavbarComponent.vue'
import { reactive, onMounted } from 'vue'

if (localStorage.getItem('usuario_logado') !== 'true') {
  window.location.href = '/'
}

interface RemoveForm {
  id: string
}

const form = reactive<RemoveForm>({ id: '' })
const errors = reactive<Record<keyof RemoveForm, string>>({ id: '' })

function sanitizeHTML(value: string): string {
  const div = document.createElement('div')
  div.textContent = value
  return div.innerHTML.trim()
}

function sanitizeForm(): void {
  form.id = sanitizeHTML(form.id)
}

function validateForm(): boolean {
  const idValue = form.id.trim()
  if (!idValue || isNaN(+idValue)) {
    errors.id = 'ID inválido ou vazio.'
    return false
  }
  errors.id = ''
  return true
}

async function removeProduct(id: number): Promise<void> {
  try {
    const res = await fetch(`http://localhost:3000/api/v1/products/${id}`, {
      method: 'DELETE',
    })

    if (!res.ok) throw new Error('Erro na resposta do servidor.')

    alert('Produto removido com sucesso!')
    window.location.reload()
  } catch (error) {
    console.error(error)
    alert('Erro ao remover produto.')
  }
}

function submitForm(e: Event): void {
  e.preventDefault()
  sanitizeForm()

  if (!validateForm()) {
    updateErrorDisplay()
    return
  }

  updateErrorDisplay()
  removeProduct(parseInt(form.id, 10))
}

function updateErrorDisplay(): void {
  const errorSpan = document.getElementById('alert-error')
  if (errorSpan) errorSpan.textContent = errors.id
}

onMounted(() => {
  const input = document.getElementById('idProduto') as HTMLInputElement
  const formEl = document.querySelector('form')

  if (input) {
    input.addEventListener('input', () => (form.id = input.value))
  }

  if (formEl) {
    formEl.addEventListener('submit', submitForm)
  }
})
</script>

<template>
<div class="container__remover w-5xl m-auto">
  <NavbarComponent />
  <div class="form__remover mt-4 w-2xl m-auto">
    <form
      class="form_produto flex flex-col gap-4 border-1 border-gray-100 p-4 rounded-sm"
    >
      <div class="form__field flex flex-col gap-2 border-b-1 border-gray-200 pb-3">
        <label for="idProduto" class="font-medium">ID do Produto</label>
        <input
          type="number"
          id="idProduto"
          placeholder="ex: 234"
          class="border-1 border-gray-200 p-2 rounded-sm text-sm"
        />
        <span id="alert-error" class="text-sm text-red-500"></span>
      </div>

      <button
        type="submit"
        class="btn-remover border-1 border-gray-100 p-2 rounded-full text-lg"
      >
        REMOVER!
      </button>
    </form>
  </div>
</div>
</template>

<style>
.form_produto {
  box-shadow:
    rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
    rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
}

.btn-remover {
  font-weight: 600;
  padding: 6px;
  color: #ffff;
  cursor: pointer;
  background: #842a9b;
  background: -webkit-linear-gradient(90deg, rgba(132, 42, 155, 1) 0%, rgba(219, 83, 237, 1) 100%);
  background: -moz-linear-gradient(90deg, rgba(132, 42, 155, 1) 0%, rgba(219, 83, 237, 1) 100%);
  background: linear-gradient(90deg, rgba(132, 42, 155, 1) 0%, rgba(219, 83, 237, 1) 100%);
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#842A9B", endColorstr="#DB53ED", GradientType=1);
  box-shadow:
    rgba(0, 0, 0, 0.02) 0px 1px 3px 0px,
    rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
}
</style>