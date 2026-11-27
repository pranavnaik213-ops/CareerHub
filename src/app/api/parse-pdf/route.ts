import { NextRequest, NextResponse } from 'next/server';
import { PDFParse } from 'pdf-parse';

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

    // Verify PDF MIME type or extension
    const isPdf =
      file.type === 'application/pdf' ||
      file.name.toLowerCase().endsWith('.pdf');

    if (!isPdf) {
      return NextResponse.json(
        { error: 'Invalid file format. Please upload a PDF document (.pdf).' },
        { status: 400 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

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
