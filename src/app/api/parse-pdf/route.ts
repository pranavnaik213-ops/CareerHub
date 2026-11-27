import { NextRequest, NextResponse } from 'next/server';
import { PDFParse } from 'pdf-parse';

const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB maximum ceiling

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file');

    if (!file || !(file instanceof File)) {
      return NextResponse.json(
        { error: 'No file received. Please provide a PDF file.' },
        { status: 400 }
      );
    }

    // 1. Strict Server-Side File Size Verification (DoS prevention)
    if (file.size > MAX_FILE_SIZE_BYTES) {
      return NextResponse.json(
        { error: 'File exceeds the maximum allowable limit of 5MB.' },
        { status: 413 }
      );
    }

    if (file.size < 64) {
      return NextResponse.json(
        { error: 'The uploaded file is too small to be a valid PDF document.' },
        { status: 400 }
      );
    }

    // 2. Strict MIME and extension validation (AND condition)
    const hasPdfExtension = file.name.toLowerCase().endsWith('.pdf');
    const hasPdfMime =
      file.type === 'application/pdf' ||
      file.type === 'application/x-pdf';

    if (!hasPdfExtension || !hasPdfMime) {
      return NextResponse.json(
        { error: 'Invalid file format. Please upload an authentic PDF document (.pdf).' },
        { status: 400 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // 3. Magic Bytes Inspection (%PDF- is 0x25, 0x50, 0x44, 0x46, 0x2D)
    const isPdfMagic =
      buffer.length >= 5 &&
      buffer[0] === 0x25 && // %
      buffer[1] === 0x50 && // P
      buffer[2] === 0x44 && // D
      buffer[3] === 0x46 && // F
      buffer[4] === 0x2d;   // -

    if (!isPdfMagic) {
      return NextResponse.json(
        { error: 'File content verification failed: missing valid PDF magic header (%PDF-).' },
        { status: 400 }
      );
    }

    const parser = new PDFParse({ data: buffer });
    let result;
    try {
      result = await parser.getText();
    } finally {
      await parser.destroy().catch(() => {});
    }

    const rawText = result.text || '';
    // Clean up excessive whitespace and page marker artifacts
    const cleanedText = rawText
      .replace(/-- \d+ of \d+ --/g, '')
      .replace(/\r\n/g, '\n')
      .replace(/\n{3,}/g, '\n\n')
      .trim();

    if (!cleanedText || cleanedText.length < 20) {
      return NextResponse.json(
        {
          error:
            'The uploaded PDF appears to be empty or contains scanned images without selectable text. Please ensure your PDF has selectable text.',
        },
        { status: 422 }
      );
    }

    return NextResponse.json({
      success: true,
      text: cleanedText,
      numPages: result.total || 1,
      filename: file.name,
      fileSizeBytes: file.size,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown PDF parsing error';
    return NextResponse.json(
      { error: `Failed to extract text from PDF: ${message}` },
      { status: 500 }
    );
  }
}
