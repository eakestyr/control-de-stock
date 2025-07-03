<script setup lang="ts">
import { ref } from 'vue'
import ListProduct from '@/components/layout/ListProduct.vue'
import NavbarComponent from '@/components/layout/NavbarComponent.vue'

if (localStorage.getItem('usuario_logado') !== 'true') {
  window.location.href = '/'
}

interface Produto {
  id: number
  nome: string
  preco: number
  lote: string
  validade: string
  quantidade: number
  localizacao: string
  fornecedor: string
}

const atualizarLista = () => window.location.reload()

const nomeProduto = ref('')
const erroBusca = ref('')
const produtosFiltrados = ref<Produto[] | null>(null)
const carregandoBusca = ref(false)

const buscarProduto = async () => {
  erroBusca.value = ''
  produtosFiltrados.value = null

  if (nomeProduto.value.trim() === '') {
    erroBusca.value = 'O campo de busca não pode estar em branco.'
    return
  }

  carregandoBusca.value = true
  try {
    const resposta = await fetch(
      `http://localhost:3000/api/v1/products/m/${encodeURIComponent(nomeProduto.value)}`,
    )
    if (!resposta.ok) throw new Error(`A busca pelo termo "${nomeProduto.value}" não corresponde a nenhum produto do sistema.`)
    const dados = await resposta.json()
    produtosFiltrados.value = dados.data
  } catch (error: any) {
    erroBusca.value = error.message || 'Erro inesperado.'
  } finally {
    carregandoBusca.value = false
  }
}
</script>

<template>
  <div class="container__app container w-5xl m-auto">
    <NavbarComponent />

    <div class="summary mt-5">
      <div class="search__product">
        <div class="mt-4 flex flex-col gap-2 w-full m-auto border-1 border-gray-100 p-4 rounded-sm">
          <label for="nomeProduto" class="font-medium">Busque um produto</label>
          <input
            class="border-1 border-gray-200 p-2 rounded-sm text-sm"
            type="text"
            v-model="nomeProduto"
            id="nomeProduto"
            placeholder="ex: Piso"
          />
          <span class="text-sm text-red-500">{{ erroBusca }}</span>
          <button
            type="button"
            class="btn-cadastrar border-1 border-gray-100 p-2 rounded-full text-lg"
            @click="buscarProduto"
          >
            BUSCAR!
          </button>
        </div>
      </div>

      <h1 class="text-2xl font-semibold mt-6">
        Lista de Produtos
        <abbr @click="atualizarLista" style="cursor: pointer" title="Atualizar Página">
          <i class="fa-solid fa-arrows-rotate"></i>
        </abbr>
      </h1>

      <p class="mb-4">
        Abaixo você irá encontrar a tabela de produtos no estoque, e poderá manipulá-los utilizando
        os botões na navbar acima.
      </p>

      <ListProduct v-if="!carregandoBusca" :produtosExibidos="produtosFiltrados || undefined" />
      <div v-else>Buscando produtos...</div>
    </div>
  </div>
</template>
