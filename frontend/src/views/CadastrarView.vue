<script setup lang="ts">
import NavbarComponent from '@/components/layout/NavbarComponent.vue'

if (localStorage.getItem('usuario_logado') !== 'true') {
  window.location.href = '/'
}

import { reactive } from 'vue'

interface ProductForm {
  nome: string
  preco: string
  lote: string
  validade: string
  quantidade: string
  localizacao: string
  fornecedor: string
}

const form = reactive<ProductForm>({
  nome: '',
  preco: '',
  lote: '',
  validade: '',
  quantidade: '',
  localizacao: '',
  fornecedor: '',
})

const errors = reactive<Record<keyof ProductForm, string>>({
  nome: '',
  preco: '',
  lote: '',
  validade: '',
  quantidade: '',
  localizacao: '',
  fornecedor: '',
})

function sanitize(value: string) {
  const div = document.createElement('div')
  div.textContent = value
  return div.innerHTML.trim()
}

const rules: Record<keyof ProductForm, (v: string) => string | null> = {
  nome: (v) => (v.trim() ? null : 'O nome do produto é obrigatório.'),
  preco: (v) => (v && !isNaN(+v) ? null : 'Preço inválido ou vazio.'),
  lote: (v) => (v.trim() ? null : 'O lote do produto é obrigatório.'),
  validade: (v) => (v.trim() ? null : 'A validade é obrigatória.'),
  quantidade: (v) => (v && !isNaN(+v) ? null : 'Quantidade inválida ou vazia.'),
  localizacao: (v) => (v.trim() ? null : 'A localização é obrigatória.'),
  fornecedor: (v) => (v.trim() ? null : 'O fornecedor é obrigatório.'),
}

function sanitizeForm() {
  ;(Object.keys(form) as Array<keyof ProductForm>).forEach((key) => {
    form[key] = sanitize(form[key])
  })
}

function validateForm(): boolean {
  let valid = true
  ;(Object.keys(rules) as Array<keyof ProductForm>).forEach((key) => {
    const errorMsg = rules[key](form[key])
    errors[key] = errorMsg || ''
    if (errorMsg) valid = false
  })
  return valid
}

async function submitForm(e: Event) {
  e.preventDefault()
  sanitizeForm()
  if (!validateForm()) return

  const payload = {
    ...form,
    preco: parseFloat(form.preco),
    quantidade: parseInt(form.quantidade, 10),
  }

  try {
    const res = await fetch('http://localhost:3000/api/v1/products/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    if (!res.ok) throw new Error('Resposta não OK')
    alert('Produto cadastrado com sucesso!')
    window.location.reload();
  } catch (err) {
    console.error(err)
    alert('Erro ao cadastrar produto.')
  }
}
</script>

<template>
  <div class="container__cadastrar w-5xl m-auto">
    <NavbarComponent />
    <div class="form__cadastrar mt-4 w-2xl m-auto">
      <form
        @submit="submitForm"
        class="form_produto flex flex-col gap-4 border-1 border-gray-100 p-4 rounded-sm"
      >
        <div class="form__field flex flex-col gap-2 border-b-1 border-gray-200 pb-3">
          <label for="nomeProduto" class="font-medium">Nome do Produto</label>
          <input
            v-model="form.nome"
            type="text"
            id="nomeProduto"
            placeholder="ex: Apple Macbook Pro"
            class="border-1 border-gray-200 p-2 rounded-sm text-sm"
          />
          <span id="alert-error" class="text-sm text-red-500">{{ errors.nome }}</span>
        </div>

        <div class="form__field flex flex-col gap-2 border-b-1 border-gray-200 pb-3">
          <label for="precoProduto" class="font-medium">Preço do produto</label>
          <input
            v-model="form.preco"
            step="0.01"
            type="number"
            id="precoProduto"
            placeholder="ex: 12.360"
            class="border-1 border-gray-200 p-2 rounded-sm text-sm"
          />
          <span id="alert-error" class="text-sm text-red-500">{{ errors.preco }}</span>
        </div>

        <div class="form__field flex flex-col gap-2 border-b-1 border-gray-200 pb-3">
          <label for="loteProduto" class="font-medium">Lote do produto</label>
          <input
            v-model="form.lote"
            type="text"
            id="loteProduto"
            placeholder="ex: L129"
            class="border-1 border-gray-200 p-2 rounded-sm text-sm"
          />
          <span id="alert-error" class="text-sm text-red-500">{{ errors.lote }}</span>
        </div>

        <div class="form__field flex flex-col gap-2 border-b-1 border-gray-200 pb-3">
          <label for="validadeProduto" class="font-medium">Validade do produto</label>
          <input
            v-model="form.validade"
            type="text"
            id="validadeProduto"
            placeholder="ex: 07/2025"
            class="border-1 border-gray-200 p-2 rounded-sm text-sm"
          />
          <span id="alert-error" class="text-sm text-red-500">{{ errors.validade }}</span>
        </div>

        <div class="form__field flex flex-col gap-2 border-b-1 border-gray-200 pb-3">
          <label for="quantidadeProduto" class="font-medium">Quantidade do produto</label>
          <input
            v-model="form.quantidade"
            type="number"
            id="quantidadeProduto"
            placeholder="ex: 23"
            class="border-1 border-gray-200 p-2 rounded-sm text-sm"
          />
          <span id="alert-error" class="text-sm text-red-500">{{ errors.quantidade }}</span>
        </div>

        <div class="form__field flex flex-col gap-2 border-b-1 border-gray-200 pb-3">
          <label for="localizacaoProduto" class="font-medium">Localização do produto</label>
          <input
            v-model="form.localizacao"
            type="text"
            id="localizacaoProduto"
            placeholder="ex: P015-N2 (Prateleira 015, Nível 02)"
            class="border-1 border-gray-200 p-2 rounded-sm text-sm"
          />
          <span id="alert-error" class="text-sm text-red-500">{{ errors.localizacao }}</span>
        </div>

        <div class="form__field flex flex-col gap-2 border-b-1 border-gray-200 pb-3">
          <label for="fornecedorProduto" class="font-medium">Fornecedor do produto</label>
          <input
            v-model="form.fornecedor"
            type="text"
            id="fornecedorProduto"
            placeholder="ex: Apple Inc."
            class="border-1 border-gray-200 p-2 rounded-sm text-sm"
          />
          <span id="alert-error" class="text-sm text-red-500">{{ errors.fornecedor }}</span>
        </div>

        <button
          type="submit"
          class="btn-cadastrar border-1 border-gray-100 p-2 rounded-full text-lg"
        >
          CADASTRAR!
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

.btn-cadastrar {
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
