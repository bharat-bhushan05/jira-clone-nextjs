import { NextResponse } from 'next/server'
import { requireUser } from '../../../lib/clerk'
import aws from 'aws-sdk'

const S3_BUCKET = process.env.AWS_S3_BUCKET || ''
const REGION = process.env.AWS_REGION || 'us-east-1'

aws.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: REGION,
})

const s3 = new aws.S3({ signatureVersion: 'v4', region: REGION })

export async function POST(req: Request) {
  const userId = requireUser()
  const body = await req.json()
  const { filename, contentType } = body
  if (!filename || !contentType) return NextResponse.json({ error: 'filename & contentType required' }, { status: 400 })

  const Key = `uploads/${userId}/${Date.now()}-${filename}`
  const params = {
    Bucket: S3_BUCKET,
    Key,
    Expires: 60,
    ContentType: contentType,
    ACL: 'private',
  }

  try {
    const uploadUrl = await s3.getSignedUrlPromise('putObject', params)
    const publicUrl = `https://${S3_BUCKET}.s3.${REGION}.amazonaws.com/${Key}`
    return NextResponse.json({ uploadUrl, publicUrl })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Could not create signed url' }, { status: 500 })
  }
}
