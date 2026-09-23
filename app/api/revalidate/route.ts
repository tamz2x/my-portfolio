import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { path } = await req.json();
    
    if (path) {
      revalidatePath(path);
      return NextResponse.json({ revalidated: true, now: Date.now() });
    }
    
    return NextResponse.json({ revalidated: false, message: "Missing path" }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ revalidated: false, message: "Error parsing request" }, { status: 500 });
  }
}