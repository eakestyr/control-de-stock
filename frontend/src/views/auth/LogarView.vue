<script setup lang="ts">
import { reactive } from 'vue'

interface SignInForm {
  email: string
  password: string
}

const formData = reactive<SignInForm>({
  email: '',
  password: ''
})

const errors = reactive<Record<keyof SignInForm, string>>({
  email: '',
  password: ''
})

const validators: Record<keyof SignInForm, Array<(value: string) => true | string>> = {
  email: [
    v => !!v.trim() || 'O e-mail não pode estar vazio.',
    v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || 'Formato de e-mail inválido.'
  ],
  password: [
    v => !!v || 'A senha não pode estar vazia.',
    v => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(v) ||
         'A senha deve ter no mínimo 8 caracteres, com ao menos uma letra maiúscula, minúscula, número e símbolo.'
  ]
}

const fields = Object.keys(validators) as Array<keyof SignInForm>

function validate(): boolean {
  let valid = true

  for (const field of fields) {
    errors[field] = ''
    for (const rule of validators[field]) {
      const result = rule(formData[field])
      if (result !== true) {
        errors[field] = result
        valid = false
        break
      }
    }
  }

  return valid
}

async function onSubmit() {
  if (!validate()) return

  try {
    const response = await fetch('http://localhost:3000/api/v1/signin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })
    if (!response.ok) throw new Error(`HTTP error ${response.status}`)
    alert('Usuário logado!')

    localStorage.setItem('usuario_logado', 'true')
    window.location.href = "/app"
    
    Object.assign(formData, { name: '', email: '', password: '' })
  } catch (error) {
    console.error(error);
    alert('Erro ao logar. Tente novamente mais tarde.');
  }
}
</script>

<template>
  <div class="container m-auto w-md border-1 border-stone-100 rounded-md p-3 container__signup">
    <h1 class="text-2xl font-bold">Acessando sua conta...</h1>
    <p class="mb-4">
      Mas se você ainda não possuir uma
      <RouterLink to="/registrar" class="underline text-sky-600">clique aqui!</RouterLink>
    </p>

    <form @submit.prevent="onSubmit" class="form__signup">
      <div class="form__field mb-4">
        <input
          v-model="formData.email"
          type="email"
          name="email"
          class="outline-none text-sm w-full border-1 border-stone-200 p-2 rounded-sm"
          placeholder="Ex: john@doe.com"
        />
        <span class="text-sm text-red-500">{{ errors.email }}</span>
      </div>

      <div class="form__field mb-6">
        <input
          v-model="formData.password"
          type="password"
          name="password"
          class="outline-none text-sm w-full border-1 border-stone-200 p-2 rounded-sm"
          placeholder="ex: 12345Ab!"
        />
        <span class="text-sm text-red-500">{{ errors.password }}</span>
      </div>

      <button
        type="submit"
        id="btn-signup"
        class="w-full bg-sky-600 text-white py-2 rounded-sm hover:bg-sky-700 transition"
      >
        Acessar
      </button>
    </form>
  </div>
</template>
