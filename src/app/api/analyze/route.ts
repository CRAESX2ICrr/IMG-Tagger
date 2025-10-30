import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const endpoint = process.env.AZURE_ENDPOINT?.replace(/\/$/, "");
    const key = process.env.AZURE_KEY;

    if (!endpoint || !key) {
      return NextResponse.json(
        { error: "Missing Azure credentials" },
        { status: 500 }
      );
    }

    const azureRes = await fetch(
      `${endpoint}/vision/v3.2/analyze?visualFeatures=Tags,Description`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/octet-stream",
          "Ocp-Apim-Subscription-Key": key,
        },
        body: buffer,
      }
    );

    const data = await azureRes.json();

    if (!azureRes.ok) {
      console.error("Azure error:", data);
      return NextResponse.json(
        { error: data.error?.message || "Azure Vision error" },
        { status: 500 }
      );
    }

    return NextResponse.json(data);
  } catch (err: any) {
    console.error("Server error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
