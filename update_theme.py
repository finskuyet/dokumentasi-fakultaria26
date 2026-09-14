import re
import sys

filename = r"e:\project\fakultaria\index.html"

with open(filename, 'r', encoding='utf-8') as f:
    content = f.read()

# Replacements
replacements = [
    (r'bg-fki-dark', r'bg-white dark:bg-fki-dark'),
    (r'text-slate-100', r'text-slate-800 dark:text-slate-100'),
    (r'text-white', r'text-slate-900 dark:text-white'),
    (r'bg-fki-navy', r'bg-slate-100 dark:bg-fki-navy'),
    (r'bg-fki-card', r'bg-slate-50 dark:bg-fki-card'),
    (r'border-fki-border', r'border-slate-300 dark:border-fki-border'),
    (r'text-slate-300', r'text-slate-600 dark:text-slate-300'),
    (r'text-slate-400', r'text-slate-500 dark:text-slate-400'),
    (r'text-slate-200', r'text-slate-700 dark:text-slate-200'),
    (r'bg-\[\#061833\]', r'bg-blue-50 dark:bg-[#061833]'),
    (r'bg-\[\#091b35\]', r'bg-blue-100 dark:bg-[#091b35]'),
    (r'bg-\[\#050a16\]', r'bg-slate-100 dark:bg-[#050a16]'),
    (r'text-depth-white', r'text-logo-main'),
    (r'text-depth-yellow', r'text-logo-year'),
    (r'FAKULTARIA 26', r'FAKULTARIA 2026'),
    (r'<span class="text-fki-yellow">FAKULTARIA</span> <span class="text-fki-cyan text-depth-white">2026</span>', r'<span class="text-logo-main">FAKULTARIA</span> <span class="text-logo-year">2026</span>'),
    (r'<span class="text-fki-yellow">FAKULTARIA</span> <span class="text-fki-cyan text-logo-main">2026</span>', r'<span class="text-logo-main">FAKULTARIA</span> <span class="text-logo-year">2026</span>'),
]

for old, new in replacements:
    content = re.sub(old, new, content)

# Add theme toggle button
theme_btn_html = """
<button id="themeToggleBtn" aria-label="Toggle Theme" class="p-2 rounded-full bg-slate-200 dark:bg-fki-navy border border-slate-300 dark:border-fki-border text-slate-800 dark:text-slate-100 hover:bg-slate-300 dark:hover:bg-fki-card transition-all focus:outline-none">
  <svg class="w-5 h-5 hidden dark:block" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
  <svg class="w-5 h-5 block dark:hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path></svg>
</button>
"""

# Insert button next to documentation button
target = r'<span class="text-base">📸</span>\s*</a>'
content = re.sub(target, f'<span class="text-base">📸</span></a>\n{theme_btn_html}', content)

with open(filename, 'w', encoding='utf-8') as f:
    f.write(content)

print("Done")
