import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  const selector = { scheme: "file", language: "4gl" };

  context.subscriptions.push(
    vscode.languages.registerDocumentSymbolProvider(selector, new SwmfConfigDocumentSymbolProvider())
  );

  context.subscriptions.push(
    vscode.languages.registerDefinitionProvider(selector, new SwmfDefinitionProvider())
  );
}

class SwmfConfigDocumentSymbolProvider implements vscode.DocumentSymbolProvider {
  private formatFunc(cmd: string) {
    return cmd.replace(/^ *function /i, "").replace(/\(.*/, "").trim();
  }
  private formatRep(cmd: string) {
    return cmd.replace(/^ *report /i, "").replace(/\(.*/, "").trim();
  }

  public async provideDocumentSymbols(document: vscode.TextDocument): Promise<vscode.DocumentSymbol[]> {
    const symbols: vscode.DocumentSymbol[] = [];
    const func = vscode.SymbolKind.Function;
    const key = vscode.SymbolKind.Key;

    for (let i = 0; i < document.lineCount; i++) {
      const line = document.lineAt(i);
      if (line.text.match(/^ *function /i)) {
        symbols.push(new vscode.DocumentSymbol(this.formatFunc(line.text), "", func, line.range, line.range));
      } else if (line.text.match(/^ *report /i)) {
        symbols.push(new vscode.DocumentSymbol(this.formatRep(line.text), "Report", func, line.range, line.range));
      } else if (line.text.startsWith("MAIN")) {
        symbols.push(new vscode.DocumentSymbol("MAIN", "Start Program", func, line.range, line.range));
      } else if (line.text.startsWith("GLOBALS")) {
        symbols.push(new vscode.DocumentSymbol("GLOBALS", "Global Variables", key, line.range, line.range));
      }
    }

    return symbols;
  }
}

class SwmfDefinitionProvider implements vscode.DefinitionProvider {
  public async provideDefinition(
    document: vscode.TextDocument,
    position: vscode.Position
  ): Promise<vscode.Location | vscode.Location[] | undefined> {
    const wordRange = document.getWordRangeAtPosition(position, /\b[A-Za-z_][A-Za-z0-9_]*\b/);
    if (!wordRange) return;

    const word = document.getText(wordRange);

    const locations: vscode.Location[] = [];

    // Buscar en todo el documento (puedes extenderlo a múltiples archivos)
    for (let i = 0; i < document.lineCount; i++) {
      const line = document.lineAt(i);
      const match = line.text.match(/^ *function (\w+)/i);
      if (match && match[1] === word) {
        locations.push(new vscode.Location(document.uri, line.range));
      }
    }

    return locations.length > 0 ? locations : undefined;
  }
}
