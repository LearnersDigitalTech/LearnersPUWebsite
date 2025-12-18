import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const data = await request.json();
        const googleScriptUrl = process.env.GOOGLE_SCRIPT_URL;

        if (!googleScriptUrl) {
            return NextResponse.json(
                { error: 'Server configuration error: GOOGLE_SCRIPT_URL not found' },
                { status: 500 }
            );
        }

        const response = await fetch(googleScriptUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            // Try to get error text if available
            const errorText = await response.text();
            console.error("Google Apps Script Error:", errorText);
            return NextResponse.json(
                { error: 'Failed to submit data to external service' },
                { status: response.status }
            );
        }

        // GAS often returns a JSON object even on success, let's try to parse it
        // Note: GAS Web App should return JSON using ContentService.createTextOutput(JSON.stringify(...)).setMimeType(...)
        try {
            const result = await response.json();
            return NextResponse.json(result);
        } catch (e) {
            // If it's not JSON, just return success if status was 200
            return NextResponse.json({ result: 'success' });
        }

    } catch (error) {
        console.error('Proxy Error:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
