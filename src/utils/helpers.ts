export const generateId = (): string => {
  return Math.random().toString(36).substr(2, 9);
};

export const formatDate = (timestamp: number): string => {
  const date = new Date(timestamp);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 1) {
    return 'Just now';
  } else if (diffMins < 60) {
    return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
  } else if (diffHours < 24) {
    return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
  } else if (diffDays < 7) {
    return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
  } else {
    return date.toLocaleDateString();
  }
};

export const getColumnName = (index: number): string => {
  let result = '';
  while (index >= 0) {
    result = String.fromCharCode(65 + (index % 26)) + result;
    index = Math.floor(index / 26) - 1;
  }
  return result;
};

export const parseRange = (range: string): { start: [number, number]; end: [number, number] } => {
  const [startCell, endCell] = range.split(':');
  
  const parseCell = (cell: string): [number, number] => {
    const match = cell.match(/([A-Z]+)(\d+)/);
    if (!match) throw new Error(`Invalid cell reference: ${cell}`);
    
    const [, col, row] = match;
    const colIndex = col.split('').reduce((acc, char) => acc * 26 + (char.charCodeAt(0) - 64), 0) - 1;
    const rowIndex = parseInt(row) - 1;
    
    return [rowIndex, colIndex];
  };

  return {
    start: parseCell(startCell),
    end: parseCell(endCell || startCell)
  };
};

export function spreadsheetDataToCSV(data: {[key: string]: { value: string; formula: string | null }}): string {
  // Find max row and col
  let maxRow = 0, maxCol = 0;
  Object.keys(data).forEach(key => {
    const [row, col] = key.split('-').map(Number);
    if (row > maxRow) maxRow = row;
    if (col > maxCol) maxCol = col;
  });
  // Build 2D array
  const rows: string[][] = [];
  for (let r = 0; r <= maxRow; r++) {
    const row: string[] = [];
    for (let c = 0; c <= maxCol; c++) {
      const cell = data[`${r}-${c}`];
      row.push(cell ? (cell.value || '') : '');
    }
    rows.push(row);
  }
  // Convert to CSV
  return rows.map(row => row.map(cell => '"' + cell.replace(/"/g, '""') + '"').join(',')).join('\n');
}