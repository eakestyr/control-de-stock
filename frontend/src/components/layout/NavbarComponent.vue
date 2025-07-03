<script setup lang="ts">
const logout = () => {
  localStorage.removeItem('usuario_logado');
  window.location.href = '/';
}
</script>

<template>
  <div class="navbar">
    <nav class="bg-sky-600 p-4 flex items-center justify-between">
      <RouterLink to="/app" class="logotype font-semibold text-2xl text-neutral-50"
        >Controle de Estoque</RouterLink
      >
      <div class="actions flex items-center gap-3">
        <RouterLink
          class="rounded-full p-2 pl-4 pr-4 font-medium border-1 border-stone-50 bg-stone-50"
          to="/cadastrar"
        >
          <i class="fa-solid fa-box"></i>
          Cadastrar
        </RouterLink>
        <RouterLink
          class="rounded-full p-2 pl-4 pr-4 font-medium border-1 border-stone-50 bg-stone-50"
          to="/editar"
        >
          <i class="fa-solid fa-pen-ruler"></i>
          Editar
        </RouterLink>
        <RouterLink
          class="rounded-full p-2 pl-4 pr-4 font-medium border-1 border-stone-50 bg-stone-50"
          to="/remover"
        >
          <i class="fa-solid fa-trash-can"></i>
          Remover
        </RouterLink>
        <RouterLink
          class="text-stone-50 rounded-full p-2 pl-4 pr-4 font-medium border-1 border-red-200 bg-red-500"
          to="/sair"
          @click="logout"
        >
          <i class="fa-solid fa-door-open"></i>
          Sair
        </RouterLink>
      </div>
    </nav>
  </div>
</template>
