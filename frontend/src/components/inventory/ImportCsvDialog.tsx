import { useState, useRef } from 'react';
import type { InventoryBatchResponse } from 'tiny-inventory-shared';
import { batchImportInventory } from '@/api/inventory';
import { ApiError } from '@/api/client';
import { parseInventoryCsv, type CsvParseResult } from '@/utils/csv-import';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from '@/components/ui/dialog';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/table';

type Stage = 'pick' | 'preview' | 'importing' | 'results';

interface Props {
  open: boolean;
  onClose: () => void;
  onImportComplete: () => void;
}

export default function ImportCsvDialog({ open, onClose, onImportComplete }: Props) {
  const [stage, setStage] = useState<Stage>('pick');
  const [parseResult, setParseResult] = useState<CsvParseResult | null>(null);
  const [importResult, setImportResult] = useState<InventoryBatchResponse | null>(null);
  const [error, setError] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);

  const reset = () => {
    setStage('pick');
    setParseResult(null);
    setImportResult(null);
    setError('');
    if (fileRef.current) fileRef.current.value = '';
  };

  const handleClose = () => {
    if (importResult?.success) onImportComplete();
    reset();
    onClose();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setError('');

    const result = await parseInventoryCsv(file);
    setParseResult(result);

    if (result.headerError) {
      setError(result.headerError);
    } else {
      setStage('preview');
    }
  };

  const handleImport = async () => {
    if (!parseResult) return;
    const items = parseResult.rows
      .filter((r) => r.parsed !== null)
      .map((r) => r.parsed!);

    setStage('importing');
    setError('');
    try {
      const result = await batchImportInventory(items);
      setImportResult(result);
      setStage('results');
    } catch (err) {
      setError(err instanceof ApiError ? err.body.message : 'Import failed');
      setStage('preview');
    }
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v && handleClose()}>
      <DialogContent className="sm:max-w-2xl max-h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Import Inventory from CSV</DialogTitle>
          <DialogDescription>
            Upload a CSV file to bulk-create or update inventory records.
          </DialogDescription>
        </DialogHeader>

        {/* PICK FILE */}
        {stage === 'pick' && (
          <div className="space-y-4">
            <Alert>
              <AlertDescription>
                <p className="font-medium mb-1">CSV format:</p>
                <code className="text-xs bg-muted px-2 py-1 rounded block">
                  store_name,sku,quantity<br />
                  Downtown Flagship,KB-WIRELESS-001,50<br />
                  Airport Terminal 2,CAM-HD-1080,25
                </code>
                <p className="text-xs text-muted-foreground mt-2">
                  Store names and SKUs must match exactly. Existing inventory will have its quantity replaced.
                </p>
              </AlertDescription>
            </Alert>
            <Input
              ref={fileRef}
              type="file"
              accept=".csv"
              onChange={handleFileChange}
            />
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
          </div>
        )}

        {/* PREVIEW */}
        {stage === 'preview' && parseResult && (
          <div className="space-y-3 overflow-hidden flex flex-col">
            <div className="flex gap-3 text-sm">
              <Badge variant="default">{parseResult.validCount} valid</Badge>
              {parseResult.errorCount > 0 && (
                <Badge variant="destructive">{parseResult.errorCount} errors</Badge>
              )}
            </div>
            <div className="overflow-auto flex-1 border rounded-md">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">Row</TableHead>
                    <TableHead>Store</TableHead>
                    <TableHead>SKU</TableHead>
                    <TableHead className="text-right">Qty</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {parseResult.rows.map((row) => (
                    <TableRow key={row.rowNumber}>
                      <TableCell className="text-muted-foreground">{row.rowNumber}</TableCell>
                      <TableCell>{row.parsed?.storeName ?? row.raw['store_name']}</TableCell>
                      <TableCell className="font-mono text-sm">{row.parsed?.sku ?? row.raw['sku']}</TableCell>
                      <TableCell className="text-right">{row.parsed?.quantity ?? row.raw['quantity']}</TableCell>
                      <TableCell>
                        {row.error ? (
                          <span className="text-xs text-destructive">{row.error}</span>
                        ) : (
                          <Badge variant="secondary">OK</Badge>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={reset}>Back</Button>
              <Button
                onClick={handleImport}
                disabled={parseResult.errorCount > 0 || parseResult.validCount === 0}
              >
                Import {parseResult.validCount} rows
              </Button>
            </DialogFooter>
          </div>
        )}

        {/* IMPORTING */}
        {stage === 'importing' && (
          <div className="py-8 text-center text-muted-foreground">
            Importing...
          </div>
        )}

        {/* RESULTS */}
        {stage === 'results' && importResult && (
          <div className="space-y-3 overflow-hidden flex flex-col">
            {importResult.success ? (
              <Alert>
                <AlertDescription>
                  Import complete: <strong>{importResult.created} created</strong>, <strong>{importResult.updated} updated</strong>.
                </AlertDescription>
              </Alert>
            ) : (
              <Alert variant="destructive">
                <AlertDescription>
                  Import failed — {importResult.errors.length} error(s). No records were modified.
                </AlertDescription>
              </Alert>
            )}

            {importResult.errors.length > 0 && (
              <div className="overflow-auto flex-1 border rounded-md">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12">Row</TableHead>
                      <TableHead>Store</TableHead>
                      <TableHead>SKU</TableHead>
                      <TableHead>Error</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {importResult.errors.map((err, i) => (
                      <TableRow key={i}>
                        <TableCell className="text-muted-foreground">{err.row}</TableCell>
                        <TableCell>{err.storeName}</TableCell>
                        <TableCell className="font-mono text-sm">{err.sku}</TableCell>
                        <TableCell className="text-destructive text-sm">{err.error}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}

            {importResult.success && importResult.results.length > 0 && (
              <div className="overflow-auto flex-1 border rounded-md">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12">Row</TableHead>
                      <TableHead>Store</TableHead>
                      <TableHead>SKU</TableHead>
                      <TableHead className="text-right">Qty</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {importResult.results.map((r, i) => (
                      <TableRow key={i}>
                        <TableCell className="text-muted-foreground">{r.row}</TableCell>
                        <TableCell>{r.storeName}</TableCell>
                        <TableCell className="font-mono text-sm">{r.sku}</TableCell>
                        <TableCell className="text-right">{r.quantity}</TableCell>
                        <TableCell>
                          <Badge variant={r.status === 'created' ? 'default' : 'secondary'}>
                            {r.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}

            <DialogFooter>
              <Button onClick={handleClose}>Close</Button>
            </DialogFooter>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
