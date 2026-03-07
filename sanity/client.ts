import {createClient} from 'next-sanity'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
const apiVersion = '2024-01-01'

if (!projectId || !dataset) {
  throw new Error('Missing Sanity environment variables')
}

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: process.env.NODE_ENV === 'production',
})

export async function sanityFetch<T>({
  query,
  params = {},
}: {
  query: string
  params?: Record<string, any>
}): Promise<T> {
  return client.fetch<T>(query, params)
}
