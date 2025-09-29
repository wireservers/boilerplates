
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

type FormData = { name: string; email: string; plan: 'basic'|'pro'|'enterprise'; accept: boolean }

function loadDraft(){ try { return JSON.parse(localStorage.getItem('wizard')||'null') } catch { return null } }

export function Wizard(){
  const [step, setStep] = useState(1)
  const { register, handleSubmit, formState: { errors }, watch, getValues, reset } = useForm<FormData>({ defaultValues: { plan:'basic', accept:false, ...(loadDraft()||{}) } })

  useEffect(()=>{
    const sub = watch(v => localStorage.setItem('wizard', JSON.stringify(v)))
    return () => sub.unsubscribe()
  }, [watch])

  const emailRules = { required: 'Required', pattern: { value: /.+@.+\..+/, message: 'Invalid email' } }
  const onSubmit = (d: FormData) => { alert('Submitted: '+JSON.stringify(d, null, 2)); localStorage.removeItem('wizard'); reset() }

  return <div className="card">
    <p className="muted">Step {step} of 3</p>
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      {step===1 && <div>
        <label>Name</label>
        <input {...register('name', { required: 'Required', minLength: { value: 2, message: 'Too short' } })} aria-invalid={!!errors.name}/>
        {errors.name && <div className="muted" role="alert">{errors.name.message}</div>}
        <div className="spacer"/>
        <label>Email</label>
        <input {...register('email', emailRules)} aria-invalid={!!errors.email}/>
        {errors.email && <div className="muted" role="alert">{errors.email.message}</div>}
      </div>}
      {step===2 && <div>
        <label>Plan</label>
        <select {...register('plan', { required: 'Required' })}>
          <option value="basic">Basic</option>
          <option value="pro">Pro</option>
          <option value="enterprise">Enterprise</option>
        </select>
        {errors.plan && <div className="muted" role="alert">{errors.plan.message}</div>}
        <div className="spacer"/>
        <label><input type="checkbox" {...register('accept', { validate: v => v || 'You must accept' })}/> I accept terms</label>
        {errors.accept && <div className="muted" role="alert">{errors.accept.message as string}</div>}
      </div>}
      {step===3 && <div className="card" style={{background:'#0e1726'}}><pre>{JSON.stringify(getValues(), null, 2)}</pre></div>}
      <div className="spacer"/>
      <div className="toolbar">
        {step>1 && <button type="button" className="btn ghost" onClick={()=>setStep(step-1)}>Back</button>}
        {step<3 && <button type="button" className="btn" onClick={()=>setStep(step+1)}>Next</button>}
        {step===3 && <button className="btn" type="submit">Submit</button>}
      </div>
    </form>
  </div>
}
