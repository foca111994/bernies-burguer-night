'use client'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { COMPANIES } from '@/lib/burger-options'
import type { Resident } from '@/lib/types'

export function DetailsStep({
  resident,
  setResident,
}: {
  resident: Resident
  setResident: (r: Resident) => void
}) {
  return (
    <div className="flex flex-col gap-5">
      <div>
        <h3 className="font-heading text-lg font-bold">Your details</h3>
        <p className="text-xs text-muted-foreground">So the chef knows whose burger this is.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field id="firstName" label="First Name" required>
          <Input
            id="firstName"
            value={resident.firstName}
            onChange={(e) => setResident({ ...resident, firstName: e.target.value })}
            placeholder="Lucas"
            className="h-12 text-base"
            autoComplete="given-name"
          />
        </Field>
        <Field id="lastName" label="Last Name" required>
          <Input
            id="lastName"
            value={resident.lastName}
            onChange={(e) => setResident({ ...resident, lastName: e.target.value })}
            placeholder="Doyle"
            className="h-12 text-base"
            autoComplete="family-name"
          />
        </Field>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field id="company" label="Company" required>
          <Select
            value={resident.company || undefined}
            onValueChange={(v) => setResident({ ...resident, company: (v as string) ?? '' })}
          >
            <SelectTrigger id="company" className="!h-12 text-base">
              <SelectValue placeholder="Select company" />
            </SelectTrigger>
            <SelectContent>
              {COMPANIES.map((c) => (
                <SelectItem key={c} value={c}>
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
        <Field id="roomNumber" label="Room Number" required>
          <Input
            id="roomNumber"
            value={resident.roomNumber}
            onChange={(e) => setResident({ ...resident, roomNumber: e.target.value })}
            placeholder="C-231"
            className="h-12 text-base"
          />
        </Field>
      </div>

      <Field id="notes" label="Notes" hint="Optional">
        <Textarea
          id="notes"
          value={resident.notes ?? ''}
          onChange={(e) => setResident({ ...resident, notes: e.target.value })}
          placeholder="No onion please"
          className="min-h-24 text-base"
        />
      </Field>
    </div>
  )
}

function Field({
  id,
  label,
  required,
  hint,
  children,
}: {
  id: string
  label: string
  required?: boolean
  hint?: string
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={id} className="flex items-center gap-1.5 text-sm">
        {label}
        {required && <span className="text-primary">*</span>}
        {hint && <span className="text-xs font-normal text-muted-foreground">· {hint}</span>}
      </Label>
      {children}
    </div>
  )
}
