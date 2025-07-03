<script setup lang="ts">
import { reactive, ref, onMounted } from 'vue'
import NavbarComponent from '@/components/layout/NavbarComponent.vue'

if (localStorage.getItem('usuario_logado') !== 'true') {
  window.location.href = '/'
}

interface Product {
  nome: string
  preco: number
  lote: string
  validade: string
  quantidade: number
  localizacao: string
  fornecedor: string
}

interface FormData extends Product {}

const form = reactive<FormData>({
  nome: '',
  preco: 0,
  lote: '',
  validade: '',
  quantidade: 0,
  localizacao: '',
  fornecedor: '',
})

const productId = ref('')
const errors = reactive<{ id: string }>({ id: '' })
const showForm = ref(false)

function sanitizeHTML(value: string): string {
  const div = document.createElement('div')
  div.textContent = value
  return div.innerHTML.trim()
}

function sanitizeInput(): void {
  productId.value = sanitizeHTML(productId.value)
}

function validateId(): boolean {
  const idValue = productId.value.trim()
  if (!idValue || isNaN(+idValue)) {
    errors.id = 'ID inválido ou vazio.'
    return false
  }
  errors.id = ''
  return true
}

async function fetchProduct() {
  sanitizeInput()
  if (!validateId()) {
    updateErrorDisplay()
    return
  }

  try {
    const res = await fetch(`http://localhost:3000/api/v1/products/${productId.value}`)
    if (!res.ok) throw new Error('Produto não encontrado.')

    const product = await res.json()

    form.nome = product.data.nome
    form.preco = product.data.preco
    form.lote = product.data.lote
    form.validade = product.data.validade
    form.quantidade = product.data.quantidade
    form.localizacao = product.data.localizacao
    form.fornecedor = product.data.fornecedor

    showForm.value = true
    errors.id = ''
    updateErrorDisplay()
  } catch (error) {
    console.error(error)
    errors.id = `A busca pelo ID #${productId.value} não corresponde a nenhum produto do sistema.`
    updateErrorDisplay()
  }
}

function updateErrorDisplay(): void {
  const errorSpan = document.getElementById('alert-error')
  if (errorSpan) errorSpan.textContent = errors.id
}

async function updateProduct() {
  try {
    const res = await fetch(`http://localhost:3000/api/v1/products/${productId.value}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form),
    })

    if (!res.ok) throw new Error('Erro ao atualizar produto.')

    alert('Produto atualizado com sucesso!')
  } catch (error) {
    console.error(error)
    alert('Erro ao atualizar produto.')
  }
}

onMounted(() => {
  const input = document.getElementById('idProduto') as HTMLInputElement
  if (input) {
    input.addEventListener('input', () => {
      productId.value = input.value
    })
  }
})
</script>

<template>
  <div class="w-5xl m-auto">
    <NavbarComponent />
    <div class="flex gap-2">
      <div
        class="form__editar mt-4 flex flex-col gap-2 w-2xl m-auto border-1 border-gray-100 p-4 rounded-sm"
      >
        <label for="idProduto" class="font-medium">ID do Produto</label>
        <input
          class="border-1 border-gray-200 p-2 rounded-sm text-sm"
          type="number"
          name="id"
          id="idProduto"
          placeholder="ex: 264"
        />
        <span id="alert-error" class="text-sm text-red-500"></span>
        <button
          type="button"
          class="btn-cadastrar border-1 border-gray-100 p-2 rounded-full text-lg"
          @click="fetchProduct"
        >
          BUSCAR!
        </button>
      </div>

      <div
        v-if="showForm"
        class="mt-4 flex flex-col gap-4 w-2xl m-auto border-1 border-gray-100 p-4 rounded-sm"
      >
        <label class="font-medium">Nome</label>
        <input v-model="form.nome" class="border p-2 rounded-sm text-sm" type="text" />

        <label class="font-medium">Preço</label>
        <input
          v-model="form.preco"
          class="border p-2 rounded-sm text-sm"
          type="number"
          step="0.01"
        />

        <label class="font-medium">Lote</label>
        <input
          v-model="form.lote"
          class="border p-2 rounded-sm text-sm bg-gray-100"
          type="text"
          disabled
        />

        <label class="font-medium">Validade</label>
        <input v-model="form.validade" class="border p-2 rounded-sm text-sm" type="date" />

        <label class="font-medium">Quantidade</label>
        <input v-model="form.quantidade" class="border p-2 rounded-sm text-sm" type="number" />

        <label class="font-medium">Localização</label>
        <input v-model="form.localizacao" class="border p-2 rounded-sm text-sm" type="text" />

        <label class="font-medium">Fornecedor</label>
        <input v-model="form.fornecedor" class="border p-2 rounded-sm text-sm" type="text" />

        <button
          type="button"
          class="btn-atualizar bg-blue-600 text-white p-2 rounded-full text-lg"
          @click="updateProduct"
        >
          ATUALIZAR PRODUTO!
        </button>
      </div>
    </div>
  </div>
</template>

<style>
.form__editar {
  box-shadow:
    rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
    rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
}

.btn-atualizar {
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
