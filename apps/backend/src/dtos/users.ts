import * as v from 'valibot'

export const CreateOneUser = v.object({
  first_name: v.pipe(v.string()),
})

export type CreateOneUserType = v.InferOutput<typeof CreateOneUser>
