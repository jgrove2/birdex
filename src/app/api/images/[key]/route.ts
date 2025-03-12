import { NextRequest, NextResponse } from "next/server";
import { S3Client, S3ClientConfig, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export const runtime = "edge";
type ResponseData = {
  url?: string;
  error?: string;
};

const r2Config: S3ClientConfig = {
  region: "us-east-1",
  endpoint: `https://${process.env.CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID ?? "",
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY ?? "",
  },
};

const r2 = new S3Client(r2Config);

type RouteParams = { params: Promise<{ key: string }> };

export async function GET(
  request: NextRequest,
  { params }: RouteParams
): Promise<NextResponse<ResponseData>> {
  const { key } = await params;

  try {
    if (r2) {
      const command = new GetObjectCommand({
        Bucket: process.env.R2_BUCKET_NAME ?? "",
        Key: key,
      });
      const signedUrl = await getSignedUrl(r2, command, { expiresIn: 3600 });
      return NextResponse.json({ url: signedUrl });
    } else {
      return NextResponse.json(
        { error: "Bucket does not exist" },
        { status: 500 }
      );
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
