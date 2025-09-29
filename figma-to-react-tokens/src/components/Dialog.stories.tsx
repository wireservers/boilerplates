import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Dialog } from './Dialog'
import { Button } from './Button'
function Demo(){ const [open,setOpen]=useState(false); return (<div><Button onClick={()=>setOpen(true)}>Open Dialog</Button><Dialog open={open} onClose={()=>setOpen(false)} title='Dialog'><p>Content</p></Dialog></div>) }
const meta: Meta<typeof Demo> = { title: 'Components/Dialog', component: Demo }
export default meta
export const Basic: StoryObj<typeof Demo> = {}
