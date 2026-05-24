import * as dotenv from 'dotenv'
import {createClient} from '@sanity/client'

dotenv.config({path: '.env.local'})

const FOLDER_ID = '1zZLfRwPqZsStaonOV_snRlYMaWdpx2ad'
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY
const SANITY_PROJECT_ID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const SANITY_DATASET = process.env.NEXT_PUBLIC_SANITY_DATASET
const SANITY_TOKEN = process.env.SANITY_API_WRITE_TOKEN

if (!GOOGLE_API_KEY) throw new Error('Missing GOOGLE_API_KEY in .env.local')
if (!SANITY_PROJECT_ID || !SANITY_DATASET) throw new Error('Missing Sanity env vars')
if (!SANITY_TOKEN) throw new Error('Missing SANITY_API_WRITE_TOKEN in .env.local')

const sanity = createClient({
  projectId: SANITY_PROJECT_ID,
  dataset: SANITY_DATASET,
  apiVersion: '2024-01-01',
  token: SANITY_TOKEN,
  useCdn: false,
})

interface DriveFile {
  id: string
  name: string
  mimeType: string
  size?: string
  modifiedTime: string
}

async function fetchDriveFiles(): Promise<DriveFile[]> {
  const fields = 'files(id,name,mimeType,size,modifiedTime)'
  const q = encodeURIComponent(`'${FOLDER_ID}' in parents and trashed = false`)
  const url = `https://www.googleapis.com/drive/v3/files?q=${q}&fields=${fields}&key=${GOOGLE_API_KEY}`

  const res = await fetch(url)
  if (!res.ok) {
    const text = await res.text()
    throw new Error(`Drive API error ${res.status}: ${text}`)
  }
  const data = await res.json() as {files: DriveFile[]}
  return data.files ?? []
}

async function sync() {
  console.log('Fetching files from Google Drive…')
  const files = await fetchDriveFiles()
  console.log(`Found ${files.length} file(s)`)

  const tx = sanity.transaction()

  for (const file of files) {
    const docId = `download-${file.id}`
    const doc = {
      _id: docId,
      _type: 'downloadItem',
      driveFileId: file.id,
      name: file.name,
      mimeType: file.mimeType,
      fileSize: file.size ? parseInt(file.size, 10) : null,
      downloadUrl: `https://drive.google.com/uc?export=download&id=${file.id}`,
      modifiedTime: file.modifiedTime,
    }
    tx.createOrReplace(doc)
    console.log(`  → ${file.name}`)
  }

  await tx.commit()
  console.log('Sync complete.')
}

sync().catch((err) => {
  console.error('Sync failed:', err.message)
  process.exit(1)
})
