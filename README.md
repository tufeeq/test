# Nexus AI Workspace — free local AI website

Nexus AI is a static browser application that runs compatible open-source language models locally through WebLLM and WebGPU. It can optionally retrieve public information from open APIs, insert the retrieved material into the local model's context, and export the result as Word, PowerPoint, PDF, Markdown, or plain text.

## Main capabilities

- Multiple local model choices, including larger instruct models when the device can support them
- General, research, document, presentation, and analysis modes
- Federated public knowledge search using Wikipedia, Crossref, and OpenAlex
- Visible source links and numbered citations in research mode
- Local attachments for TXT, Markdown, CSV, JSON, and HTML files
- Browser-side generation of DOCX, PPTX, PDF, Markdown, and TXT files
- Local conversation storage; no application backend or paid inference API
- Responsive desktop and mobile interface

## Run locally

Browser modules require an HTTP server. From this folder run:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000` in a recent Chrome or Edge browser.

## Publish free with GitHub Pages

1. Create a public GitHub repository.
2. Upload every file in this folder to the repository root.
3. Open **Settings → Pages**.
4. Choose **Deploy from a branch**.
5. Select the `main` branch and `/root` folder.
6. Save and use the URL GitHub provides.

## How public research works

The website does not contain or copy a single massive database. It performs live, federated searches against public APIs and sends short retrieved excerpts into the local model's context. This improves grounding while keeping model inference on the user's device.

Public services can change their limits, availability, or CORS rules. OpenAlex may require or benefit from identification or an API key depending on its current policy. The optional email field in Settings is included for responsible API identification.

## File export notes

- Word documents are generated with `docx`.
- PowerPoint files are generated with PptxGenJS.
- PDFs are generated with jsPDF.
- Export happens in the browser; no document is uploaded to this project.

## Important limitations

- Larger models can require several gigabytes of RAM or GPU memory and may fail on low-powered devices.
- The initial model download can be large and is normally cached by the browser.
- A browser-only local model cannot match the largest paid cloud models on every complex task.
- Public APIs may rate-limit or temporarily reject requests.
- PDF export uses standard Latin fonts by default; complex Arabic shaping may vary by viewer. Word and PowerPoint generally handle multilingual text better.
- Local AI output and citations should be checked before consequential use.
