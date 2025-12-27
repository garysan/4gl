import * as vscode from "vscode";
import * as fs from "fs";
import * as path from "path";

type SnippetBody = string | string[];

interface SnippetEntry {
  prefix: string | string[];
  body: SnippetBody;
  description?: string;
}

type SnippetMap = Record<string, SnippetEntry>;

function toSnippetString(body: SnippetBody): vscode.SnippetString {
  const value = Array.isArray(body) ? body.join("\n") : body;
  return new vscode.SnippetString(value);
}

function loadSnippetFile(root: string, filenames: string[]): SnippetMap | undefined {
  for (const filename of filenames) {
    const full = path.join(root, "snippets", filename);
    if (fs.existsSync(full)) {
      try {
        const raw = fs.readFileSync(full, "utf-8");
        const data = JSON.parse(raw) as SnippetMap;
        return data;
      } catch (err) {
        console.error(`[4gl] Failed to load snippets from ${full}:`, err);
      }
    }
  }
  return undefined;
}

export function registerLocalizedSnippets(context: vscode.ExtensionContext) {
  const uiLang = vscode.env.language?.toLowerCase() || "es";
  const locale = uiLang.startsWith("en") ? "en" : "es";

  const candidates = [
    `snippets.${locale}.json`,
    "snippets.es.json",
    // Legacy fallback to monolithic file if present
    "snippets.json",
  ];

  const snippets = loadSnippetFile(context.extensionPath, candidates);
  if (!snippets) {
    console.warn("[4gl] No snippet file found. Skipping snippet registration.");
    return;
  }

  const items: vscode.CompletionItem[] = [];
  for (const [name, entry] of Object.entries(snippets)) {
    if (!entry || !entry.prefix) continue;
    const prefixes = Array.isArray(entry.prefix) ? entry.prefix : [entry.prefix];
    // Ignore empty prefixes
    const validPrefixes = prefixes.filter((p) => typeof p === "string" && p.trim().length > 0);
    if (validPrefixes.length === 0) continue;

    const label = validPrefixes[0];
    const item = new vscode.CompletionItem(label, vscode.CompletionItemKind.Snippet);
    item.insertText = toSnippetString(entry.body);
    item.detail = name; // show snippet name
    if (entry.description) item.documentation = new vscode.MarkdownString(entry.description);
    // Help filtering by prefix
    item.filterText = label;
    // Prefer snippets a bit lower than keywords
    item.sortText = `~${label}`;
    items.push(item);
  }

  const selector: vscode.DocumentSelector = [{ language: "4gl", scheme: "file" }];
  // Completion items from a CompletionItemProvider populate IntelliSense with
  // localized items, but do not populate the “Insert Snippet” picker. See
  // contributes.snippets in package.json for the one canonical source for the
  // picker.
  const provider: vscode.CompletionItemProvider = {
    provideCompletionItems() {
      return items;
    },
  };

  context.subscriptions.push(vscode.languages.registerCompletionItemProvider(selector, provider));
}
