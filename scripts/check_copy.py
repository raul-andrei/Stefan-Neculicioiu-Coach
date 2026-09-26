#!/usr/bin/env python3
"""Fail if visible copy differs from a git ref (default: main).

Compares the multiset of words in visible text + alt/aria-label/title/meta,
ignoring aria-hidden subtrees, <script>/<style>/<svg>, and decorative glyphs.
"""
import subprocess, sys, re
from collections import Counter
from html.parser import HTMLParser

PAGES = ["index.html", "servicii.html", "blog.html", "contact.html"]
GLYPHS = "✓✦✕↓→↑←+▸×·–—|"
SKIP = {"script", "style", "svg"}
VOID = {"area","base","br","col","embed","hr","img","input","link","meta","source","track","wbr"}

class Extract(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.stack, self.out = [], []
    def hidden(self):
        return any(h for _, h in self.stack)
    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        hide = tag in SKIP or a.get("aria-hidden") == "true" or self.hidden()
        if not hide:
            for k in ("alt", "aria-label", "title", "placeholder"):
                if a.get(k): self.out.append(a[k])
            if tag == "meta" and a.get("name") == "description" or a.get("property", "").startswith("og:"):
                self.out.append(a.get("content", ""))
        if tag not in VOID:
            self.stack.append((tag, hide))
    def handle_endtag(self, tag):
        for i in range(len(self.stack) - 1, -1, -1):
            if self.stack[i][0] == tag:
                del self.stack[i:]; break
    def handle_data(self, data):
        if not self.hidden(): self.out.append(data)

def words(html):
    p = Extract(); p.feed(html)
    text = " ".join(p.out)
    text = text.translate({ord(c): " " for c in GLYPHS})
    return Counter(re.findall(r"[^\s]+", text))

def main(argv):
    ref = "main"
    if argv[:1] == ["--ref"]:
        ref, argv = argv[1], argv[2:]
    pages, bad = argv or PAGES, 0
    for page in pages:
        old = subprocess.run(["git", "show", f"{ref}:{page}"], capture_output=True, text=True, check=True).stdout
        new = open(page, encoding="utf-8").read()
        o, n = words(old), words(new)
        if o == n:
            print(f"OK {page}")
        else:
            bad = 1
            print(f"DIFF {page}")
            print("  - missing:", dict(o - n))
            print("  + added:  ", dict(n - o))
    return bad

if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
