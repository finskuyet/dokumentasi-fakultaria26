import sys
import re

for filepath in [r"e:\project\fakultaria\index.html", r"e:\project\fakultaria\panitia.html"]:
    with open(filepath, 'r', encoding='utf-8') as f:
        text = f.read()

    # The titles inside the articles we want to remove
    titles = [
        "Euforia Grand Opening",
        "Hackathon &amp; UI/UX",
        "Turnamen E-Sports",
        "Pameran Media Komunikasi",
        "Talkshow Nasional"
    ]
    
    # We will split by <article and reconstruct, filtering out articles that contain these titles
    # A more robust regex:
    # Match from <article to </article>
    
    def repl(m):
        content = m.group(0)
        for t in titles:
            if t in content:
                return ''
        return content

    new_text = re.sub(r'\s*<!-- Gallery Card \d(?:[^:]*)?:[^-]*-->\s*<article.*?</article>', repl, text, flags=re.DOTALL)
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(new_text)

print("Done removing the 5 placeholder cards.")
