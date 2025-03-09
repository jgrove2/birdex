import { NextResponse } from "next/server";
import { R2 } from "node-cloudflare-r2";

type ResponseData = {
  url?: string;
  error?: string;
};

const r2 = new R2({
  accountId: process.env.CLOUDFLARE_ACCOUNT_ID ?? "",
  accessKeyId: process.env.R2_ACCESS_KEY_ID ?? "",
  secretAccessKey: process.env.R2_SECRET_ACCESS_KEY ?? "",
});

const bucket = r2.bucket(process.env.R2_BUCKET_NAME ?? "");

export async function GET(
  request: Request,
  { params }: { params: { key: string } }
): Promise<NextResponse<ResponseData>> {
  const { key } = await params;

  try {
    if (await bucket.exists()) {
      const getSignedUrl = await bucket.getObjectSignedUrl(key, 3600);
      return NextResponse.json({ url: getSignedUrl });
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
