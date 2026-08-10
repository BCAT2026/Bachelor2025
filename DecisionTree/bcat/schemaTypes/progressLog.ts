import { defineType } from 'sanity'

const progressLog = defineType({
  name: 'progressLog',
  title: 'Progress Log',
  type: 'document',
  fields: [
    {
      name: 'stoppunkt',
      title: 'Stoppunkt',
      type: 'string',
    },
    {
      name: 'question',
      title: 'Spørsmål',
      type: 'string',
    },
    {
      name: 'timestamp',
      title: 'Tidspunkt',
      type: 'datetime',
    },
  ],
})

export default progressLog
