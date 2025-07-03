<script setup lang="ts">
import { reactive } from 'vue'

interface SignUpForm {
  name: string
  email: string
  password: string
}

const formData = reactive<SignUpForm>({
  name: '',
  email: '',
  password: ''
})

const errors = reactive<Record<keyof SignUpForm, string>>({
  name: '',
  email: '',
  password: ''
})

const validators: Record<keyof SignUpForm, Array<(value: string) => true | string>> = {
  name: [
    v => !!v.trim() || 'O nome não pode estar vazio.'
  ],
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

const fields = Object.keys(validators) as Array<keyof SignUpForm>

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
    const response = await fetch('http://localhost:3000/api/v1/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })
    if (!response.ok) throw new Error(`HTTP error ${response.status}`)
    alert('Usuário cadastrado com sucesso!')
    window.location.href = '/'
    Object.assign(formData, { name: '', email: '', password: '' })
  } catch (error) {
    console.error(error)
    alert('Erro ao registrar. Tente novamente mais tarde.')
  }
}
</script>

<template>
  <div class="container m-auto w-md border-1 border-stone-100 rounded-md p-3 container__signup">
    <h1 class="text-2xl font-bold">Criando uma conta...</h1>
    <p class="mb-4">
      Mas se você já possuir uma
      <RouterLink to="/" class="underline text-sky-600">clique aqui!</RouterLink>
    </p>

    <form @submit.prevent="onSubmit" class="form__signup">
      <div class="form__field mb-4">
        <input
          v-model="formData.name"
          type="text"
          name="name"
          class="outline-none text-sm w-full border-1 border-stone-200 p-2 rounded-sm"
          placeholder="Ex: John Doe"
        />
        <span class="text-sm text-red-500">{{ errors.name }}</span>
      </div>

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
        Registrar
      </button>
    </form>
  </div>
</template>

<style>
.container__signup {
  box-shadow:
    rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
    rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;

  position: absolute;
  left: 50%;
  top: 40%;
  transform: translate(-50%, -50%);
}

.form__signup {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

#btn-signup {
  font-weight: 600;
  padding: 6px;
  color: #ffff;
  cursor: pointer;
  background: #842a9b;
  background: -webkit-linear-gradient(90deg, rgba(132, 42, 155, 1) 0%, rgba(219, 83, 237, 1) 100%);
  background: -moz-linear-gradient(90deg, rgba(132, 42, 155, 1) 0%, rgba(219, 83, 237, 1) 100%);
  background: linear-gradient(90deg, rgba(132, 42, 155, 1) 0%, rgba(219, 83, 237, 1) 100%);
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#842A9B", endColorstr="#DB53ED", GradientType=1);
}
</style>
