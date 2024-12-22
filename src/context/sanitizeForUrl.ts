export function sanitizeForUrl(input: string): string {
    // Convert to lowercase
    let sanitized = input.toLowerCase();
    // Replace spaces with hyphens
    sanitized = sanitized.replace(/\s+/g, '-');
    // Remove special characters (keeping alphanumeric and hyphens)
    sanitized = sanitized.replace(/[^a-z0-9-]/g, '');
    // Remove consecutive hyphens
    sanitized = sanitized.replace(/--+/g, '-');
    // Trim hyphens from the start and end
    sanitized = sanitized.replace(/^-+|-+$/g, '');
    return sanitized;
}
