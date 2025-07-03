<script setup lang="ts">
import { ref, onMounted, defineProps, watch } from 'vue'

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

const props = defineProps<{
  produtosExibidos?: Produto[]
}>()

const produtos = ref<Produto[]>([])
const carregando = ref(true)
const erro = ref<string | null>(null)

watch(
  () => props.produtosExibidos,
  (novosProdutos) => {
    if (novosProdutos) {
      produtos.value = novosProdutos
      carregando.value = false
    }
  },
  { immediate: true },
)

const fetchProdutos = async () => {
  if (props.produtosExibidos) return
  try {
    const resposta = await fetch('http://localhost:3000/api/v1/products/')
    if (!resposta.ok) throw new Error('Erro ao buscar produtos')

    const dados = await resposta.json()
    produtos.value = dados.data
  } catch (err: any) {
    erro.value = err.message || 'Erro desconhecido'
  } finally {
    carregando.value = false
  }
}

onMounted(() => {
  fetchProdutos()
})
</script>

<template>
  <div class="container__products mt-3">
    <div v-if="carregando">Carregando produtos...</div>
    <div v-else-if="erro">{{ erro }}</div>
    <table v-else class="w-full">
      <thead>
        <tr>
          <th class="p-2 bg-neutral-900 text-neutral-50">ID</th>
          <th class="p-2 bg-neutral-900 text-neutral-50">Nome</th>
          <th class="p-2 bg-neutral-900 text-neutral-50">Preço</th>
          <th class="p-2 bg-neutral-900 text-neutral-50">Lote</th>
          <th class="p-2 bg-neutral-900 text-neutral-50">Validade</th>
          <th class="p-2 bg-neutral-900 text-neutral-50">Quantidade</th>
          <th class="p-2 bg-neutral-900 text-neutral-50">Localização</th>
          <th class="p-2 bg-neutral-900 text-neutral-50">Fornecedor</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="produto in produtos" :key="produto.id">
          <td class="p-2">{{ produto.id }}</td>
          <td class="p-2">{{ produto.nome }}</td>
          <td class="p-2">R$ {{ produto.preco }}</td>
          <td class="p-2">{{ produto.lote }}</td>
          <td class="p-2">{{ produto.validade }}</td>
          <td class="p-2">{{ produto.quantidade }}</td>
          <td class="p-2">{{ produto.localizacao }}</td>
          <td class="p-2">{{ produto.fornecedor }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style>
table,
th,
td {
  border: 1px solid black;
}
</style>
