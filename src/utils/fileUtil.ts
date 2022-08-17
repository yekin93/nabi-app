export const getFileExt = (fileName: string): string | null => {
    const names: string[] | null = fileName ? fileName.split('.') : null;
    return names ? names[1] : null;
} 