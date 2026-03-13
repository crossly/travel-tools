function sanitizeFilenameSegment(value: string) {
  return value
    .trim()
    .replace(/[<>:"/\\|?*\u0000-\u001F]/g, '-')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}

export function buildDatedJsonFilename(baseName: string, date = new Date()) {
  const safeBaseName = sanitizeFilenameSegment(baseName) || 'trip-export'
  return `${safeBaseName}-${date.toISOString().slice(0, 10)}.json`
}

export function downloadTextFile(filename: string, content: string, contentType = 'application/json;charset=utf-8') {
  const blob = new Blob([content], { type: contentType })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  link.remove()
  URL.revokeObjectURL(url)
}
