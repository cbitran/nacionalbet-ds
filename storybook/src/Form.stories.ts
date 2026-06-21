import type { Meta, StoryObj } from '@storybook/vue3'

// Composição: UForm + UFormField + componentes. Espelho do exemplo "Account preferences" do Figma.
const meta: Meta = {
  title: 'Patterns/Form',
  parameters: {
    docs: { description: { component: 'Padrões de formulário compondo `UForm` + `UFormField` + campos. Exemplos: tela de login e preferências de conta. Sem tabela de props única por ser uma composição.' } },
  },
}
export default meta
type Story = StoryObj

export const SignIn: Story = {
  render: () => ({
    setup: () => ({ state: { email: '', password: '', remember: false } }),
    template: `<div class="w-80 p-8 rounded-xl bg-muted ring ring-default">
      <h3 class="text-xl font-semibold text-highlighted mb-5">Sign in</h3>
      <UForm :state="state" class="flex flex-col gap-4">
        <UFormField label="Email" name="email"><UInput v-model="state.email" class="w-full" placeholder="you@email.com" /></UFormField>
        <UFormField label="Password" name="password"><UInput v-model="state.password" type="password" class="w-full" /></UFormField>
        <UCheckbox v-model="state.remember" label="Remember me" />
        <UButton type="submit" label="Sign in" color="primary" block />
      </UForm>
    </div>`,
  }),
}

// Estado de erro: UFormField com a prop `error` exibe a mensagem embaixo do campo
// (e deixa o input em vermelho). Em runtime, o UForm preenche isso via :schema.
export const Validation: Story = {
  render: () => ({
    setup: () => ({ state: { email: 'joao', password: '123' } }),
    template: `<div class="w-80 p-8 rounded-xl bg-muted ring ring-default">
      <h3 class="text-xl font-semibold text-highlighted mb-5">Sign in</h3>
      <UForm :state="state" class="flex flex-col gap-4">
        <UFormField label="Email" name="email" error="Informe um e-mail válido">
          <UInput v-model="state.email" class="w-full" placeholder="you@email.com" />
        </UFormField>
        <UFormField label="Password" name="password" error="Mínimo de 8 caracteres" hint="Use 8+ caracteres">
          <UInput v-model="state.password" type="password" class="w-full" />
        </UFormField>
        <UButton type="submit" label="Sign in" color="primary" block />
      </UForm>
    </div>`,
  }),
}

export const AccountPreferences: Story = {
  render: () => ({
    setup: () => ({ state: { name: '', sport: 'Football', email: true, promos: false, terms: true }, sports: ['Football', 'Basketball', 'Tennis'] }),
    template: `<div class="w-96 p-8 rounded-xl bg-muted ring ring-default">
      <h3 class="text-xl font-semibold text-highlighted mb-5">Account preferences</h3>
      <UForm :state="state" class="flex flex-col gap-4">
        <UFormField label="Display name" name="name"><UInput v-model="state.name" class="w-full" /></UFormField>
        <UFormField label="Favorite sport" name="sport"><USelect v-model="state.sport" :items="sports" class="w-full" /></UFormField>
        <USwitch v-model="state.email" label="Email notifications" />
        <USwitch v-model="state.promos" label="Promotions" />
        <UCheckbox v-model="state.terms" label="I accept the terms" />
        <UButton type="submit" label="Save changes" color="primary" block />
      </UForm>
    </div>`,
  }),
}
