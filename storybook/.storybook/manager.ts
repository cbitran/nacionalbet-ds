import { addons } from '@storybook/manager-api'
import theme from './theme'

// Aplica o tema navy ao chrome do Storybook (sidebar, toolbar, etc.).
addons.setConfig({ theme })
