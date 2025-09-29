import type { Meta, StoryObj } from '@storybook/react'
import { Input } from './Input'
const meta: Meta<typeof Input> = { title: 'Components/Input', component: Input }
export default meta
export const Base: StoryObj<typeof Input> = { args: { placeholder: 'Type here…' } }
